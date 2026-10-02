/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase } from '../supabase';
import { safeFileName, validateFile } from '../files';
import type {
  ActionPlan,
  AppSettings,
  Enrollment,
  Evaluation,
  FileRef,
  HelpRequest,
  Hint,
  Idea,
  PeerReview,
  Poll,
  PollAnswer,
  Profile,
  Program,
  ProgramVersion,
  QuizQuestion,
  Resource,
  Session,
  SessionEvent,
  SessionWorkshop,
  SharedExample,
  Submission,
  SubmissionContent,
  SubmissionVersion,
  Team,
  TeamMember,
  TimerState,
  ToolCard,
  ToolCardHistory,
  ToolboxItem,
  ToolboxShared,
  ToolboxTest,
  WorkshopPrivate,
  WorkshopPrivateContent,
  WorkshopTemplate,
} from '../types';
import type { AuthUser, Backend, RealtimeTable, ToolboxItemInput, ToolboxItemPatch } from './types';

function must<T>(res: { data: T | null; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message);
  if (res.data === null || res.data === undefined) throw new Error('Réponse vide');
  return res.data;
}

function ok(res: { error: { message: string } | null }): void {
  if (res.error) throw new Error(res.error.message);
}

const REALTIME_TABLES: RealtimeTable[] = [
  'sessions',
  'session_workshops',
  'enrollments',
  'teams',
  'team_members',
  'submissions',
  'help_requests',
  'evaluations',
  'polls',
  'poll_answers',
  'ideas',
  'shared_examples',
  'toolbox_items',
  'toolbox_shared',
];

const SESSION_FILTERED: RealtimeTable[] = [
  'session_workshops',
  'enrollments',
  'teams',
  'submissions',
  'help_requests',
  'polls',
  'ideas',
  'shared_examples',
  'toolbox_items',
  'toolbox_shared',
];

export class SupabaseBackend implements Backend {
  readonly kind = 'supabase' as const;
  private sb: SupabaseClient;

  constructor() {
    this.sb = getSupabase();
  }

  // --- Authentification ----------------------------------------------------
  async getAuthUser(): Promise<AuthUser | null> {
    const { data } = await this.sb.auth.getSession();
    const u = data.session?.user;
    return u ? { id: u.id, email: u.email ?? '' } : null;
  }

  onAuthChange(cb: (user: AuthUser | null) => void): () => void {
    const { data } = this.sb.auth.onAuthStateChange((_event, session) => {
      const u = session?.user;
      cb(u ? { id: u.id, email: u.email ?? '' } : null);
    });
    return () => data.subscription.unsubscribe();
  }

  async signIn(email: string, password: string): Promise<void> {
    ok(await this.sb.auth.signInWithPassword({ email, password }));
  }

  async signUp(email: string, password: string, displayName: string): Promise<{ needsConfirmation: boolean }> {
    const res = await this.sb.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    ok(res);
    return { needsConfirmation: !res.data.session };
  }

  async signOut(): Promise<void> {
    ok(await this.sb.auth.signOut());
  }

  async getMyProfile(): Promise<Profile | null> {
    const user = await this.getAuthUser();
    if (!user) return null;
    const res = await this.sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
    ok(res);
    return (res.data as Profile | null) ?? null;
  }

  async updateMyProfile(patch: Partial<Pick<Profile, 'display_name' | 'organisation'>>): Promise<Profile> {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    return must(await this.sb.from('profiles').update(patch).eq('id', user.id).select('*').single()) as Profile;
  }

  async setUserRole(email: string, role: 'trainer' | 'participant'): Promise<void> {
    ok(await this.sb.rpc('set_user_role', { p_email: email, p_role: role }));
  }

  async listTrainers(): Promise<Profile[]> {
    return must(await this.sb.from('profiles').select('*').eq('role', 'trainer').order('display_name')) as Profile[];
  }

  // --- Paramètres ----------------------------------------------------------
  async getSettings(): Promise<AppSettings> {
    const res = await this.sb.from('app_settings').select('*').eq('id', 1).maybeSingle();
    ok(res);
    if (res.data) return res.data as AppSettings;
    return {
      id: 1,
      org_name: 'START EVOLUTION',
      logo_path: null,
      privacy_notice: '',
      hosting_notes: '',
      default_retention: { drafts_days: null, productions_days: null, traces_days: null },
      updated_at: new Date().toISOString(),
    };
  }

  async updateSettings(patch: Partial<Omit<AppSettings, 'id' | 'updated_at'>>): Promise<AppSettings> {
    return must(
      await this.sb
        .from('app_settings')
        .upsert({ id: 1, ...patch, updated_at: new Date().toISOString() })
        .select('*')
        .single(),
    ) as AppSettings;
  }

  async uploadLogo(file: File): Promise<string> {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png';
    if (!['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext)) throw new Error('Format de logo non accepté');
    const path = `logo.${ext}`;
    ok(await this.sb.storage.from('branding').upload(path, file, { upsert: true, contentType: file.type }));
    await this.updateSettings({ logo_path: path });
    return path;
  }

  async getLogoUrl(path: string | null): Promise<string | null> {
    if (!path) return null;
    const res = await this.sb.storage.from('branding').createSignedUrl(path, 3600);
    return res.data?.signedUrl ?? null;
  }

  // --- Programme et modèles -------------------------------------------------
  async listPrograms(): Promise<Program[]> {
    return must(await this.sb.from('programs').select('*').order('title')) as Program[];
  }

  async listProgramVersions(programId: string): Promise<ProgramVersion[]> {
    return must(
      await this.sb.from('program_versions').select('*').eq('program_id', programId).order('version_number', { ascending: false }),
    ) as ProgramVersion[];
  }

  async getProgramVersion(versionId: string) {
    const version = must(await this.sb.from('program_versions').select('*').eq('id', versionId).single()) as ProgramVersion;
    const workshops = must(
      await this.sb.from('workshop_templates').select('*').eq('program_version_id', versionId).order('position'),
    ) as WorkshopTemplate[];
    const ids = workshops.map((w) => w.id);
    const privates = ids.length
      ? (must(await this.sb.from('workshop_private').select('*').in('workshop_template_id', ids)) as WorkshopPrivate[])
      : [];
    return { version, workshops, privates };
  }

  async createDraftVersion(programId: string): Promise<string> {
    return must(await this.sb.rpc('create_draft_version', { p_program_id: programId })) as string;
  }

  async updateProgramVersion(versionId: string, patch: Partial<ProgramVersion>): Promise<void> {
    ok(await this.sb.from('program_versions').update(patch).eq('id', versionId));
  }

  async updateWorkshopTemplate(id: string, patch: Partial<WorkshopTemplate>): Promise<void> {
    ok(await this.sb.from('workshop_templates').update(patch).eq('id', id));
  }

  async updateWorkshopPrivate(templateId: string, content: WorkshopPrivateContent): Promise<void> {
    ok(await this.sb.from('workshop_private').upsert({ workshop_template_id: templateId, content }));
  }

  async publishVersion(versionId: string, changelog: string): Promise<void> {
    ok(await this.sb.rpc('publish_version', { p_version_id: versionId, p_changelog: changelog }));
  }

  // --- Ressources, outils, quiz ---------------------------------------------
  async listResources(): Promise<Resource[]> {
    return must(await this.sb.from('resources').select('*').order('code')) as Resource[];
  }

  async listToolCards(): Promise<ToolCard[]> {
    return must(await this.sb.from('tool_cards').select('*').order('family').order('is_fallback').order('name')) as ToolCard[];
  }

  async createToolCard(input: Omit<ToolCard, 'id' | 'version' | 'updated_at'>): Promise<ToolCard> {
    return must(await this.sb.from('tool_cards').insert(input).select('*').single()) as ToolCard;
  }

  async updateToolCard(id: string, patch: Partial<ToolCard>): Promise<ToolCard> {
    const { id: _id, version: _v, updated_at: _u, ...rest } = patch as ToolCard;
    return must(await this.sb.from('tool_cards').update(rest).eq('id', id).select('*').single()) as ToolCard;
  }

  async listToolCardHistory(id: string): Promise<ToolCardHistory[]> {
    return must(
      await this.sb.from('tool_card_history').select('*').eq('tool_card_id', id).order('version', { ascending: false }),
    ) as ToolCardHistory[];
  }

  async listQuizQuestions(): Promise<QuizQuestion[]> {
    return must(await this.sb.from('quiz_questions').select('*').order('position')) as QuizQuestion[];
  }

  // --- Sessions -------------------------------------------------------------
  async listMySessions(): Promise<Session[]> {
    return must(await this.sb.from('sessions').select('*').order('created_at', { ascending: false })) as Session[];
  }

  async getSession(id: string): Promise<Session | null> {
    const res = await this.sb.from('sessions').select('*').eq('id', id).maybeSingle();
    ok(res);
    return (res.data as Session | null) ?? null;
  }

  async createSession(input: {
    program_version_id: string;
    title: string;
    mode: string;
    start_date: string | null;
    end_date: string | null;
    max_participants: number;
    is_demo?: boolean;
  }): Promise<string> {
    return must(
      await this.sb.rpc('create_session_from_version', {
        p_program_version_id: input.program_version_id,
        p_title: input.title,
        p_mode: input.mode,
        p_start_date: input.start_date,
        p_end_date: input.end_date,
        p_max_participants: input.max_participants,
        p_is_demo: input.is_demo ?? false,
      }),
    ) as string;
  }

  async duplicateSession(id: string, title: string, startDate: string | null, endDate: string | null): Promise<string> {
    return must(
      await this.sb.rpc('duplicate_session', { p_session_id: id, p_title: title, p_start_date: startDate, p_end_date: endDate }),
    ) as string;
  }

  async updateSession(id: string, patch: Partial<Session>): Promise<Session> {
    return must(await this.sb.from('sessions').update(patch).eq('id', id).select('*').single()) as Session;
  }

  async deleteSession(id: string): Promise<void> {
    ok(await this.sb.from('sessions').delete().eq('id', id));
  }

  async listSessionWorkshops(sessionId: string): Promise<SessionWorkshop[]> {
    return must(
      await this.sb.from('session_workshops').select('*').eq('session_id', sessionId).order('position'),
    ) as SessionWorkshop[];
  }

  async updateSessionWorkshopState(id: string, patch: Partial<SessionWorkshop>): Promise<void> {
    const now = new Date().toISOString();
    const extra: Record<string, unknown> = {};
    if (patch.status === 'open') extra.opened_at = now;
    if (patch.status === 'closed') extra.closed_at = now;
    ok(await this.sb.from('session_workshops').update({ ...patch, ...extra }).eq('id', id));
  }

  async updateSessionWorkshopContent(
    id: string,
    content: SessionWorkshop['content'],
    breakdown: SessionWorkshop['breakdown'],
    durationMin: number,
    note: string,
  ): Promise<void> {
    ok(
      await this.sb.rpc('update_session_workshop', {
        p_session_workshop_id: id,
        p_content: content,
        p_breakdown: breakdown,
        p_duration_min: durationMin,
        p_note: note,
      }),
    );
  }

  async getWorkshopPrivate(sessionWorkshopId: string): Promise<WorkshopPrivateContent | null> {
    const res = await this.sb
      .from('session_workshop_private')
      .select('content')
      .eq('session_workshop_id', sessionWorkshopId)
      .maybeSingle();
    ok(res);
    return (res.data?.content as WorkshopPrivateContent | undefined) ?? null;
  }

  async getRevealedHints(sessionWorkshopId: string): Promise<Hint[]> {
    return (must(await this.sb.rpc('get_revealed_hints', { p_session_workshop_id: sessionWorkshopId })) as Hint[]) ?? [];
  }

  async timerControl(sessionId: string, action: string, seconds?: number, label?: string): Promise<TimerState> {
    return must(
      await this.sb.rpc('timer_control', {
        p_session_id: sessionId,
        p_action: action,
        p_seconds: seconds ?? null,
        p_label: label ?? null,
      }),
    ) as TimerState;
  }

  async setCurrentWorkshop(sessionId: string, sessionWorkshopId: string | null, step: number): Promise<void> {
    ok(
      await this.sb
        .from('sessions')
        .update({ current_session_workshop_id: sessionWorkshopId, current_step: step })
        .eq('id', sessionId),
    );
  }

  // --- Inscriptions, binômes ------------------------------------------------
  async listEnrollments(sessionId: string): Promise<Enrollment[]> {
    return must(
      await this.sb.from('enrollments').select('*').eq('session_id', sessionId).order('display_name'),
    ) as Enrollment[];
  }

  async getMyEnrollment(sessionId: string): Promise<Enrollment | null> {
    const user = await this.getAuthUser();
    if (!user) return null;
    const res = await this.sb.from('enrollments').select('*').eq('session_id', sessionId).eq('user_id', user.id).maybeSingle();
    ok(res);
    return (res.data as Enrollment | null) ?? null;
  }

  async requestJoin(code: string) {
    return must(await this.sb.rpc('request_join', { p_code: code })) as {
      status: Enrollment['status'];
      session_id: string;
      title: string;
      full?: boolean;
    };
  }

  async inviteByEmail(sessionId: string, rows: { email: string; display_name: string }[]) {
    const existing = await this.listEnrollments(sessionId);
    const known = new Set(existing.map((e) => (e.invited_email ?? '').toLowerCase()).filter(Boolean));
    const duplicates: string[] = [];
    const toInsert: { session_id: string; invited_email: string; display_name: string; status: string }[] = [];
    const seen = new Set<string>();
    for (const r of rows) {
      const email = r.email.trim().toLowerCase();
      if (!email) continue;
      if (known.has(email) || seen.has(email)) {
        duplicates.push(email);
        continue;
      }
      seen.add(email);
      toInsert.push({ session_id: sessionId, invited_email: email, display_name: r.display_name.trim(), status: 'invited' });
    }
    if (toInsert.length) ok(await this.sb.from('enrollments').insert(toInsert));
    return { added: toInsert.length, duplicates };
  }

  async updateEnrollment(id: string, patch: Partial<Enrollment>): Promise<Enrollment> {
    return must(await this.sb.from('enrollments').update(patch).eq('id', id).select('*').single()) as Enrollment;
  }

  async deleteEnrollment(id: string): Promise<void> {
    ok(await this.sb.from('enrollments').delete().eq('id', id));
  }

  async listTeams(sessionId: string) {
    const teams = must(await this.sb.from('teams').select('*').eq('session_id', sessionId).order('name')) as Team[];
    const ids = teams.map((t) => t.id);
    const members = ids.length
      ? (must(await this.sb.from('team_members').select('*').in('team_id', ids)) as TeamMember[])
      : [];
    return { teams, members };
  }

  async saveTeams(sessionId: string, teams: { id?: string; name: string; kind: Team['kind']; user_ids: string[] }[]) {
    const current = await this.listTeams(sessionId);
    const keep = new Set(teams.map((t) => t.id).filter(Boolean) as string[]);
    const toDelete = current.teams.filter((t) => !keep.has(t.id)).map((t) => t.id);
    if (toDelete.length) ok(await this.sb.from('teams').delete().in('id', toDelete));
    for (const t of teams) {
      let id = t.id;
      if (id) {
        ok(await this.sb.from('teams').update({ name: t.name, kind: t.kind }).eq('id', id));
        ok(await this.sb.from('team_members').delete().eq('team_id', id));
      } else {
        id = (must(await this.sb.from('teams').insert({ session_id: sessionId, name: t.name, kind: t.kind }).select('id').single()) as { id: string }).id;
      }
      if (t.user_ids.length) {
        ok(await this.sb.from('team_members').insert(t.user_ids.map((user_id) => ({ team_id: id, user_id }))));
      }
    }
  }

  async listSessionProfiles(sessionId: string): Promise<Profile[]> {
    const enrollments = await this.listEnrollments(sessionId);
    const ids = enrollments.map((e) => e.user_id).filter(Boolean) as string[];
    const session = await this.getSession(sessionId);
    if (session) ids.push(session.trainer_id);
    if (!ids.length) return [];
    return must(await this.sb.from('profiles').select('*').in('id', ids)) as Profile[];
  }

  // --- Productions ----------------------------------------------------------
  async listSubmissions(sessionId: string): Promise<Submission[]> {
    return must(
      await this.sb.from('submissions').select('*').eq('session_id', sessionId).order('updated_at', { ascending: false }),
    ) as Submission[];
  }

  async getOrCreateSubmission(sessionId: string, sessionWorkshopId: string, teamId: string | null, initial: SubmissionContent) {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    let q = this.sb.from('submissions').select('*').eq('session_workshop_id', sessionWorkshopId);
    q = teamId ? q.eq('team_id', teamId) : q.eq('owner_id', user.id).is('team_id', null);
    const found = await q.maybeSingle();
    ok(found);
    if (found.data) return found.data as Submission;
    const created = await this.sb
      .from('submissions')
      .insert({ session_id: sessionId, session_workshop_id: sessionWorkshopId, owner_id: user.id, team_id: teamId, draft: initial })
      .select('*')
      .single();
    if (created.error) {
      // Course possible en binôme : relire.
      const again = await q.maybeSingle();
      if (again.data) return again.data as Submission;
      throw new Error(created.error.message);
    }
    return created.data as Submission;
  }

  async saveDraft(id: string, draft: SubmissionContent, draftFiles: FileRef[]): Promise<Submission> {
    return must(
      await this.sb.from('submissions').update({ draft, draft_files: draftFiles }).eq('id', id).select('*').single(),
    ) as Submission;
  }

  async setShareConsent(id: string, consent: boolean): Promise<void> {
    ok(await this.sb.from('submissions').update({ share_consent: consent }).eq('id', id));
  }

  async submit(id: string): Promise<number> {
    return must(await this.sb.rpc('submit_submission', { p_submission_id: id })) as number;
  }

  async listVersions(submissionId: string): Promise<SubmissionVersion[]> {
    return must(
      await this.sb.from('submission_versions').select('*').eq('submission_id', submissionId).order('version_number'),
    ) as SubmissionVersion[];
  }

  async uploadSubmissionFile(sessionId: string, submissionId: string, file: File): Promise<FileRef> {
    const err = validateFile(file);
    if (err) throw new Error(err);
    const name = `${Date.now()}_${safeFileName(file.name)}`;
    const path = `${sessionId}/${submissionId}/${name}`;
    ok(await this.sb.storage.from('submissions').upload(path, file, { contentType: file.type || undefined }));
    return { path, name: file.name, size: file.size, mime: file.type, uploaded_at: new Date().toISOString() };
  }

  async deleteSubmissionFile(path: string): Promise<void> {
    ok(await this.sb.storage.from('submissions').remove([path]));
  }

  async getFileUrl(path: string): Promise<string | null> {
    const res = await this.sb.storage.from('submissions').createSignedUrl(path, 600);
    if (res.error) return null;
    return res.data.signedUrl;
  }

  async deleteSubmission(id: string): Promise<void> {
    const sub = await this.sb.from('submissions').select('*').eq('id', id).maybeSingle();
    ok(sub);
    const s = sub.data as Submission | null;
    if (s) {
      const versions = await this.listVersions(id);
      const paths = new Set<string>();
      s.draft_files.forEach((f) => paths.add(f.path));
      versions.forEach((v) => v.files.forEach((f) => paths.add(f.path)));
      if (paths.size) await this.sb.storage.from('submissions').remove([...paths]);
    }
    ok(await this.sb.from('submissions').delete().eq('id', id));
  }

  // --- Aide, évaluation, pairs ----------------------------------------------
  async listHelpRequests(sessionId: string): Promise<HelpRequest[]> {
    return must(
      await this.sb.from('help_requests').select('*').eq('session_id', sessionId).order('created_at'),
    ) as HelpRequest[];
  }

  async createHelpRequest(sessionId: string, sessionWorkshopId: string | null, teamId: string | null, reason: string) {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    return must(
      await this.sb
        .from('help_requests')
        .insert({ session_id: sessionId, session_workshop_id: sessionWorkshopId, team_id: teamId, requester_id: user.id, reason })
        .select('*')
        .single(),
    ) as HelpRequest;
  }

  async updateHelpRequest(id: string, status: HelpRequest['status']): Promise<void> {
    const user = await this.getAuthUser();
    const patch: Record<string, unknown> = { status };
    if (status === 'in_progress') patch.handled_by = user?.id ?? null;
    if (status === 'resolved') patch.resolved_at = new Date().toISOString();
    ok(await this.sb.from('help_requests').update(patch).eq('id', id));
  }

  async listEvaluations(submissionIds: string[]): Promise<Evaluation[]> {
    if (!submissionIds.length) return [];
    const rows = must(
      await this.sb.from('evaluations').select('*').in('submission_id', submissionIds).order('created_at'),
    ) as Omit<Evaluation, 'note_private'>[];
    return rows.map((r) => ({ ...r, note_private: '' }));
  }

  async recordEvaluation(
    submissionId: string,
    scores: Record<string, number>,
    decision: Evaluation['decision'],
    criticalError: boolean,
    feedbackPublic: string,
    notePrivate: string,
  ): Promise<void> {
    ok(
      await this.sb.rpc('record_evaluation', {
        p_submission_id: submissionId,
        p_scores: scores,
        p_decision: decision,
        p_critical_error: criticalError,
        p_feedback_public: feedbackPublic,
        p_note_private: notePrivate,
      }),
    );
  }

  async getEvaluationNote(evaluationId: string): Promise<string> {
    const res = await this.sb.from('evaluation_notes').select('note').eq('evaluation_id', evaluationId).maybeSingle();
    if (res.error) return '';
    return (res.data?.note as string | undefined) ?? '';
  }

  async listSharedExamples(sessionId: string): Promise<SharedExample[]> {
    return must(
      await this.sb.from('shared_examples').select('*').eq('session_id', sessionId).order('published_at', { ascending: false }),
    ) as SharedExample[];
  }

  async publishExample(submissionId: string, title: string): Promise<void> {
    ok(await this.sb.rpc('publish_example', { p_submission_id: submissionId, p_title: title }));
  }

  async deleteSharedExample(id: string): Promise<void> {
    ok(await this.sb.from('shared_examples').delete().eq('id', id));
  }

  async listPeerReviews(sessionId: string): Promise<PeerReview[]> {
    const examples = await this.listSharedExamples(sessionId);
    const ids = examples.map((e) => e.id);
    if (!ids.length) return [];
    return must(await this.sb.from('peer_reviews').select('*').in('shared_example_id', ids)) as PeerReview[];
  }

  async createPeerReview(sharedExampleId: string, submissionId: string | null, strengths: string, suggestions: string, understood: boolean | null) {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    ok(
      await this.sb.from('peer_reviews').insert({
        shared_example_id: sharedExampleId,
        submission_id: submissionId,
        reviewer_id: user.id,
        strengths,
        suggestions,
        understood,
      }),
    );
  }

  // --- Sondages, débrief, mur d'idées ---------------------------------------
  async listPolls(sessionId: string): Promise<Poll[]> {
    return must(await this.sb.from('polls').select('*').eq('session_id', sessionId).order('created_at')) as Poll[];
  }

  async listPollAnswers(sessionId: string): Promise<PollAnswer[]> {
    const polls = await this.listPolls(sessionId);
    const ids = polls.map((p) => p.id);
    if (!ids.length) return [];
    return must(await this.sb.from('poll_answers').select('*').in('poll_id', ids)) as PollAnswer[];
  }

  async createPoll(sessionId: string, kind: Poll['kind'], question: string, options: string[], key?: { correct_index: number; explanation: string }) {
    const poll = must(
      await this.sb.from('polls').insert({ session_id: sessionId, kind, question, options }).select('*').single(),
    ) as Poll;
    if (key) ok(await this.sb.from('poll_keys').insert({ poll_id: poll.id, ...key }));
    return poll;
  }

  async closePoll(id: string): Promise<void> {
    ok(await this.sb.from('polls').update({ status: 'closed' }).eq('id', id));
  }

  async answerPoll(pollId: string, answerIndex: number | null, answerText: string): Promise<void> {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    ok(
      await this.sb
        .from('poll_answers')
        .upsert({ poll_id: pollId, user_id: user.id, answer_index: answerIndex, answer_text: answerText }, { onConflict: 'poll_id,user_id' }),
    );
  }

  async getPollKey(pollId: string) {
    const res = await this.sb.from('poll_keys').select('*').eq('poll_id', pollId).maybeSingle();
    if (res.error || !res.data) return null;
    return { correct_index: res.data.correct_index as number | null, explanation: (res.data.explanation as string) ?? '' };
  }

  async listIdeas(sessionId: string): Promise<Idea[]> {
    return must(await this.sb.from('ideas').select('*').eq('session_id', sessionId).order('created_at')) as Idea[];
  }

  async addIdea(sessionId: string, text: string): Promise<void> {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    ok(await this.sb.from('ideas').insert({ session_id: sessionId, author_id: user.id, text }));
  }

  async deleteIdea(id: string): Promise<void> {
    ok(await this.sb.from('ideas').delete().eq('id', id));
  }

  // --- Boîte à outils --------------------------------------------------------
  async listToolboxItems(sessionId: string): Promise<ToolboxItem[]> {
    return must(await this.sb.from('toolbox_items').select('*').eq('session_id', sessionId).order('updated_at', { ascending: false })) as ToolboxItem[];
  }

  async createToolboxItem(input: ToolboxItemInput): Promise<ToolboxItem> {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    return must(await this.sb.from('toolbox_items').insert({ ...input, owner_id: user.id }).select('*').single()) as ToolboxItem;
  }

  async updateToolboxItem(id: string, patch: ToolboxItemPatch, newVersion = false): Promise<ToolboxItem> {
    const extra: Record<string, unknown> = {};
    if (newVersion) {
      const current = must(await this.sb.from('toolbox_items').select('*').eq('id', id).single()) as ToolboxItem;
      const snapshot = { name: current.name, family: current.family, purpose: current.purpose, inputs: current.inputs, instructions: current.instructions, prompt_template: current.prompt_template, output_format: current.output_format, verification: current.verification, data_rules: current.data_rules, fallback: current.fallback };
      extra.history = [...current.history, { version: current.version, saved_at: current.updated_at, snapshot }];
      extra.version = current.version + 1;
    }
    return must(await this.sb.from('toolbox_items').update({ ...patch, ...extra }).eq('id', id).select('*').single()) as ToolboxItem;
  }

  async addToolboxTest(id: string, test: ToolboxTest): Promise<ToolboxItem> {
    const current = must(await this.sb.from('toolbox_items').select('tests,status').eq('id', id).single()) as { tests: ToolboxTest[]; status: ToolboxItem['status'] };
    const status = current.status === 'draft' ? 'tested' : current.status;
    return must(await this.sb.from('toolbox_items').update({ tests: [...current.tests, test], status }).eq('id', id).select('*').single()) as ToolboxItem;
  }

  async deleteToolboxItem(id: string): Promise<void> {
    ok(await this.sb.from('toolbox_items').delete().eq('id', id));
  }

  async listToolboxShared(sessionId: string): Promise<ToolboxShared[]> {
    return must(await this.sb.from('toolbox_shared').select('*').eq('session_id', sessionId).order('published_at', { ascending: false })) as ToolboxShared[];
  }

  async publishToolboxItem(id: string, title: string): Promise<void> {
    ok(await this.sb.rpc('publish_toolbox_item', { p_item_id: id, p_title: title }));
  }

  async deleteToolboxShared(id: string): Promise<void> {
    ok(await this.sb.from('toolbox_shared').delete().eq('id', id));
  }

  // --- Plans d'application --------------------------------------------------
  async getMyActionPlan(sessionId: string): Promise<ActionPlan | null> {
    const user = await this.getAuthUser();
    if (!user) return null;
    const res = await this.sb.from('action_plans').select('*').eq('session_id', sessionId).eq('user_id', user.id).maybeSingle();
    ok(res);
    return (res.data as ActionPlan | null) ?? null;
  }

  async saveActionPlan(sessionId: string, input: Omit<ActionPlan, 'id' | 'session_id' | 'user_id' | 'updated_at'>) {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    return must(
      await this.sb
        .from('action_plans')
        .upsert({ session_id: sessionId, user_id: user.id, ...input }, { onConflict: 'session_id,user_id' })
        .select('*')
        .single(),
    ) as ActionPlan;
  }

  async listActionPlans(sessionId: string): Promise<ActionPlan[]> {
    return must(await this.sb.from('action_plans').select('*').eq('session_id', sessionId)) as ActionPlan[];
  }

  // --- Journal, temps réel, données personnelles ----------------------------
  async listEvents(sessionId: string, limit = 200): Promise<SessionEvent[]> {
    return must(
      await this.sb.from('session_events').select('*').eq('session_id', sessionId).order('created_at', { ascending: false }).limit(limit),
    ) as SessionEvent[];
  }

  subscribeSession(sessionId: string, onChange: (table: RealtimeTable) => void): () => void {
    const channel = this.sb.channel(`session:${sessionId}`);
    for (const table of REALTIME_TABLES) {
      const filter =
        table === 'sessions'
          ? `id=eq.${sessionId}`
          : SESSION_FILTERED.includes(table)
            ? `session_id=eq.${sessionId}`
            : undefined;
      channel.on(
        'postgres_changes' as any,
        { event: '*', schema: 'public', table, ...(filter ? { filter } : {}) } as any,
        () => onChange(table),
      );
    }
    channel.subscribe();
    return () => {
      void this.sb.removeChannel(channel);
    };
  }

  onConnectionChange(cb: (online: boolean) => void): () => void {
    const on = () => cb(true);
    const off = () => cb(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }

  async exportMyData(): Promise<Record<string, unknown>> {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    const profile = await this.getMyProfile();
    const enrollments = must(await this.sb.from('enrollments').select('*').eq('user_id', user.id)) as Enrollment[];
    const submissions = must(await this.sb.from('submissions').select('*').eq('owner_id', user.id)) as Submission[];
    const ids = submissions.map((s) => s.id);
    const versions = ids.length
      ? (must(await this.sb.from('submission_versions').select('*').in('submission_id', ids)) as SubmissionVersion[])
      : [];
    const evaluations = await this.listEvaluations(ids);
    const plans = must(await this.sb.from('action_plans').select('*').eq('user_id', user.id)) as ActionPlan[];
    return { exported_at: new Date().toISOString(), profile, enrollments, submissions, versions, evaluations, action_plans: plans };
  }

  async deleteMyDrafts(sessionId: string): Promise<void> {
    const user = await this.getAuthUser();
    if (!user) throw new Error('Connexion requise');
    const subs = must(
      await this.sb.from('submissions').select('*').eq('session_id', sessionId).eq('owner_id', user.id).eq('status', 'draft'),
    ) as Submission[];
    for (const s of subs) {
      const paths = s.draft_files.map((f) => f.path);
      if (paths.length) await this.sb.storage.from('submissions').remove(paths);
      ok(await this.sb.from('submissions').update({ draft: {}, draft_files: [] }).eq('id', s.id));
    }
  }
}

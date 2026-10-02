import type {
  ActionPlan,
  ActionPlanFields,
  AppSettings,
  Enrollment,
  Evaluation,
  EvaluationDecision,
  FileRef,
  HelpRequest,
  HelpStatus,
  Hint,
  Idea,
  PeerReview,
  Poll,
  PollAnswer,
  PollKind,
  Profile,
  Program,
  ProgramVersion,
  QuizQuestion,
  Resource,
  Role,
  Rubric,
  Session,
  SessionEvent,
  SessionMode,
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
  WorkshopPrivateContent,
  WorkshopTemplate,
  WorkshopPrivate,
} from '../types';

export interface AuthUser {
  id: string;
  email: string;
}

export interface CreateSessionInput {
  program_version_id: string;
  title: string;
  mode: SessionMode;
  start_date: string | null;
  end_date: string | null;
  max_participants: number;
  is_demo?: boolean;
}

export interface JoinResult {
  status: Enrollment['status'];
  session_id: string;
  title: string;
  full?: boolean;
}

export interface TeamInput {
  id?: string;
  name: string;
  kind: Team['kind'];
  user_ids: string[];
}

export type TimerAction = 'start' | 'pause' | 'resume' | 'add' | 'finish' | 'reset';

export type RealtimeTable =
  | 'sessions'
  | 'session_workshops'
  | 'enrollments'
  | 'teams'
  | 'team_members'
  | 'submissions'
  | 'help_requests'
  | 'evaluations'
  | 'polls'
  | 'poll_answers'
  | 'ideas'
  | 'shared_examples'
  | 'toolbox_items'
  | 'toolbox_shared';

export type SessionWorkshopStatePatch = Partial<
  Pick<SessionWorkshop, 'status' | 'hints_revealed' | 'answer_key_revealed'>
>;

export type SessionPatch = Partial<
  Pick<
    Session,
    | 'title'
    | 'status'
    | 'mode'
    | 'start_date'
    | 'end_date'
    | 'meeting_link'
    | 'max_participants'
    | 'allowed_tool_ids'
    | 'resources_access'
    | 'retention'
    | 'peer_review_enabled'
    | 'rubric_snapshot'
  >
>;

export type ToolCardInput = Omit<ToolCard, 'id' | 'version' | 'updated_at'>;

export type ToolboxItemInput = Omit<ToolboxItem, 'id' | 'owner_id' | 'status' | 'version' | 'history' | 'tests' | 'trainer_comment' | 'created_at' | 'updated_at' | 'updated_by'>;
export type ToolboxItemPatch = Partial<Omit<ToolboxItem, 'id' | 'session_id' | 'owner_id' | 'created_at' | 'updated_at' | 'updated_by' | 'history' | 'tests' | 'version'>>;

/**
 * Contrat commun aux deux implémentations :
 *  - SupabaseBackend : authentification réelle, PostgreSQL + RLS, Storage privé, Realtime ;
 *  - DemoBackend : données locales au navigateur, explicitement non synchronisées.
 */
export interface Backend {
  readonly kind: 'supabase' | 'demo';

  // --- Authentification ----------------------------------------------------
  getAuthUser(): Promise<AuthUser | null>;
  onAuthChange(cb: (user: AuthUser | null) => void): () => void;
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string, displayName: string): Promise<{ needsConfirmation: boolean }>;
  signOut(): Promise<void>;
  getMyProfile(): Promise<Profile | null>;
  updateMyProfile(patch: Partial<Pick<Profile, 'display_name' | 'organisation'>>): Promise<Profile>;
  setUserRole(email: string, role: Role): Promise<void>;
  listTrainers(): Promise<Profile[]>;

  // --- Paramètres ----------------------------------------------------------
  getSettings(): Promise<AppSettings>;
  updateSettings(patch: Partial<Omit<AppSettings, 'id' | 'updated_at'>>): Promise<AppSettings>;
  uploadLogo(file: File): Promise<string>;
  getLogoUrl(path: string | null): Promise<string | null>;

  // --- Programme et modèles (formateur) -------------------------------------
  listPrograms(): Promise<Program[]>;
  listProgramVersions(programId: string): Promise<ProgramVersion[]>;
  getProgramVersion(versionId: string): Promise<{
    version: ProgramVersion;
    workshops: WorkshopTemplate[];
    privates: WorkshopPrivate[];
  }>;
  createDraftVersion(programId: string): Promise<string>;
  updateProgramVersion(
    versionId: string,
    patch: Partial<Pick<ProgramVersion, 'editorial_reference' | 'changelog' | 'rubric' | 'objectives'>>,
  ): Promise<void>;
  updateWorkshopTemplate(
    id: string,
    patch: Partial<Pick<WorkshopTemplate, 'title' | 'duration_min' | 'breakdown' | 'content' | 'seance'>>,
  ): Promise<void>;
  updateWorkshopPrivate(templateId: string, content: WorkshopPrivateContent): Promise<void>;
  publishVersion(versionId: string, changelog: string): Promise<void>;

  // --- Ressources, outils, quiz ---------------------------------------------
  listResources(): Promise<Resource[]>;
  listToolCards(): Promise<ToolCard[]>;
  createToolCard(input: ToolCardInput): Promise<ToolCard>;
  updateToolCard(id: string, patch: Partial<ToolCardInput>): Promise<ToolCard>;
  listToolCardHistory(id: string): Promise<ToolCardHistory[]>;
  listQuizQuestions(): Promise<QuizQuestion[]>;

  // --- Sessions -------------------------------------------------------------
  listMySessions(): Promise<Session[]>;
  getSession(id: string): Promise<Session | null>;
  createSession(input: CreateSessionInput): Promise<string>;
  duplicateSession(id: string, title: string, startDate: string | null, endDate: string | null): Promise<string>;
  updateSession(id: string, patch: SessionPatch): Promise<Session>;
  deleteSession(id: string): Promise<void>;
  listSessionWorkshops(sessionId: string): Promise<SessionWorkshop[]>;
  updateSessionWorkshopState(id: string, patch: SessionWorkshopStatePatch): Promise<void>;
  updateSessionWorkshopContent(
    id: string,
    content: SessionWorkshop['content'],
    breakdown: SessionWorkshop['breakdown'],
    durationMin: number,
    note: string,
  ): Promise<void>;
  getWorkshopPrivate(sessionWorkshopId: string): Promise<WorkshopPrivateContent | null>;
  getRevealedHints(sessionWorkshopId: string): Promise<Hint[]>;
  timerControl(sessionId: string, action: TimerAction, seconds?: number, label?: string): Promise<TimerState>;
  setCurrentWorkshop(sessionId: string, sessionWorkshopId: string | null, step: number): Promise<void>;

  // --- Inscriptions, binômes ------------------------------------------------
  listEnrollments(sessionId: string): Promise<Enrollment[]>;
  getMyEnrollment(sessionId: string): Promise<Enrollment | null>;
  requestJoin(code: string): Promise<JoinResult>;
  inviteByEmail(
    sessionId: string,
    rows: { email: string; display_name: string }[],
  ): Promise<{ added: number; duplicates: string[] }>;
  updateEnrollment(
    id: string,
    patch: Partial<Pick<Enrollment, 'status' | 'display_name' | 'positioning' | 'tool_access'>>,
  ): Promise<Enrollment>;
  deleteEnrollment(id: string): Promise<void>;
  listTeams(sessionId: string): Promise<{ teams: Team[]; members: TeamMember[] }>;
  saveTeams(sessionId: string, teams: TeamInput[]): Promise<void>;
  listSessionProfiles(sessionId: string): Promise<Profile[]>;

  // --- Productions ----------------------------------------------------------
  listSubmissions(sessionId: string): Promise<Submission[]>;
  getOrCreateSubmission(
    sessionId: string,
    sessionWorkshopId: string,
    teamId: string | null,
    initial: SubmissionContent,
  ): Promise<Submission>;
  saveDraft(id: string, draft: SubmissionContent, draftFiles: FileRef[]): Promise<Submission>;
  setShareConsent(id: string, consent: boolean): Promise<void>;
  submit(id: string): Promise<number>;
  listVersions(submissionId: string): Promise<SubmissionVersion[]>;
  uploadSubmissionFile(sessionId: string, submissionId: string, file: File): Promise<FileRef>;
  deleteSubmissionFile(path: string): Promise<void>;
  getFileUrl(path: string): Promise<string | null>;
  deleteSubmission(id: string): Promise<void>;

  // --- Aide, évaluation, pairs ----------------------------------------------
  listHelpRequests(sessionId: string): Promise<HelpRequest[]>;
  createHelpRequest(
    sessionId: string,
    sessionWorkshopId: string | null,
    teamId: string | null,
    reason: string,
  ): Promise<HelpRequest>;
  updateHelpRequest(id: string, status: HelpStatus): Promise<void>;
  listEvaluations(submissionIds: string[]): Promise<Evaluation[]>;
  recordEvaluation(
    submissionId: string,
    scores: Record<string, number>,
    decision: EvaluationDecision,
    criticalError: boolean,
    feedbackPublic: string,
    notePrivate: string,
  ): Promise<void>;
  getEvaluationNote(evaluationId: string): Promise<string>;
  listSharedExamples(sessionId: string): Promise<SharedExample[]>;
  publishExample(submissionId: string, title: string): Promise<void>;
  deleteSharedExample(id: string): Promise<void>;
  listPeerReviews(sessionId: string): Promise<PeerReview[]>;
  createPeerReview(
    sharedExampleId: string,
    submissionId: string | null,
    strengths: string,
    suggestions: string,
    understood: boolean | null,
  ): Promise<void>;

  // --- Sondages, débrief, mur d'idées ---------------------------------------
  listPolls(sessionId: string): Promise<Poll[]>;
  listPollAnswers(sessionId: string): Promise<PollAnswer[]>;
  createPoll(
    sessionId: string,
    kind: PollKind,
    question: string,
    options: string[],
    key?: { correct_index: number; explanation: string },
  ): Promise<Poll>;
  closePoll(id: string): Promise<void>;
  answerPoll(pollId: string, answerIndex: number | null, answerText: string): Promise<void>;
  getPollKey(pollId: string): Promise<{ correct_index: number | null; explanation: string } | null>;
  listIdeas(sessionId: string): Promise<Idea[]>;
  addIdea(sessionId: string, text: string): Promise<void>;
  deleteIdea(id: string): Promise<void>;

  // --- Boîte à outils --------------------------------------------------------
  listToolboxItems(sessionId: string): Promise<ToolboxItem[]>;
  createToolboxItem(input: ToolboxItemInput): Promise<ToolboxItem>;
  /** Met à jour la fiche ; avec newVersion, archive l'état précédent dans l'historique et incrémente la version. */
  updateToolboxItem(id: string, patch: ToolboxItemPatch, newVersion?: boolean): Promise<ToolboxItem>;
  addToolboxTest(id: string, test: ToolboxTest): Promise<ToolboxItem>;
  deleteToolboxItem(id: string): Promise<void>;
  listToolboxShared(sessionId: string): Promise<ToolboxShared[]>;
  publishToolboxItem(id: string, title: string): Promise<void>;
  deleteToolboxShared(id: string): Promise<void>;

  // --- Plans d'application --------------------------------------------------
  getMyActionPlan(sessionId: string): Promise<ActionPlan | null>;
  saveActionPlan(
    sessionId: string,
    input: { selected_submission_ids: string[]; tools_chosen: string[]; plan: ActionPlanFields; self_assessment: string },
  ): Promise<ActionPlan>;
  listActionPlans(sessionId: string): Promise<ActionPlan[]>;

  // --- Journal, temps réel, données personnelles ----------------------------
  listEvents(sessionId: string, limit?: number): Promise<SessionEvent[]>;
  subscribeSession(sessionId: string, onChange: (table: RealtimeTable) => void): () => void;
  onConnectionChange(cb: (online: boolean) => void): () => void;
  exportMyData(): Promise<Record<string, unknown>>;
  deleteMyDrafts(sessionId: string): Promise<void>;
}

export type { Rubric };

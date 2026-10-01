/**
 * Backend de DÉMONSTRATION : données locales au navigateur (localStorage),
 * aucune synchronisation entre machines. Chaque onglet peut incarner un
 * utilisateur différent ; les onglets d'un même navigateur se mettent à jour
 * via l'événement « storage ». Ce mode ne remplace pas Supabase.
 */
import {
  DEFAULT_HOSTING_NOTES,
  DEFAULT_PRIVACY_NOTICE,
  PROGRAM_META,
  PROGRAM_OBJECTIVES,
  QUIZ_QUESTIONS,
  RESOURCES,
  RUBRIC,
  TOOL_CARDS,
  WORKSHOPS,
  snapshotWorkshopContent,
  hintsVisible,
} from '../../content';
import { joinCode, newId } from '../ids';
import { applyTimerAction, IDLE_TIMER } from '../timer';
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
  WorkshopPrivate,
  WorkshopPrivateContent,
  WorkshopTemplate,
} from '../types';
import { emptySubmissionContent } from '../types';
import type { AuthUser, Backend, RealtimeTable } from './types';

const STORAGE_KEY = 'atelier-ia-demo-v1';
const USER_KEY = 'atelier-ia-demo-user';

interface DemoUser {
  id: string;
  email: string;
  password: string;
}

interface DB {
  users: DemoUser[];
  profiles: Profile[];
  settings: AppSettings;
  programs: Program[];
  program_versions: ProgramVersion[];
  workshop_templates: WorkshopTemplate[];
  workshop_private: WorkshopPrivate[];
  resources: Resource[];
  tool_cards: ToolCard[];
  tool_card_history: ToolCardHistory[];
  quiz_questions: QuizQuestion[];
  sessions: Session[];
  session_workshops: SessionWorkshop[];
  session_workshop_private: { session_workshop_id: string; content: WorkshopPrivateContent & { hints: Hint[] } }[];
  enrollments: Enrollment[];
  teams: Team[];
  team_members: TeamMember[];
  submissions: Submission[];
  submission_versions: SubmissionVersion[];
  help_requests: HelpRequest[];
  evaluations: Evaluation[];
  evaluation_notes: { evaluation_id: string; note: string }[];
  peer_reviews: PeerReview[];
  polls: Poll[];
  poll_keys: { poll_id: string; correct_index: number | null; explanation: string }[];
  poll_answers: PollAnswer[];
  ideas: Idea[];
  action_plans: ActionPlan[];
  shared_examples: SharedExample[];
  session_events: SessionEvent[];
  files: Record<string, { name: string; mime: string; dataUrl: string }>;
}

const nowIso = () => new Date().toISOString();

export const DEMO_TRAINER_EMAIL = 'formatrice.demo@exemple.test';
export const DEMO_PASSWORD = 'demo';

const DEMO_PARTICIPANTS: { name: string; email: string; job: string }[] = [
  { name: 'Amel D. (démo)', email: 'amel.demo@exemple.test', job: 'Chargée d’insertion et de mise à disposition (ETTI)' },
  { name: 'Bastien L. (démo)', email: 'bastien.demo@exemple.test', job: 'Conseiller en insertion professionnelle (ETTI)' },
  { name: 'Chloé M. (démo)', email: 'chloe.demo@exemple.test', job: 'Responsable d’agence ETTI' },
  { name: 'David R. (démo)', email: 'david.demo@exemple.test', job: 'Assistant administratif (paie, reporting ASP)' },
  { name: 'Elena P. (démo)', email: 'elena.demo@exemple.test', job: 'Chargée de relations entreprises utilisatrices' },
  { name: 'Farid K. (démo)', email: 'farid.demo@exemple.test', job: 'Chargé de recrutement et de sourcing IAE' },
  { name: 'Gaëlle T. (démo)', email: 'gaelle.demo@exemple.test', job: 'Conseillère en insertion (levée des freins)' },
  { name: 'Hugo B. (démo)', email: 'hugo.demo@exemple.test', job: 'Chargé de développement (clauses d’insertion)' },
  { name: 'Inès S. (démo)', email: 'ines.demo@exemple.test', job: 'Assistante d’agence (contrats de mission)' },
  { name: 'Julien V. (démo)', email: 'julien.demo@exemple.test', job: 'Responsable de secteur ETT / ETTI' },
];

function buildDemoDb(): DB {
  const t0 = Date.now();
  const iso = (offsetMin: number) => new Date(t0 + offsetMin * 60_000).toISOString();

  const trainerId = newId();
  const users: DemoUser[] = [{ id: trainerId, email: DEMO_TRAINER_EMAIL, password: DEMO_PASSWORD }];
  const profiles: Profile[] = [
    { id: trainerId, email: DEMO_TRAINER_EMAIL, display_name: 'Formatrice démo', role: 'trainer', organisation: 'START EVOLUTION (démo)', created_at: iso(-60 * 24 * 10) },
  ];
  const participantIds: string[] = [];
  for (const p of DEMO_PARTICIPANTS) {
    const id = newId();
    participantIds.push(id);
    users.push({ id, email: p.email, password: DEMO_PASSWORD });
    profiles.push({ id, email: p.email, display_name: p.name, role: 'participant', organisation: 'Agence fictive', created_at: iso(-60 * 24 * 3) });
  }

  const programId = newId();
  const versionId = newId();
  const programs: Program[] = [
    { id: programId, slug: PROGRAM_META.slug, title: PROGRAM_META.title, description: PROGRAM_META.description, prerequisites: PROGRAM_META.prerequisites, audience: PROGRAM_META.audience, created_at: iso(-60 * 24 * 30) },
  ];
  const program_versions: ProgramVersion[] = [
    { id: versionId, program_id: programId, version_number: 1, status: 'published', editorial_reference: PROGRAM_META.editorial_reference, changelog: 'Version initiale (référence éditoriale septembre 2026).', rubric: RUBRIC, objectives: PROGRAM_OBJECTIVES, published_at: iso(-60 * 24 * 30), created_at: iso(-60 * 24 * 30), created_by: trainerId },
  ];
  const workshop_templates: WorkshopTemplate[] = [];
  const workshop_private: WorkshopPrivate[] = [];
  for (const w of WORKSHOPS) {
    const id = newId();
    workshop_templates.push({ id, program_version_id: versionId, position: w.position, code: w.code, title: w.title, seance: w.seance, duration_min: w.duration_min, breakdown: w.breakdown, content: w.content });
    workshop_private.push({ workshop_template_id: id, content: w.private_content });
  }
  const resources: Resource[] = RESOURCES.map((r) => ({ ...r, id: newId() }));
  const tool_cards: ToolCard[] = TOOL_CARDS.map((t) => ({ ...t, id: newId(), version: 1, updated_at: iso(-60 * 24 * 1) }));
  const quiz_questions: QuizQuestion[] = QUIZ_QUESTIONS.map((q) => ({ ...q, id: newId() }));

  // --- Session de démonstration ------------------------------------------
  const sessionId = newId();
  const session_workshops: SessionWorkshop[] = [];
  const session_workshop_private: DB['session_workshop_private'] = [];
  for (const tpl of workshop_templates) {
    const priv = workshop_private.find((p) => p.workshop_template_id === tpl.id)!;
    const snap = snapshotWorkshopContent(tpl.content, priv.content);
    const id = newId();
    const status: SessionWorkshop['status'] = tpl.position <= 3 ? 'closed' : tpl.position === 4 ? 'open' : 'locked';
    session_workshops.push({
      id,
      session_id: sessionId,
      workshop_template_id: tpl.id,
      position: tpl.position,
      code: tpl.code,
      title: tpl.title,
      seance: tpl.seance,
      duration_min: tpl.duration_min,
      breakdown: tpl.breakdown,
      content: snap.publicContent,
      status,
      hints_revealed: tpl.position <= 3 ? 3 : tpl.position === 4 ? 1 : 0,
      answer_key_revealed: tpl.position <= 2,
      opened_at: status !== 'locked' ? iso(-100 + tpl.position * 10) : null,
      closed_at: status === 'closed' ? iso(-60 + tpl.position * 10) : null,
      content_updated_at: null,
      update_note: null,
    });
    session_workshop_private.push({ session_workshop_id: id, content: snap.privateContent });
  }
  const a1 = session_workshops.find((w) => w.code === 'A1')!;
  const a2 = session_workshops.find((w) => w.code === 'A2')!;
  const def = session_workshops.find((w) => w.code === 'DEF')!;

  const sessions: Session[] = [
    {
      id: sessionId,
      trainer_id: trainerId,
      title: 'Session de démonstration — Agence Horizon (fictif)',
      program_version_id: versionId,
      program_title: PROGRAM_META.title,
      program_version_number: 1,
      status: 'open',
      join_code: 'DEMO26',
      mode: 'presentiel',
      start_date: new Date(t0).toISOString().slice(0, 10),
      end_date: null,
      meeting_link: null,
      max_participants: 10,
      allowed_tool_ids: tool_cards.map((t) => t.id),
      resources_access: 'all',
      retention: { drafts_days: null, productions_days: null, traces_days: null },
      rubric_snapshot: RUBRIC,
      peer_review_enabled: true,
      is_demo: true,
      current_session_workshop_id: a2.id,
      current_step: 1,
      timer: { status: 'running', duration_seconds: 37 * 60, started_at: iso(-12), ends_at: iso(25), remaining_seconds: null, revision: 3, label: 'Atelier 2 — production' },
      created_at: iso(-60 * 24 * 2),
      updated_at: iso(-1),
    },
  ];

  const enrollments: Enrollment[] = participantIds.map((uid, i) => ({
    id: newId(),
    session_id: sessionId,
    user_id: uid,
    invited_email: DEMO_PARTICIPANTS[i].email,
    display_name: DEMO_PARTICIPANTS[i].name,
    status: 'approved',
    positioning: {
      comfort: ((i % 4) + 1) as 1 | 2 | 3 | 4,
      used_ai_before: (['never', 'sometimes', 'often'] as const)[i % 3],
      job: DEMO_PARTICIPANTS[i].job,
      priority_task: ['Rédiger les comptes rendus d’entretien de suivi et préparer le point prescripteur', 'Préparer les visites d’entreprises utilisatrices', 'Répondre aux questions récurrentes sur les missions', 'Créer des supports d’agence pour les salariés en insertion', 'Rédiger les courriels de préparation de mission'][i % 5],
      expectations: 'Gagner en assurance sur une tâche précise et savoir ce que je dois vérifier.',
    },
    tool_access: {},
    created_at: iso(-60 * 24 * 2),
    updated_at: iso(-60 * 24),
  }));

  const teams: Team[] = [];
  const team_members: TeamMember[] = [];
  for (let i = 0; i < 5; i++) {
    const id = newId();
    teams.push({ id, session_id: sessionId, name: `Binôme ${i + 1}`, kind: 'pair', created_at: iso(-60 * 24) });
    team_members.push({ team_id: id, user_id: participantIds[i * 2] }, { team_id: id, user_id: participantIds[i * 2 + 1] });
  }

  const submissions: Submission[] = [];
  const submission_versions: SubmissionVersion[] = [];
  const evaluations: Evaluation[] = [];
  const evaluation_notes: DB['evaluation_notes'] = [];

  const mkContent = (text: string, sw: SessionWorkshop, extra: Record<string, unknown> = {}): SubmissionContent => ({
    ...emptySubmissionContent(sw.content.steps.length, sw.content.success_criteria.length),
    text,
    prompt: sw.content.prompt_starter,
    tool_used: 'Assistant autorisé (démo)',
    checklist: sw.content.steps.map(() => true),
    self_check: sw.content.success_criteria.map((_, i) => i % 2 === 0),
    acknowledged_fictional_only: true,
    extra,
  });

  // DEF : productions individuelles remises par tous
  participantIds.forEach((uid, i) => {
    const id = newId();
    const content = mkContent('Tri des huit cartes avec justification (démo).', def, {
      sort: Object.fromEntries((def.content.data_cards ?? []).map((c, j) => [c.id, j % 3 === 0 ? 'ok' : j % 3 === 1 ? 'conditions' : 'non'])),
    });
    submissions.push({ id, session_id: sessionId, session_workshop_id: def.id, owner_id: uid, team_id: null, status: i < 8 ? 'validated' : 'submitted', current_version: 1, draft: content, draft_files: [], share_consent: i === 0, updated_at: iso(-70), updated_by: uid, submitted_at: iso(-75), created_at: iso(-90) });
    submission_versions.push({ id: newId(), submission_id: id, version_number: 1, content, files: [], created_by: uid, contributors: [uid], created_at: iso(-75) });
    if (i < 8) {
      const evId = newId();
      evaluations.push({ id: evId, submission_id: id, version_number: 1, evaluator_id: trainerId, rubric: RUBRIC, scores: { c1: 2, c2: 1, c3: 1, c4: 2, c5: 1 }, total: 7, decision: 'validated', critical_error: false, feedback_public: 'Tri cohérent. Pense à préciser la finalité pour les cartes « selon conditions ».', note_private: '', created_at: iso(-65) });
      evaluation_notes.push({ evaluation_id: evId, note: 'A bien distingué pseudonymisation et anonymisation à l’oral.' });
    }
  });

  // A1 : productions de binôme, statuts variés
  const a1Statuses: Submission['status'][] = ['validated', 'needs_revision', 'submitted', 'submitted', 'draft'];
  teams.forEach((team, i) => {
    const members = team_members.filter((m) => m.team_id === team.id).map((m) => m.user_id);
    const id = newId();
    const status = a1Statuses[i];
    const text = `Compte rendu de suivi (démo, binôme ${i + 1})\n\nFaits : entretien du 21/09/2026 ; six mois d’expérience en préparation manuelle de commandes ; disponibilité annoncée à partir du lundi 28/09/2026 ; bus vers 8 h 45, trajet à vérifier ; pas de véhicule ; aucune conduite d’engin.\n\nÉléments à confirmer : horaires de la semaine suivante ; rémunération (non communiquée) ; confirmation client de la mission ; trajet jusqu’au site.\n\nActions :\n- Demander les horaires au client — conseillère — mercredi 23/09\n- Vérifier le trajet et l’arrêt de bus — personne accompagnée — jeudi 24/09 au plus tard\n- Demander la rémunération — conseillère — avant le point du jeudi 24/09 à 10 h\n\nAmbiguïtés : la mission n’est pas confirmée par le client ; l’adresse exacte du site n’est pas connue.`;
    const content = mkContent(text, a1, {
      actions: [
        { action: 'Demander les horaires de la semaine suivante au client', owner: 'Conseillère', due: '2026-09-23' },
        { action: 'Vérifier le trajet et l’arrêt de bus', owner: 'Personne accompagnée', due: '2026-09-24' },
        { action: 'Demander la rémunération', owner: 'Conseillère', due: '2026-09-24' },
      ],
      correction_v1_v2: i === 1 ? '' : 'V1 présentait la mission comme confirmée ; V2 précise « à confirmer par le client » car la transcription ne contient aucune confirmation.',
      time: { usual_minutes: String(25 + i * 5), observed_minutes: String(14 + i * 3), includes_verification: i !== 1, measured: i < 3, note: i === 0 ? 'Le plus long : relire chaque date dans la transcription.' : '' },
    });
    const versions = status === 'draft' ? 0 : i === 0 ? 2 : 1;
    submissions.push({ id, session_id: sessionId, session_workshop_id: a1.id, owner_id: members[0], team_id: team.id, status, current_version: versions, draft: content, draft_files: [], share_consent: i === 0, updated_at: iso(-30 + i), updated_by: members[i % 2], submitted_at: versions ? iso(-35 + i) : null, created_at: iso(-55) });
    for (let v = 1; v <= versions; v++) {
      submission_versions.push({ id: newId(), submission_id: id, version_number: v, content: v === 1 && versions === 2 ? { ...content, text: content.text.replace('à confirmer par le client', 'confirmée'), extra: { ...content.extra, correction_v1_v2: '' } } : content, files: [], created_by: members[0], contributors: members, created_at: iso(-50 + v * 5 + i) });
    }
    if (status === 'validated') {
      const evId = newId();
      evaluations.push({ id: evId, submission_id: id, version_number: 1, evaluator_id: trainerId, rubric: RUBRIC, scores: { c1: 1, c2: 2, c3: 1, c4: 1, c5: 1 }, total: 6, decision: 'needs_revision', critical_error: true, feedback_public: 'La V1 annonce la mission comme confirmée : ce n’est pas dans la transcription. Corrigez et remettez une V2.', note_private: '', created_at: iso(-40) });
      evaluation_notes.push({ evaluation_id: evId, note: 'Binôme rapide, a copié la trame sans relire.' });
      const ev2 = newId();
      evaluations.push({ id: ev2, submission_id: id, version_number: 2, evaluator_id: trainerId, rubric: RUBRIC, scores: { c1: 2, c2: 2, c3: 2, c4: 1, c5: 2 }, total: 9, decision: 'validated', critical_error: false, feedback_public: 'V2 fidèle, actions attribuées et datées, correction bien justifiée.', note_private: '', created_at: iso(-28) });
      evaluation_notes.push({ evaluation_id: ev2, note: '' });
    }
    if (status === 'needs_revision') {
      const evId = newId();
      evaluations.push({ id: evId, submission_id: id, version_number: 1, evaluator_id: trainerId, rubric: RUBRIC, scores: { c1: 1, c2: 1, c3: 0, c4: 1, c5: 0 }, total: 3, decision: 'needs_revision', critical_error: false, feedback_public: 'La correction V1/V2 n’est pas justifiée et la comparaison au texte d’origine manque. Reprenez le tableau d’actions avec les dates exactes.', note_private: '', created_at: iso(-20) });
      evaluation_notes.push({ evaluation_id: evId, note: 'Revoir avec eux la différence entre « fait » et « hypothèse ».' });
    }
  });

  // A2 : en cours
  teams.slice(0, 3).forEach((team, i) => {
    const members = team_members.filter((m) => m.team_id === team.id).map((m) => m.user_id);
    const id = newId();
    const content = mkContent(i === 1 ? 'FAQ de cinq réponses avec sources (démo).' : 'Brouillon en cours…', a2, {
      faq: [
        { question: 'Horaires actuels', answer: '9 h – 17 h (indicatif)', source: 'R2 — Fiche mission V2 du 18/09/2026', passage: 'Présence indicative : 9 h à 17 h.', checked: true },
        { question: 'Conduite d’engin prévue', answer: 'Non', source: 'R2', passage: 'Aucune conduite d’engin prévue dans cette mission.', checked: true },
        { question: 'Étapes d’accueil', answer: 'Six étapes (R4)', source: 'R4 — Procédure V2', passage: 'Étape 1 à Étape 6', checked: i === 1 },
        { question: 'Rémunération', answer: 'Information non disponible', source: 'R2', passage: 'Rémunération : non communiquée.', checked: i === 1 },
        { question: 'Adresse exacte du site', answer: 'Information non disponible', source: 'R2', passage: 'Informations manquantes : adresse exacte', checked: false },
      ],
    });
    const submitted = i === 1;
    submissions.push({ id, session_id: sessionId, session_workshop_id: a2.id, owner_id: members[0], team_id: team.id, status: submitted ? 'submitted' : 'draft', current_version: submitted ? 1 : 0, draft: content, draft_files: [], share_consent: false, updated_at: iso(-3 + i), updated_by: members[1], submitted_at: submitted ? iso(-4) : null, created_at: iso(-12) });
    if (submitted) submission_versions.push({ id: newId(), submission_id: id, version_number: 1, content, files: [], created_by: members[0], contributors: members, created_at: iso(-4) });
  });

  const help_requests: HelpRequest[] = [
    { id: newId(), session_id: sessionId, session_workshop_id: a2.id, requester_id: participantIds[6], team_id: teams[3].id, reason: 'L’outil documentaire refuse d’ouvrir la fiche R3 (format).', status: 'open', handled_by: null, created_at: iso(-6), resolved_at: null },
    { id: newId(), session_id: sessionId, session_workshop_id: a2.id, requester_id: participantIds[9], team_id: teams[4].id, reason: 'On ne sait pas comment citer le passage exact dans la réponse.', status: 'in_progress', handled_by: trainerId, created_at: iso(-4), resolved_at: null },
    { id: newId(), session_id: sessionId, session_workshop_id: a1.id, requester_id: participantIds[4], team_id: teams[2].id, reason: 'Le compte rendu fait 350 mots, on dépasse la limite.', status: 'resolved', handled_by: trainerId, created_at: iso(-40), resolved_at: iso(-36) },
  ];

  const pollId = newId();
  const quizPollId = newId();
  const polls: Poll[] = [
    { id: pollId, session_id: sessionId, kind: 'debrief', question: 'Quel détail l’IA a-t-elle transformé dans votre compte rendu ?', options: [], status: 'closed', created_at: iso(-30) },
    { id: quizPollId, session_id: sessionId, kind: 'quiz', question: quiz_questions[0].question, options: quiz_questions[0].options, status: 'open', created_at: iso(-2) },
  ];
  const poll_keys: DB['poll_keys'] = [{ poll_id: quizPollId, correct_index: quiz_questions[0].correct_index, explanation: quiz_questions[0].explanation }];
  const poll_answers: PollAnswer[] = [
    { id: newId(), poll_id: pollId, user_id: participantIds[0], answer_index: null, answer_text: 'Elle a écrit « mission confirmée » alors que rien ne le dit.', created_at: iso(-29) },
    { id: newId(), poll_id: pollId, user_id: participantIds[3], answer_index: null, answer_text: 'Elle a inventé un horaire de fin.', created_at: iso(-28) },
    { id: newId(), poll_id: quizPollId, user_id: participantIds[1], answer_index: 2, answer_text: '', created_at: iso(-1) },
  ];
  const ideas: Idea[] = [
    { id: newId(), session_id: sessionId, author_id: participantIds[2], text: 'Toujours demander le tableau action / responsable / échéance.', created_at: iso(-25) },
    { id: newId(), session_id: sessionId, author_id: participantIds[5], text: 'Relire la fiche V2 avant de poser la question à l’outil.', created_at: iso(-10) },
    { id: newId(), session_id: sessionId, author_id: participantIds[8], text: 'Écrire « information non disponible » plutôt que de deviner.', created_at: iso(-5) },
  ];

  const sharedId = newId();
  const a1Team1 = submissions.find((s) => s.session_workshop_id === a1.id && s.team_id === teams[0].id)!;
  const shared_examples: SharedExample[] = [
    { id: sharedId, session_id: sessionId, title: 'Exemple partagé : compte rendu fidèle (binôme 1, V2)', content: a1Team1.draft, source_submission_id: a1Team1.id, published_by: trainerId, published_at: iso(-26) },
  ];
  const peer_reviews: PeerReview[] = [
    { id: newId(), shared_example_id: sharedId, submission_id: a1Team1.id, reviewer_id: participantIds[4], strengths: 'Les trois actions sont datées et attribuées.', suggestions: 'Préciser que l’adresse exacte reste inconnue.', understood: true, created_at: iso(-20) },
  ];
  const action_plans: ActionPlan[] = [
    { id: newId(), session_id: sessionId, user_id: participantIds[0], selected_submission_ids: [a1Team1.id], tools_chosen: ['Assistant autorisé', 'Gemini Notebook'], plan: { task: 'Compte rendu après entretien de suivi', frequency: 'Deux fois par semaine', tool: 'Assistant autorisé par l’agence', data: 'Transcription relue, sans nom ni coordonnées', human_control: 'Relecture ligne à ligne, vérification des dates', usual_time: '30 min', observed_time: '', observed_time_tested: false, benefit: 'Moins d’oublis dans les actions', stop_condition: 'Si l’outil ajoute une information absente de l’entretien' }, self_assessment: 'À l’aise sur la vérification, à revoir sur la formulation du prompt.', updated_at: iso(-15) },
  ];
  const session_events: SessionEvent[] = [
    { id: newId(), session_id: sessionId, actor_id: trainerId, type: 'session.created', payload: { program_version: 1 }, created_at: iso(-60 * 24 * 2) },
    { id: newId(), session_id: sessionId, actor_id: trainerId, type: 'session.status', payload: { from: 'prepared', to: 'open' }, created_at: iso(-110) },
    { id: newId(), session_id: sessionId, actor_id: trainerId, type: 'session_workshops.status', payload: { id: a2.id, from: 'locked', to: 'open' }, created_at: iso(-15) },
    { id: newId(), session_id: sessionId, actor_id: trainerId, type: 'timer.start', payload: { seconds: 37 * 60 }, created_at: iso(-12) },
  ];

  const settings: AppSettings = {
    id: 1,
    org_name: 'START EVOLUTION',
    logo_path: null,
    privacy_notice: DEFAULT_PRIVACY_NOTICE,
    hosting_notes: DEFAULT_HOSTING_NOTES + '\n\nMODE DÉMO : aucune donnée n’est envoyée à un serveur.',
    default_retention: { drafts_days: null, productions_days: null, traces_days: null },
    updated_at: nowIso(),
  };

  return {
    users, profiles, settings, programs, program_versions, workshop_templates, workshop_private, resources, tool_cards,
    tool_card_history: [], quiz_questions, sessions, session_workshops, session_workshop_private, enrollments, teams,
    team_members, submissions, submission_versions, help_requests, evaluations, evaluation_notes, peer_reviews, polls,
    poll_keys, poll_answers, ideas, action_plans, shared_examples, session_events, files: {},
  };
}

export class DemoBackend implements Backend {
  readonly kind = 'demo' as const;
  private db: DB;
  private listeners = new Set<(table: RealtimeTable) => void>();
  private authListeners = new Set<(u: AuthUser | null) => void>();
  private currentUserId: string | null;

  constructor() {
    this.db = this.load();
    this.currentUserId = sessionStorage.getItem(USER_KEY);
    if (this.currentUserId && !this.db.users.some((u) => u.id === this.currentUserId)) this.currentUserId = null;
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        this.db = this.load();
        this.emitAll();
      }
    });
  }

  /** Comptes de démonstration, affichés sur l'écran de connexion. */
  listDemoAccounts(): { email: string; name: string; role: string }[] {
    return this.db.profiles.map((p) => ({ email: p.email, name: p.display_name, role: p.role }));
  }

  resetDemo(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.db = buildDemoDb();
    this.save();
    this.emitAll();
  }

  private load(): DB {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as DB;
    } catch {
      /* ignore */
    }
    const db = buildDemoDb();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch {
      /* ignore */
    }
    return db;
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
  }

  private emit(...tables: RealtimeTable[]): void {
    this.save();
    for (const t of tables) this.listeners.forEach((l) => l(t));
  }

  private emitAll(): void {
    const all: RealtimeTable[] = ['sessions', 'session_workshops', 'enrollments', 'teams', 'team_members', 'submissions', 'help_requests', 'evaluations', 'polls', 'poll_answers', 'ideas', 'shared_examples'];
    all.forEach((t) => this.listeners.forEach((l) => l(t)));
  }

  private uid(): string {
    if (!this.currentUserId) throw new Error('Connexion requise');
    return this.currentUserId;
  }

  private me(): Profile {
    const p = this.db.profiles.find((x) => x.id === this.uid());
    if (!p) throw new Error('Profil introuvable');
    return p;
  }

  private isTrainer(): boolean {
    return this.me().role === 'trainer';
  }

  private assertTrainer(): void {
    if (!this.isTrainer()) throw new Error('Réservé aux formateurs');
  }

  private session(id: string): Session {
    const s = this.db.sessions.find((x) => x.id === id);
    if (!s) throw new Error('Session introuvable');
    return s;
  }

  private assertSessionTrainer(sessionId: string): Session {
    const s = this.session(sessionId);
    if (s.trainer_id !== this.uid()) throw new Error('Réservé au formateur de la session');
    return s;
  }

  private isMember(sessionId: string): boolean {
    return this.db.enrollments.some((e) => e.session_id === sessionId && e.user_id === this.currentUserId && e.status === 'approved');
  }

  private isSessionTrainer(sessionId: string): boolean {
    return this.db.sessions.some((s) => s.id === sessionId && s.trainer_id === this.currentUserId);
  }

  private assertAccess(sessionId: string): void {
    if (!this.isSessionTrainer(sessionId) && !this.isMember(sessionId)) throw new Error('Accès refusé à cette session');
  }

  private isTeammate(teamId: string | null): boolean {
    return !!teamId && this.db.team_members.some((m) => m.team_id === teamId && m.user_id === this.currentUserId);
  }

  private canRead(sub: Submission): boolean {
    return sub.owner_id === this.currentUserId || this.isTeammate(sub.team_id) || this.isSessionTrainer(sub.session_id);
  }

  private canEdit(sub: Submission): boolean {
    return sub.owner_id === this.currentUserId || this.isTeammate(sub.team_id);
  }

  private log(sessionId: string, type: string, payload: Record<string, unknown> = {}): void {
    this.db.session_events.unshift({ id: newId(), session_id: sessionId, actor_id: this.currentUserId, type, payload, created_at: nowIso() });
  }

  // --- Authentification ----------------------------------------------------
  async getAuthUser(): Promise<AuthUser | null> {
    const u = this.db.users.find((x) => x.id === this.currentUserId);
    return u ? { id: u.id, email: u.email } : null;
  }

  onAuthChange(cb: (user: AuthUser | null) => void): () => void {
    this.authListeners.add(cb);
    return () => this.authListeners.delete(cb);
  }

  private setUser(id: string | null): void {
    this.currentUserId = id;
    if (id) sessionStorage.setItem(USER_KEY, id);
    else sessionStorage.removeItem(USER_KEY);
    const u = this.db.users.find((x) => x.id === id);
    this.authListeners.forEach((l) => l(u ? { id: u.id, email: u.email } : null));
  }

  async signIn(email: string, password: string): Promise<void> {
    const u = this.db.users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase());
    if (!u || u.password !== password) throw new Error('Identifiants inconnus (mode démo : mot de passe « demo »)');
    this.setUser(u.id);
  }

  async signUp(email: string, password: string, displayName: string): Promise<{ needsConfirmation: boolean }> {
    const e = email.trim().toLowerCase();
    if (this.db.users.some((x) => x.email.toLowerCase() === e)) throw new Error('Un compte existe déjà avec cet e-mail');
    const id = newId();
    this.db.users.push({ id, email: e, password });
    this.db.profiles.push({ id, email: e, display_name: displayName || e.split('@')[0], role: 'participant', organisation: null, created_at: nowIso() });
    this.save();
    this.setUser(id);
    return { needsConfirmation: false };
  }

  async signOut(): Promise<void> {
    this.setUser(null);
  }

  async getMyProfile(): Promise<Profile | null> {
    return this.db.profiles.find((p) => p.id === this.currentUserId) ?? null;
  }

  async updateMyProfile(patch: Partial<Pick<Profile, 'display_name' | 'organisation'>>): Promise<Profile> {
    const p = this.me();
    Object.assign(p, patch);
    this.save();
    return p;
  }

  async setUserRole(email: string, role: 'trainer' | 'participant'): Promise<void> {
    this.assertTrainer();
    const p = this.db.profiles.find((x) => x.email.toLowerCase() === email.trim().toLowerCase());
    if (!p) throw new Error('Aucun compte avec cet e-mail');
    p.role = role;
    this.save();
  }

  async listTrainers(): Promise<Profile[]> {
    return this.db.profiles.filter((p) => p.role === 'trainer');
  }

  // --- Paramètres ----------------------------------------------------------
  async getSettings(): Promise<AppSettings> {
    return this.db.settings;
  }

  async updateSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
    this.assertTrainer();
    this.db.settings = { ...this.db.settings, ...patch, id: 1, updated_at: nowIso() };
    this.save();
    return this.db.settings;
  }

  async uploadLogo(file: File): Promise<string> {
    this.assertTrainer();
    if (file.size > 2 * 1024 * 1024) throw new Error('Logo trop volumineux (2 Mo maximum)');
    const dataUrl = await readAsDataUrl(file);
    this.db.files['branding/logo'] = { name: file.name, mime: file.type, dataUrl };
    await this.updateSettings({ logo_path: 'branding/logo' });
    return 'branding/logo';
  }

  async getLogoUrl(path: string | null): Promise<string | null> {
    if (!path) return null;
    return this.db.files[path]?.dataUrl ?? null;
  }

  // --- Programme ------------------------------------------------------------
  async listPrograms(): Promise<Program[]> {
    this.assertTrainer();
    return this.db.programs;
  }

  async listProgramVersions(programId: string): Promise<ProgramVersion[]> {
    this.assertTrainer();
    return this.db.program_versions.filter((v) => v.program_id === programId).sort((a, b) => b.version_number - a.version_number);
  }

  async getProgramVersion(versionId: string) {
    this.assertTrainer();
    const version = this.db.program_versions.find((v) => v.id === versionId);
    if (!version) throw new Error('Version introuvable');
    const workshops = this.db.workshop_templates.filter((w) => w.program_version_id === versionId).sort((a, b) => a.position - b.position);
    const ids = new Set(workshops.map((w) => w.id));
    const privates = this.db.workshop_private.filter((p) => ids.has(p.workshop_template_id));
    return { version, workshops, privates };
  }

  async createDraftVersion(programId: string): Promise<string> {
    this.assertTrainer();
    if (this.db.program_versions.some((v) => v.program_id === programId && v.status === 'draft')) throw new Error('Un brouillon existe déjà pour ce programme');
    const src = this.db.program_versions.filter((v) => v.program_id === programId).sort((a, b) => b.version_number - a.version_number)[0];
    const id = newId();
    this.db.program_versions.push({ id, program_id: programId, version_number: (src?.version_number ?? 0) + 1, status: 'draft', editorial_reference: src?.editorial_reference ?? '', changelog: '', rubric: src?.rubric ?? RUBRIC, objectives: src?.objectives ?? [], published_at: null, created_at: nowIso(), created_by: this.uid() });
    if (src) {
      for (const t of this.db.workshop_templates.filter((w) => w.program_version_id === src.id)) {
        const nid = newId();
        this.db.workshop_templates.push({ ...structuredClone(t), id: nid, program_version_id: id });
        const p = this.db.workshop_private.find((x) => x.workshop_template_id === t.id);
        this.db.workshop_private.push({ workshop_template_id: nid, content: structuredClone(p?.content ?? { answer_key: '', trainer_notes: '' }) });
      }
    }
    this.save();
    return id;
  }

  async updateProgramVersion(versionId: string, patch: Partial<ProgramVersion>): Promise<void> {
    this.assertTrainer();
    const v = this.db.program_versions.find((x) => x.id === versionId);
    if (!v) throw new Error('Version introuvable');
    Object.assign(v, patch);
    this.save();
  }

  async updateWorkshopTemplate(id: string, patch: Partial<WorkshopTemplate>): Promise<void> {
    this.assertTrainer();
    const w = this.db.workshop_templates.find((x) => x.id === id);
    if (!w) throw new Error('Fiche introuvable');
    Object.assign(w, patch);
    this.save();
  }

  async updateWorkshopPrivate(templateId: string, content: WorkshopPrivateContent): Promise<void> {
    this.assertTrainer();
    const p = this.db.workshop_private.find((x) => x.workshop_template_id === templateId);
    if (p) p.content = content;
    else this.db.workshop_private.push({ workshop_template_id: templateId, content });
    this.save();
  }

  async publishVersion(versionId: string, changelog: string): Promise<void> {
    this.assertTrainer();
    const v = this.db.program_versions.find((x) => x.id === versionId);
    if (!v || v.status !== 'draft') throw new Error('Seul un brouillon peut être publié');
    for (const w of this.db.workshop_templates.filter((x) => x.program_version_id === versionId)) {
      const sum = w.breakdown.reduce((s, b) => s + b.minutes, 0);
      if (sum !== w.duration_min) throw new Error(`Répartition incohérente pour ${w.code} (${w.duration_min} min annoncées, ${sum} min réparties)`);
    }
    this.db.program_versions.filter((x) => x.program_id === v.program_id && x.status === 'published').forEach((x) => (x.status = 'archived'));
    v.status = 'published';
    v.published_at = nowIso();
    v.changelog = changelog || v.changelog;
    this.save();
  }

  // --- Ressources, outils, quiz ---------------------------------------------
  async listResources(): Promise<Resource[]> {
    const trainer = this.currentUserId ? this.isTrainer() : false;
    return this.db.resources.filter((r) => !r.trainer_only || trainer).sort((a, b) => a.code.localeCompare(b.code));
  }

  async listToolCards(): Promise<ToolCard[]> {
    return [...this.db.tool_cards].sort((a, b) => a.family.localeCompare(b.family) || Number(a.is_fallback) - Number(b.is_fallback) || a.name.localeCompare(b.name));
  }

  async createToolCard(input: Omit<ToolCard, 'id' | 'version' | 'updated_at'>): Promise<ToolCard> {
    this.assertTrainer();
    const card: ToolCard = { ...input, id: newId(), version: 1, updated_at: nowIso() };
    this.db.tool_cards.push(card);
    this.save();
    return card;
  }

  async updateToolCard(id: string, patch: Partial<ToolCard>): Promise<ToolCard> {
    this.assertTrainer();
    const c = this.db.tool_cards.find((x) => x.id === id);
    if (!c) throw new Error('Fiche outil introuvable');
    this.db.tool_card_history.push({ id: newId(), tool_card_id: id, version: c.version, snapshot: structuredClone(c), changed_by: this.uid(), changed_at: nowIso() });
    const { id: _i, version: _v, updated_at: _u, ...rest } = patch;
    Object.assign(c, rest, { version: c.version + 1, updated_at: nowIso() });
    this.save();
    return c;
  }

  async listToolCardHistory(id: string): Promise<ToolCardHistory[]> {
    this.assertTrainer();
    return this.db.tool_card_history.filter((h) => h.tool_card_id === id).sort((a, b) => b.version - a.version);
  }

  async listQuizQuestions(): Promise<QuizQuestion[]> {
    this.assertTrainer();
    return [...this.db.quiz_questions].sort((a, b) => a.position - b.position);
  }

  // --- Sessions -------------------------------------------------------------
  async listMySessions(): Promise<Session[]> {
    const me = this.uid();
    return this.db.sessions
      .filter((s) => s.trainer_id === me || this.db.enrollments.some((e) => e.session_id === s.id && e.user_id === me && e.status === 'approved'))
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  async getSession(id: string): Promise<Session | null> {
    const s = this.db.sessions.find((x) => x.id === id);
    if (!s) return null;
    if (s.trainer_id !== this.currentUserId && !this.isMember(id)) return null;
    return s;
  }

  async createSession(input: { program_version_id: string; title: string; mode: Session['mode']; start_date: string | null; end_date: string | null; max_participants: number; is_demo?: boolean }): Promise<string> {
    this.assertTrainer();
    const version = this.db.program_versions.find((v) => v.id === input.program_version_id);
    if (!version || version.status !== 'published') throw new Error('La version du programme doit être publiée');
    const program = this.db.programs.find((p) => p.id === version.program_id)!;
    const id = newId();
    this.db.sessions.push({
      id, trainer_id: this.uid(), title: input.title, program_version_id: version.id, program_title: program.title, program_version_number: version.version_number,
      status: 'draft', join_code: joinCode(), mode: input.mode, start_date: input.start_date, end_date: input.end_date, meeting_link: null,
      max_participants: input.max_participants, allowed_tool_ids: this.db.tool_cards.map((t) => t.id), resources_access: 'all',
      retention: { ...this.db.settings.default_retention }, rubric_snapshot: structuredClone(version.rubric), peer_review_enabled: false,
      is_demo: input.is_demo ?? false, current_session_workshop_id: null, current_step: 0, timer: { ...IDLE_TIMER }, created_at: nowIso(), updated_at: nowIso(),
    });
    for (const tpl of this.db.workshop_templates.filter((w) => w.program_version_id === version.id).sort((a, b) => a.position - b.position)) {
      const priv = this.db.workshop_private.find((p) => p.workshop_template_id === tpl.id)?.content ?? { answer_key: '', trainer_notes: '' };
      const snap = snapshotWorkshopContent(structuredClone(tpl.content), structuredClone(priv));
      const swId = newId();
      this.db.session_workshops.push({ id: swId, session_id: id, workshop_template_id: tpl.id, position: tpl.position, code: tpl.code, title: tpl.title, seance: tpl.seance, duration_min: tpl.duration_min, breakdown: structuredClone(tpl.breakdown), content: snap.publicContent, status: 'locked', hints_revealed: 0, answer_key_revealed: false, opened_at: null, closed_at: null, content_updated_at: null, update_note: null });
      this.db.session_workshop_private.push({ session_workshop_id: swId, content: snap.privateContent });
    }
    this.log(id, 'session.created', { program_version: version.version_number });
    this.emit('sessions');
    return id;
  }

  async duplicateSession(id: string, title: string, startDate: string | null, endDate: string | null): Promise<string> {
    const src = this.assertSessionTrainer(id);
    const nid = newId();
    this.db.sessions.push({ ...structuredClone(src), id: nid, title, status: 'draft', join_code: joinCode(), start_date: startDate, end_date: endDate, meeting_link: null, current_session_workshop_id: null, current_step: 0, timer: { ...IDLE_TIMER }, created_at: nowIso(), updated_at: nowIso() });
    for (const sw of this.db.session_workshops.filter((w) => w.session_id === id)) {
      const swId = newId();
      this.db.session_workshops.push({ ...structuredClone(sw), id: swId, session_id: nid, status: 'locked', hints_revealed: 0, answer_key_revealed: false, opened_at: null, closed_at: null });
      const p = this.db.session_workshop_private.find((x) => x.session_workshop_id === sw.id);
      this.db.session_workshop_private.push({ session_workshop_id: swId, content: structuredClone(p?.content ?? { answer_key: '', trainer_notes: '', hints: [] }) });
    }
    this.log(nid, 'session.duplicated', { from: id });
    this.emit('sessions');
    return nid;
  }

  async updateSession(id: string, patch: Partial<Session>): Promise<Session> {
    const s = this.assertSessionTrainer(id);
    const before = s.status;
    Object.assign(s, patch, { updated_at: nowIso() });
    if (patch.status && patch.status !== before) this.log(id, 'session.status', { from: before, to: patch.status });
    this.emit('sessions');
    return s;
  }

  async deleteSession(id: string): Promise<void> {
    this.assertSessionTrainer(id);
    const swIds = new Set(this.db.session_workshops.filter((w) => w.session_id === id).map((w) => w.id));
    const subIds = new Set(this.db.submissions.filter((s) => s.session_id === id).map((s) => s.id));
    const teamIds = new Set(this.db.teams.filter((t) => t.session_id === id).map((t) => t.id));
    const pollIds = new Set(this.db.polls.filter((p) => p.session_id === id).map((p) => p.id));
    const evIds = new Set(this.db.evaluations.filter((e) => subIds.has(e.submission_id)).map((e) => e.id));
    this.db.sessions = this.db.sessions.filter((s) => s.id !== id);
    this.db.session_workshops = this.db.session_workshops.filter((w) => !swIds.has(w.id));
    this.db.session_workshop_private = this.db.session_workshop_private.filter((p) => !swIds.has(p.session_workshop_id));
    this.db.enrollments = this.db.enrollments.filter((e) => e.session_id !== id);
    this.db.teams = this.db.teams.filter((t) => !teamIds.has(t.id));
    this.db.team_members = this.db.team_members.filter((m) => !teamIds.has(m.team_id));
    this.db.submissions = this.db.submissions.filter((s) => !subIds.has(s.id));
    this.db.submission_versions = this.db.submission_versions.filter((v) => !subIds.has(v.submission_id));
    this.db.evaluations = this.db.evaluations.filter((e) => !evIds.has(e.id));
    this.db.evaluation_notes = this.db.evaluation_notes.filter((n) => !evIds.has(n.evaluation_id));
    this.db.help_requests = this.db.help_requests.filter((h) => h.session_id !== id);
    this.db.polls = this.db.polls.filter((p) => !pollIds.has(p.id));
    this.db.poll_keys = this.db.poll_keys.filter((p) => !pollIds.has(p.poll_id));
    this.db.poll_answers = this.db.poll_answers.filter((a) => !pollIds.has(a.poll_id));
    this.db.ideas = this.db.ideas.filter((i) => i.session_id !== id);
    this.db.action_plans = this.db.action_plans.filter((a) => a.session_id !== id);
    const exIds = new Set(this.db.shared_examples.filter((x) => x.session_id === id).map((x) => x.id));
    this.db.shared_examples = this.db.shared_examples.filter((x) => !exIds.has(x.id));
    this.db.peer_reviews = this.db.peer_reviews.filter((r) => !exIds.has(r.shared_example_id));
    this.db.session_events = this.db.session_events.filter((e) => e.session_id !== id);
    for (const k of Object.keys(this.db.files)) if (k.startsWith(`${id}/`)) delete this.db.files[k];
    this.emit('sessions');
  }

  async listSessionWorkshops(sessionId: string): Promise<SessionWorkshop[]> {
    this.assertAccess(sessionId);
    return this.db.session_workshops.filter((w) => w.session_id === sessionId).sort((a, b) => a.position - b.position);
  }

  async updateSessionWorkshopState(id: string, patch: Partial<SessionWorkshop>): Promise<void> {
    const sw = this.db.session_workshops.find((w) => w.id === id);
    if (!sw) throw new Error('Atelier introuvable');
    this.assertSessionTrainer(sw.session_id);
    const before = sw.status;
    Object.assign(sw, patch);
    if (patch.status === 'open') sw.opened_at = nowIso();
    if (patch.status === 'closed') sw.closed_at = nowIso();
    if (patch.status && patch.status !== before) this.log(sw.session_id, 'session_workshops.status', { id, from: before, to: patch.status });
    this.emit('session_workshops');
  }

  async updateSessionWorkshopContent(id: string, content: SessionWorkshop['content'], breakdown: SessionWorkshop['breakdown'], durationMin: number, note: string): Promise<void> {
    const sw = this.db.session_workshops.find((w) => w.id === id);
    if (!sw) throw new Error('Atelier introuvable');
    this.assertSessionTrainer(sw.session_id);
    if (!note.trim()) throw new Error('Une note de mise à jour est obligatoire pour annoncer le changement au groupe');
    const { hints: _h, ...rest } = content as SessionWorkshop['content'] & { hints?: unknown };
    sw.content = rest;
    sw.breakdown = breakdown;
    sw.duration_min = durationMin;
    sw.content_updated_at = nowIso();
    sw.update_note = note;
    this.log(sw.session_id, 'workshop.content_updated', { session_workshop_id: id, note });
    this.emit('session_workshops');
  }

  async getWorkshopPrivate(sessionWorkshopId: string): Promise<WorkshopPrivateContent | null> {
    const sw = this.db.session_workshops.find((w) => w.id === sessionWorkshopId);
    if (!sw) return null;
    const allowed = this.isSessionTrainer(sw.session_id) || (sw.answer_key_revealed && this.isMember(sw.session_id));
    if (!allowed) return null;
    const p = this.db.session_workshop_private.find((x) => x.session_workshop_id === sessionWorkshopId);
    if (!p) return null;
    const { hints: _h, ...rest } = p.content;
    return rest;
  }

  async getRevealedHints(sessionWorkshopId: string): Promise<Hint[]> {
    const sw = this.db.session_workshops.find((w) => w.id === sessionWorkshopId);
    if (!sw) return [];
    const level = this.isSessionTrainer(sw.session_id) ? 3 : this.isMember(sw.session_id) ? sw.hints_revealed : -1;
    if (level < 0) throw new Error('Accès refusé');
    const p = this.db.session_workshop_private.find((x) => x.session_workshop_id === sessionWorkshopId);
    return hintsVisible(p?.content.hints ?? [], level);
  }

  async timerControl(sessionId: string, action: 'start' | 'pause' | 'resume' | 'add' | 'finish' | 'reset', seconds?: number, label?: string): Promise<TimerState> {
    const s = this.assertSessionTrainer(sessionId);
    s.timer = applyTimerAction(s.timer, action, seconds, label);
    s.updated_at = nowIso();
    this.log(sessionId, `timer.${action}`, { seconds: seconds ?? null });
    this.emit('sessions');
    return s.timer;
  }

  async setCurrentWorkshop(sessionId: string, sessionWorkshopId: string | null, step: number): Promise<void> {
    const s = this.assertSessionTrainer(sessionId);
    s.current_session_workshop_id = sessionWorkshopId;
    s.current_step = step;
    s.updated_at = nowIso();
    this.emit('sessions');
  }

  // --- Inscriptions ---------------------------------------------------------
  async listEnrollments(sessionId: string): Promise<Enrollment[]> {
    if (this.isSessionTrainer(sessionId)) return this.db.enrollments.filter((e) => e.session_id === sessionId).sort((a, b) => a.display_name.localeCompare(b.display_name));
    return this.db.enrollments.filter((e) => e.session_id === sessionId && e.user_id === this.currentUserId);
  }

  async getMyEnrollment(sessionId: string): Promise<Enrollment | null> {
    return this.db.enrollments.find((e) => e.session_id === sessionId && e.user_id === this.currentUserId) ?? null;
  }

  async requestJoin(code: string) {
    const me = this.me();
    const s = this.db.sessions.find((x) => x.join_code === code.trim().toUpperCase() && ['prepared', 'open', 'suspended'].includes(x.status));
    if (!s) throw new Error('Code inconnu ou session non ouverte aux inscriptions');
    if (s.trainer_id === me.id) throw new Error('Vous animez cette session');
    const existing = this.db.enrollments.find((e) => e.session_id === s.id && e.user_id === me.id);
    if (existing) return { status: existing.status, session_id: s.id, title: s.title };
    const invited = this.db.enrollments.find((e) => e.session_id === s.id && !e.user_id && (e.invited_email ?? '').toLowerCase() === me.email.toLowerCase());
    if (invited) {
      invited.user_id = me.id;
      invited.status = 'approved';
      if (!invited.display_name) invited.display_name = me.display_name;
      invited.updated_at = nowIso();
      this.log(s.id, 'enrollment.joined', { user_id: me.id, via: 'invitation' });
      this.emit('enrollments');
      return { status: 'approved' as const, session_id: s.id, title: s.title };
    }
    const approved = this.db.enrollments.filter((e) => e.session_id === s.id && e.status === 'approved').length;
    this.db.enrollments.push({ id: newId(), session_id: s.id, user_id: me.id, invited_email: null, display_name: me.display_name, status: 'pending', positioning: null, tool_access: {}, created_at: nowIso(), updated_at: nowIso() });
    this.log(s.id, 'enrollment.requested', { user_id: me.id });
    this.emit('enrollments');
    return { status: 'pending' as const, session_id: s.id, title: s.title, full: approved >= s.max_participants };
  }

  async inviteByEmail(sessionId: string, rows: { email: string; display_name: string }[]) {
    this.assertSessionTrainer(sessionId);
    const known = new Set(this.db.enrollments.filter((e) => e.session_id === sessionId).map((e) => (e.invited_email ?? '').toLowerCase()).filter(Boolean));
    const duplicates: string[] = [];
    let added = 0;
    for (const r of rows) {
      const email = r.email.trim().toLowerCase();
      if (!email) continue;
      if (known.has(email)) {
        duplicates.push(email);
        continue;
      }
      known.add(email);
      this.db.enrollments.push({ id: newId(), session_id: sessionId, user_id: null, invited_email: email, display_name: r.display_name.trim(), status: 'invited', positioning: null, tool_access: {}, created_at: nowIso(), updated_at: nowIso() });
      added++;
    }
    this.emit('enrollments');
    return { added, duplicates };
  }

  async updateEnrollment(id: string, patch: Partial<Enrollment>): Promise<Enrollment> {
    const e = this.db.enrollments.find((x) => x.id === id);
    if (!e) throw new Error('Inscription introuvable');
    if (!this.isSessionTrainer(e.session_id)) {
      if (e.user_id !== this.currentUserId) throw new Error('Accès refusé');
      if (patch.status !== undefined && patch.status !== e.status) throw new Error('Modification refusée : seuls le positionnement et l’accès aux outils sont modifiables');
    }
    Object.assign(e, patch, { updated_at: nowIso() });
    this.emit('enrollments');
    return e;
  }

  async deleteEnrollment(id: string): Promise<void> {
    const e = this.db.enrollments.find((x) => x.id === id);
    if (!e) return;
    this.assertSessionTrainer(e.session_id);
    this.db.enrollments = this.db.enrollments.filter((x) => x.id !== id);
    this.emit('enrollments');
  }

  async listTeams(sessionId: string) {
    this.assertAccess(sessionId);
    const teams = this.db.teams.filter((t) => t.session_id === sessionId).sort((a, b) => a.name.localeCompare(b.name));
    const ids = new Set(teams.map((t) => t.id));
    return { teams, members: this.db.team_members.filter((m) => ids.has(m.team_id)) };
  }

  async saveTeams(sessionId: string, teams: { id?: string; name: string; kind: Team['kind']; user_ids: string[] }[]) {
    this.assertSessionTrainer(sessionId);
    const keep = new Set(teams.map((t) => t.id).filter(Boolean));
    const removed = this.db.teams.filter((t) => t.session_id === sessionId && !keep.has(t.id)).map((t) => t.id);
    this.db.teams = this.db.teams.filter((t) => !removed.includes(t.id));
    this.db.team_members = this.db.team_members.filter((m) => !removed.includes(m.team_id));
    for (const t of teams) {
      let id = t.id;
      if (id) {
        const ex = this.db.teams.find((x) => x.id === id)!;
        ex.name = t.name;
        ex.kind = t.kind;
        this.db.team_members = this.db.team_members.filter((m) => m.team_id !== id);
      } else {
        id = newId();
        this.db.teams.push({ id, session_id: sessionId, name: t.name, kind: t.kind, created_at: nowIso() });
      }
      t.user_ids.forEach((user_id) => this.db.team_members.push({ team_id: id!, user_id }));
    }
    this.emit('teams', 'team_members');
  }

  async listSessionProfiles(sessionId: string): Promise<Profile[]> {
    this.assertAccess(sessionId);
    const s = this.session(sessionId);
    const ids = new Set(this.db.enrollments.filter((e) => e.session_id === sessionId && e.user_id).map((e) => e.user_id as string));
    ids.add(s.trainer_id);
    return this.db.profiles.filter((p) => ids.has(p.id));
  }

  // --- Productions ----------------------------------------------------------
  async listSubmissions(sessionId: string): Promise<Submission[]> {
    this.assertAccess(sessionId);
    return this.db.submissions.filter((s) => s.session_id === sessionId && this.canRead(s)).sort((a, b) => b.updated_at.localeCompare(a.updated_at));
  }

  async getOrCreateSubmission(sessionId: string, sessionWorkshopId: string, teamId: string | null, initial: SubmissionContent): Promise<Submission> {
    const me = this.uid();
    if (!this.isMember(sessionId)) throw new Error('Vous n’êtes pas inscrit à cette session');
    const found = this.db.submissions.find((s) => s.session_workshop_id === sessionWorkshopId && (teamId ? s.team_id === teamId : s.owner_id === me && !s.team_id));
    if (found) return found;
    const sw = this.db.session_workshops.find((w) => w.id === sessionWorkshopId);
    const session = this.session(sessionId);
    if (!sw || sw.status === 'locked') throw new Error('Cet atelier n’est pas encore ouvert');
    if (session.status !== 'open') throw new Error('La session n’est pas ouverte');
    if (teamId && !this.isTeammate(teamId)) throw new Error('Vous ne faites pas partie de ce binôme');
    const sub: Submission = { id: newId(), session_id: sessionId, session_workshop_id: sessionWorkshopId, owner_id: me, team_id: teamId, status: 'draft', current_version: 0, draft: initial, draft_files: [], share_consent: false, updated_at: nowIso(), updated_by: me, submitted_at: null, created_at: nowIso() };
    this.db.submissions.push(sub);
    this.log(sessionId, 'submissions.created', { id: sub.id, status: 'draft' });
    this.emit('submissions');
    return sub;
  }

  async saveDraft(id: string, draft: SubmissionContent, draftFiles: FileRef[]): Promise<Submission> {
    const sub = this.db.submissions.find((s) => s.id === id);
    if (!sub || !this.canEdit(sub)) throw new Error('Production introuvable ou non autorisée');
    if (sub.status === 'validated') throw new Error('Production validée : créez une nouvelle version après retour du formateur');
    sub.draft = draft;
    sub.draft_files = draftFiles;
    sub.updated_at = nowIso();
    sub.updated_by = this.uid();
    this.emit('submissions');
    return sub;
  }

  async setShareConsent(id: string, consent: boolean): Promise<void> {
    const sub = this.db.submissions.find((s) => s.id === id);
    if (!sub || !this.canEdit(sub)) throw new Error('Non autorisé');
    sub.share_consent = consent;
    this.emit('submissions');
  }

  async submit(id: string): Promise<number> {
    const sub = this.db.submissions.find((s) => s.id === id);
    if (!sub || !this.canEdit(sub)) throw new Error('Production introuvable ou non autorisée');
    const session = this.session(sub.session_id);
    const sw = this.db.session_workshops.find((w) => w.id === sub.session_workshop_id)!;
    if (session.status !== 'open') throw new Error('La session n’est pas ouverte');
    if (sw.status === 'locked') throw new Error('Cet atelier n’est pas encore ouvert');
    if (sub.status === 'validated') throw new Error('Production déjà validée');
    if (!sub.draft.acknowledged_fictional_only) throw new Error('Confirmez d’abord que la production ne contient aucune donnée réelle');
    const next = sub.current_version + 1;
    const contributors = sub.team_id ? this.db.team_members.filter((m) => m.team_id === sub.team_id).map((m) => m.user_id) : [sub.owner_id];
    this.db.submission_versions.push({ id: newId(), submission_id: id, version_number: next, content: structuredClone(sub.draft), files: structuredClone(sub.draft_files), created_by: this.uid(), contributors, created_at: nowIso() });
    const before = sub.status;
    sub.status = 'submitted';
    sub.current_version = next;
    sub.submitted_at = nowIso();
    sub.updated_at = nowIso();
    this.log(sub.session_id, 'submissions.status', { id, from: before, to: 'submitted' });
    this.log(sub.session_id, 'submission.submitted', { submission_id: id, version: next });
    this.emit('submissions');
    return next;
  }

  async listVersions(submissionId: string): Promise<SubmissionVersion[]> {
    const sub = this.db.submissions.find((s) => s.id === submissionId);
    if (!sub || !this.canRead(sub)) return [];
    return this.db.submission_versions.filter((v) => v.submission_id === submissionId).sort((a, b) => a.version_number - b.version_number);
  }

  async uploadSubmissionFile(sessionId: string, submissionId: string, file: File): Promise<FileRef> {
    const err = validateFile(file);
    if (err) throw new Error(err);
    const sub = this.db.submissions.find((s) => s.id === submissionId);
    if (!sub || !this.canEdit(sub) || sub.session_id !== sessionId) throw new Error('Non autorisé');
    if (file.size > 1.5 * 1024 * 1024) throw new Error('Mode démo : fichiers limités à 1,5 Mo (stockage local du navigateur)');
    const path = `${sessionId}/${submissionId}/${Date.now()}_${safeFileName(file.name)}`;
    this.db.files[path] = { name: file.name, mime: file.type, dataUrl: await readAsDataUrl(file) };
    this.save();
    return { path, name: file.name, size: file.size, mime: file.type, uploaded_at: nowIso() };
  }

  async deleteSubmissionFile(path: string): Promise<void> {
    const subId = path.split('/')[1];
    const sub = this.db.submissions.find((s) => s.id === subId);
    if (!sub || !(this.canEdit(sub) || this.isSessionTrainer(sub.session_id))) throw new Error('Non autorisé');
    delete this.db.files[path];
    this.save();
  }

  async getFileUrl(path: string): Promise<string | null> {
    const subId = path.split('/')[1];
    const sub = this.db.submissions.find((s) => s.id === subId);
    if (!sub || !this.canRead(sub)) return null;
    return this.db.files[path]?.dataUrl ?? null;
  }

  async deleteSubmission(id: string): Promise<void> {
    const sub = this.db.submissions.find((s) => s.id === id);
    if (!sub) return;
    this.assertSessionTrainer(sub.session_id);
    const evIds = new Set(this.db.evaluations.filter((e) => e.submission_id === id).map((e) => e.id));
    this.db.submissions = this.db.submissions.filter((s) => s.id !== id);
    this.db.submission_versions = this.db.submission_versions.filter((v) => v.submission_id !== id);
    this.db.evaluations = this.db.evaluations.filter((e) => !evIds.has(e.id));
    this.db.evaluation_notes = this.db.evaluation_notes.filter((n) => !evIds.has(n.evaluation_id));
    for (const k of Object.keys(this.db.files)) if (k.split('/')[1] === id) delete this.db.files[k];
    this.emit('submissions', 'evaluations');
  }

  // --- Aide, évaluation, pairs ----------------------------------------------
  async listHelpRequests(sessionId: string): Promise<HelpRequest[]> {
    this.assertAccess(sessionId);
    return this.db.help_requests
      .filter((h) => h.session_id === sessionId && (this.isSessionTrainer(sessionId) || h.requester_id === this.currentUserId || this.isTeammate(h.team_id)))
      .sort((a, b) => a.created_at.localeCompare(b.created_at));
  }

  async createHelpRequest(sessionId: string, sessionWorkshopId: string | null, teamId: string | null, reason: string): Promise<HelpRequest> {
    if (!this.isMember(sessionId)) throw new Error('Vous n’êtes pas inscrit à cette session');
    const h: HelpRequest = { id: newId(), session_id: sessionId, session_workshop_id: sessionWorkshopId, requester_id: this.uid(), team_id: teamId, reason, status: 'open', handled_by: null, created_at: nowIso(), resolved_at: null };
    this.db.help_requests.push(h);
    this.log(sessionId, 'help_requests.created', { id: h.id, status: 'open' });
    this.emit('help_requests');
    return h;
  }

  async updateHelpRequest(id: string, status: HelpRequest['status']): Promise<void> {
    const h = this.db.help_requests.find((x) => x.id === id);
    if (!h) throw new Error('Demande introuvable');
    if (!this.isSessionTrainer(h.session_id) && h.requester_id !== this.currentUserId) throw new Error('Non autorisé');
    const before = h.status;
    h.status = status;
    if (status === 'in_progress') h.handled_by = this.uid();
    if (status === 'resolved') h.resolved_at = nowIso();
    this.log(h.session_id, 'help_requests.status', { id, from: before, to: status });
    this.emit('help_requests');
  }

  async listEvaluations(submissionIds: string[]): Promise<Evaluation[]> {
    const ids = new Set(submissionIds);
    return this.db.evaluations
      .filter((e) => ids.has(e.submission_id))
      .filter((e) => {
        const sub = this.db.submissions.find((s) => s.id === e.submission_id);
        return sub && this.canRead(sub);
      })
      .map((e) => ({ ...e, note_private: '' }))
      .sort((a, b) => a.created_at.localeCompare(b.created_at));
  }

  async recordEvaluation(submissionId: string, scores: Record<string, number>, decision: Evaluation['decision'], criticalError: boolean, feedbackPublic: string, notePrivate: string): Promise<void> {
    const sub = this.db.submissions.find((s) => s.id === submissionId);
    if (!sub) throw new Error('Production introuvable');
    this.assertSessionTrainer(sub.session_id);
    if (sub.current_version === 0) throw new Error('Aucune version remise');
    if (decision === 'validated' && criticalError) throw new Error('Une erreur critique non corrigée empêche la validation');
    const rubric = this.session(sub.session_id).rubric_snapshot;
    let total = 0;
    for (const c of rubric.criteria) {
      const v = scores[c.key] ?? 0;
      if (v < 0 || v > c.max) throw new Error(`Score hors barème pour ${c.label}`);
      total += v;
    }
    const id = newId();
    this.db.evaluations.push({ id, submission_id: submissionId, version_number: sub.current_version, evaluator_id: this.uid(), rubric, scores, total, decision, critical_error: criticalError, feedback_public: feedbackPublic, note_private: '', created_at: nowIso() });
    this.db.evaluation_notes.push({ evaluation_id: id, note: notePrivate });
    const before = sub.status;
    if (decision === 'validated') sub.status = 'validated';
    else if (decision === 'needs_revision') sub.status = 'needs_revision';
    sub.updated_at = nowIso();
    if (sub.status !== before) this.log(sub.session_id, 'submissions.status', { id: submissionId, from: before, to: sub.status });
    this.log(sub.session_id, 'evaluation.recorded', { submission_id: submissionId, version: sub.current_version, decision });
    this.emit('evaluations', 'submissions');
  }

  async getEvaluationNote(evaluationId: string): Promise<string> {
    const ev = this.db.evaluations.find((e) => e.id === evaluationId);
    if (!ev) return '';
    const sub = this.db.submissions.find((s) => s.id === ev.submission_id);
    if (!sub || !this.isSessionTrainer(sub.session_id)) return '';
    return this.db.evaluation_notes.find((n) => n.evaluation_id === evaluationId)?.note ?? '';
  }

  async listSharedExamples(sessionId: string): Promise<SharedExample[]> {
    this.assertAccess(sessionId);
    return this.db.shared_examples.filter((x) => x.session_id === sessionId).sort((a, b) => b.published_at.localeCompare(a.published_at));
  }

  async publishExample(submissionId: string, title: string): Promise<void> {
    const sub = this.db.submissions.find((s) => s.id === submissionId);
    if (!sub) throw new Error('Production introuvable');
    this.assertSessionTrainer(sub.session_id);
    if (!sub.share_consent) throw new Error('L’auteur n’a pas autorisé le partage de cette production');
    const v = this.db.submission_versions.filter((x) => x.submission_id === submissionId).sort((a, b) => b.version_number - a.version_number)[0];
    if (!v) throw new Error('Aucune version remise');
    this.db.shared_examples.push({ id: newId(), session_id: sub.session_id, title, content: structuredClone(v.content), source_submission_id: submissionId, published_by: this.uid(), published_at: nowIso() });
    this.log(sub.session_id, 'example.published', { submission_id: submissionId });
    this.emit('shared_examples');
  }

  async deleteSharedExample(id: string): Promise<void> {
    const x = this.db.shared_examples.find((e) => e.id === id);
    if (!x) return;
    this.assertSessionTrainer(x.session_id);
    this.db.shared_examples = this.db.shared_examples.filter((e) => e.id !== id);
    this.db.peer_reviews = this.db.peer_reviews.filter((r) => r.shared_example_id !== id);
    this.emit('shared_examples');
  }

  async listPeerReviews(sessionId: string): Promise<PeerReview[]> {
    this.assertAccess(sessionId);
    const exIds = new Set(this.db.shared_examples.filter((x) => x.session_id === sessionId).map((x) => x.id));
    return this.db.peer_reviews.filter((r) => exIds.has(r.shared_example_id)).filter((r) => {
      if (r.reviewer_id === this.currentUserId || this.isSessionTrainer(sessionId)) return true;
      const sub = r.submission_id ? this.db.submissions.find((s) => s.id === r.submission_id) : undefined;
      return !!sub && this.canRead(sub);
    });
  }

  async createPeerReview(sharedExampleId: string, submissionId: string | null, strengths: string, suggestions: string, understood: boolean | null): Promise<void> {
    const x = this.db.shared_examples.find((e) => e.id === sharedExampleId);
    if (!x) throw new Error('Exemple introuvable');
    const s = this.session(x.session_id);
    if (!s.peer_review_enabled || !this.isMember(x.session_id)) throw new Error('Appréciation entre pairs non activée');
    this.db.peer_reviews.push({ id: newId(), shared_example_id: sharedExampleId, submission_id: submissionId, reviewer_id: this.uid(), strengths, suggestions, understood, created_at: nowIso() });
    this.emit('shared_examples');
  }

  // --- Sondages, débrief, mur d'idées ---------------------------------------
  async listPolls(sessionId: string): Promise<Poll[]> {
    this.assertAccess(sessionId);
    return this.db.polls.filter((p) => p.session_id === sessionId).sort((a, b) => a.created_at.localeCompare(b.created_at));
  }

  async listPollAnswers(sessionId: string): Promise<PollAnswer[]> {
    this.assertAccess(sessionId);
    const ids = new Set(this.db.polls.filter((p) => p.session_id === sessionId).map((p) => p.id));
    return this.db.poll_answers.filter((a) => ids.has(a.poll_id) && (this.isSessionTrainer(sessionId) || a.user_id === this.currentUserId));
  }

  async createPoll(sessionId: string, kind: Poll['kind'], question: string, options: string[], key?: { correct_index: number; explanation: string }): Promise<Poll> {
    this.assertSessionTrainer(sessionId);
    const poll: Poll = { id: newId(), session_id: sessionId, kind, question, options, status: 'open', created_at: nowIso() };
    this.db.polls.push(poll);
    if (key) this.db.poll_keys.push({ poll_id: poll.id, ...key });
    this.emit('polls');
    return poll;
  }

  async closePoll(id: string): Promise<void> {
    const p = this.db.polls.find((x) => x.id === id);
    if (!p) return;
    this.assertSessionTrainer(p.session_id);
    p.status = 'closed';
    this.emit('polls');
  }

  async answerPoll(pollId: string, answerIndex: number | null, answerText: string): Promise<void> {
    const p = this.db.polls.find((x) => x.id === pollId);
    if (!p || p.status !== 'open' || !this.isMember(p.session_id)) throw new Error('Sondage fermé ou accès refusé');
    const me = this.uid();
    const ex = this.db.poll_answers.find((a) => a.poll_id === pollId && a.user_id === me);
    if (ex) Object.assign(ex, { answer_index: answerIndex, answer_text: answerText });
    else this.db.poll_answers.push({ id: newId(), poll_id: pollId, user_id: me, answer_index: answerIndex, answer_text: answerText, created_at: nowIso() });
    this.emit('poll_answers');
  }

  async getPollKey(pollId: string) {
    const p = this.db.polls.find((x) => x.id === pollId);
    if (!p) return null;
    if (!(this.isSessionTrainer(p.session_id) || (p.status === 'closed' && this.isMember(p.session_id)))) return null;
    const k = this.db.poll_keys.find((x) => x.poll_id === pollId);
    return k ? { correct_index: k.correct_index, explanation: k.explanation } : null;
  }

  async listIdeas(sessionId: string): Promise<Idea[]> {
    this.assertAccess(sessionId);
    return this.db.ideas.filter((i) => i.session_id === sessionId).sort((a, b) => a.created_at.localeCompare(b.created_at));
  }

  async addIdea(sessionId: string, text: string): Promise<void> {
    this.assertAccess(sessionId);
    this.db.ideas.push({ id: newId(), session_id: sessionId, author_id: this.uid(), text, created_at: nowIso() });
    this.emit('ideas');
  }

  async deleteIdea(id: string): Promise<void> {
    const i = this.db.ideas.find((x) => x.id === id);
    if (!i) return;
    if (i.author_id !== this.currentUserId && !this.isSessionTrainer(i.session_id)) throw new Error('Non autorisé');
    this.db.ideas = this.db.ideas.filter((x) => x.id !== id);
    this.emit('ideas');
  }

  // --- Plans d'application --------------------------------------------------
  async getMyActionPlan(sessionId: string): Promise<ActionPlan | null> {
    return this.db.action_plans.find((a) => a.session_id === sessionId && a.user_id === this.currentUserId) ?? null;
  }

  async saveActionPlan(sessionId: string, input: Omit<ActionPlan, 'id' | 'session_id' | 'user_id' | 'updated_at'>): Promise<ActionPlan> {
    if (!this.isMember(sessionId)) throw new Error('Vous n’êtes pas inscrit à cette session');
    const me = this.uid();
    let a = this.db.action_plans.find((x) => x.session_id === sessionId && x.user_id === me);
    if (a) Object.assign(a, input, { updated_at: nowIso() });
    else {
      a = { id: newId(), session_id: sessionId, user_id: me, ...input, updated_at: nowIso() };
      this.db.action_plans.push(a);
    }
    this.save();
    return a;
  }

  async listActionPlans(sessionId: string): Promise<ActionPlan[]> {
    this.assertSessionTrainer(sessionId);
    return this.db.action_plans.filter((a) => a.session_id === sessionId);
  }

  // --- Journal, temps réel, données personnelles ----------------------------
  async listEvents(sessionId: string, limit = 200): Promise<SessionEvent[]> {
    this.assertSessionTrainer(sessionId);
    return this.db.session_events.filter((e) => e.session_id === sessionId).sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, limit);
  }

  subscribeSession(_sessionId: string, onChange: (table: RealtimeTable) => void): () => void {
    this.listeners.add(onChange);
    return () => this.listeners.delete(onChange);
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
    const me = this.uid();
    const submissions = this.db.submissions.filter((s) => s.owner_id === me);
    const ids = new Set(submissions.map((s) => s.id));
    return {
      exported_at: nowIso(),
      mode: 'démo (données locales)',
      profile: this.me(),
      enrollments: this.db.enrollments.filter((e) => e.user_id === me),
      submissions,
      versions: this.db.submission_versions.filter((v) => ids.has(v.submission_id)),
      evaluations: this.db.evaluations.filter((e) => ids.has(e.submission_id)).map((e) => ({ ...e, note_private: '' })),
      action_plans: this.db.action_plans.filter((a) => a.user_id === me),
    };
  }

  async deleteMyDrafts(sessionId: string): Promise<void> {
    const me = this.uid();
    for (const s of this.db.submissions.filter((x) => x.session_id === sessionId && x.owner_id === me && x.status === 'draft')) {
      s.draft_files.forEach((f) => delete this.db.files[f.path]);
      s.draft = emptySubmissionContent();
      s.draft_files = [];
    }
    this.emit('submissions');
  }
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error('Lecture du fichier impossible'));
    r.readAsDataURL(file);
  });
}

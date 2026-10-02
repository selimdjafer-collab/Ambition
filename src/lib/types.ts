/**
 * Types partagés de l'application « Atelier IA — START EVOLUTION ».
 * Ils reflètent le schéma PostgreSQL (supabase/migrations) et servent
 * aussi au mode démo local. Toute modification doit rester cohérente
 * avec les migrations et le générateur de seed.
 */

export type Role = 'trainer' | 'participant';

export interface Profile {
  id: string;
  email: string;
  display_name: string;
  role: Role;
  organisation: string | null;
  created_at: string;
}

/** Les six familles d'usages de la formation. */
export type Family =
  | 'transcription'
  | 'documents'
  | 'recherche'
  | 'schemas'
  | 'images'
  | 'assistants';

export const FAMILIES: { key: Family; label: string; verb: string }[] = [
  { key: 'transcription', label: 'Transcription', verb: 'Transformer un entretien de suivi en compte rendu fidèle et plan d’action' },
  { key: 'documents', label: 'Documents', verb: 'Faire répondre les documents de la mission, passages à l’appui' },
  { key: 'recherche', label: 'Recherche', verb: 'Préparer une visite d’entreprise utilisatrice avec des sources vérifiées' },
  { key: 'schemas', label: 'Schémas', verb: 'Expliquer le parcours d’accueil IAE en un schéma fidèle' },
  { key: 'images', label: 'Images', verb: 'Créer un support d’agence clair et inclusif pour les salariés en insertion' },
  { key: 'assistants', label: 'Assistants', verb: 'Comparer deux assistants sur une tâche réelle et choisir ses outils' },
];

export type WorkMode = 'individual' | 'pair' | 'group';

export interface BreakdownItem {
  label: string;
  minutes: number;
}

export type HintLevel = 'indice' | 'trame' | 'exemple';

export interface Hint {
  level: HintLevel;
  title: string;
  text: string;
}

/** Carte du défi « Que peut-on transmettre à une IA ? ». */
export interface DataCard {
  id: string;
  label: string;
  detail: string;
}

/** Variante individuelle (défi transversal). */
export interface Variant {
  id: string;
  title: string;
  change: string;
  deliverable_hint: string;
}

/** Champs du constructeur de prompt. */
export interface PromptParts {
  context: string;
  task: string;
  data: string;
  constraints: string;
  format: string;
  controls: string;
}

/** Ancrage métier ETTI d'un atelier : tâche réelle, où part le temps, délégable / à vérifier. */
export interface JobContext {
  /** La tâche du quotidien d'un permanent d'ETTI visée par l'atelier. */
  task: string;
  /** Où part habituellement le temps sur cette tâche (sans IA). */
  time_sinks: string;
  /** Ce qui peut être délégué à un assistant IA. */
  delegable: string;
  /** Ce qui doit rester vérifié ou décidé par le permanent. */
  must_verify: string;
  /** Pourquoi l'usage compte en ETTI (accompagnement, entreprise utilisatrice, prescripteur…). */
  why_etti: string;
}

/**
 * Modèle d'outil de départ : ce que l'atelier fait construire. Le participant
 * l'adapte, le teste sur le cas fictif et l'enregistre dans sa boîte à outils.
 */
export interface ToolBlueprint {
  name: string;
  family: Family;
  purpose: string;
  /** Ce qu'il faut fournir à l'outil à chaque usage (entrées). */
  inputs: string;
  /** Instructions permanentes (rôle, règles, interdits) à placer dans le projet / les instructions personnalisées. */
  instructions: string;
  /** Message type à envoyer à chaque usage, avec des emplacements {{comme_ceci}}. */
  prompt_template: string;
  output_format: string;
  /** Points de vérification humaine avant réutilisation. */
  verification: string[];
  /** Données autorisées et interdites dans cet outil. */
  data_rules: string;
  /** Solution de secours si l'outil n'est pas disponible. */
  fallback: string;
}

export type ToolboxStatus = 'draft' | 'tested' | 'ready' | 'validated';

export const TOOLBOX_STATUS_LABELS: Record<ToolboxStatus, string> = {
  draft: 'En construction',
  tested: 'Testé sur le cas fictif',
  ready: 'Prêt à proposer',
  validated: 'Validé par le formateur',
};

export interface ToolboxTest {
  at: string;
  input_summary: string;
  result_summary: string;
  ok: boolean;
  minutes: number | null;
  note: string;
}

export interface ToolboxHistoryEntry {
  version: number;
  saved_at: string;
  snapshot: ToolBlueprint;
}

/** Outil construit par un participant (ou un binôme) : fiche, versions, tests. */
export interface ToolboxItem extends ToolBlueprint {
  id: string;
  session_id: string;
  owner_id: string;
  team_id: string | null;
  session_workshop_id: string | null;
  source_submission_id: string | null;
  tool_used: string;
  status: ToolboxStatus;
  version: number;
  history: ToolboxHistoryEntry[];
  tests: ToolboxTest[];
  share_consent: boolean;
  trainer_comment: string;
  deploy_plan: string;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

/** Copie publiée au groupe par le formateur, avec l'accord de l'auteur. */
export interface ToolboxShared {
  id: string;
  session_id: string;
  title: string;
  item: ToolBlueprint & { tool_used: string; version: number };
  source_item_id: string | null;
  published_by: string;
  published_at: string;
}

/** Contenu publié d'un atelier (visible des participants quand l'atelier est ouvert). */
export interface WorkshopContent {
  objective: string;
  brief: string;
  resource_codes: string[];
  steps: string[];
  deliverable: string;
  success_criteria: string[];
  hints: Hint[];
  debrief_questions: string[];
  fallback: string;
  prompt_starter: string;
  prompt_defaults: PromptParts;
  levels: { guided: string; autonomous: string; bonus: string };
  work_mode: WorkMode;
  families: Family[];
  /** Type de formulaire de production spécifique à l'atelier. */
  production_kind:
    | 'text'
    | 'data_sort'
    | 'report_actions'
    | 'faq_sources'
    | 'visit_sheet'
    | 'process_blocks'
    | 'poster'
    | 'comparison'
    | 'individual_challenge'
    | 'review';
  data_cards?: DataCard[];
  variants?: Variant[];
  /** Note affichée avant tout dépôt. */
  deposit_notice?: string;
  /** Ancrage métier ETTI et temps (facultatif pour les séquences non productives). */
  job_context?: JobContext;
  /** Proposer la mesure du temps habituel / observé (vérification incluse). */
  time_tracking?: boolean;
  /** Modèle d'outil de départ à adapter, tester et enregistrer dans la boîte à outils. */
  tool_blueprint?: ToolBlueprint;
}

/** Contenu publié dans une session : les aides sont servies séparément, selon le niveau révélé. */
export type PublishedWorkshopContent = Omit<WorkshopContent, 'hints'>;

/** Contenu réservé au formateur (corrigé, notes), protégé séparément. */
export interface WorkshopPrivateContent {
  answer_key: string;
  trainer_notes: string;
  flawed_example?: string;
}

export interface RubricCriterion {
  key: string;
  label: string;
  description: string;
  max: number;
}

export interface Rubric {
  title: string;
  criteria: RubricCriterion[];
  /** Suggestion pédagogique modifiable. */
  pass_threshold: number;
  min_on_criteria: { key: string; min: number }[];
  note: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  prerequisites: string;
  audience: string;
  created_at: string;
}

export type VersionStatus = 'draft' | 'published' | 'archived';

export interface ProgramVersion {
  id: string;
  program_id: string;
  version_number: number;
  status: VersionStatus;
  editorial_reference: string;
  changelog: string;
  rubric: Rubric;
  objectives: string[];
  published_at: string | null;
  created_at: string;
  created_by: string | null;
}

export interface WorkshopTemplate {
  id: string;
  program_version_id: string;
  position: number;
  code: string;
  title: string;
  seance: 1 | 2;
  duration_min: number;
  breakdown: BreakdownItem[];
  content: WorkshopContent;
}

export interface WorkshopPrivate {
  workshop_template_id: string;
  content: WorkshopPrivateContent;
}

export type ResourceKind =
  | 'transcript'
  | 'mission_sheet'
  | 'procedure'
  | 'guide'
  | 'brief'
  | 'sources'
  | 'example';

export interface Resource {
  id: string;
  code: string;
  title: string;
  kind: ResourceKind;
  version_label: string;
  dated_on: string | null;
  body: string;
  trainer_only: boolean;
  fictional: boolean;
  obsolete: boolean;
}

export type ToolAuthorization = 'authorized' | 'to_validate' | 'not_authorized';
export type PricingStatus = 'free' | 'free_with_quota' | 'trial' | 'license' | 'depends_on_account' | 'unknown';

export interface ToolCard {
  id: string;
  family: Family;
  name: string;
  official_url: string;
  usage: string;
  quick_start: string;
  authorization_status: ToolAuthorization;
  account_required: string;
  pricing_status: PricingStatus;
  pricing_note: string;
  limits: string;
  formats: string;
  precautions: string;
  terms_url: string;
  privacy_url: string;
  fallback: string;
  last_verified_on: string | null;
  verification_source: string;
  is_fallback: boolean;
  version: number;
  updated_at: string;
}

export interface ToolCardHistory {
  id: string;
  tool_card_id: string;
  version: number;
  snapshot: ToolCard;
  changed_by: string | null;
  changed_at: string;
}

export interface QuizQuestion {
  id: string;
  position: number;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export type SessionStatus = 'draft' | 'prepared' | 'open' | 'suspended' | 'closed';
export type SessionMode = 'presentiel' | 'visio' | 'mixte';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface TimerState {
  status: TimerStatus;
  duration_seconds: number;
  started_at: string | null;
  ends_at: string | null;
  remaining_seconds: number | null;
  revision: number;
  label: string | null;
}

export interface Retention {
  drafts_days: number | null;
  productions_days: number | null;
  traces_days: number | null;
}

export interface Session {
  id: string;
  trainer_id: string;
  title: string;
  program_version_id: string;
  program_title: string;
  program_version_number: number;
  status: SessionStatus;
  join_code: string;
  mode: SessionMode;
  start_date: string | null;
  end_date: string | null;
  meeting_link: string | null;
  max_participants: number;
  allowed_tool_ids: string[];
  resources_access: 'all' | 'opened_only';
  retention: Retention;
  rubric_snapshot: Rubric;
  peer_review_enabled: boolean;
  is_demo: boolean;
  current_session_workshop_id: string | null;
  current_step: number;
  timer: TimerState;
  created_at: string;
  updated_at: string;
}

export type WorkshopStatus = 'locked' | 'open' | 'closed';

export interface SessionWorkshop {
  id: string;
  session_id: string;
  workshop_template_id: string | null;
  position: number;
  code: string;
  title: string;
  seance: 1 | 2;
  duration_min: number;
  breakdown: BreakdownItem[];
  content: PublishedWorkshopContent;
  status: WorkshopStatus;
  hints_revealed: number; // 0..3
  answer_key_revealed: boolean;
  opened_at: string | null;
  closed_at: string | null;
  content_updated_at: string | null;
  update_note: string | null;
}

export interface SessionWorkshopPrivate {
  session_workshop_id: string;
  content: WorkshopPrivateContent;
}

export type EnrollmentStatus = 'invited' | 'pending' | 'approved' | 'rejected' | 'removed';

export interface Positioning {
  comfort: 1 | 2 | 3 | 4 | null;
  used_ai_before: 'never' | 'sometimes' | 'often' | null;
  job: string;
  priority_task: string;
  expectations: string;
}

export interface Enrollment {
  id: string;
  session_id: string;
  user_id: string | null;
  invited_email: string | null;
  display_name: string;
  status: EnrollmentStatus;
  positioning: Positioning | null;
  tool_access: Record<string, 'ok' | 'none' | 'unknown'>;
  created_at: string;
  updated_at: string;
}

export type TeamKind = 'pair' | 'trio' | 'solo';

export interface Team {
  id: string;
  session_id: string;
  name: string;
  kind: TeamKind;
  created_at: string;
}

export interface TeamMember {
  team_id: string;
  user_id: string;
}

export type SubmissionStatus = 'draft' | 'submitted' | 'needs_revision' | 'validated';

export interface FileRef {
  path: string;
  name: string;
  size: number;
  mime: string;
  uploaded_at: string;
}

export interface SubmissionContent {
  text: string;
  link: string;
  prompt: string;
  prompt_parts: PromptParts;
  tool_used: string;
  checklist: boolean[];
  self_check: boolean[];
  level: 'guided' | 'autonomous';
  acknowledged_fictional_only: boolean;
  /** Données structurées propres à chaque type de production. */
  extra: Record<string, unknown>;
}

export interface Submission {
  id: string;
  session_id: string;
  session_workshop_id: string;
  owner_id: string;
  team_id: string | null;
  status: SubmissionStatus;
  current_version: number;
  draft: SubmissionContent;
  draft_files: FileRef[];
  share_consent: boolean;
  updated_at: string;
  updated_by: string | null;
  submitted_at: string | null;
  created_at: string;
}

export interface SubmissionVersion {
  id: string;
  submission_id: string;
  version_number: number;
  content: SubmissionContent;
  files: FileRef[];
  created_by: string;
  contributors: string[];
  created_at: string;
}

export type HelpStatus = 'open' | 'in_progress' | 'resolved';

export interface HelpRequest {
  id: string;
  session_id: string;
  session_workshop_id: string | null;
  requester_id: string;
  team_id: string | null;
  reason: string;
  status: HelpStatus;
  handled_by: string | null;
  created_at: string;
  resolved_at: string | null;
}

export type EvaluationDecision = 'validated' | 'needs_revision' | 'comment';

export interface Evaluation {
  id: string;
  submission_id: string;
  version_number: number;
  evaluator_id: string;
  rubric: Rubric;
  scores: Record<string, number>;
  total: number;
  decision: EvaluationDecision;
  critical_error: boolean;
  feedback_public: string;
  note_private: string;
  created_at: string;
}

export interface PeerReview {
  id: string;
  shared_example_id: string;
  submission_id: string | null;
  reviewer_id: string;
  strengths: string;
  suggestions: string;
  understood: boolean | null;
  created_at: string;
}

export type PollKind = 'poll' | 'debrief' | 'quiz';

export interface Poll {
  id: string;
  session_id: string;
  kind: PollKind;
  question: string;
  options: string[];
  status: 'open' | 'closed';
  created_at: string;
}

export interface PollAnswer {
  id: string;
  poll_id: string;
  user_id: string;
  answer_index: number | null;
  answer_text: string;
  created_at: string;
}

export interface Idea {
  id: string;
  session_id: string;
  author_id: string;
  text: string;
  created_at: string;
}

export interface ActionPlanFields {
  task: string;
  frequency: string;
  tool: string;
  data: string;
  human_control: string;
  usual_time: string;
  observed_time: string;
  observed_time_tested: boolean;
  benefit: string;
  stop_condition: string;
}

export interface ActionPlan {
  id: string;
  session_id: string;
  user_id: string;
  selected_submission_ids: string[];
  tools_chosen: string[];
  plan: ActionPlanFields;
  self_assessment: string;
  updated_at: string;
}

export interface SharedExample {
  id: string;
  session_id: string;
  title: string;
  content: SubmissionContent;
  source_submission_id: string | null;
  published_by: string;
  published_at: string;
}

export interface SessionEvent {
  id: string;
  session_id: string;
  actor_id: string | null;
  type: string;
  payload: Record<string, unknown>;
  created_at: string;
}

export interface AppSettings {
  id: number;
  org_name: string;
  logo_path: string | null;
  privacy_notice: string;
  hosting_notes: string;
  default_retention: Retention;
  updated_at: string;
}

/** Vue agrégée d'un participant dans le tableau de bord formateur. */
export type ParticipantWorkshopStatus =
  | 'not_started'
  | 'in_progress'
  | 'help_requested'
  | 'submitted'
  | 'needs_revision'
  | 'validated';

export const PARTICIPANT_STATUS_LABELS: Record<ParticipantWorkshopStatus, string> = {
  not_started: 'Non commencé',
  in_progress: 'En cours',
  help_requested: 'Aide demandée',
  submitted: 'Remis',
  needs_revision: 'À améliorer',
  validated: 'Validé par le formateur',
};

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  draft: 'Brouillon',
  submitted: 'Remis',
  needs_revision: 'À améliorer',
  validated: 'Validé par le formateur',
};

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  draft: 'Brouillon',
  prepared: 'Préparée',
  open: 'Ouverte',
  suspended: 'Suspendue',
  closed: 'Clôturée',
};

export const EMPTY_PROMPT_PARTS: PromptParts = {
  context: '',
  task: '',
  data: '',
  constraints: '',
  format: '',
  controls: '',
};

export function emptySubmissionContent(stepsCount = 0, criteriaCount = 0): SubmissionContent {
  return {
    text: '',
    link: '',
    prompt: '',
    prompt_parts: { ...EMPTY_PROMPT_PARTS },
    tool_used: '',
    checklist: Array.from({ length: stepsCount }, () => false),
    self_check: Array.from({ length: criteriaCount }, () => false),
    level: 'guided',
    acknowledged_fictional_only: false,
    extra: {},
  };
}

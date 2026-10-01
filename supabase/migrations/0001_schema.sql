-- =============================================================================
-- Atelier IA — START EVOLUTION : schéma principal
-- Tables, contraintes, index et triggers. Les politiques RLS sont dans 0003.
-- =============================================================================

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Profils (identité utile à la formation uniquement)
-- -----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text not null default '',
  role text not null default 'participant' check (role in ('trainer', 'participant')),
  organisation text,
  created_at timestamptz not null default now()
);

create unique index profiles_email_idx on public.profiles (lower(email));

-- Création automatique du profil à l'inscription. Le rôle est toujours
-- « participant » : le premier formateur est créé via bootstrap_trainer().
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(coalesce(new.email, ''), '@', 1)),
    'participant'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Un utilisateur ne peut pas changer son propre rôle.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role and not public.is_trainer() then
    raise exception 'Modification du rôle refusée';
  end if;
  if new.id <> old.id or new.email <> old.email then
    raise exception 'Identité non modifiable';
  end if;
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- Paramètres de l'organisme (une seule ligne)
-- -----------------------------------------------------------------------------
create table public.app_settings (
  id int primary key default 1 check (id = 1),
  org_name text not null default 'START EVOLUTION',
  logo_path text,
  privacy_notice text not null default '',
  hosting_notes text not null default '',
  default_retention jsonb not null default '{"drafts_days": null, "productions_days": null, "traces_days": null}'::jsonb,
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Programmes, versions, fiches d'atelier
-- -----------------------------------------------------------------------------
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  prerequisites text not null default '',
  audience text not null default '',
  created_at timestamptz not null default now()
);

create table public.program_versions (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  version_number int not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  editorial_reference text not null default '',
  changelog text not null default '',
  rubric jsonb not null,
  objectives jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles (id) on delete set null,
  unique (program_id, version_number)
);

create table public.workshop_templates (
  id uuid primary key default gen_random_uuid(),
  program_version_id uuid not null references public.program_versions (id) on delete cascade,
  position int not null,
  code text not null,
  title text not null,
  seance int not null check (seance in (1, 2)),
  duration_min int not null check (duration_min > 0),
  breakdown jsonb not null default '[]'::jsonb,
  content jsonb not null,
  unique (program_version_id, position),
  unique (program_version_id, code)
);

-- Contenu réservé au formateur (corrigé, notes), séparé du contenu publié.
create table public.workshop_private (
  workshop_template_id uuid primary key references public.workshop_templates (id) on delete cascade,
  content jsonb not null default '{"answer_key": "", "trainer_notes": ""}'::jsonb
);

-- -----------------------------------------------------------------------------
-- Ressources pédagogiques (cas fictif) et bibliothèque d'outils
-- -----------------------------------------------------------------------------
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  kind text not null check (kind in ('transcript', 'mission_sheet', 'procedure', 'guide', 'brief', 'sources', 'example')),
  version_label text not null default '',
  dated_on date,
  body text not null,
  trainer_only boolean not null default false,
  fictional boolean not null default true,
  obsolete boolean not null default false
);

create table public.tool_cards (
  id uuid primary key default gen_random_uuid(),
  family text not null check (family in ('transcription', 'documents', 'recherche', 'schemas', 'images', 'assistants')),
  name text not null,
  official_url text not null default '',
  usage text not null default '',
  quick_start text not null default '',
  authorization text not null default 'to_validate' check (authorization in ('authorized', 'to_validate', 'not_authorized')),
  account_required text not null default '',
  pricing_status text not null default 'unknown' check (pricing_status in ('free', 'free_with_quota', 'trial', 'license', 'depends_on_account', 'unknown')),
  pricing_note text not null default '',
  limits text not null default '',
  formats text not null default '',
  precautions text not null default '',
  terms_url text not null default '',
  privacy_url text not null default '',
  fallback text not null default '',
  last_verified_on date,
  verification_source text not null default '',
  is_fallback boolean not null default false,
  version int not null default 1,
  updated_at timestamptz not null default now()
);

create unique index tool_cards_family_name_idx on public.tool_cards (family, name);

create table public.tool_card_history (
  id uuid primary key default gen_random_uuid(),
  tool_card_id uuid not null references public.tool_cards (id) on delete cascade,
  version int not null,
  snapshot jsonb not null,
  changed_by uuid references public.profiles (id) on delete set null,
  changed_at timestamptz not null default now()
);

create or replace function public.tool_card_versioning()
returns trigger
language plpgsql
as $$
begin
  insert into public.tool_card_history (tool_card_id, version, snapshot, changed_by)
  values (old.id, old.version, to_jsonb(old), auth.uid());
  new.version := old.version + 1;
  new.updated_at := now();
  return new;
end;
$$;

create trigger tool_cards_versioning
  before update on public.tool_cards
  for each row execute function public.tool_card_versioning();

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  position int not null unique,
  question text not null,
  options jsonb not null,
  correct_index int not null,
  explanation text not null default ''
);

-- -----------------------------------------------------------------------------
-- Sessions
-- -----------------------------------------------------------------------------
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  trainer_id uuid not null references public.profiles (id) on delete restrict,
  title text not null,
  program_version_id uuid not null references public.program_versions (id) on delete restrict,
  program_title text not null default '',
  program_version_number int not null default 1,
  status text not null default 'draft' check (status in ('draft', 'prepared', 'open', 'suspended', 'closed')),
  join_code text not null unique,
  mode text not null default 'presentiel' check (mode in ('presentiel', 'visio', 'mixte')),
  start_date date,
  end_date date,
  meeting_link text,
  max_participants int not null default 10 check (max_participants between 1 and 60),
  allowed_tool_ids jsonb not null default '[]'::jsonb,
  resources_access text not null default 'all' check (resources_access in ('all', 'opened_only')),
  retention jsonb not null default '{"drafts_days": null, "productions_days": null, "traces_days": null}'::jsonb,
  rubric_snapshot jsonb not null,
  peer_review_enabled boolean not null default false,
  is_demo boolean not null default false,
  current_session_workshop_id uuid,
  current_step int not null default 0,
  timer jsonb not null default '{"status": "idle", "duration_seconds": 0, "started_at": null, "ends_at": null, "remaining_seconds": null, "revision": 0, "label": null}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sessions_trainer_idx on public.sessions (trainer_id);

-- Instantané des fiches d'atelier pour la session (modifier le modèle
-- ne change pas les consignes des sessions existantes).
create table public.session_workshops (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  workshop_template_id uuid references public.workshop_templates (id) on delete set null,
  position int not null,
  code text not null,
  title text not null,
  seance int not null check (seance in (1, 2)),
  duration_min int not null check (duration_min > 0),
  breakdown jsonb not null default '[]'::jsonb,
  content jsonb not null,
  status text not null default 'locked' check (status in ('locked', 'open', 'closed')),
  hints_revealed int not null default 0 check (hints_revealed between 0 and 3),
  answer_key_revealed boolean not null default false,
  opened_at timestamptz,
  closed_at timestamptz,
  content_updated_at timestamptz,
  update_note text,
  unique (session_id, position)
);

create index session_workshops_session_idx on public.session_workshops (session_id);

alter table public.sessions
  add constraint sessions_current_workshop_fk
  foreign key (current_session_workshop_id) references public.session_workshops (id) on delete set null;

create table public.session_workshop_private (
  session_workshop_id uuid primary key references public.session_workshops (id) on delete cascade,
  content jsonb not null default '{"answer_key": "", "trainer_notes": ""}'::jsonb
);

-- -----------------------------------------------------------------------------
-- Inscriptions et binômes
-- -----------------------------------------------------------------------------
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete cascade,
  invited_email text,
  display_name text not null default '',
  status text not null default 'pending' check (status in ('invited', 'pending', 'approved', 'rejected', 'removed')),
  positioning jsonb,
  tool_access jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (user_id is not null or invited_email is not null)
);

create unique index enrollments_session_user_idx on public.enrollments (session_id, user_id) where user_id is not null;
create unique index enrollments_session_email_idx on public.enrollments (session_id, lower(invited_email)) where invited_email is not null;
create index enrollments_user_idx on public.enrollments (user_id);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  name text not null,
  kind text not null default 'pair' check (kind in ('pair', 'trio', 'solo')),
  created_at timestamptz not null default now()
);

create index teams_session_idx on public.teams (session_id);

create table public.team_members (
  team_id uuid not null references public.teams (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  primary key (team_id, user_id)
);

create index team_members_user_idx on public.team_members (user_id);

-- -----------------------------------------------------------------------------
-- Productions, versions, aides, évaluations
-- -----------------------------------------------------------------------------
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  session_workshop_id uuid not null references public.session_workshops (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  team_id uuid references public.teams (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'needs_revision', 'validated')),
  current_version int not null default 0,
  draft jsonb not null default '{}'::jsonb,
  draft_files jsonb not null default '[]'::jsonb,
  share_consent boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id) on delete set null,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

-- Une production par (atelier, propriétaire) ; en binôme, une par (atelier, équipe).
create unique index submissions_owner_idx on public.submissions (session_workshop_id, owner_id) where team_id is null;
create unique index submissions_team_idx on public.submissions (session_workshop_id, team_id) where team_id is not null;
create index submissions_session_idx on public.submissions (session_id);

create table public.submission_versions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  version_number int not null,
  content jsonb not null,
  files jsonb not null default '[]'::jsonb,
  created_by uuid not null references public.profiles (id) on delete cascade,
  contributors jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique (submission_id, version_number)
);

create table public.help_requests (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  session_workshop_id uuid references public.session_workshops (id) on delete set null,
  requester_id uuid not null references public.profiles (id) on delete cascade,
  team_id uuid references public.teams (id) on delete set null,
  reason text not null default '',
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved')),
  handled_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index help_requests_session_idx on public.help_requests (session_id, status);

create table public.evaluations (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  version_number int not null,
  evaluator_id uuid not null references public.profiles (id) on delete cascade,
  rubric jsonb not null,
  scores jsonb not null default '{}'::jsonb,
  total int not null default 0,
  decision text not null default 'comment' check (decision in ('validated', 'needs_revision', 'comment')),
  critical_error boolean not null default false,
  feedback_public text not null default '',
  created_at timestamptz not null default now()
);

create index evaluations_submission_idx on public.evaluations (submission_id);

-- Note privée du formateur, jamais exposée aux participants.
create table public.evaluation_notes (
  evaluation_id uuid primary key references public.evaluations (id) on delete cascade,
  note text not null default ''
);

create table public.peer_reviews (
  id uuid primary key default gen_random_uuid(),
  shared_example_id uuid not null,
  submission_id uuid references public.submissions (id) on delete cascade,
  reviewer_id uuid not null references public.profiles (id) on delete cascade,
  strengths text not null default '',
  suggestions text not null default '',
  understood boolean,
  created_at timestamptz not null default now()
);

create index peer_reviews_example_idx on public.peer_reviews (shared_example_id);

-- -----------------------------------------------------------------------------
-- Sondages, mur d'idées, plans d'action, exemples partagés, journal
-- -----------------------------------------------------------------------------
create table public.polls (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  kind text not null default 'poll' check (kind in ('poll', 'debrief', 'quiz')),
  question text not null,
  options jsonb not null default '[]'::jsonb,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now()
);

create index polls_session_idx on public.polls (session_id);

-- Bonne réponse et explication d'un quiz : lisibles par les participants
-- seulement une fois le sondage clôturé (voir politiques RLS).
create table public.poll_keys (
  poll_id uuid primary key references public.polls (id) on delete cascade,
  correct_index int,
  explanation text not null default ''
);

create table public.poll_answers (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  answer_index int,
  answer_text text not null default '',
  created_at timestamptz not null default now(),
  unique (poll_id, user_id)
);

create table public.ideas (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);

create index ideas_session_idx on public.ideas (session_id);

create table public.action_plans (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  selected_submission_ids jsonb not null default '[]'::jsonb,
  tools_chosen jsonb not null default '[]'::jsonb,
  plan jsonb not null default '{}'::jsonb,
  self_assessment text not null default '',
  updated_at timestamptz not null default now(),
  unique (session_id, user_id)
);

create table public.shared_examples (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  title text not null,
  content jsonb not null,
  source_submission_id uuid references public.submissions (id) on delete set null,
  published_by uuid not null references public.profiles (id) on delete cascade,
  published_at timestamptz not null default now()
);

create index shared_examples_session_idx on public.shared_examples (session_id);

alter table public.peer_reviews
  add constraint peer_reviews_example_fk
  foreign key (shared_example_id) references public.shared_examples (id) on delete cascade;

create table public.session_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  actor_id uuid references public.profiles (id) on delete set null,
  type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index session_events_session_idx on public.session_events (session_id, created_at desc);

-- -----------------------------------------------------------------------------
-- Horodatage automatique
-- -----------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger sessions_touch before update on public.sessions for each row execute function public.touch_updated_at();
create trigger enrollments_touch before update on public.enrollments for each row execute function public.touch_updated_at();
create trigger action_plans_touch before update on public.action_plans for each row execute function public.touch_updated_at();

-- Les productions : horodatage + auteur de la dernière modification
-- (sert à prévenir les conflits de version en binôme).
create or replace function public.touch_submission()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  new.updated_by := coalesce(auth.uid(), new.updated_by);
  return new;
end;
$$;

create trigger submissions_touch before update on public.submissions for each row execute function public.touch_submission();

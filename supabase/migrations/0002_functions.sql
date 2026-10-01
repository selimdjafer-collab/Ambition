-- =============================================================================
-- Fonctions d'autorisation (utilisées par les politiques RLS) et RPC.
-- Le serveur fait autorité : minuteur, remises, évaluations, versions.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Helpers d'autorisation (security definer, stables)
-- -----------------------------------------------------------------------------
create or replace function public.is_trainer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'trainer');
$$;

create or replace function public.is_session_trainer(p_session_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.sessions s
    where s.id = p_session_id and s.trainer_id = auth.uid()
  );
$$;

create or replace function public.is_session_member(p_session_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.enrollments e
    where e.session_id = p_session_id and e.user_id = auth.uid() and e.status = 'approved'
  );
$$;

create or replace function public.is_team_member(p_team_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.team_members tm
    where tm.team_id = p_team_id and tm.user_id = auth.uid()
  );
$$;

create or replace function public.shares_session_with(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.enrollments a
    join public.enrollments b on a.session_id = b.session_id
    where a.user_id = auth.uid() and a.status = 'approved'
      and b.user_id = p_user_id and b.status = 'approved'
  ) or exists (
    select 1
    from public.enrollments e
    join public.sessions s on s.id = e.session_id
    where e.user_id = p_user_id and s.trainer_id = auth.uid()
  ) or exists (
    select 1
    from public.enrollments e
    join public.sessions s on s.id = e.session_id
    where e.user_id = auth.uid() and e.status = 'approved' and s.trainer_id = p_user_id
  );
$$;

-- Lecture d'une production : propriétaire, coéquipier ou formateur de la session.
create or replace function public.can_read_submission(p_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.submissions sub
    where sub.id = p_submission_id
      and (
        sub.owner_id = auth.uid()
        or (sub.team_id is not null and public.is_team_member(sub.team_id))
        or public.is_session_trainer(sub.session_id)
      )
  );
$$;

-- Modification d'un brouillon : propriétaire ou coéquipier.
create or replace function public.can_edit_submission(p_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.submissions sub
    where sub.id = p_submission_id
      and (
        sub.owner_id = auth.uid()
        or (sub.team_id is not null and public.is_team_member(sub.team_id))
      )
  );
$$;

create or replace function public.session_of_workshop(p_session_workshop_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select session_id from public.session_workshops where id = p_session_workshop_id;
$$;

-- Corrigé d'un atelier de session : formateur, ou membre si révélé.
create or replace function public.can_read_workshop_private(p_session_workshop_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.session_workshops sw
    where sw.id = p_session_workshop_id
      and (
        public.is_session_trainer(sw.session_id)
        or (sw.answer_key_revealed and public.is_session_member(sw.session_id))
      )
  );
$$;

-- Trigger protégeant le rôle (déclaré ici car il dépend de is_trainer()).
create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.protect_profile_role();

-- -----------------------------------------------------------------------------
-- Journal d'événements (sans contenu sensible)
-- -----------------------------------------------------------------------------
create or replace function public.log_event(p_session_id uuid, p_type text, p_payload jsonb default '{}'::jsonb)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.session_events (session_id, actor_id, type, payload)
  values (p_session_id, auth.uid(), p_type, coalesce(p_payload, '{}'::jsonb));
$$;

create or replace function public.log_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session uuid;
begin
  v_session := coalesce((to_jsonb(new) ->> 'session_id')::uuid, (to_jsonb(new) ->> 'id')::uuid);
  if tg_op = 'INSERT' then
    perform public.log_event(v_session, tg_table_name || '.created', jsonb_build_object('id', new.id, 'status', new.status));
  elsif new.status is distinct from old.status then
    perform public.log_event(v_session, tg_table_name || '.status', jsonb_build_object('id', new.id, 'from', old.status, 'to', new.status));
  end if;
  return new;
end;
$$;

create trigger session_workshops_log after insert or update on public.session_workshops for each row execute function public.log_status_change();
create trigger submissions_log after insert or update on public.submissions for each row execute function public.log_status_change();
create trigger help_requests_log after insert or update on public.help_requests for each row execute function public.log_status_change();
create trigger sessions_log after update on public.sessions for each row execute function public.log_status_change();

-- -----------------------------------------------------------------------------
-- Garde-fous sur les mises à jour directes des participants (rôles clients).
-- Les fonctions security definer (request_join, submit_submission, …)
-- s'exécutent sous leur propriétaire et ne sont pas concernées.
-- -----------------------------------------------------------------------------
create or replace function public.guard_enrollment_update()
returns trigger
language plpgsql
as $$
begin
  if current_user in ('anon', 'authenticated') and not public.is_session_trainer(old.session_id) then
    if new.status is distinct from old.status
       or new.user_id is distinct from old.user_id
       or new.session_id is distinct from old.session_id
       or new.invited_email is distinct from old.invited_email then
      raise exception 'Modification refusée : seuls le positionnement et l''accès aux outils sont modifiables';
    end if;
  end if;
  return new;
end;
$$;

create trigger enrollments_guard before update on public.enrollments for each row execute function public.guard_enrollment_update();

create or replace function public.guard_submission_update()
returns trigger
language plpgsql
as $$
begin
  if current_user in ('anon', 'authenticated') and not public.is_session_trainer(old.session_id) then
    if new.status is distinct from old.status
       or new.current_version is distinct from old.current_version
       or new.owner_id is distinct from old.owner_id
       or new.team_id is distinct from old.team_id
       or new.session_id is distinct from old.session_id
       or new.session_workshop_id is distinct from old.session_workshop_id
       or new.submitted_at is distinct from old.submitted_at then
      raise exception 'Modification refusée : utilisez la remise pour changer le statut';
    end if;
    -- Une production validée n'est plus modifiable (l'accord de partage reste réglable).
    if old.status = 'validated' and (new.draft is distinct from old.draft or new.draft_files is distinct from old.draft_files) then
      raise exception 'Production validée : créez une nouvelle version après retour du formateur';
    end if;
  end if;
  return new;
end;
$$;

create trigger submissions_guard before update on public.submissions for each row execute function public.guard_submission_update();

-- -----------------------------------------------------------------------------
-- Premier formateur : à exécuter dans l'éditeur SQL Supabase (rôle service),
-- jamais accessible aux clients.
-- -----------------------------------------------------------------------------
create or replace function public.bootstrap_trainer(p_email text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  select id into v_id from public.profiles where lower(email) = lower(p_email);
  if v_id is null then
    raise exception 'Aucun compte avec cet e-mail : la personne doit d''abord créer son compte dans l''application.';
  end if;
  update public.profiles set role = 'trainer' where id = v_id;
  return 'Formateur activé : ' || p_email;
end;
$$;

revoke all on function public.bootstrap_trainer(text) from public, anon, authenticated;

-- Un formateur peut nommer un autre formateur (ou le rétrograder).
create or replace function public.set_user_role(p_email text, p_role text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_trainer() then
    raise exception 'Réservé aux formateurs';
  end if;
  if p_role not in ('trainer', 'participant') then
    raise exception 'Rôle inconnu';
  end if;
  update public.profiles set role = p_role where lower(email) = lower(p_email);
  if not found then
    raise exception 'Aucun compte avec cet e-mail';
  end if;
end;
$$;

-- -----------------------------------------------------------------------------
-- Sessions : création depuis une version publiée, duplication
-- -----------------------------------------------------------------------------
create or replace function public.generate_join_code()
returns text
language plpgsql
as $$
declare
  v_alphabet text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  v_code text;
begin
  loop
    v_code := '';
    for i in 1..6 loop
      v_code := v_code || substr(v_alphabet, 1 + floor(random() * length(v_alphabet))::int, 1);
    end loop;
    exit when not exists (select 1 from public.sessions where join_code = v_code);
  end loop;
  return v_code;
end;
$$;

create or replace function public.create_session_from_version(
  p_program_version_id uuid,
  p_title text,
  p_mode text default 'presentiel',
  p_start_date date default null,
  p_end_date date default null,
  p_max_participants int default 10,
  p_is_demo boolean default false
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session uuid;
  v_version public.program_versions%rowtype;
  v_program public.programs%rowtype;
  v_tpl record;
  v_sw uuid;
  v_hints jsonb;
  v_private jsonb;
begin
  if not public.is_trainer() then
    raise exception 'Réservé aux formateurs';
  end if;
  select * into v_version from public.program_versions where id = p_program_version_id;
  if v_version.id is null or v_version.status <> 'published' then
    raise exception 'La version du programme doit être publiée';
  end if;
  select * into v_program from public.programs where id = v_version.program_id;

  insert into public.sessions (trainer_id, title, program_version_id, program_title, program_version_number,
    status, join_code, mode, start_date, end_date, max_participants, rubric_snapshot, is_demo,
    allowed_tool_ids, retention)
  values (auth.uid(), p_title, v_version.id, v_program.title, v_version.version_number,
    'draft', public.generate_join_code(), coalesce(p_mode, 'presentiel'), p_start_date, p_end_date,
    coalesce(p_max_participants, 10), v_version.rubric, coalesce(p_is_demo, false),
    (select coalesce(jsonb_agg(id), '[]'::jsonb) from public.tool_cards),
    (select default_retention from public.app_settings where id = 1))
  returning id into v_session;

  for v_tpl in
    select t.*, coalesce(p.content, '{"answer_key": "", "trainer_notes": ""}'::jsonb) as private_content
    from public.workshop_templates t
    left join public.workshop_private p on p.workshop_template_id = t.id
    where t.program_version_id = v_version.id
    order by t.position
  loop
    -- Les aides (indice, trame, exemple) sont retirées du contenu publié et
    -- servies progressivement par get_revealed_hints().
    v_hints := coalesce(v_tpl.content -> 'hints', '[]'::jsonb);
    v_private := v_tpl.private_content || jsonb_build_object('hints', v_hints);
    insert into public.session_workshops (session_id, workshop_template_id, position, code, title, seance,
      duration_min, breakdown, content)
    values (v_session, v_tpl.id, v_tpl.position, v_tpl.code, v_tpl.title, v_tpl.seance,
      v_tpl.duration_min, v_tpl.breakdown, (v_tpl.content - 'hints'))
    returning id into v_sw;
    insert into public.session_workshop_private (session_workshop_id, content) values (v_sw, v_private);
  end loop;

  perform public.log_event(v_session, 'session.created', jsonb_build_object('program_version', v_version.version_number));
  return v_session;
end;
$$;

create or replace function public.duplicate_session(
  p_session_id uuid,
  p_title text,
  p_start_date date default null,
  p_end_date date default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_src public.sessions%rowtype;
  v_new uuid;
  v_sw record;
  v_new_sw uuid;
begin
  select * into v_src from public.sessions where id = p_session_id;
  if v_src.id is null or v_src.trainer_id <> auth.uid() then
    raise exception 'Session introuvable ou non autorisée';
  end if;
  -- Les durées et contenus sont repris ; les dates, le code et le minuteur sont réinitialisés.
  insert into public.sessions (trainer_id, title, program_version_id, program_title, program_version_number,
    status, join_code, mode, start_date, end_date, meeting_link, max_participants, allowed_tool_ids,
    resources_access, retention, rubric_snapshot, peer_review_enabled, is_demo)
  values (auth.uid(), p_title, v_src.program_version_id, v_src.program_title, v_src.program_version_number,
    'draft', public.generate_join_code(), v_src.mode, p_start_date, p_end_date, null, v_src.max_participants,
    v_src.allowed_tool_ids, v_src.resources_access, v_src.retention, v_src.rubric_snapshot,
    v_src.peer_review_enabled, v_src.is_demo)
  returning id into v_new;

  for v_sw in
    select sw.*, p.content as private_content
    from public.session_workshops sw
    left join public.session_workshop_private p on p.session_workshop_id = sw.id
    where sw.session_id = p_session_id order by sw.position
  loop
    insert into public.session_workshops (session_id, workshop_template_id, position, code, title, seance,
      duration_min, breakdown, content)
    values (v_new, v_sw.workshop_template_id, v_sw.position, v_sw.code, v_sw.title, v_sw.seance,
      v_sw.duration_min, v_sw.breakdown, v_sw.content)
    returning id into v_new_sw;
    insert into public.session_workshop_private (session_workshop_id, content)
    values (v_new_sw, coalesce(v_sw.private_content, '{}'::jsonb));
  end loop;
  perform public.log_event(v_new, 'session.duplicated', jsonb_build_object('from', p_session_id));
  return v_new;
end;
$$;

-- Mise à jour explicite et tracée d'une consigne dans une session active.
create or replace function public.update_session_workshop(
  p_session_workshop_id uuid,
  p_content jsonb,
  p_breakdown jsonb,
  p_duration_min int,
  p_note text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session uuid;
begin
  v_session := public.session_of_workshop(p_session_workshop_id);
  if not public.is_session_trainer(v_session) then
    raise exception 'Réservé au formateur de la session';
  end if;
  if coalesce(trim(p_note), '') = '' then
    raise exception 'Une note de mise à jour est obligatoire pour annoncer le changement au groupe';
  end if;
  update public.session_workshops
  set content = p_content - 'hints',
      breakdown = coalesce(p_breakdown, breakdown),
      duration_min = coalesce(p_duration_min, duration_min),
      content_updated_at = now(),
      update_note = p_note
  where id = p_session_workshop_id;
  perform public.log_event(v_session, 'workshop.content_updated', jsonb_build_object('session_workshop_id', p_session_workshop_id, 'note', p_note));
end;
$$;

-- -----------------------------------------------------------------------------
-- Aides progressives : seules les aides révélées sont renvoyées.
-- -----------------------------------------------------------------------------
create or replace function public.get_revealed_hints(p_session_workshop_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_sw public.session_workshops%rowtype;
  v_hints jsonb;
  v_level int;
begin
  select * into v_sw from public.session_workshops where id = p_session_workshop_id;
  if v_sw.id is null then
    return '[]'::jsonb;
  end if;
  if public.is_session_trainer(v_sw.session_id) then
    v_level := 3;
  elsif public.is_session_member(v_sw.session_id) then
    v_level := v_sw.hints_revealed;
  else
    raise exception 'Accès refusé';
  end if;
  select coalesce(content -> 'hints', '[]'::jsonb) into v_hints
  from public.session_workshop_private where session_workshop_id = p_session_workshop_id;
  return (
    select coalesce(jsonb_agg(h), '[]'::jsonb)
    from (
      select h from jsonb_array_elements(v_hints) with ordinality as t(h, idx)
      where t.idx <= v_level
      order by t.idx
    ) q
  );
end;
$$;

-- -----------------------------------------------------------------------------
-- Rejoindre une session : identité authentifiée + invitation ou approbation.
-- -----------------------------------------------------------------------------
create or replace function public.request_join(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session public.sessions%rowtype;
  v_profile public.profiles%rowtype;
  v_enr public.enrollments%rowtype;
  v_approved int;
begin
  if auth.uid() is null then
    raise exception 'Connexion requise';
  end if;
  select * into v_profile from public.profiles where id = auth.uid();
  select * into v_session from public.sessions
  where join_code = upper(trim(p_code)) and status in ('prepared', 'open', 'suspended');
  if v_session.id is null then
    raise exception 'Code inconnu ou session non ouverte aux inscriptions';
  end if;
  if v_session.trainer_id = auth.uid() then
    raise exception 'Vous animez cette session';
  end if;

  select * into v_enr from public.enrollments where session_id = v_session.id and user_id = auth.uid();
  if v_enr.id is not null then
    return jsonb_build_object('status', v_enr.status, 'session_id', v_session.id, 'title', v_session.title);
  end if;

  -- Invitation nominative par e-mail : rattachement et approbation.
  select * into v_enr from public.enrollments
  where session_id = v_session.id and user_id is null and lower(invited_email) = lower(v_profile.email);
  if v_enr.id is not null then
    update public.enrollments
    set user_id = auth.uid(), status = 'approved',
        display_name = case when display_name = '' then v_profile.display_name else display_name end
    where id = v_enr.id;
    perform public.log_event(v_session.id, 'enrollment.joined', jsonb_build_object('user_id', auth.uid(), 'via', 'invitation'));
    return jsonb_build_object('status', 'approved', 'session_id', v_session.id, 'title', v_session.title);
  end if;

  select count(*) into v_approved from public.enrollments where session_id = v_session.id and status = 'approved';
  insert into public.enrollments (session_id, user_id, display_name, status)
  values (v_session.id, auth.uid(), v_profile.display_name, 'pending');
  perform public.log_event(v_session.id, 'enrollment.requested', jsonb_build_object('user_id', auth.uid()));
  return jsonb_build_object('status', 'pending', 'session_id', v_session.id, 'title', v_session.title,
    'full', v_approved >= v_session.max_participants);
end;
$$;

-- -----------------------------------------------------------------------------
-- Minuteur partagé : le serveur fait autorité.
-- -----------------------------------------------------------------------------
create or replace function public.timer_control(p_session_id uuid, p_action text, p_seconds int default null, p_label text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_timer jsonb;
  v_status text;
  v_remaining int;
  v_ends timestamptz;
  v_now timestamptz := now();
  v_duration int;
begin
  if not public.is_session_trainer(p_session_id) then
    raise exception 'Seul le formateur contrôle le minuteur';
  end if;
  select timer into v_timer from public.sessions where id = p_session_id for update;
  v_status := v_timer ->> 'status';
  v_duration := coalesce((v_timer ->> 'duration_seconds')::int, 0);

  if p_action = 'start' then
    v_duration := coalesce(p_seconds, v_duration);
    if v_duration <= 0 then raise exception 'Durée invalide'; end if;
    v_timer := jsonb_build_object('status', 'running', 'duration_seconds', v_duration,
      'started_at', v_now, 'ends_at', v_now + make_interval(secs => v_duration),
      'remaining_seconds', null, 'label', coalesce(p_label, v_timer ->> 'label'));
  elsif p_action = 'pause' then
    if v_status <> 'running' then raise exception 'Le minuteur n''est pas en cours'; end if;
    v_ends := (v_timer ->> 'ends_at')::timestamptz;
    v_remaining := greatest(0, floor(extract(epoch from (v_ends - v_now)))::int);
    v_timer := v_timer || jsonb_build_object('status', 'paused', 'remaining_seconds', v_remaining, 'ends_at', null);
  elsif p_action = 'resume' then
    if v_status <> 'paused' then raise exception 'Le minuteur n''est pas en pause'; end if;
    v_remaining := coalesce((v_timer ->> 'remaining_seconds')::int, 0);
    v_timer := v_timer || jsonb_build_object('status', 'running', 'ends_at', v_now + make_interval(secs => v_remaining), 'remaining_seconds', null);
  elsif p_action = 'add' then
    if coalesce(p_seconds, 0) = 0 then raise exception 'Durée à ajouter manquante'; end if;
    if v_status = 'running' then
      v_ends := (v_timer ->> 'ends_at')::timestamptz + make_interval(secs => p_seconds);
      if v_ends < v_now then v_ends := v_now; end if;
      v_timer := v_timer || jsonb_build_object('ends_at', v_ends, 'duration_seconds', v_duration + p_seconds);
    elsif v_status = 'paused' then
      v_timer := v_timer || jsonb_build_object('remaining_seconds', greatest(0, coalesce((v_timer ->> 'remaining_seconds')::int, 0) + p_seconds), 'duration_seconds', v_duration + p_seconds);
    elsif v_status = 'finished' then
      v_timer := v_timer || jsonb_build_object('status', 'running', 'ends_at', v_now + make_interval(secs => greatest(p_seconds, 0)), 'duration_seconds', v_duration + p_seconds, 'remaining_seconds', null);
    else
      v_timer := v_timer || jsonb_build_object('duration_seconds', greatest(0, v_duration + p_seconds));
    end if;
  elsif p_action = 'finish' then
    v_timer := v_timer || jsonb_build_object('status', 'finished', 'ends_at', null, 'remaining_seconds', 0);
  elsif p_action = 'reset' then
    v_timer := jsonb_build_object('status', 'idle', 'duration_seconds', coalesce(p_seconds, v_duration),
      'started_at', null, 'ends_at', null, 'remaining_seconds', null, 'label', p_label);
  else
    raise exception 'Action inconnue';
  end if;

  v_timer := v_timer || jsonb_build_object('revision', coalesce((v_timer ->> 'revision')::int, 0) + 1);
  update public.sessions set timer = v_timer where id = p_session_id;
  perform public.log_event(p_session_id, 'timer.' || p_action, jsonb_build_object('seconds', p_seconds));
  return v_timer;
end;
$$;

-- -----------------------------------------------------------------------------
-- Remise d'une production : crée une version figée, conserve les précédentes.
-- -----------------------------------------------------------------------------
create or replace function public.submit_submission(p_submission_id uuid)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sub public.submissions%rowtype;
  v_session public.sessions%rowtype;
  v_sw public.session_workshops%rowtype;
  v_next int;
  v_contributors jsonb;
begin
  select * into v_sub from public.submissions where id = p_submission_id for update;
  if v_sub.id is null or not public.can_edit_submission(p_submission_id) then
    raise exception 'Production introuvable ou non autorisée';
  end if;
  select * into v_session from public.sessions where id = v_sub.session_id;
  select * into v_sw from public.session_workshops where id = v_sub.session_workshop_id;
  if v_session.status <> 'open' then
    raise exception 'La session n''est pas ouverte';
  end if;
  if v_sw.status = 'locked' then
    raise exception 'Cet atelier n''est pas encore ouvert';
  end if;
  if v_sub.status = 'validated' then
    raise exception 'Production déjà validée';
  end if;
  if coalesce(v_sub.draft ->> 'acknowledged_fictional_only', 'false') <> 'true' then
    raise exception 'Confirmez d''abord que la production ne contient aucune donnée réelle';
  end if;

  v_next := v_sub.current_version + 1;
  if v_sub.team_id is not null then
    select coalesce(jsonb_agg(user_id), '[]'::jsonb) into v_contributors from public.team_members where team_id = v_sub.team_id;
  else
    v_contributors := jsonb_build_array(v_sub.owner_id);
  end if;

  insert into public.submission_versions (submission_id, version_number, content, files, created_by, contributors)
  values (p_submission_id, v_next, v_sub.draft, v_sub.draft_files, auth.uid(), v_contributors);

  update public.submissions
  set status = 'submitted', current_version = v_next, submitted_at = now()
  where id = p_submission_id;

  perform public.log_event(v_sub.session_id, 'submission.submitted', jsonb_build_object('submission_id', p_submission_id, 'version', v_next));
  return v_next;
end;
$$;

-- -----------------------------------------------------------------------------
-- Évaluation par le formateur : la somme est calculée par le serveur.
-- -----------------------------------------------------------------------------
create or replace function public.record_evaluation(
  p_submission_id uuid,
  p_scores jsonb,
  p_decision text,
  p_critical_error boolean,
  p_feedback_public text,
  p_note_private text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sub public.submissions%rowtype;
  v_session public.sessions%rowtype;
  v_rubric jsonb;
  v_total int := 0;
  v_crit jsonb;
  v_score int;
  v_eval uuid;
begin
  select * into v_sub from public.submissions where id = p_submission_id for update;
  if v_sub.id is null or not public.is_session_trainer(v_sub.session_id) then
    raise exception 'Réservé au formateur de la session';
  end if;
  if v_sub.current_version = 0 then
    raise exception 'Aucune version remise';
  end if;
  if p_decision not in ('validated', 'needs_revision', 'comment') then
    raise exception 'Décision inconnue';
  end if;
  select * into v_session from public.sessions where id = v_sub.session_id;
  v_rubric := v_session.rubric_snapshot;

  for v_crit in select * from jsonb_array_elements(v_rubric -> 'criteria') loop
    v_score := coalesce((p_scores ->> (v_crit ->> 'key'))::int, 0);
    if v_score < 0 or v_score > coalesce((v_crit ->> 'max')::int, 2) then
      raise exception 'Score hors barème pour %', v_crit ->> 'label';
    end if;
    v_total := v_total + v_score;
  end loop;

  if p_decision = 'validated' and p_critical_error then
    raise exception 'Une erreur critique non corrigée empêche la validation';
  end if;

  insert into public.evaluations (submission_id, version_number, evaluator_id, rubric, scores, total, decision, critical_error, feedback_public)
  values (p_submission_id, v_sub.current_version, auth.uid(), v_rubric, coalesce(p_scores, '{}'::jsonb), v_total, p_decision, coalesce(p_critical_error, false), coalesce(p_feedback_public, ''))
  returning id into v_eval;

  insert into public.evaluation_notes (evaluation_id, note) values (v_eval, coalesce(p_note_private, ''));

  if p_decision = 'validated' then
    update public.submissions set status = 'validated' where id = p_submission_id;
  elsif p_decision = 'needs_revision' then
    update public.submissions set status = 'needs_revision' where id = p_submission_id;
  end if;

  perform public.log_event(v_sub.session_id, 'evaluation.recorded', jsonb_build_object('submission_id', p_submission_id, 'version', v_sub.current_version, 'decision', p_decision));
  return v_eval;
end;
$$;

-- -----------------------------------------------------------------------------
-- Publication d'un exemple au groupe (copie explicite, avec accord de l'auteur).
-- -----------------------------------------------------------------------------
create or replace function public.publish_example(p_submission_id uuid, p_title text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sub public.submissions%rowtype;
  v_version public.submission_versions%rowtype;
  v_id uuid;
begin
  select * into v_sub from public.submissions where id = p_submission_id;
  if v_sub.id is null or not public.is_session_trainer(v_sub.session_id) then
    raise exception 'Réservé au formateur de la session';
  end if;
  if not v_sub.share_consent then
    raise exception 'L''auteur n''a pas autorisé le partage de cette production';
  end if;
  select * into v_version from public.submission_versions
  where submission_id = p_submission_id order by version_number desc limit 1;
  if v_version.id is null then
    raise exception 'Aucune version remise';
  end if;
  insert into public.shared_examples (session_id, title, content, source_submission_id, published_by)
  values (v_sub.session_id, p_title, v_version.content, p_submission_id, auth.uid())
  returning id into v_id;
  perform public.log_event(v_sub.session_id, 'example.published', jsonb_build_object('submission_id', p_submission_id));
  return v_id;
end;
$$;

-- -----------------------------------------------------------------------------
-- Versions de programme : brouillon, publication, historique.
-- -----------------------------------------------------------------------------
create or replace function public.create_draft_version(p_program_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_src public.program_versions%rowtype;
  v_new uuid;
  v_tpl record;
  v_new_tpl uuid;
begin
  if not public.is_trainer() then
    raise exception 'Réservé aux formateurs';
  end if;
  if exists (select 1 from public.program_versions where program_id = p_program_id and status = 'draft') then
    raise exception 'Un brouillon existe déjà pour ce programme';
  end if;
  select * into v_src from public.program_versions where program_id = p_program_id order by version_number desc limit 1;
  insert into public.program_versions (program_id, version_number, status, editorial_reference, changelog, rubric, objectives, created_by)
  values (p_program_id, coalesce(v_src.version_number, 0) + 1, 'draft', coalesce(v_src.editorial_reference, ''), '', coalesce(v_src.rubric, '{}'::jsonb), coalesce(v_src.objectives, '[]'::jsonb), auth.uid())
  returning id into v_new;
  if v_src.id is not null then
    for v_tpl in
      select t.*, p.content as private_content from public.workshop_templates t
      left join public.workshop_private p on p.workshop_template_id = t.id
      where t.program_version_id = v_src.id order by t.position
    loop
      insert into public.workshop_templates (program_version_id, position, code, title, seance, duration_min, breakdown, content)
      values (v_new, v_tpl.position, v_tpl.code, v_tpl.title, v_tpl.seance, v_tpl.duration_min, v_tpl.breakdown, v_tpl.content)
      returning id into v_new_tpl;
      insert into public.workshop_private (workshop_template_id, content)
      values (v_new_tpl, coalesce(v_tpl.private_content, '{"answer_key": "", "trainer_notes": ""}'::jsonb));
    end loop;
  end if;
  return v_new;
end;
$$;

create or replace function public.publish_version(p_version_id uuid, p_changelog text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_version public.program_versions%rowtype;
  v_bad record;
begin
  if not public.is_trainer() then
    raise exception 'Réservé aux formateurs';
  end if;
  select * into v_version from public.program_versions where id = p_version_id;
  if v_version.id is null or v_version.status <> 'draft' then
    raise exception 'Seul un brouillon peut être publié';
  end if;
  -- Chaque répartition doit totaliser la durée de la séquence.
  for v_bad in
    select t.code, t.duration_min,
      (select coalesce(sum((b ->> 'minutes')::int), 0) from jsonb_array_elements(t.breakdown) b) as total
    from public.workshop_templates t where t.program_version_id = p_version_id
  loop
    if v_bad.total <> v_bad.duration_min then
      raise exception 'Répartition incohérente pour % (% min annoncées, % min réparties)', v_bad.code, v_bad.duration_min, v_bad.total;
    end if;
  end loop;
  update public.program_versions set status = 'archived' where program_id = v_version.program_id and status = 'published';
  update public.program_versions set status = 'published', published_at = now(), changelog = coalesce(p_changelog, changelog) where id = p_version_id;
end;
$$;

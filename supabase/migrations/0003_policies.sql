-- =============================================================================
-- Politiques RLS. Principes :
--  - le formateur n'accède qu'aux sessions qu'il anime (sauf contenus modèles) ;
--  - le participant n'accède qu'à son groupe, ses productions et celles de son
--    binôme ; les exemples partagés sont des copies explicites ;
--  - corrigés, notes privées et clés de quiz sont protégés séparément ;
--  - changer un identifiant ne donne aucun accès supplémentaire.
-- =============================================================================

alter table public.profiles enable row level security;
alter table public.app_settings enable row level security;
alter table public.programs enable row level security;
alter table public.program_versions enable row level security;
alter table public.workshop_templates enable row level security;
alter table public.workshop_private enable row level security;
alter table public.resources enable row level security;
alter table public.tool_cards enable row level security;
alter table public.tool_card_history enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.sessions enable row level security;
alter table public.session_workshops enable row level security;
alter table public.session_workshop_private enable row level security;
alter table public.enrollments enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_versions enable row level security;
alter table public.help_requests enable row level security;
alter table public.evaluations enable row level security;
alter table public.evaluation_notes enable row level security;
alter table public.peer_reviews enable row level security;
alter table public.polls enable row level security;
alter table public.poll_keys enable row level security;
alter table public.poll_answers enable row level security;
alter table public.ideas enable row level security;
alter table public.action_plans enable row level security;
alter table public.shared_examples enable row level security;
alter table public.session_events enable row level security;

-- profiles --------------------------------------------------------------------
create policy profiles_select on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_trainer() or public.shares_session_with(id));
create policy profiles_update_self on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_trainer()) with check (id = auth.uid() or public.is_trainer());

-- app_settings ----------------------------------------------------------------
create policy app_settings_select on public.app_settings for select to authenticated using (true);
create policy app_settings_write on public.app_settings for all to authenticated
  using (public.is_trainer()) with check (public.is_trainer());

-- programmes et modèles : formateurs uniquement ------------------------------
create policy programs_trainer on public.programs for all to authenticated
  using (public.is_trainer()) with check (public.is_trainer());
create policy program_versions_trainer on public.program_versions for all to authenticated
  using (public.is_trainer()) with check (public.is_trainer());
create policy workshop_templates_trainer on public.workshop_templates for all to authenticated
  using (public.is_trainer()) with check (public.is_trainer());
create policy workshop_private_trainer on public.workshop_private for all to authenticated
  using (public.is_trainer()) with check (public.is_trainer());

-- ressources : les ressources réservées au formateur restent invisibles -----
create policy resources_select on public.resources for select to authenticated
  using (not trainer_only or public.is_trainer());
create policy resources_write on public.resources for all to authenticated
  using (public.is_trainer()) with check (public.is_trainer());

-- bibliothèque d'outils ------------------------------------------------------
create policy tool_cards_select on public.tool_cards for select to authenticated using (true);
create policy tool_cards_write on public.tool_cards for all to authenticated
  using (public.is_trainer()) with check (public.is_trainer());
create policy tool_card_history_trainer on public.tool_card_history for select to authenticated
  using (public.is_trainer());

-- questions de contrôle : la clé reste côté formateur ------------------------
create policy quiz_questions_trainer on public.quiz_questions for all to authenticated
  using (public.is_trainer()) with check (public.is_trainer());

-- sessions --------------------------------------------------------------------
create policy sessions_select on public.sessions for select to authenticated
  using (trainer_id = auth.uid() or public.is_session_member(id));
create policy sessions_insert on public.sessions for insert to authenticated
  with check (public.is_trainer() and trainer_id = auth.uid());
create policy sessions_update on public.sessions for update to authenticated
  using (trainer_id = auth.uid()) with check (trainer_id = auth.uid());
create policy sessions_delete on public.sessions for delete to authenticated
  using (trainer_id = auth.uid());

-- ateliers de session ---------------------------------------------------------
create policy session_workshops_select on public.session_workshops for select to authenticated
  using (public.is_session_trainer(session_id) or public.is_session_member(session_id));
create policy session_workshops_write on public.session_workshops for all to authenticated
  using (public.is_session_trainer(session_id)) with check (public.is_session_trainer(session_id));

create policy session_workshop_private_select on public.session_workshop_private for select to authenticated
  using (public.can_read_workshop_private(session_workshop_id));
create policy session_workshop_private_write on public.session_workshop_private for all to authenticated
  using (public.is_session_trainer(public.session_of_workshop(session_workshop_id)))
  with check (public.is_session_trainer(public.session_of_workshop(session_workshop_id)));

-- inscriptions ----------------------------------------------------------------
create policy enrollments_select on public.enrollments for select to authenticated
  using (public.is_session_trainer(session_id) or user_id = auth.uid());
create policy enrollments_insert on public.enrollments for insert to authenticated
  with check (public.is_session_trainer(session_id));
create policy enrollments_update on public.enrollments for update to authenticated
  using (public.is_session_trainer(session_id) or user_id = auth.uid())
  with check (public.is_session_trainer(session_id) or user_id = auth.uid());
create policy enrollments_delete on public.enrollments for delete to authenticated
  using (public.is_session_trainer(session_id));

-- binômes ---------------------------------------------------------------------
create policy teams_select on public.teams for select to authenticated
  using (public.is_session_trainer(session_id) or public.is_session_member(session_id));
create policy teams_write on public.teams for all to authenticated
  using (public.is_session_trainer(session_id)) with check (public.is_session_trainer(session_id));
create policy team_members_select on public.team_members for select to authenticated
  using (exists (select 1 from public.teams t where t.id = team_id
    and (public.is_session_trainer(t.session_id) or public.is_session_member(t.session_id))));
create policy team_members_write on public.team_members for all to authenticated
  using (exists (select 1 from public.teams t where t.id = team_id and public.is_session_trainer(t.session_id)))
  with check (exists (select 1 from public.teams t where t.id = team_id and public.is_session_trainer(t.session_id)));

-- productions -----------------------------------------------------------------
-- (conditions écrites en ligne : une fonction stable lisant la même table ne
-- verrait pas la ligne en cours d'insertion lors d'un RETURNING)
create policy submissions_select on public.submissions for select to authenticated
  using (owner_id = auth.uid() or (team_id is not null and public.is_team_member(team_id)) or public.is_session_trainer(session_id));
create policy submissions_insert on public.submissions for insert to authenticated
  with check (
    owner_id = auth.uid()
    and public.is_session_member(session_id)
    and session_id = public.session_of_workshop(session_workshop_id)
    and (team_id is null or public.is_team_member(team_id))
    and exists (select 1 from public.session_workshops sw where sw.id = session_workshop_id and sw.status <> 'locked')
    and exists (select 1 from public.sessions s where s.id = session_id and s.status = 'open')
  );
create policy submissions_update on public.submissions for update to authenticated
  using (owner_id = auth.uid() or (team_id is not null and public.is_team_member(team_id)) or public.is_session_trainer(session_id))
  with check (owner_id = auth.uid() or (team_id is not null and public.is_team_member(team_id)) or public.is_session_trainer(session_id));
create policy submissions_delete on public.submissions for delete to authenticated
  using (public.is_session_trainer(session_id));

create policy submission_versions_select on public.submission_versions for select to authenticated
  using (public.can_read_submission(submission_id));
-- insertion uniquement via submit_submission() (security definer)
create policy submission_versions_delete on public.submission_versions for delete to authenticated
  using (exists (select 1 from public.submissions s where s.id = submission_id and public.is_session_trainer(s.session_id)));

-- demandes d'aide -------------------------------------------------------------
create policy help_requests_select on public.help_requests for select to authenticated
  using (public.is_session_trainer(session_id) or requester_id = auth.uid()
    or (team_id is not null and public.is_team_member(team_id)));
create policy help_requests_insert on public.help_requests for insert to authenticated
  with check (requester_id = auth.uid() and public.is_session_member(session_id)
    and (team_id is null or public.is_team_member(team_id)));
create policy help_requests_update on public.help_requests for update to authenticated
  using (public.is_session_trainer(session_id) or requester_id = auth.uid())
  with check (public.is_session_trainer(session_id) or requester_id = auth.uid());

-- évaluations (lecture : formateur, auteur et binôme ; écriture via RPC) ------
create policy evaluations_select on public.evaluations for select to authenticated
  using (public.can_read_submission(submission_id));
create policy evaluations_delete on public.evaluations for delete to authenticated
  using (exists (select 1 from public.submissions s where s.id = submission_id and public.is_session_trainer(s.session_id)));
create policy evaluation_notes_trainer on public.evaluation_notes for select to authenticated
  using (exists (select 1 from public.evaluations e join public.submissions s on s.id = e.submission_id
    where e.id = evaluation_id and public.is_session_trainer(s.session_id)));

-- appréciations entre pairs (sur les exemples partagés) -----------------------
create policy peer_reviews_select on public.peer_reviews for select to authenticated
  using (
    reviewer_id = auth.uid()
    or (submission_id is not null and public.can_read_submission(submission_id))
    or exists (select 1 from public.shared_examples x where x.id = shared_example_id and public.is_session_trainer(x.session_id))
  );
create policy peer_reviews_insert on public.peer_reviews for insert to authenticated
  with check (
    reviewer_id = auth.uid()
    and exists (
      select 1 from public.shared_examples x join public.sessions s on s.id = x.session_id
      where x.id = shared_example_id and s.peer_review_enabled and public.is_session_member(x.session_id)
    )
  );

-- sondages, quiz, débrief -----------------------------------------------------
create policy polls_select on public.polls for select to authenticated
  using (public.is_session_trainer(session_id) or public.is_session_member(session_id));
create policy polls_write on public.polls for all to authenticated
  using (public.is_session_trainer(session_id)) with check (public.is_session_trainer(session_id));
create policy poll_keys_select on public.poll_keys for select to authenticated
  using (exists (select 1 from public.polls p where p.id = poll_id
    and (public.is_session_trainer(p.session_id) or (p.status = 'closed' and public.is_session_member(p.session_id)))));
create policy poll_keys_write on public.poll_keys for all to authenticated
  using (exists (select 1 from public.polls p where p.id = poll_id and public.is_session_trainer(p.session_id)))
  with check (exists (select 1 from public.polls p where p.id = poll_id and public.is_session_trainer(p.session_id)));
create policy poll_answers_select on public.poll_answers for select to authenticated
  using (user_id = auth.uid() or exists (select 1 from public.polls p where p.id = poll_id and public.is_session_trainer(p.session_id)));
create policy poll_answers_insert on public.poll_answers for insert to authenticated
  with check (user_id = auth.uid() and exists (select 1 from public.polls p where p.id = poll_id and p.status = 'open' and public.is_session_member(p.session_id)));
create policy poll_answers_update on public.poll_answers for update to authenticated
  using (user_id = auth.uid() and exists (select 1 from public.polls p where p.id = poll_id and p.status = 'open'))
  with check (user_id = auth.uid());

-- mur d'idées -----------------------------------------------------------------
create policy ideas_select on public.ideas for select to authenticated
  using (public.is_session_trainer(session_id) or public.is_session_member(session_id));
create policy ideas_insert on public.ideas for insert to authenticated
  with check (author_id = auth.uid() and (public.is_session_member(session_id) or public.is_session_trainer(session_id)));
create policy ideas_delete on public.ideas for delete to authenticated
  using (author_id = auth.uid() or public.is_session_trainer(session_id));

-- plans d'application ---------------------------------------------------------
create policy action_plans_select on public.action_plans for select to authenticated
  using (user_id = auth.uid() or public.is_session_trainer(session_id));
create policy action_plans_insert on public.action_plans for insert to authenticated
  with check (user_id = auth.uid() and public.is_session_member(session_id));
create policy action_plans_update on public.action_plans for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- exemples partagés (copies) --------------------------------------------------
create policy shared_examples_select on public.shared_examples for select to authenticated
  using (public.is_session_trainer(session_id) or public.is_session_member(session_id));
create policy shared_examples_delete on public.shared_examples for delete to authenticated
  using (public.is_session_trainer(session_id));

-- journal ---------------------------------------------------------------------
create policy session_events_select on public.session_events for select to authenticated
  using (public.is_session_trainer(session_id));

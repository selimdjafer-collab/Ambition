-- =============================================================================
-- Scénario d'acceptation serveur (RLS + RPC), exécuté avec psql sur une base
-- où les migrations et le seed ont été appliqués (voir scripts/db-test.sh).
-- Chaque bloc « assert » lève une exception en cas d'écart : ON_ERROR_STOP
-- arrête le script, la sortie finale « ACCEPTATION OK » prouve le passage.
-- =============================================================================
\set ON_ERROR_STOP on
\set QUIET on
\pset format unaligned
\pset tuples_only on

-- Helpers -------------------------------------------------------------------
create or replace function pg_temp.as_user(p_uid uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claim.sub', coalesce(p_uid::text, ''), false);
  perform set_config('request.jwt.claim.role', case when p_uid is null then 'anon' else 'authenticated' end, false);
end $$;

create or replace function pg_temp.assert(p_cond boolean, p_msg text) returns void language plpgsql as $$
begin
  if not coalesce(p_cond, false) then raise exception 'ÉCHEC : %', p_msg; end if;
  raise notice 'ok : %', p_msg;
end $$;

-- Comptes (créés par le trigger on_auth_user_created) -----------------------
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-4000-8000-000000000001', 'formateur@test.local', '{"display_name": "Formateur T"}'),
  ('00000000-0000-4000-8000-000000000002', 'amel@test.local', '{"display_name": "Amel"}'),
  ('00000000-0000-4000-8000-000000000003', 'bastien@test.local', '{"display_name": "Bastien"}'),
  ('00000000-0000-4000-8000-000000000004', 'chloe@test.local', '{"display_name": "Chloé"}'),
  ('00000000-0000-4000-8000-000000000005', 'autre.formateur@test.local', '{"display_name": "Formateur U"}')
on conflict (id) do nothing;

\set T '00000000-0000-4000-8000-000000000001'
\set A '00000000-0000-4000-8000-000000000002'
\set B '00000000-0000-4000-8000-000000000003'
\set C '00000000-0000-4000-8000-000000000004'
\set U '00000000-0000-4000-8000-000000000005'

select pg_temp.assert((select count(*) from public.profiles where role = 'participant') >= 5, 'tout nouveau compte est participant');

-- Premier formateur : fonction réservée au rôle service (éditeur SQL) --------
select public.bootstrap_trainer('formateur@test.local');
select public.bootstrap_trainer('autre.formateur@test.local');
select pg_temp.assert((select role from public.profiles where id = :'T') = 'trainer', 'bootstrap_trainer active le formateur');
select pg_temp.assert(not has_function_privilege('authenticated', 'public.bootstrap_trainer(text)', 'execute'), 'bootstrap_trainer non exécutable par les clients');

-- 7) Un participant ne peut pas changer son rôle ----------------------------
set role authenticated;
select pg_temp.as_user(:'A');
do $$ begin
  update public.profiles set role = 'trainer' where id = auth.uid();
  raise exception 'ÉCHEC : un participant a pu changer son rôle';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : changement de rôle refusé (%)', sqlerrm;
end $$;
reset role;
select pg_temp.assert((select role from public.profiles where id = :'A') = 'participant', 'rôle inchangé');

-- 1) Le formateur crée une session ; seuls les membres approuvés la rejoignent
set role authenticated;
select pg_temp.as_user(:'T');
select public.create_session_from_version((select id from public.program_versions where status = 'published' limit 1), 'Session test', 'presentiel', '2026-10-15', '2026-10-22', 10, false) as sid \gset
select pg_temp.assert((select count(*) from public.session_workshops where session_id = :'sid') = 11, '11 ateliers instantanés dans la session');
select pg_temp.assert((select sum(duration_min) from public.session_workshops where session_id = :'sid') = 420, '420 minutes dans la session');
select pg_temp.assert(not exists (select 1 from public.session_workshops where session_id = :'sid' and content ? 'hints'), 'les aides ne sont pas dans le contenu publié');
select pg_temp.assert((select count(*) from public.session_workshop_private p join public.session_workshops w on w.id = p.session_workshop_id where w.session_id = :'sid' and jsonb_array_length(p.content -> 'hints') = 3) = 11, 'les aides sont dans le contenu privé');
update public.sessions set status = 'prepared' where id = :'sid';
select join_code from public.sessions where id = :'sid' \gset
insert into public.enrollments (session_id, invited_email, display_name, status) values (:'sid', 'bastien@test.local', 'Bastien', 'invited');

-- A demande à rejoindre -> en attente
select pg_temp.as_user(:'A');
select (public.request_join(:'join_code') ->> 'status') as st_a \gset
select pg_temp.assert(:'st_a' = 'pending', 'A est en attente d’approbation');
select pg_temp.assert((select count(*) from public.sessions where id = :'sid') = 0, 'A (en attente) ne voit pas la session');
-- B invité par e-mail -> approuvé automatiquement
select pg_temp.as_user(:'B');
select (public.request_join(:'join_code') ->> 'status') as st_b \gset
select pg_temp.assert(:'st_b' = 'approved', 'B invité par e-mail est approuvé automatiquement');
select pg_temp.assert((select count(*) from public.sessions where id = :'sid') = 1, 'B voit la session');
-- C demande, restera en attente
select pg_temp.as_user(:'C');
select public.request_join(:'join_code');
-- Mauvais code
do $$ begin
  perform public.request_join('ZZZZZZ');
  raise exception 'ÉCHEC : code inconnu accepté';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : code inconnu refusé';
end $$;
-- Un participant ne peut pas s’approuver lui-même
select pg_temp.as_user(:'A');
do $$ begin
  update public.enrollments set status = 'approved' where user_id = auth.uid();
  raise exception 'ÉCHEC : auto-approbation possible';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : auto-approbation refusée';
end $$;
-- Le formateur approuve A
select pg_temp.as_user(:'T');
update public.enrollments set status = 'approved' where session_id = :'sid' and user_id = :'A';
select pg_temp.as_user(:'A');
select pg_temp.assert((select count(*) from public.sessions where id = :'sid') = 1, 'A approuvé voit la session');
select pg_temp.as_user(:'C');
select pg_temp.assert((select count(*) from public.sessions where id = :'sid') = 0, 'C (non approuvé) ne voit pas la session');
select pg_temp.assert((select count(*) from public.session_workshops where session_id = :'sid') = 0, 'C ne voit pas les ateliers');

-- Un autre formateur ne voit pas cette session
select pg_temp.as_user(:'U');
select pg_temp.assert((select count(*) from public.sessions where id = :'sid') = 0, 'un autre formateur ne voit pas la session');
do $$ begin
  perform public.timer_control((select id from public.sessions where title = 'Session test' limit 1), 'start', 60);
exception when others then raise notice 'ok : autre formateur ne contrôle pas le minuteur (%)', sqlerrm; end $$;

-- 2) Ouverture d’un atelier, minuteur cohérent --------------------------------
select pg_temp.as_user(:'T');
update public.sessions set status = 'open' where id = :'sid';
select id as a1 from public.session_workshops where session_id = :'sid' and code = 'A1' \gset
update public.session_workshops set status = 'open' where id = :'a1';
update public.sessions set current_session_workshop_id = :'a1' where id = :'sid';
select public.timer_control(:'sid', 'start', 1920, 'A1 — production') as timer1 \gset
select pg_temp.assert((:'timer1'::jsonb ->> 'status') = 'running' and (:'timer1'::jsonb ->> 'ends_at') is not null, 'minuteur lancé côté serveur');
select pg_temp.as_user(:'A');
select pg_temp.assert((select (timer ->> 'ends_at') from public.sessions where id = :'sid') = (:'timer1'::jsonb ->> 'ends_at'), 'A lit la même échéance après « rechargement »');
select pg_temp.assert((select status from public.session_workshops where id = :'a1') = 'open', 'A voit l’atelier ouvert');
-- A ne peut pas modifier le minuteur
do $$ begin
  perform public.timer_control((select session_id from public.session_workshops limit 1), 'pause');
  raise exception 'ÉCHEC : participant a contrôlé le minuteur';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : minuteur refusé au participant';
end $$;
update public.sessions set timer = '{"status":"finished"}'::jsonb where id = :'sid';
select pg_temp.assert((select (timer ->> 'status') from public.sessions where id = :'sid') = 'running', 'mise à jour directe du minuteur par A sans effet (RLS)');

-- Binôme A + B
select pg_temp.as_user(:'T');
insert into public.teams (session_id, name, kind) values (:'sid', 'Binôme 1', 'pair') returning id as team1 \gset
insert into public.team_members (team_id, user_id) values (:'team1', :'A'), (:'team1', :'B');

-- 3) + 5) Dépôt en binôme, retour, V2, V1 conservée ---------------------------
select pg_temp.as_user(:'A');
insert into public.submissions (session_id, session_workshop_id, owner_id, team_id, draft)
values (:'sid', :'a1', :'A', :'team1', '{"text":"brouillon A","acknowledged_fictional_only":false}'::jsonb) returning id as sub1 \gset
select pg_temp.as_user(:'B');
select pg_temp.assert((select count(*) from public.submissions where id = :'sub1') = 1, 'B (binôme) lit la production commune');
update public.submissions set draft = '{"text":"brouillon B","acknowledged_fictional_only":true}'::jsonb where id = :'sub1';
select pg_temp.assert((select updated_by from public.submissions where id = :'sub1') = :'B', 'updated_by = B (détection de conflit)');
select pg_temp.as_user(:'C');
select pg_temp.assert((select count(*) from public.submissions where id = :'sub1') = 0, 'C ne lit pas la production du binôme');
-- Remise par A (le drapeau fictif est posé par B)
select pg_temp.as_user(:'A');
select public.submit_submission(:'sub1') as v1 \gset
select pg_temp.assert(:'v1' = '1', 'V1 remise');
select pg_temp.assert((select status from public.submissions where id = :'sub1') = 'submitted', 'statut remis');
select pg_temp.assert((select jsonb_array_length(contributors) from public.submission_versions where submission_id = :'sub1' and version_number = 1) = 2, 'deux contributeurs enregistrés');
-- A ne peut pas se valider
do $$ begin
  update public.submissions set status = 'validated' where owner_id = auth.uid();
  raise exception 'ÉCHEC : participant a changé son statut';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : changement de statut refusé (%)', sqlerrm;
end $$;
-- A ne peut pas insérer une évaluation
do $$ begin
  insert into public.evaluations (submission_id, version_number, evaluator_id, rubric, scores, total, decision)
  select id, 1, auth.uid(), '{}'::jsonb, '{}'::jsonb, 10, 'validated' from public.submissions where owner_id = auth.uid();
  raise exception 'ÉCHEC : participant a inséré une évaluation';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : auto-évaluation refusée';
end $$;
-- Le formateur évalue : correction demandée, note privée
select pg_temp.as_user(:'T');
select public.record_evaluation(:'sub1', '{"c1":1,"c2":1,"c3":0,"c4":1,"c5":0}'::jsonb, 'needs_revision', false, 'Reprenez le tableau d’actions.', 'NOTE PRIVÉE') as ev1 \gset
select pg_temp.assert((select total from public.evaluations where id = :'ev1') = 3, 'somme calculée par le serveur');
select pg_temp.assert((select status from public.submissions where id = :'sub1') = 'needs_revision', 'statut à améliorer');
do $$ begin
  perform public.record_evaluation((select id from public.submissions limit 1), '{"c1":2,"c2":2,"c3":2,"c4":2,"c5":2}'::jsonb, 'validated', true, '', '');
  raise exception 'ÉCHEC : validation avec erreur critique acceptée';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : validation refusée avec erreur critique';
end $$;
select pg_temp.as_user(:'A');
select pg_temp.assert((select count(*) from public.evaluations where submission_id = :'sub1') = 1, 'A voit son évaluation');
select pg_temp.assert((select count(*) from public.evaluation_notes where evaluation_id = :'ev1') = 0, 'A ne voit pas la note privée');
update public.submissions set draft = '{"text":"version corrigée","acknowledged_fictional_only":true}'::jsonb where id = :'sub1';
select public.submit_submission(:'sub1') as v2 \gset
select pg_temp.assert(:'v2' = '2', 'V2 remise');
select pg_temp.assert((select count(*) from public.submission_versions where submission_id = :'sub1') = 2, 'V1 conservée avec V2');
select pg_temp.assert((select content ->> 'text' from public.submission_versions where submission_id = :'sub1' and version_number = 1) = 'brouillon B', 'contenu V1 intact');
select pg_temp.as_user(:'T');
select public.record_evaluation(:'sub1', '{"c1":2,"c2":2,"c3":2,"c4":1,"c5":2}'::jsonb, 'validated', false, 'Bien.', '');
select pg_temp.assert((select status from public.submissions where id = :'sub1') = 'validated', 'V2 validée');
select pg_temp.as_user(:'A');
do $$ begin
  update public.submissions set draft = '{"text":"après validation"}'::jsonb where owner_id = auth.uid();
  raise exception 'ÉCHEC : modification après validation';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : production validée non modifiable';
end $$;

-- 4) Demande d’aide ------------------------------------------------------------
select pg_temp.as_user(:'A');
insert into public.help_requests (session_id, session_workshop_id, requester_id, team_id, reason) values (:'sid', :'a1', :'A', :'team1', 'Bloqué sur le tableau') returning id as help1 \gset
select pg_temp.as_user(:'T');
select pg_temp.assert((select count(*) from public.help_requests where id = :'help1' and status = 'open') = 1, 'le formateur reçoit la demande');
update public.help_requests set status = 'resolved', resolved_at = now() where id = :'help1';
select pg_temp.as_user(:'C');
select pg_temp.assert((select count(*) from public.help_requests where id = :'help1') = 0, 'C ne voit pas la demande');

-- 6) Accès refusé : autre session, fichier privé, corrigé fermé ----------------
select pg_temp.as_user(:'T');
select public.create_session_from_version((select id from public.program_versions where status = 'published' limit 1), 'Autre session', 'visio', null, null, 8, false) as sid2 \gset
select pg_temp.as_user(:'A');
select pg_temp.assert((select count(*) from public.sessions where id = :'sid2') = 0, 'A ne voit pas une autre session (ID connu)');
select pg_temp.assert((select count(*) from public.session_workshops where session_id = :'sid2') = 0, 'A ne voit pas ses ateliers');
select pg_temp.assert((select count(*) from public.session_workshop_private where session_workshop_id = :'a1') = 0, 'corrigé fermé inaccessible (ID connu)');
select pg_temp.assert(jsonb_array_length(public.get_revealed_hints(:'a1')) = 0, 'aucune aide tant que rien n’est révélé');
select pg_temp.assert((select count(*) from public.resources where code = 'R8') = 0, 'ressource réservée au formateur invisible');
select pg_temp.as_user(:'T');
update public.session_workshops set hints_revealed = 2 where id = :'a1';
select pg_temp.as_user(:'A');
select pg_temp.assert(jsonb_array_length(public.get_revealed_hints(:'a1')) = 2, 'indice et trame révélés, pas l’exemple');
select pg_temp.as_user(:'T');
update public.session_workshops set answer_key_revealed = true where id = :'a1';
select pg_temp.as_user(:'A');
select pg_temp.assert((select count(*) from public.session_workshop_private where session_workshop_id = :'a1') = 1, 'corrigé lisible une fois révélé');
select pg_temp.as_user(:'T');
select pg_temp.assert((select count(*) from public.resources where code = 'R8') = 1, 'le formateur voit la ressource réservée');

-- Stockage privé : chemin {session}/{submission}/{fichier}
select pg_temp.as_user(:'B');
-- ACC est encore verrouillé : l'insertion doit échouer
do $$ begin
  insert into public.submissions (session_id, session_workshop_id, owner_id, team_id, draft)
  select session_id, id, auth.uid(), null, '{}'::jsonb from public.session_workshops where code = 'ACC' and status = 'locked' limit 1;
  raise exception 'ÉCHEC : dépôt accepté sur un atelier fermé';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : dépôt refusé sur un atelier fermé';
end $$;
select pg_temp.as_user(:'T');
update public.session_workshops set status = 'open' where session_id = :'sid' and code = 'ACC';
select pg_temp.as_user(:'B');
insert into public.submissions (session_id, session_workshop_id, owner_id, team_id, draft) values (:'sid', (select id from public.session_workshops where session_id = :'sid' and code = 'ACC'), :'B', null, '{}'::jsonb) returning id as subb \gset
insert into storage.objects (bucket_id, name) values ('submissions', :'sid' || '/' || :'subb' || '/affiche.png');
select pg_temp.assert((select count(*) from storage.objects where name like :'sid' || '/%') = 1, 'B dépose un fichier sur sa production');
select pg_temp.as_user(:'A');
select pg_temp.assert((select count(*) from storage.objects where name like :'sid' || '/' || :'subb' || '/%') = 0, 'A ne voit pas le fichier individuel de B');
do $$ begin
  insert into storage.objects (bucket_id, name) select 'submissions', name || '.bis' from storage.objects limit 1;
  insert into storage.objects (bucket_id, name) values ('submissions', 'x/y/z.pdf');
  raise exception 'ÉCHEC : dépôt sur un chemin étranger accepté';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : dépôt sur un chemin étranger refusé';
end $$;
select pg_temp.as_user(:'T');
select pg_temp.assert((select count(*) from storage.objects where name like :'sid' || '/%') = 1, 'le formateur de la session voit le fichier');
select pg_temp.as_user(:'U');
select pg_temp.assert((select count(*) from storage.objects where name like :'sid' || '/%') = 0, 'un autre formateur ne voit pas le fichier');

-- Quiz : la clé reste cachée jusqu’à la clôture ---------------------------------
select pg_temp.as_user(:'T');
insert into public.polls (session_id, kind, question, options) select :'sid', 'quiz', question, options from public.quiz_questions where position = 1 returning id as poll1 \gset
insert into public.poll_keys (poll_id, correct_index, explanation) select :'poll1', correct_index, explanation from public.quiz_questions where position = 1;
select pg_temp.as_user(:'A');
select pg_temp.assert((select count(*) from public.quiz_questions) = 0, 'les questions avec corrigé ne sont pas lisibles par A');
select pg_temp.assert((select count(*) from public.poll_keys where poll_id = :'poll1') = 0, 'clé du quiz cachée tant que le sondage est ouvert');
insert into public.poll_answers (poll_id, user_id, answer_index) values (:'poll1', :'A', 0);
select pg_temp.as_user(:'T');
update public.polls set status = 'closed' where id = :'poll1';
select pg_temp.as_user(:'A');
select pg_temp.assert((select count(*) from public.poll_keys where poll_id = :'poll1') = 1, 'clé visible après clôture');

-- Exemples partagés : copie explicite, accord de l’auteur --------------------
select pg_temp.as_user(:'T');
do $$ begin
  perform public.publish_example((select id from public.submissions where team_id is not null limit 1), 'Exemple');
  raise exception 'ÉCHEC : publication sans accord';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : publication refusée sans accord de l’auteur';
end $$;
select pg_temp.as_user(:'B');
update public.submissions set share_consent = true where id = :'sub1';
select pg_temp.as_user(:'T');
select public.publish_example(:'sub1', 'Exemple du binôme 1') as ex1 \gset
select pg_temp.as_user(:'A');
select pg_temp.assert((select count(*) from public.shared_examples where id = :'ex1') = 1, 'A voit l’exemple partagé');
select pg_temp.as_user(:'C');
select pg_temp.assert((select count(*) from public.shared_examples where id = :'ex1') = 0, 'C (hors session) ne voit pas l’exemple');

-- 8) Nouvelle version du programme : session précédente intacte --------------
select pg_temp.as_user(:'T');
select public.create_draft_version((select id from public.programs limit 1)) as draft \gset
update public.workshop_templates set title = 'Accueil modifié v2' where program_version_id = :'draft' and code = 'ACC';
select public.publish_version(:'draft', 'Test');
select pg_temp.assert((select status from public.program_versions where id = :'draft') = 'published', 'v2 publiée');
select pg_temp.assert((select count(*) from public.program_versions where status = 'published') = 1, 'une seule version publiée');
select pg_temp.assert((select title from public.session_workshops where session_id = :'sid' and code = 'ACC') <> 'Accueil modifié v2', 'la session conserve son instantané');
-- Répartition incohérente refusée à la publication
select public.create_draft_version((select id from public.programs limit 1)) as draft2 \gset
update public.workshop_templates set breakdown = '[{"label":"X","minutes":1}]'::jsonb where program_version_id = :'draft2' and code = 'ACC';
do $$ begin
  perform public.publish_version((select id from public.program_versions where status = 'draft'), 'x');
  raise exception 'ÉCHEC : publication avec répartition incohérente';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : publication refusée (%)', sqlerrm;
end $$;

-- Mise à jour explicite d’une consigne de session (note obligatoire) ----------
do $$ begin
  perform public.update_session_workshop((select id from public.session_workshops where code = 'A1' limit 1), '{}'::jsonb, null, null, '');
  raise exception 'ÉCHEC : mise à jour sans note';
exception when others then
  if sqlerrm like 'ÉCHEC%' then raise; end if;
  raise notice 'ok : note de mise à jour obligatoire';
end $$;
select public.update_session_workshop(:'a1', (select content || '{"brief":"Consigne mise à jour"}'::jsonb from public.session_workshops where id = :'a1'), null, null, 'Précision ajoutée');
select pg_temp.assert((select update_note from public.session_workshops where id = :'a1') = 'Précision ajoutée', 'mise à jour tracée');
select pg_temp.assert((select count(*) from public.session_events where session_id = :'sid' and type = 'workshop.content_updated') = 1, 'événement journalisé');

-- Duplication : durées reprises, dates réinitialisées ---------------------------
select public.duplicate_session(:'sid', 'Session dupliquée', null, null) as sid3 \gset
select pg_temp.assert((select sum(duration_min) from public.session_workshops where session_id = :'sid3') = 420, 'duplication : 420 min');
select pg_temp.assert((select start_date is null and status = 'draft' and join_code <> :'join_code' from public.sessions where id = :'sid3'), 'duplication : dates, statut et code réinitialisés');
select pg_temp.assert((select count(*) from public.enrollments where session_id = :'sid3') = 0, 'duplication : aucun participant repris');

-- 12) Dates fictives distinctes des dates de session -----------------------------
select pg_temp.assert((select bool_and(dated_on between '2026-09-01' and '2026-09-30') from public.resources where dated_on is not null), 'ressources fictives datées de septembre 2026');
select pg_temp.assert((select start_date from public.sessions where id = :'sid') = '2026-10-15', 'date de session distincte du cas fictif');

-- Journal sans contenu sensible ------------------------------------------------
select pg_temp.assert(not exists (select 1 from public.session_events where payload::text ilike '%NOTE PRIVÉE%' or payload::text ilike '%brouillon%'), 'le journal ne contient pas le contenu des productions');
select pg_temp.as_user(:'A');
select pg_temp.assert((select count(*) from public.session_events) = 0, 'le journal est réservé au formateur');

reset role;
\echo ACCEPTATION OK

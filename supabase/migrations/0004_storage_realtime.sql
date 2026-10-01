-- =============================================================================
-- Stockage privé et diffusion temps réel.
-- =============================================================================

-- Bucket privé des productions. Chemin : {session_id}/{submission_id}/{nom}
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'submissions', 'submissions', false, 10485760,
  array['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'text/plain', 'text/markdown', 'text/csv',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation']
)
on conflict (id) do nothing;

-- Bucket privé de l'organisme (logo). Lecture réservée aux personnes connectées.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('branding', 'branding', false, 2097152, array['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'])
on conflict (id) do nothing;

create policy submissions_files_select on storage.objects for select to authenticated
  using (
    bucket_id = 'submissions'
    and public.can_read_submission(((storage.foldername(name))[2])::uuid)
  );

create policy submissions_files_insert on storage.objects for insert to authenticated
  with check (
    bucket_id = 'submissions'
    and public.can_edit_submission(((storage.foldername(name))[2])::uuid)
    and exists (
      select 1 from public.submissions s
      where s.id = ((storage.foldername(name))[2])::uuid
        and s.session_id = ((storage.foldername(name))[1])::uuid
        and s.status <> 'validated'
    )
  );

create policy submissions_files_delete on storage.objects for delete to authenticated
  using (
    bucket_id = 'submissions'
    and (
      public.can_edit_submission(((storage.foldername(name))[2])::uuid)
      or public.is_session_trainer(((storage.foldername(name))[1])::uuid)
    )
  );

create policy branding_select on storage.objects for select to authenticated
  using (bucket_id = 'branding');
create policy branding_write on storage.objects for insert to authenticated
  with check (bucket_id = 'branding' and public.is_trainer());
create policy branding_update on storage.objects for update to authenticated
  using (bucket_id = 'branding' and public.is_trainer());
create policy branding_delete on storage.objects for delete to authenticated
  using (bucket_id = 'branding' and public.is_trainer());

-- Temps réel : les changements sont filtrés par les politiques RLS.
alter publication supabase_realtime add table
  public.sessions,
  public.session_workshops,
  public.enrollments,
  public.teams,
  public.team_members,
  public.submissions,
  public.help_requests,
  public.evaluations,
  public.polls,
  public.poll_answers,
  public.ideas,
  public.shared_examples;

-- Les lignes complètes sont nécessaires aux événements de suppression filtrés.
alter table public.help_requests replica identity full;
alter table public.submissions replica identity full;

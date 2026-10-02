-- =============================================================================
-- Boîte à outils des participants (module 2) : fiches d'outils réutilisables,
-- versions, tests sur le cas fictif, partage au groupe par copie.
-- =============================================================================

create table public.toolbox_items (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  team_id uuid references public.teams (id) on delete set null,
  session_workshop_id uuid references public.session_workshops (id) on delete set null,
  source_submission_id uuid references public.submissions (id) on delete set null,
  name text not null,
  family text not null check (family in ('transcription', 'documents', 'recherche', 'schemas', 'images', 'assistants')),
  purpose text not null default '',
  inputs text not null default '',
  instructions text not null default '',
  prompt_template text not null default '',
  output_format text not null default '',
  verification jsonb not null default '[]'::jsonb,
  data_rules text not null default '',
  fallback text not null default '',
  tool_used text not null default '',
  status text not null default 'draft' check (status in ('draft', 'tested', 'ready', 'validated')),
  version int not null default 1,
  history jsonb not null default '[]'::jsonb,
  tests jsonb not null default '[]'::jsonb,
  share_consent boolean not null default false,
  trainer_comment text not null default '',
  deploy_plan text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id) on delete set null
);

create index toolbox_items_session_idx on public.toolbox_items (session_id);
create index toolbox_items_owner_idx on public.toolbox_items (owner_id);

create table public.toolbox_shared (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  title text not null,
  item jsonb not null,
  source_item_id uuid references public.toolbox_items (id) on delete set null,
  published_by uuid not null references public.profiles (id) on delete cascade,
  published_at timestamptz not null default now()
);

create index toolbox_shared_session_idx on public.toolbox_shared (session_id);

create trigger toolbox_items_touch before update on public.toolbox_items for each row execute function public.touch_submission();
create trigger toolbox_items_log after insert or update on public.toolbox_items for each row execute function public.log_status_change();

-- Les participants ne décident pas de la validation ni du commentaire du formateur.
create or replace function public.guard_toolbox_update()
returns trigger
language plpgsql
as $$
begin
  if current_user in ('anon', 'authenticated') and not public.is_session_trainer(old.session_id) then
    if new.trainer_comment is distinct from old.trainer_comment
       or new.owner_id is distinct from old.owner_id
       or new.session_id is distinct from old.session_id
       or (new.status = 'validated' and old.status <> 'validated') then
      raise exception 'Modification refusée : la validation et le commentaire relèvent du formateur';
    end if;
    -- Toute modification de contenu d'un outil validé le repasse en « testé ».
    if old.status = 'validated' and (new.instructions is distinct from old.instructions or new.prompt_template is distinct from old.prompt_template
       or new.verification is distinct from old.verification or new.data_rules is distinct from old.data_rules) then
      new.status := 'tested';
    end if;
  end if;
  return new;
end;
$$;

create trigger toolbox_items_guard before update on public.toolbox_items for each row execute function public.guard_toolbox_update();

alter table public.toolbox_items enable row level security;
alter table public.toolbox_shared enable row level security;

create policy toolbox_items_select on public.toolbox_items for select to authenticated
  using (owner_id = auth.uid() or (team_id is not null and public.is_team_member(team_id)) or public.is_session_trainer(session_id));
create policy toolbox_items_insert on public.toolbox_items for insert to authenticated
  with check (owner_id = auth.uid() and public.is_session_member(session_id) and (team_id is null or public.is_team_member(team_id)));
create policy toolbox_items_update on public.toolbox_items for update to authenticated
  using (owner_id = auth.uid() or (team_id is not null and public.is_team_member(team_id)) or public.is_session_trainer(session_id))
  with check (owner_id = auth.uid() or (team_id is not null and public.is_team_member(team_id)) or public.is_session_trainer(session_id));
create policy toolbox_items_delete on public.toolbox_items for delete to authenticated
  using (owner_id = auth.uid() or public.is_session_trainer(session_id));

create policy toolbox_shared_select on public.toolbox_shared for select to authenticated
  using (public.is_session_trainer(session_id) or public.is_session_member(session_id));
create policy toolbox_shared_delete on public.toolbox_shared for delete to authenticated
  using (public.is_session_trainer(session_id));

-- Publication au groupe : copie explicite, avec l'accord de l'auteur.
create or replace function public.publish_toolbox_item(p_item_id uuid, p_title text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item public.toolbox_items%rowtype;
  v_id uuid;
begin
  select * into v_item from public.toolbox_items where id = p_item_id;
  if v_item.id is null or not public.is_session_trainer(v_item.session_id) then
    raise exception 'Réservé au formateur de la session';
  end if;
  if not v_item.share_consent then
    raise exception 'L''auteur n''a pas autorisé le partage de cet outil';
  end if;
  insert into public.toolbox_shared (session_id, title, item, source_item_id, published_by)
  values (v_item.session_id, p_title,
    jsonb_build_object('name', v_item.name, 'family', v_item.family, 'purpose', v_item.purpose, 'inputs', v_item.inputs,
      'instructions', v_item.instructions, 'prompt_template', v_item.prompt_template, 'output_format', v_item.output_format,
      'verification', v_item.verification, 'data_rules', v_item.data_rules, 'fallback', v_item.fallback,
      'tool_used', v_item.tool_used, 'version', v_item.version),
    p_item_id, auth.uid())
  returning id into v_id;
  perform public.log_event(v_item.session_id, 'toolbox.published', jsonb_build_object('item_id', p_item_id));
  return v_id;
end;
$$;

alter publication supabase_realtime add table public.toolbox_items, public.toolbox_shared;
alter table public.toolbox_items replica identity full;

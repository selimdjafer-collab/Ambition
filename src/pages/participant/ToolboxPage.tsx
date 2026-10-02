import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { ToolSpecForm, type ToolSpec } from '../../components/toolbox/ToolSpecForm';
import { ToolTester } from '../../components/toolbox/ToolTester';
import { ToolHeader, ToolSheet } from '../../components/toolbox/ToolCardItem';
import { EMPTY_BLUEPRINT, sharedToBlueprint, toolboxToMarkdown } from '../../components/toolbox/toolbox';
import { Button, Card, Checkbox, EmptyState, Loading, Modal, Notice, Select, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData } from '../../hooks/useSessionData';
import { downloadText } from '../../lib/csv';
import type { ToolboxItem } from '../../lib/types';

export function ToolboxPage() {
  const { sessionId } = useParams();
  const [params] = useSearchParams();
  const { backend, user, profile } = useAuth();
  const toast = useToast();
  const { data, error, teamOf, profileName } = useSessionData(sessionId);
  const tools = useAsync(() => backend.listToolCards(), [backend]);
  const [editing, setEditing] = useState<{ item: ToolboxItem | null; spec: ToolSpec; workshopId: string | null; fromShared?: string } | null>(null);
  const [testing, setTesting] = useState<ToolboxItem | null>(null);
  const [newVersion, setNewVersion] = useState(false);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<'all' | ToolboxItem['status']>('all');
  const [opened, setOpened] = useState<string | null>(params.get('outil'));

  const team = user ? teamOf(user.id) : null;
  const mine = useMemo(() => (data && user ? data.toolbox.filter((t) => t.owner_id === user.id || (team && t.team_id === team.id)) : []), [data, user, team]);
  const shown = filter === 'all' ? mine : mine.filter((t) => t.status === filter);

  if (error) return <AppShell><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data || !user) return <AppShell><Loading /></AppShell>;
  const { session, workshops } = data;
  const blueprints = workshops.filter((w) => w.status !== 'locked' && w.content.tool_blueprint);

  const startNew = (workshopId: string | null) => {
    const w = workshops.find((x) => x.id === workshopId);
    const bp = w?.content.tool_blueprint;
    setEditing({ item: null, workshopId, spec: { ...(bp ?? EMPTY_BLUEPRINT), tool_used: '', deploy_plan: '' } });
  };
  const save = async () => {
    if (!editing) return;
    if (!editing.spec.name.trim()) return toast('Donnez un nom à l’outil.', 'error');
    setBusy(true);
    try {
      if (editing.item) {
        await backend.updateToolboxItem(editing.item.id, editing.spec, newVersion);
        toast(newVersion ? 'Nouvelle version enregistrée ; la précédente est conservée.' : 'Fiche enregistrée.', 'success');
      } else {
        const w = workshops.find((x) => x.id === editing.workshopId);
        const pair = w?.content.work_mode === 'pair' && team ? team.id : null;
        await backend.createToolboxItem({ ...editing.spec, session_id: session.id, team_id: pair, session_workshop_id: editing.workshopId, source_submission_id: null, share_consent: false });
        toast('Outil ajouté à votre boîte. Testez-le sur le cas fictif.', 'success');
      }
      setEditing(null);
      setNewVersion(false);
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };
  const setStatus = async (t: ToolboxItem, status: ToolboxItem['status']) => {
    try {
      await backend.updateToolboxItem(t.id, { status });
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    }
  };

  return (
    <AppShell wide>
      <Link to={`/p/sessions/${session.id}`} className="underline text-brand-700 text-sm">← {session.title}</Link>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h1 className="text-2xl font-semibold">Ma boîte à outils</h1>
          <p className="text-muted">Chaque outil = une fiche (instructions permanentes, message type, format, vérifications, règles de données, secours), testée sur le cas fictif, versionnée, puis proposée à l’agence.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => downloadText(`boite-a-outils-${(profile?.display_name ?? 'participant').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.md`, toolboxToMarkdown(`Boîte à outils IA — ${profile?.display_name ?? ''}`, mine), 'text/markdown;charset=utf-8')} disabled={!mine.length}>Exporter ma boîte (markdown)</Button>
          <Button variant="primary" onClick={() => startNew(null)} disabled={session.status !== 'open'}>Nouvel outil</Button>
        </div>
      </div>
      {session.status !== 'open' && <Notice tone="info">La session n’est pas ouverte : consultation seulement.</Notice>}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="filter" className="text-sm">Afficher :</label>
            <Select id="filter" value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="w-auto">
              <option value="all">Tous ({mine.length})</option>
              <option value="draft">En construction</option>
              <option value="tested">Testés</option>
              <option value="ready">Prêts à proposer</option>
              <option value="validated">Validés par le formateur</option>
            </Select>
          </div>
          {shown.length === 0 ? <Card><EmptyState>Aucun outil pour l’instant. Partez d’un modèle d’atelier (colonne de droite) ou créez un outil vierge.</EmptyState></Card> : shown.map((t) => {
            const w = workshops.find((x) => x.id === t.session_workshop_id);
            const editable = session.status === 'open';
            return (
              <Card key={t.id} as="article" className={opened === t.id ? 'border-brand-500' : undefined}>
                <ToolHeader item={t} ownerLabel={t.team_id ? data.teams.find((x) => x.id === t.team_id)?.name : undefined} />
                {w && <p className="text-xs text-muted mt-1">Issu de : {w.title}</p>}
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button size="sm" variant="primary" onClick={() => setTesting(t)} disabled={!editable}>Tester sur le cas fictif</Button>
                  <Button size="sm" onClick={() => { setEditing({ item: t, workshopId: t.session_workshop_id, spec: { name: t.name, family: t.family, purpose: t.purpose, inputs: t.inputs, instructions: t.instructions, prompt_template: t.prompt_template, output_format: t.output_format, verification: t.verification, data_rules: t.data_rules, fallback: t.fallback, tool_used: t.tool_used, deploy_plan: t.deploy_plan } }); setNewVersion(false); }} disabled={!editable}>Modifier</Button>
                  {t.status === 'tested' && <Button size="sm" onClick={() => setStatus(t, 'ready')} disabled={!editable}>Marquer « prêt à proposer »</Button>}
                  {t.status === 'ready' && <Button size="sm" onClick={() => setStatus(t, 'tested')} disabled={!editable}>Repasser en « testé »</Button>}
                  <Button size="sm" variant="danger" onClick={async () => { if (confirm('Supprimer cet outil et ses versions ?')) await backend.deleteToolboxItem(t.id); }} disabled={!editable || t.owner_id !== user.id}>Supprimer</Button>
                  <Button size="sm" variant="ghost" onClick={() => setOpened(opened === t.id ? null : t.id)}>{opened === t.id ? 'Replier' : 'Fiche complète'}</Button>
                </div>
                <div className="mt-2"><Checkbox label="J’autorise le formateur à partager cet outil au groupe (copie de la fiche, sans mes tests ni commentaires)." checked={t.share_consent} disabled={!editable} onChange={(v) => backend.updateToolboxItem(t.id, { share_consent: v }).catch((e) => toast(String(e), 'error'))} /></div>
                {t.status === 'draft' && t.tests.length === 0 && <p className="text-xs text-amber-800 mt-1">Un outil non testé reste « en construction » : lancez un test sur le cas fictif.</p>}
                {opened === t.id && <div className="mt-3 border-t border-line pt-3"><ToolSheet item={t} /></div>}
              </Card>
            );
          })}
        </div>
        <aside className="space-y-4">
          <Card title="Partir d’un modèle d’atelier">
            {blueprints.length === 0 ? <p className="text-sm text-muted">Les modèles apparaissent quand le formateur ouvre les ateliers.</p> : (
              <ul className="space-y-2 text-sm">
                {blueprints.map((w) => {
                  const existing = mine.find((t) => t.session_workshop_id === w.id);
                  return (
                    <li key={w.id} className="flex items-start justify-between gap-2">
                      <span><strong>{w.content.tool_blueprint!.name}</strong><span className="block text-muted">{w.code}</span></span>
                      {existing ? <Button size="sm" variant="ghost" onClick={() => setOpened(existing.id)}>Ouvrir</Button> : <Button size="sm" onClick={() => startNew(w.id)} disabled={session.status !== 'open'}>Créer</Button>}
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
          <Card title={`Outils partagés au groupe (${data.toolboxShared.length})`}>
            {data.toolboxShared.length === 0 ? <p className="text-sm text-muted">Aucun pour l’instant.</p> : (
              <ul className="space-y-3 text-sm">
                {data.toolboxShared.map((x) => (
                  <li key={x.id} className="rounded-md border border-line p-2">
                    <div className="font-medium">{x.title}</div>
                    <div className="text-muted text-xs">Publié par {profileName(x.published_by)} · version {x.item.version}</div>
                    <div className="mt-1 flex gap-2 flex-wrap">
                      <Button size="sm" onClick={() => setEditing({ item: null, workshopId: null, fromShared: x.id, spec: { ...sharedToBlueprint(x), deploy_plan: '' } })} disabled={session.status !== 'open'}>Copier dans ma boîte</Button>
                    </div>
                    <ToolSheet item={{ ...x.item }} compact />
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card title="Rappel">
            <p className="text-sm">Un outil testé sur le cas fictif n’est pas encore autorisé sur des données réelles : la fiche « règles de données » et le plan de déploiement servent à le faire valider par la structure.</p>
          </Card>
        </aside>
      </div>

      {editing && (
        <Modal open onClose={() => setEditing(null)} title={editing.item ? `Modifier « ${editing.item.name} »` : 'Nouvel outil'} wide>
          <ToolSpecForm value={editing.spec} onChange={(spec) => setEditing({ ...editing, spec })} />
          {editing.item && <div className="mt-3"><Checkbox label={`Enregistrer comme nouvelle version (v${editing.item.version + 1}) et conserver la v${editing.item.version}`} checked={newVersion} onChange={setNewVersion} /></div>}
          <div className="mt-3 flex gap-2"><Button variant="primary" onClick={save} busy={busy}>Enregistrer</Button><Button onClick={() => setEditing(null)}>Annuler</Button></div>
        </Modal>
      )}
      {testing && <ToolTester item={testing} tools={(tools.data ?? []).filter((t) => session.allowed_tool_ids.includes(t.id))} onClose={() => setTesting(null)} onTested={() => undefined} />}
    </AppShell>
  );
}

import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { ToolHeader, ToolSheet } from '../../components/toolbox/ToolCardItem';
import { toolboxToMarkdown } from '../../components/toolbox/toolbox';
import { Button, Card, EmptyState, Field, Input, Loading, Notice, Select, Textarea, useToast } from '../../components/ui';
import { useSessionData } from '../../hooks/useSessionData';
import { downloadText, toCsv } from '../../lib/csv';
import { TOOLBOX_STATUS_LABELS, type ToolboxItem } from '../../lib/types';

export function TrainerToolboxPage() {
  const { sessionId } = useParams();
  const { backend } = useAuth();
  const toast = useToast();
  const { data, error, profileName } = useSessionData(sessionId);
  const [filter, setFilter] = useState<'all' | ToolboxItem['status']>('all');
  const [comments, setComments] = useState<Record<string, string>>({});
  const [titles, setTitles] = useState<Record<string, string>>({});
  const items = useMemo(() => (data ? [...data.toolbox].sort((a, b) => a.owner_id.localeCompare(b.owner_id) || b.updated_at.localeCompare(a.updated_at)) : []), [data]);
  if (error) return <AppShell wide><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data) return <AppShell wide><Loading /></AppShell>;
  const { session } = data;
  const shown = filter === 'all' ? items : items.filter((t) => t.status === filter);
  const counts = items.reduce((acc, t) => ({ ...acc, [t.status]: (acc[t.status] ?? 0) + 1 }), {} as Record<string, number>);
  const run = (fn: () => Promise<unknown>, ok?: string) => fn().then(() => ok && toast(ok, 'success')).catch((e) => toast(e instanceof Error ? e.message : String(e), 'error'));
  const ownerLabel = (t: ToolboxItem) => (t.team_id ? `${data.teams.find((x) => x.id === t.team_id)?.name ?? 'Binôme'} (${profileName(t.owner_id)})` : profileName(t.owner_id));
  const exportCsv = () => {
    const rows = items.map((t) => [profileName(t.owner_id), t.team_id ? data.teams.find((x) => x.id === t.team_id)?.name ?? '' : '', t.name, t.family, TOOLBOX_STATUS_LABELS[t.status], t.version, t.tests.length, t.tests.filter((x) => x.ok).length, t.tool_used, t.share_consent ? 'oui' : 'non', t.deploy_plan]);
    downloadText(`boite-a-outils-${session.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.csv`, toCsv(['Participant', 'Binôme', 'Outil', 'Famille', 'Statut', 'Version', 'Tests', 'Tests OK', 'Outil externe', 'Partage autorisé', 'Plan de déploiement'], rows), 'text/csv;charset=utf-8');
  };
  return (
    <AppShell wide>
      <Link to={`/t/sessions/${session.id}/animer`} className="underline text-brand-700 text-sm">← Tableau de bord</Link>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h1 className="text-2xl font-semibold">Boîte à outils du groupe</h1>
          <p className="text-muted text-sm">{items.length} outil(s) · en construction {counts.draft ?? 0} · testés {counts.tested ?? 0} · prêts {counts.ready ?? 0} · validés {counts.validated ?? 0}. Vous validez un outil après avoir lu sa fiche et ses tests ; la validation est un avis de formation, pas une autorisation d’usage sur des données réelles.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select aria-label="Filtrer par statut" value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="w-auto"><option value="all">Tous</option><option value="draft">En construction</option><option value="tested">Testés</option><option value="ready">Prêts</option><option value="validated">Validés</option></Select>
          <Button onClick={exportCsv} disabled={!items.length}>Export CSV</Button>
          <Button onClick={() => downloadText('boite-a-outils-groupe.md', toolboxToMarkdown(`Boîte à outils du groupe — ${session.title}`, items.filter((t) => t.status === 'validated' || t.status === 'ready')), 'text/markdown;charset=utf-8')} disabled={!items.length}>Export markdown (prêts et validés)</Button>
        </div>
      </div>
      {shown.length === 0 ? <Card><EmptyState>Aucun outil dans ce filtre.</EmptyState></Card> : (
        <div className="grid gap-3 lg:grid-cols-2">
          {shown.map((t) => (
            <Card key={t.id} as="article">
              <ToolHeader item={t} ownerLabel={ownerLabel(t)} />
              <div className="mt-2"><ToolSheet item={t} compact /></div>
              <div className="mt-3 border-t border-line pt-3 space-y-2">
                <Field label="Commentaire du formateur (visible de l’auteur)">{(id) => <Textarea id={id} className="min-h-[3rem]" value={comments[t.id] ?? t.trainer_comment} onChange={(e) => setComments({ ...comments, [t.id]: e.target.value })} />}</Field>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => run(() => backend.updateToolboxItem(t.id, { trainer_comment: comments[t.id] ?? t.trainer_comment }), 'Commentaire enregistré.')}>Enregistrer le commentaire</Button>
                  {t.status !== 'validated' ? <Button size="sm" variant="primary" disabled={t.tests.length === 0} title={t.tests.length === 0 ? 'Aucun test consigné' : undefined} onClick={() => run(() => backend.updateToolboxItem(t.id, { status: 'validated', trainer_comment: comments[t.id] ?? t.trainer_comment }), 'Outil validé.')}>Valider l’outil</Button> : <Button size="sm" onClick={() => run(() => backend.updateToolboxItem(t.id, { status: 'tested' }), 'Validation retirée.')}>Retirer la validation</Button>}
                </div>
                <div className="flex flex-wrap gap-2 items-end">
                  <Field label="Publier au groupe (titre affiché)">{(id) => <Input id={id} value={titles[t.id] ?? `Outil partagé : ${t.name} (${ownerLabel(t)}, v${t.version})`} onChange={(e) => setTitles({ ...titles, [t.id]: e.target.value })} disabled={!t.share_consent} />}</Field>
                  <Button size="sm" disabled={!t.share_consent} title={!t.share_consent ? 'L’auteur n’a pas autorisé le partage' : undefined} onClick={() => run(() => backend.publishToolboxItem(t.id, titles[t.id] ?? `Outil partagé : ${t.name} (${ownerLabel(t)}, v${t.version})`), 'Copie publiée au groupe.')}>Publier</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {data.toolboxShared.length > 0 && (
        <Card title="Outils publiés au groupe" className="mt-4">
          <ul className="text-sm space-y-1">{data.toolboxShared.map((x) => <li key={x.id} className="flex justify-between gap-2"><span>{x.title}</span><button className="underline text-muted" onClick={() => run(() => backend.deleteToolboxShared(x.id))}>retirer</button></li>)}</ul>
        </Card>
      )}
    </AppShell>
  );
}

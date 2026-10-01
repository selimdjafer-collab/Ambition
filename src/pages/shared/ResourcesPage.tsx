import { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { Badge, Button, Card, Loading, Markdown, formatDate } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { downloadText } from '../../lib/csv';
import { FICTIONAL_BANNER } from '../../content';
import type { Resource } from '../../lib/types';

export function resourceExport(r: Resource): string {
  return `${FICTIONAL_BANNER}\n${r.title}\n${r.version_label}${r.dated_on ? ' — ' + formatDate(r.dated_on) : ''}\n\n${r.body}\n\n— ${FICTIONAL_BANNER} —\n`;
}

export function ResourceCard({ r, open: initial }: { r: Resource; open?: boolean }) {
  const [open, setOpen] = useState(!!initial);
  return (
    <Card as="article" className={r.obsolete ? 'border-amber-400' : undefined}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">
            <span className="text-brand-700 mr-2">{r.code}</span>
            {r.title}
          </h2>
          <div className="flex flex-wrap gap-2 mt-1 text-sm">
            <Badge tone="warning">{FICTIONAL_BANNER}</Badge>
            <Badge tone="neutral">{r.version_label}</Badge>
            {r.dated_on && <Badge tone="neutral">Daté du {formatDate(r.dated_on)}</Badge>}
            {r.obsolete && <Badge tone="danger">ANCIENNE VERSION — ne pas utiliser comme référence actuelle</Badge>}
            {r.trainer_only && <Badge tone="danger">Réservé au formateur</Badge>}
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? 'Replier' : 'Consulter'}
          </Button>
          <Button size="sm" onClick={() => downloadText(`${r.code}-${r.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.md`, resourceExport(r), 'text/markdown;charset=utf-8')}>
            Télécharger
          </Button>
        </div>
      </div>
      {open && <Markdown text={r.body} className="mt-3" />}
    </Card>
  );
}

export function ResourcesPage() {
  const { backend } = useAuth();
  const res = useAsync(() => backend.listResources(), [backend]);
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-1">Ressources du cas fictif « Agence Horizon »</h1>
      <p className="text-muted mb-4">Tous les noms, documents et événements sont inventés pour la formation. Chaque page et chaque export portent la mention « {FICTIONAL_BANNER} ». Les règles internes de l’agence fictive ne sont pas des obligations légales.</p>
      {res.loading ? <Loading /> : <div className="space-y-4">{res.data?.map((r) => <ResourceCard key={r.id} r={r} />)}</div>}
    </AppShell>
  );
}

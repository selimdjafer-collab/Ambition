import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { Badge, Button, Card, Field, Input, Loading, Modal, Notice, Textarea, formatDate, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { checkDurations, participantMinutes } from '../../lib/durations';
import type { ProgramVersion, Rubric } from '../../lib/types';

export function ProgramPage() {
  const { versionId } = useParams();
  const { backend } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const programs = useAsync(async () => {
    const ps = await backend.listPrograms();
    const out = [];
    for (const p of ps) out.push({ program: p, versions: await backend.listProgramVersions(p.id) });
    return out;
  }, [backend]);
  const activeId = versionId ?? programs.data?.[0]?.versions.find((v) => v.status === 'published')?.id ?? programs.data?.[0]?.versions[0]?.id;
  const detail = useAsync(() => (activeId ? backend.getProgramVersion(activeId) : Promise.resolve(null)), [backend, activeId]);
  const [publishOpen, setPublishOpen] = useState(false);
  const [changelog, setChangelog] = useState('');
  const [meta, setMeta] = useState<{ editorial_reference: string; objectives: string; rubric: Rubric } | null>(null);
  useEffect(() => {
    if (detail.data) setMeta({ editorial_reference: detail.data.version.editorial_reference, objectives: detail.data.version.objectives.join('\n'), rubric: detail.data.version.rubric });
  }, [detail.data]);
  if (programs.loading || !programs.data) return <AppShell><Loading /></AppShell>;
  const d = detail.data;
  const isDraft = d?.version.status === 'draft';
  const check = d ? checkDurations(d.workshops) : null;
  return (
    <AppShell wide>
      <h1 className="text-2xl font-semibold mb-1">Programme et fiches d’atelier</h1>
      <p className="text-muted mb-4">Créez un brouillon, modifiez les fiches, publiez une version. Chaque session conserve un instantané : modifier un modèle ne change jamais les consignes des sessions existantes.</p>
      <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="space-y-4">
          {programs.data.map(({ program, versions }) => (
            <Card key={program.id} title={program.title}>
              <p className="text-sm text-muted mb-2">{program.description}</p>
              <ul className="space-y-1">
                {versions.map((v) => (
                  <li key={v.id}>
                    <Link to={`/t/programme/${v.id}`} className={`block rounded px-2 py-1 ${v.id === activeId ? 'bg-brand-50' : 'hover:bg-surface'}`}>
                      Version {v.version_number} <Badge tone={v.status === 'published' ? 'success' : v.status === 'draft' ? 'warning' : 'neutral'}>{v.status === 'published' ? 'Publiée' : v.status === 'draft' ? 'Brouillon' : 'Archivée'}</Badge>
                      <span className="block text-xs text-muted">{v.editorial_reference}{v.published_at ? ` · publiée le ${formatDate(v.published_at)}` : ''}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {!versions.some((v) => v.status === 'draft') && (
                <Button size="sm" className="mt-2" onClick={async () => { try { const id = await backend.createDraftVersion(program.id); await programs.reload(); navigate(`/t/programme/${id}`); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }}>Créer un brouillon</Button>
              )}
            </Card>
          ))}
          <Card title="Historique des modifications">
            <ul className="text-sm space-y-2">
              {programs.data.flatMap((p) => p.versions).sort((a, b) => b.version_number - a.version_number).map((v: ProgramVersion) => <li key={v.id}><strong>v{v.version_number}</strong> — {v.changelog || 'sans note'} <span className="text-muted">({formatDate(v.published_at ?? v.created_at)})</span></li>)}
            </ul>
          </Card>
        </div>
        <div className="space-y-4 min-w-0">
          {!d ? <Loading /> : (
            <>
              <Card title={`Version ${d.version.version_number} — ${d.version.status === 'published' ? 'publiée' : d.version.status === 'draft' ? 'brouillon' : 'archivée'}`} actions={isDraft && <Button variant="primary" onClick={() => setPublishOpen(true)}>Publier cette version</Button>}>
                {!isDraft && <Notice tone="info">Version en lecture seule. Créez un brouillon pour la modifier ; les sessions déjà créées gardent leur instantané.</Notice>}
                {meta && (
                  <div className="grid gap-3 md:grid-cols-2 mt-2">
                    <Field label="Référence éditoriale" hint="Distincte des dates de session et des dates de vérification des outils.">{(id) => <Input id={id} value={meta.editorial_reference} disabled={!isDraft} onChange={(e) => setMeta({ ...meta, editorial_reference: e.target.value })} />}</Field>
                    <Field label="Seuil de réussite suggéré (modifiable)">{(id) => <Input id={id} type="number" min={0} max={10} value={meta.rubric.pass_threshold} disabled={!isDraft} onChange={(e) => setMeta({ ...meta, rubric: { ...meta.rubric, pass_threshold: Number(e.target.value) } })} />}</Field>
                    <div className="md:col-span-2"><Field label="Objectifs observables (un par ligne)">{(id) => <Textarea id={id} value={meta.objectives} disabled={!isDraft} onChange={(e) => setMeta({ ...meta, objectives: e.target.value })} />}</Field></div>
                    <div className="md:col-span-2"><Field label="Note de la grille">{(id) => <Textarea id={id} value={meta.rubric.note} disabled={!isDraft} onChange={(e) => setMeta({ ...meta, rubric: { ...meta.rubric, note: e.target.value } })} />}</Field></div>
                    {isDraft && <div><Button variant="primary" onClick={async () => { try { await backend.updateProgramVersion(d.version.id, { editorial_reference: meta.editorial_reference, objectives: meta.objectives.split('\n').map((s) => s.trim()).filter(Boolean), rubric: meta.rubric }); toast('Version enregistrée.', 'success'); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }}>Enregistrer</Button></div>}
                  </div>
                )}
                <div className="mt-3 text-sm">
                  <h3 className="font-semibold">Grille formative sur {meta?.rubric.criteria.reduce((s, c) => s + c.max, 0) ?? 10}</h3>
                  <ol className="list-decimal pl-5">{d.version.rubric.criteria.map((c) => <li key={c.key}>{c.label} (0 à {c.max}) — {c.description}</li>)}</ol>
                </div>
              </Card>
              <Card title={`Séquences — ${check?.total} min (séance 1 : ${check?.seance1}, séance 2 : ${check?.seance2}) · ${participantMinutes(d.workshops)} min d’activités participants`}>
                {check && check.problems.length > 0 && <Notice tone="warning">{check.problems.join(' ')}</Notice>}
                <ol className="divide-y divide-line">
                  {d.workshops.map((w) => (
                    <li key={w.id} className="py-2 flex flex-wrap justify-between gap-2">
                      <div><span className="text-muted text-sm mr-2">S{w.seance} · {w.position}</span><strong>{w.title}</strong> <span className="text-muted">{w.duration_min} min</span><div className="text-sm text-muted">{w.breakdown.map((b) => `${b.label} ${b.minutes}`).join(' · ')} · {w.content.work_mode === 'pair' ? 'binôme' : 'individuel'}</div></div>
                      <Link to={`/t/programme/${d.version.id}/ateliers/${w.id}`} className="underline text-brand-700 text-sm">{isDraft ? 'Modifier' : 'Consulter'}</Link>
                    </li>
                  ))}
                </ol>
              </Card>
            </>
          )}
        </div>
      </div>
      <Modal open={publishOpen} onClose={() => setPublishOpen(false)} title="Publier la version">
        <p className="text-sm text-muted mb-2">La version publiée précédente est archivée. Les nouvelles sessions utiliseront cette version ; les sessions existantes ne changent pas.</p>
        {check && check.problems.length > 0 && <Notice tone="warning">{check.problems.join(' ')} La publication est possible mais vérifiez ces écarts.</Notice>}
        <Field label="Note de modification (historique)">{(id) => <Textarea id={id} value={changelog} onChange={(e) => setChangelog(e.target.value)} />}</Field>
        <Button variant="primary" className="mt-3" onClick={async () => { try { await backend.publishVersion(d!.version.id, changelog); toast('Version publiée.', 'success'); setPublishOpen(false); await programs.reload(); await detail.reload(); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }}>Publier</Button>
      </Modal>
    </AppShell>
  );
}

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { FileList } from '../../components/production/FileDrop';
import { ProductionReadOnly } from '../../components/production/ProductionForms';
import { Badge, Button, Card, Checkbox, Field, Loading, Notice, Select, Textarea, formatDate, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData } from '../../hooks/useSessionData';
import { rubricMax, rubricSuggestion } from '../../lib/rubric';
import { normalizeExternalUrl, hostOf } from '../../lib/safeLink';
import { SUBMISSION_STATUS_LABELS, type Evaluation, type EvaluationDecision } from '../../lib/types';

export function SubmissionReviewPage() {
  const { sessionId, submissionId } = useParams();
  const { backend } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, profileName } = useSessionData(sessionId);
  const versions = useAsync(() => (submissionId ? backend.listVersions(submissionId) : Promise.resolve([])), [backend, submissionId, data?.submissions.find((s) => s.id === submissionId)?.current_version]);
  const [versionNo, setVersionNo] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [decision, setDecision] = useState<EvaluationDecision>('comment');
  const [critical, setCritical] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const sub = data?.submissions.find((s) => s.id === submissionId) ?? null;
  const evals = (data?.evaluations ?? []).filter((e) => e.submission_id === submissionId).sort((a, b) => b.created_at.localeCompare(a.created_at));
  useEffect(() => {
    (async () => {
      const out: Record<string, string> = {};
      for (const e of evals) out[e.id] = await backend.getEvaluationNote(e.id);
      setNotes(out);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evals.map((e) => e.id).join(',')]);
  if (error) return <AppShell><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data || versions.loading) return <AppShell><Loading /></AppShell>;
  if (!sub) return <AppShell><Notice tone="danger">Production introuvable.</Notice></AppShell>;
  const workshop = data.workshops.find((w) => w.id === sub.session_workshop_id)!;
  const rubric = data.session.rubric_snapshot;
  const vs = versions.data ?? [];
  const shown = vs.find((v) => v.version_number === (versionNo ?? sub.current_version)) ?? vs[vs.length - 1] ?? null;
  const content = shown?.content ?? sub.draft;
  const files = shown?.files ?? sub.draft_files;
  const team = sub.team_id ? data.teams.find((t) => t.id === sub.team_id) : null;
  const suggestion = rubricSuggestion(rubric, scores, critical);
  const link = normalizeExternalUrl(content.link ?? '');
  const record = async () => {
    setBusy(true);
    try {
      await backend.recordEvaluation(sub.id, scores, decision, critical, feedback, note);
      toast('Évaluation enregistrée.', 'success');
      setFeedback('');
      setNote('');
      setScores({});
      setCritical(false);
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };
  return (
    <AppShell wide>
      <Link to={`/t/sessions/${data.session.id}/animer`} className="underline text-brand-700 text-sm">← Tableau de bord</Link>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h1 className="text-2xl font-semibold">{workshop.title}</h1>
          <p className="text-muted">{team ? `${team.name} — ${data.members.filter((m) => m.team_id === team.id).map((m) => profileName(m.user_id)).join(', ')}` : profileName(sub.owner_id)} · <Badge tone={sub.status === 'validated' ? 'success' : sub.status === 'needs_revision' ? 'warning' : sub.status === 'submitted' ? 'brand' : 'neutral'}>{SUBMISSION_STATUS_LABELS[sub.status]}</Badge> · {sub.current_version} version(s) remise(s)</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {sub.share_consent ? <Badge tone="success">Partage autorisé par l’auteur</Badge> : <Badge tone="neutral">Partage non autorisé</Badge>}
          <Button variant="danger" onClick={async () => { if (!confirm('Supprimer cette production, ses versions et ses fichiers ? Cette action est contrôlée et définitive.')) return; try { await backend.deleteSubmission(sub.id); navigate(`/t/sessions/${data.session.id}/animer`); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }}>Supprimer</Button>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-4 min-w-0">
          <Card title="Production" actions={vs.length > 0 && (
            <Select aria-label="Version affichée" value={shown?.version_number ?? ''} onChange={(e) => setVersionNo(Number(e.target.value))}>
              {vs.map((v) => <option key={v.id} value={v.version_number}>Version {v.version_number} — {formatDate(v.created_at, true)}</option>)}
            </Select>
          )}>
            {vs.length === 0 && <Notice tone="info">Aucune version remise : vous voyez le brouillon en cours. L’évaluation n’est possible qu’après une remise.</Notice>}
            {shown && <p className="text-sm text-muted">Remis le {formatDate(shown.created_at, true)} par {profileName(shown.created_by)} · contributeurs : {shown.contributors.map(profileName).join(', ')}</p>}
            {content.tool_used && <p className="text-sm mt-1"><strong>Outil :</strong> {content.tool_used}</p>}
            <p className="text-sm"><strong>Niveau :</strong> {content.level === 'autonomous' ? 'autonome' : 'guidé'} · <strong>Étapes cochées :</strong> {(content.checklist ?? []).filter(Boolean).length}/{workshop.content.steps.length} · <strong>Auto-vérification :</strong> {(content.self_check ?? []).filter(Boolean).length}/{workshop.content.success_criteria.length}</p>
            {content.prompt && <details className="mt-2" open><summary className="cursor-pointer font-medium">Prompt</summary><pre className="whitespace-pre-wrap font-mono text-xs bg-surface p-2 rounded">{content.prompt}</pre></details>}
            <h3 className="font-semibold mt-3">Texte</h3>
            <div className="whitespace-pre-wrap text-sm border border-line rounded p-3 bg-white">{content.text || <span className="text-muted">(vide)</span>}</div>
            {link && <p className="text-sm mt-2">Lien : <a className="underline text-brand-700" href={link} target="_blank" rel="noopener noreferrer nofollow">{hostOf(link)}</a> (contenu non récupéré)</p>}
            <div className="mt-3"><ProductionReadOnly content={workshop.content} extra={content.extra ?? {}} /></div>
            <h3 className="font-semibold mt-3">Fichiers</h3>
            <FileList files={files} />
          </Card>
          <Card title="Grille de réussite de l’atelier">
            <ul className="list-disc pl-5 text-sm">{workshop.content.success_criteria.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </Card>
          <Card title="Historique des évaluations">
            {evals.length === 0 ? <p className="text-sm text-muted">Aucune évaluation.</p> : evals.map((e) => <EvalRow key={e.id} e={e} note={notes[e.id]} />)}
          </Card>
        </div>
        <Card title={`Évaluer la version ${sub.current_version || '—'}`} className="self-start lg:sticky lg:top-4">
          <p className="text-xs text-muted mb-2">{rubric.title}. Le formateur évalue ; l’application calcule seulement la somme. Aucune validation automatique.</p>
          <div className="space-y-2">
            {rubric.criteria.map((c) => (
              <fieldset key={c.key} className="rounded-md border border-line p-2">
                <legend className="text-sm font-medium px-1">{c.label}</legend>
                <p className="text-xs text-muted">{c.description}</p>
                <div className="flex gap-3 mt-1">
                  {Array.from({ length: c.max + 1 }, (_, v) => (
                    <label key={v} className="inline-flex items-center gap-1"><input type="radio" name={`c-${c.key}`} className="accent-brand-600" checked={(scores[c.key] ?? -1) === v} onChange={() => setScores({ ...scores, [c.key]: v })} /> {v}</label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <p className="mt-2 font-semibold">Total : {suggestion.total} / {rubricMax(rubric)}</p>
          <Checkbox label="Erreur critique non corrigée (donnée réelle divulguée ou information déterminante inventée)" checked={critical} onChange={setCritical} />
          <p className="text-xs mt-1">
            Suggestion (modifiable) : {suggestion.meetsThreshold ? <span className="text-green-800">seuil de {rubric.pass_threshold}/10 et minima atteints.</span> : <span className="text-amber-800">{suggestion.blockedByCritical ? 'une erreur critique empêche de déclarer le livrable prêt à réutiliser. ' : ''}{suggestion.total < rubric.pass_threshold ? `total sous le seuil de ${rubric.pass_threshold}. ` : ''}{suggestion.missingMinima.length ? `minimum non atteint : ${suggestion.missingMinima.join(', ')}.` : ''}</span>}
          </p>
          <Field label="Décision">{(id) => <Select id={id} value={decision} onChange={(e) => setDecision(e.target.value as EvaluationDecision)}><option value="comment">Commentaire seulement</option><option value="needs_revision">Demander une correction (nouvelle version)</option><option value="validated" disabled={critical}>Valider</option></Select>}</Field>
          <Field label="Retour visible du participant / binôme">{(id) => <Textarea id={id} value={feedback} onChange={(e) => setFeedback(e.target.value)} />}</Field>
          <Field label="Note privée (jamais visible des participants)">{(id) => <Textarea id={id} value={note} onChange={(e) => setNote(e.target.value)} className="min-h-[3rem]" />}</Field>
          <Button variant="primary" className="mt-2 w-full" onClick={record} busy={busy} disabled={sub.current_version === 0}>Enregistrer l’évaluation</Button>
        </Card>
      </div>
    </AppShell>
  );
}

function EvalRow({ e, note }: { e: Evaluation; note?: string }) {
  return (
    <div className="rounded-md border border-line p-2 text-sm mb-2">
      <div className="flex flex-wrap gap-2 items-center"><Badge tone={e.decision === 'validated' ? 'success' : e.decision === 'needs_revision' ? 'warning' : 'info'}>{e.decision === 'validated' ? 'Validé' : e.decision === 'needs_revision' ? 'Correction demandée' : 'Commentaire'}</Badge><span className="text-muted">V{e.version_number} · {formatDate(e.created_at, true)} · {e.total}/{rubricMax(e.rubric)}</span>{e.critical_error && <Badge tone="danger">Erreur critique</Badge>}</div>
      <p className="mt-1">{e.rubric.criteria.map((c) => `${c.label.split(' ')[0]} ${e.scores[c.key] ?? 0}`).join(' · ')}</p>
      {e.feedback_public && <p className="mt-1 whitespace-pre-wrap">{e.feedback_public}</p>}
      {note && <p className="mt-1 text-muted italic">Note privée : {note}</p>}
    </div>
  );
}

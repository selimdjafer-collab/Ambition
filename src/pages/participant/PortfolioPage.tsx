import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell, Brand } from '../../components/layout/AppShell';
import { ProductionReadOnly } from '../../components/production/ProductionForms';
import { ToolSheet } from '../../components/toolbox/ToolCardItem';
import { TOOLBOX_STATUS_LABELS } from '../../lib/types';
import { Button, Loading, Notice, formatDate } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData } from '../../hooks/useSessionData';
import { FICTIONAL_BANNER, PROGRAM_OBJECTIVES } from '../../content';
import { SUBMISSION_STATUS_LABELS, type SubmissionVersion } from '../../lib/types';

export function PortfolioPage() {
  const { sessionId } = useParams();
  const { backend, user, profile } = useAuth();
  const { data, error, teamOf, profileName } = useSessionData(sessionId);
  const plan = useAsync(() => (sessionId ? backend.getMyActionPlan(sessionId) : Promise.resolve(null)), [backend, sessionId]);
  const mine = useMemo(() => {
    if (!data || !user) return [];
    const team = teamOf(user.id);
    return data.submissions.filter((s) => s.owner_id === user.id || (team && s.team_id === team.id)).filter((s) => s.current_version > 0);
  }, [data, user, teamOf]);
  const versions = useAsync(async () => {
    const out: Record<string, SubmissionVersion[]> = {};
    for (const s of mine) out[s.id] = await backend.listVersions(s.id);
    return out;
  }, [backend, mine.map((s) => s.id + s.current_version).join(',')]);
  const selected = new Set(plan.data?.selected_submission_ids ?? []);
  const shown = selected.size ? mine.filter((s) => selected.has(s.id)) : mine;

  if (error) return <AppShell><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data || !user) return <AppShell><Loading /></AppShell>;
  const { session, workshops } = data;

  return (
    <AppShell>
      <div className="no-print flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <Link to={`/p/sessions/${session.id}`} className="underline text-brand-700 text-sm">← {session.title}</Link>
          <h1 className="text-2xl font-semibold">Mon portfolio</h1>
          <p className="text-muted text-sm">Export PDF via l’impression du navigateur (Ctrl/Cmd + P, « Enregistrer au format PDF »). {selected.size ? `${selected.size} production(s) sélectionnée(s) dans le plan d’application.` : 'Toutes les productions remises sont incluses ; sélectionnez-en dans le plan d’application pour filtrer.'}</p>
        </div>
        <Button variant="primary" onClick={() => window.print()}><Printer size={16} aria-hidden /> Imprimer / PDF</Button>
      </div>

      <article className="bg-white rounded-lg border border-line p-6 print:border-0 print:p-0">
        <header className="flex items-start justify-between gap-3 border-b border-line pb-3">
          <div>
            <Brand large />
            <h2 className="text-xl font-semibold mt-2">Portfolio de formation — {profile?.display_name}</h2>
            <p className="text-sm text-muted">{session.title} · {session.program_title} (version {session.program_version_number}) · {formatDate(session.start_date)}{session.end_date ? ` → ${formatDate(session.end_date)}` : ''}</p>
          </div>
          <p className="text-xs text-muted text-right max-w-xs">Document de suivi pédagogique. Les productions portent sur le cas fictif « Agence Horizon » ({FICTIONAL_BANNER}). Ce document n’est ni une attestation de durée ni une certification.</p>
        </header>

        <section className="mt-4">
          <h3 className="font-semibold">Objectifs du parcours</h3>
          <ol className="list-decimal pl-5 text-sm">{PROGRAM_OBJECTIVES.map((o, i) => <li key={i}>{o}</li>)}</ol>
        </section>

        {shown.length === 0 && <p className="mt-4 text-muted">Aucune production remise pour l’instant.</p>}
        {shown.map((s) => {
          const w = workshops.find((x) => x.id === s.session_workshop_id)!;
          const vs = versions.data?.[s.id] ?? [];
          const evals = data.evaluations.filter((e) => e.submission_id === s.id).sort((a, b) => a.version_number - b.version_number);
          const last = vs[vs.length - 1];
          return (
            <section key={s.id} className="mt-6 border-t border-line pt-4 print-page">
              <h3 className="text-lg font-semibold">{w.title}</h3>
              <p className="text-sm text-muted">{w.content.objective}</p>
              <p className="text-sm mt-1">Statut : <strong>{SUBMISSION_STATUS_LABELS[s.status]}</strong> · {vs.length} version(s){s.team_id ? ` · production de binôme (${(last?.contributors ?? []).map(profileName).join(', ')})` : ''}</p>
              {last && (
                <>
                  {last.content.tool_used && <p className="text-sm">Outil : {last.content.tool_used}</p>}
                  {last.content.prompt && <details className="text-sm mt-2" open><summary className="font-medium">Prompt (version {last.version_number})</summary><pre className="whitespace-pre-wrap font-mono text-xs bg-surface p-2 rounded">{last.content.prompt}</pre></details>}
                  <div className="mt-2 text-sm whitespace-pre-wrap">{last.content.text}</div>
                  <div className="mt-2"><ProductionReadOnly content={w.content} extra={last.content.extra} /></div>
                  {last.files.length > 0 && <p className="text-sm mt-1">Fichiers : {last.files.map((f) => f.name).join(', ')}</p>}
                </>
              )}
              {vs.length > 1 && (
                <div className="mt-2 text-sm">
                  <h4 className="font-medium">Corrections entre versions</h4>
                  <ul className="list-disc pl-5">{vs.slice(0, -1).map((v) => <li key={v.id}>Version {v.version_number} du {formatDate(v.created_at, true)} : {v.content.text.slice(0, 160)}{v.content.text.length > 160 ? '…' : ''}</li>)}</ul>
                </div>
              )}
              {evals.length > 0 && (
                <div className="mt-2 text-sm">
                  <h4 className="font-medium">Appréciation du formateur</h4>
                  {evals.map((e) => (
                    <p key={e.id}>Version {e.version_number} : {e.total} / {e.rubric.criteria.reduce((x, c) => x + c.max, 0)} — {e.decision === 'validated' ? 'validé' : e.decision === 'needs_revision' ? 'à améliorer' : 'commentaire'}. {e.feedback_public}</p>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        <section className="mt-6 border-t border-line pt-4 print-page">
          <h3 className="text-lg font-semibold">Ma boîte à outils</h3>
          {(() => {
            const team = teamOf(user.id);
            const tools = data.toolbox.filter((t) => t.owner_id === user.id || (team && t.team_id === team.id));
            if (!tools.length) return <p className="text-sm text-muted">Aucun outil enregistré.</p>;
            return tools.map((t) => (
              <div key={t.id} className="mt-3 border border-line rounded p-3">
                <h4 className="font-semibold">{t.name} <span className="text-muted font-normal text-sm">· version {t.version} · {TOOLBOX_STATUS_LABELS[t.status]} · {t.tests.length} test(s)</span></h4>
                <ToolSheet item={t} />
              </div>
            ));
          })()}
        </section>

        <section className="mt-6 border-t border-line pt-4">
          <h3 className="text-lg font-semibold">Plan d’application à J+7</h3>
          {!plan.data ? <p className="text-sm text-muted">Non renseigné. <Link to={`/p/sessions/${session.id}/plan`} className="underline no-print">Compléter</Link></p> : (
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
              {([
                ['Tâche', plan.data.plan.task], ['Fréquence', plan.data.plan.frequency], ['Outil autorisé', plan.data.plan.tool], ['Données utilisables', plan.data.plan.data],
                ['Contrôle humain', plan.data.plan.human_control], ['Temps habituel estimé', plan.data.plan.usual_time], ['Temps observé', plan.data.plan.observed_time_tested ? `${plan.data.plan.observed_time} (mesuré)` : plan.data.plan.observed_time ? `${plan.data.plan.observed_time} (estimé, non testé)` : 'non testé'],
                ['Bénéfice attendu', plan.data.plan.benefit], ['Condition d’arrêt', plan.data.plan.stop_condition], ['Outils retenus', plan.data.tools_chosen.join(', ')],
              ] as [string, string][]).map(([k, v]) => <div key={k}><dt className="font-medium">{k}</dt><dd>{v || '—'}</dd></div>)}
            </dl>
          )}
        </section>
        <footer className="mt-6 text-xs text-muted border-t border-line pt-2">Généré le {formatDate(new Date().toISOString(), true)} · Atelier IA — START EVOLUTION · Ce portfolio ne contient que vos propres productions et retours.</footer>
      </article>
    </AppShell>
  );
}

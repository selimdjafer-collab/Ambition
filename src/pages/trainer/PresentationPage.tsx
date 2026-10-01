import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TimerDisplay } from '../../components/TimerDisplay';
import { Brand } from '../../components/layout/AppShell';
import { Loading, Markdown, Notice, cx } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData } from '../../hooks/useSessionData';
import { useAuth } from '../../auth/AuthProvider';

/** Mode présentation : consigne, objectif, ressources, minuteur, étapes et débrief. Aucune donnée nominative. */
export function PresentationPage() {
  const { sessionId } = useParams();
  const { backend } = useAuth();
  const { data, error } = useSessionData(sessionId);
  const resources = useAsync(() => backend.listResources(), [backend]);
  const [showDebrief, setShowDebrief] = useState(false);
  if (error) return <div className="p-8"><Notice tone="danger">{error}</Notice></div>;
  if (!data) return <Loading />;
  const { session, workshops } = data;
  const w = workshops.find((x) => x.id === session.current_session_workshop_id) ?? null;
  const res = (resources.data ?? []).filter((r) => w?.content.resource_codes.includes(r.code) && !r.trainer_only);
  return (
    <div className="min-h-screen bg-white text-ink p-8 text-xl">
      <header className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <Brand large />
          <div className="text-muted text-base mt-1">{session.title}</div>
        </div>
        <TimerDisplay timer={session.timer} large />
      </header>
      {!w ? <p className="mt-10 text-center text-2xl text-muted">En attente de l’atelier…</p> : (
        <main className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="uppercase tracking-wide text-brand-700 font-semibold text-base">Séance {w.seance} · {w.duration_min} min</p>
            <h1 className="text-4xl font-bold mt-1">{w.title}</h1>
            <p className="mt-3 text-2xl text-brand-700">{w.content.objective}</p>
            {!showDebrief ? (
              <>
                <Markdown text={w.content.brief} className="mt-4" />
                <h2 className="text-2xl font-semibold mt-6">Étapes</h2>
                <ol className="list-decimal pl-8 mt-2 space-y-1">{w.content.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
                <h2 className="text-2xl font-semibold mt-6">Livrable</h2>
                <p>{w.content.deliverable}</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mt-6">Débrief</h2>
                <ul className="list-disc pl-8 mt-2 space-y-2">{w.content.debrief_questions.map((q, i) => <li key={i}>{q}</li>)}</ul>
                <h2 className="text-2xl font-semibold mt-6">Grille de réussite</h2>
                <ul className="list-disc pl-8 mt-2 space-y-1">{w.content.success_criteria.map((q, i) => <li key={i}>{q}</li>)}</ul>
              </>
            )}
          </div>
          <aside className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold">Déroulé</h2>
              <ol className="mt-2 space-y-1">{w.breakdown.map((b, i) => <li key={i} className={cx('flex justify-between rounded px-2 py-1', i === session.current_step ? 'bg-brand-50 font-semibold' : '')}><span>{b.label}</span><span>{b.minutes} min</span></li>)}</ol>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">Ressources utiles</h2>
              <ul className="mt-2 space-y-1">{res.map((r) => <li key={r.id}><span className="text-brand-700 font-semibold">{r.code}</span> {r.title}{r.obsolete ? ' (ancienne version)' : ''}</li>)}{res.length === 0 && <li className="text-muted">Aucune ressource spécifique.</li>}</ul>
              <p className="text-base text-muted mt-2">Cas fictif « Agence Horizon » — aucune donnée réelle.</p>
            </section>
            <button type="button" className="rounded-md border border-line px-4 py-2 text-base" onClick={() => setShowDebrief((s) => !s)}>{showDebrief ? 'Afficher la consigne' : 'Afficher le débrief'}</button>
          </aside>
        </main>
      )}
    </div>
  );
}

import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Bot, FileText, GitBranch, Image, Lock, Mic, Search, Wrench } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { TimerDisplay } from '../../components/TimerDisplay';
import { Badge, Card, LinkButton, Loading, Notice, EmptyState, cx, formatDate } from '../../components/ui';
import { useSessionData } from '../../hooks/useSessionData';
import { deriveStatus, openHelpFor, statusTone, submissionFor } from '../../lib/status';
import { FAMILIES, PARTICIPANT_STATUS_LABELS, type Family } from '../../lib/types';
import { PositioningForm } from './PositioningForm';

const FAMILY_ICONS: Record<Family, typeof Mic> = { transcription: Mic, documents: FileText, recherche: Search, schemas: GitBranch, images: Image, assistants: Bot };

export function ParticipantSessionHome() {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const { data, error, teamOf, connected } = useSessionData(sessionId);
  if (error) return <AppShell><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data || !user) return <AppShell><Loading /></AppShell>;
  const { session, workshops, submissions, helpRequests, enrollments, sharedExamples } = data;
  const me = enrollments.find((e) => e.user_id === user.id) ?? null;
  const team = teamOf(user.id);
  const teamId = team?.id ?? null;
  const pairMates = team ? data.members.filter((m) => m.team_id === team.id && m.user_id !== user.id).map((m) => data.profiles.find((p) => p.id === m.user_id)?.display_name ?? 'Coéquipier') : [];

  const rows = workshops.map((w) => {
    const pair = w.content.work_mode === 'pair' && teamId ? teamId : null;
    const sub = submissionFor(submissions, w.id, user.id, pair);
    const st = deriveStatus(sub, openHelpFor(helpRequests, w.id, user.id, pair));
    return { w, sub, st };
  });
  const current = workshops.find((w) => w.id === session.current_session_workshop_id) ?? workshops.find((w) => w.status === 'open') ?? null;
  const currentRow = current ? rows.find((r) => r.w.id === current.id) : null;
  const done = rows.filter((r) => r.st === 'validated' || r.st === 'submitted').length;
  const myTools = data.toolbox.filter((t) => t.owner_id === user.id || (teamId && t.team_id === teamId));
  const ctaLabel = currentRow?.sub ? 'Reprendre' : 'Commencer';

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="eyebrow">{session.program_title}</p>
          <h1 className="mt-1">{session.title}</h1>
          <p className="text-muted mt-1">
            {formatDate(session.start_date)}
            {session.end_date ? ` → ${formatDate(session.end_date)}` : ''}
            {team ? ` · ${team.name}${pairMates.length ? ' avec ' + pairMates.join(', ') : ''}` : ''}
          </p>
        </div>
        <TimerDisplay timer={session.timer} />
      </div>
      {!connected && <Notice tone="warning">Reconnexion en cours… Les informations affichées peuvent être en retard. <button className="underline" onClick={() => location.reload()}>Rafraîchir</button></Notice>}
      {session.status !== 'open' && <Notice tone="info">La session est « {session.status === 'suspended' ? 'suspendue' : session.status === 'closed' ? 'clôturée' : 'en préparation'} ». Les dépôts sont possibles seulement quand elle est ouverte.</Notice>}
      {session.meeting_link && (
        <p className="mb-4 text-sm">
          Réunion : <a className="underline text-brand-700" href={session.meeting_link} target="_blank" rel="noopener noreferrer">lien de visioconférence fourni par le formateur</a>
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl bg-brand-800 text-white p-6 sm:p-8 shadow-card relative overflow-hidden">
            <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-600/50 blur-3xl" />
            {current ? (
              <div className="relative">
                <p className="eyebrow !text-brand-200">{current.status === 'open' ? 'Atelier en cours' : 'Prochain atelier'} · {current.duration_min} min</p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-2 leading-tight">{current.title}</h2>
                {current.content.tool_blueprint && (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
                    <Wrench size={14} aria-hidden /> Outil à construire : {current.content.tool_blueprint.name}
                  </p>
                )}
                <p className="mt-3 text-brand-100 max-w-2xl line-clamp-3">{current.content.job_context?.task ?? current.content.objective}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {current.status === 'open' ? (
                    <LinkButton to={`/p/sessions/${session.id}/ateliers/${current.id}`} variant="accent" size="lg">
                      {ctaLabel} <ArrowRight size={18} aria-hidden />
                    </LinkButton>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm"><Lock size={14} aria-hidden /> En attente d’ouverture par le formateur</span>
                  )}
                  {currentRow && <span className="text-sm text-brand-100">Ma production : {PARTICIPANT_STATUS_LABELS[currentRow.st]}</span>}
                </div>
              </div>
            ) : (
              <EmptyState>Aucun atelier ouvert pour le moment.</EmptyState>
            )}
          </section>

          <Card title={`Mon parcours · ${done} / ${workshops.length} remis`} actions={<LinkButton to={`/p/sessions/${session.id}/boite`} variant="primary" size="sm"><Wrench size={14} aria-hidden /> Ma boîte à outils ({myTools.length})</LinkButton>}>
            <ol className="relative">
              {rows.map(({ w, st }, i) => {
                const isCurrent = w.id === current?.id;
                const locked = w.status === 'locked';
                return (
                  <li key={w.id} className={cx('grid grid-cols-[2rem_minmax(0,1fr)_auto] gap-x-3 gap-y-1 items-start py-3', i < rows.length - 1 && 'border-b border-line')}>
                    <span aria-hidden className={cx('h-7 w-7 rounded-full inline-flex items-center justify-center text-xs font-bold tabular', st === 'validated' ? 'bg-emerald-100 text-emerald-800' : isCurrent ? 'bg-accent text-white' : locked ? 'bg-surface-2 text-muted' : 'bg-brand-100 text-brand-800')}>{w.position}</span>
                    <div className="min-w-0">
                      <div className="text-xs text-muted">Séance {w.seance} · {w.duration_min} min{w.content.work_mode === 'pair' ? ' · binôme' : ''}</div>
                      {locked ? <span className="font-medium text-muted">{w.title}</span> : <Link to={`/p/sessions/${session.id}/ateliers/${w.id}`} className="font-medium text-ink hover:text-brand-700 underline-offset-4 hover:underline">{w.title}</Link>}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {locked ? <Badge tone="neutral">Fermé</Badge> : w.status === 'closed' ? <Badge tone="neutral">Terminé</Badge> : <Badge tone="brand">Ouvert</Badge>}
                      {!locked && st !== 'not_started' && <Badge tone={statusTone(st)}>{PARTICIPANT_STATUS_LABELS[st]}</Badge>}
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-4 flex flex-wrap gap-2">
              <LinkButton to={`/p/sessions/${session.id}/portfolio`} size="sm">Mon portfolio</LinkButton>
              <LinkButton to={`/p/sessions/${session.id}/plan`} size="sm">Plan de déploiement à J+7</LinkButton>
            </div>
          </Card>

          {me && <PositioningForm enrollment={me} />}
        </div>

        <div className="space-y-6">
          <Card title="Six usages, six outils">
            <ul className="space-y-3">
              {FAMILIES.map((f) => {
                const Icon = FAMILY_ICONS[f.key];
                return (
                  <li key={f.key} className="flex items-start gap-3">
                    <span aria-hidden className="h-9 w-9 shrink-0 rounded-xl bg-brand-50 text-brand-700 inline-flex items-center justify-center"><Icon size={18} /></span>
                    <span className="min-w-0">
                      <strong className="block text-sm">{f.label}</strong>
                      <span className="block text-sm text-muted leading-snug">{f.verb}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
          {sharedExamples.length > 0 && (
            <Card title="Exemples partagés par le formateur">
              <ul className="space-y-2 text-sm">
                {sharedExamples.map((x) => (
                  <li key={x.id}>
                    <Link to={`/p/sessions/${session.id}/ateliers/${current?.id ?? workshops[0].id}#exemples`} className="underline text-brand-700">
                      {x.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-ink">
            <strong className="block font-semibold mb-1">Cas fictif uniquement</strong>
            Les ateliers utilisent les ressources de l’Agence Horizon. Ne déposez aucun dossier réel, numéro administratif, coordonnée personnelle ni donnée de santé.
          </div>
        </div>
      </div>
    </AppShell>
  );
}

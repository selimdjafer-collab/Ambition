import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { TimerDisplay } from '../../components/TimerDisplay';
import { Badge, Card, LinkButton, Loading, Notice, EmptyState, formatDate } from '../../components/ui';
import { useSessionData } from '../../hooks/useSessionData';
import { deriveStatus, openHelpFor, statusTone, submissionFor } from '../../lib/status';
import { FAMILIES, PARTICIPANT_STATUS_LABELS } from '../../lib/types';
import { PositioningForm } from './PositioningForm';

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
  const ctaLabel = currentRow?.sub ? 'Reprendre' : 'Commencer';

  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-semibold">{session.title}</h1>
          <p className="text-muted">
            {session.program_title} · {formatDate(session.start_date)}
            {team ? ` · ${team.name}${pairMates.length ? ' avec ' + pairMates.join(', ') : ''}` : ''}
          </p>
        </div>
        <TimerDisplay timer={session.timer} />
      </div>
      {!connected && <Notice tone="warning">Reconnexion en cours… Les informations affichées peuvent être en retard. <button className="underline" onClick={() => location.reload()}>Rafraîchir</button></Notice>}
      {session.status !== 'open' && <Notice tone="info">La session est « {session.status === 'suspended' ? 'suspendue' : session.status === 'closed' ? 'clôturée' : 'en préparation'} ». Les dépôts sont possibles seulement quand elle est ouverte.</Notice>}
      {session.meeting_link && (
        <p className="mb-3">
          Réunion : <a className="underline text-brand-700" href={session.meeting_link} target="_blank" rel="noopener noreferrer">lien de visioconférence fourni par le formateur</a>
        </p>
      )}

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <Card className="border-brand-500 border-2">
            {current ? (
              <>
                <p className="text-sm uppercase tracking-wide text-brand-700 font-semibold">{current.status === 'open' ? 'Atelier en cours' : 'Prochain atelier'}</p>
                <h2 className="text-xl font-semibold mt-1">{current.title}</h2>
                <p className="text-muted mt-1">{current.content.objective}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {current.status === 'open' ? (
                    <LinkButton to={`/p/sessions/${session.id}/ateliers/${current.id}`} variant="primary" size="lg">
                      {ctaLabel}
                    </LinkButton>
                  ) : (
                    <Badge tone="neutral">En attente d’ouverture par le formateur</Badge>
                  )}
                  {currentRow && <Badge tone={statusTone(currentRow.st)}>Ma production : {PARTICIPANT_STATUS_LABELS[currentRow.st]}</Badge>}
                </div>
              </>
            ) : (
              <EmptyState>Aucun atelier ouvert pour le moment.</EmptyState>
            )}
          </Card>

          <Card title={`Ma progression (${done} / ${workshops.length})`}>
            <ol className="space-y-2">
              {rows.map(({ w, st }) => (
                <li key={w.id} className="flex flex-wrap items-center gap-2 justify-between border-b border-line last:border-0 pb-2">
                  <div>
                    <span className="text-muted text-sm mr-2">Séance {w.seance}</span>
                    {w.status === 'locked' ? (
                      <span>{w.title}</span>
                    ) : (
                      <Link to={`/p/sessions/${session.id}/ateliers/${w.id}`} className="underline text-brand-700">
                        {w.title}
                      </Link>
                    )}
                    <span className="text-sm text-muted ml-2">{w.duration_min} min</span>
                  </div>
                  <div className="flex gap-2">
                    {w.status === 'locked' && <Badge tone="neutral">Fermé</Badge>}
                    {w.status === 'closed' && <Badge tone="neutral">Terminé</Badge>}
                    <Badge tone={statusTone(st)}>{PARTICIPANT_STATUS_LABELS[st]}</Badge>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-wrap gap-2">
              <LinkButton to={`/p/sessions/${session.id}/boite`} variant="primary">Ma boîte à outils ({data.toolbox.filter((t) => t.owner_id === user.id || (teamId && t.team_id === teamId)).length})</LinkButton>
              <LinkButton to={`/p/sessions/${session.id}/portfolio`}>Mon portfolio</LinkButton>
              <LinkButton to={`/p/sessions/${session.id}/plan`}>Mon plan d’application à J+7</LinkButton>
            </div>
          </Card>

          {me && <PositioningForm enrollment={me} />}
        </div>

        <div className="space-y-5">
          <Card title="Six usages à ma portée">
            <ul className="space-y-2">
              {FAMILIES.map((f) => (
                <li key={f.key}>
                  <strong>{f.label}</strong>
                  <span className="block text-sm text-muted">{f.verb}</span>
                </li>
              ))}
            </ul>
          </Card>
          {sharedExamples.length > 0 && (
            <Card title="Exemples partagés par le formateur">
              <ul className="space-y-1">
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
          <Card title="Rappel">
            <p className="text-sm">Les ateliers utilisent exclusivement les ressources fictives de l’Agence Horizon. Ne déposez aucun dossier réel, numéro administratif, coordonnée personnelle ni donnée de santé.</p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

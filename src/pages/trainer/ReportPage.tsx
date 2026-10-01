import { Link, useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell, Brand } from '../../components/layout/AppShell';
import { Button, Card, Loading, Notice, formatDate, formatTime } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData } from '../../hooks/useSessionData';
import { downloadText, toCsv } from '../../lib/csv';
import { deriveStatus, openHelpFor, submissionFor } from '../../lib/status';
import { PARTICIPANT_STATUS_LABELS } from '../../lib/types';

export function ReportPage() {
  const { sessionId } = useParams();
  const { backend } = useAuth();
  const { data, error, profileName, teamOf } = useSessionData(sessionId);
  const plans = useAsync(() => (sessionId ? backend.listActionPlans(sessionId) : Promise.resolve([])), [backend, sessionId]);
  const events = useAsync(() => (sessionId ? backend.listEvents(sessionId, 100) : Promise.resolve([])), [backend, sessionId]);
  if (error) return <AppShell><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data) return <AppShell><Loading /></AppShell>;
  const { session, workshops } = data;
  const approved = data.enrollments.filter((e) => e.status === 'approved' && e.user_id);
  const rows = approved.map((e) => {
    const uid = e.user_id!;
    const team = teamOf(uid);
    const cells = workshops.map((w) => {
      const tid = w.content.work_mode === 'pair' && team ? team.id : null;
      const sub = submissionFor(data.submissions, w.id, uid, tid);
      const st = deriveStatus(sub, openHelpFor(data.helpRequests, w.id, uid, tid));
      const ev = sub ? data.evaluations.filter((x) => x.submission_id === sub.id).sort((a, b) => b.created_at.localeCompare(a.created_at))[0] : undefined;
      return { w, sub, st, ev };
    });
    return { e, team, cells, plan: plans.data?.find((p) => p.user_id === uid) };
  });
  const totals = {
    submitted: data.submissions.filter((s) => s.current_version > 0).length,
    validated: data.submissions.filter((s) => s.status === 'validated').length,
    revisions: data.evaluations.filter((e) => e.decision === 'needs_revision').length,
    help: data.helpRequests.length,
  };
  const exportCsv = () => {
    const headers = ['Participant', 'Binôme', ...workshops.flatMap((w) => [`${w.code} statut`, `${w.code} version`, `${w.code} note`, `${w.code} décision`]), 'Plan J+7 : tâche', 'Plan J+7 : outil'];
    const body = rows.map((r) => [r.e.display_name, r.team?.name ?? '', ...r.cells.flatMap((c) => [PARTICIPANT_STATUS_LABELS[c.st], c.sub?.current_version ?? 0, c.ev ? `${c.ev.total}/10` : '', c.ev?.decision ?? '']), r.plan?.plan.task ?? '', r.plan?.plan.tool ?? '']);
    downloadText(`rapport-${session.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.csv`, toCsv(headers, body), 'text/csv;charset=utf-8');
  };
  return (
    <AppShell wide>
      <div className="no-print flex flex-wrap justify-between items-start gap-3 mb-3">
        <div>
          <Link to={`/t/sessions/${session.id}/animer`} className="underline text-brand-700 text-sm">← Tableau de bord</Link>
          <h1 className="text-2xl font-semibold">Rapport formateur</h1>
          <p className="text-muted text-sm">Éléments de suivi pédagogique. Une connexion, un minuteur ou une remise ne prouvent pas une présence de sept heures : ce rapport n’est ni un émargement certifié ni une attestation de durée.</p>
        </div>
        <div className="flex gap-2"><Button onClick={exportCsv}>Export CSV (statuts et évaluations)</Button><Button variant="primary" onClick={() => window.print()}><Printer size={16} aria-hidden /> Imprimer / PDF</Button></div>
      </div>
      <article className="space-y-4">
        <Card>
          <div className="flex justify-between items-start gap-3">
            <div><Brand large /><h2 className="text-xl font-semibold mt-2">{session.title}</h2><p className="text-sm text-muted">{session.program_title} · version {session.program_version_number} · {formatDate(session.start_date)}{session.end_date ? ` → ${formatDate(session.end_date)}` : ''} · {session.mode} · formateur : {profileName(session.trainer_id)}</p></div>
            <dl className="text-sm grid grid-cols-2 gap-x-4"><dt>Participants approuvés</dt><dd className="font-semibold">{approved.length}</dd><dt>Productions remises</dt><dd className="font-semibold">{totals.submitted}</dd><dt>Validées</dt><dd className="font-semibold">{totals.validated}</dd><dt>Demandes de reprise</dt><dd className="font-semibold">{totals.revisions}</dd><dt>Demandes d’aide</dt><dd className="font-semibold">{totals.help}</dd></dl>
          </div>
        </Card>
        <Card title="Participations enregistrées et acquis observés">
          <div className="overflow-x-auto">
            <table className="text-xs w-full">
              <thead><tr className="text-left border-b border-line"><th className="py-1 pr-2">Participant</th><th className="pr-2">Binôme</th>{workshops.map((w) => <th key={w.id} className="pr-2" title={w.title}>{w.code}</th>)}<th>Plan J+7</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.e.id} className="border-b border-line align-top">
                    <td className="py-1 pr-2 font-medium">{r.e.display_name}</td>
                    <td className="pr-2 text-muted">{r.team?.name ?? '—'}</td>
                    {r.cells.map((c) => <td key={c.w.id} className="pr-2">{PARTICIPANT_STATUS_LABELS[c.st]}{c.sub?.current_version ? ` V${c.sub.current_version}` : ''}{c.ev ? ` · ${c.ev.total}/10` : ''}</td>)}
                    <td>{r.plan ? `${r.plan.plan.task || '—'} (${r.plan.plan.tool || 'outil ?'})` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted mt-2">Statuts calculés sur les actions réelles. Les évaluations sont formatives et portent sur la tâche observée ; elles ne prouvent pas la maîtrise des six familles d’usage.</p>
        </Card>
        <Card title="Demandes d’aide">
          {data.helpRequests.length === 0 ? <p className="text-sm text-muted">Aucune.</p> : <ul className="text-sm space-y-1">{data.helpRequests.map((h) => <li key={h.id}>{formatTime(h.created_at)} · {profileName(h.requester_id)} · {workshops.find((w) => w.id === h.session_workshop_id)?.code ?? '—'} · {h.reason} · {h.status === 'resolved' ? `résolu ${formatTime(h.resolved_at)}` : h.status}</li>)}</ul>}
        </Card>
        <Card title="Journal des événements (sans contenu sensible)" className="no-print">
          {events.loading ? <Loading /> : <ul className="text-xs space-y-0.5 max-h-72 overflow-y-auto">{(events.data ?? []).map((e) => <li key={e.id}><span className="text-muted">{formatDate(e.created_at, true)}</span> · {e.type} · {profileName(e.actor_id)} {e.payload && Object.keys(e.payload).length ? <span className="text-muted">{JSON.stringify(e.payload)}</span> : null}</li>)}</ul>}
        </Card>
      </article>
    </AppShell>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { Badge, Button, Card, Checkbox, Field, Input, Loading, Notice, Select, Tabs, Textarea, formatDate, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData } from '../../hooks/useSessionData';
import { parseRosterCsv } from '../../lib/csv';
import { checkDurations } from '../../lib/durations';
import { FAMILIES, SESSION_STATUS_LABELS, type Enrollment, type Retention, type Session, type SessionStatus } from '../../lib/types';
import type { TeamInput } from '../../lib/backend/types';

const STATUS_FLOW: Record<SessionStatus, { label: string; next: SessionStatus }[]> = {
  draft: [{ label: 'Marquer comme préparée (inscriptions possibles)', next: 'prepared' }],
  prepared: [{ label: 'Ouvrir la session', next: 'open' }, { label: 'Revenir au brouillon', next: 'draft' }],
  open: [{ label: 'Suspendre', next: 'suspended' }, { label: 'Clôturer', next: 'closed' }],
  suspended: [{ label: 'Reprendre', next: 'open' }, { label: 'Clôturer', next: 'closed' }],
  closed: [{ label: 'Rouvrir', next: 'open' }],
};

export function SessionPreparePage() {
  const { sessionId } = useParams();
  const { backend } = useAuth();
  const toast = useToast();
  const { data, error, reload, profileName } = useSessionData(sessionId);
  const tools = useAsync(() => backend.listToolCards(), [backend]);
  const [tab, setTab] = useState<'settings' | 'roster' | 'teams' | 'tools' | 'program'>('settings');
  if (error) return <AppShell><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data) return <AppShell><Loading /></AppShell>;
  const { session } = data;
  return (
    <AppShell wide>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <Link to="/t/sessions" className="underline text-brand-700 text-sm">← Mes sessions</Link>
          <h1 className="text-2xl font-semibold">{session.title}</h1>
          <p className="text-muted text-sm">{session.program_title} · version {session.program_version_number} · Code <span className="font-mono tracking-widest">{session.join_code}</span> · <Badge tone={session.status === 'open' ? 'success' : 'info'}>{SESSION_STATUS_LABELS[session.status]}</Badge></p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FLOW[session.status].map((a) => (
            <Button key={a.next} variant={a.next === 'open' ? 'primary' : 'secondary'} onClick={async () => { try { await backend.updateSession(session.id, { status: a.next }); toast(`Session : ${SESSION_STATUS_LABELS[a.next]}.`, 'success'); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }}>{a.label}</Button>
          ))}
          <Link to={`/t/sessions/${session.id}/animer`} className="rounded-md border border-brand-600 bg-brand-600 text-white px-4 py-2 font-medium hover:bg-brand-700">Animer</Link>
        </div>
      </div>
      <Tabs label="Préparation" value={tab} onChange={setTab} tabs={[{ key: 'settings', label: 'Paramètres' }, { key: 'roster', label: `Participants (${data.enrollments.filter((e) => e.status === 'approved').length}/${session.max_participants})` }, { key: 'teams', label: `Binômes (${data.teams.length})` }, { key: 'tools', label: 'Outils autorisés' }, { key: 'program', label: 'Programme de la session' }]} />
      {tab === 'settings' && <SettingsTab session={session} />}
      {tab === 'roster' && <RosterTab data={data} reload={reload} />}
      {tab === 'teams' && <TeamsTab data={data} profileName={profileName} />}
      {tab === 'tools' && <ToolsTab session={session} tools={tools.data ?? []} />}
      {tab === 'program' && <ProgramTab data={data} />}
    </AppShell>
  );
}

function SettingsTab({ session }: { session: Session }) {
  const { backend } = useAuth();
  const toast = useToast();
  const [f, setF] = useState({ title: session.title, mode: session.mode, start_date: session.start_date ?? '', end_date: session.end_date ?? '', meeting_link: session.meeting_link ?? '', max_participants: session.max_participants, resources_access: session.resources_access, peer_review_enabled: session.peer_review_enabled, retention: session.retention });
  const [busy, setBusy] = useState(false);
  const ret = (k: keyof Retention, v: string) => setF({ ...f, retention: { ...f.retention, [k]: v === '' ? null : Number(v) } });
  return (
    <Card title="Paramètres de la session">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Titre">{(id) => <Input id={id} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />}</Field>
        <Field label="Modalité">{(id) => <Select id={id} value={f.mode} onChange={(e) => setF({ ...f, mode: e.target.value as Session['mode'] })}><option value="presentiel">Présentiel</option><option value="visio">Visio</option><option value="mixte">Mixte</option></Select>}</Field>
        <Field label="Date de la séance 1">{(id) => <Input id={id} type="date" value={f.start_date} onChange={(e) => setF({ ...f, start_date: e.target.value })} />}</Field>
        <Field label="Date de la séance 2">{(id) => <Input id={id} type="date" value={f.end_date} onChange={(e) => setF({ ...f, end_date: e.target.value })} />}</Field>
        <Field label="Lien vers la réunion existante (visio)" hint="Aucune visioconférence n’est intégrée ; le lien est simplement affiché aux participants.">{(id) => <Input id={id} type="url" value={f.meeting_link} onChange={(e) => setF({ ...f, meeting_link: e.target.value })} />}</Field>
        <Field label="Effectif maximal">{(id) => <Input id={id} type="number" min={1} max={60} value={f.max_participants} onChange={(e) => setF({ ...f, max_participants: Number(e.target.value) })} />}</Field>
        <Field label="Accès aux ressources">{(id) => <Select id={id} value={f.resources_access} onChange={(e) => setF({ ...f, resources_access: e.target.value as Session['resources_access'] })}><option value="all">Toutes les ressources dès l’inscription</option><option value="opened_only">Seulement celles des ateliers ouverts</option></Select>}</Field>
        <div className="pt-6"><Checkbox label="Activer l’appréciation entre pairs sur les exemples partagés" checked={f.peer_review_enabled} onChange={(v) => setF({ ...f, peer_review_enabled: v })} /></div>
        <fieldset className="md:col-span-2 rounded-md border border-line p-3">
          <legend className="font-medium px-1">Durées de conservation (jours) — définies par l’organisme</legend>
          <p className="text-sm text-muted mb-2">Vide = non définie. Ces durées sont des choix de l’organisme, pas des obligations légales affichées par l’application. Aucune suppression automatique n’est exécutée en V1 : l’indication sert au suivi.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Brouillons">{(id) => <Input id={id} type="number" min={0} value={f.retention.drafts_days ?? ''} onChange={(e) => ret('drafts_days', e.target.value)} />}</Field>
            <Field label="Productions">{(id) => <Input id={id} type="number" min={0} value={f.retention.productions_days ?? ''} onChange={(e) => ret('productions_days', e.target.value)} />}</Field>
            <Field label="Traces de formation">{(id) => <Input id={id} type="number" min={0} value={f.retention.traces_days ?? ''} onChange={(e) => ret('traces_days', e.target.value)} />}</Field>
          </div>
        </fieldset>
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        <Button variant="primary" busy={busy} onClick={async () => { setBusy(true); try { await backend.updateSession(session.id, { title: f.title, mode: f.mode, start_date: f.start_date || null, end_date: f.end_date || null, meeting_link: f.meeting_link || null, max_participants: f.max_participants, resources_access: f.resources_access, peer_review_enabled: f.peer_review_enabled, retention: f.retention }); toast('Paramètres enregistrés.', 'success'); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } finally { setBusy(false); } }}>Enregistrer</Button>
        <Button variant="danger" onClick={async () => { if (!confirm('Supprimer définitivement cette session, ses productions et ses fichiers ?')) return; try { await backend.deleteSession(session.id); location.assign('/t/sessions'); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }}>Supprimer la session</Button>
      </div>
    </Card>
  );
}

function RosterTab({ data, reload }: { data: NonNullable<ReturnType<typeof useSessionData>['data']>; reload: () => Promise<void> }) {
  const { backend } = useAuth();
  const toast = useToast();
  const [csv, setCsv] = useState('');
  const [single, setSingle] = useState({ email: '', name: '' });
  const [detail, setDetail] = useState<Enrollment | null>(null);
  const invite = async (rows: { email: string; display_name: string }[]) => {
    try {
      const r = await backend.inviteByEmail(data.session.id, rows);
      toast(`${r.added} invitation(s) ajoutée(s)${r.duplicates.length ? ` · doublons ignorés : ${r.duplicates.join(', ')}` : ''}.`, 'success');
      setCsv('');
      setSingle({ email: '', name: '' });
      await reload();
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    }
  };
  const statusLabel: Record<Enrollment['status'], { t: string; tone: 'success' | 'warning' | 'neutral' | 'danger' | 'info' }> = { invited: { t: 'Invité (pas encore connecté)', tone: 'info' }, pending: { t: 'Demande à approuver', tone: 'warning' }, approved: { t: 'Approuvé', tone: 'success' }, rejected: { t: 'Refusé', tone: 'danger' }, removed: { t: 'Retiré', tone: 'neutral' } };
  const pending = data.enrollments.filter((e) => e.status === 'pending');
  return (
    <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
      <Card title="Roster">
        {pending.length > 0 && <Notice tone="warning">{pending.length} demande(s) en attente d’approbation.</Notice>}
        <table className="w-full text-sm mt-2">
          <thead><tr className="text-left border-b border-line"><th className="py-1">Nom</th><th>E-mail</th><th>Statut</th><th>Positionnement</th><th>Actions</th></tr></thead>
          <tbody>
            {data.enrollments.map((e) => (
              <tr key={e.id} className="border-b border-line">
                <td className="py-1 pr-2">{e.display_name || '—'}</td>
                <td className="pr-2 text-muted">{e.invited_email ?? data.profiles.find((p) => p.id === e.user_id)?.email ?? '—'}</td>
                <td className="pr-2"><Badge tone={statusLabel[e.status].tone}>{statusLabel[e.status].t}</Badge></td>
                <td className="pr-2">{e.positioning ? <button className="underline text-brand-700" onClick={() => setDetail(e)}>voir</button> : <span className="text-muted">—</span>}</td>
                <td className="flex gap-1 py-1 flex-wrap">
                  {e.status === 'pending' && <><Button size="sm" variant="primary" onClick={() => backend.updateEnrollment(e.id, { status: 'approved' })}>Approuver</Button><Button size="sm" onClick={() => backend.updateEnrollment(e.id, { status: 'rejected' })}>Refuser</Button></>}
                  {e.status === 'approved' && <Button size="sm" onClick={() => backend.updateEnrollment(e.id, { status: 'removed' })}>Retirer</Button>}
                  {(e.status === 'removed' || e.status === 'rejected') && <Button size="sm" onClick={() => backend.updateEnrollment(e.id, { status: 'approved' })}>Réintégrer</Button>}
                  {e.status === 'invited' && <Button size="sm" variant="danger" onClick={() => backend.deleteEnrollment(e.id)}>Supprimer</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {detail && (
          <div className="mt-3 rounded-md bg-surface p-3 text-sm">
            <div className="flex justify-between"><strong>Positionnement de {detail.display_name}</strong><button className="underline" onClick={() => setDetail(null)}>fermer</button></div>
            <p>Poste : {detail.positioning?.job || '—'} · Aisance : {detail.positioning?.comfort ?? '—'}/4 · IA déjà utilisée : {detail.positioning?.used_ai_before ?? '—'}</p>
            <p>Tâche prioritaire : {detail.positioning?.priority_task || '—'}</p>
            <p>Attentes : {detail.positioning?.expectations || '—'}</p>
            <p className="mt-1">Accès aux outils : {Object.entries(detail.tool_access).length ? Object.entries(detail.tool_access).map(([k, v]) => `${k} : ${v}`).join(', ') : 'non renseigné'}</p>
          </div>
        )}
      </Card>
      <div className="space-y-4">
        <Card title="Inviter par e-mail">
          <p className="text-sm text-muted mb-2">La personne crée son compte avec cet e-mail, saisit le code <span className="font-mono">{data.session.join_code}</span> et est approuvée automatiquement. Les doublons sont ignorés.</p>
          <Field label="E-mail">{(id) => <Input id={id} type="email" value={single.email} onChange={(e) => setSingle({ ...single, email: e.target.value })} />}</Field>
          <Field label="Nom affiché">{(id) => <Input id={id} value={single.name} onChange={(e) => setSingle({ ...single, name: e.target.value })} />}</Field>
          <Button className="mt-2" variant="primary" onClick={() => invite([{ email: single.email, display_name: single.name }])} disabled={!single.email}>Inviter</Button>
        </Card>
        <Card title="Import CSV simple">
          <Field label="Coller le CSV (nom;email par ligne)" hint="Séparateur ; , ou tabulation. Les lignes sans e-mail sont ignorées.">{(id) => <Textarea id={id} value={csv} onChange={(e) => setCsv(e.target.value)} className="font-mono text-xs" />}</Field>
          <input type="file" accept=".csv,.txt" className="mt-2 text-sm" aria-label="Choisir un fichier CSV" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setCsv(await f.text()); }} />
          <Button className="mt-2" onClick={() => invite(parseRosterCsv(csv))} disabled={!csv.trim()}>Importer ({parseRosterCsv(csv).length} ligne(s) valide(s))</Button>
        </Card>
      </div>
    </div>
  );
}

function TeamsTab({ data, profileName }: { data: NonNullable<ReturnType<typeof useSessionData>['data']>; profileName: (id: string | null | undefined) => string }) {
  const { backend } = useAuth();
  const toast = useToast();
  const approved = data.enrollments.filter((e) => e.status === 'approved' && e.user_id);
  const [teams, setTeams] = useState<TeamInput[]>([]);
  useEffect(() => {
    setTeams(data.teams.map((t) => ({ id: t.id, name: t.name, kind: t.kind, user_ids: data.members.filter((m) => m.team_id === t.id).map((m) => m.user_id) })));
  }, [data.teams, data.members]);
  const assigned = new Set(teams.flatMap((t) => t.user_ids));
  const unassigned = approved.filter((e) => !assigned.has(e.user_id!));
  const randomize = () => {
    const ids = approved.map((e) => e.user_id!).sort(() => Math.random() - 0.5);
    const out: TeamInput[] = [];
    let i = 0;
    let n = 1;
    while (i < ids.length) {
      const remaining = ids.length - i;
      const size = remaining === 3 ? 3 : remaining === 1 ? 1 : 2;
      out.push({ name: size === 1 ? `Individuel ${n}` : size === 3 ? `Trio ${n}` : `Binôme ${n}`, kind: size === 1 ? 'solo' : size === 3 ? 'trio' : 'pair', user_ids: ids.slice(i, i + size) });
      i += size;
      n++;
    }
    setTeams(out);
  };
  const save = async () => {
    try {
      await backend.saveTeams(data.session.id, teams.map((t) => ({ ...t, kind: t.user_ids.length === 1 ? 'solo' : t.user_ids.length === 3 ? 'trio' : 'pair' })));
      toast('Binômes enregistrés.', 'success');
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    }
  };
  return (
    <Card title="Binômes" actions={<><Button onClick={randomize} disabled={!approved.length}>Attribution aléatoire</Button><Button onClick={() => setTeams([...teams, { name: `Binôme ${teams.length + 1}`, kind: 'pair', user_ids: [] }])}>Ajouter un binôme</Button><Button variant="primary" onClick={save}>Enregistrer</Button></>}>
      <p className="text-sm text-muted mb-3">Effectif impair : formez un trio ou laissez une personne en tâche individuelle. Les ateliers 1 à 6 se font en binôme ; le défi individuel et le bilan restent individuels.</p>
      {unassigned.length > 0 && <Notice tone="warning">Sans binôme : {unassigned.map((e) => e.display_name).join(', ')}</Notice>}
      <div className="grid gap-3 md:grid-cols-2 mt-3">
        {teams.map((t, i) => (
          <div key={t.id ?? i} className="rounded-md border border-line p-3">
            <div className="flex gap-2 items-center">
              <Input aria-label="Nom du binôme" value={t.name} onChange={(e) => setTeams(teams.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
              <Button size="sm" variant="danger" onClick={() => setTeams(teams.filter((_, j) => j !== i))}>Supprimer</Button>
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {t.user_ids.map((uid) => <li key={uid} className="flex justify-between"><span>{profileName(uid)}</span><button className="underline text-muted" onClick={() => setTeams(teams.map((x, j) => (j === i ? { ...x, user_ids: x.user_ids.filter((u) => u !== uid) } : x)))}>retirer</button></li>)}
            </ul>
            <Select aria-label="Ajouter un membre" className="mt-2" value="" onChange={(e) => { const uid = e.target.value; if (!uid) return; setTeams(teams.map((x, j) => (j === i ? { ...x, user_ids: [...x.user_ids, uid] } : x))); }}>
              <option value="">+ ajouter une personne</option>
              {unassigned.map((e) => <option key={e.user_id!} value={e.user_id!}>{e.display_name}</option>)}
            </Select>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ToolsTab({ session, tools }: { session: Session; tools: import('../../lib/types').ToolCard[] }) {
  const { backend } = useAuth();
  const toast = useToast();
  const [allowed, setAllowed] = useState<string[]>(session.allowed_tool_ids);
  const byFamily = useMemo(() => FAMILIES.map((f) => ({ f, cards: tools.filter((t) => t.family === f.key) })), [tools]);
  return (
    <Card title="Outils autorisés pour cette session" actions={<Button variant="primary" onClick={async () => { try { await backend.updateSession(session.id, { allowed_tool_ids: allowed }); toast('Outils enregistrés.', 'success'); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }}>Enregistrer</Button>}>
      <p className="text-sm text-muted mb-3">Cochez les outils réellement accessibles et autorisés dans les structures des participants. Les solutions de secours restent toujours disponibles. Remplacer un outil ne modifie pas les consignes des ateliers.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {byFamily.map(({ f, cards }) => (
          <div key={f.key}>
            <h3 className="font-semibold">{f.label}</h3>
            {cards.map((t) => <Checkbox key={t.id} label={`${t.name}${t.is_fallback ? ' (secours)' : ''}`} description={`${t.authorization_status === 'authorized' ? 'Autorisé' : t.authorization_status === 'to_validate' ? 'À valider' : 'Non autorisé'} · ${t.last_verified_on ? 'vérifié le ' + formatDate(t.last_verified_on) : 'à vérifier'}`} checked={allowed.includes(t.id)} onChange={(v) => setAllowed(v ? [...allowed, t.id] : allowed.filter((x) => x !== t.id))} />)}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProgramTab({ data }: { data: NonNullable<ReturnType<typeof useSessionData>['data']> }) {
  const check = checkDurations(data.workshops);
  return (
    <Card title={`Programme figé pour cette session — ${check.total} min hors pauses (séance 1 : ${check.seance1} min, séance 2 : ${check.seance2} min)`}>
      <p className="text-sm text-muted mb-2">Instantané pris à la création de la session : modifier le modèle de programme ne change pas ces consignes. Une mise à jour ici est explicite, tracée et annoncée au groupe. Les pauses et horaires calendaires sont gérés à part et ne réduisent pas les 420 minutes.</p>
      {check.problems.length > 0 && <Notice tone="warning">{check.problems.join(' ')}</Notice>}
      <ol className="divide-y divide-line">
        {data.workshops.map((w) => (
          <li key={w.id} className="py-2 flex flex-wrap justify-between gap-2">
            <div>
              <span className="text-muted text-sm mr-2">S{w.seance} · {w.position}</span><strong>{w.title}</strong> <span className="text-muted">{w.duration_min} min</span>
              <div className="text-sm text-muted">{w.breakdown.map((b) => `${b.label} ${b.minutes} min`).join(' · ')}</div>
              {w.content_updated_at && <div className="text-sm text-amber-800">Mis à jour le {formatDate(w.content_updated_at, true)} : {w.update_note}</div>}
            </div>
            <Link to={`/t/sessions/${data.session.id}/ateliers/${w.id}/modifier`} className="underline text-brand-700 text-sm">Modifier la consigne</Link>
          </li>
        ))}
      </ol>
    </Card>
  );
}

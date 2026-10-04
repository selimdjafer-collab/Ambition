import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink, Pause, Play, Plus, Square, RotateCcw } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { TimerDisplay } from '../../components/TimerDisplay';
import { Badge, Button, Card, Field, Input, Loading, Modal, Notice, Select, Textarea, cx, formatTime, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData, type SessionData } from '../../hooks/useSessionData';
import { deriveStatus, openHelpFor, statusTone, submissionFor } from '../../lib/status';
import { PARTICIPANT_STATUS_LABELS, SESSION_STATUS_LABELS, type ParticipantWorkshopStatus, type SessionWorkshop } from '../../lib/types';

export function SessionLivePage() {
  const { sessionId } = useParams();
  const { backend } = useAuth();
  const toast = useToast();
  const { data, error, connected, lastSync, reload, profileName } = useSessionData(sessionId);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [customMin, setCustomMin] = useState(10);
  const run = async (fn: () => Promise<unknown>, okMsg?: string) => {
    try {
      await fn();
      if (okMsg) toast(okMsg, 'success');
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    }
  };
  if (error) return <AppShell wide><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data) return <AppShell wide><Loading /></AppShell>;
  const { session, workshops } = data;
  const current = workshops.find((w) => w.id === session.current_session_workshop_id) ?? null;
  const selected = workshops.find((w) => w.id === (selectedId ?? current?.id)) ?? current ?? workshops[0];
  const nextWorkshop = current ? workshops.find((w) => w.position === current.position + 1) ?? null : workshops[0];
  const openHelp = data.helpRequests.filter((h) => h.status !== 'resolved');

  return (
    <AppShell wide>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <Link to="/t/sessions" className="underline text-brand-700 text-sm">← Mes sessions</Link>
          <h1 className="text-2xl font-semibold">{session.title}</h1>
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <Badge tone={session.status === 'open' ? 'success' : 'warning'}>{SESSION_STATUS_LABELS[session.status]}</Badge>
            <span className="text-muted">Code <span className="font-mono tracking-widest">{session.join_code}</span></span>
            <span className={cx('text-muted', !connected && 'text-red-700')}>{connected ? `Synchronisé ${lastSync ? formatTime(new Date(lastSync).toISOString()) : ''}` : 'Reconnexion…'}</span>
            <button className="underline text-muted" onClick={() => reload()}>Rafraîchir</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {session.status !== 'open' && <Button variant="primary" onClick={() => run(() => backend.updateSession(session.id, { status: 'open' }), 'Session ouverte.')}>Ouvrir la session</Button>}
          {session.status === 'open' && <Button onClick={() => run(() => backend.updateSession(session.id, { status: 'suspended' }), 'Session suspendue.')}>Suspendre</Button>}
          <Link to={`/t/sessions/${session.id}/preparer`} className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium hover:bg-surface">Préparer</Link>
          <Link to={`/t/sessions/${session.id}/rapport`} className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium hover:bg-surface">Rapport</Link>
          <Link to={`/t/sessions/${session.id}/presentation`} target={import.meta.env.VITE_HASH_ROUTER === 'true' ? undefined : '_blank'} rel="noopener" className="inline-flex items-center gap-1 rounded-md border border-brand-600 bg-brand-600 text-white px-3 py-2 text-sm font-medium hover:bg-brand-700">Mode présentation <ExternalLink size={14} aria-hidden /></Link>
        </div>
      </div>
      {session.status !== 'open' && <Notice tone="warning">La session n’est pas ouverte : les participants ne peuvent pas déposer de production.</Notice>}

      <div className="grid gap-4 xl:grid-cols-[22rem_minmax(0,1fr)_22rem]">
        {/* Colonne 1 : atelier en cours, minuteur, ateliers */}
        <div className="space-y-4">
          <Card title="Atelier en cours">
            {current ? (
              <>
                <p className="font-semibold">{current.title}</p>
                <p className="text-sm text-muted">Étape : {current.breakdown[session.current_step]?.label ?? '—'} · Prochaine : {current.breakdown[session.current_step + 1]?.label ?? (nextWorkshop ? `atelier suivant (${nextWorkshop.title})` : 'fin du parcours')}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {current.breakdown.map((b, i) => (
                    <Button key={i} size="sm" variant={i === session.current_step ? 'primary' : 'secondary'} onClick={() => run(() => backend.setCurrentWorkshop(session.id, current.id, i))} aria-pressed={i === session.current_step}>
                      {b.label} · {b.minutes} min
                    </Button>
                  ))}
                </div>
              </>
            ) : <p className="text-sm text-muted">Sélectionnez un atelier ci-dessous et définissez-le comme atelier en cours.</p>}
            <div className="mt-3 flex flex-col items-center gap-2">
              <TimerDisplay timer={session.timer} />
              <div className="flex flex-wrap gap-1 justify-center">
                {current && current.breakdown[session.current_step] && session.timer.status !== 'running' && session.timer.status !== 'paused' && (
                  <Button size="sm" variant="primary" onClick={() => run(() => backend.timerControl(session.id, 'start', current.breakdown[session.current_step].minutes * 60, `${current.code} — ${current.breakdown[session.current_step].label}`))}><Play size={14} aria-hidden /> Lancer {current.breakdown[session.current_step].minutes} min</Button>
                )}
                {session.timer.status === 'running' && <Button size="sm" onClick={() => run(() => backend.timerControl(session.id, 'pause'))}><Pause size={14} aria-hidden /> Pause</Button>}
                {session.timer.status === 'paused' && <Button size="sm" variant="primary" onClick={() => run(() => backend.timerControl(session.id, 'resume'))}><Play size={14} aria-hidden /> Reprendre</Button>}
                {(session.timer.status === 'running' || session.timer.status === 'paused' || session.timer.status === 'finished') && <Button size="sm" onClick={() => run(() => backend.timerControl(session.id, 'add', 300))}><Plus size={14} aria-hidden /> 5 min</Button>}
                {(session.timer.status === 'running' || session.timer.status === 'paused') && <Button size="sm" onClick={() => run(() => backend.timerControl(session.id, 'finish'))}><Square size={14} aria-hidden /> Terminer</Button>}
                {session.timer.status !== 'idle' && <Button size="sm" variant="ghost" onClick={() => run(() => backend.timerControl(session.id, 'reset'))}><RotateCcw size={14} aria-hidden /> Réinitialiser</Button>}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <label htmlFor="custom-min">Durée libre :</label>
                <Input id="custom-min" type="number" min={1} max={240} value={customMin} onChange={(e) => setCustomMin(Number(e.target.value))} className="w-20" />
                <Button size="sm" onClick={() => run(() => backend.timerControl(session.id, 'start', customMin * 60, current ? `${current.code}` : undefined))}>Lancer</Button>
              </div>
              <p className="text-xs text-muted text-center">Le serveur fait autorité : après rechargement, chaque écran retrouve la même échéance. La fin du minuteur ne remet aucune production.</p>
            </div>
          </Card>

          <Card title="Ateliers">
            <ol className="space-y-1">
              {workshops.map((w) => (
                <li key={w.id} className={cx('rounded-md border px-2 py-1.5 text-sm', w.id === selected?.id ? 'border-brand-500 bg-brand-50/50' : 'border-line')}>
                  <div className="flex items-start justify-between gap-2">
                    <button className="text-left font-medium" onClick={() => setSelectedId(w.id)}>
                      <span className="text-muted mr-1">S{w.seance}·{w.position}</span>{w.title} <span className="text-muted">({w.duration_min} min)</span>
                    </button>
                    <Badge tone={w.status === 'open' ? 'success' : w.status === 'closed' ? 'neutral' : 'info'}>{w.status === 'open' ? 'Ouvert' : w.status === 'closed' ? 'Terminé' : 'Fermé'}</Badge>
                  </div>
                  {w.id === selected?.id && <WorkshopControls w={w} isCurrent={w.id === current?.id} sessionId={session.id} />}
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* Colonne 2 : groupe */}
        <div className="space-y-4 min-w-0">
          <GroupBoard data={data} workshop={selected ?? null} profileName={profileName} />
          <ExamplesAndPolls data={data} profileName={profileName} />
        </div>

        {/* Colonne 3 : aide */}
        <div className="space-y-4">
          <Card title={`Demandes d’aide (${openHelp.length})`}>
            {openHelp.length === 0 ? <p className="text-sm text-muted">Aucune demande en attente.</p> : (
              <ul className="space-y-2">
                {openHelp.map((h) => {
                  const w = workshops.find((x) => x.id === h.session_workshop_id);
                  const team = data.teams.find((t) => t.id === h.team_id);
                  return (
                    <li key={h.id} className={cx('rounded-md border p-2 text-sm', h.status === 'open' ? 'border-red-300 bg-red-50' : 'border-blue-300 bg-blue-50')}>
                      <div className="flex justify-between gap-2"><strong>{profileName(h.requester_id)}{team ? ` (${team.name})` : ''}</strong><span className="text-muted">{formatTime(h.created_at)}</span></div>
                      <div className="text-muted">{w?.code ?? '—'} · {h.reason}</div>
                      <div className="mt-1 flex gap-1">
                        {h.status === 'open' && <Button size="sm" variant="primary" onClick={() => run(() => backend.updateHelpRequest(h.id, 'in_progress'))}>Je m’en occupe</Button>}
                        <Button size="sm" onClick={() => run(() => backend.updateHelpRequest(h.id, 'resolved'))}>Résolu</Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            {data.helpRequests.some((h) => h.status === 'resolved') && <p className="text-xs text-muted mt-2">{data.helpRequests.filter((h) => h.status === 'resolved').length} demande(s) résolue(s).</p>}
          </Card>
          <Card title="Inscriptions">
            {data.enrollments.filter((e) => e.status === 'pending').length === 0 ? <p className="text-sm text-muted">Aucune demande en attente. {data.enrollments.filter((e) => e.status === 'approved').length} participant(s) approuvé(s).</p> : (
              <ul className="space-y-1 text-sm">
                {data.enrollments.filter((e) => e.status === 'pending').map((e) => (
                  <li key={e.id} className="flex justify-between gap-2 items-center"><span>{e.display_name}</span><span className="flex gap-1"><Button size="sm" variant="primary" onClick={() => run(() => backend.updateEnrollment(e.id, { status: 'approved' }))}>Approuver</Button><Button size="sm" onClick={() => run(() => backend.updateEnrollment(e.id, { status: 'rejected' }))}>Refuser</Button></span></li>
                ))}
              </ul>
            )}
          </Card>
          <Card title={`Boîte à outils du groupe (${data.toolbox.length})`}>
            <p className="text-sm">En construction {data.toolbox.filter((t) => t.status === 'draft').length} · testés {data.toolbox.filter((t) => t.status === 'tested').length} · prêts {data.toolbox.filter((t) => t.status === 'ready').length} · validés {data.toolbox.filter((t) => t.status === 'validated').length}</p>
            <ul className="text-sm mt-2 space-y-1 max-h-48 overflow-y-auto">
              {[...data.toolbox].sort((a, b) => b.updated_at.localeCompare(a.updated_at)).slice(0, 8).map((t) => <li key={t.id} className="flex justify-between gap-2"><span>{t.name} <span className="text-muted">— {profileName(t.owner_id)}</span></span><span className="text-muted">{t.tests.length} test(s)</span></li>)}
            </ul>
            <Link to={`/t/sessions/${session.id}/boite`} className="inline-block mt-2 underline text-brand-700 text-sm">Lire, commenter, valider, publier</Link>
          </Card>
          <IdeasWall data={data} profileName={profileName} />
        </div>
      </div>
    </AppShell>
  );
}

function WorkshopControls({ w, isCurrent, sessionId }: { w: SessionWorkshop; isCurrent: boolean; sessionId: string }) {
  const { backend } = useAuth();
  const toast = useToast();
  const run = (fn: () => Promise<unknown>) => fn().catch((e) => toast(e instanceof Error ? e.message : String(e), 'error'));
  return (
    <div className="mt-2 space-y-1">
      <div className="flex flex-wrap gap-1">
        {w.status !== 'open' && <Button size="sm" variant="primary" onClick={() => run(() => backend.updateSessionWorkshopState(w.id, { status: 'open' }))}>Ouvrir</Button>}
        {w.status === 'open' && <Button size="sm" onClick={() => run(() => backend.updateSessionWorkshopState(w.id, { status: 'closed' }))}>Terminer</Button>}
        {w.status === 'closed' && <Button size="sm" onClick={() => run(() => backend.updateSessionWorkshopState(w.id, { status: 'open' }))}>Prolonger (rouvrir)</Button>}
        {!isCurrent && <Button size="sm" onClick={() => run(() => backend.setCurrentWorkshop(sessionId, w.id, 0))}>Atelier en cours</Button>}
        <Link to={`/t/sessions/${sessionId}/ateliers/${w.id}/modifier`} className="text-xs underline text-brand-700 self-center">Consigne</Link>
      </div>
      <div className="flex flex-wrap items-center gap-1 text-xs">
        <span>Aides révélées :</span>
        {['aucune', 'indice', '+ trame', '+ exemple'].map((l, lvl) => (
          <Button key={lvl} size="sm" variant={w.hints_revealed === lvl ? 'primary' : 'secondary'} onClick={() => run(() => backend.updateSessionWorkshopState(w.id, { hints_revealed: lvl }))} aria-pressed={w.hints_revealed === lvl}>{l}</Button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs">
        <Button size="sm" variant={w.answer_key_revealed ? 'accent' : 'secondary'} onClick={() => run(() => backend.updateSessionWorkshopState(w.id, { answer_key_revealed: !w.answer_key_revealed }))}>{w.answer_key_revealed ? 'Corrigé visible des participants — masquer' : 'Révéler le corrigé'}</Button>
      </div>
    </div>
  );
}

function GroupBoard({ data, workshop, profileName }: { data: SessionData; workshop: SessionWorkshop | null; profileName: (id: string | null | undefined) => string }) {
  const approved = data.enrollments.filter((e) => e.status === 'approved' && e.user_id);
  const rows = useMemo(() => {
    if (!workshop) return [];
    const pair = workshop.content.work_mode === 'pair';
    const seen = new Set<string>();
    const out: { key: string; label: string; members: string[]; status: ParticipantWorkshopStatus; submissionId: string | null; version: number }[] = [];
    for (const e of approved) {
      const uid = e.user_id!;
      const m = data.members.find((x) => x.user_id === uid);
      const team = pair && m ? data.teams.find((t) => t.id === m.team_id) ?? null : null;
      const key = team ? team.id : uid;
      if (seen.has(key)) continue;
      seen.add(key);
      const members = team ? data.members.filter((x) => x.team_id === team.id).map((x) => x.user_id) : [uid];
      const sub = submissionFor(data.submissions, workshop.id, uid, team?.id ?? null);
      const help = members.some((u) => openHelpFor(data.helpRequests, workshop.id, u, team?.id ?? null));
      out.push({ key, label: team ? team.name : e.display_name, members, status: deriveStatus(sub, help), submissionId: sub?.id ?? null, version: sub?.current_version ?? 0 });
    }
    return out;
  }, [data, workshop, approved]);
  const counts = rows.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }), {} as Record<string, number>);
  if (!workshop) return null;
  return (
    <Card title={`Groupe — ${workshop.title}`}>
      <div className="flex flex-wrap gap-2 text-sm mb-3">
        <Badge tone="brand">Remis : {(counts.submitted ?? 0) + (counts.needs_revision ?? 0) + (counts.validated ?? 0)}</Badge>
        <Badge tone="success">Validés : {counts.validated ?? 0}</Badge>
        <Badge tone="warning">À améliorer : {counts.needs_revision ?? 0}</Badge>
        <Badge tone="danger">Aide demandée : {counts.help_requested ?? 0}</Badge>
        <Badge tone="neutral">Non commencé : {counts.not_started ?? 0}</Badge>
        <span className="text-muted self-center">Calculé sur les actions réelles (brouillons, remises, validations).</span>
      </div>
      {rows.length === 0 ? <p className="text-sm text-muted">Aucun participant approuvé.</p> : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {rows.map((r) => (
            <li key={r.key} className="rounded-md border border-line p-2 flex items-start justify-between gap-2">
              <div>
                <div className="font-medium">{r.label}</div>
                {r.members.length > 1 && <div className="text-xs text-muted">{r.members.map(profileName).join(' · ')}</div>}
                <Badge tone={statusTone(r.status)} className="mt-1">{PARTICIPANT_STATUS_LABELS[r.status]}{r.version ? ` · V${r.version}` : ''}</Badge>
              </div>
              {r.submissionId && <Link to={`/t/sessions/${data.session.id}/productions/${r.submissionId}`} className="text-sm underline text-brand-700 shrink-0">Voir / évaluer</Link>}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function ExamplesAndPolls({ data, profileName }: { data: SessionData; profileName: (id: string | null | undefined) => string }) {
  const { backend } = useAuth();
  const toast = useToast();
  const quiz = useAsync(() => backend.listQuizQuestions(), [backend]);
  const [pollOpen, setPollOpen] = useState(false);
  const [kind, setKind] = useState<'poll' | 'debrief' | 'quiz'>('debrief');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState('');
  const [quizId, setQuizId] = useState('');
  const [publishId, setPublishId] = useState('');
  const [publishTitle, setPublishTitle] = useState('');
  const run = (fn: () => Promise<unknown>, ok?: string) => fn().then(() => ok && toast(ok, 'success')).catch((e) => toast(e instanceof Error ? e.message : String(e), 'error'));
  const shareable = data.submissions.filter((s) => s.share_consent && s.current_version > 0);
  const workshopOf = (id: string) => data.workshops.find((w) => w.id === id)?.code ?? '';
  const createPoll = async () => {
    try {
      if (kind === 'quiz') {
        const q = quiz.data?.find((x) => x.id === quizId);
        if (!q) throw new Error('Choisissez une question');
        await backend.createPoll(data.session.id, 'quiz', q.question, q.options, { correct_index: q.correct_index, explanation: q.explanation });
      } else {
        if (!question.trim()) throw new Error('Question obligatoire');
        await backend.createPoll(data.session.id, kind, question.trim(), kind === 'poll' ? options.split('\n').map((o) => o.trim()).filter(Boolean) : []);
      }
      setPollOpen(false);
      setQuestion('');
      setOptions('');
      toast('Lancé auprès du groupe.', 'success');
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    }
  };
  return (
    <Card title="Débrief, sondages et exemples" actions={<Button size="sm" variant="primary" onClick={() => setPollOpen(true)}>Lancer une question</Button>}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="font-semibold text-sm mb-1">Questions en cours et récentes</h3>
          {data.polls.length === 0 ? <p className="text-sm text-muted">Aucune.</p> : (
            <ul className="space-y-2 text-sm">
              {[...data.polls].reverse().slice(0, 6).map((p) => {
                const answers = data.pollAnswers.filter((a) => a.poll_id === p.id);
                return (
                  <li key={p.id} className="rounded-md border border-line p-2">
                    <div className="flex justify-between gap-2"><span><Badge tone="neutral">{p.kind === 'quiz' ? 'Quiz' : p.kind === 'debrief' ? 'Débrief' : 'Sondage'}</Badge> {p.question}</span>{p.status === 'open' ? <Button size="sm" onClick={() => run(() => backend.closePoll(p.id), 'Clôturé : la correction est visible.')}>Clore</Button> : <Badge tone="neutral">Clos</Badge>}</div>
                    <PollResults poll={p} answers={answers} profileName={profileName} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-1">Publier un exemple au groupe</h3>
          <p className="text-xs text-muted mb-1">Uniquement les productions dont l’auteur a autorisé le partage. Une copie est publiée ; les notes restent privées.</p>
          {shareable.length === 0 ? <p className="text-sm text-muted">Aucune production autorisée au partage pour l’instant.</p> : (
            <div className="space-y-1">
              <Select aria-label="Production à publier" value={publishId} onChange={(e) => { setPublishId(e.target.value); const s = shareable.find((x) => x.id === e.target.value); if (s) setPublishTitle(`Exemple — ${workshopOf(s.session_workshop_id)} (${s.team_id ? data.teams.find((t) => t.id === s.team_id)?.name : profileName(s.owner_id)})`); }}>
                <option value="">— choisir —</option>
                {shareable.map((s) => <option key={s.id} value={s.id}>{workshopOf(s.session_workshop_id)} · {s.team_id ? data.teams.find((t) => t.id === s.team_id)?.name : profileName(s.owner_id)} · V{s.current_version}</option>)}
              </Select>
              <Input aria-label="Titre de l’exemple" value={publishTitle} onChange={(e) => setPublishTitle(e.target.value)} placeholder="Titre affiché au groupe" />
              <Button size="sm" variant="primary" disabled={!publishId || !publishTitle.trim()} onClick={() => run(() => backend.publishExample(publishId, publishTitle.trim()), 'Exemple publié.')}>Publier</Button>
            </div>
          )}
          {data.sharedExamples.length > 0 && (
            <ul className="mt-2 text-sm space-y-1">
              {data.sharedExamples.map((x) => <li key={x.id} className="flex justify-between gap-2"><span>{x.title}</span><button className="underline text-muted" onClick={() => run(() => backend.deleteSharedExample(x.id))}>retirer</button></li>)}
            </ul>
          )}
        </div>
      </div>
      <Modal open={pollOpen} onClose={() => setPollOpen(false)} title="Lancer une question au groupe">
        <div className="space-y-3">
          <Field label="Type">{(id) => <Select id={id} value={kind} onChange={(e) => setKind(e.target.value as typeof kind)}><option value="debrief">Question de débrief (réponse libre)</option><option value="poll">Sondage court (choix)</option><option value="quiz">Question de contrôle (quiz préchargé)</option></Select>}</Field>
          {kind === 'quiz' ? (
            <Field label="Question" hint="La bonne réponse et l’explication ne sont visibles des participants qu’après clôture.">{(id) => <Select id={id} value={quizId} onChange={(e) => setQuizId(e.target.value)}><option value="">— choisir —</option>{quiz.data?.map((q) => <option key={q.id} value={q.id}>{q.position}. {q.question}</option>)}</Select>}</Field>
          ) : (
            <>
              <Field label="Question">{(id) => <Textarea id={id} value={question} onChange={(e) => setQuestion(e.target.value)} className="min-h-[3rem]" />}</Field>
              {kind === 'poll' && <Field label="Options (une par ligne)">{(id) => <Textarea id={id} value={options} onChange={(e) => setOptions(e.target.value)} />}</Field>}
            </>
          )}
          <Button variant="primary" onClick={createPoll}>Lancer</Button>
        </div>
      </Modal>
    </Card>
  );
}

function PollResults({ poll, answers, profileName }: { poll: SessionData['polls'][number]; answers: SessionData['pollAnswers']; profileName: (id: string | null | undefined) => string }) {
  const { backend } = useAuth();
  const key = useAsync(() => backend.getPollKey(poll.id), [backend, poll.id, poll.status]);
  if (poll.options.length) {
    return (
      <ul className="mt-1 text-xs">
        {poll.options.map((o, i) => <li key={i} className={cx(key.data?.correct_index === i && 'font-semibold text-green-800')}>{o} : {answers.filter((a) => a.answer_index === i).length}{key.data?.correct_index === i ? ' ✓' : ''}</li>)}
        {key.data?.explanation && <li className="text-muted mt-1">{key.data.explanation}</li>}
      </ul>
    );
  }
  return <ul className="mt-1 text-xs space-y-0.5">{answers.map((a) => <li key={a.id}><span className="text-muted">{profileName(a.user_id)} :</span> {a.answer_text}</li>)}{answers.length === 0 && <li className="text-muted">Aucune réponse.</li>}</ul>;
}

function IdeasWall({ data, profileName }: { data: SessionData; profileName: (id: string | null | undefined) => string }) {
  const { backend } = useAuth();
  const [text, setText] = useState('');
  return (
    <Card title={`Mur d’idées (${data.ideas.length})`}>
      <ul className="text-sm space-y-1 max-h-64 overflow-y-auto">{data.ideas.map((i) => <li key={i.id} className="rounded bg-surface px-2 py-1 flex justify-between gap-2"><span>{i.text} <span className="text-muted">— {profileName(i.author_id)}</span></span><button className="text-muted underline text-xs" onClick={() => backend.deleteIdea(i.id)}>retirer</button></li>)}</ul>
      <div className="flex gap-1 mt-2"><Input aria-label="Idée" value={text} onChange={(e) => setText(e.target.value)} /><Button size="sm" onClick={async () => { if (text.trim()) { await backend.addIdea(data.session.id, text.trim()); setText(''); } }}>Ajouter</Button></div>
    </Card>
  );
}

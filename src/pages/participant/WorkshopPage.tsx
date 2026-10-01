import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink, LifeBuoy } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { TimerDisplay } from '../../components/TimerDisplay';
import { FileDrop, FileList } from '../../components/production/FileDrop';
import { PromptBuilder, CopyButton } from '../../components/production/PromptBuilder';
import { ProductionForm, ProductionReadOnly, wordCount } from '../../components/production/ProductionForms';
import { TimeMeasureForm } from '../../components/production/TimeMeasure';
import { Badge, Button, Card, Checkbox, Field, Input, Loading, Markdown, Modal, Notice, SaveIndicator, Textarea, formatDate, formatTime, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData } from '../../hooks/useSessionData';
import { deriveStatus, openHelpFor, statusTone, submissionFor } from '../../lib/status';
import { normalizeExternalUrl, hostOf } from '../../lib/safeLink';
import { emptySubmissionContent, PARTICIPANT_STATUS_LABELS, type Hint, type Submission, type SubmissionContent, type WorkshopPrivateContent } from '../../lib/types';
import { ResourceCard } from '../shared/ResourcesPage';
import { ToolCardView } from '../shared/ToolsPage';

type SaveState = 'idle' | 'pending' | 'saved' | 'error' | 'offline';

export function WorkshopPage() {
  const { sessionId, workshopId } = useParams();
  const { backend, user, online } = useAuth();
  const toast = useToast();
  const { data, error, teamOf, profileName } = useSessionData(sessionId);

  const workshop = data?.workshops.find((w) => w.id === workshopId) ?? null;
  const team = user ? teamOf(user.id) : null;
  const pairMode = workshop?.content.work_mode === 'pair' && !!team;
  const teamId = pairMode ? team!.id : null;
  const remote = data && workshop && user ? submissionFor(data.submissions, workshop.id, user.id, teamId) : undefined;
  const canWork = !!data && data.session.status === 'open' && workshop?.status !== 'locked';

  // --- État local du brouillon, autosauvegarde -----------------------------
  const [sub, setSub] = useState<Submission | null>(null);
  const [draft, setDraft] = useState<SubmissionContent | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [conflict, setConflict] = useState<Submission | null>(null);
  const dirty = useRef(false);
  const lastSaved = useRef<string | null>(null);
  const timer = useRef<number | null>(null);

  // Charger ou créer la production à l'ouverture de l'atelier.
  useEffect(() => {
    if (!data || !workshop || !user || sub) return;
    if (remote) {
      setSub(remote);
      setDraft({ ...emptySubmissionContent(workshop.content.steps.length, workshop.content.success_criteria.length), ...remote.draft });
      lastSaved.current = remote.updated_at;
      return;
    }
    if (!canWork) return;
    (async () => {
      try {
        const initial = emptySubmissionContent(workshop.content.steps.length, workshop.content.success_criteria.length);
        initial.prompt_parts = { ...workshop.content.prompt_defaults };
        initial.prompt = workshop.content.prompt_starter;
        const created = await backend.getOrCreateSubmission(data.session.id, workshop.id, teamId, initial);
        setSub(created);
        setDraft({ ...initial, ...created.draft });
        lastSaved.current = created.updated_at;
      } catch (e) {
        toast(e instanceof Error ? e.message : String(e), 'error');
      }
    })();
  }, [data, workshop, user, remote, sub, canWork, backend, teamId, toast]);

  // Détection de conflit : une autre personne a enregistré depuis notre dernier enregistrement.
  useEffect(() => {
    if (!remote || !sub || !user) return;
    if (remote.updated_at !== lastSaved.current && remote.updated_by && remote.updated_by !== user.id && remote.updated_at > (lastSaved.current ?? '')) {
      setConflict(remote);
    }
    // Mises à jour de statut (validation, demande de correction) : refléter sans écraser le brouillon.
    if (remote.status !== sub.status || remote.current_version !== sub.current_version || remote.share_consent !== sub.share_consent) {
      setSub((s) => (s ? { ...s, status: remote.status, current_version: remote.current_version, share_consent: remote.share_consent, submitted_at: remote.submitted_at } : s));
    }
  }, [remote, sub, user]);

  const flush = useCallback(async () => {
    if (!sub || !draft || !dirty.current) return;
    if (!online) {
      setSaveState('offline');
      return;
    }
    try {
      const saved = await backend.saveDraft(sub.id, draft, sub.draft_files);
      lastSaved.current = saved.updated_at;
      dirty.current = false;
      setSaveState('saved');
    } catch (e) {
      setSaveState('error');
      toast(`Enregistrement impossible : ${e instanceof Error ? e.message : String(e)}`, 'error');
    }
  }, [sub, draft, backend, online, toast]);

  const update = (patch: Partial<SubmissionContent>) => {
    setDraft((d) => (d ? { ...d, ...patch } : d));
    dirty.current = true;
    setSaveState(online ? 'pending' : 'offline');
  };

  useEffect(() => {
    if (!dirty.current) return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void flush(), 1200);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [draft, flush]);

  useEffect(() => {
    if (online && saveState === 'offline' && dirty.current) void flush();
  }, [online, saveState, flush]);

  // --- Aides révélées, corrigé, versions -----------------------------------
  const hints = useAsync<Hint[]>(() => (workshop ? backend.getRevealedHints(workshop.id) : Promise.resolve([])), [backend, workshop?.id, workshop?.hints_revealed]);
  const answerKey = useAsync<WorkshopPrivateContent | null>(() => (workshop?.answer_key_revealed ? backend.getWorkshopPrivate(workshop.id) : Promise.resolve(null)), [backend, workshop?.id, workshop?.answer_key_revealed]);
  const versions = useAsync(() => (sub ? backend.listVersions(sub.id) : Promise.resolve([])), [backend, sub?.id, sub?.current_version]);
  const [showTrame, setShowTrame] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpReason, setHelpReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [ideaText, setIdeaText] = useState('');

  const myEvaluations = useMemo(() => (data && sub ? data.evaluations.filter((e) => e.submission_id === sub.id).sort((a, b) => b.created_at.localeCompare(a.created_at)) : []), [data, sub]);
  const resources = useAsync(() => backend.listResources(), [backend]);
  const tools = useAsync(() => backend.listToolCards(), [backend]);

  if (error) return <AppShell><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data || !user) return <AppShell><Loading /></AppShell>;
  if (!workshop) return <AppShell><Notice tone="danger">Atelier introuvable.</Notice></AppShell>;
  const { session } = data;
  const c = workshop.content;
  const status = deriveStatus(remote, openHelpFor(data.helpRequests, workshop.id, user.id, teamId));
  const editable = canWork && !!sub && sub.status !== 'validated';
  const myHelp = data.helpRequests.filter((h) => h.session_workshop_id === workshop.id && (h.requester_id === user.id || (teamId && h.team_id === teamId)) && h.status !== 'resolved');
  const workshopResources = (resources.data ?? []).filter((r) => c.resource_codes.includes(r.code) && !r.trainer_only);
  const sessionTools = (tools.data ?? []).filter((t) => session.allowed_tool_ids.includes(t.id) && c.families.includes(t.family));
  const openPolls = data.polls.filter((p) => p.status === 'open');
  const link = draft ? normalizeExternalUrl(draft.link) : null;

  if (workshop.status === 'locked') {
    return (
      <AppShell>
        <Link to={`/p/sessions/${session.id}`} className="underline text-brand-700">← Retour à la session</Link>
        <h1 className="text-2xl font-semibold mt-2">{workshop.title}</h1>
        <Notice tone="info">Cet atelier n’est pas encore ouvert par le formateur. La consigne apparaîtra automatiquement à l’ouverture.</Notice>
      </AppShell>
    );
  }

  const submitNow = async () => {
    if (!sub || !draft) return;
    if (!draft.acknowledged_fictional_only) return toast('Cochez d’abord la confirmation « aucune donnée réelle ».', 'error');
    setBusy(true);
    try {
      await flush();
      const v = await backend.submit(sub.id);
      toast(`Version ${v} remise au formateur.`, 'success');
      setSub((s) => (s ? { ...s, status: 'submitted', current_version: v } : s));
      await versions.reload();
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };

  const askHelp = async () => {
    setBusy(true);
    try {
      await backend.createHelpRequest(session.id, workshop.id, teamId, helpReason.trim() || 'Besoin d’aide');
      toast('Demande envoyée au formateur.', 'success');
      setHelpOpen(false);
      setHelpReason('');
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell wide>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <Link to={`/p/sessions/${session.id}`} className="underline text-brand-700 text-sm">← {session.title}</Link>
          <h1 className="text-2xl font-semibold">{workshop.title}</h1>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge tone={workshop.status === 'open' ? 'success' : 'neutral'}>{workshop.status === 'open' ? 'Atelier ouvert' : 'Atelier terminé'}</Badge>
            <Badge tone={statusTone(status)}>{PARTICIPANT_STATUS_LABELS[status]}</Badge>
            {pairMode && <Badge tone="info">{team!.name} · production commune</Badge>}
            <Badge tone="neutral">{workshop.duration_min} min</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SaveIndicator state={saveState} detail={lastSaved.current ? `dernier enregistrement ${formatTime(lastSaved.current)}` : undefined} />
          <TimerDisplay timer={session.timer} />
        </div>
      </div>

      {workshop.content_updated_at && workshop.update_note && (
        <Notice tone="warning" title={`Consigne mise à jour le ${formatDate(workshop.content_updated_at, true)}`}>
          {workshop.update_note}
        </Notice>
      )}
      {conflict && (
        <Notice tone="warning" title="Une autre personne de votre binôme a enregistré une modification">
          {profileName(conflict.updated_by)} a enregistré à {formatTime(conflict.updated_at)}. Vous pouvez charger sa version (vos modifications locales non enregistrées seraient perdues) ou continuer avec la vôtre, qui écrasera la sienne au prochain enregistrement.
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="primary" onClick={() => { setDraft({ ...emptySubmissionContent(c.steps.length, c.success_criteria.length), ...conflict.draft }); setSub((s) => (s ? { ...s, draft_files: conflict.draft_files } : s)); lastSaved.current = conflict.updated_at; dirty.current = false; setSaveState('saved'); setConflict(null); }}>Charger sa version</Button>
            <Button size="sm" onClick={() => { lastSaved.current = conflict.updated_at; setConflict(null); }}>Garder la mienne</Button>
          </div>
        </Notice>
      )}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] mt-3">
        <div className="space-y-5 min-w-0">
          {/* Consigne */}
          <Card title="Objectif et consigne">
            <p className="font-medium text-brand-700">{c.objective}</p>
            {c.job_context && (
              <div className="mt-3 rounded-md border border-brand-100 bg-brand-50/60 p-3 text-sm grid gap-2 md:grid-cols-2">
                <div className="md:col-span-2"><strong>Tâche du quotidien visée :</strong> {c.job_context.task}</div>
                <div><strong>Où part le temps aujourd’hui :</strong> {c.job_context.time_sinks}</div>
                <div><strong>Pourquoi ça compte en ETTI :</strong> {c.job_context.why_etti}</div>
                <div><strong>Délégable à l’assistant :</strong> {c.job_context.delegable}</div>
                <div><strong>À vérifier ou décider soi-même :</strong> {c.job_context.must_verify}</div>
              </div>
            )}
            <Markdown text={c.brief} className="mt-2" />
            {draft && (
              <div className="mt-3 flex flex-wrap gap-2 items-center">
                <span className="font-medium">Mon niveau :</span>
                <Button size="sm" variant={draft.level === 'guided' ? 'primary' : 'secondary'} onClick={() => update({ level: 'guided' })} disabled={!editable} aria-pressed={draft.level === 'guided'}>Guidé</Button>
                <Button size="sm" variant={draft.level === 'autonomous' ? 'primary' : 'secondary'} onClick={() => update({ level: 'autonomous' })} disabled={!editable} aria-pressed={draft.level === 'autonomous'}>Autonome</Button>
              </div>
            )}
            <div className="mt-2 rounded-md bg-surface p-3 text-sm">
              <strong>{draft?.level === 'autonomous' ? 'Niveau autonome' : 'Niveau guidé'} :</strong> {draft?.level === 'autonomous' ? c.levels.autonomous : c.levels.guided}
              <details className="mt-2">
                <summary className="cursor-pointer font-medium">Bonus pour les personnes rapides (facultatif, ne conditionne pas la validation)</summary>
                <p className="mt-1">{c.levels.bonus}</p>
              </details>
            </div>
            {c.deposit_notice && <Notice tone="warning">{c.deposit_notice}</Notice>}
          </Card>

          {/* Étapes */}
          <Card title="Étapes">
            <ol className="space-y-2">
              {c.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <input type="checkbox" id={`step-${i}`} className="mt-1 h-5 w-5 accent-brand-600" checked={!!draft?.checklist[i]} disabled={!editable} onChange={(e) => update({ checklist: c.steps.map((_, j) => (j === i ? e.target.checked : !!draft?.checklist[j])) })} />
                  <label htmlFor={`step-${i}`}><span className="text-muted mr-1">{i + 1}.</span>{s}</label>
                </li>
              ))}
            </ol>
          </Card>

          {/* Ressources */}
          {workshopResources.length > 0 && (
            <Card title="Ressources de l’atelier">
              <div className="space-y-3">{workshopResources.map((r) => <ResourceCard key={r.id} r={r} />)}</div>
            </Card>
          )}

          {/* Prompt et outils */}
          <Card title="Mon prompt et l’outil externe">
            {draft && <PromptBuilder parts={draft.prompt_parts} prompt={draft.prompt} onParts={(p) => update({ prompt_parts: p })} onPrompt={(s) => update({ prompt: s })} disabled={!editable} />}
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Outils possibles pour cet atelier</h3>
              <p className="text-sm text-muted mb-2">Ouvrez l’outil dans un nouvel onglet, collez votre prompt et les ressources fictives, puis revenez déposer le résultat ici. Aucune donnée n’est envoyée automatiquement.</p>
              {sessionTools.length === 0 ? <p className="text-sm text-muted">Aucun outil retenu pour cette famille : utilisez la solution de secours décrite plus bas.</p> : (
                <div className="grid gap-3 md:grid-cols-2">{sessionTools.map((t) => <ToolCardView key={t.id} t={t} />)}</div>
              )}
              {draft && (
                <Field label="Outil réellement utilisé (nom, et modèle si visible)">{(id) => <Input id={id} value={draft.tool_used} disabled={!editable} onChange={(e) => update({ tool_used: e.target.value })} />}</Field>
              )}
            </div>
            <details className="mt-3 rounded-md border border-line p-3">
              <summary className="cursor-pointer font-medium">Solution de secours (sans API ni génération)</summary>
              <Markdown text={c.fallback} className="mt-1 text-sm" />
            </details>
          </Card>

          {/* Production */}
          <Card title="Ma production">
            {!sub || !draft ? (
              canWork ? <Loading label="Préparation de votre espace de travail…" /> : <Notice tone="info">La session n’est pas ouverte : consultation seulement.</Notice>
            ) : (
              <div className="space-y-4">
                {sub.status === 'validated' && <Notice tone="success">Production validée par le formateur. Elle n’est plus modifiable.</Notice>}
                {sub.status === 'needs_revision' && <Notice tone="warning">Le formateur demande une correction : modifiez votre production puis remettez une nouvelle version. La version précédente est conservée.</Notice>}
                <ProductionForm content={c} extra={draft.extra} onExtra={(extra) => update({ extra })} disabled={!editable} />
                <Field label={c.production_kind === 'report_actions' ? 'Compte rendu (200 à 300 mots maximum)' : 'Texte de ma production'} hint={c.deliverable}>
                  {(id) => <Textarea id={id} value={draft.text} disabled={!editable} onChange={(e) => update({ text: e.target.value })} className="min-h-[12rem]" />}
                </Field>
                <p className="text-xs text-muted">{wordCount(draft.text)} mots.</p>
                <Field label="Lien vers un résultat externe (facultatif)" hint="Le lien est enregistré tel quel, sans récupération de son contenu.">
                  {(id) => <Input id={id} type="url" value={draft.link} disabled={!editable} onChange={(e) => update({ link: e.target.value })} />}
                </Field>
                {draft.link && (link ? <p className="text-sm">Lien enregistré : <a href={link} target="_blank" rel="noopener noreferrer nofollow" className="underline text-brand-700 inline-flex items-center gap-1">{hostOf(link)} <ExternalLink size={12} aria-hidden /></a></p> : <p className="text-sm text-red-700">Lien non reconnu (http ou https attendu).</p>)}
                {c.time_tracking && <TimeMeasureForm extra={draft.extra} onExtra={(extra) => update({ extra })} disabled={!editable} />}
                <div>
                  <h3 className="font-semibold mb-1">Fichiers (schéma, affiche, capture…)</h3>
                  <FileDrop sessionId={session.id} submissionId={sub.id} files={sub.draft_files} disabled={!editable} onChange={async (files) => { setSub((s) => (s ? { ...s, draft_files: files } : s)); try { const saved = await backend.saveDraft(sub.id, draft, files); lastSaved.current = saved.updated_at; setSaveState('saved'); } catch (e) { setSaveState('error'); toast(e instanceof Error ? e.message : String(e), 'error'); } }} />
                </div>
              </div>
            )}
          </Card>

          {/* Auto-vérification */}
          {draft && (
            <Card title="Auto-vérification avant remise">
              <p className="text-sm text-muted mb-2">Ces critères sont ceux de la grille de réussite. Les cocher ne valide rien automatiquement : le formateur évalue.</p>
              <ul className="space-y-2">
                {c.success_criteria.map((s, i) => (
                  <li key={i}><Checkbox label={s} checked={!!draft.self_check[i]} disabled={!editable} onChange={(v) => update({ self_check: c.success_criteria.map((_, j) => (j === i ? v : !!draft.self_check[j])) })} /></li>
                ))}
              </ul>
            </Card>
          )}

          {/* Aides */}
          <Card title="Aides progressives">
            {hints.loading ? <Loading /> : !hints.data?.length ? <p className="text-muted text-sm">Aucune aide révélée pour l’instant. Demandez de l’aide au formateur si vous êtes bloqué·e.</p> : (
              <div className="space-y-3">
                {hints.data.map((h) => {
                  const hidden = h.level === 'trame' && draft?.level === 'autonomous' && !showTrame;
                  return (
                    <div key={h.level} className="rounded-md border border-line p-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold">{h.level === 'indice' ? 'Indice' : h.level === 'trame' ? 'Trame' : 'Exemple'} — {h.title}</h3>
                        {h.level === 'trame' && draft?.level === 'autonomous' && <Button size="sm" onClick={() => setShowTrame((s) => !s)}>{showTrame ? 'Masquer la trame' : 'Afficher la trame'}</Button>}
                      </div>
                      {hidden ? <p className="text-sm text-muted">Masquée en niveau autonome pour éviter la simple copie.</p> : <Markdown text={h.text} className="mt-1 text-sm" />}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {answerKey.data && (
            <Card title="Corrigé révélé par le formateur">
              <Markdown text={answerKey.data.answer_key} className="text-sm" />
            </Card>
          )}

          {/* Remise */}
          {sub && draft && (
            <Card title="Remise au formateur">
              <div className="space-y-3">
                <Checkbox label="Je confirme que cette production ne contient aucune donnée réelle (dossier de candidat, numéro administratif, coordonnées, santé) : uniquement le cas fictif." checked={draft.acknowledged_fictional_only} disabled={!editable} onChange={(v) => update({ acknowledged_fictional_only: v })} />
                <Checkbox label="J’autorise le formateur à partager cette production au groupe comme exemple (copie, sans mes notes)." checked={sub.share_consent} disabled={!canWork} onChange={async (v) => { try { await backend.setShareConsent(sub.id, v); setSub((s) => (s ? { ...s, share_consent: v } : s)); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }} />
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="accent" size="lg" onClick={submitNow} disabled={!editable} busy={busy}>
                    {sub.current_version === 0 ? 'Remettre ma production (V1)' : `Remettre une nouvelle version (V${sub.current_version + 1})`}
                  </Button>
                  {sub.submitted_at && <span className="text-sm text-muted">Dernière remise : V{sub.current_version} le {formatDate(sub.submitted_at, true)}</span>}
                </div>
                {versions.data && versions.data.length > 0 && (
                  <details>
                    <summary className="cursor-pointer font-medium">Versions remises ({versions.data.length})</summary>
                    <ul className="mt-2 space-y-2 text-sm">
                      {versions.data.map((v) => (
                        <li key={v.id} className="rounded-md border border-line p-2">
                          <div className="font-medium">Version {v.version_number} — {formatDate(v.created_at, true)} · contributeurs : {v.contributors.map((id) => profileName(id)).join(', ')}</div>
                          <p className="whitespace-pre-wrap mt-1 line-clamp-6">{v.content.text || '(texte vide)'}</p>
                          <FileList files={v.files} />
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </Card>
          )}

          {/* Retours */}
          <Card title="Retours du formateur">
            {myEvaluations.length === 0 ? <p className="text-muted text-sm">Aucun retour pour le moment.</p> : (
              <ul className="space-y-3">
                {myEvaluations.map((e) => (
                  <li key={e.id} className="rounded-md border border-line p-3">
                    <div className="flex flex-wrap gap-2 items-center">
                      <Badge tone={e.decision === 'validated' ? 'success' : e.decision === 'needs_revision' ? 'warning' : 'info'}>{e.decision === 'validated' ? 'Validé' : e.decision === 'needs_revision' ? 'À améliorer' : 'Commentaire'}</Badge>
                      <span className="text-sm text-muted">Version {e.version_number} · {formatDate(e.created_at, true)} · {e.total} / {e.rubric.criteria.reduce((s, x) => s + x.max, 0)}</span>
                      {e.critical_error && <Badge tone="danger">Erreur critique à corriger</Badge>}
                    </div>
                    <ul className="mt-2 text-sm grid sm:grid-cols-2 gap-x-4">
                      {e.rubric.criteria.map((cr) => <li key={cr.key}>{cr.label} : <strong>{e.scores[cr.key] ?? 0}</strong> / {cr.max}</li>)}
                    </ul>
                    {e.feedback_public && <p className="mt-2 whitespace-pre-wrap">{e.feedback_public}</p>}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Exemples partagés */}
          {data.sharedExamples.length > 0 && (
            <Card title="Exemples partagés au groupe">
              <div id="exemples" className="space-y-3">
                {data.sharedExamples.map((x) => <SharedExampleView key={x.id} example={x} data={data} userId={user.id} />)}
              </div>
            </Card>
          )}

          {/* Débrief */}
          <Card title="Débrief et mur d’idées">
            <h3 className="font-semibold">Questions de débrief</h3>
            <ul className="list-disc pl-5 text-sm">{c.debrief_questions.map((q, i) => <li key={i}>{q}</li>)}</ul>
            {openPolls.length > 0 && (
              <div className="mt-3 space-y-3">
                {openPolls.map((p) => <PollAnswerForm key={p.id} pollId={p.id} question={p.question} options={p.options} kind={p.kind} myAnswer={data.pollAnswers.find((a) => a.poll_id === p.id && a.user_id === user.id)} />)}
              </div>
            )}
            <div className="mt-3">
              <h3 className="font-semibold">Mur d’idées (interne au groupe)</h3>
              <ul className="text-sm space-y-1 mt-1">{data.ideas.map((i) => <li key={i.id} className="rounded bg-surface px-2 py-1">{i.text} <span className="text-muted">— {profileName(i.author_id)}</span></li>)}</ul>
              <div className="flex gap-2 mt-2">
                <Input aria-label="Nouvelle idée" value={ideaText} onChange={(e) => setIdeaText(e.target.value)} placeholder="Une astuce, un point de vigilance…" />
                <Button onClick={async () => { if (!ideaText.trim()) return; await backend.addIdea(session.id, ideaText.trim()); setIdeaText(''); }}>Publier</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Colonne latérale */}
        <aside className="space-y-4 lg:sticky lg:top-4 self-start">
          <Card>
            <Button variant="accent" className="w-full" size="lg" onClick={() => setHelpOpen(true)} disabled={!canWork}>
              <LifeBuoy size={18} aria-hidden /> Demander de l’aide
            </Button>
            {myHelp.length > 0 && (
              <ul className="mt-2 text-sm space-y-1">
                {myHelp.map((h) => (
                  <li key={h.id} className="flex items-start justify-between gap-2">
                    <span><Badge tone={h.status === 'in_progress' ? 'info' : 'danger'}>{h.status === 'in_progress' ? 'Prise en charge' : 'En attente'}</Badge> {h.reason}</span>
                    <button className="underline text-muted" onClick={() => backend.updateHelpRequest(h.id, 'resolved')}>Annuler</button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card title="Livrable attendu">
            <p className="text-sm">{c.deliverable}</p>
            <h3 className="font-semibold mt-3 text-sm">Grille de réussite</h3>
            <ul className="list-disc pl-5 text-sm">{c.success_criteria.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </Card>
          <Card title="Déroulé">
            <ul className="text-sm space-y-1">{workshop.breakdown.map((b, i) => <li key={i} className="flex justify-between"><span>{b.label}</span><span className="text-muted">{b.minutes} min</span></li>)}</ul>
          </Card>
          {draft && <CopyButton text={draft.prompt} label="Copier mon prompt" />}
        </aside>
      </div>

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Demander de l’aide au formateur">
        <Field label="Où êtes-vous bloqué·e ?" hint="Une phrase suffit. Le formateur voit l’heure et l’atelier.">
          {(id) => <Textarea id={id} value={helpReason} onChange={(e) => setHelpReason(e.target.value)} />}
        </Field>
        <div className="mt-3 flex gap-2">
          <Button variant="primary" onClick={askHelp} busy={busy}>Envoyer</Button>
          <Button onClick={() => setHelpOpen(false)}>Annuler</Button>
        </div>
      </Modal>
    </AppShell>
  );
}

function SharedExampleView({ example, data, userId }: { example: import('../../lib/types').SharedExample; data: import('../../hooks/useSessionData').SessionData; userId: string }) {
  const { backend } = useAuth();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [strengths, setStrengths] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [understood, setUnderstood] = useState<boolean | null>(null);
  const source = data.submissions.find((s) => s.id === example.source_submission_id);
  const workshop = data.workshops.find((w) => w.id === source?.session_workshop_id) ?? null;
  const peerEnabled = data.session.peer_review_enabled;
  const isMine = !!source && (source.owner_id === userId || data.members.some((m) => m.team_id === source.team_id && m.user_id === userId));
  return (
    <article className="rounded-md border border-line p-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{example.title}</h3>
        <Button size="sm" onClick={() => setOpen((o) => !o)}>{open ? 'Replier' : 'Lire'}</Button>
      </div>
      {open && (
        <div className="mt-2 space-y-2 text-sm">
          {example.content.prompt && <details><summary className="cursor-pointer">Prompt utilisé</summary><pre className="whitespace-pre-wrap font-mono text-xs bg-surface p-2 rounded">{example.content.prompt}</pre></details>}
          <p className="whitespace-pre-wrap">{example.content.text}</p>
          {workshop && <ProductionReadOnly content={workshop.content} extra={example.content.extra} />}
          {peerEnabled && !isMine && (
            <div className="rounded-md bg-surface p-3 space-y-2">
              <h4 className="font-semibold">Mon appréciation (facultative, visible de l’auteur et du formateur)</h4>
              <Field label="Points forts">{(id) => <Textarea id={id} className="min-h-[3rem]" value={strengths} onChange={(e) => setStrengths(e.target.value)} />}</Field>
              <Field label="Suggestions">{(id) => <Textarea id={id} className="min-h-[3rem]" value={suggestions} onChange={(e) => setSuggestions(e.target.value)} />}</Field>
              <div className="flex gap-2 items-center flex-wrap">
                <span>Ai-je compris la production sans explication ?</span>
                <Button size="sm" variant={understood === true ? 'primary' : 'secondary'} onClick={() => setUnderstood(true)}>Oui</Button>
                <Button size="sm" variant={understood === false ? 'primary' : 'secondary'} onClick={() => setUnderstood(false)}>Pas entièrement</Button>
              </div>
              <Button variant="primary" size="sm" onClick={async () => { try { await backend.createPeerReview(example.id, example.source_submission_id, strengths, suggestions, understood); toast('Appréciation envoyée.', 'success'); setStrengths(''); setSuggestions(''); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }}>Envoyer</Button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export function PollAnswerForm({ pollId, question, options, kind, myAnswer }: { pollId: string; question: string; options: string[]; kind: string; myAnswer?: import('../../lib/types').PollAnswer }) {
  const { backend } = useAuth();
  const toast = useToast();
  const [text, setText] = useState(myAnswer?.answer_text ?? '');
  const [idx, setIdx] = useState<number | null>(myAnswer?.answer_index ?? null);
  const send = async () => {
    try {
      await backend.answerPoll(pollId, idx, text);
      toast('Réponse enregistrée.', 'success');
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    }
  };
  return (
    <div className="rounded-md border border-brand-100 bg-brand-50/40 p-3">
      <div className="font-medium">{kind === 'quiz' ? 'Question de contrôle' : kind === 'debrief' ? 'Question de débrief' : 'Sondage'} : {question}</div>
      {options.length > 0 ? (
        <div className="mt-2 space-y-1">
          {options.map((o, i) => (
            <label key={i} className="flex items-center gap-2"><input type="radio" name={`poll-${pollId}`} className="accent-brand-600" checked={idx === i} onChange={() => setIdx(i)} /> {o}</label>
          ))}
        </div>
      ) : (
        <Textarea aria-label="Ma réponse" className="mt-2 min-h-[3rem]" value={text} onChange={(e) => setText(e.target.value)} />
      )}
      <Button size="sm" variant="primary" className="mt-2" onClick={send}>{myAnswer ? 'Modifier ma réponse' : 'Répondre'}</Button>
    </div>
  );
}

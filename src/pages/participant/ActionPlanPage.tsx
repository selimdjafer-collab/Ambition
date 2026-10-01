import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { Button, Card, Checkbox, Field, Input, Loading, Notice, Textarea, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData } from '../../hooks/useSessionData';
import type { ActionPlanFields } from '../../lib/types';

const EMPTY: ActionPlanFields = { task: '', frequency: '', tool: '', data: '', human_control: '', usual_time: '', observed_time: '', observed_time_tested: false, benefit: '', stop_condition: '' };

export function ActionPlanPage() {
  const { sessionId } = useParams();
  const { backend, user } = useAuth();
  const toast = useToast();
  const { data, error, teamOf } = useSessionData(sessionId);
  const existing = useAsync(() => (sessionId ? backend.getMyActionPlan(sessionId) : Promise.resolve(null)), [backend, sessionId]);
  const tools = useAsync(() => backend.listToolCards(), [backend]);
  const [plan, setPlan] = useState<ActionPlanFields>(EMPTY);
  const [selected, setSelected] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string[]>([]);
  const [selfAssessment, setSelfAssessment] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (existing.data) {
      setPlan({ ...EMPTY, ...existing.data.plan });
      setSelected(existing.data.selected_submission_ids);
      setChosen(existing.data.tools_chosen);
      setSelfAssessment(existing.data.self_assessment);
    }
  }, [existing.data]);
  const mine = useMemo(() => {
    if (!data || !user) return [];
    const team = teamOf(user.id);
    return data.submissions.filter((s) => s.current_version > 0 && (s.owner_id === user.id || (team && s.team_id === team.id)));
  }, [data, user, teamOf]);
  if (error) return <AppShell><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data || existing.loading) return <AppShell><Loading /></AppShell>;
  const set = (k: keyof ActionPlanFields, v: string | boolean) => setPlan((p) => ({ ...p, [k]: v }));
  const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const save = async () => {
    setBusy(true);
    try {
      await backend.saveActionPlan(data.session.id, { selected_submission_ids: selected, tools_chosen: chosen, plan, self_assessment: selfAssessment });
      toast('Plan d’application enregistré.', 'success');
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };
  const sessionTools = (tools.data ?? []).filter((t) => data.session.allowed_tool_ids.includes(t.id) && !t.is_fallback);
  return (
    <AppShell>
      <Link to={`/p/sessions/${data.session.id}`} className="underline text-brand-700 text-sm">← {data.session.title}</Link>
      <h1 className="text-2xl font-semibold">Bilan et plan d’application à J+7</h1>
      <p className="text-muted mb-4">Un usage à essayer la semaine suivante. Le bilan distingue les gains mesurés des gains estimés : aucune promesse de productivité n’est faite à votre place.</p>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="1. Mes productions sélectionnées pour le portfolio">
          {mine.length === 0 ? <p className="text-sm text-muted">Aucune production remise.</p> : mine.map((s) => {
            const w = data.workshops.find((x) => x.id === s.session_workshop_id);
            return <Checkbox key={s.id} label={w?.title ?? 'Atelier'} description={`Version ${s.current_version}`} checked={selected.includes(s.id)} onChange={() => setSelected((a) => toggle(a, s.id))} />;
          })}
        </Card>
        <Card title="2. Deux ou trois outils que je retiens">
          <div className="space-y-1">{sessionTools.map((t) => <Checkbox key={t.id} label={t.name} description={t.usage} checked={chosen.includes(t.name)} onChange={() => setChosen((a) => toggle(a, t.name))} />)}</div>
          {chosen.length > 3 && <Notice tone="warning">Deux ou trois outils suffisent pour commencer.</Notice>}
        </Card>
        <Card title="3. Mon plan pour la semaine suivante" className="lg:col-span-2">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Tâche" hint="Une tâche réelle de mon poste, sans données réelles tant que la configuration n’est pas validée par ma structure.">{(id) => <Input id={id} value={plan.task} onChange={(e) => set('task', e.target.value)} />}</Field>
            <Field label="Fréquence">{(id) => <Input id={id} value={plan.frequency} onChange={(e) => set('frequency', e.target.value)} />}</Field>
            <Field label="Outil autorisé">{(id) => <Input id={id} value={plan.tool} onChange={(e) => set('tool', e.target.value)} />}</Field>
            <Field label="Données utilisables">{(id) => <Input id={id} value={plan.data} onChange={(e) => set('data', e.target.value)} />}</Field>
            <Field label="Contrôle humain prévu">{(id) => <Textarea id={id} className="min-h-[3rem]" value={plan.human_control} onChange={(e) => set('human_control', e.target.value)} />}</Field>
            <Field label="Bénéfice attendu">{(id) => <Textarea id={id} className="min-h-[3rem]" value={plan.benefit} onChange={(e) => set('benefit', e.target.value)} />}</Field>
            <Field label="Temps habituel estimé">{(id) => <Input id={id} value={plan.usual_time} onChange={(e) => set('usual_time', e.target.value)} placeholder="ex. 30 min" />}</Field>
            <div>
              <Field label="Temps observé (préparation + vérification + corrections)">{(id) => <Input id={id} value={plan.observed_time} onChange={(e) => set('observed_time', e.target.value)} placeholder="laisser vide si non testé" />}</Field>
              <div className="mt-1"><Checkbox label="Ce temps a été réellement mesuré (sinon il reste une estimation)" checked={plan.observed_time_tested} onChange={(v) => set('observed_time_tested', v)} /></div>
            </div>
            <div className="md:col-span-2"><Field label="Condition d’arrêt" hint="Dans quel cas j’arrête d’utiliser l’outil pour cette tâche.">{(id) => <Input id={id} value={plan.stop_condition} onChange={(e) => set('stop_condition', e.target.value)} />}</Field></div>
            <div className="md:col-span-2"><Field label="Auto-évaluation (ce que je sais faire, ce que je dois encore vérifier)">{(id) => <Textarea id={id} value={selfAssessment} onChange={(e) => setSelfAssessment(e.target.value)} />}</Field></div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="primary" onClick={save} busy={busy}>Enregistrer mon plan</Button>
            <Link to={`/p/sessions/${data.session.id}/portfolio`} className="inline-flex items-center underline text-brand-700">Voir mon portfolio</Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

import type { BreakdownItem, Family, Hint, JobContext, PublishedWorkshopContent, WorkMode, WorkshopContent } from '../lib/types';
import { FAMILIES } from '../lib/types';
import { Button, Checkbox, Field, Input, Select, Textarea } from './ui';

const lines = (arr: string[]) => arr.join('\n');
const unlines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean);

export function BreakdownEditor({ value, onChange, durationMin, onDuration }: { value: BreakdownItem[]; onChange: (v: BreakdownItem[]) => void; durationMin: number; onDuration: (n: number) => void }) {
  const sum = value.reduce((s, b) => s + b.minutes, 0);
  return (
    <fieldset className="rounded-md border border-line p-3">
      <legend className="font-medium px-1">Durée et répartition</legend>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor="duration-min">Durée totale (min)</label>
        <Input id="duration-min" type="number" min={1} value={durationMin} onChange={(e) => onDuration(Number(e.target.value))} className="w-24" />
        <span className={sum === durationMin ? 'text-green-800 text-sm' : 'text-red-700 text-sm'}>Répartition : {sum} min {sum === durationMin ? '✓' : `(écart ${sum - durationMin})`}</span>
      </div>
      {value.map((b, i) => (
        <div key={i} className="flex gap-2 items-center mb-1">
          <Input aria-label={`Phase ${i + 1}`} value={b.label} onChange={(e) => onChange(value.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
          <Input aria-label={`Minutes phase ${i + 1}`} type="number" min={1} value={b.minutes} onChange={(e) => onChange(value.map((x, j) => (j === i ? { ...x, minutes: Number(e.target.value) } : x)))} className="w-24" />
          <Button size="sm" variant="ghost" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Supprimer la phase">×</Button>
        </div>
      ))}
      <Button size="sm" onClick={() => onChange([...value, { label: '', minutes: 5 }])}>Ajouter une phase</Button>
    </fieldset>
  );
}

export function WorkshopContentForm<T extends PublishedWorkshopContent | WorkshopContent>({ value, onChange, withHints }: { value: T; onChange: (v: T) => void; withHints?: boolean }) {
  const set = <K extends keyof T>(k: K, v: T[K]) => onChange({ ...value, [k]: v });
  const hints = withHints ? ((value as WorkshopContent).hints ?? []) : [];
  const setHint = (i: number, patch: Partial<Hint>) => onChange({ ...value, hints: hints.map((h, j) => (j === i ? { ...h, ...patch } : h)) } as T);
  const pd = value.prompt_defaults;
  const jc: JobContext = value.job_context ?? { task: '', time_sinks: '', delegable: '', must_verify: '', why_etti: '' };
  const setJc = (k: keyof JobContext, v: string) => set('job_context', { ...jc, [k]: v } as T['job_context']);
  return (
    <div className="space-y-3">
      <fieldset className="rounded-md border border-line p-3">
        <legend className="font-medium px-1">Ancrage métier ETTI et temps</legend>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="md:col-span-2"><Field label="Tâche du quotidien visée">{(id) => <Textarea id={id} className="min-h-[3rem]" value={jc.task} onChange={(e) => setJc('task', e.target.value)} />}</Field></div>
          <Field label="Où part le temps aujourd’hui">{(id) => <Textarea id={id} className="min-h-[3rem]" value={jc.time_sinks} onChange={(e) => setJc('time_sinks', e.target.value)} />}</Field>
          <Field label="Pourquoi ça compte en ETTI">{(id) => <Textarea id={id} className="min-h-[3rem]" value={jc.why_etti} onChange={(e) => setJc('why_etti', e.target.value)} />}</Field>
          <Field label="Délégable à l’assistant">{(id) => <Textarea id={id} className="min-h-[3rem]" value={jc.delegable} onChange={(e) => setJc('delegable', e.target.value)} />}</Field>
          <Field label="À vérifier ou décider soi-même">{(id) => <Textarea id={id} className="min-h-[3rem]" value={jc.must_verify} onChange={(e) => setJc('must_verify', e.target.value)} />}</Field>
        </div>
        <div className="mt-2"><Checkbox label="Proposer la mesure du temps habituel / observé dans la production" checked={!!value.time_tracking} onChange={(v) => set('time_tracking', v as T['time_tracking'])} /></div>
      </fieldset>
      <Field label="Objectif observable">{(id) => <Textarea id={id} className="min-h-[3rem]" value={value.objective} onChange={(e) => set('objective', e.target.value as T['objective'])} />}</Field>
      <Field label="Brief / consigne (markdown simple)">{(id) => <Textarea id={id} className="min-h-[10rem]" value={value.brief} onChange={(e) => set('brief', e.target.value as T['brief'])} />}</Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Étapes (une par ligne)">{(id) => <Textarea id={id} className="min-h-[8rem]" value={lines(value.steps)} onChange={(e) => set('steps', unlines(e.target.value) as T['steps'])} />}</Field>
        <Field label="Grille de réussite (un critère par ligne)">{(id) => <Textarea id={id} className="min-h-[8rem]" value={lines(value.success_criteria)} onChange={(e) => set('success_criteria', unlines(e.target.value) as T['success_criteria'])} />}</Field>
        <Field label="Livrable">{(id) => <Textarea id={id} value={value.deliverable} onChange={(e) => set('deliverable', e.target.value as T['deliverable'])} />}</Field>
        <Field label="Questions de débrief (une par ligne)">{(id) => <Textarea id={id} value={lines(value.debrief_questions)} onChange={(e) => set('debrief_questions', unlines(e.target.value) as T['debrief_questions'])} />}</Field>
        <Field label="Solution de secours (sans API)">{(id) => <Textarea id={id} value={value.fallback} onChange={(e) => set('fallback', e.target.value as T['fallback'])} />}</Field>
        <Field label="Prompt de départ">{(id) => <Textarea id={id} value={value.prompt_starter} onChange={(e) => set('prompt_starter', e.target.value as T['prompt_starter'])} />}</Field>
        <Field label="Niveau guidé">{(id) => <Textarea id={id} value={value.levels.guided} onChange={(e) => set('levels', { ...value.levels, guided: e.target.value } as T['levels'])} />}</Field>
        <Field label="Niveau autonome">{(id) => <Textarea id={id} value={value.levels.autonomous} onChange={(e) => set('levels', { ...value.levels, autonomous: e.target.value } as T['levels'])} />}</Field>
        <Field label="Bonus (dans le temps prévu, ne conditionne pas la validation)">{(id) => <Textarea id={id} value={value.levels.bonus} onChange={(e) => set('levels', { ...value.levels, bonus: e.target.value } as T['levels'])} />}</Field>
        <Field label="Consigne affichée avant tout dépôt">{(id) => <Textarea id={id} value={value.deposit_notice ?? ''} onChange={(e) => set('deposit_notice', e.target.value as T['deposit_notice'])} />}</Field>
        <Field label="Mode de travail">{(id) => <Select id={id} value={value.work_mode} onChange={(e) => set('work_mode', e.target.value as WorkMode as T['work_mode'])}><option value="individual">Individuel</option><option value="pair">Binôme</option><option value="group">Groupe</option></Select>}</Field>
        <Field label="Ressources (codes séparés par des virgules)">{(id) => <Input id={id} value={value.resource_codes.join(', ')} onChange={(e) => set('resource_codes', e.target.value.split(',').map((x) => x.trim().toUpperCase()).filter(Boolean) as T['resource_codes'])} />}</Field>
      </div>
      <fieldset className="rounded-md border border-line p-3">
        <legend className="font-medium px-1">Familles d’usage concernées (filtre les outils proposés)</legend>
        <div className="grid sm:grid-cols-3 gap-1">
          {FAMILIES.map((f) => <Checkbox key={f.key} label={f.label} checked={value.families.includes(f.key)} onChange={(v) => set('families', (v ? [...value.families, f.key] : value.families.filter((x) => x !== f.key)) as Family[] as T['families'])} />)}
        </div>
      </fieldset>
      <fieldset className="rounded-md border border-line p-3">
        <legend className="font-medium px-1">Constructeur de prompt : valeurs préremplies</legend>
        <div className="grid gap-2 md:grid-cols-2">
          {(['context', 'task', 'data', 'constraints', 'format', 'controls'] as const).map((k) => (
            <Field key={k} label={{ context: 'Contexte', task: 'Tâche', data: 'Données autorisées', constraints: 'Contraintes', format: 'Format attendu', controls: 'Contrôles' }[k]}>{(id) => <Textarea id={id} className="min-h-[3rem]" value={pd[k]} onChange={(e) => set('prompt_defaults', { ...pd, [k]: e.target.value } as T['prompt_defaults'])} />}</Field>
          ))}
        </div>
      </fieldset>
      {withHints && (
        <fieldset className="rounded-md border border-line p-3">
          <legend className="font-medium px-1">Aides progressives (indice, trame, exemple)</legend>
          {hints.map((h, i) => (
            <div key={h.level} className="mb-3">
              <Field label={`${h.level === 'indice' ? 'Indice' : h.level === 'trame' ? 'Trame' : 'Exemple'} — titre`}>{(id) => <Input id={id} value={h.title} onChange={(e) => setHint(i, { title: e.target.value })} />}</Field>
              <Field label="Texte">{(id) => <Textarea id={id} value={h.text} onChange={(e) => setHint(i, { text: e.target.value })} />}</Field>
            </div>
          ))}
        </fieldset>
      )}
    </div>
  );
}

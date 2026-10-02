import { Field, Input, Select, Textarea } from '../ui';
import { FAMILIES, type Family, type ToolBlueprint } from '../../lib/types';
import { placeholders } from './toolbox';

export type ToolSpec = ToolBlueprint & { tool_used: string; deploy_plan: string };

export function ToolSpecForm({ value, onChange, disabled }: { value: ToolSpec; onChange: (v: ToolSpec) => void; disabled?: boolean }) {
  const set = <K extends keyof ToolSpec>(k: K, v: ToolSpec[K]) => onChange({ ...value, [k]: v });
  const ph = placeholders(value.prompt_template);
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
        <Field label="Nom de l’outil" required>{(id) => <Input id={id} value={value.name} disabled={disabled} onChange={(e) => set('name', e.target.value)} />}</Field>
        <Field label="Famille d’usage">{(id) => <Select id={id} value={value.family} disabled={disabled} onChange={(e) => set('family', e.target.value as Family)}>{FAMILIES.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}</Select>}</Field>
      </div>
      <Field label="À quoi sert l’outil, pour qui" hint="Une tâche précise du quotidien ETTI et le destinataire de la sortie.">{(id) => <Textarea id={id} className="min-h-[3rem]" value={value.purpose} disabled={disabled} onChange={(e) => set('purpose', e.target.value)} />}</Field>
      <Field label="Entrées à fournir à chaque usage" hint="Ce que l’on colle ou joint : transcription relue, fiche mission, question…">{(id) => <Textarea id={id} className="min-h-[3rem]" value={value.inputs} disabled={disabled} onChange={(e) => set('inputs', e.target.value)} />}</Field>
      <Field label="Instructions permanentes" hint="Rôle, règles, interdits. À placer dans les instructions personnalisées, le projet ou le carnet de l’outil externe, une fois pour toutes.">{(id) => <Textarea id={id} className="min-h-[10rem] font-mono text-sm" value={value.instructions} disabled={disabled} onChange={(e) => set('instructions', e.target.value)} />}</Field>
      <Field label="Message type" hint={`Envoyé à chaque usage. Les emplacements s’écrivent {{nom}}${ph.length ? ` — détectés : ${ph.join(', ')}` : ''}.`}>{(id) => <Textarea id={id} className="min-h-[6rem] font-mono text-sm" value={value.prompt_template} disabled={disabled} onChange={(e) => set('prompt_template', e.target.value)} />}</Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Format de sortie attendu">{(id) => <Textarea id={id} className="min-h-[3rem]" value={value.output_format} disabled={disabled} onChange={(e) => set('output_format', e.target.value)} />}</Field>
        <Field label="Outil externe utilisé" hint="Nom de l’assistant ou du service, modèle si visible.">{(id) => <Input id={id} value={value.tool_used} disabled={disabled} onChange={(e) => set('tool_used', e.target.value)} />}</Field>
      </div>
      <Field label="Vérifications humaines avant réutilisation (une par ligne)">{(id) => <Textarea id={id} className="min-h-[5rem]" value={value.verification.join('\n')} disabled={disabled} onChange={(e) => set('verification', e.target.value.split('\n').map((x) => x.trim()).filter(Boolean))} />}</Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Règles de données" hint="Ce qui peut entrer dans l’outil, ce qui est interdit (noms, PASS IAE, santé, salaire…).">{(id) => <Textarea id={id} className="min-h-[4rem]" value={value.data_rules} disabled={disabled} onChange={(e) => set('data_rules', e.target.value)} />}</Field>
        <Field label="Solution de secours" hint="Que faire si l’outil n’est pas disponible ou non autorisé.">{(id) => <Textarea id={id} className="min-h-[4rem]" value={value.fallback} disabled={disabled} onChange={(e) => set('fallback', e.target.value)} />}</Field>
      </div>
      <Field label="Plan de déploiement dans mon activité" hint="Quand je l’utilise, qui d’autre pourrait l’utiliser, quelle validation interne, quel contrôle humain, condition d’arrêt.">{(id) => <Textarea id={id} className="min-h-[4rem]" value={value.deploy_plan} disabled={disabled} onChange={(e) => set('deploy_plan', e.target.value)} />}</Field>
    </div>
  );
}

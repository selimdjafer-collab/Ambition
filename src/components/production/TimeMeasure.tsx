import { Checkbox, Field, Input, Textarea } from '../ui';

export interface TimeMeasure {
  usual_minutes: string;
  observed_minutes: string;
  includes_verification: boolean;
  measured: boolean;
  note: string;
}

export const EMPTY_TIME: TimeMeasure = { usual_minutes: '', observed_minutes: '', includes_verification: false, measured: false, note: '' };

export function readTime(extra: Record<string, unknown>): TimeMeasure {
  const t = extra.time as Partial<TimeMeasure> | undefined;
  return { ...EMPTY_TIME, ...(t ?? {}) };
}

/**
 * Mesure honnête du temps : temps habituel estimé pour la tâche, temps
 * observé pendant l'atelier (préparation + vérification + corrections).
 * Une mesure vaut pour cette tâche et ce test ; elle ne devient jamais une
 * promesse générale.
 */
export function TimeMeasureForm({ extra, onExtra, disabled }: { extra: Record<string, unknown>; onExtra: (e: Record<string, unknown>) => void; disabled?: boolean }) {
  const t = readTime(extra);
  const set = (patch: Partial<TimeMeasure>) => onExtra({ ...extra, time: { ...t, ...patch } });
  return (
    <fieldset className="rounded-md border border-line p-3 bg-surface/60">
      <legend className="font-medium px-1">Temps sur cette tâche (mesure, pas promesse)</legend>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Temps habituel estimé, sans IA (minutes)" hint="Votre estimation pour cette tâche telle que vous la faites aujourd’hui.">
          {(id) => <Input id={id} type="number" min={0} value={t.usual_minutes} disabled={disabled} onChange={(e) => set({ usual_minutes: e.target.value })} />}
        </Field>
        <Field label="Temps observé pendant l’atelier (minutes)" hint="Préparation du prompt + attente + lecture + vérification + corrections.">
          {(id) => <Input id={id} type="number" min={0} value={t.observed_minutes} disabled={disabled} onChange={(e) => set({ observed_minutes: e.target.value })} />}
        </Field>
      </div>
      <div className="mt-2 grid gap-1 sm:grid-cols-2">
        <Checkbox label="Le temps observé inclut la vérification et les corrections" checked={t.includes_verification} disabled={disabled} onChange={(v) => set({ includes_verification: v })} />
        <Checkbox label="J’ai réellement chronométré (sinon : estimation)" checked={t.measured} disabled={disabled} onChange={(v) => set({ measured: v })} />
      </div>
      <Field label="Remarque (ce qui a pris du temps, ce qui serait différent au poste)">
        {(id) => <Textarea id={id} className="min-h-[3rem]" value={t.note} disabled={disabled} onChange={(e) => set({ note: e.target.value })} />}
      </Field>
      <p className="text-xs text-muted mt-1">Valable pour cette tâche, ce document fictif et cet outil. Un gain réel au poste se vérifie sur plusieurs semaines, vérification comprise.</p>
    </fieldset>
  );
}

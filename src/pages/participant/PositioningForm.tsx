import { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { Button, Card, Field, Input, Select, Textarea, useToast } from '../../components/ui';
import type { Enrollment, Positioning } from '../../lib/types';

const EMPTY: Positioning = { comfort: null, used_ai_before: null, job: '', priority_task: '', expectations: '' };

export function PositioningForm({ enrollment }: { enrollment: Enrollment }) {
  const { backend } = useAuth();
  const toast = useToast();
  const [p, setP] = useState<Positioning>(enrollment.positioning ?? EMPTY);
  const [open, setOpen] = useState(!enrollment.positioning);
  const [busy, setBusy] = useState(false);
  const save = async () => {
    setBusy(true);
    try {
      await backend.updateEnrollment(enrollment.id, { positioning: p });
      toast('Positionnement enregistré.', 'success');
      setOpen(false);
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };
  return (
    <Card title="Mon positionnement et ma tâche prioritaire" actions={<Button size="sm" onClick={() => setOpen((o) => !o)}>{open ? 'Replier' : 'Modifier'}</Button>}>
      {!open ? (
        <p className="text-sm text-muted">{p.priority_task ? `Tâche prioritaire : ${p.priority_task}` : 'Non renseigné.'}</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Mon poste">{(id) => <Input id={id} value={p.job} onChange={(e) => setP({ ...p, job: e.target.value })} />}</Field>
          <Field label="Aisance avec les outils numériques">
            {(id) => (
              <Select id={id} value={p.comfort ?? ''} onChange={(e) => setP({ ...p, comfort: e.target.value ? (Number(e.target.value) as 1 | 2 | 3 | 4) : null })}>
                <option value="">—</option>
                <option value="1">1 · Peu à l’aise</option>
                <option value="2">2 · Avec de l’aide</option>
                <option value="3">3 · À l’aise</option>
                <option value="4">4 · Très à l’aise</option>
              </Select>
            )}
          </Field>
          <Field label="Ai-je déjà utilisé un assistant IA ?">
            {(id) => (
              <Select id={id} value={p.used_ai_before ?? ''} onChange={(e) => setP({ ...p, used_ai_before: (e.target.value || null) as Positioning['used_ai_before'] })}>
                <option value="">—</option>
                <option value="never">Jamais</option>
                <option value="sometimes">Parfois</option>
                <option value="often">Souvent</option>
              </Select>
            )}
          </Field>
          <Field label="Tâche prioritaire de mon poste" hint="Une tâche concrète que je voudrais faire autrement (ex. : compte rendu après entretien).">
            {(id) => <Input id={id} value={p.priority_task} onChange={(e) => setP({ ...p, priority_task: e.target.value })} />}
          </Field>
          <div className="md:col-span-2">
            <Field label="Mes attentes">{(id) => <Textarea id={id} value={p.expectations} onChange={(e) => setP({ ...p, expectations: e.target.value })} />}</Field>
          </div>
          <div className="md:col-span-2">
            <Button variant="primary" onClick={save} busy={busy}>
              Enregistrer
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

import { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { Button, Checkbox, Field, Input, Modal, Textarea, useToast } from '../ui';
import { CopyButton } from '../production/PromptBuilder';
import type { ToolboxItem, ToolCard } from '../../lib/types';
import { composeToolMessage, placeholders } from './toolbox';

/**
 * Banc d'essai : remplir les emplacements, copier le message dans l'outil
 * externe, revenir consigner le résultat (OK / à corriger) et le temps.
 */
export function ToolTester({ item, tools, onClose, onTested }: { item: ToolboxItem; tools: ToolCard[]; onClose: () => void; onTested: () => void }) {
  const { backend } = useAuth();
  const toast = useToast();
  const keys = useMemo(() => placeholders(item.prompt_template), [item.prompt_template]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [withInstructions, setWithInstructions] = useState(true);
  const [result, setResult] = useState('');
  const [ok, setOk] = useState<boolean | null>(null);
  const [minutes, setMinutes] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const message = composeToolMessage(item, values, withInstructions);
  const candidates = tools.filter((t) => t.family === item.family && !t.is_fallback && t.official_url);
  const save = async () => {
    if (ok === null) return toast('Indiquez si le résultat est OK ou à corriger.', 'error');
    setBusy(true);
    try {
      await backend.addToolboxTest(item.id, { at: new Date().toISOString(), input_summary: keys.map((k) => `${k}: ${(values[k] ?? '').slice(0, 60)}`).join(' · ') || 'message sans emplacement', result_summary: result.trim(), ok, minutes: minutes ? Number(minutes) : null, note: note.trim() });
      toast('Test consigné.', 'success');
      onTested();
      onClose();
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal open onClose={onClose} title={`Tester « ${item.name} » sur le cas fictif`} wide>
      <ol className="text-sm text-muted list-decimal pl-5 mb-3">
        <li>Remplissez les emplacements avec les ressources fictives (R1, R2…), jamais des données réelles.</li>
        <li>Copiez le message, collez-le dans l’outil externe, lisez la sortie et vérifiez chaque point de la fiche.</li>
        <li>Consignez le résultat et le temps passé, vérification comprise.</li>
      </ol>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          {keys.length === 0 && <p className="text-sm text-muted">Aucun emplacement {'{{…}}'} dans le message type : il sera envoyé tel quel.</p>}
          {keys.map((k) => (
            <Field key={k} label={`{{${k}}}`}>{(id) => <Textarea id={id} className="min-h-[4rem]" value={values[k] ?? ''} onChange={(e) => setValues({ ...values, [k]: e.target.value })} />}</Field>
          ))}
          <Checkbox label="Inclure les instructions permanentes dans le message (si elles ne sont pas déjà enregistrées dans l’outil)" checked={withInstructions} onChange={setWithInstructions} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="font-medium">Message à coller</span><CopyButton text={message} label="Copier le message" /></div>
          <pre className="whitespace-pre-wrap text-xs font-mono bg-surface p-2 rounded max-h-64 overflow-y-auto">{message}</pre>
          {candidates.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {candidates.map((t) => <a key={t.id} href={t.official_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-sm hover:bg-surface">{t.name} <ExternalLink size={12} aria-hidden /></a>)}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 border-t border-line pt-3 grid gap-3 md:grid-cols-2">
        <Field label="Résultat obtenu (résumé)">{(id) => <Textarea id={id} className="min-h-[4rem]" value={result} onChange={(e) => setResult(e.target.value)} />}</Field>
        <div className="space-y-2">
          <div className="flex gap-2 items-center flex-wrap">
            <span className="font-medium">Verdict :</span>
            <Button size="sm" variant={ok === true ? 'primary' : 'secondary'} onClick={() => setOk(true)}>OK, sortie fidèle et utilisable</Button>
            <Button size="sm" variant={ok === false ? 'accent' : 'secondary'} onClick={() => setOk(false)}>À corriger</Button>
          </div>
          <Field label="Temps passé, vérification comprise (minutes)">{(id) => <Input id={id} type="number" min={0} value={minutes} onChange={(e) => setMinutes(e.target.value)} />}</Field>
          <Field label="Ce que je corrige dans l’outil">{(id) => <Input id={id} value={note} onChange={(e) => setNote(e.target.value)} />}</Field>
        </div>
      </div>
      <div className="mt-3 flex gap-2"><Button variant="primary" onClick={save} busy={busy}>Consigner le test</Button><Button onClick={onClose}>Fermer</Button></div>
    </Modal>
  );
}

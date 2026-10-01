import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button, Field, Textarea } from '../ui';
import type { PromptParts } from '../../lib/types';

const PARTS: { key: keyof PromptParts; label: string; hint: string }[] = [
  { key: 'context', label: 'Contexte', hint: 'Qui je suis, pour quel usage, dans quel cadre (fictif).' },
  { key: 'task', label: 'Tâche', hint: 'Ce que l’outil doit produire, en une phrase.' },
  { key: 'data', label: 'Données autorisées', hint: 'Uniquement les ressources fictives fournies (ex. : R1, R2).' },
  { key: 'constraints', label: 'Contraintes', hint: 'Ce qu’il ne faut pas inventer, longueur, ton.' },
  { key: 'format', label: 'Format attendu', hint: 'Tableau, liste, nombre de mots, sections.' },
  { key: 'controls', label: 'Contrôles', hint: 'Ce que je vérifierai moi-même après la réponse.' },
];

export function composePrompt(p: PromptParts): string {
  return PARTS.map(({ key, label }) => (p[key].trim() ? `${label} : ${p[key].trim()}` : '')).filter(Boolean).join('\n');
}

export function CopyButton({ text, label = 'Copier' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          /* presse-papiers indisponible */
        }
      }}
      disabled={!text.trim()}
    >
      {done ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />} {done ? 'Copié' : label}
    </Button>
  );
}

export function PromptBuilder({ parts, prompt, onParts, onPrompt, disabled }: { parts: PromptParts; prompt: string; onParts: (p: PromptParts) => void; onPrompt: (s: string) => void; disabled?: boolean }) {
  const [showBuilder, setShowBuilder] = useState(true);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={() => setShowBuilder((s) => !s)} aria-expanded={showBuilder}>
          {showBuilder ? 'Masquer le constructeur' : 'Afficher le constructeur'}
        </Button>
        <Button size="sm" onClick={() => onPrompt(composePrompt(parts))} disabled={disabled}>
          Assembler le prompt à partir des six champs
        </Button>
        <CopyButton text={prompt} label="Copier le prompt" />
      </div>
      {showBuilder && (
        <div className="grid gap-3 md:grid-cols-2">
          {PARTS.map((p) => (
            <Field key={p.key} label={p.label} hint={p.hint}>
              {(id) => <Textarea id={id} className="min-h-[3.5rem]" value={parts[p.key]} disabled={disabled} onChange={(e) => onParts({ ...parts, [p.key]: e.target.value })} />}
            </Field>
          ))}
        </div>
      )}
      <Field label="Prompt final (copié dans l’outil externe)" hint="Vous pouvez le modifier librement. C’est ce texte qui sera conservé avec votre production.">
        {(id) => <Textarea id={id} value={prompt} disabled={disabled} onChange={(e) => onPrompt(e.target.value)} className="min-h-[8rem] font-mono text-sm" />}
      </Field>
    </div>
  );
}

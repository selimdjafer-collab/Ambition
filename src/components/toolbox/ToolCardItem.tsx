import { useState } from 'react';
import { Badge, Button, cx, formatDate } from '../ui';
import { CopyButton } from '../production/PromptBuilder';
import { TOOLBOX_STATUS_LABELS, type ToolboxItem, type ToolBlueprint } from '../../lib/types';
import { familyLabel, toolToMarkdown } from './toolbox';

export function statusTone(s: ToolboxItem['status']): 'neutral' | 'info' | 'brand' | 'success' {
  return s === 'validated' ? 'success' : s === 'ready' ? 'brand' : s === 'tested' ? 'info' : 'neutral';
}

/** Lecture d'une fiche outil (participant, formateur, exemples partagés, portfolio). */
export function ToolSheet({ item, compact }: { item: ToolBlueprint & Partial<ToolboxItem>; compact?: boolean }) {
  const [open, setOpen] = useState(!compact);
  return (
    <div className="text-sm">
      {compact && <Button size="sm" onClick={() => setOpen((o) => !o)} aria-expanded={open}>{open ? 'Replier la fiche' : 'Voir la fiche'}</Button>}
      {open && (
        <div className="mt-2 space-y-2">
          <p><strong>Usage :</strong> {item.purpose || '—'}</p>
          <p><strong>Entrées :</strong> {item.inputs || '—'}</p>
          <div><div className="flex justify-between items-center"><strong>Instructions permanentes</strong><CopyButton text={item.instructions} label="Copier" /></div><pre className="whitespace-pre-wrap font-mono text-xs bg-surface p-2 rounded">{item.instructions || '—'}</pre></div>
          <div><div className="flex justify-between items-center"><strong>Message type</strong><CopyButton text={item.prompt_template} label="Copier" /></div><pre className="whitespace-pre-wrap font-mono text-xs bg-surface p-2 rounded">{item.prompt_template || '—'}</pre></div>
          <p><strong>Format de sortie :</strong> {item.output_format || '—'}</p>
          <div><strong>Vérifications avant réutilisation :</strong><ul className="list-disc pl-5">{item.verification.map((v, i) => <li key={i}>{v}</li>)}{item.verification.length === 0 && <li className="text-muted">aucune</li>}</ul></div>
          <p><strong>Règles de données :</strong> {item.data_rules || '—'}</p>
          <p><strong>Secours :</strong> {item.fallback || '—'}</p>
          {item.deploy_plan && <p><strong>Plan de déploiement :</strong> {item.deploy_plan}</p>}
          {item.tests && item.tests.length > 0 && (
            <div><strong>Tests sur le cas fictif ({item.tests.length})</strong>
              <ul className="list-disc pl-5">{item.tests.map((t, i) => <li key={i}><Badge tone={t.ok ? 'success' : 'warning'}>{t.ok ? 'OK' : 'À corriger'}</Badge> {formatDate(t.at, true)} · {t.input_summary} → {t.result_summary}{t.minutes ? ` · ${t.minutes} min` : ''}{t.note ? ` · ${t.note}` : ''}</li>)}</ul>
            </div>
          )}
          {item.history && item.history.length > 0 && (
            <details><summary className="cursor-pointer">Versions précédentes ({item.history.length})</summary>
              <ul className="list-disc pl-5">{item.history.map((h) => <li key={h.version}>Version {h.version} du {formatDate(h.saved_at, true)} — instructions : {h.snapshot.instructions.slice(0, 120)}{h.snapshot.instructions.length > 120 ? '…' : ''}</li>)}</ul>
            </details>
          )}
          {item.trainer_comment && <p className="rounded bg-brand-50 border border-brand-100 p-2"><strong>Commentaire du formateur :</strong> {item.trainer_comment}</p>}
          <CopyButton text={toolToMarkdown(item)} label="Copier la fiche complète (markdown)" />
        </div>
      )}
    </div>
  );
}

export function ToolHeader({ item, ownerLabel, className }: { item: ToolboxItem; ownerLabel?: string; className?: string }) {
  const okTests = item.tests.filter((t) => t.ok).length;
  return (
    <div className={cx('flex flex-wrap items-start justify-between gap-2', className)}>
      <div>
        <h3 className="text-lg font-semibold">{item.name || 'Outil sans nom'}</h3>
        <div className="text-sm text-muted">{familyLabel(item.family)} · version {item.version}{item.tool_used ? ` · ${item.tool_used}` : ''}{ownerLabel ? ` · ${ownerLabel}` : ''}</div>
      </div>
      <div className="flex flex-wrap gap-1">
        <Badge tone={statusTone(item.status)}>{TOOLBOX_STATUS_LABELS[item.status]}</Badge>
        <Badge tone="neutral">{item.tests.length} test{item.tests.length > 1 ? 's' : ''}{item.tests.length ? ` (${okTests} OK)` : ''}</Badge>
        {item.share_consent && <Badge tone="info">Partage autorisé</Badge>}
      </div>
    </div>
  );
}

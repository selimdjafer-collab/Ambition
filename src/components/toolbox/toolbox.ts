import type { ToolBlueprint, ToolboxItem, ToolboxShared } from '../../lib/types';
import { FAMILIES } from '../../lib/types';

export const EMPTY_BLUEPRINT: ToolBlueprint = {
  name: '',
  family: 'assistants',
  purpose: '',
  inputs: '',
  instructions: '',
  prompt_template: '',
  output_format: '',
  verification: [],
  data_rules: '',
  fallback: '',
};

/** Emplacements {{comme_ceci}} présents dans un message type. */
export function placeholders(template: string): string[] {
  const out: string[] = [];
  for (const m of template.matchAll(/\{\{\s*([a-zA-Z0-9_àâäéèêëîïôöùûüç-]+)\s*\}\}/g)) {
    if (!out.includes(m[1])) out.push(m[1]);
  }
  return out;
}

export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{\s*([a-zA-Z0-9_àâäéèêëîïôöùûüç-]+)\s*\}\}/g, (_, k: string) => values[k]?.trim() || `[${k}]`);
}

/** Texte complet à coller dans l'outil externe : instructions permanentes + message. */
export function composeToolMessage(item: ToolBlueprint, values: Record<string, string>, includeInstructions: boolean): string {
  const msg = fillTemplate(item.prompt_template, values);
  if (!includeInstructions || !item.instructions.trim()) return msg;
  return `${item.instructions.trim()}\n\n---\n${msg}`;
}

export function familyLabel(key: string): string {
  return FAMILIES.find((f) => f.key === key)?.label ?? key;
}

export function toolToMarkdown(t: ToolBlueprint & Partial<Pick<ToolboxItem, 'tool_used' | 'version' | 'status' | 'tests' | 'deploy_plan' | 'trainer_comment'>>): string {
  const lines = [
    `## ${t.name}${t.version ? ` (version ${t.version})` : ''}`,
    `Famille : ${familyLabel(t.family)}${t.tool_used ? ` · Outil externe : ${t.tool_used}` : ''}`,
    '',
    `**Usage :** ${t.purpose}`,
    `**Entrées à fournir :** ${t.inputs}`,
    '',
    '### Instructions permanentes',
    '```',
    t.instructions,
    '```',
    '',
    '### Message type',
    '```',
    t.prompt_template,
    '```',
    '',
    `**Format de sortie attendu :** ${t.output_format}`,
    '',
    '### Vérifications humaines avant réutilisation',
    ...t.verification.map((v) => `- [ ] ${v}`),
    '',
    `**Règles de données :** ${t.data_rules}`,
    `**Solution de secours :** ${t.fallback}`,
  ];
  if (t.deploy_plan) lines.push('', `**Plan de déploiement :** ${t.deploy_plan}`);
  if (t.tests?.length) {
    lines.push('', '### Tests réalisés sur le cas fictif');
    for (const x of t.tests) lines.push(`- ${new Date(x.at).toLocaleDateString('fr-FR')} · ${x.ok ? 'OK' : 'À corriger'} · ${x.input_summary} → ${x.result_summary}${x.minutes ? ` (${x.minutes} min)` : ''}${x.note ? ` — ${x.note}` : ''}`);
  }
  if (t.trainer_comment) lines.push('', `**Commentaire du formateur :** ${t.trainer_comment}`);
  return lines.join('\n');
}

export function toolboxToMarkdown(title: string, items: (ToolBlueprint & Partial<ToolboxItem>)[]): string {
  return [`# ${title}`, '', 'CAS FICTIF — FORMATION : outils construits et testés sur le cas « Agence Horizon ». Avant tout usage avec des données réelles, faire valider l’outil, la politique de données et l’accès par la structure.', '', ...items.map((t) => toolToMarkdown(t) + '\n')].join('\n');
}

export function sharedToBlueprint(x: ToolboxShared): ToolBlueprint & { tool_used: string } {
  const { version: _v, ...rest } = x.item;
  return rest;
}

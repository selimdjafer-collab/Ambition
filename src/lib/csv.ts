/**
 * Export CSV lisible (séparateur point-virgule, UTF-8 avec BOM pour Excel)
 * avec protection contre l'injection de formules.
 */
export function csvCell(value: unknown): string {
  let s = value === null || value === undefined ? '' : String(value);
  // Une cellule commençant par = + - @ ou un caractère de tabulation/retour
  // pourrait être interprétée comme formule par un tableur.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  s = s.replace(/"/g, '""');
  if (/[";\n\r]/.test(s)) s = `"${s}"`;
  return s;
}

export function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers.map(csvCell).join(';'), ...rows.map((r) => r.map(csvCell).join(';'))];
  return '﻿' + lines.join('\r\n');
}

export function downloadText(filename: string, content: string, mime = 'text/plain;charset=utf-8'): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Lecture tolérante d'un CSV simple (nom;email ou email;nom, virgule ou point-virgule). */
export function parseRosterCsv(text: string): { email: string; display_name: string }[] {
  const out: { email: string; display_name: string }[] = [];
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const cells = line.split(/[;,\t]/).map((c) => c.trim().replace(/^"|"$/g, ''));
    const email = cells.find((c) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c));
    if (!email) continue;
    const name = cells.filter((c) => c !== email && c.length > 0).join(' ');
    out.push({ email: email.toLowerCase(), display_name: name });
  }
  return out;
}

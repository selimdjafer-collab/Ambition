import type { BreakdownItem } from './types';

export const EXPECTED_TOTAL_MINUTES = 420;

export interface DurationCheck {
  total: number;
  seance1: number;
  seance2: number;
  problems: string[];
}

export function checkDurations(
  items: { code: string; title: string; seance: 1 | 2; duration_min: number; breakdown: BreakdownItem[] }[],
  expectedTotal = EXPECTED_TOTAL_MINUTES,
): DurationCheck {
  const problems: string[] = [];
  let total = 0;
  let seance1 = 0;
  let seance2 = 0;
  for (const it of items) {
    total += it.duration_min;
    if (it.seance === 1) seance1 += it.duration_min;
    else seance2 += it.duration_min;
    const sum = it.breakdown.reduce((s, b) => s + b.minutes, 0);
    if (sum !== it.duration_min) {
      problems.push(`${it.code} : répartition de ${sum} min pour ${it.duration_min} min annoncées.`);
    }
    if (it.breakdown.some((b) => b.minutes <= 0)) {
      problems.push(`${it.code} : une phase a une durée nulle ou négative.`);
    }
  }
  if (total !== expectedTotal) {
    problems.push(`Total de ${total} min au lieu de ${expectedTotal} min (hors pauses).`);
  }
  return { total, seance1, seance2, problems };
}

/** Minutes réservées aux activités des participants (hors instructions, démonstration, briefing, consignes). */
export function participantMinutes(items: { breakdown: BreakdownItem[] }[]): number {
  // Phases menées par le formateur : instructions, consignes, démonstration, briefing, débrief, retour collectif.
  const trainerLed = /instruction|démonstration|demonstration|briefing|consigne|débrief|debrief|^retour/i;
  return items.reduce((s, it) => s + it.breakdown.filter((b) => !trainerLed.test(b.label)).reduce((x, b) => x + b.minutes, 0), 0);
}

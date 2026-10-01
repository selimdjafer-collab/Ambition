import type { Rubric } from './types';

export function rubricMax(rubric: Rubric): number {
  return rubric.criteria.reduce((s, c) => s + c.max, 0);
}

export function rubricTotal(rubric: Rubric, scores: Record<string, number>): number {
  return rubric.criteria.reduce((s, c) => s + Math.min(c.max, Math.max(0, scores[c.key] ?? 0)), 0);
}

/**
 * Applique la suggestion pédagogique (modifiable) : seuil et minima par critère.
 * Ne décide rien à la place du formateur ; renvoie seulement un diagnostic.
 */
export function rubricSuggestion(
  rubric: Rubric,
  scores: Record<string, number>,
  criticalError: boolean,
): { total: number; meetsThreshold: boolean; missingMinima: string[]; blockedByCritical: boolean } {
  const total = rubricTotal(rubric, scores);
  const missingMinima = rubric.min_on_criteria
    .filter((m) => (scores[m.key] ?? 0) < m.min)
    .map((m) => rubric.criteria.find((c) => c.key === m.key)?.label ?? m.key);
  return {
    total,
    meetsThreshold: total >= rubric.pass_threshold && missingMinima.length === 0 && !criticalError,
    missingMinima,
    blockedByCritical: criticalError,
  };
}

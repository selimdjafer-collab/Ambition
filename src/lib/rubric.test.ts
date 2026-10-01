import { describe, expect, it } from 'vitest';
import { RUBRIC } from '../content';
import { rubricMax, rubricSuggestion, rubricTotal } from './rubric';

describe('grille formative', () => {
  it('cinq critères de 0 à 2, total sur 10', () => {
    expect(RUBRIC.criteria).toHaveLength(5);
    expect(rubricMax(RUBRIC)).toBe(10);
    expect(RUBRIC.pass_threshold).toBe(7);
  });

  it('calcule la somme et applique la suggestion sans décider', () => {
    const ok = rubricSuggestion(RUBRIC, { c1: 2, c2: 1, c3: 2, c4: 1, c5: 1 }, false);
    expect(ok.total).toBe(7);
    expect(ok.meetsThreshold).toBe(true);
    const lowC1 = rubricSuggestion(RUBRIC, { c1: 0, c2: 2, c3: 2, c4: 2, c5: 2 }, false);
    expect(lowC1.total).toBe(8);
    expect(lowC1.meetsThreshold).toBe(false);
    expect(lowC1.missingMinima.length).toBe(1);
    const critical = rubricSuggestion(RUBRIC, { c1: 2, c2: 2, c3: 2, c4: 2, c5: 2 }, true);
    expect(critical.meetsThreshold).toBe(false);
    expect(critical.blockedByCritical).toBe(true);
    expect(rubricTotal(RUBRIC, { c1: 5 })).toBe(2);
  });
});

import { describe, expect, it } from 'vitest';
import { WORKSHOPS, TOTAL_MINUTES } from '../content';
import { checkDurations, participantMinutes } from './durations';

describe('parcours de 420 minutes', () => {
  it('totalise exactement 420 minutes hors pauses, en 11 séquences', () => {
    expect(WORKSHOPS).toHaveLength(11);
    expect(TOTAL_MINUTES).toBe(420);
    const check = checkDurations(WORKSHOPS);
    expect(check.problems).toEqual([]);
    expect(check.seance1).toBe(210);
    expect(check.seance2).toBe(210);
  });

  it('chaque répartition correspond à la durée annoncée', () => {
    for (const w of WORKSHOPS) {
      const sum = w.breakdown.reduce((s, b) => s + b.minutes, 0);
      expect(sum, w.code).toBe(w.duration_min);
    }
  });

  it('réserve 329 minutes aux activités des participants', () => {
    expect(participantMinutes(WORKSHOPS)).toBe(329);
  });

  it('signale une répartition incohérente ou un total différent', () => {
    const broken = WORKSHOPS.map((w, i) => (i === 0 ? { ...w, duration_min: w.duration_min + 5 } : w));
    const check = checkDurations(broken);
    expect(check.problems.length).toBeGreaterThanOrEqual(2);
  });
});

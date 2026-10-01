import { describe, expect, it } from 'vitest';
import { applyTimerAction, computeRemaining, formatSeconds, IDLE_TIMER } from './timer';

describe('minuteur partagé', () => {
  const t0 = Date.parse('2026-10-01T09:00:00Z');

  it('calcule le temps restant à partir de l’échéance, pas d’un compteur local', () => {
    const running = applyTimerAction(IDLE_TIMER, 'start', 600, 'Atelier 1', t0);
    expect(running.status).toBe('running');
    expect(computeRemaining(running, t0)).toBe(600);
    expect(computeRemaining(running, t0 + 250_000)).toBe(350);
    // après un rechargement, le même état donne le même résultat
    const reloaded = JSON.parse(JSON.stringify(running));
    expect(computeRemaining(reloaded, t0 + 250_000)).toBe(350);
    expect(computeRemaining(running, t0 + 999_000)).toBe(0);
  });

  it('pause, reprise, prolongation et fin', () => {
    let t = applyTimerAction(IDLE_TIMER, 'start', 600, null, t0);
    t = applyTimerAction(t, 'pause', undefined, undefined, t0 + 100_000);
    expect(t.status).toBe('paused');
    expect(t.remaining_seconds).toBe(500);
    expect(computeRemaining(t, t0 + 999_000)).toBe(500);
    t = applyTimerAction(t, 'add', 120, undefined, t0 + 200_000);
    expect(t.remaining_seconds).toBe(620);
    t = applyTimerAction(t, 'resume', undefined, undefined, t0 + 300_000);
    expect(computeRemaining(t, t0 + 300_000)).toBe(620);
    t = applyTimerAction(t, 'add', 60, undefined, t0 + 300_000);
    expect(computeRemaining(t, t0 + 300_000)).toBe(680);
    t = applyTimerAction(t, 'finish', undefined, undefined, t0 + 400_000);
    expect(t.status).toBe('finished');
    expect(computeRemaining(t)).toBe(0);
    expect(t.revision).toBeGreaterThan(0);
  });

  it('refuse les transitions invalides', () => {
    expect(() => applyTimerAction(IDLE_TIMER, 'pause', undefined, undefined, t0)).toThrow();
    expect(() => applyTimerAction(IDLE_TIMER, 'start', 0, undefined, t0)).toThrow();
  });

  it('formate les durées', () => {
    expect(formatSeconds(65)).toBe('01:05');
    expect(formatSeconds(3661)).toBe('1:01:01');
  });
});

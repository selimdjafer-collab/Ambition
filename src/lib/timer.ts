import type { TimerState } from './types';

export const IDLE_TIMER: TimerState = {
  status: 'idle',
  duration_seconds: 0,
  started_at: null,
  ends_at: null,
  remaining_seconds: null,
  revision: 0,
  label: null,
};

/**
 * Temps restant (en secondes) calculé à partir de l'état persistant.
 * Le serveur fait autorité : l'écran ne fait que dériver l'affichage.
 */
export function computeRemaining(timer: TimerState, nowMs: number = Date.now()): number {
  switch (timer.status) {
    case 'running': {
      if (!timer.ends_at) return 0;
      const ends = Date.parse(timer.ends_at);
      return Math.max(0, Math.round((ends - nowMs) / 1000));
    }
    case 'paused':
      return Math.max(0, timer.remaining_seconds ?? 0);
    case 'finished':
      return 0;
    default:
      return Math.max(0, timer.duration_seconds);
  }
}

export function isTimerExpired(timer: TimerState, nowMs: number = Date.now()): boolean {
  return timer.status === 'running' && computeRemaining(timer, nowMs) === 0;
}

export function formatSeconds(total: number): string {
  const s = Math.max(0, Math.floor(total));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Transitions locales (mode démo) reproduisant la logique serveur. */
export function applyTimerAction(
  timer: TimerState,
  action: 'start' | 'pause' | 'resume' | 'add' | 'finish' | 'reset',
  seconds: number | undefined,
  label: string | undefined,
  nowMs: number = Date.now(),
): TimerState {
  const now = new Date(nowMs);
  const bump = (t: TimerState): TimerState => ({ ...t, revision: (timer.revision ?? 0) + 1 });
  switch (action) {
    case 'start': {
      const duration = seconds ?? timer.duration_seconds;
      if (duration <= 0) throw new Error('Durée invalide');
      return bump({
        status: 'running',
        duration_seconds: duration,
        started_at: now.toISOString(),
        ends_at: new Date(nowMs + duration * 1000).toISOString(),
        remaining_seconds: null,
        revision: 0,
        label: label ?? timer.label,
      });
    }
    case 'pause': {
      if (timer.status !== 'running') throw new Error("Le minuteur n'est pas en cours");
      return bump({ ...timer, status: 'paused', remaining_seconds: computeRemaining(timer, nowMs), ends_at: null });
    }
    case 'resume': {
      if (timer.status !== 'paused') throw new Error("Le minuteur n'est pas en pause");
      const remaining = timer.remaining_seconds ?? 0;
      return bump({ ...timer, status: 'running', ends_at: new Date(nowMs + remaining * 1000).toISOString(), remaining_seconds: null });
    }
    case 'add': {
      const add = seconds ?? 0;
      if (add === 0) throw new Error('Durée à ajouter manquante');
      if (timer.status === 'running' && timer.ends_at) {
        const ends = Math.max(nowMs, Date.parse(timer.ends_at) + add * 1000);
        return bump({ ...timer, ends_at: new Date(ends).toISOString(), duration_seconds: timer.duration_seconds + add });
      }
      if (timer.status === 'paused') {
        return bump({ ...timer, remaining_seconds: Math.max(0, (timer.remaining_seconds ?? 0) + add), duration_seconds: timer.duration_seconds + add });
      }
      if (timer.status === 'finished') {
        return bump({ ...timer, status: 'running', ends_at: new Date(nowMs + Math.max(add, 0) * 1000).toISOString(), duration_seconds: timer.duration_seconds + add, remaining_seconds: null });
      }
      return bump({ ...timer, duration_seconds: Math.max(0, timer.duration_seconds + add) });
    }
    case 'finish':
      return bump({ ...timer, status: 'finished', ends_at: null, remaining_seconds: 0 });
    case 'reset':
      return bump({ ...IDLE_TIMER, duration_seconds: seconds ?? timer.duration_seconds, label: label ?? null });
  }
}

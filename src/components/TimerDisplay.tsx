import { useNow } from '../hooks/useNow';
import { computeRemaining, formatSeconds } from '../lib/timer';
import type { TimerState } from '../lib/types';
import { cx } from './ui';

export function TimerDisplay({ timer, large }: { timer: TimerState; large?: boolean }) {
  const now = useNow();
  const remaining = computeRemaining(timer, now);
  const expired = timer.status === 'running' && remaining === 0;
  const over = expired || timer.status === 'finished';
  const label = timer.status === 'idle' ? 'Minuteur prêt' : timer.status === 'paused' ? 'En pause' : over ? 'Temps écoulé' : 'Temps restant';
  const pct = timer.duration_seconds > 0 ? Math.max(0, Math.min(1, remaining / timer.duration_seconds)) : 0;
  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={`${label} : ${formatSeconds(remaining)}`}
      className={cx('inline-flex flex-col items-center rounded-2xl border bg-white px-5 py-3 shadow-card min-w-[9rem]', over ? 'border-red-300' : timer.status === 'paused' ? 'border-amber-300' : timer.status === 'running' ? 'border-brand-200' : 'border-line')}
    >
      <span className={cx('font-display tabular font-bold leading-none', large ? 'text-7xl' : 'text-3xl', over ? 'text-red-700' : timer.status === 'paused' ? 'text-amber-ink' : 'text-ink')}>{formatSeconds(remaining)}</span>
      <span className={cx('mt-1.5 text-muted text-center', large ? 'text-lg' : 'text-xs')}>
        {label}
        {timer.label ? ` · ${timer.label}` : ''}
      </span>
      {timer.status !== 'idle' && (
        <span className="mt-2 h-1 w-full rounded-full bg-surface-2 overflow-hidden" aria-hidden>
          <span className={cx('block h-full rounded-full transition-[width] duration-1000', over ? 'bg-red-500' : timer.status === 'paused' ? 'bg-amber-500' : 'bg-brand-500')} style={{ width: `${pct * 100}%` }} />
        </span>
      )}
    </div>
  );
}

import { useNow } from '../hooks/useNow';
import { computeRemaining, formatSeconds } from '../lib/timer';
import type { TimerState } from '../lib/types';
import { cx } from './ui';

export function TimerDisplay({ timer, large }: { timer: TimerState; large?: boolean }) {
  const now = useNow();
  const remaining = computeRemaining(timer, now);
  const expired = timer.status === 'running' && remaining === 0;
  const label = timer.status === 'idle' ? 'Minuteur prêt' : timer.status === 'paused' ? 'En pause' : timer.status === 'finished' || expired ? 'Temps écoulé' : 'Temps restant';
  return (
    <div role="timer" aria-live="off" aria-label={`${label} : ${formatSeconds(remaining)}`} className={cx('inline-flex flex-col items-center rounded-lg border px-4 py-2 bg-white', expired || timer.status === 'finished' ? 'border-red-400' : timer.status === 'paused' ? 'border-amber-400' : 'border-line')}>
      <span className={cx('font-mono tabular-nums font-bold', large ? 'text-6xl' : 'text-2xl', (expired || timer.status === 'finished') && 'text-red-700')}>{formatSeconds(remaining)}</span>
      <span className={cx('text-muted', large ? 'text-lg' : 'text-xs')}>
        {label}
        {timer.label ? ` · ${timer.label}` : ''}
      </span>
    </div>
  );
}

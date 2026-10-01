import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

// --- Boutons ---------------------------------------------------------------
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 border-brand-600',
  accent: 'bg-accent text-white hover:brightness-90 border-accent',
  secondary: 'bg-white text-ink hover:bg-surface border-line',
  ghost: 'bg-transparent text-brand-700 hover:bg-brand-50 border-transparent',
  danger: 'bg-white text-red-700 hover:bg-red-50 border-red-300',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  className,
  children,
  busy,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: 'sm' | 'md' | 'lg'; busy?: boolean }) {
  const sizes = { sm: 'px-2.5 py-1 text-sm', md: 'px-4 py-2', lg: 'px-6 py-3 text-lg' };
  return (
    <button
      type="button"
      {...rest}
      disabled={rest.disabled || busy}
      aria-busy={busy || undefined}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-md border font-medium transition disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {busy && <Spinner small />}
      {children}
    </button>
  );
}

export function LinkButton({ to, variant = 'secondary', size = 'md', className, children }: { to: string; variant?: Variant; size?: 'sm' | 'md' | 'lg'; className?: string; children: ReactNode }) {
  const sizes = { sm: 'px-2.5 py-1 text-sm', md: 'px-4 py-2', lg: 'px-6 py-3 text-lg' };
  return (
    <Link to={to} className={cx('inline-flex items-center justify-center gap-2 rounded-md border font-medium transition', variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}

// --- Surfaces --------------------------------------------------------------
export function Card({ title, children, className, actions, as: Tag = 'section' }: { title?: ReactNode; children: ReactNode; className?: string; actions?: ReactNode; as?: 'section' | 'div' | 'article' }) {
  return (
    <Tag className={cx('bg-white rounded-lg border border-line p-4 sm:p-5 shadow-sm', className)}>
      {(title || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
        </div>
      )}
      {children}
    </Tag>
  );
}

export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand'; className?: string }) {
  const tones = {
    neutral: 'bg-gray-100 text-gray-800 border-gray-300',
    info: 'bg-blue-50 text-blue-900 border-blue-300',
    success: 'bg-green-50 text-green-900 border-green-300',
    warning: 'bg-amber-50 text-amber-900 border-amber-300',
    danger: 'bg-red-50 text-red-900 border-red-300',
    brand: 'bg-brand-50 text-brand-700 border-brand-100',
  };
  return <span className={cx('inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-sm font-medium', tones[tone], className)}>{children}</span>;
}

export function Notice({ children, tone = 'info', title }: { children: ReactNode; tone?: 'info' | 'warning' | 'danger' | 'success'; title?: string }) {
  const tones = {
    info: 'bg-blue-50 border-blue-300 text-blue-950',
    warning: 'bg-amber-50 border-amber-300 text-amber-950',
    danger: 'bg-red-50 border-red-300 text-red-950',
    success: 'bg-green-50 border-green-300 text-green-950',
  };
  return (
    <div role={tone === 'danger' ? 'alert' : 'note'} className={cx('rounded-md border px-3 py-2 text-sm', tones[tone])}>
      {title && <strong className="block mb-0.5">{title}</strong>}
      {children}
    </div>
  );
}

export function Spinner({ small }: { small?: boolean }) {
  return <span aria-hidden className={cx('inline-block animate-spin rounded-full border-2 border-current border-t-transparent', small ? 'h-4 w-4' : 'h-6 w-6')} />;
}

export function Loading({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-2 text-muted p-6">
      <Spinner /> {label}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="text-muted italic py-3">{children}</p>;
}

// --- Formulaires -----------------------------------------------------------
export function Field({ label, hint, error, children, required }: { label: string; hint?: string; error?: string; children: (id: string) => ReactNode; required?: boolean }) {
  const id = useId();
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span aria-hidden className="text-accent">*</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {children(id)}
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = 'w-full rounded-md border border-line bg-white px-3 py-2 disabled:bg-surface disabled:text-muted';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(inputCls, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cx(inputCls, 'min-h-[6rem] leading-relaxed', props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cx(inputCls, props.className)} />;
}

export function Checkbox({ label, checked, onChange, disabled, description }: { label: ReactNode; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean; description?: string }) {
  const id = useId();
  return (
    <div className="flex items-start gap-2">
      <input id={id} type="checkbox" className="mt-1 h-5 w-5 accent-brand-600" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} aria-describedby={description ? `${id}-d` : undefined} />
      <label htmlFor={id} className={cx('leading-snug', disabled && 'text-muted')}>
        {label}
        {description && (
          <span id={`${id}-d`} className="block text-sm text-muted">
            {description}
          </span>
        )}
      </label>
    </div>
  );
}

// --- Modale accessible -----------------------------------------------------
export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const items = Array.from(ref.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));
        if (!items.length) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 overflow-y-auto" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="modal-title" className={cx('bg-white rounded-lg shadow-xl w-full p-5 mt-8', wide ? 'max-w-4xl' : 'max-w-xl')}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button type="button" onClick={onClose} aria-label="Fermer" className="p-1 rounded hover:bg-surface">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// --- Onglets ---------------------------------------------------------------
export function Tabs<T extends string>({ tabs, value, onChange, label }: { tabs: { key: T; label: ReactNode }[]; value: T; onChange: (k: T) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-1 border-b border-line mb-4">
      {tabs.map((t) => (
        <button
          key={t.key}
          role="tab"
          type="button"
          aria-selected={value === t.key}
          onClick={() => onChange(t.key)}
          className={cx('px-3 py-2 -mb-px border-b-2 font-medium', value === t.key ? 'border-brand-600 text-brand-700' : 'border-transparent text-muted hover:text-ink')}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// --- Notifications ---------------------------------------------------------
interface Toast {
  id: number;
  text: string;
  tone: 'success' | 'error' | 'info';
}
const ToastCtx = createContext<(text: string, tone?: Toast['tone']) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((text: string, tone: Toast['tone'] = 'info') => {
    const id = Date.now() + Math.random();
    setItems((xs) => [...xs, { id, text, tone }]);
    setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), tone === 'error' ? 8000 : 4000);
  }, []);
  const value = useMemo(() => push, [push]);
  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div aria-live="polite" className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
        {items.map((t) => (
          <div key={t.id} role={t.tone === 'error' ? 'alert' : 'status'} className={cx('rounded-md border px-3 py-2 shadow bg-white', t.tone === 'error' ? 'border-red-400 text-red-900' : t.tone === 'success' ? 'border-green-400 text-green-900' : 'border-line')}>
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}

// --- Markdown minimal (titres, listes, tableaux, gras) -------------------
export function Markdown({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => renderMarkdown(text), [text]);
  return <div className={cx('prose-lite', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inline(s: string): string {
  let out = esc(s);
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer nofollow" class="underline text-brand-700">$1</a>');
  return out;
}

export function renderMarkdown(text: string): string {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  let para: string[] = [];
  let table: string[][] | null = null;
  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(' '))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };
  const flushTable = () => {
    if (table && table.length) {
      const [head, ...rows] = table;
      out.push('<table><thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' + rows.map((r) => '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table>');
    }
    table = null;
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\s*\|/.test(line)) {
      flushPara();
      flushList();
      const cells = line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue;
      if (!table) table = [];
      table.push(cells);
      continue;
    }
    flushTable();
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      flushPara();
      flushList();
      const level = Math.min(4, h[1].length + 1);
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }
    const ul = /^\s*[-*•]\s+(.*)$/.exec(line);
    const ol = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (ul || ol) {
      flushPara();
      const kind = ul ? 'ul' : 'ol';
      if (list !== kind) {
        flushList();
        out.push(`<${kind}>`);
        list = kind;
      }
      out.push(`<li>${inline((ul ?? ol)![1])}</li>`);
      continue;
    }
    if (/^\s*>\s?/.test(line)) {
      flushPara();
      flushList();
      out.push(`<blockquote>${inline(line.replace(/^\s*>\s?/, ''))}</blockquote>`);
      continue;
    }
    if (line.trim() === '') {
      flushPara();
      flushList();
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  flushTable();
  return out.join('\n');
}

export function SaveIndicator({ state, detail }: { state: 'saved' | 'pending' | 'error' | 'idle' | 'offline'; detail?: string }) {
  const map = {
    idle: { text: 'Aucune modification', tone: 'neutral' as const },
    pending: { text: 'Enregistrement en attente…', tone: 'warning' as const },
    saved: { text: 'Enregistré', tone: 'success' as const },
    error: { text: 'Erreur d’enregistrement', tone: 'danger' as const },
    offline: { text: 'Hors ligne : non enregistré sur le serveur', tone: 'danger' as const },
  };
  const m = map[state];
  return (
    <span role="status" className="inline-flex items-center gap-2 text-sm">
      <Badge tone={m.tone}>{m.text}</Badge>
      {detail && <span className="text-muted">{detail}</span>}
    </span>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rounded border border-line bg-surface px-1 text-xs">{children}</kbd>;
}

export function formatDate(iso: string | null | undefined, withTime = false): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return withTime ? d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : d.toLocaleDateString('fr-FR');
}

export function formatTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

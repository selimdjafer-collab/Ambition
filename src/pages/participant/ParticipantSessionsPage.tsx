import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { Badge, Button, Card, EmptyState, Field, Input, Loading, Notice, formatDate } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { SESSION_STATUS_LABELS } from '../../lib/types';

export function ParticipantSessionsPage() {
  const { backend, profile } = useAuth();
  const sessions = useAsync(() => backend.listMySessions(), [backend]);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: 'success' | 'warning' | 'danger'; text: string } | null>(null);

  const join = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const r = await backend.requestJoin(code);
      if (r.status === 'approved') setMsg({ tone: 'success', text: `Vous êtes inscrit·e à « ${r.title} ».` });
      else if (r.status === 'pending') setMsg({ tone: 'warning', text: `Demande envoyée pour « ${r.title} ». Le formateur doit l’approuver.${r.full ? ' L’effectif prévu est déjà atteint.' : ''}` });
      else setMsg({ tone: 'danger', text: `Inscription « ${r.status} » pour « ${r.title} ».` });
      setCode('');
      await sessions.reload();
    } catch (err) {
      setMsg({ tone: 'danger', text: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-1">Bonjour {profile?.display_name}</h1>
      <p className="text-muted mb-5">Vos sessions de formation et l’inscription à une nouvelle session.</p>
      <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
        <Card title="Mes sessions">
          {sessions.loading ? (
            <Loading />
          ) : !sessions.data?.length ? (
            <EmptyState>Aucune session pour le moment. Saisissez le code communiqué par votre formateur.</EmptyState>
          ) : (
            <ul className="divide-y divide-line">
              {sessions.data.map((s) => (
                <li key={s.id} className="py-3 flex flex-wrap items-center gap-3 justify-between">
                  <div>
                    <Link to={`/p/sessions/${s.id}`} className="font-medium text-brand-700 underline">
                      {s.title}
                    </Link>
                    <div className="text-sm text-muted">
                      {s.program_title} · {formatDate(s.start_date)}
                      {s.end_date ? ` → ${formatDate(s.end_date)}` : ''} · {s.mode === 'presentiel' ? 'Présentiel' : s.mode === 'visio' ? 'Visio' : 'Mixte'}
                    </div>
                  </div>
                  <Badge tone={s.status === 'open' ? 'success' : s.status === 'closed' ? 'neutral' : 'info'}>{SESSION_STATUS_LABELS[s.status]}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title="Rejoindre une session">
          <form onSubmit={join} className="space-y-3">
            <Field label="Code de session" hint="Six caractères, donné par le formateur. Il oriente votre demande ; l’accès est accordé par le formateur ou par une invitation à votre e-mail.">
              {(id) => <Input id={id} value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} maxLength={6} required className="font-mono tracking-widest uppercase" />}
            </Field>
            <Button type="submit" variant="primary" busy={busy}>
              Demander à rejoindre
            </Button>
            {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
          </form>
        </Card>
      </div>
    </AppShell>
  );
}

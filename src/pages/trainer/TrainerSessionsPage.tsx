import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { Badge, Button, Card, EmptyState, Field, Input, Loading, Modal, Notice, Select, formatDate, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { SESSION_STATUS_LABELS, type ProgramVersion, type Session, type SessionMode } from '../../lib/types';

export function TrainerSessionsPage() {
  const { backend } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const sessions = useAsync(() => backend.listMySessions(), [backend]);
  const versions = useAsync(async () => {
    const programs = await backend.listPrograms();
    const out: (ProgramVersion & { program_title: string })[] = [];
    for (const p of programs) for (const v of await backend.listProgramVersions(p.id)) if (v.status === 'published') out.push({ ...v, program_title: p.title });
    return out;
  }, [backend]);
  const [creating, setCreating] = useState(false);
  const [dup, setDup] = useState<Session | null>(null);
  const [form, setForm] = useState({ title: '', program_version_id: '', mode: 'presentiel' as SessionMode, start_date: '', end_date: '', max_participants: 10 });
  const [busy, setBusy] = useState(false);

  const create = async () => {
    setBusy(true);
    try {
      if (!form.title.trim()) throw new Error('Le titre est obligatoire');
      const id = await backend.createSession({ program_version_id: form.program_version_id || versions.data?.[0]?.id || '', title: form.title.trim(), mode: form.mode, start_date: form.start_date || null, end_date: form.end_date || null, max_participants: form.max_participants });
      toast('Session créée.', 'success');
      navigate(`/t/sessions/${id}/preparer`);
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };
  const duplicate = async () => {
    if (!dup) return;
    setBusy(true);
    try {
      const id = await backend.duplicateSession(dup.id, form.title.trim() || `${dup.title} (copie)`, form.start_date || null, form.end_date || null);
      toast('Session dupliquée : durées et consignes reprises, dates et code réinitialisés.', 'success');
      setDup(null);
      navigate(`/t/sessions/${id}/preparer`);
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Mes sessions</h1>
          <p className="text-muted">Créer, préparer, animer et clôturer une session de 420 minutes (deux séances de 3 h 30, hors pauses).</p>
        </div>
        <Button variant="primary" onClick={() => { setForm({ title: '', program_version_id: versions.data?.[0]?.id ?? '', mode: 'presentiel', start_date: '', end_date: '', max_participants: 10 }); setCreating(true); }}>Nouvelle session</Button>
      </div>
      {sessions.loading ? <Loading /> : !sessions.data?.length ? (
        <Card><EmptyState>Aucune session. Créez votre première session à partir du programme publié.</EmptyState></Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {sessions.data.map((s) => (
            <Card key={s.id} as="article">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{s.title}</h2>
                  <p className="text-sm text-muted">{s.program_title} · v{s.program_version_number} · {formatDate(s.start_date)}{s.end_date ? ` → ${formatDate(s.end_date)}` : ''} · {s.mode}</p>
                  <p className="text-sm mt-1">Code : <span className="font-mono tracking-widest">{s.join_code}</span> · {s.max_participants} places</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge tone={s.status === 'open' ? 'success' : s.status === 'closed' ? 'neutral' : s.status === 'suspended' ? 'warning' : 'info'}>{SESSION_STATUS_LABELS[s.status]}</Badge>
                  {s.is_demo && <Badge tone="warning">Démo</Badge>}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link to={`/t/sessions/${s.id}/preparer`} className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium hover:bg-surface">Préparer</Link>
                <Link to={`/t/sessions/${s.id}/animer`} className="rounded-md border border-brand-600 bg-brand-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-brand-700">Animer</Link>
                <Link to={`/t/sessions/${s.id}/rapport`} className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium hover:bg-surface">Rapport</Link>
                <Button size="sm" onClick={() => { setForm({ ...form, title: `${s.title} (copie)`, start_date: '', end_date: '' }); setDup(s); }}>Dupliquer</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={creating} onClose={() => setCreating(false)} title="Nouvelle session">
        {!versions.data?.length ? <Notice tone="warning">Aucune version de programme publiée. Publiez d’abord une version dans « Programme ».</Notice> : (
          <div className="space-y-3">
            <Field label="Titre" required>{(id) => <Input id={id} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="ex. Agence de Lyon — octobre 2026" />}</Field>
            <Field label="Programme (version publiée)">{(id) => <Select id={id} value={form.program_version_id} onChange={(e) => setForm({ ...form, program_version_id: e.target.value })}>{versions.data!.map((v) => <option key={v.id} value={v.id}>{v.program_title} — version {v.version_number} ({v.editorial_reference})</option>)}</Select>}</Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date de la séance 1">{(id) => <Input id={id} type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />}</Field>
              <Field label="Date de la séance 2" hint="Même jour ou autre date.">{(id) => <Input id={id} type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />}</Field>
              <Field label="Modalité">{(id) => <Select id={id} value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value as SessionMode })}><option value="presentiel">Présentiel</option><option value="visio">Visio</option><option value="mixte">Mixte</option></Select>}</Field>
              <Field label="Effectif (6 à 10 conseillé)">{(id) => <Input id={id} type="number" min={1} max={60} value={form.max_participants} onChange={(e) => setForm({ ...form, max_participants: Number(e.target.value) })} />}</Field>
            </div>
            <Button variant="primary" onClick={create} busy={busy}>Créer</Button>
          </div>
        )}
      </Modal>
      <Modal open={!!dup} onClose={() => setDup(null)} title={`Dupliquer « ${dup?.title ?? ''} »`}>
        <p className="text-sm text-muted mb-3">La copie reprend le programme, les consignes et les durées de la session d’origine. Les dates, le code et le minuteur sont réinitialisés ; aucun participant n’est repris.</p>
        <div className="space-y-3">
          <Field label="Titre">{(id) => <Input id={id} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />}</Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date de la séance 1">{(id) => <Input id={id} type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />}</Field>
            <Field label="Date de la séance 2">{(id) => <Input id={id} type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />}</Field>
          </div>
          <Button variant="primary" onClick={duplicate} busy={busy}>Dupliquer</Button>
        </div>
      </Modal>
    </AppShell>
  );
}

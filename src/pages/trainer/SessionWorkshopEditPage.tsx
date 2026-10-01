import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { BreakdownEditor, WorkshopContentForm } from '../../components/WorkshopContentForm';
import { Button, Card, Field, Loading, Markdown, Notice, Textarea, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { useSessionData } from '../../hooks/useSessionData';
import type { BreakdownItem, PublishedWorkshopContent } from '../../lib/types';

export function SessionWorkshopEditPage() {
  const { sessionId, workshopId } = useParams();
  const { backend } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error } = useSessionData(sessionId);
  const priv = useAsync(() => (workshopId ? backend.getWorkshopPrivate(workshopId) : Promise.resolve(null)), [backend, workshopId]);
  const [content, setContent] = useState<PublishedWorkshopContent | null>(null);
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([]);
  const [duration, setDuration] = useState(0);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const w = data?.workshops.find((x) => x.id === workshopId);
  useEffect(() => {
    if (w && !content) {
      setContent(w.content);
      setBreakdown(w.breakdown);
      setDuration(w.duration_min);
    }
  }, [w, content]);
  if (error) return <AppShell><Notice tone="danger">{error}</Notice></AppShell>;
  if (!data || !w || !content) return <AppShell><Loading /></AppShell>;
  const submitted = data.submissions.filter((s) => s.session_workshop_id === w.id && s.current_version > 0).length;
  return (
    <AppShell wide>
      <Link to={`/t/sessions/${data.session.id}/animer`} className="underline text-brand-700 text-sm">← Tableau de bord</Link>
      <h1 className="text-2xl font-semibold mb-2">{w.code} — {w.title} (consigne de cette session)</h1>
      <Notice tone="warning" title="Mise à jour explicite et tracée">
        Cette modification ne concerne que cette session. Elle sera annoncée aux participants avec votre note. {submitted > 0 ? `${submitted} production(s) déjà remise(s) conservent la consigne utilisée au moment de la remise (versions figées).` : 'Aucune production remise pour cet atelier.'}
      </Notice>
      <div className="space-y-4 mt-3">
        <Card><BreakdownEditor value={breakdown} onChange={setBreakdown} durationMin={duration} onDuration={setDuration} /></Card>
        <Card><WorkshopContentForm value={content} onChange={setContent} /></Card>
        {priv.data && (
          <Card title="Corrigé et notes (lecture seule dans la session)">
            <Markdown text={priv.data.answer_key} className="text-sm" />
            {priv.data.trainer_notes && <><h3 className="font-semibold mt-3">Notes d’animation</h3><Markdown text={priv.data.trainer_notes} className="text-sm" /></>}
            {priv.data.flawed_example && <><h3 className="font-semibold mt-3">Exemple imparfait (réservé au formateur)</h3><Markdown text={priv.data.flawed_example} className="text-sm" /></>}
          </Card>
        )}
        <Card>
          <Field label="Note de mise à jour annoncée au groupe" required>{(id) => <Textarea id={id} value={note} onChange={(e) => setNote(e.target.value)} placeholder="ex. Durée de production portée à 35 min ; la question 5 est retirée." />}</Field>
          <Button className="mt-3" variant="primary" busy={busy} disabled={!note.trim()} onClick={async () => { setBusy(true); try { await backend.updateSessionWorkshopContent(w.id, content, breakdown, duration, note.trim()); toast('Consigne mise à jour et annoncée.', 'success'); navigate(`/t/sessions/${data.session.id}/animer`); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } finally { setBusy(false); } }}>Mettre à jour la consigne de la session</Button>
        </Card>
      </div>
    </AppShell>
  );
}

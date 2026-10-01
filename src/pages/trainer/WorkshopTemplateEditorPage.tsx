import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { BreakdownEditor, WorkshopContentForm } from '../../components/WorkshopContentForm';
import { Button, Card, Field, Input, Loading, Notice, Select, Tabs, Textarea, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import type { BreakdownItem, WorkshopContent, WorkshopPrivateContent } from '../../lib/types';

export function WorkshopTemplateEditorPage() {
  const { versionId, templateId } = useParams();
  const { backend } = useAuth();
  const toast = useToast();
  const detail = useAsync(() => backend.getProgramVersion(versionId!), [backend, versionId]);
  const [tab, setTab] = useState<'public' | 'private'>('public');
  const [title, setTitle] = useState('');
  const [seance, setSeance] = useState<1 | 2>(1);
  const [duration, setDuration] = useState(0);
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([]);
  const [content, setContent] = useState<WorkshopContent | null>(null);
  const [priv, setPriv] = useState<WorkshopPrivateContent>({ answer_key: '', trainer_notes: '' });
  const [busy, setBusy] = useState(false);
  const tpl = detail.data?.workshops.find((w) => w.id === templateId);
  useEffect(() => {
    if (!tpl || !detail.data) return;
    setTitle(tpl.title);
    setSeance(tpl.seance);
    setDuration(tpl.duration_min);
    setBreakdown(tpl.breakdown);
    setContent(tpl.content);
    setPriv(detail.data.privates.find((p) => p.workshop_template_id === tpl.id)?.content ?? { answer_key: '', trainer_notes: '' });
  }, [tpl, detail.data]);
  if (detail.loading || !detail.data) return <AppShell><Loading /></AppShell>;
  if (!tpl || !content) return <AppShell><Notice tone="danger">Fiche introuvable.</Notice></AppShell>;
  const editable = detail.data.version.status === 'draft';
  const save = async () => {
    setBusy(true);
    try {
      await backend.updateWorkshopTemplate(tpl.id, { title, seance, duration_min: duration, breakdown, content });
      await backend.updateWorkshopPrivate(tpl.id, priv);
      toast('Fiche enregistrée.', 'success');
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };
  return (
    <AppShell wide>
      <Link to={`/t/programme/${versionId}`} className="underline text-brand-700 text-sm">← Programme (version {detail.data.version.version_number})</Link>
      <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
        <h1 className="text-2xl font-semibold">{tpl.code} — {tpl.title}</h1>
        {editable ? <Button variant="primary" onClick={save} busy={busy}>Enregistrer</Button> : <Notice tone="info">Version publiée ou archivée : lecture seule. Créez un brouillon pour modifier.</Notice>}
      </div>
      <fieldset disabled={!editable} className="space-y-4">
        <Card>
          <div className="grid gap-3 md:grid-cols-3">
            <Field label="Titre">{(id) => <Input id={id} value={title} onChange={(e) => setTitle(e.target.value)} />}</Field>
            <Field label="Séance">{(id) => <Select id={id} value={seance} onChange={(e) => setSeance(Number(e.target.value) as 1 | 2)}><option value={1}>Séance 1</option><option value={2}>Séance 2</option></Select>}</Field>
            <Field label="Code">{(id) => <Input id={id} value={tpl.code} disabled />}</Field>
          </div>
          <div className="mt-3"><BreakdownEditor value={breakdown} onChange={setBreakdown} durationMin={duration} onDuration={setDuration} /></div>
        </Card>
        <Tabs label="Contenu" value={tab} onChange={setTab} tabs={[{ key: 'public', label: 'Contenu publié aux participants' }, { key: 'private', label: 'Corrigé et notes (réservés au formateur)' }]} />
        {tab === 'public' ? (
          <Card><WorkshopContentForm value={content} onChange={setContent} withHints /></Card>
        ) : (
          <Card>
            <Notice tone="info">Ces contenus ne sont jamais envoyés aux participants avant que le formateur ne révèle le corrigé dans une session.</Notice>
            <div className="space-y-3 mt-3">
              <Field label="Corrigé (markdown simple)">{(id) => <Textarea id={id} className="min-h-[14rem]" value={priv.answer_key} onChange={(e) => setPriv({ ...priv, answer_key: e.target.value })} />}</Field>
              <Field label="Notes d’animation">{(id) => <Textarea id={id} className="min-h-[8rem]" value={priv.trainer_notes} onChange={(e) => setPriv({ ...priv, trainer_notes: e.target.value })} />}</Field>
              <Field label="Exemple imparfait (réservé au formateur)">{(id) => <Textarea id={id} className="min-h-[8rem]" value={priv.flawed_example ?? ''} onChange={(e) => setPriv({ ...priv, flawed_example: e.target.value })} />}</Field>
            </div>
          </Card>
        )}
      </fieldset>
    </AppShell>
  );
}

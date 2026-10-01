import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { Button, Card, Field, Input, Loading, Notice, Select, Textarea, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { DEFAULT_HOSTING_NOTES, DEFAULT_PRIVACY_NOTICE } from '../../content';
import type { Retention } from '../../lib/types';

export function SettingsPage() {
  const { backend, settings, refreshSettings, logoUrl, profile } = useAuth();
  const toast = useToast();
  const trainers = useAsync(() => backend.listTrainers(), [backend]);
  const [f, setF] = useState({ org_name: '', privacy_notice: '', hosting_notes: '', default_retention: { drafts_days: null, productions_days: null, traces_days: null } as Retention });
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'trainer' | 'participant'>('trainer');
  useEffect(() => {
    if (settings) setF({ org_name: settings.org_name, privacy_notice: settings.privacy_notice || DEFAULT_PRIVACY_NOTICE, hosting_notes: settings.hosting_notes || DEFAULT_HOSTING_NOTES, default_retention: settings.default_retention });
  }, [settings]);
  if (!settings) return <AppShell><Loading /></AppShell>;
  const ret = (k: keyof Retention, v: string) => setF({ ...f, default_retention: { ...f.default_retention, [k]: v === '' ? null : Number(v) } });
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold mb-4">Paramètres de l’organisme</h1>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Identité et logo">
          <Field label="Nom de l’organisme">{(id) => <Input id={id} value={f.org_name} onChange={(e) => setF({ ...f, org_name: e.target.value })} />}</Field>
          <div className="mt-3 flex items-center gap-3">
            {logoUrl ? <img src={logoUrl} alt="Logo actuel" className="h-12 object-contain border border-line rounded p-1" /> : <span className="text-sm text-muted">Aucun logo : la signature textuelle est utilisée.</span>}
            <label className="text-sm">
              <span className="block font-medium">Téléverser le vrai logo (PNG, JPG, SVG, WebP ≤ 2 Mo)</span>
              <input type="file" accept=".png,.jpg,.jpeg,.svg,.webp" onChange={async (e) => { const file = e.target.files?.[0]; if (!file) return; try { await backend.uploadLogo(file); await refreshSettings(); toast('Logo enregistré.', 'success'); } catch (err) { toast(err instanceof Error ? err.message : String(err), 'error'); } }} />
            </label>
          </div>
        </Card>
        <Card title="Durées de conservation par défaut (jours)">
          <p className="text-sm text-muted mb-2">Choix de l’organisme, repris dans chaque nouvelle session. Vide = non définie. L’application n’affirme aucune obligation légale de durée.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Brouillons">{(id) => <Input id={id} type="number" min={0} value={f.default_retention.drafts_days ?? ''} onChange={(e) => ret('drafts_days', e.target.value)} />}</Field>
            <Field label="Productions">{(id) => <Input id={id} type="number" min={0} value={f.default_retention.productions_days ?? ''} onChange={(e) => ret('productions_days', e.target.value)} />}</Field>
            <Field label="Traces">{(id) => <Input id={id} type="number" min={0} value={f.default_retention.traces_days ?? ''} onChange={(e) => ret('traces_days', e.target.value)} />}</Field>
          </div>
        </Card>
        <Card title="Information de confidentialité (affichée aux participants)" className="lg:col-span-2">
          <Textarea aria-label="Information de confidentialité" className="min-h-[12rem]" value={f.privacy_notice} onChange={(e) => setF({ ...f, privacy_notice: e.target.value })} />
        </Card>
        <Card title="Hébergement, prestataires, transferts et réglages retenus" className="lg:col-span-2">
          <Textarea aria-label="Notes d’hébergement" className="min-h-[8rem]" value={f.hosting_notes} onChange={(e) => setF({ ...f, hosting_notes: e.target.value })} />
          <Button className="mt-3" variant="primary" onClick={async () => { try { await backend.updateSettings(f); await refreshSettings(); toast('Paramètres enregistrés.', 'success'); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }}>Enregistrer les paramètres</Button>
        </Card>
        <Card title="Formateurs" className="lg:col-span-2">
          <p className="text-sm text-muted mb-2">Le premier formateur est créé par l’organisme dans la base (voir docs/PREMIER_FORMATEUR.md). Un formateur peut ensuite nommer d’autres formateurs par e-mail : la personne doit déjà avoir créé son compte. Un participant ne peut jamais s’attribuer ce rôle.</p>
          <ul className="text-sm mb-3">{trainers.data?.map((t) => <li key={t.id}>{t.display_name} — {t.email}{t.id === profile?.id ? ' (vous)' : ''}</li>)}</ul>
          <div className="flex flex-wrap gap-2 items-end">
            <Field label="E-mail du compte">{(id) => <Input id={id} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />}</Field>
            <Field label="Rôle">{(id) => <Select id={id} value={role} onChange={(e) => setRole(e.target.value as 'trainer' | 'participant')}><option value="trainer">Formateur</option><option value="participant">Participant</option></Select>}</Field>
            <Button onClick={async () => { try { await backend.setUserRole(email, role); toast('Rôle mis à jour.', 'success'); setEmail(''); await trainers.reload(); } catch (e) { toast(e instanceof Error ? e.message : String(e), 'error'); } }} disabled={!email}>Appliquer</Button>
          </div>
          {backend.kind === 'demo' && <Notice tone="info">Mode démo : les rôles ne sont modifiés que dans ce navigateur.</Notice>}
        </Card>
      </div>
    </AppShell>
  );
}

import { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { AppShell } from '../../components/layout/AppShell';
import { Badge, Button, Card, Field, Input, Loading, Modal, Select, Textarea, formatDate, useToast } from '../../components/ui';
import { useAsync } from '../../hooks/useAsync';
import { FAMILIES, type Family, type ToolCard, type ToolCardHistory } from '../../lib/types';
import type { ToolCardInput } from '../../lib/backend/types';

const AUTH_LABEL: Record<ToolCard['authorization_status'], { text: string; tone: 'success' | 'warning' | 'danger' }> = {
  authorized: { text: 'Autorisé', tone: 'success' },
  to_validate: { text: 'À valider par la structure', tone: 'warning' },
  not_authorized: { text: 'Non autorisé', tone: 'danger' },
};
const PRICING_LABEL: Record<ToolCard['pricing_status'], string> = {
  free: 'Gratuit',
  free_with_quota: 'Gratuit avec quotas',
  trial: 'Essai',
  license: 'Licence',
  depends_on_account: 'Selon le compte',
  unknown: 'À vérifier',
};

export function ToolCardView({ t, allowed, editable, onEdit }: { t: ToolCard; allowed?: boolean; editable?: boolean; onEdit?: () => void }) {
  const [open, setOpen] = useState(false);
  const verified = !!t.last_verified_on;
  return (
    <Card as="article" className={t.is_fallback ? 'bg-brand-50/40' : undefined}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{t.name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {t.is_fallback && <Badge tone="brand">Solution de secours</Badge>}
            <Badge tone={AUTH_LABEL[t.authorization_status].tone}>{AUTH_LABEL[t.authorization_status].text}</Badge>
            <Badge tone="neutral">{PRICING_LABEL[t.pricing_status]}</Badge>
            {verified ? <Badge tone="success">Vérifié le {formatDate(t.last_verified_on)}</Badge> : <Badge tone="warning">À vérifier (aucune date ni source)</Badge>}
            {allowed === false && <Badge tone="danger">Non retenu pour cette session</Badge>}
          </div>
          <p className="mt-2">{t.usage}</p>
        </div>
        <div className="flex gap-2">
          {t.official_url && (
            <a href={t.official_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium hover:bg-surface">
              Ouvrir l’outil <ExternalLink size={14} aria-hidden /> <span className="sr-only">(nouvelle fenêtre)</span>
            </a>
          )}
          <Button size="sm" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? 'Moins' : 'Détails'}
          </Button>
          {editable && (
            <Button size="sm" onClick={onEdit}>
              Modifier
            </Button>
          )}
        </div>
      </div>
      {open && (
        <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 text-sm">
          <Item k="Prise en main" v={t.quick_start} />
          <Item k="Compte nécessaire" v={t.account_required} />
          <Item k="Conditions tarifaires" v={t.pricing_note} />
          <Item k="Limites" v={t.limits} />
          <Item k="Formats utiles" v={t.formats} />
          <Item k="Précautions" v={t.precautions} />
          <Item k="Solution de secours" v={t.fallback} />
          <div>
            <dt className="font-semibold">Conditions et confidentialité</dt>
            <dd>
              {t.terms_url ? <a className="underline text-brand-700" href={t.terms_url} target="_blank" rel="noopener noreferrer">Conditions</a> : '—'} ·{' '}
              {t.privacy_url ? <a className="underline text-brand-700" href={t.privacy_url} target="_blank" rel="noopener noreferrer">Confidentialité</a> : '—'}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Dernière vérification</dt>
            <dd>
              {verified ? formatDate(t.last_verified_on) : 'Aucune'}
              {t.verification_source && (
                <>
                  {' '}· <a className="underline text-brand-700" href={t.verification_source} target="_blank" rel="noopener noreferrer">source</a>
                </>
              )}
              <span className="block text-muted">Fiche version {t.version}. Aucun de ces éléments ne prouve à lui seul une conformité RGPD.</span>
            </dd>
          </div>
        </dl>
      )}
    </Card>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  if (!v) return null;
  return (
    <div>
      <dt className="font-semibold">{k}</dt>
      <dd className="whitespace-pre-line">{v}</dd>
    </div>
  );
}

const EMPTY_CARD: ToolCardInput = {
  family: 'assistants',
  name: '',
  official_url: '',
  usage: '',
  quick_start: '',
  authorization_status: 'to_validate',
  account_required: '',
  pricing_status: 'unknown',
  pricing_note: '',
  limits: '',
  formats: '',
  precautions: '',
  terms_url: '',
  privacy_url: '',
  fallback: '',
  last_verified_on: null,
  verification_source: '',
  is_fallback: false,
};

export function ToolCardEditor({ card, onClose, onSaved }: { card: ToolCard | null; onClose: () => void; onSaved: () => void }) {
  const { backend } = useAuth();
  const toast = useToast();
  const [v, setV] = useState<ToolCardInput>(card ? { ...card } : EMPTY_CARD);
  const [history, setHistory] = useState<ToolCardHistory[] | null>(null);
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof ToolCardInput>(k: K, val: ToolCardInput[K]) => setV((x) => ({ ...x, [k]: val }));
  const save = async () => {
    setBusy(true);
    try {
      if (!v.name.trim()) throw new Error('Le nom est obligatoire');
      if (v.last_verified_on && !v.verification_source.trim()) throw new Error('Indiquez la source consultée pour dater une vérification');
      if (card) await backend.updateToolCard(card.id, v);
      else await backend.createToolCard(v);
      toast('Fiche outil enregistrée.', 'success');
      onSaved();
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error');
    } finally {
      setBusy(false);
    }
  };
  const text = (k: keyof ToolCardInput, label: string, hint?: string) => (
    <Field label={label} hint={hint}>{(id) => <Textarea id={id} value={String(v[k] ?? '')} onChange={(e) => set(k, e.target.value as never)} className="min-h-[4rem]" />}</Field>
  );
  return (
    <Modal open onClose={onClose} title={card ? `Modifier « ${card.name} »` : 'Nouvelle fiche outil'} wide>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Nom" required>{(id) => <Input id={id} value={v.name} onChange={(e) => set('name', e.target.value)} />}</Field>
        <Field label="Famille d’usage">
          {(id) => (
            <Select id={id} value={v.family} onChange={(e) => set('family', e.target.value as Family)}>
              {FAMILIES.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
            </Select>
          )}
        </Field>
        <Field label="Lien officiel">{(id) => <Input id={id} type="url" value={v.official_url} onChange={(e) => set('official_url', e.target.value)} />}</Field>
        <Field label="Statut d’autorisation">
          {(id) => (
            <Select id={id} value={v.authorization_status} onChange={(e) => set('authorization_status', e.target.value as ToolCard['authorization_status'])}>
              <option value="authorized">Autorisé</option>
              <option value="to_validate">À valider par la structure</option>
              <option value="not_authorized">Non autorisé</option>
            </Select>
          )}
        </Field>
        <Field label="Version gratuite / essai / licence">
          {(id) => (
            <Select id={id} value={v.pricing_status} onChange={(e) => set('pricing_status', e.target.value as ToolCard['pricing_status'])}>
              {Object.entries(PRICING_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </Select>
          )}
        </Field>
        <Field label="Compte nécessaire">{(id) => <Input id={id} value={v.account_required} onChange={(e) => set('account_required', e.target.value)} />}</Field>
        <div className="md:col-span-2">{text('usage', 'Usage')}</div>
        <div className="md:col-span-2">{text('quick_start', 'Prise en main courte')}</div>
        {text('pricing_note', 'Précision tarifaire (selon vérification)')}
        {text('limits', 'Limites')}
        {text('formats', 'Formats utiles')}
        {text('precautions', 'Précautions')}
        <div className="md:col-span-2">{text('fallback', 'Solution de secours')}</div>
        <Field label="Lien conditions d’utilisation">{(id) => <Input id={id} type="url" value={v.terms_url} onChange={(e) => set('terms_url', e.target.value)} />}</Field>
        <Field label="Lien confidentialité">{(id) => <Input id={id} type="url" value={v.privacy_url} onChange={(e) => set('privacy_url', e.target.value)} />}</Field>
        <Field label="Date de dernière vérification" hint="Laisser vide tant qu’aucune vérification réelle n’a été faite : la fiche restera « à vérifier ».">
          {(id) => <Input id={id} type="date" value={v.last_verified_on ?? ''} onChange={(e) => set('last_verified_on', e.target.value || null)} />}
        </Field>
        <Field label="Source de la vérification (URL)">{(id) => <Input id={id} type="url" value={v.verification_source} onChange={(e) => set('verification_source', e.target.value)} />}</Field>
        <label className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" className="h-5 w-5 accent-brand-600" checked={v.is_fallback} onChange={(e) => set('is_fallback', e.target.checked)} /> Cette fiche est la solution de secours de sa famille
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-between">
        <div className="flex gap-2">
          <Button variant="primary" onClick={save} busy={busy}>Enregistrer</Button>
          <Button onClick={onClose}>Annuler</Button>
        </div>
        {card && (
          <Button onClick={async () => setHistory(await backend.listToolCardHistory(card.id))}>Historique ({card.version - 1} modification{card.version > 2 ? 's' : ''})</Button>
        )}
      </div>
      {history && (
        <div className="mt-4 border-t border-line pt-3">
          <h3 className="font-semibold">Historique des versions</h3>
          {history.length === 0 ? <p className="text-muted text-sm">Aucune modification antérieure.</p> : (
            <ul className="text-sm space-y-1 mt-1">
              {history.map((h) => (
                <li key={h.id}>
                  Version {h.version} — {formatDate(h.changed_at, true)} : {h.snapshot.name}, {AUTH_LABEL[h.snapshot.authorization_status].text}, {h.snapshot.last_verified_on ? `vérifiée le ${formatDate(h.snapshot.last_verified_on)}` : 'non vérifiée'}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Modal>
  );
}

export function ToolsPage() {
  const { backend, profile } = useAuth();
  const tools = useAsync(() => backend.listToolCards(), [backend]);
  const [editing, setEditing] = useState<ToolCard | null | 'new'>(null);
  const trainer = profile?.role === 'trainer';
  const byFamily = useMemo(() => {
    const m = new Map<Family, ToolCard[]>();
    for (const t of tools.data ?? []) m.set(t.family, [...(m.get(t.family) ?? []), t]);
    return m;
  }, [tools.data]);
  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl font-semibold">Bibliothèque d’outils</h1>
          <p className="text-muted">Choix pédagogiques adaptables, pas six outils imposés. Chaque fiche indique si l’outil est autorisé ou à valider par votre structure, et la date de sa dernière vérification.</p>
        </div>
        {trainer && <Button variant="primary" onClick={() => setEditing('new')}>Ajouter une fiche</Button>}
      </div>
      {tools.loading ? <Loading /> : (
        FAMILIES.map((f) => (
          <section key={f.key} className="mt-6">
            <h2 className="text-xl font-semibold mb-1">{f.label}</h2>
            <p className="text-muted text-sm mb-3">{f.verb}</p>
            <div className="grid gap-3 lg:grid-cols-2">
              {(byFamily.get(f.key) ?? []).map((t) => <ToolCardView key={t.id} t={t} editable={trainer} onEdit={() => setEditing(t)} />)}
            </div>
          </section>
        ))
      )}
      {editing && <ToolCardEditor card={editing === 'new' ? null : editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); void tools.reload(); }} />}
    </AppShell>
  );
}

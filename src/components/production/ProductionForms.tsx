/**
 * Formulaires de production propres à chaque type d'atelier.
 * Les données structurées sont stockées dans `SubmissionContent.extra`.
 */
import { Printer, Plus, Trash2 } from 'lucide-react';
import type { DataCard, PublishedWorkshopContent, Variant } from '../../lib/types';
import { Button, Checkbox, Field, Input, Select, Textarea, cx } from '../ui';

type Extra = Record<string, unknown>;
interface FormProps {
  content: PublishedWorkshopContent;
  extra: Extra;
  onExtra: (e: Extra) => void;
  disabled?: boolean;
}

function get<T>(extra: Extra, key: string, fallback: T): T {
  const v = extra[key];
  return (v === undefined || v === null ? fallback : v) as T;
}

export function wordCount(s: string): number {
  return s.trim() ? s.trim().split(/\s+/).length : 0;
}

// --- Défi données -----------------------------------------------------------
type SortChoice = 'ok' | 'conditions' | 'non' | '';
export function DataSortForm({ content, extra, onExtra, disabled }: FormProps) {
  const cards: DataCard[] = content.data_cards ?? [];
  const sort = get<Record<string, SortChoice>>(extra, 'sort', {});
  const why = get<Record<string, string>>(extra, 'why', {});
  const real = get<{ authorization_status: string; purpose: string; protection: string }>(extra, 'real_conditions', { authorization_status: '', purpose: '', protection: '' });
  const setSort = (id: string, v: SortChoice) => onExtra({ ...extra, sort: { ...sort, [id]: v } });
  const setWhy = (id: string, v: string) => onExtra({ ...extra, why: { ...why, [id]: v } });
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">Pour chaque carte, décidez si l’information peut être transmise à un outil IA externe, puis justifiez en une phrase.</p>
      <ol className="space-y-3">
        {cards.map((c) => (
          <li key={c.id} className="rounded-md border border-line p-3 bg-white">
            <div className="font-medium">{c.label}</div>
            <div className="text-sm text-muted mb-2">{c.detail}</div>
            <div className="grid gap-2 md:grid-cols-[14rem_1fr]">
              <Select aria-label={`Décision pour ${c.label}`} value={sort[c.id] ?? ''} disabled={disabled} onChange={(e) => setSort(c.id, e.target.value as SortChoice)}>
                <option value="">— choisir —</option>
                <option value="ok">Transmissible</option>
                <option value="conditions">Selon conditions</option>
                <option value="non">À ne pas transmettre</option>
              </Select>
              <Input aria-label={`Justification pour ${c.label}`} placeholder="Pourquoi ?" value={why[c.id] ?? ''} disabled={disabled} onChange={(e) => setWhy(c.id, e.target.value)} />
            </div>
          </li>
        ))}
      </ol>
      <div className="grid gap-3 md:grid-cols-3">
        <Field label="En situation réelle : quelle autorisation ?">{(id) => <Textarea id={id} value={real.authorization_status} disabled={disabled} onChange={(e) => onExtra({ ...extra, real_conditions: { ...real, authorization_status: e.target.value } })} />}</Field>
        <Field label="Quelle finalité ?">{(id) => <Textarea id={id} value={real.purpose} disabled={disabled} onChange={(e) => onExtra({ ...extra, real_conditions: { ...real, purpose: e.target.value } })} />}</Field>
        <Field label="Quelle protection ?">{(id) => <Textarea id={id} value={real.protection} disabled={disabled} onChange={(e) => onExtra({ ...extra, real_conditions: { ...real, protection: e.target.value } })} />}</Field>
      </div>
    </div>
  );
}

// --- Atelier 1 : compte rendu + tableau d'actions ---------------------------
interface ActionRow {
  action: string;
  owner: string;
  due: string;
}
export function ReportActionsForm({ extra, onExtra, disabled }: FormProps) {
  const actions = get<ActionRow[]>(extra, 'actions', [{ action: '', owner: '', due: '' }, { action: '', owner: '', due: '' }, { action: '', owner: '', due: '' }]);
  const correction = get<string>(extra, 'correction_v1_v2', '');
  const setRow = (i: number, patch: Partial<ActionRow>) => onExtra({ ...extra, actions: actions.map((r, j) => (j === i ? { ...r, ...patch } : r)) });
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-1">Tableau action / responsable / échéance</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="pr-2">Action</th>
              <th className="pr-2">Responsable</th>
              <th className="pr-2">Échéance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {actions.map((r, i) => (
              <tr key={i}>
                <td className="pr-2 py-1"><Input aria-label={`Action ${i + 1}`} value={r.action} disabled={disabled} onChange={(e) => setRow(i, { action: e.target.value })} /></td>
                <td className="pr-2 py-1"><Input aria-label={`Responsable ${i + 1}`} value={r.owner} disabled={disabled} onChange={(e) => setRow(i, { owner: e.target.value })} /></td>
                <td className="pr-2 py-1"><Input aria-label={`Échéance ${i + 1}`} type="date" value={r.due} disabled={disabled} onChange={(e) => setRow(i, { due: e.target.value })} /></td>
                <td className="py-1">
                  <Button size="sm" variant="ghost" disabled={disabled || actions.length <= 1} aria-label={`Supprimer la ligne ${i + 1}`} onClick={() => onExtra({ ...extra, actions: actions.filter((_, j) => j !== i) })}>
                    <Trash2 size={14} aria-hidden />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button size="sm" className="mt-2" disabled={disabled} onClick={() => onExtra({ ...extra, actions: [...actions, { action: '', owner: '', due: '' }] })}>
          <Plus size={14} aria-hidden /> Ajouter une action
        </Button>
      </div>
      <Field label="Une correction justifiée entre V1 et V2" hint="Quel détail avez-vous corrigé par rapport à la première sortie, et pourquoi (en citant la transcription) ?">
        {(id) => <Textarea id={id} value={correction} disabled={disabled} onChange={(e) => onExtra({ ...extra, correction_v1_v2: e.target.value })} />}
      </Field>
    </div>
  );
}

// --- Atelier 2 : FAQ avec sources ------------------------------------------
interface FaqRow {
  question: string;
  answer: string;
  source: string;
  passage: string;
  checked: boolean;
}
const FAQ_QUESTIONS = ['Horaires actuels de la mission', 'Conduite d’engin prévue ?', 'Étapes de la procédure d’accueil', 'Rémunération', 'Adresse exacte du site'];
export function FaqSourcesForm({ extra, onExtra, disabled }: FormProps) {
  const rows = get<FaqRow[]>(extra, 'faq', FAQ_QUESTIONS.map((q) => ({ question: q, answer: '', source: '', passage: '', checked: false })));
  const setRow = (i: number, patch: Partial<FaqRow>) => onExtra({ ...extra, faq: rows.map((r, j) => (j === i ? { ...r, ...patch } : r)) });
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">Une réponse qui cite un document n’est pas automatiquement vraie : ouvrez le passage et cochez « vérifié » seulement après l’avoir lu.</p>
      {rows.map((r, i) => (
        <div key={i} className="rounded-md border border-line p-3 bg-white space-y-2">
          <div className="font-medium">{i + 1}. {r.question}</div>
          <div className="grid gap-2 md:grid-cols-2">
            <Field label="Réponse" hint="Écrivez « information non disponible » si le document ne le dit pas.">{(id) => <Textarea id={id} className="min-h-[3rem]" value={r.answer} disabled={disabled} onChange={(e) => setRow(i, { answer: e.target.value })} />}</Field>
            <Field label="Document, version et rubrique">{(id) => <Input id={id} value={r.source} disabled={disabled} onChange={(e) => setRow(i, { source: e.target.value })} placeholder="ex. R2 — Fiche mission V2 du 18/09/2026, rubrique Présence" />}</Field>
            <Field label="Passage justificatif (copié)">{(id) => <Textarea id={id} className="min-h-[3rem]" value={r.passage} disabled={disabled} onChange={(e) => setRow(i, { passage: e.target.value })} />}</Field>
            <div className="pt-6"><Checkbox label="Vérification humaine : j’ai ouvert le document et relu le passage" checked={r.checked} disabled={disabled} onChange={(v) => setRow(i, { checked: v })} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Atelier 3 : fiche de visite -------------------------------------------
interface SourceRow {
  url: string;
  published: string;
  consulted: string;
  note: string;
  capture: boolean;
}
export function VisitSheetForm({ extra, onExtra, disabled }: FormProps) {
  const target = get<string>(extra, 'target', '');
  const territory = get<string>(extra, 'territory', '');
  const facts = get<string>(extra, 'facts', '');
  const hypotheses = get<string>(extra, 'hypotheses', '');
  const questions = get<string[]>(extra, 'questions', ['', '', '', '', '']);
  const uncertainties = get<string[]>(extra, 'uncertainties', ['', '']);
  const sources = get<SourceRow[]>(extra, 'sources', [{ url: '', published: '', consulted: '', note: '', capture: false }, { url: '', published: '', consulted: '', note: '', capture: false }, { url: '', published: '', consulted: '', note: '', capture: false }]);
  const verification = get<string>(extra, 'verification', '');
  const partial = get<boolean>(extra, 'partial', false);
  const setSource = (i: number, patch: Partial<SourceRow>) => onExtra({ ...extra, sources: sources.map((s, j) => (j === i ? { ...s, ...patch } : s)) });
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Entreprise publique identifiée ou secteur" hint="Aucune donnée privée de dirigeants ou de salariés.">{(id) => <Input id={id} value={target} disabled={disabled} onChange={(e) => onExtra({ ...extra, target: e.target.value })} />}</Field>
        <Field label="Territoire / bassin d’emploi">{(id) => <Input id={id} value={territory} disabled={disabled} onChange={(e) => onExtra({ ...extra, territory: e.target.value })} />}</Field>
      </div>
      <Field label="Faits sourcés" hint="Chaque donnée déterminante renvoie à une page consultée (tableau ci-dessous).">{(id) => <Textarea id={id} value={facts} disabled={disabled} onChange={(e) => onExtra({ ...extra, facts: e.target.value })} />}</Field>
      <Field label="Hypothèses (clairement identifiées comme telles)">{(id) => <Textarea id={id} value={hypotheses} disabled={disabled} onChange={(e) => onExtra({ ...extra, hypotheses: e.target.value })} />}</Field>
      <fieldset>
        <legend className="font-medium mb-1">Cinq questions à poser au client</legend>
        <div className="space-y-1">
          {['Tâches', 'Compétences', 'Horaires', 'Accès au site', 'Prochaines étapes'].map((theme, i) => (
            <Input key={i} aria-label={`Question ${i + 1} (${theme})`} placeholder={`${i + 1}. ${theme}`} value={questions[i] ?? ''} disabled={disabled} onChange={(e) => onExtra({ ...extra, questions: questions.map((q, j) => (j === i ? e.target.value : q)) })} />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="font-medium mb-1">Deux incertitudes</legend>
        <div className="space-y-1">
          {[0, 1].map((i) => (
            <Input key={i} aria-label={`Incertitude ${i + 1}`} value={uncertainties[i] ?? ''} disabled={disabled} onChange={(e) => onExtra({ ...extra, uncertainties: uncertainties.map((q, j) => (j === i ? e.target.value : q)) })} />
          ))}
        </div>
      </fieldset>
      <div>
        <h4 className="font-semibold mb-1">Sources consultées (trois minimum)</h4>
        <div className="space-y-2">
          {sources.map((s, i) => (
            <div key={i} className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_2fr_auto] items-end rounded-md border border-line p-2">
              <Field label="Page précise (URL)">{(id) => <Input id={id} type="url" value={s.url} disabled={disabled} onChange={(e) => setSource(i, { url: e.target.value })} />}</Field>
              <Field label="Date de publication">{(id) => <Input id={id} value={s.published} disabled={disabled} placeholder="si disponible" onChange={(e) => setSource(i, { published: e.target.value })} />}</Field>
              <Field label="Date de consultation">{(id) => <Input id={id} type="date" value={s.consulted} disabled={disabled} onChange={(e) => setSource(i, { consulted: e.target.value })} />}</Field>
              <Field label="Information retenue / passage exact">{(id) => <Input id={id} value={s.note} disabled={disabled} onChange={(e) => setSource(i, { note: e.target.value })} />}</Field>
              <div className="pb-1"><Checkbox label="Capture fournie par le formateur" checked={s.capture} disabled={disabled} onChange={(v) => setSource(i, { capture: v })} /></div>
            </div>
          ))}
        </div>
        <Button size="sm" className="mt-2" disabled={disabled} onClick={() => onExtra({ ...extra, sources: [...sources, { url: '', published: '', consulted: '', note: '', capture: false }] })}><Plus size={14} aria-hidden /> Ajouter une source</Button>
      </div>
      <Field label="Exercice de vérification" hint="Une affirmation de l’IA, le passage exact qui la justifie, ou la correction / suppression si la source ne la soutient pas.">{(id) => <Textarea id={id} value={verification} disabled={disabled} onChange={(e) => onExtra({ ...extra, verification: e.target.value })} />}</Field>
      <Checkbox label="Production partielle : pas de connexion ou de dossier de captures disponible (aucune source n’a été fabriquée)" checked={partial} disabled={disabled} onChange={(v) => onExtra({ ...extra, partial: v })} />
    </div>
  );
}

// --- Atelier 4 : six blocs éditables (secours sans moteur génératif) --------
interface Block {
  title: string;
  detail: string;
  validation: boolean;
  unknown: string;
}
const DEFAULT_BLOCKS: Block[] = Array.from({ length: 6 }, (_, i) => ({ title: `Étape ${i + 1}`, detail: '', validation: i === 3, unknown: '' }));
export function ProcessBlocksForm({ extra, onExtra, disabled }: FormProps) {
  const blocks = get<Block[]>(extra, 'blocks', DEFAULT_BLOCKS);
  const explanation = get<string>(extra, 'visual_choice', '');
  const peer = get<string>(extra, 'peer_check', '');
  const setBlock = (i: number, patch: Partial<Block>) => onExtra({ ...extra, blocks: blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)) });
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">Si vous utilisez Napkin ou un outil de schématisation autorisé, déposez le PNG/PDF ci-dessous. Sinon, les six blocs ci-dessous forment votre schéma : ils s’impriment en PDF depuis le navigateur.</p>
      <ol className="grid gap-2 md:grid-cols-2 print:block" id="process-blocks">
        {blocks.map((b, i) => (
          <li key={i} className={cx('rounded-lg border-2 p-3 bg-white', b.validation ? 'border-accent' : 'border-brand-500')}>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-brand-600 text-white w-7 h-7 inline-flex items-center justify-center font-bold" aria-hidden>{i + 1}</span>
              <Input aria-label={`Titre du bloc ${i + 1}`} value={b.title} disabled={disabled} onChange={(e) => setBlock(i, { title: e.target.value })} className="font-semibold" />
            </div>
            <Textarea aria-label={`Contenu du bloc ${i + 1}`} className="min-h-[3rem]" placeholder="Verbe simple, libellé court" value={b.detail} disabled={disabled} onChange={(e) => setBlock(i, { detail: e.target.value })} />
            <div className="mt-1 grid gap-1 sm:grid-cols-2">
              <Checkbox label="Point de validation humaine" checked={b.validation} disabled={disabled} onChange={(v) => setBlock(i, { validation: v })} />
              <Input aria-label={`Inconnue à attribuer (bloc ${i + 1})`} placeholder="Inconnue → responsable" value={b.unknown} disabled={disabled} onChange={(e) => setBlock(i, { unknown: e.target.value })} />
            </div>
          </li>
        ))}
      </ol>
      <Button onClick={() => window.print()} className="no-print"><Printer size={16} aria-hidden /> Imprimer les six blocs (PDF via le navigateur)</Button>
      <Field label="Courte explication du choix visuel">{(id) => <Textarea id={id} value={explanation} disabled={disabled} onChange={(e) => onExtra({ ...extra, visual_choice: e.target.value })} />}</Field>
      <Field label="Compréhension contrôlée par un autre participant" hint="Qui a relu (prénom) et ce qu’il ou elle a compris ou pas.">{(id) => <Textarea id={id} value={peer} disabled={disabled} onChange={(e) => onExtra({ ...extra, peer_check: e.target.value })} />}</Field>
    </div>
  );
}

// --- Atelier 5 : affiche inclusive -----------------------------------------
export function PosterForm({ extra, onExtra, disabled }: FormProps) {
  const messages = get<string[]>(extra, 'messages', ['', '', '']);
  const imageDescription = get<string>(extra, 'image_description', '');
  const altText = get<string>(extra, 'alt_text', '');
  const accessibleText = get<string>(extra, 'accessible_text', '');
  const rights = get<{ source: string; license: string; generated: boolean }>(extra, 'rights', { source: '', license: '', generated: false });
  const checks = get<{ contrast: boolean; no_invented: boolean; peer_tested: boolean; text_checked: boolean }>(extra, 'checks', { contrast: false, no_invented: false, peer_tested: false, text_checked: false });
  const setChecks = (patch: Partial<typeof checks>) => onExtra({ ...extra, checks: { ...checks, ...patch } });
  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="font-medium mb-1">Trois messages courts (vérifier les horaires, préparer les questions, confirmer le trajet)</legend>
        <div className="space-y-1">
          {[0, 1, 2].map((i) => (
            <Input key={i} aria-label={`Message ${i + 1}`} value={messages[i] ?? ''} disabled={disabled} onChange={(e) => onExtra({ ...extra, messages: messages.map((m, j) => (j === i ? e.target.value : m)) })} />
          ))}
        </div>
      </fieldset>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Description de l’image (ce qu’elle montre)">{(id) => <Textarea id={id} value={imageDescription} disabled={disabled} onChange={(e) => onExtra({ ...extra, image_description: e.target.value })} />}</Field>
        <Field label="Texte alternatif court (pour les lecteurs d’écran)">{(id) => <Textarea id={id} value={altText} disabled={disabled} onChange={(e) => onExtra({ ...extra, alt_text: e.target.value })} />}</Field>
      </div>
      <Field label="Texte accessible séparé (version texte complète de l’affiche)">{(id) => <Textarea id={id} value={accessibleText} disabled={disabled} onChange={(e) => onExtra({ ...extra, accessible_text: e.target.value })} />}</Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Origine de l’illustration" hint="Outil de génération, pictogrammes, formes simples…">{(id) => <Input id={id} value={rights.source} disabled={disabled} onChange={(e) => onExtra({ ...extra, rights: { ...rights, source: e.target.value } })} />}</Field>
        <Field label="Droits d’usage / licence examinés">{(id) => <Input id={id} value={rights.license} disabled={disabled} onChange={(e) => onExtra({ ...extra, rights: { ...rights, license: e.target.value } })} />}</Field>
      </div>
      <div className="grid gap-1 sm:grid-cols-2">
        <Checkbox label="Texte relu, sans erreur" checked={checks.text_checked} disabled={disabled} onChange={(v) => setChecks({ text_checked: v })} />
        <Checkbox label="Contraste suffisant vérifié" checked={checks.contrast} disabled={disabled} onChange={(v) => setChecks({ contrast: v })} />
        <Checkbox label="Aucun contact, lieu, salaire ou date inventé" checked={checks.no_invented} disabled={disabled} onChange={(v) => setChecks({ no_invented: v })} />
        <Checkbox label="Compréhension testée avec un autre participant" checked={checks.peer_tested} disabled={disabled} onChange={(v) => setChecks({ peer_tested: v })} />
      </div>
      <p className="text-xs text-muted">Aucun label FALC ni accessibilité certifiée n’est revendiqué : ces cases décrivent vos contrôles, pas une certification.</p>
    </div>
  );
}

// --- Atelier 6 : comparaison de deux assistants ----------------------------
interface AssistantRun {
  tool: string;
  model: string;
  date: string;
  settings: string;
  web_search: string;
  attachments: string;
  output: string;
  is_example: boolean;
}
const CRITERIA = ['Fidélité aux faits', 'Qualité du texte', 'Erreurs relevées', 'Facilité de correction', 'Accessibilité', 'Conditions d’accès', 'Adéquation aux règles de la structure'];
const EMPTY_RUN: AssistantRun = { tool: '', model: '', date: '', settings: '', web_search: '', attachments: '', output: '', is_example: false };
export function ComparisonForm({ extra, onExtra, disabled }: FormProps) {
  const a = get<AssistantRun>(extra, 'assistant_a', EMPTY_RUN);
  const b = get<AssistantRun>(extra, 'assistant_b', EMPTY_RUN);
  const scores = get<Record<string, { a: number; b: number; note: string }>>(extra, 'scores', {});
  const decision = get<string>(extra, 'decision', '');
  const RunForm = ({ run, k, label }: { run: AssistantRun; k: 'assistant_a' | 'assistant_b'; label: string }) => {
    const set = (patch: Partial<AssistantRun>) => onExtra({ ...extra, [k]: { ...run, ...patch } });
    return (
      <div className="rounded-md border border-line p-3 bg-white space-y-2">
        <h4 className="font-semibold">{label}</h4>
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Nom de l’outil">{(id) => <Input id={id} value={run.tool} disabled={disabled} onChange={(e) => set({ tool: e.target.value })} />}</Field>
          <Field label="Modèle (si visible)">{(id) => <Input id={id} value={run.model} disabled={disabled} onChange={(e) => set({ model: e.target.value })} placeholder="laisser vide si inconnu" />}</Field>
          <Field label="Date du test">{(id) => <Input id={id} type="date" value={run.date} disabled={disabled} onChange={(e) => set({ date: e.target.value })} />}</Field>
          <Field label="Réglages connus">{(id) => <Input id={id} value={run.settings} disabled={disabled} onChange={(e) => set({ settings: e.target.value })} />}</Field>
          <Field label="Recherche web ?">{(id) => <Input id={id} value={run.web_search} disabled={disabled} onChange={(e) => set({ web_search: e.target.value })} placeholder="activée / désactivée / inconnue" />}</Field>
          <Field label="Pièces jointes ?">{(id) => <Input id={id} value={run.attachments} disabled={disabled} onChange={(e) => set({ attachments: e.target.value })} placeholder="R2 jointe / collée dans le prompt" />}</Field>
        </div>
        <Field label="Sortie obtenue (texte intégral)">{(id) => <Textarea id={id} value={run.output} disabled={disabled} onChange={(e) => set({ output: e.target.value })} />}</Field>
        <p className="text-xs text-muted">{wordCount(run.output)} mots (120 maximum attendus).</p>
        <Checkbox label="Il s’agit d’une réponse d’exemple fournie par le formateur (pas d’un test réel)" checked={run.is_example} disabled={disabled} onChange={(v) => set({ is_example: v })} />
      </div>
    );
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-2">
        <RunForm run={a} k="assistant_a" label="Assistant A" />
        <RunForm run={b} k="assistant_b" label="Assistant B" />
      </div>
      <div>
        <h4 className="font-semibold mb-1">Tableau comparatif (0 = insuffisant, 1 = acceptable, 2 = bon)</h4>
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>Critère</th><th>A</th><th>B</th><th>Remarque</th></tr></thead>
          <tbody>
            {CRITERIA.map((c) => {
              const s = scores[c] ?? { a: 0, b: 0, note: '' };
              const set = (patch: Partial<typeof s>) => onExtra({ ...extra, scores: { ...scores, [c]: { ...s, ...patch } } });
              return (
                <tr key={c}>
                  <td className="py-1 pr-2">{c}</td>
                  <td className="py-1 pr-2"><Select aria-label={`${c} — A`} value={s.a} disabled={disabled} onChange={(e) => set({ a: Number(e.target.value) })}><option value={0}>0</option><option value={1}>1</option><option value={2}>2</option></Select></td>
                  <td className="py-1 pr-2"><Select aria-label={`${c} — B`} value={s.b} disabled={disabled} onChange={(e) => set({ b: Number(e.target.value) })}><option value={0}>0</option><option value={1}>1</option><option value={2}>2</option></Select></td>
                  <td className="py-1"><Input aria-label={`${c} — remarque`} value={s.note} disabled={disabled} onChange={(e) => set({ note: e.target.value })} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Field label="Décision expliquée" hint="Valable pour cette tâche et ce test uniquement : aucun classement universel des assistants.">{(id) => <Textarea id={id} value={decision} disabled={disabled} onChange={(e) => onExtra({ ...extra, decision: e.target.value })} />}</Field>
    </div>
  );
}

// --- Défi individuel --------------------------------------------------------
export function IndividualChallengeForm({ content, extra, onExtra, disabled }: FormProps) {
  const variants: Variant[] = content.variants ?? [];
  const variantId = get<string>(extra, 'variant_id', '');
  const f = get<Record<string, string>>(extra, 'fields', {});
  const set = (k: string, v: string) => onExtra({ ...extra, fields: { ...f, [k]: v } });
  const fields: [string, string, string?][] = [
    ['usage', 'Usage choisi', 'Quelle famille d’usage et quel livrable vous adaptez.'],
    ['tool', 'Outil utilisé'],
    ['prompt', 'Prompt exact'],
    ['initial_result', 'Résultat initial'],
    ['risk', 'Erreur ou risque détecté'],
    ['correction', 'Correction apportée'],
    ['final_result', 'Résultat final'],
    ['elements_cited', 'Éléments du cas utilisés (ressources, passages)'],
    ['check1', 'Contrôle n° 1 effectué'],
    ['check2', 'Contrôle n° 2 effectué'],
  ];
  return (
    <div className="space-y-3">
      <Field label="Ma variante du cas" hint="Attribuée par le formateur ou choisie ici.">
        {(id) => (
          <Select id={id} value={variantId} disabled={disabled} onChange={(e) => onExtra({ ...extra, variant_id: e.target.value })}>
            <option value="">— choisir —</option>
            {variants.map((v) => <option key={v.id} value={v.id}>{v.title}</option>)}
          </Select>
        )}
      </Field>
      {variantId && variants.find((v) => v.id === variantId) && (
        <div className="rounded-md bg-brand-50 border border-brand-100 p-3 text-sm">
          <strong>Changement :</strong> {variants.find((v) => v.id === variantId)!.change}
          <br />
          <strong>Livrable attendu :</strong> {variants.find((v) => v.id === variantId)!.deliverable_hint}
        </div>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        {fields.map(([k, label, hint]) => (
          <Field key={k} label={label} hint={hint}>{(id) => <Textarea id={id} className="min-h-[3.5rem]" value={f[k] ?? ''} disabled={disabled} onChange={(e) => set(k, e.target.value)} />}</Field>
        ))}
      </div>
    </div>
  );
}

// --- Réactivation / bilan ---------------------------------------------------
export function ReviewForm({ extra, onExtra, disabled }: FormProps) {
  const kept = get<string>(extra, 'kept', '');
  const revisit = get<string>(extra, 'revisit', '');
  const next = get<string>(extra, 'next', '');
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Field label="Ce que j’ai retenu">{(id) => <Textarea id={id} value={kept} disabled={disabled} onChange={(e) => onExtra({ ...extra, kept: e.target.value })} />}</Field>
      <Field label="Ce que je veux revoir">{(id) => <Textarea id={id} value={revisit} disabled={disabled} onChange={(e) => onExtra({ ...extra, revisit: e.target.value })} />}</Field>
      <Field label="Ce que je ferai différemment">{(id) => <Textarea id={id} value={next} disabled={disabled} onChange={(e) => onExtra({ ...extra, next: e.target.value })} />}</Field>
    </div>
  );
}

export function ProductionForm(props: FormProps) {
  switch (props.content.production_kind) {
    case 'data_sort':
      return <DataSortForm {...props} />;
    case 'report_actions':
      return <ReportActionsForm {...props} />;
    case 'faq_sources':
      return <FaqSourcesForm {...props} />;
    case 'visit_sheet':
      return <VisitSheetForm {...props} />;
    case 'process_blocks':
      return <ProcessBlocksForm {...props} />;
    case 'poster':
      return <PosterForm {...props} />;
    case 'comparison':
      return <ComparisonForm {...props} />;
    case 'individual_challenge':
      return <IndividualChallengeForm {...props} />;
    case 'review':
      return <ReviewForm {...props} />;
    default:
      return null;
  }
}

/** Rendu en lecture seule (revue formateur, portfolio, exemples partagés). */
export function ProductionReadOnly({ content, extra }: { content: PublishedWorkshopContent; extra: Extra }) {
  const entries = Object.entries(extra ?? {});
  if (!entries.length) return null;
  const render = (v: unknown): string => {
    if (v === null || v === undefined || v === '') return '—';
    if (typeof v === 'boolean') return v ? 'oui' : 'non';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    if (Array.isArray(v)) return v.map((x) => (typeof x === 'object' && x ? Object.entries(x as Record<string, unknown>).map(([k, val]) => `${k} : ${render(val)}`).join(' · ') : render(x))).join('\n');
    return Object.entries(v as Record<string, unknown>).map(([k, val]) => `${k} : ${render(val)}`).join('\n');
  };
  const labels: Record<string, string> = {
    sort: 'Tri des cartes', why: 'Justifications', real_conditions: 'Conditions en situation réelle', actions: 'Tableau d’actions', correction_v1_v2: 'Correction V1 → V2', faq: 'FAQ',
    target: 'Entreprise / secteur', territory: 'Territoire', facts: 'Faits sourcés', hypotheses: 'Hypothèses', questions: 'Questions client', uncertainties: 'Incertitudes', sources: 'Sources', verification: 'Vérification', partial: 'Production partielle',
    blocks: 'Six blocs', visual_choice: 'Choix visuel', peer_check: 'Contrôle par un pair', messages: 'Messages', image_description: 'Description de l’image', alt_text: 'Texte alternatif', accessible_text: 'Texte accessible', rights: 'Droits', checks: 'Contrôles',
    assistant_a: 'Assistant A', assistant_b: 'Assistant B', scores: 'Comparaison', decision: 'Décision', variant_id: 'Variante', fields: 'Défi individuel', kept: 'Retenu', revisit: 'À revoir', next: 'Prochaine fois',
  };
  const variantTitle = (id: unknown) => content.variants?.find((v) => v.id === id)?.title ?? String(id);
  return (
    <dl className="grid gap-2 text-sm">
      {entries.map(([k, v]) => (
        <div key={k} className="grid md:grid-cols-[12rem_1fr] gap-1 border-b border-line pb-1">
          <dt className="font-semibold">{labels[k] ?? k}</dt>
          <dd className="whitespace-pre-wrap">{k === 'variant_id' ? variantTitle(v) : k === 'sort' ? Object.entries(v as Record<string, string>).map(([cid, choice]) => `${content.data_cards?.find((c) => c.id === cid)?.label ?? cid} : ${choice === 'ok' ? 'transmissible' : choice === 'conditions' ? 'selon conditions' : choice === 'non' ? 'à ne pas transmettre' : '—'}`).join('\n') : render(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

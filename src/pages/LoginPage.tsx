import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Wrench, ShieldCheck, Users } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { Brand } from '../components/layout/AppShell';
import { Button, Field, Input, Notice, Tabs, useConfirm, useToast } from '../components/ui';
import { DemoBackend, DEMO_PASSWORD } from '../lib/backend/demo';
import { SUPABASE_CONFIGURED } from '../lib/backend';

export function LoginPage() {
  const { backend, user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const confirm = useConfirm();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  if (!loading && user && profile) {
    const from = (location.state as { from?: string } | null)?.from;
    return <Navigate to={from ?? (profile.role === 'trainer' ? '/t/sessions' : '/p')} replace />;
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (tab === 'login') {
        await backend.signIn(email, password);
        navigate('/');
      } else {
        if (password.length < 8) throw new Error('Mot de passe : 8 caractères minimum.');
        const r = await backend.signUp(email, password, name);
        if (r.needsConfirmation) setInfo('Compte créé. Vérifiez votre boîte e-mail pour confirmer l’adresse, puis connectez-vous.');
        else {
          toast('Compte créé.', 'success');
          navigate('/');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const demo = backend.kind === 'demo' ? (backend as DemoBackend) : null;
  const accounts = demo?.listDemoAccounts() ?? [];

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Panneau de gauche : identité et promesse du module */}
      <aside className="bg-brand-800 text-white px-6 py-8 sm:px-10 lg:px-14 lg:py-14 flex flex-col justify-between relative overflow-hidden">
        <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-600/40 blur-3xl" />
        <div aria-hidden className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          <Brand large light />
          <p className="eyebrow !text-brand-200 mt-10">Module 2 · intérim d’insertion</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.05] mt-3 max-w-xl">
            Construire sa boîte à outils IA et la déployer dans son agence.
          </h1>
          <p className="mt-5 text-brand-100 max-w-lg text-lg leading-relaxed">
            Sept heures pour transformer les écrits répétés du quotidien d’une ETTI en outils testés, documentés et prêts à proposer : commandes, délégations, suivi de mission, points prescripteur.
          </p>
          <ul className="mt-8 space-y-3 text-brand-50 max-w-lg">
            {[
              [Wrench, 'Six ateliers, six outils réutilisables avec leurs règles de données'],
              [CheckCircle2, 'Chaque outil est testé sur un cas fictif et vérifié avant d’être proposé'],
              [Users, 'Binômes, entraide en direct et validation par le formateur'],
              [ShieldCheck, 'Aucune donnée réelle de salarié ou de candidat : cas fictif uniquement'],
            ].map(([Icon, text], i) => (
              <li key={i} className="flex items-start gap-3">
                <Icon size={20} aria-hidden className="mt-0.5 shrink-0 text-brand-200" />
                <span>{text as string}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative mt-10 text-xs text-brand-200/80">Formation « Créer sa boîte à outils IA pour agir au quotidien en ETT / ETTI / EATT » · référence éditoriale septembre 2026</p>
      </aside>

      {/* Panneau de droite : connexion */}
      <main className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          <h2 className="font-display text-2xl font-semibold">{tab === 'login' ? 'Se connecter' : 'Créer un compte'}</h2>
          <p className="text-muted mt-1 mb-5">Le code de session vous sera demandé après connexion ; il ne remplace pas l’identification.</p>
          <Tabs label="Connexion ou inscription" value={tab} onChange={setTab} tabs={[{ key: 'login', label: 'Se connecter' }, { key: 'signup', label: 'Créer un compte' }]} />
          {!SUPABASE_CONFIGURED && backend.kind === 'demo' && (
            <Notice tone="warning" title="Mode démo">
              Aucun serveur n’est configuré : les données restent dans ce navigateur. Mot de passe des comptes de démonstration : <strong>{DEMO_PASSWORD}</strong>.
            </Notice>
          )}
          <form onSubmit={submit} className="space-y-4">
            {tab === 'signup' && (
              <Field label="Nom affiché" required hint="Prénom et initiale suffisent. Visible du formateur et de votre binôme.">
                {(id) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />}
              </Field>
            )}
            <Field label="E-mail" required>
              {(id) => <Input id={id} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />}
            </Field>
            <Field label="Mot de passe" required hint={tab === 'signup' ? '8 caractères minimum.' : undefined}>
              {(id) => <Input id={id} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={tab === 'signup' ? 'new-password' : 'current-password'} />}
            </Field>
            {error && <Notice tone="danger">{error}</Notice>}
            {info && <Notice tone="success">{info}</Notice>}
            <Button type="submit" variant="primary" size="lg" className="w-full" busy={busy}>
              {tab === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </Button>
            {tab === 'signup' && <p className="text-xs text-muted">Un nouveau compte est toujours « participant ». Le rôle formateur est attribué par l’organisme.</p>}
          </form>

          {demo && (
            <section className="mt-10 rounded-2xl border border-line bg-white p-5 shadow-card" aria-labelledby="demo-accounts">
              <h3 id="demo-accounts" className="font-display text-lg font-semibold">Comptes de démonstration</h3>
              <p className="text-sm text-muted mt-1 mb-3">Ouvrez deux onglets : le formateur dans l’un, un participant dans l’autre. Code de session : <span className="font-mono">DEMO26</span>.</p>
              <ul className="divide-y divide-line">
                {accounts.map((a) => (
                  <li key={a.email} className="flex items-center justify-between gap-3 py-2">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden className={`h-7 w-7 rounded-full inline-flex items-center justify-center text-xs font-bold ${a.role === 'trainer' ? 'bg-accent/15 text-accent-600' : 'bg-brand-100 text-brand-800'}`}>{a.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                      <span className="leading-tight">
                        <span className="block font-semibold text-sm">{a.name.replace(' (démo)', '')}</span>
                        <span className="block text-xs text-muted">{a.role === 'trainer' ? 'Formatrice' : 'Participant'}</span>
                      </span>
                    </span>
                    <Button size="sm" variant={a.role === 'trainer' ? 'primary' : 'secondary'} onClick={async () => { await backend.signIn(a.email, DEMO_PASSWORD); navigate('/'); }}>
                      Entrer
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-right">
                <Button size="sm" variant="ghost" onClick={async () => { if (await confirm('Réinitialiser toutes les données de démonstration de ce navigateur ?', { confirmLabel: 'Réinitialiser' })) { demo.resetDemo(); toast('Données de démonstration réinitialisées.', 'success'); } }}>
                  Réinitialiser la démo
                </Button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

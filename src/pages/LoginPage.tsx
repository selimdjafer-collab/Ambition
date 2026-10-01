import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { Brand } from '../components/layout/AppShell';
import { Button, Card, Field, Input, Notice, Tabs, useToast } from '../components/ui';
import { DemoBackend, DEMO_PASSWORD } from '../lib/backend/demo';
import { SUPABASE_CONFIGURED } from '../lib/backend';

export function LoginPage() {
  const { backend, user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center">
        <Brand large />
        <h1 className="text-2xl font-semibold mt-3">Atelier IA — START EVOLUTION</h1>
        <p className="text-muted mt-1 max-w-md">Formation pratique « Créer sa boîte à outils IA pour agir au quotidien en ETT / ETTI / EATT ».</p>
      </div>
      <Card className="w-full max-w-md">
        <Tabs label="Connexion ou inscription" value={tab} onChange={setTab} tabs={[{ key: 'login', label: 'Se connecter' }, { key: 'signup', label: 'Créer un compte' }]} />
        {!SUPABASE_CONFIGURED && backend.kind === 'demo' && (
          <Notice tone="warning" title="Mode démo actif">
            Supabase n’est pas configuré (voir <code>.env.example</code>). Les données restent dans ce navigateur et ne sont pas partagées. Mot de passe des comptes de démonstration : <strong>{DEMO_PASSWORD}</strong>.
          </Notice>
        )}
        <form onSubmit={submit} className="space-y-3 mt-3">
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
          <p className="text-sm text-muted">
            {tab === 'signup' ? 'Un nouveau compte est toujours « participant ». Le rôle formateur est attribué par l’organisme (voir docs/PREMIER_FORMATEUR.md).' : 'Le code de session vous sera demandé après connexion ; il ne remplace pas l’identification.'}
          </p>
        </form>
      </Card>
      {demo && (
        <Card title="Comptes de démonstration" className="w-full max-w-md mt-4">
          <p className="text-sm text-muted mb-2">Ouvrez deux onglets pour incarner deux personnes (le formateur et un participant) et observer les mises à jour.</p>
          <ul className="space-y-1 text-sm">
            {demo.listDemoAccounts().map((a) => (
              <li key={a.email} className="flex items-center justify-between gap-2">
                <span>
                  {a.name} <span className="text-muted">({a.role === 'trainer' ? 'formateur' : 'participant'})</span>
                </span>
                <Button
                  size="sm"
                  onClick={async () => {
                    await backend.signIn(a.email, DEMO_PASSWORD);
                    navigate('/');
                  }}
                >
                  Entrer
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-muted">Session de démonstration : code DEMO26.</span>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                if (confirm('Réinitialiser toutes les données de démonstration de ce navigateur ?')) {
                  demo.resetDemo();
                  toast('Données de démonstration réinitialisées.', 'success');
                }
              }}
            >
              Réinitialiser la démo
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

import { type ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { cx } from '../ui';

export function Brand({ large }: { large?: boolean }) {
  const { settings, logoUrl } = useAuth();
  const name = settings?.org_name || 'START EVOLUTION';
  return (
    <span className="inline-flex items-center gap-2">
      {logoUrl ? (
        <img src={logoUrl} alt={`Logo ${name}`} className={cx('object-contain', large ? 'h-12' : 'h-8')} />
      ) : (
        <span className={cx('font-bold tracking-wide text-brand-700', large ? 'text-2xl' : 'text-base')} aria-label={name}>
          {name}
        </span>
      )}
      <span className={cx('text-muted', large ? 'text-lg' : 'text-sm')}>· Atelier IA</span>
    </span>
  );
}

export function AppShell({ children, wide }: { children: ReactNode; wide?: boolean }) {
  const { profile, user, signOut, backend, online } = useAuth();
  const navigate = useNavigate();
  const trainer = profile?.role === 'trainer';
  const nav = trainer
    ? [
        { to: '/t/sessions', label: 'Sessions' },
        { to: '/t/programme', label: 'Programme' },
        { to: '/t/outils', label: 'Outils' },
        { to: '/ressources', label: 'Ressources' },
        { to: '/t/parametres', label: 'Paramètres' },
      ]
    : [
        { to: '/p', label: 'Mes sessions' },
        { to: '/ressources', label: 'Ressources' },
        { to: '/outils', label: 'Outils' },
        { to: '/mes-donnees', label: 'Mes données' },
      ];
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      {backend.kind === 'demo' && (
        <div className="bg-amber-100 text-amber-950 text-sm text-center px-3 py-1 border-b border-amber-300 no-print" role="status">
          MODE DÉMO — données locales à ce navigateur, non synchronisées avec d’autres personnes. Aucun serveur n’est utilisé.
        </div>
      )}
      {!online && (
        <div className="bg-red-100 text-red-950 text-sm text-center px-3 py-1 border-b border-red-300 no-print" role="alert">
          Connexion perdue : les modifications ne sont pas enregistrées sur le serveur. Reconnexion automatique dès que possible.
        </div>
      )}
      <header className="bg-white border-b border-line no-print">
        <div className={cx('mx-auto px-4 py-2 flex flex-wrap items-center gap-x-6 gap-y-2', wide ? 'max-w-[1500px]' : 'max-w-6xl')}>
          <Link to={trainer ? '/t/sessions' : '/p'} className="shrink-0">
            <Brand />
          </Link>
          <nav aria-label="Navigation principale" className="flex flex-wrap gap-1">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => cx('px-3 py-1.5 rounded-md font-medium', isActive ? 'bg-brand-50 text-brand-700' : 'text-muted hover:text-ink hover:bg-surface')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            {profile && (
              <span className="text-muted">
                {profile.display_name} <span className="sr-only">,</span>
                <span className="ml-1 rounded-full bg-surface px-2 py-0.5 text-xs border border-line">{trainer ? 'Formateur' : 'Participant'}</span>
              </span>
            )}
            {user && (
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  navigate('/connexion');
                }}
                className="inline-flex items-center gap-1 text-muted hover:text-ink"
              >
                <LogOut size={16} aria-hidden /> Se déconnecter
              </button>
            )}
          </div>
        </div>
      </header>
      <main id="main" className={cx('flex-1 mx-auto w-full px-4 py-5', wide ? 'max-w-[1500px]' : 'max-w-6xl')}>
        {children}
      </main>
      <footer className="text-xs text-muted text-center py-4 no-print">
        Atelier IA — START EVOLUTION · Les ateliers utilisent exclusivement le cas fictif « Agence Horizon ». Aucune donnée réelle de candidat ne doit être déposée.
      </footer>
    </div>
  );
}

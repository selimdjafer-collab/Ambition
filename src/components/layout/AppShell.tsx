import { type ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { cx } from '../ui';

export function Brand({ large, light }: { large?: boolean; light?: boolean }) {
  const { settings, logoUrl } = useAuth();
  const name = settings?.org_name || 'START EVOLUTION';
  return (
    <span className="inline-flex items-center gap-2.5">
      {logoUrl ? (
        <img src={logoUrl} alt={`Logo ${name}`} className={cx('object-contain', large ? 'h-12' : 'h-8')} />
      ) : (
        <>
          <span aria-hidden className={cx('inline-flex items-center justify-center rounded-lg font-display font-bold', large ? 'h-11 w-11 text-xl' : 'h-8 w-8 text-sm', light ? 'bg-white/15 text-white' : 'bg-brand-600 text-white')}>
            SE
          </span>
          <span className={cx('font-display font-semibold tracking-tight leading-none', large ? 'text-2xl' : 'text-base', light ? 'text-white' : 'text-ink')} aria-label={name}>
            {name}
          </span>
        </>
      )}
      <span className={cx('inline-flex items-center gap-1 leading-none', large ? 'text-base' : 'text-xs', light ? 'text-white/70' : 'text-muted')}>
        <Sparkles size={large ? 16 : 12} aria-hidden /> Atelier IA
      </span>
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
  const initials = (profile?.display_name ?? '?').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      {backend.kind === 'demo' && (
        <div className="bg-amber-ink text-amber-50 text-xs text-center px-3 py-1.5 no-print" role="status">
          <strong className="font-semibold">Mode démo</strong> · données locales à ce navigateur, non partagées · aucun serveur
        </div>
      )}
      {!online && (
        <div className="bg-red-700 text-white text-sm text-center px-3 py-1.5 no-print" role="alert">
          Connexion perdue : les modifications ne sont pas enregistrées sur le serveur. Reconnexion automatique dès que possible.
        </div>
      )}
      <header className="bg-white/90 backdrop-blur border-b border-line sticky top-0 z-30 no-print">
        <div className={cx('mx-auto px-4 sm:px-6 h-14 flex items-center gap-x-6', wide ? 'max-w-[1500px]' : 'max-w-6xl')}>
          <Link to={trainer ? '/t/sessions' : '/p'} className="shrink-0" aria-label="Accueil">
            <Brand />
          </Link>
          <nav aria-label="Navigation principale" className="hidden md:flex gap-0.5">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => cx('px-3 py-1.5 rounded-lg text-sm font-semibold transition', isActive ? 'bg-brand-50 text-brand-700' : 'text-muted hover:text-ink hover:bg-surface')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            {profile && (
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-8 w-8 rounded-full bg-brand-100 text-brand-800 inline-flex items-center justify-center text-xs font-bold">{initials}</span>
                <span className="hidden sm:inline leading-tight">
                  <span className="block font-semibold text-ink">{profile.display_name}</span>
                  <span className="block text-xs text-muted">{trainer ? 'Formateur' : 'Participant'}</span>
                </span>
              </span>
            )}
            {user && (
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  navigate('/connexion');
                }}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-muted hover:text-ink hover:bg-surface"
                aria-label="Se déconnecter"
                title="Se déconnecter"
              >
                <LogOut size={16} aria-hidden /> <span className="hidden lg:inline">Déconnexion</span>
              </button>
            )}
          </div>
        </div>
        <nav aria-label="Navigation principale (mobile)" className="md:hidden flex gap-1 overflow-x-auto px-3 pb-2">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => cx('px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap', isActive ? 'bg-brand-50 text-brand-700' : 'text-muted')}>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main id="main" className={cx('flex-1 mx-auto w-full px-4 sm:px-6 py-6', wide ? 'max-w-[1500px]' : 'max-w-6xl')}>
        {children}
      </main>
      <footer className="text-xs text-muted text-center py-5 px-4 no-print">
        Atelier IA — START EVOLUTION · Ateliers sur le cas fictif « Agence Horizon ». Aucune donnée réelle de salarié ou de candidat ne doit être déposée.
      </footer>
    </div>
  );
}

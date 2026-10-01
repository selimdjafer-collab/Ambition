import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getBackend, type Backend } from '../lib/backend';
import type { AppSettings, Profile } from '../lib/types';
import type { AuthUser } from '../lib/backend/types';

interface AuthContextValue {
  backend: Backend;
  user: AuthUser | null;
  profile: Profile | null;
  settings: AppSettings | null;
  logoUrl: string | null;
  loading: boolean;
  online: boolean;
  refreshProfile: () => Promise<void>;
  refreshSettings: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const backend = useMemo(() => getBackend(), []);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);

  const refreshProfile = useCallback(async () => {
    try {
      setProfile(await backend.getMyProfile());
    } catch {
      setProfile(null);
    }
  }, [backend]);

  const refreshSettings = useCallback(async () => {
    try {
      const s = await backend.getSettings();
      setSettings(s);
      setLogoUrl(await backend.getLogoUrl(s.logo_path));
    } catch {
      setSettings(null);
    }
  }, [backend]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const u = await backend.getAuthUser();
      if (cancelled) return;
      setUser(u);
      if (u) {
        await refreshProfile();
        await refreshSettings();
      }
      setLoading(false);
    })();
    const unsub = backend.onAuthChange(async (u) => {
      setUser(u);
      if (u) {
        await refreshProfile();
        await refreshSettings();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    const unsubNet = backend.onConnectionChange(setOnline);
    return () => {
      cancelled = true;
      unsub();
      unsubNet();
    };
  }, [backend, refreshProfile, refreshSettings]);

  const signOut = useCallback(async () => {
    await backend.signOut();
    setUser(null);
    setProfile(null);
  }, [backend]);

  const value = useMemo(
    () => ({ backend, user, profile, settings, logoUrl, loading, online, refreshProfile, refreshSettings, signOut }),
    [backend, user, profile, settings, logoUrl, loading, online, refreshProfile, refreshSettings, signOut],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return ctx;
}

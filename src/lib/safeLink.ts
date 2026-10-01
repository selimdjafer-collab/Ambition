/** Un lien saisi par un participant est rendu comme lien sûr, sans récupération de contenu. */
export function normalizeExternalUrl(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  try {
    const u = new URL(s.includes('://') ? s : `https://${s}`);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

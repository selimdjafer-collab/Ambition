/** Contrôle des fichiers déposés : extension, type et taille. */

export const MAX_FILE_BYTES = 10 * 1024 * 1024;

const ALLOWED: Record<string, string[]> = {
  pdf: ['application/pdf'],
  png: ['image/png'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  webp: ['image/webp'],
  txt: ['text/plain'],
  md: ['text/markdown', 'text/plain'],
  csv: ['text/csv', 'text/plain', 'application/vnd.ms-excel'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
};

export const ALLOWED_EXTENSIONS = Object.keys(ALLOWED);

export function validateFile(file: { name: string; size: number; type: string }): string | null {
  const ext = file.name.toLowerCase().split('.').pop() ?? '';
  if (!ALLOWED[ext]) {
    return `Format non accepté (.${ext}). Formats utiles : ${ALLOWED_EXTENSIONS.map((e) => '.' + e).join(', ')}.`;
  }
  if (file.size === 0) return 'Fichier vide.';
  if (file.size > MAX_FILE_BYTES) return 'Fichier trop volumineux (10 Mo maximum).';
  if (file.type && !ALLOWED[ext].includes(file.type)) {
    return `Le type du fichier (${file.type}) ne correspond pas à son extension.`;
  }
  return null;
}

/** Nom de fichier neutralisé pour le stockage. */
export function safeFileName(name: string): string {
  const base = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
  return base || 'fichier';
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} o`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} Ko`;
  return `${(n / (1024 * 1024)).toFixed(1)} Mo`;
}

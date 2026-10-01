import { useRef, useState } from 'react';
import { Paperclip, Trash2 } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { ALLOWED_EXTENSIONS, formatBytes, validateFile } from '../../lib/files';
import type { FileRef } from '../../lib/types';
import { Button, useToast } from '../ui';

export function FileList({ files, canDelete, onDelete }: { files: FileRef[]; canDelete?: boolean; onDelete?: (f: FileRef) => void }) {
  const { backend } = useAuth();
  const toast = useToast();
  if (!files.length) return <p className="text-sm text-muted">Aucun fichier.</p>;
  return (
    <ul className="space-y-1 text-sm">
      {files.map((f) => (
        <li key={f.path} className="flex items-center gap-2 flex-wrap">
          <Paperclip size={14} aria-hidden />
          <button
            type="button"
            className="underline text-brand-700"
            onClick={async () => {
              const url = await backend.getFileUrl(f.path);
              if (!url) return toast('Accès au fichier refusé ou lien expiré.', 'error');
              window.open(url, '_blank', 'noopener');
            }}
          >
            {f.name}
          </button>
          <span className="text-muted">({formatBytes(f.size)})</span>
          {canDelete && onDelete && (
            <Button size="sm" variant="ghost" onClick={() => onDelete(f)} aria-label={`Supprimer ${f.name}`}>
              <Trash2 size={14} aria-hidden />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}

export function FileDrop({ sessionId, submissionId, files, onChange, disabled }: { sessionId: string; submissionId: string; files: FileRef[]; onChange: (files: FileRef[]) => void; disabled?: boolean }) {
  const { backend } = useAuth();
  const toast = useToast();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const add = async (list: FileList | null) => {
    if (!list?.length) return;
    setBusy(true);
    const next = [...files];
    for (const file of Array.from(list)) {
      const err = validateFile(file);
      if (err) {
        toast(`${file.name} : ${err}`, 'error');
        continue;
      }
      try {
        next.push(await backend.uploadSubmissionFile(sessionId, submissionId, file));
      } catch (e) {
        toast(`${file.name} : ${e instanceof Error ? e.message : String(e)}`, 'error');
      }
    }
    onChange(next);
    setBusy(false);
    if (input.current) input.current.value = '';
  };
  return (
    <div className="space-y-2">
      <FileList
        files={files}
        canDelete={!disabled}
        onDelete={async (f) => {
          try {
            await backend.deleteSubmissionFile(f.path);
          } catch {
            /* le fichier peut déjà être absent */
          }
          onChange(files.filter((x) => x.path !== f.path));
        }}
      />
      <div className="flex items-center gap-2 flex-wrap">
        <input ref={input} type="file" multiple className="sr-only" id={`file-${submissionId}`} accept={ALLOWED_EXTENSIONS.map((e) => '.' + e).join(',')} onChange={(e) => add(e.target.files)} disabled={disabled || busy} />
        <Button onClick={() => input.current?.click()} disabled={disabled} busy={busy}>
          Ajouter un fichier
        </Button>
        <span className="text-xs text-muted">Formats : {ALLOWED_EXTENSIONS.map((e) => '.' + e).join(', ')} · 10 Mo max. Stockage privé ; accès limité à vous, votre binôme et le formateur.</span>
      </div>
    </div>
  );
}

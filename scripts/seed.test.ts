import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildSeedSql } from './seed-sql';

describe('seed SQL', () => {
  it('est généré sans erreur et à jour dans le dépôt', () => {
    const sql = buildSeedSql();
    expect(sql).toContain('insert into public.workshop_templates');
    expect((sql.match(/insert into public.workshop_templates/g) ?? []).length).toBe(11);
    const committed = readFileSync(resolve(process.cwd(), 'supabase/seed.sql'), 'utf8');
    expect(committed).toBe(sql);
  });
});

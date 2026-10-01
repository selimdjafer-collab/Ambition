/**
 * Génère supabase/seed.sql à partir des contenus TypeScript (source de vérité).
 *   npx tsx scripts/generate-seed.ts          -> écrit le fichier
 *   npx tsx scripts/generate-seed.ts --check  -> vérifie que le fichier est à jour
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildSeedSql } from './seed-sql';

const out = resolve(process.cwd(), 'supabase/seed.sql');
const sql = buildSeedSql();

if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = readFileSync(out, 'utf8');
  } catch {
    /* absent */
  }
  if (current !== sql) {
    console.error('supabase/seed.sql est obsolète : exécutez `npm run seed:generate`.');
    process.exit(1);
  }
  console.log('supabase/seed.sql est à jour.');
} else {
  writeFileSync(out, sql);
  console.log(`Écrit ${out} (${sql.length} caractères).`);
}

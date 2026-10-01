#!/usr/bin/env bash
# Exécute migrations + seed + scénario d'acceptation sur un PostgreSQL local
# « nu » (hors Supabase), via le shim supabase/tests/local_supabase_shim.sql.
# Usage : PGHOST=... PGPORT=... PGUSER=postgres scripts/db-test.sh [nom_base]
set -euo pipefail
DB="${1:-atelier_test}"
cd "$(dirname "$0")/.."
psql -q -v ON_ERROR_STOP=1 -d postgres -c "drop database if exists \"$DB\"" -c "create database \"$DB\""
psql -q -v ON_ERROR_STOP=1 -d "$DB" -c "create extension if not exists pgcrypto"
psql -q -v ON_ERROR_STOP=1 -d "$DB" -f supabase/tests/local_supabase_shim.sql 2>&1 | grep -v "wal_level\|HINT" || true
for f in supabase/migrations/*.sql; do
  echo "== $f"
  psql -q -v ON_ERROR_STOP=1 -d "$DB" -f "$f" 2>&1 | grep -v "wal_level\|HINT\|already exists" || true
done
echo "== seed"
psql -q -v ON_ERROR_STOP=1 -d "$DB" -f supabase/seed.sql
echo "== acceptation"
psql -v ON_ERROR_STOP=1 -d "$DB" -f supabase/tests/acceptance.sql 2>&1 | grep -E "NOTICE|ERROR|ÉCHEC|ACCEPTATION" | sed 's/^psql:[^:]*:[0-9]*: //'

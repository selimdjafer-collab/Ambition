import {
  DEFAULT_HOSTING_NOTES,
  DEFAULT_PRIVACY_NOTICE,
  PROGRAM_META,
  PROGRAM_OBJECTIVES,
  QUIZ_QUESTIONS,
  RESOURCES,
  RUBRIC,
  TOOL_CARDS,
  WORKSHOPS,
  TOTAL_MINUTES,
} from '../src/content';
import { checkDurations } from '../src/lib/durations';

function lit(s: string | null | undefined): string {
  if (s === null || s === undefined) return 'null';
  return `'${s.replace(/'/g, "''")}'`;
}

function json(v: unknown): string {
  const text = JSON.stringify(v);
  if (text.includes('$j$')) throw new Error('Marqueur $j$ présent dans le contenu');
  return `$j$${text}$j$::jsonb`;
}

export function buildSeedSql(): string {
  const check = checkDurations(WORKSHOPS);
  if (check.problems.length) {
    throw new Error('Durées incohérentes : ' + check.problems.join(' '));
  }
  if (TOTAL_MINUTES !== 420) throw new Error('Le parcours doit totaliser 420 minutes');

  const lines: string[] = [];
  lines.push('-- =============================================================================');
  lines.push('-- Seed pédagogique — GÉNÉRÉ par scripts/generate-seed.ts, ne pas éditer à la main.');
  lines.push(`-- Référence éditoriale : ${PROGRAM_META.editorial_reference}. Vérifications documentaires : ${PROGRAM_META.verification_date}.`);
  lines.push('-- Idempotent : peut être rejoué sur une base existante (les fiches outils déjà');
  lines.push('-- modifiées par un formateur ne sont pas écrasées).');
  lines.push('-- =============================================================================');
  lines.push('');
  lines.push('begin;');
  lines.push('');
  lines.push('-- Paramètres par défaut de l’organisme (conservés s’ils existent déjà)');
  lines.push(
    `insert into public.app_settings (id, org_name, privacy_notice, hosting_notes) values (1, 'START EVOLUTION', ${lit(DEFAULT_PRIVACY_NOTICE)}, ${lit(DEFAULT_HOSTING_NOTES)}) on conflict (id) do nothing;`,
  );
  lines.push('');
  lines.push('-- Programme');
  lines.push(
    `insert into public.programs (slug, title, description, prerequisites, audience) values (${lit(PROGRAM_META.slug)}, ${lit(PROGRAM_META.title)}, ${lit(PROGRAM_META.description)}, ${lit(PROGRAM_META.prerequisites)}, ${lit(PROGRAM_META.audience)})\n  on conflict (slug) do update set title = excluded.title, description = excluded.description, prerequisites = excluded.prerequisites, audience = excluded.audience;`,
  );
  lines.push('');
  lines.push('-- Version 1 publiée');
  lines.push(
    `insert into public.program_versions (program_id, version_number, status, editorial_reference, changelog, rubric, objectives, published_at)\n  select p.id, 1, 'published', ${lit(PROGRAM_META.editorial_reference)}, 'Version initiale.', ${json(RUBRIC)}, ${json(PROGRAM_OBJECTIVES)}, now()\n  from public.programs p where p.slug = ${lit(PROGRAM_META.slug)}\n  on conflict (program_id, version_number) do update set rubric = excluded.rubric, objectives = excluded.objectives, editorial_reference = excluded.editorial_reference;`,
  );
  lines.push('');
  lines.push(`-- Fiches d’atelier (${WORKSHOPS.length} séquences, ${TOTAL_MINUTES} minutes hors pauses)`);
  for (const w of WORKSHOPS) {
    lines.push(
      `insert into public.workshop_templates (program_version_id, position, code, title, seance, duration_min, breakdown, content)\n  select v.id, ${w.position}, ${lit(w.code)}, ${lit(w.title)}, ${w.seance}, ${w.duration_min}, ${json(w.breakdown)}, ${json(w.content)}\n  from public.program_versions v join public.programs p on p.id = v.program_id\n  where p.slug = ${lit(PROGRAM_META.slug)} and v.version_number = 1\n  on conflict (program_version_id, code) do update set position = excluded.position, title = excluded.title, seance = excluded.seance, duration_min = excluded.duration_min, breakdown = excluded.breakdown, content = excluded.content;`,
    );
    lines.push(
      `insert into public.workshop_private (workshop_template_id, content)\n  select t.id, ${json(w.private_content)}\n  from public.workshop_templates t join public.program_versions v on v.id = t.program_version_id join public.programs p on p.id = v.program_id\n  where p.slug = ${lit(PROGRAM_META.slug)} and v.version_number = 1 and t.code = ${lit(w.code)}\n  on conflict (workshop_template_id) do update set content = excluded.content;`,
    );
  }
  lines.push('');
  lines.push('-- Ressources du cas fictif « Agence Horizon »');
  for (const r of RESOURCES) {
    lines.push(
      `insert into public.resources (code, title, kind, version_label, dated_on, body, trainer_only, fictional, obsolete) values (${lit(r.code)}, ${lit(r.title)}, ${lit(r.kind)}, ${lit(r.version_label)}, ${r.dated_on ? lit(r.dated_on) : 'null'}, ${lit(r.body)}, ${r.trainer_only}, ${r.fictional}, ${r.obsolete})\n  on conflict (code) do update set title = excluded.title, kind = excluded.kind, version_label = excluded.version_label, dated_on = excluded.dated_on, body = excluded.body, trainer_only = excluded.trainer_only, fictional = excluded.fictional, obsolete = excluded.obsolete;`,
    );
  }
  lines.push('');
  lines.push('-- Bibliothèque d’outils (non écrasée si déjà modifiée)');
  for (const t of TOOL_CARDS) {
    lines.push(
      `insert into public.tool_cards (family, name, official_url, usage, quick_start, authorization, account_required, pricing_status, pricing_note, limits, formats, precautions, terms_url, privacy_url, fallback, last_verified_on, verification_source, is_fallback) values (${lit(t.family)}, ${lit(t.name)}, ${lit(t.official_url)}, ${lit(t.usage)}, ${lit(t.quick_start)}, ${lit(t.authorization)}, ${lit(t.account_required)}, ${lit(t.pricing_status)}, ${lit(t.pricing_note)}, ${lit(t.limits)}, ${lit(t.formats)}, ${lit(t.precautions)}, ${lit(t.terms_url)}, ${lit(t.privacy_url)}, ${lit(t.fallback)}, ${t.last_verified_on ? lit(t.last_verified_on) : 'null'}, ${lit(t.verification_source)}, ${t.is_fallback})\n  on conflict (family, name) do nothing;`,
    );
  }
  lines.push('');
  lines.push('-- Questions de contrôle (débrief)');
  for (const q of QUIZ_QUESTIONS) {
    lines.push(
      `insert into public.quiz_questions (position, question, options, correct_index, explanation) values (${q.position}, ${lit(q.question)}, ${json(q.options)}, ${q.correct_index}, ${lit(q.explanation)})\n  on conflict (position) do update set question = excluded.question, options = excluded.options, correct_index = excluded.correct_index, explanation = excluded.explanation;`,
    );
  }
  lines.push('');
  lines.push('commit;');
  lines.push('');
  return lines.join('\n');
}

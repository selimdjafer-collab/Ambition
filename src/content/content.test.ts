import { describe, expect, it } from 'vitest';
import { PROGRAM_OBJECTIVES, QUIZ_QUESTIONS, RESOURCES, TOOL_CARDS, WORKSHOPS, snapshotWorkshopContent, hintsVisible } from './index';

describe('contenus pédagogiques', () => {
  it('chaque fiche est complète (objectif, brief, étapes, livrable, grille, 3 aides, corrigé, débrief, secours)', () => {
    for (const w of WORKSHOPS) {
      const c = w.content;
      expect(c.objective.length, w.code).toBeGreaterThan(30);
      expect(c.brief.length, w.code).toBeGreaterThan(80);
      expect(c.steps.length, w.code).toBeGreaterThanOrEqual(4);
      expect(c.deliverable.length, w.code).toBeGreaterThan(20);
      expect(c.success_criteria.length, w.code).toBeGreaterThanOrEqual(3);
      expect(c.hints.map((h) => h.level), w.code).toEqual(['indice', 'trame', 'exemple']);
      expect(c.debrief_questions.length, w.code).toBeGreaterThanOrEqual(2);
      expect(c.fallback.length, w.code).toBeGreaterThan(30);
      expect(w.private_content.answer_key.length, w.code).toBeGreaterThan(50);
      expect(JSON.stringify(c)).not.toMatch(/lorem ipsum/i);
    }
    expect(PROGRAM_OBJECTIVES).toHaveLength(7);
  });

  it('chaque séquence est ancrée dans le métier ETTI et les ateliers proposent la mesure du temps', () => {
    for (const w of WORKSHOPS) {
      const jc = w.content.job_context;
      expect(jc, w.code).toBeDefined();
      for (const k of ['task', 'time_sinks', 'delegable', 'must_verify', 'why_etti'] as const) expect(jc![k].length, `${w.code}.${k}`).toBeGreaterThan(20);
    }
    for (const code of ['DEF', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'DI']) expect(WORKSHOPS.find((w) => w.code === code)?.content.time_tracking, code).toBe(true);
    const all = JSON.stringify(WORKSHOPS);
    for (const term of ['entreprise utilisatrice', 'prescripteur', 'PASS IAE', 'parcours d’insertion']) expect(all.toLowerCase(), term).toContain(term.toLowerCase());
  });

  it('le défi données a 8 cartes et le défi individuel des variantes', () => {
    expect(WORKSHOPS.find((w) => w.code === 'DEF')?.content.data_cards).toHaveLength(8);
    expect((WORKSHOPS.find((w) => w.code === 'DI')?.content.variants ?? []).length).toBeGreaterThanOrEqual(3);
  });

  it('ne reprend pas les promesses chiffrées ni les revendications interdites', () => {
    const all = JSON.stringify({ WORKSHOPS, RESOURCES, TOOL_CARDS, QUIZ_QUESTIONS });
    expect(all).not.toMatch(/40\s?% du temps/i);
    expect(all).not.toMatch(/\bx10\b/i);
    expect(all).not.toMatch(/45 minutes deviennent 3 minutes/i);
    expect(all).not.toMatch(/tous les usages sont gratuits/i);
    expect(all).not.toMatch(/éligible(?:s)? (?:au )?CPF/i);
    expect(all).not.toMatch(/580\s?(?:€|euros)/);
    expect(all).not.toMatch(/trois heures par (?:semaine|entretien)/i);
  });

  it('les ressources fictives sont marquées et datées de septembre 2026 ; R3 est obsolète ; R8 réservée au formateur', () => {
    const codes = RESOURCES.map((r) => r.code);
    expect(codes).toEqual(['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10']);
    for (const r of RESOURCES) {
      expect(r.fictional).toBe(true);
      expect(r.body).toContain('CAS FICTIF');
      if (r.dated_on) expect(r.dated_on.startsWith('2026-09')).toBe(true);
    }
    expect(RESOURCES.find((r) => r.code === 'R3')?.obsolete).toBe(true);
    expect(RESOURCES.find((r) => r.code === 'R3')?.body).toContain('ANCIENNE VERSION');
    expect(RESOURCES.find((r) => r.code === 'R8')?.trainer_only).toBe(true);
    expect(RESOURCES.filter((r) => r.trainer_only)).toHaveLength(1);
  });

  it('les fiches outils non vérifiées restent « à vérifier »', () => {
    const verified = TOOL_CARDS.filter((t) => t.last_verified_on);
    expect(verified).toHaveLength(6);
    for (const t of verified) expect(t.verification_source).toMatch(/^https:\/\//);
    for (const t of TOOL_CARDS.filter((t) => !t.last_verified_on)) expect(t.verification_source).toBe('');
    for (const family of ['transcription', 'documents', 'recherche', 'schemas', 'images', 'assistants']) {
      expect(TOOL_CARDS.some((t) => t.family === family && t.is_fallback), family).toBe(true);
    }
  });

  it('l’instantané de session retire les aides du contenu publié et les sert progressivement', () => {
    const w = WORKSHOPS[2];
    const snap = snapshotWorkshopContent(w.content, w.private_content);
    expect('hints' in snap.publicContent).toBe(false);
    expect(snap.privateContent.hints).toHaveLength(3);
    expect(hintsVisible(snap.privateContent.hints, 0)).toHaveLength(0);
    expect(hintsVisible(snap.privateContent.hints, 2).map((h) => h.level)).toEqual(['indice', 'trame']);
  });

  it('le quiz a cinq questions avec correction et explication', () => {
    expect(QUIZ_QUESTIONS).toHaveLength(5);
    for (const q of QUIZ_QUESTIONS) {
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.correct_index).toBeLessThan(q.options.length);
      expect(q.explanation.length).toBeGreaterThan(40);
    }
  });
});

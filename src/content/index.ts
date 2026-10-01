import type { Hint, PublishedWorkshopContent, WorkshopContent, WorkshopPrivateContent } from '../lib/types';
import { PROGRAM_META, PROGRAM_OBJECTIVES, RUBRIC, WORKSHOPS, TOTAL_MINUTES } from './program';
import { RESOURCES, FICTIONAL_BANNER } from './resources';
import { TOOL_CARDS } from './tools';
import { QUIZ_QUESTIONS, QUIZ_NOTE } from './quiz';

export { PROGRAM_META, PROGRAM_OBJECTIVES, RUBRIC, WORKSHOPS, TOTAL_MINUTES, RESOURCES, FICTIONAL_BANNER, TOOL_CARDS, QUIZ_QUESTIONS, QUIZ_NOTE };

export const DEFAULT_PRIVACY_NOTICE = `Information de confidentialité (à adapter par l'organisme)

Cette application sert à animer une formation. Elle enregistre : votre identité utile à la formation (nom affiché, e-mail de connexion), votre appartenance à un groupe de formation, vos productions pédagogiques et les retours du formateur.

Les ateliers utilisent exclusivement des ressources fictives (« Agence Horizon — cas pédagogique fictif »). Ne déposez aucun dossier réel de candidat, aucun numéro administratif, aucune coordonnée personnelle, aucune donnée de santé.

Durées de conservation : définies par l'organisme (brouillons, productions, traces de formation séparément). Hébergement et prestataires : voir les notes d'hébergement renseignées par l'organisme. Vous pouvez demander l'export ou la suppression de vos productions au formateur.`;

export const DEFAULT_HOSTING_NOTES = `À compléter par l'organisme : hébergeur de la base et du stockage (projet Supabase, région choisie), prestataires, éventuels transferts hors UE, réglages réellement retenus (durées de conservation, accès). L'absence d'utilisation des données pour entraîner un modèle n'est pas synonyme d'absence de traitement de données.`;

/**
 * Instantané d'une fiche d'atelier pour une session : les aides sont
 * retirées du contenu publié et placées dans le contenu privé, servi
 * progressivement selon le niveau révélé par le formateur.
 */
export function snapshotWorkshopContent(
  content: WorkshopContent,
  privateContent: WorkshopPrivateContent,
): { publicContent: PublishedWorkshopContent; privateContent: WorkshopPrivateContent & { hints: Hint[] } } {
  const { hints, ...rest } = content;
  return {
    publicContent: rest,
    privateContent: { ...privateContent, hints },
  };
}

export function hintsVisible(hints: Hint[], level: number): Hint[] {
  return hints.slice(0, Math.max(0, Math.min(3, level)));
}

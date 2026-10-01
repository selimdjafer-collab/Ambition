import type { Resource } from '../lib/types';

/**
 * Ressources pédagogiques de l'« Agence Horizon — cas pédagogique fictif ».
 * Tous les noms, documents, dates et événements sont inventés pour la formation.
 * Aucune donnée réelle ne doit être ajoutée à ces ressources.
 */

export type ResourceSeed = Omit<Resource, 'id'>;

export const FICTIONAL_BANNER = 'CAS FICTIF — FORMATION';

const HEADER = `CAS FICTIF — FORMATION — Agence Horizon`;

export const RESOURCES: ResourceSeed[] = [
  // ---------------------------------------------------------------------------
  // R1 — Transcription d'entretien fictif
  // ---------------------------------------------------------------------------
  {
    code: 'R1',
    title: `Transcription d'entretien fictif du 21/09/2026`,
    kind: 'transcript',
    version_label: 'Transcription fournie',
    dated_on: '2026-09-21',
    trainer_only: false,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Transcription d'entretien fictif du 21/09/2026

**Transcription fournie (aucune transcription automatique n'a été réalisée). Les prénoms ne sont pas indiqués volontairement.**

- Cadre : entretien de suivi entre une conseillère de l'Agence Horizon (agence fictive) et une personne accompagnée.
- Objet : point sur la disponibilité pour une mission de préparation de commandes.
- Date de l'entretien : 21/09/2026 (date fictive).
- Les deux interlocuteurs sont désignés par leur rôle uniquement.

## Dialogue intégral

**Conseillère :** « On fait le point sur ta disponibilité pour la mission de préparation de commandes. »

**Personne accompagnée :** « J'ai déjà préparé des commandes à la main pendant six mois. Je peux commencer lundi 28 septembre. »

**Conseillère :** « La fiche actualisée indique une présence à partir de 9 h. Peux-tu être là ? »

**Personne accompagnée :** « Mon bus arrive vers 8 h 45, mais je dois encore vérifier l'arrêt et le trajet jusqu'au site. Je n'ai pas de véhicule. »

**Conseillère :** « On vérifie le trajet avant de confirmer au client. Tu ne conduiras pas d'engin sur cette mission. »

**Personne accompagnée :** « D'accord. Pour les horaires de la semaine suivante, je ne sais pas encore. »

**Conseillère :** « Je demanderai les horaires au client mercredi 23 septembre. Tu vérifieras le trajet au plus tard jeudi 24. »

**Personne accompagnée :** « Oui. Est-ce que tu connais le salaire ? »

**Conseillère :** « Non, il ne figure pas dans la fiche. Je le demanderai. Nous refaisons un point jeudi 24 septembre à 10 h. »

**Personne accompagnée :** « C'est noté. »

## Fin de la transcription

- Durée de l'échange : non renseignée.
- Aucun document n'a été remis pendant l'entretien.
- Cette transcription sert de matière première aux ateliers ; elle ne contient ni rémunération, ni adresse exacte, ni horaires de la semaine suivante.
`,
  },

  // ---------------------------------------------------------------------------
  // R2 — Fiche mission actualisée (V2)
  // ---------------------------------------------------------------------------
  {
    code: 'R2',
    title: 'Fiche mission actualisée — V2 du 18/09/2026',
    kind: 'mission_sheet',
    version_label: 'Version 2',
    dated_on: '2026-09-18',
    trainer_only: false,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Fiche mission actualisée — V2 du 18/09/2026

**Version de référence actuelle.** Elle remplace la V1 du 10/09/2026 (R3), conservée uniquement à titre historique.

## Entreprise

- Nom : Atelier Horizon Logistique — entreprise fictive
- Activité : préparation manuelle de commandes
- Site : zone d'activité fictive Horizon
- Adresse exacte : non communiquée à ce jour

## Mission

| Élément | Information disponible |
| --- | --- |
| Poste | Préparation manuelle de commandes |
| Début souhaité | 28/09/2026 — à confirmer par le client |
| Présence indicative | 9 h à 17 h |
| Organisation des pauses | À confirmer |
| Volume contractuel | À confirmer |
| Conduite d'engin | Aucune conduite d'engin prévue |
| Rémunération | Non communiquée |

## Compétences utiles

- Compréhension des consignes
- Contrôle des références
- Rangement
- Communication en équipe

## Informations manquantes (à ne pas compléter par supposition)

- Adresse exacte du site
- Horaires de la semaine suivante
- Modalités de pauses
- Rémunération

Chaque information manquante doit être identifiée comme telle dans tout compte rendu et attribuée à une personne responsable chargée de la demander au client.
`,
  },

  // ---------------------------------------------------------------------------
  // R3 — Fiche mission historique (V1, obsolète)
  // ---------------------------------------------------------------------------
  {
    code: 'R3',
    title: 'Fiche mission historique — V1 du 10/09/2026',
    kind: 'mission_sheet',
    version_label: 'Version 1 — obsolète',
    dated_on: '2026-09-10',
    trainer_only: false,
    fictional: true,
    obsolete: true,
    body: `${HEADER}

# ANCIENNE VERSION — NE PAS UTILISER COMME RÉFÉRENCE ACTUELLE

**Cette fiche est remplacée par la V2 du 18/09/2026 (R2).** Elle est conservée pour apprendre à repérer une contradiction entre deux versions d'un même document.

## Fiche mission historique — V1 du 10/09/2026

## Entreprise

- Nom : Atelier Horizon Logistique — entreprise fictive
- Activité : préparation manuelle de commandes
- Site : zone d'activité fictive Horizon

## Mission (état au 10/09/2026)

| Élément | Information de l'époque |
| --- | --- |
| Poste | Préparation manuelle de commandes |
| Début envisagé | 28/09/2026 |
| Horaires provisoires | 8 h à 16 h |
| Validation client | En attente |
| Rémunération | Non renseignée |

## Point de vigilance pédagogique

- Les horaires provisoires de cette V1 (8 h à 16 h) contredisent la présence indicative de la V2 (9 h à 17 h).
- En cas de contradiction entre deux versions, c'est la version la plus récente et la plus complète qui fait foi, après vérification de sa date et de son champ d'application.
- Un compte rendu qui reprendrait les horaires de cette V1 commettrait une erreur de version.
`,
  },

  // ---------------------------------------------------------------------------
  // R4 — Procédure interne fictive d'accueil (V2)
  // ---------------------------------------------------------------------------
  {
    code: 'R4',
    title: `Procédure interne fictive d'accueil — V2 du 16/09/2026`,
    kind: 'procedure',
    version_label: 'Version 2',
    dated_on: '2026-09-16',
    trainer_only: false,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Procédure interne fictive d'accueil — V2 du 16/09/2026

**Avertissement :** cette procédure est une règle interne de l'agence fictive Horizon, inventée pour la formation. Elle ne constitue pas une obligation légale et ne doit pas être présentée comme telle.

## Les six étapes de l'accueil

1. **Recueillir la demande et expliquer le déroulement de l'accueil.**
2. **Relever uniquement les compétences et disponibilités nécessaires à la mission.**
3. **Vérifier les informations de la mission et les points encore inconnus.**
4. **Faire valider le projet de mission par le permanent responsable.**
5. **Expliquer les prochaines actions à la personne accompagnée.**
6. **Fixer un point de suivi et consigner les actions convenues.**

## Règle sur les points inconnus

Un point inconnu doit être identifié et attribué à une personne responsable ; il ne doit pas être complété par une supposition.

| Situation | Conduite attendue |
| --- | --- |
| Une information manque (salaire, adresse, horaires…) | Écrire « information non disponible » et nommer qui la demande, et pour quand |
| Deux documents se contredisent | Vérifier les dates et versions avant de retenir une information |
| Le client n'a pas encore confirmé | Indiquer « à confirmer », ne jamais écrire « confirmé » |

## Rappel

Cette procédure sert de support aux ateliers (compte rendu, actions à mener, schéma de parcours). Elle peut être schématisée en six blocs.
`,
  },

  // ---------------------------------------------------------------------------
  // R5 — Guide fictif de préparation de visite (V1)
  // ---------------------------------------------------------------------------
  {
    code: 'R5',
    title: 'Guide fictif de préparation de visite — V1 du 08/09/2026',
    kind: 'guide',
    version_label: 'Version 1',
    dated_on: '2026-09-08',
    trainer_only: false,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Guide fictif de préparation de visite — V1 du 08/09/2026

**Avertissement :** ce guide est un document interne de l'agence fictive Horizon, inventé pour la formation. Ses recommandations ne sont pas des obligations légales.

## Ce qu'il faut relever avant une visite d'entreprise

- L'activité de l'entreprise
- Les métiers présents
- Les tâches réellement confiées aux personnes en mission
- Les horaires
- Les contraintes de déplacement (accès, transports, stationnement)
- Les modalités d'accueil le premier jour

## Ce qu'il faut vérifier avec le client

- Toute information non publique (organisation interne, volumes, équipes)
- Toute information changeante (horaires, dates de début, contacts)
- Une information lue sur un site ou dans un document ancien ne vaut pas confirmation.

## Préparer cinq questions

| N° | Thème | Exemple de formulation |
| --- | --- | --- |
| 1 | Tâches | Quelles tâches seront réellement confiées le premier jour ? |
| 2 | Compétences | Quelles compétences sont indispensables, lesquelles s'apprennent sur place ? |
| 3 | Horaires | Quels sont les horaires de la première semaine et de la suivante ? |
| 4 | Accès au site | Comment accède-t-on au site sans véhicule ? |
| 5 | Prochaines étapes | Qui confirme la mission, et pour quelle date ? |

## Règle de rédaction

Ne pas présenter une hypothèse commerciale comme un fait établi. Une intention de recrutement, une estimation de volume ou une date « probable » restent des hypothèses tant que le client ne les a pas confirmées par écrit.
`,
  },

  // ---------------------------------------------------------------------------
  // R6 — Brief de communication fictif
  // ---------------------------------------------------------------------------
  {
    code: 'R6',
    title: 'Brief de communication fictif — affiche « Préparer sa première mission »',
    kind: 'brief',
    version_label: 'Version 1',
    dated_on: '2026-09-15',
    trainer_only: false,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Brief de communication fictif — affiche « Préparer sa première mission »

## Public

Public adulte d'agence : personnes accompagnées qui s'apprêtent à démarrer une première mission.

## Message : trois actions à retenir

1. **Vérifier les horaires**
2. **Préparer les questions utiles**
3. **Confirmer le trajet**

## Contraintes de contenu

- Pas de rémunération inventée
- Pas d'adresse inventée
- Pas de contact inventé
- Pas de date inventée
- Texte bref
- Ton respectueux
- Représentation non stéréotypée des personnes (âge, genre, origine, apparence)

## Signature

- Le logo START EVOLUTION peut être ajouté par le formateur depuis les paramètres de l'application.
- Sinon, signature textuelle : « START EVOLUTION ».

## Format attendu

- Une affiche lisible (titre, trois actions, signature).
- Les visuels générés doivent être relus : vérifier le texte intégré à l'image, les mains, les objets et l'absence de stéréotype.
`,
  },

  // ---------------------------------------------------------------------------
  // R7 — Sources de travail (points de départ)
  // ---------------------------------------------------------------------------
  {
    code: 'R7',
    title: 'Sources de travail — points de départ (à vérifier)',
    kind: 'sources',
    version_label: 'Points de départ',
    dated_on: null,
    trainer_only: false,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Sources de travail — points de départ (à vérifier)

**Ces adresses sont des points de départ, pas des réponses déjà vérifiées.** Le participant renseigne la page précise consultée, la date de publication si elle est disponible et la date de consultation.

## Sites institutionnels proposés

| Organisme | Adresse de départ |
| --- | --- |
| France Travail | https://www.francetravail.fr |
| Dares | https://dares.travail-emploi.gouv.fr |
| Insee | https://www.insee.fr |
| Service-Public.fr | https://www.service-public.fr |
| Légifrance | https://www.legifrance.gouv.fr |
| Ministère du Travail | https://travail-emploi.gouv.fr |
| CNIL | https://www.cnil.fr |

## Règles d'usage

- Une page d'accueil ne constitue pas une source : citer la page précise.
- Noter la date de publication si elle figure sur la page ; sinon écrire « non indiquée ».
- Noter la date de consultation.
- Recopier le passage exact qui soutient l'information retenue.
- Une information reformulée par un assistant doit être recontrôlée sur la page d'origine.

## Gabarit de tableau de sources

| Page consultée | Date de publication | Date de consultation | Information retenue | Passage exact |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |
| | | | | |
`,
  },

  // ---------------------------------------------------------------------------
  // R8 — Compte rendu imparfait (réservé au formateur)
  // ---------------------------------------------------------------------------
  {
    code: 'R8',
    title: 'Compte rendu imparfait — RÉSERVÉ AU FORMATEUR',
    kind: 'example',
    version_label: 'Corrigé privé',
    dated_on: '2026-09-21',
    trainer_only: true,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Compte rendu imparfait — RÉSERVÉ AU FORMATEUR

**Ce document est un exemple volontairement défectueux.** Il ne doit jamais être proposé comme vérité au participant. Il sert au formateur pour faire repérer trois erreurs à partir de la transcription R1.

## Texte du compte rendu imparfait

> **Compte rendu d'entretien — 21/09/2026**
>
> Objet : mission de préparation de commandes chez Atelier Horizon Logistique.
>
> La personne accompagnée a six mois d'expérience en préparation manuelle de commandes. La mission est confirmée pour le lundi 28 septembre, avec une présence à partir de 9 h.
>
> La rémunération est de 12,10 € brut de l'heure.
>
> Le trajet en bus a été validé : la personne arrive à 8 h 45 à proximité du site. Elle ne conduira pas d'engin.
>
> Les horaires de la semaine suivante seront demandés au client le mercredi 23 septembre. Prochain point : jeudi 24 septembre à 10 h.

## Les trois erreurs à faire repérer

| N° | Erreur | Ce que dit réellement R1 / R2 | Pourquoi c'est grave |
| --- | --- | --- | --- |
| 1 | **La mission est présentée comme confirmée.** | La conseillère dit : « On vérifie le trajet avant de confirmer au client. » La fiche R2 indique un début « à confirmer par le client ». | La personne accompagnée peut s'organiser (démarches, refus d'une autre proposition) sur une mission qui n'existe pas encore. Le client n'a rien validé ; l'agence engage sa crédibilité. |
| 2 | **Le salaire « 12,10 € brut de l'heure » est inventé.** | La conseillère répond : « Non, il ne figure pas dans la fiche. Je le demanderai. » Le montant n'apparaît nulle part ; il a été fabriqué pour l'exercice. | Un chiffre inventé devient une promesse implicite. Il peut créer un litige, une déception ou une erreur de contrat. Un point inconnu doit être écrit « information non disponible » et attribué à un responsable. |
| 3 | **Le trajet est présenté comme validé.** | La personne dit : « je dois encore vérifier l'arrêt et le trajet jusqu'au site ». La vérification est prévue au plus tard jeudi 24. | Si le trajet n'est pas faisable, la personne arrive en retard ou ne peut pas se rendre sur site le premier jour. Présenter une action à faire comme déjà faite supprime une action du plan de suivi. |

## Conseils d'animation

- Faire comparer ligne à ligne ce compte rendu avec la transcription R1.
- Demander aux participants de réécrire les trois passages avec la formulation correcte : « à confirmer », « information non disponible — à demander par la conseillère », « trajet à vérifier par la personne avant le jeudi 24 ».
- Rappeler que ces erreurs sont typiques d'une transcription automatique ou d'un résumé par assistant non relu.
`,
  },
];

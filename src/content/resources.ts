import type { Resource } from '../lib/types';

/**
 * Ressources pédagogiques de l'« Agence Horizon — cas pédagogique fictif ».
 * L'Agence Horizon est une entreprise de travail temporaire d'insertion (ETTI)
 * fictive. Tous les noms, documents, dates, numéros et événements sont inventés
 * pour la formation. Aucune donnée réelle ne doit être ajoutée à ces ressources.
 */

export type ResourceSeed = Omit<Resource, 'id'>;

export const FICTIONAL_BANNER = 'CAS FICTIF — FORMATION';

const HEADER = `CAS FICTIF — FORMATION — Agence Horizon (ETTI fictive)`;

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

- Cadre : entretien de suivi entre une conseillère en insertion de l'Agence Horizon (ETTI fictive) et un salarié intérimaire en parcours d'insertion.
- La personne accompagnée dispose d'un PASS IAE fictif ; son éligibilité a été validée par un prescripteur habilité fictif. Aucun numéro, aucune date de validité et aucune donnée de santé ne figurent dans cette transcription, volontairement.
- Objet : point sur la disponibilité pour une mission de préparation de commandes auprès de l'entreprise utilisatrice Atelier Horizon Logistique (entreprise fictive). Dans le dialogue, « le client » désigne cette entreprise utilisatrice.
- Date de l'entretien : 21/09/2026 (date fictive).
- Les deux interlocuteurs sont désignés par leur rôle uniquement : « Conseillère » (conseillère en insertion) et « Personne accompagnée » (salarié intérimaire en parcours d'insertion).

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
- Elle ne contient aucune information sur la situation sociale, la santé ou les droits de la personne : ces éléments relèvent de l'accompagnement socioprofessionnel et ne sont jamais collés dans un outil d'IA.
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

## Entreprise utilisatrice

- Nom : Atelier Horizon Logistique — entreprise fictive
- Rôle : entreprise utilisatrice (elle accueille le salarié intérimaire mis à disposition par l'ETTI fictive Agence Horizon)
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

## Cadre contractuel prévu (ETTI fictive)

- Contrat de mission (ETTI) conclu entre l'Agence Horizon et le salarié intérimaire en parcours d'insertion.
- Contrat de mise à disposition conclu entre l'Agence Horizon et l'entreprise utilisatrice Atelier Horizon Logistique.
- Les deux contrats restent à établir : aucun élément de cette fiche ne vaut engagement tant que le client n'a pas confirmé.

## Accompagnement pendant la mission

- Un point hebdomadaire est prévu entre la conseillère en insertion et le salarié intérimaire pendant la mission (jour et modalité à fixer).
- La formation au poste et la fourniture des équipements de protection individuelle (EPI) sont à la charge de l'entreprise utilisatrice.
- Le nom du tuteur dans l'entreprise utilisatrice n'est pas encore connu.

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
- Nom du tuteur dans l'entreprise utilisatrice

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

## Entreprise utilisatrice

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
  // R4 — Procédure interne fictive d'accueil et de diagnostic IAE (V2)
  // ---------------------------------------------------------------------------
  {
    code: 'R4',
    title: `Procédure interne fictive d'accueil et de diagnostic IAE — V2 du 16/09/2026`,
    kind: 'procedure',
    version_label: 'Version 2',
    dated_on: '2026-09-16',
    trainer_only: false,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Procédure interne fictive d'accueil et de diagnostic IAE — V2 du 16/09/2026

**Avertissement :** cette procédure est une règle interne de l'ETTI fictive Agence Horizon, inventée pour la formation. Elle ne constitue pas une obligation légale et ne doit pas être présentée comme telle. Les règles internes d'une structure ne se confondent jamais avec les textes applicables, que seule la structure et ses référents sont en mesure de préciser.

## Les six étapes de l'accueil et du diagnostic

1. **Recueillir la demande et expliquer le déroulement de l'accueil.**
2. **Relever uniquement les compétences et disponibilités nécessaires à la mission.**
3. **Vérifier les informations de la mission et les points encore inconnus, y compris l'éligibilité IAE : le PASS IAE et sa validité sont vérifiés auprès du prescripteur habilité, sans supposition.**
4. **Faire valider le projet de mission par le permanent responsable.**
5. **Expliquer les prochaines actions au salarié intérimaire en parcours d'insertion.**
6. **Fixer un point de suivi et consigner les actions convenues.**

## Règle sur les points inconnus

Un point inconnu doit être identifié et attribué à une personne responsable ; il ne doit pas être complété par une supposition.

| Situation | Conduite attendue |
| --- | --- |
| Une information manque (salaire, adresse, horaires, tuteur…) | Écrire « information non disponible » et nommer qui la demande, et pour quand |
| Deux documents se contredisent | Vérifier les dates et versions avant de retenir une information |
| Le client n'a pas encore confirmé | Indiquer « à confirmer », ne jamais écrire « confirmé » |
| L'éligibilité IAE n'est pas encore confirmée par le prescripteur | Indiquer « éligibilité à confirmer par le prescripteur » ; ne pas démarrer la mission sur une supposition |

## Rappel

Cette procédure sert de support aux ateliers (compte rendu, actions à mener, schéma de parcours). Elle peut être schématisée en six blocs. Elle décrit une organisation interne fictive ; elle ne remplace ni les textes ni les consignes de votre propre structure.
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

**Avertissement :** ce guide est un document interne de l'ETTI fictive Agence Horizon, inventé pour la formation. Ses recommandations sont des règles internes fictives, pas des obligations légales, et ne remplacent pas les consignes de votre structure.

## Ce qu'il faut relever avant une visite d'entreprise utilisatrice

- L'activité de l'entreprise
- Les métiers présents
- Les tâches réellement confiées aux personnes en mission
- Les horaires
- Les contraintes de déplacement (accès, transports, stationnement)
- L'accès au site sans véhicule (arrêt le plus proche, horaires des transports, dernier tronçon à pied)
- Les modalités d'accueil le premier jour
- Le tuteur désigné dans l'entreprise utilisatrice (nom, fonction, disponibilité)
- L'existence éventuelle d'une clause sociale d'insertion sur le marché ou le chantier concerné, et son facilitateur le cas échéant

## Ce qu'il faut vérifier avec le client

- Toute information non publique (organisation interne, volumes, équipes)
- Toute information changeante (horaires, dates de début, contacts, tuteur)
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

Avant la visite, le permanent prépare des hypothèses commerciales (besoins probables, volumes envisagés, périodes de forte activité). Ces hypothèses servent à poser de meilleures questions ; elles ne sont pas des faits et ne doivent pas être écrites comme tels dans la fiche de visite tant qu'elles n'ont pas été confirmées par l'entreprise utilisatrice.
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

Public adulte d'une ETTI : salariés en insertion qui s'apprêtent à démarrer une première mission auprès d'une entreprise utilisatrice. L'affiche est destinée à l'accueil de l'agence fictive.

## Message : trois actions à retenir

1. **Vérifier les horaires**
2. **Préparer les questions utiles**
3. **Confirmer le trajet**

## Contraintes de contenu

- Pas de rémunération inventée
- Pas d'adresse inventée
- Pas de contact inventé
- Pas de date inventée
- Aucune mention de dispositif, de droit ou d'aide présentée comme acquise
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

**Ces adresses sont des points de départ, pas des réponses déjà vérifiées.** Le participant renseigne la page précise consultée, la date de publication si elle est disponible et la date de consultation. Aucune de ces sources n'a été relue pour la formation : leur contenu reste à vérifier au moment de la session.

## Sites proposés

| Organisme ou ressource | Adresse de départ |
| --- | --- |
| France Travail | https://www.francetravail.fr |
| Les emplois de l'inclusion — plateforme de l'inclusion | https://plateforme.inclusion.gouv.fr |
| La communauté de l'inclusion | https://communaute.inclusion.gouv.fr |
| Avise — fiche pratique ETTI du CRDLA IAE, janvier 2026 | https://www.avise.org |
| Fédération des entreprises d'insertion | https://www.lesentreprisesdinsertion.org |
| Dares | https://dares.travail-emploi.gouv.fr |
| Insee | https://www.insee.fr |
| Ministère du Travail / DGEFP | https://travail-emploi.gouv.fr |
| Service-Public.fr | https://www.service-public.fr |
| Légifrance | https://www.legifrance.gouv.fr |
| CNIL | https://www.cnil.fr |

## Règles d'usage

- Une page d'accueil ne constitue pas une source : citer la page précise.
- Noter la date de publication si elle figure sur la page ; sinon écrire « non indiquée ».
- Noter la date de consultation.
- Recopier le passage exact qui soutient l'information retenue.
- Une information reformulée par un assistant doit être recontrôlée sur la page d'origine.
- Une fiche pratique ou un guide associatif (Avise, fédération) n'a pas la même portée qu'un texte publié sur Légifrance : indiquer la nature de la source.

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
> Objet : mission de préparation de commandes chez Atelier Horizon Logistique (entreprise utilisatrice).
>
> Le salarié intérimaire en parcours d'insertion a six mois d'expérience en préparation manuelle de commandes. La mission est confirmée pour le lundi 28 septembre, avec une présence à partir de 9 h.
>
> La rémunération est de 12,10 € brut de l'heure.
>
> Le trajet en bus a été validé : la personne arrive à 8 h 45 à proximité du site. Elle ne conduira pas d'engin.
>
> Les horaires de la semaine suivante seront demandés au client le mercredi 23 septembre. Prochain point : jeudi 24 septembre à 10 h.

## Les trois erreurs à faire repérer

| N° | Erreur | Ce que dit réellement R1 / R2 | Pourquoi c'est grave |
| --- | --- | --- | --- |
| 1 | **La mission est présentée comme confirmée.** | La conseillère dit : « On vérifie le trajet avant de confirmer au client. » La fiche R2 indique un début « à confirmer par le client ». | La personne accompagnée peut s'organiser (démarches, refus d'une autre proposition) sur une mission qui n'existe pas encore. L'entreprise utilisatrice n'a rien validé ; aucun contrat de mission ni de mise à disposition n'est établi ; l'ETTI engage sa crédibilité. |
| 2 | **Le salaire « 12,10 € brut de l'heure » est inventé.** | La conseillère répond : « Non, il ne figure pas dans la fiche. Je le demanderai. » Le montant n'apparaît nulle part ; il a été fabriqué pour l'exercice. | Un chiffre inventé devient une promesse implicite. Il peut créer un litige, une déception ou une erreur de contrat. Un point inconnu doit être écrit « information non disponible » et attribué à un responsable. |
| 3 | **Le trajet est présenté comme validé.** | La personne dit : « je dois encore vérifier l'arrêt et le trajet jusqu'au site ». La vérification est prévue au plus tard jeudi 24. | Si le trajet n'est pas faisable, la personne arrive en retard ou ne peut pas se rendre sur site le premier jour. Présenter une action à faire comme déjà faite supprime une action du plan de suivi. |

## Conseils d'animation

- Faire comparer ligne à ligne ce compte rendu avec la transcription R1.
- Demander aux participants de réécrire les trois passages avec la formulation correcte : « à confirmer », « information non disponible — à demander par la conseillère », « trajet à vérifier par la personne avant le jeudi 24 ».
- Rappeler que ces erreurs sont typiques d'une transcription automatique ou d'un résumé par assistant non relu.
- Faire remarquer que le compte rendu ne contient, à juste titre, ni numéro de PASS IAE, ni donnée de santé, ni situation sociale : un compte rendu de mission n'en a pas besoin.
`,
  },

  // ---------------------------------------------------------------------------
  // R9 — Fiche de liaison prescripteur fictive (modèle)
  // ---------------------------------------------------------------------------
  {
    code: 'R9',
    title: `Fiche de liaison prescripteur fictive — point d'étape (modèle)`,
    kind: 'brief',
    version_label: 'Version 1',
    dated_on: '2026-09-22',
    trainer_only: false,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Fiche de liaison prescripteur fictive — point d'étape (modèle)

**Avertissement :** modèle interne de l'ETTI fictive Agence Horizon, inventé pour la formation. Il ne reproduit aucun formulaire officiel. Le prescripteur fictif est une agence France Travail fictive ; le conseiller référent n'est pas nommé. Dans une structure réelle, le contenu et le circuit d'une fiche de liaison relèvent de la convention passée avec le prescripteur et de la politique de la structure.

**Règle de base : transmettre au prescripteur le strict nécessaire au suivi du parcours, rien de plus.**

## Partie 1 — Modèle vierge

| Rubrique | À renseigner |
| --- | --- |
| Objet du point d'étape | |
| Date du point d'étape | |
| Structure émettrice | Agence Horizon (ETTI fictive) — conseillère en insertion |
| Prescripteur destinataire | Agence France Travail fictive — conseiller référent (non nommé) |
| Salarié concerné | Désignation convenue avec le prescripteur (pas de numéro de PASS IAE recopié si l'identifiant de suivi suffit) |
| Situation de la mission | Entreprise utilisatrice, poste, date de début (« à confirmer » tant que le client n'a pas confirmé) |
| Actions convenues | Qui fait quoi, pour quand |
| Freins repérés | Formulés en termes d'organisation (mobilité, horaires, garde, démarches) — jamais en termes de santé |
| Partenaires sollicités | Nom de l'organisme et objet de la sollicitation, sans détail personnel |
| Prochaine étape | Date, objet, personne responsable |
| Informations volontairement non transmises | Voir la liste de la partie 3 |

## Partie 2 — Exemple rempli (fictif) — point d'étape du 24/09/2026

| Rubrique | Contenu fictif |
| --- | --- |
| Objet du point d'étape | Point d'étape après l'entretien de suivi du 21/09/2026 et avant le démarrage envisagé d'une mission |
| Date du point d'étape | 24/09/2026 |
| Structure émettrice | Agence Horizon (ETTI fictive) — conseillère en insertion |
| Prescripteur destinataire | Agence France Travail fictive — conseiller référent (non nommé) |
| Salarié concerné | Salarié intérimaire en parcours d'insertion — identifiant de suivi convenu avec le prescripteur (non reproduit ici) |
| Situation de la mission | Mission de préparation manuelle de commandes auprès de l'entreprise utilisatrice Atelier Horizon Logistique (fictive). Début envisagé le 28/09/2026 — à confirmer par le client. Présence indicative 9 h à 17 h. Aucune conduite d'engin prévue. Contrat de mission et contrat de mise à disposition non encore établis. |
| Actions convenues | Horaires de la semaine suivante demandés au client par la conseillère (23/09). Trajet et arrêt de bus vérifiés par le salarié au plus tard le 24/09. Rémunération demandée au client par la conseillère avant le point de suivi. Point hebdomadaire prévu pendant la mission. |
| Freins repérés | Mobilité : pas de véhicule, accès au site en bus à confirmer. Aucun autre frein à signaler dans le cadre de ce point d'étape. |
| Partenaires sollicités | Aucun partenaire sollicité à ce stade. Une sollicitation d'un acteur de la mobilité est envisagée si le trajet en bus se révèle impraticable (à décider après vérification). |
| Prochaine étape | Confirmation ou non de la mission par l'entreprise utilisatrice, puis information du prescripteur ; prochain point avec le salarié le 24/09/2026 à 10 h. |
| Informations volontairement non transmises | Aucune donnée de santé ; aucun montant de salaire individuel ; aucune coordonnée personnelle non nécessaire. |

## Partie 3 — Informations à ne PAS transmettre au prescripteur

- Toute donnée de santé (arrêt, traitement, reconnaissance, situation médicale), même mentionnée par la personne.
- Le salaire individuel ou tout montant de rémunération.
- Les coordonnées inutiles au suivi (adresse personnelle, numéro de téléphone, courriel) lorsque le prescripteur les détient déjà ou n'en a pas besoin.
- Les éléments de vie privée sans lien avec le parcours (situation familiale détaillée, opinions, dettes).
- Les hypothèses non confirmées présentées comme des faits (mission « confirmée », trajet « validé »).

## Usage en formation

- Ce modèle sert à l'atelier Documents (FAQ sourcée) et aux ateliers de rédaction : il montre ce qu'un compte rendu peut devenir une fois filtré pour un tiers.
- Les participants ne remplissent ce modèle qu'avec les données fictives du cas Agence Horizon.
- Aucun outil d'IA ne reçoit de fiche de liaison réelle, même partiellement.
`,
  },

  // ---------------------------------------------------------------------------
  // R10 — Lexique ETTI
  // ---------------------------------------------------------------------------
  {
    code: 'R10',
    title: 'Lexique ETTI — repères pour la formation (fictif et simplifié)',
    kind: 'guide',
    version_label: 'Version 1',
    dated_on: '2026-09-01',
    trainer_only: false,
    fictional: true,
    obsolete: false,
    body: `${HEADER}

## Lexique ETTI — repères pour la formation (fictif et simplifié)

**Repères pédagogiques issus de documents publics (fiche Avise/CRDLA IAE, janvier 2026 ; plateforme de l'inclusion). Ne remplace ni les textes ni les consignes de votre structure.**

Les définitions ci-dessous sont volontairement courtes et prudentes. Les durées, montants et conditions évoluent : vérifier chaque point sur les sources de la ressource R7 et auprès de votre structure avant de l'utiliser dans un document réel.

## Cadre général

| Terme | Repère simplifié |
| --- | --- |
| IAE (insertion par l'activité économique) | Cadre qui permet à des personnes éloignées de l'emploi de travailler, avec un accompagnement, dans des structures conventionnées par l'État. |
| SIAE (structure d'insertion par l'activité économique) | Structure conventionnée relevant de l'IAE. Plusieurs types existent ; l'ETTI en est un. |
| ETTI (entreprise de travail temporaire d'insertion) | SIAE qui fonctionne comme une agence d'intérim : elle met des salariés en parcours d'insertion à disposition d'entreprises utilisatrices, tout en assurant un accompagnement. |
| Salarié intérimaire en parcours d'insertion | Personne salariée de l'ETTI dans le cadre d'un parcours d'insertion, mise à disposition d'entreprises utilisatrices par des contrats de mission. |
| PASS IAE | Autorisation d'entrée en parcours IAE, d'une durée indicative de deux ans, délivrée via la plateforme de l'inclusion. Les règles de délivrance et de prolongation sont à vérifier auprès de la plateforme et de la structure. |
| Prescripteur habilité | Organisme autorisé à valider l'éligibilité à un parcours IAE (par exemple France Travail ou un autre organisme habilité). La liste et les conditions relèvent des textes et de la plateforme. |
| Auto-prescription | Possibilité, dans des conditions définies, pour une SIAE de valider elle-même l'éligibilité d'une personne sur des critères administratifs. À vérifier sur la plateforme de l'inclusion. |

## L'activité : de l'intérim d'insertion

| Terme | Repère simplifié |
| --- | --- |
| Intérim d'insertion | Cœur de l'activité d'une ETTI : comme une agence d'intérim, elle reçoit des commandes d'entreprises utilisatrices, propose des salariés intérimaires en parcours d'insertion, les délègue en mission, suit la mission et la facture ; l'accompagnement s'articule à ces missions. |
| Commande | Besoin exprimé par une entreprise utilisatrice : poste, tâches, horaires, durée, compétences, équipements, accès au site, tuteur. Une commande n'est pas une mission confirmée tant que l'entreprise n'a pas validé la proposition. |
| Délégation | Mise à disposition d'un salarié intérimaire sur une mission : contrat de mission d'un côté, contrat de mise à disposition de l'autre. |
| Préparation et accueil de mission | Avant le premier jour : horaires, trajet, tenue et équipements, consignes de sécurité, tuteur, premier point de suivi. L'accueil sécurité et la formation au poste relèvent de l'entreprise utilisatrice. |
| Suivi de mission | Points réguliers avec le salarié et l'entreprise utilisatrice, traitement des incidents, relevés d'heures, renouvellement éventuel. |
| Relevé d'heures | Document qui atteste les heures travaillées et sert à la paie et à la facturation. Il contient des données personnelles : jamais dans un outil d'IA externe. |
| Fin de mission | Clôture d'une mission : bilan avec le salarié et l'entreprise, suite de parcours (nouvelle mission, formation, emploi). Les indemnités et documents de fin de mission suivent les règles du travail temporaire, à vérifier auprès de la structure. |

## Contrats et relations avec l'entreprise utilisatrice

| Terme | Repère simplifié |
| --- | --- |
| Contrat de mission | Contrat de travail conclu entre l'ETTI et le salarié intérimaire pour une mission donnée. |
| Contrat de mise à disposition | Contrat commercial conclu entre l'ETTI et l'entreprise utilisatrice pour la mise à disposition du salarié. |
| Entreprise utilisatrice | Entreprise qui accueille le salarié intérimaire sur son site et lui confie des tâches pendant la mission. |
| Clause sociale d'insertion | Clause d'un marché (souvent public) qui réserve une part des heures de travail à des personnes en insertion. Elle peut concerner des missions confiées à une ETTI. |
| Facilitateur | Personne ou organisme qui aide à mettre en œuvre les clauses sociales d'insertion sur un territoire ou un marché. |

## Accompagnement et parcours

| Terme | Repère simplifié |
| --- | --- |
| Accompagnement socioprofessionnel | Suivi assuré par la SIAE pour construire le projet professionnel et traiter les difficultés qui freinent l'accès à l'emploi. |
| Levée des freins | Actions visant à réduire les obstacles à l'emploi (mobilité, logement, garde, santé, démarches), souvent avec des partenaires. Les données qui s'y rapportent sont sensibles et ne se transmettent pas à un outil d'IA. |
| Parcours de 24 mois maximum (dérogations) | Durée maximale indicative d'un parcours IAE, avec des dérogations prévues dans certaines situations. À vérifier dans les textes et auprès de la structure. |
| Sortie (emploi durable, emploi de transition, sortie positive) | Catégories utilisées pour décrire la situation d'une personne à la fin de son parcours ; les définitions précises relèvent des textes et du dialogue de gestion. |

## Financement et pilotage

| Terme | Repère simplifié |
| --- | --- |
| Aide au poste (socle + part modulée) | Aide financière de l'État versée à la SIAE par poste d'insertion, avec un montant socle et une part modulée selon des critères. Montants et critères évoluent chaque année. |
| DDETS | Service déconcentré de l'État qui conventionne et suit les SIAE au niveau départemental. |
| ASP (Agence de services et de paiement) | Organisme qui verse les aides au poste pour le compte de l'État. |
| Dialogue de gestion | Échange annuel entre la SIAE et l'État sur les résultats, les objectifs et les moyens. |

## Outils et réseaux

| Terme | Repère simplifié |
| --- | --- |
| Les emplois de l'inclusion | Service public numérique (plateforme de l'inclusion) utilisé pour les candidatures, la délivrance des PASS IAE et le suivi des parcours. |
| CIPI / CDPI | Contrats d'insertion ou de développement professionnel intérimaires, propres à la branche du travail temporaire ; leurs conditions sont à vérifier auprès de la branche et de la structure. |
| FASTT | Fonds d'action sociale du travail temporaire : services d'aide (logement, mobilité, santé, garde) destinés aux intérimaires. Conditions d'accès à vérifier. |
| AKTO | Opérateur de compétences dont relève notamment la branche du travail temporaire ; il finance des actions de formation selon ses règles. |

## Usage en formation

- Ce lexique sert à comprendre les ressources R1 à R9 et à utiliser un vocabulaire cohérent dans les productions.
- Il ne doit pas être cité comme source : pour une information à transmettre, partir de la ressource R7 et vérifier la page d'origine.
`,
  },
];

/**
 * Contenu éditorial du programme « Créer sa boîte à outils IA pour agir au
 * quotidien en ETT / ETTI / EATT ».
 *
 * Ce fichier ne contient que des littéraux : il sert de source pour le
 * générateur de seed et pour le mode démo local. Tout le cas pratique est
 * fictif (« Agence Horizon — ETTI fictive, cas pédagogique ») ; aucune donnée
 * réelle n'y figure et aucune ne doit y être ajoutée.
 *
 * Ancrage métier : chaque séquence vise une tâche réelle et chronophage d'un
 * permanent d'ETTI (compte rendu de suivi, point d'étape prescripteur,
 * réponse aux questions récurrentes sur une mission, préparation de visite
 * d'entreprise utilisatrice, parcours d'accueil IAE, affiche d'agence,
 * courriel de préparation de mission). Le temps observé en atelier est une
 * mesure sur cette tâche et ce document fictif, jamais une promesse générale.
 */

import type { BreakdownItem, Rubric, WorkshopContent, WorkshopPrivateContent } from '../lib/types';

export const PROGRAM_META = {
  slug: 'boite-a-outils-ia-ett',
  title: `Créer sa boîte à outils IA pour agir au quotidien en ETT / ETTI / EATT`,
  description: `Formation de deux séances (7 heures au total) conçue pour les permanents d'entreprises de travail temporaire d'insertion (ETTI), et ouverte aux équipes des ETT et des EATT. Une ETTI est une structure d'insertion par l'activité économique : elle combine missions chez des entreprises utilisatrices, accompagnement socioprofessionnel et formation, dans un parcours de 24 mois maximum ouvert par un PASS IAE, avec des points d'étape réguliers auprès du prescripteur. Les permanents y passent une grande partie de leur temps à écrire : comptes rendus d'entretien de suivi, courriels de préparation de mission, réponses aux mêmes questions posées par le salarié intérimaire en parcours d’insertion, l'entreprise utilisatrice et le prescripteur, fiches de visite, reporting de parcours. À partir d'un cas fictif unique (Agence Horizon, ETTI fictive, et son entreprise utilisatrice fictive Atelier Horizon Logistique), chaque participant teste six familles d'usages de l'IA sur ces tâches précises, chronomètre le temps réellement passé (préparation, vérification, corrections comprises) et en tire une mesure honnête, valable pour cette tâche seulement. À chaque étape, la règle est la même : l'outil propose, le permanent vérifie, décide et reste responsable ; une confirmation d'entreprise utilisatrice, une rémunération ou une date ne s'inventent jamais. La formation se termine par un plan d'application personnel à tester dans la semaine qui suit.`,
  prerequisites: `Savoir utiliser un ordinateur, un navigateur et une messagerie. Connaître le fonctionnement de base de sa structure (missions, accompagnement, lien avec les prescripteurs) : aucune connaissance de l'IA n'est demandée. Disposer d'un accès aux outils autorisés par sa structure, ou utiliser les solutions de secours prévues. Venir avec, en tête, une tâche écrite de son poste qui revient souvent (aucun dossier réel n'est apporté ni utilisé).`,
  audience: `Permanents d'ETTI : chargés d'insertion et conseillers en insertion professionnelle, chargés de recrutement et de mise à disposition, responsables d'agence, assistants administratifs et commerciaux. Ouvert aux équipes des ETT et des EATT qui exercent des fonctions comparables (recrutement, relation entreprise, accompagnement, administration d'agence).`,
  editorial_reference: 'Septembre 2026',
  verification_date: '2026-10-01',
};

export const PROGRAM_OBJECTIVES: string[] = [
  `Transformer une transcription fictive d'entretien de suivi en mission en compte rendu fidèle et en plan d'action, sans inventer de fait, de date, de rémunération ni de confirmation d'entreprise utilisatrice.`,
  `Répondre aux questions récurrentes sur une mission à partir des documents de l'agence, retrouver les passages justificatifs et signaler les informations absentes ou contradictoires.`,
  `Préparer une visite d'entreprise utilisatrice (ou un rendez-vous avec un facilitateur de clauses sociales) à partir de sources publiques consultées, datées et vérifiées, en séparant faits, hypothèses commerciales et questions.`,
  `Représenter le parcours d'accueil IAE de l'agence en schéma sans modifier ses étapes, son ordre ni le point de validation du permanent responsable, pour l'expliquer à un salarié en parcours d’insertion.`,
  `Concevoir un support d'agence clair et inclusif destiné aux salariés en parcours d’insertion, en contrôlant le texte, les visuels et les droits d'usage.`,
  `Comparer deux assistants sur un courriel de préparation de mission et choisir deux ou trois outils adaptés à son poste et aux règles de sa structure.`,
  `Distinguer ce qu'on peut déléguer à l'IA de ce qu'on doit vérifier soi-même (confirmation de l'entreprise utilisatrice, données du salarié, échéances vis-à-vis du prescripteur) et mesurer le temps réellement passé plutôt que l'estimer.`,
];

export const RUBRIC: Rubric = {
  title: `Grille formative commune (sur 10)`,
  criteria: [
    {
      key: 'c1',
      label: `Fidélité aux sources`,
      description: `Le livrable ne contient aucune information inventée : chaque fait, date, montant ou confirmation d'entreprise utilisatrice vient d'un document fourni ou d'une page consultée. 0 : une information déterminante est inventée (mission « confirmée », rémunération, trajet « validé »). 1 : fidèle avec une imprécision secondaire. 2 : entièrement fidèle, les inconnues sont nommées comme telles et attribuées à un responsable.`,
      max: 2,
    },
    {
      key: 'c2',
      label: `Respect des données`,
      description: `Seules les ressources fictives sont utilisées ; aucune donnée réelle (nom d'un salarié en insertion, coordonnées, numéro administratif, PASS IAE, santé, RQTH, minimum social, salaire individuel) n'est transmise à un outil ni déposée. 0 : une donnée réelle a été transmise ou déposée. 1 : respect global avec une maladresse sans donnée réelle. 2 : respect complet et explicité.`,
      max: 2,
    },
    {
      key: 'c3',
      label: `Clarté et utilité du livrable`,
      description: `Le livrable est compréhensible par un collègue d'agence qui n'a pas suivi l'atelier, respecte le format demandé (longueur, tableau, rubriques) et répond à la consigne. 0 : illisible ou hors sujet. 1 : utilisable avec des retouches. 2 : directement réutilisable au poste.`,
      max: 2,
    },
    {
      key: 'c4',
      label: `Contrôle humain documenté`,
      description: `Le permanent explique ce qu'il a vérifié, ce qu'il a corrigé et ce qui reste à faire valider (par le responsable d'agence, l'entreprise utilisatrice ou le prescripteur). 0 : aucun contrôle décrit. 1 : un contrôle décrit. 2 : au moins deux contrôles décrits, avec les incertitudes signalées.`,
      max: 2,
    },
    {
      key: 'c5',
      label: `Choix et usage de l'outil`,
      description: `Le prompt est complet (contexte, tâche, données, contraintes, format, contrôles), l'outil utilisé est autorisé par la structure ou la solution de secours est assumée, et le choix est justifié. 0 : outil non autorisé ou prompt absent. 1 : prompt partiel ou justification faible. 2 : prompt complet et choix expliqué.`,
      max: 2,
    },
  ],
  pass_threshold: 7,
  min_on_criteria: [
    { key: 'c1', min: 1 },
    { key: 'c4', min: 1 },
  ],
  note: `Le seuil de 7/10 et les minimums sur « Fidélité aux sources » et « Contrôle humain documenté » sont un choix pédagogique de l'équipe de formation, modifiable par le formateur selon le groupe. Ils ne constituent pas une norme légale ni une certification. Quelle que soit la note, une divulgation de donnée réelle ou une information déterminante inventée (confirmation d'entreprise utilisatrice, montant, date, règle) empêche de déclarer le livrable « prêt à réutiliser » tant qu'elle n'est pas corrigée. Le temps observé en atelier n'entre pas dans la note : c'est une mesure pour le participant, pas un critère.`,
};

export interface WorkshopSeed {
  code: string;
  title: string;
  seance: 1 | 2;
  position: number;
  duration_min: number;
  breakdown: BreakdownItem[];
  content: WorkshopContent;
  private_content: WorkshopPrivateContent;
}

const DEPOSIT_NOTICE = `Rappel avant dépôt : utilisez uniquement les ressources fictives de la formation (Agence Horizon, ETTI fictive). Ne déposez jamais de dossier réel de salarié en parcours d’insertion, d'identifiant PASS IAE, de numéro de sécurité sociale, de coordonnées personnelles, de mention de santé ou de RQTH, de montant de salaire individuel ni d'extrait de la plateforme « Les emplois de l'inclusion », même partiellement masqués.`;

const TIME_NOTICE = `Le temps noté dans le champ « Temps sur cette tâche » (préparation du prompt, attente, lecture, vérification et corrections) est une mesure de cette tâche sur un document fictif, pas une promesse générale de gain.`;

export const WORKSHOPS: WorkshopSeed[] = [
  // ---------------------------------------------------------------------
  // SÉANCE 1
  // ---------------------------------------------------------------------
  {
    code: 'ACC',
    title: `Accueil, diagnostic et choix d'une tâche prioritaire`,
    seance: 1,
    position: 1,
    duration_min: 20,
    breakdown: [
      { label: 'Instructions', minutes: 8 },
      { label: 'Positionnement actif', minutes: 12 },
    ],
    content: {
      objective: `À la fin de cette séquence, chaque participant a situé son poste parmi les fonctions d'une ETTI, a formulé par écrit une tâche prioritaire de son quotidien sur laquelle il souhaite tester l'IA, ainsi que deux attentes concrètes pour la formation.`,
      brief: `Bienvenue. Pendant huit minutes, le formateur présente le déroulement des deux séances, le cas fictif « Agence Horizon » (une ETTI fictive, sa conseillère en insertion, un salarié intérimaire en parcours d’insertion et l'entreprise utilisatrice fictive Atelier Horizon Logistique) qui servira de fil conducteur, les règles de la formation (aucune donnée réelle, vérification humaine systématique) et la façon de déposer ses productions dans l'application. Le lexique ETTI (R10) rappelle les termes utilisés : PASS IAE, prescripteur habilité, contrat de mission, contrat de mise à disposition, entreprise utilisatrice, aide au poste, dialogue de gestion. Pendant les douze minutes suivantes, vous remplissez seul votre positionnement : votre poste (chargé d'insertion ou conseiller en insertion professionnelle, chargé de recrutement et de mise à disposition, responsable d'agence, assistant administratif ou commercial, ou fonction équivalente en ETT / EATT), votre aisance avec les outils numériques, votre expérience éventuelle des assistants IA, puis vous choisissez une tâche prioritaire de votre quotidien. Choisissez une tâche écrite, précise et répétée, par exemple : rédiger le compte rendu d'un entretien de suivi en mission ; préparer le point d'étape avec le prescripteur ; remplir la fiche de liaison ; écrire le courriel à l'entreprise utilisatrice avant une mission ; préparer une visite d'entreprise utilisatrice ; renseigner le reporting de parcours ; rédiger une offre de mission claire. Évitez un domaine large (« le recrutement », « l'accompagnement »). Cette tâche vous servira de repère tout au long de la formation et dans votre plan d'application final.`,
      resource_codes: ['R7', 'R10'],
      steps: [
        `Écouter la présentation du déroulement et noter une question éventuelle pour le formateur.`,
        `Lire la règle des données : seules les ressources fictives sont utilisées, aucune donnée réelle de salarié en insertion, d'entreprise utilisatrice ou de prescripteur n'est saisie dans un outil.`,
        `Indiquer son poste en ETTI (ou ETT / EATT) et son niveau d'aisance avec les outils numériques (de 1 à 4).`,
        `Indiquer si l'on a déjà utilisé un assistant IA, et pour quoi faire.`,
        `Choisir une tâche prioritaire dans la liste d'exemples ETTI ou en formuler une équivalente, en une phrase commençant par un verbe.`,
        `Écrire deux attentes concrètes pour la formation (ce que je veux savoir faire en partant).`,
        `Vérifier que la tâche choisie peut être testée en formation sans aucune donnée personnelle réelle.`,
      ],
      deliverable: `Une fiche de positionnement contenant : le poste, la tâche prioritaire formulée en une phrase (choisie dans les exemples ETTI ou équivalente), deux attentes, le niveau d'aisance et l'expérience éventuelle de l'IA.`,
      success_criteria: [
        `La tâche prioritaire est formulée en une phrase, avec un verbe d'action et un résultat attendu, et correspond à une tâche réelle d'un permanent d'ETTI (ou de son équivalent en ETT / EATT).`,
        `La tâche est répétée dans le poste (au moins une fois par semaine) et réalisable sans donnée réelle en formation.`,
        `Deux attentes concrètes sont écrites.`,
        `Le poste, le niveau d'aisance et l'expérience de l'IA sont renseignés.`,
        `Le participant a confirmé avoir compris la règle « ressources fictives uniquement ».`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Partir d'une tâche écrite qui revient souvent`,
          text: `Pensez à votre semaine type en agence : quelle tâche écrite revient le plus souvent ? Compte rendu après un entretien de suivi, courriel à l'entreprise utilisatrice avant une mission, point d'étape à préparer pour le prescripteur, réponse à la même question sur les horaires ou l'accueil, fiche de liaison, reporting de parcours… Une bonne tâche prioritaire est une tâche que vous faites déjà, que vous pourriez décrire à un collègue en deux phrases et dont vous savez reconnaître un bon résultat.`,
        },
        {
          level: 'trame',
          title: `Gabarit de formulation`,
          text: `Mon poste : [chargé d'insertion / conseiller en insertion professionnelle / chargé de recrutement et de mise à disposition / responsable d'agence / assistant administratif ou commercial / autre]. Ma tâche prioritaire : « [verbe d'action] + [objet] + [pour qui : salarié en parcours, entreprise utilisatrice, prescripteur, équipe] ». Fréquence : [par jour / par semaine / par mois]. Ce qui me prend du temps aujourd'hui : [...]. Ce que je dois absolument contrôler moi-même : [...]. Attente 1 : « À la fin de la formation, je veux savoir [...] ». Attente 2 : « Je veux avoir décidé si [...] ».`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (cas fictif)`,
          text: `Poste : conseillère en insertion dans une ETTI. Tâche prioritaire : « Rédiger le compte rendu après chaque entretien de suivi en mission, avec les actions à faire, qui les fait et pour quand, pour pouvoir préparer le point d'étape avec le prescripteur. » Fréquence : plusieurs fois par semaine. Ce qui prend du temps : remettre mes notes au propre le soir, retrouver qui devait faire quoi. Ce que je dois contrôler moi-même : les dates, ce qui est confirmé ou non par l'entreprise utilisatrice. Attente 1 : savoir ce que je peux donner à un outil sans risque pour le salarié. Attente 2 : avoir un prompt que je peux réutiliser lundi.`,
        },
      ],
      debrief_questions: [
        `Quelle tâche revient le plus souvent dans le groupe ? Est-elle commune aux chargés d'insertion, aux chargés de recrutement et aux assistants d'agence ?`,
        `Quelles tâches du groupe demandent une validation humaine (responsable d'agence, entreprise utilisatrice, prescripteur) avant tout envoi ?`,
      ],
      fallback: `Si l'application n'est pas accessible, la fiche de positionnement est remplie sur papier (modèle imprimé par le formateur) et recopiée plus tard, ou conservée par le participant.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Je suis permanent(e) dans une ETTI (ou ETT / EATT) sur le poste de [poste].`,
        task: `Je cherche à décrire une tâche prioritaire de mon poste en une phrase claire.`,
        data: `Aucune donnée réelle : uniquement la description de ma tâche.`,
        constraints: `Pas de nom de salarié en insertion, pas d'entreprise utilisatrice réelle, pas de prescripteur nommé.`,
        format: `Une phrase avec un verbe d'action, puis deux attentes.`,
        controls: `Je vérifie que la tâche est réalisable en formation avec des ressources fictives.`,
      },
      levels: {
        guided: `Suivez les sept étapes dans l'ordre, choisissez votre tâche dans la liste d'exemples ETTI et utilisez la trame pour la formuler.`,
        autonomous: `Formulez directement votre tâche prioritaire et vos attentes, puis vérifiez-les avec les critères de réussite.`,
        bonus: `Notez une deuxième tâche de votre poste que vous ne confieriez jamais à un outil IA (par exemple l'annonce d'une fin de parcours, un échange sur une situation de santé) et dites en une phrase pourquoi. Cette note n'est pas évaluée.`,
      },
      work_mode: 'individual',
      families: [],
      production_kind: 'text',
      deposit_notice: DEPOSIT_NOTICE,
      job_context: {
        task: `Se situer dans les fonctions d'une ETTI et choisir la tâche écrite du quotidien sur laquelle tester l'IA pendant les deux séances.`,
        time_sinks: `Les permanents d'ETTI accumulent les écrits en fin de journée : comptes rendus de suivi, courriels aux entreprises utilisatrices, préparation des points prescripteur, saisies sur la plateforme ; sans tâche précise, on teste l'IA sur tout et on ne mesure rien.`,
        delegable: `Rien à ce stade : le diagnostic se fait sans outil. Un assistant pourra plus tard aider à reformuler une tâche trop large.`,
        must_verify: `Que la tâche choisie est réelle, répétée et testable sans donnée de salarié, d'entreprise utilisatrice ou de prescripteur.`,
        why_etti: `Avec un taux d'accompagnement d'environ 11 % des ETP (FEI 2025) et des parcours courts (durée médiane 2,6 mois, Dares 2023), chaque permanent suit beaucoup de situations à la fois : choisir la bonne tâche à outiller est la première économie de temps.`,
      },
    },
    private_content: {
      answer_key: `## Attendu

Il n'y a pas de bonne réponse unique. Une fiche est satisfaisante quand :

- le poste est situé parmi les fonctions d'une ETTI (ou son équivalent ETT / EATT) ;
- la tâche est précise (verbe + objet + destinataire), répétée, et testable sans donnée réelle ;
- les deux attentes sont concrètes (pas « découvrir l'IA ») ;
- le participant a compris la règle des ressources fictives.

## Exemples de tâches bien formulées (par poste)

- Chargé d'insertion / CIP : « Rédiger le compte rendu de suivi après un entretien, avec le tableau des actions, pour préparer le point d'étape avec le prescripteur. »
- Chargé de recrutement et de mise à disposition : « Écrire le courriel de préparation de mission à l'entreprise utilisatrice à partir de la fiche de mission, sans annoncer de confirmation. »
- Responsable d'agence : « Préparer une fiche de visite avant de rencontrer une entreprise utilisatrice ou un facilitateur de clauses sociales. »
- Assistant administratif / commercial : « Répondre aux questions récurrentes des salariés en parcours sur la procédure d'accueil à partir de nos documents internes. »
- Tout poste : « Transformer la procédure d'accueil IAE en schéma lisible pour un nouveau salarié en parcours. »

## Reformulations à proposer

- « Le recrutement » → « Rédiger une offre de mission claire à partir d'une fiche de mission validée ».
- « L'accompagnement » → « Rédiger le compte rendu d'entretien de suivi avec actions, responsables et échéances ».
- « Le reporting » → « Préparer en cinq lignes la synthèse d'un parcours pour le point d'étape avec le prescripteur, sans donnée inutile ».
- « Gagner du temps » → « Réduire les allers-retours sur les comptes rendus en les rendant plus complets dès la première version ; mesurer le temps réellement passé ».`,
      trainer_notes: `## Animation

- Tenir les 8 minutes d'instructions : le déroulement, le cas fictif Agence Horizon (ETTI fictive, conseillère en insertion, salarié intérimaire en parcours d’insertion, entreprise utilisatrice fictive), la règle des données, le dépôt dans l'application. Montrer l'écran de dépôt une fois et le champ « Temps sur cette tâche » qui apparaîtra dans les ateliers.
- Insister sur « ressources fictives uniquement » dès maintenant : c'est la règle la plus souvent oubliée en atelier 1. Rappeler que les données des salariés en parcours (PASS IAE, santé, RQTH, minima sociaux) sont parmi les plus protégées.
- Annoncer que la tâche prioritaire sera reprise en séance 2 (défi individuel et plan d'application) et que le temps passé sera noté à chaque atelier comme une mesure, jamais comme une promesse.
- Renvoyer au lexique R10 pour les participants venant d'ETT ou d'EATT qui ne connaissent pas le vocabulaire IAE.

## Pièges fréquents

- Tâches trop larges (« le sourcing », « l'accompagnement ») : demander « quelle est la première action écrite de cette tâche ? ».
- Attentes générales (« découvrir ») : demander ce que la personne veut avoir en main lundi matin.
- Participants qui veulent tester leurs vrais dossiers ou un export de la plateforme : rappeler que la formation sert à apprendre la méthode, pas à traiter les dossiers du jour.
- Promesses de gain entendues ailleurs : ne pas les reprendre ; dire que chacun mesurera sur sa tâche.

## Rythmes différents

- Personnes rapides : leur proposer le bonus (une tâche à ne jamais déléguer).
- Personnes en difficulté : partir de leur journée d'hier et chercher une tâche écrite dans la liste d'exemples ETTI.`,
    },
  },

  {
    code: 'DEF',
    title: `Défi : Que peut-on transmettre à une IA ?`,
    seance: 1,
    position: 2,
    duration_min: 20,
    breakdown: [
      { label: 'Consignes', minutes: 5 },
      { label: 'Tri et justification', minutes: 15 },
    ],
    content: {
      objective: `À la fin du défi, chaque binôme a classé huit types d'informations rencontrées en ETTI en trois catégories (transmissible à un outil IA externe, à ne pas transmettre, transmissible selon conditions) et a justifié chaque choix en nommant l'autorisation, la finalité et la protection qui seraient nécessaires en situation réelle.`,
      brief: `En binôme, vous recevez huit cartes. Chacune décrit un type d'information que l'on manipule chaque jour en ETTI : une procédure publique d'accueil, une fiche métier publique, le nom d'un salarié en parcours d’insertion, un numéro de téléphone personnel, un numéro administratif (PASS IAE, sécurité sociale), un renseignement de santé (RQTH, arrêt maladie), un montant de salaire individuel, une description non identifiante d'une tâche de mission. Pour chaque carte, décidez ensemble : peut-on la transmettre à un outil IA externe (c'est-à-dire un service en ligne hors de la structure, hors de la plateforme « Les emplois de l'inclusion » et hors des logiciels validés par l'agence) ? Trois réponses possibles : « transmissible », « à ne pas transmettre », « selon conditions ». Pour chaque carte, écrivez une justification d'une ou deux phrases. Pour les cartes « selon conditions », précisez quelle autorisation, quelle finalité et quelle protection seraient nécessaires en situation réelle. Attention : remplacer un nom par une initiale ne rend pas une information anonyme (l'agence, la date, la mission et le parcours suffisent souvent à retrouver la personne), et un consentement obtenu ne règle pas à lui seul toutes les questions. Vous avez quinze minutes ; le débrief suit immédiatement. À la fin, notez dans le champ « Temps sur cette tâche » le temps que le tri vous a pris : c'est une mesure de cet exercice, pas une promesse ; la règle fixée ici s'applique à tous les ateliers suivants.`,
      resource_codes: ['R7', 'R10'],
      steps: [
        `Lire les huit cartes et se répartir la lecture à voix haute dans le binôme.`,
        `Classer chaque carte dans l'une des trois colonnes : transmissible, à ne pas transmettre, selon conditions.`,
        `Écrire une justification courte pour chaque carte.`,
        `Pour chaque carte « selon conditions », préciser l'autorisation, la finalité et la protection nécessaires.`,
        `Repérer la carte sur laquelle le binôme a hésité le plus et noter pourquoi.`,
        `Vérifier qu'aucune justification ne repose sur « il suffit d'enlever le nom » ni sur « la personne est d'accord ».`,
      ],
      deliverable: `Le tri des huit cartes en trois catégories, avec une justification par carte et, pour les cartes conditionnelles, l'autorisation, la finalité et la protection attendues.`,
      success_criteria: [
        `Les huit cartes sont classées, aucune n'est laissée sans catégorie.`,
        `Chaque carte a une justification d'au moins une phrase.`,
        `Les cartes « selon conditions » nomment une autorisation, une finalité et une protection.`,
        `Le numéro administratif (PASS IAE, sécurité sociale) et le renseignement de santé (RQTH, arrêt maladie) ne sont pas classés « transmissible ».`,
        `Le binôme a identifié qu'un nom remplacé par une initiale ne suffit pas à anonymiser et que le consentement n'est pas synonyme de conformité.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Poser trois questions à chaque carte`,
          text: `Pour chaque carte, demandez-vous : 1) Est-ce que cette information permet, seule ou combinée avec d'autres (agence, date, mission, entreprise utilisatrice), de reconnaître une personne ? 2) Est-ce une information particulièrement protégée (santé, RQTH, situation administrative, ressources, minimum social) ? 3) Est-ce que l'outil en question est validé par ma structure et pour cet usage ? Si vous répondez « oui » à la première ou la deuxième question, la carte ne peut pas être « transmissible » sans conditions.`,
        },
        {
          level: 'trame',
          title: `Gabarit de justification`,
          text: `Carte [n°] – [libellé]. Catégorie : [transmissible / à ne pas transmettre / selon conditions]. Pourquoi : [cette information est publique / permet d'identifier un salarié en parcours / est particulièrement protégée / n'identifie personne]. Si « selon conditions » : autorisation nécessaire : [qui doit valider dans ma structure : responsable d'agence, référent données, direction ?] ; finalité : [pour quoi faire précisément : brouillon de courriel, reformulation, schéma ?] ; protection : [outil validé par la structure, pas d'outil grand public, suppression après usage, pas de combinaison avec d'autres données du parcours].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple pour une carte`,
          text: `Carte « description non identifiante d'une tâche de mission » : « préparation manuelle de commandes en entrepôt, six mois d'expérience, disponible fin septembre ». Catégorie : selon conditions. Pourquoi : prise seule, elle n'identifie personne ; mais combinée au nom de l'agence, à la date exacte, à l'entreprise utilisatrice et au fait que la personne est en parcours d’insertion, elle peut désigner une personne précise. Conditions : outil validé par la structure, aucun ajout de nom, d'adresse, de date de naissance ni de mention « en parcours IAE », usage limité à la rédaction d'un brouillon relu.`,
        },
      ],
      debrief_questions: [
        `Sur quelle carte les binômes ne sont-ils pas d'accord ? Qu'est-ce qui change la réponse ?`,
        `Pourquoi remplacer un nom par une initiale ne suffit-il pas, surtout quand on sait que la personne est en parcours d’insertion dans une agence donnée ?`,
        `Dans votre structure, qui peut dire si un outil est autorisé pour un usage donné ? Et où ces règles sont-elles écrites ?`,
      ],
      fallback: `Les huit cartes sont imprimées ; le tri se fait sur table avec trois zones et des post-it pour les justifications. Le formateur photographie ou recopie le résultat de chaque binôme pour le débrief.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Défi de tri sans outil IA : cet exercice se fait sans assistant.`,
        task: `Classer huit types d'information rencontrés en ETTI selon qu'on peut ou non les transmettre à un outil IA externe.`,
        data: `Les huit cartes fictives du défi, aucune donnée réelle.`,
        constraints: `Aucune donnée réelle, aucune carte laissée sans justification.`,
        format: `Trois colonnes, une justification par carte.`,
        controls: `Vérifier que les cartes identifiantes ou particulièrement protégées (santé, RQTH, PASS IAE, salaire) ne sont pas « transmissibles » sans conditions.`,
      },
      levels: {
        guided: `Utilisez les trois questions de l'indice pour chaque carte, puis remplissez le gabarit de justification.`,
        autonomous: `Classez les huit cartes, justifiez, puis préparez un argument pour défendre votre choix le plus discutable au débrief.`,
        bonus: `Ajoutez une neuvième carte issue de votre quotidien en ETTI (sans donnée réelle : par exemple « extrait de fiche de liaison prescripteur », « capture de la plateforme des emplois de l'inclusion », « motif de fin de contrat ») et classez-la. Notez aussi, dans le champ prévu par l'application, le temps que ce tri vous a pris : c'est une mesure de cet exercice, pas une promesse. Ce bonus n'est pas évalué.`,
      },
      work_mode: 'pair',
      families: ['transcription', 'documents', 'assistants'],
      production_kind: 'data_sort',
      time_tracking: true,
      data_cards: [
        {
          id: 'c1',
          label: `Procédure publique d'accueil`,
          detail: `Un extrait d'une procédure publiée sur un site institutionnel public (par exemple les étapes de l'éligibilité IAE et de la délivrance du PASS IAE décrites sur le site de la plateforme « Les emplois de l'inclusion » ou sur Service-Public.fr). Aucune personne n'y est nommée.`,
        },
        {
          id: 'c2',
          label: `Fiche métier publique`,
          detail: `Une fiche métier « préparateur / préparatrice de commandes » issue d'un répertoire public : activités, compétences, conditions d'exercice, équipements de protection. Pas de nom, pas d'entreprise utilisatrice.`,
        },
        {
          id: 'c3',
          label: `Nom d'un salarié en insertion`,
          detail: `Le prénom et le nom d'un salarié intérimaire en parcours d’insertion accompagné par l'agence (dans le cas fictif : la personne reçue le 21/09/2026 par la conseillère). Même avec une initiale à la place du nom : être nommé dans un document d'ETTI révèle à lui seul un parcours IAE.`,
        },
        {
          id: 'c4',
          label: `Numéro de téléphone personnel`,
          detail: `Le numéro de téléphone personnel d'un salarié en parcours, noté dans sa fiche pour le joindre avant une mission ou en cas de changement d'horaire par l'entreprise utilisatrice.`,
        },
        {
          id: 'c5',
          label: `Numéro administratif (PASS IAE, sécurité sociale)`,
          detail: `Un numéro administratif individuel : identifiant PASS IAE délivré via la plateforme « Les emplois de l'inclusion » ou numéro de sécurité sociale figurant dans un dossier d'embauche ou un contrat de mission.`,
        },
        {
          id: 'c6',
          label: `Renseignement de santé (RQTH, arrêt maladie)`,
          detail: `Une mention de santé notée lors d'un entretien ou d'un diagnostic socioprofessionnel : reconnaissance de la qualité de travailleur handicapé (RQTH), arrêt maladie en cours, restriction médicale au port de charges. Même sans le nom de la personne.`,
        },
        {
          id: 'c7',
          label: `Montant de salaire individuel`,
          detail: `Le salaire exact d'un salarié précis sur une mission précise, tel qu'il apparaîtrait sur son contrat de mission ou son bulletin de paie, ou la mention d'un minimum social perçu avant l'entrée en parcours.`,
        },
        {
          id: 'c8',
          label: `Description non identifiante d'une tâche de mission`,
          detail: `« Préparation manuelle de commandes dans un entrepôt, six mois d'expérience, disponible fin septembre. » Sans nom, sans entreprise utilisatrice nommée, sans date de naissance, sans adresse, sans mention de parcours IAE.`,
        },
      ],
      deposit_notice: DEPOSIT_NOTICE,
      job_context: {
        task: `Décider, avant chaque usage d'un assistant, ce que l'on peut coller dans un outil externe parmi les informations d'un parcours d’insertion et d'une mission.`,
        time_sinks: `En ETTI, le réflexe « j'anonymise vite fait en enlevant le nom » coûte du temps après coup : vérifications, reprises, questions au responsable ou au référent données, parfois signalement ; décider la règle une fois évite de la refaire à chaque courriel.`,
        delegable: `Rien dans ce défi : la décision sur les données ne se délègue pas à l'outil. Par la suite, seules les informations publiques ou non identifiantes, validées par la structure, sont confiées à un assistant.`,
        must_verify: `Que l'information ne permet pas, combinée au contexte (agence, date, mission, parcours IAE), de reconnaître un salarié ; que l'outil est validé par la structure pour cet usage ; que les données de santé, de RQTH, de PASS IAE et de salaire restent hors de tout outil externe.`,
        why_etti: `Une ETTI traite des données particulièrement protégées (éligibilité IAE, santé, situation administrative, minima sociaux) et le simple fait d'être accompagné par l'agence révèle un parcours d’insertion : la confidentialité fait partie de la relation de confiance avec le salarié, l'entreprise utilisatrice et le prescripteur.`,
      },
    },
    private_content: {
      answer_key: `## Corrigé indicatif (à discuter, pas à imposer)

- Procédure publique d'accueil → transmissible. Information publique, sans personne identifiable. Vérifier tout de même que l'extrait est à jour et que l'outil est autorisé par la structure.
- Fiche métier publique → transmissible. Même raisonnement.
- Nom d'un salarié en insertion → à ne pas transmettre à un outil externe. Remplacer le nom par une initiale ne suffit pas : l'agence, la date, la mission et le parcours permettent souvent de retrouver la personne ; et le seul fait d'être nommé dans un document d'ETTI révèle un parcours IAE.
- Numéro de téléphone personnel → à ne pas transmettre. Donnée de contact directe, aucun intérêt pour la rédaction.
- Numéro administratif (PASS IAE, sécurité sociale) → à ne pas transmettre. Identifiant unique, aucun usage légitime dans un outil de rédaction externe ; il reste dans les outils de gestion validés (plateforme « Les emplois de l'inclusion », logiciel de paie).
- Renseignement de santé (RQTH, arrêt maladie) → à ne pas transmettre. Donnée particulièrement protégée ; enlever le nom ne change rien si le contexte permet d'identifier la personne.
- Montant de salaire individuel → à ne pas transmettre (ou « selon conditions » très strictes si l'outil est interne et validé pour cet usage). Rattaché à une personne, il devient une donnée personnelle ; la mention d'un minimum social perçu est une donnée particulièrement protégée.
- Description non identifiante d'une tâche de mission → selon conditions. Seule, elle n'identifie personne ; combinée à d'autres éléments (agence, entreprise utilisatrice, parcours IAE), elle peut le devenir. Conditions : outil validé par la structure, pas d'ajout d'éléments identifiants, usage limité à un brouillon relu.

## Trois messages à faire passer

- Remplacer un nom ne suffit pas à anonymiser : c'est la combinaison des informations qui identifie, et le cadre ETTI révèle à lui seul un parcours d’insertion.
- « Consentement obtenu » n'est pas synonyme de conformité : il faut aussi une finalité précise, un outil validé par la structure, une durée de conservation et une information de la personne. En cas de doute, la question se pose au responsable désigné dans la structure (référent données, direction).
- La mention d'un minimum social, d'une RQTH ou d'un arrêt maladie est une donnée particulièrement protégée : elle ne quitte pas les outils validés, même « pour aider à rédiger ».

## Ce qu'on ne tranche pas en formation

Le formateur ne se substitue pas au référent données de chaque structure. Les réponses ci-dessus sont des repères pédagogiques ; les règles internes de chaque structure priment.`,
      trainer_notes: `## Animation

- 5 minutes de consignes, pas plus : lire une carte à voix haute pour montrer le niveau de détail attendu.
- Passer dans les binômes et poser la question « et si on combine cette carte avec celle-là ? » (par exemple la carte 8 avec le nom de l'agence et la date).
- Au débrief, commencer par les cartes « selon conditions » : c'est là que les désaccords sont utiles.
- Rappeler, sans débat juridique, que la plateforme « Les emplois de l'inclusion » et les logiciels validés de l'agence ne sont pas des « outils IA externes » au sens du défi.

## Pièges fréquents

- « On enlève le nom, donc c'est anonyme » : faire combiner la carte 8 avec le nom de l'agence, la date et la mention « en parcours d’insertion ».
- « La personne est d'accord, donc on peut » : rappeler que le consentement ne remplace ni la finalité, ni l'outil validé, ni l'information de la personne.
- « La RQTH est utile pour la mission, donc on la met » : utile ne veut pas dire transmissible à un outil externe ; elle reste dans le dossier validé.
- Débat juridique sans fin : recentrer sur « qui, dans votre structure, peut répondre ? ».

## Rythmes différents

- Binômes rapides : bonus (neuvième carte ETTI) ou leur demander de préparer un argument contraire à leur propre choix.
- Binômes lents : limiter à cinq cartes (3, 5, 6, 7, 8) puis rejoindre le débrief ; les trois restantes sont corrigées collectivement.`,
    },
  },

  {
    code: 'A1',
    title: `Atelier 1 — Du suivi d'entretien au plan d'action`,
    seance: 1,
    position: 3,
    duration_min: 55,
    breakdown: [
      { label: 'Démonstration', minutes: 8 },
      { label: 'Production', minutes: 32 },
      { label: 'Vérification', minutes: 10 },
      { label: 'Débrief', minutes: 5 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a produit, à partir de la transcription fictive R1 d'un entretien de suivi en mission, un compte rendu de 200 à 300 mots qui distingue faits, éléments à confirmer et actions, avec un tableau action / responsable / échéance, sans aucune information inventée, et a noté le temps réellement passé (préparation, vérification, corrections).`,
      brief: `Vous travaillez en binôme sur le cas fictif Agence Horizon (ETTI fictive) : l'entretien de suivi du 21 septembre 2026 entre une conseillère en insertion et un salarié intérimaire en parcours d’insertion, au sujet d'une mission de préparation manuelle de commandes chez l'entreprise utilisatrice fictive « Atelier Horizon Logistique ». C'est le compte rendu que vous écrivez après chaque entretien de suivi, celui qui alimente ensuite la fiche salarié, le point d'étape avec le prescripteur et le reporting de parcours. Commencez par un court jeu de rôle de trois à cinq minutes en reprenant le texte de R1 : l'un joue la conseillère, l'autre le salarié en parcours. Si un outil de transcription est autorisé dans votre structure, le formateur peut en faire la démonstration ; sinon, vous utilisez directement le texte R1 et vous indiquez « transcription fournie » dans votre dépôt (on ne simule pas une transcription automatique). Ensuite, le pilote saisit le prompt de départ dans l'outil autorisé avec le texte R1, et le vérificateur compare ligne par ligne la réponse avec R1. À mi-parcours, inversez les rôles. Le compte rendu fait 200 à 300 mots maximum et contient : les faits explicites, les éléments à confirmer (auprès de l'entreprise utilisatrice, du salarié ou de l'agence), les actions convenues avec leur responsable et leur échéance. Comparez enfin la fiche de mission V1 (R3, 10/09/2026, ancienne version) et la fiche V2 (R2, 18/09/2026, actualisée) : relevez une correction justifiée que vous apportez au compte rendu grâce à la V2. Lancez le chronomètre au début de la production et arrêtez-le après vos corrections : notez le temps observé dans le champ prévu par l'application, avec votre estimation du temps habituel pour ce compte rendu au poste.`,
      resource_codes: ['R1', 'R2', 'R3', 'R9'],
      steps: [
        `Jouer l'entretien R1 en trois à cinq minutes (conseillère en insertion / salarié en parcours), sans ajouter d'informations.`,
        `Lire R1 en entier et surligner les faits explicites, les inconnues et les actions convenues ; démarrer le chronomètre.`,
        `Le pilote saisit le prompt de départ avec le texte R1 dans l'outil autorisé ; le vérificateur note chaque phrase de la réponse qui n'a pas de source dans R1.`,
        `Inverser les rôles : le nouveau pilote corrige le texte, le nouveau vérificateur relit les dates et les responsables.`,
        `Construire le tableau action / responsable / échéance (trois actions attendues : horaires à demander à l'entreprise utilisatrice, trajet à vérifier, rémunération à demander).`,
        `Comparer R3 (V1, ancienne) et R2 (V2, actualisée) et noter une correction justifiée sur les horaires.`,
        `Compter les mots (200 à 300) et vérifier qu'aucune appréciation de personnalité ni mention de santé ne figure dans le texte.`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer le compte rendu, le tableau, la correction V1/V2 et le prompt exact utilisé.`,
      ],
      deliverable: `Un compte rendu de suivi (200 à 300 mots) + un tableau de trois actions (action / responsable / échéance) + une correction justifiée entre la fiche V1 et la fiche V2 + le prompt exact utilisé et le nom de l'outil (ou « transcription fournie » et « sans outil » si solution de secours) + le temps observé (préparation + vérification + corrections) et le temps habituel estimé, notés dans le champ prévu par l'application. Ce temps est une mesure de cette tâche sur un document fictif, pas une promesse générale.`,
      success_criteria: [
        `Les dates sont fidèles à R1 et R2 : entretien du 21/09, disponibilité lundi 28/09, demande à l'entreprise utilisatrice mercredi 23/09, trajet vérifié au plus tard jeudi 24/09, point de suivi jeudi 24/09 à 10 h.`,
        `Trois actions sont attribuées à un responsable (conseillère ou salarié en parcours) avec une échéance.`,
        `La rémunération est indiquée comme non communiquée, à demander à l'entreprise utilisatrice ; aucun montant n'apparaît.`,
        `Le trajet est indiqué « à vérifier » ; la mission est indiquée comme non confirmée par l'entreprise utilisatrice.`,
        `Les horaires retenus sont ceux de la V2 (présence à partir de 9 h, 9 h–17 h indicatif) et non ceux de la V1.`,
        `Aucune appréciation de personnalité (« motivé », « sérieux », « fragile ») ni aucune mention de santé ne figure dans le compte rendu.`,
        `Le temps observé et le temps habituel estimé sont renseignés, en précisant si le temps a été réellement chronométré.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Chercher les mots qui font passer une inconnue pour un fait`,
          text: `Relisez la réponse de l'outil et cherchez les mots « confirmé », « validé », « prévu », « sera », « environ ». À chaque fois, retrouvez la phrase de R1 qui le justifie. Si vous ne la trouvez pas, c'est une inconnue déguisée en fait : reformulez en « à confirmer » ou supprimez. En ETTI, une mission « confirmée » par erreur dans un compte rendu se retrouve dans la fiche salarié puis chez le prescripteur. Faites le même contrôle pour chaque date, chaque horaire et chaque responsable.`,
        },
        {
          level: 'trame',
          title: `Gabarit de compte rendu`,
          text: `Compte rendu de suivi en mission — cas fictif Agence Horizon (ETTI) — entretien du [date]. 1. Faits explicites : mission envisagée : [poste, entreprise utilisatrice fictive] ; expérience : [...] ; disponibilité : [...] ; horaires selon fiche V2 du [date] : [...] ; moyen de transport : [...]. 2. Éléments inconnus ou à confirmer : [horaires de la semaine suivante], [trajet et arrêt de bus], [rémunération], [confirmation de l'entreprise utilisatrice]. 3. Actions convenues : tableau | Action | Responsable | Échéance |. 4. Prochain point de suivi : [date, heure]. Ambiguïtés relevées : [...].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (début de compte rendu)`,
          text: `« Entretien de suivi du 21/09/2026 (cas fictif Agence Horizon, ETTI). Mission envisagée : préparation manuelle de commandes chez Atelier Horizon Logistique (entreprise utilisatrice fictive). Le salarié en parcours indique six mois d'expérience en préparation manuelle de commandes et une disponibilité à partir du lundi 28 septembre 2026. Selon la fiche V2 du 18/09/2026, la présence est attendue à partir de 9 h (9 h–17 h à titre indicatif). Aucune conduite d'engin n'est prévue. À confirmer : les horaires de la semaine suivante (demandés à l'entreprise utilisatrice le mercredi 23/09)… » — la suite (trajet, rémunération, tableau d'actions) est à rédiger par le binôme.`,
        },
      ],
      debrief_questions: [
        `Quel détail l'IA a-t-elle transformé (une inconnue devenue un fait, une date déplacée, un mot ajouté) ?`,
        `Qui conserve la responsabilité du compte rendu une fois qu'il est enregistré dans la fiche salarié ou transmis au prescripteur ?`,
        `Combien de temps a pris la vérification par rapport à la rédaction ? Ce temps serait-il le même au poste, avec vos vraies notes ?`,
      ],
      fallback: `Sans outil IA : le binôme rédige le compte rendu à la main à partir de R1 en suivant la trame, indique « sans outil » dans le dépôt, note tout de même le temps passé et consacre le temps restant à la comparaison V1/V2 et à la vérification croisée. Sans outil de transcription : utiliser directement R1 et afficher « transcription fournie ».`,
      prompt_starter: `À partir du texte fourni uniquement, rédige un compte rendu de suivi. Distingue faits explicites, éléments inconnus et actions convenues. Fais un tableau action / responsable / échéance. N'invente ni disponibilité, ni salaire, ni confirmation client. Signale toute ambiguïté. Contexte : entretien de suivi en mission dans une ETTI fictive ; « client » désigne l'entreprise utilisatrice.`,
      prompt_defaults: {
        context: `Je suis conseiller(ère) en insertion dans une ETTI fictive (Agence Horizon). Le texte fourni est la transcription fictive d'un entretien de suivi en mission du 21/09/2026 avec un salarié intérimaire en parcours d’insertion ; « client » désigne l'entreprise utilisatrice fictive.`,
        task: `Rédige un compte rendu de suivi à partir du texte fourni uniquement. Distingue faits explicites, éléments inconnus et actions convenues. Fais un tableau action / responsable / échéance.`,
        data: `Transcription fictive R1 (collée ci-dessous). Fiche de mission V2 du 18/09/2026 pour les horaires.`,
        constraints: `N'invente ni disponibilité, ni salaire, ni confirmation de l'entreprise utilisatrice. Aucune appréciation de personnalité, aucune mention de santé. Aucune donnée personnelle ajoutée. 200 à 300 mots maximum.`,
        format: `Trois rubriques (faits explicites, éléments inconnus ou à confirmer, actions convenues), puis un tableau action / responsable / échéance.`,
        controls: `Signale toute ambiguïté. Je vérifierai chaque date, chaque responsable et chaque mention de confirmation avec le texte source.`,
      },
      levels: {
        guided: `Utilisez le prompt de départ tel quel, puis la trame pour structurer le compte rendu. Vérifiez chaque critère de réussite avant le dépôt et notez votre temps.`,
        autonomous: `Adaptez le prompt à votre façon de rédiger, produisez le compte rendu et le tableau, puis justifiez votre correction V1/V2 en deux phrases.`,
        bonus: `Préparez en cinq lignes le point d'étape avec le prescripteur à partir de votre compte rendu, en suivant la fiche de liaison fictive R9 : situation de la mission, actions en cours, prochaine échéance, sans aucune donnée inutile (pas de détail de transport, pas d'appréciation, pas de santé). Notez dans le champ prévu le temps que cette préparation ajoute : c'est une mesure de cette tâche, pas une promesse. Le bonus reste dans le temps de l'atelier et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['transcription'],
      production_kind: 'report_actions',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE}`,
      job_context: {
        task: `Rédiger le compte rendu d'un entretien de suivi en mission, avec les actions, les responsables et les échéances, puis en tirer la préparation du point d'étape avec le prescripteur.`,
        time_sinks: `Les notes prises pendant l'entretien sont remises au propre en fin de journée, souvent après plusieurs autres rendez-vous ; on cherche qui devait rappeler l'entreprise utilisatrice et pour quand ; le même contenu est ensuite ressaisi dans la fiche salarié et résumé pour le prescripteur.`,
        delegable: `La première mise en forme des notes en rubriques (faits, à confirmer, actions) et le tableau d'actions, à partir d'une transcription ou de notes sans donnée identifiante.`,
        must_verify: `Chaque date et chaque échéance, le responsable de chaque action, tout mot de confirmation (la mission n'est confirmée que par l'entreprise utilisatrice), l'absence de montant, d'appréciation de personnalité et de mention de santé.`,
        why_etti: `Avec une durée médiane de parcours de 2,6 mois (Dares, sortants 2023), un compte rendu rapide et fiable est ce qui permet d'enchaîner les missions, de tracer les actions pour le prescripteur et le dialogue de gestion, et de ne jamais annoncer au salarié une mission que l'entreprise utilisatrice n'a pas confirmée.`,
      },
    },
    private_content: {
      answer_key: `## Compte rendu modèle (cas fictif Agence Horizon, ETTI)

Entretien de suivi en mission du 21/09/2026 entre la conseillère en insertion et le salarié intérimaire en parcours d’insertion.

### Faits explicites
- Mission envisagée : préparation manuelle de commandes chez Atelier Horizon Logistique (entreprise utilisatrice fictive).
- Expérience : six mois de préparation de commandes à la main.
- Disponibilité : à partir du lundi 28 septembre 2026.
- Horaires selon la fiche actualisée V2 du 18/09/2026 : présence à partir de 9 h, 9 h–17 h à titre indicatif.
- Transport : bus vers 8 h 45 ; pas de véhicule.
- Aucune conduite d'engin.

### Éléments inconnus ou à confirmer
- Horaires de la semaine suivante : inconnus, à demander à l'entreprise utilisatrice.
- Trajet et arrêt de bus : à vérifier.
- Rémunération : non communiquée.
- Mission : non confirmée par l'entreprise utilisatrice à ce stade.

### Actions convenues
| Action | Responsable | Échéance |
|---|---|---|
| Demander à l'entreprise utilisatrice les horaires de la semaine suivante | Conseillère | Mercredi 23/09/2026 |
| Vérifier le trajet et l'arrêt de bus | Salarié en parcours | Jeudi 24/09/2026 au plus tard |
| Demander la rémunération à l'entreprise utilisatrice | Conseillère | Avant le point de suivi du 24/09/2026 à 10 h |

Prochain point de suivi : jeudi 24 septembre 2026 à 10 h.

### Correction V1 / V2 attendue
La fiche V1 du 10/09/2026 indiquait 8 h–16 h provisoire, validation de l'entreprise utilisatrice en attente. La V2 du 18/09/2026 indique une présence à partir de 9 h (9 h–17 h indicatif). Le compte rendu doit retenir la V2 et peut mentionner que la V1 est une ancienne version.

### Bonus : point d'étape prescripteur en cinq lignes (R9)
1. Mission envisagée : préparation manuelle de commandes, entreprise utilisatrice fictive, début souhaité 28/09/2026, non confirmé.
2. Actions en cours côté agence : horaires de la semaine suivante et rémunération demandés à l'entreprise utilisatrice (23/09 et avant le 24/09).
3. Action côté salarié : vérification du trajet avant le 24/09.
4. Prochain point agence / salarié : 24/09/2026 à 10 h.
5. Point à signaler au prescripteur : aucun frein nouveau identifié dans cet entretien ; mobilité à suivre (pas de véhicule).
Aucune donnée inutile : pas d'horaire de bus, pas d'appréciation, pas de santé, pas de montant.

## Liste des pièges
- Mission présentée comme confirmée alors que la validation de l'entreprise utilisatrice est en attente.
- Montant de salaire inventé ou « estimé » (par exemple « au taux habituel de la branche »).
- Trajet présenté comme vérifié ou arrêt de bus nommé.
- Horaires de la V1 (8 h–16 h) repris à la place de la V2.
- Date de disponibilité déplacée (ex. « dès cette semaine »).
- Appréciation de personnalité ajoutée (« salarié motivé », « peu fiable »).
- Mention de santé ajoutée ou déduite (« apte au port de charges »).
- Action sans responsable ou sans échéance.
- Responsable inversé (le trajet attribué à la conseillère, la rémunération au salarié).

## Lecture du temps observé
Le temps noté vaut pour ce document fictif, ce binôme et cet outil. Au poste, les notes sont moins propres que R1 et la vérification demande d'ouvrir la fiche de mission : le temps habituel estimé par le participant et le temps observé se comparent, ils ne se généralisent pas.`,
      trainer_notes: `## Animation
- Démonstration (8 min) : montrer le prompt de départ, la réponse brute, puis une vérification en direct d'une phrase douteuse (chercher « confirmé »). Ne pas corriger tout : montrer la méthode. Montrer aussi le champ « Temps sur cette tâche » et lancer un chronomètre visible.
- Si aucun outil de transcription n'est autorisé, le dire clairement et afficher « transcription fournie ». Ne jamais faire semblant qu'un enregistrement a été transcrit ; rappeler qu'enregistrer un vrai entretien de suivi suppose l'information du salarié et une règle de la structure.
- Imposer l'inversion des rôles à mi-production (annoncer l'heure).
- Pour le bonus prescripteur (R9) : insister sur « aucune donnée inutile » ; le prescripteur a besoin de l'état de la mission et des actions, pas du détail du trajet.

## Pièges fréquents
- Binômes qui acceptent la première réponse : leur demander de trouver la phrase de R1 qui justifie « mission confirmée ».
- Comptes rendus trop longs : rappeler 200–300 mots ; le tableau ne compte pas.
- Oubli de la comparaison V1/V2 : la réserver aux 10 minutes de vérification si besoin.
- Temps observé noté sans la vérification : demander si le chronomètre incluait les corrections ; sinon cocher « estimation ».
- Conclusions hâtives sur le gain : rappeler que c'est une mesure sur un cas fictif.

## Rythmes différents
- Rapides : bonus (point d'étape prescripteur en cinq lignes avec R9) ou leur confier la relecture du compte rendu d'un autre binôme.
- Lents : fournir la trame dès le début et limiter le tableau à deux actions avant d'en ajouter une troisième.

## Débrief
Collecter un « détail transformé » par binôme et l'afficher. Terminer par la question de la responsabilité : l'outil n'est pas signataire du compte rendu, le permanent l'est, et c'est ce compte rendu qui alimente la fiche salarié, le point prescripteur et le reporting de parcours.`,
      flawed_example: `## RÉSERVÉ AU FORMATEUR — version imparfaite à ne pas distribuer telle quelle

Ce compte rendu contient volontairement trois erreurs. À utiliser pour un exercice de repérage.

« Entretien de suivi du 21/09/2026. Mission confirmée chez Atelier Horizon Logistique (entreprise utilisatrice fictive) en préparation manuelle de commandes, à partir du lundi 28 septembre. Le salarié a six mois d'expérience. Horaires : 9 h–17 h. Rémunération : taux horaire habituel de ce type de mission, soit environ le minimum conventionnel de la branche. Transport : le trajet en bus a été validé, départ 8 h 45. Aucune conduite d'engin. Point de suivi jeudi 24 septembre à 10 h. »

### Les trois erreurs
1. « Mission confirmée » : la validation de l'entreprise utilisatrice est en attente ; rien dans R1 ne confirme la mission.
2. Rémunération « environ le minimum conventionnel de la branche » : le salaire n'est pas communiqué ; toute estimation est une invention, même plausible.
3. « Trajet validé » : le trajet et l'arrêt sont à vérifier au plus tard le jeudi 24/09 ; rien n'est validé.

Erreur secondaire possible à faire remarquer : aucune action n'est attribuée à un responsable, et le compte rendu ne pourrait pas servir à préparer le point d'étape avec le prescripteur.`,
    },
  },

  {
    code: 'A2',
    title: `Atelier 2 — Mes documents répondent, et savent dire qu'ils ne savent pas`,
    seance: 1,
    position: 4,
    duration_min: 60,
    breakdown: [
      { label: 'Démonstration', minutes: 8 },
      { label: 'Production', minutes: 37 },
      { label: 'Vérification', minutes: 10 },
      { label: 'Débrief', minutes: 5 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a produit une FAQ de cinq réponses aux questions récurrentes sur une mission, fondées uniquement sur les documents fictifs R2 à R5, chaque réponse étant reliée à un document, une version, une rubrique et un passage, les informations absentes étant signalées « information non disponible », et a noté le temps réellement passé.`,
      brief: `En ETTI, les mêmes questions sur une mission reviennent plusieurs fois par jour, posées par le salarié en parcours (« à quelle heure je commence ? »), par l'entreprise utilisatrice (« est-ce qu'il conduira un engin ? ») et par le prescripteur (« où en est l'accueil ? »), et on les retrouve en relisant les fiches de mission, souvent dans plusieurs versions. En binôme, importez les quatre documents fictifs R2 (fiche de mission V2 du 18/09/2026), R3 (fiche de mission V1 du 10/09/2026, ancienne version), R4 (procédure d'accueil V2 du 16/09/2026) et R5 (guide de visite V1 du 08/09/2026) dans l'outil documentaire autorisé par votre structure. Posez ensuite les cinq questions suivantes, l'une après l'autre : 1) Quels sont les horaires actuels de la mission ? 2) Une conduite d'engin est-elle prévue ? 3) Quelles sont les étapes de la procédure d'accueil ? 4) Quelle est la rémunération ? 5) Quelle est l'adresse exacte du site ? Utilisez le prompt de départ pour cadrer les réponses. Pour chaque réponse, ouvrez le passage cité dans le document et contrôlez-le vous-même : une réponse qui cite un document n'est pas automatiquement vraie. Deux questions n'ont pas de réponse dans les documents ; l'outil doit le dire, et vous devez le vérifier, puis indiquer qui doit obtenir l'information (en général la conseillère auprès de l'entreprise utilisatrice). Une question fait apparaître une contradiction entre deux versions ; votre FAQ doit montrer le conflit et retenir la version actualisée. Chronométrez la production (import, questions, vérification, corrections) et notez le temps dans le champ prévu par l'application.`,
      resource_codes: ['R2', 'R3', 'R4', 'R5'],
      steps: [
        `Importer R2, R3, R4 et R5 dans l'outil documentaire autorisé (ou préparer les quatre documents imprimés pour la solution de secours) ; démarrer le chronomètre.`,
        `Saisir le prompt de départ, puis poser la première question (horaires actuels).`,
        `Pour chaque réponse, ouvrir le document cité, retrouver la version, la rubrique et le passage, et noter « vérifié » ou « à corriger ».`,
        `Poser les quatre autres questions dans l'ordre et remplir le tableau au fur et à mesure.`,
        `Pour les questions sans réponse dans les documents, vérifier que la FAQ indique bien « information non disponible » et qui doit obtenir l'information auprès de l'entreprise utilisatrice.`,
        `Pour la question des horaires, montrer la contradiction V1 / V2 et indiquer la version retenue.`,
        `Relire la FAQ à deux : chaque réponse est-elle compréhensible par un collègue d'agence, et par le salarié en parcours, sans les documents sous les yeux ?`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer la FAQ, le tableau et le prompt exact.`,
      ],
      deliverable: `Une FAQ de cinq réponses + un tableau réponse / source (document, version, rubrique) / passage justificatif / vérification humaine (vérifié, corrigé, non disponible) + le prompt exact et l'outil utilisé + le temps observé et le temps habituel estimé dans le champ prévu par l'application (mesure de cette tâche, pas promesse générale).`,
      success_criteria: [
        `La réponse sur les horaires s'appuie sur la V2 (R2) et signale la V1 (R3) comme ancienne version.`,
        `La réponse sur la conduite d'engin indique qu'aucune conduite n'est prévue, avec le passage de R2.`,
        `La rémunération et l'adresse exacte du site sont indiquées « information non disponible », sans aucune valeur inventée, avec la personne chargée de les demander à l'entreprise utilisatrice.`,
        `Les six étapes de la procédure d'accueil R4 sont restituées dans l'ordre, sans étape ajoutée ni supprimée.`,
        `Chaque ligne du tableau indique une vérification humaine (vérifié / corrigé / non disponible).`,
        `Le temps observé est renseigné, vérification comprise, en précisant s'il a été chronométré.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Se méfier des réponses trop complètes`,
          text: `Si l'outil donne une adresse, un montant ou un horaire précis à la question 4 ou 5, il l'a probablement reconstitué à partir d'un autre passage ou de ses connaissances générales (par exemple un taux de la branche du travail temporaire). Demandez-lui : « Dans quel document et quel passage exactement ? » puis ouvrez le document. Si le passage n'existe pas, la bonne réponse est « information non disponible », et la FAQ doit dire qui la demande à l'entreprise utilisatrice.`,
        },
        {
          level: 'trame',
          title: `Gabarit de ligne de FAQ`,
          text: `Question : [...]. Qui la pose d'habitude : [salarié en parcours / entreprise utilisatrice / prescripteur]. Réponse : [une ou deux phrases]. Source : document [R2 / R3 / R4 / R5], version [V1 / V2 du …], rubrique [...]. Passage justificatif : « [citation courte] ». Vérification humaine : [vérifié dans le document / corrigé : … / information non disponible → à obtenir par … auprès de …]. Conflit de versions : [aucun / V1 dit …, V2 dit …, version retenue : V2].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple pour une ligne`,
          text: `Question 2 : « Une conduite d'engin est-elle prévue ? » (question typique de l'entreprise utilisatrice et du salarié). Réponse : « Non, aucune conduite d'engin n'est prévue pour cette mission. » Source : R2, fiche de mission V2 du 18/09/2026, rubrique « Mission ». Passage : « aucune conduite d'engin prévue ». Vérification humaine : vérifié dans R2 ; la V1 ne dit pas le contraire. — Les quatre autres lignes sont à construire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Sur quelle question l'outil a-t-il été tenté de « compléter » ? Comment l'avez-vous vu ?`,
        `Comment avez-vous présenté la contradiction entre la V1 et la V2 ? Que se passerait-il si le salarié avait reçu la V1 ?`,
        `Dans votre agence, qui tient à jour les fiches de mission que vos outils utiliseraient, et combien de versions circulent en général ?`,
      ],
      fallback: `Sans outil documentaire : le binôme répond aux cinq questions à la main avec les quatre documents imprimés ou affichés, en remplissant le même tableau (source, version, rubrique, passage) et en notant le temps passé. L'exercice de vérification est identique ; indiquer « sans outil » dans le dépôt.`,
      prompt_starter: `Réponds uniquement à partir des documents fournis. Pour chaque réponse, indique le document, sa version, la rubrique et le passage justificatif. Si l'information manque, écris “information non disponible”. Si des versions se contredisent, montre le conflit et distingue la version actualisée. Contexte : documents de mission d'une ETTI fictive, questions posées par le salarié en parcours, l'entreprise utilisatrice ou le prescripteur.`,
      prompt_defaults: {
        context: `Je travaille dans une ETTI fictive (Agence Horizon). J'ai importé quatre documents fictifs : fiche de mission V2 (18/09/2026), fiche de mission V1 (10/09/2026, ancienne), procédure d'accueil V2 (16/09/2026), guide de visite V1 (08/09/2026). Les questions sont celles que posent le salarié en parcours, l'entreprise utilisatrice et le prescripteur.`,
        task: `Réponds à mes questions uniquement à partir des documents fournis.`,
        data: `Documents R2, R3, R4, R5 importés. Questions : horaires actuels ; conduite d'engin prévue ; étapes de la procédure d'accueil ; rémunération ; adresse exacte du site.`,
        constraints: `Si l'information manque, écris “information non disponible”. N'utilise aucune connaissance extérieure aux documents (pas de taux de branche, pas d'adresse supposée). N'invente ni montant, ni adresse, ni horaire.`,
        format: `Pour chaque réponse : réponse courte, document, version, rubrique, passage justificatif cité.`,
        controls: `Si des versions se contredisent, montre le conflit et distingue la version actualisée. J'ouvrirai chaque passage cité pour le vérifier.`,
      },
      levels: {
        guided: `Posez les cinq questions dans l'ordre avec le prompt de départ et remplissez le gabarit de ligne pour chacune. Ouvrez chaque passage cité avant de cocher « vérifié ». Notez votre temps.`,
        autonomous: `Posez les cinq questions, puis ajoutez une sixième question de votre choix, typique d'un prescripteur ou d'une entreprise utilisatrice, dont vous savez que la réponse n'est pas dans les documents, pour tester le comportement de l'outil.`,
        bonus: `Rédigez, à partir de la FAQ vérifiée, les trois réponses que vous donneriez au salarié en parcours par message, en phrases courtes et sans terme d'agence (horaires, conduite d'engin, rémunération « pas encore connue, demandée à l'entreprise »). Notez dans le champ prévu le temps ajouté : c'est une mesure de cette tâche, pas une promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['documents'],
      production_kind: 'faq_sources',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE}`,
      job_context: {
        task: `Répondre aux questions récurrentes sur une mission (horaires, conduite d'engin, étapes d'accueil, rémunération, adresse) à partir des documents de l'agence, en citant la bonne version.`,
        time_sinks: `Les mêmes questions arrivent du salarié en parcours, de l'entreprise utilisatrice et du prescripteur ; à chaque fois on rouvre la fiche de mission, on hésite entre deux versions, on cherche la procédure d'accueil, et on répond parfois de mémoire avec un horaire périmé.`,
        delegable: `La recherche du passage dans les documents importés et la première formulation de la réponse, avec la citation du document, de la version et de la rubrique.`,
        must_verify: `Que le passage cité existe et dit bien ce qu'affirme la réponse ; que la version retenue est la plus récente ; que les informations absentes (rémunération, adresse) restent « non disponibles » et sont attribuées à quelqu'un pour les demander à l'entreprise utilisatrice.`,
        why_etti: `L'entreprise utilisatrice est responsable des conditions d'exécution (temps de travail, santé, sécurité, formation au poste) et l'agence relaie ses informations au salarié et au prescripteur : une réponse donnée à partir d'une fiche périmée engage l'agence et peut faire échouer le premier jour de mission.`,
      },
    },
    private_content: {
      answer_key: `## Les cinq réponses attendues (cas fictif Agence Horizon, ETTI)

### 1. Horaires actuels (question typique du salarié en parcours)
- Réponse : présence attendue à partir de 9 h ; 9 h–17 h à titre indicatif.
- Source : R2, fiche de mission V2 du 18/09/2026, rubrique « Mission » (présence indicative).
- Conflit : R3 (V1 du 10/09/2026) indiquait 8 h–16 h provisoire, validation de l'entreprise utilisatrice en attente. Version retenue : V2. La V1 est une ancienne version.
- Précision attendue : les horaires de la semaine suivante restent inconnus (demande à l'entreprise utilisatrice prévue le 23/09).

### 2. Conduite d'engin (question typique de l'entreprise utilisatrice et du salarié)
- Réponse : aucune conduite d'engin prévue.
- Source : R2, V2, rubrique « Mission », passage « aucune conduite d'engin prévue ».
- Rappel métier : une conduite d'engin supposerait une habilitation et une formation au poste relevant de l'entreprise utilisatrice ; rien de tel n'est prévu.

### 3. Étapes de la procédure d'accueil (question typique du prescripteur ou d'un nouveau collègue)
- Réponse : six étapes dans l'ordre : 1) recueillir la demande et expliquer le déroulement ; 2) relever uniquement les compétences et disponibilités nécessaires ; 3) vérifier les informations de la mission et les points inconnus ; 4) faire valider le projet de mission par le permanent responsable ; 5) expliquer les prochaines actions ; 6) fixer un point de suivi et consigner les actions.
- Source : R4, procédure d'accueil V2 du 16/09/2026.
- Point de vigilance : la règle « un point inconnu est attribué à un responsable, jamais complété par supposition » doit être conservée si elle est citée.

### 4. Rémunération (question typique du salarié et du prescripteur)
- Réponse : information non disponible. La rémunération n'est pas communiquée ; elle doit être demandée à l'entreprise utilisatrice par la conseillère.
- Toute valeur chiffrée, y compris « au minimum de la branche », est une invention.

### 5. Adresse exacte du site (question typique du salarié, pour le trajet)
- Réponse : information non disponible. Les documents nomment l'entreprise utilisatrice fictive et la zone d'activité, pas l'adresse exacte.
- Toute adresse proposée est une invention.

## Contrôle des citations
Une réponse qui cite un document n'est pas automatiquement vraie : vérifier que le passage existe, qu'il est dans la bonne version et qu'il dit bien ce que la réponse affirme.

## Lecture du temps observé
Le temps noté inclut l'import et la vérification des cinq passages. Au poste, l'import se fait une fois et la vérification reste à chaque question : la mesure vaut pour cet atelier, pas pour un gain général.`,
      trainer_notes: `## Animation
- Démonstration (8 min) : importer les quatre documents, poser la question 1, montrer la citation, ouvrir le document et vérifier à l'écran. Montrer aussi une question sans réponse (la rémunération) et le comportement attendu. Lancer le chronomètre visible.
- Vérifier avant l'atelier que l'outil documentaire autorisé accepte quatre fichiers et affiche les passages cités ; sinon, basculer sur la solution de secours dès le départ.
- Faire le lien avec la réalité : demander au groupe qui pose ces cinq questions dans leur agence (salarié, entreprise utilisatrice, prescripteur) et combien de fois par semaine.

## Pièges fréquents
- L'outil mélange V1 et V2 : c'est l'objectif de la question 1, laisser le binôme le découvrir.
- Réponse « plausible » à l'adresse ou à la rémunération (taux de branche) : faire ouvrir le document, le passage n'existe pas.
- Binômes qui ne vérifient que les deux premières lignes : annoncer que la ligne de vérification humaine est obligatoire pour les cinq.
- Temps noté sans la vérification : rappeler la case « inclut la vérification et les corrections ».

## Rythmes différents
- Rapides : sixième question piège (niveau autonome) ou bonus (réponses courtes au salarié).
- Lents : questions 1, 2 et 4 d'abord (elles portent les apprentissages clés), puis 3 et 5 si le temps le permet.

## Débrief
Afficher un tableau de binôme et demander au groupe de trouver la ligne la plus fragile.`,
    },
  },

  {
    code: 'A3',
    title: `Atelier 3 — Préparer une visite avec une recherche vérifiée`,
    seance: 1,
    position: 5,
    duration_min: 55,
    breakdown: [
      { label: 'Démonstration', minutes: 8 },
      { label: 'Production', minutes: 32 },
      { label: 'Vérification des sources', minutes: 10 },
      { label: 'Débrief', minutes: 5 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a produit une fiche de visite d'entreprise utilisatrice (ou de secteur du bassin d'emploi) d'une page dont chaque donnée déterminante est reliée à une page publique consultée et datée, avec au moins trois sources, cinq questions à poser à l'entreprise utilisatrice et deux incertitudes nommées, et a noté le temps réellement passé.`,
      brief: `En ETTI, les missions viennent des entreprises utilisatrices que l'on prospecte et que l'on visite, et parfois des clauses sociales d'insertion des marchés publics, par l'intermédiaire d'un facilitateur. Préparer une visite prend du temps : chercher l'activité, les métiers, l'implantation, les horaires habituels du secteur, l'accès au site pour des salariés sans véhicule, puis trier ce qui est vérifié de ce que l'on suppose. En binôme, choisissez d'abord un secteur d'activité de votre bassin d'emploi (par exemple la logistique, l'agroalimentaire, le bâtiment, la propreté, les services à la personne). Ensuite, deux options : soit une entreprise publique identifiée dont les informations professionnelles sont accessibles (site institutionnel, pages publiques), soit le cas fictif « Atelier Horizon Logistique » en vous appuyant sur le guide de visite R5. Dans les deux cas, vous ne recherchez que des informations professionnelles publiques : activité, implantation, métiers, actualités publiées, données du secteur. Aucune donnée privée sur des dirigeants ou des salariés. Utilisez un assistant avec recherche en ligne, autorisé par votre structure, avec le prompt de départ, puis faites l'exercice central de l'atelier : pour chaque affirmation de la fiche, retrouvez le passage exact de la page consultée qui la justifie. Si vous ne le retrouvez pas, corrigez ou supprimez l'affirmation, ou transformez-la en question à poser. Une hypothèse commerciale (« ils vont recruter en fin d'année ») n'est pas un fait tant qu'une page datée ne le dit pas. Pour toute règle évoquée (par exemple une règle de sécurité ou une obligation de l'entreprise utilisatrice), retrouvez une source officielle et vérifiez qu'elle est toujours pertinente à la date de la formation. La liste R7 (France Travail, Dares, Insee, DREETS, « Les emplois de l'inclusion », Service-Public.fr, Légifrance, ministère du Travail, CNIL) et le site de l'entreprise donnent des points de départ, pas des réponses vérifiées. Chronométrez la recherche, la vérification des sources et les corrections, et notez le temps dans le champ prévu par l'application.`,
      resource_codes: ['R5', 'R7'],
      steps: [
        `Choisir un secteur du bassin d'emploi, puis une entreprise publique identifiée ou le cas fictif avec R5 ; démarrer le chronomètre.`,
        `Lister sur papier ce que l'on sait déjà et ce que l'on veut apprendre avant la visite : tâches réellement confiées, compétences attendues, horaires, accès au site, prochaines étapes.`,
        `Saisir le prompt de départ dans l'assistant autorisé en remplaçant [entreprise ou secteur] et [territoire].`,
        `Pour chaque affirmation de la réponse, ouvrir la page citée, retrouver le passage exact et noter la date de la page.`,
        `Corriger ou supprimer toute affirmation sans passage retrouvé ; marquer « hypothèse » ce qui n'est pas sourcé mais utile, notamment toute hypothèse commerciale.`,
        `Pour chaque règle évoquée, retrouver une source officielle et vérifier sa date et sa pertinence.`,
        `Rédiger la fiche d'une page : faits sourcés, hypothèses, cinq questions à l'entreprise utilisatrice, deux incertitudes.`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer la fiche, la liste des sources (adresse, date de consultation) et le prompt exact.`,
      ],
      deliverable: `Une fiche de visite d'une page : faits sourcés (trois sources minimum, avec adresse de la page et date de consultation), hypothèses identifiées (dont les hypothèses commerciales), cinq questions à poser à l'entreprise utilisatrice (tâches réellement confiées, compétences, horaires, accès au site, prochaines étapes), deux incertitudes à lever. Plus le prompt exact, l'outil utilisé, et le temps observé (recherche + vérification + corrections) dans le champ prévu par l'application, qui vaut pour cette fiche et non comme gain général.`,
      success_criteria: [
        `Chaque donnée déterminante (activité, effectif, implantation, règle) est reliée à une page consultée, avec sa date.`,
        `Les chiffres et le territoire sont cohérents entre eux (même périmètre, même période).`,
        `Aucune règle juridique inventée : chaque règle citée (sécurité, EPI, responsabilité de l'entreprise utilisatrice) renvoie à une source officielle vérifiée à la date de la formation.`,
        `Les hypothèses, notamment commerciales, sont clairement séparées des faits.`,
        `La fiche contient cinq questions à l'entreprise utilisatrice couvrant les tâches réellement confiées, les compétences, les horaires, l'accès au site pour un salarié sans véhicule et les prochaines étapes, plus deux incertitudes.`,
        `Aucune donnée privée sur des dirigeants ou des salariés ; le temps observé est renseigné.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Un chiffre sans page n'est pas un fait`,
          text: `Les assistants avec recherche en ligne produisent souvent des chiffres plausibles (effectif, chiffre d'affaires, nombre de sites, « recrute 20 préparateurs ») sans page précise, ou avec une page qui ne contient pas le chiffre. Règle simple : pas de page ouverte et de passage retrouvé, pas de chiffre dans la fiche. Remplacez par une question à poser à l'entreprise utilisatrice : c'est souvent plus utile pour la visite, et c'est ce que vous demanderez de toute façon avant de proposer un salarié.`,
        },
        {
          level: 'trame',
          title: `Gabarit de fiche de visite`,
          text: `Fiche de visite — [entreprise utilisatrice ou secteur] — [territoire] — préparée le [date]. 1. Faits sourcés : • [fait] — source : [adresse de la page], consultée le [date], passage : « … ». (trois sources minimum). 2. Hypothèses (non sourcées, à confirmer), dont hypothèses commerciales : • [...]. 3. Règles évoquées et source officielle : • [règle] — [source officielle], vérifiée le [date]. 4. Cinq questions à poser : 1) tâches réellement confiées ; 2) compétences et habilitations attendues ; 3) horaires réels de la première semaine ; 4) accès au site sans véhicule (transports, horaires de bus, covoiturage) ; 5) prochaines étapes (volume, date de début, interlocuteur, formation au poste et EPI fournis). 5. Deux incertitudes : • [...] • [...]. Mention : « sources publiques uniquement ; aucune donnée privée sur des personnes ».`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (cas fictif avec R5)`,
          text: `Fait sourcé : « Le guide de visite R5 (V1 du 08/09/2026, document fictif) recommande de vérifier avant la visite les horaires de poste et les équipements de manutention. » Hypothèse commerciale : « Une activité de préparation manuelle de commandes implique probablement des pics saisonniers et donc des besoins de renfort : à confirmer sur place. » Question n° 4 : « Comment un salarié sans véhicule accède-t-il au site à 9 h ? » Incertitude n° 1 : « L'adresse exacte du site n'est pas dans nos documents. » — La suite (sources publiques sur le secteur dans le territoire, règles) est à construire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Quelle affirmation avez-vous dû supprimer faute de passage retrouvé ? Était-ce une hypothèse commerciale présentée comme un fait ?`,
        `Combien de temps a pris la vérification par rapport à la recherche elle-même ? Qu'en concluez-vous pour une visite réelle ?`,
        `Quelle question à l'entreprise utilisatrice est née d'une incertitude plutôt que d'un fait ?`,
      ],
      fallback: `Sans assistant avec recherche en ligne : le formateur fournit un dossier de pages publiques capturées (adresse, date de capture, contexte). Les binômes construisent la fiche à partir de ces captures, notent le temps passé et précisent dans le dépôt « travail sur captures fournies ». Si le dossier n'est pas disponible, une production partielle (hypothèses, questions, incertitudes) est acceptée ; on ne fabrique jamais de sources.`,
      prompt_starter: `Prépare une fiche de visite pour [entreprise ou secteur] dans [territoire]. Distingue les faits sourcés, les hypothèses et les questions à poser. Donne les pages précises, les dates disponibles et ne complète pas un chiffre absent. Pour toute règle évoquée, retrouve une source officielle et vérifie qu'elle est pertinente à la date de la formation. Contexte : visite d'une entreprise utilisatrice par une ETTI, informations professionnelles publiques uniquement.`,
      prompt_defaults: {
        context: `Je prépare, pour une ETTI, une visite d'entreprise utilisatrice (ou un rendez-vous avec un facilitateur de clauses sociales). Je ne cherche que des informations professionnelles publiques.`,
        task: `Prépare une fiche de visite pour [entreprise ou secteur] dans [territoire]. Distingue les faits sourcés, les hypothèses et les questions à poser.`,
        data: `Aucun document interne. Points de départ possibles : sites institutionnels publics (liste R7 : France Travail, Dares, Insee, DREETS, « Les emplois de l'inclusion ») et site de l'entreprise. Pour le cas fictif : guide de visite R5.`,
        constraints: `Ne complète pas un chiffre absent. Aucune donnée privée sur des dirigeants ou des salariés. Aucune règle juridique sans source officielle. Signale toute hypothèse commerciale comme hypothèse.`,
        format: `Une page : faits sourcés (page précise et date), hypothèses, cinq questions à l'entreprise utilisatrice (tâches confiées, compétences, horaires, accès au site, prochaines étapes), deux incertitudes.`,
        controls: `Donne les pages précises et les dates disponibles. Pour toute règle évoquée, retrouve une source officielle et vérifie qu'elle est pertinente à la date de la formation. J'ouvrirai chaque page citée.`,
      },
      levels: {
        guided: `Travaillez sur le cas fictif avec R5 et le gabarit de fiche. Limitez-vous à trois faits sourcés, cinq questions et deux incertitudes. Notez votre temps.`,
        autonomous: `Choisissez une entreprise publique de votre bassin d'emploi, construisez la fiche et documentez chaque affirmation supprimée faute de source.`,
        bonus: `Rédigez en trois phrases ce que vous diriez à l'entreprise utilisatrice (ou au facilitateur) pour présenter votre ETTI : parcours d’insertion, accompagnement, mise à disposition ; sans aucun chiffre non vérifié ni promesse de délai. Notez dans le champ prévu le temps que cela ajoute : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['recherche'],
      production_kind: 'visit_sheet',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE}`,
      job_context: {
        task: `Préparer la visite d'une entreprise utilisatrice (ou un rendez-vous avec un facilitateur de clauses sociales) : ce que l'on sait, ce que l'on suppose, ce que l'on va demander.`,
        time_sinks: `On navigue entre le site de l'entreprise, les pages emploi, les données du secteur et des souvenirs de visites passées ; on arrive avec des chiffres non vérifiés ou sans les questions qui comptent pour placer un salarié (tâches réelles, horaires, accès au site sans voiture, EPI et formation au poste).`,
        delegable: `Le premier balayage des pages publiques, le rassemblement des faits avec leurs adresses et dates, et une liste de questions à trier.`,
        must_verify: `Chaque chiffre et chaque règle avec la page ouverte et datée ; la séparation entre fait et hypothèse commerciale ; l'absence de donnée privée sur des personnes ; le fait que l'entreprise fictive n'a aucune page publique.`,
        why_etti: `Les missions d'une ETTI viennent des entreprises utilisatrices et des clauses sociales des marchés publics : une visite bien préparée permet de proposer des missions compatibles avec les freins des salariés (mobilité, horaires) et de clarifier dès le départ ce qui relève de l'entreprise utilisatrice (conditions d'exécution, sécurité, formation au poste, EPI).`,
      },
    },
    private_content: {
      answer_key: `## Attendu

Il n'existe pas de fiche « correcte » unique : le corrigé porte sur la méthode.

### Une fiche est satisfaisante quand
- chaque fait déterminant a une page consultée, une date et un passage retrouvé ;
- les hypothèses, notamment commerciales (« ils vont recruter », « ils ont besoin de renfort »), sont nommées comme telles ;
- aucune règle n'est citée sans source officielle datée et pertinente (par exemple la responsabilité de l'entreprise utilisatrice sur les conditions d'exécution, la santé, la sécurité, la formation au poste et les EPI) ;
- les cinq questions couvrent : tâches réellement confiées, compétences et habilitations attendues, horaires réels, accès au site pour un salarié sans véhicule, prochaines étapes (volume, date, interlocuteur, formation au poste, EPI) ;
- les deux incertitudes sont de vraies inconnues (pas des questions rhétoriques).

### Pour le cas fictif (R5)
- Faits sourcés possibles : uniquement ceux de R5 (recommandations du guide) et des pages publiques sur le secteur de la logistique dans le territoire choisi (France Travail, Dares, Insee, DREETS).
- Incertitudes attendues : adresse exacte du site ; horaires de la semaine suivante ; rémunération ; accès en transport en commun.
- Rappel : l'entreprise Atelier Horizon Logistique est fictive, elle n'a pas de page publique. Toute « source » la concernant est une invention.

### Signaux d'alerte
- Effectif ou chiffre d'affaires sans page.
- Besoin de recrutement annoncé sans page datée (hypothèse commerciale présentée comme fait).
- Règle de sécurité formulée de manière générale sans source (« la loi impose… »).
- Nom d'un dirigeant ou d'un salarié.
- Source « retrouvée » dont la page ne contient pas le passage cité.

## Lecture du temps observé
La vérification des sources prend souvent plus de temps que la recherche : c'est normal et c'est la part qui ne se délègue pas. Le temps noté vaut pour cette fiche et ce territoire.`,
      trainer_notes: `## Animation
- Démonstration (8 min) : lancer le prompt sur un secteur, puis ouvrir une page citée en direct et montrer qu'un passage existe… ou pas. Choisir à l'avance un exemple où l'assistant se trompe (chiffre de recrutement sans page). Lancer le chronomètre visible.
- Préparer le dossier de captures de secours avant la séance (adresse, date de capture, contexte), même si les outils fonctionnent.
- Si des participants travaillent avec des facilitateurs de clauses sociales, les laisser préparer un rendez-vous facilitateur avec les mêmes règles (informations publiques du marché uniquement).

## Pièges fréquents
- Fiche remplie de chiffres non ouverts : imposer les 10 minutes de vérification des sources comme un temps à part, écran de recherche fermé.
- Binômes qui cherchent des informations sur des personnes (dirigeant, responsable d'entrepôt) : rappeler « informations professionnelles publiques seulement ».
- Cas fictif : certains cherchent Atelier Horizon Logistique sur le web ; expliquer qu'il n'existe pas et que c'est volontaire.
- Questions qui oublient les salariés : vérifier que l'accès au site sans véhicule et la formation au poste figurent dans les cinq questions.

## Rythmes différents
- Rapides : entreprise publique réelle (niveau autonome) et bonus (présentation de l'ETTI en trois phrases).
- Lents : cas fictif avec R5, trois faits maximum, concentrer l'effort sur les questions et les incertitudes.

## Débrief
Demander à chaque binôme l'affirmation supprimée la plus surprenante et le rapport entre temps de recherche et temps de vérification.`,
    },
  },

  // ---------------------------------------------------------------------
  // SÉANCE 2
  // ---------------------------------------------------------------------
  {
    code: 'REA',
    title: `Réactivation et retour sur les réalisations`,
    seance: 2,
    position: 6,
    duration_min: 10,
    breakdown: [
      { label: 'Retour', minutes: 5 },
      { label: 'Réflexion individuelle', minutes: 5 },
    ],
    content: {
      objective: `À la fin de la séquence, chaque participant a noté ce qu'il retient de la séance 1 et ce qu'il veut revoir, et le groupe a reconnu les trois réflexes communs aux ateliers 1 à 3 tels qu'ils s'appliquent au quotidien d'une ETTI.`,
      brief: `Pendant cinq minutes, le formateur revient sur les réalisations de la séance 1 : quelques comptes rendus de suivi, FAQ de mission et fiches de visite déposés (avec l'accord de leurs auteurs), les détails transformés par les outils (mission « confirmée », rémunération « estimée », trajet « validé ») et les corrections apportées, ainsi que les temps observés, présentés comme des mesures sur un cas fictif et non comme des gains acquis. Ensuite, pendant cinq minutes, vous réfléchissez seul et notez en quelques lignes : ce que j'ai retenu, ce que je veux revoir, ce que j'ai déjà essayé depuis la séance 1 (si c'est le cas, sans donnée réelle de salarié, d'entreprise utilisatrice ou de prescripteur). Le lexique R10 est disponible si un terme de la séance 1 reste flou. Ces notes vous serviront pour le défi individuel et le plan d'application.`,
      resource_codes: ['R10'],
      steps: [
        `Écouter le retour du formateur sur les productions et les temps observés de la séance 1.`,
        `Noter les trois réflexes communs aux trois premiers ateliers (source, vérification, responsabilité) avec un exemple ETTI pour chacun.`,
        `Écrire ce que j'ai retenu de la séance 1 en deux ou trois phrases.`,
        `Écrire ce que je veux revoir ou approfondir en séance 2.`,
        `Indiquer, le cas échéant, ce que j'ai déjà essayé depuis la séance 1 au poste, sans donnée réelle.`,
      ],
      deliverable: `Une note individuelle courte : ce que j'ai retenu, ce que je veux revoir, ce que j'ai éventuellement essayé, et les trois réflexes avec un exemple d'agence pour chacun.`,
      success_criteria: [
        `La note cite au moins un apprentissage précis de la séance 1 (pas seulement « c'était intéressant »).`,
        `La note cite au moins un point à revoir.`,
        `La note ne contient aucune donnée réelle de la structure, d'un salarié en parcours, d'une entreprise utilisatrice ou d'un prescripteur.`,
        `Les trois réflexes communs sont nommés avec les mots du participant et un exemple de son poste.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Repartir d'un moment précis`,
          text: `Pensez au moment de la séance 1 où vous avez corrigé l'outil : quelle phrase, quelle date, quel mot (« confirmée », « validé », « environ ») ? C'est souvent ce moment-là qui résume le mieux ce que vous avez retenu, et c'est le même mot que vous traquerez dans vos vrais comptes rendus.`,
        },
        {
          level: 'trame',
          title: `Gabarit de note`,
          text: `Ce que j'ai retenu : [un apprentissage précis, avec l'atelier concerné]. Ce que je veux revoir : [une étape, un outil, une règle]. Ce que j'ai essayé depuis (sans donnée réelle) : [rien / un test sur …]. Les trois réflexes : 1) source : [exemple : la fiche de mission V2, pas la V1] ; 2) vérification : [exemple : ouvrir le passage cité] ; 3) responsabilité : [exemple : c'est moi qui envoie le point d'étape au prescripteur].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple`,
          text: `« Ce que j'ai retenu : en atelier 1, l'outil avait écrit “mission confirmée” alors que l'entreprise utilisatrice n'avait rien confirmé ; je relis maintenant chaque mot de confirmation avant d'enregistrer un compte rendu. Ce que je veux revoir : comment présenter un conflit de versions de fiche de mission dans une FAQ. Temps observé en atelier 1 : noté, mais je ne sais pas encore ce que ça donne avec mes vraies notes. »`,
        },
      ],
      debrief_questions: [
        `Quel réflexe de la séance 1 vous semble le plus facile à garder au quotidien en agence ?`,
        `Quel point le groupe veut-il revoir en priorité ?`,
      ],
      fallback: `Sans application : notes sur papier, conservées par le participant pour le plan d'application.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Séquence de réactivation sans outil IA.`,
        task: `Noter ce que je retiens et ce que je veux revoir.`,
        data: `Mes propres notes de la séance 1, aucune donnée réelle.`,
        constraints: `Pas de donnée réelle de salarié, d'entreprise utilisatrice ni de prescripteur.`,
        format: `Quelques lignes.`,
        controls: `Relire pour vérifier qu'aucune information de la structure ou d'une personne n'apparaît.`,
      },
      levels: {
        guided: `Utilisez le gabarit de note et répondez à chaque rubrique en une phrase.`,
        autonomous: `Rédigez votre note librement, puis reliez-la à votre tâche prioritaire de l'accueil.`,
        bonus: `Formulez une question que vous poseriez à un collègue d'agence qui n'a pas suivi la séance 1 pour vérifier qu'il a compris le réflexe de vérification. Non évalué.`,
      },
      work_mode: 'individual',
      families: [],
      production_kind: 'review',
      deposit_notice: DEPOSIT_NOTICE,
      job_context: {
        task: `Reprendre pied dans la méthode après quelques jours de travail en agence, avant de l'appliquer seul au défi individuel.`,
        time_sinks: `Entre les deux séances, les missions, les points prescripteur et les saisies ont repris le dessus ; sans réactivation, on oublie ce qui a été corrigé et on réapprend en séance 2.`,
        delegable: `Rien : la réactivation se fait sans outil.`,
        must_verify: `Que les notes ne contiennent aucune donnée réelle, même si un test a eu lieu au poste entre les deux séances.`,
        why_etti: `Les trois réflexes (source, vérification, responsabilité) correspondent à des gestes quotidiens de l'ETTI : lire la bonne version de la fiche de mission, vérifier auprès de l'entreprise utilisatrice avant d'annoncer, assumer ce qui est transmis au salarié et au prescripteur.`,
      },
    },
    private_content: {
      answer_key: `## Les trois réflexes à faire émerger (avec leur traduction ETTI)

- Source : chaque information vient d'un document ou d'une page identifiée et datée (la fiche de mission V2, pas la V1 ; la page publique, pas la mémoire).
- Vérification : on ouvre le passage, on compare, on corrige ou on supprime (une mission n'est confirmée que par l'entreprise utilisatrice).
- Responsabilité : la personne qui envoie le livrable en reste responsable, pas l'outil (le compte rendu, le point d'étape au prescripteur, le courriel à l'entreprise utilisatrice portent le nom du permanent).

## Note individuelle
Pas de corrigé : on attend un apprentissage précis et un point à revoir.

## Temps observés
Les rappeler comme des mesures sur un cas fictif ; aucun gain général n'en découle.`,
      trainer_notes: `## Animation
- Montrer deux ou trois productions de la séance 1 avec accord des auteurs ; mettre en avant les corrections, pas les erreurs.
- Présenter les temps observés de façon neutre (fourchettes, sans classement), en rappelant qu'ils incluent la vérification et valent pour le cas fictif.
- Rappeler que le défi individuel reprend les livrables de la séance 1 : les participants doivent les avoir sous la main.

## Pièges fréquents
- Participants qui ont testé entre les deux séances sur des données réelles (vraies notes d'entretien, export de la plateforme) : accueillir le retour, rappeler la règle, ne pas afficher le résultat.
- Temps qui déborde : 10 minutes, pas plus ; la séance 2 est dense.`,
    },
  },

  {
    code: 'A4',
    title: `Atelier 4 — Rendre un parcours compréhensible`,
    seance: 2,
    position: 7,
    duration_min: 40,
    breakdown: [
      { label: 'Démonstration', minutes: 5 },
      { label: 'Production', minutes: 25 },
      { label: 'Contrôle', minutes: 7 },
      { label: 'Débrief', minutes: 3 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque participant a transformé la procédure d'accueil IAE fictive R4 en un schéma de six étapes qui conserve l'ordre, le point de validation du permanent responsable et les inconnues, dont la compréhension a été contrôlée par un pair comme on l'expliquerait à un salarié en parcours d’insertion, et a noté le temps réellement passé.`,
      brief: `En ETTI, le parcours d'accueil est expliqué très souvent : à chaque nouveau salarié en parcours, aux nouveaux collègues, parfois au prescripteur. Le texte de la procédure existe, mais il est rarement sous une forme que l'on peut montrer en entretien. Seul, vous transformez la procédure d'accueil R4 (V2 du 16/09/2026, document fictif de l'Agence Horizon) en un schéma de six étapes. Utilisez Napkin ou l'outil de schématisation autorisé par votre structure avec le prompt de départ, en collant le texte de R4. Le schéma doit conserver l'ordre des six étapes, faire apparaître clairement l'étape 4 (validation par le permanent responsable) comme un point de validation humaine, et montrer la règle « un point inconnu est attribué à un responsable, jamais complété par supposition ». Utilisez des verbes simples et des libellés courts, compréhensibles par un salarié qui découvre l'agence. N'ajoutez aucune décision, aucune obligation ni aucune étape absente du texte (pas de « PASS IAE validé ? », pas de « contrat signé » : la procédure ne les décrit pas). Exportez le schéma en PNG ou PDF et rédigez une courte explication de votre choix visuel. Pendant le temps de contrôle, échangez votre schéma avec un autre participant : il doit retrouver les six étapes dans l'ordre et le point de validation sans lire R4, comme s'il était le salarié à qui on explique l'accueil. Chronométrez la production, les corrections et l'export, et notez le temps dans le champ prévu par l'application.`,
      resource_codes: ['R4'],
      steps: [
        `Lire R4 en entier et numéroter les six étapes sur papier, en entourant le point de validation et la règle sur les inconnues ; démarrer le chronomètre.`,
        `Saisir le prompt de départ avec le texte de R4 dans l'outil de schématisation autorisé.`,
        `Comparer le schéma obtenu avec R4 : même ordre, six étapes, aucune étape ajoutée (PASS IAE, contrat, formation) ni fusionnée.`,
        `Corriger les libellés pour qu'ils soient courts, avec un verbe simple, compréhensibles par un salarié en parcours, et faire ressortir la validation humaine (étape 4).`,
        `Vérifier que le schéma mentionne la règle sur les points inconnus sans la transformer en décision supplémentaire.`,
        `Exporter en PNG ou PDF et rédiger trois à cinq lignes sur le choix visuel.`,
        `Faire contrôler le schéma par un pair qui ne lit pas R4 et qui joue le salarié à qui on explique l'accueil ; noter ce qu'il n'a pas compris et corriger.`,
        `Arrêter le chronomètre et remplir le champ « Temps sur cette tâche » avant le dépôt.`,
      ],
      deliverable: `Un schéma de six étapes (PNG ou PDF) + une courte explication du choix visuel + le prompt exact et l'outil utilisé + le retour du pair qui a contrôlé la compréhension + le temps observé (production + corrections + export) dans le champ prévu par l'application, mesure de cette tâche et non promesse générale.`,
      success_criteria: [
        `Les six étapes sont présentes, dans l'ordre de R4, sans étape ajoutée, fusionnée ni supprimée.`,
        `Le point de validation humaine (étape 4, permanent responsable) est visible au premier regard.`,
        `Le texte est lisible par un salarié qui découvre l'agence (libellés courts, verbes simples, pas de sigle non expliqué, taille suffisante une fois exporté).`,
        `Aucune décision ni obligation absente du texte n'a été ajoutée.`,
        `Un pair a retrouvé les six étapes et la validation sans lire R4, et son retour est noté ; le temps observé est renseigné.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Les outils aiment ajouter des losanges`,
          text: `Les outils de schématisation ajoutent souvent des points de décision (« éligible ? oui / non », « PASS IAE validé ? ») ou des boucles qui ne sont pas dans le texte. Comptez les formes : si vous avez plus de six étapes, ou une question qui n'est pas dans R4, supprimez-la. La seule validation du texte est celle de l'étape 4 ; la règle sur les inconnues est une consigne, pas une décision supplémentaire. L'éligibilité IAE et le PASS IAE existent dans la vraie vie, mais la procédure R4 ne les décrit pas : on ne les ajoute pas.`,
        },
        {
          level: 'trame',
          title: `Gabarit de libellés et d'explication`,
          text: `Étape 1 : [verbe] + [objet court]. Étape 2 : [...]. Étape 3 : [...]. Étape 4 (validation humaine) : [verbe] + [par qui]. Étape 5 : [...]. Étape 6 : [...]. Mention associée : « point inconnu → attribué à un responsable, jamais supposé ». Explication du choix visuel : « J'ai choisi [une ligne / une colonne / des blocs numérotés] parce que [...]. J'ai mis en avant l'étape 4 par [couleur / forme / cadre] parce que [...]. J'ai placé la règle sur les inconnues [où] pour [...]. Un salarié qui découvre l'agence comprend [...] ». `,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple de libellés`,
          text: `Étape 1 : « On écoute votre demande et on explique l'accueil ». Étape 2 : « On note vos compétences et vos disponibilités utiles ». Étape 4 (cadre renforcé) : « Le responsable de l'agence valide le projet de mission ». Note sous le schéma : « Ce qu'on ne sait pas encore : quelqu'un est chargé de le demander, on ne suppose pas ». — Les étapes 3, 5 et 6 et le choix visuel sont à produire par le participant.`,
        },
      ],
      debrief_questions: [
        `Qu'est-ce que l'outil a ajouté ou modifié par rapport à R4 (décision, étape IAE, contrat) ? Comment l'avez-vous repéré ?`,
        `Qu'est-ce que le contrôle par un pair jouant le salarié a révélé que vous n'aviez pas vu ?`,
      ],
      fallback: `Sans outil de schématisation : utiliser les six blocs éditables de l'application (un bloc par étape, avec un libellé court et un marqueur de validation), puis imprimer en PDF depuis le navigateur. Le contrôle par un pair et la note du temps se font de la même manière.`,
      prompt_starter: `Transforme cette procédure en un schéma de six étapes. Conserve l'ordre, les points de validation et les inconnues. Utilise des verbes simples et des libellés courts. N'ajoute pas de décision ni d'obligation absente du texte. Contexte : procédure d'accueil d'une ETTI fictive, schéma destiné à être expliqué à un salarié en parcours d’insertion.`,
      prompt_defaults: {
        context: `Je travaille dans une ETTI fictive (Agence Horizon). Le texte fourni est la procédure d'accueil R4, version V2 du 16/09/2026 (document fictif), en six étapes. Le schéma servira à expliquer l'accueil à un salarié en parcours d’insertion.`,
        task: `Transforme cette procédure en un schéma de six étapes.`,
        data: `Texte intégral de R4 (collé ci-dessous).`,
        constraints: `Conserve l'ordre, les points de validation et les inconnues. N'ajoute pas de décision ni d'obligation absente du texte (pas d'étape PASS IAE, contrat ou formation). Pas d'étape supplémentaire. Pas de sigle non expliqué.`,
        format: `Schéma linéaire de six blocs numérotés, libellés courts avec verbes simples, validation humaine mise en évidence, mention de la règle sur les points inconnus.`,
        controls: `Je comparerai chaque bloc avec le texte de R4 et je ferai contrôler la compréhension par un pair jouant le salarié.`,
      },
      levels: {
        guided: `Utilisez le prompt de départ, puis le gabarit de libellés pour corriger chaque bloc. Faites contrôler par un voisin et notez votre temps.`,
        autonomous: `Produisez le schéma, puis une seconde version avec une disposition différente, et expliquez laquelle est la plus claire pour un salarié qui découvre l'agence et pourquoi.`,
        bonus: `Rédigez une légende de deux lignes destinée à un salarié qui entre en parcours, puis une seconde destinée à un nouveau collègue permanent, avec les mêmes six étapes. Notez dans le champ prévu le temps que cela ajoute : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'individual',
      families: ['schemas'],
      production_kind: 'process_blocks',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE}`,
      job_context: {
        task: `Transformer la procédure d'accueil IAE de l'agence en un schéma que l'on peut montrer et expliquer à un salarié en parcours d’insertion, à un nouveau collègue ou au prescripteur.`,
        time_sinks: `La procédure existe en texte, mais on la réexplique oralement à chaque accueil, chaque intégration de collègue et parfois à chaque point d'étape ; les tentatives de schéma à la main sont longues et vieillissent dès que la procédure change de version.`,
        delegable: `La première mise en forme graphique à partir du texte collé, et une ou deux propositions de disposition.`,
        must_verify: `Le nombre et l'ordre des étapes, l'absence de toute décision ou étape ajoutée (éligibilité, PASS IAE, contrat), la visibilité du point de validation du permanent responsable, la compréhension par un pair sans le texte.`,
        why_etti: `L'accueil en ETTI enchaîne diagnostic socioprofessionnel, vérification de la mission et validation par le permanent responsable avant toute proposition au salarié : un schéma fidèle évite d'annoncer une mission non validée et donne au salarié une vue claire de ce qui l'attend.`,
      },
    },
    private_content: {
      answer_key: `## Schéma attendu (cas fictif Agence Horizon, procédure R4 V2 du 16/09/2026)

Six blocs dans cet ordre :
1. Recueillir la demande et expliquer le déroulement.
2. Relever uniquement les compétences et disponibilités nécessaires.
3. Vérifier les informations de la mission et les points inconnus.
4. Faire valider le projet de mission par le permanent responsable (validation humaine, à mettre en évidence).
5. Expliquer les prochaines actions.
6. Fixer un point de suivi et consigner les actions.

Mention associée (souvent près de l'étape 3 ou en bas) : un point inconnu est attribué à un responsable, jamais complété par supposition.

## Ce qui est accepté
- Linéaire horizontal ou vertical, blocs numérotés, une couleur ou un cadre pour l'étape 4.
- La règle sur les inconnues en note, en bandeau ou rattachée à l'étape 3.
- Des libellés reformulés à la deuxième personne pour le salarié (« on note vos disponibilités »), tant que le sens est conservé.

## Ce qui n'est pas accepté
- Un losange « mission validée ? oui / non » ou « éligible IAE ? » : la procédure ne décrit pas de refus ni d'étape d'éligibilité.
- Une étape « relancer l'entreprise utilisatrice », « signer le contrat de mission », « délivrer le PASS IAE » ou « formation au poste » : absentes du texte, même si elles existent dans la vraie vie d'une ETTI.
- Les étapes 5 et 6 fusionnées.
- Un libellé qui change le sens (« relever toutes les informations » au lieu de « uniquement les nécessaires »).
- Un sigle non expliqué sur un schéma destiné au salarié.

## Lecture du temps observé
Le temps noté inclut les corrections et l'export ; au poste, il faudra le refaire à chaque nouvelle version de la procédure. La mesure vaut pour ce document.`,
      trainer_notes: `## Animation
- Démonstration (5 min) : coller R4, lancer le prompt, montrer un ajout typique de l'outil (décision « éligible ? », étape « contrat ») et le supprimer. Lancer le chronomètre visible.
- Prévoir les six blocs éditables de l'application comme secours ; les montrer en 30 secondes.
- Pour le contrôle par un pair : le pair joue le salarié qui découvre l'agence et redit les six étapes à voix haute.

## Pièges fréquents
- Schéma « enrichi » avec des décisions ou des étapes IAE réelles (PASS IAE, contrat) : revenir au texte ; la vraie vie n'est pas dans R4.
- Libellés trop longs ou pleins de sigles : règle des six à huit mots, pas de sigle sans explication.
- Contrôle par un voisin bâclé : le voisin doit dire à voix haute les six étapes sans regarder R4.

## Rythmes différents
- Rapides : seconde disposition (niveau autonome) ou bonus (deux légendes).
- Lents : blocs éditables directement, sans outil IA.`,
    },
  },

  {
    code: 'A5',
    title: `Atelier 5 — Créer un support visuel inclusif`,
    seance: 2,
    position: 8,
    duration_min: 45,
    breakdown: [
      { label: 'Démonstration', minutes: 5 },
      { label: 'Production', minutes: 30 },
      { label: 'Contrôle', minutes: 7 },
      { label: 'Débrief', minutes: 3 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a produit, à partir du brief fictif R6, une affiche d'agence « Préparer sa première mission » destinée aux salariés en parcours d’insertion, avec trois messages courts et une illustration non stéréotypée, accompagnée d'un texte accessible séparé, d'une description de l'image et d'une vérification des informations et des droits d'usage, et a noté le temps réellement passé.`,
      brief: `En ETTI, l'affichage de l'agence est souvent le premier support que voit un salarié en parcours : il attend son entretien, il lit ce qui est au mur. Une affiche « Préparer sa première mission » rappelle ce que la conseillère dit à chaque accueil, mais que l'on n'a jamais le temps de mettre en forme. En binôme, partez du brief de communication R6 (document fictif) : trois actions à retenir avant une première mission chez une entreprise utilisatrice : vérifier les horaires, préparer les questions utiles, confirmer le trajet. Le brief interdit d'inventer une rémunération, une adresse, un contact ou une date, et demande une représentation non stéréotypée des personnes (âge, genre, origine, apparence) : pas de mise en scène de la précarité, pas de salarié présenté comme « aidé », des adultes au travail. Deux productions : d'abord le texte, avec le prompt de rédaction (prompt de départ) pour reformuler les trois actions en phrases courtes, concrètes et respectueuses ; ensuite l'illustration, avec l'outil d'images autorisé et ce prompt : « Crée une illustration professionnelle d'accueil en agence d'emploi, pour un public adulte, avec des personnes diverses sans stéréotype de précarité. Composition simple, rassurante et lisible. Ne génère aucun texte dans l'image : les trois messages seront ajoutés séparément. » Assemblez l'affiche (texte ajouté par vous, pas par l'outil d'images), puis préparez un texte accessible séparé (les trois messages en texte brut, lisible par un lecteur d'écran ou à voix haute en entretien) et une description de l'image en une ou deux phrases. Vérifiez le contraste texte / fond, l'absence de toute information inventée et les conditions d'usage de l'image (licence de l'outil, usage interne ou externe autorisé par votre structure). Pendant le contrôle, un autre binôme lit l'affiche et reformule les trois actions avec ses propres mots, comme le ferait un salarié. Ne revendiquez ni le label FALC ni une accessibilité certifiée : vous appliquez des principes de clarté, pas une norme. Chronométrez le texte, l'image, l'assemblage et la vérification, et notez le temps dans le champ prévu par l'application.`,
      resource_codes: ['R6'],
      steps: [
        `Lire R6 et recopier les trois actions, les interdictions (pas de rémunération, adresse, contact ni date inventés) et l'exigence de représentation non stéréotypée ; démarrer le chronomètre.`,
        `Saisir le prompt de départ (rédaction) avec les trois actions et obtenir trois phrases courtes ; les relire et les corriger à deux, en pensant à un salarié qui découvre l'intérim d'insertion.`,
        `Saisir le prompt image dans l'outil d'images autorisé ; vérifier que l'image ne contient aucun texte ni stéréotype (précarité, genre, origine, âge).`,
        `Assembler l'affiche : titre, trois messages ajoutés par vous, illustration ; contrôler le contraste et la taille du texte pour une lecture depuis la salle d'attente.`,
        `Rédiger le texte accessible séparé (titre et trois messages en texte brut) et la description de l'image.`,
        `Vérifier les conditions d'usage de l'image (licence, usage autorisé en agence) et noter le résultat.`,
        `Faire lire l'affiche à un autre binôme qui reformule les trois actions comme un salarié ; corriger si une action n'est pas comprise.`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer l'affiche, le texte accessible, la description de l'image, la vérification et les deux prompts exacts.`,
      ],
      deliverable: `Une affiche (image ou PDF) + un texte accessible séparé (titre et trois messages) + une description de l'image + une vérification écrite (informations, contraste, représentation, droits d'usage, test de compréhension) + les deux prompts exacts et les outils utilisés + le temps observé (texte + image + assemblage + vérification) dans le champ prévu par l'application, mesure de cette tâche et non promesse générale.`,
      success_criteria: [
        `Les trois actions de R6 sont présentes, compréhensibles par un salarié en parcours et reformulées en phrases courtes.`,
        `Le texte est sans faute et ne contient aucune rémunération, adresse, contact ni date.`,
        `Le contraste entre le texte et le fond est suffisant pour une lecture à distance.`,
        `L'image ne contient aucun texte généré et aucun stéréotype (précarité, genre, origine, âge) ; sa description est fournie.`,
        `Les conditions d'usage de l'image ont été examinées et notées, avec la validation nécessaire dans la structure.`,
        `Un autre binôme a reformulé les trois actions correctement ; le résultat du test et le temps observé sont notés.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Le texte dans l'image est un piège double`,
          text: `Les outils d'images génèrent souvent du texte déformé ou des mots inventés. C'est pourquoi le prompt demande une image sans texte : vous ajoutez les messages vous-même, en texte réel, ce qui permet aussi de les lire à voix haute en entretien ou avec un lecteur d'écran. Si l'image contient malgré tout des lettres, relancez ou recadrez. Regardez aussi qui est représenté : si l'outil montre des personnes « en difficulté » face à un conseiller « qui aide », c'est un stéréotype à relancer.`,
        },
        {
          level: 'trame',
          title: `Gabarit d'affiche et de vérification`,
          text: `Titre : « Préparer sa première mission ». Message 1 (horaires) : [phrase courte, verbe à l'impératif ou à l'infinitif]. Message 2 (questions utiles) : [...]. Message 3 (trajet) : [...]. Prompt image utilisé : « Crée une illustration professionnelle d'accueil en agence d'emploi, pour un public adulte, avec des personnes diverses sans stéréotype de précarité. Composition simple, rassurante et lisible. Ne génère aucun texte dans l'image : les trois messages seront ajoutés séparément. » Description de l'image : [une ou deux phrases]. Vérification : informations inventées ? [non / corrigé] ; contraste ? [suffisant / corrigé] ; représentation ? [diverse, sans stéréotype / relancé] ; droits d'usage ? [licence consultée : …, usage en agence autorisé par : …] ; test de compréhension : [binôme X a reformulé : …].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (un message et une description)`,
          text: `Message 1 : « Vérifiez vos horaires avant le premier jour. » Description de l'image : « Une conseillère et un salarié discutent à un bureau d'agence, dans un espace clair ; les deux personnes sont représentées comme des adultes au travail ; aucun texte dans l'image. » Vérification droits : « Conditions d'usage de l'outil consultées le [date] ; usage interne d'affichage en agence à valider par le responsable d'agence. » — Les messages 2 et 3 et le reste de la vérification sont à produire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Quelle action a été la plus difficile à reformuler sans ajouter d'information ni prendre un ton moralisateur ?`,
        `Qu'a révélé le test de compréhension par l'autre binôme ? Un salarié qui découvre l'agence aurait-il compris la même chose ?`,
        `Qui, dans votre structure, valide l'usage d'une image générée pour un affichage en agence ?`,
      ],
      fallback: `Sans outil d'images : utiliser des pictogrammes à licence identifiée (fournis par le formateur avec leur source) ou des formes simples (cercles, flèches) dessinées dans un outil bureautique. L'affiche, le texte accessible, la vérification et la note du temps restent identiques ; indiquer « sans outil d'images » dans le dépôt.`,
      prompt_starter: `Reformule ces trois actions en phrases courtes, concrètes et respectueuses. N'ajoute aucun lieu, salaire, date ou numéro absent du brief. Contexte : affiche d'une ETTI fictive destinée aux salariés en parcours d’insertion avant leur première mission.`,
      prompt_defaults: {
        context: `Je prépare une affiche d'ETTI fictive intitulée « Préparer sa première mission », destinée aux salariés en parcours d’insertion, à partir du brief R6 (document fictif).`,
        task: `Reformule ces trois actions en phrases courtes, concrètes et respectueuses.`,
        data: `Les trois actions du brief : vérifier les horaires ; préparer les questions utiles ; confirmer le trajet.`,
        constraints: `N'ajoute aucun lieu, salaire, date ou numéro absent du brief. Pas de jargon (pas de « mise à disposition », pas de sigle). Ton respectueux, sans infantiliser ni moraliser.`,
        format: `Trois phrases, une par action, dix mots maximum chacune.`,
        controls: `Je relirai chaque phrase pour vérifier qu'elle ne contient aucune information absente du brief et qu'un autre binôme la comprend.`,
      },
      levels: {
        guided: `Utilisez les deux prompts tels quels et le gabarit de vérification. Assemblez l'affiche dans l'outil bureautique de votre choix et notez votre temps.`,
        autonomous: `Produisez deux variantes d'illustration, choisissez-en une et expliquez votre choix en termes de lisibilité et de représentation non stéréotypée.`,
        bonus: `Proposez une version de l'affiche en format téléphone (vertical, texte plus gros) avec le même texte accessible, à envoyer au salarié avant sa première mission. Notez dans le champ prévu le temps que cela ajoute : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['images'],
      production_kind: 'poster',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE}`,
      job_context: {
        task: `Produire un support d'agence clair pour les salariés en parcours (affiche « Préparer sa première mission »), avec un texte accessible et une image sans stéréotype.`,
        time_sinks: `Les supports d'agence sont faits « quand on aura le temps », donc rarement ; quand on s'y met, on passe du temps à choisir une image, à la recadrer, à retaper le texte, et on oublie de vérifier les droits d'usage ou la façon dont les salariés sont représentés.`,
        delegable: `La reformulation des trois actions en phrases courtes et la proposition d'illustration sans texte.`,
        must_verify: `L'absence d'information inventée (rémunération, adresse, contact, date), le ton (respectueux, non moralisateur), la représentation des personnes, le contraste, les droits d'usage de l'image et la validation par la structure.`,
        why_etti: `Les salariés en parcours d’insertion sont souvent représentés sous l'angle de la difficulté : une ETTI qui les montre comme des adultes au travail, avec des consignes claires avant la première mission chez l'entreprise utilisatrice, soutient la relation de confiance et réduit les premiers jours ratés.`,
      },
    },
    private_content: {
      answer_key: `## Attendu

### Texte
Trois phrases courtes qui reprennent fidèlement les trois actions de R6, par exemple :
- « Vérifiez vos horaires avant le premier jour. »
- « Préparez vos questions pour l'agence et l'entreprise. »
- « Confirmez votre trajet et votre heure de départ. »
Aucune mention de rémunération, d'adresse, de contact ni de date. Pas de « mise à disposition », pas de sigle, pas de ton moralisateur.

### Image
- Illustration sans texte, personnes diverses (âge, genre, origine, apparence), cadre d'agence, pas de stéréotype de précarité (pas de mise en scène misérabiliste, pas de salarié « aidé » face à un conseiller « sauveur », pas de signe distinctif caricatural).
- Description fournie en une ou deux phrases.

### Vérification
- Contraste : texte foncé sur fond clair ou l'inverse, pas de texte sur une zone chargée de l'image.
- Droits : conditions d'usage de l'outil consultées et notées ; validation de l'usage en agence par la structure mentionnée comme nécessaire.
- Test de compréhension : un autre binôme a reformulé les trois actions comme le ferait un salarié.

## Ce qu'on ne revendique pas
- Le label FALC (facile à lire et à comprendre) suppose une méthode et une validation par des personnes concernées : l'atelier applique des principes de clarté, il ne délivre pas ce label.
- Une « accessibilité certifiée » : il n'y a pas de certification ici.

## Erreurs fréquentes
- Phrase avec une date ou un lieu (« rendez-vous lundi à l'agence de … »).
- Texte généré dans l'image.
- Image avec un stéréotype (personnes présentées comme démunies, un seul profil représenté).
- Droits d'usage non examinés.

## Lecture du temps observé
Le temps noté inclut l'image et l'assemblage ; au poste, la validation par le responsable d'agence s'ajoute. La mesure vaut pour cette affiche.`,
      trainer_notes: `## Animation
- Démonstration (5 min) : montrer le prompt image et un résultat avec du texte déformé pour expliquer pourquoi on ajoute le texte séparément ; montrer aussi un résultat stéréotypé et le relancer. Lancer le chronomètre visible.
- Avoir un jeu de pictogrammes à licence identifiée prêt pour la solution de secours.

## Pièges fréquents
- Binômes qui passent 20 minutes sur l'image : fixer un temps maximum de 10 minutes pour l'illustration, le texte et la vérification priment.
- Phrases trop longues ou moralisatrices (« Soyez ponctuel ! ») : rappeler « concrètes et respectueuses », destinées à des adultes.
- Oubli du texte accessible séparé : le rappeler au moment du dépôt.
- Image « agence » qui montre un seul type de personne : demander une relance.

## Rythmes différents
- Rapides : deux variantes d'illustration (niveau autonome) ou format téléphone (bonus).
- Lents : pictogrammes de secours dès le départ, concentrer l'effort sur les trois phrases et le test de compréhension.`,
    },
  },

  {
    code: 'A6',
    title: `Atelier 6 — Comparer et combiner deux assistants`,
    seance: 2,
    position: 9,
    duration_min: 40,
    breakdown: [
      { label: 'Démonstration', minutes: 5 },
      { label: 'Production', minutes: 25 },
      { label: 'Comparaison', minutes: 7 },
      { label: 'Débrief', minutes: 3 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a soumis le même prompt et le même document fictif R2 à deux assistants disponibles pour rédiger un courriel interne de préparation de mission, a comparé les deux courriels obtenus selon sept critères, a expliqué une décision d'usage valable pour cette tâche et ce test, et a noté le temps réellement passé.`,
      brief: `Le courriel interne de préparation de mission est un écrit quotidien en ETTI : avant une mise à disposition, le chargé de recrutement ou la conseillère informe l'équipe (responsable d'agence, assistant administratif chargé du contrat de mission et du contrat de mise à disposition) des faits connus, des informations à obtenir auprès de l'entreprise utilisatrice et des prochaines actions. En binôme, vous testez deux assistants disponibles et autorisés par votre structure sur cette même tâche, à partir de la fiche de mission fictive R2 (V2 du 18/09/2026). Le courriel fait 120 mots maximum, résume les faits, mentionne les points à confirmer (horaires de la semaine suivante, trajet, rémunération, confirmation de l'entreprise utilisatrice), n'annonce jamais la mission comme validée et ne contient aucune donnée personnelle (pas de nom de salarié, pas de numéro, pas de PASS IAE). Utilisez exactement le même prompt (prompt de départ) et le même texte R2 dans les deux assistants. Avant de commencer, notez les différences connues entre les deux : l'un fait de la recherche web (risque d'ajouter des informations extérieures à R2, par exemple un taux de la branche), l'autre non ; l'un accepte les pièces jointes, l'autre demande de coller le texte. Signalez ces deux points (recherche web activée ou non, pièce jointe ou texte collé) dans votre dépôt. Relevez pour chaque sortie : le nom de l'outil, le modèle si visible, la date, les réglages connus. Remplissez ensuite le tableau comparatif sur sept critères : fidélité à R2, qualité du texte, erreurs relevées, facilité de correction, accessibilité, conditions d'accès (compte, coût, autorisation), adéquation aux règles de la structure. Terminez par une décision expliquée : lequel garder pour cette tâche, ou comment les combiner. Ce résultat vaut pour cette tâche et ce test seulement : il ne s'agit pas d'un classement universel. Chronométrez les deux essais, la vérification et les corrections, et notez le temps dans le champ prévu par l'application. La fiche de liaison fictive R9 rappelle ce qui, dans ce courriel, servira ensuite au point d'étape avec le prescripteur.`,
      resource_codes: ['R2', 'R9'],
      steps: [
        `Noter les deux assistants testés, leurs différences connues (recherche web activée ou non, pièce jointe ou texte collé), le modèle si visible, la date et les réglages connus ; démarrer le chronomètre.`,
        `Saisir le prompt de départ avec le texte R2 dans le premier assistant ; copier la sortie telle quelle.`,
        `Saisir exactement le même prompt et le même texte dans le second assistant ; copier la sortie telle quelle.`,
        `Compter les mots des deux courriels et vérifier chaque fait avec R2 (horaires, conduite d'engin, disponibilité, début à confirmer).`,
        `Chercher dans chaque sortie une confirmation, un montant, une information venue du web ou une donnée personnelle ajoutée ; les relever comme erreurs.`,
        `Remplir le tableau comparatif sur les sept critères, en une ligne par critère.`,
        `Écrire la décision en trois à cinq phrases : lequel garder, pour quoi, et à quelles conditions dans votre structure.`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer les deux sorties brutes, le prompt exact, les informations sur les outils, le tableau et la décision.`,
      ],
      deliverable: `Les deux sorties brutes + le prompt exact + pour chaque assistant : nom de l'outil, modèle si visible, date, réglages connus, recherche web activée ou non, pièce jointe ou texte collé + un tableau comparatif sur sept critères + une décision expliquée (trois à cinq phrases) + le temps observé (deux essais + vérification + corrections) dans le champ prévu par l'application, mesure de cette tâche et non promesse générale.`,
      success_criteria: [
        `Le même prompt et le même texte R2 ont été utilisés dans les deux assistants, les deux sorties brutes sont fournies, et les conditions (recherche web, pièce jointe) sont signalées.`,
        `Chaque courriel fait 120 mots maximum, ne présente pas la mission comme validée, liste les points à confirmer et ne contient aucune donnée personnelle.`,
        `Les sept critères sont remplis avec une observation concrète pour chaque assistant (pas seulement une note).`,
        `Toute erreur (confirmation inventée, montant, information venue du web, donnée personnelle ajoutée) est relevée et attribuée au bon assistant.`,
        `La décision est expliquée, tient compte des règles de la structure et précise qu'elle vaut pour cette tâche et ce test seulement ; le temps observé est renseigné.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Comparer ce qui est comparable`,
          text: `Si un assistant a eu le document en pièce jointe et l'autre en texte collé, notez-le : c'est une différence de conditions, pas de qualité. De même pour la recherche web : pour ce courriel, elle n'est pas utile et peut introduire des informations extérieures à R2 (un taux horaire « habituel », une adresse supposée de l'entreprise utilisatrice). Un bon tableau explique ces différences avant de juger les sorties.`,
        },
        {
          level: 'trame',
          title: `Gabarit de tableau comparatif`,
          text: `| Critère | Assistant 1 : [nom] | Assistant 2 : [nom] | — Fidélité à R2 : [faits exacts ? horaires V2 ? conduite d'engin ? début « à confirmer » ?] — Qualité du texte : [phrases courtes ? ton professionnel ? 120 mots ?] — Erreurs relevées : [confirmation ? montant ? info venue du web ? donnée ajoutée ?] — Facilité de correction : [combien de retouches ?] — Accessibilité : [lisible ? structure claire pour l'assistant administratif qui prépare les contrats ?] — Conditions d'accès : [compte ? coût ? autorisation ?] — Adéquation aux règles de la structure : [autorisé ? données ? hébergement ?]. Décision : « Pour cette tâche et ce test, je retiens [...] parce que [...]. Je l'utiliserais à condition de [...]. Ce résultat ne vaut pas pour d'autres tâches. »`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple de ligne et de décision`,
          text: `Ligne « Erreurs relevées » : Assistant A (exemple) : « a écrit “mission confirmée” et a ajouté “rémunération au taux de la branche” → erreurs de fidélité, information venue de l'extérieur de R2 » ; Assistant B (exemple) : « aucune confirmation ajoutée, mais 135 mots → format non respecté ». Début de décision : « Pour cette tâche et ce test, je retiens l'assistant B, à condition de raccourcir le texte moi-même… » — Les autres lignes et la suite de la décision sont à produire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Quelle différence entre les deux sorties vous a le plus surpris ?`,
        `Qu'est-ce qui, dans les conditions d'accès ou les règles de votre structure, pèse plus que la qualité du texte ?`,
        `Pourquoi ce résultat ne permet-il pas de dire quel assistant est « le meilleur » ? Et que change le temps observé dans votre décision ?`,
      ],
      fallback: `Si deux assistants ne sont pas disponibles : comparer deux réponses d'exemple fournies par le formateur et clairement indiquées comme exemples (« Assistant A (exemple) », « Assistant B (exemple) »), sans nom d'outil réel, sans modèle ni vitesse fictifs. Le tableau, la décision et la note du temps sont remplis de la même manière ; indiquer « comparaison sur exemples » dans le dépôt.`,
      prompt_starter: `Rédige un courriel interne de 120 mots maximum à partir de cette fiche. Résume les faits, indique les informations à obtenir et les prochaines actions. N'invente aucune confirmation. Ton professionnel, phrases courtes, aucune donnée personnelle ajoutée. Contexte : courriel de préparation de mission dans une ETTI fictive, destiné à l'équipe d'agence ; « client » désigne l'entreprise utilisatrice.`,
      prompt_defaults: {
        context: `Je travaille dans une ETTI fictive (Agence Horizon). La fiche fournie est la fiche de mission R2, version V2 du 18/09/2026 (document fictif), pour une mission de préparation manuelle de commandes chez une entreprise utilisatrice fictive. Le courriel est destiné à l'équipe d'agence (responsable, assistant administratif chargé des contrats).`,
        task: `Rédige un courriel interne de préparation de mission à partir de cette fiche. Résume les faits, indique les informations à obtenir auprès de l'entreprise utilisatrice et les prochaines actions.`,
        data: `Texte intégral de R2 (collé ci-dessous ou en pièce jointe selon l'assistant). Aucune recherche web nécessaire.`,
        constraints: `120 mots maximum. N'invente aucune confirmation ni aucun montant. Aucune donnée personnelle ajoutée (pas de nom de salarié, pas de numéro). Ne présente pas la mission comme validée.`,
        format: `Courriel interne : objet, trois courts paragraphes (faits, à obtenir, prochaines actions), ton professionnel, phrases courtes.`,
        controls: `Je vérifierai chaque fait avec R2, je compterai les mots et je comparerai avec la sortie d'un second assistant.`,
      },
      levels: {
        guided: `Utilisez le prompt de départ tel quel dans les deux assistants et remplissez le gabarit de tableau ligne par ligne. Notez votre temps.`,
        autonomous: `Après la première comparaison, modifiez une seule contrainte du prompt (par exemple 80 mots, ou « destiné à l'assistant administratif qui prépare le contrat de mise à disposition ») et observez si l'écart entre les deux assistants change.`,
        bonus: `À partir du meilleur courriel corrigé, préparez en cinq lignes le point d'étape avec le prescripteur selon la fiche de liaison fictive R9 (état de la mission, actions, prochaine échéance), sans aucune donnée inutile, puis rédigez en deux phrases la règle que vous proposeriez à votre structure pour choisir un assistant sur une nouvelle tâche. Notez dans le champ prévu le temps ajouté : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['assistants'],
      production_kind: 'comparison',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE}`,
      job_context: {
        task: `Rédiger le courriel interne de préparation de mission à partir de la fiche de mission, pour l'équipe d'agence, avant la mise à disposition, et choisir avec quel assistant le faire.`,
        time_sinks: `Chaque mission donne lieu à un courriel interne écrit à la hâte entre deux appels ; on y glisse parfois une confirmation que l'entreprise utilisatrice n'a pas donnée, on oublie un point à obtenir, et l'assistant administratif doit rappeler pour compléter le contrat de mission ou de mise à disposition.`,
        delegable: `La première rédaction du courriel à partir de la fiche de mission, et la mise en forme en trois paragraphes.`,
        must_verify: `Chaque fait avec la fiche V2, l'absence de confirmation et de montant, l'absence de donnée personnelle, l'absence d'information venue du web, le nombre de mots, et le statut d'autorisation de l'assistant dans la structure.`,
        why_etti: `Le contrat de mission et le contrat de mise à disposition reposent sur des informations exactes de l'entreprise utilisatrice (horaires, poste, conduite d'engin, rémunération) : un courriel interne fiable évite une mise à disposition préparée sur des éléments non confirmés, et le choix d'un assistant doit respecter les règles de la structure sur les données.`,
      },
    },
    private_content: {
      answer_key: `## Courriel attendu (contenu, cas fictif Agence Horizon, ETTI)

- Objet : préparation de mission — préparation manuelle de commandes, Atelier Horizon Logistique (entreprise utilisatrice fictive).
- Faits : début souhaité le lundi 28/09/2026, à confirmer par l'entreprise utilisatrice ; présence indicative 9 h–17 h (fiche V2 du 18/09/2026) ; aucune conduite d'engin ; compétences utiles : consignes, contrôle des références, rangement, communication.
- À obtenir auprès de l'entreprise utilisatrice : adresse exacte du site ; horaires de la semaine suivante ; modalités de pauses ; rémunération ; confirmation de la mission et du volume.
- Prochaines actions : demandes à l'entreprise utilisatrice, préparation du contrat de mission et du contrat de mise à disposition une fois les éléments confirmés, point de suivi avec le salarié.
- Jamais : « mission confirmée », montant, nom du salarié, numéro, adresse supposée, taux « de la branche ».

## Deux réponses d'exemple annotées (à utiliser en secours, sans nom d'outil réel)

### Assistant A (exemple)
« Objet : préparation de mission. La mission de préparation de commandes chez Atelier Horizon Logistique est confirmée à partir du 28 septembre, de 9 h à 17 h. Rémunération au taux habituel de la branche. Le salarié a six mois d'expérience et se rendra sur site en bus. Reste à transmettre l'adresse. Point de suivi jeudi 24 à 10 h. »
Annotation : erreur majeure « confirmée » ; « taux habituel de la branche » est une information extérieure à R2 ; « de 9 h à 17 h » présenté comme fixe alors qu'indicatif ; l'expérience, le bus et le point de suivi ne figurent pas dans R2 (ils viennent de R1 ou de la mémoire de l'outil) ; les horaires de la semaine suivante et les pauses à obtenir sont absents. Court (environ 60 mots), facile à corriger mais à reprendre sur le fond.

### Assistant B (exemple)
« Objet : préparation de mission — Atelier Horizon Logistique (entreprise utilisatrice fictive). Faits : mission envisagée de préparation manuelle de commandes, début souhaité 28/09/2026 à confirmer par l'entreprise utilisatrice, présence indicative 9 h–17 h (fiche V2 du 18/09/2026), aucune conduite d'engin. À obtenir : adresse exacte du site, horaires de la semaine suivante, modalités de pauses, volume, rémunération, confirmation de l'entreprise utilisatrice. Prochaines actions : demandes à l'entreprise utilisatrice, puis préparation des contrats une fois les éléments confirmés. Rien n'est validé à ce stade. »
Annotation : fidèle à R2, aucun fait inventé, points à obtenir complets ; proche de la limite de mots, phrases un peu denses ; à aérer.

## Décision type
« Pour cette tâche et ce test, l'exemple B est plus fiable ; A demande une correction de fond. La décision ne vaut que pour ce courriel et ces conditions (texte collé, recherche web désactivée). »

## Bonus : point d'étape prescripteur (R9)
Cinq lignes : mission envisagée et statut (non confirmée) ; actions de l'agence auprès de l'entreprise utilisatrice ; action du salarié ; prochaine échéance ; point à signaler. Aucune donnée inutile.

## Lecture du temps observé
Deux essais plus la vérification : le temps noté sert à comparer les deux assistants sur cette tâche, pas à annoncer un gain.`,
      trainer_notes: `## Animation
- Démonstration (5 min) : montrer la même saisie dans deux assistants, côte à côte, sans commenter la qualité ; montrer où activer ou désactiver la recherche web et où joindre un fichier. Lancer le chronomètre visible.
- Vérifier en amont quels assistants sont réellement autorisés ; si un seul l'est, basculer sur la comparaison d'exemples (ne pas inventer un second outil).

## Pièges fréquents
- Conclusions universelles (« X est meilleur ») : rappeler que le résultat vaut pour cette tâche et ce test.
- Prompts légèrement différents entre les deux assistants : exiger le copier-coller.
- Informations de R1 (bus, expérience, point de suivi) qui réapparaissent dans le courriel : elles ne sont pas dans R2 ; les relever comme ajouts.
- Vitesse ou modèle fictifs dans les exemples de secours : ne jamais en afficher.

## Rythmes différents
- Rapides : variante de contrainte (niveau autonome) ou bonus (point d'étape R9 et règle de choix).
- Lents : remplir d'abord les lignes fidélité, erreurs et règles de la structure ; les autres critères en débrief.`,
    },
  },

  {
    code: 'DI',
    title: `Défi individuel transversal`,
    seance: 2,
    position: 10,
    duration_min: 45,
    breakdown: [
      { label: 'Briefing', minutes: 5 },
      { label: 'Réalisation', minutes: 30 },
      { label: 'Vérification', minutes: 10 },
    ],
    content: {
      objective: `À la fin du défi, chaque participant a adapté seul un livrable des ateliers précédents à une variante ETTI du cas fictif qui lui a été attribuée (changement d'horaire, confirmation manquante, demande de langage simple, rémunération communiquée, point d'étape prescripteur, avancement de la date de début avec formation au poste), en citant les éléments utilisés, en expliquant deux contrôles effectués et en notant le temps réellement passé.`,
      brief: `Vous travaillez seul. Le formateur vous attribue une variante du cas fictif Agence Horizon (ETTI fictive) : un élément du cas change, comme cela arrive chaque semaine en agence (l'entreprise utilisatrice modifie un horaire, ne confirme toujours pas, avance la date de début ; le salarié demande un message plus simple ; le prescripteur demande un point d'étape ; la rémunération arrive mais le trajet n'est pas vérifié). Choisissez un livrable des ateliers précédents (compte rendu de suivi, FAQ de mission, fiche de visite, schéma d'accueil, affiche ou courriel de préparation de mission) et adaptez-le à cette variante avec l'outil autorisé de votre choix, ou sans outil. Votre dépôt précise, dans l'ordre : l'usage choisi, l'outil, le prompt exact, le résultat initial de l'outil, l'erreur ou le risque détecté, la correction apportée, le résultat final. Citez les éléments du cas fictif que vous avez utilisés (quel document, quelle version) et expliquez deux contrôles que vous avez effectués. Chronométrez la réalisation, vérification et corrections comprises, et notez le temps dans le champ prévu par l'application : c'est une mesure de cette adaptation, pas une promesse. Ce défi est formatif : il mesure votre compétence sur la tâche que vous avez choisie ; il ne prouve pas la maîtrise des six familles d'usages.`,
      resource_codes: ['R1', 'R2', 'R3', 'R4', 'R6', 'R9'],
      steps: [
        `Lire sa variante et noter en une phrase ce qui change par rapport au cas de base, et qui l'a annoncé (entreprise utilisatrice, salarié, prescripteur) ; démarrer le chronomètre.`,
        `Choisir le livrable à adapter et le document fictif de référence (avec sa version).`,
        `Rédiger le prompt (ou travailler sans outil) en intégrant le changement, sans rien inventer d'autre.`,
        `Copier le résultat initial de l'outil tel quel.`,
        `Repérer au moins une erreur ou un risque dans ce résultat (invention, confirmation, donnée ajoutée, étape modifiée, décision prise à la place de la structure ou de l'entreprise utilisatrice).`,
        `Corriger et produire le résultat final.`,
        `Décrire deux contrôles effectués (par exemple : comparaison des dates avec R2 ; vérification qu'aucune confirmation n'est annoncée ; relecture du point d'étape avec R9).`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer l'ensemble : usage, outil, prompt, résultat initial, erreur ou risque, correction, résultat final, éléments utilisés.`,
      ],
      deliverable: `Un livrable adapté à la variante + une fiche de parcours : usage choisi, outil, prompt exact, résultat initial, erreur ou risque détecté, correction, résultat final, éléments du cas utilisés (document et version), deux contrôles expliqués + le temps observé (réalisation + vérification + corrections) dans le champ prévu par l'application, mesure de cette tâche et non promesse générale.`,
      success_criteria: [
        `Le changement de la variante est correctement intégré au livrable, et rien d'autre n'a été modifié ou inventé.`,
        `Les éléments du cas fictif utilisés sont cités avec leur document et leur version.`,
        `Deux contrôles effectués sont expliqués concrètement.`,
        `Le résultat initial et le résultat final sont tous deux fournis, et la correction est visible.`,
        `Le livrable reste fidèle aux règles des ateliers : aucune confirmation, aucun montant non fourni, aucune donnée personnelle ajoutée, aucune décision prise à la place de la structure ou de l'entreprise utilisatrice ; le temps observé est renseigné.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Un seul changement, tout le reste est inchangé`,
          text: `La variante change un élément et un seul. Avant de lancer l'outil, écrivez ce qui change et ce qui reste identique : c'est votre liste de contrôle. L'erreur la plus fréquente est que l'outil « profite » du changement pour reformuler ou compléter d'autres parties du livrable, par exemple passer la mission en « confirmée » parce que la rémunération est arrivée. Comparez ligne par ligne avec votre livrable d'origine.`,
        },
        {
          level: 'trame',
          title: `Gabarit de fiche de parcours`,
          text: `Variante reçue : [...]. Annoncée par : [entreprise utilisatrice / salarié / prescripteur]. Ce qui change : [...]. Ce qui ne change pas : [...]. Usage choisi : [compte rendu / FAQ / fiche de visite / schéma / affiche / courriel]. Outil : [nom ou « sans outil »]. Prompt exact : « ... ». Résultat initial : [copie]. Erreur ou risque détecté : [...]. Correction : [...]. Résultat final : [...]. Éléments du cas utilisés : [R2 V2 du 18/09/2026, R9, ...]. Contrôle 1 : [...]. Contrôle 2 : [...]. Temps observé : [noté dans le champ prévu].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (variante horaire)`,
          text: `« Ce qui change : l'entreprise utilisatrice attend désormais une présence à 8 h 30 au lieu de 9 h. Ce qui ne change pas : la disponibilité du 28/09, la rémunération non communiquée, la mission non confirmée. Erreur détectée : l'outil a écrit que le bus de 8 h 45 convenait encore ; or avec un début à 8 h 30, le trajet doit être revérifié. Correction : ajout d'une action “revérifier le bus” attribuée au salarié en parcours, échéance 24/09, et mention au prescripteur si la mobilité devient un frein. » — La suite de la fiche est à produire par le participant.`,
        },
      ],
      debrief_questions: [
        `Quelle erreur ou quel risque avez-vous détecté, et comment ?`,
        `Si vous aviez eu une autre variante (par exemple celle du prescripteur ou celle de la formation au poste), votre livrable d'origine aurait-il résisté ?`,
      ],
      fallback: `Sans outil IA : adapter le livrable à la main à partir du document de référence et remplir la même fiche de parcours (le résultat initial est alors la première version manuscrite, et la correction, votre relecture). Noter le temps de la même manière.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Cas fictif Agence Horizon (ETTI). Je reprends un livrable produit en atelier et j'intègre un changement précis annoncé par [entreprise utilisatrice / salarié / prescripteur] : [le changement de ma variante].`,
        task: `Adapte le livrable fourni à ce changement, sans modifier le reste.`,
        data: `Mon livrable d'origine et le document fictif de référence : [R… version …].`,
        constraints: `N'invente ni confirmation, ni montant, ni donnée personnelle. Ne prends aucune décision à la place de la structure ou de l'entreprise utilisatrice. Ne modifie que ce qui dépend du changement.`,
        format: `Même format que le livrable d'origine.`,
        controls: `Signale tout élément que tu as dû modifier en dehors du changement demandé. Je comparerai ligne par ligne avec l'original.`,
      },
      levels: {
        guided: `Choisissez le livrable de l'atelier 1 ou de l'atelier 6 (texte court) et suivez le gabarit de fiche de parcours. Notez votre temps.`,
        autonomous: `Choisissez n'importe quel livrable, y compris le schéma ou l'affiche, et justifiez en deux phrases pourquoi ce livrable est le plus touché par la variante.`,
        bonus: `Indiquez quel second livrable serait aussi affecté par votre variante (par exemple la fiche de liaison R9 ou la fiche salarié) et ce qu'il faudrait y changer, sans le produire. Notez dans le champ prévu si cela a ajouté du temps : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'individual',
      families: ['transcription', 'documents', 'recherche', 'schemas', 'images', 'assistants'],
      production_kind: 'individual_challenge',
      time_tracking: true,
      variants: [
        {
          id: 'v1',
          title: `L'horaire change`,
          change: `L'entreprise utilisatrice fait savoir, le 23/09/2026 (information fictive), que la présence attendue passe de 9 h à 8 h 30. Le bus de 8 h 45 ne convient donc plus : le salarié en parcours doit revérifier le trajet et l'arrêt.`,
          deliverable_hint: `Compte rendu ou courriel mis à jour : nouvel horaire, action « revérifier le bus » attribuée au salarié avec échéance, tout le reste inchangé (rémunération non communiquée, mission non confirmée) ; si la mobilité devient un frein, point à signaler au prescripteur sans détail inutile.`,
        },
        {
          id: 'v2',
          title: `La confirmation de l'entreprise utilisatrice manque toujours`,
          change: `Le point de suivi du jeudi 24/09 a lieu, mais l'entreprise utilisatrice n'a toujours pas confirmé la mission ni les horaires de la semaine suivante.`,
          deliverable_hint: `Compte rendu du point de suivi ou courriel interne : mission toujours non confirmée, actions reconduites avec une nouvelle échéance, aucune formulation qui laisse croire à une validation ; aucun contrat de mission ni de mise à disposition n'est préparé.`,
        },
        {
          id: 'v3',
          title: `Le salarié demande un langage plus simple`,
          change: `Le salarié en parcours demande à recevoir les informations de préparation dans un langage plus simple, en phrases courtes, sans termes d'agence (« mise à disposition », « entreprise utilisatrice », sigles).`,
          deliverable_hint: `Version simplifiée du message de suivi, de la FAQ ou de l'affiche : phrases courtes, un fait par phrase, mêmes informations, aucune information ajoutée ni supprimée (les inconnues restent des inconnues) ; sans revendiquer le label FALC.`,
        },
        {
          id: 'v4',
          title: `La rémunération est communiquée, le trajet pas vérifié`,
          change: `L'entreprise utilisatrice a communiqué la rémunération (le montant figure dans la note fictive remise avec votre variante ; ne l'inventez pas s'il n'y est pas). En revanche, le trajet n'a toujours pas été vérifié par le salarié en parcours.`,
          deliverable_hint: `Compte rendu ou FAQ mis à jour : la rémunération n'est plus « information non disponible » (uniquement si le montant est fourni, et sans le rattacher à une personne nommée), le trajet reste « à vérifier » avec un responsable et une nouvelle échéance ; la mission n'est pas confirmée pour autant.`,
        },
        {
          id: 'v5',
          title: `Le prescripteur demande un point d'étape de cinq lignes`,
          change: `Le prescripteur (France Travail fictif) demande, pour le 25/09/2026, un point d'étape de cinq lignes sur la situation du salarié en parcours, selon la fiche de liaison fictive R9.`,
          deliverable_hint: `Point d'étape de cinq lignes à partir du compte rendu ou du courriel : état de la mission (non confirmée), actions en cours et responsables, prochaine échéance, frein éventuel à signaler ; aucune donnée inutile (pas d'horaire de bus, pas d'appréciation, pas de santé, pas de montant).`,
        },
        {
          id: 'v6',
          title: `L'entreprise utilisatrice avance la date de début et prévoit une formation au poste`,
          change: `L'entreprise utilisatrice souhaite avancer le début au jeudi 24/09/2026 et indique qu'une formation au poste d'une demi-journée sera assurée sur site le premier jour ; les horaires de la semaine suivante restent inconnus et rien n'est confirmé par écrit.`,
          deliverable_hint: `Compte rendu, courriel ou schéma mis à jour : la nouvelle date est signalée comme une demande de l'entreprise utilisatrice à faire valider par le permanent responsable (étape 4 de R4) et à vérifier avec la disponibilité du salarié (28/09 dans R1) ; la formation au poste est notée comme relevant de l'entreprise utilisatrice ; aucune décision n'est prise à la place de la structure, aucune date n'est annoncée au salarié comme acquise.`,
        },
      ],
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE}`,
      job_context: {
        task: `Mettre à jour un écrit existant (compte rendu, courriel, FAQ, point d'étape, schéma, affiche) quand un élément de la mission change, comme cela arrive chaque semaine en agence.`,
        time_sinks: `Un changement d'horaire ou de date annoncé par l'entreprise utilisatrice oblige à reprendre plusieurs écrits (compte rendu, courriel interne, message au salarié, point prescripteur) ; on en oublie un, ou on réécrit tout et on introduit une erreur dans ce qui n'avait pas changé.`,
        delegable: `L'adaptation du texte au changement annoncé, à partir du livrable d'origine et du document de référence.`,
        must_verify: `Que seul l'élément annoncé a changé ; que la mission n'est pas passée « confirmée » au passage ; que les dates sont cohérentes avec R1 et R2 ; qu'aucune décision n'est prise à la place du permanent responsable ou de l'entreprise utilisatrice ; que le point d'étape prescripteur ne contient aucune donnée inutile.`,
        why_etti: `Les missions en ETTI sont courtes et changent souvent ; la traçabilité des actions (qui fait quoi, pour quand) et la fiabilité des informations transmises au salarié, à l'entreprise utilisatrice et au prescripteur comptent plus que la vitesse de réécriture.`,
      },
    },
    private_content: {
      answer_key: `## Attendu par variante (cas fictif Agence Horizon, ETTI)

### v1 — L'horaire change (9 h → 8 h 30, annoncé par l'entreprise utilisatrice)
- Changement intégré : présence à 8 h 30.
- Action attendue : revérifier le bus et l'arrêt → salarié en parcours → échéance avant le 28/09 (ou 24/09 si le point de suivi est conservé).
- Piège : laisser « bus de 8 h 45 » sans commentaire ; inventer un nouvel horaire de bus ; passer la mission en « confirmée » parce que l'entreprise a écrit.

### v2 — La confirmation de l'entreprise utilisatrice manque toujours
- Changement intégré : au 24/09, mission et horaires non confirmés.
- Attendu : actions reconduites avec nouvelle échéance, formulation « en attente de confirmation », aucun contrat préparé.
- Piège : « la mission devrait être confirmée sous peu » (supposition).

### v3 — Langage plus simple (demandé par le salarié)
- Attendu : mêmes informations, phrases courtes, un fait par phrase, vocabulaire courant (« l'entreprise où vous irez » plutôt que « entreprise utilisatrice »).
- Piège : simplifier en supprimant les inconnues (« votre mission commence le 28 ») ; revendiquer le label FALC.

### v4 — Rémunération communiquée, trajet non vérifié
- Attendu : rémunération renseignée uniquement avec la valeur fournie par le formateur dans la note fictive, sans la rattacher à une personne nommée ; trajet toujours « à vérifier » avec responsable et échéance ; mission toujours non confirmée.
- Piège : inventer un montant si la note ne le donne pas ; passer le trajet en « vérifié » ou la mission en « confirmée » par contagion.

### v5 — Point d'étape prescripteur en cinq lignes (R9)
- Attendu : état de la mission (non confirmée), actions en cours avec responsables, prochaine échéance, frein éventuel (mobilité à suivre), rien d'autre.
- Piège : recopier le compte rendu entier ; ajouter un horaire de bus, une appréciation (« motivé »), une mention de santé, un montant ; écrire au nom du prescripteur.

### v6 — Date avancée au 24/09 et formation au poste
- Attendu : demande de l'entreprise utilisatrice signalée comme à faire valider par le permanent responsable (R4, étape 4) et à confronter à la disponibilité du salarié (28/09 dans R1) ; formation au poste notée comme assurée par l'entreprise utilisatrice (responsable des conditions d'exécution) ; aucune date annoncée au salarié comme acquise.
- Piège : écrire « début avancé au 24/09 » comme un fait ; supposer que le salarié est disponible ; transformer la formation au poste en obligation de l'agence ; préparer le contrat.

## Deux contrôles acceptables (exemples)
- Comparaison ligne par ligne avec le livrable d'origine.
- Vérification des dates avec R1 et R2 V2.
- Recherche des mots « confirmé », « validé », « environ », « acquis » dans le résultat.
- Relecture du point d'étape avec la liste « données inutiles » de R9.
- Relecture par un autre participant.

## Rappel
Le défi est formatif : il atteste une compétence sur la tâche choisie, pas la maîtrise des six familles. Le temps noté vaut pour cette adaptation.`,
      trainer_notes: `## Animation
- Briefing (5 min) : distribuer les variantes (une par participant, répartir les six de façon équilibrée). Pour la variante v4, remettre la note fictive avec le montant, ou indiquer explicitement qu'aucun montant n'est fourni. Pour v5, rappeler que R9 est disponible. Lancer le chronomètre visible.
- Rappeler que le participant choisit son livrable : ne pas imposer.

## Pièges fréquents
- Participants qui refont tout le livrable : rappeler « un seul changement ».
- Résultat initial non conservé : exiger la copie brute avant correction.
- Contrôles vagues (« j'ai relu ») : demander ce qui a été comparé avec quoi.
- Variante v6 : participants qui « décident » d'avancer la date ; rappeler que seul le permanent responsable valide, après vérification auprès du salarié.

## Rythmes différents
- Rapides : bonus (second livrable affecté) ou relecture croisée d'un autre participant.
- Lents : livrable court (courriel de l'atelier 6 ou point d'étape v5) et un seul contrôle détaillé, le second en débrief.

## Vérification (10 min)
Faire lire la fiche de parcours par un voisin qui vérifie la présence des sept rubriques, des deux contrôles et du temps noté.`,
    },
  },

  {
    code: 'BIL',
    title: `Portfolio, bilan et plan d'application à J+7`,
    seance: 2,
    position: 11,
    duration_min: 30,
    breakdown: [
      { label: 'Portfolio', minutes: 10 },
      { label: `Plan d'application`, minutes: 15 },
      { label: 'Retour', minutes: 5 },
    ],
    content: {
      objective: `À la fin de la séquence, chaque participant a sélectionné ses productions à conserver, retenu deux ou trois outils adaptés à son poste en ETTI et aux règles de sa structure, et rédigé un plan d'application pour un usage à essayer dans la semaine qui suit, avec ses données utilisables, son contrôle humain, ses temps estimés et observés, et sa condition d'arrêt.`,
      brief: `Seul, en trois temps. Portfolio (10 minutes) : parcourez vos dépôts des deux séances (compte rendu de suivi, FAQ de mission, fiche de visite, schéma d'accueil, affiche, courriel de préparation de mission, défi) et sélectionnez ceux que vous souhaitez conserver comme modèles pour votre agence ; notez pour chacun ce qui le rend réutilisable. Choisissez ensuite deux ou trois outils que vous retenez pour votre poste, en tenant compte des règles de votre structure (autorisé, à valider par qui, non autorisé). Plan d'application (15 minutes) : choisissez un usage à essayer la semaine suivante, de préférence lié à la tâche prioritaire formulée à l'accueil (compte rendu de suivi, point d'étape prescripteur, courriel à l'entreprise utilisatrice, réponse aux questions récurrentes, préparation de visite, schéma d'accueil, reporting de parcours), et remplissez le plan : tâche, fréquence, outil autorisé, données utilisables (selon les règles de la structure ; aucune donnée réelle de salarié, d'entreprise utilisatrice ou de prescripteur sans validation), contrôle humain, temps habituel estimé, temps observé si vous l'avez déjà testé (reprenez vos temps notés en atelier, en rappelant qu'ils portent sur un cas fictif), bénéfice attendu, condition d'arrêt. Distinguez bien ce qui est mesuré de ce qui est estimé : un temps que vous n'avez pas chronométré est une estimation, et un temps chronométré en atelier n'est pas un temps au poste. La formation ne promet aucun gain ; c'est votre test de la semaine qui dira si l'usage tient. Retour (5 minutes) : tour de table rapide sur l'usage choisi par chacun.`,
      resource_codes: ['R7', 'R10'],
      steps: [
        `Relire ses dépôts des deux séances et cocher ceux à conserver comme modèles pour l'agence.`,
        `Noter en une phrase, pour chaque production conservée, ce qui la rend réutilisable au poste.`,
        `Choisir deux ou trois outils retenus pour son poste, en vérifiant leur statut d'autorisation dans sa structure et qui peut le valider.`,
        `Choisir un usage à essayer la semaine suivante, lié si possible à sa tâche prioritaire ETTI.`,
        `Remplir le plan d'application : tâche, fréquence, outil autorisé, données utilisables (règles de la structure, aucune donnée réelle sans validation), contrôle humain.`,
        `Indiquer le temps habituel estimé et, séparément, le temps observé si un test a déjà eu lieu (temps d'atelier sur cas fictif ou test au poste) ; sinon, laisser « non testé ».`,
        `Formuler le bénéfice attendu (sans chiffre promis) et la condition d'arrêt (ce qui vous ferait cesser cet usage).`,
        `Partager son usage choisi au tour de table.`,
      ],
      deliverable: `Un portfolio (productions sélectionnées avec une phrase de justification), une liste de deux ou trois outils retenus avec leur statut dans la structure, et un plan d'application rempli pour un usage à essayer la semaine suivante, où les gains mesurés sont distingués des gains estimés.`,
      success_criteria: [
        `Au moins une production est sélectionnée avec une justification précise liée au poste.`,
        `Deux ou trois outils sont retenus, avec leur statut d'autorisation dans la structure (autorisé, à valider par …, non autorisé).`,
        `Le plan précise les données utilisables selon les règles de la structure et exclut explicitement toute donnée réelle de salarié, d'entreprise utilisatrice ou de prescripteur non validée.`,
        `Le contrôle humain est décrit concrètement (qui vérifie quoi, avant quelle action : enregistrement dans la fiche salarié, envoi à l'entreprise utilisatrice, transmission au prescripteur).`,
        `Le temps habituel est marqué « estimé » et le temps observé est renseigné uniquement s'il a été réellement mesuré, en précisant s'il vient d'un atelier sur cas fictif ou d'un test au poste.`,
        `Une condition d'arrêt est formulée.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Choisir un usage petit et fréquent`,
          text: `Le meilleur usage à tester n'est pas le plus impressionnant, c'est celui que vous ferez vraiment la semaine prochaine : une tâche courte, qui revient plusieurs fois (un compte rendu de suivi, un courriel de préparation de mission), avec des données que vous avez le droit d'utiliser et un contrôle que vous pouvez faire en quelques minutes. Si vous hésitez entre deux usages, prenez celui dont vous pouvez chronométrer le résultat, vérification comprise.`,
        },
        {
          level: 'trame',
          title: `Gabarit de plan d'application`,
          text: `Tâche : [...]. Fréquence : [...]. Outil autorisé : [nom, statut dans ma structure, qui valide]. Données utilisables : [documents internes validés / informations publiques / notes sans aucune donnée identifiante ; jamais de nom de salarié, de PASS IAE, de santé, de montant individuel, d'extrait de la plateforme sans validation]. Contrôle humain : [qui vérifie quoi, avant quelle action : enregistrement, envoi à l'entreprise utilisatrice, transmission au prescripteur]. Temps habituel : [estimé : … minutes]. Temps observé : [non testé / mesuré en atelier sur cas fictif le … : … minutes / mesuré au poste le … : … minutes]. Bénéfice attendu : [moins d'allers-retours / première version plus complète / point d'étape prêt plus tôt, sans chiffre promis]. Condition d'arrêt : [si l'outil invente une confirmation ou un montant, si la vérification prend plus de temps que la rédaction, si la structure change ses règles, si un salarié s'y oppose, …].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple de plan`,
          text: `« Tâche : première version du compte rendu après un entretien de suivi en mission, pour préparer le point d'étape prescripteur. Fréquence : trois fois par semaine. Outil : l'assistant autorisé par ma structure (statut : autorisé pour les documents sans données personnelles, validé par la direction). Données utilisables : mes notes d'entretien sans nom, sans coordonnées, sans mention de santé ni de PASS IAE. Contrôle humain : je vérifie chaque date, chaque responsable et chaque mention de confirmation de l'entreprise utilisatrice avant d'enregistrer dans la fiche salarié. Temps habituel : estimé. Temps observé : mesuré en atelier 1 sur cas fictif, vérification comprise ; non testé au poste. Bénéfice attendu : un tableau d'actions complet dès la première version. Condition d'arrêt : si je trouve une invention dans deux comptes rendus de suite, j'arrête et j'en parle à mon responsable d'agence. »`,
        },
      ],
      debrief_questions: [
        `Quel usage allez-vous essayer la semaine prochaine, et quel est votre contrôle humain avant l'envoi au salarié, à l'entreprise utilisatrice ou au prescripteur ?`,
        `Qu'est-ce qui vous ferait arrêter cet usage ?`,
        `Qu'est-ce qui vous manque encore dans votre structure pour tester en confiance (autorisation, fiche de mission à jour, référent données, règle sur la plateforme) ?`,
      ],
      fallback: `Sans application : plan d'application rempli sur le modèle papier, conservé par le participant ; le formateur peut proposer un rappel à J+7 par le canal habituel de la structure, sans collecte de donnée supplémentaire.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Séquence de bilan sans outil IA.`,
        task: `Choisir un usage à essayer la semaine suivante dans mon agence et remplir son plan d'application.`,
        data: `Mes productions des deux séances, mes temps notés en atelier et ma tâche prioritaire de l'accueil ; aucune donnée réelle.`,
        constraints: `Aucun gain chiffré promis ; distinguer temps mesuré et temps estimé, atelier et poste.`,
        format: `Plan en neuf rubriques.`,
        controls: `Vérifier que les données utilisables respectent les règles de la structure et excluent les données réelles non validées, et qu'un contrôle humain est décrit avant chaque envoi.`,
      },
      levels: {
        guided: `Suivez le gabarit de plan rubrique par rubrique, en partant de votre tâche prioritaire de l'accueil et de vos temps notés en atelier.`,
        autonomous: `Remplissez le plan pour deux usages, puis choisissez celui que vous testerez en premier et expliquez pourquoi.`,
        bonus: `Rédigez en trois lignes ce que vous direz à votre responsable d'agence pour présenter ce test de la semaine : la tâche, le contrôle humain, et le fait que le temps sera mesuré au poste avant toute conclusion. Non évalué.`,
      },
      work_mode: 'individual',
      families: [],
      production_kind: 'review',
      deposit_notice: DEPOSIT_NOTICE,
      job_context: {
        task: `Décider quel usage tester la semaine suivante sur une tâche de son poste en ETTI, avec quel outil autorisé, quelles données, quel contrôle et quelle mesure du temps.`,
        time_sinks: `Sans plan, le test de la semaine n'a pas lieu : la charge des missions reprend, ou l'on essaie un outil sur un vrai dossier sans règle ni mesure, et l'on ne sait pas si cela a aidé.`,
        delegable: `Rien dans cette séquence : le plan se fait sans outil.`,
        must_verify: `Le statut de l'outil dans la structure, les données réellement utilisables, le contrôle humain avant chaque envoi, et la distinction entre temps estimé, temps mesuré en atelier et temps mesuré au poste.`,
        why_etti: `Le temps libéré sur un écrit ne compte que s'il revient à l'accompagnement du salarié, à la relation avec l'entreprise utilisatrice ou au lien avec le prescripteur, et seulement si la fiabilité n'a pas baissé : c'est le test au poste, mesuré sur plusieurs semaines, qui le dira.`,
      },
    },
    private_content: {
      answer_key: `## Attendu

Pas de corrigé unique. Un plan est satisfaisant quand :
- l'usage est petit, fréquent et lié à une tâche réelle du poste en ETTI ;
- l'outil retenu a un statut d'autorisation connu dans la structure et un valideur identifié ;
- les données utilisables sont décrites selon les règles de la structure et excluent les données réelles non validées (salarié, entreprise utilisatrice, prescripteur, plateforme) ;
- le contrôle humain est concret (qui, quoi, avant quelle action : fiche salarié, envoi à l'entreprise utilisatrice, transmission au prescripteur) ;
- temps mesuré et temps estimé sont distingués, et le temps d'atelier sur cas fictif est distingué du temps au poste ;
- une condition d'arrêt existe.

## Formulations à corriger
- « Gagner beaucoup de temps » → « réduire les allers-retours sur la première version ; à mesurer la semaine prochaine, vérification comprise ».
- « L'outil fait le compte rendu » → « l'outil propose une première version, je vérifie les dates, les responsables et les confirmations de l'entreprise utilisatrice ».
- « Temps observé : 5 minutes » sans test → « non testé » ; « temps observé en atelier » → préciser « sur cas fictif, pas au poste ».
- « Je mettrai mes notes d'entretien » → « mes notes sans nom, sans coordonnées, sans santé, sans PASS IAE, si ma structure l'autorise ».

## Outils retenus
Deux ou trois, avec statut : autorisé / à valider / non autorisé. Un outil « à valider » peut être retenu à condition que le plan précise qui doit le valider (responsable d'agence, direction, référent données).`,
      trainer_notes: `## Animation
- Tenir les trois temps : 10 / 15 / 5. Le tour de table est volontairement court : une phrase par personne (usage + contrôle).
- Rappeler qu'aucun gain n'est promis : les temps notés en atelier sont des mesures sur un cas fictif ; c'est le test de la semaine, au poste, qui donnera une mesure utile.
- Renvoyer au lexique R10 pour les termes du plan (prescripteur, entreprise utilisatrice, PASS IAE) si des participants viennent d'ETT ou d'EATT.

## Pièges fréquents
- Plans ambitieux (trois usages, un nouvel outil non autorisé) : ramener à un usage, un outil autorisé.
- Temps observé rempli sans mesure, ou temps d'atelier présenté comme temps au poste : demander « quand l'avez-vous chronométré, et sur quoi ? ».
- Données « utilisables » qui incluent des vrais dossiers ou des exports de la plateforme : rappeler la règle de la structure et la validation nécessaire.
- Condition d'arrêt absente : proposer « si l'outil invente une confirmation d'entreprise utilisatrice ou un montant ».

## Rythmes différents
- Rapides : second usage (niveau autonome) ou message au responsable d'agence (bonus).
- Lents : portfolio limité à une production, plan rempli avec le gabarit.

## Suite
Si la structure le prévoit, un rappel à J+7 peut être envoyé par le canal habituel pour demander si le test a eu lieu, ce qui a été observé (temps, vérification, erreurs) et ce qui a été décidé, sans donnée réelle.`,
    },
  },
];

export const TOTAL_MINUTES = WORKSHOPS.reduce((s, w) => s + w.duration_min, 0);

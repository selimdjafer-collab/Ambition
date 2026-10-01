/**
 * Contenu éditorial du programme « Créer sa boîte à outils IA pour agir au
 * quotidien en ETT / ETTI / EATT ».
 *
 * Ce fichier ne contient que des littéraux : il sert de source pour le
 * générateur de seed et pour le mode démo local. Tout le cas pratique est
 * fictif (« Agence Horizon — cas pédagogique fictif ») ; aucune donnée réelle
 * n'y figure et aucune ne doit y être ajoutée.
 */

import type { BreakdownItem, Rubric, WorkshopContent, WorkshopPrivateContent } from '../lib/types';

export const PROGRAM_META = {
  slug: 'boite-a-outils-ia-ett',
  title: `Créer sa boîte à outils IA pour agir au quotidien en ETT / ETTI / EATT`,
  description: `Formation de deux séances (7 heures au total) destinée aux équipes des entreprises de travail temporaire, d'insertion et adaptées. À partir d'un cas fictif unique (Agence Horizon), chaque participant teste six familles d'usages de l'IA sur des tâches proches de son poste : compte rendu d'entretien, questions à ses documents, préparation de visite, schéma de procédure, support visuel, comparaison d'assistants. À chaque étape, la règle est la même : l'outil propose, la personne vérifie, décide et reste responsable du résultat. La formation se termine par un plan d'application personnel à tester dans la semaine qui suit.`,
  prerequisites: `Savoir utiliser un ordinateur, un navigateur et une messagerie. Disposer d'un accès aux outils autorisés par sa structure (ou utiliser les solutions de secours prévues). Aucune connaissance technique préalable n'est demandée.`,
  audience: `Chargés de recrutement, conseillers en insertion, assistants d'agence, chargés de relation entreprise, responsables d'agence et permanents d'ETT, ETTI et EATT.`,
  editorial_reference: 'Septembre 2026',
  verification_date: '2026-10-01',
};

export const PROGRAM_OBJECTIVES: string[] = [
  `Transformer une transcription fictive d'entretien en compte rendu fidèle et en plan d'action, sans inventer de fait, de date ni de confirmation.`,
  `Répondre à des questions à partir de documents, retrouver les passages justificatifs et signaler les informations absentes ou contradictoires.`,
  `Préparer une visite d'entreprise à partir de sources consultées, datées et vérifiées, en séparant faits, hypothèses et questions.`,
  `Représenter un processus en schéma sans modifier ses étapes, son ordre ni ses conditions de validation.`,
  `Concevoir un support d'agence clair et inclusif en contrôlant le texte, les visuels et les droits d'usage.`,
  `Comparer deux assistants sur une même tâche et choisir deux ou trois outils adaptés à son poste et aux règles de sa structure.`,
  `Distinguer ce qu'on peut déléguer à l'IA de ce qu'on doit vérifier soi-même ou soumettre à une validation humaine.`,
];

export const RUBRIC: Rubric = {
  title: `Grille formative commune (sur 10)`,
  criteria: [
    {
      key: 'c1',
      label: `Fidélité aux sources`,
      description: `Le livrable ne contient aucune information inventée : chaque fait, date, montant ou confirmation vient d'un document fourni ou d'une page consultée. 0 : une information déterminante est inventée. 1 : fidèle avec une imprécision secondaire. 2 : entièrement fidèle, les inconnues sont nommées comme telles.`,
      max: 2,
    },
    {
      key: 'c2',
      label: `Respect des données`,
      description: `Seules les ressources fictives sont utilisées ; aucune donnée réelle (nom, coordonnées, numéro administratif, santé, salaire individuel) n'est transmise à un outil ni déposée. 0 : une donnée réelle a été transmise ou déposée. 1 : respect global avec une maladresse sans donnée réelle. 2 : respect complet et explicité.`,
      max: 2,
    },
    {
      key: 'c3',
      label: `Clarté et utilité du livrable`,
      description: `Le livrable est compréhensible par un collègue qui n'a pas suivi l'atelier, respecte le format demandé (longueur, tableau, rubriques) et répond à la consigne. 0 : illisible ou hors sujet. 1 : utilisable avec des retouches. 2 : directement réutilisable.`,
      max: 2,
    },
    {
      key: 'c4',
      label: `Contrôle humain documenté`,
      description: `La personne explique ce qu'elle a vérifié, ce qu'elle a corrigé et ce qui reste à faire valider. 0 : aucun contrôle décrit. 1 : un contrôle décrit. 2 : au moins deux contrôles décrits, avec les incertitudes signalées.`,
      max: 2,
    },
    {
      key: 'c5',
      label: `Choix et usage de l'outil`,
      description: `Le prompt est complet (contexte, tâche, données, contraintes, format, contrôles), l'outil utilisé est autorisé ou la solution de secours est assumée, et le choix est justifié. 0 : outil non autorisé ou prompt absent. 1 : prompt partiel ou justification faible. 2 : prompt complet et choix expliqué.`,
      max: 2,
    },
  ],
  pass_threshold: 7,
  min_on_criteria: [
    { key: 'c1', min: 1 },
    { key: 'c4', min: 1 },
  ],
  note: `Le seuil de 7/10 et les minimums sur « Fidélité aux sources » et « Contrôle humain documenté » sont un choix pédagogique de l'équipe de formation, modifiable par le formateur selon le groupe. Ils ne constituent pas une norme légale ni une certification. Quelle que soit la note, une divulgation de donnée réelle ou une information déterminante inventée (confirmation, montant, date, règle) empêche de déclarer le livrable « prêt à réutiliser » tant qu'elle n'est pas corrigée.`,
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

const DEPOSIT_NOTICE = `Rappel avant dépôt : utilisez uniquement les ressources fictives de la formation (Agence Horizon). Ne déposez jamais de dossier réel de candidat, de numéro administratif, de coordonnées personnelles ni de donnée de santé, même partiellement masqués.`;

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
      objective: `À la fin de cette séquence, chaque participant a formulé par écrit une tâche prioritaire de son poste sur laquelle il souhaite tester l'IA, ainsi que deux attentes concrètes pour la formation.`,
      brief: `Bienvenue. Pendant huit minutes, le formateur présente le déroulement des deux séances, le cas fictif « Agence Horizon » qui servira de fil conducteur, les règles de la formation (aucune donnée réelle, vérification humaine systématique) et la façon de déposer ses productions dans l'application. Pendant les douze minutes suivantes, vous remplissez seul votre positionnement : votre poste, votre aisance avec les outils numériques, votre expérience éventuelle des assistants IA, puis vous choisissez une tâche prioritaire de votre quotidien. Choisissez une tâche précise et répétée (par exemple « rédiger le compte rendu après un entretien de suivi ») plutôt qu'un domaine large (« le recrutement »). Cette tâche vous servira de repère tout au long de la formation et dans votre plan d'application final.`,
      resource_codes: ['R7'],
      steps: [
        `Écouter la présentation du déroulement et noter une question éventuelle pour le formateur.`,
        `Lire la règle des données : seules les ressources fictives sont utilisées, aucune donnée réelle n'est saisie dans un outil.`,
        `Indiquer son poste et son niveau d'aisance avec les outils numériques (de 1 à 4).`,
        `Indiquer si l'on a déjà utilisé un assistant IA, et pour quoi faire.`,
        `Formuler une tâche prioritaire de son poste en une phrase commençant par un verbe.`,
        `Écrire deux attentes concrètes pour la formation (ce que je veux savoir faire en partant).`,
        `Vérifier que la tâche choisie ne nécessite aucune donnée personnelle réelle pour être testée en formation.`,
      ],
      deliverable: `Une fiche de positionnement contenant : la tâche prioritaire formulée en une phrase, deux attentes, le niveau d'aisance et l'expérience éventuelle de l'IA.`,
      success_criteria: [
        `La tâche prioritaire est formulée en une phrase, avec un verbe d'action et un résultat attendu.`,
        `La tâche est répétée dans le poste (au moins une fois par semaine) et réalisable sans donnée réelle en formation.`,
        `Deux attentes concrètes sont écrites.`,
        `Le niveau d'aisance et l'expérience de l'IA sont renseignés.`,
        `Le participant a confirmé avoir compris la règle « ressources fictives uniquement ».`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Partir d'une tâche qui prend du temps et revient souvent`,
          text: `Pensez à votre semaine type : quelle tâche écrite revient le plus souvent et vous semble la plus répétitive ? Compte rendu, courriel de relance, réponse à une question sur une procédure, préparation d'une visite… Une bonne tâche prioritaire est une tâche que vous faites déjà, que vous pourriez décrire à un collègue en deux phrases et dont vous savez reconnaître un bon résultat.`,
        },
        {
          level: 'trame',
          title: `Gabarit de formulation`,
          text: `Ma tâche prioritaire : « [verbe d'action] + [objet] + [pour qui / dans quel but] ». Fréquence : [par jour / par semaine / par mois]. Ce qui me prend du temps aujourd'hui : [...]. Ce que je dois absolument contrôler moi-même : [...]. Attente 1 : « À la fin de la formation, je veux savoir [...] ». Attente 2 : « Je veux avoir décidé si [...] ».`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (cas fictif)`,
          text: `Tâche prioritaire : « Rédiger le compte rendu de suivi après chaque entretien avec une personne accompagnée, avec les actions à faire et qui les fait. » Fréquence : plusieurs fois par semaine. Ce que je dois contrôler moi-même : les dates, ce qui est confirmé ou non par le client. Attente 1 : savoir ce que je peux donner à un outil sans risque. Attente 2 : avoir un prompt que je peux réutiliser lundi.`,
        },
      ],
      debrief_questions: [
        `Quelle tâche revient le plus souvent dans le groupe ? Y a-t-il des tâches communes à plusieurs postes ?`,
        `Quelles tâches du groupe demandent une validation humaine avant tout envoi ?`,
      ],
      fallback: `Si l'application n'est pas accessible, la fiche de positionnement est remplie sur papier (modèle imprimé par le formateur) et recopiée plus tard, ou conservée par le participant.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Je travaille en agence d'emploi (ETT / ETTI / EATT) sur le poste de [poste].`,
        task: `Je cherche à décrire une tâche prioritaire de mon poste en une phrase claire.`,
        data: `Aucune donnée réelle : uniquement la description de ma tâche.`,
        constraints: `Pas de nom de personne, pas de donnée d'entreprise réelle.`,
        format: `Une phrase avec un verbe d'action, puis deux attentes.`,
        controls: `Je vérifie que la tâche est réalisable en formation avec des ressources fictives.`,
      },
      levels: {
        guided: `Suivez les sept étapes dans l'ordre et utilisez la trame fournie pour formuler votre tâche.`,
        autonomous: `Formulez directement votre tâche prioritaire et vos attentes, puis vérifiez-les avec les critères de réussite.`,
        bonus: `Notez une deuxième tâche de votre poste que vous ne confieriez jamais à un outil IA, et dites en une phrase pourquoi. Cette note n'est pas évaluée.`,
      },
      work_mode: 'individual',
      families: [],
      production_kind: 'text',
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Attendu

Il n'y a pas de bonne réponse unique. Une fiche est satisfaisante quand :

- la tâche est précise (verbe + objet + finalité), répétée, et testable sans donnée réelle ;
- les deux attentes sont concrètes (pas « découvrir l'IA ») ;
- le participant a compris la règle des ressources fictives.

## Exemples de tâches bien formulées

- « Rédiger le compte rendu de suivi après un entretien, avec le tableau des actions. »
- « Répondre aux questions des intérimaires sur la procédure d'accueil à partir de nos documents internes. »
- « Préparer une fiche de visite avant de rencontrer une entreprise cliente. »
- « Transformer une procédure interne en schéma lisible pour les nouveaux collègues. »

## Reformulations à proposer

- « Le recrutement » → « Rédiger l'annonce à partir d'une fiche de poste validée ».
- « Gagner du temps » → « Réduire les allers-retours sur les comptes rendus en les rendant plus complets dès la première version ».`,
      trainer_notes: `## Animation

- Tenir les 8 minutes d'instructions : le déroulement, le cas fictif Agence Horizon, la règle des données, le dépôt dans l'application. Montrer l'écran de dépôt une fois.
- Insister sur « ressources fictives uniquement » dès maintenant : c'est la règle la plus souvent oubliée en atelier 1.
- Annoncer que la tâche prioritaire sera reprise en séance 2 (défi individuel et plan d'application).

## Pièges fréquents

- Tâches trop larges (« le sourcing ») : demander « quelle est la première action écrite de cette tâche ? ».
- Attentes générales (« découvrir ») : demander ce que la personne veut avoir en main lundi matin.
- Participants qui veulent tester leurs vrais dossiers : rappeler que la formation sert à apprendre la méthode, pas à traiter les dossiers du jour.

## Rythmes différents

- Personnes rapides : leur proposer le bonus (une tâche à ne jamais déléguer).
- Personnes en difficulté : partir de leur journée d'hier et chercher une tâche écrite.`,
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
      objective: `À la fin du défi, chaque binôme a classé huit types d'informations en trois catégories (transmissible à un outil IA externe, à ne pas transmettre, transmissible selon conditions) et a justifié chaque choix en nommant l'autorisation, la finalité et la protection qui seraient nécessaires en situation réelle.`,
      brief: `En binôme, vous recevez huit cartes. Chacune décrit un type d'information que l'on rencontre en agence : une procédure publique, une fiche métier, un nom d'intérimaire, un numéro de téléphone, un numéro administratif, un renseignement de santé, un montant de salaire individuel, une description non identifiante d'une tâche. Pour chaque carte, décidez ensemble : peut-on la transmettre à un outil IA externe (c'est-à-dire un service en ligne hors de la structure) ? Trois réponses possibles : « transmissible », « à ne pas transmettre », « selon conditions ». Pour chaque carte, écrivez une justification d'une ou deux phrases. Pour les cartes « selon conditions », précisez quelle autorisation, quelle finalité et quelle protection seraient nécessaires en situation réelle. Attention : le fait de remplacer un nom par une initiale ne rend pas une information anonyme, et un consentement obtenu ne règle pas à lui seul toutes les questions. Vous avez quinze minutes ; le débrief suit immédiatement.`,
      resource_codes: ['R7'],
      steps: [
        `Lire les huit cartes et se répartir la lecture à voix haute dans le binôme.`,
        `Classer chaque carte dans l'une des trois colonnes : transmissible, à ne pas transmettre, selon conditions.`,
        `Écrire une justification courte pour chaque carte.`,
        `Pour chaque carte « selon conditions », préciser l'autorisation, la finalité et la protection nécessaires.`,
        `Repérer la carte sur laquelle le binôme a hésité le plus et noter pourquoi.`,
        `Vérifier qu'aucune justification ne repose sur « il suffit d'enlever le nom ».`,
      ],
      deliverable: `Le tri des huit cartes en trois catégories, avec une justification par carte et, pour les cartes conditionnelles, l'autorisation, la finalité et la protection attendues.`,
      success_criteria: [
        `Les huit cartes sont classées, aucune n'est laissée sans catégorie.`,
        `Chaque carte a une justification d'au moins une phrase.`,
        `Les cartes « selon conditions » nomment une autorisation, une finalité et une protection.`,
        `Le numéro administratif et le renseignement de santé ne sont pas classés « transmissible ».`,
        `Le binôme a identifié qu'un nom remplacé par une initiale ne suffit pas à anonymiser.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Poser trois questions à chaque carte`,
          text: `Pour chaque carte, demandez-vous : 1) Est-ce que cette information permet, seule ou combinée avec d'autres, de reconnaître une personne ? 2) Est-ce une information particulièrement sensible (santé, situation administrative, ressources) ? 3) Est-ce que l'outil en question est validé par ma structure et pour cet usage ? Si vous répondez « oui » à la première ou la deuxième question, la carte ne peut pas être « transmissible » sans conditions.`,
        },
        {
          level: 'trame',
          title: `Gabarit de justification`,
          text: `Carte [n°] – [libellé]. Catégorie : [transmissible / à ne pas transmettre / selon conditions]. Pourquoi : [cette information est publique / permet d'identifier une personne / est sensible / n'identifie personne]. Si « selon conditions » : autorisation nécessaire : [qui doit valider dans ma structure ?] ; finalité : [pour quoi faire précisément ?] ; protection : [outil validé par la structure, pas d'outil grand public, suppression après usage, pas de combinaison avec d'autres données].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple pour une carte`,
          text: `Carte « description non identifiante d'une tâche » : « préparation manuelle de commandes, six mois d'expérience, disponible fin septembre ». Catégorie : selon conditions. Pourquoi : prise seule, elle n'identifie personne ; mais combinée au nom de l'agence, à la date exacte et à l'entreprise, elle peut désigner une personne précise. Conditions : outil validé par la structure, aucun ajout de nom, d'adresse ni de date de naissance, usage limité à la rédaction d'un brouillon relu.`,
        },
      ],
      debrief_questions: [
        `Sur quelle carte les binômes ne sont-ils pas d'accord ? Qu'est-ce qui change la réponse ?`,
        `Pourquoi remplacer un nom par une initiale ne suffit-il pas ?`,
        `Dans votre structure, qui peut dire si un outil est autorisé pour un usage donné ?`,
      ],
      fallback: `Les huit cartes sont imprimées ; le tri se fait sur table avec trois zones et des post-it pour les justifications. Le formateur photographie ou recopie le résultat de chaque binôme pour le débrief.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Défi de tri sans outil IA : cet exercice se fait sans assistant.`,
        task: `Classer huit types d'information selon qu'on peut ou non les transmettre à un outil IA externe.`,
        data: `Les huit cartes fictives du défi, aucune donnée réelle.`,
        constraints: `Aucune donnée réelle, aucune carte laissée sans justification.`,
        format: `Trois colonnes, une justification par carte.`,
        controls: `Vérifier que les cartes identifiantes ou sensibles ne sont pas « transmissibles » sans conditions.`,
      },
      levels: {
        guided: `Utilisez les trois questions de l'indice pour chaque carte, puis remplissez le gabarit de justification.`,
        autonomous: `Classez les huit cartes, justifiez, puis préparez un argument pour défendre votre choix le plus discutable au débrief.`,
        bonus: `Ajoutez une neuvième carte issue de votre quotidien (sans donnée réelle) et classez-la. Ce bonus n'est pas évalué.`,
      },
      work_mode: 'pair',
      families: ['transcription', 'documents', 'assistants'],
      production_kind: 'data_sort',
      data_cards: [
        {
          id: 'c1',
          label: `Procédure publique`,
          detail: `Un extrait d'une procédure publiée sur un site institutionnel public (par exemple les étapes d'une démarche décrites sur Service-Public.fr). Aucune personne n'y est nommée.`,
        },
        {
          id: 'c2',
          label: `Fiche métier publique`,
          detail: `Une fiche métier « préparateur / préparatrice de commandes » issue d'un répertoire public : activités, compétences, conditions d'exercice. Pas de nom, pas d'entreprise.`,
        },
        {
          id: 'c3',
          label: `Nom d'intérimaire`,
          detail: `Le prénom et le nom d'une personne accompagnée par l'agence (dans le cas fictif : la personne reçue le 21/09/2026 par la conseillère). Même avec une initiale à la place du nom.`,
        },
        {
          id: 'c4',
          label: `Numéro de téléphone`,
          detail: `Le numéro de téléphone personnel d'une personne accompagnée, noté dans son dossier pour la joindre avant une mission.`,
        },
        {
          id: 'c5',
          label: `Numéro administratif`,
          detail: `Un numéro administratif individuel (de type numéro de sécurité sociale) figurant dans un dossier d'inscription.`,
        },
        {
          id: 'c6',
          label: `Renseignement de santé`,
          detail: `Une mention de santé notée lors d'un entretien (par exemple une restriction médicale au port de charges). Même sans le nom de la personne.`,
        },
        {
          id: 'c7',
          label: `Montant de salaire individuel`,
          detail: `Le salaire exact d'une personne précise sur une mission précise, tel qu'il apparaîtrait sur son contrat ou son bulletin.`,
        },
        {
          id: 'c8',
          label: `Description non identifiante d'une tâche`,
          detail: `« Préparation manuelle de commandes dans un entrepôt, six mois d'expérience, disponible fin septembre. » Sans nom, sans entreprise, sans date de naissance, sans adresse.`,
        },
      ],
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Corrigé indicatif (à discuter, pas à imposer)

- Procédure publique → transmissible. Information publique, sans personne identifiable. Vérifier tout de même que l'extrait est à jour et que l'outil est autorisé par la structure.
- Fiche métier publique → transmissible. Même raisonnement.
- Nom d'intérimaire → à ne pas transmettre à un outil externe. Remplacer le nom par une initiale ne suffit pas : l'agence, la date, la mission et le parcours permettent souvent de retrouver la personne.
- Numéro de téléphone → à ne pas transmettre. Donnée de contact directe, aucun intérêt pour la rédaction.
- Numéro administratif → à ne pas transmettre. Identifiant unique, aucun usage légitime dans un outil de rédaction externe.
- Renseignement de santé → à ne pas transmettre. Donnée particulièrement protégée ; le fait d'enlever le nom ne change rien si le contexte permet d'identifier la personne.
- Montant de salaire individuel → à ne pas transmettre (ou « selon conditions » très strictes si l'outil est interne et validé pour cet usage). Rattaché à une personne, il devient une donnée personnelle.
- Description non identifiante d'une tâche → selon conditions. Seule, elle n'identifie personne ; combinée à d'autres éléments, elle peut le devenir. Conditions : outil validé par la structure, pas d'ajout d'éléments identifiants, usage limité à un brouillon relu.

## Deux messages à faire passer

- Remplacer un nom ne suffit pas à anonymiser : c'est la combinaison des informations qui identifie.
- « Consentement obtenu » n'est pas synonyme de conformité complète : il faut aussi une finalité précise, un outil validé par la structure, une durée de conservation et une information de la personne. En cas de doute, la question se pose au responsable désigné dans la structure (référent données, direction).

## Ce qu'on ne tranche pas en formation

Le formateur ne se substitue pas au référent données de chaque structure. Les réponses ci-dessus sont des repères pédagogiques ; les règles internes de chaque structure priment.`,
      trainer_notes: `## Animation

- 5 minutes de consignes, pas plus : lire une carte à voix haute pour montrer le niveau de détail attendu.
- Passer dans les binômes et poser la question « et si on combine cette carte avec celle-là ? ».
- Au débrief, commencer par les cartes « selon conditions » : c'est là que les désaccords sont utiles.

## Pièges fréquents

- « On enlève le nom, donc c'est anonyme » : faire combiner la carte 8 avec le nom de l'agence et la date.
- « La personne est d'accord, donc on peut » : rappeler que le consentement ne remplace ni la finalité, ni l'outil validé, ni l'information de la personne.
- Débat juridique sans fin : recentrer sur « qui, dans votre structure, peut répondre ? ».

## Rythmes différents

- Binômes rapides : bonus (neuvième carte) ou leur demander de préparer un argument contraire à leur propre choix.
- Binômes lents : limiter à cinq cartes puis rejoindre le débrief ; les trois restantes sont corrigées collectivement.`,
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
      objective: `À la fin de l'atelier, chaque binôme a produit, à partir de la transcription fictive R1, un compte rendu de suivi de 200 à 300 mots qui distingue faits, éléments à confirmer et actions, avec un tableau action / responsable / échéance, sans aucune information inventée.`,
      brief: `Vous travaillez en binôme sur le cas fictif Agence Horizon : l'entretien du 21 septembre 2026 entre une conseillère et une personne accompagnée, au sujet d'une mission de préparation manuelle de commandes chez « Atelier Horizon Logistique — entreprise fictive ». Commencez par un court jeu de rôle de trois à cinq minutes en reprenant le texte de R1 : l'un joue la conseillère, l'autre la personne accompagnée. Si un outil de transcription est autorisé dans votre structure, le formateur peut en faire la démonstration ; sinon, vous utilisez directement le texte R1 et vous indiquez « transcription fournie » dans votre dépôt (on ne simule pas une transcription automatique). Ensuite, le pilote saisit le prompt de départ dans l'outil autorisé avec le texte R1, et le vérificateur compare ligne par ligne la réponse avec R1. À mi-parcours, inversez les rôles. Le compte rendu fait 200 à 300 mots maximum et contient : les faits explicites, les éléments à confirmer, les actions convenues avec leur responsable et leur échéance. Comparez enfin la fiche de mission V1 (R3, 10/09/2026, ancienne version) et la fiche V2 (R2, 18/09/2026, actualisée) : relevez une correction justifiée que vous apportez au compte rendu grâce à la V2.`,
      resource_codes: ['R1', 'R2', 'R3'],
      steps: [
        `Jouer l'entretien R1 en trois à cinq minutes (conseillère / personne accompagnée), sans ajouter d'informations.`,
        `Lire R1 en entier et surligner les faits explicites, les inconnues et les actions convenues.`,
        `Le pilote saisit le prompt de départ avec le texte R1 dans l'outil autorisé ; le vérificateur note chaque phrase de la réponse qui n'a pas de source dans R1.`,
        `Inverser les rôles : le nouveau pilote corrige le texte, le nouveau vérificateur relit les dates et les responsables.`,
        `Construire le tableau action / responsable / échéance (trois actions attendues).`,
        `Comparer R3 (V1, ancienne) et R2 (V2, actualisée) et noter une correction justifiée sur les horaires.`,
        `Compter les mots (200 à 300) et vérifier qu'aucune appréciation de personnalité ne figure dans le texte.`,
        `Déposer le compte rendu, le tableau, la correction V1/V2 et le prompt exact utilisé.`,
      ],
      deliverable: `Un compte rendu de suivi (200 à 300 mots) + un tableau de trois actions (action / responsable / échéance) + une correction justifiée entre la fiche V1 et la fiche V2 + le prompt exact utilisé et le nom de l'outil (ou « transcription fournie » et « sans outil » si solution de secours).`,
      success_criteria: [
        `Les dates sont fidèles à R1 et R2 : entretien du 21/09, disponibilité lundi 28/09, demande au client mercredi 23/09, trajet vérifié au plus tard jeudi 24/09, point de suivi jeudi 24/09 à 10 h.`,
        `Trois actions sont attribuées à un responsable avec une échéance.`,
        `Le salaire est indiqué comme non communiqué, à demander ; aucun montant n'apparaît.`,
        `Le trajet est indiqué « à vérifier » ; la mission est indiquée comme non confirmée par le client.`,
        `Les horaires retenus sont ceux de la V2 (présence à partir de 9 h, 9 h–17 h indicatif) et non ceux de la V1.`,
        `Aucune appréciation de personnalité (« motivé », « sérieux », « fragile ») ne figure dans le compte rendu.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Chercher les mots qui font passer une inconnue pour un fait`,
          text: `Relisez la réponse de l'outil et cherchez les mots « confirmé », « validé », « prévu », « sera », « environ ». À chaque fois, retrouvez la phrase de R1 qui le justifie. Si vous ne la trouvez pas, c'est une inconnue déguisée en fait : reformulez en « à confirmer » ou supprimez. Faites le même contrôle pour chaque date et chaque horaire.`,
        },
        {
          level: 'trame',
          title: `Gabarit de compte rendu`,
          text: `Compte rendu de suivi — cas fictif Agence Horizon — entretien du [date]. 1. Faits explicites : mission envisagée : [poste, entreprise fictive] ; expérience : [...] ; disponibilité : [...] ; horaires selon fiche V2 du [date] : [...] ; moyen de transport : [...]. 2. Éléments inconnus ou à confirmer : [horaires de la semaine suivante], [trajet et arrêt de bus], [rémunération], [confirmation client]. 3. Actions convenues : tableau | Action | Responsable | Échéance |. 4. Prochain point de suivi : [date, heure]. Ambiguïtés relevées : [...].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (début de compte rendu)`,
          text: `« Entretien du 21/09/2026 (cas fictif Agence Horizon). Mission envisagée : préparation manuelle de commandes chez Atelier Horizon Logistique (entreprise fictive). La personne indique six mois d'expérience en préparation manuelle de commandes et une disponibilité à partir du lundi 28 septembre 2026. Selon la fiche V2 du 18/09/2026, la présence est attendue à partir de 9 h (9 h–17 h à titre indicatif). Aucune conduite d'engin n'est prévue. À confirmer : les horaires de la semaine suivante (demandés au client le mercredi 23/09)… » — la suite (trajet, rémunération, tableau d'actions) est à rédiger par le binôme.`,
        },
      ],
      debrief_questions: [
        `Quel détail l'IA a-t-elle transformé (une inconnue devenue un fait, une date déplacée, un mot ajouté) ?`,
        `Qui conserve la responsabilité du compte rendu une fois qu'il est envoyé ?`,
        `Qu'est-ce que la comparaison V1 / V2 vous a appris sur la gestion des versions de documents ?`,
      ],
      fallback: `Sans outil IA : le binôme rédige le compte rendu à la main à partir de R1 en suivant la trame, indique « sans outil » dans le dépôt et consacre le temps gagné à la comparaison V1/V2 et à la vérification croisée. Sans outil de transcription : utiliser directement R1 et afficher « transcription fournie ».`,
      prompt_starter: `À partir du texte fourni uniquement, rédige un compte rendu de suivi. Distingue faits explicites, éléments inconnus et actions convenues. Fais un tableau action / responsable / échéance. N'invente ni disponibilité, ni salaire, ni confirmation client. Signale toute ambiguïté.`,
      prompt_defaults: {
        context: `Je suis conseiller(ère) dans une agence d'emploi fictive (Agence Horizon). Le texte fourni est la transcription fictive d'un entretien de suivi du 21/09/2026.`,
        task: `Rédige un compte rendu de suivi à partir du texte fourni uniquement. Distingue faits explicites, éléments inconnus et actions convenues. Fais un tableau action / responsable / échéance.`,
        data: `Transcription fictive R1 (collée ci-dessous). Fiche de mission V2 du 18/09/2026 pour les horaires.`,
        constraints: `N'invente ni disponibilité, ni salaire, ni confirmation client. Aucune appréciation de personnalité. Aucune donnée personnelle ajoutée. 200 à 300 mots maximum.`,
        format: `Trois rubriques (faits explicites, éléments inconnus ou à confirmer, actions convenues), puis un tableau action / responsable / échéance.`,
        controls: `Signale toute ambiguïté. Je vérifierai chaque date, chaque responsable et chaque mention de confirmation avec le texte source.`,
      },
      levels: {
        guided: `Utilisez le prompt de départ tel quel, puis la trame pour structurer le compte rendu. Vérifiez chaque critère de réussite avant le dépôt.`,
        autonomous: `Adaptez le prompt à votre façon de rédiger, produisez le compte rendu et le tableau, puis justifiez votre correction V1/V2 en deux phrases.`,
        bonus: `Rédigez une version courte (trois à quatre phrases) d'un message de suivi destiné à la personne accompagnée, sans l'envoyer. Ce bonus reste dans le temps de l'atelier et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['transcription'],
      production_kind: 'report_actions',
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Compte rendu modèle (cas fictif Agence Horizon)

Entretien du 21/09/2026 entre la conseillère et la personne accompagnée.

### Faits explicites
- Mission envisagée : préparation manuelle de commandes chez Atelier Horizon Logistique (entreprise fictive).
- Expérience : six mois de préparation de commandes à la main.
- Disponibilité : à partir du lundi 28 septembre 2026.
- Horaires selon la fiche actualisée V2 du 18/09/2026 : présence à partir de 9 h, 9 h–17 h à titre indicatif.
- Transport : bus vers 8 h 45 ; pas de véhicule.
- Aucune conduite d'engin.

### Éléments inconnus ou à confirmer
- Horaires de la semaine suivante : inconnus, à demander au client.
- Trajet et arrêt de bus : à vérifier.
- Rémunération : non communiquée.
- Mission : non confirmée par le client à ce stade.

### Actions convenues
| Action | Responsable | Échéance |
|---|---|---|
| Demander au client les horaires de la semaine suivante | Conseillère | Mercredi 23/09/2026 |
| Vérifier le trajet et l'arrêt de bus | Personne accompagnée | Jeudi 24/09/2026 au plus tard |
| Demander la rémunération au client | Conseillère | Avant le point de suivi du 24/09/2026 à 10 h |

Prochain point de suivi : jeudi 24 septembre 2026 à 10 h.

### Correction V1 / V2 attendue
La fiche V1 du 10/09/2026 indiquait 8 h–16 h provisoire, validation client en attente. La V2 du 18/09/2026 indique une présence à partir de 9 h (9 h–17 h indicatif). Le compte rendu doit retenir la V2 et peut mentionner que la V1 est une ancienne version.

## Liste des pièges
- Mission présentée comme confirmée alors que la validation client est en attente.
- Montant de salaire inventé ou « estimé ».
- Trajet présenté comme vérifié ou arrêt de bus nommé.
- Horaires de la V1 (8 h–16 h) repris à la place de la V2.
- Date de disponibilité déplacée (ex. « dès cette semaine »).
- Appréciation de personnalité ajoutée (« candidat motivé »).
- Action sans responsable ou sans échéance.
- Responsable inversé (le trajet attribué à la conseillère).`,
      trainer_notes: `## Animation
- Démonstration (8 min) : montrer le prompt de départ, la réponse brute, puis une vérification en direct d'une phrase douteuse. Ne pas corriger tout : montrer la méthode.
- Si aucun outil de transcription n'est autorisé, le dire clairement et afficher « transcription fournie ». Ne jamais faire semblant qu'un enregistrement a été transcrit.
- Imposer l'inversion des rôles à mi-production (annoncer l'heure).

## Pièges fréquents
- Binômes qui acceptent la première réponse : leur demander de trouver la phrase de R1 qui justifie « mission confirmée ».
- Comptes rendus trop longs : rappeler 200–300 mots ; le tableau ne compte pas.
- Oubli de la comparaison V1/V2 : la réserver aux 10 minutes de vérification si besoin.

## Rythmes différents
- Rapides : bonus (message de suivi court, non envoyé) ou leur confier la relecture du compte rendu d'un autre binôme.
- Lents : fournir la trame dès le début et limiter le tableau à deux actions avant d'en ajouter une troisième.

## Débrief
Collecter un « détail transformé » par binôme et l'afficher. Terminer par la question de la responsabilité : l'outil n'est pas signataire.`,
      flawed_example: `## RÉSERVÉ AU FORMATEUR — version imparfaite à ne pas distribuer telle quelle

Ce compte rendu contient volontairement trois erreurs. À utiliser pour un exercice de repérage.

« Entretien du 21/09/2026. Mission confirmée chez Atelier Horizon Logistique (entreprise fictive) en préparation manuelle de commandes, à partir du lundi 28 septembre. La personne a six mois d'expérience. Horaires : 9 h–17 h. Rémunération : salaire horaire au niveau habituel de ce type de mission, soit environ le minimum conventionnel. Transport : le trajet en bus a été validé, départ 8 h 45. Aucune conduite d'engin. Point de suivi jeudi 24 septembre à 10 h. »

### Les trois erreurs
1. « Mission confirmée » : la validation client est en attente ; rien dans R1 ne confirme la mission.
2. Rémunération « environ le minimum conventionnel » : le salaire n'est pas communiqué ; toute estimation est une invention.
3. « Trajet validé » : le trajet et l'arrêt sont à vérifier au plus tard le jeudi 24/09 ; rien n'est validé.

Erreur secondaire possible à faire remarquer : aucune action n'est attribuée à un responsable.`,
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
      objective: `À la fin de l'atelier, chaque binôme a produit une FAQ de cinq réponses fondées uniquement sur les documents fictifs R2 à R5, chaque réponse étant reliée à un document, une version, une rubrique et un passage, et les informations absentes étant signalées « information non disponible ».`,
      brief: `En binôme, importez les quatre documents fictifs R2 (fiche de mission V2 du 18/09/2026), R3 (fiche de mission V1 du 10/09/2026, ancienne version), R4 (procédure d'accueil V2 du 16/09/2026) et R5 (guide de visite V1 du 08/09/2026) dans l'outil documentaire autorisé par votre structure. Posez ensuite les cinq questions suivantes, l'une après l'autre : 1) Quels sont les horaires actuels de la mission ? 2) Une conduite d'engin est-elle prévue ? 3) Quelles sont les étapes de la procédure d'accueil ? 4) Quelle est la rémunération ? 5) Quelle est l'adresse exacte du site ? Utilisez le prompt de départ pour cadrer les réponses. Pour chaque réponse, ouvrez le passage cité dans le document et contrôlez-le vous-même : une réponse qui cite un document n'est pas automatiquement vraie. Deux questions n'ont pas de réponse dans les documents ; l'outil doit le dire, et vous devez le vérifier. Une question fait apparaître une contradiction entre deux versions ; votre FAQ doit montrer le conflit et retenir la version actualisée.`,
      resource_codes: ['R2', 'R3', 'R4', 'R5'],
      steps: [
        `Importer R2, R3, R4 et R5 dans l'outil documentaire autorisé (ou préparer les quatre documents imprimés pour la solution de secours).`,
        `Saisir le prompt de départ, puis poser la première question (horaires actuels).`,
        `Pour chaque réponse, ouvrir le document cité, retrouver la version, la rubrique et le passage, et noter « vérifié » ou « à corriger ».`,
        `Poser les quatre autres questions dans l'ordre et remplir le tableau au fur et à mesure.`,
        `Pour les questions sans réponse dans les documents, vérifier que la FAQ indique bien « information non disponible » et qui doit obtenir l'information.`,
        `Pour la question des horaires, montrer la contradiction V1 / V2 et indiquer la version retenue.`,
        `Relire la FAQ à deux : chaque réponse est-elle compréhensible par un collègue sans les documents sous les yeux ?`,
        `Déposer la FAQ, le tableau et le prompt exact.`,
      ],
      deliverable: `Une FAQ de cinq réponses + un tableau réponse / source (document, version, rubrique) / passage justificatif / vérification humaine (vérifié, corrigé, non disponible) + le prompt exact et l'outil utilisé.`,
      success_criteria: [
        `La réponse sur les horaires s'appuie sur la V2 (R2) et signale la V1 (R3) comme ancienne version.`,
        `La réponse sur la conduite d'engin indique qu'aucune conduite n'est prévue, avec le passage de R2.`,
        `La rémunération et l'adresse exacte du site sont indiquées « information non disponible », sans aucune valeur inventée.`,
        `Les six étapes de la procédure d'accueil R4 sont restituées dans l'ordre, sans étape ajoutée ni supprimée.`,
        `Chaque ligne du tableau indique une vérification humaine (vérifié / corrigé / non disponible).`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Se méfier des réponses trop complètes`,
          text: `Si l'outil donne une adresse, un montant ou un horaire précis à la question 4 ou 5, il l'a probablement reconstitué à partir d'un autre passage ou de ses connaissances générales. Demandez-lui : « Dans quel document et quel passage exactement ? » puis ouvrez le document. Si le passage n'existe pas, la bonne réponse est « information non disponible ».`,
        },
        {
          level: 'trame',
          title: `Gabarit de ligne de FAQ`,
          text: `Question : [...]. Réponse : [une ou deux phrases]. Source : document [R2 / R3 / R4 / R5], version [V1 / V2 du …], rubrique [...]. Passage justificatif : « [citation courte] ». Vérification humaine : [vérifié dans le document / corrigé : … / information non disponible → à obtenir par …]. Conflit de versions : [aucun / V1 dit …, V2 dit …, version retenue : V2].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple pour une ligne`,
          text: `Question 2 : « Une conduite d'engin est-elle prévue ? » Réponse : « Non, aucune conduite d'engin n'est prévue pour cette mission. » Source : R2, fiche de mission V2 du 18/09/2026, rubrique « Conditions de la mission ». Passage : « aucune conduite d'engin ». Vérification humaine : vérifié dans R2 ; la V1 ne dit pas le contraire. — Les quatre autres lignes sont à construire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Sur quelle question l'outil a-t-il été tenté de « compléter » ? Comment l'avez-vous vu ?`,
        `Comment avez-vous présenté la contradiction entre la V1 et la V2 ?`,
        `Dans votre structure, qui est chargé de tenir à jour les documents que vos outils utilisent ?`,
      ],
      fallback: `Sans outil documentaire : le binôme répond aux cinq questions à la main avec les quatre documents imprimés ou affichés, en remplissant le même tableau (source, version, rubrique, passage). L'exercice de vérification est identique ; indiquer « sans outil » dans le dépôt.`,
      prompt_starter: `Réponds uniquement à partir des documents fournis. Pour chaque réponse, indique le document, sa version, la rubrique et le passage justificatif. Si l'information manque, écris “information non disponible”. Si des versions se contredisent, montre le conflit et distingue la version actualisée.`,
      prompt_defaults: {
        context: `Je travaille dans une agence d'emploi fictive (Agence Horizon). J'ai importé quatre documents fictifs : fiche de mission V2 (18/09/2026), fiche de mission V1 (10/09/2026, ancienne), procédure d'accueil V2 (16/09/2026), guide de visite V1 (08/09/2026).`,
        task: `Réponds à mes questions uniquement à partir des documents fournis.`,
        data: `Documents R2, R3, R4, R5 importés. Questions : horaires actuels ; conduite d'engin prévue ; étapes de la procédure d'accueil ; rémunération ; adresse exacte du site.`,
        constraints: `Si l'information manque, écris “information non disponible”. N'utilise aucune connaissance extérieure aux documents. N'invente ni montant, ni adresse, ni horaire.`,
        format: `Pour chaque réponse : réponse courte, document, version, rubrique, passage justificatif cité.`,
        controls: `Si des versions se contredisent, montre le conflit et distingue la version actualisée. J'ouvrirai chaque passage cité pour le vérifier.`,
      },
      levels: {
        guided: `Posez les cinq questions dans l'ordre avec le prompt de départ et remplissez le gabarit de ligne pour chacune. Ouvrez chaque passage cité avant de cocher « vérifié ».`,
        autonomous: `Posez les cinq questions, puis ajoutez une sixième question de votre choix dont vous savez que la réponse n'est pas dans les documents, pour tester le comportement de l'outil.`,
        bonus: `Si un outil audio est disponible et autorisé, enregistrez un bref message de présentation des six étapes d'accueil à partir d'un script relu à deux ; sinon, rédigez ce script en six phrases courtes sous forme de FAQ texte. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['documents'],
      production_kind: 'faq_sources',
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Les cinq réponses attendues (cas fictif Agence Horizon)

### 1. Horaires actuels
- Réponse : présence attendue à partir de 9 h ; 9 h–17 h à titre indicatif.
- Source : R2, fiche de mission V2 du 18/09/2026, rubrique horaires.
- Conflit : R3 (V1 du 10/09/2026) indiquait 8 h–16 h provisoire, validation client en attente. Version retenue : V2. La V1 est une ancienne version.
- Précision attendue : les horaires de la semaine suivante restent inconnus (demande au client prévue le 23/09).

### 2. Conduite d'engin
- Réponse : aucune conduite d'engin prévue.
- Source : R2, V2, rubrique conditions de la mission, passage « aucune conduite d'engin ».

### 3. Étapes de la procédure d'accueil
- Réponse : six étapes dans l'ordre : 1) recueillir la demande et expliquer le déroulement ; 2) relever uniquement les compétences et disponibilités nécessaires ; 3) vérifier les informations de la mission et les points inconnus ; 4) faire valider le projet de mission par le permanent responsable ; 5) expliquer les prochaines actions ; 6) fixer un point de suivi et consigner les actions.
- Source : R4, procédure d'accueil V2 du 16/09/2026.
- Point de vigilance : la règle « un point inconnu est attribué à un responsable, jamais complété par supposition » doit être conservée si elle est citée.

### 4. Rémunération
- Réponse : information non disponible. Le salaire n'est pas communiqué ; il doit être demandé au client par la conseillère.
- Toute valeur chiffrée est une invention.

### 5. Adresse exacte du site
- Réponse : information non disponible. Les documents nomment l'entreprise fictive et le secteur, pas l'adresse exacte.
- Toute adresse proposée est une invention.

## Contrôle des citations
Une réponse qui cite un document n'est pas automatiquement vraie : vérifier que le passage existe, qu'il est dans la bonne version et qu'il dit bien ce que la réponse affirme.`,
      trainer_notes: `## Animation
- Démonstration (8 min) : importer les quatre documents, poser la question 1, montrer la citation, ouvrir le document et vérifier à l'écran. Montrer aussi une question sans réponse (la rémunération) et le comportement attendu.
- Vérifier avant l'atelier que l'outil documentaire autorisé accepte quatre fichiers et affiche les passages cités ; sinon, basculer sur la solution de secours dès le départ.

## Pièges fréquents
- L'outil mélange V1 et V2 : c'est l'objectif de la question 1, laisser le binôme le découvrir.
- Réponse « plausible » à l'adresse : faire ouvrir le document, le passage n'existe pas.
- Binômes qui ne vérifient que les deux premières lignes : annoncer que la ligne de vérification humaine est obligatoire pour les cinq.

## Rythmes différents
- Rapides : sixième question piège (niveau autonome) ou bonus audio / script.
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
      objective: `À la fin de l'atelier, chaque binôme a produit une fiche de visite d'une page dont chaque donnée déterminante est reliée à une page consultée et datée, avec au moins trois sources, cinq questions à poser au client et deux incertitudes nommées.`,
      brief: `En binôme, choisissez d'abord un secteur d'activité de votre bassin d'emploi (par exemple la logistique, l'agroalimentaire, le bâtiment, les services à la personne). Ensuite, deux options : soit une entreprise publique identifiée dont les informations professionnelles sont accessibles (site institutionnel, pages publiques), soit le cas fictif « Atelier Horizon Logistique » en vous appuyant sur le guide de visite R5. Dans les deux cas, vous ne recherchez que des informations professionnelles publiques : activité, implantation, métiers, actualités publiées. Aucune donnée privée sur des dirigeants ou des salariés. Utilisez un assistant avec recherche en ligne, autorisé par votre structure, avec le prompt de départ, puis faites l'exercice central de l'atelier : pour chaque affirmation de la fiche, retrouvez le passage exact de la page consultée qui la justifie. Si vous ne le retrouvez pas, corrigez ou supprimez l'affirmation. Pour toute règle évoquée (par exemple une règle de sécurité ou une obligation), retrouvez une source officielle et vérifiez qu'elle est toujours pertinente à la date de la formation. La liste R7 (France Travail, Dares, Insee, Service-Public.fr, Légifrance, ministère du Travail, CNIL) donne des points de départ, pas des réponses vérifiées.`,
      resource_codes: ['R5', 'R7'],
      steps: [
        `Choisir un secteur du bassin d'emploi, puis une entreprise publique identifiée ou le cas fictif avec R5.`,
        `Lister sur papier ce que l'on sait déjà et ce que l'on veut apprendre avant la visite.`,
        `Saisir le prompt de départ dans l'assistant autorisé en remplaçant [entreprise ou secteur] et [territoire].`,
        `Pour chaque affirmation de la réponse, ouvrir la page citée, retrouver le passage exact et noter la date de la page.`,
        `Corriger ou supprimer toute affirmation sans passage retrouvé ; marquer « hypothèse » ce qui n'est pas sourcé mais utile.`,
        `Pour chaque règle évoquée, retrouver une source officielle et vérifier sa date et sa pertinence.`,
        `Rédiger la fiche d'une page : faits sourcés, hypothèses, cinq questions client, deux incertitudes.`,
        `Déposer la fiche, la liste des sources (adresse, date de consultation) et le prompt exact.`,
      ],
      deliverable: `Une fiche de visite d'une page : faits sourcés (trois sources minimum, avec adresse de la page et date de consultation), hypothèses identifiées, cinq questions à poser au client, deux incertitudes à lever. Plus le prompt exact et l'outil utilisé.`,
      success_criteria: [
        `Chaque donnée déterminante (activité, effectif, implantation, règle) est reliée à une page consultée, avec sa date.`,
        `Les chiffres et le territoire sont cohérents entre eux (même périmètre, même période).`,
        `Aucune règle juridique inventée : chaque règle citée renvoie à une source officielle vérifiée à la date de la formation.`,
        `Les hypothèses sont clairement séparées des faits.`,
        `La fiche contient cinq questions client et deux incertitudes.`,
        `Aucune donnée privée sur des dirigeants ou des salariés.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Un chiffre sans page n'est pas un fait`,
          text: `Les assistants avec recherche en ligne produisent souvent des chiffres plausibles (effectif, chiffre d'affaires, nombre de sites) sans page précise, ou avec une page qui ne contient pas le chiffre. Règle simple : pas de page ouverte et de passage retrouvé, pas de chiffre dans la fiche. Remplacez par une question à poser au client : c'est souvent plus utile pour la visite.`,
        },
        {
          level: 'trame',
          title: `Gabarit de fiche de visite`,
          text: `Fiche de visite — [entreprise ou secteur] — [territoire] — préparée le [date]. 1. Faits sourcés : • [fait] — source : [adresse de la page], consultée le [date], passage : « … ». (trois sources minimum). 2. Hypothèses (non sourcées, à confirmer) : • [...]. 3. Règles évoquées et source officielle : • [règle] — [source officielle], vérifiée le [date]. 4. Cinq questions à poser au client : 1) … 5) …. 5. Deux incertitudes : • [...] • [...]. Mention : « sources publiques uniquement ; aucune donnée privée sur des personnes ».`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (cas fictif avec R5)`,
          text: `Fait sourcé : « Le guide de visite R5 (V1 du 08/09/2026, document fictif) recommande de vérifier avant la visite les horaires de poste et les équipements de manutention. » Hypothèse : « Une activité de préparation manuelle de commandes implique probablement du port de charges : à confirmer sur place. » Question client n° 1 : « Quels sont les horaires réels de la première semaine ? » Incertitude n° 1 : « L'adresse exacte du site n'est pas dans nos documents. » — La suite (sources publiques sur le secteur, règles) est à construire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Quelle affirmation avez-vous dû supprimer faute de passage retrouvé ?`,
        `Combien de temps a pris la vérification par rapport à la recherche elle-même ? Qu'en concluez-vous ?`,
        `Quelle question client est née d'une incertitude plutôt que d'un fait ?`,
      ],
      fallback: `Sans assistant avec recherche en ligne : le formateur fournit un dossier de pages publiques capturées (adresse, date de capture, contexte). Les binômes construisent la fiche à partir de ces captures et précisent dans le dépôt « travail sur captures fournies ». Si le dossier n'est pas disponible, une production partielle (hypothèses, questions, incertitudes) est acceptée ; on ne fabrique jamais de sources.`,
      prompt_starter: `Prépare une fiche de visite pour [entreprise ou secteur] dans [territoire]. Distingue les faits sourcés, les hypothèses et les questions à poser. Donne les pages précises, les dates disponibles et ne complète pas un chiffre absent. Pour toute règle évoquée, retrouve une source officielle et vérifie qu'elle est pertinente à la date de la formation.`,
      prompt_defaults: {
        context: `Je prépare une visite d'entreprise pour une agence d'emploi. Je ne cherche que des informations professionnelles publiques.`,
        task: `Prépare une fiche de visite pour [entreprise ou secteur] dans [territoire]. Distingue les faits sourcés, les hypothèses et les questions à poser.`,
        data: `Aucun document interne. Points de départ possibles : sites institutionnels publics (liste R7). Pour le cas fictif : guide de visite R5.`,
        constraints: `Ne complète pas un chiffre absent. Aucune donnée privée sur des dirigeants ou des salariés. Aucune règle juridique sans source officielle.`,
        format: `Une page : faits sourcés (page précise et date), hypothèses, cinq questions client, deux incertitudes.`,
        controls: `Donne les pages précises et les dates disponibles. Pour toute règle évoquée, retrouve une source officielle et vérifie qu'elle est pertinente à la date de la formation. J'ouvrirai chaque page citée.`,
      },
      levels: {
        guided: `Travaillez sur le cas fictif avec R5 et le gabarit de fiche. Limitez-vous à trois faits sourcés, cinq questions et deux incertitudes.`,
        autonomous: `Choisissez une entreprise publique de votre bassin d'emploi, construisez la fiche et documentez chaque affirmation supprimée faute de source.`,
        bonus: `Rédigez en trois phrases ce que vous diriez au client pour présenter votre agence, sans aucun chiffre non vérifié. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['recherche'],
      production_kind: 'visit_sheet',
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Attendu

Il n'existe pas de fiche « correcte » unique : le corrigé porte sur la méthode.

### Une fiche est satisfaisante quand
- chaque fait déterminant a une page consultée, une date et un passage retrouvé ;
- les hypothèses sont nommées comme telles ;
- aucune règle n'est citée sans source officielle datée et pertinente ;
- les cinq questions client couvrent au moins : horaires réels, équipements et sécurité, volume ou saisonnalité d'activité, accès au site, attentes vis-à-vis de l'agence ;
- les deux incertitudes sont de vraies inconnues (pas des questions rhétoriques).

### Pour le cas fictif (R5)
- Faits sourcés possibles : uniquement ceux de R5 (recommandations du guide) et des pages publiques sur le secteur de la logistique dans le territoire choisi.
- Incertitudes attendues : adresse exacte du site ; horaires de la semaine suivante ; rémunération.
- Rappel : l'entreprise Atelier Horizon Logistique est fictive, elle n'a pas de page publique. Toute « source » la concernant est une invention.

### Signaux d'alerte
- Effectif ou chiffre d'affaires sans page.
- Règle de sécurité formulée de manière générale sans source (« la loi impose… »).
- Nom d'un dirigeant ou d'un salarié.
- Source « retrouvée » dont la page ne contient pas le passage cité.`,
      trainer_notes: `## Animation
- Démonstration (8 min) : lancer le prompt sur un secteur, puis ouvrir une page citée en direct et montrer qu'un passage existe… ou pas. Choisir à l'avance un exemple où l'assistant se trompe.
- Préparer le dossier de captures de secours avant la séance (adresse, date de capture, contexte), même si les outils fonctionnent.

## Pièges fréquents
- Fiche remplie de chiffres non ouverts : imposer les 10 minutes de vérification des sources comme un temps à part, écran de recherche fermé.
- Binômes qui cherchent des informations sur des personnes : rappeler « informations professionnelles publiques seulement ».
- Cas fictif : certains cherchent Atelier Horizon Logistique sur le web ; expliquer qu'il n'existe pas et que c'est volontaire.

## Rythmes différents
- Rapides : entreprise publique réelle (niveau autonome) et bonus.
- Lents : cas fictif avec R5, trois faits maximum, concentrer l'effort sur les questions et les incertitudes.

## Débrief
Demander à chaque binôme l'affirmation supprimée la plus surprenante.`,
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
      objective: `À la fin de la séquence, chaque participant a noté ce qu'il retient de la séance 1 et ce qu'il veut revoir, et le groupe a reconnu les trois réflexes communs aux ateliers 1 à 3.`,
      brief: `Pendant cinq minutes, le formateur revient sur les réalisations de la séance 1 : quelques comptes rendus, FAQ et fiches de visite déposés (avec l'accord de leurs auteurs), les détails transformés par les outils et les corrections apportées. Ensuite, pendant cinq minutes, vous réfléchissez seul et notez en quelques lignes : ce que j'ai retenu, ce que je veux revoir, ce que j'ai déjà essayé depuis la séance 1 (si c'est le cas, sans donnée réelle). Ces notes vous serviront pour le défi individuel et le plan d'application.`,
      resource_codes: [],
      steps: [
        `Écouter le retour du formateur sur les productions de la séance 1.`,
        `Noter les trois réflexes communs aux trois premiers ateliers (source, vérification, responsabilité).`,
        `Écrire ce que j'ai retenu de la séance 1 en deux ou trois phrases.`,
        `Écrire ce que je veux revoir ou approfondir en séance 2.`,
        `Indiquer, le cas échéant, ce que j'ai déjà essayé depuis la séance 1, sans donnée réelle.`,
      ],
      deliverable: `Une note individuelle courte : ce que j'ai retenu, ce que je veux revoir, ce que j'ai éventuellement essayé.`,
      success_criteria: [
        `La note cite au moins un apprentissage précis de la séance 1 (pas seulement « c'était intéressant »).`,
        `La note cite au moins un point à revoir.`,
        `La note ne contient aucune donnée réelle de la structure ou d'une personne.`,
        `Les trois réflexes communs sont nommés avec les mots du participant.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Repartir d'un moment précis`,
          text: `Pensez au moment de la séance 1 où vous avez corrigé l'outil : quelle phrase, quelle date, quel mot ? C'est souvent ce moment-là qui résume le mieux ce que vous avez retenu.`,
        },
        {
          level: 'trame',
          title: `Gabarit de note`,
          text: `Ce que j'ai retenu : [un apprentissage précis, avec l'atelier concerné]. Ce que je veux revoir : [une étape, un outil, une règle]. Ce que j'ai essayé depuis (sans donnée réelle) : [rien / un test sur …]. Les trois réflexes : 1) [...] 2) [...] 3) [...].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple`,
          text: `« Ce que j'ai retenu : en atelier 1, l'outil avait écrit “mission confirmée” alors que rien ne le disait ; je relis maintenant chaque mot de confirmation. Ce que je veux revoir : comment présenter un conflit de versions dans une FAQ. »`,
        },
      ],
      debrief_questions: [
        `Quel réflexe de la séance 1 vous semble le plus facile à garder au quotidien ?`,
        `Quel point le groupe veut-il revoir en priorité ?`,
      ],
      fallback: `Sans application : notes sur papier, conservées par le participant pour le plan d'application.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Séquence de réactivation sans outil IA.`,
        task: `Noter ce que je retiens et ce que je veux revoir.`,
        data: `Mes propres notes de la séance 1, aucune donnée réelle.`,
        constraints: `Pas de donnée réelle.`,
        format: `Quelques lignes.`,
        controls: `Relire pour vérifier qu'aucune information de la structure ou d'une personne n'apparaît.`,
      },
      levels: {
        guided: `Utilisez le gabarit de note et répondez à chaque rubrique en une phrase.`,
        autonomous: `Rédigez votre note librement, puis reliez-la à votre tâche prioritaire de l'accueil.`,
        bonus: `Formulez une question que vous poseriez à un collègue qui n'a pas suivi la séance 1 pour vérifier qu'il a compris le réflexe de vérification. Non évalué.`,
      },
      work_mode: 'individual',
      families: [],
      production_kind: 'review',
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Les trois réflexes à faire émerger

- Source : chaque information vient d'un document ou d'une page identifiée et datée.
- Vérification : on ouvre le passage, on compare, on corrige ou on supprime.
- Responsabilité : la personne qui envoie le livrable en reste responsable, pas l'outil.

## Note individuelle
Pas de corrigé : on attend un apprentissage précis et un point à revoir.`,
      trainer_notes: `## Animation
- Montrer deux ou trois productions de la séance 1 avec accord des auteurs ; mettre en avant les corrections, pas les erreurs.
- Rappeler que le défi individuel reprend les livrables de la séance 1 : les participants doivent les avoir sous la main.

## Pièges fréquents
- Participants qui ont testé entre les deux séances sur des données réelles : accueillir le retour, rappeler la règle, ne pas afficher le résultat.
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
      objective: `À la fin de l'atelier, chaque participant a transformé la procédure d'accueil fictive R4 en un schéma de six étapes qui conserve l'ordre, le point de validation humaine et les inconnues, et dont la compréhension a été contrôlée par un autre participant.`,
      brief: `Seul, vous transformez la procédure d'accueil R4 (V2 du 16/09/2026, document fictif) en un schéma de six étapes. Utilisez Napkin ou l'outil de schématisation autorisé par votre structure avec le prompt de départ, en collant le texte de R4. Le schéma doit conserver l'ordre des six étapes, faire apparaître clairement l'étape 4 (validation par le permanent responsable) comme un point de validation humaine, et montrer la règle « un point inconnu est attribué à un responsable, jamais complété par supposition ». Utilisez des verbes simples et des libellés courts. N'ajoutez aucune décision, aucune obligation ni aucune étape absente du texte. Exportez le schéma en PNG ou PDF et rédigez une courte explication de votre choix visuel (type de schéma, couleurs ou formes, ce que vous avez mis en avant). Pendant le temps de contrôle, échangez votre schéma avec un autre participant : il doit retrouver les six étapes dans l'ordre et le point de validation sans lire R4.`,
      resource_codes: ['R4'],
      steps: [
        `Lire R4 en entier et numéroter les six étapes sur papier, en entourant le point de validation et la règle sur les inconnues.`,
        `Saisir le prompt de départ avec le texte de R4 dans l'outil de schématisation autorisé.`,
        `Comparer le schéma obtenu avec R4 : même ordre, six étapes, aucune étape ajoutée ou fusionnée.`,
        `Corriger les libellés pour qu'ils soient courts, avec un verbe simple, et faire ressortir la validation humaine (étape 4).`,
        `Vérifier que le schéma mentionne la règle sur les points inconnus sans la transformer en décision supplémentaire.`,
        `Exporter en PNG ou PDF et rédiger trois à cinq lignes sur le choix visuel.`,
        `Faire contrôler le schéma par un autre participant qui ne lit pas R4 ; noter ce qu'il n'a pas compris et corriger.`,
      ],
      deliverable: `Un schéma de six étapes (PNG ou PDF) + une courte explication du choix visuel + le prompt exact et l'outil utilisé + le retour du participant qui a contrôlé la compréhension.`,
      success_criteria: [
        `Les six étapes sont présentes, dans l'ordre de R4, sans étape ajoutée, fusionnée ni supprimée.`,
        `Le point de validation humaine (étape 4, permanent responsable) est visible au premier regard.`,
        `Le texte est lisible (libellés courts, verbes simples, taille suffisante une fois exporté).`,
        `Aucune décision ni obligation absente du texte n'a été ajoutée.`,
        `Un autre participant a retrouvé les six étapes et la validation sans lire R4, et son retour est noté.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Les outils aiment ajouter des losanges`,
          text: `Les outils de schématisation ajoutent souvent des points de décision (« oui / non ») ou des boucles qui ne sont pas dans le texte. Comptez les formes : si vous avez plus de six étapes, ou une question qui n'est pas dans R4, supprimez-la. La seule validation du texte est celle de l'étape 4 ; la règle sur les inconnues est une consigne, pas une décision supplémentaire.`,
        },
        {
          level: 'trame',
          title: `Gabarit de libellés et d'explication`,
          text: `Étape 1 : [verbe] + [objet court]. Étape 2 : [...]. Étape 3 : [...]. Étape 4 (validation humaine) : [verbe] + [par qui]. Étape 5 : [...]. Étape 6 : [...]. Mention associée : « point inconnu → attribué à un responsable, jamais supposé ». Explication du choix visuel : « J'ai choisi [une ligne / une colonne / des blocs numérotés] parce que [...]. J'ai mis en avant l'étape 4 par [couleur / forme / cadre] parce que [...]. J'ai placé la règle sur les inconnues [où] pour [...]. »`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple de libellés`,
          text: `Étape 1 : « Recueillir la demande, expliquer le déroulement ». Étape 2 : « Relever compétences et disponibilités utiles ». Étape 4 (cadre renforcé) : « Faire valider le projet par le permanent responsable ». Note sous le schéma : « Point inconnu = attribué à un responsable, pas supposé ». — Les étapes 3, 5 et 6 et le choix visuel sont à produire par le participant.`,
        },
      ],
      debrief_questions: [
        `Qu'est-ce que l'outil a ajouté ou modifié par rapport à R4 ? Comment l'avez-vous repéré ?`,
        `Qu'est-ce que le contrôle par un autre participant a révélé que vous n'aviez pas vu ?`,
      ],
      fallback: `Sans outil de schématisation : utiliser les six blocs éditables de l'application (un bloc par étape, avec un libellé court et un marqueur de validation), puis imprimer en PDF depuis le navigateur. Le contrôle par un autre participant se fait de la même manière.`,
      prompt_starter: `Transforme cette procédure en un schéma de six étapes. Conserve l'ordre, les points de validation et les inconnues. Utilise des verbes simples et des libellés courts. N'ajoute pas de décision ni d'obligation absente du texte.`,
      prompt_defaults: {
        context: `Je travaille dans une agence d'emploi fictive. Le texte fourni est la procédure d'accueil R4, version V2 du 16/09/2026 (document fictif), en six étapes.`,
        task: `Transforme cette procédure en un schéma de six étapes.`,
        data: `Texte intégral de R4 (collé ci-dessous).`,
        constraints: `Conserve l'ordre, les points de validation et les inconnues. N'ajoute pas de décision ni d'obligation absente du texte. Pas d'étape supplémentaire.`,
        format: `Schéma linéaire de six blocs numérotés, libellés courts avec verbes simples, validation humaine mise en évidence, mention de la règle sur les points inconnus.`,
        controls: `Je comparerai chaque bloc avec le texte de R4 et je ferai contrôler la compréhension par un collègue.`,
      },
      levels: {
        guided: `Utilisez le prompt de départ, puis le gabarit de libellés pour corriger chaque bloc. Faites contrôler par un voisin.`,
        autonomous: `Produisez le schéma, puis une seconde version avec une disposition différente, et expliquez laquelle est la plus claire et pourquoi.`,
        bonus: `Rédigez une légende de deux lignes destinée à un nouveau collègue qui découvre la procédure. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'individual',
      families: ['schemas'],
      production_kind: 'process_blocks',
      deposit_notice: DEPOSIT_NOTICE,
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

## Ce qui n'est pas accepté
- Un losange « mission validée ? oui / non » : la procédure ne décrit pas de refus.
- Une étape « relancer le client » ou « envoyer le contrat » : absentes du texte.
- Les étapes 5 et 6 fusionnées.
- Un libellé qui change le sens (« relever toutes les informations » au lieu de « uniquement les nécessaires »).`,
      trainer_notes: `## Animation
- Démonstration (5 min) : coller R4, lancer le prompt, montrer un ajout typique de l'outil (décision, boucle) et le supprimer.
- Prévoir les six blocs éditables de l'application comme secours ; les montrer en 30 secondes.

## Pièges fréquents
- Schéma « enrichi » avec des décisions : revenir au texte.
- Libellés trop longs : règle des six à huit mots.
- Contrôle par un voisin bâclé : le voisin doit dire à voix haute les six étapes sans regarder R4.

## Rythmes différents
- Rapides : seconde disposition (niveau autonome) ou bonus légende.
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
      objective: `À la fin de l'atelier, chaque binôme a produit, à partir du brief fictif R6, une affiche « Préparer sa première mission » avec trois messages courts et une illustration, accompagnée d'un texte accessible séparé, d'une description de l'image et d'une vérification des informations et des droits d'usage.`,
      brief: `En binôme, partez du brief de communication R6 (document fictif) : une affiche d'agence intitulée « Préparer sa première mission » avec trois actions : vérifier les horaires, préparer les questions utiles, confirmer le trajet. Le brief interdit d'inventer une rémunération, une adresse, un contact ou une date. Deux productions : d'abord le texte, avec le prompt de rédaction (prompt de départ) pour reformuler les trois actions en phrases courtes, concrètes et respectueuses ; ensuite l'illustration, avec l'outil d'images autorisé et ce prompt : « Crée une illustration professionnelle d'accueil en agence, pour un public adulte, avec des personnes diverses sans stéréotype de précarité. Composition simple, rassurante et lisible. Ne génère aucun texte dans l'image : les trois messages seront ajoutés séparément. » Assemblez l'affiche (texte ajouté par vous, pas par l'outil d'images), puis préparez un texte accessible séparé (les trois messages en texte brut) et une description de l'image en une ou deux phrases. Vérifiez le contraste texte / fond, l'absence de toute information inventée et les conditions d'usage de l'image (licence de l'outil, usage interne ou externe autorisé par votre structure). Pendant le contrôle, un autre binôme lit l'affiche et reformule les trois actions avec ses propres mots. Ne revendiquez ni le label FALC ni une accessibilité certifiée : vous appliquez des principes de clarté, pas une norme.`,
      resource_codes: ['R6'],
      steps: [
        `Lire R6 et recopier les trois actions et les interdictions (pas de rémunération, adresse, contact ni date inventés).`,
        `Saisir le prompt de départ (rédaction) avec les trois actions et obtenir trois phrases courtes ; les relire et les corriger à deux.`,
        `Saisir le prompt image dans l'outil d'images autorisé ; vérifier que l'image ne contient aucun texte ni stéréotype.`,
        `Assembler l'affiche : titre, trois messages ajoutés par vous, illustration ; contrôler le contraste et la taille du texte.`,
        `Rédiger le texte accessible séparé (titre et trois messages en texte brut) et la description de l'image.`,
        `Vérifier les conditions d'usage de l'image (licence, usage autorisé) et noter le résultat.`,
        `Faire lire l'affiche à un autre binôme qui reformule les trois actions ; corriger si une action n'est pas comprise.`,
        `Déposer l'affiche, le texte accessible, la description de l'image, la vérification et les deux prompts exacts.`,
      ],
      deliverable: `Une affiche (image ou PDF) + un texte accessible séparé (titre et trois messages) + une description de l'image + une vérification écrite (informations, contraste, droits d'usage, test de compréhension) + les deux prompts exacts et les outils utilisés.`,
      success_criteria: [
        `Les trois actions de R6 sont présentes, compréhensibles et reformulées en phrases courtes.`,
        `Le texte est sans faute et ne contient aucune rémunération, adresse, contact ni date.`,
        `Le contraste entre le texte et le fond est suffisant pour une lecture à distance.`,
        `L'image ne contient aucun texte généré et aucun stéréotype de précarité ; sa description est fournie.`,
        `Les conditions d'usage de l'image ont été examinées et notées.`,
        `Un autre binôme a reformulé les trois actions correctement ; le résultat du test est noté.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Le texte dans l'image est un piège double`,
          text: `Les outils d'images génèrent souvent du texte déformé ou des mots inventés. C'est pourquoi le prompt demande une image sans texte : vous ajoutez les messages vous-même, en texte réel, ce qui permet aussi de les lire à voix haute ou avec un lecteur d'écran. Si l'image contient malgré tout des lettres, relancez ou recadrez.`,
        },
        {
          level: 'trame',
          title: `Gabarit d'affiche et de vérification`,
          text: `Titre : « Préparer sa première mission ». Message 1 (horaires) : [phrase courte, verbe à l'impératif ou à l'infinitif]. Message 2 (questions utiles) : [...]. Message 3 (trajet) : [...]. Prompt image utilisé : « Crée une illustration professionnelle d'accueil en agence, pour un public adulte, avec des personnes diverses sans stéréotype de précarité. Composition simple, rassurante et lisible. Ne génère aucun texte dans l'image : les trois messages seront ajoutés séparément. » Description de l'image : [une ou deux phrases]. Vérification : informations inventées ? [non / corrigé] ; contraste ? [suffisant / corrigé] ; droits d'usage ? [licence consultée : …, usage autorisé : …] ; test de compréhension : [binôme X a reformulé : …].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (un message et une description)`,
          text: `Message 1 : « Vérifiez vos horaires avant le premier jour. » Description de l'image : « Une conseillère et une personne accueillie discutent à un bureau d'agence, dans un espace clair ; aucun texte dans l'image. » Vérification droits : « Conditions d'usage de l'outil consultées le [date] ; usage interne d'affichage à valider par le responsable d'agence. » — Les messages 2 et 3 et le reste de la vérification sont à produire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Quelle action a été la plus difficile à reformuler sans ajouter d'information ?`,
        `Qu'a révélé le test de compréhension par l'autre binôme ?`,
        `Qui, dans votre structure, valide l'usage d'une image générée pour un affichage ?`,
      ],
      fallback: `Sans outil d'images : utiliser des pictogrammes à licence identifiée (fournis par le formateur avec leur source) ou des formes simples (cercles, flèches) dessinées dans un outil bureautique. L'affiche, le texte accessible et la vérification restent identiques ; indiquer « sans outil d'images » dans le dépôt.`,
      prompt_starter: `Reformule ces trois actions en phrases courtes, concrètes et respectueuses. N'ajoute aucun lieu, salaire, date ou numéro absent du brief.`,
      prompt_defaults: {
        context: `Je prépare une affiche d'agence d'emploi fictive intitulée « Préparer sa première mission », destinée aux personnes accueillies, à partir du brief R6 (document fictif).`,
        task: `Reformule ces trois actions en phrases courtes, concrètes et respectueuses.`,
        data: `Les trois actions du brief : vérifier les horaires ; préparer les questions utiles ; confirmer le trajet.`,
        constraints: `N'ajoute aucun lieu, salaire, date ou numéro absent du brief. Pas de jargon. Ton respectueux, sans infantiliser.`,
        format: `Trois phrases, une par action, dix mots maximum chacune.`,
        controls: `Je relirai chaque phrase pour vérifier qu'elle ne contient aucune information absente du brief et qu'un autre binôme la comprend.`,
      },
      levels: {
        guided: `Utilisez les deux prompts tels quels et le gabarit de vérification. Assemblez l'affiche dans l'outil bureautique de votre choix.`,
        autonomous: `Produisez deux variantes d'illustration, choisissez-en une et expliquez votre choix en termes de lisibilité et de représentation.`,
        bonus: `Proposez une version de l'affiche en format téléphone (vertical, texte plus gros) avec le même texte accessible. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['images'],
      production_kind: 'poster',
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Attendu

### Texte
Trois phrases courtes qui reprennent fidèlement les trois actions de R6, par exemple :
- « Vérifiez vos horaires avant le premier jour. »
- « Préparez vos questions pour l'agence et l'entreprise. »
- « Confirmez votre trajet et votre heure de départ. »
Aucune mention de rémunération, d'adresse, de contact ni de date.

### Image
- Illustration sans texte, personnes diverses, cadre d'agence, pas de stéréotype de précarité (pas de mise en scène misérabiliste, pas de signe distinctif caricatural).
- Description fournie en une ou deux phrases.

### Vérification
- Contraste : texte foncé sur fond clair ou l'inverse, pas de texte sur une zone chargée de l'image.
- Droits : conditions d'usage de l'outil consultées et notées ; validation de l'usage par la structure mentionnée comme nécessaire.
- Test de compréhension : un autre binôme a reformulé les trois actions.

## Ce qu'on ne revendique pas
- Le label FALC (facile à lire et à comprendre) suppose une méthode et une validation par des personnes concernées : l'atelier applique des principes de clarté, il ne délivre pas ce label.
- Une « accessibilité certifiée » : il n'y a pas de certification ici.

## Erreurs fréquentes
- Phrase avec une date ou un lieu (« rendez-vous lundi à l'agence de … »).
- Texte généré dans l'image.
- Image avec un stéréotype (personnes présentées comme démunies).
- Droits d'usage non examinés.`,
      trainer_notes: `## Animation
- Démonstration (5 min) : montrer le prompt image et un résultat avec du texte déformé pour expliquer pourquoi on ajoute le texte séparément.
- Avoir un jeu de pictogrammes à licence identifiée prêt pour la solution de secours.

## Pièges fréquents
- Binômes qui passent 20 minutes sur l'image : fixer un temps maximum de 10 minutes pour l'illustration, le texte et la vérification priment.
- Phrases trop longues ou moralisatrices (« Soyez ponctuel ! ») : rappeler « concrètes et respectueuses ».
- Oubli du texte accessible séparé : le rappeler au moment du dépôt.

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
      objective: `À la fin de l'atelier, chaque binôme a soumis le même prompt et le même document fictif R2 à deux assistants disponibles, a comparé les deux courriels obtenus selon sept critères et a expliqué une décision d'usage valable pour cette tâche et ce test.`,
      brief: `En binôme, vous testez deux assistants disponibles et autorisés par votre structure sur une même tâche : rédiger un courriel interne de préparation de mission à partir de la fiche de mission fictive R2 (V2 du 18/09/2026). Le courriel fait 120 mots maximum, résume les faits, mentionne les points à confirmer (horaires de la semaine suivante, trajet, rémunération, confirmation client) et n'annonce jamais la mission comme validée. Utilisez exactement le même prompt (prompt de départ) et le même texte R2 dans les deux assistants. Avant de commencer, notez les différences connues entre les deux (l'un fait de la recherche web, l'autre non ; l'un accepte les pièces jointes, l'autre demande de coller le texte). Relevez pour chaque sortie : le nom de l'outil, le modèle si visible, la date, les réglages connus. Remplissez ensuite le tableau comparatif sur sept critères : fidélité à R2, qualité du texte, erreurs relevées, facilité de correction, accessibilité, conditions d'accès (compte, coût, autorisation), adéquation aux règles de la structure. Terminez par une décision expliquée : lequel garder pour cette tâche, ou comment les combiner. Ce résultat vaut pour cette tâche et ce test seulement : il ne s'agit pas d'un classement universel.`,
      resource_codes: ['R2'],
      steps: [
        `Noter les deux assistants testés, leurs différences connues (recherche web, pièces jointes), le modèle si visible, la date et les réglages connus.`,
        `Saisir le prompt de départ avec le texte R2 dans le premier assistant ; copier la sortie telle quelle.`,
        `Saisir exactement le même prompt et le même texte dans le second assistant ; copier la sortie telle quelle.`,
        `Compter les mots des deux courriels et vérifier chaque fait avec R2 (horaires, conduite d'engin, disponibilité).`,
        `Chercher dans chaque sortie une confirmation, un montant ou une donnée personnelle ajoutée ; les relever comme erreurs.`,
        `Remplir le tableau comparatif sur les sept critères, en une ligne par critère.`,
        `Écrire la décision en trois à cinq phrases : lequel garder, pour quoi, et à quelles conditions.`,
        `Déposer les deux sorties brutes, le prompt exact, les informations sur les outils, le tableau et la décision.`,
      ],
      deliverable: `Les deux sorties brutes + le prompt exact + pour chaque assistant : nom de l'outil, modèle si visible, date, réglages connus + un tableau comparatif sur sept critères + une décision expliquée (trois à cinq phrases).`,
      success_criteria: [
        `Le même prompt et le même texte R2 ont été utilisés dans les deux assistants, et les deux sorties brutes sont fournies.`,
        `Chaque courriel fait 120 mots maximum, ne présente pas la mission comme validée et liste les points à confirmer.`,
        `Les sept critères sont remplis avec une observation concrète pour chaque assistant (pas seulement une note).`,
        `Toute erreur (confirmation inventée, montant, donnée personnelle ajoutée) est relevée et attribuée au bon assistant.`,
        `La décision est expliquée et précise qu'elle vaut pour cette tâche et ce test seulement.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Comparer ce qui est comparable`,
          text: `Si un assistant a eu le document en pièce jointe et l'autre en texte collé, notez-le : c'est une différence de conditions, pas de qualité. De même pour la recherche web : pour cette tâche, elle n'est pas utile et peut même introduire des informations extérieures à R2. Un bon tableau explique ces différences avant de juger les sorties.`,
        },
        {
          level: 'trame',
          title: `Gabarit de tableau comparatif`,
          text: `| Critère | Assistant 1 : [nom] | Assistant 2 : [nom] | — Fidélité à R2 : [faits exacts ? horaires V2 ? conduite d'engin ?] — Qualité du texte : [phrases courtes ? ton professionnel ? 120 mots ?] — Erreurs relevées : [confirmation ? montant ? donnée ajoutée ?] — Facilité de correction : [combien de retouches ?] — Accessibilité : [lisible ? structure claire ?] — Conditions d'accès : [compte ? coût ? autorisation ?] — Adéquation aux règles de la structure : [autorisé ? données ? hébergement ?]. Décision : « Pour cette tâche et ce test, je retiens [...] parce que [...]. Je l'utiliserais à condition de [...]. Ce résultat ne vaut pas pour d'autres tâches. »`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple de ligne et de décision`,
          text: `Ligne « Erreurs relevées » : Assistant A (exemple) : « a écrit “mission confirmée” → erreur de fidélité » ; Assistant B (exemple) : « aucune confirmation ajoutée, mais 135 mots → format non respecté ». Début de décision : « Pour cette tâche et ce test, je retiens l'assistant B, à condition de raccourcir le texte moi-même… » — Les autres lignes et la suite de la décision sont à produire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Quelle différence entre les deux sorties vous a le plus surpris ?`,
        `Qu'est-ce qui, dans les conditions d'accès ou les règles de votre structure, pèse plus que la qualité du texte ?`,
        `Pourquoi ce résultat ne permet-il pas de dire quel assistant est « le meilleur » ?`,
      ],
      fallback: `Si deux assistants ne sont pas disponibles : comparer deux réponses d'exemple fournies par le formateur et clairement indiquées comme exemples (« Assistant A (exemple) », « Assistant B (exemple) »), sans nom d'outil réel, sans modèle ni vitesse fictifs. Le tableau et la décision sont remplis de la même manière ; indiquer « comparaison sur exemples » dans le dépôt.`,
      prompt_starter: `Rédige un courriel interne de 120 mots maximum à partir de cette fiche. Résume les faits, indique les informations à obtenir et les prochaines actions. N'invente aucune confirmation. Ton professionnel, phrases courtes, aucune donnée personnelle ajoutée.`,
      prompt_defaults: {
        context: `Je travaille dans une agence d'emploi fictive (Agence Horizon). La fiche fournie est la fiche de mission R2, version V2 du 18/09/2026 (document fictif), pour une mission de préparation manuelle de commandes chez une entreprise fictive.`,
        task: `Rédige un courriel interne de préparation de mission à partir de cette fiche. Résume les faits, indique les informations à obtenir et les prochaines actions.`,
        data: `Texte intégral de R2 (collé ci-dessous ou en pièce jointe selon l'assistant).`,
        constraints: `120 mots maximum. N'invente aucune confirmation. Aucune donnée personnelle ajoutée. Ne présente pas la mission comme validée.`,
        format: `Courriel interne : objet, trois courts paragraphes (faits, à obtenir, prochaines actions), ton professionnel, phrases courtes.`,
        controls: `Je vérifierai chaque fait avec R2, je compterai les mots et je comparerai avec la sortie d'un second assistant.`,
      },
      levels: {
        guided: `Utilisez le prompt de départ tel quel dans les deux assistants et remplissez le gabarit de tableau ligne par ligne.`,
        autonomous: `Après la première comparaison, modifiez une seule contrainte du prompt (par exemple 80 mots) et observez si l'écart entre les deux assistants change.`,
        bonus: `Rédigez en deux phrases la règle que vous proposeriez à votre structure pour choisir un assistant sur une nouvelle tâche. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['assistants'],
      production_kind: 'comparison',
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Courriel attendu (contenu, cas fictif Agence Horizon)

- Objet : préparation de mission — préparation manuelle de commandes, Atelier Horizon Logistique (entreprise fictive).
- Faits : disponibilité à partir du lundi 28/09/2026 ; présence attendue à partir de 9 h (9 h–17 h indicatif, fiche V2 du 18/09/2026) ; six mois d'expérience ; aucune conduite d'engin ; déplacement en bus, pas de véhicule.
- À obtenir : horaires de la semaine suivante (demande au client le 23/09) ; trajet et arrêt de bus (au plus tard le 24/09) ; rémunération (non communiquée) ; confirmation du client.
- Prochaines actions : point de suivi jeudi 24/09 à 10 h.
- Jamais : « mission confirmée », montant, nom de la personne, adresse.

## Deux réponses d'exemple annotées (à utiliser en secours, sans nom d'outil réel)

### Assistant A (exemple)
« Objet : préparation de mission. La mission de préparation de commandes chez Atelier Horizon Logistique est confirmée à partir du 28 septembre, de 9 h à 17 h. La personne a six mois d'expérience et se rendra sur site en bus. Reste à préciser le salaire et à transmettre l'adresse. Point de suivi jeudi 24 à 10 h. »
Annotation : fidèle sur l'expérience et le point de suivi ; erreur majeure « confirmée » ; « de 9 h à 17 h » présenté comme fixe alors qu'indicatif ; les horaires de la semaine suivante et le trajet à vérifier sont absents. Court (environ 60 mots), facile à corriger.

### Assistant B (exemple)
« Objet : préparation de mission — Atelier Horizon Logistique (entreprise fictive). Faits : mission envisagée de préparation manuelle de commandes, disponibilité lundi 28/09/2026, présence attendue à partir de 9 h (9 h–17 h indicatif, fiche V2), six mois d'expérience, aucune conduite d'engin, trajet en bus. À obtenir : horaires de la semaine suivante (demande client le 23/09), vérification du trajet et de l'arrêt (au plus tard le 24/09), rémunération, confirmation du client. Prochaine action : point de suivi jeudi 24/09 à 10 h. Rien n'est validé à ce stade. »
Annotation : fidèle, aucun fait inventé, points à confirmer complets ; proche de la limite de mots, phrases un peu denses ; à aérer.

## Décision type
« Pour cette tâche et ce test, l'exemple B est plus fiable ; A demande une correction de fond. La décision ne vaut que pour ce courriel et ces conditions. »`,
      trainer_notes: `## Animation
- Démonstration (5 min) : montrer la même saisie dans deux assistants, côte à côte, sans commenter la qualité ; laisser le binôme juger.
- Vérifier en amont quels assistants sont réellement autorisés ; si un seul l'est, basculer sur la comparaison d'exemples (ne pas inventer un second outil).

## Pièges fréquents
- Conclusions universelles (« X est meilleur ») : rappeler que le résultat vaut pour cette tâche et ce test.
- Prompts légèrement différents entre les deux assistants : exiger le copier-coller.
- Vitesse ou modèle fictifs dans les exemples de secours : ne jamais en afficher.

## Rythmes différents
- Rapides : variante de contrainte (niveau autonome) ou règle de choix (bonus).
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
      objective: `À la fin du défi, chaque participant a adapté seul un livrable des ateliers précédents à une variante du cas fictif qui lui a été attribuée, en citant les éléments utilisés et en expliquant deux contrôles effectués.`,
      brief: `Vous travaillez seul. Le formateur vous attribue une variante du cas fictif Agence Horizon : un élément du cas change (un horaire, une information manquante, une demande du destinataire…). Choisissez un livrable des ateliers précédents (compte rendu, FAQ, fiche de visite, schéma, affiche ou courriel) et adaptez-le à cette variante avec l'outil autorisé de votre choix, ou sans outil. Votre dépôt précise, dans l'ordre : l'usage choisi, l'outil, le prompt exact, le résultat initial de l'outil, l'erreur ou le risque détecté, la correction apportée, le résultat final. Citez les éléments du cas fictif que vous avez utilisés (quel document, quelle version) et expliquez deux contrôles que vous avez effectués. Ce défi est formatif : il mesure votre compétence sur la tâche que vous avez choisie ; il ne prouve pas la maîtrise des six familles d'usages.`,
      resource_codes: ['R1', 'R2', 'R3', 'R4', 'R6'],
      steps: [
        `Lire sa variante et noter en une phrase ce qui change par rapport au cas de base.`,
        `Choisir le livrable à adapter et le document fictif de référence (avec sa version).`,
        `Rédiger le prompt (ou travailler sans outil) en intégrant le changement, sans rien inventer d'autre.`,
        `Copier le résultat initial de l'outil tel quel.`,
        `Repérer au moins une erreur ou un risque dans ce résultat (invention, confirmation, donnée ajoutée, étape modifiée).`,
        `Corriger et produire le résultat final.`,
        `Décrire deux contrôles effectués (par exemple : comparaison des dates avec R2 ; vérification qu'aucune confirmation n'est annoncée).`,
        `Déposer l'ensemble : usage, outil, prompt, résultat initial, erreur ou risque, correction, résultat final, éléments utilisés.`,
      ],
      deliverable: `Un livrable adapté à la variante + une fiche de parcours : usage choisi, outil, prompt exact, résultat initial, erreur ou risque détecté, correction, résultat final, éléments du cas utilisés (document et version), deux contrôles expliqués.`,
      success_criteria: [
        `Le changement de la variante est correctement intégré au livrable, et rien d'autre n'a été modifié ou inventé.`,
        `Les éléments du cas fictif utilisés sont cités avec leur document et leur version.`,
        `Deux contrôles effectués sont expliqués concrètement.`,
        `Le résultat initial et le résultat final sont tous deux fournis, et la correction est visible.`,
        `Le livrable reste fidèle aux règles des ateliers : aucune confirmation, aucun montant, aucune donnée personnelle ajoutés.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Un seul changement, tout le reste est inchangé`,
          text: `La variante change un élément et un seul. Avant de lancer l'outil, écrivez ce qui change et ce qui reste identique : c'est votre liste de contrôle. L'erreur la plus fréquente est que l'outil « profite » du changement pour reformuler ou compléter d'autres parties du livrable. Comparez ligne par ligne avec votre livrable d'origine.`,
        },
        {
          level: 'trame',
          title: `Gabarit de fiche de parcours`,
          text: `Variante reçue : [...]. Ce qui change : [...]. Ce qui ne change pas : [...]. Usage choisi : [compte rendu / FAQ / fiche de visite / schéma / affiche / courriel]. Outil : [nom ou « sans outil »]. Prompt exact : « ... ». Résultat initial : [copie]. Erreur ou risque détecté : [...]. Correction : [...]. Résultat final : [...]. Éléments du cas utilisés : [R2 V2 du 18/09/2026, ...]. Contrôle 1 : [...]. Contrôle 2 : [...].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (variante horaire)`,
          text: `« Ce qui change : la présence est attendue à 8 h 30 au lieu de 9 h. Ce qui ne change pas : la disponibilité du 28/09, le salaire non communiqué, la mission non confirmée. Erreur détectée : l'outil a écrit que le bus de 8 h 45 convenait encore ; or avec un début à 8 h 30, le trajet doit être revérifié. Correction : ajout d'une action “revérifier le bus” attribuée à la personne accompagnée, échéance 24/09. » — La suite de la fiche est à produire par le participant.`,
        },
      ],
      debrief_questions: [
        `Quelle erreur ou quel risque avez-vous détecté, et comment ?`,
        `Si vous aviez eu une autre variante, votre livrable d'origine aurait-il résisté ?`,
      ],
      fallback: `Sans outil IA : adapter le livrable à la main à partir du document de référence et remplir la même fiche de parcours (le résultat initial est alors la première version manuscrite, et la correction, votre relecture).`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Cas fictif Agence Horizon. Je reprends un livrable produit en atelier et j'intègre un changement précis : [le changement de ma variante].`,
        task: `Adapte le livrable fourni à ce changement, sans modifier le reste.`,
        data: `Mon livrable d'origine et le document fictif de référence : [R… version …].`,
        constraints: `N'invente ni confirmation, ni montant, ni donnée personnelle. Ne modifie que ce qui dépend du changement.`,
        format: `Même format que le livrable d'origine.`,
        controls: `Signale tout élément que tu as dû modifier en dehors du changement demandé. Je comparerai ligne par ligne avec l'original.`,
      },
      levels: {
        guided: `Choisissez le livrable de l'atelier 1 ou de l'atelier 6 (texte court) et suivez le gabarit de fiche de parcours.`,
        autonomous: `Choisissez n'importe quel livrable, y compris le schéma ou l'affiche, et justifiez en deux phrases pourquoi ce livrable est le plus touché par la variante.`,
        bonus: `Indiquez quel second livrable serait aussi affecté par votre variante et ce qu'il faudrait y changer, sans le produire. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'individual',
      families: ['transcription', 'documents', 'recherche', 'schemas', 'images', 'assistants'],
      production_kind: 'individual_challenge',
      variants: [
        {
          id: 'v1',
          title: `L'horaire change`,
          change: `La présence attendue passe de 9 h à 8 h 30 (nouvelle information fictive du client reçue le 23/09/2026). Le bus de 8 h 45 ne convient donc plus : la personne doit revérifier le trajet et l'arrêt.`,
          deliverable_hint: `Compte rendu ou courriel mis à jour : nouvel horaire, action « revérifier le bus » attribuée à la personne accompagnée avec échéance, tout le reste inchangé (salaire non communiqué, mission non confirmée).`,
        },
        {
          id: 'v2',
          title: `La confirmation client manque toujours`,
          change: `Le point de suivi du jeudi 24/09 a lieu, mais le client n'a toujours pas confirmé la mission ni les horaires de la semaine suivante.`,
          deliverable_hint: `Compte rendu du point de suivi ou courriel interne : mission toujours non confirmée, actions reconduites avec une nouvelle échéance, aucune formulation qui laisse croire à une validation.`,
        },
        {
          id: 'v3',
          title: `Le destinataire demande un langage plus simple`,
          change: `La personne accompagnée demande à recevoir les informations de préparation dans un langage plus simple, en phrases courtes, sans termes d'agence.`,
          deliverable_hint: `Version simplifiée du message de suivi, de la FAQ ou de l'affiche : phrases courtes, un fait par phrase, mêmes informations, aucune information ajoutée ni supprimée ; sans revendiquer le label FALC.`,
        },
        {
          id: 'v4',
          title: `La rémunération est communiquée, le trajet pas vérifié`,
          change: `Le client a communiqué la rémunération (le montant figure dans la note fictive remise avec votre variante ; ne l'inventez pas s'il n'y est pas). En revanche, le trajet n'a toujours pas été vérifié par la personne accompagnée.`,
          deliverable_hint: `Compte rendu ou FAQ mis à jour : la rémunération n'est plus « information non disponible » (uniquement si le montant est fourni), le trajet reste « à vérifier » avec un responsable et une nouvelle échéance.`,
        },
        {
          id: 'v5',
          title: `Le point de suivi est déplacé`,
          change: `Le point de suivi du jeudi 24/09 à 10 h est déplacé au vendredi 25/09 à 14 h. Les échéances des actions qui en dépendent doivent être revues.`,
          deliverable_hint: `Tableau d'actions ou courriel mis à jour : nouvelle date du point, échéance de la demande de rémunération recalée « avant le point du 25/09 », les autres échéances (23/09, 24/09) vérifiées une à une.`,
        },
        {
          id: 'v6',
          title: `Une demande de conduite d'engin apparaît`,
          change: `Le client indique qu'une conduite d'engin ponctuelle serait souhaitée, alors que la fiche V2 indique « aucune conduite d'engin » et que rien n'est validé.`,
          deliverable_hint: `Compte rendu, courriel ou schéma mis à jour : l'écart avec la fiche V2 est signalé comme un point à faire valider par le permanent responsable (étape 4 de R4) ; aucune décision n'est prise à la place de la structure, aucune habilitation n'est supposée.`,
        },
      ],
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Attendu par variante (cas fictif Agence Horizon)

### v1 — L'horaire change (9 h → 8 h 30)
- Changement intégré : présence à 8 h 30.
- Action attendue : revérifier le bus et l'arrêt → personne accompagnée → échéance avant le 28/09 (ou 24/09 si le point de suivi est conservé).
- Piège : laisser « bus de 8 h 45 » sans commentaire ; inventer un nouvel horaire de bus.

### v2 — La confirmation client manque toujours
- Changement intégré : au 24/09, mission et horaires non confirmés.
- Attendu : actions reconduites avec nouvelle échéance, formulation « en attente de confirmation ».
- Piège : « la mission devrait être confirmée sous peu » (supposition).

### v3 — Langage plus simple
- Attendu : mêmes informations, phrases courtes, un fait par phrase, vocabulaire courant.
- Piège : simplifier en supprimant les inconnues (« votre mission commence le 28 ») ; revendiquer le label FALC.

### v4 — Rémunération communiquée, trajet non vérifié
- Attendu : rémunération renseignée uniquement avec la valeur fournie par le formateur dans la note fictive ; trajet toujours « à vérifier » avec responsable et échéance.
- Piège : inventer un montant si la note ne le donne pas ; passer le trajet en « vérifié » par contagion.

### v5 — Point de suivi déplacé (25/09 à 14 h)
- Attendu : nouvelle date partout où elle apparaît ; échéance « avant le point » recalée ; les échéances 23/09 et 24/09 conservées si elles ne dépendent pas du point.
- Piège : décaler toutes les dates d'un jour sans raison.

### v6 — Demande de conduite d'engin
- Attendu : écart signalé avec R2 V2 ; point à faire valider par le permanent responsable (R4, étape 4) ; aucune habilitation supposée.
- Piège : écrire « la personne pourra conduire » ou « il faudra une formation » (décision non prise par la structure).

## Deux contrôles acceptables (exemples)
- Comparaison ligne par ligne avec le livrable d'origine.
- Vérification des dates avec R2 V2.
- Recherche des mots « confirmé », « validé », « environ » dans le résultat.
- Relecture par un autre participant.

## Rappel
Le défi est formatif : il atteste une compétence sur la tâche choisie, pas la maîtrise des six familles.`,
      trainer_notes: `## Animation
- Briefing (5 min) : distribuer les variantes (une par participant, répartir les six de façon équilibrée). Pour la variante v4, remettre la note fictive avec le montant, ou indiquer explicitement qu'aucun montant n'est fourni.
- Rappeler que le participant choisit son livrable : ne pas imposer.

## Pièges fréquents
- Participants qui refont tout le livrable : rappeler « un seul changement ».
- Résultat initial non conservé : exiger la copie brute avant correction.
- Contrôles vagues (« j'ai relu ») : demander ce qui a été comparé avec quoi.

## Rythmes différents
- Rapides : bonus (second livrable affecté) ou relecture croisée d'un autre participant.
- Lents : livrable court (courriel de l'atelier 6) et un seul contrôle détaillé, le second en débrief.

## Vérification (10 min)
Faire lire la fiche de parcours par un voisin qui vérifie la présence des sept rubriques et des deux contrôles.`,
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
      objective: `À la fin de la séquence, chaque participant a sélectionné ses productions à conserver, retenu deux ou trois outils adaptés à son poste et rédigé un plan d'application pour un usage à essayer dans la semaine qui suit, avec ses conditions de contrôle et d'arrêt.`,
      brief: `Seul, en trois temps. Portfolio (10 minutes) : parcourez vos dépôts des deux séances et sélectionnez ceux que vous souhaitez conserver comme modèles ; notez pour chacun ce qui le rend réutilisable. Choisissez ensuite deux ou trois outils que vous retenez pour votre poste, en tenant compte des règles de votre structure. Plan d'application (15 minutes) : choisissez un usage à essayer la semaine suivante, de préférence lié à la tâche prioritaire formulée à l'accueil, et remplissez le plan : tâche, fréquence, outil autorisé, données utilisables, contrôle humain, temps habituel estimé, temps observé si vous l'avez déjà testé, bénéfice attendu, condition d'arrêt. Distinguez bien ce qui est mesuré de ce qui est estimé : un temps que vous n'avez pas chronométré est une estimation. La formation ne promet aucun gain automatique ; c'est votre test de la semaine qui dira si l'usage tient. Retour (5 minutes) : tour de table rapide sur l'usage choisi par chacun.`,
      resource_codes: ['R7'],
      steps: [
        `Relire ses dépôts des deux séances et cocher ceux à conserver comme modèles.`,
        `Noter en une phrase, pour chaque production conservée, ce qui la rend réutilisable.`,
        `Choisir deux ou trois outils retenus pour son poste, en vérifiant leur statut d'autorisation dans sa structure.`,
        `Choisir un usage à essayer la semaine suivante, lié si possible à sa tâche prioritaire.`,
        `Remplir le plan d'application : tâche, fréquence, outil autorisé, données utilisables, contrôle humain.`,
        `Indiquer le temps habituel estimé et, séparément, le temps observé si un test a déjà eu lieu ; sinon, laisser « non testé ».`,
        `Formuler le bénéfice attendu et la condition d'arrêt (ce qui vous ferait cesser cet usage).`,
        `Partager son usage choisi au tour de table.`,
      ],
      deliverable: `Un portfolio (productions sélectionnées avec une phrase de justification), une liste de deux ou trois outils retenus, et un plan d'application rempli pour un usage à essayer la semaine suivante.`,
      success_criteria: [
        `Au moins une production est sélectionnée avec une justification précise.`,
        `Deux ou trois outils sont retenus, avec leur statut d'autorisation dans la structure (autorisé, à valider, non autorisé).`,
        `Le plan précise les données utilisables et exclut explicitement les données réelles non autorisées.`,
        `Le contrôle humain est décrit concrètement (qui vérifie quoi, avant quelle action).`,
        `Le temps habituel est marqué « estimé » et le temps observé est renseigné uniquement s'il a été réellement mesuré.`,
        `Une condition d'arrêt est formulée.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Choisir un usage petit et fréquent`,
          text: `Le meilleur usage à tester n'est pas le plus impressionnant, c'est celui que vous ferez vraiment la semaine prochaine : une tâche courte, qui revient plusieurs fois, avec des données que vous avez le droit d'utiliser et un contrôle que vous pouvez faire en quelques minutes. Si vous hésitez entre deux usages, prenez celui dont vous pouvez chronométrer le résultat.`,
        },
        {
          level: 'trame',
          title: `Gabarit de plan d'application`,
          text: `Tâche : [...]. Fréquence : [...]. Outil autorisé : [nom, statut dans ma structure]. Données utilisables : [documents internes validés / informations publiques / aucune donnée personnelle]. Contrôle humain : [qui vérifie quoi, avant quelle action]. Temps habituel : [estimé : … minutes]. Temps observé : [non testé / mesuré le … : … minutes]. Bénéfice attendu : [moins d'allers-retours / première version plus complète / …, sans chiffre promis]. Condition d'arrêt : [si l'outil invente une information, si la vérification prend plus de temps que la rédaction, si la structure change ses règles, …].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple de plan`,
          text: `« Tâche : première version du compte rendu après un entretien de suivi. Fréquence : trois fois par semaine. Outil : l'assistant autorisé par ma structure (statut : autorisé pour les documents sans données personnelles). Données utilisables : mes notes d'entretien sans nom ni coordonnées. Contrôle humain : je vérifie chaque date et chaque mention de confirmation avant d'enregistrer. Temps habituel : estimé. Temps observé : non testé. Condition d'arrêt : si je trouve une invention dans deux comptes rendus de suite, j'arrête et j'en parle à mon responsable. »`,
        },
      ],
      debrief_questions: [
        `Quel usage allez-vous essayer la semaine prochaine, et quel est votre contrôle humain ?`,
        `Qu'est-ce qui vous ferait arrêter cet usage ?`,
        `Qu'est-ce qui vous manque encore dans votre structure pour tester en confiance (autorisation, document à jour, référent) ?`,
      ],
      fallback: `Sans application : plan d'application rempli sur le modèle papier, conservé par le participant ; le formateur peut proposer un rappel à J+7 par le canal habituel de la structure, sans collecte de donnée supplémentaire.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Séquence de bilan sans outil IA.`,
        task: `Choisir un usage à essayer la semaine suivante et remplir son plan d'application.`,
        data: `Mes productions des deux séances et ma tâche prioritaire de l'accueil ; aucune donnée réelle.`,
        constraints: `Aucun gain chiffré promis ; distinguer temps mesuré et temps estimé.`,
        format: `Plan en neuf rubriques.`,
        controls: `Vérifier que les données utilisables excluent les données réelles non autorisées et qu'un contrôle humain est décrit.`,
      },
      levels: {
        guided: `Suivez le gabarit de plan rubrique par rubrique, en partant de votre tâche prioritaire de l'accueil.`,
        autonomous: `Remplissez le plan pour deux usages, puis choisissez celui que vous testerez en premier et expliquez pourquoi.`,
        bonus: `Rédigez en trois lignes ce que vous direz à votre responsable pour présenter ce test de la semaine. Non évalué.`,
      },
      work_mode: 'individual',
      families: [],
      production_kind: 'review',
      deposit_notice: DEPOSIT_NOTICE,
    },
    private_content: {
      answer_key: `## Attendu

Pas de corrigé unique. Un plan est satisfaisant quand :
- l'usage est petit, fréquent et lié à une tâche réelle du poste ;
- l'outil retenu a un statut d'autorisation connu dans la structure ;
- les données utilisables sont décrites et excluent les données réelles non autorisées ;
- le contrôle humain est concret (qui, quoi, avant quelle action) ;
- temps mesuré et temps estimé sont distingués ;
- une condition d'arrêt existe.

## Formulations à corriger
- « Gagner beaucoup de temps » → « réduire les allers-retours sur la première version ; à mesurer la semaine prochaine ».
- « L'outil fait le compte rendu » → « l'outil propose une première version, je vérifie les dates et les confirmations ».
- « Temps observé : 5 minutes » sans test → « non testé ».

## Outils retenus
Deux ou trois, avec statut : autorisé / à valider / non autorisé. Un outil « à valider » peut être retenu à condition que le plan précise qui doit le valider.`,
      trainer_notes: `## Animation
- Tenir les trois temps : 10 / 15 / 5. Le tour de table est volontairement court : une phrase par personne (usage + contrôle).
- Rappeler qu'aucun gain n'est promis : c'est le test de la semaine qui donnera une mesure.

## Pièges fréquents
- Plans ambitieux (trois usages, un nouvel outil non autorisé) : ramener à un usage, un outil autorisé.
- Temps observé rempli sans mesure : demander « quand l'avez-vous chronométré ? ».
- Condition d'arrêt absente : proposer « si l'outil invente une information déterminante ».

## Rythmes différents
- Rapides : second usage (niveau autonome) ou message au responsable (bonus).
- Lents : portfolio limité à une production, plan rempli avec le gabarit.

## Suite
Si la structure le prévoit, un rappel à J+7 peut être envoyé par le canal habituel pour demander si le test a eu lieu et ce qui a été observé (sans donnée réelle).`,
    },
  },
];

export const TOTAL_MINUTES = WORKSHOPS.reduce((s, w) => s + w.duration_min, 0);

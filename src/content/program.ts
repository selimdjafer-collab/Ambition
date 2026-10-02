/**
 * Contenu éditorial du programme « Créer sa boîte à outils IA pour agir au
 * quotidien en ETT / ETTI / EATT » — module 2 : construire, tester, déployer.
 *
 * Ce fichier ne contient que des littéraux : il sert de source pour le
 * générateur de seed et pour le mode démo local. Tout le cas pratique est
 * fictif (« Agence Horizon — ETTI fictive, cas pédagogique ») ; aucune donnée
 * réelle n'y figure et aucune ne doit y être ajoutée.
 *
 * Ce module est la suite d'une première formation (module 1) où les
 * participants ont acquis les bases du prompt (contexte, tâche, données,
 * contraintes, format, contrôles), la vigilance sur les données et le réflexe
 * de vérification. Ici, chaque atelier fait construire UN outil réutilisable
 * (instructions permanentes, message type à emplacements, format de sortie,
 * points de vérification, règles de données, secours), testé sur le cas
 * fictif et enregistré dans la boîte à outils de l'application. Le temps
 * observé en atelier reste une mesure sur ce document fictif, jamais une
 * promesse générale.
 */

import type { BreakdownItem, Rubric, WorkshopContent, WorkshopPrivateContent } from '../lib/types';

export const PROGRAM_META = {
  slug: 'boite-a-outils-ia-ett',
  title: `Créer sa boîte à outils IA pour agir au quotidien en ETT / ETTI / EATT — module 2 : construire, tester, déployer`,
  description: `Deuxième module de deux séances (7 heures au total) conçu pour les permanents d'entreprises de travail temporaire d'insertion (ETTI), et ouvert aux équipes des ETT et des EATT. Il fait suite au module 1, où les participants ont acquis les bases : écrire un prompt complet (contexte, tâche, données, contraintes, format, contrôles), décider ce que l'on peut transmettre à un outil externe, et vérifier chaque sortie avant de s'en servir. Le module 2 ne réexplique pas ces bases : il les met au service d'un objectif unique, construire sa boîte à outils IA et la déployer dans son activité. Une ETTI fait de l'intérim d'insertion : son quotidien est celui d'une agence d'intérim (prise de commande d'une entreprise utilisatrice, sourcing et proposition de candidats éligibles à l'IAE avec un PASS IAE, délégation par contrat de mission et contrat de mise à disposition, accueil sécurité, suivi de mission avec relevés d'heures, incidents, renouvellements et fins de mission, relation commerciale et clauses d'insertion, reporting), auquel s'articule l'accompagnement socioprofessionnel pour lever les freins et tenir la mission, avec des points d'étape auprès du prescripteur, dans un parcours de 24 mois maximum. Ses permanents y refont chaque semaine les mêmes écrits : compte rendu d'entretien de suivi en mission, réponses aux questions récurrentes sur une mission, fiche de visite ou de rendez-vous commercial avec une entreprise utilisatrice, schéma du parcours d'accueil, support d'agence, courriel de préparation de délégation. Pour chacun de ces écrits, un atelier fait partir d'un modèle d'outil, l'adapter à sa structure, le tester sur le cas fictif unique (Agence Horizon, ETTI fictive, et son entreprise utilisatrice fictive Atelier Horizon Logistique), le vérifier avec la grille, le corriger, puis l'enregistrer dans la boîte à outils de l'application avec sa fiche complète : instructions permanentes, message type avec emplacements, format de sortie, points de vérification, règles de données, solution de secours. La règle ne change pas : l'outil propose, le permanent vérifie, décide et reste responsable ; une confirmation d'entreprise utilisatrice, une rémunération ou une date ne s'inventent jamais, et aucune donnée réelle n'entre dans un outil. Le module se termine par la mise au propre de la boîte à outils et un plan de déploiement à tester dans l'agence la semaine suivante.`,
  prerequisites: `Avoir suivi le module 1 (ou une formation équivalente) et en maîtriser les bases : écrire un prompt complet avec ses six parties (contexte, tâche, données, contraintes, format, contrôles), distinguer ce qui peut être transmis à un outil externe de ce qui ne le peut pas (nom d'un salarié en parcours d’insertion, PASS IAE, santé, salaire individuel), et vérifier une sortie d'outil en la comparant au document source. Savoir utiliser un ordinateur, un navigateur et une messagerie. Disposer d'un accès aux outils autorisés par sa structure, ou utiliser les solutions de secours prévues. Connaître le fonctionnement de l'intérim d'insertion dans sa structure (commande, délégation, contrat de mission, suivi de mission, relevé d'heures, fin de mission, lien avec les prescripteurs). Venir avec, en tête, deux ou trois écrits répétés de son poste que l'on voudrait outiller (aucun dossier réel n'est apporté ni utilisé).`,
  audience: `Permanents d'ETTI : chargés d'insertion et conseillers en insertion professionnelle, chargés de recrutement et de mise à disposition, responsables d'agence, assistants administratifs et commerciaux. Ouvert aux équipes des ETT et des EATT qui exercent des fonctions comparables (recrutement, relation entreprise, accompagnement, administration d'agence).`,
  editorial_reference: 'Septembre 2026',
  verification_date: '2026-10-01',
};

export const PROGRAM_OBJECTIVES: string[] = [
  `Construire, tester et déployer un outil « compte rendu de suivi → plan d'action » qui transforme une transcription ou des notes d'entretien de suivi en compte rendu fidèle et en tableau action / responsable / échéance, sans inventer de fait, de date, de rémunération ni de confirmation d'entreprise utilisatrice.`,
  `Construire, tester et déployer un outil « mes documents répondent avec leurs sources » qui répond aux questions récurrentes sur une mission à partir des documents de l'agence, cite le document, la version et le passage, et écrit « information non disponible » quand l'information manque ou que des versions se contredisent.`,
  `Construire, tester et déployer un outil « fiche de visite sourcée » qui prépare une visite d'entreprise utilisatrice (ou un rendez-vous avec un facilitateur de clauses sociales) à partir de sources publiques consultées et datées, en séparant faits, hypothèses commerciales et questions à poser.`,
  `Construire, tester et déployer un outil « procédure → schéma fidèle » qui représente le parcours d'accueil IAE de l'agence sans modifier ses étapes, son ordre ni le point de validation du permanent responsable, pour l'expliquer à un salarié en parcours d’insertion.`,
  `Construire, tester et déployer un outil « support d'agence clair et inclusif » qui produit un texte accessible et une illustration non stéréotypée pour les salariés en parcours d’insertion, avec contrôle du texte, des visuels et des droits d'usage.`,
  `Construire un outil « courriel de préparation de mission », le tester sur deux assistants avec la même fiche de mission, et en tirer une règle de choix d'assistant valable pour sa structure et cette tâche.`,
  `Documenter, pour chaque outil de sa boîte, ce qui est délégué à l'IA et ce qui reste vérifié par le permanent (confirmation de l'entreprise utilisatrice, données du salarié, échéances vis-à-vis du prescripteur), mesurer le temps réellement passé plutôt que l'estimer, et transmettre l'outil à un collègue avec ses limites.`,
];

export const RUBRIC: Rubric = {
  title: `Grille formative commune — évaluer un outil (sur 10)`,
  criteria: [
    {
      key: 'c1',
      label: `Fidélité et absence d'invention dans les sorties de l'outil`,
      description: `Testé sur le cas fictif, l'outil ne produit aucune information inventée : chaque fait, date, montant ou confirmation d'entreprise utilisatrice vient d'un document fourni ou d'une page consultée, et les inconnues sont écrites comme telles. 0 : une sortie contient une information déterminante inventée (mission « confirmée », rémunération, trajet « validé ») que les instructions de l'outil n'empêchent pas. 1 : sorties fidèles avec une imprécision secondaire, ou invention repérée et corrigée dans les instructions. 2 : sorties entièrement fidèles, les inconnues sont nommées et attribuées à un responsable, et les instructions de l'outil l'exigent explicitement.`,
      max: 2,
    },
    {
      key: 'c2',
      label: `Utilité, réutilisabilité et adéquation au destinataire`,
      description: `L'outil répond à une tâche réelle du poste, peut être réutilisé la semaine suivante sans réécrire le prompt (instructions permanentes + message type avec emplacements), et ses sorties conviennent au destinataire visé (salarié en parcours, entreprise utilisatrice, prescripteur, équipe d'agence). 0 : prompt ponctuel non réutilisable ou sortie hors sujet. 1 : outil réutilisable avec des retouches à chaque usage. 2 : fiche complète, emplacements clairs, sorties directement utilisables par un collègue au poste.`,
      max: 2,
    },
    {
      key: 'c3',
      label: `Vérification intégrée`,
      description: `L'outil contient ses propres points de contrôle : l'instruction de signaler les ambiguïtés, la liste des points à vérifier avant réutilisation (dates, responsables, mots de confirmation, passages cités) et la comparaison aux documents sources effectivement réalisée lors du test. 0 : aucun point de vérification, test non comparé aux documents. 1 : des points de vérification existent mais le test n'en applique qu'une partie. 2 : points de vérification écrits dans la fiche, test comparé aux documents du cas, corrections tracées.`,
      max: 2,
    },
    {
      key: 'c4',
      label: `Règles de données du cas et des risques`,
      description: `La fiche de l'outil précise ce qui peut y entrer et ce qui ne le peut jamais (nom d'un salarié en insertion, coordonnées, PASS IAE, santé, RQTH, minimum social, salaire individuel, extrait de la plateforme), seules les ressources fictives ont été utilisées pour le test, et les risques propres à l'outil (recherche web, pièce jointe, hébergement) sont nommés. 0 : une donnée réelle a été transmise ou déposée, ou la fiche ne contient aucune règle de données. 1 : règles présentes mais incomplètes ou risques non nommés. 2 : règles complètes, cohérentes avec la charte du défi, risques nommés et validation nécessaire dans la structure identifiée.`,
      max: 2,
    },
    {
      key: 'c5',
      label: `Justification des choix et capacité à expliquer l'outil`,
      description: `Le participant explique pourquoi l'outil est construit ainsi (chaque règle des instructions renvoie à un piège rencontré), l'outil utilisé est autorisé par la structure ou la solution de secours est assumée, et la fiche permet à un collègue d'agence de reprendre l'outil sans explication orale. 0 : outil non autorisé, ou fiche inexploitable par un tiers. 1 : justification partielle ou fiche qui suppose des explications orales. 2 : choix justifiés, outil autorisé ou secours assumé, fiche transmissible telle quelle.`,
      max: 2,
    },
  ],
  pass_threshold: 7,
  min_on_criteria: [
    { key: 'c1', min: 1 },
    { key: 'c4', min: 1 },
  ],
  note: `Le seuil de 7/10 et les minimums sur « Fidélité et absence d'invention » et « Règles de données » sont un choix pédagogique de l'équipe de formation, modifiable par le formateur selon le groupe. Ils ne constituent pas une norme légale ni une certification. Quelle que soit la note, une divulgation de donnée réelle ou une sortie d'outil contenant une information déterminante inventée (confirmation d'entreprise utilisatrice, montant, date, règle) empêche de déclarer l'outil « prêt à proposer » tant que ses instructions et son test ne sont pas corrigés. Le temps observé en atelier n'entre pas dans la note : c'est une mesure pour le participant, pas un critère.`,
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

const DEPOSIT_NOTICE = `Rappel avant dépôt : utilisez uniquement les ressources fictives de la formation (Agence Horizon, ETTI fictive). Ne déposez jamais de dossier réel de salarié en parcours d’insertion, d'identifiant PASS IAE, de numéro de sécurité sociale, de coordonnées personnelles, de mention de santé ou de RQTH, de montant de salaire individuel ni d'extrait de la plateforme « Les emplois de l'inclusion », même partiellement masqués. La fiche enregistrée dans votre boîte à outils ne doit contenir aucune donnée réelle non plus : ses emplacements {{...}} restent vides.`;

const TIME_NOTICE = `Le temps noté dans le champ « Temps sur cette tâche » (adaptation de l'outil, attente, lecture, vérification et corrections) est une mesure de ce test sur un document fictif, pas une promesse générale de gain ; il sera comparé au temps d'un second usage de l'outil, pas au temps habituel estimé seulement.`;

const TOOLBOX_NOTICE = `Enregistrez l'outil avec le bouton « Enregistrer dans ma boîte à outils » : la fiche est préremplie à partir du modèle de départ, vous y reportez vos adaptations, le test effectué et le temps observé.`;

export const WORKSHOPS: WorkshopSeed[] = [
  // ---------------------------------------------------------------------
  // SÉANCE 1
  // ---------------------------------------------------------------------
  {
    code: 'ACC',
    title: `Accueil, bilan du module 1 et choix des outils à construire`,
    seance: 1,
    position: 1,
    duration_min: 20,
    breakdown: [
      { label: 'Instructions', minutes: 8 },
      { label: 'Positionnement actif', minutes: 12 },
    ],
    content: {
      objective: `À la fin de cette séquence, chaque participant a fait le bilan de ce qu'il a réellement utilisé depuis le module 1, a identifié deux ou trois écrits répétés de son poste en ETTI à outiller, a choisi l'outil qu'il veut absolument repartir avec, et sait comment fonctionne la boîte à outils de l'application.`,
      brief: `Bienvenue dans le module 2. Pendant huit minutes, le formateur rappelle ce que le module 1 a posé et que l'on ne réexpliquera pas (le prompt en six parties, la règle des données, la vérification contre la source), puis présente ce qui change : chaque atelier de ce module fait construire un outil, c'est-à-dire un jeu d'instructions permanentes et un message type avec des emplacements {{comme_ceci}}, que l'on teste sur le cas fictif Agence Horizon (ETTI fictive, sa conseillère en insertion, un salarié intérimaire en parcours d’insertion et l'entreprise utilisatrice fictive Atelier Horizon Logistique), que l'on vérifie avec la grille, que l'on corrige, puis que l'on enregistre dans sa boîte à outils avec une fiche complète. Le formateur montre l'écran de la boîte à outils, le bouton « Enregistrer dans ma boîte à outils » qui préremplit la fiche depuis le modèle de départ, et les statuts d'un outil (en construction, testé sur le cas fictif, prêt à proposer, validé par le formateur). Le lexique ETTI (R10) reste disponible. Pendant les douze minutes suivantes, vous remplissez seul votre positionnement de module 2 : ce que vous avez réellement essayé depuis le module 1 (sans donnée réelle de salarié, d'entreprise utilisatrice ou de prescripteur), ce qui a tenu et ce qui a été abandonné, les deux ou trois écrits répétés de votre poste que vous voudriez outiller, dans le quotidien de l'intérim d'insertion : reformuler une commande d'entreprise utilisatrice (poste, horaires, durée, compétences, EPI, accès), préparer une délégation (courriel interne avant contrat de mission et contrat de mise à disposition), rédiger le compte rendu de suivi en mission, traiter un relevé d'heures ou un incident, préparer un renouvellement ou une fin de mission, préparer une visite de prospection ou un rendez-vous clause d'insertion, préparer le point d'étape prescripteur, répondre aux questions récurrentes sur une mission, mettre en forme un support d'agence, renseigner le reporting, et l'outil que vous voulez absolument avoir dans votre boîte en partant. Pour cet outil, indiquez qui l'utiliserait dans l'agence et à quelle condition.`,
      resource_codes: ['R7', 'R10'],
      steps: [
        `Écouter le rappel des acquis du module 1 et la présentation du principe « un atelier = un outil enregistré » ; noter une question éventuelle.`,
        `Regarder la démonstration de la boîte à outils : fiche d'outil, bouton d'enregistrement, statuts, historique des versions et tests.`,
        `Relire la règle des données (ressources fictives uniquement, aucune donnée réelle dans un outil ni dans une fiche) et confirmer qu'elle est comprise.`,
        `Écrire ce que l'on a essayé depuis le module 1, ce qui a tenu et ce qui a été abandonné, et pourquoi.`,
        `Lister deux ou trois écrits répétés de son poste en ETTI (ou ETT / EATT) que l'on voudrait outiller, en une phrase chacun commençant par un verbe.`,
        `Choisir l'outil prioritaire : celui que l'on veut absolument avoir dans sa boîte en partant, avec son utilisateur dans l'agence et la condition de son usage.`,
        `Vérifier que chaque écrit listé peut être outillé et testé sans aucune donnée personnelle réelle.`,
      ],
      deliverable: `Une fiche de positionnement de module 2 : bilan d'usage depuis le module 1 (ce qui a tenu, ce qui a été abandonné), deux ou trois écrits répétés à outiller, l'outil prioritaire avec son utilisateur dans l'agence et sa condition d'usage, et la confirmation de la règle des données.`,
      success_criteria: [
        `Le bilan cite au moins un usage réel tenté depuis le module 1 (ou dit explicitement « aucun ») et une raison d'abandon ou de maintien.`,
        `Les écrits à outiller sont formulés en une phrase avec un verbe d'action et un destinataire (salarié en parcours, entreprise utilisatrice, prescripteur, équipe), et sont répétés dans le poste.`,
        `L'outil prioritaire est nommé, avec qui l'utiliserait dans l'agence et à quelle condition (autorisation, données, contrôle).`,
        `Chaque écrit listé est testable en formation avec les seules ressources fictives.`,
        `Le participant a confirmé la règle « ressources fictives uniquement, aucune donnée réelle dans une fiche d'outil ».`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Quel écrit refais-tu presque à l'identique chaque semaine ?`,
          text: `Pour trouver un outil utile, cherchez l'écrit dont la structure ne change pas mais dont le contenu change : la reformulation d'une commande, le courriel interne avant chaque délégation, le compte rendu après chaque entretien de suivi en mission, le message de fin de mission, le point d'étape pour chaque prescripteur. Si vous pouvez dire « à chaque fois je mets les mêmes rubriques et je vérifie les mêmes choses », c'est un bon candidat : les rubriques deviennent le format de sortie, les vérifications deviennent les points de contrôle de l'outil.`,
        },
        {
          level: 'trame',
          title: `Squelette de positionnement`,
          text: `Depuis le module 1, j'ai essayé : [rien / un prompt pour …]. Ce qui a tenu : [...]. Ce qui a été abandonné : [...] parce que [vérification trop longue / invention / outil non autorisé / données]. Écrit répété 1 : « [verbe] + [objet] + [pour qui] », fréquence [...]. Écrit répété 2 : [...]. Écrit répété 3 : [...]. Outil prioritaire : [nom court de l'outil]. Qui l'utiliserait dans l'agence : [moi / mon binôme / l'assistant administratif / tous les chargés d'insertion]. À quelle condition : [outil autorisé par …, données sans nom ni PASS IAE, vérification de … avant envoi].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (cas fictif)`,
          text: `« Depuis le module 1, j'ai essayé un prompt de compte rendu sur mes notes sans nom ; abandonné au bout de deux semaines parce que je retapais tout le prompt à chaque fois. Écrit répété 1 : rédiger le compte rendu de suivi avec le tableau d'actions, pour le point d'étape prescripteur. Outil prioritaire : “Compte rendu de suivi → plan d'action”. Qui l'utiliserait : les trois chargés d'insertion de l'agence. Condition : instructions permanentes dans l'assistant autorisé, notes sans nom ni santé, vérification des dates et des confirmations avant enregistrement dans la fiche salarié. » — La suite de la fiche est à produire par le participant.`,
        },
      ],
      debrief_questions: [
        `Pourquoi les prompts du module 1 ont-ils été abandonnés dans le groupe : trop longs à retaper, inventions, outil non autorisé, données ? Qu'est-ce qu'un outil enregistré changerait à chacun de ces cas ?`,
        `Quel outil prioritaire revient le plus souvent ? Qui, dans une agence, l'utiliserait, et à quelle condition ?`,
      ],
      fallback: `Si l'application n'est pas accessible, la fiche de positionnement est remplie sur papier (modèle imprimé par le formateur) et recopiée plus tard ; la boîte à outils est présentée à partir d'une capture d'écran et les fiches d'outils de la séance sont tenues sur le modèle papier jusqu'au retour de l'application.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Je suis permanent(e) dans une ETTI (ou ETT / EATT) sur le poste de [poste]. J'ai suivi le module 1.`,
        task: `Je cherche à nommer les écrits répétés de mon poste que je veux transformer en outils réutilisables.`,
        data: `Aucune donnée réelle : uniquement la description de mes tâches.`,
        constraints: `Pas de nom de salarié en insertion, pas d'entreprise utilisatrice réelle, pas de prescripteur nommé.`,
        format: `Un bilan, deux ou trois écrits en une phrase, un outil prioritaire avec son utilisateur et sa condition.`,
        controls: `Je vérifie que chaque écrit est testable en formation avec des ressources fictives.`,
      },
      levels: {
        guided: `Suivez les sept étapes dans l'ordre et utilisez le squelette de positionnement ; choisissez votre outil prioritaire parmi les six outils du module.`,
        autonomous: `Rédigez directement votre bilan et vos écrits à outiller, puis décrivez votre outil prioritaire avec ses règles de données avant même l'atelier 1.`,
        bonus: `Notez un écrit de votre poste que vous n'outilleriez jamais (annonce d'une fin de parcours, échange sur une situation de santé, réponse à un prescripteur sur une situation administrative) et dites en une phrase pourquoi. Cette note n'est pas évaluée.`,
      },
      work_mode: 'individual',
      families: [],
      production_kind: 'text',
      deposit_notice: DEPOSIT_NOTICE,
      job_context: {
        task: `Choisir quels écrits répétés de son poste en intérim d'insertion (commande, délégation, suivi de mission, relevés d'heures, fin de mission, prospection, point prescripteur) deviendront des outils pendant le module, pour quelle tâche, et qui les utilisera dans l'agence.`,
        time_sinks: `Après une première formation, les prompts restent dans un fichier ou une conversation : on les retape, on les perd, on les adapte de mémoire ; sans fiche d'outil, chacun refait le travail de cadrage et de vérification à chaque usage.`,
        delegable: `Rien à ce stade : le choix des outils se fait sans assistant. Un assistant pourra plus tard aider à reformuler un écrit trop large en tâche précise.`,
        must_verify: `Que chaque écrit choisi est réel, répété, outillable sans donnée de salarié, d'entreprise utilisatrice ou de prescripteur, et qu'un utilisateur dans l'agence et une condition d'usage sont identifiés.`,
        why_etti: `Une ETTI tient à la fois une agence d'intérim (commandes, délégations, missions à suivre, clients à fidéliser) et un accompagnement de parcours d’insertion : les mêmes écrits reviennent pour le salarié, l'entreprise utilisatrice et le prescripteur, sur des missions courtes ; outiller trois écrits bien choisis vaut mieux que tester l'IA sur tout.`,
      },
    },
    private_content: {
      answer_key: `## Attendu

Il n'y a pas de bonne réponse unique. Une fiche est satisfaisante quand :

- le bilan depuis le module 1 est honnête (un « rien essayé » assumé vaut mieux qu'un usage inventé) et nomme une raison précise ;
- les écrits à outiller sont précis (verbe + objet + destinataire), répétés, et testables sans donnée réelle ;
- l'outil prioritaire a un utilisateur dans l'agence et une condition d'usage ;
- le participant a compris que la fiche d'outil ne contient jamais de donnée réelle.

## Exemples d'outils prioritaires bien formulés (par poste)

- Chargé d'insertion / CIP : « Compte rendu de suivi → plan d'action », utilisé par les chargés d'insertion, à condition de notes sans nom et de vérification des confirmations avant enregistrement.
- Chargé de recrutement et de mise à disposition : « Courriel de préparation de délégation », utilisé par le binôme recrutement / administratif avant le contrat de mission et le contrat de mise à disposition, à condition de ne jamais annoncer une commande comme confirmée ni de nommer un candidat.
- Tout poste d'agence : « Commande → fiche de mission », qui reformule une prise de commande (poste, horaires, durée, compétences, EPI, accès) en points connus et points à confirmer avec l'entreprise utilisatrice (à construire au défi individuel ou après le module).
- Responsable d'agence : « Fiche de visite sourcée », utilisée avant chaque visite d'entreprise utilisatrice ou rendez-vous facilitateur, à condition d'ouvrir chaque page citée.
- Assistant administratif / commercial : « Mes documents répondent avec leurs sources », utilisé pour les questions récurrentes, à condition de fiches de mission à jour dans l'outil.
- Tout poste : « Procédure → schéma fidèle », à chaque nouvelle version de la procédure d'accueil.

## Raisons d'abandon fréquentes et réponse du module

- « Je retapais le prompt » → instructions permanentes + message type (ateliers 1 à 6).
- « L'outil inventait » → règles et interdits dans les instructions, points de vérification dans la fiche.
- « Je ne savais pas ce que j'avais le droit de coller » → charte de données (défi).
- « Personne d'autre ne pouvait s'en servir » → fiche transmissible, test documenté (défi individuel, bilan).`,
      trainer_notes: `## Animation

- Tenir les 8 minutes : ne pas réexpliquer le prompt en six parties ; le citer comme acquis et renvoyer au module 1 si quelqu'un l'a oublié (le constructeur de prompt de l'application reste disponible).
- Montrer la boîte à outils une fois pour de vrai : ouvrir un atelier, cliquer sur « Enregistrer dans ma boîte à outils », montrer la fiche préremplie, les champs à adapter, la zone de test et les statuts. C'est ce geste que les participants referont six fois.
- Insister sur « aucune donnée réelle dans une fiche d'outil » : les emplacements {{...}} restent vides dans la fiche ; les données entrent seulement au moment de l'usage, dans l'outil autorisé.
- Annoncer que l'outil prioritaire choisi ici sera repris au défi individuel (finalisation) et au bilan (plan de déploiement).

## Pièges fréquents

- Participants qui veulent « un outil qui fait tout » : demander le premier écrit concret de la semaine.
- Bilans embellis depuis le module 1 : accueillir les « rien essayé » ; c'est souvent faute d'outil réutilisable, et c'est l'objet du module.
- Participants qui ont testé entre les deux modules sur des données réelles : rappeler la règle sans juger, ne pas afficher le résultat.
- Promesses de gain entendues ailleurs : ne pas les reprendre ; chacun mesurera sur son outil.

## Rythmes différents

- Personnes rapides : bonus (un écrit à ne jamais outiller) ou commencer à écrire les règles de données de leur outil prioritaire.
- Personnes en difficulté : partir des six outils du module et en choisir un ; reporter la liste des écrits à la séance 2.`,
    },
  },

  {
    code: 'DEF',
    title: `Défi : la charte de données de mes outils`,
    seance: 1,
    position: 2,
    duration_min: 20,
    breakdown: [
      { label: 'Consignes', minutes: 5 },
      { label: 'Tri et justification', minutes: 15 },
    ],
    content: {
      objective: `À la fin du défi, chaque binôme a reclassé huit types d'informations rencontrées en intérim d'insertion en trois catégories (transmissible à un outil IA externe, à ne pas transmettre, selon conditions), a justifié chaque choix, et en a tiré une charte de données réutilisable : un bloc de règles à coller dans les instructions de chacun de ses outils, enregistré dans sa boîte à outils.`,
      brief: `Vous connaissez le tri depuis le module 1 ; ici, le livrable n'est plus le tri lui-même, c'est la charte qui en découle. En binôme, vous recevez les huit cartes : une procédure publique d'accueil, une fiche métier publique, le nom d'un salarié en parcours d’insertion, un numéro de téléphone personnel, un numéro administratif (PASS IAE, sécurité sociale), un renseignement de santé (RQTH, arrêt maladie), un montant de salaire individuel, une description non identifiante d'une tâche de mission. Reclassez-les rapidement en trois colonnes (transmissible, à ne pas transmettre, selon conditions) avec une justification courte par carte et, pour les cartes conditionnelles, l'autorisation, la finalité et la protection nécessaires. Puis transformez ce tri en charte de données de vos outils : une liste de règles rédigées à l'impératif, courtes, que vous collerez telles quelles dans les instructions permanentes de chaque outil construit dans ce module (« N'utilise jamais… », « Si un nom apparaît, remplace-le par… », « Écris “information non disponible” plutôt que… »), et un rappel d'une ou deux lignes à placer en tête de chaque message. Pensez aux données propres à l'intérim d'insertion : relevés d'heures nominatifs, contrats de mission, incidents en mission, extraits de la plateforme « Les emplois de l'inclusion », coordonnées des interlocuteurs de l'entreprise utilisatrice. Rappel : remplacer un nom par une initiale n'anonymise pas (l'agence, la date, la mission et le parcours suffisent souvent à retrouver la personne), et un consentement obtenu ne règle pas tout. Vous avez quinze minutes ; enregistrez la charte dans votre boîte à outils avec le bouton prévu (le modèle de départ est prérempli, vous l'adaptez à votre structure) et notez dans le champ « Temps sur cette tâche » le temps que le tri et la rédaction vous ont pris : c'est une mesure de cet exercice, pas une promesse. Cette charte sera réutilisée dans tous les ateliers suivants.`,
      resource_codes: ['R7', 'R10'],
      steps: [
        `Partir du modèle de départ « Charte de données de mes outils » affiché dans l'atelier et lire les huit cartes.`,
        `Classer chaque carte dans l'une des trois colonnes (transmissible, à ne pas transmettre, selon conditions) avec une justification courte.`,
        `Pour chaque carte « selon conditions », préciser l'autorisation, la finalité et la protection nécessaires.`,
        `Adapter le modèle de charte à sa structure : reformuler chaque règle à l'impératif, ajouter les données propres à son agence (relevés d'heures, contrats de mission, incidents, interlocuteurs de l'entreprise utilisatrice, plateforme).`,
        `Tester la charte sur le cas fictif : relire la transcription R1 ou la fiche R2 et vérifier que chaque élément sensible qui pourrait y figurer est couvert par une règle.`,
        `Vérifier avec la grille (critère « règles de données ») qu'aucune règle ne repose sur « il suffit d'enlever le nom » ni sur « la personne est d'accord », corriger.`,
        `Enregistrer la charte dans sa boîte à outils avec sa fiche complète (règles, rappel de tête de message, qui valide dans la structure) et noter le temps observé.`,
      ],
      deliverable: `Le tri des huit cartes en trois catégories avec une justification par carte + la charte de données enregistrée dans la boîte à outils : règles à coller dans les instructions de chaque outil, rappel de tête de message, autorisation / finalité / protection pour les cas conditionnels, et le nom de la personne ou fonction qui valide dans la structure + le temps observé.`,
      success_criteria: [
        `Les huit cartes sont classées et justifiées ; le numéro administratif (PASS IAE, sécurité sociale) et le renseignement de santé (RQTH, arrêt maladie) ne sont pas « transmissibles ».`,
        `La charte contient au moins six règles à l'impératif, courtes, collables telles quelles dans les instructions d'un outil, dont une règle sur les relevés d'heures ou contrats de mission nominatifs et une sur les interlocuteurs de l'entreprise utilisatrice.`,
        `Le rappel de tête de message tient en deux lignes et nomme ce que le message ne contient pas.`,
        `Aucune règle ne repose sur « enlever le nom suffit » ni sur « la personne est d'accord » ; la charte dit qui, dans la structure, valide un usage incertain.`,
        `La charte est enregistrée dans la boîte à outils, sans aucune donnée réelle, et le temps observé est renseigné.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Cette information, combinée à l'agence et à la date, désigne-t-elle quelqu'un ?`,
          text: `Pour chaque carte et pour chaque donnée de votre agence, posez trois questions : 1) seule ou combinée (agence, date, mission, entreprise utilisatrice, relevé d'heures), permet-elle de reconnaître une personne ? 2) est-elle particulièrement protégée (santé, RQTH, situation administrative, ressources, minimum social) ? 3) l'outil est-il validé par ma structure pour cet usage ? Si « oui » à la première ou à la deuxième, la règle de la charte doit l'interdire ou la conditionner, et dire par quoi la remplacer dans le message (« le salarié », « l'entreprise utilisatrice », « information non disponible »).`,
        },
        {
          level: 'trame',
          title: `Squelette de charte`,
          text: `Règles à coller dans chaque outil : 1. N'utilise jamais [nom, coordonnées, PASS IAE, numéro de sécurité sociale, santé, RQTH, minimum social, salaire individuel] ; si l'un apparaît dans le texte fourni, [remplace-le par … / signale-le et arrête]. 2. Désigne les personnes par [leur rôle : le salarié en parcours, la conseillère, l'interlocuteur de l'entreprise utilisatrice]. 3. N'ajoute aucune information absente du texte fourni ; écris [« information non disponible »]. 4. Ne reprends pas [relevés d'heures nominatifs / extraits de contrat de mission / captures de la plateforme] : [règle]. 5. Pour les données « selon conditions » : [autorisation par …, finalité …, protection …]. 6. En cas de doute : [qui valide dans ma structure]. Rappel de tête de message : « Ce message ne contient [aucun nom, …]. Les informations manquantes restent manquantes. »`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple de règle (cas fictif)`,
          text: `« Règle 4 : ne reprends jamais un relevé d'heures ou un contrat de mission tel quel ; seuls le poste, les horaires de la fiche de mission et les points à confirmer avec l'entreprise utilisatrice peuvent être fournis, sans nom ni numéro. Règle 6 : si une information de santé ou de RQTH figure dans le texte fourni, ne la reformule pas, ne la résume pas, signale “mention à retirer avant usage” et arrête. » Rappel de tête de message : « Ce message ne contient aucun nom, aucun numéro, aucune donnée de santé ni de salaire individuel ; tout est fictif ou non identifiant. » — Les autres règles sont à produire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Sur quelle carte les binômes ne sont-ils pas d'accord ? Qu'est-ce qui change la réponse, et comment la charte le dit-elle ?`,
        `Quelle règle de votre charte empêche concrètement une invention ou une fuite (relevé d'heures, contrat de mission, santé) ? Que fait l'outil quand la règle est enfreinte dans le texte fourni ?`,
        `Qui, dans votre structure, valide un usage incertain, et où la charte sera-t-elle lisible par vos collègues ?`,
      ],
      fallback: `Les huit cartes sont imprimées ; le tri se fait sur table avec trois zones et des post-it. La charte est rédigée sur le modèle papier de fiche d'outil et recopiée dans la boîte à outils dès que l'application est disponible ; le formateur photographie ou recopie le résultat de chaque binôme pour le débrief.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Défi sans outil IA : la charte s'écrit à la main, puis se colle dans chaque outil.`,
        task: `Classer huit types d'information rencontrés en intérim d'insertion et en tirer les règles de données de mes outils.`,
        data: `Les huit cartes fictives du défi, aucune donnée réelle.`,
        constraints: `Aucune donnée réelle, aucune carte sans justification, aucune règle fondée sur « enlever le nom suffit ».`,
        format: `Trois colonnes, puis une charte de six règles minimum et un rappel de tête de message.`,
        controls: `Vérifier que les cartes identifiantes ou particulièrement protégées (santé, RQTH, PASS IAE, salaire) ne sont pas « transmissibles » sans conditions, et que chaque règle est collable dans un outil.`,
      },
      levels: {
        guided: `Utilisez les trois questions de l'indice pour chaque carte, puis le squelette de charte ; adaptez surtout les règles 4 à 6 à votre structure.`,
        autonomous: `Classez les huit cartes, puis rédigez votre charte sans le squelette, en partant des données que vous manipulez réellement en agence (commande, délégation, suivi de mission, reporting).`,
        bonus: `Ajoutez une neuvième carte issue de votre quotidien en intérim d'insertion (sans donnée réelle : « relevé d'heures signé », « motif de fin de mission », « capture de la plateforme des emplois de l'inclusion », « fiche d'incident en mission ») et écrivez la règle correspondante. Non évalué.`,
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
          detail: `Le prénom et le nom d'un salarié intérimaire en parcours d’insertion délégué par l'agence (dans le cas fictif : la personne reçue le 21/09/2026 par la conseillère). Même avec une initiale à la place du nom : être nommé dans un document d'ETTI révèle à lui seul un parcours IAE.`,
        },
        {
          id: 'c4',
          label: `Numéro de téléphone personnel`,
          detail: `Le numéro de téléphone personnel d'un salarié en parcours, noté dans sa fiche pour le joindre avant une mission ou en cas de changement d'horaire par l'entreprise utilisatrice.`,
        },
        {
          id: 'c5',
          label: `Numéro administratif (PASS IAE, sécurité sociale)`,
          detail: `Un numéro administratif individuel : identifiant PASS IAE délivré via la plateforme « Les emplois de l'inclusion » ou numéro de sécurité sociale figurant dans un dossier d'embauche, un contrat de mission ou un relevé d'heures.`,
        },
        {
          id: 'c6',
          label: `Renseignement de santé (RQTH, arrêt maladie)`,
          detail: `Une mention de santé notée lors d'un entretien, d'un diagnostic socioprofessionnel ou d'un incident en mission : reconnaissance de la qualité de travailleur handicapé (RQTH), arrêt maladie en cours, restriction médicale au port de charges. Même sans le nom de la personne.`,
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
        task: `Fixer une fois pour toutes, dans chaque outil, ce que l'on peut coller dans un assistant externe parmi les informations d'une commande, d'une délégation, d'un suivi de mission et d'un parcours d’insertion.`,
        time_sinks: `En intérim d'insertion, le réflexe « j'anonymise vite fait en enlevant le nom » sur un relevé d'heures, un contrat de mission ou des notes d'entretien coûte du temps après coup : vérifications, reprises, questions au responsable ou au référent données, parfois signalement ; une charte collée dans chaque outil évite de redécider à chaque courriel.`,
        delegable: `Rien dans ce défi : la décision sur les données ne se délègue pas à l'outil. Par la suite, l'outil applique la charte (il refuse ou signale), mais c'est le permanent qui décide ce qu'il colle.`,
        must_verify: `Que la charte couvre les données propres à l'agence (relevés d'heures, contrats de mission, incidents, interlocuteurs de l'entreprise utilisatrice, plateforme), qu'elle dit par quoi remplacer, qu'elle nomme un valideur, et que les données de santé, de RQTH, de PASS IAE et de salaire restent hors de tout outil externe.`,
        why_etti: `Une ETTI traite à la fois des données de gestion d'intérim (contrats de mission, relevés d'heures, paie, interlocuteurs clients) et des données particulièrement protégées (éligibilité IAE, santé, minima sociaux) ; le simple fait d'être délégué par l'agence révèle un parcours d’insertion : la confidentialité fait partie de la relation de confiance avec le salarié, l'entreprise utilisatrice et le prescripteur.`,
      },
      tool_blueprint: {
        name: `Charte de données de mes outils`,
        family: 'assistants',
        purpose: `Bloc de règles de données à coller dans les instructions permanentes de chaque outil de ma boîte, plus un rappel à placer en tête de chaque message, pour que l'outil refuse ou signale ce qui ne doit jamais lui être transmis.`,
        inputs: `Aucune entrée à l'usage : la charte se colle une fois dans les instructions de chaque outil. Pour l'adapter : les règles internes de ma structure sur les outils autorisés, le nom de la fonction qui valide (responsable d'agence, référent données, direction).`,
        instructions: `Règles de données (à coller dans chaque outil) :
1. N'utilise, ne reformule et ne résume jamais un nom, un prénom, une adresse, un numéro de téléphone, un identifiant PASS IAE, un numéro de sécurité sociale, une donnée de santé ou de RQTH, un minimum social ni un salaire individuel.
2. Si l'un de ces éléments apparaît dans le texte fourni, ne le reproduis pas : écris « mention à retirer avant usage » à sa place et signale-le en fin de réponse.
3. Désigne les personnes par leur rôle uniquement : « le salarié en parcours », « la conseillère », « l'interlocuteur de l'entreprise utilisatrice », « le prescripteur ».
4. Ne reprends jamais un relevé d'heures, un contrat de mission, un contrat de mise à disposition ou un extrait de la plateforme « Les emplois de l'inclusion » tels quels ; seuls le poste, les horaires de la fiche de mission et les points à confirmer peuvent être fournis.
5. N'ajoute aucune information absente du texte fourni : pas de montant, pas d'adresse, pas de date, pas de confirmation d'entreprise utilisatrice. Écris « information non disponible ».
6. Une description de tâche non identifiante est acceptée à condition qu'aucun nom d'agence, de personne ni de date de naissance ne l'accompagne.
7. Ne cherche pas sur le web d'information sur une personne (salarié, dirigeant, interlocuteur) ; les recherches portent sur des entreprises et des secteurs, à partir de pages publiques.
8. Tout ce qui est fourni est fictif ou non identifiant ; si tu as un doute sur une donnée, dis-le plutôt que de l'utiliser.
Validation dans ma structure : [fonction qui valide un usage incertain : responsable d'agence / référent données / direction].`,
        prompt_template: `Rappel en tête de message : ce message ne contient aucun nom, aucun numéro, aucune donnée de santé, de RQTH ni de salaire individuel, aucun relevé d'heures ni extrait de contrat de mission ; les personnes sont désignées par leur rôle ; tout est fictif ou non identifiant. Les informations manquantes doivent rester « information non disponible ». {{message_de_l_outil}}`,
        output_format: `Pas de sortie propre : la charte modifie le comportement des autres outils. Signe visible qu'elle est appliquée : la mention « mention à retirer avant usage » apparaît à la place de toute donnée interdite, et la fin de réponse liste les signalements.`,
        verification: [
          `Coller dans l'outil un texte fictif contenant un prénom et une mention de santé inventés : la sortie doit afficher « mention à retirer avant usage » et le signaler, sans reformuler la donnée.`,
          `Vérifier que les personnes sont désignées par leur rôle dans la sortie.`,
          `Vérifier qu'aucune donnée absente du texte n'a été ajoutée (montant, adresse, date, confirmation).`,
          `Relire la charte avec la liste des huit cartes : chaque carte « à ne pas transmettre » a sa règle.`,
          `Vérifier que la fonction qui valide dans la structure est nommée et que la charte lui a été montrée.`,
        ],
        data_rules: `Jamais : nom, coordonnées, PASS IAE, sécurité sociale, santé, RQTH, minimum social, salaire individuel, relevé d'heures ou contrat de mission nominatif, extrait de la plateforme. Selon conditions (outil validé, pas d'ajout d'éléments identifiants, brouillon relu) : description non identifiante d'une tâche de mission. Transmissible : procédures et fiches métier publiques. Les règles internes de la structure priment sur cette charte.`,
        fallback: `Sans outil : la charte reste une liste de contrôle papier à relire avant tout envoi ou toute saisie dans un outil ; en cas de doute, demander à la fonction qui valide dans la structure avant d'utiliser l'outil.`,
      },
    },
    private_content: {
      answer_key: `## Tri indicatif (à discuter, pas à imposer)

- Procédure publique d'accueil → transmissible. Vérifier que l'extrait est à jour et que l'outil est autorisé.
- Fiche métier publique → transmissible.
- Nom d'un salarié en insertion → à ne pas transmettre. Une initiale ne suffit pas : l'agence, la date, la mission et le parcours permettent souvent de retrouver la personne.
- Numéro de téléphone personnel → à ne pas transmettre.
- Numéro administratif (PASS IAE, sécurité sociale) → à ne pas transmettre ; il reste dans les outils de gestion validés (plateforme, logiciel de paie, contrat de mission).
- Renseignement de santé (RQTH, arrêt maladie) → à ne pas transmettre, même sans le nom.
- Montant de salaire individuel → à ne pas transmettre (ou « selon conditions » très strictes dans un outil interne validé).
- Description non identifiante d'une tâche de mission → selon conditions : outil validé, aucun ajout d'élément identifiant, usage limité à un brouillon relu.

## Charte aboutie (exemple complet, cas fictif)

Règles : 1) jamais de nom, coordonnées, PASS IAE, sécurité sociale, santé, RQTH, minimum social, salaire individuel ; 2) si présent dans le texte fourni → « mention à retirer avant usage » + signalement ; 3) personnes désignées par leur rôle ; 4) jamais de relevé d'heures, de contrat de mission, de contrat de mise à disposition ni d'extrait de plateforme tels quels ; 5) rien d'ajouté, « information non disponible » ; 6) description non identifiante acceptée sans agence, nom ni date de naissance ; 7) aucune recherche web sur une personne ; 8) en cas de doute, le dire. Validation : responsable d'agence ou référent données.
Rappel de tête de message en deux lignes. Sortie attendue au test : un texte fictif contenant « Prénom X, RQTH » ressort avec « mention à retirer avant usage » et un signalement final.

## Pièges

- Charte écrite en généralités (« respecter le RGPD ») : non collable, l'outil n'en fait rien ; exiger des règles opératoires (quoi, remplacer par quoi, signaler comment).
- Règle « enlever le nom » : faire combiner la carte 8 avec le nom de l'agence, la date et « en parcours d’insertion ».
- « La personne est d'accord » : le consentement ne remplace ni la finalité, ni l'outil validé, ni l'information de la personne.
- Relevé d'heures ou contrat de mission « sans le nom » : le numéro, la date et l'entreprise utilisatrice identifient encore ; la règle 4 s'applique.
- Charte sans valideur : en cas de doute, personne ne tranche.

## Ce qu'on ne tranche pas en formation

Le formateur ne se substitue pas au référent données de chaque structure ; la charte est un repère pédagogique, les règles internes priment.`,
      trainer_notes: `## Animation

- 5 minutes de consignes : rappeler que le tri est connu, que le livrable est la charte collable ; montrer le modèle de départ dans l'atelier et le bouton « Enregistrer dans ma boîte à outils ».
- Passer dans les binômes et poser « que fait l'outil quand cette donnée apparaît quand même dans le texte collé ? » : c'est ce qui transforme un principe en règle d'outil.
- Au débrief, lire deux chartes : l'une trop générale, l'autre opératoire ; faire dire au groupe laquelle un assistant peut appliquer.
- Rappeler que la plateforme « Les emplois de l'inclusion », le logiciel de gestion d'intérim et la paie ne sont pas des « outils IA externes » au sens du défi.

## Transformer le tri en outil

- Chaque carte « à ne pas transmettre » devient une règle avec un remplacement (« le salarié en parcours ») ou un signalement.
- Chaque carte « selon conditions » devient une règle avec autorisation, finalité, protection.
- Juger la réutilisabilité : la charte doit pouvoir être collée dans l'outil de l'atelier 1 sans réécriture ; si elle contient « voir avec le responsable » partout, elle n'est pas opératoire.

## Pièges fréquents

- Débat juridique sans fin : recentrer sur « qui, dans votre structure, peut répondre ? » et le faire écrire dans la charte.
- Binômes qui veulent une charte différente par outil : une seule charte, des règles spécifiques éventuelles ajoutées dans chaque outil.

## Rythmes différents

- Binômes rapides : neuvième carte (relevé d'heures signé, motif de fin de mission, fiche d'incident) et sa règle.
- Binômes lents : limiter le tri aux cartes 3, 5, 6, 7, 8 et rédiger quatre règles ; compléter la charte en séance 2 avant le défi individuel.`,
    },
  },

  {
    code: 'A1',
    title: `Atelier 1 — Outil « Compte rendu de suivi et plan d'action »`,
    seance: 1,
    position: 3,
    duration_min: 55,
    breakdown: [
      { label: 'Modèle de départ et démonstration', minutes: 8 },
      { label: 'Production', minutes: 32 },
      { label: 'Vérification', minutes: 10 },
      { label: 'Débrief', minutes: 5 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a construit, testé sur la transcription fictive R1 et enregistré dans sa boîte à outils un outil « Compte rendu de suivi → plan d'action » : instructions permanentes, message type avec emplacements, format de sortie (faits explicites, points à confirmer avec l'entreprise utilisatrice, tableau action / responsable / échéance), points de vérification, règles de données et secours, dont la sortie de test ne contient aucune information inventée, et a noté le temps réellement passé.`,
      brief: `En intérim d'insertion, le compte rendu de suivi en mission est l'écrit qui relie tout : il alimente la fiche salarié, le point avec l'entreprise utilisatrice (horaires, incidents, renouvellement, fin de mission), le point d'étape prescripteur et le reporting. Au module 1, vous l'avez produit une fois avec un prompt ; aujourd'hui vous construisez l'outil qui le produira à chaque entretien. Vous travaillez en binôme sur le cas fictif Agence Horizon : entretien de suivi du 21 septembre 2026 entre une conseillère en insertion et un salarié intérimaire en parcours d’insertion, au sujet d'une mission de préparation manuelle de commandes chez l'entreprise utilisatrice fictive Atelier Horizon Logistique. Le formateur montre d'abord le modèle de départ (instructions permanentes, message type, format) et une sortie brute, puis la vérification d'une phrase douteuse. Ensuite, partez du modèle : adaptez les instructions à votre structure (vos rubriques de fiche salarié, votre vocabulaire, vos interlocuteurs), collez votre charte de données du défi, puis testez l'outil avec le message type en remplaçant {{transcription}} par le texte R1 et {{fiche_mission}} par la fiche V2 (R2, 18/09/2026). Si un outil de transcription est autorisé dans votre structure, le formateur peut le montrer ; sinon, R1 tient lieu de transcription et vous l'indiquez (« transcription fournie »). Le pilote lance le test, le vérificateur compare la sortie ligne par ligne avec R1 et R2 ; à mi-parcours, inversez les rôles. Chaque invention repérée (mission « confirmée », montant « estimé », trajet « validé », horaires de la V1 de R3 repris) devient une règle ou un interdit ajouté aux instructions, puis vous relancez le test. Comparez R3 (V1, ancienne) et R2 (V2) pour vérifier que l'outil retient la version actualisée. Quand la sortie passe les points de vérification de la fiche, enregistrez l'outil dans votre boîte à outils avec sa fiche complète et notez le temps observé (adaptation, test, vérification, corrections) et votre estimation du temps habituel de ce compte rendu au poste.`,
      resource_codes: ['R1', 'R2', 'R3', 'R9'],
      steps: [
        `Lire le modèle de départ (instructions permanentes, message type, format de sortie) et R1 en entier ; surligner dans R1 les faits explicites, les inconnues et les actions convenues ; démarrer le chronomètre.`,
        `Adapter les instructions à sa structure : rubriques du compte rendu, interlocuteurs (entreprise utilisatrice, prescripteur, responsable d'agence), vocabulaire d'agence ; coller la charte de données du défi.`,
        `Tester sur le cas fictif : le pilote envoie le message type avec {{transcription}} = R1 et {{fiche_mission}} = R2 dans l'outil autorisé ; le vérificateur note chaque phrase de la sortie sans source dans R1 ou R2.`,
        `Vérifier avec la grille : fidélité (aucune confirmation, aucun montant, trajet « à vérifier », horaires de la V2), tableau action / responsable / échéance complet, aucune appréciation ni mention de santé.`,
        `Corriger l'outil, pas seulement la sortie : chaque invention repérée devient une règle ou un interdit dans les instructions ; inverser les rôles et relancer le test.`,
        `Comparer R3 (V1) et R2 (V2) et vérifier que l'outil retient la V2 et signale la V1 comme ancienne version.`,
        `Enregistrer l'outil dans sa boîte à outils avec la fiche complète (instructions adaptées, message type, format, points de vérification, règles de données, secours) et le résumé du test.`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche » (adaptation + test + vérification + corrections) et le temps habituel estimé, puis déposer.`,
      ],
      deliverable: `L'outil « Compte rendu de suivi → plan d'action » enregistré dans la boîte à outils avec sa fiche complète + le test sur R1 / R2 : sortie brute initiale, inventions repérées, règles ajoutées, sortie finale (compte rendu de 200 à 300 mots avec tableau de trois actions) + la correction V1 / V2 + le nom de l'outil utilisé (ou « transcription fournie » / « sans outil ») + le temps observé et le temps habituel estimé dans le champ prévu. Ce temps est une mesure de ce test sur un document fictif, pas une promesse générale.`,
      success_criteria: [
        `La sortie finale est fidèle à R1 et R2 : entretien du 21/09, disponibilité lundi 28/09, demande d'horaires à l'entreprise utilisatrice mercredi 23/09, trajet à vérifier au plus tard jeudi 24/09, point de suivi jeudi 24/09 à 10 h, horaires de la V2 ; aucun montant, aucune confirmation, trajet « à vérifier ».`,
        `L'outil est réutilisable : instructions permanentes séparées du message type, emplacements {{transcription}} et {{fiche_mission}} vides dans la fiche, format de sortie fixé (trois rubriques + tableau action / responsable / échéance).`,
        `La vérification est intégrée : les instructions exigent de signaler les ambiguïtés, et la fiche liste au moins quatre points de contrôle (dates, responsables, mots de confirmation, version de la fiche de mission) effectivement appliqués au test.`,
        `Les règles de données de la fiche reprennent la charte du défi : aucune appréciation de personnalité, aucune mention de santé, aucune donnée identifiante ; seules les ressources fictives ont servi au test.`,
        `Au moins une règle des instructions est justifiée par une invention repérée pendant le test, et la fiche est compréhensible par un collègue d'agence qui n'a pas suivi l'atelier.`,
        `Le temps observé et le temps habituel estimé sont renseignés, en précisant si le temps a été réellement chronométré.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Quelle phrase de mes instructions aurait empêché cette invention ?`,
          text: `Relisez la sortie de test et cherchez « confirmé », « validé », « prévu », « sera », « environ ». À chaque mot sans phrase de R1 qui le justifie, ne corrigez pas seulement le texte : demandez-vous quelle règle de vos instructions manquait (« n'écris jamais qu'une mission est confirmée : seule l'entreprise utilisatrice confirme », « si la rémunération n'est pas dans le texte, écris “non communiquée, à demander à l'entreprise utilisatrice” »). Un outil se corrige dans ses instructions, sinon l'invention reviendra au prochain entretien.`,
        },
        {
          level: 'trame',
          title: `Squelette d'instructions permanentes`,
          text: `Rôle : tu aides [une conseillère en insertion / un chargé de recrutement] d'une ETTI (intérim d'insertion) à rédiger des comptes rendus de suivi en mission. Source : uniquement le texte fourni ; « client » désigne l'entreprise utilisatrice. Règles : 1) distingue [faits explicites / points à confirmer / actions convenues] ; 2) n'invente ni [disponibilité, salaire, horaire, confirmation] ; 3) écris [« non communiqué » / « à confirmer auprès de … »] quand l'information manque ; 4) chaque action a [un responsable et une échéance] ; 5) si deux versions de fiche de mission sont fournies, retiens [la plus récente] et signale l'ancienne. Interdits : [appréciation de personnalité, mention de santé, montant, nom]. Format : [rubriques] + tableau | Action | Responsable | Échéance |, [200 à 300 mots]. Contrôle : termine par [la liste des ambiguïtés relevées]. + Charte de données du défi.`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (deux règles et un début de sortie)`,
          text: `Règle 2 de l'outil : « N'écris jamais qu'une mission, un horaire ou un trajet est confirmé ou validé ; seule l'entreprise utilisatrice confirme une commande, et seule une phrase explicite du texte permet de l'écrire. » Règle 3 : « Si la rémunération n'est pas dans le texte, écris “rémunération non communiquée, à demander à l'entreprise utilisatrice” et ajoute l'action au tableau. » Début de sortie attendue sur R1 : « Entretien de suivi du 21/09/2026 (cas fictif). Mission envisagée : préparation manuelle de commandes chez Atelier Horizon Logistique (entreprise utilisatrice fictive), non confirmée à ce stade. Disponibilité à partir du lundi 28/09/2026… » — Le reste des instructions et de la sortie est à produire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Qu'est-ce qui, dans votre outil, empêche désormais l'invention repérée pendant le test (mission confirmée, montant, trajet validé) ? Montrez la règle.`,
        `Quel contrôle gardez-vous à chaque usage, même avec l'outil corrigé : les dates, les responsables, le mot « confirmé », la version de la fiche de mission ?`,
        `Qui, dans votre agence, pourrait utiliser cet outil (chargés d'insertion, chargés de recrutement pour le suivi de mission), et à quelle condition (notes sans nom, outil autorisé, vérification avant la fiche salarié et le point prescripteur) ?`,
      ],
      fallback: `Sans outil IA : le binôme rédige à la main les instructions permanentes et le message type sur le modèle de fiche, produit le compte rendu à partir de R1 en suivant le format de sortie, indique « sans outil » dans le dépôt et enregistre quand même l'outil dans sa boîte au statut « en construction », avec la note « test à faire dès qu'un outil autorisé est disponible ». Sans outil de transcription : utiliser directement R1 et afficher « transcription fournie ».`,
      prompt_starter: `À partir du texte fourni uniquement, rédige un compte rendu de suivi. Distingue faits explicites, éléments inconnus et actions convenues. Fais un tableau action / responsable / échéance. N'invente ni disponibilité, ni salaire, ni confirmation client. Signale toute ambiguïté. Contexte : entretien de suivi en mission dans une ETTI fictive ; « client » désigne l'entreprise utilisatrice.`,
      prompt_defaults: {
        context: `Instructions permanentes de mon outil « Compte rendu de suivi → plan d'action » : je suis conseiller(ère) en insertion dans une ETTI fictive (Agence Horizon, intérim d'insertion). Le texte fourni est la transcription fictive d'un entretien de suivi en mission ; « client » désigne l'entreprise utilisatrice fictive.`,
        task: `Message type : rédige un compte rendu de suivi à partir de {{transcription}} uniquement, en retenant les horaires de {{fiche_mission}}. Distingue faits explicites, points à confirmer et actions convenues. Fais un tableau action / responsable / échéance.`,
        data: `{{transcription}} = R1 pour le test ; {{fiche_mission}} = R2 (V2 du 18/09/2026). Aucune donnée réelle : voir charte de données.`,
        constraints: `N'invente ni disponibilité, ni salaire, ni horaire, ni confirmation de l'entreprise utilisatrice. Aucune appréciation de personnalité, aucune mention de santé, aucun nom. 200 à 300 mots maximum. Si deux versions de fiche sont fournies, retiens la plus récente et signale l'ancienne.`,
        format: `Trois rubriques (faits explicites, points à confirmer avec l'entreprise utilisatrice ou le salarié, actions convenues), puis un tableau action / responsable / échéance, puis la date du prochain point de suivi.`,
        controls: `Termine par la liste des ambiguïtés relevées. Je vérifierai chaque date, chaque responsable, chaque mot de confirmation et la version de la fiche de mission avec les documents sources avant d'enregistrer dans la fiche salarié.`,
      },
      levels: {
        guided: `Partez du modèle de départ tel quel, ajoutez seulement votre charte de données et vos rubriques, testez sur R1 / R2, puis corrigez les instructions à partir des inventions repérées. Vérifiez chaque critère avant d'enregistrer et notez votre temps.`,
        autonomous: `Rédigez vos propres instructions permanentes sans la trame (seul le format de sortie est imposé), testez sur R1 / R2, puis justifiez en deux phrases chaque règle ajoutée après le test et votre correction V1 / V2.`,
        bonus: `Créez une seconde variante de l'outil : « Compte rendu → point d'étape prescripteur en cinq lignes » selon la fiche de liaison fictive R9 (situation de la mission, actions en cours, prochaine échéance, sans donnée inutile : pas de transport, pas d'appréciation, pas de santé), avec son propre message type, et testez-la sur votre compte rendu. Notez le temps ajouté dans le champ prévu : mesure de cette tâche, pas promesse. Le bonus reste dans le temps de l'atelier et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['transcription'],
      production_kind: 'report_actions',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE} ${TOOLBOX_NOTICE}`,
      job_context: {
        task: `Construire l'outil qui rédige, après chaque entretien de suivi en mission, le compte rendu avec les points à confirmer avec l'entreprise utilisatrice et le tableau action / responsable / échéance, pour la fiche salarié, le point client et le point d'étape prescripteur. Utilisateurs : chargés d'insertion et chargés de recrutement qui suivent les missions.`,
        time_sinks: `Les notes prises pendant l'entretien de suivi (horaires réels, incidents, renouvellement envisagé, trajet, questions sur la paie) sont remises au propre en fin de journée ; on cherche qui devait rappeler l'entreprise utilisatrice et pour quand ; le même contenu est ressaisi dans la fiche salarié, résumé pour le prescripteur et repris pour le point client ; sans outil, le prompt du module 1 est retapé ou perdu.`,
        delegable: `La mise en rubriques des notes ou de la transcription (faits, à confirmer, actions) et le tableau d'actions, à partir d'un texte sans donnée identifiante, par un outil dont les instructions interdisent l'invention.`,
        must_verify: `Chaque date et chaque échéance, le responsable de chaque action, tout mot de confirmation (une commande n'est confirmée que par l'entreprise utilisatrice), l'absence de montant (la rémunération relève du contrat de mission, selon les règles du travail temporaire), d'appréciation de personnalité et de mention de santé, et la version de la fiche de mission utilisée.`,
        why_etti: `Sur des missions courtes et souvent renouvelées, un compte rendu de suivi rapide et fiable est ce qui permet d'enchaîner les délégations, de préparer un renouvellement ou une fin de mission avec l'entreprise utilisatrice, de tracer les actions pour le prescripteur et de ne jamais annoncer au salarié une mission que le client n'a pas confirmée.`,
      },
      tool_blueprint: {
        name: `Compte rendu de suivi → plan d'action`,
        family: 'transcription',
        purpose: `Transformer la transcription ou les notes d'un entretien de suivi en mission en compte rendu fidèle (faits, points à confirmer avec l'entreprise utilisatrice, actions) et en tableau action / responsable / échéance, prêt pour la fiche salarié, le point client et le point d'étape prescripteur.`,
        inputs: `{{transcription}} : transcription ou notes de l'entretien, sans nom, sans coordonnées, sans mention de santé (test : R1). {{fiche_mission}} : la fiche de mission la plus récente, pour les horaires et le poste (test : R2, V2 du 18/09/2026). Facultatif : la date de l'entretien si elle n'est pas dans le texte.`,
        instructions: `Rôle : tu aides un permanent d'une ETTI (intérim d'insertion) à rédiger le compte rendu d'un entretien de suivi en mission avec un salarié intérimaire en parcours d’insertion. « Client » désigne l'entreprise utilisatrice.
Source : utilise uniquement {{transcription}} et {{fiche_mission}}. N'ajoute aucune connaissance extérieure (pas de taux de la branche, pas d'horaire habituel, pas d'adresse).
Règle 1 : classe chaque information en fait explicite, point à confirmer (auprès de l'entreprise utilisatrice, du salarié ou de l'agence) ou action convenue.
Règle 2 : n'écris jamais qu'une mission, une commande, un horaire ou un trajet est confirmé ou validé ; seule l'entreprise utilisatrice confirme, et seule une phrase explicite du texte permet de l'écrire.
Règle 3 : si la rémunération n'est pas dans le texte, écris « rémunération non communiquée, à demander à l'entreprise utilisatrice » ; n'estime jamais un montant.
Règle 4 : si le trajet n'est pas vérifié dans le texte, écris « trajet à vérifier » et attribue l'action au salarié avec une échéance.
Règle 5 : chaque action a un responsable (le salarié en parcours, la conseillère, l'agence) et une échéance ; si l'échéance manque, écris « échéance à fixer ».
Règle 6 : si deux versions de fiche de mission sont fournies, retiens la plus récente pour les horaires et signale l'ancienne.
Interdits : aucune appréciation de personnalité (motivé, sérieux, fragile), aucune mention de santé ou de RQTH, aucun nom ni numéro ; les personnes sont désignées par leur rôle.
Format : 200 à 300 mots, trois rubriques puis tableau | Action | Responsable | Échéance |, puis date du prochain point de suivi.
Contrôle : termine par « Ambiguïtés relevées : … » (ou « aucune »).
+ Charte de données de mes outils (coller ici).`,
        prompt_template: `Rappel : ce message ne contient aucune donnée réelle ni identifiante. Rédige le compte rendu de suivi en mission à partir du texte ci-dessous uniquement, selon tes instructions. Fiche de mission à retenir pour les horaires et le poste : {{fiche_mission}}. Transcription ou notes de l'entretien du {{date_entretien}} : {{transcription}}`,
        output_format: `Titre avec la date de l'entretien ; 1. Faits explicites ; 2. Points à confirmer (qui confirme : entreprise utilisatrice, salarié, agence) ; 3. Actions convenues en tableau | Action | Responsable | Échéance | ; Prochain point de suivi ; Ambiguïtés relevées. 200 à 300 mots hors tableau.`,
        verification: [
          `Chaque date et chaque échéance existe dans la transcription ou la fiche de mission (test : 21/09, 23/09, 24/09 à 10 h, 28/09).`,
          `Aucun mot de confirmation (confirmé, validé, acquis) sans phrase source ; la mission reste « non confirmée » tant que l'entreprise utilisatrice ne l'a pas écrit.`,
          `Aucun montant ; la rémunération est « non communiquée » et figure dans le tableau comme action.`,
          `Chaque action a un responsable cohérent (trajet → salarié ; horaires et rémunération → conseillère) et une échéance.`,
          `Les horaires sont ceux de la fiche de mission la plus récente (V2, présence à partir de 9 h), pas de l'ancienne version.`,
          `Aucune appréciation de personnalité, aucune mention de santé, aucun nom dans la sortie.`,
        ],
        data_rules: `Entrées autorisées : notes ou transcription sans nom, sans coordonnées, sans PASS IAE, sans mention de santé ni de RQTH, sans montant individuel ; fiche de mission sans donnée personnelle. Jamais : enregistrement audio réel sans information du salarié et règle de la structure, extrait de la plateforme, relevé d'heures nominatif. En cas de doute, retirer avant de coller. Outil autorisé par la structure uniquement.`,
        fallback: `Sans outil : suivre le format de sortie à la main avec les notes de l'entretien ; remplir d'abord le tableau d'actions, puis les points à confirmer, puis les faits. Sans outil de transcription : les notes manuscrites tiennent lieu de transcription, on n'en simule pas une.`,
      },
    },
    private_content: {
      answer_key: `## Outil abouti (exemple complet, cas fictif Agence Horizon)

### Instructions permanentes
Rôle : aide un permanent d'ETTI (intérim d'insertion) à rédiger le compte rendu d'un entretien de suivi en mission ; « client » = entreprise utilisatrice. Source : {{transcription}} et {{fiche_mission}} seulement. Règles : classement fait / à confirmer / action ; jamais « confirmé » sans phrase source ; rémunération non communiquée → action ; trajet à vérifier → action salarié ; chaque action avec responsable et échéance ; version la plus récente de la fiche retenue, ancienne signalée. Interdits : appréciation, santé, nom, montant. Format : trois rubriques + tableau + prochain point + ambiguïtés. Charte de données collée.

### Message type
« Rappel : aucune donnée réelle. Rédige le compte rendu selon tes instructions. Fiche de mission : {{fiche_mission}}. Entretien du {{date_entretien}} : {{transcription}} »

### Sortie attendue sur R1 / R2
Entretien de suivi en mission du 21/09/2026.
Faits explicites : mission envisagée de préparation manuelle de commandes chez Atelier Horizon Logistique (entreprise utilisatrice fictive) ; six mois d'expérience ; disponibilité à partir du lundi 28/09/2026 ; horaires selon fiche V2 du 18/09/2026 : présence à partir de 9 h, 9 h–17 h indicatif ; transport en bus vers 8 h 45, pas de véhicule ; aucune conduite d'engin.
Points à confirmer : horaires de la semaine suivante (entreprise utilisatrice) ; trajet et arrêt de bus (salarié) ; rémunération non communiquée (entreprise utilisatrice) ; mission non confirmée par l'entreprise utilisatrice.
| Action | Responsable | Échéance |
| Demander les horaires de la semaine suivante à l'entreprise utilisatrice | Conseillère | Mercredi 23/09/2026 |
| Vérifier le trajet et l'arrêt de bus | Salarié en parcours | Jeudi 24/09/2026 au plus tard |
| Demander la rémunération à l'entreprise utilisatrice | Conseillère | Avant le point du 24/09/2026 à 10 h |
Prochain point de suivi : jeudi 24/09/2026 à 10 h. Ambiguïtés relevées : la V1 du 10/09/2026 indiquait 8 h–16 h provisoire, remplacée par la V2.

### Points de vérification appliqués au test
Dates, mots de confirmation, montant, responsables, version de fiche, absence d'appréciation et de santé : six points, tous cochés.

## Pièges (sortie de test et outil)
- Mission « confirmée » : règle 2 manquante ou trop faible (« évite d'inventer » ne suffit pas ; écrire l'interdit et le remplacement).
- Montant « estimé » ou « au minimum conventionnel » : règle 3.
- Trajet « validé » ou arrêt de bus nommé : règle 4.
- Horaires de la V1 : règle 6 ; l'outil doit recevoir la V2 dans {{fiche_mission}}.
- Appréciation (« motivé ») ou santé déduite (« apte au port de charges ») : interdits et charte.
- Action sans responsable ou responsable inversé : règle 5 + point de vérification.
- Outil non réutilisable : instructions et message type mélangés, emplacements remplis avec le texte R1 dans la fiche enregistrée.

## Bonus : variante « point d'étape prescripteur » (R9)
Message type propre : « À partir du compte rendu ci-dessous, rédige le point d'étape en cinq lignes selon la fiche de liaison : situation de la mission (non confirmée), actions en cours côté agence, action côté salarié, prochaine échéance, point à signaler ; aucun transport, aucune appréciation, aucune santé, aucun montant. {{compte_rendu}} »

## Lecture du temps observé
Le temps noté inclut l'adaptation de l'outil, qui ne se refait pas au prochain usage : il se compare au temps d'un second test, pas au temps habituel seulement, et vaut pour ce document fictif.`,
      trainer_notes: `## Animation
- Modèle de départ et démonstration (8 min) : afficher la fiche du modèle (instructions, message type, format), lancer le test sur R1 / R2, montrer une phrase douteuse (« confirmé ») et, surtout, montrer la correction dans les instructions plutôt que dans la sortie, puis relancer. Montrer le bouton « Enregistrer dans ma boîte à outils » et le champ « Temps sur cette tâche » ; lancer un chronomètre visible.
- Si aucun outil de transcription n'est autorisé, le dire et afficher « transcription fournie » ; rappeler qu'enregistrer un vrai entretien suppose l'information du salarié et une règle de la structure.
- Imposer l'inversion des rôles à mi-production.

## Transformer un prompt ponctuel en outil
- Séparer ce qui ne change jamais (rôle, règles, interdits, format → instructions permanentes) de ce qui change à chaque usage (transcription, fiche, date → emplacements du message type).
- Juger la réutilisabilité : la fiche peut-elle être collée dans un projet ou des instructions personnalisées sans réécriture ? Les emplacements sont-ils vides dans la fiche ? Un collègue comprendrait-il à qui s'adresse la sortie ?
- Chaque règle doit renvoyer à un piège rencontré : demander « pourquoi cette règle ? » ; une règle sans piège est souvent du bruit.

## Pièges fréquents
- Binômes qui corrigent la sortie à la main et n'ajoutent rien aux instructions : l'invention reviendra ; exiger la règle.
- Instructions trop longues (une page) : viser 8 à 15 lignes, règles opératoires.
- Comptes rendus trop longs : rappeler 200–300 mots ; le tableau ne compte pas.
- Temps observé noté sans la vérification ni l'adaptation : demander ce que le chronomètre incluait.

## Rythmes différents
- Rapides : variante « point d'étape prescripteur » (bonus) ou relecture de la fiche d'outil d'un autre binôme avec la grille.
- Lents : partir du modèle sans l'adapter, coller la charte, un seul test, deux règles ajoutées ; enregistrer au statut « en construction ».

## Débrief
Collecter une règle ajoutée par binôme et l'afficher. Terminer par la responsabilité : l'outil n'est pas signataire du compte rendu, le permanent l'est, et ce compte rendu alimente la fiche salarié, le point client et le point prescripteur.`,
      flawed_example: `## RÉSERVÉ AU FORMATEUR — version imparfaite à ne pas distribuer telle quelle

Ce compte rendu contient volontairement trois erreurs. À utiliser pour un exercice de repérage, et pour faire écrire la règle d'outil qui aurait empêché chacune.

« Entretien de suivi du 21/09/2026. Mission confirmée chez Atelier Horizon Logistique (entreprise utilisatrice fictive) en préparation manuelle de commandes, à partir du lundi 28 septembre. Le salarié a six mois d'expérience. Horaires : 9 h–17 h. Rémunération : taux horaire habituel de ce type de mission, soit environ le minimum conventionnel de la branche. Transport : le trajet en bus a été validé, départ 8 h 45. Aucune conduite d'engin. Point de suivi jeudi 24 septembre à 10 h. »

### Les trois erreurs
1. « Mission confirmée » : la validation de l'entreprise utilisatrice est en attente ; rien dans R1 ne confirme la mission. Règle d'outil : jamais « confirmé » sans phrase source.
2. Rémunération « environ le minimum conventionnel de la branche » : le salaire n'est pas communiqué ; toute estimation est une invention, même plausible. Règle d'outil : « non communiquée, à demander » + action.
3. « Trajet validé » : le trajet et l'arrêt sont à vérifier au plus tard le jeudi 24/09 ; rien n'est validé. Règle d'outil : « trajet à vérifier » + action salarié.

Erreur secondaire possible à faire remarquer : aucune action n'est attribuée à un responsable, et le compte rendu ne pourrait pas servir à préparer le point d'étape avec le prescripteur.`,
    },
  },

  {
    code: 'A2',
    title: `Atelier 2 — Outil « Mes documents répondent avec leurs sources »`,
    seance: 1,
    position: 4,
    duration_min: 60,
    breakdown: [
      { label: 'Modèle de départ et démonstration', minutes: 8 },
      { label: 'Production', minutes: 37 },
      { label: 'Vérification', minutes: 10 },
      { label: 'Débrief', minutes: 5 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a construit, testé sur les documents fictifs R2 à R5 et enregistré dans sa boîte à outils un outil « Mes documents répondent avec leurs sources » qui répond aux questions récurrentes sur une mission (horaires, EPI, accès, tâches, tuteur, conduite d'engin, procédure d'accueil) en citant le document, la version, la rubrique et le passage, écrit « information non disponible » quand l'information manque et montre les conflits de versions, et a noté le temps réellement passé.`,
      brief: `En intérim d'insertion, les mêmes questions sur une mission reviennent plusieurs fois par jour : le salarié en parcours demande « à quelle heure je commence ? », « qui est mon tuteur sur place ? », « quels EPI je dois avoir ? », l'entreprise utilisatrice demande « est-ce qu'il conduira un engin ? », le prescripteur demande « où en est l'accueil ? », et l'assistant administratif cherche l'adresse du site pour le contrat de mise à disposition. On rouvre la fiche de mission, souvent dans deux versions. Au module 1 vous avez interrogé les documents une fois ; aujourd'hui vous construisez l'outil qui répondra à chaque question, pour vous et pour vos collègues. En binôme, partez du modèle de départ (instructions permanentes, message type avec {{documents}} et {{question}}, format réponse / source / passage / vérification). Adaptez-le à votre structure : vos types de documents (fiche de mission, commande client, procédure d'accueil, consignes de sécurité du site), vos interlocuteurs, votre charte de données. Importez R2 (fiche de mission V2 du 18/09/2026), R3 (fiche V1 du 10/09/2026, ancienne), R4 (procédure d'accueil V2 du 16/09/2026) et R5 (guide de visite V1 du 08/09/2026) dans l'outil documentaire autorisé, puis testez l'outil avec les cinq questions du cas : 1) horaires actuels ; 2) conduite d'engin prévue ; 3) étapes de la procédure d'accueil ; 4) rémunération ; 5) adresse exacte du site. Pour chaque réponse, ouvrez le passage cité et contrôlez-le : une réponse qui cite un document n'est pas automatiquement vraie. Deux questions n'ont pas de réponse dans les documents, une fait apparaître une contradiction entre deux versions : votre outil doit le dire de lui-même ; s'il complète (taux de branche, adresse supposée) ou mélange V1 et V2, corrigez les instructions et relancez. Quand les cinq lignes passent les points de vérification, enregistrez l'outil avec sa fiche complète et notez le temps observé (import, adaptation, questions, vérification, corrections).`,
      resource_codes: ['R2', 'R3', 'R4', 'R5'],
      steps: [
        `Lire le modèle de départ et importer R2, R3, R4 et R5 dans l'outil documentaire autorisé (ou préparer les quatre documents imprimés pour la solution de secours) ; démarrer le chronomètre.`,
        `Adapter les instructions à sa structure : types de documents de l'agence, interlocuteurs qui posent les questions (salarié, entreprise utilisatrice, prescripteur, assistant administratif), charte de données collée.`,
        `Tester sur le cas fictif : poser les cinq questions avec le message type ({{question}} à chaque fois, {{documents}} = R2 à R5), et remplir le tableau au fur et à mesure.`,
        `Vérifier avec la grille : pour chaque réponse, ouvrir le document cité, retrouver la version, la rubrique et le passage ; noter « vérifié », « à corriger » ou « non disponible ».`,
        `Corriger l'outil : si une réponse complète (montant, adresse) ou mélange les versions, ajouter la règle qui manque dans les instructions et reposer la question.`,
        `Vérifier que la question des horaires montre le conflit V1 / V2 et retient la V2, et que rémunération et adresse restent « information non disponible » avec la personne qui doit les demander à l'entreprise utilisatrice.`,
        `Enregistrer l'outil dans sa boîte à outils avec la fiche complète et le résumé du test (cinq lignes, corrections).`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer la FAQ, le tableau et la fiche.`,
      ],
      deliverable: `L'outil « Mes documents répondent avec leurs sources » enregistré dans la boîte à outils avec sa fiche complète + le test : FAQ de cinq réponses et tableau réponse / source (document, version, rubrique) / passage / vérification humaine (vérifié, corrigé, non disponible), les règles ajoutées après le test + l'outil documentaire utilisé + le temps observé et le temps habituel estimé dans le champ prévu (mesure de ce test, pas promesse générale).`,
      success_criteria: [
        `Les sorties de test sont fidèles : horaires de la V2 (R2) avec la V1 (R3) signalée comme ancienne ; aucune conduite d'engin, passage de R2 cité ; six étapes de R4 dans l'ordre ; rémunération et adresse « information non disponible » sans valeur inventée, avec la personne chargée de les demander à l'entreprise utilisatrice.`,
        `L'outil est réutilisable : instructions permanentes séparées du message type, emplacements {{documents}} et {{question}}, format de réponse fixé, liste des questions récurrentes de l'agence (horaires, EPI, accès, tâches, tuteur, conduite d'engin, accueil) notée dans la fiche.`,
        `La vérification est intégrée : les instructions exigent document + version + rubrique + passage pour chaque réponse, et la fiche impose d'ouvrir le passage avant de répondre à quelqu'un ; les cinq lignes du test portent une vérification humaine.`,
        `Les règles de données reprennent la charte : seuls des documents sans donnée personnelle entrent dans l'outil (pas de contrat de mission nominatif, pas de relevé d'heures) ; les risques de l'outil documentaire (hébergement, conservation des documents importés) sont nommés.`,
        `Au moins une règle des instructions est justifiée par un comportement observé au test (complément inventé, mélange de versions), et un collègue pourrait reprendre l'outil avec la fiche seule.`,
        `Le temps observé est renseigné, vérification comprise, en précisant s'il a été chronométré.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `D'où vient cette réponse, si elle n'est dans aucun passage ?`,
          text: `Si l'outil donne une adresse, un montant ou un horaire précis à la question 4 ou 5, il l'a reconstitué à partir d'un autre passage ou de ses connaissances générales (un taux de la branche du travail temporaire, une zone d'activité). Demandez-lui « dans quel document et quel passage exactement ? » puis ouvrez le document. Si le passage n'existe pas, la bonne réponse est « information non disponible » : la règle à ajouter dans vos instructions est « n'utilise aucune connaissance extérieure aux documents ; si le passage n'existe pas, écris “information non disponible” et indique qui doit demander l'information à l'entreprise utilisatrice ».`,
        },
        {
          level: 'trame',
          title: `Squelette d'instructions permanentes`,
          text: `Rôle : tu réponds aux questions récurrentes sur une mission d'intérim d'insertion à partir des documents importés par [l'agence]. Qui pose les questions : [salarié en parcours / entreprise utilisatrice / prescripteur / assistant administratif]. Règles : 1) réponds uniquement à partir de {{documents}} ; 2) pour chaque réponse, cite [document, version, rubrique, passage] ; 3) si l'information manque, écris [« information non disponible »] et indique [qui doit la demander, à qui] ; 4) si des versions se contredisent, [montre le conflit, retiens la version datée la plus récente, nomme l'ancienne] ; 5) n'utilise aucune connaissance extérieure : [pas de taux de branche, pas d'adresse supposée, pas d'horaire habituel]. Interdits : [montant, adresse, date, confirmation non écrits dans les documents ; donnée personnelle]. Format : [réponse courte / source / passage cité / conflit éventuel]. Contrôle : [termine par la liste des questions sans réponse]. + Charte de données.`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (une règle et une ligne de sortie)`,
          text: `Règle 4 de l'outil : « Si deux documents du même type portent des dates différentes, retiens le plus récent, cite les deux et écris “version retenue : … ; ancienne version : …”. » Ligne de sortie attendue pour la question 2 : « Réponse : non, aucune conduite d'engin n'est prévue. Source : R2, fiche de mission V2 du 18/09/2026, rubrique “Mission”. Passage : “aucune conduite d'engin prévue”. Conflit de versions : aucun. » Vérification humaine : vérifié dans R2. — Les autres règles et les quatre autres lignes sont à construire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Qu'est-ce qui, dans votre outil, empêche désormais le complément inventé (taux de branche, adresse) et le mélange de versions ? Montrez la règle.`,
        `Quel contrôle gardez-vous à chaque usage : ouvrir le passage cité avant de répondre au salarié ou à l'entreprise utilisatrice ? Qui met à jour les documents importés quand une commande change ?`,
        `Qui, dans votre agence, pourrait utiliser cet outil (accueil, assistant administratif, chargés de recrutement), à quelle condition (documents à jour, sans donnée personnelle, outil documentaire autorisé), et pour quelles questions récurrentes ?`,
      ],
      fallback: `Sans outil documentaire : le binôme rédige les instructions et le message type sur la fiche, répond aux cinq questions à la main avec les quatre documents imprimés ou affichés en remplissant le même tableau (source, version, rubrique, passage), note le temps passé, indique « sans outil » dans le dépôt et enregistre l'outil au statut « en construction » avec la note « test à faire dès qu'un outil documentaire autorisé est disponible ».`,
      prompt_starter: `Réponds uniquement à partir des documents fournis. Pour chaque réponse, indique le document, sa version, la rubrique et le passage justificatif. Si l'information manque, écris “information non disponible”. Si des versions se contredisent, montre le conflit et distingue la version actualisée. Contexte : documents de mission d'une ETTI fictive, questions posées par le salarié en parcours, l'entreprise utilisatrice ou le prescripteur.`,
      prompt_defaults: {
        context: `Instructions permanentes de mon outil « Mes documents répondent avec leurs sources » : je travaille dans une ETTI fictive (Agence Horizon, intérim d'insertion). Les documents importés sont des fiches de mission, procédures d'accueil et guides de l'agence, sans donnée personnelle. Les questions viennent du salarié en parcours, de l'entreprise utilisatrice, du prescripteur ou de l'équipe d'agence.`,
        task: `Message type : réponds à {{question}} uniquement à partir de {{documents}}.`,
        data: `{{documents}} = R2, R3, R4, R5 pour le test. {{question}} = horaires actuels ; conduite d'engin ; étapes de la procédure d'accueil ; rémunération ; adresse exacte du site. Aucune donnée réelle : voir charte de données.`,
        constraints: `Si l'information manque, écris “information non disponible” et indique qui doit la demander à l'entreprise utilisatrice. N'utilise aucune connaissance extérieure aux documents (pas de taux de branche, pas d'adresse supposée). N'invente ni montant, ni adresse, ni horaire.`,
        format: `Pour chaque réponse : réponse courte, document, version, rubrique, passage justificatif cité, conflit de versions éventuel (version retenue, ancienne version).`,
        controls: `Si des versions se contredisent, montre le conflit et distingue la version actualisée. Termine par la liste des questions sans réponse. J'ouvrirai chaque passage cité avant de répondre à quelqu'un.`,
      },
      levels: {
        guided: `Partez du modèle de départ, ajoutez votre charte de données et vos types de documents, posez les cinq questions dans l'ordre et ouvrez chaque passage avant de cocher « vérifié » ; corrigez les instructions à partir de ce que vous observez. Notez votre temps.`,
        autonomous: `Rédigez vos propres instructions sans la trame (seul le format réponse / source / passage est imposé), testez les cinq questions, puis ajoutez une sixième question typique d'un prescripteur ou d'une entreprise utilisatrice dont vous savez que la réponse n'est pas dans les documents, pour vérifier que l'outil dit « information non disponible ».`,
        bonus: `Créez une seconde variante de l'outil : « Réponse au salarié en phrases simples », avec son propre message type, qui reformule une ligne vérifiée de la FAQ en deux phrases courtes sans terme d'agence (horaires, conduite d'engin, rémunération « pas encore connue, demandée à l'entreprise ») ; testez-la sur trois lignes. Notez le temps ajouté : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['documents'],
      production_kind: 'faq_sources',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE} ${TOOLBOX_NOTICE}`,
      job_context: {
        task: `Construire l'outil qui répond aux questions récurrentes sur une mission (horaires, EPI, accès au site, tâches confiées, tuteur, conduite d'engin, étapes d'accueil, rémunération, adresse) à partir des documents de l'agence, en citant la bonne version. Utilisateurs : accueil, assistants administratifs, chargés de recrutement.`,
        time_sinks: `Les mêmes questions arrivent du salarié en parcours, de l'entreprise utilisatrice, du prescripteur et des collègues qui préparent le contrat de mise à disposition ; à chaque fois on rouvre la fiche de mission ou la commande, on hésite entre deux versions, on cherche la consigne de sécurité ou le nom du tuteur, et on répond parfois de mémoire avec un horaire périmé.`,
        delegable: `La recherche du passage dans les documents importés et la première formulation de la réponse avec document, version, rubrique et passage, par un outil dont les instructions interdisent tout complément extérieur.`,
        must_verify: `Que le passage cité existe et dit bien ce qu'affirme la réponse ; que la version retenue est la plus récente ; que les informations absentes (rémunération, adresse, tuteur) restent « non disponibles » et sont attribuées à quelqu'un pour les demander à l'entreprise utilisatrice ; que les documents importés sont à jour et sans donnée personnelle.`,
        why_etti: `L'entreprise utilisatrice est responsable des conditions d'exécution de la mission (temps de travail, santé, sécurité, formation au poste, EPI) et l'agence relaie ses informations au salarié, au prescripteur et à l'équipe qui prépare le contrat de mission : une réponse donnée à partir d'une fiche périmée engage l'agence et peut faire échouer le premier jour de mission.`,
      },
      tool_blueprint: {
        name: `Mes documents répondent avec leurs sources`,
        family: 'documents',
        purpose: `Répondre aux questions récurrentes sur une mission d'intérim d'insertion (horaires, EPI, accès, tâches, tuteur, conduite d'engin, accueil) uniquement à partir des documents de l'agence importés, en citant document, version, rubrique et passage, et en disant quand l'information n'y est pas.`,
        inputs: `{{documents}} : les documents de l'agence sans donnée personnelle, importés dans l'outil documentaire autorisé (fiche de mission ou commande dans sa dernière version, éventuellement l'ancienne pour signaler le conflit, procédure d'accueil, consignes de sécurité du site, guide de visite ; test : R2, R3, R4, R5). {{question}} : la question telle que posée, avec qui la pose. {{demandeur}} : salarié en parcours, entreprise utilisatrice, prescripteur ou équipe d'agence.`,
        instructions: `Rôle : tu réponds, pour une ETTI (intérim d'insertion), aux questions récurrentes sur une mission à partir des documents importés par l'agence.
Source : uniquement {{documents}}. N'utilise aucune connaissance extérieure : pas de taux de la branche du travail temporaire, pas d'adresse supposée, pas d'horaire « habituel », pas de règle générale.
Règle 1 : pour chaque réponse, cite le document, sa version et sa date, la rubrique et le passage exact entre guillemets.
Règle 2 : si l'information n'est dans aucun document, écris « information non disponible » et indique qui doit la demander et à qui (en général la conseillère ou le chargé de recrutement auprès de l'entreprise utilisatrice).
Règle 3 : si deux documents du même type portent des dates différentes, retiens le plus récent, cite les deux et écris « version retenue : … ; ancienne version : … ».
Règle 4 : n'écris jamais qu'une commande, une mission ou un horaire est confirmé si le document ne le dit pas explicitement.
Règle 5 : pour une question sur les EPI, l'accès au site, le tuteur ou la formation au poste, rappelle que ces éléments relèvent de l'entreprise utilisatrice et cite ce que les documents en disent, sans compléter.
Règle 6 : adapte la réponse au demandeur ({{demandeur}}) : phrases courtes et sans sigle pour le salarié en parcours ; mention de la version pour l'équipe d'agence.
Interdits : montant, adresse, date, nom ou numéro absents des documents ; aucune donnée personnelle.
Format : réponse courte / source (document, version, rubrique) / passage / conflit de versions éventuel / vérification à faire.
Contrôle : termine par la liste des questions restées sans réponse et de qui doit les poser.
+ Charte de données de mes outils (coller ici).`,
        prompt_template: `Rappel : les documents importés ne contiennent aucune donnée personnelle ; aucune donnée réelle dans ce message. Documents à utiliser : {{documents}}. Question posée par {{demandeur}} : {{question}}. Réponds selon tes instructions, avec document, version, rubrique et passage ; écris « information non disponible » si les documents ne répondent pas.`,
        output_format: `Pour chaque question : Réponse (une à deux phrases) ; Source : document, version et date, rubrique ; Passage : « citation courte » ; Conflit de versions : aucun / version retenue et ancienne version ; À vérifier avant de répondre : ouvrir le passage. En fin de réponse : questions sans réponse et qui doit les poser à l'entreprise utilisatrice.`,
        verification: [
          `Ouvrir le document cité : le passage existe, dans la version indiquée, et dit bien ce que la réponse affirme.`,
          `La version retenue est la plus récente ; l'ancienne est nommée comme telle (test : V2 du 18/09 retenue, V1 du 10/09 ancienne).`,
          `Aucune valeur inventée pour une information absente (test : rémunération et adresse exacte « information non disponible »).`,
          `Les étapes d'une procédure sont restituées dans l'ordre, sans ajout ni suppression (test : six étapes de R4).`,
          `Les documents importés sont à jour et ne contiennent aucune donnée personnelle ; les documents périmés sont retirés ou marqués.`,
        ],
        data_rules: `Entrées autorisées : fiches de mission, commandes, procédures, consignes de sécurité et guides de l'agence sans nom de salarié, sans coordonnées personnelles, sans montant individuel. Jamais : contrat de mission ou de mise à disposition nominatif, relevé d'heures, dossier de salarié, extrait de la plateforme. Vérifier avec la structure où l'outil documentaire conserve les documents importés et pour combien de temps ; retirer les documents après usage si la règle interne l'exige.`,
        fallback: `Sans outil documentaire : tenir la FAQ de mission à la main dans un tableau partagé de l'agence (question / réponse / document, version, rubrique / passage / date de vérification), mise à jour à chaque nouvelle version de fiche de mission ; chercher le passage avant de répondre, jamais de mémoire.`,
      },
    },
    private_content: {
      answer_key: `## Outil abouti (exemple complet, cas fictif Agence Horizon)

### Instructions permanentes
Rôle : répondre aux questions récurrentes sur une mission d'intérim d'insertion à partir des documents importés. Source : {{documents}} seulement, aucune connaissance extérieure. Règles : citation document / version / rubrique / passage ; « information non disponible » + qui demande à qui ; conflit de versions montré, plus récente retenue ; jamais « confirmé » sans phrase ; EPI, accès, tuteur, formation au poste relèvent de l'entreprise utilisatrice, cités sans compléter ; réponse adaptée au demandeur. Interdits : montant, adresse, date, nom absents des documents. Format fixé. Charte collée.

### Message type
« Rappel : aucune donnée personnelle. Documents : {{documents}}. Question posée par {{demandeur}} : {{question}}. Réponds selon tes instructions. »

### Sorties attendues sur R2 à R5
1. Horaires actuels (salarié) : présence attendue à partir de 9 h, 9 h–17 h indicatif. Source : R2, V2 du 18/09/2026, rubrique « Mission ». Conflit : R3 (V1 du 10/09/2026) indiquait 8 h–16 h provisoire ; version retenue V2, ancienne V1. Horaires de la semaine suivante : information non disponible, à demander par la conseillère à l'entreprise utilisatrice (prévu le 23/09).
2. Conduite d'engin (entreprise utilisatrice, salarié) : aucune. Source : R2, V2, « Mission », passage « aucune conduite d'engin prévue ». Une conduite supposerait habilitation et formation au poste relevant de l'entreprise utilisatrice ; rien de tel n'est prévu.
3. Étapes de la procédure d'accueil (prescripteur, nouveau collègue) : six étapes dans l'ordre (recueillir la demande et expliquer ; relever uniquement les compétences et disponibilités nécessaires ; vérifier les informations de la mission et les points inconnus ; validation par le permanent responsable ; expliquer les prochaines actions ; fixer un point de suivi et consigner). Source : R4, V2 du 16/09/2026. Règle « un point inconnu est attribué à un responsable, jamais complété par supposition » conservée.
4. Rémunération (salarié, prescripteur) : information non disponible ; à demander par la conseillère à l'entreprise utilisatrice ; relève du contrat de mission selon les règles du travail temporaire. Toute valeur, y compris « au minimum de la branche », est une invention.
5. Adresse exacte du site (salarié, assistant administratif) : information non disponible ; les documents nomment l'entreprise utilisatrice fictive et la zone d'activité ; à demander à l'entreprise utilisatrice avant le contrat de mise à disposition.
Fin de réponse : questions sans réponse : 4 et 5, et horaires de la semaine suivante.

## Pièges (sortie de test et outil)
- Mélange V1 / V2 : règle 3 absente ; c'est l'objectif de la question 1, laisser le binôme le découvrir.
- Réponse « plausible » à l'adresse ou à la rémunération : règle 2 et interdit « aucune connaissance extérieure » ; faire ouvrir le document, le passage n'existe pas.
- Citation sans passage, ou passage qui ne dit pas ce que la réponse affirme : point de vérification 1.
- Outil non réutilisable : liste des questions récurrentes absente de la fiche, documents de test laissés dans l'emplacement.
- Règles de données oubliées : contrat de mission nominatif « parce que c'est pratique » ; rappeler la charte et la conservation des documents importés.

## Bonus : variante « Réponse au salarié en phrases simples »
Message type : « Reformule la réponse vérifiée ci-dessous en deux phrases courtes, sans sigle ni terme d'agence, pour un salarié qui découvre l'intérim d'insertion ; ne change aucune information ; si la réponse est “information non disponible”, dis que l'agence la demande à l'entreprise. {{ligne_faq}} »

## Lecture du temps observé
Le temps noté inclut l'import, l'adaptation et la vérification des cinq passages ; au poste, l'import se fait une fois par mission et la vérification reste à chaque question : la mesure vaut pour ce test.`,
      trainer_notes: `## Animation
- Modèle de départ et démonstration (8 min) : afficher la fiche du modèle, importer les quatre documents, poser la question 1, montrer la citation, ouvrir le document et vérifier ; montrer la question 4 (rémunération) et le comportement attendu ; montrer une correction d'instructions puis la relance. Lancer le chronomètre visible.
- Vérifier avant l'atelier que l'outil documentaire autorisé accepte quatre fichiers et affiche les passages cités, et où il conserve les documents importés ; sinon, secours dès le départ.
- Faire le lien avec la réalité : qui pose ces questions dans l'agence (salarié, entreprise utilisatrice, prescripteur, assistant administratif pour le contrat de mise à disposition) et combien de fois par semaine.

## Transformer un prompt ponctuel en outil
- Ce qui ne change pas : rôle, règles de citation, « information non disponible », conflit de versions, interdits → instructions. Ce qui change : documents, question, demandeur → emplacements.
- Juger la réutilisabilité : la fiche dit-elle quels documents importer et qui les met à jour quand une commande change ? La liste des questions récurrentes de l'agence est-elle écrite ?
- Chaque règle renvoie à un piège : mélange de versions, complément inventé, citation sans passage.

## Pièges fréquents
- Binômes qui corrigent la FAQ sans toucher aux instructions : exiger la règle.
- Binômes qui ne vérifient que les deux premières lignes : la vérification humaine est obligatoire pour les cinq.
- Documents nominatifs proposés « pour aller plus vite » : charte, règle 4.
- Temps noté sans la vérification : rappeler la case « inclut la vérification et les corrections ».

## Rythmes différents
- Rapides : sixième question piège (niveau autonome) ou variante « phrases simples » (bonus).
- Lents : questions 1, 2 et 4 d'abord (elles portent les apprentissages clés), puis 3 et 5 si le temps le permet ; enregistrer au statut « en construction ».

## Débrief
Afficher une fiche d'outil de binôme et demander au groupe la règle la plus utile et la ligne de test la plus fragile.`,
    },
  },

  {
    code: 'A3',
    title: `Atelier 3 — Outil « Fiche de visite sourcée »`,
    seance: 1,
    position: 5,
    duration_min: 55,
    breakdown: [
      { label: 'Modèle de départ et démonstration', minutes: 8 },
      { label: 'Production', minutes: 32 },
      { label: 'Vérification des sources', minutes: 10 },
      { label: 'Débrief', minutes: 5 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a construit, testé et enregistré dans sa boîte à outils un outil « Fiche de visite sourcée » qui prépare une visite de prospection ou un rendez-vous commercial avec une entreprise utilisatrice (ou un facilitateur de clause d'insertion) : faits reliés à des pages publiques consultées et datées, hypothèses commerciales séparées, cinq questions à poser pour cadrer une commande, deux incertitudes ; et a noté le temps réellement passé.`,
      brief: `En intérim d'insertion, les commandes viennent des entreprises utilisatrices que l'on prospecte, que l'on visite et que l'on fidélise, et parfois des clauses d'insertion des marchés publics, par l'intermédiaire d'un facilitateur. Préparer une visite ou un rendez-vous commercial prend du temps : chercher l'activité, les métiers, l'implantation, les horaires habituels du secteur, l'accès au site pour des salariés sans véhicule, puis trier ce qui est vérifié de ce que l'on suppose, et préparer les questions qui permettront de prendre une commande propre (poste, horaires, durée, compétences, EPI, accès, tuteur). Au module 1 vous avez fait une fiche ; aujourd'hui vous construisez l'outil qui en fera une avant chaque visite. En binôme, partez du modèle de départ (instructions permanentes, message type avec {{entreprise_ou_secteur}} et {{territoire}}, format faits sourcés / hypothèses / questions / incertitudes). Adaptez-le à votre structure : vos secteurs du bassin d'emploi, vos questions de prise de commande, votre charte de données. Testez-le sur un secteur de votre bassin (logistique, agroalimentaire, bâtiment, propreté, services à la personne) avec, au choix, une entreprise publique identifiée dont les informations professionnelles sont accessibles, ou le cas fictif « Atelier Horizon Logistique » avec le guide de visite R5. Dans les deux cas, informations professionnelles publiques uniquement : aucune donnée privée sur des dirigeants ou des salariés. Puis faites l'exercice central : pour chaque affirmation de la sortie, retrouvez le passage exact de la page consultée ; sinon, corrigez, supprimez ou transformez en question. Une hypothèse commerciale (« ils vont recruter en fin d'année ») n'est pas un fait tant qu'une page datée ne le dit pas ; une règle évoquée (sécurité, obligations de l'entreprise utilisatrice) demande une source officielle vérifiée à la date de la formation. La liste R7 donne des points de départ, pas des réponses. Chaque chiffre sans page, chaque hypothèse déguisée en fait devient une règle dans vos instructions ; relancez. Quand la fiche passe les points de vérification, enregistrez l'outil et notez le temps observé (adaptation, recherche, vérification des sources, corrections).`,
      resource_codes: ['R5', 'R7'],
      steps: [
        `Lire le modèle de départ, choisir un secteur du bassin d'emploi puis une entreprise publique identifiée ou le cas fictif avec R5 ; démarrer le chronomètre.`,
        `Adapter les instructions à sa structure : secteurs et territoire, questions de prise de commande propres à l'agence (poste, horaires, durée, compétences, EPI, accès, tuteur, clause d'insertion), charte de données collée.`,
        `Tester sur le cas : envoyer le message type dans l'assistant avec recherche en ligne autorisé, en remplaçant {{entreprise_ou_secteur}} et {{territoire}}.`,
        `Vérifier avec la grille : pour chaque affirmation, ouvrir la page citée, retrouver le passage exact et noter la date ; marquer « hypothèse » ce qui n'est pas sourcé ; pour chaque règle évoquée, retrouver une source officielle.`,
        `Corriger l'outil : chaque chiffre sans page, chaque hypothèse commerciale présentée comme un fait, chaque règle sans source devient une règle des instructions ; relancer et comparer.`,
        `Rédiger la fiche finale d'une page : faits sourcés (trois sources minimum avec adresse et date), hypothèses, cinq questions à l'entreprise utilisatrice, deux incertitudes.`,
        `Enregistrer l'outil dans sa boîte à outils avec la fiche complète et le résumé du test (affirmations supprimées, règles ajoutées).`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer la fiche de visite, la liste des sources et la fiche d'outil.`,
      ],
      deliverable: `L'outil « Fiche de visite sourcée » enregistré dans la boîte à outils avec sa fiche complète + le test : fiche de visite d'une page (faits sourcés avec adresse de page et date de consultation, hypothèses dont hypothèses commerciales, cinq questions pour cadrer la commande, deux incertitudes), les affirmations supprimées faute de source et les règles ajoutées + l'assistant utilisé + le temps observé (adaptation + recherche + vérification + corrections) dans le champ prévu, qui vaut pour cette fiche et non comme gain général.`,
      success_criteria: [
        `Chaque donnée déterminante de la sortie finale (activité, effectif, implantation, règle) est reliée à une page consultée avec sa date ; aucune règle juridique inventée ; aucune donnée privée sur des personnes.`,
        `L'outil est réutilisable : instructions permanentes avec les secteurs et les questions de prise de commande de l'agence, message type avec {{entreprise_ou_secteur}} et {{territoire}}, format de fiche fixé.`,
        `La vérification est intégrée : les instructions exigent page précise et date pour chaque fait et interdisent de compléter un chiffre absent ; la fiche impose d'ouvrir chaque page avant la visite ; le test montre au moins une affirmation supprimée ou transformée en question.`,
        `Les règles de données reprennent la charte : informations professionnelles publiques uniquement, aucune recherche sur une personne, aucune donnée interne de l'agence collée dans l'assistant ; le risque propre à la recherche web (ajout d'informations extérieures) est nommé.`,
        `Les hypothèses commerciales sont séparées des faits, les cinq questions couvrent tâches confiées, compétences, horaires, accès au site sans véhicule et prochaines étapes (volume, date, tuteur, formation au poste, EPI), et un collègue pourrait reprendre l'outil avec la fiche seule.`,
        `Le temps observé est renseigné, vérification des sources comprise.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Ce chiffre, sur quelle page l'ai-je lu ?`,
          text: `Les assistants avec recherche en ligne produisent des chiffres plausibles (effectif, chiffre d'affaires, « recrute 20 préparateurs ») sans page précise, ou avec une page qui ne contient pas le chiffre. Pour chaque chiffre de la sortie, posez-vous « sur quelle page, à quelle date ? » ; si vous ne pouvez pas répondre, c'est votre outil qui doit changer : « n'écris aucun chiffre sans l'adresse de la page et sa date ; sinon transforme-le en question à poser à l'entreprise utilisatrice ». C'est souvent plus utile pour la visite, et c'est ce que vous demanderez de toute façon avant de prendre la commande.`,
        },
        {
          level: 'trame',
          title: `Squelette d'instructions permanentes`,
          text: `Rôle : tu prépares, pour [une ETTI, intérim d'insertion], une fiche avant [une visite de prospection / un rendez-vous commercial / un rendez-vous avec un facilitateur de clause d'insertion] auprès d'une entreprise utilisatrice. Périmètre : [informations professionnelles publiques uniquement ; jamais de personne]. Règles : 1) chaque fait a [adresse de page + date] ; 2) un chiffre sans page devient [une question] ; 3) une hypothèse, notamment commerciale, est [marquée « hypothèse »] ; 4) toute règle évoquée a [une source officielle et sa date] ; 5) questions à poser orientées prise de commande : [tâches confiées, compétences, horaires, accès sans véhicule, volume / date / tuteur / formation au poste / EPI]. Interdits : [chiffre absent complété, donnée privée, règle sans source, promesse de délai]. Format : [faits sourcés / hypothèses / règles et sources / cinq questions / deux incertitudes]. Contrôle : [liste des pages à ouvrir avant la visite]. + Charte de données.`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (une règle et un extrait de fiche, cas fictif avec R5)`,
          text: `Règle 2 de l'outil : « N'écris aucun effectif, chiffre d'affaires ou volume de recrutement sans l'adresse exacte de la page et sa date ; sinon, écris la question à poser à l'entreprise utilisatrice. » Extrait de fiche attendu : « Fait sourcé : le guide de visite R5 (V1 du 08/09/2026, document fictif) recommande de vérifier avant la visite les horaires de poste et les équipements de manutention. Hypothèse commerciale : une activité de préparation manuelle de commandes implique probablement des pics saisonniers, donc des besoins de renfort : à confirmer sur place. Question n° 4 : comment un salarié sans véhicule accède-t-il au site à 9 h ? Incertitude n° 1 : l'adresse exacte du site n'est pas dans nos documents. » — Le reste des instructions et de la fiche est à construire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Qu'est-ce qui, dans votre outil, empêche désormais le chiffre sans page et l'hypothèse commerciale présentée comme un fait ? Montrez la règle.`,
        `Quel contrôle gardez-vous à chaque usage : ouvrir chaque page citée avant la visite ? Combien de temps a pris cette vérification par rapport à la recherche, et qu'en concluez-vous pour une vraie tournée commerciale ?`,
        `Qui, dans votre agence, pourrait utiliser cet outil (responsable d'agence, chargés de recrutement en prospection, référent clauses), à quelle condition (pages publiques seulement, aucune donnée interne, validation des règles citées) ?`,
      ],
      fallback: `Sans assistant avec recherche en ligne : le formateur fournit un dossier de pages publiques capturées (adresse, date de capture, contexte). Les binômes rédigent les instructions et le message type sur la fiche, construisent la fiche de visite à partir des captures, notent le temps passé, précisent « travail sur captures fournies » et enregistrent l'outil au statut « en construction ». Si le dossier n'est pas disponible, une fiche partielle (hypothèses, questions, incertitudes) est acceptée ; on ne fabrique jamais de sources.`,
      prompt_starter: `Prépare une fiche de visite pour [entreprise ou secteur] dans [territoire]. Distingue les faits sourcés, les hypothèses et les questions à poser. Donne les pages précises, les dates disponibles et ne complète pas un chiffre absent. Pour toute règle évoquée, retrouve une source officielle et vérifie qu'elle est pertinente à la date de la formation. Contexte : visite d'une entreprise utilisatrice par une ETTI, informations professionnelles publiques uniquement.`,
      prompt_defaults: {
        context: `Instructions permanentes de mon outil « Fiche de visite sourcée » : je prépare, pour une ETTI (intérim d'insertion), une visite de prospection ou un rendez-vous commercial avec une entreprise utilisatrice, ou un rendez-vous avec un facilitateur de clause d'insertion. Informations professionnelles publiques uniquement.`,
        task: `Message type : prépare une fiche de visite pour {{entreprise_ou_secteur}} dans {{territoire}}. Distingue les faits sourcés, les hypothèses (dont commerciales) et les questions à poser pour cadrer une commande.`,
        data: `Aucun document interne. Points de départ : sites institutionnels publics (liste R7 : France Travail, Dares, Insee, DREETS, « Les emplois de l'inclusion ») et site de l'entreprise. Pour le cas fictif : guide de visite R5. Aucune donnée réelle : voir charte.`,
        constraints: `Ne complète pas un chiffre absent : transforme-le en question. Aucune donnée privée sur des dirigeants ou des salariés. Aucune règle juridique sans source officielle datée. Signale toute hypothèse commerciale comme hypothèse. Aucune promesse de délai ou de volume.`,
        format: `Une page : faits sourcés (page précise et date), hypothèses, règles et sources, cinq questions à l'entreprise utilisatrice (tâches confiées, compétences, horaires, accès au site sans véhicule, prochaines étapes : volume, date, tuteur, formation au poste, EPI), deux incertitudes.`,
        controls: `Donne les pages précises et les dates disponibles. Pour toute règle évoquée, retrouve une source officielle et vérifie qu'elle est pertinente à la date de la formation. Termine par la liste des pages à ouvrir avant la visite ; je les ouvrirai toutes.`,
      },
      levels: {
        guided: `Partez du modèle de départ avec le cas fictif et R5, ajoutez votre charte et vos questions de prise de commande, limitez-vous à trois faits sourcés, cinq questions et deux incertitudes ; corrigez les instructions à partir de ce que vous supprimez. Notez votre temps.`,
        autonomous: `Rédigez vos propres instructions sans la trame (seul le format de fiche est imposé), testez sur une entreprise publique de votre bassin d'emploi et documentez chaque affirmation supprimée faute de source avec la règle qu'elle a fait ajouter.`,
        bonus: `Créez une seconde variante de l'outil : « Rendez-vous facilitateur de clause d'insertion », avec un message type qui part d'un marché public identifié (informations publiques du marché uniquement) et prépare les questions sur les heures d'insertion, les postes et le calendrier, sans aucun chiffre non vérifié ni promesse de délai. Notez le temps ajouté : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['recherche'],
      production_kind: 'visit_sheet',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE} ${TOOLBOX_NOTICE}`,
      job_context: {
        task: `Construire l'outil qui prépare chaque visite de prospection, rendez-vous commercial de fidélisation ou rendez-vous avec un facilitateur de clause d'insertion : ce que l'on sait, ce que l'on suppose, ce que l'on va demander pour prendre une commande propre. Utilisateurs : responsable d'agence, chargés de recrutement en prospection, référent clauses.`,
        time_sinks: `On navigue entre le site de l'entreprise, les pages emploi, les données du secteur et des souvenirs de visites passées ; on arrive avec des chiffres non vérifiés ou sans les questions qui comptent pour prendre la commande et déléguer (tâches réelles, horaires, accès au site sans voiture, EPI, tuteur, formation au poste) ; la préparation est refaite de zéro à chaque client.`,
        delegable: `Le premier balayage des pages publiques, le rassemblement des faits avec adresses et dates, et une liste de questions à trier, par un outil dont les instructions interdisent de compléter un chiffre absent.`,
        must_verify: `Chaque chiffre et chaque règle avec la page ouverte et datée ; la séparation entre fait et hypothèse commerciale ; l'absence de donnée privée sur des personnes ; le fait que l'entreprise fictive n'a aucune page publique ; les questions de prise de commande propres à l'agence.`,
        why_etti: `Les commandes d'une ETTI viennent des entreprises utilisatrices et des clauses d'insertion des marchés publics : une visite bien préparée permet de prendre une commande compatible avec les freins des salariés (mobilité, horaires), de proposer des candidats éligibles à l'IAE sur des postes réels et de clarifier dès le départ ce qui relève de l'entreprise utilisatrice (conditions d'exécution, sécurité, formation au poste, EPI, tuteur).`,
      },
      tool_blueprint: {
        name: `Fiche de visite sourcée`,
        family: 'recherche',
        purpose: `Préparer en une page une visite de prospection, un rendez-vous commercial avec une entreprise utilisatrice ou un rendez-vous avec un facilitateur de clause d'insertion : faits reliés à des pages publiques datées, hypothèses commerciales séparées, cinq questions pour cadrer une commande, deux incertitudes.`,
        inputs: `{{entreprise_ou_secteur}} : une entreprise publique identifiée (informations professionnelles accessibles) ou un secteur d'activité (test : le cas fictif Atelier Horizon Logistique avec le guide R5, ou un secteur du bassin). {{territoire}} : le bassin d'emploi ou la commune. {{objet_du_rendez_vous}} : prospection, fidélisation, renouvellement de commande, clause d'insertion.`,
        instructions: `Rôle : tu prépares, pour une ETTI (intérim d'insertion), la fiche d'une visite ou d'un rendez-vous commercial avec une entreprise utilisatrice, ou d'un rendez-vous avec un facilitateur de clause d'insertion.
Périmètre : informations professionnelles publiques uniquement (activité, implantation, métiers, actualités publiées, données du secteur). Ne cherche jamais d'information sur une personne (dirigeant, salarié, interlocuteur).
Règle 1 : chaque fait est accompagné de l'adresse exacte de la page consultée et de sa date ; sans page, pas de fait.
Règle 2 : n'écris aucun effectif, chiffre d'affaires, volume de recrutement ou date sans page ; transforme-le en question à poser à l'entreprise utilisatrice.
Règle 3 : toute projection (« ils vont recruter », « besoin de renfort ») est une hypothèse commerciale, marquée comme telle et séparée des faits.
Règle 4 : pour toute règle évoquée (sécurité, EPI, responsabilités de l'entreprise utilisatrice, clause d'insertion), cite une source officielle avec sa date et indique qu'elle est à vérifier à la date de la visite ; sinon ne cite pas de règle.
Règle 5 : les cinq questions servent à prendre une commande propre : tâches réellement confiées, compétences et habilitations, horaires réels de la première semaine, accès au site pour un salarié sans véhicule, prochaines étapes (volume, date de début, tuteur, formation au poste, EPI fournis).
Règle 6 : adapte le ton à {{objet_du_rendez_vous}} sans promettre de délai, de volume ni de profil.
Interdits : chiffre complété, donnée privée, règle sans source, promesse, information interne de l'agence.
Format : faits sourcés / hypothèses / règles et sources / cinq questions / deux incertitudes, une page.
Contrôle : termine par la liste des pages à ouvrir avant la visite.
+ Charte de données de mes outils (coller ici).`,
        prompt_template: `Rappel : informations professionnelles publiques uniquement, aucune personne, aucune donnée interne. Prépare la fiche de visite pour {{entreprise_ou_secteur}} dans {{territoire}}, objet du rendez-vous : {{objet_du_rendez_vous}}. Selon tes instructions : faits avec page et date, hypothèses commerciales séparées, règles avec source officielle, cinq questions pour cadrer la commande, deux incertitudes, puis la liste des pages à ouvrir.`,
        output_format: `Fiche d'une page : 1. Faits sourcés (fait — adresse de page — date de consultation — passage) ; 2. Hypothèses, dont commerciales ; 3. Règles évoquées et source officielle datée ; 4. Cinq questions à l'entreprise utilisatrice ; 5. Deux incertitudes ; 6. Pages à ouvrir avant la visite. Mention : « sources publiques uniquement ; aucune donnée privée sur des personnes ».`,
        verification: [
          `Ouvrir chaque page citée : le passage existe et contient le fait ; noter la date.`,
          `Aucun chiffre sans page ; les chiffres et le territoire sont cohérents (même périmètre, même période).`,
          `Les hypothèses commerciales sont séparées des faits et aucune n'est écrite au présent de l'indicatif comme un fait.`,
          `Chaque règle citée a une source officielle, datée, pertinente à la date de la visite.`,
          `Aucune donnée privée sur une personne ; pour le cas fictif, aucune « source » sur l'entreprise fictive (elle n'a pas de page publique).`,
          `Les cinq questions couvrent tâches, compétences, horaires, accès sans véhicule et prochaines étapes (volume, date, tuteur, formation au poste, EPI).`,
        ],
        data_rules: `Entrées autorisées : nom d'une entreprise publique ou d'un secteur, territoire, objet du rendez-vous. Jamais : nom d'une personne, informations internes de l'agence sur ce client (historique de commandes, tarifs, incidents), données de salariés délégués. Risque propre : la recherche web ajoute des informations extérieures et parfois obsolètes ; chaque page est ouverte et datée avant usage. Outil autorisé par la structure uniquement.`,
        fallback: `Sans assistant avec recherche en ligne : remplir le format de fiche à la main à partir du site de l'entreprise, des pages institutionnelles de la liste R7 et des documents internes de prospection, en notant adresse et date pour chaque fait ; les hypothèses et les cinq questions se préparent sans outil.`,
      },
    },
    private_content: {
      answer_key: `## Outil abouti (exemple complet)

### Instructions permanentes
Rôle : préparer une fiche de visite ou de rendez-vous commercial pour une ETTI (intérim d'insertion). Périmètre : public, jamais de personne. Règles : page + date pour chaque fait ; chiffre sans page → question ; projection → hypothèse ; règle → source officielle datée ; cinq questions orientées prise de commande ; ton selon l'objet, sans promesse. Interdits : chiffre complété, donnée privée, règle sans source, information interne. Format fixé. Contrôle : pages à ouvrir. Charte collée.

### Message type
« Rappel : public uniquement. Fiche pour {{entreprise_ou_secteur}} dans {{territoire}}, objet : {{objet_du_rendez_vous}}… »

### Sortie attendue (cas fictif avec R5)
- Faits sourcés : uniquement ceux de R5 (recommandations du guide fictif : vérifier horaires de poste et équipements de manutention) et des pages publiques sur le secteur de la logistique dans le territoire choisi (France Travail, Dares, Insee, DREETS), chacune avec adresse et date.
- Hypothèses commerciales : pics saisonniers et besoins de renfort, à confirmer sur place.
- Règles : responsabilité de l'entreprise utilisatrice sur les conditions d'exécution, la sécurité, la formation au poste et les EPI, avec source officielle datée et mention « à vérifier à la date de la visite ».
- Cinq questions : tâches réellement confiées ; compétences et habilitations ; horaires réels de la première semaine ; accès au site sans véhicule ; prochaines étapes (volume, date de début, tuteur, formation au poste, EPI fournis).
- Incertitudes : adresse exacte du site ; horaires de la semaine suivante ; accès en transport en commun ; rémunération (relève du contrat de mission).
- Pages à ouvrir : la liste.
- Rappel : Atelier Horizon Logistique est fictive ; toute « source » la concernant est une invention.

### Une fiche est satisfaisante quand
Chaque fait déterminant a page, date et passage ; les hypothèses sont nommées ; aucune règle sans source ; les cinq questions couvrent la prise de commande ; les deux incertitudes sont de vraies inconnues.

## Pièges (sortie de test et outil)
- Effectif ou chiffre d'affaires sans page : règle 2 manquante.
- Besoin de recrutement sans page datée (hypothèse commerciale en fait) : règle 3.
- « La loi impose… » sans source : règle 4.
- Nom d'un dirigeant ou d'un responsable d'entrepôt : périmètre et charte.
- Source « retrouvée » dont la page ne contient pas le passage : point de vérification 1.
- Informations internes sur le client collées dans l'assistant « pour contextualiser » : règles de données.
- Outil non réutilisable : questions de prise de commande absentes des instructions ; emplacements remplis dans la fiche.

## Bonus : variante « Rendez-vous facilitateur de clause d'insertion »
Message type : « À partir des informations publiques du marché {{marche_public}} dans {{territoire}}, prépare les questions sur les heures d'insertion prévues, les postes concernés, le calendrier et l'interlocuteur du titulaire ; aucun chiffre sans page, aucune promesse de délai ni de profil. »

## Lecture du temps observé
La vérification des sources prend souvent plus de temps que la recherche : c'est normal et c'est la part qui ne se délègue pas. Le temps noté vaut pour cette fiche et ce territoire.`,
      trainer_notes: `## Animation
- Modèle de départ et démonstration (8 min) : afficher la fiche du modèle, lancer le message type sur un secteur, ouvrir une page citée en direct et montrer qu'un passage existe… ou pas ; choisir à l'avance un exemple où l'assistant se trompe (chiffre de recrutement sans page) et montrer la règle ajoutée puis la relance. Lancer le chronomètre visible.
- Préparer le dossier de captures de secours avant la séance, même si les outils fonctionnent.
- Si des participants travaillent avec des facilitateurs de clauses, les laisser tester la variante facilitateur avec les mêmes règles (informations publiques du marché uniquement).

## Transformer un prompt ponctuel en outil
- Ce qui ne change pas : périmètre public, règles de sourçage, questions de prise de commande, format → instructions. Ce qui change : entreprise ou secteur, territoire, objet → emplacements.
- Juger la réutilisabilité : les cinq questions sont-elles celles que l'agence pose vraiment pour prendre une commande ? L'outil sert-il aussi pour un rendez-vous de fidélisation ou de renouvellement ?
- Chaque règle renvoie à une affirmation supprimée pendant le test.

## Pièges fréquents
- Fiche remplie de chiffres non ouverts : imposer les 10 minutes de vérification des sources comme un temps à part, écran de recherche fermé.
- Binômes qui cherchent des informations sur des personnes : « informations professionnelles publiques seulement ».
- Cas fictif : certains cherchent Atelier Horizon Logistique sur le web ; expliquer qu'elle n'existe pas et que c'est volontaire.
- Questions qui oublient la délégation : vérifier que l'accès au site sans véhicule, le tuteur et la formation au poste figurent dans les cinq questions.
- Historique commercial du client collé dans l'assistant : règles de données.

## Rythmes différents
- Rapides : entreprise publique réelle (niveau autonome) ou variante facilitateur (bonus).
- Lents : cas fictif avec R5, trois faits maximum, effort sur les questions et les incertitudes ; enregistrer au statut « en construction ».

## Débrief
Demander à chaque binôme l'affirmation supprimée la plus surprenante, la règle qu'elle a fait ajouter, et le rapport entre temps de recherche et temps de vérification.`,
    },
  },

  // ---------------------------------------------------------------------
  // SÉANCE 2
  // ---------------------------------------------------------------------
  {
    code: 'REA',
    title: `Réactivation : mes outils de la séance 1 fonctionnent-ils encore ?`,
    seance: 2,
    position: 6,
    duration_min: 10,
    breakdown: [
      { label: 'Retour', minutes: 5 },
      { label: 'Réflexion individuelle', minutes: 5 },
    ],
    content: {
      objective: `À la fin de la séquence, chaque participant a retesté rapidement un outil enregistré en séance 1 sur le cas fictif, a noté s'il produit encore une sortie fidèle sans réécriture, ce qui a été utilisé ou tenté au poste depuis (sans donnée réelle), et ce qu'il veut corriger en séance 2.`,
      brief: `Pendant cinq minutes, le formateur revient sur les outils enregistrés en séance 1 (quelques fiches montrées avec l'accord de leurs auteurs) : les règles les plus utiles ajoutées après test, les inventions qu'elles empêchent (commande « confirmée », rémunération « estimée », trajet « validé », chiffre sans page), et les temps observés, présentés comme des mesures sur un cas fictif et non comme des gains acquis. Il rappelle les trois réflexes que chaque outil doit porter : source citée, vérification écrite, responsabilité du permanent. Ensuite, pendant cinq minutes, vous retestez seul un de vos outils : ouvrez sa fiche dans votre boîte à outils, relancez son message type sur le document fictif du test (R1 / R2 pour le compte rendu, R2 à R5 pour la FAQ, R5 pour la fiche de visite) dans l'outil autorisé, et répondez en quelques lignes : la sortie est-elle encore fidèle ? Ai-je dû réécrire quelque chose dans le message pour que ça marche (signe que l'instruction manque dans la fiche) ? Qu'ai-je essayé au poste depuis la séance 1 (sans donnée réelle de salarié, d'entreprise utilisatrice ou de prescripteur) ? Que veux-je corriger aujourd'hui ? Le lexique R10 reste disponible. Ces notes servent au défi individuel et au plan de déploiement.`,
      resource_codes: ['R10'],
      steps: [
        `Écouter le retour du formateur sur les outils enregistrés et les temps observés de la séance 1.`,
        `Ouvrir la fiche d'un de ses outils dans la boîte à outils et relancer son message type sur le document fictif du test, dans l'outil autorisé (ou relire la fiche et la sortie enregistrée si aucun outil n'est disponible).`,
        `Noter si la sortie est encore fidèle et si une consigne a dû être ajoutée à la main dans le message : si oui, c'est une instruction à ajouter à la fiche.`,
        `Écrire ce que l'on a essayé au poste depuis la séance 1, sans donnée réelle, et ce qui a tenu.`,
        `Écrire ce que l'on veut corriger ou finaliser en séance 2, et relier chaque outil à un des trois réflexes (source, vérification, responsabilité).`,
      ],
      deliverable: `Une note individuelle courte : outil retesté, résultat du retest (fidèle / à corriger, consigne ajoutée à la main ou non), ce qui a été essayé au poste sans donnée réelle, ce que je veux corriger aujourd'hui, et les trois réflexes avec l'outil qui les porte.`,
      success_criteria: [
        `Un outil a été retesté (ou sa fiche relue avec sa sortie enregistrée) et le résultat est noté précisément (pas seulement « ça marche »).`,
        `Toute consigne ajoutée à la main dans le message est identifiée comme une instruction manquante dans la fiche.`,
        `La note ne contient aucune donnée réelle de la structure, d'un salarié en parcours, d'une entreprise utilisatrice ou d'un prescripteur.`,
        `Les trois réflexes sont nommés avec les mots du participant et l'outil de sa boîte qui les porte.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Ai-je dû ajouter une consigne à la main pour que ça marche ?`,
          text: `Le signe d'un outil mal fini n'est pas une mauvaise sortie, c'est le réflexe de compléter le message au moment de l'usage (« et n'écris pas confirmé », « et retiens la V2 »). Chaque consigne ajoutée à la main est une instruction qui manque dans la fiche : notez-la, elle sera corrigée au défi individuel.`,
        },
        {
          level: 'trame',
          title: `Squelette de note`,
          text: `Outil retesté : [nom]. Document fictif utilisé : [R…]. Résultat : [sortie fidèle / invention repérée : …]. Consigne ajoutée à la main : [aucune / « … » → à ajouter aux instructions]. Essayé au poste depuis la séance 1 (sans donnée réelle) : [rien / un test sur …, résultat …]. À corriger aujourd'hui : [...]. Réflexes : source → [outil …] ; vérification → [outil …] ; responsabilité → [c'est moi qui envoie …].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple`,
          text: `« Outil retesté : Compte rendu de suivi → plan d'action, sur R1 / R2. Résultat : fidèle, mais j'ai ajouté à la main “n'indique pas d'arrêt de bus” : règle à ajouter. Essayé au poste : un compte rendu sur mes notes sans nom, la vérification des dates a tenu en quelques minutes ; non chronométré. À corriger : la règle sur le trajet et le format du tableau pour mon logiciel d'agence. »`,
        },
      ],
      debrief_questions: [
        `Quel outil de la séance 1 a demandé une consigne ajoutée à la main au retest ? Qu'est-ce que cela dit de sa fiche ?`,
        `Quel réflexe (source, vérification, responsabilité) vous semble le plus facile à garder dans les outils que vous déploierez en agence ?`,
      ],
      fallback: `Sans application ni outil : relire la fiche papier de l'outil et sa sortie de test de la séance 1, répondre aux mêmes questions sur papier ; la note est conservée par le participant pour le défi individuel.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Séquence de réactivation : retest rapide d'un outil enregistré en séance 1.`,
        task: `Relancer le message type de mon outil sur le document fictif de son test et noter le résultat.`,
        data: `Le document fictif du test de l'outil, aucune donnée réelle.`,
        constraints: `Pas de donnée réelle de salarié, d'entreprise utilisatrice ni de prescripteur ; aucune consigne ajoutée à la main sans la noter.`,
        format: `Quelques lignes.`,
        controls: `Comparer la sortie à la sortie enregistrée en séance 1 et aux points de vérification de la fiche.`,
      },
      levels: {
        guided: `Retestez l'outil de l'atelier 1 avec le squelette de note.`,
        autonomous: `Retestez l'outil de votre choix, puis reliez chaque consigne ajoutée à la main à la règle à écrire dans la fiche.`,
        bonus: `Formulez une question que vous poseriez à un collègue d'agence qui reprendrait votre outil, pour vérifier qu'il a compris quel contrôle garder avant l'envoi. Non évalué.`,
      },
      work_mode: 'individual',
      families: [],
      production_kind: 'review',
      deposit_notice: DEPOSIT_NOTICE,
      job_context: {
        task: `Vérifier qu'un outil enregistré fonctionne encore sans réécriture après quelques jours de travail en agence, avant de le finaliser et de le proposer à des collègues.`,
        time_sinks: `Entre les deux séances, les commandes, les délégations, les relevés d'heures et les points prescripteur ont repris le dessus ; sans retest, on oublie les consignes ajoutées à la main et l'outil se dégrade en prompt ponctuel.`,
        delegable: `Le retest lui-même est fait par l'outil ; l'analyse du résultat, non.`,
        must_verify: `Que la sortie du retest est fidèle, qu'aucune consigne n'a été ajoutée à la main sans être reportée dans la fiche, et que les notes ne contiennent aucune donnée réelle.`,
        why_etti: `Les trois réflexes (source, vérification, responsabilité) correspondent aux gestes quotidiens de l'intérim d'insertion : lire la bonne version de la commande, vérifier auprès de l'entreprise utilisatrice avant d'annoncer, assumer ce qui est transmis au salarié, au client et au prescripteur ; un outil déployé dans l'agence doit les porter sans que chacun les réinvente.`,
      },
    },
    private_content: {
      answer_key: `## Les trois réflexes et l'outil qui les porte

- Source : chaque information vient d'un document ou d'une page identifiée et datée → règles de citation des outils A2 et A3, emplacement {{fiche_mission}} de A1.
- Vérification : on ouvre le passage, on compare, on corrige ou on supprime → points de vérification de chaque fiche.
- Responsabilité : la personne qui envoie reste responsable, pas l'outil → le compte rendu, le courriel de délégation, le point prescripteur portent le nom du permanent ; la fiche dit qui vérifie avant quel envoi.

## Note individuelle
Pas de corrigé : on attend un résultat de retest précis et au moins une instruction manquante identifiée, ou le constat argumenté qu'il n'en manque pas.

## Temps observés
Les rappeler comme des mesures sur un cas fictif ; aucun gain général n'en découle.`,
      trainer_notes: `## Animation
- Montrer deux ou trois fiches d'outils de la séance 1 avec accord des auteurs ; mettre en avant les règles ajoutées après test, pas les erreurs.
- Présenter les temps observés de façon neutre (fourchettes, sans classement), en rappelant qu'ils incluent l'adaptation et la vérification et valent pour le cas fictif.
- Rappeler que le défi individuel reprend un outil de la boîte : les participants doivent avoir leurs fiches sous la main.

## Pièges fréquents
- Participants qui ont testé entre les deux séances sur des données réelles (vraies notes, relevés d'heures, export de la plateforme) : accueillir le retour, rappeler la règle, ne pas afficher le résultat.
- Retest « ça marche » sans comparaison : demander quel point de vérification a été coché.
- Temps qui déborde : 10 minutes, pas plus ; la séance 2 est dense.`,
    },
  },

  {
    code: 'A4',
    title: `Atelier 4 — Outil « Procédure → schéma fidèle »`,
    seance: 2,
    position: 7,
    duration_min: 40,
    breakdown: [
      { label: 'Modèle de départ et démonstration', minutes: 5 },
      { label: 'Production', minutes: 25 },
      { label: 'Contrôle', minutes: 7 },
      { label: 'Débrief', minutes: 3 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque participant a construit, testé sur la procédure d'accueil fictive R4 et enregistré dans sa boîte à outils un outil « Procédure → schéma fidèle » qui transforme une procédure de l'agence en schéma d'étapes conservant l'ordre, le point de validation du permanent responsable et les inconnues, sans décision ni étape ajoutée, compréhensible par un salarié en parcours d’insertion, contrôlé par un pair, et a noté le temps réellement passé.`,
      brief: `En intérim d'insertion, les procédures existent en texte mais s'expliquent à l'oral, et souvent : le parcours d'accueil et de diagnostic à chaque nouveau salarié, le circuit d'une commande à chaque nouveau collègue, l'accueil sécurité avant une délégation, le traitement d'un relevé d'heures ou d'une fin de mission. Chaque nouvelle version de procédure rend le schéma précédent faux. Au module 1 vous avez produit un schéma ; aujourd'hui vous construisez l'outil qui en fera un fidèle à chaque procédure et à chaque version. Seul, partez du modèle de départ (instructions permanentes, message type avec {{procedure}} et {{destinataire}}, format : blocs numérotés, validation humaine visible, règle sur les inconnues). Adaptez-le à votre structure : vos procédures, vos destinataires (salarié qui découvre l'agence, nouveau collègue, prescripteur, entreprise utilisatrice), votre charte de données. Testez-le sur R4 (procédure d'accueil et de diagnostic IAE, V2 du 16/09/2026, document fictif) avec l'outil de schématisation autorisé (Napkin ou équivalent) : le schéma doit conserver l'ordre des six étapes, faire apparaître l'étape 4 (validation par le permanent responsable) comme point de validation humaine, montrer la règle « un point inconnu est attribué à un responsable, jamais complété par supposition », en libellés courts avec des verbes simples. Les outils adorent ajouter des losanges et des étapes de la vraie vie (« PASS IAE validé ? », « contrat signé », « formation ») : chaque ajout repéré devient un interdit dans vos instructions ; relancez. Exportez le schéma (PNG ou PDF), puis faites-le contrôler par un pair qui joue le salarié à qui on explique l'accueil : il doit retrouver les six étapes dans l'ordre et le point de validation sans lire R4. Enregistrez l'outil avec sa fiche et notez le temps observé (adaptation, production, corrections, export).`,
      resource_codes: ['R4'],
      steps: [
        `Lire le modèle de départ et R4 en entier ; numéroter les six étapes sur papier, entourer le point de validation et la règle sur les inconnues ; démarrer le chronomètre.`,
        `Adapter les instructions à sa structure : types de procédures de l'agence (accueil, circuit de commande, accueil sécurité, relevé d'heures, fin de mission), destinataires, charte de données.`,
        `Tester sur le cas fictif : envoyer le message type avec {{procedure}} = texte de R4 et {{destinataire}} = salarié qui découvre l'agence, dans l'outil de schématisation autorisé.`,
        `Vérifier avec la grille : même ordre, six étapes, aucune étape ajoutée, fusionnée ni supprimée, validation humaine visible, règle sur les inconnues présente sans devenir une décision, libellés courts sans sigle.`,
        `Corriger l'outil : chaque ajout de l'outil (losange, étape PASS IAE, contrat, formation) devient un interdit explicite dans les instructions ; relancer et comparer.`,
        `Exporter en PNG ou PDF, rédiger trois à cinq lignes sur le choix visuel, puis faire contrôler par un pair qui joue le salarié et redit les six étapes sans lire R4 ; corriger ce qu'il n'a pas compris.`,
        `Enregistrer l'outil dans sa boîte à outils avec la fiche complète et le résumé du test (ajouts supprimés, retour du pair).`,
        `Arrêter le chronomètre et remplir le champ « Temps sur cette tâche » avant le dépôt.`,
      ],
      deliverable: `L'outil « Procédure → schéma fidèle » enregistré dans la boîte à outils avec sa fiche complète + le test : schéma de six étapes (PNG ou PDF), ajouts de l'outil repérés et interdits ajoutés, courte explication du choix visuel, retour du pair qui a contrôlé la compréhension + l'outil utilisé + le temps observé (adaptation + production + corrections + export) dans le champ prévu, mesure de cette tâche et non promesse générale.`,
      success_criteria: [
        `La sortie finale est fidèle à R4 : six étapes dans l'ordre, sans étape ajoutée, fusionnée ni supprimée, aucune décision ni obligation absente du texte, point de validation humaine (étape 4) visible au premier regard, règle sur les inconnues présente.`,
        `L'outil est réutilisable : instructions permanentes avec les interdits (pas de décision, pas d'étape de la vraie vie absente du texte), message type avec {{procedure}} et {{destinataire}}, format de schéma fixé, liste des procédures de l'agence à schématiser notée dans la fiche.`,
        `La vérification est intégrée : les instructions demandent de lister ce que l'outil n'a pas pu représenter ; la fiche impose de compter les formes et de faire redire les étapes par un pair ; le test l'a appliqué.`,
        `Les règles de données reprennent la charte : seules des procédures sans donnée personnelle entrent dans l'outil ; le schéma destiné au salarié ne contient aucun sigle non expliqué.`,
        `Au moins un interdit des instructions est justifié par un ajout observé au test, et un collègue pourrait reprendre l'outil pour une autre procédure avec la fiche seule.`,
        `Le retour du pair et le temps observé sont renseignés.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Combien de formes, et laquelle n'est pas dans le texte ?`,
          text: `Comptez les formes du schéma : plus de six étapes, ou une question (« éligible ? », « PASS IAE validé ? »), c'est un ajout. La seule validation du texte est l'étape 4 ; la règle sur les inconnues est une consigne, pas une décision. L'éligibilité IAE, le PASS IAE, le contrat de mission existent dans la vraie vie, mais R4 ne les décrit pas : l'instruction à ajouter dans votre outil est « ne représente que ce que le texte décrit ; n'ajoute ni décision, ni étape, ni obligation, même si elle existe dans la pratique de l'agence ; liste à part ce que tu n'as pas pu représenter ».`,
        },
        {
          level: 'trame',
          title: `Squelette d'instructions permanentes`,
          text: `Rôle : tu transformes une procédure écrite de [mon ETTI, intérim d'insertion] en schéma pour [{{destinataire}}]. Règles : 1) représente uniquement les étapes [présentes dans {{procedure}}], dans [leur ordre], en [autant de blocs que d'étapes] ; 2) mets en évidence [chaque point de validation humaine nommé dans le texte] par [un cadre / une forme distincte] ; 3) reporte [les règles ou consignes du texte] en [note], jamais en [décision supplémentaire] ; 4) libellés de [six à huit mots], [verbe simple], [sans sigle non expliqué] ; 5) si le destinataire est [un salarié qui découvre l'agence], [deuxième personne, vocabulaire courant]. Interdits : [losange de décision, étape ou obligation absente du texte (PASS IAE, contrat, formation), fusion d'étapes, changement de sens]. Format : [linéaire, blocs numérotés, note sous le schéma]. Contrôle : [liste ce que tu n'as pas pu représenter]. + Charte de données.`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (un interdit et trois libellés)`,
          text: `Interdit de l'outil : « N'ajoute aucune question ni condition (“éligible ?”, “validé ?”) : si le texte ne décrit pas de refus ni de bifurcation, le schéma n'en a pas. » Libellés attendus pour le salarié : étape 1 « On écoute votre demande et on explique l'accueil » ; étape 2 « On note vos compétences et vos disponibilités utiles » ; étape 4 (cadre renforcé) « Le responsable de l'agence valide le projet de mission ». Note sous le schéma : « Ce qu'on ne sait pas encore : quelqu'un est chargé de le demander, on ne suppose pas ». — Les étapes 3, 5 et 6, les autres règles et le choix visuel sont à produire par le participant.`,
        },
      ],
      debrief_questions: [
        `Qu'est-ce qui, dans votre outil, empêche désormais l'ajout d'une décision ou d'une étape de la vraie vie (PASS IAE, contrat, formation) ? Montrez l'interdit.`,
        `Quel contrôle gardez-vous à chaque usage : compter les formes, faire redire les étapes par quelqu'un qui n'a pas lu le texte ? Qu'a révélé le pair que vous n'aviez pas vu ?`,
        `Qui, dans votre agence, pourrait utiliser cet outil (accueil, intégration des nouveaux collègues, accueil sécurité avant délégation), à quelle condition (procédure validée et à jour, sans donnée personnelle, relecture par le responsable) ?`,
      ],
      fallback: `Sans outil de schématisation : rédiger les instructions et le message type sur la fiche, puis utiliser les six blocs éditables de l'application (un bloc par étape, libellé court, marqueur de validation) et imprimer en PDF depuis le navigateur ; le contrôle par un pair et la note du temps se font de la même manière ; enregistrer l'outil au statut « en construction » avec la note « test à faire dès qu'un outil autorisé est disponible ».`,
      prompt_starter: `Transforme cette procédure en un schéma de six étapes. Conserve l'ordre, les points de validation et les inconnues. Utilise des verbes simples et des libellés courts. N'ajoute pas de décision ni d'obligation absente du texte. Contexte : procédure d'accueil d'une ETTI fictive, schéma destiné à être expliqué à un salarié en parcours d’insertion.`,
      prompt_defaults: {
        context: `Instructions permanentes de mon outil « Procédure → schéma fidèle » : je travaille dans une ETTI fictive (Agence Horizon, intérim d'insertion). Les procédures fournies sont des textes internes sans donnée personnelle. Le schéma s'adresse à {{destinataire}} (salarié qui découvre l'agence, nouveau collègue, prescripteur, entreprise utilisatrice).`,
        task: `Message type : transforme {{procedure}} en un schéma d'étapes pour {{destinataire}}.`,
        data: `{{procedure}} = texte intégral de R4 (V2 du 16/09/2026) pour le test ; {{destinataire}} = salarié en parcours d’insertion qui découvre l'agence. Aucune donnée réelle : voir charte.`,
        constraints: `Conserve l'ordre, les points de validation et les inconnues. N'ajoute pas de décision, d'étape ni d'obligation absente du texte (pas d'étape PASS IAE, contrat, formation). Pas de fusion d'étapes. Pas de sigle non expliqué. Libellés courts, verbes simples.`,
        format: `Schéma linéaire de blocs numérotés (autant que d'étapes), validation humaine mise en évidence, règle sur les points inconnus en note sous le schéma.`,
        controls: `Termine par la liste de ce que tu n'as pas pu représenter. Je compterai les formes, je comparerai chaque bloc avec le texte et je ferai redire les étapes par un pair qui ne l'a pas lu.`,
      },
      levels: {
        guided: `Partez du modèle de départ, ajoutez votre charte et vos destinataires, testez sur R4, corrigez les instructions à partir des ajouts de l'outil, puis faites contrôler par un voisin. Notez votre temps.`,
        autonomous: `Rédigez vos propres instructions sans la trame (seul le format de blocs est imposé), testez sur R4, puis produisez une seconde sortie avec {{destinataire}} = nouveau collègue permanent et expliquez ce que l'outil a changé et ce qu'il n'aurait pas dû changer.`,
        bonus: `Testez votre outil sur une autre procédure fictive courte que vous écrivez vous-même en cinq étapes (par exemple le circuit d'un relevé d'heures : réception, vérification avec la commande, validation par le responsable, transmission à la paie, archivage ; aucun nom, aucun montant) et vérifiez qu'il reste fidèle. Notez le temps ajouté : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'individual',
      families: ['schemas'],
      production_kind: 'process_blocks',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE} ${TOOLBOX_NOTICE}`,
      job_context: {
        task: `Construire l'outil qui transforme chaque procédure de l'agence (accueil et diagnostic IAE, circuit de commande, accueil sécurité avant délégation, relevé d'heures, fin de mission) en un schéma que l'on peut montrer à un salarié en parcours d’insertion, à un nouveau collègue, au prescripteur ou à l'entreprise utilisatrice. Utilisateurs : tout permanent ; en priorité accueil et intégration.`,
        time_sinks: `La procédure existe en texte, mais on la réexplique oralement à chaque accueil, chaque intégration de collègue, chaque accueil sécurité ; les schémas faits à la main vieillissent dès que la procédure change de version, et chacun refait le sien.`,
        delegable: `La première mise en forme graphique à partir du texte collé et une ou deux propositions de disposition, par un outil dont les instructions interdisent d'ajouter des décisions et des étapes.`,
        must_verify: `Le nombre et l'ordre des étapes, l'absence de toute décision ou étape ajoutée (éligibilité, PASS IAE, contrat, formation), la visibilité du point de validation du permanent responsable, la compréhension par un pair sans le texte, l'absence de sigle non expliqué pour le salarié.`,
        why_etti: `L'accueil en ETTI enchaîne diagnostic socioprofessionnel, vérification de la commande et validation par le permanent responsable avant toute proposition de mission au salarié : un schéma fidèle évite d'annoncer une mission non validée, donne au salarié une vue claire de ce qui l'attend, et s'applique aussi aux circuits de l'intérim (commande, délégation, relevé d'heures, fin de mission).`,
      },
      tool_blueprint: {
        name: `Procédure → schéma fidèle`,
        family: 'schemas',
        purpose: `Transformer une procédure écrite de l'agence en schéma d'étapes fidèle (même ordre, mêmes étapes, points de validation humaine visibles, inconnues conservées), adapté au destinataire, pour l'expliquer à un salarié en parcours d’insertion, à un nouveau collègue, au prescripteur ou à l'entreprise utilisatrice.`,
        inputs: `{{procedure}} : le texte intégral de la procédure dans sa dernière version, sans donnée personnelle (test : R4, V2 du 16/09/2026). {{destinataire}} : salarié qui découvre l'agence, nouveau collègue permanent, prescripteur, entreprise utilisatrice. Facultatif : {{disposition}} (ligne, colonne, blocs).`,
        instructions: `Rôle : tu transformes une procédure écrite d'une ETTI (intérim d'insertion) en schéma d'étapes pour {{destinataire}}.
Source : uniquement {{procedure}}. Ne complète jamais avec la pratique habituelle d'une agence d'intérim ou de l'IAE.
Règle 1 : représente uniquement les étapes présentes dans le texte, dans leur ordre, en autant de blocs numérotés que d'étapes ; ne fusionne ni ne scinde aucune étape.
Règle 2 : mets en évidence chaque point de validation humaine nommé dans le texte (cadre ou forme distincte, avec « par qui »).
Règle 3 : reporte les règles ou consignes du texte (par exemple « un point inconnu est attribué à un responsable, jamais complété par supposition ») en note sous le schéma, jamais en décision supplémentaire.
Règle 4 : libellés de six à huit mots, un verbe simple, aucun sigle non expliqué.
Règle 5 : si le destinataire est un salarié qui découvre l'agence, écris à la deuxième personne avec un vocabulaire courant (« l'entreprise où vous irez ») ; pour un collègue, garde les termes du texte.
Interdits : losange ou question de décision (« éligible ? », « validé ? ») absente du texte ; étape ou obligation absente du texte même si elle existe dans la pratique (PASS IAE, contrat de mission, formation, relevé d'heures) ; changement de sens d'un libellé (« toutes les informations » au lieu de « uniquement les nécessaires »).
Format : schéma linéaire (ligne ou colonne), blocs numérotés, validation humaine mise en évidence, note sous le schéma.
Contrôle : termine par la liste de ce que tu n'as pas pu représenter et des étapes dont le libellé a été raccourci.
+ Charte de données de mes outils (coller ici).`,
        prompt_template: `Rappel : procédure interne sans donnée personnelle, aucune donnée réelle. Transforme la procédure ci-dessous en schéma d'étapes pour {{destinataire}}, selon tes instructions : même ordre, autant de blocs que d'étapes, validation humaine visible, règles en note, aucune décision ni étape ajoutée. Disposition souhaitée : {{disposition}}. Procédure : {{procedure}}`,
        output_format: `Schéma linéaire de blocs numérotés (un par étape du texte), libellés courts, point(s) de validation humaine mis en évidence avec « par qui », note sous le schéma pour les règles du texte, puis liste de ce qui n'a pas pu être représenté. Export PNG ou PDF, accompagné d'une explication du choix visuel en trois à cinq lignes rédigée par le permanent.`,
        verification: [
          `Compter les formes : autant de blocs que d'étapes dans le texte (test : six), aucune question ni bifurcation.`,
          `Comparer chaque bloc au texte : même ordre, même sens, aucune étape fusionnée ni ajoutée (test : pas de PASS IAE, contrat, formation).`,
          `Le point de validation humaine est visible au premier regard avec « par qui » (test : étape 4, permanent responsable).`,
          `La règle sur les inconnues figure en note, pas en décision.`,
          `Un pair qui n'a pas lu le texte redit les étapes dans l'ordre et nomme la validation ; ce qu'il n'a pas compris est corrigé.`,
          `Pour un destinataire salarié : aucun sigle non expliqué, taille lisible une fois exporté.`,
        ],
        data_rules: `Entrées autorisées : procédures internes validées, sans nom, sans exemple nominatif, sans donnée de salarié ou de client. Jamais : procédure contenant un cas réel, capture d'écran du logiciel d'agence avec des noms, extrait de la plateforme. Vérifier les conditions d'usage et d'export de l'outil de schématisation (compte, conservation des textes collés). Outil autorisé par la structure uniquement.`,
        fallback: `Sans outil de schématisation : les six blocs éditables de l'application ou un tableau de blocs numérotés dans un outil bureautique, un bloc par étape, un cadre pour la validation, une note pour les règles ; impression en PDF ; mêmes points de vérification.`,
      },
    },
    private_content: {
      answer_key: `## Outil abouti (exemple complet, cas fictif Agence Horizon)

### Instructions permanentes
Rôle : transformer une procédure écrite en schéma pour {{destinataire}}. Source : le texte seulement. Règles : autant de blocs que d'étapes, même ordre ; validation humaine mise en évidence avec « par qui » ; consignes en note ; libellés six à huit mots, verbe simple, sans sigle ; deuxième personne pour le salarié. Interdits : décision, étape ou obligation absente du texte (PASS IAE, contrat, formation, relevé d'heures), fusion, changement de sens. Contrôle : liste de ce qui n'a pas pu être représenté. Charte collée.

### Sortie attendue sur R4 (V2 du 16/09/2026)
Six blocs dans cet ordre : 1. Recueillir la demande et expliquer le déroulement. 2. Relever uniquement les compétences et disponibilités nécessaires. 3. Vérifier les informations de la mission et les points inconnus. 4. Faire valider le projet de mission par le permanent responsable (validation humaine, mise en évidence). 5. Expliquer les prochaines actions. 6. Fixer un point de suivi et consigner les actions. Note : un point inconnu est attribué à un responsable, jamais complété par supposition. Liste finale : rien d'omis ; libellés raccourcis signalés.
Version salarié acceptée : « On écoute votre demande et on explique l'accueil », « On note vos compétences et vos disponibilités utiles », « Le responsable de l'agence valide le projet de mission »…

### Ce qui est accepté
Linéaire horizontal ou vertical, blocs numérotés, une couleur ou un cadre pour l'étape 4 ; la règle sur les inconnues en note, en bandeau ou rattachée à l'étape 3 ; libellés à la deuxième personne tant que le sens est conservé.

### Ce qui n'est pas accepté
Losange « mission validée ? » ou « éligible IAE ? » ; étape « relancer l'entreprise utilisatrice », « signer le contrat de mission », « délivrer le PASS IAE », « formation au poste » ; étapes 5 et 6 fusionnées ; libellé qui change le sens ; sigle non expliqué pour le salarié.

## Pièges (sortie de test et outil)
- Schéma « enrichi » avec des décisions ou des étapes IAE réelles : interdit manquant ; revenir au texte, la vraie vie n'est pas dans R4.
- Libellés trop longs ou pleins de sigles : règle 4.
- Contrôle par un pair bâclé : le pair doit redire les six étapes sans regarder R4.
- Outil non réutilisable : destinataire codé en dur dans les instructions ; liste des procédures de l'agence absente de la fiche.

## Bonus : autre procédure fictive (circuit d'un relevé d'heures en cinq étapes)
L'outil doit produire cinq blocs, une validation (responsable), aucune étape de paie ajoutée au-delà de « transmission à la paie », aucun montant.

## Lecture du temps observé
Le temps noté inclut l'adaptation, les corrections et l'export ; au poste, l'outil sera relancé à chaque nouvelle version de procédure. La mesure vaut pour ce document.`,
      trainer_notes: `## Animation
- Modèle de départ et démonstration (5 min) : afficher la fiche du modèle, coller R4, lancer le message type, montrer un ajout typique (décision « éligible ? », étape « contrat »), ajouter l'interdit dans les instructions et relancer. Lancer le chronomètre visible.
- Prévoir les six blocs éditables de l'application comme secours ; les montrer en 30 secondes.
- Pour le contrôle par un pair : le pair joue le salarié qui découvre l'agence et redit les étapes à voix haute.

## Transformer un prompt ponctuel en outil
- Ce qui ne change pas : règles de fidélité, interdits, format, contrôle → instructions. Ce qui change : procédure, destinataire, disposition → emplacements.
- Juger la réutilisabilité : l'outil marche-t-il pour une autre procédure (circuit de commande, accueil sécurité, relevé d'heures) sans réécriture ? Le bonus le vérifie.
- Chaque interdit renvoie à un ajout observé.

## Pièges fréquents
- Participants qui suppriment l'ajout dans le schéma sans écrire l'interdit : exiger la règle.
- Libellés trop longs : règle des six à huit mots.
- Procédure réelle de l'agence collée avec un exemple nominatif : charte.

## Rythmes différents
- Rapides : second destinataire (niveau autonome) ou autre procédure fictive (bonus).
- Lents : blocs éditables directement, instructions du modèle sans adaptation, enregistrement « en construction ».`,
    },
  },

  {
    code: 'A5',
    title: `Atelier 5 — Outil « Support d'agence clair et inclusif »`,
    seance: 2,
    position: 8,
    duration_min: 45,
    breakdown: [
      { label: 'Modèle de départ et démonstration', minutes: 5 },
      { label: 'Production', minutes: 30 },
      { label: 'Contrôle', minutes: 7 },
      { label: 'Débrief', minutes: 3 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a construit, testé sur le brief fictif R6 et enregistré dans sa boîte à outils un outil « Support d'agence clair et inclusif » en deux temps (texte accessible puis illustration sans texte ni stéréotype) qui produit, à partir d'un brief, un support destiné aux salariés en parcours d’insertion avec sa description d'image et sa vérification des informations et des droits d'usage, et a noté le temps réellement passé.`,
      brief: `En intérim d'insertion, les supports d'agence sont nombreux et rarement mis en forme : l'affiche « Préparer sa première mission » en salle d'attente, le rappel des EPI avant une délégation, le mémo « que faire en cas d'incident ou d'absence en mission », le message « votre relevé d'heures » envoyé chaque fin de semaine, la fiche « fin de mission : prochaines étapes ». Au module 1 vous avez fait une affiche ; aujourd'hui vous construisez l'outil qui en fera une à chaque brief. En binôme, partez du modèle de départ, qui a deux volets : un volet texte (instructions permanentes et message type avec {{brief}} et {{actions}}, qui reformule les actions en phrases courtes, concrètes et respectueuses, sans rien ajouter) et un volet image (message type fixe pour l'outil d'images autorisé : illustration professionnelle d'accueil en agence d'emploi, public adulte, personnes diverses sans stéréotype de précarité, composition simple, aucun texte dans l'image). Adaptez-le à votre structure : vos types de supports, vos destinataires, votre charte de données, la fonction qui valide un affichage. Testez-le sur le brief fictif R6 : trois actions avant une première mission chez une entreprise utilisatrice (vérifier les horaires, préparer les questions utiles, confirmer le trajet), interdiction d'inventer une rémunération, une adresse, un contact ou une date, représentation non stéréotypée (âge, genre, origine, apparence ; pas de mise en scène de la précarité, pas de salarié présenté comme « aidé », des adultes au travail). Assemblez le support (texte ajouté par vous, pas par l'outil d'images), préparez le texte accessible séparé (lisible par un lecteur d'écran ou à voix haute en entretien) et la description de l'image, vérifiez le contraste, l'absence d'information inventée et les conditions d'usage de l'image (licence de l'outil, usage autorisé par votre structure). Chaque phrase moralisatrice, chaque information ajoutée, chaque image stéréotypée devient une règle ou un interdit dans vos instructions. Pendant le contrôle, un autre binôme lit le support et reformule les trois actions comme le ferait un salarié. Vous appliquez des principes de clarté, sans revendiquer le label FALC ni une accessibilité certifiée. Enregistrez l'outil et notez le temps observé (adaptation, texte, image, assemblage, vérification).`,
      resource_codes: ['R6'],
      steps: [
        `Lire le modèle de départ (volet texte, volet image) et R6 ; recopier les trois actions, les interdictions et l'exigence de représentation non stéréotypée ; démarrer le chronomètre.`,
        `Adapter les instructions à sa structure : types de supports (première mission, EPI, incident, relevé d'heures, fin de mission), destinataires, charte de données, fonction qui valide un affichage.`,
        `Tester le volet texte sur le cas fictif : message type avec {{brief}} = R6 et {{actions}} = les trois actions ; relire les phrases obtenues à deux, en pensant à un salarié qui découvre l'intérim d'insertion.`,
        `Tester le volet image dans l'outil d'images autorisé ; vérifier qu'elle ne contient aucun texte ni stéréotype (précarité, genre, origine, âge) ; relancer si besoin.`,
        `Vérifier avec la grille : aucune information ajoutée (rémunération, adresse, contact, date), ton respectueux et non moralisateur, contraste, représentation, droits d'usage de l'image notés.`,
        `Corriger l'outil : chaque phrase moralisatrice ou information ajoutée devient une règle du volet texte, chaque stéréotype une précision du volet image ; relancer.`,
        `Assembler le support, rédiger le texte accessible séparé et la description de l'image, faire lire par un autre binôme qui reformule les trois actions comme un salarié ; corriger.`,
        `Enregistrer l'outil dans sa boîte à outils avec la fiche complète et le résumé du test, arrêter le chronomètre, remplir le champ « Temps sur cette tâche », déposer le support, le texte accessible, la description, la vérification et les deux messages types.`,
      ],
      deliverable: `L'outil « Support d'agence clair et inclusif » (volet texte + volet image) enregistré dans la boîte à outils avec sa fiche complète + le test : support (image ou PDF), texte accessible séparé (titre et trois messages), description de l'image, vérification écrite (informations, contraste, représentation, droits d'usage, test de compréhension), règles ajoutées après le test + les outils utilisés + le temps observé (adaptation + texte + image + assemblage + vérification) dans le champ prévu, mesure de cette tâche et non promesse générale.`,
      success_criteria: [
        `La sortie finale est fidèle à R6 : trois actions présentes et reformulées en phrases courtes, sans faute, sans rémunération, adresse, contact ni date, sans ton moralisateur ; image sans texte généré et sans stéréotype, avec sa description.`,
        `L'outil est réutilisable : volet texte avec instructions permanentes et message type ({{brief}}, {{actions}}, {{destinataire}}), volet image avec message type fixe, format de support fixé (titre, messages, texte accessible séparé, description de l'image).`,
        `La vérification est intégrée : la fiche impose contraste, absence d'information inventée, représentation, droits d'usage et test de compréhension par un tiers ; le test les applique et note le résultat.`,
        `Les règles de données reprennent la charte : aucun nom, aucune photo de personne réelle, aucune donnée de salarié dans le brief ; les conditions d'usage de l'image sont examinées et la fonction qui valide l'affichage dans la structure est nommée.`,
        `Au moins une règle est justifiée par un défaut observé au test (phrase moralisatrice, information ajoutée, stéréotype), et un collègue pourrait reprendre l'outil pour un autre support (EPI, incident, relevé d'heures) avec la fiche seule.`,
        `Un autre binôme a reformulé les trois actions correctement ; le résultat du test et le temps observé sont notés.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Cette phrase, un adulte au travail la recevrait-il comme un rappel ou comme une leçon ?`,
          text: `Relisez chaque phrase du volet texte : « Soyez ponctuel ! » est une leçon ; « Vérifiez vos horaires avant le premier jour » est un rappel. Si une phrase donne un ordre moral ou suppose une difficulté, la règle à ajouter dans votre outil est « adresse-toi à des adultes au travail ; pas d'injonction morale, pas de présupposé de difficulté ; une action concrète par phrase ». Même logique pour l'image : si l'outil montre des personnes « en difficulté » face à un conseiller « qui aide », précisez le message image (« des personnes au travail ou en échange professionnel, à égalité ») et relancez. Le texte dans l'image reste un piège double : lettres déformées et mots inventés ; c'est pourquoi vous ajoutez les messages vous-même.`,
        },
        {
          level: 'trame',
          title: `Squelette d'instructions permanentes (volet texte)`,
          text: `Rôle : tu rédiges, pour [mon ETTI, intérim d'insertion], le texte de supports destinés à [{{destinataire}} : salariés en parcours, entreprise utilisatrice, équipe]. Règles : 1) reformule uniquement [les actions de {{brief}} / {{actions}}] ; 2) une phrase par action, [dix mots maximum], [verbe à l'impératif ou à l'infinitif] ; 3) n'ajoute aucun [lieu, salaire, date, numéro, contact] absent du brief ; 4) ton [respectueux, concret, sans injonction morale ni présupposé de difficulté] ; 5) pas de [jargon d'agence : « mise à disposition », sigles] ; 6) produis aussi [le texte accessible séparé : titre + messages en texte brut]. Interdits : [information inventée, ton moralisateur, infantilisation]. Format : [titre, messages, texte accessible]. Contrôle : [signale toute information du brief que tu n'as pas pu reformuler en dix mots]. + Charte de données. Volet image : message type fixe [illustration professionnelle d'accueil en agence d'emploi, public adulte, personnes diverses sans stéréotype de précarité, composition simple, aucun texte].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (une règle, un message, une description)`,
          text: `Règle 4 de l'outil : « Adresse-toi à des adultes au travail : pas d'injonction morale (“soyez ponctuel”), pas de présupposé de difficulté ; une action concrète par phrase. » Message 1 attendu : « Vérifiez vos horaires avant le premier jour. » Description de l'image : « Une conseillère et un salarié discutent à un bureau d'agence, dans un espace clair ; deux adultes au travail, à égalité ; aucun texte dans l'image. » Vérification droits : « Conditions d'usage de l'outil consultées le [date] ; usage interne d'affichage en agence à valider par le responsable d'agence. » — Les messages 2 et 3, les autres règles et le reste de la vérification sont à produire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Qu'est-ce qui, dans votre outil, empêche désormais l'information ajoutée (date, lieu, montant), le ton moralisateur et le stéréotype dans l'image ? Montrez la règle.`,
        `Quel contrôle gardez-vous à chaque usage : le test de compréhension par un tiers, la vérification des droits d'usage de l'image ? Qu'a révélé le test de l'autre binôme ?`,
        `Qui, dans votre agence, pourrait utiliser cet outil (accueil, communication, chargés de recrutement pour les rappels EPI ou relevés d'heures), à quelle condition (brief validé, image aux droits vérifiés, validation du responsable avant affichage) ?`,
      ],
      fallback: `Sans outil d'images : utiliser des pictogrammes à licence identifiée (fournis par le formateur avec leur source) ou des formes simples dessinées dans un outil bureautique ; le volet texte se teste sans outil d'images. Sans aucun outil : rédiger les instructions sur la fiche, les trois phrases à la main, le texte accessible, la vérification et la note du temps ; enregistrer l'outil au statut « en construction » et indiquer « sans outil » dans le dépôt.`,
      prompt_starter: `Reformule ces trois actions en phrases courtes, concrètes et respectueuses. N'ajoute aucun lieu, salaire, date ou numéro absent du brief. Contexte : affiche d'une ETTI fictive destinée aux salariés en parcours d’insertion avant leur première mission.`,
      prompt_defaults: {
        context: `Instructions permanentes de mon outil « Support d'agence clair et inclusif » (volet texte) : je prépare, pour une ETTI fictive (Agence Horizon, intérim d'insertion), des supports destinés aux salariés en parcours d’insertion à partir d'un brief sans donnée personnelle.`,
        task: `Message type : reformule les actions de {{brief}} ({{actions}}) en phrases courtes, concrètes et respectueuses pour {{destinataire}}, et produis le texte accessible séparé.`,
        data: `{{brief}} = R6 pour le test ; {{actions}} = vérifier les horaires ; préparer les questions utiles ; confirmer le trajet ; {{destinataire}} = salariés avant leur première mission. Aucune donnée réelle : voir charte.`,
        constraints: `N'ajoute aucun lieu, salaire, date, numéro ou contact absent du brief. Pas de jargon (pas de « mise à disposition », pas de sigle). Ton respectueux, adulte, sans injonction morale ni présupposé de difficulté. Dix mots maximum par phrase.`,
        format: `Titre, trois phrases (une par action), puis texte accessible séparé (titre et messages en texte brut).`,
        controls: `Signale toute information du brief que tu n'as pas pu reformuler en dix mots. Je vérifierai chaque phrase contre le brief, le contraste du support, l'image (sans texte, sans stéréotype), les droits d'usage, et je ferai lire le support par un autre binôme.`,
      },
      levels: {
        guided: `Partez du modèle de départ (les deux volets tels quels), ajoutez votre charte et vos types de supports, testez sur R6, corrigez les instructions à partir des défauts observés, assemblez dans l'outil bureautique de votre choix. Notez votre temps.`,
        autonomous: `Rédigez vos propres instructions du volet texte sans la trame (seul le format est imposé), testez sur R6, produisez deux variantes d'illustration et expliquez votre choix en termes de lisibilité et de représentation.`,
        bonus: `Testez votre outil sur un autre brief fictif que vous écrivez en trois actions (par exemple « avant chaque délégation : vos EPI, votre tuteur sur site, votre relevé d'heures » ; aucun nom, aucun montant, aucune date) et vérifiez qu'il reste fidèle et respectueux ; ou produisez la version téléphone (vertical, texte plus gros) du support R6 avec le même texte accessible. Notez le temps ajouté : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['images'],
      production_kind: 'poster',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE} ${TOOLBOX_NOTICE}`,
      job_context: {
        task: `Construire l'outil qui produit, à partir d'un brief, les supports d'agence destinés aux salariés en parcours (première mission, EPI avant délégation, incident ou absence en mission, relevé d'heures, fin de mission), avec un texte accessible et une image sans stéréotype. Utilisateurs : accueil, communication, chargés de recrutement.`,
        time_sinks: `Les supports d'agence sont faits « quand on aura le temps », donc rarement ; quand on s'y met, on passe du temps à choisir une image, à la recadrer, à retaper le texte, on oublie de vérifier les droits d'usage ou la façon dont les salariés sont représentés, et le support suivant repart de zéro.`,
        delegable: `La reformulation des actions du brief en phrases courtes, le texte accessible et la proposition d'illustration sans texte, par un outil dont les instructions interdisent l'ajout d'information et le ton moralisateur.`,
        must_verify: `L'absence d'information inventée (rémunération, adresse, contact, date), le ton, la représentation des personnes, le contraste, les droits d'usage de l'image, la compréhension par un tiers et la validation par la structure avant affichage ou envoi.`,
        why_etti: `Les salariés en parcours d’insertion sont souvent représentés sous l'angle de la difficulté : une ETTI qui les montre comme des adultes au travail, avec des consignes claires avant la première mission, le rappel des EPI ou du relevé d'heures, soutient la relation de confiance avec le salarié et l'entreprise utilisatrice et réduit les premiers jours ratés.`,
      },
      tool_blueprint: {
        name: `Support d'agence clair et inclusif`,
        family: 'images',
        purpose: `Produire, à partir d'un brief, le texte accessible d'un support d'agence destiné aux salariés en parcours d’insertion (première mission, EPI, incident, relevé d'heures, fin de mission) et une illustration sans texte ni stéréotype, avec la vérification des informations et des droits d'usage avant affichage ou envoi.`,
        inputs: `{{brief}} : le brief du support, sans donnée personnelle (test : R6). {{actions}} : les deux à quatre actions à retenir. {{destinataire}} : salariés avant une première mission, salariés en mission, entreprise utilisatrice, équipe. Pour le volet image : aucune entrée variable, message type fixe.`,
        instructions: `Volet texte.
Rôle : tu rédiges, pour une ETTI (intérim d'insertion), le texte de supports d'agence destinés à {{destinataire}}.
Source : uniquement {{brief}} et {{actions}}.
Règle 1 : une phrase par action, dix mots maximum, verbe à l'impératif ou à l'infinitif.
Règle 2 : n'ajoute aucun lieu, salaire, date, numéro, contact ni horaire absent du brief ; si le brief ne le dit pas, le support ne le dit pas.
Règle 3 : adresse-toi à des adultes au travail : pas d'injonction morale, pas de présupposé de difficulté, pas d'infantilisation.
Règle 4 : pas de jargon d'agence (« mise à disposition », « entreprise utilisatrice » devient « l'entreprise où vous allez »), aucun sigle non expliqué ; pour une entreprise utilisatrice ou l'équipe, garde les termes professionnels.
Règle 5 : produis aussi le texte accessible séparé : titre et messages en texte brut, lisibles par un lecteur d'écran ou à voix haute.
Règle 6 : ne décris jamais une personne réelle ni une situation individuelle.
Interdits : information inventée, ton moralisateur, mention de rémunération, de santé ou de parcours IAE sur un support visible.
Format : titre, messages numérotés, texte accessible séparé.
Contrôle : signale toute information du brief que tu n'as pas pu reformuler en dix mots.
Volet image (message type fixe pour l'outil d'images) : illustration professionnelle d'accueil en agence d'emploi, pour un public adulte, avec des personnes diverses (âge, genre, origine, apparence) sans stéréotype de précarité, à égalité ; composition simple, rassurante et lisible ; aucun texte dans l'image.
+ Charte de données de mes outils (coller ici).`,
        prompt_template: `Rappel : brief sans donnée personnelle, aucune donnée réelle. Rédige le texte du support pour {{destinataire}} selon tes instructions, à partir du brief : {{brief}}. Actions à retenir : {{actions}}. Donne le titre, une phrase par action, puis le texte accessible séparé. — Message type image (à part, dans l'outil d'images) : « Crée une illustration professionnelle d'accueil en agence d'emploi, pour un public adulte, avec des personnes diverses sans stéréotype de précarité, à égalité. Composition simple, rassurante et lisible. Ne génère aucun texte dans l'image : les messages seront ajoutés séparément. »`,
        output_format: `Support assemblé par le permanent (image ou PDF) : titre, messages ajoutés en texte réel, illustration ; texte accessible séparé (titre + messages en texte brut) ; description de l'image en une ou deux phrases ; vérification écrite : informations inventées (non / corrigé), contraste (suffisant / corrigé), représentation (diverse, sans stéréotype / relancé), droits d'usage (conditions consultées le …, usage validé par …), test de compréhension (qui a reformulé quoi).`,
        verification: [
          `Chaque phrase correspond à une action du brief et n'ajoute aucune information (lieu, salaire, date, numéro, contact).`,
          `Aucune phrase moralisatrice ni infantilisante ; un salarié qui découvre l'intérim d'insertion comprend chaque action.`,
          `L'image ne contient aucun texte généré et aucun stéréotype (précarité, genre, origine, âge) ; sa description est écrite.`,
          `Le contraste texte / fond permet une lecture à distance ou sur téléphone.`,
          `Les conditions d'usage de l'image ont été consultées et l'usage (affichage interne, envoi au salarié) est validé par la fonction désignée dans la structure.`,
          `Un tiers a reformulé les actions correctement avant affichage ou envoi.`,
        ],
        data_rules: `Entrées autorisées : briefs et consignes générales sans nom, sans situation individuelle, sans montant, sans date de mission précise. Jamais : photo d'une personne réelle, nom de salarié ou d'entreprise utilisatrice sur un support généré, mention de santé, de RQTH ou de parcours IAE visible, données d'un relevé d'heures. Vérifier la licence de l'outil d'images et la règle de la structure sur les images générées ; ne pas revendiquer le label FALC ni une accessibilité certifiée.`,
        fallback: `Sans outil d'images : pictogrammes à licence identifiée ou formes simples dans un outil bureautique. Sans aucun outil : rédiger les phrases à la main avec les règles 1 à 4 comme liste de contrôle, texte accessible et vérification identiques.`,
      },
    },
    private_content: {
      answer_key: `## Outil abouti (exemple complet, cas fictif Agence Horizon)

### Instructions permanentes
Volet texte : rôle, source {{brief}} + {{actions}}, une phrase par action en dix mots, rien d'ajouté, adultes au travail, pas de jargon, texte accessible séparé, pas de personne réelle. Interdits : information inventée, ton moralisateur, rémunération / santé / parcours IAE visibles. Contrôle : ce qui n'a pas tenu en dix mots. Volet image : message type fixe sans texte, personnes diverses à égalité. Charte collée.

### Sortie attendue sur R6
Titre : « Préparer sa première mission ». Messages : « Vérifiez vos horaires avant le premier jour. » « Préparez vos questions pour l'agence et l'entreprise. » « Confirmez votre trajet et votre heure de départ. » Texte accessible : le titre et les trois messages en texte brut. Aucune rémunération, adresse, contact ni date ; pas de « mise à disposition », pas de sigle, pas de leçon.
Image : illustration sans texte, personnes diverses, cadre d'agence, pas de mise en scène misérabiliste ni de « sauveur » ; description en une ou deux phrases.
Vérification : contraste texte foncé sur fond clair ; droits : conditions d'usage consultées et notées, validation de l'affichage par le responsable d'agence ; test : un autre binôme a reformulé les trois actions.

## Pièges (sortie de test et outil)
- Phrase avec une date ou un lieu (« rendez-vous lundi à l'agence de … ») : règle 2.
- « Soyez ponctuel ! », « N'oubliez pas ! » : règle 3.
- Texte généré dans l'image : volet image, texte ajouté par le permanent.
- Image stéréotypée (personnes démunies, un seul profil) : précision « à égalité », relance.
- Droits d'usage non examinés, validation absente : points de vérification 5.
- Outil non réutilisable : actions de R6 codées dans les instructions au lieu de l'emplacement {{actions}}.

## Ce qu'on ne revendique pas
Le label FALC suppose une méthode et une validation par des personnes concernées : l'outil applique des principes de clarté, il ne délivre pas ce label ; aucune « accessibilité certifiée ».

## Bonus : autre brief fictif (« avant chaque délégation »)
Trois phrases attendues du type « Vérifiez vos équipements de protection avant de partir. » « Demandez le nom de votre tuteur sur place. » « Rendez votre relevé d'heures chaque fin de semaine. » Sans nom, sans montant, sans date.

## Lecture du temps observé
Le temps noté inclut l'adaptation, l'image et l'assemblage ; au poste, la validation par le responsable d'agence s'ajoute. La mesure vaut pour ce support.`,
      trainer_notes: `## Animation
- Modèle de départ et démonstration (5 min) : afficher la fiche à deux volets, montrer le message image et un résultat avec du texte déformé (pourquoi on ajoute le texte séparément), un résultat stéréotypé et sa relance, puis une règle ajoutée au volet texte. Lancer le chronomètre visible.
- Avoir un jeu de pictogrammes à licence identifiée prêt pour la solution de secours.

## Transformer un prompt ponctuel en outil
- Ce qui ne change pas : règles de ton, interdits, texte accessible, message image → instructions. Ce qui change : brief, actions, destinataire → emplacements.
- Juger la réutilisabilité : l'outil produit-il aussi le rappel EPI ou le mémo relevé d'heures sans réécriture ? Le bonus le vérifie.
- Chaque règle renvoie à un défaut observé : phrase moralisatrice, information ajoutée, stéréotype.

## Pièges fréquents
- Binômes qui passent 20 minutes sur l'image : fixer un temps maximum de 10 minutes pour l'illustration ; le texte, les règles et la vérification priment.
- Phrases corrigées à la main sans règle ajoutée : exiger la règle.
- Oubli du texte accessible séparé : le rappeler au moment du dépôt.
- Nom d'une entreprise utilisatrice réelle « pour faire vrai » sur le support : charte.

## Rythmes différents
- Rapides : deux variantes d'illustration (niveau autonome), autre brief ou version téléphone (bonus).
- Lents : pictogrammes de secours dès le départ, effort sur les trois phrases, les règles et le test de compréhension ; enregistrement « en construction ».`,
    },
  },

  {
    code: 'A6',
    title: `Atelier 6 — Outil « Courriel de préparation de délégation » et choix d'un assistant`,
    seance: 2,
    position: 9,
    duration_min: 40,
    breakdown: [
      { label: 'Modèle de départ et démonstration', minutes: 5 },
      { label: 'Production', minutes: 25 },
      { label: 'Comparaison', minutes: 7 },
      { label: 'Débrief', minutes: 3 },
    ],
    content: {
      objective: `À la fin de l'atelier, chaque binôme a construit un outil « Courriel de préparation de délégation » (courriel interne avant contrat de mission et contrat de mise à disposition, ou proposition de candidat sans donnée personnelle), l'a testé avec les mêmes instructions et la même fiche de mission fictive R2 dans deux assistants, a comparé les deux sorties selon sept critères, a enregistré l'outil avec l'assistant retenu et une règle de choix valable pour cette tâche et sa structure, et a noté le temps réellement passé.`,
      brief: `En intérim d'insertion, le courriel interne de préparation de délégation est un écrit quotidien : avant une mise à disposition, le chargé de recrutement ou la conseillère informe l'équipe (responsable d'agence, assistant administratif chargé du contrat de mission et du contrat de mise à disposition) des faits connus de la commande, des informations à obtenir auprès de l'entreprise utilisatrice (adresse du site, horaires de la semaine, pauses, tuteur, EPI, rémunération selon les règles du travail temporaire) et des prochaines actions ; sa variante est la proposition de candidat à l'entreprise utilisatrice, sans aucune donnée personnelle. Au module 1 vous avez comparé deux assistants sur ce courriel ; aujourd'hui vous construisez l'outil, puis vous choisissez dans quel assistant le déployer. En binôme, partez du modèle de départ (instructions permanentes, message type avec {{fiche_mission}} et {{destinataires}}, format : objet, faits, à obtenir, prochaines actions, 120 mots maximum). Adaptez-le à votre structure : vos destinataires internes, les informations que votre assistant administratif a besoin de recevoir pour préparer les contrats, votre charte de données. Testez-le à l'identique dans deux assistants disponibles et autorisés par votre structure, avec la fiche de mission fictive R2 (V2 du 18/09/2026) : mêmes instructions, même message, même texte. Avant de commencer, notez les différences connues entre les deux (recherche web activée ou non, pièce jointe ou texte collé, réglages, date) et signalez-les dans le dépôt. Relevez dans chaque sortie toute confirmation inventée, tout montant, toute information venue du web ou de R1 (le courriel ne connaît que R2), toute donnée personnelle ; chaque erreur devient une règle de l'outil, pour les deux assistants. Remplissez le tableau comparatif sur sept critères : fidélité à R2, qualité du texte, erreurs relevées, facilité de correction, accessibilité, conditions d'accès (compte, coût, autorisation), adéquation aux règles de la structure. Terminez par une décision expliquée et une règle de choix d'assistant pour votre boîte à outils : laquelle garder pour cet outil, à quelles conditions, ou comment les combiner. Ce résultat vaut pour cette tâche et ce test seulement. La fiche de liaison fictive R9 rappelle ce qui, dans ce courriel, servira ensuite au point d'étape avec le prescripteur. Enregistrez l'outil avec l'assistant retenu et notez le temps observé (adaptation, deux essais, vérification, corrections).`,
      resource_codes: ['R2', 'R9'],
      steps: [
        `Lire le modèle de départ ; noter les deux assistants testés, leurs différences connues (recherche web activée ou non, pièce jointe ou texte collé), la date et les réglages connus ; démarrer le chronomètre.`,
        `Adapter les instructions à sa structure : destinataires internes, informations nécessaires aux contrats de mission et de mise à disposition, charte de données.`,
        `Tester sur le cas fictif : envoyer exactement les mêmes instructions et le même message type avec {{fiche_mission}} = R2 dans le premier assistant, puis dans le second ; copier les deux sorties telles quelles.`,
        `Vérifier avec la grille : compter les mots, vérifier chaque fait avec R2 (horaires V2, conduite d'engin, début à confirmer), chercher toute confirmation, montant, information venue du web ou de R1, donnée personnelle.`,
        `Corriger l'outil : chaque erreur relevée devient une règle des instructions, valable pour les deux assistants ; relancer dans celui qui a fauté et vérifier que la règle suffit.`,
        `Remplir le tableau comparatif sur les sept critères, une observation concrète par critère et par assistant.`,
        `Écrire la décision (trois à cinq phrases) et la règle de choix d'assistant pour la boîte à outils, puis enregistrer l'outil avec l'assistant retenu dans sa fiche (champ outil utilisé) et le résumé du test.`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer les deux sorties brutes, les informations sur les assistants, le tableau, la décision et la fiche.`,
      ],
      deliverable: `L'outil « Courriel de préparation de délégation » enregistré dans la boîte à outils avec sa fiche complète et l'assistant retenu + le test : deux sorties brutes, pour chaque assistant nom, modèle si visible, date, réglages, recherche web activée ou non, pièce jointe ou texte collé, règles ajoutées après le test + un tableau comparatif sur sept critères + une décision expliquée (trois à cinq phrases) et une règle de choix d'assistant + le temps observé (adaptation + deux essais + vérification + corrections) dans le champ prévu, mesure de cette tâche et non promesse générale.`,
      success_criteria: [
        `Les sorties finales sont fidèles à R2 : 120 mots maximum, commande non présentée comme confirmée, points à obtenir listés (adresse, horaires de la semaine, pauses, tuteur, EPI, rémunération, confirmation), aucun montant, aucune information venue du web ou de R1, aucune donnée personnelle.`,
        `L'outil est réutilisable : instructions permanentes séparées du message type, emplacements {{fiche_mission}} et {{destinataires}}, format fixé, assistant retenu et conditions d'usage notés dans la fiche.`,
        `La vérification est intégrée : les instructions exigent de lister les points à obtenir et d'écrire « non confirmé », la fiche impose de vérifier chaque fait avec la fiche de mission et de compter les mots ; le test a été fait à l'identique dans deux assistants, sorties brutes fournies, conditions signalées.`,
        `Les règles de données reprennent la charte : aucun nom de candidat ni de salarié, aucun numéro, aucun PASS IAE, aucun relevé d'heures ; le risque propre à chaque assistant (recherche web, pièce jointe, hébergement) est nommé et le statut d'autorisation vérifié.`,
        `Les sept critères portent une observation concrète par assistant, toute erreur est attribuée au bon assistant et a produit une règle, et la décision précise qu'elle vaut pour cette tâche et ce test seulement ; un collègue pourrait reprendre l'outil et la règle de choix avec la fiche seule.`,
        `Le temps observé est renseigné.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Cette différence vient-elle de l'assistant ou des conditions du test ?`,
          text: `Si un assistant a eu R2 en pièce jointe et l'autre en texte collé, c'est une différence de conditions, pas de qualité ; notez-la avant de juger. Pour ce courriel, la recherche web n'est pas utile et introduit des informations extérieures (taux horaire « habituel », adresse supposée de l'entreprise utilisatrice) : la règle à ajouter à l'outil est « n'utilise que la fiche fournie, aucune recherche, aucune mémoire d'un autre document ». Si une information de R1 (bus, expérience, point de suivi) apparaît, c'est aussi un ajout : le courriel ne connaît que R2.`,
        },
        {
          level: 'trame',
          title: `Squelette d'instructions permanentes`,
          text: `Rôle : tu rédiges, pour [mon ETTI, intérim d'insertion], le courriel interne de préparation de délégation destiné à [{{destinataires}} : responsable d'agence, assistant administratif chargé du contrat de mission et du contrat de mise à disposition]. Source : [uniquement {{fiche_mission}} ; aucune recherche, aucun autre document]. Règles : 1) résume [les faits de la commande : poste, tâches, horaires de la fiche, conduite d'engin, début souhaité] ; 2) liste [ce qui reste à obtenir auprès de l'entreprise utilisatrice : adresse du site, horaires de la semaine, pauses, tuteur, EPI, volume, rémunération, confirmation] ; 3) n'écris jamais [que la commande ou la mission est confirmée] ; 4) la rémunération [n'est jamais chiffrée : « à obtenir, selon les règles du travail temporaire »] ; 5) [120 mots maximum, phrases courtes]. Interdits : [nom de candidat ou de salarié, numéro, PASS IAE, information extérieure à la fiche]. Format : [objet / faits / à obtenir / prochaines actions]. Contrôle : [termine par « Rien n'est validé à ce stade » et la liste des points à obtenir]. + Charte de données. Règle de choix d'assistant : [pour cet outil, je retiens … à condition de … ; recherche web désactivée ; texte collé].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (une règle, une ligne de tableau, un début de décision)`,
          text: `Règle 3 de l'outil : « N'écris jamais que la commande, la mission, les horaires ou le début sont confirmés ; écris “à confirmer par l'entreprise utilisatrice” et termine par “Rien n'est validé à ce stade”. » Ligne « Erreurs relevées » : Assistant A (exemple) : « a écrit “mission confirmée” et “rémunération au taux de la branche” → fidélité, information extérieure à R2 » ; Assistant B (exemple) : « aucune confirmation ajoutée, mais 135 mots → format ». Début de décision : « Pour cet outil et ce test, je retiens l'assistant B, recherche web désactivée, texte collé, à condition de garder la règle des 120 mots et de vérifier chaque fait avec la fiche de mission ; ce résultat ne vaut pas pour d'autres tâches. » — Les autres lignes et la suite sont à produire par le binôme.`,
        },
      ],
      debrief_questions: [
        `Qu'est-ce qui, dans votre outil, empêche désormais la confirmation inventée, le montant et l'information venue du web ou d'un autre document, quel que soit l'assistant ? Montrez la règle.`,
        `Quel contrôle gardez-vous à chaque usage : vérifier chaque fait avec la fiche de mission, compter les mots, relire « non confirmé » ? Qu'est-ce qui, dans les conditions d'accès ou les règles de votre structure, pèse plus que la qualité du texte ?`,
        `Qui, dans votre agence, pourrait utiliser cet outil (chargés de recrutement, conseillers, assistant administratif en relecture), avec quel assistant et à quelle condition ? Pourquoi votre règle de choix ne permet-elle pas de dire quel assistant est « le meilleur » ?`,
      ],
      fallback: `Si deux assistants ne sont pas disponibles : construire l'outil et le tester dans le seul assistant autorisé, puis comparer sa sortie avec les deux réponses d'exemple fournies par le formateur et clairement indiquées comme exemples (« Assistant A (exemple) », « Assistant B (exemple) »), sans nom d'outil réel, sans modèle ni vitesse fictifs ; le tableau, la décision, la règle de choix et la note du temps sont remplis de la même manière ; indiquer « comparaison sur exemples » dans le dépôt. Sans aucun assistant : fiche rédigée à la main, outil enregistré « en construction ».`,
      prompt_starter: `Rédige un courriel interne de 120 mots maximum à partir de cette fiche. Résume les faits, indique les informations à obtenir et les prochaines actions. N'invente aucune confirmation. Ton professionnel, phrases courtes, aucune donnée personnelle ajoutée. Contexte : courriel de préparation de mission dans une ETTI fictive, destiné à l'équipe d'agence ; « client » désigne l'entreprise utilisatrice.`,
      prompt_defaults: {
        context: `Instructions permanentes de mon outil « Courriel de préparation de délégation » : je travaille dans une ETTI fictive (Agence Horizon, intérim d'insertion). La fiche fournie est la fiche de mission ou la commande de l'entreprise utilisatrice, dans sa dernière version, sans donnée personnelle. Le courriel est destiné à {{destinataires}} (responsable d'agence, assistant administratif chargé du contrat de mission et du contrat de mise à disposition).`,
        task: `Message type : rédige le courriel interne de préparation de délégation à partir de {{fiche_mission}}. Résume les faits de la commande, liste les informations à obtenir auprès de l'entreprise utilisatrice et les prochaines actions.`,
        data: `{{fiche_mission}} = R2 (V2 du 18/09/2026) pour le test, collée en texte ou en pièce jointe selon l'assistant (à signaler). Aucune recherche web. Aucune donnée réelle : voir charte.`,
        constraints: `120 mots maximum. N'invente aucune confirmation ni aucun montant ; la rémunération est « à obtenir, selon les règles du travail temporaire ». Aucune donnée personnelle (pas de nom de candidat ou de salarié, pas de numéro, pas de PASS IAE). Ne présente ni la commande ni la mission comme validée. N'utilise aucune information extérieure à la fiche.`,
        format: `Courriel interne : objet, trois courts paragraphes (faits, à obtenir : adresse du site, horaires de la semaine, pauses, tuteur, EPI, volume, rémunération, confirmation ; prochaines actions), ton professionnel, phrases courtes, « Rien n'est validé à ce stade » en fin.`,
        controls: `Termine par la liste des points à obtenir. Je vérifierai chaque fait avec la fiche de mission, je compterai les mots et je comparerai avec la sortie d'un second assistant dans les mêmes conditions.`,
      },
      levels: {
        guided: `Partez du modèle de départ tel quel, ajoutez votre charte et vos destinataires, testez-le à l'identique dans les deux assistants, corrigez les instructions à partir des erreurs relevées et remplissez le tableau ligne par ligne. Notez votre temps.`,
        autonomous: `Rédigez vos propres instructions sans la trame (seul le format du courriel est imposé), testez dans les deux assistants, puis modifiez une seule contrainte (80 mots, ou {{destinataires}} = assistant administratif seul) et observez si l'écart entre les deux assistants change.`,
        bonus: `Créez la seconde variante de l'outil : « Proposition de candidat à l'entreprise utilisatrice », avec son message type ({{fiche_mission}}, {{competences_du_profil}} sans nom ni donnée personnelle : expérience, disponibilités, habilitations), 100 mots maximum, aucune promesse de disponibilité ni de date non vérifiée ; testez-la dans l'assistant retenu. Ou rédigez en cinq lignes le point d'étape prescripteur selon R9 à partir du courriel corrigé. Notez le temps ajouté : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'pair',
      families: ['assistants'],
      production_kind: 'comparison',
      time_tracking: true,
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE} ${TOOLBOX_NOTICE}`,
      job_context: {
        task: `Construire l'outil qui rédige le courriel interne de préparation de délégation (et sa variante : proposition de candidat sans donnée personnelle) à partir de la commande ou de la fiche de mission, pour l'équipe qui prépare le contrat de mission et le contrat de mise à disposition, et choisir avec quel assistant le déployer. Utilisateurs : chargés de recrutement, conseillers, assistant administratif en relecture.`,
        time_sinks: `Chaque commande donne lieu à un courriel interne écrit à la hâte entre deux appels ; on y glisse parfois une confirmation que l'entreprise utilisatrice n'a pas donnée, on oublie un point à obtenir (adresse, tuteur, EPI, pauses), et l'assistant administratif doit rappeler pour compléter les contrats ; le choix de l'assistant se fait au hasard de ce qui est ouvert.`,
        delegable: `La première rédaction du courriel à partir de la fiche de mission et sa mise en forme en trois paragraphes, par un outil dont les instructions interdisent confirmation, montant, information extérieure et donnée personnelle.`,
        must_verify: `Chaque fait avec la fiche de mission la plus récente, l'absence de confirmation et de montant, l'absence de donnée personnelle et d'information extérieure (web, autre document), le nombre de mots, le statut d'autorisation de l'assistant dans la structure et ses conditions (recherche web, pièce jointe, hébergement).`,
        why_etti: `Le contrat de mission et le contrat de mise à disposition reposent sur des informations exactes de l'entreprise utilisatrice (poste, horaires, conduite d'engin, EPI, tuteur, rémunération selon les règles du travail temporaire) : un courriel interne fiable évite une délégation préparée sur des éléments non confirmés, et le choix de l'assistant doit respecter les règles de la structure sur les données.`,
      },
      tool_blueprint: {
        name: `Courriel de préparation de délégation`,
        family: 'assistants',
        purpose: `Rédiger, à partir de la commande ou de la fiche de mission, le courriel interne de préparation de délégation (faits connus, informations à obtenir auprès de l'entreprise utilisatrice, prochaines actions) pour l'équipe qui prépare le contrat de mission et le contrat de mise à disposition, dans l'assistant retenu par la structure ; variante : proposition de candidat sans donnée personnelle.`,
        inputs: `{{fiche_mission}} : la fiche de mission ou la commande dans sa dernière version, sans donnée personnelle (test : R2, V2 du 18/09/2026), collée en texte. {{destinataires}} : responsable d'agence, assistant administratif chargé des contrats, autre. Variante : {{competences_du_profil}} sans nom (expérience, disponibilités, habilitations).`,
        instructions: `Rôle : tu rédiges, pour une ETTI (intérim d'insertion), le courriel interne de préparation de délégation destiné à {{destinataires}}, avant le contrat de mission et le contrat de mise à disposition. « Client » désigne l'entreprise utilisatrice.
Source : uniquement {{fiche_mission}}. Aucune recherche web, aucune mémoire d'un autre document ou d'une autre conversation, aucune règle générale.
Règle 1 : résume les faits de la commande : poste et tâches, horaires de la fiche (version et date), conduite d'engin ou non, début souhaité, compétences utiles.
Règle 2 : liste ce qui reste à obtenir auprès de l'entreprise utilisatrice : adresse exacte du site, horaires de la semaine, pauses, tuteur sur place, EPI fournis, volume et durée, rémunération, confirmation de la commande.
Règle 3 : n'écris jamais que la commande, la mission, les horaires ou le début sont confirmés ou validés ; écris « à confirmer par l'entreprise utilisatrice ».
Règle 4 : ne chiffre jamais la rémunération ; écris « à obtenir, selon les règles du travail temporaire ».
Règle 5 : prochaines actions en une phrase chacune, avec qui fait quoi (demandes au client, préparation des contrats une fois les éléments confirmés, point avec le salarié).
Règle 6 : 120 mots maximum, phrases courtes, ton professionnel.
Interdits : nom de candidat ou de salarié, numéro, PASS IAE, relevé d'heures, information absente de la fiche, appréciation sur une personne.
Format : Objet ; Faits ; À obtenir ; Prochaines actions ; « Rien n'est validé à ce stade. »
Contrôle : termine par la liste des points à obtenir, en nombre.
Variante proposition de candidat (sur demande) : 100 mots, {{competences_du_profil}} sans nom, aucune promesse de disponibilité ni de date non vérifiée, aucune mention de parcours IAE ni de santé.
+ Charte de données de mes outils (coller ici).`,
        prompt_template: `Rappel : fiche sans donnée personnelle, aucune donnée réelle, aucune recherche web. Rédige le courriel interne de préparation de délégation pour {{destinataires}} selon tes instructions, à partir de la fiche de mission ci-dessous uniquement, 120 mots maximum, sans confirmation ni montant, en terminant par « Rien n'est validé à ce stade » et la liste des points à obtenir. Fiche de mission : {{fiche_mission}}`,
        output_format: `Objet : préparation de délégation — poste — entreprise utilisatrice. Faits (fiche, version et date). À obtenir auprès de l'entreprise utilisatrice (liste). Prochaines actions (qui fait quoi). « Rien n'est validé à ce stade. » 120 mots maximum. En fin : nombre de points à obtenir.`,
        verification: [
          `Chaque fait existe dans la fiche de mission, dans sa dernière version (test : présence indicative 9 h–17 h, V2 du 18/09, aucune conduite d'engin, début souhaité 28/09 à confirmer).`,
          `Aucun mot de confirmation ; « Rien n'est validé à ce stade » est présent.`,
          `Aucun montant ; rémunération « à obtenir, selon les règles du travail temporaire ».`,
          `Aucune information extérieure à la fiche (ni web, ni R1 : pas de bus, pas d'expérience, pas de point de suivi) ; aucune donnée personnelle.`,
          `120 mots maximum, trois paragraphes, points à obtenir complets (adresse, horaires de la semaine, pauses, tuteur, EPI, volume, rémunération, confirmation).`,
          `L'assistant utilisé est celui retenu dans la fiche, recherche web désactivée, autorisé par la structure.`,
        ],
        data_rules: `Entrées autorisées : fiche de mission ou commande sans nom, sans coordonnées de l'interlocuteur client au-delà de sa fonction, sans montant individuel ; compétences d'un profil sans nom pour la variante. Jamais : nom ou numéro d'un candidat ou salarié, PASS IAE, relevé d'heures, contrat nominatif, extrait de la plateforme. Risques propres : recherche web (informations extérieures), pièce jointe (conservation du fichier chez l'éditeur), hébergement ; vérifier le statut d'autorisation de l'assistant et désactiver la recherche web. Règle de choix d'assistant (à compléter) : pour cet outil, je retiens … à condition de … ; ce choix vaut pour cette tâche et ce test.`,
        fallback: `Sans assistant : remplir le format à la main à partir de la fiche de mission (objet, faits, à obtenir, prochaines actions, « rien n'est validé »), en utilisant la liste des points à obtenir comme liste de contrôle ; c'est souvent suffisant pour un courriel de 120 mots.`,
      },
    },
    private_content: {
      answer_key: `## Outil abouti (exemple complet, cas fictif Agence Horizon)

### Instructions permanentes
Rôle : courriel interne de préparation de délégation pour {{destinataires}}. Source : {{fiche_mission}} seulement, aucune recherche, aucune mémoire. Règles : faits de la commande ; liste à obtenir (adresse, horaires de la semaine, pauses, tuteur, EPI, volume, rémunération, confirmation) ; jamais « confirmé » ; rémunération jamais chiffrée ; actions avec qui fait quoi ; 120 mots. Interdits : nom, numéro, PASS IAE, information extérieure, appréciation. Format fixé, « Rien n'est validé à ce stade ». Variante proposition de candidat. Charte collée. Règle de choix d'assistant notée dans les règles de données.

### Sortie attendue sur R2
Objet : préparation de délégation — préparation manuelle de commandes — Atelier Horizon Logistique (entreprise utilisatrice fictive). Faits : commande envisagée de préparation manuelle de commandes, début souhaité le lundi 28/09/2026 à confirmer par l'entreprise utilisatrice ; présence indicative 9 h–17 h (fiche V2 du 18/09/2026) ; aucune conduite d'engin ; compétences utiles : consignes, contrôle des références, rangement, communication. À obtenir : adresse exacte du site ; horaires de la semaine suivante ; pauses ; tuteur sur place ; EPI fournis ; volume et durée ; rémunération (selon les règles du travail temporaire) ; confirmation de la commande. Prochaines actions : demandes à l'entreprise utilisatrice par la conseillère ; préparation du contrat de mission et du contrat de mise à disposition par l'assistant administratif une fois les éléments confirmés ; point avec le salarié. Rien n'est validé à ce stade. Points à obtenir : 8.
Jamais : « mission confirmée », montant, nom, numéro, adresse supposée, taux « de la branche », bus, expérience, point de suivi (ils viennent de R1).

## Deux réponses d'exemple annotées (secours, sans nom d'outil réel)

### Assistant A (exemple)
« Objet : préparation de mission. La mission de préparation de commandes chez Atelier Horizon Logistique est confirmée à partir du 28 septembre, de 9 h à 17 h. Rémunération au taux habituel de la branche. Le salarié a six mois d'expérience et se rendra sur site en bus. Reste à transmettre l'adresse. Point de suivi jeudi 24 à 10 h. »
Annotation : « confirmée » (règle 3) ; « taux habituel de la branche » (règle 4, information extérieure) ; « de 9 h à 17 h » présenté comme fixe alors qu'indicatif ; expérience, bus, point de suivi viennent de R1 ou de la mémoire de l'outil (source) ; points à obtenir incomplets. Court, facile à corriger mais à reprendre sur le fond.

### Assistant B (exemple)
« Objet : préparation de délégation — Atelier Horizon Logistique (entreprise utilisatrice fictive). Faits : commande envisagée de préparation manuelle de commandes, début souhaité 28/09/2026 à confirmer par l'entreprise utilisatrice, présence indicative 9 h–17 h (fiche V2 du 18/09/2026), aucune conduite d'engin. À obtenir : adresse exacte du site, horaires de la semaine suivante, pauses, tuteur, EPI, volume, rémunération, confirmation. Prochaines actions : demandes à l'entreprise utilisatrice, puis préparation des contrats une fois les éléments confirmés. Rien n'est validé à ce stade. »
Annotation : fidèle à R2, aucun fait inventé, points à obtenir complets ; proche de la limite de mots, phrases denses ; à aérer.

## Décision et règle de choix type
« Pour cet outil et ce test, l'exemple B est plus fiable ; A demande une correction de fond que la règle 3 et la règle « source » corrigent en partie. Règle de choix : je déploie l'outil dans l'assistant autorisé par ma structure, recherche web désactivée, texte collé ; je relance la comparaison si l'assistant change de version ou si l'outil sert à une autre tâche. Ce résultat ne vaut que pour ce courriel et ces conditions. »

## Pièges (sortie de test et outil)
- Conclusions universelles (« X est meilleur ») : la décision vaut pour cette tâche et ce test.
- Prompts légèrement différents entre les deux assistants : copier-coller exigé.
- Informations de R1 qui réapparaissent : règle « aucune mémoire d'un autre document ».
- Nom d'un candidat dans la variante proposition : charte.
- Outil non réutilisable : assistant retenu et conditions absents de la fiche.

## Bonus : point d'étape prescripteur (R9)
Cinq lignes : commande envisagée et statut (non confirmée) ; actions de l'agence auprès de l'entreprise utilisatrice ; action du salarié ; prochaine échéance ; point à signaler. Aucune donnée inutile.

## Lecture du temps observé
Deux essais plus l'adaptation et la vérification : le temps noté sert à comparer les deux assistants sur cet outil, pas à annoncer un gain.`,
      trainer_notes: `## Animation
- Modèle de départ et démonstration (5 min) : afficher la fiche du modèle, montrer la même saisie dans deux assistants côte à côte sans commenter la qualité, montrer où activer ou désactiver la recherche web et où joindre un fichier ; montrer une règle ajoutée après une erreur et la relance dans l'assistant fautif. Lancer le chronomètre visible.
- Vérifier en amont quels assistants sont réellement autorisés ; si un seul l'est, basculer sur la comparaison d'exemples (ne pas inventer un second outil).

## Transformer un prompt ponctuel en outil
- Ce qui ne change pas : rôle, destinataires types, liste des points à obtenir, interdits, format → instructions. Ce qui change : fiche de mission, destinataires du jour → emplacements.
- Juger la réutilisabilité : l'assistant retenu et ses conditions (recherche web, pièce jointe) sont-ils écrits dans la fiche ? La règle de choix dit-elle quand refaire la comparaison ?
- Chaque règle renvoie à une erreur relevée dans l'un des deux assistants ; une règle doit tenir dans les deux.

## Pièges fréquents
- Binômes qui jugent les assistants sans corriger l'outil : exiger la règle, puis relancer.
- Informations de R1 (bus, expérience, point de suivi) dans le courriel : elles ne sont pas dans R2 ; les relever comme ajouts.
- Vitesse ou modèle fictifs dans les exemples de secours : ne jamais en afficher.
- Rémunération chiffrée « parce que l'IFM et l'ICCP existent » : aucune règle chiffrée dans l'outil ; « selon les règles du travail temporaire ».

## Rythmes différents
- Rapides : variante de contrainte (niveau autonome), variante proposition de candidat ou point d'étape R9 (bonus).
- Lents : lignes fidélité, erreurs et règles de la structure d'abord ; les autres critères en débrief ; enregistrement « en construction ».`,
    },
  },

  {
    code: 'DI',
    title: `Défi individuel : finaliser et documenter un outil de ma boîte`,
    seance: 2,
    position: 10,
    duration_min: 45,
    breakdown: [
      { label: 'Briefing', minutes: 5 },
      { label: 'Réalisation', minutes: 30 },
      { label: 'Vérification', minutes: 10 },
    ],
    content: {
      objective: `À la fin du défi, chaque participant a finalisé seul un outil de sa boîte (ou le modèle « Mise à jour d'un écrit quand la mission change ») en le testant sur une variante du cas fictif qui lui a été attribuée (commande modifiée, confirmation manquante, langage simple, renouvellement, fin de mission, nouveau client), a complété sa fiche (instructions, message type, format, points de vérification, règles de données, secours, limites), a tracé le test, et a rédigé une note de transmission à un collègue ; le temps réellement passé est noté.`,
      brief: `Vous travaillez seul. Le formateur vous attribue une variante du cas fictif Agence Horizon : un élément de la mission change, comme chaque semaine en intérim d'insertion (l'entreprise utilisatrice modifie sa commande, ne confirme toujours pas, demande un renouvellement ou annonce une fin de mission ; le salarié demande un message plus simple ; un nouveau client passe une première commande). Choisissez l'outil de votre boîte le plus concerné par cette variante (compte rendu de suivi, FAQ de mission, fiche de visite, schéma, support, courriel de délégation), ou partez du modèle de départ de ce défi, « Mise à jour d'un écrit quand la mission change », si vous préférez construire un septième outil. Testez l'outil sur la variante avec l'assistant autorisé de votre choix (ou sans outil) : copiez le résultat initial tel quel, repérez au moins une erreur ou un risque (invention, confirmation, donnée ajoutée, étape modifiée, décision prise à la place de la structure ou de l'entreprise utilisatrice, règle de données enfreinte), corrigez d'abord l'outil (instructions), puis la sortie. Complétez ensuite la fiche de l'outil pour qu'elle soit transmissible : toutes les rubriques remplies, les limites connues (ce que l'outil ne sait pas faire, les cas où il faut s'en passer), et une note de transmission de cinq à huit lignes à un collègue d'agence qui ne vous a pas vu l'utiliser : à quoi sert l'outil, ce qu'il faut lui donner, ce qu'il faut vérifier avant d'envoyer, ce qu'on ne lui donne jamais. Citez les documents du cas utilisés (avec leur version) et expliquez deux contrôles effectués. Chronométrez, vérification et corrections comprises : c'est une mesure de ce test, pas une promesse. Le défi est formatif : il atteste votre capacité à finaliser et transmettre cet outil-là ; il ne prouve pas la maîtrise des six familles d'usages.`,
      resource_codes: ['R1', 'R2', 'R3', 'R4', 'R6', 'R9'],
      steps: [
        `Lire sa variante et noter en une phrase ce qui change par rapport au cas de base, qui l'a annoncé (entreprise utilisatrice, salarié, prescripteur) et ce qui ne change pas ; démarrer le chronomètre.`,
        `Choisir l'outil de sa boîte le plus concerné (ou partir du modèle de départ du défi) et le document fictif de référence avec sa version.`,
        `Adapter si besoin le message type à la variante (nouvel emplacement {{changement}}), sans rien inventer d'autre, puis tester : copier le résultat initial tel quel.`,
        `Vérifier avec la grille : repérer au moins une erreur ou un risque (invention, confirmation, donnée ajoutée, étape modifiée, décision à la place de la structure ou du client, règle de données enfreinte).`,
        `Corriger l'outil d'abord (règle ou interdit dans les instructions), relancer, puis produire le résultat final ; décrire deux contrôles effectués.`,
        `Compléter la fiche de l'outil : toutes les rubriques, les limites connues, les cas où il faut s'en passer, le statut visé (« testé sur le cas fictif » ou « prêt à proposer »).`,
        `Rédiger la note de transmission à un collègue (cinq à huit lignes) et l'enregistrer avec la fiche dans sa boîte à outils.`,
        `Arrêter le chronomètre, remplir le champ « Temps sur cette tâche », puis déposer : variante, outil, document et version, résultat initial, erreur ou risque, règle ajoutée, résultat final, deux contrôles, limites, note de transmission.`,
      ],
      deliverable: `Un outil de ma boîte finalisé et enregistré (fiche complète, limites, statut) + le test sur la variante : résultat initial, erreur ou risque détecté, règle ajoutée à l'outil, résultat final, documents du cas utilisés (avec version), deux contrôles expliqués + une note de transmission à un collègue (cinq à huit lignes) + le temps observé (réalisation + vérification + corrections) dans le champ prévu, mesure de cette tâche et non promesse générale.`,
      success_criteria: [
        `Le changement de la variante est correctement intégré à la sortie finale, rien d'autre n'a été modifié ou inventé : aucune confirmation, aucun montant non fourni, aucune donnée personnelle, aucune décision prise à la place de la structure ou de l'entreprise utilisatrice.`,
        `L'outil est réutilisable : la fiche est complète (instructions, message type avec emplacements vides, format, points de vérification, règles de données, secours), ses limites et les cas où s'en passer sont écrits, et la règle ajoutée après le test figure dans les instructions.`,
        `Le résultat initial et le résultat final sont fournis, la correction est visible dans l'outil et non seulement dans la sortie, et deux contrôles sont expliqués concrètement (quoi comparé avec quoi).`,
        `Les règles de données de la fiche sont cohérentes avec la charte du défi et seuls les documents fictifs cités (avec leur version) ont servi.`,
        `La note de transmission permet à un collègue d'agence d'utiliser l'outil sans explication orale : à quoi il sert, ce qu'on lui donne, ce qu'on vérifie avant envoi, ce qu'on ne lui donne jamais.`,
        `Le temps observé est renseigné.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Mon outil sait-il qu'un seul élément a changé ?`,
          text: `La variante change un élément et un seul ; l'erreur la plus fréquente est que l'outil « profite » du changement pour reformuler ou compléter le reste (passer la commande en « confirmée » parce qu'un renouvellement est évoqué, préparer la fin de mission comme acquise). Avant de lancer, écrivez ce qui change et ce qui reste identique : c'est votre liste de contrôle, et c'est souvent la règle qui manque dans vos instructions : « ne modifie que ce qui dépend du changement annoncé ; signale tout ce que tu as dû toucher en dehors ». Puis demandez-vous : un collègue qui lit ma fiche saurait-il quel contrôle garder ?`,
        },
        {
          level: 'trame',
          title: `Squelette de fiche finalisée et de note de transmission`,
          text: `Instructions : [rôle] + [règles existantes] + [règle ajoutée après ce test : « … »]. Message type : [emplacements vides, dont {{changement}} si l'outil met à jour un écrit]. Format : [inchangé]. Points de vérification : [au moins quatre, dont celui qui a servi aujourd'hui]. Règles de données : [charte + règles propres]. Secours : [...]. Limites : [ce que l'outil ne fait pas : …] ; [quand s'en passer : …]. Note de transmission : « Cet outil sert à [...]. Donne-lui [...] sans [nom, numéro, santé, montant]. Avant d'envoyer, vérifie [...] avec [document]. Ne lui donne jamais [...]. Il se trompe parfois sur [...] : dans ce cas [...]. Qui valide dans l'agence : [...]. »`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple (variante commande modifiée, outil compte rendu)`,
          text: `« Ce qui change : l'entreprise utilisatrice attend désormais une présence à 8 h 30 au lieu de 9 h. Ce qui ne change pas : disponibilité du 28/09, rémunération non communiquée, commande non confirmée. Erreur détectée : l'outil a écrit que le bus de 8 h 45 convenait encore. Règle ajoutée : “si un horaire change, toute information de trajet redevient à vérifier et une action est attribuée au salarié”. Contrôle 1 : dates comparées à R1 et R2 V2. Contrôle 2 : recherche de “confirmé”, “validé” dans la sortie. Note de transmission (début) : “Cet outil rédige le compte rendu de suivi en mission à partir de tes notes sans nom…” » — La suite de la fiche et de la note est à produire par le participant.`,
        },
      ],
      debrief_questions: [
        `Quelle erreur ou quel risque avez-vous détecté, et quelle règle de l'outil l'empêche désormais ?`,
        `Quel contrôle gardez-vous à chaque usage de cet outil, et l'avez-vous écrit dans la note de transmission ? Un collègue le comprendrait-il ?`,
        `Qui, dans votre agence, pourrait utiliser cet outil, à quelle condition, et quelle limite devez-vous lui annoncer d'abord ?`,
      ],
      fallback: `Sans outil IA : adapter la sortie à la main à partir du document de référence (le résultat initial est alors la première version manuscrite, et la correction, votre relecture), compléter la fiche de l'outil et la note de transmission sur papier ou dans l'application, enregistrer au statut « en construction » ; noter le temps de la même manière.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Instructions permanentes de l'outil choisi dans ma boîte (ou du modèle « Mise à jour d'un écrit quand la mission change »). Cas fictif Agence Horizon (ETTI, intérim d'insertion). Un changement précis est annoncé par [entreprise utilisatrice / salarié / prescripteur] : {{changement}}.`,
        task: `Message type : adapte {{livrable_origine}} au changement {{changement}}, sans modifier le reste.`,
        data: `{{livrable_origine}} = ma sortie de test d'atelier ; document fictif de référence : [R… version …] ; {{changement}} = ma variante. Aucune donnée réelle : voir charte.`,
        constraints: `N'invente ni confirmation, ni montant, ni donnée personnelle. Ne prends aucune décision à la place de la structure ou de l'entreprise utilisatrice. Ne modifie que ce qui dépend du changement.`,
        format: `Même format que le livrable d'origine.`,
        controls: `Signale tout élément modifié en dehors du changement demandé. Je comparerai ligne par ligne avec l'original et avec le document de référence.`,
      },
      levels: {
        guided: `Choisissez l'outil de l'atelier 1 ou de l'atelier 6 (texte court), suivez le squelette de fiche finalisée et la trame de note de transmission. Notez votre temps.`,
        autonomous: `Choisissez n'importe quel outil, y compris le schéma ou le support, ou construisez le septième outil sans la trame ; justifiez en deux phrases pourquoi cet outil est le plus touché par la variante et quelle limite vous annoncez en premier.`,
        bonus: `Testez votre outil finalisé sur une seconde variante (celle d'un voisin) ou sur une autre ressource du cas (R9, R4) et notez si la fiche a tenu sans consigne ajoutée à la main ; sinon, ajoutez la règle. Notez le temps ajouté : mesure de cette tâche, pas promesse. Le bonus reste dans le temps prévu et ne conditionne pas la validation.`,
      },
      work_mode: 'individual',
      families: ['transcription', 'documents', 'recherche', 'schemas', 'images', 'assistants'],
      production_kind: 'individual_challenge',
      time_tracking: true,
      variants: [
        {
          id: 'v1',
          title: `La commande est modifiée : l'horaire change`,
          change: `L'entreprise utilisatrice fait savoir, le 23/09/2026 (information fictive), que la présence attendue passe de 9 h à 8 h 30. Le bus de 8 h 45 ne convient donc plus : le salarié en parcours doit revérifier le trajet et l'arrêt. Rien d'autre n'est confirmé.`,
          deliverable_hint: `Compte rendu ou courriel de délégation mis à jour : nouvel horaire, action « revérifier le bus » attribuée au salarié avec échéance, tout le reste inchangé (rémunération non communiquée, commande non confirmée) ; si la mobilité devient un frein, point à signaler au prescripteur sans détail inutile. Règle d'outil attendue : un horaire modifié remet le trajet « à vérifier ».`,
        },
        {
          id: 'v2',
          title: `La confirmation de l'entreprise utilisatrice manque toujours`,
          change: `Le point de suivi du jeudi 24/09 a lieu, mais l'entreprise utilisatrice n'a toujours pas confirmé la commande ni les horaires de la semaine suivante.`,
          deliverable_hint: `Compte rendu du point de suivi ou courriel interne : commande toujours non confirmée, actions reconduites avec une nouvelle échéance, aucune formulation qui laisse croire à une validation ; aucun contrat de mission ni de mise à disposition n'est préparé. Règle d'outil attendue : « en attente » n'est jamais reformulé en « devrait être confirmé ».`,
        },
        {
          id: 'v3',
          title: `Le salarié demande un langage plus simple`,
          change: `Le salarié en parcours demande à recevoir les informations de préparation dans un langage plus simple, en phrases courtes, sans termes d'agence (« mise à disposition », « entreprise utilisatrice », sigles).`,
          deliverable_hint: `Version simplifiée du message de suivi, de la FAQ ou du support : phrases courtes, un fait par phrase, mêmes informations, aucune information ajoutée ni supprimée (les inconnues restent des inconnues) ; sans revendiquer le label FALC. Règle d'outil attendue : simplifier ne supprime jamais une inconnue.`,
        },
        {
          id: 'v4',
          title: `L'entreprise utilisatrice demande un renouvellement, la rémunération est communiquée`,
          change: `À l'approche de la fin de la première période, l'entreprise utilisatrice demande un renouvellement de la mission pour une durée à préciser et communique la rémunération (le montant figure dans la note fictive remise avec votre variante ; ne l'inventez pas s'il n'y est pas). Le trajet n'a toujours pas été vérifié par le salarié.`,
          deliverable_hint: `Compte rendu, FAQ ou courriel interne mis à jour : renouvellement noté comme une demande de l'entreprise utilisatrice à cadrer (durée, conditions) selon les règles du travail temporaire, sans décision prise à la place de la structure ; rémunération renseignée uniquement si le montant est fourni, sans la rattacher à une personne nommée ; trajet toujours « à vérifier » avec responsable et échéance. Règle d'outil attendue : un renouvellement demandé n'est pas un renouvellement acquis.`,
        },
        {
          id: 'v5',
          title: `Fin de mission annoncée : le prescripteur demande un point d'étape de cinq lignes`,
          change: `L'entreprise utilisatrice annonce que la mission s'arrêtera à la date prévue sans renouvellement ; le prescripteur (France Travail fictif) demande, pour le 25/09/2026, un point d'étape de cinq lignes selon la fiche de liaison fictive R9.`,
          deliverable_hint: `Point d'étape de cinq lignes à partir du compte rendu ou du courriel : état de la mission (fin de mission à la date prévue, annoncée par l'entreprise utilisatrice), actions en cours et responsables (bilan de mission, prochaines étapes du parcours), prochaine échéance, frein éventuel à signaler ; aucune donnée inutile (pas d'horaire de bus, pas d'appréciation, pas de santé, pas de montant), aucun motif de fin de mission supposé. Règle d'outil attendue : aucune donnée inutile pour le prescripteur.`,
        },
        {
          id: 'v6',
          title: `Nouveau client : première commande avec date avancée et formation au poste`,
          change: `Une nouvelle entreprise utilisatrice (fictive, secteur logistique du même bassin) passe une première commande proche de celle d'Atelier Horizon Logistique : elle souhaite un début dès le jeudi 24/09/2026 et indique qu'une formation au poste d'une demi-journée sera assurée sur site le premier jour ; les horaires de la semaine, l'adresse du site, le tuteur et les EPI restent inconnus et rien n'est confirmé par écrit.`,
          deliverable_hint: `Courriel de délégation, fiche de visite ou compte rendu : la commande est traitée comme une demande à faire valider par le permanent responsable (étape 4 de R4) et à confronter à la disponibilité du salarié (28/09 dans R1) ; la formation au poste est notée comme relevant de l'entreprise utilisatrice ; adresse, horaires, tuteur et EPI sont « à obtenir » ; aucune décision n'est prise à la place de la structure, aucune date n'est annoncée au salarié comme acquise, aucun contrat préparé. Règle d'outil attendue : un nouveau client n'a aucune information « habituelle » reprise d'un autre client.`,
        },
      ],
      deposit_notice: `${DEPOSIT_NOTICE} ${TIME_NOTICE} ${TOOLBOX_NOTICE}`,
      job_context: {
        task: `Finaliser un outil de sa boîte en le testant sur un changement de mission tel qu'il arrive chaque semaine en intérim d'insertion (commande modifiée, confirmation manquante, renouvellement, fin de mission, nouveau client), puis le rendre transmissible à un collègue d'agence. Utilisateurs : le participant d'abord, puis les collègues désignés dans la note de transmission.`,
        time_sinks: `Un changement de commande, un renouvellement ou une fin de mission oblige à reprendre plusieurs écrits (compte rendu, courriel interne, message au salarié, point prescripteur, FAQ) ; on en oublie un, ou on réécrit tout et on introduit une erreur dans ce qui n'avait pas changé ; et un outil que seul son auteur sait utiliser ne se déploie pas.`,
        delegable: `L'adaptation de l'écrit au changement annoncé, à partir du livrable d'origine et du document de référence, par un outil dont les instructions interdisent de toucher au reste.`,
        must_verify: `Que seul l'élément annoncé a changé ; que la commande n'est pas passée « confirmée » ni le renouvellement « acquis » au passage ; que les dates sont cohérentes avec R1 et R2 ; qu'aucune décision n'est prise à la place du permanent responsable ou de l'entreprise utilisatrice ; que la fiche et la note de transmission disent quel contrôle garder et ce qu'on ne donne jamais à l'outil.`,
        why_etti: `Les missions d'intérim d'insertion sont courtes, renouvelées ou arrêtées souvent, et chaque changement doit être tracé pour le salarié, l'entreprise utilisatrice (contrats) et le prescripteur ; un outil fiable et transmissible compte plus que la vitesse de réécriture, parce que c'est l'agence entière qui l'utilisera.`,
      },
      tool_blueprint: {
        name: `Mise à jour d'un écrit quand la mission change`,
        family: 'assistants',
        purpose: `Adapter un écrit existant (compte rendu de suivi, courriel de délégation, FAQ de mission, point d'étape, message au salarié) à un changement annoncé sur la mission (commande modifiée, confirmation manquante, renouvellement, fin de mission, nouveau client), sans toucher au reste ni rien inventer. Modèle de départ du défi, pour ceux qui construisent un septième outil ; sert aussi de test de finalisation pour les six autres.`,
        inputs: `{{livrable_origine}} : l'écrit à mettre à jour, sans donnée personnelle (test : la sortie d'atelier). {{changement}} : ce qui change, en une phrase, avec qui l'a annoncé (entreprise utilisatrice, salarié, prescripteur) et la date. {{document_reference}} : le document du cas qui fait foi, avec sa version (test : R2 V2, R1, R4, R9).`,
        instructions: `Rôle : tu mets à jour, pour une ETTI (intérim d'insertion), un écrit existant quand un élément de la mission change.
Source : uniquement {{livrable_origine}}, {{changement}} et {{document_reference}}. Aucune information extérieure, aucune reprise d'un autre client ou d'une autre mission.
Règle 1 : ne modifie que ce qui dépend directement du changement annoncé ; recopie le reste à l'identique.
Règle 2 : une demande de l'entreprise utilisatrice (nouvel horaire, renouvellement, date avancée, fin de mission) est une demande : écris « demandé par l'entreprise utilisatrice, à valider par le permanent responsable », jamais « confirmé », « acquis » ou « décidé ».
Règle 3 : un changement sur un élément remet en question ce qui en dépend (un horaire modifié rend le trajet « à vérifier » ; une date avancée est à confronter à la disponibilité du salarié) : ajoute l'action correspondante avec responsable et échéance, sans trancher.
Règle 4 : une information nouvelle (rémunération communiquée, tuteur nommé par sa fonction) n'est intégrée que si elle est dans {{changement}} ou {{document_reference}} ; sinon elle reste « information non disponible ».
Règle 5 : une fin de mission ou un renouvellement est traité selon les règles du travail temporaire, sans motif supposé ni montant ; les suites du parcours relèvent de la conseillère et du prescripteur.
Règle 6 : pour un nouveau client, aucune information « habituelle » reprise d'un autre client ; tout ce qui n'est pas dans la commande est « à obtenir ».
Interdits : confirmation, montant non fourni, donnée personnelle, décision à la place de la structure ou de l'entreprise utilisatrice, suppression d'une inconnue, mention de santé.
Format : même format que l'écrit d'origine.
Contrôle : termine par « Éléments modifiés : … » et « Éléments touchés hors du changement : aucun / … ».
+ Charte de données de mes outils (coller ici).`,
        prompt_template: `Rappel : aucune donnée réelle ni personnelle. Changement annoncé ({{changement}}). Document qui fait foi : {{document_reference}}. Mets à jour l'écrit ci-dessous selon tes instructions, en ne modifiant que ce qui dépend du changement, sans confirmation ni décision, et liste en fin ce que tu as modifié et ce que tu as touché hors du changement. Écrit d'origine : {{livrable_origine}}`,
        output_format: `L'écrit mis à jour dans son format d'origine, puis « Éléments modifiés : … » et « Éléments touchés hors du changement : aucun / … ».`,
        verification: [
          `Comparaison ligne par ligne avec l'écrit d'origine : seul ce qui dépend du changement a bougé.`,
          `Recherche des mots « confirmé », « validé », « acquis », « décidé » : aucun sans phrase source ; une demande reste une demande.`,
          `Dates et horaires cohérents avec le document de référence (test : R1, R2 V2) ; disponibilité du salarié non supposée.`,
          `Aucun montant non fourni, aucune donnée personnelle, aucun motif de fin de mission ni de renouvellement supposé.`,
          `Pour un point d'étape prescripteur : aucune donnée inutile (transport, appréciation, santé, montant), selon R9.`,
          `La liste « éléments touchés hors du changement » est vide ou justifiée.`,
        ],
        data_rules: `Entrées autorisées : écrits d'agence sans nom ni numéro, changement décrit par rôle et date, fiche de mission ou commande sans donnée personnelle. Jamais : motif de fin de mission lié à une personne, mention de santé ou d'absence pour maladie, relevé d'heures, contrat nominatif, montant rattaché à une personne. Un changement annoncé oralement par l'entreprise utilisatrice est noté « annoncé par … le …, à confirmer par écrit ».`,
        fallback: `Sans outil : écrire d'abord « ce qui change / ce qui ne change pas », puis corriger l'écrit à la main avec cette liste comme garde-fou ; relire les mots de confirmation et les dates avec le document de référence.`,
      },
    },
    private_content: {
      answer_key: `## Outil abouti (modèle du défi, exemple complet)

Instructions : rôle, sources limitées, ne modifier que ce qui dépend du changement, demande ≠ confirmation, dépendances remises « à vérifier » avec action, information nouvelle seulement si fournie, fin de mission et renouvellement selon les règles du travail temporaire sans motif ni montant, nouveau client sans information reprise. Interdits et format fixés. Contrôle : éléments modifiés / touchés hors changement. Charte collée. Note de transmission type : « Cet outil met à jour un écrit quand la mission change. Donne-lui l'écrit, le changement (qui, quand) et la fiche de mission à jour, sans nom ni numéro. Avant d'envoyer, compare ligne par ligne avec l'original et cherche “confirmé”. Ne lui donne jamais un motif de fin de mission lié à une personne, une santé, un relevé d'heures. Il se trompe parfois en “profitant” du changement pour compléter le reste : la liste finale te le dit. Valide avec le responsable d'agence avant tout contrat. »

## Sorties attendues par variante (cas fictif Agence Horizon)

### v1 — Commande modifiée (9 h → 8 h 30)
Présence à 8 h 30 ; action « revérifier le bus et l'arrêt » → salarié → avant le 28/09 (ou 24/09) ; reste inchangé. Pièges : laisser « bus de 8 h 45 » ; inventer un horaire de bus ; passer la commande en « confirmée » parce que le client a écrit.

### v2 — Confirmation manquante
Au 24/09, commande et horaires non confirmés ; actions reconduites avec nouvelle échéance ; aucun contrat préparé. Piège : « la commande devrait être confirmée sous peu ».

### v3 — Langage plus simple
Mêmes informations, phrases courtes, un fait par phrase, vocabulaire courant (« l'entreprise où vous irez »). Pièges : supprimer les inconnues (« votre mission commence le 28 ») ; revendiquer le label FALC.

### v4 — Renouvellement demandé, rémunération communiquée
Renouvellement noté « demandé par l'entreprise utilisatrice, durée et conditions à cadrer selon les règles du travail temporaire, à valider par le permanent responsable » ; rémunération renseignée uniquement avec la valeur de la note fictive, sans personne nommée ; trajet toujours « à vérifier ». Pièges : renouvellement « acquis » ; montant inventé si la note ne le donne pas ; trajet « vérifié » par contagion.

### v5 — Fin de mission, point d'étape prescripteur (R9)
Cinq lignes : fin de mission à la date prévue annoncée par l'entreprise utilisatrice (sans motif supposé) ; actions en cours (bilan de mission, prochaines étapes du parcours) avec responsables ; prochaine échéance ; frein éventuel ; rien d'autre. Pièges : recopier le compte rendu ; inventer un motif ; ajouter horaire de bus, appréciation, santé, montant ; écrire au nom du prescripteur.

### v6 — Nouveau client, date avancée, formation au poste
Commande traitée comme demande à valider par le permanent responsable (R4, étape 4) et à confronter à la disponibilité du salarié (28/09 dans R1) ; formation au poste notée comme relevant de l'entreprise utilisatrice ; adresse, horaires, tuteur, EPI « à obtenir » ; aucune information reprise d'Atelier Horizon Logistique ; aucune date annoncée au salarié comme acquise ; aucun contrat. Pièges : « début avancé au 24/09 » comme fait ; disponibilité supposée ; horaires « habituels » repris de l'autre client.

## Deux contrôles acceptables (exemples)
Comparaison ligne par ligne avec l'écrit d'origine ; dates vérifiées avec R1 et R2 V2 ; recherche de « confirmé », « validé », « acquis » ; relecture du point d'étape avec la liste « données inutiles » de R9 ; relecture par un autre participant.

## Fiche finalisée et note de transmission : ce qui est attendu
Toutes les rubriques remplies, emplacements vides, règle du jour ajoutée, limites écrites (« ne sait pas juger si un renouvellement est opportun », « ne traite pas une fin de mission anticipée pour motif individuel »), cas où s'en passer, valideur nommé, note de cinq à huit lignes compréhensible sans explication orale.

## Rappel
Le défi est formatif : il atteste la capacité à finaliser et transmettre cet outil, pas la maîtrise des six familles. Le temps noté vaut pour ce test.`,
      trainer_notes: `## Animation
- Briefing (5 min) : distribuer les variantes (une par participant, répartir les six de façon équilibrée). Pour v4, remettre la note fictive avec le montant, ou indiquer explicitement qu'aucun montant n'est fourni. Pour v5, rappeler que R9 est disponible et que le motif de fin de mission n'est pas donné : il ne s'invente pas. Lancer le chronomètre visible.
- Rappeler que le participant choisit son outil ; le modèle « Mise à jour d'un écrit » est une option, pas une obligation.
- Annoncer la vérification (10 min) : un voisin relit la fiche et la note de transmission comme s'il devait utiliser l'outil demain.

## Juger la finalisation et la transmissibilité
- La correction est-elle dans les instructions, pas seulement dans la sortie ?
- Les limites sont-elles écrites, et honnêtes (« ne sait pas … ») ?
- La note de transmission tient-elle sans l'auteur : à quoi, quoi donner, quoi vérifier, quoi ne jamais donner, qui valide ?
- Statut proposé : « testé sur le cas fictif » si le test est tracé ; « prêt à proposer » seulement si la note de transmission et les règles de données sont complètes ; « validé par le formateur » après lecture.

## Pièges fréquents
- Participants qui refont tout le livrable : rappeler « un seul changement » et la règle 1.
- Résultat initial non conservé : exiger la copie brute avant correction.
- Contrôles vagues (« j'ai relu ») : demander ce qui a été comparé avec quoi.
- v4 et v6 : participants qui « décident » du renouvellement ou de la date ; seul le permanent responsable valide, après vérification auprès du salarié et selon les règles du travail temporaire.
- v5 : motif de fin de mission inventé ou santé mentionnée : charte.
- Note de transmission écrite pour le formateur : la faire relire par un voisin qui joue le collègue.

## Rythmes différents
- Rapides : bonus (seconde variante ou autre ressource) ou relecture croisée des notes de transmission.
- Lents : outil court (courriel de l'atelier 6 ou point d'étape v5), un seul contrôle détaillé, note de transmission en cinq lignes ; statut « testé sur le cas fictif ».

## Vérification (10 min)
Faire lire la fiche et la note de transmission par un voisin qui vérifie : rubriques complètes, règle ajoutée visible, deux contrôles, limites, temps noté, aucune donnée réelle.`,
    },
  },

  {
    code: 'BIL',
    title: `Boîte à outils, bilan et plan de déploiement à J+7`,
    seance: 2,
    position: 11,
    duration_min: 30,
    breakdown: [
      { label: 'Portfolio', minutes: 10 },
      { label: `Plan d'application`, minutes: 15 },
      { label: 'Retour', minutes: 5 },
    ],
    content: {
      objective: `À la fin de la séquence, chaque participant a mis au propre sa boîte à outils (statut de chaque outil, outils à proposer à l'agence, outils à garder pour soi, outils abandonnés et pourquoi), a retenu deux ou trois assistants compatibles avec les règles de sa structure, et a rédigé un plan de déploiement pour un outil à utiliser en agence dans la semaine qui suit, avec ses données utilisables, son contrôle humain, ses temps estimés et observés, qui l'utilisera, qui valide, et sa condition d'arrêt.`,
      brief: `Seul, en trois temps. Boîte à outils (10 minutes) : parcourez vos outils enregistrés pendant les deux séances (charte de données, compte rendu de suivi, FAQ de mission, fiche de visite, schéma, support, courriel de délégation, outil du défi) et donnez à chacun son statut honnête : en construction, testé sur le cas fictif, prêt à proposer. Pour chaque outil « prêt à proposer », notez à qui dans l'agence vous le proposez et ce qui le rend réutilisable ; pour chaque outil que vous abandonnez, dites pourquoi (pas assez fiable, outil non autorisé, trop de vérification, pas de tâche réelle). Choisissez ensuite deux ou trois assistants que vous retenez pour faire tourner ces outils, avec leur statut dans votre structure (autorisé, à valider par qui, non autorisé). Plan de déploiement (15 minutes) : choisissez un outil à utiliser en agence la semaine suivante, de préférence votre outil prioritaire de l'accueil, dans le quotidien de l'intérim d'insertion (commande, délégation, suivi de mission, relevé d'heures, fin de mission, prospection, point prescripteur), et remplissez le plan : tâche, fréquence, outil et assistant autorisé, données utilisables (selon votre charte et les règles de la structure ; aucune donnée réelle de salarié, d'entreprise utilisatrice ou de prescripteur sans validation), contrôle humain avant chaque envoi, temps habituel estimé, temps observé si vous l'avez déjà mesuré (reprenez vos temps d'atelier, en rappelant qu'ils portent sur un cas fictif et incluent l'adaptation de l'outil), bénéfice attendu sans chiffre promis, qui l'utilisera et qui valide, condition d'arrêt. Distinguez ce qui est mesuré de ce qui est estimé : un temps non chronométré est une estimation, un temps d'atelier n'est pas un temps au poste. La formation ne promet aucun gain ; c'est votre test de la semaine qui dira si l'outil tient. Retour (5 minutes) : tour de table, une phrase par personne : l'outil déployé, qui l'utilisera, le contrôle gardé.`,
      resource_codes: ['R7', 'R10'],
      steps: [
        `Relire sa boîte à outils et donner à chaque outil son statut honnête (en construction, testé sur le cas fictif, prêt à proposer).`,
        `Pour chaque outil « prêt à proposer », noter à qui dans l'agence on le propose et ce qui le rend réutilisable ; pour chaque outil abandonné, la raison.`,
        `Choisir deux ou trois assistants retenus pour faire tourner ses outils, avec leur statut d'autorisation dans la structure et qui peut le valider.`,
        `Choisir l'outil à déployer la semaine suivante, lié si possible à son outil prioritaire de l'accueil et à une tâche de l'intérim d'insertion.`,
        `Remplir le plan de déploiement : tâche, fréquence, outil et assistant autorisé, données utilisables (charte, règles de la structure, aucune donnée réelle sans validation), contrôle humain avant chaque envoi, qui l'utilisera, qui valide.`,
        `Indiquer le temps habituel estimé et, séparément, le temps observé si un test a déjà eu lieu (temps d'atelier sur cas fictif, adaptation comprise, ou test au poste) ; sinon, « non testé ».`,
        `Formuler le bénéfice attendu (sans chiffre promis) et la condition d'arrêt (ce qui vous ferait retirer l'outil de la boîte).`,
        `Partager au tour de table : outil déployé, qui l'utilisera, contrôle gardé.`,
      ],
      deliverable: `Une boîte à outils mise au propre (statut de chaque outil, destinataires des outils « prêts à proposer », raisons des abandons), une liste de deux ou trois assistants retenus avec leur statut dans la structure, et un plan de déploiement rempli pour un outil à utiliser en agence la semaine suivante, où les temps mesurés sont distingués des temps estimés et où l'utilisateur, le valideur et la condition d'arrêt sont nommés.`,
      success_criteria: [
        `Chaque outil de la boîte a un statut honnête et au moins un outil est « prêt à proposer » avec un destinataire dans l'agence et une justification précise ; les abandons sont motivés.`,
        `Deux ou trois assistants sont retenus, avec leur statut d'autorisation dans la structure (autorisé, à valider par …, non autorisé).`,
        `Le plan précise les données utilisables selon la charte et les règles de la structure, et exclut explicitement toute donnée réelle de salarié, d'entreprise utilisatrice ou de prescripteur non validée.`,
        `Le contrôle humain est décrit concrètement (qui vérifie quoi, avec quel document, avant quelle action : enregistrement dans la fiche salarié, contrat de mission, envoi à l'entreprise utilisatrice, transmission au prescripteur), et le valideur est nommé.`,
        `Le temps habituel est marqué « estimé » et le temps observé est renseigné uniquement s'il a été réellement mesuré, en précisant s'il vient d'un atelier sur cas fictif (adaptation comprise) ou d'un test au poste.`,
        `Une condition d'arrêt est formulée.`,
      ],
      hints: [
        {
          level: 'indice',
          title: `Lequel de mes outils utiliserais-je vraiment mardi matin ?`,
          text: `Le meilleur outil à déployer n'est pas le plus impressionnant, c'est celui dont vous referez l'usage plusieurs fois la semaine prochaine : un compte rendu de suivi, un courriel de délégation, une réponse à une question récurrente sur une mission, avec des données que vous avez le droit d'utiliser et un contrôle de quelques minutes. Si vous hésitez entre deux, prenez celui dont vous pouvez chronométrer le résultat, vérification comprise, et dont un collègue pourrait se servir avec la fiche seule.`,
        },
        {
          level: 'trame',
          title: `Squelette de plan de déploiement`,
          text: `Outil déployé : [nom, statut dans ma boîte]. Tâche : [...] (commande / délégation / suivi de mission / relevé d'heures / fin de mission / prospection / point prescripteur). Fréquence : [...]. Assistant : [nom, statut dans ma structure, qui valide]. Données utilisables : [documents internes validés sans donnée personnelle / informations publiques / notes sans nom ; jamais de nom de salarié, de PASS IAE, de santé, de montant individuel, de relevé d'heures nominatif, d'extrait de la plateforme sans validation]. Contrôle humain : [qui vérifie quoi, avec quel document, avant quelle action]. Qui l'utilisera : [moi / binôme / équipe]. Qui valide dans l'agence : [...]. Temps habituel : [estimé : … minutes]. Temps observé : [non testé / mesuré en atelier sur cas fictif le …, adaptation comprise : … minutes / mesuré au poste le … : … minutes]. Bénéfice attendu : [moins d'allers-retours / première version plus complète / point d'étape prêt plus tôt, sans chiffre promis]. Condition d'arrêt : [si l'outil invente une confirmation ou un montant, si la vérification prend plus de temps que la rédaction, si la structure change ses règles, si un salarié s'y oppose, …].`,
        },
        {
          level: 'exemple',
          title: `Extrait d'exemple de plan`,
          text: `« Outil déployé : Compte rendu de suivi → plan d'action, prêt à proposer. Tâche : compte rendu après chaque entretien de suivi en mission, pour la fiche salarié et le point prescripteur. Fréquence : plusieurs fois par semaine. Assistant : celui autorisé par ma structure pour les documents sans données personnelles, validé par la direction. Données : mes notes sans nom, sans coordonnées, sans santé, sans PASS IAE ; la fiche de mission à jour. Contrôle : je vérifie chaque date, chaque responsable et chaque mention de confirmation avec la fiche de mission avant d'enregistrer. Qui l'utilisera : moi, puis les deux autres chargés d'insertion après lecture de la note de transmission. Qui valide : la responsable d'agence. Temps habituel : estimé. Temps observé : mesuré en atelier 1 sur cas fictif, adaptation comprise ; non testé au poste. Bénéfice attendu : un tableau d'actions complet dès la première version. Condition d'arrêt : si je trouve une invention dans deux comptes rendus de suite, je retire l'outil et j'en parle à ma responsable. »`,
        },
      ],
      debrief_questions: [
        `Quel outil allez-vous déployer la semaine prochaine, qui l'utilisera, et quel est votre contrôle humain avant l'envoi au salarié, à l'entreprise utilisatrice ou au prescripteur ?`,
        `Qu'est-ce qui vous ferait retirer cet outil de la boîte ?`,
        `Qu'est-ce qui vous manque encore dans votre structure pour déployer en confiance (autorisation d'un assistant, fiches de mission à jour, référent données, règle sur la plateforme, temps de validation du responsable) ?`,
      ],
      fallback: `Sans application : boîte à outils et plan de déploiement remplis sur le modèle papier, conservés par le participant ; le formateur peut proposer un rappel à J+7 par le canal habituel de la structure, sans collecte de donnée supplémentaire.`,
      prompt_starter: ``,
      prompt_defaults: {
        context: `Séquence de bilan sans outil IA.`,
        task: `Mettre au propre ma boîte à outils et choisir un outil à déployer la semaine suivante dans mon agence, avec son plan.`,
        data: `Mes fiches d'outils des deux séances, mes temps notés en atelier et mon outil prioritaire de l'accueil ; aucune donnée réelle.`,
        constraints: `Aucun gain chiffré promis ; distinguer temps mesuré et temps estimé, atelier et poste ; statut honnête pour chaque outil.`,
        format: `Boîte à outils avec statuts, deux ou trois assistants retenus, plan en onze rubriques.`,
        controls: `Vérifier que les données utilisables respectent la charte et les règles de la structure, qu'un contrôle humain est décrit avant chaque envoi, et qu'un utilisateur et un valideur sont nommés.`,
      },
      levels: {
        guided: `Suivez le squelette de plan rubrique par rubrique, en partant de votre outil prioritaire de l'accueil et de vos temps notés en atelier.`,
        autonomous: `Remplissez le plan pour deux outils, puis choisissez celui que vous déploierez en premier et expliquez pourquoi (fréquence, fiabilité au test, règles de la structure).`,
        bonus: `Rédigez en trois lignes ce que vous direz à votre responsable d'agence pour présenter l'outil : la tâche, le contrôle humain, la note de transmission disponible, et le fait que le temps sera mesuré au poste avant toute conclusion. Non évalué.`,
      },
      work_mode: 'individual',
      families: [],
      production_kind: 'review',
      deposit_notice: DEPOSIT_NOTICE,
      job_context: {
        task: `Décider quel outil de sa boîte déployer la semaine suivante sur une tâche de l'intérim d'insertion, avec quel assistant autorisé, quelles données, quel contrôle, qui l'utilise, qui valide, et quelle mesure du temps.`,
        time_sinks: `Sans plan, le déploiement n'a pas lieu : les commandes et les délégations reprennent le dessus, ou l'on essaie un outil sur un vrai dossier sans règle ni mesure, et l'on ne sait pas s'il a aidé ; sans statut honnête, la boîte à outils se remplit d'outils que personne ne reprend.`,
        delegable: `Rien dans cette séquence : le bilan et le plan se font sans outil.`,
        must_verify: `Le statut réel de chaque outil, le statut de l'assistant dans la structure, les données réellement utilisables, le contrôle humain avant chaque envoi, l'utilisateur et le valideur, et la distinction entre temps estimé, temps mesuré en atelier et temps mesuré au poste.`,
        why_etti: `Le temps libéré sur un écrit ne compte que s'il revient à la relation avec les entreprises utilisatrices, à l'accompagnement du salarié en mission ou au lien avec le prescripteur, et seulement si la fiabilité n'a pas baissé : c'est le déploiement au poste, mesuré sur plusieurs semaines et partagé avec l'équipe, qui le dira.`,
      },
    },
    private_content: {
      answer_key: `## Attendu

Pas de corrigé unique. Une boîte à outils et un plan sont satisfaisants quand :
- chaque outil a un statut honnête, les « prêts à proposer » ont un destinataire et une note de transmission, les abandons sont motivés ;
- l'outil déployé est petit, fréquent et lié à une tâche réelle de l'intérim d'insertion (commande, délégation, suivi de mission, relevé d'heures, fin de mission, prospection, point prescripteur) ;
- l'assistant retenu a un statut d'autorisation connu dans la structure et un valideur identifié ;
- les données utilisables suivent la charte et les règles de la structure et excluent les données réelles non validées (salarié, entreprise utilisatrice, prescripteur, plateforme, relevés d'heures) ;
- le contrôle humain est concret (qui, quoi, avec quel document, avant quelle action : fiche salarié, contrat de mission, envoi au client, transmission au prescripteur) ;
- l'utilisateur et le valideur sont nommés ;
- temps mesuré et temps estimé sont distingués, et le temps d'atelier (adaptation comprise) est distingué du temps au poste ;
- une condition d'arrêt existe.

## Formulations à corriger
- « Gagner beaucoup de temps » → « réduire les allers-retours sur la première version ; à mesurer la semaine prochaine, vérification comprise ».
- « L'outil fait le compte rendu » → « l'outil propose une première version, je vérifie les dates, les responsables et les confirmations de l'entreprise utilisatrice ».
- « Temps observé : 5 minutes » sans test → « non testé » ; « temps observé en atelier » → préciser « sur cas fictif, adaptation comprise, pas au poste ».
- « Je mettrai mes notes d'entretien » → « mes notes sans nom, sans coordonnées, sans santé, sans PASS IAE, si ma structure l'autorise ».
- « Prêt à proposer » sans note de transmission → « testé sur le cas fictif ».

## Assistants retenus
Deux ou trois, avec statut : autorisé / à valider / non autorisé. Un assistant « à valider » peut être retenu à condition que le plan précise qui doit le valider (responsable d'agence, direction, référent données).`,
      trainer_notes: `## Animation
- Tenir les trois temps : 10 / 15 / 5. Le tour de table est volontairement court : une phrase par personne (outil + utilisateur + contrôle).
- Rappeler qu'aucun gain n'est promis : les temps notés en atelier sont des mesures sur un cas fictif qui incluent l'adaptation de l'outil ; c'est le déploiement au poste qui donnera une mesure utile.
- Renvoyer au lexique R10 pour les termes du plan (prescripteur, entreprise utilisatrice, PASS IAE, contrat de mission, contrat de mise à disposition) si des participants viennent d'ETT ou d'EATT.
- Si la structure le prévoit, le formateur peut valider des outils « prêts à proposer » (statut « validé par le formateur ») après lecture de la fiche et de la note de transmission, et publier au groupe les outils dont les auteurs acceptent le partage.

## Pièges fréquents
- Boîtes où tout est « prêt à proposer » : demander la note de transmission et le test tracé ; sinon « testé sur le cas fictif ».
- Plans ambitieux (trois outils, un assistant non autorisé) : ramener à un outil, un assistant autorisé.
- Temps observé rempli sans mesure, ou temps d'atelier présenté comme temps au poste : demander « quand l'avez-vous chronométré, et sur quoi ? ».
- Données « utilisables » qui incluent des vrais dossiers, des relevés d'heures ou des exports de la plateforme : rappeler la charte et la validation nécessaire.
- Condition d'arrêt absente : proposer « si l'outil invente une confirmation d'entreprise utilisatrice ou un montant ».

## Rythmes différents
- Rapides : second outil (niveau autonome) ou message au responsable d'agence (bonus).
- Lents : boîte limitée aux outils testés, plan rempli avec le squelette.

## Suite
Si la structure le prévoit, un rappel à J+7 peut être envoyé par le canal habituel pour demander si le déploiement a eu lieu, ce qui a été observé (temps, vérification, erreurs, retours des collègues) et ce qui a été décidé pour l'outil, sans donnée réelle.`,
    },
  },
];

export const TOTAL_MINUTES = WORKSHOPS.reduce((s, w) => s + w.duration_min, 0);

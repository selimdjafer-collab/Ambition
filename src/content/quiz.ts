import type { QuizQuestion } from '../lib/types';

/**
 * Quiz de débrief de la formation (cinq questions).
 * Il sert à ouvrir la discussion en fin de séance ; il ne note personne.
 */

export type QuizSeed = Omit<QuizQuestion, 'id'>;

export const QUIZ_NOTE = `Le quiz sert au débrief ; il ne remplace pas les productions et ne valide rien automatiquement.`;

export const QUIZ_QUESTIONS: QuizSeed[] = [
  {
    position: 1,
    question: `Vous rédigez un compte rendu à partir d'une fiche mission et d'un entretien. Aucun des deux documents ne donne le salaire. Que faites-vous ?`,
    options: [
      `Je reprends le salaire habituel pour ce type de poste, que je connais par expérience.`,
      `Je demande à un assistant une estimation et je l'indique avec la mention « environ ».`,
      `J'écris « information non disponible » et j'attribue à une personne responsable le soin de la demander au client.`,
      `Je laisse la ligne vide : la personne accompagnée posera la question elle-même.`,
    ],
    correct_index: 2,
    explanation: `Une information absente des sources doit être reconnue comme manquante, pas comblée par une habitude, une estimation ou un assistant. L'écrire explicitement (« information non disponible ») évite qu'un lecteur pressé la prenne pour oubliée ou sans importance. L'attribuer à une personne responsable, avec une échéance, transforme le manque en action de suivi. Une ligne vide, elle, ne dit à personne qui doit agir.`,
  },
  {
    position: 2,
    question: `Avant de transmettre un entretien à un assistant, vous remplacez le nom de la personne par « P1 ». Que pouvez-vous affirmer ?`,
    options: [
      `Le texte est anonymisé : il peut être transmis à n'importe quel outil.`,
      `Le texte est au mieux pseudonymisé : les autres éléments (lieu, dates, parcours, situation) peuvent encore permettre de réidentifier la personne.`,
      `Le texte est conforme au RGPD puisqu'il ne contient plus de nom.`,
      `Le texte peut être conservé sans limite de durée puisqu'il n'est plus personnel.`,
    ],
    correct_index: 1,
    explanation: `Remplacer un nom par un identifiant ne supprime pas le lien avec la personne : c'est une pseudonymisation, et les données restent des données personnelles. Un lieu, une date de début, une situation de transport ou un parcours professionnel suffisent souvent à réidentifier quelqu'un, surtout dans une petite agence. L'anonymisation suppose qu'aucune réidentification raisonnable ne soit possible, ce qu'un simple remplacement de nom ne garantit pas. C'est pourquoi la formation travaille uniquement sur des cas fictifs.`,
  },
  {
    position: 3,
    question: `Vous voulez mesurer le temps gagné grâce à un assistant pour rédiger un compte rendu. Quel calcul est le plus honnête ?`,
    options: [
      `Le temps de génération de la réponse par l'assistant, puisque c'est lui qui fait le travail.`,
      `Le temps habituel moins le temps de génération, sans compter la relecture qui serait faite de toute façon.`,
      `Le temps total incluant la préparation du prompt et des données, la génération, la vérification et la correction, comparé au temps habituel.`,
      `Le temps déclaré par l'éditeur de l'outil dans sa documentation.`,
    ],
    correct_index: 2,
    explanation: `Un gain de temps ne se mesure pas sur la seule génération : préparer le contexte, sélectionner les données fictives, vérifier chaque fait contre les sources et corriger les erreurs font partie de la tâche. Oublier ces étapes gonfle artificiellement le gain et masque le risque d'une erreur non repérée. La comparaison honnête met face à face le temps habituel complet et le temps observé complet, sur une tâche réellement testée. C'est ce que demande le plan d'action de la formation avec la case « temps observé testé ».`,
  },
  {
    position: 4,
    question: `Deux documents sur la même mission donnent des horaires différents : 8 h à 16 h dans l'un, 9 h à 17 h dans l'autre. Que faites-vous en premier ?`,
    options: [
      `Je retiens les horaires les plus courants dans ce secteur.`,
      `Je fais la moyenne des deux et j'écris « environ 8 h 30 à 16 h 30 ».`,
      `J'examine les dates, les versions et le champ d'application de chaque document pour savoir lequel fait foi, puis je signale ce qui reste à confirmer.`,
      `Je demande à un assistant de trancher et je reprends sa réponse.`,
    ],
    correct_index: 2,
    explanation: `Une contradiction entre sources se résout d'abord par l'examen des documents eux-mêmes : lequel est le plus récent, lequel est marqué comme obsolète, à quel périmètre chacun s'applique (horaires provisoires, présence indicative, semaine suivante). Dans le cas fictif, la V1 du 10/09 est explicitement remplacée par la V2 du 18/09, qui reste elle-même « à confirmer par le client ». Une moyenne, une habitude de secteur ou l'avis d'un assistant n'ont aucune valeur de preuve. Ce qui n'est pas tranché par les documents doit être noté comme point à confirmer.`,
  },
  {
    position: 5,
    question: `À l'issue de la comparaison de deux assistants, un participant demande : « Lequel est le meilleur ? » Quelle réponse est la plus juste ?`,
    options: [
      `Celui qui a obtenu la note la plus élevée dans les classements publics.`,
      `Celui qui a donné la réponse la plus longue et la plus détaillée.`,
      `Cela dépend de la tâche et des contraintes données : données autorisées, compte disponible, besoin de citations, temps de vérification ; il n'y a pas de classement universel.`,
      `Celui dont l'abonnement est le plus cher, puisque les fonctions sont plus nombreuses.`,
    ],
    correct_index: 2,
    explanation: `Le choix d'un assistant se décide pour une tâche précise et dans un cadre précis : quelles données on a le droit de lui confier, quel compte la structure autorise, s'il faut des citations vérifiables, combien de temps on peut consacrer à la relecture. Un outil excellent pour un résumé peut être inadapté pour une recherche sourcée, et inversement. Les classements publics et le prix des abonnements évoluent vite et ne disent rien du contexte de l'agence. La grille de comparaison de la formation sert justement à fonder la décision sur des critères observés, pas sur une réputation.`,
  },
];

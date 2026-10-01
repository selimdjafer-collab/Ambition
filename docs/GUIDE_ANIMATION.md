# Guide d'animation court

Public : permanents d'ETTI d'abord (chargés d'insertion, conseillers en
insertion professionnelle, chargés de recrutement et de mise à disposition,
responsables d'agence, assistants administratifs et commerciaux), avec
ouverture aux ETT et EATT. Chaque atelier part d'une tâche réelle du quotidien
(compte rendu de suivi et point prescripteur, questions récurrentes sur une
mission, visite d'entreprise utilisatrice, parcours d'accueil IAE à expliquer,
support d'agence, courriel de préparation de mission) et affiche où part le
temps, ce qui est délégable et ce qui doit rester vérifié. Les faits métier
et outils utilisés sont datés dans `docs/SOURCES_2026.md`.

Parcours de 420 minutes hors pauses : séance 1 (210 min) et séance 2 (210 min),
le même jour ou sur deux dates. Les pauses et horaires sont gérés hors
application : ajouter une pause ne réduit jamais les 420 minutes.

## Avant la session

1. **Créer la session** (Sessions → Nouvelle session) à partir de la version
   publiée du programme. Le code à six caractères est généré.
2. **Préparer** : dates, modalité, lien de réunion existante si visio, effectif.
3. **Roster** : inviter par e-mail (approbation automatique à la connexion) ou
   importer un CSV `nom;email` ; les doublons sont ignorés. Les demandes
   spontanées (code saisi par un participant) restent « à approuver ».
4. **Outils autorisés** : cocher les outils réellement accessibles dans les
   structures des participants. Les solutions de secours restent disponibles.
5. **Binômes** : attribution manuelle ou aléatoire ; effectif impair → trio ou
   tâche individuelle.
6. Passer la session en « Préparée » (inscriptions possibles) puis « Ouverte »
   le jour J.
7. Préparer, pour l'atelier 3, un petit dossier de pages publiques capturées
   (URL, date de capture, contexte) en cas d'absence de connexion.

## Pendant la session (tableau de bord « Animer »)

- **Atelier en cours** : sélectionner l'atelier, « Ouvrir », le définir comme
  atelier en cours, choisir la phase (démonstration, production…) puis
  « Lancer N min ». Pause, reprise, +5 min, terminer : le serveur fait autorité,
  tous les écrans affichent la même échéance.
- **Mode présentation** (nouvel onglet, à projeter) : consigne, objectif,
  ressources, minuteur, déroulé, débrief. Aucun nom, aucune note.
- **Aides** : révéler progressivement indice → trame → exemple ; le corrigé
  seulement au débrief. Tant qu'il n'est pas révélé, il n'est pas accessible
  via l'API.
- **Groupe** : statuts calculés sur les actions réelles (non commencé, en cours,
  aide demandée, remis, à améliorer, validé). « Voir / évaluer » ouvre la
  production.
- **File d'aide** : « Je m'en occupe » puis « Résolu ». La demande d'aide prime
  sur les autres statuts dans la grille du groupe.
- **Débrief** : question libre, sondage à choix ou question de contrôle
  préchargée (la correction n'apparaît aux participants qu'à la clôture).
- **Exemples** : publier au groupe une production dont l'auteur a coché
  l'autorisation (copie, sans notes privées).

## Séquence par séquence

| # | Séquence | Durée | Repères |
| --- | --- | --- | --- |
| 1 | Accueil, diagnostic, tâche prioritaire | 20 | 8 min d'instructions, 12 min de positionnement actif dans l'application. |
| 2 | Défi « Que peut-on transmettre à une IA ? » | 20 | 8 cartes à trier ; rappeler que remplacer un nom n'anonymise pas. |
| 3 | Atelier 1 — Du suivi au plan d'action | 55 | Binôme pilote / vérificateur puis inversion. Transcription R1 fournie : ne pas simuler de transcription automatique. |
| 4 | Atelier 2 — Les documents répondent | 60 | R2 à R5 ; faire ouvrir chaque citation. R3 est l'ancienne version : piège volontaire. |
| 5 | Atelier 3 — Recherche vérifiée | 55 | Informations publiques seulement ; dossier de captures en secours ; production partielle acceptée. |
| 6 | Réactivation | 10 | Retour collectif 5 min, réflexion individuelle 5 min. |
| 7 | Atelier 4 — Parcours compréhensible | 40 | Six blocs éditables dans l'application si pas d'outil de schéma. |
| 8 | Atelier 5 — Support visuel inclusif | 45 | Pas de texte généré dans l'image ; droits d'usage examinés ; aucun label revendiqué. |
| 9 | Atelier 6 — Comparer deux assistants | 40 | Même prompt, même document ; résultat valable pour cette tâche seulement. |
| 10 | Défi individuel | 45 | Une variante par personne ; vérifier l'apport individuel. |
| 11 | Bilan et plan J+7 | 30 | Portfolio, 2–3 outils, un usage à essayer ; gains mesurés ≠ estimés. |

## Faire mesurer le temps sans promettre

Dans les ateliers 1 à 6, le défi données et le défi individuel, la production
comporte un bloc « Temps sur cette tâche » : temps habituel estimé, temps
observé pendant l'atelier (préparation, attente, lecture, vérification,
corrections), case « chronométré » et case « vérification incluse ». Le
rapport formateur en donne les médianes par atelier en séparant mesures et
estimations. Rappeler au groupe qu'une mesure sur un document fictif ne vaut
pas pour le poste : le plan J+7 prévoit de la refaire en situation.

## Évaluer

Grille sur 10 (cinq critères de 0 à 2). Suggestion modifiable : réussite à
partir de 7/10 avec au moins 1 sur « fidélité » et « données », après
correction de toute erreur critique. Une donnée réelle divulguée ou une
information déterminante inventée bloque la validation tant qu'elle n'est pas
corrigée. Le formateur décide ; l'application calcule la somme. Demander une
correction crée une nouvelle version chez le participant ; la précédente est
conservée.

## Après la session

- **Rapport** : participations, remises, demandes de reprise, acquis observés,
  export CSV. Ce n'est ni un émargement certifié ni une attestation de durée.
- **Portfolio** : chaque participant imprime le sien (PDF via le navigateur).
- **Clôturer** la session. Les durées de conservation choisies par l'organisme
  sont indiquées dans les paramètres ; la suppression des productions se fait
  depuis la revue d'une production (action contrôlée).

# Atelier IA — START EVOLUTION

Application web permettant à un formateur d'animer le **module 2** de la
formation pratique **« Créer sa boîte à outils IA pour agir au quotidien en
ETT / ETTI / EATT »** (7 h en deux séances de 3 h 30, hors pauses) pour 6 à
10 permanents d'agence d'intérim d'insertion. Les bases du prompt et de l'IA
sont acquises au module 1 : ici, chaque participant construit, teste et
déploie de vrais outils réutilisables pour son activité. Le formateur prépare
la session, suit le groupe en direct, aide les personnes bloquées, lit les
productions et les outils, les commente, les valide et récupère la boîte à
outils du groupe.

Référence éditoriale du contenu : septembre 2026. Vérifications documentaires
des fiches outils : 1er octobre 2026. Les dates de session sont des paramètres
distincts.

## Ce que contient la V1

- **Boîte à outils** : chaque atelier fournit un modèle d'outil de départ
  (instructions permanentes, message type avec emplacements, format de
  sortie, vérifications humaines, règles de données, secours) que le
  participant adapte, enregistre dans sa boîte, teste sur le cas fictif avec
  un banc d'essai (message prêt à coller, verdict, temps), versionne, marque
  « prêt à proposer » et exporte en markdown. Le formateur commente, valide
  et publie au groupe des copies autorisées par leurs auteurs.
- **Parcours de 420 minutes** en 11 séquences préchargées (accueil, défi
  données, six ateliers, réactivation, défi individuel, bilan), avec durées,
  répartitions, objectifs observables, briefs, étapes, livrables, grilles de
  réussite, trois niveaux d'aide, corrigés privés, questions de débrief et
  solutions de secours sans API d'IA.
- **Ancrage métier ETTI** : chaque séquence vise une tâche réelle d'un
  permanent d'agence d'intérim d'insertion (suivi de mission et point
  prescripteur, questions sur une mission, visite d'entreprise utilisatrice,
  parcours d'accueil IAE, support d'agence, courriel de préparation de
  mission), indique où part le temps, ce qui est délégable et ce qui reste à
  vérifier, et fait mesurer le temps observé sans promesse générale. Faits
  métier et outils datés dans `docs/SOURCES_2026.md`.
- **Cas fictif « Agence Horizon » (ETTI fictive)** : ressources R1 à R7, R9
  (fiche de liaison prescripteur) et R10 (lexique ETTI), consultables et
  téléchargeables, marquées « CAS FICTIF — FORMATION », plus un compte rendu
  imparfait réservé au formateur (R8).
- **Bibliothèque d'outils** éditable et versionnée (six familles, solutions de
  secours, état « à vérifier » tant qu'aucune date ni source n'est renseignée).
- **Espace formateur** : sessions (créer, dupliquer, préparer, ouvrir,
  suspendre, clôturer), roster avec import CSV et contrôle des doublons,
  positionnement, binômes manuels ou aléatoires, outils autorisés, tableau de
  bord en direct (atelier en cours, minuteur partagé, statuts calculés sur les
  actions réelles, file d'aide, sondages, quiz, mur d'idées, exemples
  partagés), revue et évaluation des productions (grille sur 10), mode
  présentation, éditeur de programme versionné, rapport et export CSV.
- **Espace participant** : accueil simple, atelier (consigne, étapes,
  ressources, constructeur de prompt, dépôt texte / fichier / lien, versions
  V1/V2, auto-vérification, aides progressives, demande d'aide, retours),
  portfolio imprimable, plan d'application à J+7, export de ses données.
- **Persistance Supabase** : PostgreSQL avec RLS, fonctions serveur (minuteur,
  remise, évaluation, versions), Storage privé, Realtime.
- **Mode démo** local et explicitement signalé (10 participants fictifs,
  5 binômes, états variés), sans serveur.

## Démarrage rapide

```bash
pnpm install          # ou npm install
cp .env.example .env  # renseigner VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
pnpm dev              # http://localhost:5173
```

Sans configuration Supabase, l'application démarre en **mode démo** (bandeau
jaune) : les données restent dans le navigateur et ne sont pas partagées.

Installation complète, variables et procédure du premier formateur :
[docs/INSTALLATION.md](docs/INSTALLATION.md) et
[docs/PREMIER_FORMATEUR.md](docs/PREMIER_FORMATEUR.md).

## Vérifications

```bash
pnpm typecheck                 # TypeScript strict
pnpm test                      # tests unitaires (420 min, minuteur, CSV, grille, contenus, seed)
pnpm build                     # build de production
pnpm seed:generate -- --check  # supabase/seed.sql à jour avec les contenus
scripts/db-test.sh             # migrations + seed + scénario d'acceptation RLS sur un PostgreSQL local
```

Le scénario de vérification à deux participants authentifiés et la
correspondance avec les douze parcours attendus sont décrits dans
[docs/VERIFICATION.md](docs/VERIFICATION.md).

## Documentation

- [docs/INSTALLATION.md](docs/INSTALLATION.md) — prérequis, Supabase, variables, déploiement, mode démo.
- [docs/PREMIER_FORMATEUR.md](docs/PREMIER_FORMATEUR.md) — procédure sûre de création du premier formateur.
- [docs/GUIDE_ANIMATION.md](docs/GUIDE_ANIMATION.md) — guide d'animation court, séquence par séquence.
- [docs/SECURITE_ET_DONNEES.md](docs/SECURITE_ET_DONNEES.md) — permissions, stockage, confidentialité, limites.
- [docs/VERIFICATION.md](docs/VERIFICATION.md) — scénarios de vérification et limites connues.
- [docs/SOURCES_2026.md](docs/SOURCES_2026.md) — faits métier ETTI et outils vérifiés au 01/10/2026, avec sources.

## Structure

```
src/content/      contenus pédagogiques (source de vérité du seed)
src/lib/backend/  interface commune, implémentation Supabase, implémentation démo
src/pages/        espaces formateur, participant et pages partagées
supabase/         migrations, seed généré, tests d'acceptation SQL
scripts/          générateur de seed, runner de tests base de données
docs/             documentation
```

## Ce qui n'est pas dans la V1

Connecteurs API d'IA, transcription intégrée, visioconférence, SSO, badges,
rappels automatiques, facturation. Aucune donnée réelle de candidat ne doit
être déposée : la V1 fonctionne exclusivement avec le cas fictif.

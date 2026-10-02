# Sécurité, confidentialité et données

## Authentification et rôles

- Authentification Supabase (e-mail + mot de passe). Le code de session oriente
  la demande mais n'ouvre jamais seul l'accès : il faut une identité
  authentifiée **et** une invitation nominative (e-mail) ou une approbation du
  formateur (`request_join`).
- Tout nouveau compte est « participant » (trigger `handle_new_user`). Le rôle
  formateur est attribué par `bootstrap_trainer` (rôle service uniquement) ou
  `set_user_role` (formateur authentifié). Un trigger bloque toute modification
  de rôle par les rôles clients.

## Permissions serveur (RLS)

- Le formateur n'accède qu'aux sessions qu'il anime (`is_session_trainer`).
- Le participant n'accède qu'à ses sessions approuvées, ses productions et
  celles de son binôme (`is_team_member`), ses demandes d'aide, ses réponses.
- Les exemples partagés sont des copies explicites (`shared_examples`) créées
  par le formateur avec l'accord de l'auteur (`share_consent`).
- Contenus protégés séparément : corrigés et aides (`session_workshop_private`,
  servis via `get_revealed_hints` selon le niveau révélé), notes privées
  d'évaluation (`evaluation_notes`), clés des quiz (`poll_keys`, lisibles après
  clôture), ressource R8 (`trainer_only`), modèles de programme et journal
  (formateurs uniquement).
- Changer un identifiant de session, de production, de fichier ou de corrigé
  ne donne aucun accès : vérifié par `supabase/tests/acceptance.sql`.
- Les participants ne peuvent pas modifier statut, version, propriétaire ou
  note d'une production, ni le minuteur, ni leur inscription (triggers de garde
  + RLS). Les remises, évaluations, publications et versions passent par des
  fonctions serveur `security definer` qui vérifient les droits.

## Boîte à outils

Les outils construits (`toolbox_items`) suivent les mêmes règles que les
productions : lecture par l'auteur, son binôme et le formateur de la session ;
un participant ne peut ni se valider ni modifier le commentaire du formateur
(trigger de garde) ; toute modification d'un outil validé le repasse en
« testé ». Le partage au groupe est une copie (`toolbox_shared`) créée par le
formateur avec l'accord explicite de l'auteur, sans ses tests ni commentaires.
Une validation est un avis de formation sur le cas fictif, jamais une
autorisation d'usage sur des données réelles.

## Stockage

- Bucket privé `submissions`, chemin `{session}/{production}/{fichier}` ;
  lecture limitée à l'auteur, son binôme et le formateur de la session ; dépôt
  limité aux auteurs d'une production non validée ; liens signés de 10 minutes
  créés après vérification des droits.
- Formats acceptés contrôlés côté client (extension, type MIME, 10 Mo) et côté
  bucket (`allowed_mime_types`, `file_size_limit`).
- Bucket privé `branding` pour le logo (lecture par les personnes connectées).
- Un lien externe saisi par un participant est affiché comme lien sûr
  (`https` / `http`, `rel="noopener noreferrer nofollow"`) ; son contenu n'est
  jamais récupéré. Le texte importé est traité comme non fiable (aucun rendu
  HTML du contenu des participants ; le mini-rendu markdown n'est utilisé que
  pour les contenus rédigés par l'organisme et échappe le HTML).

## Temps réel

Les abonnements `postgres_changes` sont filtrés par les mêmes politiques RLS.
Un rafraîchissement de secours (45 s, retour au premier plan, reconnexion)
couvre les événements perdus. L'état de sauvegarde est sincère : « en
attente », « enregistré », « erreur » ou « hors ligne : non enregistré ».

## Minimisation des données

Données des apprenants : nom affiché, e-mail de connexion, appartenance au
groupe, positionnement, productions et retours. Le cas métier est entièrement
fictif et séparé. Le journal `session_events` ne contient que des identifiants
et des statuts, jamais le contenu des productions ni les notes privées.

## Ce que l'application ne fait pas

- Aucune donnée réelle de candidat ne doit être déposée : consigne affichée
  avant tout dépôt, confirmation obligatoire à la remise. Il n'y a **pas** de
  détecteur fiable de données sensibles et aucun badge « RGPD conforme ».
- Aucun classement de candidats, scoring, décision de recrutement ou analyse
  d'émotions. Les évaluations portent sur des réalisations pédagogiques et sont
  décidées par le formateur.
- Les durées de conservation sont des choix de l'organisme, saisis dans les
  paramètres ; la V1 n'exécute aucune purge automatique.
- Un usage futur avec des données réelles suppose une configuration validée
  par l'organisme, les contrats et les personnes compétentes.

## À documenter par l'organisme

Dans « Paramètres » : hébergeur et région du projet Supabase, prestataires,
éventuels transferts, réglages retenus. L'absence d'utilisation pour entraîner
un modèle n'est pas synonyme d'absence de traitement de données.

## Secrets

Seule la clé publique Supabase est exposée au client. Aucune clé de service,
aucune clé d'API d'IA. Les fonctions serveur `security definer` fixent
`search_path = public`.

# Vérification

## Vérifications automatisées exécutées

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Typage strict | `pnpm typecheck` | 0 erreur |
| Tests unitaires (420 min, répartitions, 329 min participants, minuteur, CSV anti-injection, grille, contenus, seed à jour) | `pnpm test` | 21 tests, 6 fichiers |
| Build de production | `pnpm build` | ok |
| Migrations + seed + scénario d'acceptation RLS/RPC | `scripts/db-test.sh` (PostgreSQL 16 local avec shim Supabase) | « ACCEPTATION OK », 79 assertions |
| Parcours navigateur en mode démo (Playwright, deux onglets : formateur et participant) | script de session, non commité | 27/27 |

Le scénario SQL `supabase/tests/acceptance.sql` est rejouable : il crée cinq
comptes (deux formateurs, trois participants), une session, un binôme, des
remises, des évaluations, des demandes d'aide, un fichier, un quiz, un exemple
partagé, une nouvelle version du programme et une duplication, et vérifie à
chaque étape ce qui est permis et refusé.

## Correspondance avec les douze parcours attendus

| # | Parcours | Où c'est vérifié |
| --- | --- | --- |
| 1 | Un formateur crée une session et seuls les membres approuvés la rejoignent | SQL : A en attente ne voit rien, B invité est approuvé, C non approuvé ne voit rien, un autre formateur ne voit rien ; navigateur : liste et approbation |
| 2 | Une consigne ouverte apparaît chez les participants ; le minuteur reste cohérent après rechargement | SQL : échéance identique lue par A ; navigateur : rechargement du participant après lancement (15:00 / 14:59) |
| 3 | Dépôt, retour, V2, V1 conservée | SQL et navigateur |
| 4 | Demande d'aide reçue et traitée | SQL et navigateur (3 → 2 demandes) |
| 5 | Un binôme partage sa production sans exposer les autres | SQL : B lit, C ne lit pas ; `updated_by` pour la détection de conflit |
| 6 | Accès refusé à une autre session, un fichier privé, un corrigé fermé | SQL : identifiants connus, 0 ligne ; dépôt sur chemin étranger refusé |
| 7 | Le participant ne peut pas changer son rôle, sa note ou le minuteur | SQL : trigger de rôle, statut de production, évaluation, `timer_control`, mise à jour directe sans effet |
| 8 | Une nouvelle version du programme laisse la session intacte | SQL et navigateur |
| 9 | Parcours utilisable sans API d'IA et avec les secours | Aucun appel d'API dans le code ; solutions de secours dans chaque fiche ; six blocs éditables ; comparaison d'exemples |
| 10 | Portfolio lisible sans notes privées d'autrui | Navigateur : la note privée saisie par le formateur n'apparaît pas |
| 11 | 11 séquences = 420 min hors pauses | Test unitaire, seed, SQL (`sum(duration_min)`), publication refusée si répartition incohérente |
| 12 | Dates fictives distinctes des dates de session | Test unitaire (septembre 2026) et SQL (session au 15/10/2026) |

## Scénario manuel à deux participants authentifiés (Supabase réel)

Prérequis : projet Supabase configuré, premier formateur activé, trois comptes
(formateur F, participants P1 et P2), deux navigateurs ou fenêtres privées.

1. F crée une session, l'ouvre aux inscriptions (« Préparée »), invite P1 par
   e-mail. P1 se connecte, saisit le code : « inscrit ». P2 saisit le code :
   « demande envoyée ». F approuve P2 dans Préparer → Participants.
2. F forme le binôme P1 + P2, ouvre la session, ouvre l'atelier 1, le définit
   comme atelier en cours, lance la phase « Production » (32 min).
3. P1 et P2 ouvrent l'atelier 1 : même consigne, même minuteur. P1 recharge :
   l'échéance ne bouge pas.
4. P1 écrit dans la production ; « Enregistré » apparaît. P2, sur la même page,
   voit l'avertissement « P1 a enregistré une modification » et choisit de
   charger sa version.
5. P2 coche « aucune donnée réelle », remet V1. F voit « Remis · V1 », ouvre
   la production, évalue « demander une correction » avec un retour public et
   une note privée.
6. P1 voit le retour public, ne voit pas la note privée, remet V2. F voit deux
   versions, valide V2.
7. P2 demande de l'aide ; F la prend en charge puis la résout.
8. F révèle l'indice puis la trame ; P1 voit les aides apparaître sans recharger.
   F révèle le corrigé : P1 le voit ; avant cela, l'URL de l'API
   `session_workshop_private` renvoyait 0 ligne.
9. P1 coche l'autorisation de partage ; F publie l'exemple ; P2 le voit et
   laisse une appréciation si l'option est activée.
10. P1 imprime son portfolio ; F exporte le CSV et le rapport.
11. F crée un brouillon de programme, modifie un titre, publie : la session
    ouverte conserve ses consignes.
12. Dans un troisième navigateur, un compte non inscrit tente l'URL de la
    session : « Session introuvable ou accès refusé ».

## Limites connues

- Les migrations ont été exécutées sur PostgreSQL 16 avec un shim des objets
  Supabase (`auth.uid()`, `storage.objects`, rôles). Elles n'ont pas été
  exécutées contre un projet Supabase hébergé dans cet environnement : la
  configuration réelle (projet, clés) reste à fournir. Le mode démo permet
  d'essayer l'interface sans serveur, sans synchronisation entre machines.
- Le temps réel Supabase n'a pas pu être testé ici (pas de projet) ; le
  rafraîchissement de secours couvre les pertes d'événements.
- Les exports PDF (portfolio, rapport, six blocs) passent par l'impression du
  navigateur, ce qui est indiqué à l'écran.
- Les durées de conservation sont renseignées mais aucune purge automatique
  n'est exécutée en V1.
- Le rendu de la page d'atelier est long sur mobile : la V1 vise le poste de
  travail pour la formation, la tablette et le téléphone pour la consultation
  et la demande d'aide.
- Le bundle JavaScript n'est pas découpé (environ 910 ko avant compression,
  257 ko compressé).

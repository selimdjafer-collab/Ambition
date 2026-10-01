# Créer le premier formateur

Un compte créé dans l'application est toujours « participant ». Un participant
ne peut pas s'attribuer le rôle formateur (trigger `protect_profile_role` et
politiques RLS). Le premier formateur est donc activé par l'organisme, côté
serveur, en deux étapes.

## 1. La personne crée son compte

Dans l'application, onglet « Créer un compte », avec l'e-mail professionnel qui
servira de référence. Si la confirmation d'e-mail est activée, la confirmer.

## 2. L'organisme active le rôle dans la base

Dans Supabase → SQL Editor (exécuté avec le rôle service, hors de portée des
clients) :

```sql
select public.bootstrap_trainer('prenom.nom@organisme.fr');
```

La fonction renvoie « Formateur activé : … ». Elle n'est **pas** exécutable par
les rôles `anon` et `authenticated` (révocation explicite dans
`0002_functions.sql`), donc inaccessible via l'API.

Si l'e-mail n'a pas encore de compte, la fonction le signale : la personne doit
d'abord s'inscrire.

## 3. Nommer d'autres formateurs

Une fois connecté, un formateur peut nommer d'autres formateurs depuis
« Paramètres → Formateurs » (la personne doit déjà avoir créé son compte). La
fonction serveur `set_user_role` vérifie que l'appelant est formateur.

## Rétrograder

Même écran, rôle « Participant », ou en SQL :

```sql
select public.set_user_role('prenom.nom@organisme.fr', 'participant');
```

(exécutée en tant que formateur) ou directement
`update public.profiles set role = 'participant' where email = '…'` dans
l'éditeur SQL.

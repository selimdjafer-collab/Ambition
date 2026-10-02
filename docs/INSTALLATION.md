# Installation

## Prérequis

- Node.js 22 ou plus récent, pnpm (recommandé) ou npm.
- Un projet Supabase (hébergé) ou la CLI Supabase pour un environnement local.
- Aucun secret ne doit être commité : `.env` est ignoré par git.

## 1. Dépendances

```bash
pnpm install
```

## 2. Base de données Supabase

### Projet hébergé

1. Créer un projet sur supabase.com (choisir la région adaptée à l'organisme ;
   la noter dans les paramètres « Hébergement » de l'application).
2. Appliquer les migrations dans l'ordre, dans l'éditeur SQL ou avec la CLI :
   - `supabase/migrations/0001_schema.sql`
   - `supabase/migrations/0002_functions.sql`
   - `supabase/migrations/0003_policies.sql`
   - `supabase/migrations/0004_storage_realtime.sql`
   - `supabase/migrations/0005_toolbox.sql` (boîte à outils des participants)
3. Appliquer le seed pédagogique `supabase/seed.sql` (idempotent : il peut être
   rejoué ; les fiches outils déjà modifiées par un formateur ne sont pas
   écrasées).
4. Authentication → Providers → Email : laisser l'inscription par e-mail et mot
   de passe activée. La confirmation d'e-mail est recommandée en production.
5. Authentication → URL configuration : renseigner l'URL du site déployé.

Avec la CLI (`supabase link` puis `supabase db push` et
`supabase db execute -f supabase/seed.sql`), les mêmes fichiers sont utilisés.

### Environnement local

```bash
supabase start      # utilise supabase/config.toml
supabase db reset   # migrations + seed.sql
```

## 3. Variables d'environnement

Copier `.env.example` en `.env` :

| Variable | Rôle |
| --- | --- |
| `VITE_SUPABASE_URL` | URL du projet (Project settings → API). |
| `VITE_SUPABASE_ANON_KEY` | Clé publique (anon / publishable). **Jamais** la clé `service_role` côté client. |
| `VITE_DEMO_MODE` | `true` pour forcer le mode démo local même si Supabase est configuré. |

Si `VITE_SUPABASE_URL` est vide, l'application démarre en mode démo et
l'indique clairement.

## 4. Premier formateur

Voir [PREMIER_FORMATEUR.md](PREMIER_FORMATEUR.md). Sans cette étape, tous les
comptes sont « participant » et personne ne peut créer de session.

## 5. Lancer

```bash
pnpm dev       # développement
pnpm build     # production → dist/
pnpm preview   # prévisualisation du build
```

`dist/` est une application statique : elle se déploie sur n'importe quel
hébergeur de fichiers statiques (avec réécriture des routes vers `index.html`).

## 6. Mettre à jour les contenus initiaux

Les contenus (`src/content/*.ts`) sont la source de vérité. Après modification :

```bash
pnpm seed:generate   # régénère supabase/seed.sql
pnpm test            # vérifie 420 minutes, cohérence des répartitions, seed à jour
```

Pour une base existante, préférez l'éditeur de programme dans l'application
(brouillon → publication) : les sessions déjà créées conservent leur instantané.

## Mode démo

- Comptes : « Formatrice démo » et dix participants fictifs, mot de passe `demo`,
  code de session `DEMO26`.
- Les données vivent dans `localStorage` du navigateur ; deux onglets du même
  navigateur se synchronisent (événement `storage`), ce qui permet de jouer le
  formateur et un participant côte à côte. Deux machines ne se synchronisent
  pas : aucune promesse n'est faite en ce sens.
- « Réinitialiser la démo » sur l'écran de connexion remet les données à zéro.
- Les données de démo ne sont jamais écrites dans Supabase.

# Audit d'architecture — Login enseignants et accès membres

**Date** : 21 juin 2026
**Périmètre** : audit seul, aucune modification de code, aucune dépendance ajoutée.

---

## 1. État actuel du projet

- **Stack** : Next.js 16.2.6 (App Router), React 19, Tailwind 4. Aucune dépendance d'auth, de base de données ou de session (`package.json` ne contient que `next`, `react`, `react-dom` + tooling).
- **Pas de `middleware.ts`**, pas de notion de session/cookie/JWT dans le code (`auth`, `login`, `session`, `password` n'apparaissent dans aucun fichier `app/`, `lib/`, `content/` — seules occurrences sont le mot anglais "Auteur"/"author" dans du contenu pédagogique, sans rapport).
- **Déploiement** : Vercel, auto-déployé depuis `main`, build 100% statique/SSG, **aucune variable d'environnement requise** (`docs/deploiement-vercel.md`). Pas de base de données provisionnée.
- **Espace enseignants** (`app/enseignants/*`) : pages publiques, aucune protection. Contient :
  - `app/enseignants/page.tsx` — portail enseignant (liens vers matières, outils).
  - `app/enseignants/emploi-du-temps/page.tsx` — outil de planification.
  - `app/enseignants/programmation/*` — répartition de compétences par période.
  - Ces outils sont des pages publiques sans persistance applicative détectée à ce stade (pas de `localStorage` trouvé dans le code actuel — probablement de l'état React local non persistant, ou en cours de construction).
- **Ressources téléchargeables** : des PDF sont servis statiquement depuis `public/fiches/...` (ex. `public/fiches/cm2/francais-pdf/...`). **Tout PDF présent dans `public/` est accessible sans aucune restriction dès que son URL est connue** — Next.js sert `public/` sans contrôle d'accès, peu importe le statut affiché par `PublicStatusBadge`. Le système `public-status` (cf. `AGENTS.md`) contrôle uniquement l'affichage du lien, pas l'accès réel au fichier.
- **Aucune trace d'élève nominatif** : `app/eleves/*` et `app/personnages/eleves` sont des pages de personnages fictifs (univers pédagogique), pas des comptes réels.
- **Sécurité actuelle** : `next.config.ts` définit des en-têtes (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) — bonne hygiène de base, mais aucun mécanisme d'autorisation.

**Conclusion** : le projet est aujourd'hui 100% public, sans backend, sans état serveur, sans donnée personnelle collectée. C'est un point de départ propre pour introduire des rôles, sans dette à défaire.

---

## 2. Besoins fonctionnels

1. Garder les pages de présentation et de découverte pédagogique entièrement publiques (SEO, partage, confiance avant inscription).
2. Réserver le téléchargement complet de certaines ressources PDF aux utilisateurs identifiés (enseignants au minimum).
3. Permettre aux enseignants d'utiliser des outils (emploi du temps, programmation) sans compte en V1, avec option de synchronisation cloud plus tard.
4. Préparer un espace membre / accès premium éventuel (V3), sans le construire maintenant.
5. Ne jamais collecter de données d'élèves mineurs nominatives.
6. Garder une administration simple pour la gestion de contenu (pas de élève, pas de classe, pas de note — juste du contenu pédagogique).

---

## 3. Rôles proposés

| Rôle | Description | Statut |
|---|---|---|
| **Visiteur** | Aucun compte. Accès à tout le contenu public. | Existe déjà implicitement. |
| **Membre** | Compte facultatif, sans lien enseignant/élève. Pourrait débloquer un accès premium futur (V3). | À construire en V3. |
| **Enseignant** | Compte facultatif (V2), permet la synchronisation cloud des outils (emploi du temps, programmation) et l'accès aux téléchargements complets. | À construire en V2. |
| **Administrateur** | Gestion de contenu, modération, publication. Compte unique ou restreint à quelques personnes de confiance (toi-même). | À construire en V2/V3 selon besoin réel. |
| **Élève** | **Non prévu.** Aucun compte, aucune donnée nominative, aucune fonctionnalité de suivi par élève. | Explicitement exclu. |

Le rôle "élève" n'est pas un simple "pas encore implémenté" — c'est une décision de conformité : tant qu'aucun compte élève n'existe, le RGPD et les obligations liées aux mineurs (consentement parental, droit à l'effacement, minimisation) ne s'appliquent pas au produit. Introduire ce rôle plus tard impliquerait un chantier de conformité à part entière (mentions légales, DPA, consentement parental vérifiable) — à traiter séparément, pas comme une extension naturelle des rôles enseignant/membre.

---

## 4. Routes publiques / réservées

### Restent publiques (aucun changement)
- Toutes les pages de présentation par niveau : `/maternelle`, `/primaire/*`, `/college`, `/lycee`.
- Pages "matières", "domaines", "sous-domaines" (catalogues de leçons).
- Extraits de ressources (statut affiché, descriptions, aperçus).
- `/univers/*`, `/personnages/*`, `/professeurs/*` (univers narratif).
- Pages informatives (`/methode`, `/programmes`, `/parcours`, etc.).
- `/enseignants` en tant que portail de présentation (rester accessible pour donner confiance avant inscription).

### Doivent devenir réservées (selon le rôle)
- **Téléchargement complet de PDF** (`href` vers `public/fiches/.../*.pdf`) — réservé aux enseignants connectés (V2). Avant V2, ces PDF restent accessibles sans contrôle réel : c'est un risque déjà présent aujourd'hui (cf. section Risques).
- **Synchronisation cloud des outils enseignants** (emploi du temps, programmation) — réservé aux enseignants ayant créé un compte (V2). L'usage local sans compte reste possible et gratuit (V1, principe obligatoire).
- **Sauvegardes cloud** — réservé enseignant connecté (V2).
- **Gestion de contenus** (CMS futur, édition de fiches) — réservé administrateur (V2/V3).
- **Administration** (rôles, modération, statistiques) — réservé administrateur uniquement.
- **Accès premium éventuel** (contenu membre) — réservé rôle membre (V3, non défini précisément à ce stade).

---

## 5. Architecture recommandée (V1 → V3)

### V1 — actuel, sans backend
- Outils enseignants en `localStorage` (ou `IndexedDB` si volume), zéro compte, zéro réseau.
- Aucune dépendance d'auth à ajouter. Aucun risque de donnée puisque rien ne quitte le navigateur.
- Action : si pas déjà fait, vérifier que `emploi-du-temps` et `programmation` persistent réellement en `localStorage` (à ce stade le code lu ne montre pas de persistance — possible perte d'état au rafraîchissement, à creuser indépendamment de ce prompt).

### V2 — compte enseignant facultatif
- Ajout d'une solution d'auth (recommandation en section 6) avec **un seul rôle géré côté serveur au départ : `teacher`**.
- Le compte sert à :
  - synchroniser `emploi-du-temps` / `programmation` entre appareils ;
  - débloquer le téléchargement complet des PDF.
- Pas de notion de "classe" ni d'élève — uniquement l'enseignant et son propre contenu.
- Protection des routes : un `middleware.ts` Next.js qui vérifie la session sur les routes sensibles (`/api/teacher/*`, futures routes de téléchargement signé) — pas sur les pages de contenu public.
- Stockage : une base de données minimale (utilisateur enseignant + ses données de sync). Pas de stockage de données d'élèves.

### V3 — espace membre / premium (optionnel, non engagé)
- Ajout du rôle `member`, indépendant du rôle `teacher`.
- Décision de contenu premium à définir plus tard (pas dans ce prompt).
- Réutilise la même solution d'auth que V2 (pas de second système).

### Administration
- Rôle `admin` : attribué manuellement (pas d'auto-inscription), un ou deux comptes maximum.
- Sert à la gestion de contenu et à la modération, pas à la gestion d'élèves.

---

## 6. Comparaison des solutions d'authentification

| Critère | Supabase Auth | Clerk | Auth.js (NextAuth) + DB adaptée |
|---|---|---|---|
| **Simplicité de mise en place** | Moyenne — nécessite de monter un projet Supabase (Postgres géré) même si on n'utilise que l'auth. | Élevée — SDK clé en main, UI prête (`<SignIn />`), peu de code. | Moyenne — flexible mais demande de choisir/configurer un adapter (Postgres, SQLite, etc.) et de gérer le schéma soi-même. |
| **Coût de départ** | Gratuit jusqu'à un quota généreux (50k MAU sur le plan gratuit), mais implique une base Postgres dédiée. | Gratuit jusqu'à 10k MAU, au-delà payant assez vite si croissance. | Gratuit (librairie open-source), coût = uniquement l'hébergement de la base de données choisie (ex. Postgres via Vercel/Neon/Supabase, ou SQLite via Turso). |
| **Gestion des rôles** | Rôles via `auth.users` + tables custom (RLS Postgres) — puissant mais demande de modéliser soi-même `teacher` / `admin` / `member`. | Rôles via "metadata" utilisateur + "Organizations" (payant au-delà d'un usage basique) — pratique mais moins flexible si on ne veut pas du modèle "organisation". | Rôles entièrement custom (champ `role` dans la table `User`) — le plus simple à faire correspondre exactement aux 3-4 rôles définis ici. |
| **Compatibilité Vercel** | Bonne — fournisseur tiers, fonctionne avec App Router, mais ajoute une dépendance externe (Postgres hébergé chez Supabase, pas chez Vercel). | Excellente — conçu pour Next.js / Vercel, middleware dédié (`clerkMiddleware`). | Excellente — bibliothèque officiellement maintenue pour Next.js App Router, middleware natif. |
| **Protection des routes** | Via `middleware.ts` + vérification de session côté serveur (SSR helpers fournis). | Très simple — `clerkMiddleware` avec `auth.protect()` par route, peu de code. | Via `middleware.ts` + `auth()` côté serveur (App Router) — pattern standard, bien documenté. |
| **Sécurité** | Bonne, mature, beaucoup d'adoption ; RLS Postgres ajoute une couche de sécurité au niveau données si bien configurée (mais complexité supplémentaire). | Bonne, service géré par une entreprise spécialisée auth, peu de surface d'attaque côté code custom. | Bonne si bien configuré ; la responsabilité de sécuriser les sessions/tokens repose davantage sur l'intégrateur (mais la librairie est éprouvée et largement utilisée). |
| **Maintenance** | Nécessite de maintenir un projet Supabase en plus du code (migrations, RLS). | Faible — SaaS géré, peu de maintenance côté code. | Faible à moyenne — librairie stable, mais le schéma de base de données est à la charge du projet. |
| **Synchronisation future (V2/V3)** | Très adapté si on veut aussi stocker les données enseignants dans la même base Postgres (auth + data au même endroit). | Moins naturel pour stocker des données métier (Clerk ne gère que l'identité) — il faudrait une base séparée de toute façon. | Adapté nativement : la même base de données sert à l'auth et aux données enseignants (emploi du temps, programmation), un seul système à maintenir. |
| **Conformité / minimisation des données** | Bonne si configuré pour ne stocker que l'email et le rôle — éviter d'utiliser les fonctionnalités sociales/profil étendues. | Bonne par défaut, mais Clerk stocke les données utilisateur sur son infrastructure (US par défaut, options EU payantes) — point à vérifier pour un public scolaire français/européen. | Excellente — on contrôle exactement où vivent les données (hébergeur européen possible), aucune dépendance à un tiers pour l'identité elle-même. |

### Recommandation

**Auth.js (NextAuth v5) avec une base de données Postgres légère** (ex. Vercel Postgres ou Neon, hébergement européen disponible) est la solution recommandée pour ce projet, pour trois raisons :

1. **Un seul système pour l'identité et les données métier** (sync emploi du temps/programmation), ce qui évite de payer/maintenir deux services pour un produit à très faible volume (quelques enseignants, pas de viralité attendue).
2. **Contrôle total de la localisation des données** — important pour un site destiné à un public scolaire français, même sans données d'élèves.
3. **Coût nul tant que le volume reste faible**, et migration vers un hébergeur plus robuste possible sans changer de librairie d'auth.

**Alternative valable** : Clerk, si la priorité est la vitesse de mise en œuvre et que la question de la résidence des données (US par défaut) est acceptée ou résolue via leur option EU. Moins recommandé ici car il ajoute un service externe pour gérer seulement 1 à 2 rôles simples, et il faudra une base de données séparée pour les données métier de toute façon.

**Supabase Auth** n'est pas recommandé en l'absence d'un besoin déjà identifié pour Postgres + RLS — ce serait ajouter de la complexité (apprentissage RLS, gestion d'un second projet) pour un besoin (3-4 rôles, pas de relations complexes) qui ne le justifie pas.

---

## 7. Risques

- **Risque actuel, indépendant de toute décision d'auth** : les PDF dans `public/` sont déjà accessibles à quiconque devine ou trouve l'URL, indépendamment du statut affiché par `PublicStatusBadge`. Ce n'est pas un risque introduit par ce prompt — c'est une limite déjà présente. Si l'objectif est de vraiment restreindre le téléchargement en V2, il faudra **déplacer les PDF hors de `public/`** et les servir via une route API protégée (vérification de session + flux de fichier), pas seulement masquer le lien dans l'UI.
- **Risque de dérive de périmètre** : commencer par "compte enseignant" et glisser vers "compte élève" ou "suivi nominatif" sans cadrage RGPD explicite (consentement parental, base légale, DPO si besoin). Le présent audit fixe la limite : **aucun compte élève dans ces phases**.
- **Risque de sur-ingénierie** : ajouter un système d'auth complet maintenant (V1) alors qu'aucun enseignant ne l'a demandé pour synchroniser quoi que ce soit. Recommandation : ne construire l'auth qu'au moment où la synchronisation devient un besoin réel exprimé.
- **Risque de verrouillage fournisseur** : choisir une solution propriétaire (ex. Clerk) qui rend une migration future plus coûteuse si le produit évolue vers un modèle nécessitant plus de contrôle (ex. établissement scolaire, conformité renforcée).
- **Risque de confusion statut pédagogique / accès réel** : le système `public-status` (gouverné par `AGENTS.md`) indique si une ressource est *prête*, pas si elle est *accessible*. Ces deux notions devront rester strictement séparées dans le futur système de permissions, pour ne pas réintroduire de logique de statut ad hoc dans l'UI (violerait les règles de gouvernance déjà en place).

---

## 8. Plan de migration en étapes

1. **V1 (actuel → court terme)** : s'assurer que les outils enseignants (`emploi-du-temps`, `programmation`) persistent réellement en `localStorage` côté navigateur. Aucun compte, aucune dépendance.
2. **Déclencheur V2** : dès qu'un besoin réel de synchronisation multi-appareil est exprimé (pas avant) :
   - Ajouter Auth.js + base de données Postgres légère.
   - Un seul rôle serveur : `teacher`. Email + mot de passe ou lien magique — pas de réseaux sociaux nécessaires pour un public enseignant.
   - Migrer les PDF "réservés" hors de `public/` vers une route protégée si le besoin de restriction réelle (pas juste UI) est confirmé.
   - Ajouter `middleware.ts` pour protéger uniquement les routes `/api/teacher/*` et équivalents — ne jamais ajouter de protection sur les pages de contenu public existantes.
3. **Déclencheur V3** : si un modèle "membre premium" est validé business :
   - Ajouter le rôle `member` dans le même système d'auth.
   - Définir séparément ce que "premium" signifie (hors périmètre de cet audit).
4. **Administrateur** : à activer dès V2, en attribuant manuellement le rôle `admin` à 1-2 comptes — pas d'auto-inscription admin.
5. **À aucun moment** : introduction d'un rôle ou d'un compte élève. Si un jour ce besoin apparaît, il doit déclencher un audit RGPD dédié (consentement parental, minimisation, durée de conservation, droit à l'effacement) avant toute implémentation — pas une simple extension du système enseignant.

---

## 9. Ce qui doit rester local

- Les données des outils enseignants en V1 (emploi du temps, progression annuelle) : `localStorage`/`IndexedDB`, jamais envoyées à un serveur tant qu'aucun compte n'existe.
- Toute préférence d'affichage ou de navigation (thème, filtres) — aucune raison de centraliser ça côté serveur.

## 10. Ce qui pourra être synchronisé plus tard

- Emploi du temps et programmation (V2), une fois un compte enseignant créé volontairement.
- Sauvegardes de configuration enseignant (V2).
- Éventuel contenu premium membre (V3, à définir).

## 11. Confirmation — aucune donnée élève

Ce projet, dans son état actuel et dans les phases V1/V2/V3 décrites ici, **ne collecte, ne stocke et ne traite aucune donnée nominative d'élève**. Les pages `app/eleves/*` et `app/personnages/eleves` relèvent de l'univers narratif pédagogique (personnages fictifs), pas de comptes réels. Aucune fonctionnalité de ce plan n'introduit de compte, profil, progrès ou identifiant lié à un élève mineur. Toute évolution future dans cette direction nécessiterait un cadrage RGPD spécifique, distinct de ce qui est proposé ici.

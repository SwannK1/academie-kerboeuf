<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:public-status-governance -->
# Statuts publics — règles de gouvernance

Architecture en 3 couches. Ne pas contourner.

```
content/public-status.domain.ts   ← domaine pur (normalization, mapping interne)
content/public-status.ui.ts       ← labels, ariaLabels, classNames (1 seul endroit)
content/public-status.ts          ← façade front (seul point d'entrée autorisé)
components/academy/PublicStatusBadge.tsx  ← badge officiel (seul composant autorisé)
```

## Règles impératives

1. **Imports** : aucun import de `public-status.domain` ou `public-status.ui` depuis `app/` ou `components/`. Seule la façade `@/content/public-status` est autorisée.

2. **Comparaisons** : ne pas comparer un statut brut en string dans un composant ou une page (`status === "disponible"` est interdit côté UI). Utiliser `getPublicStatusKey(status)`.

3. **Accès interne** : ne pas lire `.key` directement sur un objet `PublicStatus` dans l'UI. Utiliser `getPublicStatusKey(status)` via la façade.

4. **Nouveaux statuts** : tout ajout doit être fait dans `internalStatusMap` (domain) ET dans `publicStatusUi` (ui). Le `satisfies` TypeScript enforce la cohérence — si le build passe, la couverture est complète.

5. **Labels visibles** : les labels français ("Disponible", "À venir", "En construction") sont dans `public-status.ui.ts` uniquement. Aucun label de statut hardcodé dans les composants.

6. **`getPublicStatusVariant()`** est déprécié. Utiliser `getPublicStatusKey()` pour toute logique de filtrage ou de comparaison.

7. **Sanitization** : utiliser `sanitizePublicPedagogicalItems()` pour filtrer les chaînes `"à vérifier"` dans les tableaux de curriculum. Ne pas re-implémenter le filtre localement.

## Garde-fou anti-régression

Dans `app/` et `components/`, ne jamais comparer directement des statuts bruts comme `"disponible"`, `"bientôt"`, `"available"`, `"upcoming"` ou `"in-progress"`. Toute logique conditionnelle doit passer par `getPublicStatusKey(status)`, tout affichage doit passer par `PublicStatusBadge`, et tout catalogue client typé `PublicStatus` doit recevoir un statut normalisé avec `getPublicStatus(status)`.

Dans `content/`, les comparaisons de statuts bruts sont tolérées uniquement lorsqu'elles restent dans la couche données/adaptation.

Exemple interdit côté UI :

```tsx
const availableMissions = missions.filter(
  (mission) => mission.status === "disponible",
);
```

Exemple correct côté UI :

```tsx
const availableMissions = missions.filter(
  (mission) => getPublicStatusKey(mission.status) === "available",
);
```
<!-- END:public-status-governance -->

<!-- BEGIN:cp-pdf-resource-portal -->
# Standard catalogue CP / CE1 / CE2 — portail de ressources PDF

Les pages catalogue CP, CE1 et CE2 utilisent la route générique canonique :

```
/primaire/[level]/programmes/[domain]/[subdomain]
```

Le registre source des pages publiées est :

```
content/levels/published-subdomain-pages.ts
```

Pour CP, l'URL canonique publiée est :

```
/primaire/cp/programmes/francais/lecture-comprehension
```

## Route courte CP — redirect de compatibilité

La route historique courte :

```
/primaire/cp/[domainSlug]/[subdomainSlug]
```

est conservée uniquement comme **redirect statique** vers `published.route`.
Elle ne doit **pas** être transformée en page de rendu catalogue.
Elle ne doit **pas** être promue dans la navigation principale.

Le redirect cible toujours la valeur `route` du registre — si le registre évolue,
le redirect suit automatiquement.

## Rôle des pages catalogue de sous-domaine

Ces pages sont des index de ressources PDF futures par sous-domaine. Elles listent
les leçons et leurs ressources associées, mais ne portent pas le contenu
pédagogique complet.

Ressources attendues par leçon :

- Leçon PDF ;
- Exercices PDF ;
- Correction PDF ;
- Projection PDF ;
- Fiche parent.

## Contenus interdits sur les pages catalogue

Les pages catalogue ne doivent jamais afficher :

- `exercises` — exercices complets ;
- `validation` — corrections ;
- `parentGuidance` — guide parent détaillé ;
- `printableSupport` — support imprimable détaillé ;
- `projectableSupport` — support projetable détaillé ;
- `successCriteria` — critères de réussite détaillés ;
- `characterLink.roleHint` — conseil de rôle du personnage ;
- consignes longues ou déroulé enseignant.

Ces champs sont présents dans les learning trees mais réservés aux futurs PDF.

## Règles de lien PDF

Un lien PDF ne doit être cliquable que si les deux conditions sont vraies :

- `getPublicStatusKey(resource.status) === "available"` ;
- `resource.href` existe.

Si `href` est absent, aucun lien cliquable ne doit être rendu. Ne jamais ajouter
de `href` vers un fichier inexistant ou un PDF fictif.

## Règles de statuts

- Utiliser `PublicStatusBadge` pour afficher un statut.
- Utiliser `getPublicStatusKey(status)` pour les conditions.
- Ne pas importer directement `public-status.domain` ou `public-status.ui`.
- Ne pas comparer directement les libellés publics ou statuts bruts dans l'UI.
- Ne pas confondre le statut pédagogique d'une leçon avec l'existence réelle
  d'un PDF.

## Routes legacy CP — redirects de compatibilité

Les routes suivantes ont été converties en **redirects statiques**.
Elles ne sont plus des pages HTML de leçon et ne doivent pas le redevenir :

- `/primaire/cp/lecons` → redirige vers `/primaire/cp/programmes/francais/lecture-comprehension`
- `/primaire/cp/lecons/[slug]` → redirige vers la page catalogue du sous-domaine correspondant

Ces routes ne doivent **pas** être remises en avant dans la navigation principale.
Elles ne doivent **pas** être transformées en pages de rendu HTML de leçon.

## Interdits catalogue

- Ne pas créer de nouvelle route `[lessonSlug]` pour CP.
- Ne pas créer de page HTML longue de leçon.
- Ne pas créer de PDF fictif.
- Ne pas ajouter de `href` vers un fichier inexistant.
- Ne pas remettre `/primaire/cp/lecons` au centre de la navigation.
- Ne pas transformer la route de redirect CP en page de rendu catalogue.

## Extension future

Ajouter un nouveau niveau catalogue dans la logique :

```
publishedSubdomainPages → learning tree → route générique canonique
```

Le modèle est généralisé à CP, CE1 et CE2. Pour CM1 ou d'autres niveaux, ajouter
une entrée dans `content/levels/published-subdomain-pages.ts` et créer le
learning tree correspondant.
<!-- END:cp-pdf-resource-portal -->

<!-- BEGIN:build-rules -->
# Règles de build — TypeScript et Next.js

## Nettoyage obligatoire avant tsc

`tsconfig.json` inclut `.next/types/**/*.ts`. Des builds interrompus peuvent
laisser des fichiers générés obsolètes qui produisent des erreurs TypeScript
fantômes sur des lignes inexistantes.

**Toujours lancer avant `npx tsc --noEmit` :**

```
rm -rf .next
```

## Ordre de validation standard

```
rm -rf .next
npm run lint
npx tsc --noEmit
npx next build --webpack
```
<!-- END:build-rules -->

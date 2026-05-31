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

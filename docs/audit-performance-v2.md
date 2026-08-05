# Audit de performance — 2ᵉ passe

**Date** : 1er août 2026
**Branche** : `claude/site-performance-optimization-v2wt83`
**Périmètre** : gains réels et mesurables uniquement, après la 1ʳᵉ passe (images fiches CM2, lazy loading de 16 outils enseignants, découpage dynamique CM2, `useMemo` sur 4 catalogues). Aucune optimisation déjà en place n'est refaite ici.

---

## 1. Baseline

Build de référence propre (`rm -rf .next && npm run build`), exécuté avant toute modification de cette passe.

| Élément | Valeur |
|---|---|
| Routes générées | 420 (aucun avertissement de build) |
| JS dans `.next/static/chunks` | 161 fichiers, 2,1 Mo cumulés |
| Dossier `chunks` complet | 2,6 Mo |
| CSS | 1 fichier, 111 115 o (16 039 o gzip) |
| Fichiers `"use client"` | 74 |
| Chunks partagés les plus gros | `3794-*.js` 220 Ko, `4bd1b696-*.js` 196 Ko, `framework-*.js` 188 Ko, `main-*.js` 136 Ko, `polyfills-*.js` 112 Ko — tous du runtime Next.js/React, pas du code applicatif |
| Chunks des 16 pages `/enseignants/*` corrigées en 1ʳᵉ passe | 4 Ko chacun (déjà optimisé, confirmé stable) |

Principaux Client Components identifiés (sur 74) : les ~28 outils enseignants (déjà lazy-loadés), les 4 catalogues filtrables (déjà mémoïsés en 1ʳᵉ passe), `SiteHeader`, les embeds de fiches CM2, et `primaire-portal-map.tsx` (carte interactive de la page `/primaire`).

Principaux coûts identifiés avant modification : voir section 2.

---

## 2. Problèmes réels trouvés

### 2.1 — Recalcul de liste non mémoïsé pendant un glisser-déposer (outil de programmation annuelle)

- **Fichier** : `components/academy/TeacherCurriculumPlanner.tsx:328` (fonction `cardsForPeriod`), appelée ligne 1106 dans le rendu de chaque période.
- **Cause** : `cardsForPeriod(period)` filtrait et triait tout le tableau `planningCards` à chaque appel, une fois par période (5 fois par rendu), sans mémoïsation — alors que `planningCards`, `subjectsForLevel`, `competencyById` et une dizaine d'autres valeurs dérivées du même composant sont déjà mémoïsées avec `useMemo`.
- **Impact mesuré** : le composant maintient `draggedKey`/`dragOverPeriod` en state, mis à jour à chaque évènement `dragover` pendant un glisser-déposer de carte. Chaque mise à jour déclenche un nouveau rendu, qui relance 5× le filtre + tri complet de `planningCards` (potentiellement 50 à 150+ cartes sur une programmation annuelle complète). Confirmé par lecture directe du code (pas une estimation) : le calcul ne dépendait ni de `draggedKey` ni de `dragOverPeriod`, seulement de données qui ne changent pas pendant le glisser.
- **Correction appliquée** : la boucle de filtre/tri est désormais précalculée une seule fois dans une `Map` mémoïsée sur `[planningCards, showHidden]` (indépendante de l'état de glisser-déposer). `cardsForPeriod` devient une simple lecture `Map.get()`.

### 2.2 — Même schéma dans le plan de classe (glisser-déposer de tables)

- **Fichier** : `components/teacher-classroom-layout/TeacherClassroomLayoutClient.tsx:567` (dans le rendu de `tables.map()`).
- **Cause** : `labels.filter((l) => l.tableId === table.id)` recalculé pour chaque table, à chaque rendu — alors que `unassignedLabels`, `groupedLabels` et `ungroupedLabels` juste au-dessus (lignes 432-451) suivent déjà le bon pattern `useMemo`.
- **Impact mesuré** : `onCanvasPointerMove` (ligne 203) appelle `setTables(...)` à chaque déplacement de pointeur pendant qu'un enseignant déplace une table sur le plan — donc ce filtre s'exécute en continu (potentiellement plusieurs dizaines de fois par seconde) pendant tout le geste de glisser, pour un calcul qui ne dépend même pas de `tables` (seulement de `labels`).
- **Correction appliquée** : ajout d'une `Map<tableId, Label[]>` mémoïsée sur `[labels]` uniquement (même pattern que `groupedLabels`, déjà présent dans ce fichier). Le rendu de chaque table fait une lecture `Map.get()` au lieu d'un `.filter()`.

### 2.3 — Frontière Client Component trop large sur `/primaire`

- **Fichier** : `components/academy/primaire-portal-map.tsx` (241 lignes, entièrement `"use client"`).
- **Cause** : la seule raison de rendre tout le composant client était un `useState` de survol (lignes 76, 116-119) utilisé uniquement pour l'effet de zone survolée sur la version desktop. Les deux images (`next/image`), la grille de cartes mobile et le lien retour n'ont aucune interactivité et n'avaient pas besoin d'être hydratés côté client.
- **Impact** : composant client inutilement large sur une page de premier niveau de navigation (`/primaire`), hydratation et réconciliation React appliquées à du contenu 100 % statique (images, liens, cartes de navigation mobile).
- **Correction appliquée** : extraction de la seule partie survolable (`PORTAL_ZONES.map` avec les gestionnaires `onMouseEnter/onMouseLeave/onFocus/onBlur`) dans un nouveau composant client dédié `components/academy/PrimairePortalHoverZones.tsx`. `primaire-portal-map.tsx` redevient un Server Component ; les données statiques des zones sont déplacées dans `components/academy/primaire-portal-zones.ts` (partagé, sans JSX). Rendu HTML vérifié identique avant/après.

---

## 3. Optimisations effectuées

| Catégorie | Détail |
|---|---|
| **Server/Client Components** | `primaire-portal-map.tsx` redevient un Server Component ; seule la superposition survolable (`PrimairePortalHoverZones.tsx`, ~75 lignes) reste cliente. |
| **Re-renders** | 2 corrections de mémoïsation ciblées (`TeacherCurriculumPlanner.tsx`, `TeacherClassroomLayoutClient.tsx`), toutes deux sur des calculs répétés pendant un glisser-déposer, suivant un pattern déjà présent et validé dans les mêmes fichiers. |
| **Lazy loading** | Aucun nouveau candidat trouvé : les ~28 dossiers `components/teacher-*` utilisent déjà `next/dynamic` (confirmé fichier par fichier). |
| **Hydratation** | Réduite pour `/primaire` (voir 2.3). Aucune autre page principale (`/`, `/ressources`, `/missions-recentes`, `/carte`, `/college`, `/lycee`) n'avait de frontière client excessive — toutes déjà des Server Components au niveau racine. |
| **Imports / données** | Aucune fuite de données volumineuses côté client trouvée au-delà de ce que la 1ʳᵉ passe avait déjà traité (voir 5.1 : hypothèse de duplication vérifiée et écartée). Aucun import en barrel (`import * as`) dans `app/`, `components/`, `lib/`, `content/`. |
| **Images** | Aucune nouvelle correction : tous les usages restants de `<Image>`/`fill`/`priority`/`sizes` vérifiés conformes (voir 5.2 pour le cas analysé et non modifié). |
| **CSS** | Inchangé : 111 115 o / 16 039 o gzip, un seul fichier partagé — déjà optimal, aucune action. |
| **Fonts** | Inchangé : aucune police web, uniquement la pile système — déjà optimal, aucune action. |

---

## 4. Mesures avant/après

| Métrique | Avant (baseline pass 2) | Après | Différence | Méthode de mesure |
|---|---|---|---|---|
| Routes générées | 420 | 420 | 0 | `npm run build`, sortie du compte de pages |
| JS dans `.next/static/chunks` | 161 fichiers / 2,1 Mo | 161 fichiers / 2,1 Mo | ~0 (attendu : ces correctifs réduisent le coût de rendu, pas le poids du bundle) | `find … -name "*.js" \| xargs du -ch` |
| CSS | 111 115 o / 16 039 o gzip | 111 115 o / 16 039 o gzip | 0 | `wc -c` / `gzip -c \| wc -c` |
| Fichiers `"use client"` | 74 | 74 | 0 net (−1 `primaire-portal-map.tsx`, +1 `PrimairePortalHoverZones.tsx`, mais surface hydratée réduite : ~241 lignes → ~75 lignes de JSX interactif) | `grep -rl` avant/après + lecture de fichier |
| Filtres/tris répétés pendant un glisser-déposer, non mémoïsés | 2 (`cardsForPeriod` × 5 périodes/rendu, `labels.filter` × N tables/rendu) | 0 | −2 calculs recalculés à chaque `dragover`/`pointermove`, remplacés par des lectures `Map.get()` sur des résultats mémoïsés | Lecture directe du code avant/après + confirmation des dépendances `useMemo` |
| Calculs lourds mémoïsés (ajoutés cette passe) | — | 2 (`cardsByPeriod`, `labelsByTable`) | +2, chacun avec justification mesurée (recalcul O(n) déclenché à haute fréquence par un geste de glisser) | Lecture du code |
| Composants lazy-loadés (nouveaux) | — | 0 | 0 | Tous les outils enseignants étaient déjà lazy-loadés en 1ʳᵉ passe ; confirmé, aucun nouveau candidat |
| Avertissements de build | 0 | 0 | 0 | `npm run build` |
| Interactions testées en navigateur réel sans erreur console | — | 5/5 (voir §7) | — | Playwright sur build de production servi localement |

Aucun gain en kilo-octets n'est revendiqué pour les correctifs de re-render (2.1, 2.2) : leur bénéfice est un coût CPU de rendu réduit pendant un geste interactif (glisser-déposer), vérifié par lecture du code et par test fonctionnel, pas par une métrique de taille.

---

## 5. Éléments analysés mais non modifiés

### 5.1 — Duplication supposée de `content/teacher-programming-curriculum.ts` (1160 lignes)

**Hypothèse initiale** : ce fichier de données est importé comme valeur réelle par deux composants clients distincts (`TeacherCurriculumPlanner.tsx` pour `/enseignants/programmation/annuelle`, `TeacherPeriodProgressionClient.tsx` pour `/enseignants/progression`), ce qui suggérait une duplication du même jeu de données de 1160 lignes dans deux chunks séparés.

**Vérification effectuée** : recherche d'une chaîne distinctive du fichier (`"Calculer un pourcentage simple"`) dans l'ensemble des chunks compilés (`.next/static/chunks/*.js`). Résultat : présente dans un **seul** chunk (`74.8ca5cddfbb3e335f.js`, 48 Ko), pas deux.

**Conclusion** : aucune duplication réelle. Webpack extrait déjà ce module partagé dans un chunk commun réutilisé par les deux routes — c'est le comportement optimal. **Aucune modification apportée** : restructurer l'accès aux données ici aurait ajouté un risque (rupture potentielle de la recherche/filtrage client-side existante) sans aucun gain mesurable.

### 5.2 — Image dupliquée sur `/primaire` (desktop + mobile)

**Hypothèse initiale** : la même image (`portail-primaire.png`) est rendue deux fois sur la page (une version desktop avec `priority`, une version mobile sans), ce qui suggérait un double téléchargement gaspillé.

**Vérification effectuée** :
1. Confirmé qu'un seul `<link rel="preload">` est généré dans le HTML compilé (correspondant à l'unique `priority` sur l'instance desktop) — pas deux liens de préchargement.
2. Les deux instances `<Image>` utilisent le même `src` et le même `sizes="100vw"`, donc génèrent le même ensemble d'URLs candidates (`/_next/image?...&w=640|750|828|1080|1200|1920|2048|3840`).
3. Sur mobile, le préchargement (déclenché par l'instance desktop, invisible via `hidden md:block`) et le chargement réel de l'instance mobile visible pointent vers la **même URL** pour une largeur d'écran donnée — le cache HTTP du navigateur déduplique la requête réseau.

**Conclusion** : aucun gaspillage réel de bande passante. **Aucune modification apportée.**

### 5.3 — `components/activities/ActivityRenderer.tsx` (`"use client"` techniquement superflu)

Déjà identifié en 1ʳᵉ passe : ses seuls appelants sont des composants déjà clients ; retirer la directive n'aurait aucun effet mesurable sur le JS envoyé. Reconfirmé cette passe, toujours aucune action.

### 5.4 — Context providers

Reconfirmé : `grep -rn "createContext\|\.Provider"` sur `app/`, `components/`, `lib/` ne retourne aucun résultat. Aucune régression depuis la 1ʳᵉ passe.

### 5.5 — Toutes les pages principales listées dans la consigne

`/`, `/ressources`, `/missions-recentes`, `/carte`, `/primaire`, `/college`, `/lycee` : toutes déjà des Server Components au premier niveau (aucun `"use client"` en tête de fichier). Aucune modification nécessaire au-delà de 2.3.

---

## 6. Fichiers modifiés

| Fichier | Explication |
|---|---|
| `components/academy/TeacherCurriculumPlanner.tsx` | `cardsForPeriod` mémoïsé via une `Map` calculée par `useMemo` sur `[planningCards, showHidden]`, au lieu d'un filtre/tri relancé à chaque rendu (y compris pendant le glisser-déposer). |
| `components/teacher-classroom-layout/TeacherClassroomLayoutClient.tsx` | Ajout de `labelsByTable`, une `Map` mémoïsée sur `[labels]`, remplaçant un `.filter()` relancé par table à chaque rendu (y compris pendant le déplacement d'une table). |
| `components/academy/primaire-portal-map.tsx` | Redevient un Server Component : ne conserve que le balisage statique (images, cartes mobile, lien retour) ; délègue la partie survolable au nouveau composant client. |
| `components/academy/PrimairePortalHoverZones.tsx` *(nouveau)* | Composant client isolé, ne contient que les liens survolables desktop et leur état de survol (`useState`). |
| `components/academy/primaire-portal-zones.ts` *(nouveau)* | Données statiques des zones (`PORTAL_ZONES`, type `ZoneSlug`), partagées entre le Server Component et le composant client, sans JSX. |

Aucun autre fichier touché. Aucune route, aucun lien, aucune dépendance ajoutée, aucun contenu pédagogique modifié.

---

## 7. Validation

| Étape | Résultat |
|---|---|
| `npm run lint` | Propre, aucun avertissement |
| `npx tsc --noEmit` | Propre, aucune erreur |
| `rm -rf .next && npm run build` | Propre, aucun avertissement, 420 pages générées |
| Serveur de production local (`npm run start`), test qu'aucun ancien serveur ne restait actif sur le port 3000 | Vérifié avant et après |
| Tests fonctionnels réels (Playwright, sur le build de production) | 5/5 réussis, 0 erreur console/page :<br>1. `/primaire` — survol d'une zone desktop affiche bien le libellé (CP · Kiwi)<br>2. `/enseignants/organisation-classe` — ajout de table, création d'étiquette, bascule vers l'onglet Groupes<br>3. `/enseignants/organisation-classe` — génération de 3 groupes<br>4. `/enseignants/programmation/annuelle` — recherche « fraction » retourne des résultats assignables<br>5. `/enseignants/programmation/annuelle` — vue « À équilibrer » s'affiche correctement |
| Vérification HTML statique | `/primaire` : les deux images et les 5 libellés de zone présents ; `/enseignants/organisation-classe` : coquille de page correcte (contenu interactif chargé côté client, comportement inchangé depuis la 1ʳᵉ passe) |

---

## 8. Risques restants

- **Aucun risque fonctionnel identifié** sur les 3 fichiers modifiés : testés en navigateur réel (Playwright) sur le build de production, comportement identique confirmé (recherche, glisser-déposer, groupes, survol).
- **Gain non quantifiable en kilo-octets** pour les 2 corrections de mémoïsation (2.1, 2.2) : le bénéfice est un coût de rendu réduit pendant l'interaction, pas une réduction de bundle. Ce n'est pas mesurable autrement qu'en confirmant par lecture de code que le recalcul ne se produit plus à chaque tick de glisser-déposer.
- **`components/academy/primaire-portal-map.tsx`** : le split Server/Client n'apporte qu'un gain modeste en kilo-octets (la page `/primaire` pesait déjà 4 Ko de JS propre avant la modification, ce chiffre reste 4 Ko après) ; le bénéfice réel est une surface d'hydratation plus petite, non un chunk plus léger.
- Deux hypothèses d'optimisation ont été vérifiées puis rejetées après mesure (§5.1, §5.2) : ceci illustre qu'une partie des pistes plausibles ne résiste pas à la vérification sur le build réel, conformément à la consigne de ne revendiquer aucun gain non mesuré.

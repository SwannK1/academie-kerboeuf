# Rapport — Suite de tests de non-régression

Académie Kerboeuf — mise en place et stabilisation de la suite de tests automatisés.

## ⚠️ Note préalable

Comme lors de la reprise précédente (audit d'intégrité des routes/liens), la
consigne de reprise décrivait une « première session » ayant déjà posé une
architecture de tests (configuration Playwright modifiée, `publication-guards.spec.ts`
de 139 lignes, 4 fichiers E2E, ~345 lignes, `@axe-core/playwright` installé).
**Rien de tout cela n'était présent sur `claude/link-route-integrity-audit`** :
seuls `playwright.config.ts`, `e2e/teacher-programmation-annuelle-panel.spec.ts`,
`e2e/teacher-progression-panel.spec.ts` et `e2e/utils/console-errors.ts`
existaient (issus d'un chantier antérieur, sans rapport avec cette consigne).
Ce travail décrit s'est donc, comme précédemment, perdu à la limite d'usage
avant d'être committé. La suite a été construite depuis cet état réel,
sans dupliquer l'architecture existante (config et helper réutilisés tels
quels).

En revanche, à la différence de la reprise précédente, **deux chantiers
complets et réels** existaient sur des branches sœurs non fusionnées :
- `fix/hydration-progression-v1` (correction de l'erreur d'hydratation
  `/enseignants/progression` + son test de non-régression) ;
- une partie de la même branche (`Finaliser le SEO technique`, commit
  `a7a123f`) : titres dupliqués, canonical, OG/Twitter, sitemap (82→222
  URL), JSON-LD.

Les deux ont été intégrés par cherry-pick plutôt que refaits, conformément
à la consigne de ne pas dupliquer un travail déjà terminé.

## État initial

- **Branche source** : `claude/link-route-integrity-audit`
- **Commit source** : `4f196929f54510ba09ddca1e0ed807cf9adc9489`
- **Branche de ce chantier** : `claude/non-regression-test-suite`
- **Outillage déjà présent** : `playwright.config.ts` (3 projets desktop/
  tablet/mobile, `webServer` reconstruisant à chaque lancement),
  2 fichiers E2E (comportement des panneaux latéraux enseignants),
  `e2e/utils/console-errors.ts` (`trackConsoleErrors`).
- **Dépendances** : `@playwright/test` présent ; `@axe-core/playwright`
  **absent** (installé pendant ce chantier).
- **Résultats initiaux** (13 tests existants, exécutés tels quels avant
  toute modification, après correctif de configuration — cf. section
  Stabilisation) : **13/13 passés**, ~35 s, sur `desktop-chromium`
  uniquement.
- **420 routes**, **0 lien interne cassé atteignable**, **222 URL de
  sitemap** — état hérité du chantier d'intégrité précédent, reconfirmé
  au fil de ce chantier après chaque modification.

## Cartographie des risques

### Critiques
- Statuts publics affichés/utilisés de façon incohérente avec le
  référentiel central (`content/public-status*.ts`).
- Générateur d'URL de mission (`getMissionHref`) produisant un lien mort
  (régression déjà corrigée par le chantier précédent — protégée ici par
  des tests figeant son comportement).
- Erreurs d'hydratation React sur une page enseignant à fort trafic.
- Contenu pédagogique affiché comme disponible sans l'être réellement
  (`hasRealMissionContent`).

### Importants
- Accessibilité clavier/lecteur d'écran des dialogs (focus non géré).
- SEO technique (titres dupliqués, canonical manquant, sitemap incohérent).
- Parcours publics principaux (accueil, ressources, missions, parcours,
  niveaux) menant à des impasses ou des 404.
- Persistance locale des outils enseignants (perte de données silencieuse).

### Secondaires
- Libellés de statut ou métadonnées légèrement imprécis sans impact
  fonctionnel.
- Redirections legacy (attendues, documentées, non régressives par
  nature).

## Tests finalisés

### `tests/unit/public-status.spec.ts` (playwright.unit.config.ts, aucun navigateur)
- **Scénarios** : normalisation de tous les synonymes internes
  (`disponible`/`validé`/`validated`… → `available`, etc., 27 valeurs),
  insensibilité à la casse/espaces, fallback sur `in-progress` pour toute
  valeur inconnue ou non-string, idempotence de `getPublicStatus`,
  équivalence stricte du wrapper déprécié `getPublicStatusVariant`, les 3
  libellés publics exacts, ariaLabel/className toujours définis.
- **Type** : unitaire, logique pure.
- **Risque protégé** : statuts publics incohérents (critique).
- **Justification** : importe uniquement la façade `@/content/public-status`
  (règle de gouvernance AGENTS.md), ne recopie aucune règle métier.

### `tests/unit/mission-href.spec.ts`
- **Scénarios** : mission primaire non-CM2 (repli niveau), collège (jamais
  de route de détail), lycée disponible (lien direct) / non disponible
  (repli, jamais vers une page qui répondrait 404), CM2 disponible/non
  disponible, cohérence stricte entre `resources.ts`, `learning-paths.ts`
  et `getMissionHref` (chaque consommateur testé contre le générateur
  central, pas contre une réimplémentation), régression `sciences` vs
  `sciences-technologie`, intégrité globale du référentiel (aucune mission
  collège ne produit jamais une URL `/missions/{slug}`).
- **Type** : unitaire, logique pure.
- **Risque protégé** : générateur d'URL de mission (critique).

### `tests/unit/publication-guards.spec.ts`
- **Scénarios** : les 10 cas obligatoires de la consigne (disponible +
  contenu réel, disponible sans contenu, statut partiel, en préparation,
  à venir, ancien statut normalisé, mission vide, wrapper rétrocompatible…),
  filtre `sanitizePublicPedagogicalItems` (« à vérifier » filtré, remplacé
  en « à confirmer » dans un texte plus long, chaînes vides filtrées),
  destination canonique de Félix (`/eleves/felix`, exclu de
  `getAllProfessorSlugs`).
- **Type** : unitaire, logique pure.
- **Risque protégé** : contenu pédagogique affiché comme prêt sans l'être ;
  Félix (régression déjà corrigée, protégée ici).

### `e2e/public-home.spec.ts`, `public-ressources.spec.ts`, `public-missions-recentes.spec.ts`, `public-parcours.spec.ts`, `public-levels.spec.ts`
- **Scénarios** : accueil (h1, navigation vers les 3 niveaux), ressources
  (filtre par statut, CTA actif sur une ressource disponible, repli sûr —
  jamais de 404 — sur une ressource non disponible), missions récentes
  (sections de statut, échantillon de missions ouvertes sans 404),
  parcours (étape disponible = lien ouvrable ; étape non disponible =
  bloc statique avec badge, jamais un lien), niveaux (`/primaire`,
  `/college`, `/lycee`, une matière, une mission, le catalogue
  `/lycee/seconde/missions` avec `MissionCard` — "Détail non disponible"
  visible et non cliquable —, régression `sciences-technologie`).
- **Type** : E2E, navigateur réel.
- **Risque protégé** : parcours publics principaux.

### `e2e/seo.spec.ts`
- **Scénarios** : 7 pages représentatives — titre non vide sans double
  suffixe, description non vide, canonical, OG/Twitter, robots
  `index,follow` ; JSON-LD Organization + WebSite valides ; JSON-LD
  BreadcrumbList valide (positions séquentielles) ; `robots.txt` +
  `sitemap.xml` accessibles, sans doublon ; page 404 sans contradiction
  d'indexation.
- **Type** : E2E, navigateur réel + requêtes HTTP directes.
- **Risque protégé** : SEO technique.

### `e2e/accessibility.spec.ts`
- **Scénarios** : axe-core sur 5 pages (accueil, ressources, une matière,
  une mission, un outil enseignant) — 0 violation exigée, aucune règle
  désactivée ; structure de base (main, h1 unique, boutons nommés) sur les
  mêmes 5 pages ; menu mobile (aria-expanded, fermeture au clic) ; gestion
  du focus des 2 dialogs testés (`Détails de la carte`, `Modifier la
  carte`) — focus déplacé à l'ouverture, restitué au déclencheur à la
  fermeture.
- **Type** : E2E, navigateur réel + axe-core.
- **Risque protégé** : accessibilité automatisable.

### `e2e/teacher-organisation-classe.spec.ts`
- **Scénarios** : ajout d'une table, création d'une étiquette, glisser-
  déposer natif HTML5 de l'étiquette sur la table, conservation de
  l'affectation, persistance après rechargement.
- **Type** : E2E, navigateur réel.
- **Risque protégé** : outil enseignant critique (Plan de classe).

### `e2e/teacher-programmation-annuelle-drag.spec.ts`
- **Scénarios** : création d'une carte libre en Période 1, glisser-déposer
  natif HTML5 vers la Période 2, conservation de la carte, persistance
  après rechargement.
- **Type** : E2E, navigateur réel.
- **Risque protégé** : outil enseignant critique (Programmation annuelle) —
  complète `teacher-programmation-annuelle-panel.spec.ts` (déjà existant,
  couvre le panneau latéral, pas le déplacement).

### `e2e/teacher-progression-hydration.spec.ts` (cherry-pick, non réécrit)
- **Scénarios** : chargement initial (stockage vide), stockage déjà
  rempli + rechargement, stockage corrompu.
- **Risque protégé** : erreurs d'hydratation (critique) — voir section Bugs.

### Scripts d'audit de routes (`scripts/link-audit/`)
- `critical-routes.mjs` : échantillon fixe (13 routes + sitemap/robots).
- `quick-check.mjs` : teste l'échantillon contre un unique serveur de
  production (build uniquement si absent).
- `full-audit.mjs` : orchestre `extract-links.mjs` / `verify-links.mjs`
  (déjà créés par le chantier précédent, réutilisés tels quels) +
  `http-check.mjs` (idem) + `sitemap-check.mjs` (nouveau), un seul serveur
  pour toute la chaîne.
- `sitemap-check.mjs` : teste chaque URL du sitemap (200/redirect/404/5xx),
  détecte les doublons.
- `with-server.mjs` : cycle de vie du serveur partagé par les scripts
  ci-dessus — invoque le binaire `next` local directement (`npx next
  start` se bloquait dans cet environnement, résolution réseau superflue).

## Bugs réels découverts

### 1. `/primaire` sans aucun `<h1>`
- **Route** : `/primaire`
- **Attendu** : un titre de niveau 1, visible ou accessible (lecteur d'écran).
- **Observé** : la page enchaîne un portail immersif 100 % visuel (image +
  zones survolables, sans texte) puis un `<h2>` — aucun `<h1>` nulle part.
- **Cause** : `PrimairePortalMap` (composant purement visuel) ne contient
  aucun titre ; la page ne compensait pas.
- **Correction** : `<h1 className="sr-only">Primaire — Les Lisières des
  Explorateurs</h1>` ajouté en tête de `app/primaire/page.tsx` (invisible,
  aucun impact visuel, corrige le vide structurel).
- **Test associé** : `e2e/public-levels.spec.ts` (« /primaire charge sans
  erreur console et expose un h1 »), `e2e/accessibility.spec.ts` (axe +
  structure de base, si la page avait été dans l'échantillon).

### 2. Dialogs enseignants sans gestion du focus (WCAG / ARIA APG)
- **Routes** : `/enseignants/progression`, `/enseignants/programmation/annuelle`
- **Attendu** : à l'ouverture d'un `role="dialog"`, le focus doit y entrer
  (ARIA APG « Dialog (Modal) Pattern ») ; à la fermeture, il doit revenir
  à l'élément déclencheur.
- **Observé** : `CardSidePanel` (`TeacherPeriodProgressionClient.tsx`) et
  `PlanningCardEditor` (`TeacherCurriculumPlanner.tsx`) géraient Échap et
  le clic extérieur, mais jamais le focus : à l'ouverture, il restait sur
  la carte cliquée (hors du panneau) ; à la fermeture, sans mécanisme de
  restitution explicite.
- **Cause** : aucun `useRef`/`.focus()` sur le montage ni le démontage du
  panneau.
- **Correction** : dans les deux composants — capture de
  `document.activeElement` au montage (élément déclencheur), `.focus()`
  du bouton de fermeture au montage, restitution du focus au déclencheur
  au démontage (`useEffect` avec cleanup).
- **Test associé** : `e2e/accessibility.spec.ts` (« Dialog — gestion du
  focus », 2 scénarios).
- **Limite assumée** : le même schéma (`role="dialog"` sans gestion du
  focus) existe dans `TeacherLogbookClient.tsx` et
  `TeacherLessonPreparationClient.tsx` (identifié par recherche de code,
  non corrigé — hors des 3 outils enseignants représentatifs de ce
  chantier). Listé en risque restant.

### 3. Titres de page dupliqués sur ~100 routes (`X | Académie Kerboeuf | Académie Kerboeuf`)
- **Routes** : la quasi-totalité du site (confirmé sur `/college` :
  `<title>Collège | Académie Kerboeuf | Académie Kerboeuf</title>`).
- **Attendu** : un seul suffixe `| Académie Kerboeuf`.
- **Observé** : le template racine (`app/layout.tsx`, `"%s | Académie
  Kerboeuf"`) s'ajoutait à des titres de page qui contenaient déjà ce
  suffixe.
- **Cause** : ~95 pages définissaient `title: "X | Académie Kerboeuf"` en
  toutes lettres au lieu de laisser le template l'ajouter.
- **Correction** : découverte pendant la conception de `e2e/seo.spec.ts`
  (vérifiée directement sur le HTML généré), déjà corrigée et validée sur
  la branche sœur `fix/hydration-progression-v1` (commit `a7a123f`,
  helper `lib/seo.ts` centralisant title/description/canonical/OG/
  Twitter par page) : intégrée par cherry-pick plutôt que refaite.
  Conflits de fusion (divergence d'historique, mécaniques — cette branche
  utilisait déjà les wrappers `dynamic(ssr:false)` des outils enseignants
  là où la branche source utilisait encore les composants clients bruts)
  résolus en conservant le wrapper de cette branche et en ajoutant
  `buildPageMetadata` par-dessus. Régression réintroduite par ce
  cherry-pick et corrigée immédiatement : le fichier extrait
  `app/programmation/_components/ProgrammationClient.tsx` contenait
  encore l'ancien slug `sciences-technologie` (la branche sœur datait
  d'avant ce correctif) — réappliqué.
- **Test associé** : `e2e/seo.spec.ts` (titre unique, sur 7 pages).

### 4. Page d'accueil sans balise `canonical`
- **Route** : `/`
- **Attendu** : chaque page publique a un `<link rel="canonical">`
  (cohérence avec le reste du site après correction du point 3).
- **Observé** : `app/page.tsx` n'exporte aucune métadonnée propre (hérite
  du titre/description par défaut du layout racine, qui ne définissait
  pas `alternates.canonical`) — seule route du site sans canonical.
- **Cause** : le cherry-pick du point 3 n'avait modifié `app/page.tsx` que
  pour ajouter une carte « Programmation » (correction d'une page
  orpheline, sujet différent), sans toucher à ses métadonnées.
- **Correction** : `alternates: { canonical: "/" }` ajouté à la métadonnée
  par défaut du layout racine (`app/layout.tsx`).
- **Test associé** : `e2e/seo.spec.ts` (page `/` incluse dans l'échantillon).

## Mesures avant/après

| Mesure | Avant | Après |
| ------------------- | ----: | ----: |
| Fichiers de tests | 2 (E2E) | 15 (3 unitaires + 12 E2E) |
| Tests unitaires | 0 | 63 |
| Tests E2E (desktop-chromium) | 13 | 57 |
| Routes critiques couvertes (E2E + audit rapide) | 0 dédiées | 13 (échantillon) + parcours complets (accueil, ressources, missions, parcours, niveaux) |
| Outils enseignants couverts | 0 (comportement panneau seulement, 2 outils) | 3 (Programmation annuelle, Plan de classe, Progression — panneau + glisser-déposer + hydratation) |
| Durée suite rapide (`validate:quick` : lint + tsc + 63 tests unitaires + 14 routes) | — | ~38 s |
| Durée suite complète E2E (57 tests, desktop-chromium) | ~35 s (13 tests) | ~40 s (57 tests) |
| Durée audit complet des routes (420 routes, 381 liens, 309 fichiers, 222 sitemap) | — | ~15 s (hors build) |
| Tests en échec (état final) | — | 0 |
| Tests ignorés (état final) | — | 0 (1 test conditionnellement skippé si le catalogue ne contient aucune ressource « en préparation » au moment du run — dépendant des données) |
| Tests instables | — | 0 sur `desktop-chromium` ; `tablet-chromium`/`mobile-chromium` limités par l'environnement (voir Limites) |
| Bugs réels découverts et corrigés | — | 4 (dont 1 régression de fusion corrigée avant qu'elle ne se propage) |

## Scripts disponibles

| Script | Rôle |
| --- | --- |
| `npm run test:unit` | Tests unitaires (logique pure, aucun navigateur ni serveur), ~1 s. |
| `npm run test:e2e` | Suite E2E complète (3 projets : desktop/tablet/mobile-chromium), build uniquement si absent. |
| `npm run test:e2e:ui` | Mode interactif Playwright (développement local). |
| `npm run test:routes:quick` | Audit rapide : échantillon critique de 14 URL contre un serveur de production unique. |
| `npm run test:routes:full` | Audit complet : 420 routes, liens internes, fichiers publics, sitemap. |
| `npm run test:routes:sitemap` | Sitemap seul (200/redirect/404/5xx/doublons). |
| `npm run validate:quick` | `lint` + `tsc --noEmit` + tests unitaires + audit rapide. |
| `npm run validate` | `lint` + `tsc --noEmit` + build propre + tests unitaires + E2E complet + audit complet. |

Tous les scripts de route/E2E gèrent leur propre serveur (démarrage,
attente de disponibilité par sondage HTTP, arrêt garanti même en cas
d'échec via `finally`) ; aucun ne dépend d'un serveur déjà actif, et
aucun ne reconstruit le site à chaque exécution (build uniquement si
`.next/BUILD_ID` est absent).

## Validation finale

- **lint** : ✅ 0 erreur, 0 avertissement (après correction d'une variable
  inutilisée dans `e2e/seo.spec.ts`).
- **TypeScript** (`npx tsc --noEmit` après `rm -rf .next`) : ✅ 0 erreur.
- **Build** (`rm -rf .next && npm run build`) : ✅ succès.
- **Routes générées** : 420/420, inchangé avant/après l'ensemble du
  chantier (y compris après le cherry-pick SEO).
- **Tests unitaires** : ✅ 63/63.
- **E2E (`desktop-chromium`)** : ✅ 57/57.
- **E2E (`tablet-chromium`, `mobile-chromium`)** : voir Limites — blocage
  d'infrastructure, pas un échec de test ou une régression produit.
- **Axe (accessibilité automatisée)** : ✅ 0 violation sur 5 pages
  représentatives.
- **Crawl / audit complet des routes** : ✅ 420 routes, 381 liens internes
  testés (0 sans correspondance), 309 fichiers publics (0 absent).
- **Sitemap** : ✅ 222/222 URL en 200, 0 doublon.
- **Fichiers publics** : ✅ 0 absent.
- **Hydratation** : ✅ 0 occurrence de l'erreur React #418 sur
  `/enseignants/progression` (3 scénarios : vide/valide/corrompu).
- **Erreurs console** : ✅ 0 sur l'ensemble des scénarios E2E (public,
  SEO, accessibilité, outils enseignants).

## Risques restants

- **Gestion du focus des dialogs non corrigée** dans
  `TeacherLogbookClient.tsx` et `TeacherLessonPreparationClient.tsx` (même
  schéma que les bugs 2 corrigés, identifié par recherche de code, hors
  périmètre des 3 outils enseignants représentatifs de ce chantier).
- **`tablet-chromium` et `mobile-chromium` dans ce conteneur d'exécution
  sandboxé** : `tablet-chromium` échoue au lancement du navigateur
  (`Running as root without --no-sandbox`, corrigé) puis à l'initialisation
  (services D-Bus système absents du conteneur, requis par l'émulation
  tactile/mobile de Chromium — `Failed to connect to the bus`) ; un test
  sur `mobile-chromium` (menu mobile) est occasionnellement instable pour
  la même raison. Ce n'est pas un défaut du produit ni de la suite : les
  57 tests `desktop-chromium` couvrant exactement les mêmes assertions
  passent intégralement, et un environnement CI standard (ex. GitHub
  Actions Ubuntu) dispose de D-Bus. À vérifier dans un tel environnement
  avant d'en tirer une conclusion sur le rendu responsive réel.
  `playwright.config.ts` a été ajusté (`--no-sandbox` conditionnel à la
  variable `PLAYWRIGHT_CHROMIUM_EXECUTABLE`, utilisée uniquement dans ce
  type d'environnement) pour lever le premier blocage sans affecter un
  environnement correctement provisionné.
- **Version de Chromium pré-installée non alignée** avec celle attendue
  par `@playwright/test` dans cet environnement : contournée via la
  variable d'environnement `PLAYWRIGHT_CHROMIUM_EXECUTABLE` (chemin vers
  le binaire local), sans dépendance réseau. À définir dans l'environnement
  d'exécution CI cible si le même écart existe.
  Optionnelle (les scripts fonctionnent sans, tant que le Chromium
  attendu par la version installée de `@playwright/test` est disponible).
- **Test « ressource non disponible » de `public-resources.spec.ts`** se
  saute lui-même si aucune ressource au statut « en préparation »
  n'existe dans le catalogue au moment du run (dépendant du contenu
  éditorial, pas du code) — actuellement non sauté (le catalogue en
  contient), signalé pour information.
- Aucun autre risque réel identifié dans le périmètre testé.

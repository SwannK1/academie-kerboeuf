# Tests de non-régression — Académie Kerboeuf

Rapport du chantier de mise en place et de consolidation des tests
automatisés. Branche : `claude/gouvernance-statuts-ressources-kjgw6e`,
commit `3a6f48e`.

## 1. État initial

**Outillage trouvé** : Playwright (`@playwright/test@1.61.1`) déjà installé
et configuré (`playwright.config.ts`), aucun Vitest/Jest/React Testing
Library, aucun script d'audit de routes, aucun outil d'accessibilité
automatisée.

**Scripts `package.json` existants** : `dev`, `build`, `start`, `lint`,
`test:e2e`, `test:e2e:ui`. Pas de `typecheck` dédié, pas de script
`validate`.

**Tests existants** : 2 fichiers dans `e2e/` —
`teacher-progression-panel.spec.ts` et
`teacher-programmation-annuelle-panel.spec.ts`, 5 tests chacun (10 au
total), couvrant exclusivement le comportement d'un panneau latéral
(ouverture, Échap, clic extérieur, clic intérieur, bouton fermer) sur deux
outils enseignants. Un helper partagé existait déjà :
`e2e/utils/console-errors.ts` (`trackConsoleErrors`).

**Exécutable au départ ?** Non, dans cet environnement précis : le
`@playwright/test` épinglé attend une révision Chromium (1228) différente
de celle pré-installée (1194), et la CI (`.github/workflows/ci.yml`)
n'exécutait ni les tests existants ni aucun typecheck — seulement
`lint` puis `build`.

**Couverture fonctionnelle réelle avant ce chantier** : 0 test unitaire, 0
test de statut/CTA, 0 test SEO, 0 test d'accessibilité, 0 audit de routes,
2 outils enseignants sur ~25 couverts (uniquement leur panneau latéral).

**Principales lacunes identifiées** : aucune protection sur les règles de
publication (`available`/`partial`/`preparing`/`coming-soon`), aucune
protection sur les routes/liens, aucune protection SEO ou accessibilité,
aucun test unitaire des helpers centraux issus des chantiers précédents.

## 2. Cartographie des risques

| Zone | Gravité | Probabilité | Test retenu | Justification |
|---|---|---|---|---|
| CTA actif sur contenu non disponible | Critique | Élevée (déjà survenu 2×) | E2E (`missions-et-statuts`, `ressources-et-parcours`) | Bug réel corrigé lors des 2 chantiers précédents ; risque de régression directe si un composant réimplémente localement la règle |
| Lien mort mission/parcours (route inexistante) | Critique | Moyenne | E2E + `check-routes.mjs` | Bug réel déjà trouvé et corrigé (`/parcours/6e-entrer-au-college-avec-methode`) |
| Normalisation de statut (available/partial/preparing/coming-soon) | Critique | Faible (référentiel central déjà consolidé) | Unitaire (`public-status.spec.ts`) | Le référentiel est petit et pur : le niveau de test le plus simple suffit |
| Mission vide affichée comme disponible | Critique | Faible | Unitaire (`publication-guards.spec.ts`) | `hasRealMissionContent` est une fonction pure, testable sans navigateur |
| Hydratation React (erreurs #418/#425) | Élevée | Moyenne (pattern récurrent, cf. git log) | E2E — assertion sur erreurs console/`pageerror` | Doit s'observer dans un vrai navigateur ; un vrai bug de ce type a été trouvé pendant ce chantier |
| Panneaux latéraux (dialogs) enseignants | Élevée | Moyenne (~10 outils partagent le même moteur) | E2E existant + 1 nouveau représentant (a11y) | Déjà couvert pour 2 outils ; pas besoin de dupliquer pour chaque outil identique |
| Plan de classe (déplacement, étiquettes, persistance) | Élevée | Moyenne | E2E dédié | Seul outil avec interaction pointeur (glisser) + `localStorage` combinés |
| Titres SEO dupliqués | Moyenne | Élevée (bug réel trouvé sur 97 pages) | E2E (`seo-technique`) | Régression silencieuse, invisible sans test automatisé |
| 404 / robots / sitemap | Moyenne | Faible | E2E + `check-routes.mjs` | Peu de logique, mais impact SEO direct en cas de régression |
| Accessibilité de base (main, H1, dialogs, clavier) | Moyenne | Moyenne | E2E + axe | Un vrai H1 manquant a été trouvé sur `/primaire` |
| Emploi du temps / cahier journal | Secondaire | Faible | E2E minimal (smoke + 1 scénario) | Fonctionnalités réelles mais moins critiques que le plan de classe |
| Toutes les combinaisons de filtres `/ressources` | Secondaire | Faible | Non testé exhaustivement | Le risque réel (CTA non gaté) est couvert ; tester chaque combinaison de filtre n'apporte rien de plus |
| Contenu pédagogique exact (textes de missions) | Négligeable | — | Non testé | Hors périmètre explicite ("pas d'assertions sur le contenu pédagogique complet") |

## 3. Tests ajoutés ou consolidés

### Unitaires (`tests/unit/`, config `playwright.unit.config.ts`, sans navigateur)

| Fichier | Scénario | Risque couvert | Niveau |
|---|---|---|---|
| `public-status.spec.ts` | Normalisation des 4 clés canoniques + anciennes valeurs FR/EN (`upcoming`, `in-progress`, `disponible`...) ; `isPubliclyAvailable`/`isPubliclyLinkable` strict vs souple ; repli sur `preparing` jamais `available` | Référentiel central de statuts | Unitaire |
| `mission-registry.spec.ts` | `getMissionHref` (CM2/lycée/primaire hors CM2/collège) ; `isMissionDetailLinkable` | Construction d'URL de mission, cause du lien mort corrigé précédemment | Unitaire |
| `publication-guards.spec.ts` | `hasRealMissionContent` (mission vide, placeholder détecté, questions/correction vides) ; `isMissionPubliclyAvailable` ; équivalence exacte `isPedagogicalResourceLinkable` ↔ `isPubliclyAvailable` | "Une ressource sans contenu réel n'est pas disponible" / "une mission vide n'est jamais terminée" | Unitaire |

### End-to-end (`e2e/`, config `playwright.config.ts`, 3 profils : desktop/tablette/mobile)

| Fichier | Scénario | Risque couvert |
|---|---|---|
| `public-pages.spec.ts` | Accueil (200, main, nav, erreurs console), navigation vers primaire/collège/lycée (avec menu mobile), 3 pages niveau, 2 pages matière | Régression d'affichage/navigation sur les pages les plus visitées |
| `ressources-et-parcours.spec.ts` | Filtre Statut, CTA actif si disponible / absent sinon, fichier PDF réel, ouverture de parcours, étape disponible ouvrable, absence de lien mort collège | Gouvernance de publication déjà corrigée 2 fois |
| `missions-et-statuts.spec.ts` | 3 sections de `/missions-recentes` sans CTA trompeur, mission disponible vs non disponible (404 propre), badge "Partiel" distinct sur `/programmes` | Matrice de statuts + CTA |
| `seo-technique.spec.ts` | Titre unique sans suffixe dupliqué (5 pages), description/robots/OG/Twitter présents, breadcrumb structuré, `/robots.txt`, `/sitemap.xml`, 404 sans contradiction d'indexation | Anomalie SEO réelle trouvée et corrigée |
| `accessibilite.spec.ts` | main+H1 uniques et 0 violation axe critique/sérieuse sur 5 pages, focus clavier visible, dialog nommé + focus rendu au déclencheur | Anomalies réelles trouvées (H1 manquant, tableau non accessible au clavier) |
| `outils-enseignants.spec.ts` | Plan de classe (ouverture, glisser une table, rotation, étiquettes, persistance), emploi du temps (grille + impression), cahier journal (grille + création de séance + persistance) | Principal périmètre interactif du site |

Le focus/Échap/clic-extérieur des panneaux latéraux n'est **pas** dupliqué :
les 2 specs existantes (`teacher-progression-panel`,
`teacher-programmation-annuelle-panel`) servent déjà de représentants pour
ce comportement partagé par ~10 outils.

### Script d'audit (`scripts/check-routes.mjs`)

Démarre un serveur dédié (build géré séparément par le pipeline de
validation), vérifie ~23 routes critiques (`--quick`) ou effectue en plus
un crawl 1 niveau depuis 13 pages de seed pour couvrir tous leurs liens
internes (mode complet), ignore mailto/tel/ancres/liens externes,
distingue 2xx/redirection/404/5xx, arrête toujours le serveur (process
group tué explicitement, sortie forcée en fin de script).

## 4. Bugs découverts

Tous trouvés par inspection préalable aux tests ou par un test qui
échouait avant correction ; chacun corrigé au minimum requis.

| # | Page/composant | Attendu | Observé | Cause | Correction | Test de non-régression |
|---|---|---|---|---|---|---|
| 1 | 97 pages (`app/**/page.tsx`) | `<title>X \| Académie Kerboeuf</title>` (suffixe ajouté une fois par le layout racine) | `<title>X \| Académie Kerboeuf \| Académie Kerboeuf</title>` | Chaque page ajoutait manuellement le suffixe déjà géré par `title.template` du layout racine | Suffixe manuel retiré mécaniquement (script de substitution ciblé, vérifié sur les 97 occurrences + 1 variante à tiret cadratin) | `seo-technique.spec.ts` › "un seul `<title>`, pas de suffixe dupliqué" |
| 2 | `/enseignants/progression` | Pas d'erreur d'hydratation | `Error: Hydration failed...` (React #418) sur la bannière de statut du stockage | `readStoredCardsChecked()` lu via `useMemo(..., [])` pendant le rendu : `localStorage` absent côté serveur, présent côté client → arbre différent | Lecture déplacée dans un `useEffect` post-montage ; l'effet d'écriture existant est gardé par un flag `hasLoadedStorage` pour ne jamais écraser une sauvegarde avant la fin du chargement initial | `accessibilite.spec.ts` › test du dialog de progression (échouait avant correction, capturé par `pageerror`) |
| 3 | `/primaire` | Un `<h1>` présent | Aucun `<h1>` sur la page (portail composé uniquement d'images) | `PrimairePortalMap` n'a aucun texte, la page ne définissait aucun titre | `<h1 className="sr-only">` ajouté en tête de page (aucun changement visuel) | `accessibilite.spec.ts` › présence d'un H1 unique |
| 4 | Page 404 | Une seule intention d'indexation cohérente | Deux `<meta name="robots">` contradictoires : `index, follow` (hérité du layout racine) et `noindex` (injecté par Next.js pour les 404) | `app/not-found.tsx` ne déclarait aucune métadonnée propre | `robots: { index: false, follow: false }` + titre explicite ajoutés à `not-found.tsx` | `seo-technique.spec.ts` › 404 sans directive contradictoire |
| 5 | Panneau "Progression par matière" (`TeacherPeriodProgressionClient`) | Tableau à défilement horizontal accessible au clavier | Violation axe `scrollable-region-focusable` (sérieuse) sur mobile | `<div className="overflow-x-auto">` sans `tabIndex`/`role` | `tabIndex={0}` + `role="region"` + `aria-label` ajoutés | `accessibilite.spec.ts` › dialog de progression, 0 violation critique/sérieuse |
| 6 | Environnement de test lui-même | Les 2 specs existantes s'exécutent | `browserType.launch` échoue (révision Chromium différente, sandbox root, moteur WebKit du preset iPad) | Pas un bug applicatif — incompatibilité `@playwright/test` épinglé ↔ binaire pré-installé de cet environnement | `executablePath` + `--no-sandbox` conditionnels (uniquement si le binaire local existe) + moteur forcé en Chromium pour le projet tablette | Les 159 tests E2E passent désormais sur les 3 profils |

## 5. Tests non créés

- **Toutes les combinaisons de filtres `/ressources`** (niveau × matière ×
  difficulté × mode) : le risque réel (CTA non gaté par statut) est déjà
  couvert ; tester chaque combinaison n'apporterait rien de plus pour un
  coût de maintenance disproportionné.
- **Glisser-déposer natif HTML5 des étiquettes** (plan de classe,
  `draggable`/`onDragStart`) : Playwright ne simule pas nativement les
  événements `dragstart`/`dragover`/`drop` de façon fiable (contrairement
  au déplacement par pointeur des tables, testé). Le coût de stabilisation
  dépasserait le bénéfice ; le test retenu couvre le déplacement (tables,
  API pointeur) et le CRUD d'étiquettes (bouton), qui exercent le même
  état applicatif.
- **~19 autres outils enseignants** (affichages, ateliers, bibliothèque
  classe, conseils, dossier remplaçant, évaluations, formations,
  photocopies, projets/sorties, rituels...) : tous utilisent le même moteur
  de panneau latéral déjà couvert par les 2 specs existantes + le nouveau
  test d'accessibilité. Créer un scénario dédié par outil dupliquerait le
  même comportement sans risque supplémentaire réel identifié.
- **JSON-LD structuré / balises canonical** : n'existent pas du tout sur le
  site (vérifié à l'inspection). Écrire un test qui échouerait
  systématiquement pour une fonctionnalité absente serait trompeur ;
  signalé en risque restant (§10) plutôt que testé.
- **Titres/descriptions exacts de chaque page** : contraire explicite du
  principe demandé (pas d'assertion sur le contenu pédagogique complet) ;
  seules la présence et la cohérence structurelle sont vérifiées.
- **CI complète avec E2E navigateur** : nécessiterait `playwright install
  --with-deps` (téléchargement de binaires, nouvelle surface
  d'infrastructure CI). Seuls typecheck + tests unitaires (rapides, sans
  navigateur) ont été ajoutés à la CI existante ; l'E2E complet reste une
  commande locale documentée (§9), conformément à "ne pas créer une
  nouvelle infrastructure CI complexe".

## 6. Fichiers modifiés (liste exacte)

### Nouveaux fichiers

```
tests/unit/public-status.spec.ts
tests/unit/mission-registry.spec.ts
tests/unit/publication-guards.spec.ts
playwright.unit.config.ts
e2e/public-pages.spec.ts
e2e/ressources-et-parcours.spec.ts
e2e/missions-et-statuts.spec.ts
e2e/seo-technique.spec.ts
e2e/accessibilite.spec.ts
e2e/outils-enseignants.spec.ts
scripts/check-routes.mjs
docs/tests-non-regression.md (ce rapport)
```

### Fichiers de configuration/outillage modifiés

```
package.json                       — scripts typecheck/test:unit/routes:check(:quick)/validate(:quick)
package-lock.json                  — @axe-core/playwright ajouté
playwright.config.ts               — compatibilité environnement (Chromium local, sandbox, moteur tablette), timeout
.github/workflows/ci.yml           — étapes Typecheck + Unit tests ajoutées
```

### Corrections applicatives (bugs réels, §4)

```
app/not-found.tsx                                          — bug #4
app/primaire/page.tsx                                       — bug #3
components/academy/TeacherPeriodProgressionClient.tsx       — bugs #2 et #5
components/teacher-classroom-layout/TeacherClassroomLayoutClient.tsx — data-testid (sélecteur de test stable, aucun changement fonctionnel)
```

### Correction mécanique du suffixe de titre dupliqué (bug #1)

97 fichiers sous `app/**/page.tsx` (liste complète disponible via
`git show 3a6f48e --stat`) : uniquement la valeur du champ `title` dans
`export const metadata` / `generateMetadata`, aucun autre changement.

## 7. Mesures avant/après

| Mesure | Avant | Après |
|---|---|---|
| Fichiers de tests | 2 (e2e uniquement) | 11 (3 unitaires + 8 e2e) |
| Tests (source, appels `test(...)`) | 10 | 41 e2e + 31 unitaires = 72 |
| Tests exécutés réellement (Playwright, tous profils) | 30 (10 × 3 profils, **non exécutables** dans cet environnement avant correctif) | 159 e2e (3 profils) + 31 unitaires = 190 |
| Parcours E2E critiques couverts | 1 (panneaux latéraux) | 7 (accueil/nav, ressources/parcours, missions/statuts, SEO, a11y, outils enseignants, panneaux latéraux) |
| Routes critiques couvertes par un audit automatisé | 0 | 23 (mode rapide) / 128+ liens (mode complet) |
| Outils enseignants avec un scénario dédié | 2 (panneau seulement) | 5 (progression, programmation annuelle, plan de classe, emploi du temps, cahier journal) |
| Règles métier centrales couvertes par un test unitaire | 0 | 4 (normalisation statut, `isPubliclyAvailable`/`isPubliclyLinkable`, `getMissionHref`/`isMissionDetailLinkable`, `hasRealMissionContent`) |
| Durée suite unitaire | — | ~1s |
| Durée suite E2E (3 profils, 159 tests) | non mesurable (ne s'exécutait pas) | ~2min |
| Tests en échec | — (inexécutable) | 0 |
| Tests instables (flaky) observés | — | 0 sur la dernière exécution complète (1 timeout isolé observé une fois sous charge, résolu par l'ajustement du timeout global) |

## 8. Résultats de validation

```
npm run lint            → OK (1 warning préexistant, sans rapport avec ce chantier)
npm run typecheck        → OK, 0 erreur
rm -rf .next && npm run build → OK, exit 0
npm run test:unit        → OK, 31/31
npx playwright test      → OK, 159/159 (desktop-chromium, tablet-chromium, mobile-chromium)
node scripts/check-routes.mjs (mode complet) → OK, 128 liens 2xx, 1 redirection connue (/professeurs/felix), 0 lien mort
```

Aucune erreur console, aucune erreur d'hydratation, aucune exception JS
observée dans la suite finale (celles trouvées en cours de chantier — §4 —
ont été corrigées).

## 9. Commandes utiles

| Commande | Usage |
|---|---|
| `npm run validate:quick` | Validation rapide avant commit : lint + typecheck + tests unitaires (~5s) |
| `npm run test:unit` | Tests unitaires seuls (helpers de statuts/publication) |
| `npm run test:e2e` | Suite E2E complète (3 profils, build + serveur gérés automatiquement) |
| `npm run test:e2e:ui` | Suite E2E en mode interactif Playwright |
| `npm run routes:check:quick` | Audit rapide des routes critiques (~15s, réutilise un build existant si présent) |
| `npm run routes:check` | Audit complet : build propre + crawl des liens internes |
| `npm run validate` | Validation avant fusion : lint + typecheck + build propre + tests unitaires + E2E + audit rapide des routes |

## 10. Risques restants

- **Pattern de lecture `localStorage` en dehors d'un `useEffect`** : le bug
  #2 (hydratation) suit un pattern déjà corrigé ailleurs dans le code
  (`git log` : "improve teacher localStorage resilience", "avoid backup
  page hydration mismatch"...). Il est probable que d'autres des ~25
  outils enseignants aient un pattern similaire non détecté (mes tests
  vident systématiquement `localStorage` avant chaque scénario, ce qui
  masque un éventuel écart serveur/client si aucune donnée n'est
  encore stockée). Un audit dédié — hors périmètre de ce chantier — serait
  nécessaire pour les couvrir tous. Méthode recommandée : rechercher
  `useState(() => read...())` et `useMemo(() => read...(), [])` combinés à
  une lecture `localStorage`, et vérifier qu'aucun ne s'exécute pendant le
  rendu initial.
- **Absence de canonical et de JSON-LD structuré** : confirmé absent sur
  tout le site (§5). Non corrigé ici (fonctionnalité à construire, pas un
  bug à réparer) — à traiter comme un chantier SEO dédié si souhaité.
- **OpenGraph/Twitter non spécifiques par page** : toutes les pages
  partagent actuellement le même titre/description OG hérités du layout
  racine (`app/layout.tsx`) — aucune page n'a de bloc `openGraph`/`twitter`
  propre. Le test vérifie la *présence* (conforme à la demande), pas la
  *spécificité par page*, qui resterait à construire.
- **E2E non exécuté en CI** : seuls lint/typecheck/build/tests unitaires
  tournent en CI. L'ajout de l'E2E complet nécessiterait
  `playwright install --with-deps` et un budget CI plus long — décision
  volontairement laissée à une prochaine itération plutôt qu'imposée ici.
- **Glisser-déposer HTML5 natif des étiquettes** (plan de classe) : non
  testé (§5) — un bug de cette interaction précise ne serait pas détecté
  automatiquement.
- **Le script `check-routes.mjs` en mode complet ne suit qu'un niveau de
  profondeur** depuis les pages de seed : un lien mort accessible
  uniquement à 2 clics ou plus d'une page de seed ne serait pas détecté.
  Compromis assumé pour garder l'audit rapide (§8 : ~90s pour 128+ liens).

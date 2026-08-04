# Rapport — Suite de non-régression, Académie Kerboeuf

Branche : `claude/e2e-regression-suite`
Base : `fix/hydration-progression-v1` fusionnée avec `origin/claude/link-route-integrity-audit`

## 1. Choix de la branche source

Aucune branche existante ne réunissait à elle seule les quatre prérequis demandés (dernier audit
d'intégrité, correctif d'hydratation de la progression, correctif APC validé, tests E2E existants).
Comparaison effectuée entre ~15 branches (`git log <branche> --oneline`, `git diff --stat`,
intersection de fichiers modifiés) :

- `fix/hydration-progression-v1` : contient le correctif d'hydratation React sur
  `/enseignants/progression` (commit `4e55570`) et les 13 tests E2E existants (panneaux latéraux
  progression/programmation, hydratation).
- `claude/link-route-integrity-audit` : contient le dernier audit d'intégrité des liens/routes
  (commit `4f19692`, `getMissionHref` centralisé, redirect Félix, slug `sciences`) et les scripts
  `scripts/link-audit/*.mjs` réutilisables.
- Aucune branche APC dédiée n'existe sur le dépôt à ce jour — point noté, pas de correctif APC à
  intégrer.
- Une fusion à N branches (incluant SEO, accessibilité, responsive, gouvernance-statuts) a été
  écartée : ~80-120 fichiers en conflit croisé entre plusieurs paires de branches, risque de perdre
  des correctifs déjà validés bien supérieur au bénéfice pour une tâche de finalisation de tests.

`claude/e2e-regression-suite` a été créée depuis `fix/hydration-progression-v1`, puis fusionnée
avec `claude/link-route-integrity-audit` (13 fichiers en conflit, tous résolus en conservant
l'intention des deux branches — voir historique de la branche, commit de fusion `998b3ee`).

**Écart constaté** : la branche `claude/gouvernance-statuts-ressources-*` qui introduit un
vocabulaire de statuts à 4 clés (`available`/`partial`/`preparing`/`coming-soon`) n'a pas été
fusionnée. Le système réellement présent sur cette branche est à 3 clés
(`available`/`upcoming`/`in-progress`, cf. `content/public-status.domain.ts`), avec une large table
de synonymes historiques. Les tests de statut ci-dessous couvrent le système **réellement présent**,
pas celui supposé par la consigne initiale.

## 2. Carte des risques (avant tests)

| Zone | Risque avant | Protection après |
|---|---|---|
| Statuts publics | Aucun test direct de `normalizePublicStatus` / synonymes | 7 tests unitaires, tous les groupes de synonymes couverts |
| Génération d'URL de mission | `getMissionHref` non testé : risque de lien vers une page `notFound()` | 6 tests unitaires, tous les cas de fallback (primaire non-CM2, collège, indisponible) |
| Routes canoniques (Félix, `sciences`, collège) | Pas de garde-fou automatisé sur ces règles de gouvernance | 7 tests unitaires dédiés |
| Sitemap / registre pages publiées | Générés par agrégation de ~15 sources, jamais vérifiés structurellement | 12 tests d'intégration |
| Parcours publics (accueil, ressources, missions, parcours, niveaux) | 0 test E2E | 23 tests E2E |
| Outils enseignants | 3 fichiers de tests existants (progression, programmation annuelle) ; plan de classe non couvert | +3 tests E2E (plan de classe), 13 tests existants conservés |
| SEO | Aucun test | 20 tests E2E (titre, description, OG/Twitter, canonical, JSON-LD, robots.txt, sitemap.xml, 404) |
| Accessibilité | Aucun test automatisé | 8 tests (5 audits axe-core + 3 ciblés) |
| Intégrité des routes/liens en continu | Scripts d'audit existants mais non rejoués automatiquement | Scripts orchestrés (`test:quick`, `test:routes`), rejouables à la demande |

## 3. Trois niveaux de tests

- **Niveau 1 — unitaire** (`tests/unit/`, `node:test` + `tsx`, aucun serveur requis) : statuts
  publics, `getMissionHref`, routes canoniques (Félix, `sciences`, collège), règle de lien PDF des
  fiches CM2 Maths, validation du registre de missions.
- **Niveau 2 — intégration** (`tests/integration/`) : sitemap (`app/sitemap.ts`), registre
  `published-subdomain-pages.ts` (route générique canonique CP/CE1/CE2).
- **Niveau 3 — E2E** (`e2e/`, Playwright, 3 projets desktop/tablette/mobile) : parcours publics,
  outils enseignants, SEO, accessibilité — chemins critiques uniquement, pas de couverture
  exhaustive artificielle.

## 4. Bugs réels découverts et corrigés

Cinq anomalies réelles ont été trouvées en écrivant les tests (aucune règle métier modifiée
arbitrairement ; chaque correctif est local et minimal) :

1. **`tablet-chromium` (infra de test)** : le préréglage Playwright `devices["iPad (gen 7)"]` vise
   WebKit par défaut ; combiné à l'exécutable Chromium forcé du sandbox, les 13 tests existants du
   projet tablette échouaient tous (`Target page, context or browser has been closed`). Corrigé en
   fixant explicitement `browserName: "chromium"` sur ce projet (`playwright.config.ts`).
2. **`/primaire` sans aucun `<h1>`** : le portail immersif plein écran n'affiche aucun titre visible
   et aucun composant de l'arborescence n'en rendait un — page sans repère d'accessibilité ni de
   SEO. Corrigé par un `<h1 className="sr-only">` portant le titre de page, sans changement visuel
   (`app/primaire/page.tsx`).
3. **Menu mobile sans fermeture au clavier** : contrairement aux deux panneaux enseignants
   (progression, programmation annuelle), le menu mobile du header (`SiteHeader.tsx`) ne se fermait
   pas avec Échap. Corrigé par un gestionnaire `keydown` conditionné à l'ouverture du menu.
4. **« Plan de classe » — boutons d'action de table inopérants au clic réel** : le conteneur de
   chaque table appelait `setPointerCapture` dès `pointerdown`, y compris quand le pointerdown
   provenait d'un bouton enfant (Pivoter/Agrandir/Réduire/Dupliquer/Supprimer) : le clic navigateur
   était ensuite retargeté vers le conteneur et le bouton ne recevait jamais son `onClick`. Bug réel
   affectant les utilisateurs (souris/tactile), pas seulement les tests. Corrigé en ignorant la
   capture de pointeur quand la cible du `pointerdown` est un bouton
   (`TeacherClassroomLayoutClient.tsx`).
5. **Orchestrateur d'audit de routes (infra de test)** : `next start` engendre un processus
   `next-server` enfant qui survit à l'arrêt du process `next` de premier niveau (réattaché à PID 1,
   port toujours occupé) — `test:routes` échouait par intermittence (`EADDRINUSE`) juste après
   `test:quick`. Corrigé en démarrant le serveur en groupe de processus détaché et en terminant tout
   le groupe (`scripts/link-audit/route-audit.mjs`).

Aucun autre correctif de contenu, de statut ou de route n'a été appliqué.

## 5. Fichiers modifiés / ajoutés

**Application (correctifs de bugs réels, 3 fichiers)** :
- `app/primaire/page.tsx` — H1 accessible ajouté.
- `components/academy/SiteHeader.tsx` — fermeture du menu mobile avec Échap.
- `components/teacher-classroom-layout/TeacherClassroomLayoutClient.tsx` — boutons de table
  cliquables.

**Tests unitaires/intégration (7 fichiers, nouveaux)** :
`tests/unit/public-status.test.ts`, `tests/unit/mission-href.test.ts`,
`tests/unit/canonical-routes.test.ts`, `tests/unit/cm2-fiches-maths.test.ts`,
`tests/unit/mission-registry-validation.test.ts`, `tests/integration/sitemap.test.ts`,
`tests/integration/published-subdomain-pages.test.ts`.

**Tests E2E (8 fichiers nouveaux + 1 étendu)** :
`e2e/public-home.spec.ts`, `e2e/public-resources.spec.ts`, `e2e/public-missions-recentes.spec.ts`,
`e2e/public-parcours.spec.ts`, `e2e/public-levels-subjects.spec.ts`, `e2e/seo.spec.ts`,
`e2e/accessibility.spec.ts`, `e2e/teacher-classroom-layout.spec.ts` ; `e2e/utils/console-errors.ts`
étendu (`trackPageHealth`, `assertPageIsHealthy` — détection ciblée hydratation + requêtes internes
en échec, en plus de `trackConsoleErrors` existant, conservé tel quel).

**Outillage (2 fichiers nouveaux)** :
`scripts/link-audit/quick-audit.mjs` (échantillon de 20 routes critiques),
`scripts/link-audit/route-audit.mjs` (orchestrateur réutilisant `extract-links.mjs`,
`verify-links.mjs`, `http-check.mjs` existants — aucune logique de crawl recréée).

**Configuration** : `playwright.config.ts` (projet tablette, `PLAYWRIGHT_CHROMIUM_PATH`,
`build:if-needed`), `package.json` (scripts + `tsx`/`@axe-core/playwright` en devDependencies),
`.gitignore` (sorties d'audit régénérées).

## 6. Scripts npm disponibles

| Script | Rôle | Serveur | Build |
|---|---|---|---|
| `npm run test:unit` | 41 tests unitaires/intégration (`node:test` + `tsx`) | non | non |
| `npm run test:e2e` | 62 tests E2E × 3 projets (Playwright) | géré automatiquement | si absent |
| `npm run test:a11y` | Sous-ensemble accessibilité (`e2e/accessibility.spec.ts`) | géré automatiquement | si absent |
| `npm run test:quick` | Audit d'échantillon (20 routes critiques) | géré, arrêté proprement | si absent |
| `npm run test:routes` | Audit complet (toutes les routes/liens/fichiers publics/sitemap) | géré, arrêté proprement | si absent |
| `npm run validate` | Pipeline complet : `rm -rf .next` → lint → tsc → build → tous les tests ci-dessus | — | 1 seul build pour tout le pipeline |

Tous les scripts à serveur démarrent/arrêtent leur propre instance de `next start` (groupe de
processus détaché, terminé proprement en fin de run), ne dépendent d'aucun serveur lancé
manuellement, et retournent un code de sortie non nul en cas d'anomalie.

## 7. Mesures avant / après

| Mesure | Avant | Après |
|---|---|---|
| Fichiers de test unitaires/intégration | 0 | 7 |
| Tests unitaires/intégration | 0 | 41 (41 passés) |
| Fichiers de spec E2E | 3 | 11 |
| Tests E2E (logiques, par projet) | 13 | 62 |
| Exécutions E2E totales (× 3 projets) | 39 | 186 (184 passés, 2 ignorés volontairement — voir §8) |
| Scripts npm de test | 2 (`test:e2e`, `test:e2e:ui`) | 8 |
| Dépendances de test | `@playwright/test` | + `tsx`, `@axe-core/playwright` |
| Routes générées (build) | 420 | 420 (inchangé) |
| Bugs applicatifs découverts et corrigés | — | 3 |
| Bugs d'infrastructure de test découverts et corrigés | — | 2 |
| Durée `test:unit` | — | < 1 s |
| Durée `test:e2e` (3 projets) | — | ≈ 1m 19s – 1m 30s |
| Durée `test:a11y` | — | ≈ 22 s |
| Durée `test:quick` | — | ≈ 5 s (hors démarrage serveur) |
| Durée `test:routes` (audit complet) | — | ≈ 10 s (hors démarrage serveur) |

Aucun pourcentage de couverture n'est avancé : seules des mesures réelles (comptages, durées) sont
rapportées.

## 8. Résultat de la validation finale

Séquence exécutée intégralement (`npm run validate`), un seul build pour tout le pipeline :

1. `rm -rf .next` puis `npm run lint` → **0 erreur**.
2. `npx tsc --noEmit` (après suppression de `.next`, conformément à la règle du projet) → **0 erreur**.
3. `npm run build` → succès, **420 routes générées** (vérifié via `.next/prerender-manifest.json`),
   aucune régression du nombre de routes.
4. `npm run test:unit` → **41/41 passés**.
5. `npm run test:e2e` (desktop + tablette + mobile) → **184/186 passés, 2 ignorés**. Les 2 tests
   ignorés sont le même test (« navigation principale : liens primaire, collège et lycée ») sur les
   projets tablette et mobile : la navigation desktop de `SiteHeader.tsx` est dans un conteneur
   `hidden lg:flex`, invisible sous le breakpoint `lg` — comportement normal de la page, pas une
   régression. Le menu mobile équivalent est couvert séparément par
   `accessibility.spec.ts`. Aucune erreur d'hydratation, aucune erreur console critique, aucun
   serveur laissé actif après le run.
6. `npm run test:a11y` → **24/24 passés** (5 pages auditées avec axe-core, tags `wcag2a`/`wcag2aa`,
   0 violation d'impact `serious`/`critical` ; aucune règle axe désactivée globalement).
7. `npm run test:quick` → **20/20 routes critiques OK** (200/3xx).
8. `npm run test:routes` (audit complet) → 418 pages HTML scannées, 309 fichiers publics référencés
   (0 absent), 381 routes internes référencées (0 sans correspondance), 380/381 requêtes HTTP en
   200, 1 redirect legacy attendu (`/primaire/ce1/lecons` → route canonique, conforme à AGENTS.md),
   **0 404, 0 erreur serveur**.

Aucun serveur de test laissé actif à l'issue du run (vérifié via `ss -ltnp` / recherche de processus
`next-server` orphelins après plusieurs exécutions consécutives). Aucune instabilité observée sur
plusieurs exécutions répétées de `test:quick` + `test:routes` à la suite (4 itérations).

## 9. Risques restants (non corrigés dans ce lot)

- **Pas de composant `Dialog` partagé** : les panneaux latéraux (`progression`, `programmation
  annuelle`, plan de classe futur) réimplémentent chacun leur propre logique d'ouverture/fermeture.
  Aucun des deux panneaux testés ne gère le focus initial ni le retour de focus au déclencheur à la
  fermeture (seuls Échap, clic extérieur et bouton ✕ sont garantis). Un focus trap standard (norme
  ARIA APG dialog) serait une amélioration future, hors périmètre de cette tâche (changement de
  comportement partagé, pas une simple correction locale).
- **Statuts à 4 clés non intégrés** : le système `available`/`partial`/`preparing`/`coming-soon`
  évoqué dans la consigne initiale n'existe pas sur cette branche (non fusionné, cf. §1). Si cette
  branche est fusionnée ultérieurement, les tests de statut de `tests/unit/public-status.test.ts`
  devront être étendus.
- **Pas de correctif APC** : aucune branche APC validée n'a été trouvée à fusionner ; si un futur
  correctif APC existe, l'outil « APC » n'a donc aucune protection E2E dans cette suite.
- **Drag-and-drop non testé** : le placement d'étiquette sur une table (Plan de classe) et les
  interactions de glisser-déposer HTML5 natif en général ne sont pas couverts par E2E — notoirement
  instables à simuler de façon fiable avec Playwright ; seules les actions pilotables au clic sont
  testées, conformément à la consigne de stabilité.
- **Redirect `/primaire/ce1/lecons`** : présent dans le HTML généré et suivi correctement (302 vers
  la route canonique), signalé par l'audit complet à titre informatif — conforme aux règles de
  redirect de compatibilité d'AGENTS.md, pas une anomalie.

## 10. Git

- Branche : `claude/e2e-regression-suite`
- Commit de fusion préalable : `998b3ee` (fusion de `claude/link-route-integrity-audit`)
- Pas de pull request créée (non demandé).

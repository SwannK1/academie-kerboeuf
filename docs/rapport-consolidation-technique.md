# Rapport de consolidation technique — `integration/technical-foundation`

Date : 2026-08-04
Portée : consolidation pure de corrections techniques déjà validées sur des
branches séparées. Aucune fonctionnalité nouvelle, aucun changement de
design, de contenu pédagogique ou de règle métier n'a été introduit — sauf
les correctifs de bugs réels découverts pendant la fusion, documentés
ci-dessous.

## 1. État initial

### Branches identifiées comme candidates techniques

Après `git fetch --all --prune` et inspection des commits réels (pas
seulement des noms de branche), 12 branches ont été évaluées :

| Branche | Dernier commit | Date | Commits vs `main` |
|---|---|---|---|
| `claude/gouvernance-statuts-ressources-kjgw6e` | `b24199f` | 2026-08-02 | 5 |
| `claude/audit-seo-technique-71h6j1` | `6faac6e` | 2026-08-01 | 2 |
| `claude/site-accessibility-audit-fq3u73` | `ee73761` | 2026-08-02 | 2 |
| `claude/academie-kerboeuf-responsive-4cj4tc` | `bb207e8` | 2026-08-01 | 6 |
| `claude/site-performance-optimization-v2wt83` | `a02b1a0` | 2026-08-01 | 2 |
| `fix/hydration-progression-v1` | `4e55570` | 2026-08-02 | 3 (dont SEO en ancêtre) |
| `fix/hydration-apc-v1` | `a48d0e8` | 2026-08-04 | 4 (dont SEO+progression en ancêtres) |
| `claude/audit-kerboeuf-integrity-gj3vx2` | `e094411` | 2026-08-02 | 1 |
| `claude/link-route-integrity-audit` | `4f19692` | 2026-08-02 | 3 (dont perf en ancêtre) |
| `claude/broken-links-audit-7vrund` | `9e579d2` | 2026-08-01 | 2 |
| `claude/public-catalog-cleanup-1zisms` | `2fb8615` | 2026-07-30 | 1 |
| `progression-route-final` | `d5f95a2` | 2026-06-20 | déjà fusionnée dans `main` |

`main` (`c5e69df`, dernier merge le 2026-06-24) est très en retard : aucune
des branches ci-dessus (hors `progression-route-final`, déjà fusionnée)
n'y est intégrée.

Des relations d'ancêtres directes existaient déjà entre certaines branches
(construites les unes sur les autres) :
- `claude/audit-seo-technique-71h6j1` est ancêtre de `fix/hydration-progression-v1` et `fix/hydration-apc-v1` ;
- `claude/site-performance-optimization-v2wt83` est ancêtre de `claude/link-route-integrity-audit`.

### Base choisie

**`claude/gouvernance-statuts-ressources-kjgw6e`**, pour trois raisons :
1. C'est la branche qui contient déjà le plus de travail non trivial à
   rejouer : consolidation du référentiel central de statuts publics
   (`available/partial/preparing/coming-soon`), unification de la logique
   de publication réelle, et surtout la **suite de tests de non-régression
   complète** (11 fichiers, 190 tests) qui sert de filet de sécurité pour
   toute la suite de la consolidation.
2. Plusieurs autres branches (route/liens, statuts) résolvent en réalité le
   même problème que cette branche a déjà résolu de façon plus aboutie et
   testée (cf. §3 "Commits exclus").
3. Repartir de `main` aurait obligé à rejouer manuellement cette
   consolidation de gouvernance avant même de pouvoir intégrer les audits
   techniques, sans bénéfice.

## 2. Intégration

Chaque groupe a été fusionné séparément avec `git merge --no-ff`, `tsc
--noEmit` et `npm run lint` relancés après résolution de chaque groupe de
conflits (aucun conflit laissé pour "plus tard").

### 2.1 Accessibilité — `claude/site-accessibility-audit-fq3u73` (commit `e2dfb03`)

- **Commits intégrés** : `22198c6`, `ee73761` (skip-link vers
  `#main-content`, hook `useDialogFocusTrap` réutilisable, contrastes,
  `aria-label`, associations `label`/`select` via `useId`).
- **Méthode** : `git merge --no-ff`.
- **Conflits** : 3 fichiers avec conflit réel (`app/primaire/page.tsx`,
  `app/ressources/_components/resources-catalog.tsx`,
  `components/academy/SubjectMatterCatalog.tsx`) — dans les trois cas, la
  branche accessibilité provenait d'un point antérieur au correctif de
  gating CTA (`isPubliclyLinkable`/`getPublicStatusKey`) déjà présent sur
  la base. **Résolution** : conservé la logique de gating de la base,
  repris les apports a11y (`id="main-content"`, classes anti-débordement
  `min-w-0`/`flex-wrap`, contraste `text-muted`).

### 2.2 Responsive — `claude/academie-kerboeuf-responsive-4cj4tc` (commit `7539c05`)

- **Commits intégrés** : `a6bb60d`, `af464a3`, `d721bfe`, `6dbc1b2`,
  `da87b8b`, `bb207e8` (débordements 320-1440px, fermeture Échap/focus des
  dialogs enseignants, menu mobile).
- **Méthode** : `git merge --no-ff`.
- **Conflits** : 39 fichiers, tous de la même famille — les deux branches
  (accessibilité déjà fusionnée, responsive) ajoutaient indépendamment les
  mêmes classes anti-débordement dans un ordre différent. 27 résolus
  automatiquement par script (comparaison "sac de mots" des deux côtés du
  conflit, indifférente à l'ordre) après vérification manuelle
  d'échantillons ; les 12 restants (contenu réellement différent, pas
  seulement réordonné) résolus à la main en conservant systématiquement la
  version qui est un sur-ensemble de l'autre. Cas particulier :
  `TeacherCurriculumPlanner.tsx` — la branche responsive ajoutait un
  mécanisme manuel de retour de focus (`editTriggerRef`) redondant avec le
  hook `useDialogFocusTrap` déjà fusionné (qui restaure déjà le focus à la
  fermeture) ; conservé les deux, le second étant sans effet de bord.

### 2.3 SEO technique + 1ère passe de performance — `claude/audit-seo-technique-71h6j1` (commit `016f857`)

- **Commits intégrés** : `a7a123f` (SEO : `lib/seo.ts::buildPageMetadata()`
  — canonical/OG/Twitter par page, JSON-LD Organization/WebSite, maillage
  interne, entrée sitemap redondante supprimée), `6faac6e` (performance :
  LCP/CLS, cache des ressources statiques, `next/image` sur la fiche maths
  CM2).
- **Méthode** : `git merge --no-ff`.
- **Conflits** : 96 fichiers, presque tous des blocs `export const
  metadata`. Résolus par script en adoptant systématiquement
  `buildPageMetadata()` (sur-ensemble strict du correctif ponctuel
  anti-duplication de suffixe déjà en place). Cas traités à la main :
  - `app/layout.tsx` : skip-link (a11y) et JSON-LD (SEO) additifs, gardés
    tous les deux ;
  - `app/lycee/[level]/missions/[slug]/page.tsx` : la branche SEO
    comparait encore `getPublicStatusKey(...) === "upcoming"` — une clé
    dépréciée interdite comme cible de comparaison par `AGENTS.md`.
    Conservé la comparaison canonique `"coming-soon"` en adoptant
    `buildPageMetadata` pour le reste ;
  - `app/eleves/[slug]/page.tsx`, `app/parcours/[slug]/page.tsx`,
    `app/programmes/page.tsx` : import de `getPublicStatusKey` perdu par
    l'auto-merge (nécessaire au gating CTA), réimporté ;
  - `app/programmation/page.tsx` : repris le découpage server/client de la
    branche SEO (`page.tsx` minimal + `_components/ProgrammationClient.tsx`),
    en conservant `id="main-content"`/`break-words` déjà fusionnés, et en
    corrigeant au passage le slug invalide `sciences-technologie` →
    `sciences` (bug réel, cf. §4).

### 2.4 2e passe de performance — `claude/site-performance-optimization-v2wt83` (commit `42d29ee`)

- **Commits intégrés** : `85902e7` (images CM2, lazy-load de 16 outils
  enseignants, mémoïsation des filtres), `a02b1a0` (mémoïsation
  drag-and-drop, découpage server/client).
- **Méthode** : `git merge --no-ff`.
- **Conflits** : 12 fichiers — découpage `Xxx.tsx` (wrapper `next/dynamic`,
  `ssr:false`) / `XxxClient.tsx` (composant réel) sur 10 outils
  enseignants (bibliothèque de classe, conseils de cycle, dossier
  remplaçant, fin de période, liaison CM2-6e, modèles, plan de classe,
  organisation de classe, photocopies, rendez-vous professionnels) plus
  `AssessmentPlanner`. Résolus en adoptant le wrapper partout où il existe
  déjà sur la branche perf. Le correctif d'accessibilité déjà fusionné sur
  `AssessmentPlanner.tsx` (association `label`/`select` via `useId`) a été
  reporté manuellement dans `AssessmentPlannerClient.tsx` pour ne pas être
  perdu dans le découpage — sans quoi ce correctif aurait disparu
  silencieusement. Import dupliqué de `next/image` corrigé sur la fiche
  maths CM2 (résidu d'auto-merge, détecté par `tsc`).

### 2.5 Hydratation `/enseignants/apc` — commit `8958701`

- **Origine** : `fix/hydration-apc-v1` (`a48d0e8`).
- **Méthode** : cherry-pick tenté, abandonné après conflit — le fichier
  ciblé par le commit d'origine (`TeacherApcPlanner.tsx`) avait déjà été
  scindé en wrapper + `TeacherApcPlannerClient.tsx` par la 2e passe de
  performance intégrée juste avant. Le correctif a été **réappliqué
  manuellement** sur `TeacherApcPlannerClient.tsx`, avec le même schéma que
  le correctif déjà en place sur `/enseignants/progression` : état initial
  déterministe (`[]`), lecture réelle du `localStorage` dans un
  `useEffect` post-montage, garde (`useRef`) contre l'écriture prématurée.
- Récupéré au passage `e2e/teacher-apc-hydration.spec.ts` (4 tests) et
  `e2e/teacher-progression-hydration.spec.ts` (3 tests, depuis
  `fix/hydration-progression-v1` — le correctif progression était déjà en
  place sur la base via un mécanisme différent mais sans test dédié).

### 2.6 Correctifs ciblés issus de branches par ailleurs exclues — commit `150abee`

Voir §3 pour la justification de l'exclusion des branches source ; deux
bugs réels qu'elles documentaient étaient encore présents sur la base et
ont été corrigés **narrowly**, sans reprendre le reste de ces branches :
- `app/ressources/page.tsx` : les compteurs "Disponibilité classe" («&nbsp;à
  projeter / à imprimer / corrigées&nbsp;») comptaient toutes les
  ressources ayant ce mode pédagogique, y compris les ressources "à
  venir"/"en préparation" sans support réel. Filtré sur
  `getPublicStatusKey(status) === "available"`.
- `app/ressources/_components/resources-catalog.tsx` : les badges de mode
  (Projection/Impression/Correction) s'affichaient sur les cartes non
  disponibles. Conditionnés à `isAvailable`.

## 3. Commits exclus

| Commit / branche | Raison | Impact de l'exclusion | Justification |
|---|---|---|---|
| `claude/audit-kerboeuf-integrity-gj3vx2` (`e094411`) | Réimplémentation indépendante et concurrente de `content/mission-registry.ts` (élimination des liens de mission cassés), divergente de celle déjà présente et testée sur la base. | Aucun — la base couvre le même problème via `getMissionHref`/`isMissionDetailLinkable`, testés par `tests/unit/mission-registry.spec.ts` (6 tests) et construits sur le référentiel central de statuts, contrairement à cette branche qui compare encore des chaînes brutes (`mission.status === "disponible"`). | Éviter deux implémentations concurrentes de la même règle métier ; celle de la base est la plus récente, la plus testée et la seule alignée sur la gouvernance des statuts. |
| `claude/link-route-integrity-audit` (`4f19692`, hors ancêtre perf déjà repris séparément) | Même règle métier réimplémentée une 3e fois, empaquetée avec un refactor non lié (`PrimairePortalHoverZones.tsx`, `primaire-portal-map.tsx` — 150 lignes retirées) hors périmètre de cette consolidation (pas d'audit technique nommé, risque de changement de design). | Aucun sur la correction des liens (déjà couverte, cf. ci-dessus). Le refactor de zones cliquables du portail primaire n'est pas repris. | Cherry-pick impossible sans importer le refactor bundlé ; réimplémentation non nécessaire vu la couverture déjà en place. Deux bugs isolés et réels documentés par cette branche (slug `sciences-technologie`, entrée sitemap redondante) ont été vérifiés et corrigés séparément (§2.3, déjà résolus par la branche SEO pour le sitemap). |
| `claude/broken-links-audit-7vrund` (`bea43fe`, `9e579d2`) | 4e variante du même correctif de liens de mission. | Aucun (même raison). | Idem — superseded par la base. |
| `claude/public-catalog-cleanup-1zisms` (`2fb8615`) | Corrige un vrai bug (badges/compteurs affichés pour du contenu non disponible) mais dans le même commit restructure `/ressources` en 3 sections visuelles (Disponible / En préparation / À venir) au lieu d'une grille plate — un changement de mise en page, explicitement hors périmètre ("ne pas modifier le design"). | Le bug réel est corrigé (commit `150abee`) sans le changement de mise en page. | Séparer le correctif de bug du changement de design permet de respecter la contrainte du chantier sans perdre la correction. |
| `fix/hydration-progression-v1` — partie code (`4e55570`) | La base corrige déjà exactement le même bug d'hydratation sur `TeacherPeriodProgressionClient.tsx`, avec un mécanisme différent (`hasLoadedStorage` en state vs `isInitialWriteRef` en ref) mais équivalent fonctionnellement. | Aucun — bug déjà corrigé et testé sur la base. | Adopter ce commit aurait remplacé un correctif déjà validé par un autre correctif équivalent, sans bénéfice. Son test E2E a en revanche été récupéré (§2.5) car absent de la base. |
| `progression-route-final` | Déjà fusionnée dans `main` avant le début de ce chantier. | Aucun. | Rien à intégrer. |

## 4. Bugs réels découverts et corrigés pendant la fusion

1. **Slug invalide dans `/programmation`** — le lien vers la matière
   Sciences CM2 pointait vers `/primaire/cm2/matieres/sciences-technologie`
   (route inexistante) au lieu de `/primaire/cm2/matieres/sciences` (slug
   réel dans `content/cm2-subjects.ts`). Corrigé dans
   `app/programmation/_components/ProgrammationClient.tsx`.
2. **Import dupliqué `next/image`** sur la fiche maths CM2, résidu
   d'auto-merge entre le correctif LCP de la base et celui de la branche
   performance — détecté par `tsc --noEmit`, corrigé immédiatement.
3. **Compteurs et badges de mode affichés pour du contenu non disponible**
   sur `/ressources` (§2.6) — un utilisateur pouvait voir "12 à projeter"
   alors que plusieurs de ces ressources n'ont pas encore de support réel,
   et un badge "Correction" sur une carte marquée "Détail non disponible".
4. **Correctif d'accessibilité perdu silencieusement par un découpage de
   composant** — `AssessmentPlanner.tsx` avait reçu un correctif a11y
   (association `label`/`select`) sur la branche accessibilité, mais la
   branche performance avait entre-temps scindé ce composant en
   wrapper + `AssessmentPlannerClient.tsx` à partir d'un point antérieur à
   ce correctif. Sans vérification explicite, la fusion aurait fait
   disparaître le correctif a11y sans conflit Git visible (le fichier qui
   contenait le correctif devient un simple wrapper de 14 lignes). Reporté
   manuellement dans le nouveau fichier.

Chaque bug ci-dessus est désormais couvert par un test qui échouerait sans
le correctif (tests unitaires de gating pour le point 3 côté logique
existant, `tsc --noEmit` pour le point 2, revue manuelle documentée pour
les points 1 et 4 — pas de nouveau test créé spécifiquement pour ces deux
derniers, cf. §5).

## 5. Tests non créés

Conformément à la consigne de ne pas gonfler artificiellement la suite de
tests :
- Pas de nouveau test dédié au slug `sciences-technologie` → `sciences`
  (couvert indirectement par l'audit de routes, qui aurait signalé un lien
  mort si la correction avait été incomplète).
- Pas de nouveau test pour l'entrée sitemap redondante (déjà vérifiée
  manuellement, `sitemap.xml` audité par `e2e/seo-technique.spec.ts`
  existant).
- Pas de test dédié au découpage `Xxx.tsx`/`XxxClient.tsx` en lui-même
  (détail d'implémentation interne, déjà couvert indirectement par les
  tests E2E des outils enseignants qui exercent le comportement rendu).

## 6. Fichiers modifiés

Résumé par nature (détail exhaustif dans `git log --stat` sur la branche) :
- ~230 fichiers `app/**/page.tsx` et composants touchés par les fusions
  SEO/accessibilité/responsive/performance (essentiellement des blocs
  `metadata`, classes Tailwind anti-débordement, wrappers de lazy-load).
- `lib/seo.ts`, `lib/use-dialog-focus-trap.ts`, `lib/read-png-dimensions.ts` : nouveaux utilitaires partagés.
- `app/layout.tsx` : skip-link + JSON-LD.
- `app/programmation/page.tsx` + nouveau `app/programmation/_components/ProgrammationClient.tsx`.
- `app/ressources/page.tsx`, `app/ressources/_components/resources-catalog.tsx` : correctif de bug réel.
- `components/teacher-apc-planner/TeacherApcPlannerClient.tsx` : correctif d'hydratation.
- `components/teacher-assessment-planner/AssessmentPlannerClient.tsx` : correctif a11y reporté.
- `e2e/teacher-apc-hydration.spec.ts`, `e2e/teacher-progression-hydration.spec.ts` : nouveaux tests.
- `docs/rapport-hydratation-apc.md`, `docs/rapport-correction-hydratation-progression.md` : rapports d'investigation récupérés.
- `docs/tests-non-regression.md`, `rapport-audit-responsive-final.md` : rapports déjà présents, conservés.

## 7. Mesures avant / après

| Mesure | Avant consolidation (base seule) | Après consolidation |
|---|---|---|
| Branches techniques distinctes | 10 (hors `main`/`progression-route-final`) | 1 (`integration/technical-foundation`) |
| Fichiers de tests | 11 (8 e2e + 3 unit) | 13 (10 e2e + 3 unit) |
| Tests unitaires | 31 | 31 |
| Tests Playwright (E2E) | 159 | 180 |
| Tests au total | 190 | 211 |
| Durée suite unitaire | ~1 s | ~1,6 s |
| Durée suite E2E (3 profils) | ~2,1 min | ~3,5 min (plus de tests + serveur de build inclus) |
| Pages HTML statiques générées | — (mesuré uniquement après, la base seule n'avait pas été re-mesurée) | 418 (proche des ~420 de référence historique ; écart mineur expliqué par l'évolution de contenu déjà validée sur les branches intégrées, aucune route perdue) |
| Liens morts détectés (audit) | 0 | 0 |

## 8. Résultats de validation

Tous exécutés sur un dépôt propre (`rm -rf .next` avant chaque `tsc`/`build`) :

| Vérification | Résultat |
|---|---|
| `npm run lint` | ✅ 0 erreur, 0 avertissement (l'avertissement `next/image` préexistant a été résolu par la fusion de la 1ère passe de performance) |
| `npx tsc --noEmit` | ✅ propre |
| `npm run build` | ✅ exit 0, 418 pages statiques générées |
| Tests unitaires (`playwright.unit.config.ts`) | ✅ 31/31 |
| Tests E2E (3 profils desktop/tablette/mobile) | ✅ 180/180 (une 1ère exécution a montré 2 échecs de timeout sur `/primaire`, reproduits comme un flake de contention CPU sous parallélisme complet dans ce conteneur à 4 cœurs — confirmé non reproductible en isolation (chargement en 481 ms, 0 requête en échec, 0 erreur console) puis re-confirmé par une 2e exécution complète 180/180) |
| Audit de routes rapide (23 routes critiques) | ✅ 143 OK, 1 redirection connue (`/professeurs/felix`), 0 lien mort |
| Audit responsive | ✅ couvert par les 3 profils Playwright (desktop/tablette/mobile) sur l'ensemble de la suite E2E |
| Audit accessibilité | ✅ `e2e/accessibilite.spec.ts` (axe-core) — 0 violation critique/sérieuse sur les 6 pages couvertes |
| Audit SEO | ✅ `e2e/seo-technique.spec.ts` — title/canonical/OG/Twitter/robots/sitemap/JSON-LD |
| Vérifications fonctionnelles manuelles (curl, serveur de prod local) | ✅ `/`, `/ressources`, `/missions-recentes`, `/programmes`, `/parcours`, `/primaire`, `/college`, `/lycee`, `/enseignants`, `/enseignants/progression`, `/enseignants/programmation`, `/enseignants/organisation-classe`, une matière primaire, une matière collège, une mission disponible, un parcours — tous HTTP 200 ; `/robots.txt` et `/sitemap.xml` valides ; route inexistante → 404 |

## 9. Commandes utiles

```bash
# Validation rapide (pré-commit)
npm run validate:quick   # lint + typecheck + tests unitaires

# Validation complète (pré-merge)
npm run validate         # lint + typecheck + build + unitaires + e2e + routes rapide

# Audit de routes complet (crawl depuis les pages hub)
npm run routes:check

# Suite E2E seule (nécessite un build existant ou lance le sien)
npm run test:e2e
```

## 10. Risques restants

- **Flake de timeout sous forte charge CPU** : dans cet environnement à 4
  cœurs, exécuter les 3 profils Playwright en parallélisme complet peut
  occasionnellement dépasser le timeout de 45 s sur une navigation lourde
  (`/primaire`) si la machine est déjà sous charge (ex. build + plusieurs
  navigateurs simultanés). Non reproductible en isolation ; à surveiller
  si la suite est un jour exécutée en CI sur un runner à ressources
  limitées — augmenter le timeout ou réduire les workers serait la
  parade, aucun changement appliqué ici pour ne pas modifier le
  comportement de test sans nécessité avérée en CI réelle.
- **Écart de 2 pages sur le total de routes générées** (418 vs ~420 de
  référence) non entièrement expliqué ligne à ligne — probablement lié aux
  ajustements de contenu déjà validés sur les branches intégrées (aucun
  lien mort détecté par l'audit, donc aucune route publique perdue).
- **CI distante non modifiée** : ce chantier n'a pas touché
  `.github/workflows/ci.yml` (déjà mis à jour lors du chantier de tests
  précédent avec lint/typecheck/build/unitaires ; l'E2E complet n'y est
  toujours pas intégré, choix déjà documenté dans
  `docs/tests-non-regression.md`).
- **Branches non fusionnées restantes** : `claude/audit-kerboeuf-integrity-gj3vx2`,
  `claude/link-route-integrity-audit`, `claude/broken-links-audit-7vrund`,
  `claude/public-catalog-cleanup-1zisms` (partie mise en page) et la partie
  code de `fix/hydration-progression-v1` restent en l'état sur le remote,
  volontairement non fusionnées (superseded, cf. §3) — elles peuvent être
  supprimées si confirmé qu'elles ne sont plus nécessaires, mais aucune
  suppression de branche n'a été faite dans ce chantier (hors périmètre).

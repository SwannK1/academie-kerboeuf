# Rapport de consolidation des branches techniques

Consolidation, dans une branche d'intégration unique, des chantiers techniques
validés dispersés sur plusieurs branches : SEO technique, performances (2
passes), accessibilité, responsive, gouvernance des statuts publics,
publication réelle du catalogue de ressources, intégrité des routes/liens,
correction de l'hydratation de `/enseignants/progression`, tests de
non-régression.

Aucun développement de fonctionnalité nouvelle, aucune modification de
design, de contenu pédagogique, de routes, de navigation ou de règle métier
au-delà de ce que chaque chantier source contenait déjà. Rien n'a été fusionné
dans `main`, aucune branche source n'a été supprimée ni réécrite.

## État initial

Inventaire réalisé par lecture des commits et des diffs réels (pas par nom de
branche) sur les branches candidates, toutes issues du même point de
divergence :

```
c5e69dfae0214d97f30ee5b264635185b1729c98
Merge pull request #304 from fix/cp-guide-kiwi-consistency-v1 (2026-06-24)
```

Branches retenues comme chantiers, avec leur commit principal :

| Branche | Commit principal |
|---|---|
| `claude/gouvernance-statuts-ressources-kjgw6e` | `b24199f` (tip, retenue comme base) |
| `claude/audit-kerboeuf-integrity-gj3vx2` | `e094411` |
| `fix/hydration-progression-v1` | `a7a123f` (SEO), `6faac6e` (perf), `4e55570` (hydratation) |
| `claude/site-performance-optimization-v2wt83` | `a02b1a0` (perf passe 2) |
| `claude/site-accessibility-audit-fq3u73` | `ee73761` |
| `claude/academie-kerboeuf-responsive-4cj4tc` | `a6bb60d` + suite |
| `claude/public-catalog-cleanup-1zisms` | `2fb8615` |

### Choix de la base

**Base retenue : `claude/gouvernance-statuts-ressources-kjgw6e`** (tip
`b24199f`), et non `main`.

Raison : c'est la branche qui contient déjà le plus grand nombre de
corrections validées avec la meilleure continuité d'historique — elle inclut
la refonte du référentiel de statuts publics
(`available/partial/preparing/coming-soon`) dont dépendent directement
plusieurs autres chantiers (intégrité des liens, publication réelle,
accessibilité des badges de statut). Partir de `main` aurait obligé à rejouer
inutilement cette refonte par-dessus une base qui ne la contient pas encore.
Tous les autres chantiers retenus partagent le même point de divergence
(`c5e69df`), ce qui a permis des fusions à trois points propres sans
réécriture d'historique.

Branche d'intégration créée : `integration/technical-hardening`.

## Matrice des chantiers

| Chantier | Branche | Commit principal | Déjà présent ailleurs | Intégré |
|---|---|---|---|---|
| Gouvernance des statuts | `claude/gouvernance-statuts-ressources-kjgw6e` | `b24199f` | — (base) | ✅ base |
| Intégrité des routes/liens | `claude/audit-kerboeuf-integrity-gj3vx2` | `e094411` | non | ✅ merge |
| SEO technique | `fix/hydration-progression-v1` | `a7a123f` | non | ✅ merge |
| Performance — passe 1 (finalisation) | `fix/hydration-progression-v1` | `6faac6e` | non | ✅ merge |
| Hydratation `/enseignants/progression` | `fix/hydration-progression-v1` | `4e55570` | conflit avec un correctif indépendant équivalent sur la base | ✅ merge (réconcilié) |
| Performance — passe 2 | `claude/site-performance-optimization-v2wt83` | `a02b1a0` | non | ✅ merge |
| Accessibilité | `claude/site-accessibility-audit-fq3u73` | `ee73761` | non | ✅ merge |
| Responsive | `claude/academie-kerboeuf-responsive-4cj4tc` | `a6bb60d` + suite | en grande partie supersédé par l'accessibilité (`min-w-0` plus complet) | ✅ merge (valeur unique conservée) |
| Publication réelle (catalogue `/ressources`) | `claude/public-catalog-cleanup-1zisms` | `2fb8615` | non, mais clés de statut obsolètes | ✅ port ciblé (réécrit avec les clés canoniques) |
| Intégrité des liens — complément | `claude/link-route-integrity-audit` | `4f19692` | en grande partie équivalent à `e094411` | ✅ port ciblé des 4 écarts réels |
| Tests de non-régression | déjà présents sur la base + branches ci-dessus | — | — | ✅ conservés tels quels |

## Intégration réalisée

Ordre d'intégration effectif (adapté aux dépendances réelles observées) :

1. **Intégrité des routes/liens** (`e094411`) — merge `--no-ff`, commit `40d3898`.
2. **SEO + performance passe 1 + hydratation** (`a7a123f`, `6faac6e`, `4e55570`) — merge `--no-ff`, commit `e4eb44d`.
3. **Performance passe 2** (`a02b1a0`) — merge `--no-ff`, commit `ec04614`.
4. **Accessibilité** (`ee73761`) — merge `--no-ff`, commit `42644e5`.
5. **Responsive** (`a6bb60d` + suite) — merge `--no-ff`, commit `fe265d8`.
6. **Publication réelle** (`2fb8615`, port ciblé) — commit `200ad36`.
7. **Complément intégrité des liens** (`4f19692`, port ciblé) — commit `f2227de`.

Méthode : fusion de branche entière (`git merge --no-ff`) pour les 5 premiers
chantiers, tous descendant du même point de divergence — l'algorithme de
fusion à trois points de Git a pu résoudre automatiquement la grande majorité
des changements non conflictuels (par exemple, sur la fusion SEO/perf1/
hydratation, seuls 98 des ~124 fichiers modifiés par la branche ont
réellement conflit). Cherry-pick ciblé (réimplémentation manuelle du même
correctif) pour les 2 derniers chantiers, dont l'historique ne partageait pas
la même lignée que la branche d'intégration (ils précédaient la refonte du
référentiel de statuts et utilisaient encore d'anciennes clés
`upcoming`/`in-progress` interdites comme clé cible par `AGENTS.md`) — une
fusion directe aurait réintroduit ces clés obsolètes ou produit un nombre de
conflits sans rapport avec le contenu réellement pertinent de ces branches.

Pour chaque commit intégré : source, méthode et conflits sont détaillés dans
les messages de commit correspondants sur `integration/technical-hardening`.

## Commits exclus (avec raison précise)

| Commit | Branche source | Raison de l'exclusion | Équivalent |
|---|---|---|---|
| `d721bfe` | `claude/academie-kerboeuf-responsive-4cj4tc` | Correctif manuel de restauration du focus (par composant) | Supersédé par `useDialogFocusTrap` (hook partagé, piège Tab complet + restauration de focus), déjà présent sur la branche de base via l'accessibilité |
| `6dbc1b2` | `claude/academie-kerboeuf-responsive-4cj4tc` | Corrige un défaut d'`autoFocus` empêchant Échap de fonctionner | `useDialogFocusTrap` place le focus dans le dialogue au montage indépendamment d'`autoFocus`, donc Échap fonctionne structurellement — vérifié par lecture du hook et par les tests e2e `teacher-progression-panel.spec.ts` / `teacher-programmation-annuelle-panel.spec.ts` (Échap testé, 100 % vert) |
| `4f19692` (partiel) | `claude/link-route-integrity-audit` | La majorité du contenu (centralisation `getMissionHref`, garde-fou de statut sur les parcours, slug `sciences`) était déjà équivalente à `e094411` ou à la base | 4 écarts réels identifiés et portés séparément (commit `f2227de`) : `profileHref` de Félix, `getProfessorHref` sur les pages de lieux, `professorRefs.felix` dans `content/elementary-places.ts`, breadcrumb/lien retour des fiches CM2 mathématiques |
| `fe8044d`, `4ded96a` (branche `test/teacher-panel-close-behavior-v1`) | `test/teacher-panel-close-behavior-v1` | Le message du commit `4ded96a` indique explicitement que le comportement de fermeture (Échap + clic extérieur) était déjà fusionné dans `main` via la PR #296 ; ces commits reviennent sur des correctifs locaux redondants | Comportement déjà présent (confirmé par `git merge-base --is-ancestor origin/fix/teacher-panel-close-behavior-v1 integration/technical-hardening`) ; les tests Playwright ajoutés par cette branche (`e2e/teacher-progression-panel.spec.ts`, `e2e/teacher-programmation-annuelle-panel.spec.ts`) sont déjà présents et passent (10/10) |

Recherche des commits non intégrés effectuée avec
`git log integration/technical-hardening..<branche>` sur les 7 branches de
chantier : **0 commit non intégré** restant sur chacune d'elles, à l'exception
de `claude/public-catalog-cleanup-1zisms` dont l'unique commit (`2fb8615`) a
été intentionnellement réimplémenté plutôt que fusionné (raison ci-dessus) et
n'apparaît donc pas comme ancêtre malgré son intégration effective.

Aucun commit fonctionnel validé des chantiers listés dans la demande initiale
n'a été ignoré silencieusement.

## Conflits

Conflits de fusion réels (marqueurs Git) rencontrés et leur résolution :

| Fichier(s) | Nature du conflit | Décision |
|---|---|---|
| `content/mission-registry.ts` | Doublon silencieux de `getMissionHref` (2 définitions, non détecté comme conflit par Git) | Suppression de la définition incomplète (sans vérification de disponibilité), conservation de la version correcte |
| `content/resources.ts` | Helper `isLinkableMission` local dupliqué et incorrect pour le collège | Suppression, réutilisation de `isMissionDetailLinkable` |
| `app/programmation/_components/ProgrammationClient.tsx` | Lien cassé introduit par l'extraction en composant client (`sciences-technologie` au lieu de `sciences`) | Corrigé par comparaison avec `content/cm2-subjects.ts` |
| `app/lycee/[level]/missions/[slug]/page.tsx` | Clé de statut obsolète `"upcoming"` vs la clé canonique `"coming-soon"` | Conservé `"coming-soon"`, adopté les ajouts `robots: {index:false}` de l'autre branche |
| `components/academy/TeacherPeriodProgressionClient.tsx` | Deux implémentations indépendantes du même correctif d'hydratation (`hasLoadedStorage` vs `isInitialWriteRef`) | Conservé l'implémentation à deux effets (`isInitialWriteRef`, commit `4e55570`, désigné comme correctif canonique) après vérification qu'elle couvre aussi le risque d'écrasement du stockage soulevé par l'autre implémentation |
| ~90 fichiers `app/**/page.tsx` | Pattern identique `export const metadata: Metadata = {` vs `export const metadata = buildPageMetadata({` | `buildPageMetadata` conservé partout ; imports de statuts déjà utilisés plus loin dans le fichier conservés en plus (`app/programmes/page.tsx`, `app/eleves/[slug]/page.tsx`, `app/parcours/[slug]/page.tsx`) |
| 10 pages outils enseignants (`TeacherClassroomLayout`, `ClassLibrary`, etc.) | Wrapper `next/dynamic` (perf passe 2) vs import direct du composant client (SEO/hydratation) | Conservé le wrapper de code-splitting, déjà utilisé par le JSX existant |
| `app/ressources/_components/resources-catalog.tsx`, `components/academy/SubjectMatterCatalog.tsx`, `components/academy/college-level-entry.tsx`, etc. | Classes anti-débordement (`min-w-0`, accessibilité) vs carte conditionnelle disponible/non disponible (gouvernance-statuts) | Conservé la structure conditionnelle, classes anti-débordement appliquées aux deux variantes |
| `components/academy/TeacherCurriculumPlanner.tsx`, `TeacherLessonPreparationClient.tsx` | Import `useRef` supprimé par erreur du côté accessibilité | Restauré : `useRef` reste utilisé pour des refs de déclencheur indépendantes de `useDialogFocusTrap` |

Chaque groupe de conflits a été suivi d'un `npx tsc --noEmit` avant de passer
au groupe suivant (voir Validation). Deux bugs silencieux (non détectés par
les marqueurs de conflit Git) ont été trouvés par relecture post-fusion :
import `Image` dupliqué dans une fiche CM2 mathématiques, et le doublon
`getMissionHref` mentionné ci-dessus.

## État final

- Branche d'intégration : `integration/technical-hardening`
- Dernier commit : `f2227ded2c92ffc387720ea0f809ce1906854bbd`
- 243 fichiers modifiés par rapport au point de divergence commun (`c5e69df`)
- Aucune branche source modifiée ni supprimée
- Dépôt propre : aucun conflit résiduel, aucun artefact temporaire

## Validation

| Vérification | Résultat |
|---|---|
| `npm run lint` | ✅ aucune erreur, aucun avertissement |
| `npx tsc --noEmit` | ✅ 0 erreur (exécuté après chaque groupe de fusion + à la fin) |
| `npm run build` | ✅ build réussi |
| Routes générées | **420/420** — identique à la référence connue, aucun écart |
| Tests unitaires (`npm run test:unit`) | ✅ 31/31 |
| Tests e2e Playwright (`npm run test:e2e`) | ✅ 168/168 (desktop, tablette, mobile) |
| `scripts/check-routes.mjs` | ✅ 144 liens vérifiés, 0 lien mort, 0 erreur serveur |
| `scripts/audit-links.mjs` | ✅ 420 pages crawlées, 675 liens uniques, 0 lien cassé atteignable (8 routes 404 pré-rendues intentionnelles, non liées), 309/309 fichiers publics présents, 0 erreur de sitemap (222 entrées) |
| Erreurs console (échantillon de pages, dont `/enseignants/progression`) | ✅ 0 erreur, 0 avertissement d'hydratation |
| Focus de dialogue / Échap / clic extérieur | ✅ vérifié par `e2e/accessibilite.spec.ts`, `e2e/teacher-progression-panel.spec.ts`, `e2e/teacher-programmation-annuelle-panel.spec.ts` |
| Statuts publics (badges, CTA disponible/non disponible) | ✅ vérifié par `e2e/missions-et-statuts.spec.ts` |

## Risques restants

- **Historique de fusion volontairement non linéaire** : `integration/technical-hardening` contient 7 commits de fusion `--no-ff` plus 2 commits de port ciblé. C'est le résultat attendu de la consigne « ne pas réécrire l'historique » ; une revue humaine du diff complet avant toute fusion vers `main` reste recommandée, en particulier sur les fichiers ayant fait l'objet d'une résolution manuelle de conflit (liste ci-dessus).
- **`content/academy.ts` conserve un `profileHref` non corrigé pour Félix** dans un export (`academyProfessors`) actuellement inutilisé ailleurs dans le code (vérifié par recherche globale) : aucun risque fonctionnel actuel, mais si ce champ est un jour consommé, il faudra lui appliquer le même correctif que `content/professors.ts`.
- **Tests Playwright non exécutés en mode CI strict** : la suite a été exécutée localement avec `reuseExistingServer` sur un serveur `next start` déjà démarré ; le comportement en environnement CI (`process.env.CI` activé) suit un chemin différent (`webServer` démarre son propre serveur) qui n'a pas été testé séparément dans le cadre de cette consolidation.

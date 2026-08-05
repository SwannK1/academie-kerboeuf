# Rapport des risques techniques finaux

**Branche** : `integration/final-technical-release`
**Base** : `627a296` (docs: rapport de consolidation technique finale)
**Poussée** : oui, après validation complète (voir section Validation)

**Rebase effectué avant la poussée finale** : entre le début de ce travail
et la poussée, deux commits sont arrivés indépendamment sur la branche
distante (`6670751` fix(statuts), `4e1c3cb` docs). Le premier corrigeait
exactement le même fichier que le point 6 ci-dessous
(`ProgrammationClient.tsx`, mêmes clés `"in-progress"` → `"preparing"`). La
branche locale a été rebasée sur `origin/integration/final-technical-release`
avant la poussée ; le conflit sur ce seul fichier a été résolu en conservant
la version déjà poussée (fonctionnellement identique). Le commit final ne
modifie donc plus `ProgrammationClient.tsx` (déjà corrigé en amont) — les
autres points de ce rapport sont inchangés.

Ce rapport traite les sept points de risques techniques documentés comme
restant avant validation de préproduction, sans ouvrir de nouveau chantier
fonctionnel ni de refonte visuelle.

## Note préalable — scripts de validation demandés

La consigne demande `npm run test:a11y`, `npm run test:quick` et
`npm run test:routes`. Ces trois scripts n'existent pas dans `package.json` :
seuls existent `test:unit`, `test:e2e`, `routes:check` / `routes:check:quick`,
`validate:quick` et `validate`. Les tests d'accessibilité automatisés
(`@axe-core/playwright`) ne sont pas isolés dans un script dédié : ils font
partie de `e2e/accessibilite.spec.ts`, exécuté par `npm run test:e2e`. La
validation ci-dessous utilise donc les scripts réellement disponibles, qui
couvrent le même périmètre (lint, typecheck, build, unitaires, E2E incluant
l'accessibilité, vérification des routes). Aucun script n'a été renommé ni
ajouté : ce n'était pas l'objet de cette passe.

`node_modules` n'était pas installé au démarrage de la session ; `npm install`
a été exécuté avant toute validation (370 paquets, aucune dépendance modifiée
dans `package.json`/`package-lock.json`).

## 1. Canonical de la page d'accueil

**Confirmé** : `app/page.tsx` n'exportait aucune `metadata` propre et héritait
du layout racine, qui ne définit pas `alternates.canonical`. C'était le seul
risque documenté au §8 du rapport de consolidation précédent.

**Corrigé** : ajout d'un export `metadata` minimal sur `app/page.tsx`
(`alternates: { canonical: "/" }` uniquement). Ce choix ciblé — plutôt que
`buildPageMetadata()` — préserve intentionnellement le title/description/
OpenGraph/Twitter déjà corrects hérités du layout racine (title par défaut
"Académie Kerboeuf | Missions pédagogiques immersives", description,
OpenGraph, Twitter, robots), sans les dupliquer ni les modifier : Next.js ne
fusionne que les clés explicitement redéfinies, les autres restent héritées
telles quelles.

**Vérifié — pas de double canonical** : recherche de `rel="canonical"` codé en
dur dans le JSX (aucune occurrence) et de toute autre définition
`alternates.canonical` (une seule, dans `lib/seo.ts` via `buildPageMetadata`,
utilisée par les pages qui l'appellent explicitement). Le test E2E ajouté
vérifie explicitement `toHaveCount(1)` sur `link[rel="canonical"]`.

**Vérifié — title/description/OpenGraph/Twitter de l'accueil** : présents et
corrects (hérités du layout racine), confirmés par un test E2E dédié.

## 2. Hydratation APC

**Vérifié** : le correctif du commit `8958701` (repris sous `8b09e4a` dans
cette lignée, adapté à la structure wrapper dynamique + `*Client.tsx`) est
bien présent dans `components/teacher-apc-planner/TeacherApcPlannerClient.tsx`
— le composant réellement exécuté par `/enseignants/apc` (via
`TeacherApcPlanner.tsx`, `dynamic(..., { ssr: false })`). Une seule
implémentation : `readStoredSessions()` n'est appelée que dans un
`useEffect` post-montage, l'état initial de `sessions` est déterministe
(`[]`), et un `isInitialWriteRef` empêche l'effet d'écriture d'écraser le
stockage avant la fin du chargement initial.

**Vérifié — aucune écrasement prématuré** : confirmé par lecture du code et
par les tests E2E (existants + nouveau, voir ci-dessous), y compris un
rechargement supplémentaire après restauration.

**Test ajouté** : les scénarios demandés (premier chargement sans données,
chargement avec données existantes, sauvegarde, rechargement) étaient déjà
couverts par `e2e/teacher-apc-hydration.spec.ts`. Le scénario **modification**
d'une séance déjà chargée depuis le stockage manquait — ajouté :
`"modification d'une séance déjà chargée depuis le stockage, persistée après
rechargement"`. Ce test seed le stockage via `page.evaluate()` (pas
`context.addInitScript()`, qui se serait ré-exécuté au rechargement et aurait
effacé la modification testée en réinjectant la séance d'origine — piège
identifié et évité).

## 3. Dialogues, modales et panneaux

**Inventaire** (composants avec `role="dialog"` / `role="alertdialog"` /
`aria-modal`) :

| Composant | État initial | Action |
|---|---|---|
| `ClassLibraryClient` (bibliothèque de classe) | Conforme (`useDialogFocusTrap`) | Aucune |
| `TeacherLessonPreparationClient` (×2 dialogues) | Conforme | Aucune |
| `TeacherLogbookClient` (cahier journal) | Conforme | Aucune |
| `TeacherCurriculumPlanner` / `TeacherPeriodProgressionClient` (panneaux latéraux) | Conforme | Aucune |
| `TeacherClassroomLayoutClient` (confirmation d'écrasement de plan) | **Défaillant** | Corrigé |
| `TeacherProfessionalDevelopmentClient` (confirmation de suppression, formations) | **Défaillant** | Corrigé |
| `TeacherPrintQueueClient` (confirmation de suppression, photocopies) | **Défaillant** | Corrigé |
| `SiteHeader` (menu mobile) | Disclosure, pas un dialogue — Échap + retour focus déjà corrects | Aucune (hors périmètre : pas un dialogue) |

**Confirmé — 3 composants défaillants** : ces trois `role="alertdialog"`
inline (confirmation d'écrasement de plan / suppression) n'avaient ni
`aria-modal`, ni focus initial, ni enfermement du focus, ni fermeture Échap,
ni restitution de focus — alors que leur rôle ARIA annonce un dialogue modal
aux technologies d'assistance. Comportement trompeur pour un lecteur d'écran
(rôle annoncé sans le comportement associé).

**Corrigé** : les trois ont été extraits en sous-composants dédiés
réutilisant le helper existant `useDialogFocusTrap` (import de
`@/lib/use-dialog-focus-trap`, déjà utilisé par les 5 autres) + un
`useEffect` local pour Échap (même schéma que `ClassLibraryClient`) +
`aria-modal="true"` + `tabIndex={-1}`. **Aucune deuxième implémentation
concurrente** : le seul helper de focus trap du dépôt reste
`lib/use-dialog-focus-trap.ts`. Le rendu visuel (classes CSS, placement
inline non-overlay) est strictement inchangé — seul le comportement
d'accessibilité a été ajouté.

**Tests ajoutés** (dans `e2e/accessibilite.spec.ts`, section « Dialog —
exposition accessible », sans dupliquer les tests existants) : un test par
composant corrigé, vérifiant `aria-modal="true"`, absence de violation axe
critique/sérieuse, fermeture par Échap et retour de focus au déclencheur.

## 4. Organisation de classe

**Vérifiés** (existants ou nouvellement ajoutés) : ajouter une table,
pivoter, agrandir, réduire, dupliquer, supprimer, déplacer un élève entre
tables, persister, recharger — tous fonctionnels.

**Correctif de pointer capture préservé** : `onTablePointerDown` continue de
filtrer les cibles internes (boutons d'action) avant capture du pointeur ;
aucune modification de cette logique.

**Clavier** : nouveau test dédié confirmant qu'un bouton d'action de table
(ici « Pivoter ») reste activable au clavier (`focus()` + `Enter`), pas
seulement au pointeur — le correctif de capture de pointeur ne dépend que
d'événements `pointerdown`, jamais déclenchés par le clavier, donc sans
risque de régression clavier, désormais verrouillé par un test.

**Nouveaux tests ajoutés** (`e2e/outils-enseignants.spec.ts`) :
- « agrandir, réduire, dupliquer et supprimer une table » — jusqu'ici non
  couverts individuellement (seule la rotation l'était).
- « les boutons d'action d'une table restent activables au clavier ».
- « déplacer un élève d'une table vers une autre (retirer puis replacer),
  persisté après rechargement ».

**Fragilité du drag-and-drop réduite** : le test de glisser-déposer
étiquette→table dépendait de l'ordre structurel des `<ul>` de la section
(`.locator("ul").first()`, documenté comme risque ouvert dans le rapport
précédent). Un `aria-label="Étiquettes non placées"` a été ajouté à la liste
concernée (composant, sans impact visuel) et le test cible désormais cette
liste par son nom accessible plutôt que par position. Le mécanisme HTML5
natif (`DragEvent` manuel) reste inchangé — seule la façon de cibler la
liste en test a été rendue robuste au réordonnancement du DOM.

**Fragilité annexe découverte et corrigée en cours de route (dans les tests,
pas dans l'application)** : le `<html>` du site a `scroll-smooth`
(`scroll-behavior: smooth`), et l'en-tête est `position: fixed` — deux
tables ajoutées par défaut se chevauchent (décalage de 20 px). Les nouveaux
tests utilisent un clic à coordonnées centrées après un `scrollIntoView`
explicite (`behavior: "instant"`) plutôt que `locator.click()` seul, pour
rester fiables malgré le chevauchement et le défilement fluide. Aucune
modification applicative liée à cela.

## 5. Routes enseignantes — `/enseignants/plan-de-classe`

**Recherche exhaustive** de toute référence à `/enseignants/plan-de-classe`
(liens internes, redirects `next.config.ts`, documentation) : **aucun usage
réel trouvé**. Les seules occurrences de la chaîne « plan-de-classe » sont
un `id` interne non routant (`organisation-plan-de-classe` dans
`content/teacher-classroom-displays.ts`, un simple identifiant d'affichage à
préparer) et un message de commit historique.

**Décision : aucune redirection créée.** Conformément à la consigne
(« s'il n'existe aucun usage, ne crée pas de redirection inutile »), la route
canonique reste uniquement `/enseignants/organisation-classe`, déjà en place
et déjà référencée partout où c'est pertinent (navigation, sitemap, tests).

## 6. Statuts et publication

**Confirmé — anciennes clés de statut réintroduites en dehors de `content/`** :
recherche de `"upcoming"` / `"in-progress"` en dehors de `content/` et
`tests/` (où leur usage en entrée est explicitement toléré par
`AGENTS.md`). Trouvé dans **5 fichiers de `app/`**, en tant que valeurs
sources écrites en dur (pas des comparaisons sur une donnée externe non
migrée) :

- `app/lycee/seconde/ressources/page.tsx`
- `app/maternelle/ressources/page.tsx`
- `app/college/6e/methodes/page.tsx`
- `app/programmation/_components/ProgrammationClient.tsx`
- `app/personnages/_components/hierarchy.tsx`

Ces usages ne causaient pas de bug fonctionnel (la façade
`getPublicStatus()`/`PublicStatusBadge` normalise ces synonymes en entrée),
mais constituaient une violation de la règle de gouvernance : « aucun nouveau
code ne doit les utiliser comme clé cible ». **Corrigé** : remplacement par
la clé canonique `"preparing"` dans les 4 premiers fichiers. Le 5e
(`ProgrammationClient.tsx`) a été corrigé indépendamment par un commit arrivé
sur la branche distante pendant ce travail (`6670751`, voir note de rebase
en tête de rapport) — même correctif, repris tel quel après rebase plutôt que
dupliqué.

**Vérifié — aucun import direct de `public-status.domain`/`public-status.ui`**
en dehors de `content/` (seuls `content/public-status.ts` et
`content/primary-programmation.ts` les importent — les deux dans la couche
autorisée).

**Vérifié — `getPublicStatusVariant()` (déprécié)** : non utilisé en dehors
de sa propre définition et de la documentation.

**Vérifié — ressources indisponibles non téléchargeables** : la chaîne
`isPedagogicalResourceLinkable()` (content/) délègue à la décision centrale
`isPubliclyAvailable()` (`getPublicStatusKey(status) === "available"` ET
`href` réel) ; aucun composant ne réimplémente cette logique localement.

**Vérifié — sitemap** : `app/sitemap.ts` filtre les missions lycée non
disponibles via `isMissionPubliclyAvailable()` avant inclusion. Confirmé par
`node scripts/audit-links.mjs` : 222 URLs de sitemap, 0 doublon, 0 404, et
les 8 routes 404 pré-rendues (missions lycée non disponibles) ne sont liées
depuis aucune page ni présentes dans le sitemap — comportement attendu,
inchangé par cette passe.

**Vérifié — pas de comparaison de statut brut en chaîne dans l'UI** :
recherche de `status === "disponible"` / `"bientôt"` / `"partiel"` etc. dans
`app/` et `components/` — aucune occurrence.

## 7. Vérifications silencieuses

- **Imports/fonctions/exports dupliqués** : `getMissionHref` et
  `getPublicStatusKey` restent chacun définis une seule fois dans tout le
  dépôt. Aucun marqueur de conflit résiduel (`<<<<<<<`/`=======`/`>>>>>>>`).
  Quelques fichiers pré-existants (non touchés par cette passe) séparent un
  `import type {...} from "x"` d'un `import {...} from "x"`, ou importent
  plusieurs hooks React sur des lignes distinctes (`useMemo`/`useState`
  depuis `"react"`) — vérifié non fonctionnel (styles de découpage bénins,
  pas de déclaration conflictuelle), volontairement non modifié pour ne pas
  ouvrir un chantier de nettoyage de style hors périmètre.
- **Effets React à dépendances incorrectes** : `eslint-config-next/core-web-vitals`
  (règle `react-hooks/exhaustive-deps`) — 0 erreur sur l'ensemble du dépôt.
- **Variables supprimées encore référencées / anciens slugs** : `tsc --noEmit`
  et `eslint` propres après `rm -rf .next` ; aucune référence résiduelle à
  `/univers/personnages` ou `/professeurs/felix` (redirects legacy) en dehors
  de leur définition dans `next.config.ts`.
- **Liens de profils obsolètes** : néant trouvé.
- **Erreurs console / hydratation** : les 222 tests E2E incluent des
  assertions `trackConsoleErrors` sur les parcours enseignants et publics
  critiques — aucune erreur détectée.

## Tests ajoutés ou modifiés

| Fichier | Nature |
|---|---|
| `e2e/seo-technique.spec.ts` | Canonical de l'accueil incluse dans la boucle existante (unicité, cohérence de domaine) ; nouveau test title/description/OG/Twitter de l'accueil |
| `e2e/teacher-apc-hydration.spec.ts` | Nouveau test : modification d'une séance déjà chargée, persistée après rechargement |
| `e2e/accessibilite.spec.ts` | 3 nouveaux tests : plan de classe (confirmation d'écrasement), formations et photocopies (confirmation de suppression) — dialog modal, Échap, retour de focus |
| `e2e/outils-enseignants.spec.ts` | 3 nouveaux tests (agrandir/réduire/dupliquer/supprimer une table, activation clavier, déplacement d'élève entre tables) ; test de glisser-déposer existant rendu robuste au réordonnancement du DOM |

## Résultats de validation

Exécutés dans cet ordre, après `rm -rf .next` :

| Étape | Résultat |
|---|---|
| `npm run lint` | 0 erreur |
| `npx tsc --noEmit` | 0 erreur |
| `npm run build` | OK, 420 routes générées |
| `npm run test:unit` | **53/53 passés** |
| `npm run test:e2e` (desktop/tablette/mobile Chromium) | **222/222 passés** (2,8 min) — contre 195 avant cette passe |
| `npm run routes:check:quick` | 23/23 routes critiques OK, 0 lien mort |
| `node scripts/audit-links.mjs` (audit manuel complet) | 420 pages crawlées, 675 liens internes, 0 lien mort atteignable, sitemap 222 URLs / 0 doublon / 0 404 |

Aucune erreur d'hydratation, aucune erreur console critique.

## Risques encore ouverts

1. **Scripts `test:a11y` / `test:quick` / `test:routes` absents de
   `package.json`** (voir note en tête de rapport) — n'a pas été créé ici
   (aurait constitué un chantier distinct de configuration de build, hors
   périmètre de ce traitement de risques). Les vérifications correspondantes
   existent sous d'autres noms de scripts.
2. **Technique de glisser-déposer natif** (affectation étiquette→table)
   reste fondée sur `DragEvent` manuel — fragilité déjà documentée et
   acceptée dans le rapport de consolidation précédent, uniquement la
   dépendance à l'ordre du DOM du ciblage de la liste a été réduite ici.
3. **`npm run routes:check:quick` reconstruit le site une seconde fois** —
   comportement préexistant, non modifié (hors périmètre).
4. **Branches non supprimées** (`integration/technical-foundation`,
   `claude/e2e-regression-suite`, `claude/non-regression-test-suite`) —
   conformément à la consigne, aucune suppression effectuée.

## Git

- Fusion : aucune (`main` non touché).
- Pull request : aucune créée (non demandée).
- Branches distantes : aucune supprimée.
- Force-push : aucun.
- Contenus pédagogiques : non modifiés.
- Refonte visuelle : aucune (seuls des attributs ARIA/aria-label et une
  balise `<link rel="canonical">` ajoutés, sans impact visuel).

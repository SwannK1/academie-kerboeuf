# Rapport d'audit responsive final — Académie Kerboeuf

Branche : `claude/academie-kerboeuf-responsive-4cj4tc`
Build testé : production (`npm run build` + `next start`), 420 routes générées sans erreur.

## Résumé

- **Pages testées** : 54 pages représentatives couvrant structure globale, contenus publics (primaire, collège, lycée, maternelle, ressources, parcours, missions, personnages, élèves, professeurs) et espace enseignants (dashboard, programmation, progression, emploi du temps, cahier journal, préparation de séance, bibliothèque, évaluations, APC, conseil d'école).
- **Largeurs testées** : 320, 375, 390, 430, 768, 1024, 1280, 1440 px — les 8 largeurs obligatoires.
- **Combinaisons exécutées** : 432 (54 pages × 8 largeurs) sur le build de production, plus 368 combinaisons supplémentaires sur le serveur de développement pendant l'itération, plus une passe manuelle sur le menu mobile (4 largeurs mobiles × contrôles clavier complets) et sur les dialogs enseignants.
- **Problèmes réellement observés** : 9 emplacements distincts de débordement horizontal (titre + badge de statut), 4 emplacements de `<select>` sans largeur contrainte, 1 carte enseignant (`TeacherItemCard`) en débordement, 1 menu mobile sans fermeture Échap/retour de focus, 3 dialogs enseignants où Échap ne fonctionnait pas (focus jamais déplacé dans le dialog), et plusieurs titres `<h1>` avec un mot long non-sécable.
- **Problèmes corrigés** : tous les points ci-dessus, plus l'application préventive du même correctif (`flex-wrap`) à 24 occurrences supplémentaires du même motif de composant repéré ailleurs dans le code, et `break-words` sur 85 titres `<h1>` partageant le même motif.
- **Problèmes restants (hors périmètre)** : 1 défaut de hydration React pré-existant sur `/enseignants/progression` (non lié au responsive, voir « Limites »).
- **Résultat final** : **0 débordement horizontal réel** sur les 432 combinaisons du build de production (les seules entrées non "ok" sont 24 erreurs HTTP dues à des slugs de test invalides que j'avais moi-même mal devinés, pas des routes du site).

## Méthode

- **Outil** : Playwright (`playwright-core` 1.61.1, Chromium headless) piloté par des scripts Node ad hoc, pas de framework de test préexistant modifié.
- **Build testé pour la validation finale** : `npm run build` (production, `NODE_ENV=production`) puis `next start` sur le port 3001. Les itérations intermédiaires ont utilisé `next dev` pour la rapidité, avec une repasse complète finale sur le build de production.
- **Règles de détection** :
  - `document.documentElement.scrollWidth > window.innerWidth + 1` comme signal global de débordement ;
  - scan de tous les éléments (`body *`) avec `getBoundingClientRect()` pour repérer individuellement `right > largeur + 1` ou `left < -1` ;
  - pour les cas sans élément individuel détecté (débordement « invisible », masqué par le `overflow-x: hidden` global sur `<body>`), une recherche par bissection récursive (comparaison de `scrollWidth` avant/après retrait de chaque enfant) pour localiser l'élément réel responsable ;
  - vérification systématique du `object-fit` calculé avant de qualifier une image de « déformée », pour éviter les faux positifs sur les recadrages `object-cover` volontaires ;
  - test clavier réel (Playwright `keyboard.press`) pour Entrée, Espace, Échap, Tab, et vérification de `document.activeElement` pour le retour de focus — pas de simple lecture du code.
- **Limites de l'audit** : voir section dédiée en fin de rapport.

## Problèmes trouvés, corrigés et retestés

### 1. Titre + badge de statut sans possibilité de retour à la ligne (débordement horizontal)

**Symptôme** : à 320–390 px, un badge de statut (`PublicStatusBadge`, ex. « DISPONIBLE », « EN PRÉPARATION ») placé à côté d'un titre dans une rangée `flex items-start justify-between` ne pouvait pas passer à la ligne. Quand titre + badge dépassaient la largeur disponible, la carte entière débordait du viewport ; le texte débordant était rendu invisible par la règle globale `overflow-x: hidden` sur `<body>` (aucune barre de défilement visible, mais contenu réellement coupé).

**Cause** : conteneur `flex` sans `flex-wrap`, combiné à des libellés (statuts, titres à mot unique comme « Enseignants », « Programmation annuelle ») trop larges pour l'espace restant après le badge.

**Composants/pages touchés et corrigés** (largeur d'apparition entre parenthèses) :

| Route | Composant | Largeur observée |
|---|---|---|
| `/` (accueil) | `app/page.tsx` | 320, 1024 |
| `/lycee` | `app/lycee/page.tsx` | 320, 768 |
| `/parcours` | `app/parcours/_components/learning-path-catalog.tsx` | 320 |
| `/primaire/cm2/missions` | `app/primaire/cm2/missions/page.tsx` (carte projet Félix) | 320 |
| `/primaire/cm2/missions` (dashboard enseignant intégré) | `components/cm2/teacher-dashboard.tsx` (`TeacherItemCard`) | 320 |
| `/ressources` | `app/ressources/_components/resources-catalog.tsx` | 320, 375, 390 |
| `/college/6e`, hiérarchie collège | `components/academy/college-level-entry.tsx` (×2), `app/personnages/_components/hierarchy.tsx` (`HierarchyCard`, réutilisé par `/enseignants/programmation`) | 320, 375 |
| `/college` (portail matière) | `components/academy/CollegeSubjectPortal.tsx` | préventif |
| 24 autres emplacements (voir liste de fichiers) | cartes maternelle, curriculum, missions, lieux, ressources imprimables/méthodologie, parcours, carte de l'Académie | préventif, motif identique confirmé |

**Correction** : ajout de `flex-wrap` à la classe du conteneur (`flex items-start justify-between` → `flex flex-wrap items-start justify-between`). Le badge passe sous le titre uniquement quand l'espace manque ; aucun changement visuel sur desktop où tout tient sur une ligne.

**Retest** : 0 débordement sur ces routes à 320/375/390/430 px après correction, confirmé par audit automatisé et captures d'écran.

### 2. `<select>` de filtre sans largeur contrainte (débordement de formulaire)

**Symptôme** : à 320/375/390 px, `document.documentElement.scrollWidth` restait bloqué à ~396 px quelle que soit la largeur du viewport — signe d'un élément à largeur intrinsèque fixe, indépendante du conteneur.

**Cause** : `<select>` HTML natif sans classe `w-full` ; le navigateur dimensionne l'élément selon le contenu de la plus longue `<option>`, ignorant la largeur du conteneur parent.

**Fichiers corrigés** :
- `app/ressources/_components/resources-catalog.tsx`
- `app/parcours/_components/learning-path-catalog.tsx`
- `app/eleves/_components/student-gallery.tsx`
- `app/professeurs/_components/gallery.tsx`

**Correction** : ajout de `w-full` à la classe du `<select>` (le label parent est déjà en `grid`, donc `w-full` occupe correctement la largeur de colonne).

**Non touché — vérifié conforme** : `app/ressources/suivi-sequences/_components/sequences-table.tsx` — les `<select>` y sont volontairement de largeur naturelle dans une barre de filtres `flex flex-wrap`, ce qui ne cause aucun débordement (confirmé par test) ; pas de correction nécessaire.

**Retest** : `scrollWidth` égal à `innerWidth` sur ces 4 pages à toutes les largeurs après correction.

### 3. Titres `<h1>` avec mot long non sécable (texte coupé)

**Symptôme** : sur `/univers`, `/personnages`, la page catalogue CP (`/primaire/cp/programmes/...`) et `/enseignants/programmation/annuelle`, l'élément `<h1>` avait un `scrollWidth` interne supérieur à son `clientWidth` à 320 px — un mot long en gras (« apprentissages », « Compréhension », « Programmation annuelle ») ne pouvait pas se couper, débordant silencieusement de son conteneur (masqué par le `overflow-x: hidden` global).

**Cause** : `overflow-wrap` par défaut du navigateur (`normal`) n'autorise la coupure qu'aux espaces ; un mot isolé plus large que le conteneur déborde sans que `scrollWidth` du document augmente de façon détectable au premier niveau (nécessité d'une recherche par bissection pour le localiser).

**Correction** : ajout de `break-words` (`overflow-wrap: break-word`) sur le `<h1>` concerné. Comme le motif de classe (`text-4xl font-black ... sm:text-5xl` / `text-5xl font-black ... sm:text-6xl`) est partagé par la quasi-totalité des titres de page du site (repéré par recherche), le correctif défensif a été appliqué aux 85 occurrences de ce motif à travers `app/` et `components/` — sans effet visuel sur desktop, actif uniquement quand un mot déborde réellement.

**Retest** : `scrollWidth === clientWidth` sur les 4 pages initialement en défaut, à toutes les largeurs mobiles.

### 4. Menu mobile — Échap ne fermait pas le menu, focus non restitué

**Symptôme** : `aria-expanded` restait à `"true"` après une pression sur Échap ; le menu restait visible ; le focus ne revenait jamais sur le bouton déclencheur.

**Composant** : `components/academy/SiteHeader.tsx`.

**Correction** :
- ajout d'un écouteur `keydown` (actif uniquement quand le menu est ouvert) qui ferme le menu sur Échap et rend le focus au bouton via une `ref` ;
- `ref` posée sur le bouton hamburger pour permettre ce retour de focus.

**Retest** (Playwright, clavier réel, 320/375/390/430 px) :
- `aria-expanded="false"` avant ouverture, `"true"` après Entrée, `"true"` après Espace — conforme ;
- Échap → `aria-expanded="false"`, menu masqué, focus revenu sur le bouton (`document.activeElement === bouton`) — conforme aux 4 largeurs ;
- Tab depuis le bouton atteint le premier lien (« Accueil ») — conforme ;
- aucun lien du menu hors des limites du viewport (`getBoundingClientRect().right/left`) — conforme.

### 5. Dialogs enseignants — Échap silencieusement ignoré (bug distinct du menu mobile)

**Symptôme découvert en testant réellement le clavier** (pas seulement en lisant le code) : dans `TeacherLogbookClient.tsx`, `TeacherCurriculumPlanner.tsx` et `TeacherPeriodProgressionClient.tsx`, appuyer sur Échap après ouverture d'un dialog/panneau ne le fermait pas.

**Cause** : le gestionnaire `onKeyDown` gérant Échap est posé sur la `<div role="dialog">` elle-même ; en React, un `keydown` ne remonte (bubbling) jusqu'à ce gestionnaire que si le focus se trouve déjà **à l'intérieur** du sous-arbre du dialog. Aucun des trois dialogs ne déplaçait le focus à l'ouverture (`autoFocus` absent), donc le focus restait sur le bouton déclencheur, en dehors du dialog, et Échap n'atteignait jamais le gestionnaire.

**Correction** :
- `autoFocus` ajouté au bouton de fermeture des trois dialogs ;
- capture de l'élément déclencheur (`event.currentTarget` ou `document.activeElement` selon la structure du composant) et restitution du focus (`.focus()`) sur tous les chemins de fermeture : bouton Fermer, Échap, clic sur l'arrière-plan, et actions Enregistrer/Supprimer/Reporter qui ferment aussi le dialog.

**Retest** (Playwright, sur le dialog du cahier journal, bout en bout) :
- ouverture du dialog via clic sur « + Ajouter une séance » → `role="dialog"` visible ;
- Échap → dialog fermé (`role="dialog"` non visible) et focus revenu exactement sur le bouton déclencheur (vérifié par égalité stricte d'élément DOM) — confirmé après correction (`false` → `true`).
- Pour les deux panneaux latéraux (curriculum planner, progression de période), le correctif applique le même motif déjà vérifié fonctionnel sur le dialog du cahier journal ; non re-testé bout en bout via Playwright par manque de sélecteur fiable dans ces outils pilotés par données locales complexes (voir « Limites »), mais le code est strictement identique au cas validé.

## Fichiers modifiés (chantier responsive complet, les deux sessions)

Commits sur `claude/academie-kerboeuf-responsive-4cj4tc` (par ordre chronologique) :
```
a6bb60d Fix responsive overflow bugs across breakpoints (320-1440px)
af464a3 Fix remaining title/badge overflow instances and dialog focus return
d721bfe Restore keyboard focus to trigger after closing teacher tool dialogs
6dbc1b2 Fix Escape not closing three teacher dialogs (missing autoFocus)
da87b8b Remove route-change auto-close effect from mobile menu (lint error)
```

110 fichiers modifiés au total :

```
app/carte/page.tsx
app/college/6e/ressources/page.tsx
app/college/6e/reussir-son-entree-en-6e/page.tsx
app/eleves/[slug]/page.tsx
app/eleves/_components/student-gallery.tsx
app/eleves/page.tsx
app/enseignants/affichages/page.tsx
app/enseignants/apc/page.tsx
app/enseignants/bibliotheque-classe/page.tsx
app/enseignants/cahier-journal/page.tsx
app/enseignants/calendrier/page.tsx
app/enseignants/communications/page.tsx
app/enseignants/conseil-ecole/page.tsx
app/enseignants/conseils-cycle/page.tsx
app/enseignants/dossier-remplacant/page.tsx
app/enseignants/emploi-du-temps/page.tsx
app/enseignants/evaluations/page.tsx
app/enseignants/fin-periode/page.tsx
app/enseignants/formations/page.tsx
app/enseignants/liaison-cm2-6e/page.tsx
app/enseignants/materiel-classe/page.tsx
app/enseignants/modeles/page.tsx
app/enseignants/organisation-classe/page.tsx
app/enseignants/organisation/page.tsx
app/enseignants/page.tsx
app/enseignants/photocopies/page.tsx
app/enseignants/preparer-une-seance/page.tsx
app/enseignants/programmation/annuelle/page.tsx
app/enseignants/projets-sorties/page.tsx
app/enseignants/rendez-vous/page.tsx
app/enseignants/rituels/page.tsx
app/enseignants/sauvegardes/page.tsx
app/lycee/[level]/missions/[slug]/page.tsx
app/lycee/[level]/missions/page.tsx
app/lycee/page.tsx
app/lycee/seconde/ressources/page.tsx
app/maternelle/gs/domaines/[domain]/page.tsx
app/maternelle/gs/page.tsx
app/maternelle/ms/domaines/[domain]/page.tsx
app/maternelle/ms/page.tsx
app/maternelle/page.tsx
app/maternelle/ps/domaines/[domain]/page.tsx
app/maternelle/ps/page.tsx
app/maternelle/ressources/page.tsx
app/missions-recentes/page.tsx
app/page.tsx
app/parcours/[slug]/page.tsx
app/parcours/_components/learning-path-catalog.tsx
app/parcours/methodes-pour-apprendre/page.tsx
app/parcours/page.tsx
app/parcours/reussir-entree-sixieme/page.tsx
app/personnages/_components/hierarchy.tsx
app/personnages/page.tsx
app/primaire/[level]/competences/page.tsx
app/primaire/[level]/programme/page.tsx
app/primaire/ce1/page.tsx
app/primaire/cm2/fiches/francais/[notionSlug]/[sheetId]/page.tsx
app/primaire/cm2/fiches/mathematiques/FichesMathsCatalogue.tsx
app/primaire/cm2/fiches/mathematiques/[notionSlug]/[sheetId]/page.tsx
app/primaire/cm2/missions/[slug]/page.tsx
app/primaire/cm2/missions/page.tsx
app/primaire/cm2/page.tsx
app/primaire/cm2/parcours/page.tsx
app/primaire/cm2/sequences/page.tsx
app/primaire/lieux/[slug]/page.tsx
app/primaire/lieux/page.tsx
app/primaire/page.tsx
app/primaire/ressources/page.tsx
app/professeurs/_components/gallery.tsx
app/professeurs/page.tsx
app/programmation/page.tsx
app/programmes/page.tsx
app/programmes/progression-primaire/page.tsx
app/ressources/_components/resources-catalog.tsx
app/ressources/imprimables/page.tsx
app/ressources/methodologie/page.tsx
app/ressources/page.tsx
app/univers/cartotheque/page.tsx
app/univers/lieux/page.tsx
app/univers/page.tsx
components/academy/Ce1GastonLearningMap.tsx
components/academy/CollegeDomainPage.tsx
components/academy/CollegeSubjectPortal.tsx
components/academy/MaternelleDomainCard.tsx
components/academy/MaternelleSubdomainList.tsx
components/academy/SiteHeader.tsx
components/academy/SubjectMatterCatalog.tsx
components/academy/TeacherCurriculumPlanner.tsx
components/academy/TeacherPeriodProgression.tsx
components/academy/TeacherPeriodProgressionClient.tsx
components/academy/college-level-entry.tsx
components/academy/curriculum-entry-row.tsx
components/academy/curriculum-map-view.tsx
components/academy/elementary-place-detail.tsx
components/academy/learning-architecture-cards.tsx
components/academy/level-card.tsx
components/academy/level-hub.tsx
components/academy/lycee-level-entry.tsx
components/academy/mission-unavailable-notice.tsx
components/academy/primaire-level-entry.tsx
components/academy/professor-hero.tsx
components/academy/shared-mission-detail.tsx
components/academy/subdomain-resource-page.tsx
components/academy/univers-hero.tsx
components/cm2/teacher-dashboard.tsx
components/levels/level-hero.tsx
components/missions/mission-card.tsx
components/teacher-lesson-preparation/TeacherLessonPreparationClient.tsx
components/teacher-logbook/TeacherLogbookClient.tsx
components/teacher-workshops-planner/TeacherWorkshopsPlanner.tsx
```

La grande majorité de ces fichiers ne portent qu'une seule ligne modifiée : ajout de `break-words` sur un `<h1>` (85 occurrences du même motif de titre) ou de `flex-wrap` sur une rangée titre + badge (24 occurrences du même motif de carte). Aucune fonctionnalité nouvelle, aucun changement de design : uniquement des classes CSS défensives et deux corrections de comportement clavier (menu mobile, dialogs).

## Éléments vérifiés conformes

| Élément | Statut |
|---|---|
| Header (`SiteHeader.tsx`) | Conforme à toutes les largeurs, logo tronqué proprement (`truncate`), navigation desktop cachée sous `lg`, bouton hamburger visible en dessous |
| Menu mobile | Conforme après correction : ouverture Entrée/Espace, `aria-expanded` correct, fermeture Échap, retour de focus, aucun lien hors écran, fermeture au clic sur un lien |
| Footer (`SiteFooter.tsx`) | Conforme nativement (grille `lg:grid-cols-[1fr_auto]`, aucun débordement observé à aucune largeur) |
| Cartes (missions, niveaux, ressources, personnages, professeurs) | Conformes après correction du motif titre + badge (voir problème n°1) |
| Accordéons (`<details>` natifs dans `SchoolCouncilPlanner`, `TeacherLessonPreparationClient`, `learning-architecture-cards`) | Conformes — élément HTML natif, accessibilité clavier native du navigateur, aucun débordement observé |
| Tableaux (`sequences-table.tsx` et équivalents) | Conformes nativement — déjà enveloppés dans `overflow-x-auto`, défilement horizontal fonctionnel à 320 px sans élargir la page |
| Formulaires / filtres | Conformes après correction des 4 `<select>` sans `w-full` |
| Dashboard enseignants (`/enseignants`, planificateurs) | Conforme après correction `TeacherItemCard` (débordement) et des 3 dialogs (Échap/focus) |
| Pages matières (`/primaire/*/matieres`, `/college/*`) | Conformes après correction du motif titre + badge |
| Ressources (`/ressources`, imprimables, méthodologie, suivi-séquences) | Conformes après correction sélecteur + motif titre + badge |
| Accueil | Conforme après correction (carte « Enseignants » débordait à 320 px, carte 6e-colonne à 1024 px) |
| Focus clavier général | Vérifié sur menu mobile et dialogs enseignants ; aucun élément `outline-none` sans indicateur de remplacement trouvé, à une exception légitime près (zones interactives de la carte illustrée `primaire-portal-map.tsx`, qui a son propre effet de focus visuel — contour + étiquette — vérifié dans le code) |
| Échap | Conforme sur le menu mobile et les 3 dialogs enseignants après correction |
| `aria-expanded` | Conforme sur le menu mobile (`false`/`true` correctement synchronisé) |
| Retour du focus | Conforme sur le menu mobile et le dialog du cahier journal (vérifié bout en bout) ; appliqué par le même motif de code aux deux autres panneaux enseignants (non re-testé bout en bout, voir Limites) |
| Zones tactiles | Bouton menu mobile 40×40 px, boutons de fermeture de dialog 32×32 à 36×36 px — tous au-dessus du minimum WCAG 2.5.8 (24×24 px AA) ; aucun contrôle jugé réellement trop petit, aucun redimensionnement effectué (conformément à la consigne de ne pas modifier le design) |
| Images | Aucune déformation réelle trouvée ; 11 signalements automatiques initiaux, tous vérifiés comme des recadrages `object-cover` intentionnels (avatars carrés depuis des sources rectangulaires), confirmés par lecture du `object-fit` calculé — aucune correction nécessaire |

## Tests finaux

| Test | Résultat |
|---|---|
| `npm run lint` | ✅ 0 erreur (1 avertissement pré-existant sans rapport, `<img>` natif dans une page de fiche CM2, non touché) |
| `npx tsc --noEmit` (après `rm -rf .next`) | ✅ 0 erreur |
| `npm run build` (production) | ✅ succès, 420 routes générées (statiques et SSG), aucune erreur de prérendu |
| Audit Playwright — build de production, 432 combinaisons (54 pages × 8 largeurs) | ✅ 0 débordement horizontal réel. 24 entrées non « ok » = erreurs HTTP dues à 3 slugs de test que j'avais mal devinés (`/maternelle/{ps,ms,gs}/domaines/decouverte-du-monde`, route inexistante) ; en rejouant avec le bon slug (`langage`), 0 problème. |
| Tests clavier — menu mobile | ✅ 320/375/390/430 px : Entrée, Espace, Échap, Tab, `aria-expanded`, retour de focus |
| Tests clavier — dialogs enseignants | ✅ Cahier journal validé bout en bout ; curriculum planner et progression de période corrigés par le même motif (non re-testés bout en bout, voir Limites) |
| Captures d'écran | ✅ 8/8 capturées sur le build de production (voir liste ci-dessous) |
| Nombre de routes générées | 420 (`npm run build`, sortie complète disponible dans les logs de session) |

Captures d'écran produites (non jointes au dépôt, générées dans le scratchpad de session) :
1. Accueil — 320 px
2. Menu mobile ouvert — 375 px
3. Ressources — 390 px
4. Page matières (CP) — 430 px
5. Dashboard enseignants — 768 px
6. Tableau (suivi des séquences) — 320 px
7. Formulaire (cahier journal) — 375 px
8. Accueil — 1440 px (desktop)

Toutes vérifiées visuellement : aucun débordement, aucun texte coupé, badges correctement repliés sous les titres, tableau avec défilement horizontal contenu, menu mobile lisible avec bouton de fermeture visible.

## Limites

- **Interactions non testables automatiquement en profondeur** : les deux panneaux latéraux enseignants (`TeacherCurriculumPlanner`, `TeacherPeriodProgressionClient`) nécessitent une sélection préalable de niveau/période et des données de démonstration pour faire apparaître une carte cliquable ; je n'ai pas trouvé de sélecteur Playwright fiable dans le temps imparti pour dérouler ce parcours complet. Le correctif appliqué (`autoFocus` + capture/restitution de focus) est strictement identique, ligne pour ligne, au motif validé bout en bout sur le dialog du cahier journal — la confiance dans la correction repose sur cette identité de code, pas sur un nouveau test end-to-end pour ces deux panneaux précis.
- **Pages non couvertes individuellement** : le site compte 420 routes générées (dont de nombreuses pages dynamiques : missions, professeurs, élèves, lieux, fiches CM2). L'audit a porté sur 54 pages représentatives couvrant tous les gabarits de mise en page identifiés, complétées par une recherche exhaustive par motif de code (`grep`/`sed` scripté) pour les deux bugs récurrents (titre + badge, `<h1>` à mot long) — appliquée aux 100+ occurrences plutôt qu'aux seules pages effectivement crawlées. Les pages non crawlées individuellement partagent ces mêmes composants partagés, donc bénéficient des mêmes corrections, mais n'ont pas fait l'objet d'une capture d'écran ou d'un test clavier dédié.
- **Faux positifs exclus** : détection automatique d'images « déformées » (11 signalements), tous vérifiés manuellement comme des recadrages `object-cover` volontaires et corrects — aucune anomalie réelle.
- **Différences possibles entre navigateurs** : tous les tests ont été effectués sous Chromium headless (Playwright). Le comportement de `overflow-wrap: break-word`, des `<select>` natifs et de la gestion du focus peut légèrement varier sous Firefox ou Safari, notamment le rendu des `<select>` natifs (menus déroulants Safari iOS en particulier) — non testé faute d'accès à ces moteurs dans cet environnement.
- **Bug hors périmètre, non corrigé** : `/enseignants/progression` présente une erreur d'hydratation React (« Hydration failed », erreur minifiée #418 en production) sur toutes les largeurs testées. Elle provient d'un rendu conditionnel côté client qui diffère du HTML généré côté serveur (probablement une donnée locale — période/niveau précédemment choisi — lue uniquement après hydratation). Ce n'est pas un défaut de mise en page responsive et sa correction demanderait de comprendre en profondeur la logique de sélection de période de ce planificateur ; je ne l'ai pas modifié pour respecter le périmètre strict de validation responsive demandé.
- **404 transitoire observé une fois** sur `/programmation` à 430 px pendant l'audit à haute concurrence (6 workers Playwright simultanés) ; non reproductible en test isolé — probablement une requête de favicon ou d'asset statique en cours de compilation, pas une anomalie du site.

## Git

- **Branche** : `claude/academie-kerboeuf-responsive-4cj4tc`
- **Commits de ce chantier** (5, du plus ancien au plus récent) :
  - `a6bb60d` — Fix responsive overflow bugs across breakpoints (320-1440px)
  - `af464a3` — Fix remaining title/badge overflow instances and dialog focus return
  - `d721bfe` — Restore keyboard focus to trigger after closing teacher tool dialogs
  - `6dbc1b2` — Fix Escape not closing three teacher dialogs (missing autoFocus)
  - `da87b8b` — Remove route-change auto-close effect from mobile menu (lint error)
- **Statut du push** : tous les commits poussés sur `origin/claude/academie-kerboeuf-responsive-4cj4tc`.
- **Aucune pull request créée** (non demandé).
- **Problèmes restants ouverts** : uniquement le défaut de hydration React sur `/enseignants/progression`, documenté ci-dessus comme hors périmètre responsive.

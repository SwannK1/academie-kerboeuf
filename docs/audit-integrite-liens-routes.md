# Audit d'intégrité des routes, liens et fichiers publics

**Date** : 1er août 2026
**Branche** : `claude/link-route-integrity-audit`
**Périmètre** : intégrité de navigation (routes, liens internes, fichiers publics, redirections, sitemap) après la consolidation de la gouvernance de publication. Aucune modification du référentiel central des statuts, du design, des contenus pédagogiques ni des règles métier de publication.

---

## 1. Pipelines de génération d'URL analysés

- **Routes App Router** : arborescence `app/**/page.tsx`, `generateStaticParams`, `dynamicParams`.
- **Registre de missions** : `content/mission-registry.ts` (`allMissions`, agrège CM2 + académie via `content/mission-adapters.ts`).
- **Parcours** : `content/learning-paths.ts` (`resolveLearningPath`, résout chaque étape en mission réelle + href).
- **Ressources classe** : `content/resources.ts` (`getClassroomResources`, projette les missions en cartes-ressources avec href).
- **Professeurs** : `content/professors.ts` (`rawProfessorProfiles`/`professorProfiles`, calcule `profileHref` une seule fois, consommé par plusieurs pages).
- **Académie / niveaux** : `content/academy.ts` (`getLevelPath`, `getLevelMissionsPath`, `getRecentMissions`).
- **Catalogue CP/CE1/CE2** : `content/levels/published-subdomain-pages.ts` (registre documenté dans `AGENTS.md`, route générique canonique).
- **Statuts publics** : `content/public-status.ts` (façade, `getPublicStatusKey`).
- **Redirections statiques** : `next.config.ts` (`redirects()`, 5 entrées).
- **Pages-redirects legacy** : 15 fichiers `page.tsx` utilisant `redirect()`/`permanentRedirect()` de `next/navigation` (routes CP/CE1/CE2/CM1 historiques, personnages historiques).
- **Sitemap** : `app/sitemap.ts` (liste manuelle de priorités + génération dynamique pour missions/matières/parcours).

## 2. Helpers de liens identifiés

| Helper | Fichier | Rôle |
|---|---|---|
| `getLevelPath` / `getLevelMissionsPath` | `content/academy.ts` | URL canonique d'un niveau / de sa page missions |
| `getMissionHref` *(nouveau, centralisé cette passe)* | `content/mission-registry.ts` | URL canonique d'une mission, quel que soit le stage |
| `getProfessorBySlug(...).profileHref` | `content/professors.ts` | URL canonique d'un professeur/personnage |
| `getPublishedSubdomainPage` | `content/levels/published-subdomain-pages.ts` | Route canonique catalogue CP/CE1/CE2 |
| `getPublicStatusKey` | `content/public-status.ts` | Statut normalisé, seule source pour toute condition d'affichage/lien |

## 3. Nombre de routes contrôlées

**420 routes** exactes (source : `.next/prerender-manifest.json`, généré par `npm run build`) — identique avant et après corrections.

## 4. Nombre de liens internes contrôlés

- **692 hrefs uniques** extraits du HTML statique généré (418 pages `.html` scannées), dont 677 internes et 15 ancres (exclues du contrôle, comme demandé).
- **366 hrefs de type route** contrôlés contre le manifest de routes, puis contre un serveur de production réel (HTTP).
- **83 entrées de sitemap.xml** contrôlées individuellement en HTTP.
- **5 redirections `next.config.ts`** + **15 pages-redirects legacy** testées explicitement.

## 5. Nombre de fichiers publics contrôlés

**309 liens de type fichier** (PDF, PNG sous `/fiches/...`, hors chunks `/_next/`) contrôlés contre l'arborescence réelle de `public/` — **0 fichier absent**, avant et après corrections.

## 6. Liens cassés identifiés

| # | Lien / motif | Où | Type d'anomalie |
|---|---|---|---|
| 1 | `/college/{niveau}/missions/{slug}` (12 destinations) | 3 générateurs (`app/missions-recentes/page.tsx`, `content/learning-paths.ts`, `content/resources.ts`) | Lien vers une route inexistante — le collège n'a pas de page de détail par mission |
| 2 | `/primaire/cm2/matieres/sciences-technologie` | `app/programmation/page.tsx` | Slug différent entre les données (`sciences`) et le lien codé en dur |
| 3 | `/professeurs/felix` → `/personnages/felix` (redirect intermédiaire, pas la destination finale `/eleves/felix`) | `content/professors.ts`, `content/elementary-places.ts`, `app/primaire/lieux/[slug]/page.tsx` | Route historique encore utilisée comme si elle était canonique |
| 4 | `/lycee/{niveau}/missions/{slug}` pour 8 missions au statut « à venir » | `content/mission-registry.ts` (`getMissionHref`), rendu dans `app/parcours/[slug]/page.tsx`, `app/professeurs/[slug]/page.tsx`, `app/eleves/[slug]/page.tsx`, `app/ressources/_components/resources-catalog.tsx` | CTA actif vers une page qui répond 404 (`notFound()` déclenché par le statut public) |
| 5 | Breadcrumb + lien retour → `/primaire/cm2/fiches/mathematiques` | `app/primaire/cm2/fiches/mathematiques/[notionSlug]/[sheetId]/page.tsx` | Route historique encore utilisée (redirect stub) au lieu de la route canonique |
| 6 | Entrée sitemap `/personnages/professeurs` | `app/sitemap.ts` | Entrée de sitemap ne répondant pas en HTTP 200 (308 — redirect pur, doublon de `/professeurs` déjà listé) |

## 7. Causes précises des anomalies

1. **#1** : trois générateurs d'URL indépendants (`missionHref` local à `app/missions-recentes/page.tsx`, `content/learning-paths.ts`, `content/resources.ts`) construisaient `/${stage}/${levelSlug}/missions/${slug}` sans tenir compte du fait que le collège n'a **aucune** page `/college/[level]/missions/[slug]` — seule la page du niveau existe (`app/college/[level]/page.tsx`, via `CollegeLevelEntry`, jamais de sous-route missions).
2. **#2** : chaîne codée en dur dans une page hors registre de contenu (`app/programmation/page.tsx` contient ses propres données `LevelProgramming[]`), avec une faute de frappe de slug jamais recoupée avec `content/cm2-subjects.ts`.
3. **#3** : Félix est un personnage-guide, pas un professeur de matière. `getAllProfessorSlugs()` l'exclut déjà correctement des pages `/professeurs/[slug]` générées (avec un commentaire l'expliquant), mais le `profileHref` calculé pour lui pointait vers `/personnages/felix` — qui s'est avéré être **lui-même** une page-redirect (`permanentRedirect("/eleves/felix")`), pas la destination finale. Confirmé uniquement par test HTTP réel avec suivi de la chaîne de redirections.
4. **#4** : `getMissionHref` (et ses 3 prédécesseurs avant centralisation) construisait une URL de détail mission sans vérifier `getPublicStatusKey(mission.status)`, alors que la page de détail lycée (`app/lycee/[level]/missions/[slug]/page.tsx`) appelle `notFound()` pour toute mission dont le statut n'est pas « disponible ». Le composant `MissionCard` gère déjà correctement ce cas ailleurs (lien désactivé + badge de statut) — le même garde-fou manquait dans 4 points de rendu.
5. **#5** : la page fiches français (`.../fiches/francais/[notionSlug]/[sheetId]/page.tsx`) avait déjà été corrigée pour pointer vers `/primaire/cm2/matieres/francais`, mais la page sœur mathématiques ne l'avait pas été — incohérence entre deux fichiers traitant le même problème.
6. **#6** : le sitemap listait à la fois une page-redirect pure et sa destination finale, déjà présente séparément dans la même liste.

## 8. Corrections réalisées

- **`content/mission-registry.ts`** : nouvelle fonction centralisée `getMissionHref(mission)` — gère le cas collège (renvoie la page du niveau), le cas primaire non-CM2 (renvoie la page missions du niveau), et le cas statut non disponible (renvoie la page de listing du niveau plutôt qu'un slug qui 404).
- **`app/missions-recentes/page.tsx`**, **`content/learning-paths.ts`**, **`content/resources.ts`** : suppression des 3 fonctions `missionHref` locales dupliquées, remplacées par un import de `getMissionHref`.
- **`content/professors.ts`** : `profileHref` de Félix corrigé vers `/eleves/felix` (destination finale réelle, vérifiée par test HTTP), à l'endroit unique où ce champ est calculé.
- **`content/elementary-places.ts`** : référence codée en dur à Félix mise à jour vers `/eleves/felix`.
- **`app/primaire/lieux/[slug]/page.tsx`** : `getProfessorHref` simplifié pour déléguer à `getProfessorBySlug(...).profileHref` (source centrale) au lieu de reconstruire l'URL localement — élimine un générateur concurrent.
- **`app/programmation/page.tsx`** : slug corrigé `sciences-technologie` → `sciences`.
- **`app/parcours/[slug]/page.tsx`** : les étapes de parcours dont le statut n'est pas « disponible » sont désormais rendues comme une carte statique avec badge de statut (`PublicStatusBadge`), au lieu d'un lien cliquable vers une page 404 — même logique que `MissionCard`.
- **`app/primaire/cm2/fiches/mathematiques/[notionSlug]/[sheetId]/page.tsx`** : breadcrumb et lien retour alignés sur `/primaire/cm2/matieres/mathematiques` (comme le fait déjà la page sœur français).
- **`app/sitemap.ts`** : entrée redondante `/personnages/professeurs` retirée (destination `/professeurs` déjà listée).

## 9. Helpers centralisés ou conservés

- **Centralisé** : la construction d'URL de mission (`getMissionHref`), dupliquée à l'identique dans 3 fichiers avec le même bug, a été fusionnée en un seul point dans `content/mission-registry.ts`.
- **Conservé sans modification** : `getLevelPath`, `getLevelMissionsPath`, `getPublicStatusKey`, `getPublishedSubdomainPage`, le registre `published-subdomain-pages.ts`, tous les redirects `next.config.ts`, et les 15 pages-redirects legacy (CP/CE1/CE2/CM1, `/personnages/felix`, `/personnages/professeurs`) — tous vérifiés fonctionnels et nécessaires à la rétrocompatibilité, non touchés.
- **Non centralisé volontairement** : `app/primaire/cm2/parcours/page.tsx` contient le même motif de rendu (lien d'étape non gardé par statut) que celui corrigé dans `app/parcours/[slug]/page.tsx`, mais **aucune** étape CM2 n'est actuellement au statut non-disponible — aucune anomalie vérifiée là, donc aucune modification (cf. section 13).

## 10. Fichiers modifiés

| Fichier | Changement |
|---|---|
| `content/mission-registry.ts` | Ajout de `getMissionHref` (centralisation + garde-fou de statut) |
| `app/missions-recentes/page.tsx` | Suppression du `missionHref` local, utilise `getMissionHref` |
| `content/learning-paths.ts` | Suppression du `missionHref` local, utilise `getMissionHref` |
| `content/resources.ts` | Suppression du `missionHref` local, utilise `getMissionHref` |
| `content/professors.ts` | `profileHref` de Félix → `/eleves/felix` |
| `content/elementary-places.ts` | Référence Félix → `/eleves/felix` |
| `app/primaire/lieux/[slug]/page.tsx` | `getProfessorHref` délègue à `profileHref` |
| `app/programmation/page.tsx` | Correction slug `sciences-technologie` → `sciences` |
| `app/parcours/[slug]/page.tsx` | Étapes non disponibles : carte statique + badge au lieu d'un lien 404 |
| `app/primaire/cm2/fiches/mathematiques/[notionSlug]/[sheetId]/page.tsx` | Breadcrumb + retour vers la route canonique |
| `app/sitemap.ts` | Retrait de l'entrée redondante `/personnages/professeurs` |
| `scripts/link-audit/*.mjs` *(nouveau, outillage)* | 3 scripts d'audit réutilisables : extraction des liens du HTML généré, vérification contre les routes/fichiers réels, test HTTP contre un serveur |

Aucun autre fichier touché. Aucune route, aucune structure de navigation, aucun statut, aucun contenu pédagogique modifié.

## 11. Résultats lint / TypeScript / build

| Étape | Résultat |
|---|---|
| `npm run lint` | Propre, 0 avertissement |
| `npx tsc --noEmit` | Propre, 0 erreur |
| `rm -rf .next && npm run build` | Propre, 0 avertissement, **420 routes générées** (identique avant/après) |

## 12. Résultats des tests HTTP

Serveur de production unique (`npm run start`), vérifié qu'aucun autre serveur n'était actif sur le port 3000 avant chaque lancement.

| Contrôle | Résultat |
|---|---|
| 366 liens internes de type route | **365 en 200, 1 redirection legitime (voir §13), 0 en 404, 0 en 5xx** |
| 309 liens de type fichier public | **309/309 présents sur disque** |
| 83 entrées `sitemap.xml` | **83/83 en HTTP 200** |
| `robots.txt` | 200 |
| 5 redirections `next.config.ts` | 5/5 fonctionnelles (308 → destination correcte) |
| 15 pages-redirects legacy (CP/CE1/CE2/CM1, personnages) | Toutes testées, résolvent vers une page réelle en 200 |
| Routes principales demandées (`/`, `/ressources`, `/missions-recentes`, `/programmes`, `/parcours`, `/primaire`, `/college`, `/lycee`, `/enseignants` + niveaux/matières/missions/ressources/parcours/PDF représentatifs) | Toutes en 200 |
| Tests fonctionnels réels (Playwright, sur le build de production) | 5/5 : survol carte, étape de parcours disponible reste cliquable, étape non disponible affiche un badge (pas de lien), breadcrumb/retour fiches maths corrects, carte Félix pointe directement vers `/eleves/felix`. **0 erreur console.** |

## 13. Anomalies laissées intactes et justification

- **`content/ce1-gaston-map.ts:86`** (`href: "/primaire/ce1/lecons"`) : ce lien traverse une redirection historique vers `/primaire/ce1/programmes/francais/etude-de-la-langue`. Fonctionnellement correct (200 après redirection), mais le contenu de la zone concernée (« Jardin de Gaston », thème méthode/autonomie) ne correspond pas clairement au thème de la page de destination (étude de la langue). Faute de preuve que cette page est la bonne cible sémantique, **le lien n'a pas été modifié** — remplacer une redirection fonctionnelle par un lien direct vers une destination dont la pertinence n'est pas établie aurait été une invention de destination.
- **`app/primaire/cm2/parcours/page.tsx`** : contient le même motif de rendu (lien d'étape non gardé par statut) que celui corrigé dans `app/parcours/[slug]/page.tsx`. Aucune étape CM2 actuelle n'a de statut non-disponible → aucune anomalie mesurée, aucune modification. Signalé comme risque latent en section 14.
- **`components/academy/level-overview.tsx`** : construit aussi `/professeurs/${slug}` sans passer par `profileHref`. Composant **inatteignable en production** : `app/college/[level]/page.tsx` route systématiquement les 4 niveaux collège vers `CollegeLevelEntry`, jamais vers `LevelOverview`. Code mort, non modifié (aucun risque réel, modification sans bénéfice).
- **`content/academy.ts` : `academyProfessors`/`rawAcademyProfessors`** : export non consommé par aucune page (`grep` confirmé). Contient la même construction `/professeurs/${slug}` sans le cas Félix, mais totalement inerte. Non modifié.
- **URLs OpenGraph/canoniques** : `og:url` est fixé à l'URL racine du site sur toutes les pages (hérité de `app/layout.tsx`, jamais surchargé par page). Ce n'est pas un lien cassé — c'est une lacune de métadonnées SEO distincte de l'intégrité des routes/liens, qui toucherait potentiellement les ~400 pages avec `generateMetadata`. Corriger cela site-large est un chantier de contenu/SEO séparé, hors périmètre de cet audit ; signalé ici sans modification.
- **`metadataBase` sur un domaine placeholder** (`https://academie-kerboeuf.fr`) : déjà signalé par un commentaire `TODO` du projet lui-même dans `app/layout.tsx` ; ce n'est pas une anomalie de cet audit, c'est une configuration de pré-production connue et documentée par l'équipe.
- **Routes CP legacy `/primaire/{cp,ce1,ce2}/lecons/[slug]`** (`dynamicParams = false`) : actuellement aucun slug ne correspond à une leçon publiée (contenu CP en cours de construction, cf. `AGENTS.md`), donc **tout** slug y répond 404. Vérifié qu'**aucun lien interne** ne pointe vers ces routes (recherché dans les 692 hrefs extraits) — routes de compatibilité pure pour d'anciennes URLs externes, conformes à la gouvernance documentée. Aucune anomalie réelle.

## 14. Risques restants

- **`app/primaire/cm2/parcours/page.tsx`** partage le motif corrigé dans `app/parcours/[slug]/page.tsx` (lien d'étape non gardé par le statut public). Si une future mission CM2 passe au statut « à venir » tout en restant référencée dans une étape de parcours, le même type de lien cassé réapparaîtra sur cette page spécifique. Recommandation : appliquer le même garde-fou (`getPublicStatusKey(step.status) === "available"`) si ce cas se présente.
- **Métadonnées OpenGraph/canoniques non individualisées par page** (section 13) : n'affecte pas la navigation interne, mais dégrade les aperçus de partage social et la détection des doublons par les moteurs de recherche. Nécessite un chantier dédié (ajout de `alternates.canonical`/`openGraph.url` par route).
- **`content/ce1-gaston-map.ts`** : le lien vers `/primaire/ce1/lecons` reste fonctionnel via redirection, mais sa pertinence sémantique par rapport à la page de destination n'a pas pu être confirmée avec les données disponibles — à faire trancher par une personne connaissant l'intention pédagogique d'origine.

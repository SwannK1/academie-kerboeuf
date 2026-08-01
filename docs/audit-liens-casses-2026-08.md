# Audit des liens cassés — Académie Kerboeuf

**Date** : 2026-08-01
**Branche** : `claude/broken-links-audit-7vrund`
**Objectif** : zéro lien interne cassé, zéro PDF référencé mais absent, zéro ancre invalide — vérifié sur un build de production réellement crawlé.

---

## Résumé

| Métrique | Valeur |
|---|---|
| Pages explorées par crawl (suivi de liens depuis `/`) | **678** pages uniques |
| Requêtes HTTP effectuées pendant le crawl | **678** |
| Attributs `href` rencontrés (occurrences brutes, non dédupliquées) | **9 673** |
| Cibles internes uniques découvertes | **677** |
| URL du `sitemap.xml` vérifiées individuellement en HTTP | **84** |
| Fichiers PDF requêtés pendant le crawl (parmi les liens suivis) | **154**, tous 200 |
| Références PDF/PNG extraites du code (littérales + templates `${BASE}`/`${PDF}`) | **252** |
| Fichiers `public/*.pdf` réels sur le disque | **154** |
| Ancres `#hash` contrôlées (scan exhaustif des 418 pages HTML statiques + recoupement source) | **17** |
| Liens externes (http/https) trouvés dans le contenu du site | **0** |
| **Liens cassés trouvés avant correction** | **20** |
| **Liens cassés restants après correction** | **0** |
| Ancres cassées | **0** |
| PDF référencés mais absents | **0** |
| URL avec double slash | **0** |
| Redirections anormales détectées | **0** |

---

## Méthode appliquée

1. **Analyse statique** — extraction programmatique de tous les `href=` (littéraux, template strings, propriétés d'objets `href:`, `route:`, `profileHref:`, `levelHref:`, `missionsHref:`, `missionsPath:`, `levelPath:`, `pdfHref:`, `imageHref:`, `resourceHref:`, `backHref:`) dans `app/`, `components/`, `content/`. Mise en correspondance avec l'arborescence réelle des routes de l'App Router (114 fichiers `page.tsx`, segments dynamiques `[level]`, `[slug]`, `[domain]`, `[subdomain]`, `[notionSlug]`, `[sheetId]` compris) via un matcher regex qui convertit chaque route de fichier en motif et teste chaque `href` extrait contre ce motif.
2. **Vérification des fichiers publics** — script temporaire (non conservé) qui extrait chaque référence `.pdf`/`.png` du code, la normalise, puis vérifie sa présence exacte (casse comprise, le filesystem Linux étant sensible à la casse) sous `public/`.
3. **Build de production** — `npm run build` (avec `rm -rf .next` préalable, requis par les règles du projet pour éviter les faux positifs `tsc` sur des fichiers `.next/types` obsolètes).
4. **Crawl HTTP réel** — le build est servi avec `next start -p 3100`, puis un crawler Node part de `/`, suit tous les `href` internes trouvés dans le HTML rendu réel (BFS, dédoublonnage par chemin normalisé, gestion des redirections 301/302/307/308, requêtes réelles sur les PDF), rapporte le code HTTP de chaque page et la page source de chaque lien cassé. Un second passage compare aussi chacune des 84 URL du `sitemap.xml` généré (`/sitemap.xml`) en HTTP direct, car deux pages du site (`/programmation`, `/primaire/cm2/sequences`) existent et sont valides mais ne sont liées depuis aucune autre page — elles ne sont donc pas atteintes par un crawl de liens pur, mais sont bien vérifiées via le sitemap.
5. **Correction ciblée** — pour chaque lien cassé confirmé, remontée à la fonction/source commune qui le génère (jamais de correctif page par page quand une source partagée existe), correctif minimal préservant les destinations valides.
6. **Nouveau cycle complet** — après chaque correctif, arrêt forcé des processus serveur existants (`pkill -9`), reconstruction complète (`rm -rf .next && npm run build`), redémarrage propre, nouveau crawl intégral. Répété jusqu'à 0 lien cassé stable.
7. **Validation technique finale** — `npx tsc --noEmit`, `npm run lint`, `npm run build`.

---

## Problèmes trouvés et corrigés

Un seul défaut structurel, **dupliqué dans trois générateurs de lien indépendants**, tous construisant une URL de détail de mission de la forme `/{stage}/{levelSlug}/missions/{slug}` sans vérifier que la page cible existe réellement pour ce niveau et ce statut.

### Cause racine

- Le **Collège** (`/college/[level]/...`) n'a **aucune route de détail par mission** — seule `/college/[level]` existe. `app/college/[level]/page.tsx` rend `CollegeLevelEntry`, qui n'affiche que des cartes matière (`/college/6e/ressources`, `/college/6e/methodes`, `/college/6e/reussir-son-entree-en-6e`), jamais de lien `/college/{level}/missions/{slug}`.
- Le **Lycée** (`app/lycee/[level]/missions/[slug]/page.tsx`) a bien une route de détail, mais son code appelle `notFound()` tant que `isMissionPubliclyAvailable(mission)` est faux (statut ≠ « disponible »).

Trois sources de contenu généraient un lien vers ce schéma d'URL pour **toute** mission, sans tenir compte de ces deux contraintes :

| # | Page source | Ancienne URL (exemple) | Raison précise de l'échec | Fichier de code responsable | Correction appliquée |
|---|---|---|---|---|---|
| 1 | `/missions-recentes` | `/college/6e/missions/lecture-de-carte` | Aucune route `/college/[level]/missions/[slug]` n'existe dans `app/` | `app/missions-recentes/page.tsx` (`missionHref()`) | Redirection vers `/college/{level}` (page de niveau, existante) pour toute mission `stage === "college"` |
| 2 | `/missions-recentes` | `/lycee/seconde/missions/lecture-analytique` | Route existante mais `notFound()` déclenché : mission au statut « à venir » | `app/missions-recentes/page.tsx` (`missionHref()`) | Redirection vers `/lycee/{level}/missions` (liste, existante) quand `getPublicStatusKey(status) !== "available"` |
| 3 | `/ressources`, `/professeurs/[slug]`, `/eleves/[slug]`, pages niveau via `content/curriculum.ts` | Idem collège (12 URL) et lycée non disponible (via `getClassroomResources()`) | Même cause que ci-dessus | `content/resources.ts` (`isLinkableMission()`) | Mission collège exclue de `getClassroomResources()` (aucune cible valide à proposer) ; mission lycée exclue tant que `status !== "disponible"` |
| 4 | `/parcours/[slug]` | `/college/3e/missions/brevet`, `/lycee/terminale/missions/philosophie`, etc. | Idem | `content/learning-paths.ts` (`missionHref()`, utilisé par `resolveLearningPath()`) | Même repli que source 1 : `/college/{level}` pour le collège, `/lycee/{level}/missions` pour le lycée non disponible |

**20 URL 404 confirmées par le crawl avant correction** :

```
/college/6e/missions/lecture-de-carte
/college/6e/missions/recit-mythologique
/college/6e/missions/proportionnalite-simple
/college/5e/missions/raisonnement-logique
/college/5e/missions/civilisation-medievale
/college/5e/missions/experience-scientifique
/college/4e/missions/argumentation
/college/4e/missions/fonctions-simples
/college/4e/missions/revolution-industrielle
/college/3e/missions/brevet
/college/3e/missions/analyse-de-document
/college/3e/missions/organisation-des-revisions
/lycee/seconde/missions/lecture-analytique
/lycee/seconde/missions/raisonnement-scientifique
/lycee/premiere/missions/dissertation
/lycee/premiere/missions/commentaire
/lycee/premiere/missions/histoire-des-idees
/lycee/terminale/missions/philosophie
/lycee/terminale/missions/orientation
/lycee/terminale/missions/strategie-de-revision
```

Après correction, ces mêmes missions restent visibles (aucun contenu masqué, aucun texte modifié) mais leur lien pointe vers une destination réelle et cohérente : la page du niveau pour le collège, la liste des missions du niveau pour le lycée non disponible — exactement le motif de repli déjà utilisé ailleurs dans le code (`components/missions/mission-card.tsx` gate déjà sur `getPublicStatusKey(status) === "available"` avant de rendre un lien cliquable).

Aucun autre lien cassé n'a été trouvé dans les 678 pages crawlées, les 84 URL du sitemap, les 252 références PDF/image, ni les 17 ancres du site.

---

## Fichiers modifiés

| Fichier | Changement |
|---|---|
| `app/missions-recentes/page.tsx` | `missionHref()` : ajout d'un repli vers `/college/{level}` (collège) et `/lycee/{level}/missions` (lycée non disponible) avant de construire le lien de détail par défaut. |
| `content/resources.ts` | `isLinkableMission()` : exclusion des missions collège (aucune page de détail n'existe) et des missions lycée dont le statut brut n'est pas `"disponible"`, en plus du filtre primaire déjà présent. |
| `content/learning-paths.ts` | `missionHref()` : même repli que dans `app/missions-recentes/page.tsx`, appliqué aux étapes de parcours (`resolveLearningPath()`). |

Aucun autre fichier modifié. Aucune modification de design, de texte, de composant d'accessibilité, ni de route/fichier créé.

---

## Éléments vérifiés et conformes

| Zone | Résultat |
|---|---|
| **Header** (`components/academy/SiteHeader.tsx`) | 6 liens statiques (`/`, `/maternelle`, `/primaire`, `/college`, `/lycee`, `/univers`), tous valides. |
| **Menu mobile** | Même liste que le header desktop (composant partagé, pas de duplication de données), tous valides. |
| **Footer** (`components/academy/SiteFooter.tsx`) | 5 liens de navigation, tous valides. |
| **CTA** (boutons d'action sur pages niveau, missions, ressources, parcours) | Tous les `href` littéraux et calculés vérifiés par correspondance de route ; les 3 sources défectueuses corrigées (voir ci-dessus). |
| **Breadcrumbs** (`components/navigation/breadcrumb.tsx`) | Composant générique recevant des `items` passés par chaque page ; les `href` transmis proviennent des mêmes sources déjà auditées (aucune donnée propre au composant). |
| **Sitemap** (`app/sitemap.ts` → `/sitemap.xml`) | 84 URL déclarées, toutes retournent 200 en HTTP direct. Un risque latent est signalé (non corrigé, aucun impact réel actuellement) : `cm2LessonRoutes` référence un motif de route à 4 segments dynamiques qui n'existe pas dans `app/`, mais sa source (`lesson.routeSlug` dans `content/cm2-learning-tree.ts`) n'est jamais renseignée → le générateur produit toujours un tableau vide. À surveiller si ce champ est utilisé à l'avenir. |
| **Ressources** (`/ressources`, `/ressources/imprimables`, `/ressources/methodologie`, `/ressources/suivi-sequences`) | Corrigé (voir ci-dessus pour `getClassroomResources`) ; le reste des liens de ces pages est valide. |
| **PDF** | 252 références extraites du code (dont 190 via les constantes `BASE`/`PDF` de `content/cm2-francais-fiches.ts`, 62 en chemin littéral), toutes résolues vers un fichier réel sous `public/` (154 fichiers PDF distincts). Aucun bouton de téléchargement ne pointe vers un contenu non publié : les liens PDF respectent déjà la règle du projet (`getPublicStatusKey(resource.status) === "available"` ET `resource.href` défini avant tout rendu de lien cliquable). |
| **Matières** (`/primaire/{niveau}/matieres[/slug]`, `/college/[level]`) | Toutes les routes par slug de matière correspondent à un `generateStaticParams` réel ; aucune incohérence trouvée entre niveaux. |
| **Enseignants** (`/enseignants/*`, 20+ pages d'outils) | Aucun lien cassé. Les deux seuls champs `target="_blank"` avec URL saisie librement par l'enseignant (planificateur de séance, formation continue) sont des données d'exécution côté utilisateur, hors périmètre d'un audit de contenu — déjà pourvus de `rel="noreferrer"`. |
| **Pages professeurs** (`/professeurs`, `/professeurs/[slug]`) | Corrigé pour la section « Ressources associées » (voir ci-dessus) ; le reste (missions liées via `MissionCard`, qui gate déjà sur le statut, liens de navigation) est valide. |
| **Univers** (`/univers`, `/univers/cartotheque`, `/univers/lieux`, `/carte`) | Aucun lien cassé. |
| **Parcours** (`/parcours`, `/parcours/[slug]`) | Corrigé (voir ci-dessus) ; le reste des liens (retour parcours, liens ressources) est valide. |
| **Missions** (`/primaire/cm2/missions[/slug]`, `/lycee/[level]/missions[/slug]`, `/missions-recentes`) | Corrigé pour `/missions-recentes` (voir ci-dessus) ; les pages de détail elles-mêmes ne contenaient aucun lien cassé. |
| **Ancres `#hash`** | 17 occurrences au total sur les pages statiques du site (`/programmation` : 3, `/primaire/cm2/sequences` : 11, `/lycee/{seconde,premiere,terminale}` : 1 chacune). Chaque cible a un `id=` correspondant, unique, généré par la même fonction pure (`domainId()`/`domainAnchor()`) qui produit à la fois le `href` et le `id` — aucune divergence possible entre client et serveur. |
| **Liens externes** | 0 lien externe dans le contenu du site (aucune balise `<a>`/`<Link>` pointant vers un domaine tiers). Seule la constante `BASE_URL = "https://academie-kerboeuf.fr"` est utilisée pour les métadonnées (sitemap, robots, Open Graph), jamais comme lien cliquable. |
| **Doubles slashs / encodage** | 0 occurrence détectée par le crawl (toute construction produisant un `//` accidentel se serait manifestée comme une URL distincte visitée et éventuellement cassée — aucune trouvée) ; toutes les URL du site sont en minuscules ASCII sans espace ni accent. |
| **Routes legacy CP** (`/primaire/cp/[domainSlug]/[subdomainSlug]`, `/primaire/cp/lecons/[slug]`) | Conformes aux règles de gouvernance du projet (`AGENTS.md`) : redirections statiques cohérentes avec `content/levels/published-subdomain-pages.ts`, non transformées en pages de rendu. |

### Observation hors périmètre (non corrigée)

Deux pages existent, répondent 200 et sont déclarées dans le sitemap, mais ne sont liées depuis aucune autre page du site : `/programmation` et `/primaire/cm2/sequences`. Ce ne sont pas des liens cassés (rien ne pointe vers une mauvaise destination) mais des pages sans lien entrant interne — une question de navigation/IA, pas de lien cassé. Non modifié, conformément à la consigne de ne pas toucher aux éléments sans rapport avec les liens.

---

## Tests

### Crawl avant correction
```
Pages crawlées : 698 (avant que les corrections ne réduisent le graphe de liens)
Liens cassés   : 20 (liste ci-dessus)
Ancres cassées : 0
```

### Crawl après correction (validation finale)
```
Pages crawlées                         : 678
Requêtes HTTP                          : 678
Attributs href rencontrés (bruts)      : 9 673
Cibles internes uniques                : 677
Liens cassés                           : 0
Ancres vérifiées (scan HTML complet)   : 17
Ancres cassées                         : 0
URL du sitemap vérifiées individuellement : 84 / 84 → 200
PDF requêtés pendant le crawl          : 154 / 154 → 200
Liens externes détectés                : 0
URL avec double slash                  : 0
```

### Vérification des fichiers publics
```
Références PDF/PNG extraites du code : 252
Fichiers manquants sous public/      : 0
```

### `npx tsc --noEmit`
```
Exit code : 0 — aucune erreur.
```

### `npm run lint`
```
Exit code : 0
1 avertissement préexistant, sans rapport avec les liens :
  app/primaire/cm2/fiches/mathematiques/[notionSlug]/[sheetId]/page.tsx:117
  @next/next/no-img-element — suggestion d'utiliser next/image au lieu de <img>.
```

### `npm run build`
```
Exit code : 0 — build de production complet, toutes les pages générées avec succès
(y compris les pages SSG à `dynamicParams = false`, qui échoueraient au build
si un generateStaticParams référençait une donnée incohérente).
```

---

## Limites

- Le site ne contenant **aucun lien externe** dans son contenu (seule une URL de base est utilisée pour les métadonnées), la vérification des statuts HTTP de services tiers, redirections externes ou domaines erronés n'a pas eu de cas réel à tester. Si des liens externes sont ajoutés à l'avenir, un contrôle réseau dédié sera nécessaire.
- Les deux champs `target="_blank"` de saisie libre (outils enseignants) contiennent des URL entrées par l'utilisateur à l'exécution ; leur validité ne peut pas être vérifiée statiquement ni par crawl, car ils ne font pas partie du contenu figé du site.
- Le crawl HTTP a été exécuté dans l'environnement du conteneur (`127.0.0.1:3100`), sans accès au nom de domaine de production ; le comportement de `academie-kerboeuf.fr` en production n'a pas été testé directement (hors périmètre : pas de réseau externe pertinent ici, aucun lien externe dans le site de toute façon).

---

## Git

- **Branche** : `claude/broken-links-audit-7vrund`
- **Commit de correction des liens** : `bea43fe` — *Fix broken mission links for collège and lycée non-disponible missions*
- **Commit de ce rapport** : voir message de commit suivant
- **Push** : effectué sur `origin/claude/broken-links-audit-7vrund` (jamais sur `main`)
- **Pull request** : non créée (non demandée explicitement)

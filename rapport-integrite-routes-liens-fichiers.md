# Rapport d'intégrité — routes, liens internes et fichiers publics

Académie Kerboeuf — audit complet du site.

## ⚠️ Note préalable importante

Cette reprise a commencé par une vérification de l'état réel du dépôt, comme demandé.
**Résultat : aucune des 7 corrections décrites comme « déjà appliquées » dans la
consigne de reprise n'était présente sur la branche `claude/audit-kerboeuf-integrity-gj3vx2`.**

- `git log` : le dernier commit de la branche est `c5e69df` (merge PR #304,
  « fix: align CP guide character with Kiwi »), sans lien avec cet audit.
- `git status` : working tree propre, aucune modification en attente.
- `HEAD` de la branche == `origin/main` : aucun commit, aucun stash, aucune
  branche locale supplémentaire ne contient ce travail.
- Vérification directe du code : `content/mission-registry.ts` ne contenait
  aucun helper de construction d'URL ; `app/missions-recentes/page.tsx`
  avait toujours sa fonction locale `missionHref()` non centralisée ;
  `app/programmation/page.tsx:48` pointait toujours vers
  `/primaire/cm2/matieres/sciences-technologie` (slug invalide) ; aucun
  script de crawl n'existait dans `scripts/` ; aucun fichier de rapport
  n'existait.

Conclusion : le travail décrit s'est probablement perdu à la limite d'usage
signalée avant d'être committé. L'audit a donc été **repris intégralement
depuis le début** dans cette session, en respectant les consignes (ne pas
recréer un helper si un helper central existant répond au besoin, ne
corriger que les anomalies réelles).

---

## État initial (constaté au début de cette reprise)

- Branche : `claude/audit-kerboeuf-integrity-gj3vx2`
- Commit de départ : `c5e69dfae0214d97f30ee5b264635185b1729c98`
- Modifications déjà présentes : **aucune** (voir note ci-dessus)
- Routes recensées (`prerender-manifest.json`) : **420** — conforme à la
  valeur de référence
- Fichiers publics absents : **0** (confirmé par le crawl de cette reprise)
- Liens cassés « initiaux » au sens de la consigne (14) : **non vérifiables**
  — aucune trace de ce chiffre n'existe dans le dépôt (pas de rapport, pas de
  commit, pas de script). Le crawl réalisé dans cette session a identifié
  **21 anomalies réelles** avant correction (voir plus bas), regroupées
  autour de deux causes racines.

## Pipelines analysés

- Routes statiques et dynamiques (420 routes, `prerender-manifest.json`)
- Missions (primaire CM2, collège, lycée)
- Ressources classe (`content/resources.ts`)
- Parcours pédagogiques (`content/learning-paths.ts`, `/parcours/[slug]`)
- Profils professeurs (`content/professors.ts`, `/professeurs/[slug]`)
- Fichiers PDF et fiches (CM2 français/mathématiques)
- `sitemap.xml`
- Breadcrumbs
- CTA de niveau, de mission et de matière
- Liens construits côté client (cartes de mission, catalogues)

## Anomalies identifiées et corrigées

### 1. Slug de matière invalide — `/programmation`

- **URL cassée** : `/primaire/cm2/matieres/sciences-technologie`
- **Origine** : `app/programmation/page.tsx:48`, item de menu « Sciences et
  technologie »
- **Cause** : le slug réel de la matière CM2 est `sciences`
  (`content/cm2-subjects.ts:85`) ; `sciences-technologie` n'a jamais été un
  slug valide, donc jamais généré par `generateStaticParams`.
- **Correction** : `href` changé pour `/primaire/cm2/matieres/sciences`.
- **Résultat final** : `200 OK`.

### 2. Construction non sécurisée des URL de mission (cause racine des 20 autres anomalies)

Trois fichiers réimplémentaient chacun leur propre fonction locale
`missionHref(mission)` qui construisait **sans condition** :

```
/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}
```

Ce schéma n'est valide que dans deux cas précis :
- la mission est **CM2** (route dédiée `/primaire/cm2/missions/[slug]`) ;
- la mission est **lycée** (route dédiée `/lycee/[level]/missions/[slug]`) —
  **et seulement si son statut public est `disponible`**, car ces pages sont
  pré-rendues avec un `notFound()` explicite pour tout contenu non publié.

Le **collège n'a aucune route de détail de mission** (`app/college/[level]`
n'a pas de sous-route `missions/[slug]`) : un lien collège vers une mission
individuelle est **toujours** cassé.

Fichiers concernés et lien cassé type :

| Fichier | Origine dans la page | Exemple d'URL cassée |
| --- | --- | --- |
| `app/missions-recentes/page.tsx` | Cartes de la vitrine « Missions récentes » | `/college/6e/missions/lecture-de-carte` |
| `content/learning-paths.ts` | Étapes des parcours (`app/parcours/[slug]/page.tsx`) | `/college/3e/missions/brevet`, `/lycee/terminale/missions/philosophie` |
| `content/resources.ts` | Ressources associées sur les fiches professeurs (`app/professeurs/[slug]/page.tsx`) | idem |

**Correction** : centralisation dans `content/mission-registry.ts`
(le registre canonique déjà utilisé par les trois fichiers), nouvelle
fonction exportée `getMissionHref(mission)` :

- mission CM2 ou lycée **et** statut public `available` → lien direct vers
  la page de détail ;
- tout autre cas (collège, ou mission CM2/lycée non encore publiée) → repli
  sur `getLevelMissionsPath(level)` (helper déjà existant dans
  `content/academy.ts`, qui renvoie la page de niveau pour le collège et la
  page de listing des missions pour CM2/lycée — jamais une route morte).

Les trois fonctions locales `missionHref()` dupliquées ont été supprimées
au profit de cet unique point d'entrée.

**Résultat final** : les 20 liens vers des missions collège/lycée non
disponibles ne sont plus jamais générés comme liens cliquables ; ils
pointent désormais vers une page de niveau ou de listing toujours valide.

## Vérification ciblée (demandée dans la consigne)

| Zone | État après correction |
| --- | --- |
| Missions collège | Plus aucun lien vers une route de détail inexistante ; renvoie vers la page de niveau (`/college/[level]`). |
| Parcours collège/lycée (`3e-preparer-le-brevet`, `terminale-philosophie-et-strategie-de-revision`, etc.) | Étapes non disponibles renvoient vers `/college/[level]` ou `/lycee/[level]/missions` — vérifié par crawl HTML direct sur `/parcours/terminale-philosophie-et-strategie-de-revision` : 3 liens `/lycee/terminale/missions` (200), 0 lien mort. |
| `/programmation` | Slug `sciences` corrigé, `200 OK`. |
| Matière « sciences » | `/primaire/cm2/matieres/sciences` → `200 OK`. |
| Pages de professeurs | `resource.href` (ressources associées) passe désormais par `getMissionHref` — vérifié 0 lien mort sur `/professeurs/[slug]`. |
| Félix | `/professeurs/felix` → 308 → `/personnages/felix` → 308 → `/eleves/felix` → `200 OK`. Chaîne de redirection **intentionnelle** (commits historiques `3ebc164` et `7dff012`, antérieurs à cette session) : Félix est un « élève emblématique », pas un professeur de matière. Aucune anomalie, aucune correction nécessaire. |
| Pages de lieux (`/primaire/lieux/[slug]`) | 0 lien mort détecté par le crawl. |
| Missions récentes (`/missions-recentes`) | `missionHref` local remplacé par `getMissionHref` centralisé, 0 lien mort. |

**Les 8 URL de mission collège/lycée non publiées restent statiquement
pré-rendues en 404 intentionnel** (`notFound()` appelé dans
`app/lycee/[level]/missions/[slug]/page.tsx` quand le statut n'est pas
`disponible`) — c'est le comportement voulu par la gouvernance de contenu
(« pas de faux contenu pour une mission non publiée »). Le script de crawl
confirme qu'**aucune page vivante ne pointe plus vers ces URL** — ce ne
sont donc plus des liens cassés, seulement des pages orpheline
statiquement prévues pour retourner 404 si on les tape directement.

## Helpers

- **Helper retenu pour la construction d'URL de mission** :
  `getMissionHref()` dans `content/mission-registry.ts` (nouveau, ajouté
  cette session — le fichier existait déjà mais ne contenait aucun helper
  de ce type, contrairement à ce qu'indiquait la consigne de reprise).
- **Helper existant réutilisé** (pas recréé) : `getLevelMissionsPath()`,
  déjà présent dans `content/academy.ts` et déjà utilisé par
  `components/academy/level-missions.tsx` — c'est le fallback sûr utilisé
  par `getMissionHref()`.
- **Anciens helpers locaux supprimés** :
  - `missionHref()` dans `app/missions-recentes/page.tsx`
  - `missionHref()` dans `content/learning-paths.ts`
  - `missionHref()` dans `content/resources.ts`
- **Constructions locales volontairement conservées** (légitimes,
  contextuelles, toutes vérifiées 0 lien mort par le crawl) :
  - `/primaire/cm2/missions/${slug}` dans `components/cm2/teacher-dashboard.tsx`,
    `app/primaire/cm2/matieres/[slug]/page.tsx`, `app/primaire/cm2/parcours/page.tsx`,
    `app/primaire/cm2/missions/page.tsx`, `app/sitemap.ts` — toutes filtrent déjà
    sur les missions CM2 effectivement publiées à la source, donc sans risque.
  - `content/academy.ts` (`getRecentMissions()`) contient un pattern
    similaire non gardé par le statut, **mais cette fonction n'est
    importée nulle part dans le code actuel** (vérifié par recherche
    globale) : code mort, hors périmètre de cet audit, laissé tel quel.

## Résultats du crawl

Crawl exécuté avec `scripts/audit-links.mjs` (nouveau script, aucun script
de crawl préexistant trouvé dans le dépôt) contre un unique serveur
`next start` de production (port 3100, build propre, aucun autre serveur
actif). Deux passes : une immédiatement après les 2 premières corrections,
une passe finale après la correction complète + rebuild propre.

| Mesure | Avant (1ʳᵉ passe, ce audit) | Après (passe finale) |
| ------------------------------ | ----: | ----: |
| Routes générées | 420 | 420 |
| Pages parcourues | 420 | 420 |
| Liens extraits (bruts) | 14 251 | 14 251 |
| Liens internes uniques | 808 | 677 |
| Routes testées | 435 | 419 |
| Fichiers publics testés | 418 | 309 |
| Liens cassés réels (404 atteignables depuis un lien vivant) | 21 | **0** |
| 404 orphelins (pages non publiées, jamais liées, comportement voulu) | — | 8 |
| Fichiers publics absents | 0 | 0 |
| Redirections internes | 16 | 16 (toutes saines, résolvent en ≤2 sauts vers un 200) |
| Erreurs serveur (5xx) | 1 (`/_global-error`, faux positif du crawler — route interne Next.js, corrigé dans le script) | 0 |
| Erreurs réseau | 0 | 0 |
| URL du sitemap | 84 | 84 |
| URL du sitemap en erreur | 0 | 0 |
| Doublons dans le sitemap | 0 | 0 |

Note sur le sitemap : la consigne de reprise mentionne une base de 222 URL
lors d'un audit précédent. Cette valeur n'a pu être ni retrouvée ni
vérifiée (aucun artefact du prétendu audit précédent n'existe dans le
dépôt). Le `app/sitemap.ts` actuel génère 84 URL de façon cohérente et
entièrement fonctionnelle (0 erreur, 0 doublon) ; aucune route explicitement
publique n'en est absente au vu du contenu du fichier.

## Fichiers modifiés (ensemble du chantier, cette reprise incluse)

- `app/programmation/page.tsx` — correction du slug `sciences-technologie` → `sciences`.
- `app/missions-recentes/page.tsx` — suppression de `missionHref()` local, usage de `getMissionHref()`.
- `content/learning-paths.ts` — suppression de `missionHref()` local, usage de `getMissionHref()`.
- `content/resources.ts` — suppression de `missionHref()` local, usage de `getMissionHref()`.
- `content/mission-registry.ts` — ajout du helper central `getMissionHref()`.
- `scripts/audit-links.mjs` — nouveau script de crawl (routes, fichiers publics, sitemap, distinction lien mort réel / page orpheline intentionnelle).
- `rapport-integrite-routes-liens-fichiers.md` — ce rapport.

Aucun autre fichier n'a été modifié. Aucune fonctionnalité hors périmètre
de l'audit n'a été touchée.

## Validation

- `npm run lint` : **0 erreur** (1 avertissement préexistant et non lié,
  `no-img-element` sur une fiche CM2 mathématiques, non modifié par cet
  audit).
- `npx tsc --noEmit` (après `rm -rf .next`) : **0 erreur**.
- `rm -rf .next && npm run build` : **succès**, 420 routes générées, aucune
  route manquante, aucune régression sur les routes dynamiques.
- Crawl complet (serveur unique `next start`, port libre) : **0 lien
  interne cassé réellement atteignable**, 0 fichier public absent, 0 erreur
  serveur, 0 erreur réseau.
- `sitemap.xml` : 84/84 URL en 200, 0 doublon.
- Fichiers publics : 309 fichiers référencés testés, 0 absent, 0 erreur.
- Vérification navigateur (Playwright/Chromium) sur les pages clés
  (`/`, `/missions-recentes`, `/parcours/3e-preparer-le-brevet`,
  `/parcours/terminale-philosophie-et-strategie-de-revision`,
  `/programmation`, `/lycee/seconde/missions`, `/professeurs/felix`) :
  **0 erreur console, 0 erreur d'hydratation**.
- Routes critiques testées manuellement (`/`, `/ressources`,
  `/missions-recentes`, `/programmes`, `/parcours`, `/programmation`,
  `/primaire`, `/college`, `/lycee`, `/enseignants`, plusieurs pages de
  niveau, de mission, de matière, de professeur, de parcours) : toutes en
  200 (ou redirection saine attendue).

## Limites

- Le crawl est un crawl **statique HTML** (extraction regex des attributs
  `href`/`src`), pas une exécution JavaScript complète : les liens générés
  uniquement après une interaction utilisateur (ex. sélection dans un
  filtre client, formulaire) ne sont pas couverts. La vérification
  Playwright ciblée ci-dessus complète partiellement ce point sur les
  pages jugées les plus à risque.
- Aucune URL dépendant du `localStorage` (ex. état du panneau enseignant)
  n'a été testée, ce type de route n'existant pas dans ce site.
- La valeur de référence de 222 URL pour le sitemap et de 14 liens cassés
  initiaux n'a pas pu être vérifiée : aucun artefact du prétendu audit
  précédent n'existe sur cette branche (voir note préalable). Les chiffres
  « avant » de ce rapport sont ceux mesurés en tout début de cette reprise,
  pas ceux d'une session antérieure disparue.
- Différences possibles en production distante non testées ici (CDN,
  domaine réel `academie-kerboeuf.fr` utilisé dans `app/sitemap.ts` vs
  `localhost:3100` utilisé pour le crawl).

## Résultat final

- **0** lien interne public en 404 réellement atteignable
- **0** route du sitemap en erreur
- **0** fichier public référencé mais absent
- **0** CTA actif vers une destination inexistante
- **0** breadcrumb cassé
- **0** ancienne URL encore utilisée comme lien direct (les anciennes
  routes legacy CP/CM1/CM2 sont conservées uniquement comme redirects,
  conformément à `AGENTS.md`)
- **0** divergence injustifiée entre les générateurs d'URL (3 divergences
  réelles trouvées et corrigées par centralisation ; les constructions
  locales restantes sont légitimes et vérifiées saines)
- lint réussi, TypeScript réussi, build réussi (420/420 routes)

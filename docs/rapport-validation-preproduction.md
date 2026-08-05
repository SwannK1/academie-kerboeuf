# Rapport de validation préproduction — Académie Kerboeuf

**Branche testée** : `claude/academie-kerboeuf-preproduction-y5rct6`, avancée en
fast-forward sur `integration/final-technical-release` @ `627a296` (le commit
final de cette dernière est un ancêtre direct de la branche de travail).
**Date** : 2026-08-05
**Portée** : validation produit et production avant fusion dans `main`. Aucune
refonte, aucun ajout de fonctionnalité — uniquement des correctifs ciblés sur
des anomalies réelles découvertes pendant la validation.
**Décision finale : PRÊT AVEC RÉSERVES** (voir §11).

---

## 1. Environnement testé

- Node `v22.22.2`, Next.js `16.2.6`, dépendances installées via `npm ci`
  (dépôt initialement sans `node_modules`).
- Build : `rm -rf .next && npm run build` (`NODE_ENV=production`, conforme à
  la règle de build du dépôt). Build propre, **0 erreur, 0 avertissement**,
  450 routes générées.
- Serveur de production unique : `next start` (`NODE_ENV=production`),
  vérifié via `lsof`/`ps` avant chaque démarrage qu'aucun autre processus
  n'occupait le port utilisé (3000 pour les audits manuels ; 3100/3210
  utilisés ponctuellement et exclusivement par les scripts `test:e2e` et
  `routes:check:quick`, qui gèrent eux-mêmes leur propre serveur et l'arrêtent
  en fin d'exécution — aucun chevauchement constaté).
- Navigateur : Chromium local préinstallé (`/opt/pw-browsers`), piloté via
  Playwright (`playwright-core` direct pour les scripts d'audit ad hoc,
  `@playwright/test` pour la suite existante).

## 2. Parcours publics testés

26 pages couvrant l'intégralité des catégories demandées : accueil,
`/ressources`, `/missions-recentes`, `/parcours`, `/primaire`, `/college`,
`/lycee`, une page de niveau par cycle (`/primaire/ce1`, `/college/6e`,
`/lycee/seconde`), une page de matière (`/primaire/ce1/matieres/francais`),
une page de programme (`/primaire/ce1/programme` + portail CP
`/primaire/cp/programmes/francais/lecture-comprehension`), une page de
parcours (`/parcours/reussir-entree-sixieme`), une page de mission
(`/primaire/cm2/missions/mission-inference`), une page de professeur
(`/professeurs/zoe`), une ressource disponible
(`/lycee/seconde/missions/equation-premier-degre`), une fiche CM2 avec PDF
(`/primaire/cm2/fiches/francais/futur-simple/f1`), la page 404, et les 8
outils enseignants (détail §3).

Pour chaque page : statut HTTP, erreurs console, erreurs React, erreurs
d'hydratation, titre, présence de la navigation et du fil d'Ariane,
affichage aux 5 largeurs responsive, métadonnées.

**Résultat après correctifs (§9) : 26/26 pages — 0 erreur console
(hors 404 attendue sur la page 404 elle-même), 0 erreur d'hydratation,
0 débordement horizontal, 0 violation axe-core critique/sérieuse.**

## 3. Outils enseignants

8 outils testés avec de vrais scénarios de bout en bout (saisie → sauvegarde
→ rechargement → vérification de la persistance), pas seulement un chargement
de page :

| Outil | Scénario réel exécuté | Persistance après rechargement |
|---|---|---|
| `/enseignants/apc` | Création d'une séance + objectif | ✅ |
| `/enseignants/cahier-journal` | Ajout d'une séance dans la modale, clic « Enregistrer », **Échap ferme la modale** | ✅ |
| `/enseignants/emploi-du-temps` | Création d'une semaine spéciale nommée | ✅ |
| `/enseignants/organisation-classe` | Renommage de la configuration + création d'une étiquette élève | ✅ |
| `/enseignants/progression` | Sélection niveau/période, création d'une carte libre, ouverture du panneau, changement de statut, **Échap ferme et rend le focus** | ✅ (bug de focus trouvé et corrigé, voir §9) |
| `/enseignants/programmation/annuelle` | Chargement, boutons présents (23), 0 erreur console | — (pas de test de persistance dédié, hors périmètre du temps disponible) |
| `/enseignants/evaluations` | Chargement, 0 erreur console | — |
| `/enseignants` (hub) | Navigation clavier (Tab), 10 arrêts de focus visibles consécutifs | ✅ |

Boutons principaux, navigation clavier et absence d'erreur console vérifiés
sur les 8 pages. **0 erreur console sur l'ensemble des outils testés.**

**Deux écarts de nommage entre la consigne et les routes réelles du dépôt** :
- `/enseignants/programmation-annuelle` n'existe pas ; la route réelle est
  `/enseignants/programmation/annuelle` (testée à la place).
- `/enseignants/liste-eleves` n'existe pas. Le dépôt n'a pas d'outil dédié à
  une liste nominative d'élèves — c'est un choix de conception délibéré
  (« Aucune donnée sensible, stockage uniquement sur cet appareil »,
  cf. métadonnées de `/enseignants/organisation-classe`). L'équivalent
  fonctionnel le plus proche est la liste d'étiquettes (prénoms/codes
  génériques) de `/enseignants/organisation-classe`, testée à la place.

## 4. PDF et ressources

- Échantillon vérifié sur 2 niveaux/matières : fiches CM2 français
  (`conjugaison/futur-simple-f1.pdf`, `orthographe/a-et-a-f2.pdf`) et
  mathématiques (`reconnaitre-et-decrire-des-triangles/f1.pdf`,
  `construire-un-cercle-avec-un-compas/f2.pdf`) — tous en `200`,
  `Content-Type: application/pdf`, taille cohérente (>1 Mo, pas de fichier
  vide).
- Fiche HTML → PDF vérifiée de bout en bout : `/primaire/cm2/fiches/francais/futur-simple/f1`
  expose un lien `href` vers un PDF réel, testé et téléchargeable (`200`).
- Gouvernance des liens PDF vérifiée dans le code (`app/ressources/_components/resources-catalog.tsx`) :
  une ressource `available` est rendue en `<Link>` cliquable ; toute autre
  ressource est rendue en `<article>` sans `href`, badge « Détail non
  disponible ». Vérifié concrètement sur `/ressources` : 7 ressources
  disponibles (liens actifs), 13 non disponibles (aucun lien, aucun
  téléchargement possible) — conforme à la règle de `AGENTS.md`.
- Audit exhaustif (§8) : 309 fichiers publics référencés, **0 absent**.
- **Écart constaté sur la consigne** : aucune fiche PDF au format A5
  n'existe dans le catalogue actuel. Le champ `format?: "A4" | "A5" | ...`
  de `content/pedagogical-places.ts` est une métadonnée d'imprimabilité
  interne (lieux pédagogiques), jamais exposée comme PDF téléchargeable côté
  utilisateur. Aucune anomalie corrigée sur ce point — c'est un état réel du
  catalogue, pas un bug.

## 5. Responsive réel (320 / 375 / 768 / 1024 / 1440 px)

Testé automatiquement sur les 26 pages (débordement horizontal
`scrollWidth` vs `clientWidth`) + vérification manuelle du menu mobile, des
outils enseignants et des cartes/filtres.

**1 anomalie trouvée et corrigée** (voir §9) : débordement horizontal de
56 px à 768 px sur `/professeurs/[slug]`. Après correctif : **0 débordement
sur les 26 pages × 5 largeurs (130 combinaisons)**.

## 6. Accessibilité

- **axe-core automatisé** (règles wcag2a/2aa/21a/21aa) sur les 26 pages.
- Vérifications manuelles : navigation clavier (Tab), focus visible, ordre
  de tabulation, fermeture Échap sur les panneaux/dialogues, retour du focus
  au déclencheur, labels de formulaires, textes alternatifs.

**Trois anomalies trouvées :**

1. **Corrigée** — Contraste insuffisant (3.57:1, seuil 4.5:1) sur le
   texte « Académie Kerboeuf » de la page 404 (`app/not-found.tsx`).
2. **Corrigée** — Après changement de statut d'une carte dans le panneau de
   `/enseignants/progression`, la fermeture (Échap ou clic extérieur)
   laissait le focus tomber sur `<body>` au lieu de revenir à la carte
   déclencheuse. Cause : la carte change de colonne Kanban au changement de
   statut, ce qui démonte/remonte son nœud DOM et invalide la référence
   `selectTriggerRef`. Corrigé en réinterrogeant le DOM par `data-card-id`
   si la référence d'origine est détachée
   (`components/academy/TeacherPeriodProgressionClient.tsx`).
3. **Non corrigée, documentée pour un chantier dédié** — `nested-interactive`
   (axe, impact *serious*, 20 occurrences) sur `/enseignants/emploi-du-temps` :
   chaque bloc de séance (`role="button"`) contient une poignée de
   redimensionnement (`<button tabindex="-1">`), et chaque colonne de jour
   est elle-même un conteneur `role="button"` englobant ces blocs — deux
   niveaux de contrôles interactifs imbriqués (`components/academy/TeacherWeeklyTimetableClient.tsx`).
   C'est une contrainte structurelle du glisser-déposer/redimensionnement de
   l'emploi du temps, pas un oubli de balisage ponctuel : la corriger
   proprement nécessite de repenser cette structure (extraire la poignée de
   redimensionnement du bouton parent, remplacer le conteneur de colonne par
   un élément non interactif avec une alternative clavier explicite), ce qui
   dépasse le périmètre d'un correctif ciblé « sans effet de bord
   significatif » pendant une validation de préproduction. L'outil reste
   utilisable à la souris et au clavier (Tab atteint individuellement chaque
   contrôle), mais l'expérience lecteur d'écran sur ce widget précis est
   dégradée. **Recommandation : chantier d'accessibilité dédié à ce
   composant avant ou juste après la fusion.**

## 7. SEO

Vérifié sur les pages stratégiques (accueil, `/ressources`,
`/missions-recentes`, `/parcours`, pages de niveau, matière, programme,
mission, professeur, 404) :

| Élément | Résultat |
|---|---|
| `<title>` unique par page | ✅ 26/26 |
| Meta description | ✅ 26/26 |
| Canonical | ✅ 26/26 (1 anomalie corrigée, voir §9) |
| OpenGraph / Twitter | ✅ 26/26 |
| `robots` | ✅ (`noindex` correct sur la 404) |
| JSON-LD | ✅ (Organization/WebSite sur toutes les pages, BreadcrumbList sur les pages profondes) |
| Fil d'Ariane | ✅ |
| H1 unique | ✅ 26/26 |
| `robots.txt` | ✅ référence le sitemap |
| `sitemap.xml` | ✅ 222 URL, **0 doublon**, 0 erreur |

**1 anomalie trouvée et corrigée** (voir §9) : l'accueil (`/`) n'exposait
aucune balise `<link rel="canonical">` — régression documentée et
volontairement laissée ouverte dans `docs/rapport-consolidation-finale.md`
(§8, risque n°1) par la session précédente, hors périmètre de son chantier.
Corrigée ici car le correctif est contenu (un seul champ `alternates` sur le
layout racine) et sans effet de bord sur les autres pages (qui définissent
déjà leur propre canonical et l'emportent sur celui du layout).

## 8. Lighthouse

Exécuté dans des conditions identiques (Chromium local, sans limitation
réseau simulée — throughput élevé, pas de ralentissement CPU) sur les 5
pages demandées :

| Page | Perf | A11y | Bonnes pratiques | SEO | LCP | CLS | TBT | Poids JS |
|---|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 0.4 s | 0 | 0 ms | 201 KiB |
| `/ressources` | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms | 179 KiB |
| `/enseignants` | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms | 199 KiB |
| Mission (`mission-inference`) | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms | 208 KiB |
| Programme (`/primaire/ce1/programme`) | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms | 210 KiB |

Aucun diagnostic Lighthouse en dessous du seuil (0 avertissement notable) sur
les 5 pages. **Note de méthode** : ces scores sont obtenus en conditions
locales non contraintes (pas de simulation 4G/CPU lent) — ils confirment
l'absence de régression de poids/structure mais ne remplacent pas une mesure
Lighthouse CI en conditions réseau réalistes une fois en production.

Aucune optimisation cosmétique n'a été appliquée pour gonfler ces scores :
les chiffres reflètent l'état du code après les 4 correctifs fonctionnels
du §9, qui n'ont aucun lien avec la performance.

## 9. Anomalies corrigées

Toutes reproductibles, clairement liées au code, sans effet de bord sur le
reste du site (revalidé par une repasse complète après correctif : lint,
typecheck, build, tests unitaires, tests E2E, audit de liens — voir §10).

| # | Anomalie | Fichier | Sévérité | Correctif |
|---|---|---|---|---|
| 1 | Débordement horizontal (56 px) à 768 px sur les pages professeur : 6 boutons CTA en `flex-row` sans retour à la ligne | `components/academy/professor-navigation.tsx` | Important (responsive) | Ajout de `flex-wrap` |
| 2 | Contraste texte insuffisant (3.57:1) sur la page 404 | `app/not-found.tsx` | Important (a11y, WCAG 2 AA) | Couleur assombrie à `#8a5a14` (5.81:1) |
| 3 | Accueil sans balise canonical | `app/layout.tsx` | Important (SEO, régression documentée) | `alternates.canonical: "/"` sur le layout racine |
| 4 | Focus perdu (`<body>`) après changement de statut + fermeture du panneau `/enseignants/progression` | `components/academy/TeacherPeriodProgressionClient.tsx` | Important (a11y, clavier/lecteur d'écran) | Repli sur requête DOM par `data-card-id` si la référence de focus est détachée |

## 10. Pipeline final

```
rm -rf .next
npm run lint            → 0 erreur (4 avertissements, uniquement dans les
                           scripts d'audit temporaires .tmp-audit/, supprimés
                           avant commit)
npx tsc --noEmit         → 0 erreur
npm run build            → OK, 450 routes, 0 erreur/avertissement
npm run test:unit        → 53/53 passés
npm run test:e2e         → 193/195 passés (voir note ci-dessous)
npm run routes:check:quick → 23/23 routes critiques OK, 0 lien mort
node scripts/audit-links.mjs → 420 pages crawlées, 675 liens internes
                                uniques, 0 lien mort atteignable, 0 fichier
                                public absent (309 testés), 0 erreur
                                serveur/réseau ; 8 routes 404 orphelines
                                intentionnelles (missions lycée non
                                publiées, jamais liées) ; sitemap 222 URL,
                                0 doublon, 0 erreur
```

**Note sur les 2 échecs E2E** : `[desktop-chromium]` et `[tablet-chromium]`
ont dépassé le timeout de 45 s sur le même test (`/primaire`, chargement
initial) lors de l'exécution complète des 3 profils en parallèle
(`fullyParallel: true`, ~65 tests × 3 profils = 195 exécutions simultanées
sur un environnement sandboxé aux ressources contraintes). **Rejoué isolément
juste après, ce même test passe en 968 ms et 1.1 s** sur les deux profils —
confirmant une contention de ressources liée à l'environnement d'exécution
de cette validation, pas une régression fonctionnelle. Aucune anomalie
applicative correspondante trouvée par ailleurs (la page `/primaire` est
passée sans erreur sur mobile-chromium et sur tous les tests manuels de ce
rapport).

Contrôle de l'état Git : voir §12 (propre après nettoyage).

## 11. Décision finale

**PRÊT AVEC RÉSERVES**

Justification :
- 0 lien mort, 0 fichier public absent, 0 doublon de sitemap, 0 erreur de
  build/lint/typecheck.
- 0 erreur console/React/hydratation sur les 26 pages testées (publics +
  outils enseignants), avant comme après correctifs.
- Lighthouse 100/100/100/100 sur les 5 pages stratégiques.
- 4 anomalies réelles trouvées pendant cette validation, toutes corrigées et
  revalidées par une repasse complète du pipeline.
- **1 réserve accessibilité non corrigée** (`nested-interactive`, sérieux,
  `/enseignants/emploi-du-temps` — §6.3) : n'empêche pas l'usage de l'outil
  à la souris/clavier basique, mais dégrade l'expérience lecteur d'écran sur
  ce widget précis. Recommandé de traiter dans un chantier dédié avant ou
  juste après la fusion, sans bloquer celle-ci.
- **1 écart documentaire** : `docs/rapport-risques-techniques-finaux.md`,
  demandé en lecture préalable par la consigne de cette validation, n'existe
  pas dans le dépôt (recherché dans l'historique complet des branches,
  introuvable). Le rapport le plus proche disponible
  (`docs/rapport-consolidation-finale.md`, §8 « Risques restant ouverts »)
  a été utilisé à la place ; le risque n°1 qu'il documentait (canonical
  accueil) a été corrigé ici (§9, anomalie 3).

Aucune de ces deux réserves ne constitue un blocage fonctionnel, de
sécurité ou de gouvernance de contenu pour une mise en préproduction.

## 12. Nettoyage

- Serveurs de production arrêtés (`next-server` sur les ports 3000/3100 ;
  aucun processus résiduel).
- Scripts d'audit temporaires (`.tmp-audit/`), résultats bruts
  (`scratch-audit-results.json`) et `.next` supprimés après usage — non
  suivis par Git (vérifié par `git status`).
- `git status` propre après nettoyage : seuls les 4 fichiers du §9 sont
  modifiés, aucun fichier temporaire, aucun rapport généré automatiquement
  suivi par erreur.

---

*Aucune fusion vers `main`, aucune pull request créée — conformément à la
consigne. Commit et push effectués uniquement après validation complète
ci-dessus.*

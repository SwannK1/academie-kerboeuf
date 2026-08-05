# Rapport de revue — PR #311

**Date de la revue** : 4 août 2026
**PR** : [#311](https://github.com/SwannK1/academie-kerboeuf/pull/311)
**Branche source** : `integration/final-technical-release`
**Branche cible** : `main`
**Commit vérifié (final)** : `6670751` — `fix(statuts): remplacer les anciennes clés upcoming/in-progress dans ProgrammationClient`
**Commit initial de la PR** : `627a296` — `docs: rapport de consolidation technique finale`

---

## 1. Vérifications GitHub

| Élément | État |
|---|---|
| Ancêtre commun main/PR | `c5e69df` = HEAD actuel de `main` — aucun changement concurrent non intégré |
| Conflits | Aucun (`mergeable` techniquement possible, aucun conflit de fusion) |
| `mergeable_state` | `blocked` — dû au check de statut « Vercel » en échec (voir §4) |
| Commentaires de revue (review threads) | 0 |
| Demandes de modification | 0 |
| Conversations non résolues | 0 |
| Commentaires généraux | 1, automatique (bot `vercel[bot]`, statut de déploiement — pas une demande humaine) |
| Commits ajoutés pendant cette revue | 1 (`6670751`, correctif décrit au §5) |

Aucun commentaire de revue humain n'était présent sur la PR au moment de cette revue : la section « traiter les commentaires » ne s'applique donc à aucune demande externe. Le seul correctif appliqué provient de l'analyse du diff (§2), pas d'un commentaire GitHub.

---

## 2. Revue du diff par domaine

Revue complète de `main...integration/final-technical-release` (251 fichiers, +8564/-3216, 0 suppression, 0 renommage), avec relecture ciblée des 6 commits de résolution de conflit (fusions manuelles des 4 branches sources) — zone à plus haut risque de régression silencieuse.

| Domaine | Constat |
|---|---|
| Gouvernance des statuts | Refactor conforme à `AGENTS.md` : 4 clés canoniques, `satisfies` TypeScript, façade unique. **1 écart trouvé et corrigé** (voir §5) : `ProgrammationClient.tsx`, fichier entièrement nouveau, utilisait encore `"in-progress"`/`"upcoming"` comme valeurs cibles au lieu de `"preparing"`/`"coming-soon"` — contraire à la règle que cette PR vient elle-même d'ajouter à `AGENTS.md` (« aucun nouveau code ne doit les utiliser comme clé cible »). Aucun impact de rendu (le badge normalisait déjà les deux formes à l'identique). |
| Publication des ressources | `isPubliclyAvailable`/`isPubliclyLinkable` correctement utilisés partout où un CTA « Ouvrir »/« Télécharger » apparaît (échantillon vérifié : `learning-architecture-cards.tsx`, `subdomain-resource-page.tsx`, `SubjectMatterCatalog.tsx`, etc.). Aucun contenu annoncé disponible sans l'être. |
| Routes et liens | `getMissionHref` centralisé, aucune ancienne implémentation locale résiduelle trouvée. Slug `sciences-technologie` : toutes les occurrences restantes sont des identifiants internes légitimes (matières collège, nœuds d'arbre pédagogique) — le seul point critique (le `href` de la carte CM2 « Sciences ») pointe bien vers `/primaire/cm2/matieres/sciences`. |
| SEO | `lib/seo.ts` centralise `BASE_URL`/`buildPageMetadata`. Sitemap déduplique via un `Set`, 420 entrées. |
| Performance | Découpage server/client cohérent avec les fichiers `*Client.tsx` déjà en place ; pas de doublon de logique entre wrapper et composant client. |
| Hydratation React | Les deux correctifs (`/enseignants/progression`, `/enseignants/apc`) suivent le même schéma (état initial déterministe + lecture `localStorage` en `useEffect` post-montage) et sont couverts par des tests e2e dédiés, verts. |
| Accessibilité | `useDialogFocusTrap` réutilisé systématiquement (aucun second système de focus créé). |
| Responsive | Correctifs `flex-wrap`/`break-words` cohérents, pas de changement visuel inattendu détecté dans les diffs de classes Tailwind. |
| Outils enseignants | Bug du plan de classe (boutons d'action inopérants) corrigé avec un test renforcé (assertion sur la rotation réelle, plus seulement l'absence d'erreur). |
| PDF | 3 `href` PDF référencés dans `content/primary-programmation.ts`, tous vérifiés présents sous `public/`. Aucun PDF fictif. |
| Tests | 53 unitaires + 195 e2e (×3 profils), tous verts sur le commit final. |
| Scripts | `check-routes.mjs` et `audit-links.mjs` : scripts d'audit légitimes, arrêt propre du serveur qu'ils démarrent (vérifié dans le code). |
| Documentation | Voir §3. |

**Recherches ciblées supplémentaires (négatives, donc rassurantes)** :
- Aucun import dupliqué constituant une régression (les seules répétitions de `from "..."` trouvées sont des `import`/`import type` séparés légitimes).
- Aucune comparaison de statut brut (`status === "..."`) dans `app/`/`components/`.
- Aucun import direct de `public-status.domain`/`public-status.ui` hors façade.
- Aucun fichier temporaire, rapport Playwright, capture d'écran, log, artefact de build ou secret dans le diff.
- Aucun mélange avec KerWeb/Semence/Graines de Foi (`.gitignore` les exclut déjà, non touché par cette PR).
- `docs/college-domain-routes 2.md` (fichier dupliqué à l'apparence suspecte) : **préexistant sur `main`, non touché par cette PR** — hors périmètre, non traité ici.

---

## 3. Vérification des rapports

Les 3 rapports cités dans la consigne de revue (`docs/rapport-validation-preproduction.md`, `docs/rapport-risques-techniques-finaux.md`, `docs/perimetre-version-1.md`) **n'existent pas** dans ce dépôt, sur aucune branche. Les rapports réellement présents et cités dans la PR ont été relus et confrontés au code :

| Rapport | Vérifié contre |
|---|---|
| `docs/rapport-consolidation-finale.md` | Commits listés, décisions d'intégration/exclusion — cohérent avec `git log` |
| `docs/rapport-consolidation-branches-techniques.md` | Conflits de fusion décrits — cohérents avec les diffs des commits de merge |
| `docs/rapport-hydratation-apc.md` | Correctif `/enseignants/apc` — cohérent avec le code et les tests e2e |
| `docs/tests-non-regression.md` | Inventaire des tests — cohérent avec le nombre réel (53 unitaires + 195 e2e) |
| `docs/deploiement-vercel.md` | Voir §4 — **une partie de ce document (recommandation de ne pas utiliser `--webpack` pour Vercel) est obsolète** : `next.config.ts` contient une clé `webpack()` préexistante sur `main`, et un build Turbopack pur (`next build` sans flag) échoue de façon reproductible avec une erreur explicite. Ce document mériterait une mise à jour, hors périmètre de cette revue (il ne fait pas partie du diff de la PR). |

Aucune affirmation de la PR ne s'est révélée fausse au regard du code réel.

---

## 4. Checks CI

### 4.1 Scripts demandés vs scripts réels du dépôt

La consigne de revue cite `npm run test:a11y`, `npm run test:quick` et `npm run test:routes` : **ces noms de scripts n'existent pas** dans `package.json`. Les équivalents réels sont :
- accessibilité automatisée → incluse dans `test:e2e` (`e2e/accessibilite.spec.ts`, `@axe-core/playwright`) ;
- `test:quick` → équivalent `validate:quick` (`lint && typecheck && test:unit`) ;
- `test:routes` → équivalent `routes:check` / `routes:check:quick`.

### 4.2 Résultats sur le commit final (`6670751`)

| Validation | Résultat |
|---|---|
| `npm ci` | OK |
| `npm run lint` | OK |
| `npx tsc --noEmit` | OK (0 erreur) |
| `npm run build` | OK — **420 routes générées** |
| `npm run test:unit` | **53/53 passés** |
| `npm run test:e2e` | **195/195 passés** (desktop/tablet/mobile-chromium) |
| `npm run routes:check:quick` | 23/23 routes critiques OK, 0 lien mort |
| `npm run validate` | OK de bout en bout |
| GitHub Actions CI (`build` job, commit `6670751`) | ✅ succès (lint, typecheck, build, unit tests — 1m26s) |
| Dépôt propre après validation | Oui (worktree isolé, aucun artefact résiduel commité) |
| Serveur orphelin | Aucun — les workers `check-routes.mjs`/Playwright ferment proprement leur serveur (vérifié dans le code et par absence de process résiduel) |

Ces résultats sont identiques sur le commit initial (`627a296`) et sur le commit final (`6670751`), dans deux worktrees isolés distincts, plus dans GitHub Actions — 3 exécutions indépendantes convergentes.

**Note de méthode** : une exécution intermédiaire de `npm run test:e2e` sur le commit final a rapporté 2 échecs (`/primaire`, timeout `page.goto`) après que cette revue a exécuté des commandes supplémentaires en parallèle contre le même worktree (build limité à 1 CPU par `next.config.ts`). Diagnostiqué comme de la contention de ressources et non une régression : le test isolé passe en 687ms, et une reprise complète de `npm run test:e2e` sans interférence donne **195/195** (2.1 min, `EXIT_CODE=0`) — c'est ce résultat propre qui est retenu ci-dessus.

### 4.3 ⚠️ Échec du déploiement Vercel — point d'attention principal

Le check de statut **« Vercel »** sur la PR est en échec (`state: failure`) :

> Deployment has failed — run this Vercel CLI command: `npx vercel inspect dpl_3fQiCswty79r9yxSULdQCSPiFVMF --logs`

**Constats** :
- Échec **reproductible** : présent sur le commit initial de la PR (`627a296`, déploiement `dpl_GTxjK825...`) et à nouveau sur le commit corrigé (`6670751`, déploiement `dpl_3fQiCswty79r9yxSULdQCSPiFVMF`), dans les ~2 minutes suivant chaque push. Ce n'est donc pas un incident isolé/transitoire.
- **Pas un problème de code** : le job GitHub Actions (`npm run build`, mêmes commandes que Vercel selon `docs/deploiement-vercel.md` §4) réussit systématiquement sur `ubuntu-latest`, et 4 builds locaux indépendants (2 avant correctif, 2 après) réussissent également sans erreur ni avertissement.
- **Pas une dégradation générale du compte Vercel** : les 2 PR précédentes fusionnées sur ce dépôt (#303, #304) montrent un statut Vercel « Deployment has completed » — les déploiements Vercel fonctionnent normalement sur ce dépôt en temps normal.
- **Piste explorée et écartée** : `next.config.ts` contient une clé `webpack()` (préexistante sur `main`, non introduite par cette PR) qui fait effectivement échouer un build Turbopack pur (`next build` sans `--webpack`) — reproduit localement avec une erreur explicite de Next.js. Mais comme `main` contient la même configuration et déploie normalement sur Vercel, Vercel doit exécuter la commande `npm run build` (avec `--webpack`, comme en local/CI) et non `next build` nu ; cette piste n'explique donc pas l'échec observé.
- Aucun accès aux logs de build Vercel n'était disponible dans cet environnement (pas de jeton Vercel configuré, tableau de bord non accessible sans authentification — `403`).

**Cause non déterminée.** Cette revue ne peut pas conclure avec certitude sur l'origine de cet échec sans accès direct aux logs Vercel. La recommandation est d'exécuter `npx vercel inspect dpl_3fQiCswty79r9yxSULdQCSPiFVMF --logs` (ou consulter l'onglet **Deployments** du tableau de bord Vercel) avant ou immédiatement après la fusion.

**Impact concret sur `main`** : selon le comportement standard de Vercel, un échec de déploiement ne remplace pas le dernier déploiement de production réussi — le site resterait donc en ligne dans son état actuel, mais **les correctifs de cette PR ne se propageraient pas en production tant que ce point n'est pas résolu.**

---

## 5. Corrections apportées

| # | Constat | Fichier | Action |
|---|---|---|---|
| 1 | Clés de statut obsolètes (`"upcoming"`, `"in-progress"`) utilisées comme valeurs cibles dans un fichier entièrement nouveau, contraire à la règle ajoutée par cette même PR dans `AGENTS.md` | `app/programmation/_components/ProgrammationClient.tsx` | Remplacées par les clés canoniques `"coming-soon"`/`"preparing"`. Aucun changement de rendu (vérifié : `PublicStatusBadge` normalisait déjà les deux formes à l'identique). `lint` + `tsc --noEmit` + `test:unit` (53/53) + `npm run validate` complet exécutés après correction — tous verts. Commit `6670751`, poussé sur `integration/final-technical-release` (pas de force-push). |

Aucun autre problème bloquant ou reproductible n'a été trouvé dans le diff. Aucune autre correction n'a été appliquée (pas de commentaire de revue humain à traiter).

---

## 6. Décision de fusion

### **PRÊTE À FUSIONNER AVEC RÉSERVES NON BLOQUANTES**

**Justification** :
- Tous les contrôles de correction de code sont au vert, de façon reproductible (3 exécutions indépendantes : GitHub Actions, 2 worktrees locaux isolés) : lint, typecheck, build (420 routes), 53 tests unitaires, 195 tests e2e, audit de routes/liens, audit PDF.
- La revue du diff par domaine n'a trouvé qu'un seul écart réel (clés de statut obsolètes dans un nouveau fichier), corrigé et revalidé.
- Aucune suppression accidentelle, aucun fichier parasite, aucun secret, aucun mélange de projet, aucune régression de gouvernance des statuts.
- Aucun commentaire de revue humain en attente.
- **Réserve non bloquante mais à surveiller** : le check de statut « Vercel » échoue de façon reproductible sur le commit final, pour une cause non identifiable depuis cet environnement (pas d'accès aux logs Vercel). Ce n'est pas un problème de code — GitHub Actions et 4 builds locaux indépendants réussissent avec les mêmes commandes — mais cela signifie que **la fusion ne mettra pas automatiquement le site à jour en production tant que ce point n'est pas résolu côté Vercel**.

### Recommandation de méthode de fusion

Utiliser un **merge commit** (pas de squash) pour conserver l'historique des 33 commits, qui documente précisément chaque étape de consolidation (utile pour l'audit futur, cf. `docs/rapport-consolidation-finale.md`). Ne pas fusionner immédiatement : avant ou juste après la fusion, vérifier les logs Vercel (`npx vercel inspect dpl_3fQiCswty79r9yxSULdQCSPiFVMF --logs` ou tableau de bord) pour confirmer que le déploiement de production réussira.

---

## 7. Risques encore ouverts

1. **Échec de déploiement Vercel non expliqué** (voir §4.3) — le seul point réellement ouvert. Nécessite un accès au tableau de bord Vercel pour diagnostic définitif.
2. CI GitHub Actions ne couvre pas encore `test:e2e` ni `routes:check` (seulement lint/typecheck/build/unit) — déjà documenté dans la PR comme limite connue, non aggravé par cette revue.
3. 6 vulnérabilités `npm audit` (1 low, 5 high), préexistantes sur `main`, non introduites par cette PR.
4. `docs/deploiement-vercel.md` contient une recommandation obsolète sur le flag `--webpack` (voir §3) — à corriger dans une future PR documentaire, hors périmètre ici.

---

## 8. Plan de retour arrière

Inchangé par rapport à la description de la PR :
- `git revert` du commit de merge sur `main` (ou retour à `c5e69df`, HEAD actuel de `main`) restaure l'état antérieur sans perte.
- Aucune migration de données, aucun changement de schéma, aucune variable d'environnement modifiée — rollback purement applicatif.
- `integration/final-technical-release` et les branches sources (`integration/technical-hardening`, `integration/technical-foundation`, `claude/e2e-regression-suite`, `claude/non-regression-test-suite`) sont à conserver jusqu'à validation de la production. Aucune branche n'a été supprimée durant cette revue.

---

## Nouveaux commits depuis la création de la PR

| Commit | Description |
|---|---|
| `6670751` | `fix(statuts): remplacer les anciennes clés upcoming/in-progress dans ProgrammationClient` — correction issue de cette revue (§5) |

**Commit exact validé pour la décision ci-dessus : `6670751154cb421a68078a7aea9f44c93980af3d1`.**

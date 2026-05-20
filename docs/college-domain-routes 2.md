# Architecture des routes domaines collège

**Dernière mise à jour** : mai 2026 (Codex 25)
**Périmètre** : routes `/college/[level]/[subject]/[domain]`
**Règle centrale** : Le site organise. Les PDF enseignent.

---

## 1. Principe général

Les pages de domaine collège peuvent être servies de deux façons :

### Route dynamique (recommandée pour les domaines avec contenu)

```
app/college/[level]/[subject]/[domain]/page.tsx
```

Ce fichier unique sert **toutes** les pages domaines autorisées via une allowlist explicite. Il utilise `generateStaticParams()` pour pré-rendre les pages à la compilation (`dynamicParams = false`).

### Route statique (conservée pour transition prudente)

```
app/college/6e/[subject]/[domain]/page.tsx  ← fichier dédié par domaine
```

Certains domaines conservent un fichier `page.tsx` dédié. Ces pages sont pré-rendues statiquement (symbole `○` dans le résumé de build). Elles ne passent pas par la route dynamique.

**Un domaine ne peut pas être servi par les deux routes simultanément.** La coexistence est interdite : si le domaine est dans l'allowlist dynamique, son fichier statique dédié doit être supprimé.

---

## 2. Routes dynamiques actuellement autorisées

Contrôlées par la constante `dynamicCollegeDomainPilotParams` dans `content/college-curriculum.ts`.

| Route | Matière | Domaine | Statut données |
|---|---|---|---|
| `/college/6e/francais/lecture` | Français 6e | Lecture | ✅ |
| `/college/6e/francais/ecriture` | Français 6e | Écriture | ✅ |
| `/college/6e/francais/oral` | Français 6e | Oral | ✅ |
| `/college/6e/francais/etude-de-la-langue` | Français 6e | Étude de la langue | ✅ |
| `/college/6e/mathematiques/nombres-calcul` | Mathématiques 6e | Nombres et calcul | ✅ |
| `/college/6e/mathematiques/geometrie` | Mathématiques 6e | Géométrie | ✅ |
| `/college/6e/mathematiques/grandeurs-mesures` | Mathématiques 6e | Grandeurs et mesures | ✅ |
| `/college/6e/mathematiques/organisation-donnees` | Mathématiques 6e | Organisation et gestion de données | ✅ |

Ces **8 routes** sont pré-rendues à la compilation par la route dynamique.
Aucun fichier `page.tsx` dédié n'existe pour ces domaines dans l'arborescence statique.

---

## 3. Routes statiques conservées

Ces domaines conservent un fichier `page.tsx` dédié. Ils ne sont pas dans l'allowlist dynamique.

| Route | Fichier statique | Raison |
|---|---|---|
| `/college/6e/histoire-geographie-emc/histoire` | `app/college/6e/histoire-geographie-emc/histoire/page.tsx` | Transition non encore effectuée |
| `/college/6e/histoire-geographie-emc/geographie` | `app/college/6e/histoire-geographie-emc/geographie/page.tsx` | Transition non encore effectuée |

Ces pages utilisent `getSixiemeDomainEntries()` et `getSixiemeDomainStatus()` depuis `content/levels/college/6e-curriculum.ts`.

> Note : les pages histoire-geographie-emc passent `status="in-progress"` en dur (sans appel à `getSixiemeDomainStatus`).

---

## 4. Domaine Mathématiques 6e non généré

Le domaine suivant existe dans les données mais **n'est pas généré** — ni dynamiquement, ni statiquement — car il n'a **pas de `href`** dans `sixiemeMathematiquesSubdomains` (`content/levels/college/6e-curriculum.ts`) :

| Domaine | `href` dans SubdomainCards | Page statique | Dans l'allowlist |
|---|---|---|---|
| `resolution-problemes` | ❌ absent | ❌ | ❌ |

**Conséquence** : ajouter ce triplet à `dynamicCollegeDomainPilotParams` n'aurait aucun effet. La vérification 3 de `getCollegeDomainMeta()` (voir §4bis) échouerait silencieusement, et la route ne serait pas générée.

**Pour activer ce domaine**, il faut d'abord ajouter son `href` dans `sixiemeMathematiquesSubdomains`, vérifier que des `entries` existent, puis suivre la checklist §7.

---

## 4bis. Rôle de l'allowlist

### Localisation

```ts
// content/college-curriculum.ts
const dynamicCollegeDomainPilotParams = [
  { level: "6e", subject: "francais", domain: "lecture" },
  { level: "6e", subject: "francais", domain: "ecriture" },
  { level: "6e", subject: "francais", domain: "oral" },
  { level: "6e", subject: "francais", domain: "etude-de-la-langue" },
  { level: "6e", subject: "mathematiques", domain: "nombres-calcul" },
  { level: "6e", subject: "mathematiques", domain: "geometrie" },
  { level: "6e", subject: "mathematiques", domain: "grandeurs-mesures" },
  { level: "6e", subject: "mathematiques", domain: "organisation-donnees" },
] as const;
```

### Fonctionnement

La fonction `getCollegeDomainStaticParams()` itère cette liste et appelle `getCollegeDomainMeta()` pour chaque triplet. Un triplet n'est retenu que si `getCollegeDomainMeta()` renvoie une valeur définie.

`getCollegeDomainMeta()` effectue 4 vérifications :

1. `isCollegeLevelSlug(levelSlug)` — le niveau est un slug collège valide.
2. `getCollegeSubjectMeta(levelSlug, subjectSlug)` — la matière existe dans `collegeSubjectsMeta`.
3. `subjectMeta.subdomains.find(c => c.subdomainSlug === domainSlug)` — le sous-domaine existe et son `href` est défini (les domaines sans `href` sont exclus, c'est le mécanisme de protection des domaines "À venir").
4. `getCollegeDomainEntries(...).length > 0` — le `CurriculumLevelMap` contient des entrées pour ce triplet.

**L'allowlist ne génère pas automatiquement tous les domaines du collège.** Elle autorise seulement les triplets explicitement listés ET valides selon les 4 vérifications ci-dessus. Un triplet dans l'allowlist mais sans `href` ou sans `entries` est silencieusement ignoré.

### Protection des domaines "À venir"

Les domaines sans `href` dans leurs métadonnées ne passent pas la vérification 3. Ils ne peuvent pas être générés par la route dynamique, même s'ils sont ajoutés par erreur à l'allowlist. C'est le garde-fou principal contre la génération de pages vides.

---

## 5. Attention au résumé du build Next.js

### Comportement observé (Codex 21 et Codex 25)

Le résumé affiché par `npx next build --webpack` **tronque** la liste des routes générées par `generateStaticParams` pour une route dynamique donnée. Exemple :

```
├ ● /college/[level]/[subject]/[domain]
│ ├ /college/6e/francais/lecture
│ ├ /college/6e/francais/ecriture
│ ├ /college/6e/francais/oral
│ └ [+3 more paths]
```

Cette liste affiche 3 entrées puis `[+3 more paths]` — ce qui signifie que 6 routes sont réellement générées. Les vérifier dans `.next/server/app/` reste la source de vérité.

### Règle

**Ne pas se fier uniquement au résumé console pour déterminer si une route est générée.**

---

## 6. Vérification fiable d'une route dynamique

Par ordre de fiabilité décroissante :

### 1. Chercher le fichier HTML dans `.next/server/app/`

```bash
find .next/server/app/college -name "*.html" | sort
```

Si le fichier `college/6e/mathematiques/nombres-calcul.html` existe, la route est générée.

### 2. Lancer le build complet et lire le log brut

```bash
npx next build --webpack > /tmp/build.log 2>&1
grep "college/6e" /tmp/build.log
```

### 3. Ajouter un log temporaire dans `getCollegeDomainStaticParams()`

```ts
console.log(`[DEBUG] ${level}/${subject}/${domain}: entries=${entries.length}, meta=${meta ? "OK" : "UNDEFINED"}`);
```

Ce log apparaît dans la sortie console du build. **Le retirer après vérification.**

### 4. Vérifier `generateStaticParams` directement

Inspecter `getCollegeDomainStaticParams()` dans `content/college-curriculum.ts` pour voir quels triplets sont retenus.

---

## 7. Checklist avant migration d'un nouveau domaine

Avant d'ajouter un triplet à `dynamicCollegeDomainPilotParams` et de supprimer le fichier statique correspondant :

- [ ] **Le `href` est défini** : le sous-domaine a un `href` dans ses métadonnées. **Sans `href`, `getCollegeDomainMeta()` retourne `undefined` et le triplet est ignoré.**
- [ ] **Les données existent** : le domaine est présent dans `sixiemeCurriculumLevelMap` avec des `entries`.
- [ ] **Les `entries` sont non vides** : `getCollegeDomainEntries()` retourne au moins une entrée.
- [ ] **Ajouter un seul triplet à la fois** : ne pas migrer plusieurs domaines en une seule opération.
- [ ] **Ne pas créer de contenu pédagogique** : ne pas enrichir les `entries`, les `successCriteria`, les `resourceSlots`, etc.
- [ ] **Supprimer le fichier statique dédié** si le domaine est dans l'allowlist : la coexistence est interdite.
- [ ] **Ne pas générer tous les domaines d'un coup** : l'allowlist est pilote — chaque ajout est intentionnel.
- [ ] **Tester dans l'ordre** : `npm run lint` → `npx tsc --noEmit` → `npx next build --webpack`.
- [ ] **Vérifier les domaines "À venir"** : s'assurer que les domaines sans `href` ne sont pas accidentellement générés.
- [ ] **Vérifier les fichiers HTML générés** : confirmer la présence dans `.next/server/app/` plutôt que de se fier au résumé console.

---

## 8. Architecture des fichiers (état actuel)

```
app/college/
  [level]/
    [subject]/
      [domain]/
        page.tsx          ← route dynamique — sert les 8 domaines de l'allowlist
  6e/
    histoire-geographie-emc/
      histoire/
        page.tsx          ← statique (à migrer ultérieurement)
      geographie/
        page.tsx          ← statique (à migrer ultérieurement)

content/
  college-curriculum.ts
    dynamicCollegeDomainPilotParams   ← allowlist (8 triplets)
    getCollegeDomainStaticParams()    ← filtre l'allowlist via getCollegeDomainMeta()
    getCollegeDomainMeta()            ← 4 vérifications avant génération
    getCollegeDomainEntries()         ← lookup dans CurriculumLevelMap

  levels/college/
    6e-curriculum.ts
      sixiemeCurriculumLevelMap       ← source des entries (CurriculumLevelMap)
      sixiemeFrancaisSubdomains       ← métadonnées + hrefs Français 6e
      sixiemeMathematiquesSubdomains  ← métadonnées + hrefs Mathématiques 6e
      getSixiemeDomainEntries()       ← utilisé par les pages statiques
      getSixiemeDomainStatus()        ← utilisé par les pages statiques
```

---

## 9. Domaines candidats à une migration future

| Domaine | Matière | `href` présent | Dans l'allowlist | Page statique | Bloquant |
|---|---|---|---|---|---|
| `histoire` | Hist.-Géo.-EMC 6e | ✅ | ❌ | ✅ | Aucun apparent |
| `geographie` | Hist.-Géo.-EMC 6e | ✅ | ❌ | ✅ | Aucun apparent |
| `resolution-problemes` | Mathématiques 6e | ❌ | ❌ | ❌ | **href manquant** |

Pour `histoire` et `geographie` : migration possible selon la checklist §7.

Pour `resolution-problemes` : il faut d'abord créer le `href` dans `sixiemeMathematiquesSubdomains`, puis vérifier les `entries` dans `sixiemeCurriculumLevelMap`. Ce travail sort du périmètre d'une migration — c'est de la création de contenu.

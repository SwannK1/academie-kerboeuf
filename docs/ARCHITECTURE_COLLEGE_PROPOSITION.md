# Architecture Collège — Diagnostic et proposition

**Date** : mai 2026  
**Périmètre** : 6e, 5e, 4e, 3e  
**Règle centrale** : Le site organise. Les PDF enseignent.  
**Statut** : Diagnostic — aucune page complète créée dans ce document.

---

## 1. État des lieux à la date du diagnostic

### Ce qui existe déjà

| Zone | État |
|---|---|
| `content/program-types.ts` | `AcademyLevelSlug` couvre 6e/5e/4e/3e. `AcademyCycleId` couvre cycle-3 et cycle-4. `ProgramStatus` (available / in-progress / upcoming) est universel. |
| `content/learning-architecture-types.ts` | `CurriculumLevelMap` est le type cible pour tout nouveau niveau. `CurriculumEntry` est le nœud feuille. |
| `content/curriculum-map-types.ts` | `CurriculumLevelMap` : `{ levelSlug, domains: CurriculumDomainMap[] }`. Peut accueillir 6e/5e/4e/3e sans modification de type. |
| `content/curriculum-map.ts` | Registre primaire : CP, CE1, CE2, CM1. `CURRICULUM_LEVEL_SLUGS` = `["cp","ce1","ce2","cm1"]`. CM2 explicitement absent. |
| `content/academy.ts` | 6e, 5e, 4e, 3e déjà définis comme `AcademyLevel` (mission-based). `stage: "college"`. Cycle 3 pour 6e, cycle 4 pour 5e/4e/3e. |
| `app/college/page.tsx` | Hub collège — `LevelHub` fonctionnel. |
| `app/college/[level]/page.tsx` | `LevelOverview` générique pour tous les niveaux collège. Bloc 6e ajouté (lien vers `/college/6e/francais`). |
| `app/college/[level]/missions/` | Missions collège existantes. Ne pas toucher. |
| `content/levels/college/6e-curriculum.ts` | **Pilote créé.** Français 6e : 4 sous-domaines, lecture détaillée (5 compétences), autres en upcoming. |
| `app/college/6e/francais/page.tsx` | Portail matière Français 6e. |
| `app/college/6e/francais/lecture/page.tsx` | Page domaine Lecture 6e. |
| `content/levels/maternelle/` | gs-domains.ts, ms-domains.ts, ps-domains.ts — modèle maternelle propre. |
| `app/maternelle/gs/`, `ms/`, `ps/` | Pages maternelle par niveau. |

---

## 2. Ce que le primaire fait bien — à reprendre pour le collège

### Le format `CurriculumLevelMap`

C'est le type cible le plus adapté pour le collège. Il est :
- **générique** : `levelSlug: AcademyLevelSlug` couvre déjà 6e/5e/4e/3e ;
- **léger** : pas de séquences de leçons, pas d'exercices, pas de corrections ;
- **extensible** : chaque sous-domaine porte des `CurriculumEntry[]` — la granularité est ajustable ;
- **déjà éprouvé** sur CP, CE1, CE2, CM1 et 6e pilote.

```typescript
// Nœud feuille — identique pour primaire et collège
type CurriculumEntry = {
  id: CurriculumEntryId;
  levelSlug: AcademyLevelSlug;       // "6e" | "5e" | "4e" | "3e"
  subject: string;                    // "Français"
  domainSlug: string;                 // "francais"
  subdomainSlug: string;              // "lecture"
  title: string;
  officialReference?: string;
  observableObjective: string;
  successCriteria: string[];
  status: ProgramStatus;
  resourceSlots?: ResourceSlot[];
  competencyId?: string;
};
```

### Le système de statuts

`ProgramStatus` + `PublicStatusBadge` + `getPublicStatusKey` — universel, inchangé.  
Aucun nouveau statut à créer pour le collège.

### La règle des ressources

`ResourceSlot` sans `href` → emplacement planifié non cliquable.  
`AvailablePedagogicalResourceRef` avec `href` → seulement si le PDF existe réellement.  
Cette convention est identique pour le collège.

### La `CurriculumMapPreview`

Le composant `CurriculumMapPreview` peut afficher n'importe quel `CurriculumMap` (format subjects → domains → subdomains → competencies). Il peut être réutilisé pour les pages programme collège sans modification, à condition d'alimenter le bon format.

---

## 3. Ce que la maternelle fait — à NE PAS reproduire pour le collège

Le modèle maternelle repose sur `MaternelleDomainEntry` avec :
- `observables[]` — comportements visibles en situation
- `situations[]` — contextes de classe
- `traces[]` — traces attendues

Ce modèle est conçu pour le Cycle 1 : observation, manipulation, jeu, pas de notion scolaire formelle.

**Le collège est scholastique.** Il organise des compétences, des domaines disciplinaires, des ressources typées (leçon, exercices, correction). Le format `CurriculumLevelMap` est le bon choix.

**Risque à éviter** : créer un `CollegeDomainEntry` avec observables/situations/traces serait une erreur de modèle. Le collège a besoin d'`observableObjective` et de `successCriteria`, pas de situations pédagogiques maternelle.

---

## 4. Réponses aux questions de l'architecture cible

### Faut-il créer un `CollegeLevelMap` ?

**Non.** `CurriculumLevelMap` suffit. Il couvre déjà `levelSlug: "6e" | "5e" | "4e" | "3e"` via `AcademyLevelSlug`.

Si à terme le collège nécessite des métadonnées spécifiques (coefficient, DNB, enseignant associé), on créera un type wrapper :

```typescript
// Futur — seulement si nécessaire
type CollegeCurriculumMeta = {
  levelSlug: AcademyLevelSlug;
  cycle: AcademyCycleId;
  dnbPreparation?: boolean;   // 3e uniquement
  curriculum: CurriculumLevelMap;
};
```

Mais pour les missions actuelles, ce n'est pas nécessaire.

### Faut-il réutiliser `CurriculumLevelMap` ?

**Oui.** C'est la réponse directe et correcte. Le pilote 6e en production le confirme.

### Faut-il créer un `SecondaryLevelMap` ?

**Non.** Ajouter un type n'est justifié que si `CurriculumLevelMap` est insuffisant. Il ne l'est pas.

### Comment gérer les matières ?

Dans `CurriculumLevelMap`, les `domains` correspondent aux matières :

```typescript
// Convention collège : domain = matière
{
  domainSlug: "francais",
  subject: "Français",
  label: "Français",
  subdomains: [
    { subdomainSlug: "lecture", label: "Lecture", entries: [...] },
    { subdomainSlug: "ecriture", label: "Écriture", entries: [] },
    ...
  ]
}
```

Le mot "domaine" dans le type correspond à "matière" au collège. C'est une légère ambiguïté sémantique que le code ne voit pas — elle n'est perceptible que dans les noms de variables. C'est acceptable pour le pilote.

### Comment gérer la 6e (cycle 3) ?

La 6e est cycle 3 dans le programme officiel, aux côtés de CM1 et CM2. L'architecture le reflète déjà :
- `content/academy.ts` : `slug: "6e"`, `cycle: "Cycle 3"`, `stage: "college"`
- Le cycle doit apparaître dans le badge de la page (`Cycle 3 · 6e`)

**Ce n'est pas un problème de données.** C'est un problème d'étiquette UI. Toujours afficher "Cycle 3" pour la 6e, "Cycle 4" pour 5e/4e/3e.

### Comment éviter de mélanger CM2 pilote et collège ?

Trois gardes existants et à maintenir :

1. `CURRICULUM_LEVEL_SLUGS = ["cp","ce1","ce2","cm1"]` — CM2 absent, collège absent.
2. `content/curriculum-map.ts` — réservé primaire. Ne jamais y ajouter 6e/5e/4e/3e.
3. Créer un fichier séparé : `content/college-curriculum.ts` avec son propre registre.

```typescript
// content/college-curriculum.ts — à créer
export const COLLEGE_LEVEL_SLUGS = ["6e", "5e", "4e", "3e"] as const;
export type CollegeLevelSlug = (typeof COLLEGE_LEVEL_SLUGS)[number];

const collegeCurriculumMaps: Partial<Record<CollegeLevelSlug, CurriculumLevelMap>> = {
  "6e": sixiemeCurriculumLevelMap,
  // "5e": ...
};

export function getCollegeCurriculumMap(slug: string): CurriculumLevelMap | undefined {
  if (!isCollegeLevelSlug(slug)) return undefined;
  return collegeCurriculumMaps[slug];
}
```

### Comment préparer la suite vers le lycée ?

L'architecture s'y prête déjà :
- `AcademyLevelSlug` couvre seconde/premiere/terminale
- `AcademyCycleId` couvre "lycee"
- `AcademyStage` couvre "lycee"

Quand le lycée sera à travailler, on créera `content/lycee-curriculum.ts` sur le même modèle que `content/college-curriculum.ts`.

### Comment garder le site clair et court ?

La règle UX fondamentale ("Qu'est-ce que je peux faire ici ?") se traduit par :

| Page | Contenu max |
|---|---|
| `/college` | 4 cartes de niveau + statut global |
| `/college/6e` | Hero + bloc matières pilotes + lien missions |
| `/college/6e/francais` | 4 cartes de sous-domaine (lecture, écriture, étude de la langue, oral) |
| `/college/6e/francais/lecture` | Liste de compétences + resource slots non cliquables |

**Règle** : chaque page doit tenir sans scroll excessif sur un écran 13 pouces. Si le contenu déborde, c'est qu'il y a trop de texte ou trop de sections.

---

## 5. Structure de fichiers proposée pour le collège complet

### Données

```
content/
  college-curriculum.ts        ← registre central collège (à créer)
  levels/
    college/
      6e-curriculum.ts         ✓ EXISTE — pilote Français
      5e-curriculum.ts         → priorité 2 (pilote Français + Maths)
      4e-curriculum.ts         → priorité 3
      3e-curriculum.ts         → priorité 4 (+ bloc brevet optionnel)
```

Chaque fichier suit le même pattern que `6e-curriculum.ts` :
- Export `[niveau]CurriculumLevelMap: CurriculumLevelMap`
- Export `[niveau][Matière]Subdomains: CollegeSubdomainCard[]` pour l'affichage des cartes
- Helper `get[Niveau]DomainEntries(domainSlug, subdomainSlug)`

### Routes

**Option A — pages statiques par matière (recommandée pour le pilote)**

```
app/college/
  page.tsx                     ✓ EXISTE
  [level]/
    page.tsx                   ✓ EXISTE (LevelOverview + bloc 6e)
    missions/
      page.tsx                 ✓ EXISTE
      [slug]/page.tsx          ✓ EXISTE
  6e/
    francais/
      page.tsx                 ✓ EXISTE
      lecture/page.tsx         ✓ EXISTE
      ecriture/page.tsx        → prochain pilote
      etude-de-la-langue/page.tsx
      oral/page.tsx
    mathematiques/
      page.tsx                 → pilote 2
      nombres-calcul/page.tsx
      ...
```

**Option B — route dynamique (pour la scalabilité, 5e-3e)**

```
app/college/[level]/matieres/[matiere]/page.tsx
app/college/[level]/matieres/[matiere]/[domaine]/page.tsx
```

Cette option utilise `generateStaticParams` pour pré-générer toutes les combinaisons niveau × matière × domaine. Elle est propre mais nécessite un registre complet avant d'être ouverte.

**Recommandation** : utiliser l'Option A pour 6e (pilote Français en cours), prévoir l'Option B pour 5e-3e quand les données seront plus complètes.

---

## 6. Matières collège — ce qu'il faut prévoir

### 6e — Cycle 3

| Matière | Slug | Priorité |
|---|---|---|
| Français | `francais` | Pilote ✓ |
| Mathématiques | `mathematiques` | 2 |
| Histoire-Géographie-EMC | `histoire-geographie` | 3 |
| Sciences (SVT + PC + Techno groupées) | `sciences` | 4 |
| Anglais | `anglais` | 5 |
| Arts plastiques | `arts-plastiques` | 6 |
| Éducation musicale | `education-musicale` | 7 |
| EPS | `eps` | 8 |

En 6e, SVT, Physique-Chimie et Technologie peuvent être regroupées sous un `sciences` générique — moins de pages, plus de lisibilité pour une 6e qui découvre le collège.

### 5e-4e — Cycle 4

Même liste que 6e + décroisement des sciences :

| Matière | Slug |
|---|---|
| SVT | `svt` |
| Physique-Chimie | `physique-chimie` |
| Technologie | `technologie` |
| 2e langue | `lv2` (optionnel) |

### 3e — Cycle 4 + préparation brevet

Même liste que 5e-4e + bloc spécifique brevet :

```typescript
// Futur — 3e uniquement
type BrevetPreparationBlock = {
  label: string;           // "Préparation Brevet"
  status: ProgramStatus;
  domains: string[];       // matières concernées
};
```

---

## 7. Ressources prévues — logique pour le collège

### Types de ressources collège

Le collège peut nécessiter des ressources différentes du primaire :

| Kind | Label | Collège | Primaire |
|---|---|---|---|
| `lesson-pdf` | Cours PDF | ✓ | ✓ |
| `exercises-pdf` | Exercices PDF | ✓ | ✓ |
| `correction-pdf` | Correction PDF | ✓ | ✓ |
| `assessment-pdf` | Évaluation PDF | ✓ | ✓ |
| `projectable-pdf` | Support projetable | ✓ | ✓ |
| `parent-sheet-pdf` | Fiche parent | (optionnel) | ✓ |

Pour le collège, la "fiche méthode" est importante mais elle correspond à un `lesson-pdf` spécialisé ou à un type additionnel. Pour l'instant, utiliser `lesson-pdf` pour les méthodes est suffisant.

**Règle inchangée** : `resourceSlots` sans `href` = emplacements planifiés, non cliquables. Un `href` ne peut être ajouté que si le PDF existe physiquement.

---

## 8. Proposition de statuts par niveau

Au lancement, chaque niveau doit avoir un statut clair :

| Niveau | Statut global | Matière pilote | Autres matières |
|---|---|---|---|
| 6e | `in-progress` | Français (`in-progress`) | `upcoming` |
| 5e | `upcoming` | — | `upcoming` |
| 4e | `upcoming` | — | `upcoming` |
| 3e | `upcoming` | — | `upcoming` |

Le statut global d'un niveau est le statut de sa matière la plus avancée.

---

## 9. Stratégie pour commencer par la 6e

### Ce qui est déjà fait (Mission 4)

- `content/levels/college/6e-curriculum.ts` — Français 6e avec lecture détaillée
- `/college/6e/francais` — portail matière
- `/college/6e/francais/lecture` — page domaine avec 5 compétences

### Prochaines étapes 6e recommandées (dans l'ordre)

1. **Écriture 6e** — `/college/6e/francais/ecriture` — 3-4 compétences attendues
2. **Maths 6e** — créer `sixiemeMathematiquesSubdomains` dans `6e-curriculum.ts` + pages `/college/6e/mathematiques` et sous-domaine
3. **Registre collège** — créer `content/college-curriculum.ts` avec `getCollegeCurriculumMap`
4. **Route dynamique** — envisager `/college/[level]/matieres/[matiere]/page.tsx` quand 5e commence

### Ce qu'il ne faut PAS faire avec la 6e

- Ne pas créer toutes les matières d'un coup
- Ne pas créer de page brevet pour la 6e (réservé à la 3e)
- Ne pas ajouter `"6e"` dans `CURRICULUM_LEVEL_SLUGS` de `curriculum-map.ts`
- Ne pas créer des pages longues qui scrollent sur 3 écrans

---

## 10. Risques techniques

| Risque | Description | Mitigation |
|---|---|---|
| **Pollution du registre primaire** | Ajouter la 6e dans `curriculum-map.ts` | Créer `college-curriculum.ts` séparé |
| **Conflit de routes** | `/college/[level]/[matiere]` vs `/college/[level]/missions` | Static routes > dynamic : les pages statiques `/college/6e/francais` ne conflictent pas avec `/college/[level]/missions` |
| **Typage `AcademyLevelSlug`** | `"6e"` est déjà dans le type — pas de risque | Vérifier que les nouveaux fichiers utilisent bien ce type |
| **`generateStaticParams` manquant** | Pages dynamiques non générées au build | Toujours ajouter `generateStaticParams` sur les routes dynamiques collège |
| **Accumulation de fichiers** | 4 niveaux × 12 matières = 48 fichiers potentiels | Garder `[niveau]-curriculum.ts` un seul fichier par niveau jusqu'à ce qu'il devienne trop lourd |

---

## 11. Risques UX

| Risque | Description | Mitigation |
|---|---|---|
| **Scroll excessif** | Pages matière avec trop de compétences | Limiter à 5-7 entrées par sous-domaine visible, replier le reste |
| **Navigation profonde** | 4 niveaux de profondeur (college → 6e → francais → lecture) | Toujours afficher un breadcrumb + lien retour dans chaque page |
| **Surcharge de matières** | 8-12 matières par niveau → grille illisible | Grouper par cycle sur la page niveau, afficher 4 cartes max en priorité |
| **Statuts trompeurs** | Une page "disponible" avec des PDF non existants | Règle stricte : `in-progress` si le contenu existe partiellement, jamais `available` sans PDF réel |
| **Duplication navigation** | Liens en double (breadcrumb + CTA) | 1 breadcrumb + 1 CTA de retour en bas de page — pas plus |

---

## 12. Risques pédagogiques

| Risque | Description | Mitigation |
|---|---|---|
| **Contenu dans les pages** | Mettre la leçon directement dans le HTML | Règle stricte : observableObjective + successCriteria seulement. Jamais le contenu complet. |
| **Confusion cycle 3** | 6e et CM1 dans le même cycle mais pas le même stage | Toujours afficher stage + cycle dans les en-têtes (`Cycle 3 · Collège · 6e`) |
| **Brevet prématuré** | Créer des pages brevet pour la 6e ou la 5e | Réserver le bloc brevet à la 3e uniquement |
| **Programmes incomplets** | Afficher des matières "disponibles" sans données | N'afficher que les matières dont les données existent, les autres en `upcoming` |

---

## 13. Ce qu'il ne faut PAS faire

- Ajouter `"6e"` dans `CURRICULUM_LEVEL_SLUGS` du fichier `curriculum-map.ts`
- Mettre des données collège dans `curriculum-map.ts`
- Toucher à `content/cm2.ts` ou à Félix
- Créer un modèle maternelle (observables/situations/traces) pour le collège
- Créer des PDF fictifs ou des `href` vers des fichiers inexistants
- Créer toutes les matières de tous les niveaux en une seule mission
- Créer des pages longues de cours HTML
- Créer un lycée dans cette phase

---

## 14. Prochaines missions recommandées dans l'ordre

### Mission A — Compléter le pilote 6e Français

**Périmètre** : écriture, étude de la langue, oral.  
**Action** : ajouter les entrées dans `6e-curriculum.ts` et créer les pages correspondantes.  
**Critère de succès** : les 4 sous-domaines Français 6e ont une page propre.

### Mission B — Pilote 6e Mathématiques

**Périmètre** : `/college/6e/mathematiques` + 3-4 sous-domaines.  
**Action** : ajouter les données maths dans `6e-curriculum.ts` + pages.  
**Critère de succès** : `/college/6e/mathematiques` fonctionne comme `/college/6e/francais`.

### Mission C — Registre collège central

**Périmètre** : créer `content/college-curriculum.ts` avec `getCollegeCurriculumMap`.  
**Action** : déplacer les getters de `6e-curriculum.ts` dans le registre central.  
**Critère de succès** : une seule fonction d'accès pour tout le collège.

### Mission D — Route dynamique collège

**Périmètre** : `/college/[level]/matieres/[matiere]/page.tsx`.  
**Action** : créer la route dynamique avec `generateStaticParams` depuis le registre.  
**Critère de succès** : build propre, toutes les matières disponibles sur les 4 niveaux.

### Mission E — Données 5e

**Périmètre** : `content/levels/college/5e-curriculum.ts`, pilote Français 5e.  
**Critère de succès** : `/college/5e/francais` affiche un portail correct.

### Mission F — Données 4e et 3e

**Périmètre** : `4e-curriculum.ts`, `3e-curriculum.ts`, dont un bloc brevet pour la 3e.  
**Critère de succès** : les 4 niveaux ont chacun au moins une matière pilote.

---

## Confirmations

- ✓ Aucun CM2 n'a été touché dans cette mission
- ✓ Aucun PDF n'a été créé
- ✓ Aucun `href` fictif n'a été ajouté
- ✓ Aucune page complète du collège n'a été créée
- ✓ Ce document est uniquement un diagnostic et une proposition d'architecture

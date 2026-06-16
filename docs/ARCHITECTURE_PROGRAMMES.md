# Architecture Programmes — Académie Kerboeuf

**Date** : juin 2026
**Périmètre** : Primaire — CP, CE1, CE2, CM1, CM2
**Règle centrale** : Le site organise. Les PDF enseignent.
**Statut** : Document de référence officiel.

---

## 1. Principe fondamental

> **1 séquence = 1 compétence observable.**

Chaque séquence de programme correspond à une seule compétence observable. Il n'y a pas de séquence multi-compétences. Il n'y a pas de compétence sans séquence rattachée.

---

## 2. Hiérarchie de l'architecture

```
Niveau
  └── Matière / Domaine
        └── Sous-domaine
              └── Séquence
                    └── Compétence observable
```

### Correspondance avec le type `CurriculumLevelMap`

| Couche architecture | Type TypeScript | Champ |
|---|---|---|
| Niveau | `CurriculumLevelMap` | `levelSlug` |
| Matière / Domaine | `CurriculumDomainMap` | `domainSlug`, `subject`, `label` |
| Sous-domaine | `CurriculumSubdomainMap` | `subdomainSlug`, `label` |
| Séquence | `CurriculumEntry` | `id`, `title` |
| Compétence observable | `CurriculumEntry` | `observableObjective` |

Chaque `CurriculumEntry` **est** une séquence. Son `observableObjective` **est** sa compétence observable unique.

---

## 3. Type canonique — `CurriculumEntry`

```typescript
type CurriculumEntry = {
  id: CurriculumEntryId;           // identifiant stable
  levelSlug: AcademyLevelSlug;
  subject: string;
  domainSlug: string;
  subdomainSlug: string;
  title: string;                   // intitulé de la séquence
  officialReference?: string;      // référence programme officiel
  observableObjective: string;     // 1 compétence observable — obligatoire
  successCriteria: string[];       // 2 à 4 critères maximum
  status: ProgramStatus;           // "upcoming" | "in-progress" | "available"
  resourceSlots?: ResourceSlot[];  // emplacements PDF — sans href tant qu'absents
  competencyId?: string;           // lien vers LearningCompetency si existant
};
```

**Règles de remplissage :**

- `observableObjective` : une seule phrase — ce que l'élève fait de visible.
- `successCriteria` : 2 à 4 critères, formulés à la première personne ("Je…").
- `status` : `"upcoming"` par défaut. `"in-progress"` si travail en cours. `"available"` uniquement si le PDF existe.
- `resourceSlots` : présents sans `href`. Un `href` ne peut figurer que si le fichier existe réellement.

---

## 4. Couverture disciplinaire par cycle

### Cycle 2 — CP, CE1, CE2

Matières à couvrir dans le catalogue :

| Matière | `domainSlug` | Sous-domaines structurels |
|---|---|---|
| Français | `francais` | `lecture-comprehension`, `ecriture`, `etude-de-la-langue`, `langage-oral` |
| Mathématiques | `mathematiques` | `numeration`, `calcul`, `geometrie`, `grandeurs-mesures` |

Les autres matières (EPS, Arts, etc.) peuvent être ajoutées progressivement.

### Cycle 3 — CM1, CM2, 6e

Matières à couvrir dans le catalogue :

| Matière | `domainSlug` | Sous-domaines structurels |
|---|---|---|
| Français | `francais` | `lecture-comprehension`, `ecriture`, `etude-de-la-langue`, `langage-oral` |
| Mathématiques | `mathematiques` | `numeration`, `calcul-pose`, `problemes`, `grandeurs-mesures`, `geometrie` |
| Histoire-Géographie | `histoire-geographie` | `antiquite`, `moyen-age`, `geographie` |
| Sciences | `sciences` | `vivant`, `matiere-energie`, `technologie` |

---

## 5. Règles de statut

| Statut | Condition |
|---|---|
| `upcoming` | Séquence planifiée, aucun contenu PDF produit |
| `in-progress` | Séquence en cours de production |
| `available` | PDF réel accessible via `href` |

**Interdit :** afficher `"available"` sans `href` vers un fichier existant.

---

## 6. Règles de construction d'une nouvelle séquence

1. Créer une entrée dans le fichier `content/levels/[level]-curriculum.ts`.
2. Assigner un `id` unique suivant la convention : `[level]-[domain-code]-[subdomain-code]-[concept-slug]`.
3. Définir un `observableObjective` — une seule compétence, une seule phrase.
4. Définir 2 à 4 `successCriteria` à la première personne.
5. Laisser le statut à `"upcoming"`.
6. Ne pas ajouter de `href` fictif.
7. Ne pas ajouter de contenu pédagogique complet (exercices, corrections, leçon HTML).

---

## 7. Règles d'extension

Pour ajouter un nouveau niveau :

1. Créer `content/levels/[level]-curriculum.ts` exportant `[level]CurriculumLevelMap: CurriculumLevelMap`.
2. Ajouter l'entrée dans `content/curriculum-map.ts`.
3. Couvrir a minima Français et Mathématiques.
4. Tous les statuts initiaux : `"upcoming"`.

Pour ajouter une nouvelle matière à un niveau existant :

1. Ajouter un `CurriculumDomainMap` dans le fichier du niveau concerné.
2. Créer les sous-domaines structurels correspondants.
3. Ajouter au moins une séquence par sous-domaine (titre uniquement si le contenu n'est pas encore rédigé).

---

## 8. Ce qui est interdit

- Ajouter plusieurs `observableObjective` à une même entrée.
- Créer des PDF fictifs ou des `href` vers des fichiers inexistants.
- Créer des pages HTML de leçon complète dans l'application.
- Déposer du contenu pédagogique (exercices, corrections) dans les fichiers de catalogue.
- Comparer des statuts bruts en string dans les composants UI (voir `AGENTS.md`).

---

## 9. État de couverture par niveau (juin 2026)

| Niveau | Français | Mathématiques | Histoire-Géo | Sciences | Statut global |
|---|---|---|---|---|---|
| CP | ✓ 4 sous-domaines | ✓ 4 sous-domaines | — | — | `upcoming` |
| CE1 | ✓ 4 sous-domaines | ✓ 4 sous-domaines | — | — | `upcoming` |
| CE2 | ✓ 4 sous-domaines | ✓ 4 sous-domaines | — | — | `upcoming` |
| CM1 | ✓ 4 sous-domaines | ✓ 5 sous-domaines | ✓ 2 sous-domaines | ✓ 1 sous-domaine | `in-progress` |

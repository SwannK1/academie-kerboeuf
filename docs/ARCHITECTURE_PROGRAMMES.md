# Architecture commune des programmes — Académie Kerboeuf

## Structure officielle

Tous les niveaux du site suivent une hiérarchie à 5 niveaux :

```
Niveau (AcademyLevelSlug)
  └── Matière / Domaine (domainSlug)
        └── Sous-domaine (subdomainSlug)
              └── Séquence (TeachingSequence)
                    └── Compétence observable (LearningCompetency)
```

**Règle fondamentale : 1 séquence = 1 compétence.**

Une `TeachingSequence` est toujours liée à exactement un `LearningCompetency`.
Elle n'est jamais partagée entre deux compétences.

---

## Types canoniques

| Couche | Type TypeScript | Fichier source |
|--------|----------------|----------------|
| Niveau | `AcademyLevelSlug` | `content/program-types.ts` |
| Domaine | `CurriculumDomainMap` | `content/curriculum-map-types.ts` |
| Sous-domaine | `CurriculumSubdomainMap` | `content/curriculum-map-types.ts` |
| Compétence | `LearningCompetency` | `content/learning-architecture-types.ts` |
| Séquence | `TeachingSequence` | `content/learning-architecture-types.ts` |
| Étape | `TeachingSequenceStep` | `content/learning-architecture-types.ts` |
| Carte organisationnelle | `CurriculumLevelMap` | `content/curriculum-map-types.ts` |

Le type `LearningCompetency` de référence est celui de `learning-architecture-types.ts`.
Le `LearningCompetency` de `program-types.ts` est **déprécié** (CM2 uniquement, ne pas réutiliser).

---

## Règles de nommage

### Identifiants (`id`)

Format : `{levelSlug}-{domainInitiale}-{subdomainInitiale}-{slug-court}`

Exemples :
- `cp-fr-lc-comprendre-phrase` (CP / Français / Lecture-compréhension)
- `6e-fr-lect-identifier-theme` (6e / Français / Lecture)
- `ps-lang-oral-nommer-objet` (PS / Langage / Oral)

### Slugs

- Kebab-case strict, sans accents, sans majuscules.
- Le `domainSlug` correspond à la matière : `francais`, `mathematiques`, `sciences`, etc.
- Le `subdomainSlug` est plus précis : `lecture-comprehension`, `ecriture`, `calcul-mental`, etc.
- Le `slug` de la compétence résume l'objectif en 3-5 mots : `comprendre-phrase-simple`.

### Références croisées

- `competencyId` dans un `CurriculumEntry` pointe vers l'`id` du `LearningCompetency` correspondant.
- `competencyId` dans une `TeachingSequence` pointe vers l'`id` du `LearningCompetency` parent.
- Ces deux liaisons doivent toujours être cohérentes.

---

## Règles de statut

Les statuts possibles sont définis par `ProgramStatus` :

```typescript
"available" | "in-progress" | "upcoming"
```

| Statut | Signification |
|--------|--------------|
| `available` | Contenu complet, validé, PDF existant (si pertinent) |
| `in-progress` | En cours de rédaction ou de validation |
| `upcoming` | Planifié, non encore commencé |

### Propagation de statut

- Un domaine ou sous-domaine est `available` uniquement si **toutes** ses compétences le sont.
- Un `CurriculumEntry` est `available` uniquement si le contenu pédagogique associé est complet.
- Un `ResourceSlot` passe à `available` uniquement lorsque le fichier PDF existe réellement et que son `href` est renseigné.
- **Ne jamais mettre `href` sur un PDF inexistant.**

Pour l'affichage, toujours utiliser `PublicStatusBadge` et `getPublicStatusKey()` (voir `AGENTS.md`).

---

## Structure des séquences d'enseignement

Chaque `TeachingSequence` contient exactement **5 étapes ordonnées** :

| Ordre | `kind` | Rôle |
|-------|--------|------|
| 1 | `discovery` | Situation de découverte, activation des représentations |
| 2 | `explicit-lesson` | Leçon explicite, apport structuré |
| 3 | `guided-practice` | Pratique guidée collective |
| 4 | `consolidation` | Entraînement et consolidation individuelle |
| 5 | `assessment` | Évaluation observable de la compétence |

Chaque étape peut avoir son propre `status`. Une séquence dont une étape est `upcoming` est elle-même au mieux `in-progress`.

---

## Cas particulier : Maternelle (Cycle 1)

La maternelle utilise un modèle distinct, isolé dans `content/levels/maternelle/types.ts`.

Structure Maternelle :

```
Niveau (ps / ms / gs)
  └── Domaine (MaternelleDomainEntry)
        └── Sous-domaine (MaternelleSubdomain)
              └── Séquence (MaternelleSequence)
                    └── Atelier (MaternelleWorkshop)
                          └── Grille d'observation (MaternelleObservationGrid)
```

Différences structurelles par rapport au modèle standard :

- Pas de `LearningCompetency` formelle — remplacée par des **compétences observables** (`observableSkills`).
- Pas d'exercices écrits — remplacés par des **ateliers** (`type: "dirige" | "autonome" | "manipulation" | "collectif" | "jeu"`).
- Pas de critères de réussite binaires — remplacés par des **grilles d'observation** avec niveaux descriptifs.
- Les **traces** remplacent les évaluations formelles.

Ce modèle ne doit pas être mélangé avec les types primaire/collège/lycée.

---

## Fichiers de données par niveau

| Niveau | Cycle | Fichiers de données | Statut |
|--------|-------|---------------------|--------|
| PS, MS, GS | Cycle 1 | `maternelle/*-domains.ts`, `maternelle/*-subdomains.ts` | Pilote |
| CP | Cycle 2 | `cp-learning-tree.ts`, `cp-competencies.ts`, `cp-curriculum.ts`, `cp-annual-paths.ts` | Pilote |
| CE1 | Cycle 2 | `ce1-learning-tree.ts`, `ce1-competencies.ts`, `ce1-curriculum.ts`, `ce1-annual-paths.ts` | En cours |
| CE2 | Cycle 2 | `ce2-learning-tree.ts`, `ce2-competencies.ts`, `ce2-curriculum.ts`, `ce2-annual-paths.ts` | En cours |
| CM1 | Cycle 3 | `cm1-learning-tree.ts`, `cm1-competencies.ts`, `cm1-curriculum.ts`, `cm1-annual-paths.ts` | En cours |
| CM2 | Cycle 3 | `cm2-competencies.ts`, `cm2-curriculum.ts` | Legacy (types dépréciés) |
| 6e | Cycle 3 | `college/6e-curriculum.ts` | Pilote |
| 5e, 4e, 3e | Cycle 4 | `college/5e-curriculum.ts`, etc. | Émergent |
| Lycée | Post-bac | *(à créer)* | Futur |

Le registre des pages publiées est dans `content/levels/published-subdomain-pages.ts`.

---

## Différences existantes et leur justification

| Différence | Niveaux concernés | Justification |
|------------|-------------------|---------------|
| Types Maternelle isolés | PS, MS, GS | Cycle 1 = pédagogie par observation, incompatible avec le modèle scolaire formel |
| `LearningCompetency` déprécié | CM2 uniquement | Migration non réalisée — à ne pas reproduire |
| Fichiers `*-learning-tree.ts` | CP, CE1, CE2, CM1 | Arbre de navigation catalogue (lightweight), complément du curriculum |
| Fichiers `[level].ts` pilotes | CP, CE1, CE2, CM1 | Modèle complet `Lesson` avec exercices — réservé aux contenus pilotes |
| `CurriculumLevelMap` universel | CP → 6e | Type organisationnel commun — à étendre à tous les nouveaux niveaux |

Les différences inutiles à éliminer lors de futurs développements :

- CM2 doit migrer vers `LearningCompetency` de `learning-architecture-types.ts`.
- Le collège doit adopter `CurriculumLevelMap` dès le début (6e l'utilise déjà).
- Les fichiers `*-curriculum-map.ts` (doublon CP uniquement) ne doivent pas être recréés pour d'autres niveaux.

---

## Exemple — Niveau primaire (CP)

```typescript
// content/levels/cp-curriculum.ts
const cpCurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "cp",
  domains: [
    {
      domainSlug: "francais",
      subject: "Français",
      label: "Français",
      subdomains: [
        {
          subdomainSlug: "lecture-comprehension",
          label: "Lecture et compréhension",
          entries: [
            {
              id: "cp-fr-lc-comprendre-phrase",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Comprendre une phrase simple",
              observableObjective: "L'élève identifie de qui ou de quoi parle une phrase.",
              successCriteria: [
                "Je lis la phrase jusqu'au bout.",
                "Je repère de qui on parle.",
                "Je réponds avec une information du texte.",
              ],
              status: "in-progress",
              competencyId: "cp-fr-lc-comprendre-phrase",
            },
          ],
        },
      ],
    },
  ],
};

// content/levels/cp-competencies.ts
const competence: LearningCompetency = {
  id: "cp-fr-lc-comprendre-phrase",
  slug: "comprendre-phrase-simple",
  title: "Comprendre une phrase simple",
  levelSlug: "cp",
  cycle: "cycle-2",
  subject: "Français",
  domainSlug: "francais",
  subdomainSlug: "lecture-comprehension",
  observableObjective: "L'élève identifie de qui ou de quoi parle une phrase.",
  successCriteria: ["Je repère le personnage.", "Je repère l'action.", "Je réponds sans paraphrase."],
  sequence: {
    id: "seq-cp-fr-lc-comprendre-phrase",
    competencyId: "cp-fr-lc-comprendre-phrase",
    title: "Comprendre une phrase en 5 temps",
    status: "in-progress",
    steps: [
      { order: 1, kind: "discovery",       title: "Qui parle dans cette phrase ?",    status: "in-progress" },
      { order: 2, kind: "explicit-lesson",  title: "Leçon : sujet + verbe",            status: "upcoming" },
      { order: 3, kind: "guided-practice",  title: "On lit ensemble",                  status: "upcoming" },
      { order: 4, kind: "consolidation",    title: "Entraînement individuel",           status: "upcoming" },
      { order: 5, kind: "assessment",       title: "Je montre ce que je sais faire",   status: "upcoming" },
    ],
  },
  status: "in-progress",
};
```

---

## Exemple — Niveau collège (6e)

```typescript
// content/levels/college/6e-curriculum.ts
const sixiemeCurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "6e",
  domains: [
    {
      domainSlug: "francais",
      subject: "Français",
      label: "Français",
      subdomains: [
        {
          subdomainSlug: "lecture",
          label: "Lecture",
          entries: [
            {
              id: "6e-fr-lect-identifier-theme",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture",
              title: "Identifier le thème d'un texte narratif",
              observableObjective: "L'élève reformule le thème principal d'un texte après une première lecture.",
              successCriteria: [
                "Je distingue sujet apparent et thème profond.",
                "Je justifie mon choix avec un élément du texte.",
              ],
              status: "upcoming",
              competencyId: "6e-fr-lect-identifier-theme",
            },
          ],
        },
      ],
    },
  ],
};
```

---

## Exemple — Niveau lycée (Seconde, futur)

```typescript
// content/levels/lycee/seconde-curriculum.ts (à créer)
const secondeCurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "seconde",
  domains: [
    {
      domainSlug: "francais",
      subject: "Français",
      label: "Français",
      subdomains: [
        {
          subdomainSlug: "lecture-analytique",
          label: "Lecture analytique",
          entries: [
            {
              id: "sec-fr-la-analyser-point-de-vue",
              levelSlug: "seconde",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-analytique",
              title: "Analyser un point de vue narratif",
              observableObjective: "L'élève identifie et justifie le point de vue adopté dans un extrait.",
              successCriteria: [
                "Je nomme le type de focalisation.",
                "Je cite un indice textuel pertinent.",
                "Je formule l'effet produit sur le lecteur.",
              ],
              status: "upcoming",
              competencyId: "sec-fr-la-analyser-point-de-vue",
            },
          ],
        },
      ],
    },
  ],
};
```

---

## Checklist pour ajouter un nouveau niveau

1. Ajouter le `levelSlug` dans `AcademyLevelSlug` (`content/program-types.ts`) si absent.
2. Créer le fichier `content/levels/{level}-curriculum.ts` avec un `CurriculumLevelMap`.
3. Créer le fichier `content/levels/{level}-competencies.ts` avec les `LearningCompetency[]`.
4. Ajouter l'entrée dans `content/levels/published-subdomain-pages.ts` pour les pages publiées.
5. Ne pas créer de `href` vers des PDF inexistants.
6. Ne pas recréer un type maternelle pour un niveau scolaire formel.
7. Ne pas utiliser le `LearningCompetency` déprécié de `program-types.ts`.

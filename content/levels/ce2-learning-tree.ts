// Arbre pédagogique CE2 — Cycle 2, primaire.
// Fichier pilote n°3 : vérifie que le modèle fonctionne sur les mathématiques.
//
// Structure : Cycle 2 → CE2 → Mathématiques → Nombres et calcul → Calcul mental
//             → Leçon : Ajouter 9, 19 ou 29 rapidement → 3 exercices progressifs.
//
// Personnage-guide : Esteban le Manchot — donne un conseil de méthode, n'est pas la structure.
// Règle : Leçon et exercices d'abord. Esteban ensuite.
//
// Route /primaire/ce2 non modifiée. Ce fichier n'est pas branché aux pages.

import type {
  AcademyLevelProgram,
  Exercise,
  Lesson,
  LearningCompetency,
  ParentGuidance,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramSubdomain,
  SupportRef,
} from "@/content/program-types";

// ── Exercices ─────────────────────────────────────────────────────────────────
// Progression : Découverte → Entraînement → Approfondissement.

const ex1Decouverte: Exercise = {
  id:           "ce2-ma-cm-ajouter9-ex1",
  slug:         "calculs-guides-plus9",
  lessonId:     "ce2-ma-cm-ajouter9",
  instruction:
    "Complète chaque calcul en suivant le modèle : 24 + 9 = 24 + 10 − 1 = __\n\n" +
    "1) 35 + 9  = 35 + 10 − 1 = __\n" +
    "2) 47 + 9  = 47 + 10 − 1 = __\n" +
    "3) 62 + 19 = 62 + 20 − 1 = __\n" +
    "4) 53 + 19 = 53 + 20 − 1 = __\n" +
    "5) 41 + 29 = 41 + 30 − 1 = __",
  difficulty:   "decouverte",
  activityType: "fill-blank",
  validation:
    "1) 44 · 2) 56 · 3) 81 · 4) 72 · 5) 70. " +
    "L'élève suit la décomposition guidée : + dizaine ronde, puis − 1. " +
    "Il peut expliquer pourquoi on retire 1 à la fin.",
  status: "available",
};

const ex2Entrainement: Exercise = {
  id:           "ce2-ma-cm-ajouter9-ex2",
  slug:         "calcul-mental-plus9-19-29",
  lessonId:     "ce2-ma-cm-ajouter9",
  instruction:
    "Calcule mentalement. Écris uniquement le résultat.\n\n" +
    "1) 28 + 9  = __\n" +
    "2) 56 + 9  = __\n" +
    "3) 34 + 19 = __\n" +
    "4) 67 + 19 = __\n" +
    "5) 45 + 29 = __\n" +
    "6) 71 + 29 = __",
  difficulty:   "entrainement",
  activityType: "fill-blank",
  validation:
    "1) 37 · 2) 65 · 3) 53 · 4) 86 · 5) 74 · 6) 100. " +
    "L'élève applique la stratégie sans décomposition écrite. " +
    "En cas d'erreur, vérifier s'il a oublié de retirer 1.",
  status: "available",
};

const ex3Approfondissement: Exercise = {
  id:           "ce2-ma-cm-ajouter9-ex3",
  slug:         "choisir-strategie-et-expliquer",
  lessonId:     "ce2-ma-cm-ajouter9",
  instruction:
    "Pour chaque calcul, choisis la meilleure stratégie, calcule le résultat, " +
    "puis explique en une phrase comment tu as fait.\n\n" +
    "1) 38 + 9  = __   Comment ? _______________\n" +
    "2) 54 + 19 = __   Comment ? _______________\n" +
    "3) 66 + 29 = __   Comment ? _______________\n" +
    "4) 83 + 19 = __   Comment ? _______________",
  difficulty:   "approfondissement",
  activityType: "free-text",
  validation:
    "1) 47 — ex. « J'ai fait 38 + 10, puis − 1 ». " +
    "2) 73 — ex. « J'ai fait 54 + 20, puis − 1 ». " +
    "3) 95 — ex. « J'ai fait 66 + 30, puis − 1 ». " +
    "4) 102 — ex. « J'ai fait 83 + 20, puis − 1 ». " +
    "L'élève valide sa réponse en vérifiant que le résultat est cohérent " +
    "(ex. 38 + 9 doit être légèrement inférieur à 48).",
  status: "available",
};

// ── Vue parent ────────────────────────────────────────────────────────────────

const parentGuidanceAjouter9: ParentGuidance = {
  summary:
    "Votre enfant apprend à calculer plus vite en transformant un calcul difficile " +
    "en calcul plus facile : par exemple, 36 + 9 devient 36 + 10 − 1.",
  quickTips: [
    "Entraînez-vous à l'oral en voiture ou à table : « 25 + 9, tu trouves comment ? »",
    "Si votre enfant hésite, rappelez-lui : « Ajoute d'abord 10, puis enlève 1. »",
    "Pour + 19 : « Ajoute 20, puis enlève 1. » " +
      "Pour + 29 : « Ajoute 30, puis enlève 1. »",
    "Vérifiez le résultat ensemble avec les doigts ou une calculatrice — " +
      "l'essentiel est qu'il comprenne la stratégie.",
  ],
  successSigns: [
    "Il calcule 45 + 9 en moins de cinq secondes sans poser l'opération.",
    "Il explique : « J'ai ajouté 10, puis j'ai enlevé 1. »",
    "Il adapte la stratégie à + 19 et + 29 sans qu'on lui rappelle.",
  ],
  recommendedExerciseIds: [
    "ce2-ma-cm-ajouter9-ex1",
    "ce2-ma-cm-ajouter9-ex2",
  ],
};

// ── Supports pédagogiques ─────────────────────────────────────────────────────

const supportImprimable: SupportRef = {
  label: "Fiche imprimable — Ajouter 9, 19 ou 29 rapidement",
  hint:
    "12 calculs à trous avec décomposition partielle, " +
    "et un encadré mémo : +9 = +10 −1 · +19 = +20 −1 · +29 = +30 −1.",
};

const supportProjetable: SupportRef = {
  label: "Support à projeter — Ajouter 9, 19 ou 29 rapidement",
  hint:
    "Affichage pas à pas : 36 + 9 → 36 + 10 − 1 → 46 − 1 → 45. " +
    "Flèches de couleur pour chaque étape de la décomposition.",
};

const ressourcesAjouter9: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "assessment-pdf", label: "PDF d'évaluation", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

// ── Leçon ─────────────────────────────────────────────────────────────────────

const leconAjouter9: Lesson = {
  id:    "ce2-ma-cm-ajouter9",
  slug:  "ajouter-9-19-29-rapidement",
  title: "Ajouter 9, 19 ou 29 rapidement",

  objective:
    "Comprendre qu'ajouter 9, 19 ou 29 revient à ajouter 10, 20 ou 30, " +
    "puis à retirer 1.",

  skill:
    "Utiliser une stratégie de calcul mental pour transformer " +
    "un calcul en calcul plus simple.",

  successCriteria: [
    "Je repère le nombre à ajouter (9, 19 ou 29).",
    "Je transforme + 9 en + 10 − 1.",
    "Je transforme + 19 en + 20 − 1.",
    "Je transforme + 29 en + 30 − 1.",
    "Je vérifie que mon résultat est cohérent.",
  ],

  parentGuidance: parentGuidanceAjouter9,

  exercises: [ex1Decouverte, ex2Entrainement, ex3Approfondissement],
  resources: ressourcesAjouter9,
  competencyIds: ["ce2-ma-nombres-calcul-strategie-calcul-mental"],

  characterLink: {
    characterSlug: "esteban",
    name:          "Esteban",
    roleHint:
      "Esteban dit : « Je transforme le calcul pour le rendre plus simple. " +
      "+ 9, c'est + 10 puis − 1. Essaie, tu verras que c'est plus rapide ! »",
  },

  printableSupport:   supportImprimable,
  projectableSupport: supportProjetable,

  status: "in-progress",
};

// ── Compétences structurées ──────────────────────────────────────────────────

const competenceStrategieCalculMental: LearningCompetency = {
  id: "ce2-ma-nombres-calcul-strategie-calcul-mental",
  slug: "utiliser-strategie-calcul-mental",
  title: "Utiliser une stratégie de calcul mental",
  levelSlug: "ce2",
  cycle: "cycle-2",
  stage: "primaire",
  domainSlug: "mathematiques",
  subdomainSlug: "nombres-calcul",
  objective:
    "Transformer un calcul en un calcul plus simple pour ajouter 9, 19 " +
    "ou 29 rapidement.",
  status: "in-progress",
  lessonIds: ["ce2-ma-cm-ajouter9"],
  successCriteria: [
    "Transformer + 9 en + 10 - 1.",
    "Transformer + 19 en + 20 - 1.",
    "Transformer + 29 en + 30 - 1.",
    "Vérifier que le résultat est cohérent.",
  ],
};

// ── Sous-domaine : Nombres et calculs ────────────────────────────────────────

const subdomainNombresCalcul: ProgramSubdomain = {
  id:          "ce2-ma-nombres-calcul",
  slug:        "nombres-calcul",
  title:       "Nombres et calculs",
  description:
    "Comprendre les nombres, calculer mentalement et choisir des stratégies " +
    "adaptées pour résoudre des opérations.",
  lessons: [leconAjouter9],
  competencies: [competenceStrategieCalculMental],
  // À venir : Lire et écrire les nombres jusqu'à 999, Comparer et ordonner
  status: "in-progress",
};

// ── Domaine : Mathématiques ───────────────────────────────────────────────────

const domainMathematiques: ProgramDomain = {
  id:            "ce2-mathematiques",
  slug:          "mathematiques",
  title:         "Mathématiques",
  officialLabel: "Mathématiques — Cycle 2",
  description:
    "Nombres et calcul, grandeurs et mesures, espace et géométrie pour les élèves de CE2.",
  subdomains: [
    subdomainNombresCalcul,
    // À venir : Grandeurs et mesures, Espace et géométrie
  ],
  status: "in-progress",
};

// ── Arbre CE2 complet ─────────────────────────────────────────────────────────

export const ce2LearningTree: AcademyLevelProgram = {
  levelSlug: "ce2",
  label:     "CE2",
  cycle:     "cycle-2",
  stage:     "primaire",

  characterLink: {
    characterSlug: "esteban",
    name:          "Esteban",
    roleHint:
      "Esteban le Manchot aide les élèves à observer, classer " +
      "et garder une trace de leur méthode.",
  },

  domains: [
    domainMathematiques,
    // À venir : Français, Questionner le monde, EMC, Arts, EPS, Langues vivantes
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCe2Domain(domainSlug: string): ProgramDomain | undefined {
  return ce2LearningTree.domains.find((d) => d.slug === domainSlug);
}

export function getCe2Subdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCe2Domain(domainSlug)?.subdomains.find(
    (sd) => sd.slug === subdomainSlug,
  );
}

export function getCe2Lesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCe2Subdomain(domainSlug, subdomainSlug)?.lessons.find(
    (l) => l.slug === lessonSlug,
  );
}

export function getCe2LessonById(lessonId: string): Lesson | undefined {
  for (const domain of ce2LearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}

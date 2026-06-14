// Niveau pilote CE1 — Cycle 2.
// Personnage Gaston en accompagnement uniquement — il ne remplace pas la structure.
// Route /primaire/ce1 non modifiée : ce fichier n'est pas encore branché aux pages génériques.

import type {
  AcademyLevelProgram,
  Exercise,
  Lesson,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramSubdomain,
} from "@/content/program-types";

// ── Exercices de la leçon : Comprendre un court texte narratif ───────────────

const exerciceDecouverte: Exercise = {
  id: "ce1-fr-lc-texte-narratif-ex-01",
  slug: "personnages-et-lieu-decouverte",
  lessonId: "ce1-fr-lc-texte-narratif",
  instruction:
    "Lis ce texte : « Léa et son chien Max courent dans le parc. Tout à coup, Max trouve un os caché sous un arbre. » Réponds aux deux questions : Qui sont les personnages ? Où se passe l'histoire ?",
  difficulty: "decouverte",
  activityType: "free-text",
  validation:
    "Les personnages sont Léa et Max (le chien). L'histoire se passe dans un parc.",
  status: "available",
};

const exerciceEntrainement: Exercise = {
  id: "ce1-fr-lc-texte-narratif-ex-02",
  slug: "ordre-des-actions-entrainement",
  lessonId: "ce1-fr-lc-texte-narratif",
  instruction:
    "Lis ce texte : « Ce matin, Tom se lève tôt. Il prend son sac et court jusqu'à l'école. En classe, il raconte à ses amis qu'il a vu un renard dans le jardin. » Numérote les actions dans l'ordre où elles se passent : A. Il court jusqu'à l'école. B. Il raconte ce qu'il a vu. C. Il se lève tôt et prend son sac.",
  difficulty: "entrainement",
  activityType: "free-text",
  validation:
    "Ordre correct : C → A → B. Tom se lève d'abord (C), puis court à l'école (A), puis raconte sa découverte (B).",
  status: "available",
};

const exerciceApprofondissement: Exercise = {
  id: "ce1-fr-lc-texte-narratif-ex-03",
  slug: "justifier-avec-un-indice-approfondissement",
  lessonId: "ce1-fr-lc-texte-narratif",
  instruction:
    "Lis ce texte : « Emma était triste en arrivant à l'école. Mais quand elle a vu sa meilleure amie Zoé avec un grand sourire, elle a oublié sa peine. » Réponds : Pourquoi Emma n'est-elle plus triste ? Copie un indice du texte pour justifier ta réponse.",
  difficulty: "approfondissement",
  activityType: "free-text",
  validation:
    "Emma n'est plus triste parce qu'elle a vu Zoé sourire. Indice attendu : « quand elle a vu sa meilleure amie Zoé avec un grand sourire ».",
  status: "available",
};

const ressourcesTexteNarratif: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

// ── Leçon : Comprendre un court texte narratif ───────────────────────────────

const leconTexteNarratif: Lesson = {
  id: "ce1-fr-lc-texte-narratif",
  slug: "comprendre-un-court-texte-narratif",
  title: "Comprendre un court texte narratif",
  objective:
    "Je lis un court texte et je comprends qui sont les personnages, où se passe l'histoire et ce qui arrive.",
  skill:
    "Lire et comprendre un texte court en identifiant les informations explicites essentielles.",
  parentGuidance: {
    summary:
      "Votre enfant apprend à lire un court texte et à en retenir les informations essentielles : les personnages, le lieu et l'action principale.",
    quickTips: [
      "Lisez le texte une première fois à voix haute, puis laissez votre enfant le relire seul.",
      "Posez des questions simples : « Qui est dans cette histoire ? » et « Qu'est-ce qui se passe ? »",
      "Encouragez votre enfant à pointer les mots-réponses dans le texte avant de répondre.",
    ],
    successSigns: [
      "Votre enfant nomme les personnages sans avoir besoin de relire entièrement.",
      "Il retrouve le lieu ou l'action en pointant un passage précis du texte.",
      "Il répond en formulant une phrase complète.",
    ],
    recommendedExerciseIds: [
      "ce1-fr-lc-texte-narratif-ex-01",
      "ce1-fr-lc-texte-narratif-ex-02",
    ],
  },
  successCriteria: [
    "Je repère les personnages de l'histoire.",
    "Je repère le lieu où se passe l'histoire.",
    "Je comprends l'action principale.",
    "Je réponds en m'appuyant sur un mot ou une phrase du texte.",
  ],
  exercises: [exerciceDecouverte, exerciceEntrainement, exerciceApprofondissement],
  resources: ressourcesTexteNarratif,
  characterLink: {
    characterSlug: "gaston",
    name: "Gaston",
    roleHint:
      "Gaston encourage à relire le texte avant de répondre, et à toujours chercher la preuve dans les mots.",
  },
  status: "in-progress",
};

// ── Sous-domaine : Lecture et compréhension ──────────────────────────────────

const subdomaineLectureComprehension: ProgramSubdomain = {
  id: "ce1-fr-lecture-comprehension",
  slug: "lecture-comprehension",
  title: "Lecture et compréhension",
  description:
    "Lire des textes courts pour en comprendre le sens global, identifier les personnages, le lieu et les événements.",
  lessons: [leconTexteNarratif],
  status: "in-progress",
};

// ── Domaine : Français ───────────────────────────────────────────────────────

const domaineFrancais: ProgramDomain = {
  id: "ce1-francais",
  slug: "francais",
  title: "Français",
  officialLabel: "Français",
  subdomains: [subdomaineLectureComprehension],
  status: "in-progress",
};

// ── Niveau CE1 ───────────────────────────────────────────────────────────────

export const ce1Level: AcademyLevelProgram = {
  levelSlug: "ce1",
  label: "CE1",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "gaston",
    name: "Gaston",
    roleHint:
      "Gaston guide les élèves de CE1 dans la lecture et la compréhension de textes.",
  },
  domains: [domaineFrancais],
};

// ── Accesseurs utilitaires ───────────────────────────────────────────────────

export function getCe1Lesson(lessonSlug: string): Lesson | undefined {
  for (const domain of ce1Level.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((l) => l.slug === lessonSlug);
      if (found) return found;
    }
  }
  return undefined;
}

export function getCe1Exercises(lessonSlug: string): Exercise[] {
  return getCe1Lesson(lessonSlug)?.exercises ?? [];
}

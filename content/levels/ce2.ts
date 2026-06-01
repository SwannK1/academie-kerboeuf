// Niveau pilote CE2 — Cycle 2.
// Personnage Esteban (manchot humanisé) en accompagnement uniquement.
// Route /primaire/ce2 non modifiée : ce fichier n'est pas encore branché aux pages génériques.

import type {
  AcademyLevelProgram,
  Exercise,
  Lesson,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramSubdomain,
} from "@/content/program-types";

// ── Exercices ────────────────────────────────────────────────────────────────

const exerciceDecouverte: Exercise = {
  id: "ce2-fr-lc-implicite-ex-01",
  slug: "reperer-un-indice-decouverte",
  lessonId: "ce2-fr-lc-implicite",
  instruction:
    "Lis cette phrase : « Clara rentre chez elle en courant, les yeux brillants et le sourire aux lèvres. » Quel indice te montre que Clara est contente ? Recopie-le.",
  difficulty: "decouverte",
  activityType: "free-text",
  validation:
    "Indices attendus : « les yeux brillants » ou « le sourire aux lèvres ». Ces détails montrent que Clara est heureuse sans que le mot soit écrit.",
  status: "available",
};

const exerciceEntrainement: Exercise = {
  id: "ce2-fr-lc-implicite-ex-02",
  slug: "choisir-la-bonne-deduction-entrainement",
  lessonId: "ce2-fr-lc-implicite",
  instruction:
    "Lis ce texte : « Le ciel est gris. Les oiseaux ne chantent plus. Maman dit à Lucas de prendre son imperméable. » Que va-t-il probablement se passer ? Choisis la bonne réponse et explique quel indice t'a guidé.\nA. Il va faire beau.\nB. Il va pleuvoir.\nC. Il va neiger.",
  difficulty: "entrainement",
  activityType: "qcm",
  validation:
    "Bonne réponse : B. Il va pleuvoir. Indices : le ciel gris, les oiseaux silencieux, et l'imperméable conseillé par la maman. Aucun de ces mots ne dit « pluie », mais les trois ensemble permettent de le déduire.",
  status: "available",
};

const exerciceApprofondissement: Exercise = {
  id: "ce2-fr-lc-implicite-ex-03",
  slug: "justifier-une-inference-approfondissement",
  lessonId: "ce2-fr-lc-implicite",
  instruction:
    "Lis ce texte : « Théo ouvre son cartable et fouille pendant de longues minutes. Il retourne toutes ses affaires. Son visage se crispe. Il repose son sac, les mains vides. » Réponds : Qu'a-t-il perdu ou oublié ? Comment le sais-tu ? Cite un indice du texte.",
  difficulty: "approfondissement",
  activityType: "free-text",
  validation:
    "Théo cherche quelque chose qu'il ne trouve pas. On ne sait pas exactement quoi, mais son geste (fouiller, retourner ses affaires) et son expression (visage qui se crispe, mains vides) montrent qu'il a oublié ou perdu un objet important. Indice attendu : « les mains vides » ou « fouille pendant de longues minutes ».",
  status: "available",
};

const ressourcesImplicite: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "assessment-pdf", label: "PDF d'évaluation", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

// ── Leçon ────────────────────────────────────────────────────────────────────

const leconImplicite: Lesson = {
  id: "ce2-fr-lc-implicite",
  slug: "comprendre-les-informations-implicites-dun-texte-court",
  title: "Comprendre les informations implicites d'un texte court",
  objective:
    "Je lis un texte court et je comprends certaines informations qui ne sont pas écrites directement.",
  skill:
    "Faire une inférence simple à partir d'indices présents dans un texte.",
  parentGuidance: {
    summary:
      "Votre enfant apprend à lire entre les lignes : repérer ce que le texte ne dit pas directement mais laisse comprendre grâce à des indices.",
    quickTips: [
      "Après une lecture, posez la question : « Comment tu le sais ? Il est écrit où ? » pour habituer votre enfant à chercher des preuves.",
      "Partagez des observations du quotidien : « Le manteau mouillé de la voisine montre qu'il pleut dehors. » C'est une inférence.",
      "Valorisez les bonnes déductions même imparfaites : l'important est la démarche de justification.",
    ],
    successSigns: [
      "Votre enfant pointe un mot ou une expression du texte pour justifier sa réponse.",
      "Il distingue ce qui est écrit de ce qu'il a déduit.",
      "Il formule sa réponse avec « je pense que… parce que dans le texte il y a… ».",
    ],
    recommendedExerciseIds: [
      "ce2-fr-lc-implicite-ex-01",
      "ce2-fr-lc-implicite-ex-02",
    ],
  },
  successCriteria: [
    "Je repère les indices importants dans le texte.",
    "Je comprends ce qui est écrit directement.",
    "Je déduis une information qui n'est pas écrite.",
    "Je justifie ma réponse avec un indice du texte.",
  ],
  exercises: [exerciceDecouverte, exerciceEntrainement, exerciceApprofondissement],
  resources: ressourcesImplicite,
  characterLink: {
    characterSlug: "esteban",
    name: "Esteban",
    roleHint:
      "Esteban observe toujours les détails avant de conclure. Il aide l'élève à repérer les indices et à expliquer comment il a trouvé sa réponse.",
  },
  status: "available",
};

// ── Sous-domaine ─────────────────────────────────────────────────────────────

const subdomaineLectureComprehension: ProgramSubdomain = {
  id: "ce2-fr-lecture-comprehension",
  slug: "lecture-comprehension",
  title: "Lecture et compréhension",
  description:
    "Lire des textes courts pour en comprendre les informations explicites et implicites, et justifier ses réponses par des indices textuels.",
  lessons: [leconImplicite],
  status: "in-progress",
};

// ── Domaine ──────────────────────────────────────────────────────────────────

const domaineFrancais: ProgramDomain = {
  id: "ce2-francais",
  slug: "francais",
  title: "Français",
  officialLabel: "Français",
  subdomains: [subdomaineLectureComprehension],
  status: "in-progress",
};

// ── Niveau CE2 ───────────────────────────────────────────────────────────────

export const ce2Level: AcademyLevelProgram = {
  levelSlug: "ce2",
  label: "CE2",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "esteban",
    name: "Esteban",
    roleHint:
      "Esteban le manchot guide les élèves de CE2 dans l'art de repérer les indices et de justifier leurs déductions.",
  },
  domains: [domaineFrancais],
};

// ── Accesseurs utilitaires ───────────────────────────────────────────────────

export function getCe2Lesson(lessonSlug: string): Lesson | undefined {
  for (const domain of ce2Level.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((l) => l.slug === lessonSlug);
      if (found) return found;
    }
  }
  return undefined;
}

export function getCe2Exercises(lessonSlug: string): Exercise[] {
  return getCe2Lesson(lessonSlug)?.exercises ?? [];
}

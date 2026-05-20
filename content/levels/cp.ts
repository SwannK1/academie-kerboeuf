// Niveau pilote CP — Cycle 2.
// Version initiale migrée vers les types de program-types.ts.
// Personnage Kiwi en accompagnement uniquement — il ne remplace pas la structure.
// Route /primaire/cp non modifiée : ce fichier n'est pas encore branché aux pages.
//
// Pour la version pilote complète et commentée, voir content/levels/cp-learning-tree.ts.

import type {
  AcademyLevelProgram,
  Exercise,
  Lesson,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramSubdomain,
} from "@/content/program-types";

// ── Exercices de la leçon : Comprendre une phrase simple ────────────────────

const exerciceDecouverte: Exercise = {
  id: "cp-fr-lc-phrase-simple-ex-01",
  slug: "qui-fait-quoi-decouverte",
  lessonId: "cp-fr-lc-phrase-simple",
  instruction:
    "Lis cette phrase : « Le chat boit du lait. » De qui parle-t-on dans cette phrase ?",
  difficulty: "decouverte",
  activityType: "qcm",
  validation:
    "Bonne réponse : le chat. La phrase commence par le personnage principal.",
  status: "available",
};

const exerciceEntrainement: Exercise = {
  id: "cp-fr-lc-phrase-simple-ex-02",
  slug: "qui-fait-quoi-entrainement",
  lessonId: "cp-fr-lc-phrase-simple",
  instruction:
    "Lis ces deux phrases. « La fille saute à la corde. Le garçon lit un livre. » Qu'est-ce que le garçon fait ?",
  difficulty: "entrainement",
  activityType: "free-text",
  validation:
    "Bonne réponse : le garçon lit un livre. L'élève retrouve l'action du deuxième personnage.",
  status: "available",
};

const exerciceApprofondissement: Exercise = {
  id: "cp-fr-lc-phrase-simple-ex-03",
  slug: "qui-fait-quoi-approfondissement",
  lessonId: "cp-fr-lc-phrase-simple",
  instruction:
    "Lis la phrase : « La petite tortue mange une feuille verte près du lac. » Réponds aux deux questions : Qui mange ? Où est-elle ?",
  difficulty: "approfondissement",
  activityType: "free-text",
  validation:
    "Bonne réponse : la petite tortue mange ; elle est près du lac. L'élève repère plusieurs informations dans une même phrase.",
  status: "available",
};

const ressourcesPhraseSimple: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

// ── Leçon : Comprendre une phrase simple ────────────────────────────────────

const leconPhraseSimple: Lesson = {
  id: "cp-fr-lc-phrase-simple",
  slug: "comprendre-une-phrase-simple",
  title: "Comprendre une phrase simple",
  objective: "Comprendre qui fait quoi dans une phrase courte.",
  skill: "Identifier les informations explicites d'une phrase (personnage, action, lieu).",
  parentGuidance: {
    summary:
      "Votre enfant apprend à lire une phrase courte et à repérer l'action, le personnage ou l'objet important.",
    quickTips: [
      "Lisez la phrase à voix haute ensemble, une fois lentement, une fois normalement.",
      "Posez la question : « De qui parle-t-on ? » puis « Qu'est-ce qu'il fait ? »",
      "Félicitez chaque bonne réponse, même partielle.",
    ],
    successSigns: [
      "Votre enfant pointe le mot qui désigne le personnage.",
      "Il répond à « qui fait quoi » sans relire plusieurs fois.",
      "Il explique sa réponse avec un mot de la phrase.",
    ],
    recommendedExerciseIds: [
      "cp-fr-lc-phrase-simple-ex-01",
      "cp-fr-lc-phrase-simple-ex-02",
    ],
  },
  successCriteria: [
    "Je lis la phrase jusqu'au bout avant de répondre.",
    "Je repère de qui ou de quoi on parle dans la phrase.",
    "Je réponds en utilisant une information tirée de la phrase.",
  ],
  exercises: [exerciceDecouverte, exerciceEntrainement, exerciceApprofondissement],
  resources: ressourcesPhraseSimple,
  characterLink: {
    characterSlug: "kiwi",
    name: "Kiwi",
    roleHint: "Kiwi encourage à lire jusqu'au bout avant de répondre.",
  },
  status: "available",
};

// ── Sous-domaine : Lecture compréhension ────────────────────────────────────

const subdomaineLectureComprehension: ProgramSubdomain = {
  id: "cp-fr-lecture-comprehension",
  slug: "lecture-comprehension",
  title: "Lecture et compréhension",
  description:
    "Lire des phrases et des textes courts pour en comprendre le sens global et les informations explicites.",
  lessons: [leconPhraseSimple],
  status: "in-progress",
};

// ── Domaine : Français ───────────────────────────────────────────────────────

const domaineFrancais: ProgramDomain = {
  id: "cp-francais",
  slug: "francais",
  title: "Français",
  officialLabel: "Français",
  subdomains: [subdomaineLectureComprehension],
  status: "in-progress",
};

// ── Niveau CP ────────────────────────────────────────────────────────────────

export const cpLevel: AcademyLevelProgram = {
  levelSlug: "cp",
  label: "CP",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "kiwi",
    name: "Kiwi",
    roleHint: "Kiwi la Grenouille encourage à oser entrer dans les premiers codes.",
  },
  domains: [domaineFrancais],
};

// ── Accesseurs utilitaires ───────────────────────────────────────────────────

export function getCpLesson(lessonSlug: string): Lesson | undefined {
  for (const domain of cpLevel.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((l) => l.slug === lessonSlug);
      if (found) return found;
    }
  }
  return undefined;
}

export function getCpExercises(lessonSlug: string): Exercise[] {
  return getCpLesson(lessonSlug)?.exercises ?? [];
}

// Arbre pédagogique CP — Cycle 2, primaire.
// Fichier pilote officiel : valide le modèle AcademyLevelProgram sur un cas réel.
//
// Structure : Cycle 2 → CP → Français → Lecture compréhension
//             → Leçon : Comprendre une phrase simple → 3 exercices progressifs.
//
// Personnage-guide : Kiwi la Grenouille — accompagne, n'est pas la structure.
// Règle : Leçon et exercices d'abord. Kiwi ensuite.
//
// Route /primaire/cp non modifiée. Ce fichier n'est pas branché aux pages.

import type {
  AcademyLevelProgram,
  Exercise,
  Lesson,
  LearningCompetency,
  LearningMissionLink,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramSubdomain,
  ParentGuidance,
  SupportRef,
} from "@/content/program-types";

// ── Exercices ─────────────────────────────────────────────────────────────────
// Progression : Découverte → Entraînement → Approfondissement.

const ex1Decouverte: Exercise = {
  id:           "cp-fr-lec-phrase-ex1",
  slug:         "entoure-le-personnage",
  lessonId:     "cp-fr-lec-phrase-simple",
  instruction:
    "Lis cette phrase : « Le chat dort sur le canapé. » " +
    "Entoure le mot qui désigne le personnage principal.",
  difficulty:   "decouverte",
  activityType: "reading-comprehension",
  validation:
    "L'élève a entouré « chat ». " +
    "Il peut expliquer : « c'est de lui qu'on parle dans la phrase ».",
  status: "available",
};

const ex2Entrainement: Exercise = {
  id:           "cp-fr-lec-phrase-ex2",
  slug:         "qui-fait-quoi",
  lessonId:     "cp-fr-lec-phrase-simple",
  instruction:
    "Lis cette phrase : « La petite fille lance une balle rouge. » " +
    "Réponds aux questions : Qui ? · Fait quoi ? · Quoi ?",
  difficulty:   "entrainement",
  activityType: "free-text",
  validation:
    "Qui : la petite fille · Fait quoi : lance · Quoi : une balle rouge.",
  status: "available",
};

const ex3Approfondissement: Exercise = {
  id:           "cp-fr-lec-phrase-ex3",
  slug:         "choisir-la-bonne-phrase",
  lessonId:     "cp-fr-lec-phrase-simple",
  instruction:
    "Regarde l'image d'un chien qui court dans le jardin. " +
    "Parmi ces deux phrases, laquelle correspond à l'image ?\n" +
    "A) Le chien dort dans sa niche.\n" +
    "B) Le chien court dans le jardin.",
  difficulty:   "approfondissement",
  activityType: "qcm",
  validation:
    "Bonne réponse : B. " +
    "L'élève justifie en citant ce qu'il voit : « le chien court ».",
  status: "available",
};

// ── Vue parent ────────────────────────────────────────────────────────────────

const parentGuidancePhraseSimple: ParentGuidance = {
  summary:
    "Votre enfant apprend à lire une phrase courte et à repérer " +
    "l'action, le personnage ou l'objet important.",
  quickTips: [
    "Lisez une phrase d'un livre avec votre enfant et demandez-lui : " +
      "« Qui est dans la phrase ? Qu'est-ce qu'il fait ? »",
    "Encouragez-le à pointer les mots du doigt en lisant.",
    "Acceptez qu'il relise deux fois : c'est normal et très bien.",
  ],
  successSigns: [
    "Il peut nommer le personnage d'une phrase lue seul.",
    "Il peut dire « qui fait quoi » dans une phrase simple.",
    "Il choisit la bonne phrase pour décrire une image.",
  ],
  recommendedExerciseIds: [
    "cp-fr-lec-phrase-ex1",
    "cp-fr-lec-phrase-ex2",
  ],
};

// ── Supports pédagogiques ─────────────────────────────────────────────────────

const supportImprimable: SupportRef = {
  label: "Fiche imprimable — Comprendre une phrase simple",
  hint:  "Deux phrases + images à associer, une case « Qui ? / Fait quoi ? » à compléter.",
};

const supportProjetable: SupportRef = {
  label: "Support à projeter — Comprendre une phrase simple",
  hint:  "Une phrase affichée en grands caractères avec code couleur : personnage en vert, action en doré.",
};

const ressourcesPhraseSimple: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

const ressourcesPhraseEcrite: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "missing" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "missing" },
];

// ── Mission liée (optionnelle) ────────────────────────────────────────────────
// La mission accompagne la leçon — elle ne la remplace pas.

const missionLiee: LearningMissionLink = {
  missionSlug: "atelier-lecture",
  title:       "Atelier Lecture",
  description: "Mission de lecture courte pour consolider la compréhension de phrase.",
};

// ── Leçon ─────────────────────────────────────────────────────────────────────

const leconPhraseSimple: Lesson = {
  id:    "cp-fr-lec-phrase-simple",
  slug:  "comprendre-une-phrase-simple",
  title: "Comprendre une phrase simple",

  objective:
    "Comprendre qui fait quoi dans une phrase courte.",

  skill:
    "Identifier les informations explicites d'une phrase simple " +
    "(personnage, action, objet ou lieu).",

  successCriteria: [
    "Je lis la phrase jusqu'au bout avant de répondre.",
    "Je repère de qui ou de quoi on parle dans la phrase.",
    "Je retrouve l'action réalisée par le personnage.",
    "Je réponds en utilisant une information tirée de la phrase.",
  ],

  parentGuidance: parentGuidancePhraseSimple,

  exercises: [ex1Decouverte, ex2Entrainement, ex3Approfondissement],
  resources: ressourcesPhraseSimple,

  missionLink: missionLiee,
  competencyIds: [
    "cp-fr-lecture-comprehension-informations-explicites",
  ],

  characterLink: {
    characterSlug: "kiwi",
    name:          "Kiwi",
    roleHint:
      "Kiwi dit : « Lis jusqu'au dernier mot avant de répondre — " +
      "même si tu crois avoir trouvé ! »",
  },

  printableSupport:    supportImprimable,
  projectableSupport:  supportProjetable,

  status: "in-progress",
};

const leconPhraseEcrite: Lesson = {
  id:    "cp-fr-ecr-phrase-simple",
  slug:  "ecrire-une-phrase-simple",
  title: "Écrire une phrase simple",

  objective:
    "Préparer l'écriture d'une phrase courte avec un sens clair.",

  skill:
    "Produire une phrase courte en respectant l'ordre des mots.",

  successCriteria: [],

  parentGuidance: {
    summary:
      "Votre enfant préparera l'écriture d'une phrase courte et lisible.",
    quickTips: [],
    successSigns: [],
  },

  exercises: [],
  resources: ressourcesPhraseEcrite,

  characterLink: {
    characterSlug: "kiwi",
    name:          "Kiwi",
    roleHint:
      "Kiwi encourage à dire la phrase à voix haute avant de l'écrire.",
  },

  status: "upcoming",
};

// ── Sous-domaine ──────────────────────────────────────────────────────────────

const competenceInformationsExplicites: LearningCompetency = {
  id: "cp-fr-lecture-comprehension-informations-explicites",
  slug: "identifier-informations-explicites",
  title: "Identifier les informations explicites",
  objective:
    "Repérer dans une phrase simple qui fait l'action, ce qui se passe, " +
    "et les informations directement écrites.",
  cycle: "cycle-2",
  levelSlug: "cp",
  stage: "primaire",
  domainSlug: "francais",
  subdomainSlug: "lecture-comprehension",
  status: "in-progress",
  lessonIds: ["cp-fr-lec-phrase-simple"],
  successCriteria: [
    "Repérer de qui ou de quoi parle la phrase.",
    "Identifier l'action réalisée.",
    "Répondre avec une information écrite dans la phrase.",
  ],
};

const subdomainLectureComprehension: ProgramSubdomain = {
  id:          "cp-fr-lecture-comprehension",
  slug:        "lecture-comprehension",
  title:       "Lecture et compréhension",
  description:
    "Comprendre un texte ou une phrase lus seul ou à voix haute, " +
    "repérer les informations explicites.",
  lessons: [leconPhraseSimple],
  competencies: [competenceInformationsExplicites],
  // À venir : Lire un texte court, Repérer les personnages, Répondre à une question
  status: "in-progress",
};

const subdomainEcriture: ProgramSubdomain = {
  id:          "cp-fr-ecriture",
  slug:        "ecriture",
  title:       "Écriture",
  description:
    "Entrer progressivement dans l'écriture de mots puis de phrases courtes.",
  lessons: [leconPhraseEcrite],
  status: "upcoming",
};

// ── Domaine ───────────────────────────────────────────────────────────────────

const domainFrancais: ProgramDomain = {
  id:            "cp-francais",
  slug:          "francais",
  title:         "Français",
  officialLabel: "Français — Cycle 2",
  description:
    "Lecture, écriture, étude de la langue et oral pour les élèves de CP.",
  subdomains: [
    subdomainLectureComprehension,
    subdomainEcriture,
    // À venir : Lecture déchiffrage, Production d'écrit, Étude de la langue, Vocabulaire, Oral
  ],
  status: "in-progress",
};

// ── Arbre CP complet ──────────────────────────────────────────────────────────

export const cpLearningTree: AcademyLevelProgram = {
  levelSlug: "cp",
  label:     "CP",
  cycle:     "cycle-2",
  stage:     "primaire",

  characterLink: {
    characterSlug: "kiwi",
    name:          "Kiwi",
    roleHint:
      "Kiwi la Grenouille encourage les élèves à oser entrer dans les premiers codes.",
  },

  domains: [
    domainFrancais,
    // À venir : Mathématiques, Questionner le monde, EMC, Arts, EPS, Langues vivantes
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCpDomain(domainSlug: string): ProgramDomain | undefined {
  return cpLearningTree.domains.find((d) => d.slug === domainSlug);
}

export function getCpSubdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCpDomain(domainSlug)?.subdomains.find(
    (sd) => sd.slug === subdomainSlug,
  );
}

export function getCpLesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCpSubdomain(domainSlug, subdomainSlug)?.lessons.find(
    (l) => l.slug === lessonSlug,
  );
}

export function getCpLessonById(lessonId: string): Lesson | undefined {
  for (const domain of cpLearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}

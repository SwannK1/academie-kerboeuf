// Niveau pilote CM1 — Cycle 3.
// Personnage Noisette (écureuil humanisé) en accompagnement uniquement.
// Route /primaire/cm1 non modifiée : ce fichier n'est pas encore branché aux pages génériques.

import type {
  AcademyLevelProgram,
  Exercise,
  Lesson,
  ProgramDomain,
  ProgramSubdomain,
} from "@/content/program-types";

// ── Exercices ────────────────────────────────────────────────────────────────

const exerciceDecouverte: Exercise = {
  id: "cm1-fr-lc-intentions-ex-01",
  slug: "paroles-et-actions-decouverte",
  lessonId: "cm1-fr-lc-intentions",
  instruction:
    "Lis ce passage : « — Je peux t'aider à porter tes bagages, proposa Marcus avec un grand sourire. — Oh, avec plaisir ! dit la vieille dame. Marcus saisit la valise et marcha vers la sortie, mais il s'arrêta devant la boutique de bonbons et attendit. »\nRelève dans le texte : une chose que Marcus dit, une chose que Marcus fait.",
  difficulty: "decouverte",
  activityType: "free-text",
  validation:
    "Ce que Marcus dit : « Je peux t'aider à porter tes bagages. » Ce que Marcus fait : il s'arrête devant la boutique de bonbons et attend. Ces deux éléments sont des indices sur ce qu'il veut obtenir.",
  status: "available",
};

const exerciceEntrainement: Exercise = {
  id: "cm1-fr-lc-intentions-ex-02",
  slug: "choisir-lintention-entrainement",
  lessonId: "cm1-fr-lc-intentions",
  instruction:
    "Lis ce passage : « Léonie range soigneusement sa chambre, plie son linge et pose même ses chaussures en ligne droite. Puis elle s'installe au salon en regardant souvent vers la porte d'entrée. »\nQuelle est l'intention la plus probable de Léonie ?\nA. Elle prépare un déménagement.\nB. Elle attend quelqu'un d'important et veut que tout soit parfait.\nC. Elle s'entraîne à être plus ordonnée.\nChoisis la bonne réponse et explique quel indice t'a guidé.",
  difficulty: "entrainement",
  activityType: "qcm",
  validation:
    "Bonne réponse : B. Léonie attend quelqu'un d'important. Indices : elle range avec soin ET regarde souvent vers la porte — ce comportement montre qu'elle attend une visite et veut faire bonne impression.",
  status: "available",
};

const exerciceApprofondissement: Exercise = {
  id: "cm1-fr-lc-intentions-ex-03",
  slug: "expliquer-lintention-approfondissement",
  lessonId: "cm1-fr-lc-intentions",
  instruction:
    "Lis ce passage : « Pendant la récréation, Théa s'approche discrètement du bureau de la maîtresse, jette un coup d'œil vers la cour, puis efface rapidement quelque chose sur le tableau. Elle repart en sifflotant comme si de rien n'était. »\nRéponds à cette question : Que veut faire Théa ? Cite au moins un indice précis du texte pour justifier ta réponse.",
  difficulty: "approfondissement",
  activityType: "free-text",
  validation:
    "Théa veut modifier quelque chose sur le tableau sans se faire remarquer — probablement effacer une note ou une information qui la dérange. Indices attendus : « discrètement », « jette un coup d'œil vers la cour » (elle surveille), « comme si de rien n'était » (elle veut cacher son geste). L'élève doit citer au moins un de ces indices.",
  status: "available",
};

// ── Leçon ────────────────────────────────────────────────────────────────────

const leconIntentions: Lesson = {
  id: "cm1-fr-lc-intentions",
  slug: "comprendre-les-intentions-dun-personnage",
  title: "Comprendre les intentions d'un personnage",
  objective:
    "Je lis un texte narratif et je comprends ce qu'un personnage veut faire, même quand ce n'est pas écrit directement.",
  skill:
    "Interpréter les intentions d'un personnage à partir de ses paroles, de ses actions et des indices du texte.",
  parentGuidance: {
    summary:
      "Votre enfant apprend à lire entre les lignes d'un récit : comprendre ce qu'un personnage cherche à obtenir ou à éviter, en observant ce qu'il dit et ce qu'il fait.",
    quickTips: [
      "Lors d'une lecture commune, posez la question : « Pourquoi le personnage fait-il ça ? » avant de donner la réponse.",
      "Rapprochez l'exercice du quotidien : « D'après toi, pourquoi est-ce que untel a dit ça ? »",
      "Encouragez votre enfant à toujours citer un mot ou une phrase du texte : c'est la preuve de sa déduction.",
    ],
    successSigns: [
      "Votre enfant distingue ce que le personnage fait de ce qu'il veut obtenir.",
      "Il justifie sa réponse en citant un passage précis du texte.",
      "Il formule une intention avec « il veut… » ou « il cherche à… » sans paraphraser le texte mot pour mot.",
    ],
    recommendedExerciseIds: [
      "cm1-fr-lc-intentions-ex-01",
      "cm1-fr-lc-intentions-ex-02",
    ],
  },
  successCriteria: [
    "Je repère ce que fait le personnage.",
    "Je repère ce que dit le personnage.",
    "Je comprends ce qu'il veut obtenir ou éviter.",
    "Je justifie mon interprétation avec au moins un indice du texte.",
  ],
  exercises: [exerciceDecouverte, exerciceEntrainement, exerciceApprofondissement],
  characterLink: {
    characterSlug: "noisette",
    name: "Noisette",
    roleHint:
      "Noisette l'écureuil observe toujours avec méthode avant de conclure. Elle aide l'élève à relever les paroles, les gestes et les petits détails du texte pour comprendre ce que les personnages ont vraiment en tête.",
  },
  status: "available",
};

// ── Sous-domaine ─────────────────────────────────────────────────────────────

const subdomaineLectureComprehension: ProgramSubdomain = {
  id: "cm1-fr-lecture-comprehension",
  slug: "lecture-comprehension",
  title: "Lecture et compréhension",
  description:
    "Lire des textes narratifs pour en comprendre les informations explicites, les sous-entendus et les intentions des personnages.",
  lessons: [leconIntentions],
  status: "in-progress",
};

// ── Domaine ──────────────────────────────────────────────────────────────────

const domaineFrancais: ProgramDomain = {
  id: "cm1-francais",
  slug: "francais",
  title: "Français",
  officialLabel: "Français",
  subdomains: [subdomaineLectureComprehension],
  status: "in-progress",
};

// ── Niveau CM1 ───────────────────────────────────────────────────────────────

export const cm1Level: AcademyLevelProgram = {
  levelSlug: "cm1",
  label: "CM1",
  cycle: "cycle-3",
  stage: "primaire",
  characterLink: {
    characterSlug: "noisette",
    name: "Noisette",
    roleHint:
      "Noisette l'écureuil guide les élèves de CM1 avec curiosité et méthode pour comprendre les textes en profondeur.",
  },
  domains: [domaineFrancais],
};

// ── Accesseurs utilitaires ───────────────────────────────────────────────────

export function getCm1Lesson(lessonSlug: string): Lesson | undefined {
  for (const domain of cm1Level.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((l) => l.slug === lessonSlug);
      if (found) return found;
    }
  }
  return undefined;
}

export function getCm1Exercises(lessonSlug: string): Exercise[] {
  return getCm1Lesson(lessonSlug)?.exercises ?? [];
}

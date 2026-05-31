// Arbre pédagogique CE1 — Cycle 2, primaire.
// Fichier pilote n°2 : vérifie que le modèle AcademyLevelProgram est généralisable hors CM2.
//
// Structure : Cycle 2 → CE1 → Français → Étude de la langue → Grammaire
//             → Leçon : Reconnaître une phrase → 3 exercices progressifs.
//
// Personnage-guide : Gaston le Hérisson — donne un conseil de méthode, n'est pas la structure.
// Règle : Leçon et exercices d'abord. Gaston ensuite.
//
// Route /primaire/ce1 non modifiée. Ce fichier n'est pas branché aux pages.

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
  id:           "ce1-fr-gram-phrase-ex1",
  slug:         "entoure-les-phrases",
  lessonId:     "ce1-fr-gram-phrase",
  instruction:
    "Lis chaque proposition et entoure uniquement celles qui sont des phrases correctes.\n" +
    "1) Le chien court dans le jardin.\n" +
    "2) mange la pomme rouge\n" +
    "3) La maîtresse écrit au tableau.\n" +
    "4) beau soleil aujourd'hui\n" +
    "5) Les enfants jouent à la récréation.",
  difficulty:   "decouverte",
  activityType: "reading-comprehension",
  validation:
    "Phrases correctes : 1, 3 et 5. " +
    "L'élève vérifie pour chacune : est-ce que ça veut dire quelque chose ? " +
    "Y a-t-il une majuscule au début et un point à la fin ?",
  status: "available",
};

const ex2Entrainement: Exercise = {
  id:           "ce1-fr-gram-phrase-ex2",
  slug:         "ajoute-majuscule-et-point",
  lessonId:     "ce1-fr-gram-phrase",
  instruction:
    "Récris chaque phrase en ajoutant la majuscule manquante et le point manquant.\n" +
    "1) le chat dort sur le canapé\n" +
    "2) ma sœur mange une orange\n" +
    "3) les oiseaux chantent dans l'arbre",
  difficulty:   "entrainement",
  activityType: "free-text",
  validation:
    "1) Le chat dort sur le canapé. " +
    "2) Ma sœur mange une orange. " +
    "3) Les oiseaux chantent dans l'arbre. " +
    "L'élève repère l'absence de majuscule initiale et de point final, puis les ajoute.",
  status: "available",
};

const ex3Approfondissement: Exercise = {
  id:           "ce1-fr-gram-phrase-ex3",
  slug:         "classer-phrase-ou-pas",
  lessonId:     "ce1-fr-gram-phrase",
  instruction:
    "Classe chaque proposition dans le bon tableau : « Phrase correcte » ou « Pas une phrase ».\n" +
    "Puis explique en une ligne pourquoi tu l'as classée ainsi.\n\n" +
    "Propositions :\n" +
    "A) Le soleil brille ce matin.\n" +
    "B) une grande forêt verte\n" +
    "C) Les élèves lisent en silence.\n" +
    "D) courir très vite dans",
  difficulty:   "approfondissement",
  activityType: "free-text",
  validation:
    "Phrases correctes : A et C (sens complet, majuscule, point). " +
    "Pas des phrases : B (groupe nominal sans verbe ni ponctuation), " +
    "D (incomplet, sans sens ni ponctuation). " +
    "L'élève justifie son classement en citant au moins un critère : sens, majuscule ou point.",
  status: "available",
};

// ── Vue parent ────────────────────────────────────────────────────────────────

const parentGuidancePhrase: ParentGuidance = {
  summary:
    "Votre enfant apprend à reconnaître une phrase complète en vérifiant " +
    "le sens, la majuscule au début et le point à la fin.",
  quickTips: [
    "Ouvrez un livre avec votre enfant et montrez-lui une phrase : " +
      "« Tu vois la majuscule ici ? Et le point là ? »",
    "Demandez-lui : « Est-ce que ça veut dire quelque chose ? » " +
      "C'est la première question à poser.",
    "Faites l'exercice à l'oral : dites un groupe de mots sans verbe " +
      "(ex. « un gros nuage gris ») et demandez si c'est une phrase.",
  ],
  successSigns: [
    "Il repère la majuscule au début d'une phrase dans un texte.",
    "Il vérifie qu'il y a un point à la fin avant de dire « c'est une phrase ».",
    "Il explique pourquoi un groupe de mots n'est pas une phrase " +
      "(« il n'y a pas de verbe » ou « ça ne veut rien dire »).",
  ],
  recommendedExerciseIds: [
    "ce1-fr-gram-phrase-ex1",
    "ce1-fr-gram-phrase-ex2",
  ],
};

// ── Supports pédagogiques ─────────────────────────────────────────────────────

const supportImprimable: SupportRef = {
  label: "Fiche imprimable — Reconnaître une phrase",
  hint:
    "Liste de 8 propositions à entourer ou barrer, " +
    "avec un tableau « phrase / pas une phrase » à compléter.",
};

const supportProjetable: SupportRef = {
  label: "Support à projeter — Reconnaître une phrase",
  hint:
    "Trois exemples affichés en grands caractères : " +
    "majuscule surlignée en vert, point cerclé en doré, " +
    "proposition incorrecte barrée en rouge.",
};

const ressourcesReconnaitrePhrase: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

// ── Leçon ─────────────────────────────────────────────────────────────────────

const leconReconnaitrePhrase: Lesson = {
  id:    "ce1-fr-gram-phrase",
  slug:  "reconnaitre-une-phrase",
  title: "Reconnaître une phrase",

  objective:
    "Comprendre qu'une phrase a du sens, commence par une majuscule " +
    "et se termine par un point.",

  skill:
    "Identifier les caractéristiques d'une phrase correcte " +
    "(sens, majuscule initiale, ponctuation finale).",

  successCriteria: [
    "Je vérifie que la phrase veut dire quelque chose.",
    "Je repère la majuscule au début de la phrase.",
    "Je repère le point à la fin de la phrase.",
    "Je distingue une phrase d'un simple groupe de mots.",
  ],

  parentGuidance: parentGuidancePhrase,

  exercises: [ex1Decouverte, ex2Entrainement, ex3Approfondissement],
  resources: ressourcesReconnaitrePhrase,
  competencyIds: ["ce1-fr-etude-langue-reconnaitre-phrase"],

  characterLink: {
    characterSlug: "gaston",
    name:          "Gaston",
    roleHint:
      "Gaston dit : « Pose-toi trois questions : " +
      "Est-ce que ça veut dire quelque chose ? " +
      "Il y a une majuscule ? Il y a un point ? " +
      "Si tu réponds oui aux trois, c'est une phrase ! »",
  },

  printableSupport:   supportImprimable,
  projectableSupport: supportProjetable,

  status: "in-progress",
};

// ── Compétences structurées ──────────────────────────────────────────────────

const competenceReconnaitrePhrase: LearningCompetency = {
  id: "ce1-fr-etude-langue-reconnaitre-phrase",
  slug: "reconnaitre-une-phrase-correcte",
  title: "Reconnaître une phrase correcte",
  levelSlug: "ce1",
  cycle: "cycle-2",
  stage: "primaire",
  domainSlug: "francais",
  subdomainSlug: "etude-de-la-langue",
  objective:
    "Identifier une phrase qui a du sens, commence par une majuscule " +
    "et se termine par une ponctuation adaptée.",
  status: "in-progress",
  lessonIds: ["ce1-fr-gram-phrase"],
  successCriteria: [
    "Vérifier que la phrase a du sens.",
    "Repérer la majuscule au début de la phrase.",
    "Repérer la ponctuation finale.",
  ],
};

// ── Sous-domaine : Grammaire ──────────────────────────────────────────────────

const subdomainGrammaire: ProgramSubdomain = {
  id:          "ce1-fr-gram",
  slug:        "grammaire",
  title:       "Grammaire",
  description:
    "Comprendre la structure de la phrase, identifier ses constituants " +
    "et observer les régularités de la langue.",
  lessons: [],
  // À venir : Le nom et le groupe nominal, Le verbe, Le sujet du verbe
  status: "upcoming",
};

// ── Sous-domaine : Étude de la langue (niveau) ────────────────────────────────

const subdomainEtudeLangue: ProgramSubdomain = {
  id:          "ce1-fr-etude-langue",
  slug:        "etude-de-la-langue",
  title:       "Étude de la langue",
  description:
    "Observer et comprendre la langue : grammaire, conjugaison, orthographe.",
  lessons: [leconReconnaitrePhrase],
  competencies: [competenceReconnaitrePhrase],
  // À venir : leçons de conjugaison et d'orthographe
  status: "in-progress",
};

// ── Domaine : Français ────────────────────────────────────────────────────────

const domainFrancais: ProgramDomain = {
  id:            "ce1-francais",
  slug:          "francais",
  title:         "Français",
  officialLabel: "Français — Cycle 2",
  description:
    "Lecture, écriture, étude de la langue et oral pour les élèves de CE1.",
  subdomains: [
    subdomainEtudeLangue,
    subdomainGrammaire,
    // À venir : Lecture compréhension, Production d'écrit, Vocabulaire, Oral
  ],
  status: "in-progress",
};

// ── Arbre CE1 complet ─────────────────────────────────────────────────────────

export const ce1LearningTree: AcademyLevelProgram = {
  levelSlug: "ce1",
  label:     "CE1",
  cycle:     "cycle-2",
  stage:     "primaire",

  characterLink: {
    characterSlug: "gaston",
    name:          "Gaston",
    roleHint:
      "Gaston le Hérisson aide les élèves à choisir une méthode " +
      "et à vérifier leur réponse avant de la donner.",
  },

  domains: [
    domainFrancais,
    // À venir : Mathématiques, Questionner le monde, EMC, Arts, EPS, Langues vivantes
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCe1Domain(domainSlug: string): ProgramDomain | undefined {
  return ce1LearningTree.domains.find((d) => d.slug === domainSlug);
}

export function getCe1Subdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCe1Domain(domainSlug)?.subdomains.find(
    (sd) => sd.slug === subdomainSlug,
  );
}

export function getCe1Lesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCe1Subdomain(domainSlug, subdomainSlug)?.lessons.find(
    (l) => l.slug === lessonSlug,
  );
}

export function getCe1LessonById(lessonId: string): Lesson | undefined {
  for (const domain of ce1LearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}

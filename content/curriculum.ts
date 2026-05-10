import { academySubjects } from "@/content/academy";
import { getClassroomResources } from "@/content/resources";
import { getLearningPathsWithSteps } from "@/content/learning-paths";

export type CurriculumStatus = "validé" | "partiel" | "à vérifier";

export type CurriculumLevelSlug =
  | "maternelle"
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "seconde"
  | "premiere"
  | "terminale";

export type CurriculumMissionLink = {
  title: string;
  href: string;
  subject: string;
};

export type CurriculumPathLink = {
  title: string;
  href: string;
  subject: string;
};

export type CurriculumLevel = {
  slug: CurriculumLevelSlug;
  label: string;
  cycle: string;
  mainSubjects: string[];
  majorDomains: string[];
  coreCompetencies: string[];
  expectedOutcomes: string[];
  missionLinks: CurriculumMissionLink[];
  learningPathLinks: CurriculumPathLink[];
  status: CurriculumStatus;
  verificationNotes: string[];
};

const primarySubjects = [
  "Français",
  "Mathématiques",
  "Lecture",
  "Production d’écrit",
  "Étude de la langue",
  "Calcul mental",
  "Résolution de problèmes",
  "Histoire",
  "Géographie",
  "Sciences",
];

const middleSchoolSubjects = [
  "Français",
  "Mathématiques",
  "Histoire",
  "Géographie",
  "Sciences",
  "Résolution de problèmes",
  "Méthodologie",
];

const highSchoolSubjects = [
  "Français",
  "Histoire",
  "Sciences",
  "Philosophie",
  "Méthodologie",
];

// À vérifier avec les programmes officiels EN : les domaines ci-dessous
// structurent le site, mais ne valent pas validation institutionnelle.
const verificationRequired = [
  "Programmes officiels non fournis dans le projet à cette étape.",
  "À comparer avec les programmes et repères de progression de l’Éducation nationale.",
  "Les missions liées proviennent du catalogue interne Académie Kerboeuf.",
];

const levelDefinitions: {
  slug: CurriculumLevelSlug;
  label: string;
  cycle: string;
  mainSubjects: string[];
  majorDomains: string[];
  coreCompetencies: string[];
  expectedOutcomes: string[];
  status: CurriculumStatus;
  verificationNotes?: string[];
}[] = [
  {
    slug: "maternelle",
    label: "Maternelle",
    cycle: "Cycle 1",
    mainSubjects: [
      "Langage",
      "Activité physique",
      "Activités artistiques",
      "Construire les premiers outils pour structurer sa pensée",
      "Explorer le monde",
    ],
    majorDomains: ["à vérifier"],
    coreCompetencies: ["à vérifier"],
    expectedOutcomes: ["à vérifier"],
    status: "à vérifier",
  },
  {
    slug: "cp",
    label: "CP",
    cycle: "Cycle 2",
    mainSubjects: primarySubjects,
    majorDomains: ["Lecture", "Écriture", "Mathématiques", "Questionner le monde"],
    coreCompetencies: ["à vérifier"],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "ce1",
    label: "CE1",
    cycle: "Cycle 2",
    mainSubjects: primarySubjects,
    majorDomains: ["Lecture", "Écriture", "Mathématiques", "Questionner le monde"],
    coreCompetencies: ["à vérifier"],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "ce2",
    label: "CE2",
    cycle: "Cycle 2",
    mainSubjects: primarySubjects,
    majorDomains: ["Lecture", "Écriture", "Mathématiques", "Questionner le monde"],
    coreCompetencies: ["à vérifier"],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "cm1",
    label: "CM1",
    cycle: "Cycle 3",
    mainSubjects: primarySubjects,
    majorDomains: ["Français", "Mathématiques", "Histoire", "Géographie", "Sciences"],
    coreCompetencies: ["à vérifier"],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "cm2",
    label: "CM2",
    cycle: "Cycle 3",
    mainSubjects: [
      "Français",
      "Lecture et compréhension",
      "Production d’écrit",
      "Étude de la langue",
      "Mathématiques",
      "Calcul mental",
      "Résolution de problèmes",
      "Histoire",
      "Géographie",
      "Sciences",
      "EMC",
      "Méthodologie",
    ],
    majorDomains: [
      "Français : lire, comprendre, interpréter et justifier",
      "Lecture et compréhension : prélever des indices, inférer, reformuler",
      "Production d’écrit : planifier, rédiger, réviser un texte court",
      "Étude de la langue : observer la phrase, les accords et les choix grammaticaux",
      "Mathématiques : calculer, raisonner, chercher et vérifier",
      "Calcul mental : choisir une stratégie efficace et expliciter sa procédure",
      "Résolution de problèmes : modéliser une situation, tester une démarche, conclure",
      "Histoire : situer des documents et construire des repères chronologiques",
      "Géographie : lire des cartes, comprendre les mobilités et les espaces habités",
      "Sciences : observer, formuler une hypothèse, comparer, conclure",
      "EMC : argumenter, écouter, coopérer et exercer un jugement responsable",
      "Méthodologie : lire une consigne, organiser une réponse, justifier avec preuves",
    ],
    coreCompetencies: [
      "Lire un texte narratif ou documentaire en relevant les informations explicites et implicites. Missions liées : Mission Inférence, Lecture Stratégique.",
      "Construire une inférence à partir d’indices et la justifier par des éléments précis du texte. Mission liée : Mission Inférence.",
      "Produire un écrit court organisé, cohérent et révisé à partir d’une intention claire. Mission liée : Production d’Écrit.",
      "Observer la langue pour identifier des régularités, justifier un accord ou analyser une phrase simple. Mission liée : Enquête Grammaticale.",
      "Calculer mentalement en mobilisant décompositions, regroupements et propriétés des opérations. Mission liée : Mission Calcul.",
      "Résoudre un problème en choisissant une démarche, en gardant une trace et en vérifiant le résultat. Mission liée : Défis Mathématiques.",
      "Lire et exploiter une carte ou un document géographique pour formuler une réponse située. Mission liée : Cartographe du Monde.",
      "Lire une archive ou un document historique simple en distinguant date, source, événement et contexte. Mission liée : Archives Historiques.",
      "Mettre en œuvre une démarche scientifique simple : observer, formuler une hypothèse, comparer, conclure. Mission liée : Laboratoire Scientifique.",
      "Participer à une réflexion collective en respectant les arguments, les règles et la parole d’autrui. Domaine EMC à vérifier avec le programme officiel retenu.",
      "Lire une consigne, repérer les verbes d’action, organiser une réponse et expliciter la méthode utilisée. Parcours lié : Lire comme un détective.",
      "à vérifier",
    ],
    expectedOutcomes: [
      "L’élève sait justifier une réponse de lecture par des indices textuels et formuler une inférence prudente.",
      "L’élève sait rédiger une réponse ou un court texte en respectant une intention, une organisation et une phase de révision.",
      "L’élève sait expliquer une stratégie de calcul mental et vérifier la cohérence d’un résultat.",
      "L’élève sait résoudre un défi mathématique en présentant une démarche lisible.",
      "L’élève sait exploiter une carte, une archive ou un document simple pour répondre avec précision.",
      "L’élève sait comparer des observations scientifiques et formuler une conclusion courte.",
      "L’élève sait identifier ce qu’il doit faire dans une consigne et réinvestir une méthode dans plusieurs disciplines.",
      "Les attendus exacts restent à vérifier avec les programmes officiels applicables à l’année scolaire visée.",
    ],
    status: "partiel",
    verificationNotes: [
      "Alignement CM2 renforcé à partir des missions existantes du site et de repères officiels consultés, mais sans intégration complète de textes officiels dans le projet.",
      "À vérifier : programme de français applicable au CM2 selon l’année scolaire retenue.",
      "À vérifier : programme de mathématiques applicable au CM2 selon l’année scolaire retenue.",
      "À vérifier : intégration précise du nouveau programme d’EMC pour le CM2.",
      "Repères histoire-géographie CM2 à confirmer : histoire autour de la République, de l’âge industriel, des guerres mondiales et de l’Union européenne ; géographie autour de se déplacer, communiquer grâce à Internet et mieux habiter.",
      "Les liens aux missions CM2 sont pédagogiques et internes à l’Académie Kerboeuf ; ils ne valent pas validation officielle.",
    ],
  },
  {
    slug: "6e",
    label: "6e",
    cycle: "Cycle 3",
    mainSubjects: middleSchoolSubjects,
    majorDomains: ["Français", "Mathématiques", "Histoire-Géographie", "Sciences", "Méthodologie"],
    coreCompetencies: [
      "Lire un document",
      "Reformuler une consigne",
      "Organiser une réponse",
      "à vérifier",
    ],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "5e",
    label: "5e",
    cycle: "Cycle 4",
    mainSubjects: middleSchoolSubjects,
    majorDomains: ["Français", "Mathématiques", "Histoire-Géographie", "Sciences", "Raisonnement"],
    coreCompetencies: [
      "Construire un raisonnement",
      "Lire un document historique",
      "Observer une démarche scientifique",
      "à vérifier",
    ],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "4e",
    label: "4e",
    cycle: "Cycle 4",
    mainSubjects: middleSchoolSubjects,
    majorDomains: ["Français", "Mathématiques", "Histoire", "Argumentation", "Méthode documentaire"],
    coreCompetencies: [
      "Argumenter",
      "Exploiter un document",
      "Lire une relation mathématique simple",
      "à vérifier",
    ],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "3e",
    label: "3e",
    cycle: "Cycle 4",
    mainSubjects: middleSchoolSubjects,
    majorDomains: ["Français", "Histoire-Géographie", "Méthodologie", "Préparation au brevet"],
    coreCompetencies: [
      "Analyser un sujet",
      "Présenter un document",
      "Organiser ses révisions",
      "à vérifier",
    ],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "seconde",
    label: "Seconde",
    cycle: "Lycée",
    mainSubjects: highSchoolSubjects,
    majorDomains: ["Méthodologie", "Français", "Sciences", "Travail personnel"],
    coreCompetencies: [
      "Organiser son travail",
      "Lire analytiquement",
      "Raisonner scientifiquement",
      "à vérifier",
    ],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "premiere",
    label: "Première",
    cycle: "Lycée",
    mainSubjects: highSchoolSubjects,
    majorDomains: ["Français", "Argumentation", "Commentaire", "Histoire des idées"],
    coreCompetencies: [
      "Analyser un sujet",
      "Construire une problématique",
      "Organiser une argumentation",
      "à vérifier",
    ],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
  {
    slug: "terminale",
    label: "Terminale",
    cycle: "Lycée",
    mainSubjects: highSchoolSubjects,
    majorDomains: ["Philosophie", "Méthodologie", "Orientation", "Révisions"],
    coreCompetencies: [
      "Définir une notion",
      "Construire une problématique",
      "Planifier une révision active",
      "à vérifier",
    ],
    expectedOutcomes: ["à vérifier"],
    status: "partiel",
  },
];

function getMissionLinks(levelSlug: CurriculumLevelSlug): CurriculumMissionLink[] {
  return getClassroomResources()
    .filter((resource) => resource.levelSlug === levelSlug)
    .map((resource) => ({
      title: resource.title,
      href: resource.href,
      subject: resource.subject,
    }));
}

function getLearningPathLinks(levelSlug: CurriculumLevelSlug): CurriculumPathLink[] {
  return getLearningPathsWithSteps()
    .filter((path) => path.levelSlug === levelSlug)
    .map((path) => ({
      title: path.title,
      href: `/parcours/${path.slug}`,
      subject: path.subject,
    }));
}

export const curriculumSubjects = academySubjects;

export const curriculumLevels: CurriculumLevel[] = levelDefinitions.map((level) => ({
  ...level,
  missionLinks: getMissionLinks(level.slug),
  learningPathLinks: getLearningPathLinks(level.slug),
  verificationNotes: level.verificationNotes ?? verificationRequired,
}));

export function getCurriculumLevel(slug: CurriculumLevelSlug) {
  return curriculumLevels.find((level) => level.slug === slug);
}

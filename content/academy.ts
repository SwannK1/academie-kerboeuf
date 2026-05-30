import { cm2Missions } from "@/content/cm2";
import type {
  MissionPedagogy,
  MissionProgress,
  MissionProgressKey,
  MissionProgressStatus,
} from "@/content/mission-types";
import {
  getSharedMissionsForLevel,
  type MissionTeacherUse,
  type SharedMission,
} from "@/content/missions";
import { getPublicStatusKey } from "@/content/public-status";

export type AcademyStage = "primaire" | "college" | "lycee";

export const stageLabels: Record<AcademyStage, string> = {
  primaire: "Primaire",
  college: "Collège",
  lycee: "Lycée",
};

export type AcademySubject =
  | "Français"
  | "Mathématiques"
  | "Histoire"
  | "Géographie"
  | "Sciences"
  | "Lecture"
  | "Production d’écrit"
  | "Étude de la langue"
  | "Calcul mental"
  | "Résolution de problèmes"
  // — Collège —
  | "SVT"
  | "Physique-Chimie"
  | "Technologie"
  | "Langues vivantes"
  | "Arts Plastiques"
  | "Éducation Musicale"
  | "EPS"
  | "EMC"
  | "Documentation"
  // — Lycée —
  | "Philosophie"
  | "SES"
  | "Géopolitique"
  | "EMI"
  | "NSI"
  | "Orientation";

export type AcademyMission = {
  slug: string;
  title: string;
  description: string;
  subject: AcademySubject | string;
  status: "disponible" | "bientôt" | "en préparation";
  objective?: string;
  skill?: string;
  difficulty?: string;
  professorSlug?: string;
  professorName?: string;
  associatedCharacter?: string;
  introduction?: string;
  support?: {
    label: string;
    content: string;
  };
  questions?: string[];
  correction?: string[];
  methodTip?: string;
  projectionHint?: string;
  printHint?: string;
  curriculumDomain?: string;
  curriculumCompetency?: string;
  curriculumObjective?: string;
  officialLevel?: string;
  cycle?: string;
  skillTags?: string[];
  teacherUse?: MissionTeacherUse[];
  studentUse?: string;
  theme: {
    name: string;
    accentClass: string;
    surfaceClass: string;
    textClass: string;
    ringClass: string;
  };
  progress: MissionProgress;
  pedagogy: MissionPedagogy;
};

export type AcademyLevel = {
  slug: string;
  label: string;
  stage: AcademyStage;
  cycle: string;
  professor: {
    slug: string;
    name: string;
    role: string;
    initial: string;
    mainSubject: AcademySubject;
    symbol: string;
    description: string;
    specialty: string;
    visualMood: string;
  };
  mood: {
    name: string;
    description: string;
  };
  heroTitle: string;
  description: string;
  subjects: AcademySubject[];
  missions: AcademyMission[];
};

export const academySubjects: AcademySubject[] = [
  "Français",
  "Mathématiques",
  "Histoire",
  "Géographie",
  "Sciences",
  "Lecture",
  "Production d’écrit",
  "Étude de la langue",
  "Calcul mental",
  "Résolution de problèmes",
  // — Collège —
  "SVT",
  "Physique-Chimie",
  "Technologie",
  "Langues vivantes",
  "Arts Plastiques",
  "Éducation Musicale",
  "EPS",
  "EMC",
  "Documentation",
];

export const academyThemes = {
  jade: {
    name: "Exploration verte",
    accentClass: "bg-jade",
    surfaceClass: "bg-jade/10",
    textClass: "text-jade",
    ringClass: "border-jade/35",
  },
  gold: {
    name: "Expédition dorée",
    accentClass: "bg-gold",
    surfaceClass: "bg-gold/10",
    textClass: "text-gold",
    ringClass: "border-gold/35",
  },
  sky: {
    name: "Carte azur",
    accentClass: "bg-sky",
    surfaceClass: "bg-sky/10",
    textClass: "text-sky",
    ringClass: "border-sky/35",
  },
  ember: {
    name: "Archives braise",
    accentClass: "bg-ember",
    surfaceClass: "bg-ember/10",
    textClass: "text-ember",
    ringClass: "border-ember/35",
  },
};

const missionProgressLabels = {
  ready: "prête",
  draft: "à préparer",
  prototype: "prototype",
} satisfies Record<MissionProgressKey, MissionProgress["label"]>;

function missionProgress(
  key: MissionProgressKey,
  detail: string,
): MissionProgress {
  return {
    key,
    label: missionProgressLabels[key],
    detail,
  };
}

function progressKeyFromPedagogyStatus(
  status: MissionProgressStatus | undefined,
): MissionProgressKey {
  return status === "prête à lancer" ? "ready" : "draft";
}

function placeholderPedagogy({
  title,
  subject,
  professor,
}: {
  title: string;
  subject: string;
  professor: string;
}): MissionPedagogy {
  return {
    immersiveIntroduction: `${professor} ouvre le dossier ${title} et prépare les élèves à entrer dans une scène de mission.`,
    narrativeContext:
      "Cette mission est un cadre prêt à enrichir : elle accueillera un récit, un défi, des questions et une correction.",
    schoolSkill: `Mobiliser une compétence de ${subject} dans une activité courte et guidée.`,
    mainChallenge: {
      label: "Défi principal à venir",
      content:
        "Le défi principal sera rédigé lors de la prochaine étape pédagogique.",
    },
    progressiveQuestions: [
      {
        level: "indice",
        prompt: "Repérer les informations utiles dans la consigne.",
      },
      {
        level: "raisonnement",
        prompt: "Choisir une démarche et l’expliquer simplement.",
      },
      {
        level: "synthèse",
        prompt: "Formuler une réponse claire et vérifiée.",
      },
    ],
    methodTip:
      "Lis la consigne deux fois : une première fois pour comprendre, une seconde pour repérer ce qu’il faut vraiment faire.",
    correction: [
      {
        prompt: "Correction à venir",
        answer:
          "La correction détaillée sera ajoutée quand la mission sera rédigée.",
      },
    ],
    progressStatus: {
      state: "à enrichir",
      detail:
        "La structure pédagogique existe, le contenu de classe sera ajouté ensuite.",
    },
  };
}

export function isPlaceholderPedagogy(pedagogy: MissionPedagogy) {
  return (
    pedagogy.mainChallenge?.label === "Défi principal à venir" ||
    pedagogy.mainChallenge?.content ===
      "Le défi principal sera rédigé lors de la prochaine étape pédagogique." ||
    pedagogy.correction?.some(
      (item) =>
        item.prompt === "Correction à venir" ||
        item.answer ===
          "La correction détaillée sera ajoutée quand la mission sera rédigée.",
    ) === true ||
    pedagogy.progressStatus?.state === "à enrichir"
  );
}

function mission({
  slug,
  title,
  description,
  subject,
  theme,
  professor,
  status = "en préparation",
}: {
  slug: string;
  title: string;
  description: string;
  subject: AcademySubject;
  theme: keyof typeof academyThemes;
  professor: string;
  status?: AcademyMission["status"];
}): AcademyMission {
  return {
    slug,
    title,
    description,
    subject,
    status,
    theme: academyThemes[theme],
    progress: missionProgress(
      "draft",
      "Progression fictive : aucune sauvegarde ni compte connecté.",
    ),
    pedagogy: placeholderPedagogy({ title, subject, professor }),
  };
}

function missionsForLevel(professor: string): AcademyMission[] {
  return [
    mission({
      slug: "atelier-lecture",
      title: "Atelier Lecture",
      description: "Comprendre un texte court et repérer les informations clés.",
      subject: "Lecture",
      theme: "jade",
      professor,
      status: "en préparation",
    }),
    mission({
      slug: "defi-calcul-mental",
      title: "Défi Calcul Mental",
      description: "S’entraîner avec des calculs rapides et des stratégies simples.",
      subject: "Calcul mental",
      theme: "gold",
      professor,
      status: "bientôt",
    }),
    mission({
      slug: "carte-du-monde",
      title: "Carte du Monde",
      description: "Lire des repères géographiques et organiser une carte.",
      subject: "Géographie",
      theme: "sky",
      professor,
    }),
    mission({
      slug: "chroniques-historiques",
      title: "Chroniques Historiques",
      description: "Situer des documents et comprendre leur contexte.",
      subject: "Histoire",
      theme: "ember",
      professor,
    }),
    mission({
      slug: "laboratoire-des-idees",
      title: "Laboratoire des Idées",
      description: "Observer, questionner et organiser une trace écrite.",
      subject: "Sciences",
      theme: "sky",
      professor,
    }),
  ];
}

function missionFromShared(sharedMission: SharedMission): AcademyMission {
  const hasCompleteClassroomContent = Boolean(
    sharedMission.support?.content &&
      sharedMission.questions?.length &&
      sharedMission.correction?.length,
  );
  const status =
    sharedMission.status === "disponible" && hasCompleteClassroomContent
      ? "disponible"
      : sharedMission.status === "disponible"
        ? "en préparation"
        : "bientôt";

  return {
    slug: sharedMission.slug,
    title: sharedMission.title,
    description: sharedMission.description,
    subject: sharedMission.subject,
    status,
    objective: sharedMission.objective,
    skill: sharedMission.skill,
    difficulty: sharedMission.difficulty,
    professorSlug: sharedMission.professorSlug,
    professorName: sharedMission.professorName,
    associatedCharacter: sharedMission.associatedCharacter,
    introduction: sharedMission.introduction,
    support: sharedMission.support,
    questions: sharedMission.questions,
    correction: sharedMission.correction,
    methodTip: sharedMission.methodTip,
    projectionHint: sharedMission.projectionHint,
    printHint: sharedMission.printHint,
    curriculumDomain: sharedMission.curriculumDomain,
    curriculumCompetency: sharedMission.curriculumCompetency,
    curriculumObjective: sharedMission.curriculumObjective,
    officialLevel: sharedMission.officialLevel,
    cycle: sharedMission.cycle,
    skillTags: sharedMission.skillTags,
    teacherUse: sharedMission.teacherUse,
    studentUse: sharedMission.studentUse,
    theme: academyThemes[sharedMission.theme],
    progress: missionProgress(
      status === "disponible" ? "ready" : "draft",
      status === "disponible"
        ? "Mission exemple disponible côté front-end, sans sauvegarde."
        : "Mission exemple à venir, prête à être enrichie.",
    ),
    pedagogy: placeholderPedagogy({
      title: sharedMission.title,
      subject: sharedMission.subject,
      professor: sharedMission.professorName,
    }),
  };
}

function sharedMissionsForLevel(levelSlug: string, professor: string) {
  const sharedMissions = getSharedMissionsForLevel(levelSlug).map(missionFromShared);

  return sharedMissions.length > 0 ? sharedMissions : missionsForLevel(professor);
}

// Legacy source — migration vers mission-registry en cours.
export const academyLevels: AcademyLevel[] = [
  {
    slug: "cp",
    label: "CP",
    stage: "primaire",
    cycle: "Cycle 2",
    professor: {
      slug: "zoe",
      name: "Zoé",
      role: "Guide des premiers codes",
      initial: "Z",
      mainSubject: "Lecture",
      symbol: "Lanterne",
      description:
        "Zoé accompagne les premiers pas dans le décodage, la compréhension et les rituels de classe.",
      specialty: "Installer des repères simples pour lire, compter et oser répondre.",
      visualMood: "Lumière douce, carnets ouverts et premières cartes de mission.",
    },
    mood: {
      name: "Salle des lanternes",
      description: "Une ambiance douce pour entrer dans la lecture et les nombres.",
    },
    heroTitle: "CP avec Zoé",
    description:
      "Un niveau d’entrée dans l’Académie, pensé pour sécuriser les premiers apprentissages.",
    subjects: academySubjects,
    missions: missionsForLevel("Zoé"),
  },
  {
    slug: "ce1",
    label: "CE1",
    stage: "primaire",
    cycle: "Cycle 2",
    professor: {
      slug: "gaston",
      name: "Gaston",
      role: "Gardien des stratégies",
      initial: "G",
      mainSubject: "Calcul mental",
      symbol: "Boussole",
      description:
        "Gaston aide les élèves à choisir une méthode, vérifier une réponse et expliquer leur démarche.",
      specialty: "Transformer les automatismes en stratégies conscientes.",
      visualMood: "Table d’indices, repères dorés et petits défis chronométrés.",
    },
    mood: {
      name: "Galerie des indices",
      description: "Des missions courtes pour consolider lecture, calcul et méthode.",
    },
    heroTitle: "CE1 avec Gaston",
    description:
      "Un parcours pour renforcer les automatismes et apprendre à expliquer ses réponses.",
    subjects: academySubjects,
    missions: missionsForLevel("Gaston"),
  },
  {
    slug: "ce2",
    label: "CE2",
    stage: "primaire",
    cycle: "Cycle 2",
    professor: {
      slug: "esteban",
      name: "Esteban",
      role: "Architecte des savoirs",
      initial: "E",
      mainSubject: "Étude de la langue",
      symbol: "Compas",
      description:
        "Esteban structure les notions et aide les élèves à relier consignes, mots et raisonnements.",
      specialty: "Organiser les connaissances dans des schémas clairs et progressifs.",
      visualMood: "Observatoire calme, tableaux de notions et tracés précis.",
    },
    mood: {
      name: "Observatoire des notions",
      description: "Un univers de transition vers des consignes plus longues.",
    },
    heroTitle: "CE2 avec Esteban",
    description:
      "Un niveau pour organiser les connaissances et prendre confiance dans les démarches.",
    subjects: academySubjects,
    missions: missionsForLevel("Esteban"),
  },
  {
    slug: "cm1",
    label: "CM1",
    stage: "primaire",
    cycle: "Cycle 3",
    professor: {
      slug: "noisette",
      name: "Noisette",
      role: "Maître des cartes",
      initial: "N",
      mainSubject: "Géographie",
      symbol: "Carte",
      description:
        "Noisette guide les élèves dans les parcours de cycle 3, entre cartes, documents et méthodes.",
      specialty: "Faire passer d’une information repérée à une réponse construite.",
      visualMood: "Cartothèque secrète, plans annotés et itinéraires de savoir.",
    },
    mood: {
      name: "Cartothèque secrète",
      description: "Une ambiance d’exploration pour relier disciplines et méthodes.",
    },
    heroTitle: "CM1 avec Noisette",
    description:
      "Un parcours pour développer l’autonomie et relier les apprentissages entre eux.",
    subjects: academySubjects,
    missions: missionsForLevel("Noisette"),
  },
  {
    slug: "cm2",
    label: "CM2",
    stage: "primaire",
    cycle: "Cycle 3",
    professor: {
      slug: "felix",
      name: "Félix",
      role: "Explorateur référent",
      initial: "F",
      mainSubject: "Lecture",
      symbol: "Carnet d’exploration",
      description:
        "Félix accompagne le CM2 avec des missions de lecture, calcul, écriture et enquête documentaire.",
      specialty: "Relier les indices, justifier les réponses et préparer l’entrée au collège.",
      visualMood: "Quartier général, dossiers codés et cartes de progression.",
    },
    mood: {
      name: "Quartier général de Félix",
      description: "Une préparation immersive à l’entrée au collège.",
    },
    heroTitle: "CM2 avec Félix",
    description:
      "Un parcours d’aventure pour consolider les fondamentaux et préparer l’entrée au collège.",
    subjects: academySubjects,
    missions: cm2Missions.map((missionItem) => {
      const progressStatus = missionItem.pedagogy.progressStatus;

      return {
        ...missionItem,
        progress: missionProgress(
          progressKeyFromPedagogyStatus(progressStatus?.state),
          progressStatus?.detail ??
            "La structure de mission est prête à recevoir un contenu pédagogique complet.",
        ),
      };
    }),
  },
  {
    slug: "6e",
    label: "6e",
    stage: "college",
    cycle: "Cycle 3",
    professor: {
      slug: "oria",
      name: "Oria",
      role: "Passeuse de méthodes",
      initial: "O",
      mainSubject: "Français",
      symbol: "Passerelle",
      description:
        "Oria sécurise l’entrée au collège avec des routines de lecture, d’organisation et de réponse.",
      specialty: "Installer des méthodes transférables d’une matière à l’autre.",
      visualMood: "Passerelle lumineuse, casiers de missions et fiches de méthode.",
    },
    mood: {
      name: "Passerelle du collège",
      description: "Un univers pour installer les routines et l’organisation.",
    },
    heroTitle: "6e avec Oria",
    description:
      "Un niveau pour accompagner le passage au collège avec des missions très guidées.",
    subjects: academySubjects,
    missions: sharedMissionsForLevel("6e", "Oria"),
  },
  {
    slug: "5e",
    label: "5e",
    stage: "college",
    cycle: "Cycle 4",
    professor: {
      slug: "enzo",
      name: "Enzo",
      role: "Analyste des énigmes",
      initial: "E",
      mainSubject: "Résolution de problèmes",
      symbol: "Prisme",
      description:
        "Enzo entraîne les élèves à décortiquer les problèmes, comparer les pistes et argumenter.",
      specialty: "Faire émerger un raisonnement clair à partir d’une situation complexe.",
      visualMood: "Salle des mécanismes, leviers logiques et tableaux d’analyse.",
    },
    mood: {
      name: "Salle des mécanismes",
      description: "Des missions pour comprendre, organiser et argumenter.",
    },
    heroTitle: "5e avec Enzo",
    description:
      "Un parcours pour renforcer le raisonnement et la précision des réponses.",
    subjects: academySubjects,
    missions: sharedMissionsForLevel("5e", "Enzo"),
  },
  {
    slug: "4e",
    label: "4e",
    stage: "college",
    cycle: "Cycle 4",
    professor: {
      slug: "maia",
      name: "Maïa",
      role: "Stratège des dossiers",
      initial: "M",
      mainSubject: "Histoire",
      symbol: "Archive",
      description:
        "Maïa accompagne les dossiers plus denses : documents, preuves, synthèses et argumentation.",
      specialty: "Croiser les informations pour construire une réponse solide.",
      visualMood: "Bureau d’enquête, dossiers scellés et frises discrètes.",
    },
    mood: {
      name: "Bureau des enquêtes",
      description: "Un univers plus dense pour analyser et croiser les informations.",
    },
    heroTitle: "4e avec Maïa",
    description:
      "Un niveau pour apprendre à justifier, comparer et structurer ses démarches.",
    subjects: academySubjects,
    missions: sharedMissionsForLevel("4e", "Maïa"),
  },
  {
    slug: "3e",
    label: "3e",
    stage: "college",
    cycle: "Cycle 4",
    professor: {
      slug: "akira",
      name: "Akira",
      role: "Mentor de synthèse",
      initial: "A",
      mainSubject: "Production d’écrit",
      symbol: "Sceau",
      description:
        "Akira aide les élèves de 3e à structurer, synthétiser et préparer les échéances du collège.",
      specialty: "Transformer des connaissances dispersées en réponses organisées.",
      visualMood: "Salle du conseil final, plans de synthèse et repères sobres.",
    },
    mood: {
      name: "Salle du conseil final",
      description: "Une ambiance de préparation aux bilans et aux choix d’orientation.",
    },
    heroTitle: "3e avec Akira",
    description:
      "Un parcours pour consolider les compétences du collège et préparer les échéances.",
    subjects: academySubjects,
    missions: sharedMissionsForLevel("3e", "Akira"),
  },
  {
    slug: "seconde",
    label: "Seconde",
    stage: "lycee",
    cycle: "Lycée",
    professor: {
      slug: "oria",
      name: "Oria",
      role: "Passeuse de méthodes",
      initial: "O",
      mainSubject: "Français",
      symbol: "Passerelle",
      description:
        "Oria accompagne l’entrée au lycée avec des repères d’organisation, de lecture et de prise de notes.",
      specialty: "Stabiliser les méthodes pour absorber le saut d’autonomie de la Seconde.",
      visualMood: "Grande passerelle, carnets de méthode et cartes de choix.",
    },
    mood: {
      name: "Grande passerelle du lycée",
      description:
        "Un univers de transition pour transformer les routines du collège en autonomie lycéenne.",
    },
    heroTitle: "Seconde avec Oria",
    description:
      "Un niveau de transition pour consolider les méthodes, organiser le travail et prendre confiance dans les exigences du lycée.",
    subjects: academySubjects,
    missions: sharedMissionsForLevel("seconde", "Oria"),
  },
  {
    slug: "premiere",
    label: "Première",
    stage: "lycee",
    cycle: "Lycée",
    professor: {
      slug: "maia",
      name: "Maïa",
      role: "Stratège des dossiers",
      initial: "M",
      mainSubject: "Histoire",
      symbol: "Archive",
      description:
        "Maïa relie les documents, les notions et les choix d’orientation dans des dossiers plus exigeants.",
      specialty: "Construire une argumentation à partir de sources, d’exemples et de preuves hiérarchisées.",
      visualMood: "Archives hautes, dossiers spécialisés et tables d’analyse.",
    },
    mood: {
      name: "Archives des spécialités",
      description:
        "Un univers de dossiers approfondis pour apprendre à choisir, argumenter et hiérarchiser.",
    },
    heroTitle: "Première avec Maïa",
    description:
      "Un niveau pour structurer les spécialités, approfondir les démarches et préparer des réponses plus nuancées.",
    subjects: academySubjects,
    missions: sharedMissionsForLevel("premiere", "Maïa"),
  },
  {
    slug: "terminale",
    label: "Terminale",
    stage: "lycee",
    cycle: "Lycée",
    professor: {
      slug: "akira",
      name: "Akira",
      role: "Mentor de synthèse",
      initial: "A",
      mainSubject: "Production d’écrit",
      symbol: "Sceau",
      description:
        "Akira prépare la dernière marche : synthétiser, défendre un raisonnement et présenter un parcours.",
      specialty: "Transformer des connaissances dispersées en réponses organisées, orales et écrites.",
      visualMood: "Salle du conseil final, plans sobres et dossiers d’orientation.",
    },
    mood: {
      name: "Conseil des synthèses",
      description:
        "Un univers de consolidation finale pour organiser ses idées et tenir un propos exigeant.",
    },
    heroTitle: "Terminale avec Akira",
    description:
      "Un niveau de synthèse pour préparer les échéances, les choix d’orientation et les prises de parole décisives.",
    subjects: academySubjects,
    missions: sharedMissionsForLevel("terminale", "Akira"),
  },
];

export function getLevelsByStage(stage: AcademyStage) {
  return academyLevels.filter((level) => level.stage === stage);
}

export function getAcademyLevel(stage: AcademyStage, slug: string) {
  return academyLevels.find(
    (level) => level.stage === stage && level.slug === slug,
  );
}

export function getAcademyMission(
  stage: AcademyStage,
  levelSlug: string,
  missionSlug: string,
) {
  const level = getAcademyLevel(stage, levelSlug);
  const mission = level?.missions.find(
    (missionItem) => missionItem.slug === missionSlug,
  );

  return level && mission ? { level, mission } : undefined;
}

export function getAcademyMissionParams(stage: AcademyStage) {
  return getLevelsByStage(stage).flatMap((level) =>
    level.missions.map((missionItem) => ({
      level: level.slug,
      slug: missionItem.slug,
    })),
  );
}

export function hasRealMissionContent(
  mission: Pick<
    AcademyMission,
    | "status"
    | "introduction"
    | "support"
    | "questions"
    | "correction"
    | "methodTip"
    | "projectionHint"
    | "printHint"
  >,
) {
  const contentFields = [
    mission.introduction,
    mission.support?.label,
    mission.support?.content,
    ...(mission.questions ?? []),
    ...(mission.correction ?? []),
    mission.methodTip,
    mission.projectionHint,
    mission.printHint,
  ];

  return Boolean(
    getPublicStatusKey(mission.status) === "available" &&
      mission.support?.label &&
      mission.support?.content &&
      mission.questions?.length &&
      mission.correction?.length &&
      contentFields.every(isRealMissionText),
  );
}

export function isMissionPubliclyAvailable(
  mission: Pick<AcademyMission, "status">,
) {
  return getPublicStatusKey(mission.status) === "available";
}

export function isMissionReadyForDetail(
  mission: Pick<
    AcademyMission,
    | "status"
    | "introduction"
    | "support"
    | "questions"
    | "correction"
    | "methodTip"
    | "projectionHint"
    | "printHint"
  >,
) {
  return hasRealMissionContent(mission);
}

const placeholderContentPatterns = [
  /sera\s+r[ée]dig[ée]/i,
  /sera\s+ajout[ée]/i,
  /prochaine\s+[ée]tape\s+p[ée]dagogique/i,
  /cadre\s+pr[êe]t\s+[àa]\s+enrichir/i,
  /contenu\s+de\s+classe\s+sera\s+ajout[ée]/i,
  /correction\s+[àa]\s+venir/i,
  /d[ée]fi\s+principal\s+[àa]\s+venir/i,
] as const;

function isRealMissionText(value: string | undefined) {
  if (!value?.trim()) {
    return false;
  }

  return !placeholderContentPatterns.some((pattern) => pattern.test(value));
}

export function getLevelPath(level: Pick<AcademyLevel, "stage" | "slug">) {
  return `/${level.stage}/${level.slug}`;
}

export function getLevelMissionsPath(level: Pick<AcademyLevel, "stage" | "slug">) {
  return `${getLevelPath(level)}/missions`;
}

export function getRecentMissions() {
  return academyLevels.flatMap((level) =>
    level.missions.slice(0, 2).map((missionItem) => ({
      ...missionItem,
      level,
      href:
        level.slug === "cm2"
          ? `/primaire/cm2/missions/${missionItem.slug}`
          : getLevelMissionsPath(level),
    })),
  );
}

const rawAcademyProfessors = academyLevels.map((level) => ({
  ...level.professor,
  profileHref: `/professeurs/${level.professor.slug}`,
  level: level.label,
  cycle: level.cycle,
  stage: level.stage,
  mood: level.mood.name,
  href: getLevelPath(level),
  missionsHref: getLevelMissionsPath(level),
}));

export const academyProfessors = rawAcademyProfessors.filter(
  (professor, index, professors) =>
    professors.findIndex((candidate) => candidate.slug === professor.slug) ===
    index,
);

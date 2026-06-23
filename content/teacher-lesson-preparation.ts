/**
 * Données de base de l'atelier "Préparer une séance".
 *
 * Outil de préparation de séance complète (local uniquement, localStorage).
 * Indépendant du cahier journal et de la progression de période, mais peut
 * lire la progression de période (lecture seule, import ciblé) et écrire
 * une séance dans le cahier journal (ajout ciblé, avec confirmation).
 *
 * Statuts locaux à cet outil uniquement (distincts des statuts publics de
 * visibilité gouvernés par content/public-status.*). Ne jamais router ces
 * statuts via la façade publique ni via PublicStatusBadge.
 *
 * Aucune donnée nominative ou d'élève.
 */

export type LessonLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export const lessonLevels: { id: LessonLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type LessonSubject =
  | "francais"
  | "mathematiques"
  | "sciences"
  | "histoire-geographie"
  | "eps"
  | "arts"
  | "emc"
  | "anglais"
  | "autre";

export const lessonSubjects: { id: LessonSubject; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
  { id: "histoire-geographie", label: "Histoire-géographie" },
  { id: "eps", label: "EPS" },
  { id: "arts", label: "Arts" },
  { id: "emc", label: "EMC" },
  { id: "anglais", label: "Anglais" },
  { id: "autre", label: "Autre" },
];

export type LessonPeriod =
  | "periode-1"
  | "periode-2"
  | "periode-3"
  | "periode-4"
  | "periode-5";

export const lessonPeriods: { id: LessonPeriod; label: string }[] = [
  { id: "periode-1", label: "Période 1" },
  { id: "periode-2", label: "Période 2" },
  { id: "periode-3", label: "Période 3" },
  { id: "periode-4", label: "Période 4" },
  { id: "periode-5", label: "Période 5" },
];

export type LessonStatus = "a-preparer" | "prete" | "a-ajuster" | "faite";

export const lessonStatuses: { id: LessonStatus; label: string; symbol: string }[] = [
  { id: "a-preparer", label: "À préparer", symbol: "○" },
  { id: "prete", label: "Prête", symbol: "●" },
  { id: "a-ajuster", label: "À ajuster", symbol: "!" },
  { id: "faite", label: "Faite", symbol: "✓" },
];

export type LessonModality =
  | "collectif"
  | "groupes"
  | "binomes"
  | "individuel"
  | "autonomie";

export const lessonModalities: { id: LessonModality; label: string }[] = [
  { id: "collectif", label: "Collectif" },
  { id: "groupes", label: "Groupes" },
  { id: "binomes", label: "Binômes" },
  { id: "individuel", label: "Individuel" },
  { id: "autonomie", label: "Autonomie" },
];

export interface LessonStep {
  id: string;
  durationLabel: string;
  instruction: string;
  modality: LessonModality;
  teacherRole: string;
  studentActivity: string;
  material: string;
  vigilance: string;
}

export interface LessonDifferentiation {
  reinforcedGuidance: string;
  standardPath: string;
  autonomyExtension: string;
}

export interface LessonEvaluation {
  successCriteria: string;
  expectedErrors: string;
  observation: string;
  followUp: string;
}

export interface LessonMaterialItem {
  id: string;
  label: string;
  checked: boolean;
  link: string;
}

export interface LessonWrapUp {
  writtenTrace: string;
  homework: string;
  feedbackAfter: string;
  actualDuration: string;
  adjustments: string;
}

export interface TeacherLesson {
  id: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;

  title: string;
  level: LessonLevel;
  subject: LessonSubject;
  domain: string;
  competency: string;
  objective: string;
  period: LessonPeriod | "";
  duration: string;
  status: LessonStatus;

  context: string;
  startingQuestion: string;
  initialInstruction: string;
  expectedOutput: string;

  steps: LessonStep[];

  differentiation: LessonDifferentiation;
  evaluation: LessonEvaluation;
  materials: LessonMaterialItem[];
  wrapUp: LessonWrapUp;
}

export function createLessonId(): string {
  return `seance-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createStepId(): string {
  return `etape-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createMaterialId(): string {
  return `materiel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createEmptyStep(instruction = ""): LessonStep {
  return {
    id: createStepId(),
    durationLabel: "",
    instruction,
    modality: "collectif",
    teacherRole: "",
    studentActivity: "",
    material: "",
    vigilance: "",
  };
}

export function createEmptyMaterialItem(label = ""): LessonMaterialItem {
  return {
    id: createMaterialId(),
    label,
    checked: false,
    link: "",
  };
}

export type LessonTemplateId =
  | "decouverte"
  | "entrainement"
  | "revision"
  | "evaluation"
  | "projet"
  | "libre";

export const lessonTemplates: { id: LessonTemplateId; label: string; description: string }[] = [
  { id: "decouverte", label: "Découverte", description: "Mise en situation, recherche, mise en commun, institutionnalisation." },
  { id: "entrainement", label: "Entraînement", description: "Rappel, exercices guidés puis en autonomie, correction collective." },
  { id: "revision", label: "Révision", description: "Réactivation des essentiels, jeu ou défi, bilan rapide." },
  { id: "evaluation", label: "Évaluation", description: "Consignes, travail individuel, relecture / vérification." },
  { id: "projet", label: "Projet", description: "Lancement, travail par étapes, régulation, restitution." },
  { id: "libre", label: "Séance libre", description: "Aucune étape pré-remplie, structure entièrement libre." },
];

const TEMPLATE_STEPS: Record<LessonTemplateId, string[]> = {
  decouverte: [
    "Mise en situation / déclencheur",
    "Recherche en autonomie ou en groupes",
    "Mise en commun et confrontation des procédures",
    "Institutionnalisation et trace écrite",
  ],
  entrainement: [
    "Rappel rapide de la notion",
    "Exercices guidés",
    "Exercices en autonomie",
    "Correction collective",
  ],
  revision: [
    "Rappel des essentiels",
    "Activité de réactivation",
    "Jeu ou défi de révision",
    "Bilan rapide",
  ],
  evaluation: [
    "Consignes et lecture de l'énoncé",
    "Travail individuel en autonomie",
    "Relecture et vérification",
  ],
  projet: [
    "Lancement du projet",
    "Travail par étapes",
    "Régulation intermédiaire",
    "Valorisation et restitution",
  ],
  libre: [],
};

function createEmptyDifferentiation(): LessonDifferentiation {
  return { reinforcedGuidance: "", standardPath: "", autonomyExtension: "" };
}

function createEmptyEvaluation(): LessonEvaluation {
  return { successCriteria: "", expectedErrors: "", observation: "", followUp: "" };
}

function createEmptyWrapUp(): LessonWrapUp {
  return {
    writtenTrace: "",
    homework: "",
    feedbackAfter: "",
    actualDuration: "",
    adjustments: "",
  };
}

export function createLessonFromTemplate(templateId: LessonTemplateId): TeacherLesson {
  const now = new Date().toISOString();
  return {
    id: createLessonId(),
    createdAt: now,
    updatedAt: now,
    archived: false,

    title: "",
    level: lessonLevels[0].id,
    subject: lessonSubjects[0].id,
    domain: "",
    competency: "",
    objective: "",
    period: "",
    duration: "",
    status: "a-preparer",

    context: "",
    startingQuestion: "",
    initialInstruction: "",
    expectedOutput: "",

    steps: TEMPLATE_STEPS[templateId].map((instruction) => createEmptyStep(instruction)),

    differentiation: createEmptyDifferentiation(),
    evaluation: createEmptyEvaluation(),
    materials: [],
    wrapUp: createEmptyWrapUp(),
  };
}

export function duplicateLesson(lesson: TeacherLesson): TeacherLesson {
  const now = new Date().toISOString();
  return {
    ...lesson,
    id: createLessonId(),
    title: lesson.title ? `${lesson.title} (copie)` : "",
    createdAt: now,
    updatedAt: now,
    archived: false,
    status: "a-preparer",
    steps: lesson.steps.map((step) => ({ ...step, id: createStepId() })),
    materials: lesson.materials.map((item) => ({ ...item, id: createMaterialId() })),
    differentiation: { ...lesson.differentiation },
    evaluation: { ...lesson.evaluation },
    wrapUp: { ...lesson.wrapUp },
  };
}

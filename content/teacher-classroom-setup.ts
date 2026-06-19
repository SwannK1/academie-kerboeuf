export type TeacherClassroomSetupSectionId =
  | "plans-espaces"
  | "etiquettes-reperes"
  | "affichages"
  | "verifications";

export type TeacherClassroomSetupSection = {
  id: TeacherClassroomSetupSectionId;
  title: string;
  items: string[];
};

export const teacherClassroomSetupSections: TeacherClassroomSetupSection[] = [
  {
    id: "plans-espaces",
    title: "Plans et espaces",
    items: [
      "Plan de classe provisoire",
      "Coin regroupement",
      "Bibliothèque",
      "Matériel collectif",
      "Espace de correction",
      "Affichage",
      "Rangements",
    ],
  },
  {
    id: "etiquettes-reperes",
    title: "Étiquettes et repères",
    items: [
      "Étiquettes élèves",
      "Porte-manteaux",
      "Cahiers",
      "Casiers",
      "Boîtes ou pochettes",
      "Responsabilités",
    ],
  },
  {
    id: "affichages",
    title: "Affichages",
    items: [
      "Emploi du temps",
      "Règles de vie",
      "Calendrier",
      "Responsabilités",
      "Repères pédagogiques",
      "Affichages spécifiques au niveau",
    ],
  },
  {
    id: "verifications",
    title: "Vérifications",
    items: [
      "Mobilier",
      "Matériel numérique",
      "Sécurité",
      "Clés ou badges",
      "Matériel EPS",
      "Fournitures de secours",
    ],
  },
];

export const TEACHER_CLASSROOM_SETUP_STORAGE_KEY =
  "academie-kerboeuf-installation-classe-v1";

export type TeacherClassroomSetupTask = {
  id: string;
  label: string;
  done: boolean;
  custom: boolean;
};

export type TeacherClassroomSetupState = Partial<
  Record<TeacherClassroomSetupSectionId, TeacherClassroomSetupTask[]>
>;

function buildTaskId(sectionId: TeacherClassroomSetupSectionId, index: number): string {
  return `${sectionId}__default-${index}`;
}

export function getDefaultTeacherClassroomSetupState(): TeacherClassroomSetupState {
  const state: TeacherClassroomSetupState = {};
  for (const section of teacherClassroomSetupSections) {
    state[section.id] = section.items.map((label, index) => ({
      id: buildTaskId(section.id, index),
      label,
      done: false,
      custom: false,
    }));
  }
  return state;
}

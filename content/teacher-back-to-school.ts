export type BackToSchoolCategory =
  | "commandes"
  | "installation"
  | "documents"
  | "premieres-semaines"
  | "reunion-parents";

export type BackToSchoolTask = {
  id: string;
  category: BackToSchoolCategory;
  label: string;
  isDone: boolean;
  createdAt: string;
};

export type ParentMeetingInfo = {
  date: string;
  agenda: string;
  documents: string;
  questions: string;
};

export type BackToSchoolState = {
  tasks: BackToSchoolTask[];
  parentMeeting: ParentMeetingInfo;
};

export const BACK_TO_SCHOOL_STORAGE_KEY = "academie-kerboeuf-rentree-v1";

export const backToSchoolCategories: {
  id: BackToSchoolCategory;
  label: string;
  href: string;
}[] = [
  { id: "commandes", label: "Commander et inventorier", href: "/enseignants/rentree/commandes" },
  { id: "installation", label: "Installer ma classe", href: "/enseignants/rentree/installation" },
  {
    id: "premieres-semaines",
    label: "Préparer les premières semaines",
    href: "/enseignants/rentree/premieres-semaines",
  },
  {
    id: "reunion-parents",
    label: "Préparer la réunion parents",
    href: "/enseignants/rentree/reunion-parents",
  },
];

export function getDefaultParentMeetingInfo(): ParentMeetingInfo {
  return {
    date: "",
    agenda: "",
    documents: "",
    questions: "",
  };
}

function createTask(
  category: BackToSchoolCategory,
  label: string,
): BackToSchoolTask {
  return {
    id: `${category}-${label}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    category,
    label,
    isDone: false,
    createdAt: new Date().toISOString(),
  };
}

export function getDefaultBackToSchoolTasks(): BackToSchoolTask[] {
  return [
    createTask("commandes", "Fournitures de classe"),
    createTask("commandes", "Matériel pédagogique"),
    createTask("commandes", "Inventaire du matériel existant"),
    createTask("installation", "Plan de classe provisoire"),
    createTask("installation", "Étiquettes"),
    createTask("installation", "Porte-manteaux"),
    createTask("installation", "Cahiers, casiers et rangements"),
    createTask("installation", "Affichages à préparer"),
    createTask("premieres-semaines", "Rituels"),
    createTask("premieres-semaines", "Règles de classe"),
    createTask("premieres-semaines", "Évaluations diagnostiques"),
    createTask("premieres-semaines", "Premières séquences"),
    createTask("premieres-semaines", "Premières séances"),
    createTask("reunion-parents", "Date arrêtée"),
    createTask("reunion-parents", "Ordre du jour rédigé"),
    createTask("reunion-parents", "Documents préparés"),
    createTask("reunion-parents", "Questions anticipées"),
  ];
}

export function getDefaultBackToSchoolState(): BackToSchoolState {
  return {
    tasks: getDefaultBackToSchoolTasks(),
    parentMeeting: getDefaultParentMeetingInfo(),
  };
}

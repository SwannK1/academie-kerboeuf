export const TEACHER_PROJECTS_AND_TRIPS_STORAGE_KEY =
  "academie-kerboeuf-projets-sorties-v1";

export type TeacherProjectType =
  | "sortie"
  | "intervenant"
  | "projet-de-classe"
  | "partenariat"
  | "spectacle";

export type TeacherProjectState =
  | "a-preparer"
  | "en-cours"
  | "pret"
  | "realise";

export type TeacherProject = {
  id: string;
  title: string;
  type: TeacherProjectType;
  date: string;
  location: string;
  pedagogicalGoal: string;
  materials: string;
  estimatedBudget: string;
  permissionsToPrepare: string;
  chaperoneCount: number;
  preparationTasks: string[];
  state: TeacherProjectState;
};

export const teacherProjectTypes: { id: TeacherProjectType; label: string }[] = [
  { id: "sortie", label: "Sortie" },
  { id: "intervenant", label: "Intervenant" },
  { id: "projet-de-classe", label: "Projet de classe" },
  { id: "partenariat", label: "Partenariat" },
  { id: "spectacle", label: "Spectacle" },
];

export const teacherProjectStates: { id: TeacherProjectState; label: string }[] = [
  { id: "a-preparer", label: "À préparer" },
  { id: "en-cours", label: "En cours" },
  { id: "pret", label: "Prêt" },
  { id: "realise", label: "Réalisé" },
];

export function createEmptyTeacherProject(): TeacherProject {
  return {
    id: `projet-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: "",
    type: "sortie",
    date: "",
    location: "",
    pedagogicalGoal: "",
    materials: "",
    estimatedBudget: "",
    permissionsToPrepare: "",
    chaperoneCount: 0,
    preparationTasks: [],
    state: "a-preparer",
  };
}

export type ProfessionalDevelopmentTypeId =
  | "formation"
  | "lecture"
  | "webinaire"
  | "conference"
  | "observation"
  | "projet-personnel";

export type ProfessionalDevelopmentType = {
  id: ProfessionalDevelopmentTypeId;
  label: string;
};

export const professionalDevelopmentTypes: ProfessionalDevelopmentType[] = [
  { id: "formation", label: "Formation" },
  { id: "lecture", label: "Lecture professionnelle" },
  { id: "webinaire", label: "Webinaire" },
  { id: "conference", label: "Conférence" },
  { id: "observation", label: "Observation de pratique" },
  { id: "projet-personnel", label: "Projet personnel" },
];

export type ProfessionalDevelopmentStatusId =
  | "a-explorer"
  | "inscrit"
  | "en-cours"
  | "termine"
  | "a-approfondir";

export type ProfessionalDevelopmentStatus = {
  id: ProfessionalDevelopmentStatusId;
  label: string;
};

export const professionalDevelopmentStatuses: ProfessionalDevelopmentStatus[] =
  [
    { id: "a-explorer", label: "À explorer" },
    { id: "inscrit", label: "Inscrit" },
    { id: "en-cours", label: "En cours" },
    { id: "termine", label: "Terminé" },
    { id: "a-approfondir", label: "À approfondir" },
  ];

export type ProfessionalDevelopmentEntry = {
  id: string;
  title: string;
  typeId: ProfessionalDevelopmentTypeId;
  statusId: ProfessionalDevelopmentStatusId;
  organizationOrAuthor: string;
  date: string;
  duration: string;
  goal: string;
  notes: string;
  link: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export const TEACHER_PROFESSIONAL_DEVELOPMENT_STORAGE_KEY =
  "academie-kerboeuf-formations-v1";

export function createEmptyProfessionalDevelopmentEntry(
  id: string,
): ProfessionalDevelopmentEntry {
  const now = new Date().toISOString();
  return {
    id,
    title: "",
    typeId: "formation",
    statusId: "a-explorer",
    organizationOrAuthor: "",
    date: "",
    duration: "",
    goal: "",
    notes: "",
    link: "",
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function getProfessionalDevelopmentTypeLabel(
  typeId: ProfessionalDevelopmentTypeId,
): string {
  return (
    professionalDevelopmentTypes.find((type) => type.id === typeId)?.label ??
    typeId
  );
}

export function getProfessionalDevelopmentStatusLabel(
  statusId: ProfessionalDevelopmentStatusId,
): string {
  return (
    professionalDevelopmentStatuses.find((status) => status.id === statusId)
      ?.label ?? statusId
  );
}

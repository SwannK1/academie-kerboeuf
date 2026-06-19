export const TEACHER_BACK_TO_SCHOOL_LABELS_STORAGE_KEY =
  "academie-kerboeuf-etiquettes-rentree-v1";

export type StudentLabelFormatId =
  | "cahier"
  | "porte-manteau"
  | "casier"
  | "boite";

export type StudentLabelFormat = {
  id: StudentLabelFormatId;
  label: string;
  description: string;
};

export const studentLabelFormats: StudentLabelFormat[] = [
  {
    id: "cahier",
    label: "Petite étiquette cahier",
    description: "Format compact à coller sur la couverture d'un cahier.",
  },
  {
    id: "porte-manteau",
    label: "Grande étiquette porte-manteau",
    description: "Format large et lisible de loin, pour le porte-manteau.",
  },
  {
    id: "casier",
    label: "Étiquette casier",
    description: "Format moyen à glisser ou coller sur un casier.",
  },
  {
    id: "boite",
    label: "Étiquette boîte ou pochette",
    description: "Format moyen pour une boîte de rangement ou une pochette.",
  },
] as const;

export type StudentNameMode = "prenom" | "initiales";

export type ClassMarker = {
  id: string;
  label: string;
  isCustom: boolean;
};

export const defaultClassMarkers: ClassMarker[] = [
  { id: "bibliotheque", label: "Bibliothèque", isCustom: false },
  { id: "materiel-collectif", label: "Matériel collectif", isCustom: false },
  { id: "rangement", label: "Rangement", isCustom: false },
  { id: "cahiers", label: "Cahiers", isCustom: false },
  { id: "boites", label: "Boîtes", isCustom: false },
  { id: "casiers", label: "Casiers", isCustom: false },
  { id: "responsabilites", label: "Responsabilités", isCustom: false },
];

export type DocumentStatus = "a-faire" | "pret";

export type ChecklistDocument = {
  id: string;
  label: string;
  isCustom: boolean;
  status: DocumentStatus;
};

export const defaultChecklistDocuments: Omit<
  ChecklistDocument,
  "status"
>[] = [
  { id: "liste-materiel", label: "Liste de matériel", isCustom: false },
  {
    id: "fiche-renseignements",
    label: "Fiche de renseignements",
    isCustom: false,
  },
  { id: "autorisations", label: "Autorisations", isCustom: false },
  { id: "calendrier", label: "Calendrier", isCustom: false },
  {
    id: "presentation-classe",
    label: "Présentation de la classe",
    isCustom: false,
  },
  {
    id: "reglement",
    label: "Règlement ou règles de vie",
    isCustom: false,
  },
];

export type TeacherBackToSchoolLabelsState = {
  studentNamesText: string;
  studentNameMode: StudentNameMode;
  labelFormat: StudentLabelFormatId;
  classMarkers: ClassMarker[];
  documents: ChecklistDocument[];
};

export function getDefaultTeacherBackToSchoolLabelsState(): TeacherBackToSchoolLabelsState {
  return {
    studentNamesText: "",
    studentNameMode: "prenom",
    labelFormat: "cahier",
    classMarkers: defaultClassMarkers.map((marker) => ({ ...marker })),
    documents: defaultChecklistDocuments.map((document) => ({
      ...document,
      status: "a-faire",
    })),
  };
}

export function parseStudentNames(
  studentNamesText: string,
  mode: StudentNameMode,
): string[] {
  const names = studentNamesText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (mode === "prenom") {
    return names;
  }

  return names.map((name) =>
    name
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase())
      .join(""),
  );
}

export function buildCustomEntryId(prefix: string, label: string): string {
  const slug = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${prefix}-${slug || "personnalise"}-${Date.now()}`;
}

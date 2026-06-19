export const FIRST_WEEKS_STORAGE_KEY = "academie-kerboeuf-premieres-semaines-v1";

export type FirstWeeksWeek = 1 | 2 | 3 | 4;

export type FirstWeeksCategory =
  | "organisation"
  | "rituels"
  | "diagnostic"
  | "pedagogie"
  | "familles";

export type FirstWeeksPriority = "importante" | "normale" | "secondaire";

export type FirstWeeksTask = {
  id: string;
  week: FirstWeeksWeek;
  category: FirstWeeksCategory;
  label: string;
  priority: FirstWeeksPriority;
  isDone: boolean;
};

export type FirstWeeksState = {
  tasks: FirstWeeksTask[];
};

export const firstWeeksWeeks: { id: FirstWeeksWeek; label: string }[] = [
  { id: 1, label: "Premier jour" },
  { id: 2, label: "Première semaine" },
  { id: 3, label: "Période 1 (suite)" },
  { id: 4, label: "Période 1 (suite)" },
];

export const firstWeeksCategoryLabels: Record<FirstWeeksCategory, string> = {
  organisation: "Organisation",
  rituels: "Rituels",
  diagnostic: "Diagnostic",
  pedagogie: "Pédagogie",
  familles: "Familles",
};

export const firstWeeksPriorityLabels: Record<FirstWeeksPriority, string> = {
  importante: "Importante",
  normale: "Normale",
  secondaire: "Secondaire",
};

export const firstWeeksPriorityOrder: FirstWeeksPriority[] = [
  "importante",
  "normale",
  "secondaire",
];

function buildDefaultTask(
  week: FirstWeeksWeek,
  category: FirstWeeksCategory,
  label: string,
  priority: FirstWeeksPriority,
): FirstWeeksTask {
  return {
    id: `${week}-${category}-${label}`,
    week,
    category,
    label,
    priority,
    isDone: false,
  };
}

export function getDefaultFirstWeeksTasks(): FirstWeeksTask[] {
  return [
    // Premier jour
    buildDefaultTask(1, "organisation", "Accueil des élèves", "importante"),
    buildDefaultTask(1, "organisation", "Installation dans la classe", "importante"),
    buildDefaultTask(1, "pedagogie", "Présentation de l'enseignant et des élèves", "importante"),
    buildDefaultTask(1, "rituels", "Règles de vie de la classe", "importante"),
    buildDefaultTask(1, "rituels", "Mise en place des rituels", "normale"),
    buildDefaultTask(1, "organisation", "Premiers repères dans l'école", "normale"),

    // Première semaine
    buildDefaultTask(2, "pedagogie", "Activités de connaissance mutuelle", "normale"),
    buildDefaultTask(2, "diagnostic", "Évaluations diagnostiques", "importante"),
    buildDefaultTask(2, "organisation", "Organisation des cahiers et du matériel", "importante"),
    buildDefaultTask(2, "organisation", "Mise en place des responsabilités", "normale"),
    buildDefaultTask(2, "pedagogie", "Premiers apprentissages", "importante"),
    buildDefaultTask(2, "familles", "Liaison avec les familles", "normale"),

    // Période 1
    buildDefaultTask(3, "pedagogie", "Progression à vérifier", "importante"),
    buildDefaultTask(3, "pedagogie", "Premières séquences à préparer", "importante"),
    buildDefaultTask(3, "diagnostic", "Premières évaluations diagnostiques", "normale"),
    buildDefaultTask(4, "organisation", "Matériel nécessaire pour la période", "normale"),
    buildDefaultTask(4, "pedagogie", "Séances à préparer", "importante"),
  ];
}

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
  createdAt: string;
};

export const FIRST_WEEKS_STORAGE_KEY = "academie-kerboeuf-premieres-semaines-v1";

export const firstWeeksWeeks: { id: FirstWeeksWeek; label: string }[] = [
  { id: 1, label: "Semaine 1" },
  { id: 2, label: "Semaine 2" },
  { id: 3, label: "Semaine 3" },
  { id: 4, label: "Semaine 4" },
];

export const firstWeeksCategories: {
  id: FirstWeeksCategory;
  label: string;
}[] = [
  { id: "organisation", label: "Organisation" },
  { id: "rituels", label: "Rituels" },
  { id: "diagnostic", label: "Diagnostic" },
  { id: "pedagogie", label: "Pédagogie" },
  { id: "familles", label: "Familles" },
];

export const firstWeeksPriorities: {
  id: FirstWeeksPriority;
  label: string;
}[] = [
  { id: "importante", label: "Importante" },
  { id: "normale", label: "Normale" },
  { id: "secondaire", label: "Secondaire" },
];

type FirstWeeksSeed = {
  week: FirstWeeksWeek;
  category: FirstWeeksCategory;
  label: string;
  priority: FirstWeeksPriority;
};

const FIRST_DAY_SEED: Omit<FirstWeeksSeed, "week">[] = [
  { category: "organisation", label: "Accueil des élèves", priority: "importante" },
  { category: "organisation", label: "Installation", priority: "importante" },
  { category: "organisation", label: "Présentation", priority: "normale" },
  { category: "rituels", label: "Règles de vie", priority: "importante" },
  { category: "rituels", label: "Premiers rituels", priority: "normale" },
  { category: "organisation", label: "Repères dans la classe", priority: "normale" },
];

const WEEK_1_SEED: Omit<FirstWeeksSeed, "week">[] = [
  { category: "rituels", label: "Activités de connaissance", priority: "normale" },
  { category: "organisation", label: "Organisation des cahiers", priority: "importante" },
  { category: "organisation", label: "Mise en place des responsabilités", priority: "normale" },
  { category: "diagnostic", label: "Premières évaluations diagnostiques", priority: "importante" },
  { category: "pedagogie", label: "Premiers apprentissages", priority: "importante" },
  { category: "familles", label: "Informations familles", priority: "normale" },
];

const WEEKS_2_TO_4_SEED: Omit<FirstWeeksSeed, "week">[] = [
  { category: "rituels", label: "Poursuivre les rituels", priority: "normale" },
  { category: "pedagogie", label: "Premières séquences", priority: "importante" },
  { category: "organisation", label: "Ajuster le plan de classe", priority: "normale" },
  { category: "diagnostic", label: "Préparer les premières évaluations", priority: "importante" },
  { category: "familles", label: "Réunions et projets", priority: "secondaire" },
  { category: "organisation", label: "Suivi des tâches importantes", priority: "secondaire" },
];

function buildSeedTasks(
  week: FirstWeeksWeek,
  seeds: Omit<FirstWeeksSeed, "week">[],
): Omit<FirstWeeksTask, "id" | "createdAt" | "isDone">[] {
  return seeds.map((seed) => ({ ...seed, week }));
}

export const firstWeeksSuggestedTasks: Omit<
  FirstWeeksTask,
  "id" | "createdAt" | "isDone"
>[] = [
  ...buildSeedTasks(1, FIRST_DAY_SEED),
  ...buildSeedTasks(1, WEEK_1_SEED),
  ...buildSeedTasks(2, WEEKS_2_TO_4_SEED),
  ...buildSeedTasks(3, WEEKS_2_TO_4_SEED),
  ...buildSeedTasks(4, WEEKS_2_TO_4_SEED),
];

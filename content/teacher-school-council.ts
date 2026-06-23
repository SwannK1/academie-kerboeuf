/**
 * Données de base de l'outil "Préparer un conseil d'école".
 *
 * Outil 100% local (localStorage) : aucun nom d'élève, aucune donnée
 * familiale, pas de compte, pas de Supabase, pas de partage, pas de PDF.
 */

export type CouncilPointCategory =
  | "vie-ecole"
  | "securite"
  | "projets"
  | "budget"
  | "locaux"
  | "restauration"
  | "periscolaire"
  | "autre";

export type ActionStatus = "a-faire" | "en-cours" | "termine";

export type ActionPriority = "importante" | "normale" | "secondaire";

export const councilPointCategories: { id: CouncilPointCategory; label: string }[] = [
  { id: "vie-ecole", label: "Vie de l'école" },
  { id: "securite", label: "Sécurité" },
  { id: "projets", label: "Projets" },
  { id: "budget", label: "Budget" },
  { id: "locaux", label: "Locaux" },
  { id: "restauration", label: "Restauration" },
  { id: "periscolaire", label: "Périscolaire" },
  { id: "autre", label: "Autre" },
];

export const actionStatuses: { id: ActionStatus; label: string }[] = [
  { id: "a-faire", label: "À faire" },
  { id: "en-cours", label: "En cours" },
  { id: "termine", label: "Terminé" },
];

export const actionPriorities: { id: ActionPriority; label: string }[] = [
  { id: "importante", label: "Importante" },
  { id: "normale", label: "Normale" },
  { id: "secondaire", label: "Secondaire" },
];

export type CouncilPoint = {
  id: string;
  category: CouncilPointCategory;
  title: string;
  details: string;
};

export type CouncilAction = {
  id: string;
  label: string;
  status: ActionStatus;
  priority: ActionPriority;
};

export type SchoolCouncil = {
  id: string;
  date: string;
  agenda: string;
  points: CouncilPoint[];
  decisions: string;
  questions: string;
  notes: string;
  actions: CouncilAction[];
  createdAt: string;
};

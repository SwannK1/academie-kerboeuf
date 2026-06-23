export const SUBSTITUTE_FOLDER_STORAGE_KEY =
  "academie-kerboeuf-dossier-remplacant-v1";

export type SubstituteFolderTaskStatus = "a-faire" | "termine";

export type SubstituteFolderTask = {
  id: string;
  label: string;
  status: SubstituteFolderTaskStatus;
};

export type SubstituteFolderSectionId =
  | "horaires-recreations"
  | "materiel-lieux"
  | "rituels-classe"
  | "deroule-journee"
  | "consignes-collectives"
  | "contacts-institutionnels";

export type SubstituteFolderSection = {
  id: SubstituteFolderSectionId;
  title: string;
  description: string;
  defaultTasks: string[];
};

export const substituteFolderSections: readonly SubstituteFolderSection[] = [
  {
    id: "horaires-recreations",
    title: "Horaires et récréations",
    description: "Les repères horaires de la journée de classe.",
    defaultTasks: [
      "Heure d'arrivée et modalités d'accueil du matin",
      "Horaires des récréations",
      "Heure de sortie et modalités",
    ],
  },
  {
    id: "materiel-lieux",
    title: "Matériel et lieux utiles",
    description: "Ce qui doit être accessible et son emplacement.",
    defaultTasks: [
      "Emplacement du matériel collectif",
      "Emplacement des manuels et fichiers",
      "Lieux utiles (sanitaires, salle des maîtres, infirmerie)",
    ],
  },
  {
    id: "rituels-classe",
    title: "Rituels de classe",
    description: "Les habitudes de classe à reproduire dès le premier jour.",
    defaultTasks: [
      "Rituel d'accueil et de mise au travail",
      "Rituel de fin de journée",
      "Rituels spécifiques (date, météo, responsabilités)",
    ],
  },
  {
    id: "deroule-journee",
    title: "Déroulé de la journée",
    description: "L'organisation générale des temps de classe.",
    defaultTasks: [
      "Déroulé des matières par demi-journée",
      "Créneaux spécifiques (sport, langue, décloisonnement)",
      "Temps de pause et de transition",
    ],
  },
  {
    id: "consignes-collectives",
    title: "Consignes collectives",
    description: "Le cadre partagé avec la classe au quotidien.",
    defaultTasks: [
      "Règles de vie affichées en classe",
      "Déplacements autorisés et consignes de sécurité",
      "Gestion collective des comportements",
    ],
  },
  {
    id: "contacts-institutionnels",
    title: "Contacts institutionnels génériques",
    description: "Les points à confirmer auprès de la direction de l'école.",
    defaultTasks: [
      "Procédure en cas d'incident",
      "Procédure en cas d'exercice de sécurité",
      "Personnes à contacter à la direction",
    ],
  },
] as const;

export type SubstituteFolderState = {
  tasksBySection: Record<SubstituteFolderSectionId, SubstituteFolderTask[]>;
};

function buildSectionTasks(
  section: SubstituteFolderSection,
): SubstituteFolderTask[] {
  return section.defaultTasks.map((label, index) => ({
    id: `${section.id}-default-${index}`,
    label,
    status: "a-faire",
  }));
}

export function getDefaultSubstituteFolderState(): SubstituteFolderState {
  const tasksBySection = {} as Record<
    SubstituteFolderSectionId,
    SubstituteFolderTask[]
  >;

  for (const section of substituteFolderSections) {
    tasksBySection[section.id] = buildSectionTasks(section);
  }

  return { tasksBySection };
}

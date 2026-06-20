export const SUBSTITUTE_FOLDER_STORAGE_KEY =
  "academie-kerboeuf-dossier-remplacant-v1";

export type SubstituteFolderTaskStatus = "a-faire" | "termine";

export type SubstituteFolderTask = {
  id: string;
  label: string;
  status: SubstituteFolderTaskStatus;
  custom?: boolean;
};

export type SubstituteFolderSectionId =
  | "fonctionnement"
  | "emploi-du-temps"
  | "rituels"
  | "materiel"
  | "regles-de-vie"
  | "eleves-a-accompagner"
  | "documents"
  | "urgences";

export type SubstituteFolderSection = {
  id: SubstituteFolderSectionId;
  title: string;
  description: string;
  defaultTasks: string[];
};

export const substituteFolderSections: readonly SubstituteFolderSection[] = [
  {
    id: "fonctionnement",
    title: "Fonctionnement général de la classe",
    description:
      "Les repères pour que la journée se déroule sans surprise pour le remplaçant.",
    defaultTasks: [
      "Indiquer les horaires d'arrivée, de récréation et de sortie",
      "Préciser le mode d'accueil du matin",
      "Lister les adultes intervenant dans la classe (RASED, ATSEM, etc.)",
    ],
  },
  {
    id: "emploi-du-temps",
    title: "Emploi du temps",
    description: "Le déroulé de la semaine et des séances en cours.",
    defaultTasks: [
      "Laisser l'emploi du temps de la semaine à jour",
      "Indiquer où en sont les séquences en cours par matière",
      "Préciser les créneaux spécifiques (sport, langue, décloisonnement)",
    ],
  },
  {
    id: "rituels",
    title: "Rituels",
    description: "Les habitudes de classe à reproduire dès le premier jour.",
    defaultTasks: [
      "Décrire le rituel d'accueil et de mise au travail",
      "Décrire le rituel de fin de journée",
      "Indiquer les rituels spécifiques (date, météo, responsabilités)",
    ],
  },
  {
    id: "materiel",
    title: "Matériel",
    description: "Ce qui doit être accessible et son emplacement.",
    defaultTasks: [
      "Indiquer l'emplacement du matériel collectif",
      "Indiquer l'emplacement des manuels et fichiers",
      "Préciser le matériel numérique disponible et son usage",
    ],
  },
  {
    id: "regles-de-vie",
    title: "Règles de vie",
    description: "Le cadre partagé avec les élèves au quotidien.",
    defaultTasks: [
      "Rappeler les règles de vie affichées en classe",
      "Préciser le système de gestion des comportements en place",
      "Indiquer les déplacements autorisés et les consignes de sécurité",
    ],
  },
  {
    id: "eleves-a-accompagner",
    title: "Élèves à accompagner",
    description:
      "Repères collectifs uniquement : aucun nom, aucune donnée médicale, familiale ou disciplinaire individuelle ne doit être saisi ici, y compris dans les tâches personnalisées.",
    defaultTasks: [
      "Préciser le fonctionnement des groupes de besoin (sans nom d'élève)",
      "Indiquer les adaptations collectives mises en place dans la classe",
      "Rappeler les personnes ressources à contacter en cas de besoin (RASED, direction, etc.)",
    ],
  },
  {
    id: "documents",
    title: "Documents à laisser",
    description: "Les supports à disposition du remplaçant.",
    defaultTasks: [
      "Laisser le cahier journal ou la programmation en cours",
      "Laisser la liste des élèves de la classe",
      "Laisser les codes ou identifiants nécessaires aux outils numériques",
    ],
  },
  {
    id: "urgences",
    title: "Urgences à vérifier avec la direction",
    description: "Les points à confirmer auprès de la direction de l'école.",
    defaultTasks: [
      "Vérifier la procédure en cas d'incident avec un élève",
      "Vérifier la procédure en cas d'exercice de sécurité",
      "Vérifier les personnes à contacter en cas d'urgence",
    ],
  },
] as const;

export type SubstituteFolderState = {
  tasksBySection: Record<SubstituteFolderSectionId, SubstituteFolderTask[]>;
  notes: string;
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

  return { tasksBySection, notes: "" };
}

export type TeacherBackupToolId =
  | "programmation-annuelle"
  | "progression-periode"
  | "emploi-du-temps"
  | "cahier-journal";

export type TeacherBackupToolDefinition = {
  id: TeacherBackupToolId;
  label: string;
  description: string;
  /**
   * Clé localStorage actuelle. Les clés historiques restent gérées par
   * chaque outil pour ses propres migrations ; la sauvegarde ne lit/écrit
   * que la clé courante pour éviter de dupliquer cette logique.
   */
  storageKey: string;
};

export const TEACHER_BACKUP_FORMAT_VERSION = 1;

export const teacherBackupTools: TeacherBackupToolDefinition[] = [
  {
    id: "programmation-annuelle",
    label: "Programmation annuelle",
    description: "Répartition des compétences sur les périodes de l'année.",
    storageKey: "academie-kerboeuf-curriculum-planning-v1",
  },
  {
    id: "progression-periode",
    label: "Progression de période",
    description: "Suivi Kanban des séquences d'une période.",
    storageKey: "progression-periode-kanban-v3",
  },
  {
    id: "emploi-du-temps",
    label: "Emploi du temps",
    description: "Semaine type et répartition des heures.",
    storageKey: "academie-kerboeuf-emploi-du-temps-v2",
  },
  {
    id: "cahier-journal",
    label: "Cahier journal",
    description: "Cartes de séances de la semaine.",
    storageKey: "academie-kerboeuf-cahier-journal-v1",
  },
];

export function getTeacherBackupTool(
  id: TeacherBackupToolId,
): TeacherBackupToolDefinition | undefined {
  return teacherBackupTools.find((tool) => tool.id === id);
}

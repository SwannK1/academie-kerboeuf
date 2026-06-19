/**
 * Stratégie de migration des outils enseignants existants (localStorage) vers le compte.
 *
 * localStorage actuel
 *   → import manuel optionnel (l'enseignant déclenche l'import depuis /espace)
 *   → sauvegarde sur compte (écriture dans Supabase, scoping par teacherId)
 *   → conservation de la version locale comme secours temporaire
 *
 * Chaque outil ci-dessous garde sa clé localStorage actuelle inchangée. Cette V1
 * ne migre aucune donnée automatiquement : elle expose seulement les clés et un
 * statut, pour qu'une future étape puisse construire l'import un outil à la fois.
 */

export type LocalToolKey =
  | "programmation"
  | "progression"
  | "emploi-du-temps"
  | "seances"
  | "rentree"
  | "commandes"
  | "reunion-parents";

export type LocalToolMigrationStatus = "not-started" | "available-for-import" | "migrated";

export const LOCAL_TOOL_MIGRATION_REGISTRY: Record<
  LocalToolKey,
  { label: string; status: LocalToolMigrationStatus }
> = {
  programmation: { label: "Programmation", status: "not-started" },
  progression: { label: "Progression", status: "not-started" },
  "emploi-du-temps": { label: "Emploi du temps", status: "not-started" },
  seances: { label: "Séances", status: "not-started" },
  rentree: { label: "Rentrée", status: "not-started" },
  commandes: { label: "Commandes", status: "not-started" },
  "reunion-parents": { label: "Réunion parents", status: "not-started" },
};

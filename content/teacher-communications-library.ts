/**
 * Modèle de données de la bibliothèque de communications enseignant.
 *
 * Cet outil ne stocke que des modèles de messages réutilisables : aucune
 * coordonnée familiale (nom de parent, adresse mail, numéro de téléphone)
 * n'est manipulée ici, et aucun envoi réel n'est effectué.
 */

export type CommunicationCategory =
  | "information-generale"
  | "sortie"
  | "materiel"
  | "reunion"
  | "rappel"
  | "projet"
  | "remerciement"
  | "autre";

export type CommunicationStatus = "brouillon" | "pret" | "transmis" | "archive";

export const communicationCategories: {
  id: CommunicationCategory;
  label: string;
}[] = [
  { id: "information-generale", label: "Information générale" },
  { id: "sortie", label: "Sortie" },
  { id: "materiel", label: "Matériel" },
  { id: "reunion", label: "Réunion" },
  { id: "rappel", label: "Rappel" },
  { id: "projet", label: "Projet" },
  { id: "remerciement", label: "Remerciement" },
  { id: "autre", label: "Autre" },
];

export const communicationStatuses: {
  id: CommunicationStatus;
  label: string;
}[] = [
  { id: "brouillon", label: "Brouillon" },
  { id: "pret", label: "Prêt" },
  { id: "transmis", label: "Transmis" },
  { id: "archive", label: "Archivé" },
];

export interface TeacherCommunication {
  id: string;
  title: string;
  category: CommunicationCategory;
  subject?: string;
  content: string;
  plannedDate?: string;
  status: CommunicationStatus;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getCommunicationCategoryLabel(
  category: CommunicationCategory,
): string {
  return (
    communicationCategories.find((entry) => entry.id === category)?.label ??
    category
  );
}

export function getCommunicationStatusLabel(
  status: CommunicationStatus,
): string {
  return (
    communicationStatuses.find((entry) => entry.id === status)?.label ??
    status
  );
}

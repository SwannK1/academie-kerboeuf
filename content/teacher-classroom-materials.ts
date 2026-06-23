export const CLASSROOM_MATERIALS_STORAGE_KEY =
  "academie-kerboeuf-materiel-classe-v1";

export const classroomMaterialCategories = [
  { id: "papeterie", label: "Papeterie" },
  { id: "arts-plastiques", label: "Arts plastiques" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
  { id: "eps", label: "EPS" },
  { id: "informatique", label: "Informatique" },
  { id: "rangement", label: "Rangement" },
  { id: "autre", label: "Autre" },
] as const;

export type ClassroomMaterialCategoryId =
  (typeof classroomMaterialCategories)[number]["id"];

export const classroomMaterialStatuses = [
  { id: "disponible", label: "Disponible" },
  { id: "a-verifier", label: "À vérifier" },
  { id: "a-commander", label: "À commander" },
  { id: "indisponible", label: "Indisponible" },
] as const;

export type ClassroomMaterialStatusId =
  (typeof classroomMaterialStatuses)[number]["id"];

export interface ClassroomMaterialItem {
  id: string;
  name: string;
  categoryId: ClassroomMaterialCategoryId;
  quantity: number;
  alertThreshold?: number;
  location?: string;
  note?: string;
  status: ClassroomMaterialStatusId;
}

export function createEmptyClassroomMaterialItem(): Omit<
  ClassroomMaterialItem,
  "id"
> {
  return {
    name: "",
    categoryId: "papeterie",
    quantity: 0,
    status: "disponible",
  };
}

export function getClassroomMaterialCategoryLabel(
  categoryId: ClassroomMaterialCategoryId,
): string {
  return (
    classroomMaterialCategories.find((category) => category.id === categoryId)
      ?.label ?? categoryId
  );
}

export function getClassroomMaterialStatusLabel(
  statusId: ClassroomMaterialStatusId,
): string {
  return (
    classroomMaterialStatuses.find((status) => status.id === statusId)
      ?.label ?? statusId
  );
}

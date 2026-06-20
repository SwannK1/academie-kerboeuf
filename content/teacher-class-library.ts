export type ClassLibraryCategoryId =
  | "album"
  | "roman"
  | "bd"
  | "poesie"
  | "documentaire"
  | "theatre"
  | "manuel"
  | "autre";

export type ClassLibraryCategory = {
  id: ClassLibraryCategoryId;
  label: string;
};

export const classLibraryCategories: ClassLibraryCategory[] = [
  { id: "album", label: "Album" },
  { id: "roman", label: "Roman" },
  { id: "bd", label: "BD" },
  { id: "poesie", label: "Poésie" },
  { id: "documentaire", label: "Documentaire" },
  { id: "theatre", label: "Théâtre" },
  { id: "manuel", label: "Manuel" },
  { id: "autre", label: "Autre" },
];

export type ClassLibraryLevelId =
  | "ps"
  | "ms"
  | "gs"
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2";

export type ClassLibraryLevel = {
  id: ClassLibraryLevelId;
  label: string;
};

export const classLibraryLevels: ClassLibraryLevel[] = [
  { id: "ps", label: "PS" },
  { id: "ms", label: "MS" },
  { id: "gs", label: "GS" },
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type ClassLibraryItem = {
  id: string;
  title: string;
  author?: string;
  categoryId: ClassLibraryCategoryId;
  levelId?: ClassLibraryLevelId;
  theme: string;
  copies: number;
  location?: string;
  note?: string;
  isFavorite: boolean;
  createdAt: string;
};

export type ClassLibraryState = {
  items: ClassLibraryItem[];
};

export const CLASS_LIBRARY_STORAGE_KEY =
  "academie-kerboeuf-bibliotheque-classe-v1";

export const emptyClassLibraryState: ClassLibraryState = {
  items: [],
};

export function getClassLibraryCategoryLabel(
  categoryId: ClassLibraryCategoryId,
): string {
  return (
    classLibraryCategories.find((category) => category.id === categoryId)
      ?.label ?? categoryId
  );
}

export function getClassLibraryLevelLabel(
  levelId: ClassLibraryLevelId | undefined,
): string | undefined {
  if (!levelId) {
    return undefined;
  }
  return classLibraryLevels.find((level) => level.id === levelId)?.label;
}

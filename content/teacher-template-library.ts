export const TEACHER_TEMPLATE_LIBRARY_STORAGE_KEY =
  "academie-kerboeuf-modeles-enseignant-v1";

export type TeacherTemplateCategoryId =
  | "seance"
  | "reunion-parents"
  | "commande"
  | "projet"
  | "checklist"
  | "document";

export type TeacherTemplateCategory = {
  id: TeacherTemplateCategoryId;
  label: string;
};

export const teacherTemplateCategories: TeacherTemplateCategory[] = [
  { id: "seance", label: "Séance" },
  { id: "reunion-parents", label: "Réunion parents" },
  { id: "commande", label: "Commande" },
  { id: "projet", label: "Projet" },
  { id: "checklist", label: "Checklist" },
  { id: "document", label: "Document" },
];

export type TeacherTemplateLevelId = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export const teacherTemplateLevels: { id: TeacherTemplateLevelId; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type TeacherTemplateSubjectId =
  | "francais"
  | "mathematiques"
  | "sciences"
  | "histoire-geographie"
  | "arts"
  | "eps"
  | "autre";

export const teacherTemplateSubjects: { id: TeacherTemplateSubjectId; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
  { id: "histoire-geographie", label: "Histoire-géographie" },
  { id: "arts", label: "Arts" },
  { id: "eps", label: "EPS" },
  { id: "autre", label: "Autre" },
];

export type TeacherTemplate = {
  id: string;
  categoryId: TeacherTemplateCategoryId;
  title: string;
  content: string;
  levelId: TeacherTemplateLevelId | null;
  subjectId: TeacherTemplateSubjectId | null;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export function createEmptyTeacherTemplate(): Omit<
  TeacherTemplate,
  "id" | "createdAt" | "updatedAt"
> {
  return {
    categoryId: "seance",
    title: "",
    content: "",
    levelId: null,
    subjectId: null,
    favorite: false,
  };
}

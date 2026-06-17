import { getAcademyCharacter, type AcademyProfessorCharacter } from "@/content/academy-characters";

/**
 * Associe un slug de matière (catalogue primaire) à un professeur référent.
 * Seuls les slugs non ambigus sont mappés : les matières combinées
 * ("questionner-le-monde", "enseignements-artistiques" en CP/CE1/CE2) ne
 * désignent pas un professeur unique et ne sont volontairement pas couvertes.
 */
const subjectSlugToTeacherSlug: Record<string, string> = {
  mathematiques: "hector",
  francais: "rosa",
  sciences: "melina",
  "histoire-geographie": "elian",
  arts: "pablo",
  musique: "naia",
  eps: "max",
};

export function getSubjectTeacher(subjectSlug: string): AcademyProfessorCharacter | undefined {
  const teacherSlug = subjectSlugToTeacherSlug[subjectSlug];
  if (!teacherSlug) return undefined;
  return getAcademyCharacter(teacherSlug);
}

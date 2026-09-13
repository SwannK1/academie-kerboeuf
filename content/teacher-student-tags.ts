/**
 * Repères élève — petites pastilles de repérage rapide (ex. "À aider",
 * "APC"), à ne jamais confondre avec les "étiquettes" du plan de classe
 * (le prénom ou code de l'élève lui-même). Catalogue fermé et volontairement
 * court : aucune donnée médicale, familiale ou comportementale détaillée,
 * uniquement un repère court. Stocké uniquement sur cet appareil.
 */

export const STUDENT_TAG_STORAGE_KEY =
  "academie-kerboeuf-organisation-classe-reperes-v1";

export type StudentTagAccent = "jade" | "sky" | "gold" | "ember";

export type StudentTagId =
  | "a-aider"
  | "lecture"
  | "maths"
  | "apc"
  | "pap-ppre"
  | "aesh"
  | "a-surveiller";

export type StudentTag = {
  id: StudentTagId;
  title: string;
  accent: StudentTagAccent;
};

export const studentTags: StudentTag[] = [
  { id: "a-aider", title: "À aider", accent: "sky" },
  { id: "lecture", title: "Lecture", accent: "jade" },
  { id: "maths", title: "Maths", accent: "jade" },
  { id: "apc", title: "APC", accent: "gold" },
  { id: "pap-ppre", title: "PAP / PPRE", accent: "ember" },
  { id: "aesh", title: "AESH", accent: "ember" },
  { id: "a-surveiller", title: "À surveiller", accent: "ember" },
];

export function getStudentTag(id: string): StudentTag | undefined {
  return studentTags.find((tag) => tag.id === id);
}

/** Association élève (id d'étiquette du plan de classe) → repères. */
export type StudentTagAssignments = Record<string, StudentTagId[]>;

export const studentTagAccentClasses: Record<StudentTagAccent, string> = {
  jade: "border-jade/40 bg-jade/15 text-jade",
  sky: "border-sky/40 bg-sky/15 text-sky",
  gold: "border-gold/40 bg-gold/15 text-gold",
  ember: "border-ember/40 bg-ember/15 text-ember",
};

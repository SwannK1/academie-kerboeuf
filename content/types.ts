import type { MissionPedagogy } from "@/content/mission-types";

export type Stage = "primaire" | "college" | "lycee";

export type ThemeKey = "jade" | "gold" | "sky" | "ember";

export type MissionStatus = "disponible" | "bientôt" | "en préparation";

export type ProfessorRef = {
  slug?: string;
  name: string;
};

export type MissionCurriculum = {
  domain?: string;
  competency?: string;
  objective?: string;
  officialLevel?: string;
  cycle?: string;
  skillTags?: string[];
};

export type TeacherUse =
  | "projection"
  | "impression"
  | "entraînement"
  | "révision";

export type Mission = {
  id: string;
  stage: Stage;
  levelSlug: string;
  levelLabel: string;
  slug: string;
  title: string;
  description: string;
  subject: string;
  status: MissionStatus;
  theme: ThemeKey;
  professor: ProfessorRef;
  objective?: string;
  skill?: string;
  difficulty?: string;
  associatedCharacter?: string;
  curriculum?: MissionCurriculum;
  teacherUse?: TeacherUse[];
  studentUse?: string;
  projectionHint?: string;
  printHint?: string;
  correction?: string[];
  pedagogy?: MissionPedagogy;
  source: "cm2" | "academy" | "shared";
};

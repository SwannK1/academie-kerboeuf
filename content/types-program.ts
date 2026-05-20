// Architecture pédagogique générique : Cycle → Niveau → Domaine → Sous-domaine → Leçon → Exercices.
// Ce fichier ne connecte rien au reste du projet — il pose uniquement le contrat de types.
// Les fichiers content/programs/cycle-*/[niveau].ts l'importeront quand ils seront créés.

export type AcademyCycle = "cycle-1" | "cycle-2" | "cycle-3";

export type ProgramLevelSlug =
  | "maternelle"
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "sixieme"
  | "cinquieme"
  | "quatrieme"
  | "troisieme"
  | "seconde"
  | "premiere"
  | "terminale";

export type GuideCharacterId =
  | "kiwi"
  | "gaston"
  | "esteban"
  | "noisette"
  | "felix";

export type ProgramNodeStatus = "available" | "in-progress" | "upcoming";

export type ParentGuidance = {
  summary: string;
  howToHelp?: string[];
  successSigns?: string[];
  commonDifficulties?: string[];
};

export type TeacherGuidance = {
  teachingFocus?: string;
  differentiation?: string[];
  assessmentHints?: string[];
};

export type ProgramExercise = {
  slug: string;
  title: string;
  instruction: string;
  type:
    | "automatismes"
    | "application"
    | "raisonnement"
    | "expression"
    | "entrainement"
    | "defi";
  difficulty?: "facile" | "moyen" | "difficile";
  successCriterion?: string;
  correctionHint?: string;
};

export type ProgramLesson = {
  slug: string;
  title: string;
  objective: string;
  skill: string;
  successCriteria?: string[];
  parentGuidance?: ParentGuidance;
  teacherGuidance?: TeacherGuidance;
  exercises: ProgramExercise[];
  linkedMissionSlugs?: string[];
  printableSupport?: boolean;
  projectionSupport?: boolean;
  status: ProgramNodeStatus;
};

export type ProgramSubdomain = {
  slug: string;
  title: string;
  description?: string;
  lessons: ProgramLesson[];
  status: ProgramNodeStatus;
};

export type ProgramDomain = {
  slug: string;
  title: string;
  officialLabel?: string;
  description?: string;
  subdomains: ProgramSubdomain[];
  status: ProgramNodeStatus;
};

export type LevelProgram = {
  slug: ProgramLevelSlug;
  label: string;
  cycle: AcademyCycle;
  guideCharacter?: GuideCharacterId;
  guideNarrativeRole?: string;
  domains: ProgramDomain[];
};

export type CycleProgram = {
  cycle: AcademyCycle;
  label: string;
  levels: LevelProgram[];
};

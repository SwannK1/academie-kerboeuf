import type { AcademyLevel, AcademyMission } from "@/content/academy";
import type { Cm2Mission } from "@/content/cm2";
import type { SharedMission } from "@/content/missions";
import type {
  Mission,
  MissionCurriculum,
  MissionStatus,
  Stage,
  ThemeKey,
} from "@/content/types";

const themeByAccentClass: Record<string, ThemeKey> = {
  "bg-jade": "jade",
  "bg-gold": "gold",
  "bg-sky": "sky",
  "bg-ember": "ember",
};

function missionId(stage: Stage, levelSlug: string, slug: string) {
  return `${stage}:${levelSlug}:${slug}`;
}

function curriculumFromFields(fields: {
  curriculumDomain?: string;
  curriculumCompetency?: string;
  curriculumObjective?: string;
  officialLevel?: string;
  cycle?: string;
  skillTags?: string[];
}): MissionCurriculum | undefined {
  const curriculum: MissionCurriculum = {
    domain: fields.curriculumDomain,
    competency: fields.curriculumCompetency,
    objective: fields.curriculumObjective,
    officialLevel: fields.officialLevel,
    cycle: fields.cycle,
    skillTags: fields.skillTags,
  };

  return Object.values(curriculum).some(Boolean) ? curriculum : undefined;
}

function themeFromMissionTheme(theme: { accentClass: string }): ThemeKey {
  return themeByAccentClass[theme.accentClass] ?? "jade";
}

function normalizeSharedStatus(status: SharedMission["status"]): MissionStatus {
  return status === "disponible" ? "disponible" : "bientôt";
}

export function cm2MissionToMission(mission: Cm2Mission): Mission {
  return {
    id: missionId("primaire", "cm2", mission.slug),
    stage: "primaire",
    levelSlug: "cm2",
    levelLabel: "CM2",
    slug: mission.slug,
    title: mission.title,
    description: mission.description,
    subject: mission.subject,
    status: mission.status,
    theme: themeFromMissionTheme(mission.theme),
    professor: {
      slug: "felix",
      name: "Félix",
    },
    objective: mission.objective,
    curriculum: curriculumFromFields(mission),
    teacherUse: mission.teacherUse,
    studentUse: mission.studentUse,
    correction: mission.pedagogy.correction?.map((item) => item.answer),
    pedagogy: mission.pedagogy,
    source: "cm2",
  };
}

export function academyMissionToMission(
  level: AcademyLevel,
  mission: AcademyMission,
): Mission {
  return {
    id: missionId(level.stage, level.slug, mission.slug),
    stage: level.stage,
    levelSlug: level.slug,
    levelLabel: level.label,
    slug: mission.slug,
    title: mission.title,
    description: mission.description,
    subject: mission.subject,
    status: mission.status,
    theme: themeFromMissionTheme(mission.theme),
    professor: {
      slug: mission.professorSlug ?? level.professor.slug,
      name: mission.professorName ?? level.professor.name,
    },
    objective: mission.objective,
    skill: mission.skill,
    difficulty: mission.difficulty,
    associatedCharacter: mission.associatedCharacter,
    curriculum: curriculumFromFields(mission),
    teacherUse: mission.teacherUse,
    studentUse: mission.studentUse,
    projectionHint: mission.projectionHint,
    printHint: mission.printHint,
    correction: mission.correction,
    pedagogy: mission.pedagogy,
    source: "academy",
  };
}

export function sharedMissionToMission(mission: SharedMission): Mission {
  const stage: Stage = ["6e", "5e", "4e", "3e"].includes(mission.levelSlug)
    ? "college"
    : "lycee";

  return {
    id: missionId(stage, mission.levelSlug, mission.slug),
    stage,
    levelSlug: mission.levelSlug,
    levelLabel: mission.officialLevel ?? mission.levelSlug,
    slug: mission.slug,
    title: mission.title,
    description: mission.description,
    subject: mission.subject,
    status: normalizeSharedStatus(mission.status),
    theme: mission.theme,
    professor: {
      slug: mission.professorSlug,
      name: mission.professorName,
    },
    objective: mission.objective,
    skill: mission.skill,
    difficulty: mission.difficulty,
    associatedCharacter: mission.associatedCharacter,
    curriculum: curriculumFromFields(mission),
    teacherUse: mission.teacherUse,
    studentUse: mission.studentUse,
    projectionHint: mission.projectionHint,
    printHint: mission.printHint,
    correction: mission.correction,
    source: "shared",
  };
}

import {
  hasRealMissionContent,
  type AcademyStage,
  type AcademySubject,
  type AcademyLevel,
  type AcademyMission,
} from "@/content/academy";
import type { MissionProgress } from "@/content/mission-types";
import type { MissionTeacherUse } from "@/content/missions";
import { getPublicStatus, type PublicStatus } from "@/content/public-status";
import { isPublishable } from "@/lib/publishable";

type PublicMissionTheme = {
  name: string;
  accentClass: string;
  surfaceClass: string;
  textClass: string;
  ringClass: string;
};

type PublicAcademyProfessor = {
  slug: string;
  name: string;
  role: string;
  initial: string;
  mainSubject: AcademySubject;
  symbol: string;
  description: string;
  specialty: string;
  visualMood: string;
};

export type PublicAcademyMission = {
  slug: string;
  title: string;
  description: string;
  subject: AcademySubject | string;
  status: PublicStatus;
  objective?: string;
  skill?: string;
  difficulty?: string;
  professorSlug?: string;
  professorName?: string;
  associatedCharacter?: string;
  introduction?: string;
  support?: {
    label: string;
    content: string;
  };
  questions?: string[];
  correction?: string[];
  methodTip?: string;
  projectionHint?: string;
  printHint?: string;
  curriculumDomain?: string;
  curriculumCompetency?: string;
  curriculumObjective?: string;
  officialLevel?: string;
  cycle?: string;
  skillTags?: string[];
  teacherUse?: MissionTeacherUse[];
  studentUse?: string;
  theme: PublicMissionTheme;
  progress: MissionProgress;
};

export type PublicAcademyLevel = {
  slug: string;
  label: string;
  stage: AcademyStage;
  cycle: string;
  professor: PublicAcademyProfessor;
  mood: {
    name: string;
    description: string;
  };
  heroTitle: string;
  description: string;
  subjects: AcademySubject[];
  missions: PublicAcademyMission[];
};

function publishableOrUndefined(value: string | undefined) {
  return isPublishable(value) ? value : undefined;
}

export function getPublicAcademyMission(
  mission: AcademyMission,
): PublicAcademyMission {
  const publicStatus =
    mission.status === "disponible" && !hasRealMissionContent(mission)
      ? getPublicStatus("en préparation")
      : getPublicStatus(mission.status);

  return {
    slug: mission.slug,
    title: mission.title,
    description: mission.description,
    subject: mission.subject,
    status: publicStatus,
    objective: mission.objective,
    skill: mission.skill,
    difficulty: mission.difficulty,
    professorSlug: mission.professorSlug,
    professorName: mission.professorName,
    associatedCharacter: mission.associatedCharacter,
    introduction: mission.introduction,
    support: mission.support,
    questions: mission.questions,
    correction: mission.correction,
    methodTip: mission.methodTip,
    projectionHint: mission.projectionHint,
    printHint: mission.printHint,
    curriculumDomain: publishableOrUndefined(mission.curriculumDomain),
    curriculumCompetency: publishableOrUndefined(mission.curriculumCompetency),
    curriculumObjective: publishableOrUndefined(mission.curriculumObjective),
    officialLevel: mission.officialLevel,
    cycle: mission.cycle,
    skillTags: mission.skillTags,
    teacherUse: mission.teacherUse,
    studentUse: mission.studentUse,
    theme: mission.theme,
    progress: mission.progress,
  };
}

export function getPublicAcademyLevel(level: AcademyLevel): PublicAcademyLevel {
  return {
    slug: level.slug,
    label: level.label,
    stage: level.stage,
    cycle: level.cycle,
    professor: level.professor,
    mood: level.mood,
    heroTitle: level.heroTitle,
    description: level.description,
    subjects: level.subjects,
    missions: level.missions.map(getPublicAcademyMission),
  };
}

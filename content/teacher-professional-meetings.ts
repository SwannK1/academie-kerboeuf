export const TEACHER_MEETINGS_STORAGE_KEY =
  "academie-kerboeuf-rendez-vous-professionnels-v1";

export type TeacherMeetingType =
  | "direction"
  | "equipe-pedagogique"
  | "inspection"
  | "partenaire"
  | "intervenant"
  | "famille"
  | "autre";

export type TeacherMeetingStatus =
  | "a-preparer"
  | "programme"
  | "realise"
  | "suivi-a-faire";

export type TeacherMeetingPriority = "haute" | "moyenne" | "basse";

export interface TeacherMeeting {
  id: string;
  title: string;
  type: TeacherMeetingType;
  date: string;
  location: string;
  objective: string;
  agenda: string;
  notes: string;
  decisions: string;
  followUpActions: string;
  status: TeacherMeetingStatus;
  priority: TeacherMeetingPriority;
  createdAt: string;
}

export const teacherMeetingTypes: { id: TeacherMeetingType; label: string }[] = [
  { id: "direction", label: "Direction" },
  { id: "equipe-pedagogique", label: "Équipe pédagogique" },
  { id: "inspection", label: "Inspection" },
  { id: "partenaire", label: "Partenaire" },
  { id: "intervenant", label: "Intervenant" },
  { id: "famille", label: "Famille" },
  { id: "autre", label: "Autre" },
];

export const teacherMeetingStatuses: {
  id: TeacherMeetingStatus;
  label: string;
}[] = [
  { id: "a-preparer", label: "À préparer" },
  { id: "programme", label: "Programmé" },
  { id: "realise", label: "Réalisé" },
  { id: "suivi-a-faire", label: "Suivi à faire" },
];

export const teacherMeetingPriorities: {
  id: TeacherMeetingPriority;
  label: string;
}[] = [
  { id: "haute", label: "Haute" },
  { id: "moyenne", label: "Moyenne" },
  { id: "basse", label: "Basse" },
];

export function getTeacherMeetingTypeLabel(type: TeacherMeetingType): string {
  return (
    teacherMeetingTypes.find((entry) => entry.id === type)?.label ?? type
  );
}

export function getTeacherMeetingStatusLabel(
  status: TeacherMeetingStatus,
): string {
  return (
    teacherMeetingStatuses.find((entry) => entry.id === status)?.label ??
    status
  );
}

export function getTeacherMeetingPriorityLabel(
  priority: TeacherMeetingPriority,
): string {
  return (
    teacherMeetingPriorities.find((entry) => entry.id === priority)?.label ??
    priority
  );
}

export function createEmptyTeacherMeeting(): TeacherMeeting {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `rdv-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: "",
    type: "direction",
    date: "",
    location: "",
    objective: "",
    agenda: "",
    notes: "",
    decisions: "",
    followUpActions: "",
    status: "a-preparer",
    priority: "moyenne",
    createdAt: new Date().toISOString(),
  };
}

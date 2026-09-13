export const PARENT_MEETING_STORAGE_KEY = "academie-kerboeuf-reunion-parents-v1";

export type ParentMeetingTask = {
  id: string;
  label: string;
  isDone: boolean;
};

export type ParentMeetingInfo = {
  date: string;
  agenda: string;
  documents: string;
  questions: string;
};

export type ParentMeetingState = {
  tasks: ParentMeetingTask[];
  meeting: ParentMeetingInfo;
};

const defaultTaskLabels = [
  "Date arrêtée",
  "Ordre du jour rédigé",
  "Documents préparés",
  "Questions anticipées",
];

export function getDefaultParentMeetingTasks(): ParentMeetingTask[] {
  return defaultTaskLabels.map((label, index) => ({
    id: `reunion-parents-default-${index}`,
    label,
    isDone: false,
  }));
}

export function getDefaultParentMeetingInfo(): ParentMeetingInfo {
  return { date: "", agenda: "", documents: "", questions: "" };
}

export function getDefaultParentMeetingState(): ParentMeetingState {
  return {
    tasks: getDefaultParentMeetingTasks(),
    meeting: getDefaultParentMeetingInfo(),
  };
}

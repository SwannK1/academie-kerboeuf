export const TEACHER_PARENT_MEETING_STORAGE_KEY =
  "academie-kerboeuf-reunion-parents-v1";

export type ParentMeetingAgendaItem = {
  id: string;
  label: string;
  isIncluded: boolean;
  notes: string;
};

export type ParentMeetingDocument = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type ParentMeetingQuestion = {
  id: string;
  question: string;
  responseNotes: string;
  isPrepared: boolean;
};

export type ParentMeetingPracticalInfo = {
  date: string;
  time: string;
  place: string;
  durationMinutes: string;
  personalNote: string;
};

export type ParentMeetingFollowUp = {
  personalNotes: string;
  tasks: string;
  documentsToShare: string;
  reminders: string;
};

export type ParentMeetingState = {
  practicalInfo: ParentMeetingPracticalInfo;
  agendaItems: ParentMeetingAgendaItem[];
  documents: ParentMeetingDocument[];
  questions: ParentMeetingQuestion[];
  followUp: ParentMeetingFollowUp;
};

const DEFAULT_AGENDA_LABELS = [
  "Présentation de l'enseignant et de la classe",
  "Horaires et ponctualité",
  "Absences",
  "Matériel",
  "Cahiers et outils",
  "Devoirs",
  "Communication famille-école",
  "Sorties et projets",
  "Règles de vie",
  "Besoins de coopération",
  "Questions",
] as const;

const DEFAULT_DOCUMENT_LABELS = [
  "Liste de matériel",
  "Présentation de classe",
  "Calendrier",
  "Autorisations",
  "Fiche de renseignements",
  "Rappel des contacts",
  "Documents personnalisés",
] as const;

export function createDefaultParentMeetingState(): ParentMeetingState {
  return {
    practicalInfo: {
      date: "",
      time: "",
      place: "",
      durationMinutes: "",
      personalNote: "",
    },
    agendaItems: DEFAULT_AGENDA_LABELS.map((label, index) => ({
      id: `agenda-${index}`,
      label,
      isIncluded: true,
      notes: "",
    })),
    documents: DEFAULT_DOCUMENT_LABELS.map((label, index) => ({
      id: `document-${index}`,
      label,
      isChecked: false,
    })),
    questions: [],
    followUp: {
      personalNotes: "",
      tasks: "",
      documentsToShare: "",
      reminders: "",
    },
  };
}

export function isParentMeetingState(
  value: unknown,
): value is ParentMeetingState {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as Partial<ParentMeetingState>;
  return (
    !!candidate.practicalInfo &&
    Array.isArray(candidate.agendaItems) &&
    Array.isArray(candidate.documents) &&
    Array.isArray(candidate.questions) &&
    !!candidate.followUp
  );
}

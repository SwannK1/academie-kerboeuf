export const CLASS_TRACKING_STORAGE_KEY =
  "academie-kerboeuf-suivi-de-classe-v1";

/**
 * Champs strictement collectifs et anonymes. Aucun champ ne doit jamais
 * référencer un élève, un prénom, un comportement ou une situation
 * individuelle : voir AGENTS.md (garde-fou anti-régression).
 */
export type ClassTrackingFieldId =
  | "climat-de-classe"
  | "participation-globale"
  | "besoins-pedagogiques"
  | "reussites-collectives"
  | "objectifs-semaine";

export type ClassTrackingEntry = {
  id: string;
  weekLabel: string;
  notesByField: Record<ClassTrackingFieldId, string>;
};

export type ClassTrackingState = {
  entries: ClassTrackingEntry[];
};

export const classTrackingFields: readonly {
  id: ClassTrackingFieldId;
  title: string;
  description: string;
}[] = [
  {
    id: "climat-de-classe",
    title: "Climat de classe",
    description: "Ambiance générale et fonctionnement collectif de la semaine.",
  },
  {
    id: "participation-globale",
    title: "Participation globale",
    description: "Niveau d'engagement et de participation de la classe dans son ensemble.",
  },
  {
    id: "besoins-pedagogiques",
    title: "Besoins pédagogiques de groupe",
    description: "Points à retravailler ou à consolider collectivement.",
  },
  {
    id: "reussites-collectives",
    title: "Réussites collectives",
    description: "Réussites et progrès observés à l'échelle de la classe.",
  },
  {
    id: "objectifs-semaine",
    title: "Objectifs de la semaine",
    description: "Objectifs collectifs fixés pour la semaine à venir.",
  },
] as const;

function emptyNotesByField(): Record<ClassTrackingFieldId, string> {
  const notes = {} as Record<ClassTrackingFieldId, string>;
  for (const field of classTrackingFields) {
    notes[field.id] = "";
  }
  return notes;
}

export function createEmptyClassTrackingEntry(
  weekLabel: string,
): ClassTrackingEntry {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    weekLabel,
    notesByField: emptyNotesByField(),
  };
}

export function getDefaultClassTrackingState(): ClassTrackingState {
  return { entries: [] };
}

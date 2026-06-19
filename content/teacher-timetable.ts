/**
 * Données de base de l'outil d'emploi du temps hebdomadaire enseignant.
 *
 * Ces données décrivent uniquement la structure (jours, créneaux, matières,
 * objectifs horaires conseillés). Aucune donnée de classe réelle n'est
 * stockée ici : la grille remplie par l'enseignant reste en localStorage.
 */

export type TimetableLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export const timetableLevels: { id: TimetableLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type TimetableDay = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi";

export const timetableDays: { id: TimetableDay; label: string; optional?: boolean }[] = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "mercredi", label: "Mercredi", optional: true },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
];

export type TimetableSlot = "matin-1" | "matin-2" | "apres-midi-1" | "apres-midi-2";

export const timetableSlots: { id: TimetableSlot; label: string }[] = [
  { id: "matin-1", label: "Matin 1" },
  { id: "matin-2", label: "Matin 2" },
  { id: "apres-midi-1", label: "Après-midi 1" },
  { id: "apres-midi-2", label: "Après-midi 2" },
];

export type TimetableSubject =
  | "francais"
  | "mathematiques"
  | "eps"
  | "arts-plastiques"
  | "education-musicale"
  | "emc"
  | "questionner-le-monde"
  | "sciences"
  | "histoire-geographie";

export const timetableSubjects: { id: TimetableSubject; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "eps", label: "EPS" },
  { id: "arts-plastiques", label: "Arts plastiques" },
  { id: "education-musicale", label: "Éducation musicale" },
  { id: "emc", label: "EMC" },
  { id: "questionner-le-monde", label: "Questionner le monde" },
  { id: "sciences", label: "Sciences" },
  { id: "histoire-geographie", label: "Histoire-Géographie" },
];

/** Matières pertinentes selon le cycle : QLM en cycle 2, Sciences + Histoire-Géo en cycle 3. */
export function getTimetableSubjectsForLevel(
  level: TimetableLevel,
): { id: TimetableSubject; label: string }[] {
  const isCycle2 = level === "cp" || level === "ce1" || level === "ce2";
  const excluded = new Set<TimetableSubject>(
    isCycle2 ? ["sciences", "histoire-geographie"] : ["questionner-le-monde"],
  );
  return timetableSubjects.filter((subject) => !excluded.has(subject.id));
}

/** Objectifs horaires hebdomadaires conseillés (en heures), à titre indicatif. */
export function getRecommendedHoursForLevel(
  level: TimetableLevel,
): Partial<Record<TimetableSubject, number>> {
  const isCycle2 = level === "cp" || level === "ce1" || level === "ce2";
  if (isCycle2) {
    return {
      francais: 10,
      mathematiques: 5,
      eps: 3,
      "arts-plastiques": 1,
      "education-musicale": 1,
      emc: 1,
      "questionner-le-monde": 3,
    };
  }
  return {
    francais: 8,
    mathematiques: 5,
    eps: 3,
    "arts-plastiques": 1,
    "education-musicale": 1,
    emc: 1,
    sciences: 2,
    "histoire-geographie": 3,
  };
}

export const WEEKLY_HOURS_REFERENCE = 24;

export const timetableDurationOptions = [0.5, 0.75, 1, 1.5, 2];

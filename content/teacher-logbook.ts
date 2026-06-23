/**
 * Données de base du cahier journal local enseignant.
 *
 * Outil de préparation de séances (vue semaine), entièrement local
 * (localStorage). Ne contient et ne doit jamais contenir de donnée élève.
 */

export type LogbookDay =
  | "lundi"
  | "mardi"
  | "mercredi"
  | "jeudi"
  | "vendredi";

export const logbookDays: { id: LogbookDay; label: string }[] = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "mercredi", label: "Mercredi" },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
];

export type LogbookSlotId =
  | "slot-1"
  | "slot-2"
  | "slot-3"
  | "slot-4"
  | "slot-5"
  | "slot-6";

export const logbookSlots: { id: LogbookSlotId; label: string }[] = [
  { id: "slot-1", label: "8h30 – 9h15" },
  { id: "slot-2", label: "9h15 – 10h00" },
  { id: "slot-3", label: "10h15 – 11h00" },
  { id: "slot-4", label: "11h00 – 11h45" },
  { id: "slot-5", label: "13h30 – 14h15" },
  { id: "slot-6", label: "14h15 – 15h15" },
];

export type LogbookSubject =
  | "francais"
  | "mathematiques"
  | "sciences"
  | "histoire-geographie"
  | "eps"
  | "arts"
  | "emc"
  | "anglais"
  | "autre";

export const logbookSubjects: { id: LogbookSubject; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
  { id: "histoire-geographie", label: "Histoire-géographie" },
  { id: "eps", label: "EPS" },
  { id: "arts", label: "Arts" },
  { id: "emc", label: "EMC" },
  { id: "anglais", label: "Anglais" },
  { id: "autre", label: "Autre" },
];

export type LogbookLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export const logbookLevels: { id: LogbookLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type LogbookGroup = "classe-entiere" | "demi-groupe" | "groupe-besoin" | "atelier";

export const logbookGroups: { id: LogbookGroup; label: string }[] = [
  { id: "classe-entiere", label: "Classe entière" },
  { id: "demi-groupe", label: "Demi-groupe" },
  { id: "groupe-besoin", label: "Groupe de besoin" },
  { id: "atelier", label: "Atelier" },
];

export type LogbookStatus =
  | "a-preparer"
  | "prete"
  | "faite"
  | "a-reporter"
  | "a-ajuster";

export const logbookStatuses: {
  id: LogbookStatus;
  label: string;
  symbol: string;
}[] = [
  { id: "a-preparer", label: "À préparer", symbol: "○" },
  { id: "prete", label: "Prête", symbol: "●" },
  { id: "faite", label: "Faite", symbol: "✓" },
  { id: "a-reporter", label: "À reporter", symbol: "→" },
  { id: "a-ajuster", label: "À ajuster", symbol: "!" },
];

export type LogbookSpecialWeekType =
  | "sortie"
  | "evaluation"
  | "projet"
  | "remplacement";

export const logbookSpecialWeekTypes: {
  id: LogbookSpecialWeekType;
  label: string;
}[] = [
  { id: "sortie", label: "Semaine sortie" },
  { id: "evaluation", label: "Semaine évaluation" },
  { id: "projet", label: "Semaine projet" },
  { id: "remplacement", label: "Semaine remplacement" },
];

export interface LogbookSession {
  id: string;
  day: LogbookDay;
  slotId: LogbookSlotId;
  subject: LogbookSubject;
  level: LogbookLevel;
  title: string;
  durationLabel: string;
  group: LogbookGroup;
  material: string;
  location: string;
  status: LogbookStatus;
  objective: string;
  outline: string;
  printsToPrepare: string;
  personalNote: string;
  resourceLink: string;
  printableAvailable: boolean;
  printableLabel: string;
  printableCopies: number;
}

export interface LogbookWeekData {
  specialWeekType: LogbookSpecialWeekType | null;
  specialWeekNote: string;
  sessions: LogbookSession[];
}

export function createEmptyWeekData(): LogbookWeekData {
  return { specialWeekType: null, specialWeekNote: "", sessions: [] };
}

export function createSessionId(): string {
  return `seance-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createBlankSession(
  day: LogbookDay,
  slotId: LogbookSlotId,
): LogbookSession {
  return {
    id: createSessionId(),
    day,
    slotId,
    subject: logbookSubjects[0].id,
    level: logbookLevels[0].id,
    title: "",
    durationLabel: "",
    group: logbookGroups[0].id,
    material: "",
    location: "",
    status: "a-preparer",
    objective: "",
    outline: "",
    printsToPrepare: "",
    personalNote: "",
    resourceLink: "",
    printableAvailable: false,
    printableLabel: "",
    printableCopies: 1,
  };
}

/** Lundi (00:00 locale) de la semaine contenant `date`, au format AAAA-MM-JJ. */
export function getMondayKey(date: Date): string {
  const local = new Date(date);
  local.setHours(0, 0, 0, 0);
  const dow = local.getDay();
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  local.setDate(local.getDate() + diffToMonday);
  const year = local.getFullYear();
  const month = String(local.getMonth() + 1).padStart(2, "0");
  const day = String(local.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDaysToKey(key: string, days: number): string {
  const [year, month, day] = key.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return getMondayKey(date);
}

const weekDayDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
});

export function formatWeekRangeLabel(mondayKey: string): string {
  const [year, month, day] = mondayKey.split("-").map(Number);
  const monday = new Date(year, month - 1, day);
  const friday = new Date(monday);
  friday.setDate(friday.getDate() + 4);
  return `Semaine du ${weekDayDateFormatter.format(monday)} au ${weekDayDateFormatter.format(friday)}`;
}

export function dayOffset(day: LogbookDay): number {
  return logbookDays.findIndex((item) => item.id === day);
}

export function nextDay(day: LogbookDay): { day: LogbookDay; weekOffset: number } {
  const index = dayOffset(day);
  if (index === logbookDays.length - 1) {
    return { day: logbookDays[0].id, weekOffset: 7 };
  }
  return { day: logbookDays[index + 1].id, weekOffset: 0 };
}

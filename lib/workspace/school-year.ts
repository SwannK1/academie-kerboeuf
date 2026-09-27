/**
 * Calendrier scolaire 2026-2027 (métropole, zones A/B/C) et utilitaires de
 * dates. Les dates proviennent du jeu de données officiel
 * « Calendrier scolaire » du ministère ; aucune n'est estimée.
 */

export type Zone = "A" | "B" | "C";

export const SCHOOL_YEAR_SOURCE = {
  label: "Calendrier scolaire — ministère de l'Éducation nationale",
  href: "https://www.education.gouv.fr/calendrier-scolaire-100148",
  dataset: "https://data.education.gouv.fr/explore/dataset/fr-en-calendrier-scolaire/",
  verifiedAt: "2026-09-27",
};

type Holiday = { label: string; start: string; back: string };

const COMMON: Holiday[] = [
  { label: "Vacances de la Toussaint", start: "2026-10-17", back: "2026-11-02" },
  { label: "Vacances de Noël", start: "2026-12-19", back: "2027-01-04" },
];

const BY_ZONE: Record<Zone, Holiday[]> = {
  A: [
    { label: "Vacances d'hiver", start: "2027-02-13", back: "2027-03-01" },
    { label: "Vacances de printemps", start: "2027-04-10", back: "2027-04-26" },
  ],
  B: [
    { label: "Vacances d'hiver", start: "2027-02-20", back: "2027-03-08" },
    { label: "Vacances de printemps", start: "2027-04-17", back: "2027-05-03" },
  ],
  C: [
    { label: "Vacances d'hiver", start: "2027-02-06", back: "2027-02-22" },
    { label: "Vacances de printemps", start: "2027-04-03", back: "2027-04-19" },
  ],
};

const RENTREE = "2026-09-01";
const SUMMER = "2027-07-03";
/** Pont de l'Ascension, identique pour les trois zones. */
const BRIDGE = "2027-05-07";

export type Period = { id: 1 | 2 | 3 | 4 | 5; label: string; start: string; end: string };

export function getHolidays(zone: Zone): Holiday[] {
  return [...COMMON, ...BY_ZONE[zone], { label: "Vacances d'été", start: SUMMER, back: "2027-09-02" }];
}

export function getPeriods(zone: Zone): Period[] {
  const [toussaint, noel, hiver, printemps] = [...COMMON, ...BY_ZONE[zone]];
  const bounds: [string, string][] = [
    [RENTREE, addDays(toussaint.start, -1)],
    [toussaint.back, addDays(noel.start, -1)],
    [noel.back, addDays(hiver.start, -1)],
    [hiver.back, addDays(printemps.start, -1)],
    [printemps.back, addDays(SUMMER, -1)],
  ];
  return bounds.map(([start, end], index) => ({
    id: (index + 1) as Period["id"],
    label: `P${index + 1}`,
    start,
    end,
  }));
}

export function getPeriodFor(date: string, zone: Zone): Period {
  const periods = getPeriods(zone);
  return (
    periods.find((p) => date >= p.start && date <= p.end) ??
    periods.find((p) => date < p.start) ??
    periods[periods.length - 1]
  );
}

export function isHoliday(date: string, zone: Zone): boolean {
  if (date === BRIDGE) return true;
  return getHolidays(zone).some((h) => date >= h.start && date < h.back);
}

// ── Dates ISO locales (YYYY-MM-DD), sans fuseau ───────────────────────────────

export function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
}

export function todayIso(): string {
  return toIso(new Date());
}

export function addDays(iso: string, days: number): string {
  const date = fromIso(iso);
  date.setDate(date.getDate() + days);
  return toIso(date);
}

/** 1 = lundi … 7 = dimanche */
export function weekday(iso: string): number {
  const day = fromIso(iso).getDay();
  return day === 0 ? 7 : day;
}

export function mondayOf(iso: string): string {
  return addDays(iso, 1 - weekday(iso));
}

export const WEEKDAYS: { id: number; label: string; short: string }[] = [
  { id: 1, label: "Lundi", short: "Lun" },
  { id: 2, label: "Mardi", short: "Mar" },
  { id: 3, label: "Mercredi", short: "Mer" },
  { id: 4, label: "Jeudi", short: "Jeu" },
  { id: 5, label: "Vendredi", short: "Ven" },
];

export function dayLabel(iso: string): string {
  return WEEKDAYS.find((d) => d.id === weekday(iso))?.label ?? "";
}

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const MONTHS_LONG = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export function formatShortDate(iso: string): string {
  const date = fromIso(iso);
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function formatLongDate(iso: string): string {
  const date = fromIso(iso);
  return `${dayLabel(iso)} ${date.getDate()} ${MONTHS_LONG[date.getMonth()]}`;
}

export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${m ? String(m).padStart(2, "0") : ""}`;
}

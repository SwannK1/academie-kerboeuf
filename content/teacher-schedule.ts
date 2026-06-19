import type { TeacherLevel, TeacherSubject } from "@/content/teacher-programmation";

/**
 * Données de base de l'outil d'emploi du temps hebdomadaire.
 *
 * L'outil répartit des matières dans des créneaux fixes ; il ne décrit
 * aucun contenu pédagogique, seulement l'organisation du temps de classe.
 */

export type ScheduleDay = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi";

export type ScheduleSlot = "matin-1" | "matin-2" | "apres-midi-1" | "apres-midi-2";

export const scheduleDays: { id: ScheduleDay; label: string; optional?: boolean }[] = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "mercredi", label: "Mercredi", optional: true },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
];

export const scheduleSlots: { id: ScheduleSlot; label: string; morningOnly?: boolean }[] = [
  { id: "matin-1", label: "Matin 1" },
  { id: "matin-2", label: "Matin 2" },
  { id: "apres-midi-1", label: "Après-midi 1", morningOnly: false },
  { id: "apres-midi-2", label: "Après-midi 2", morningOnly: false },
];

/** Durée par défaut d'un créneau, en heures. Modifiable plus tard. */
export const DEFAULT_SLOT_DURATION_HOURS = 1.5;

/** Repère officiel : durée hebdomadaire à l'école élémentaire. */
export const WEEKLY_HOURS_TARGET = 24;

/**
 * Objectifs horaires hebdomadaires conseillés par matière, par niveau.
 * Valeurs indicatives et configurables, pas une référence réglementaire figée.
 */
export const subjectHourObjectives: Record<
  TeacherLevel,
  Record<TeacherSubject, number>
> = {
  cp: {
    francais: 11,
    mathematiques: 5,
    sciences: 2,
    "histoire-geographie": 0,
    emc: 0.5,
    arts: 1.5,
    musique: 1,
    eps: 3,
  },
  ce1: {
    francais: 11,
    mathematiques: 5,
    sciences: 2,
    "histoire-geographie": 0,
    emc: 0.5,
    arts: 1.5,
    musique: 1,
    eps: 3,
  },
  ce2: {
    francais: 11,
    mathematiques: 5,
    sciences: 2,
    "histoire-geographie": 0,
    emc: 0.5,
    arts: 1.5,
    musique: 1,
    eps: 3,
  },
  cm1: {
    francais: 8.5,
    mathematiques: 5,
    sciences: 2,
    "histoire-geographie": 2,
    emc: 0.5,
    arts: 1.5,
    musique: 1.5,
    eps: 3,
  },
  cm2: {
    francais: 8.5,
    mathematiques: 5,
    sciences: 2,
    "histoire-geographie": 2,
    emc: 0.5,
    arts: 1.5,
    musique: 1.5,
    eps: 3,
  },
};

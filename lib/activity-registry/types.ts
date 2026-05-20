import type { RenderSurface } from "@/lib/mission-engine/types";

// ─────────────────────────────────────────────────────────────────────────────
// Types de données d'activités (discriminated union)
//
// Principe : chaque activité est un objet avec un champ `type` discriminant.
// Avant d'ajouter un nouveau type, vérifier si un type existant paramétré
// ne suffit pas. Exemple : un QCM avec images n'est pas un nouveau type —
// c'est un QCM avec un champ `mediaUrl` optionnel sur chaque option.
// ─────────────────────────────────────────────────────────────────────────────

// ── QCM ─────────────────────────────────────────────────────────────────────
export type QcmOption = {
  readonly id: string;
  readonly label: string;
  readonly mediaUrl?: string;
};

export type QcmActivityData = {
  readonly type: "QCM";
  readonly question: string;
  readonly options: readonly QcmOption[];
  readonly correctOptionId: string;
  readonly hint?: string;
  readonly feedbackCorrect?: string;
  readonly feedbackIncorrect?: string;
};

// ── Texte libre ─────────────────────────────────────────────────────────────
export type FreeTextActivityData = {
  readonly type: "FREE_TEXT";
  readonly prompt: string;
  readonly placeholder?: string;
  readonly maxLength?: number;
  // Réponse de référence affichée en mode correction/lecture.
  // Ne sert jamais à la validation automatique (trop ambigu pour du texte libre).
  readonly expectedAnswer?: string;
};

// ── Texte à trous ────────────────────────────────────────────────────────────
// Le template utilise des marqueurs {{blank:id}} pour positionner les trous.
// Exemple : "Le soleil est une {{blank:etoile}} de type G."
export type FillBlankEntry = {
  readonly id: string;
  readonly acceptedAnswers: readonly string[];
  readonly hint?: string;
};

export type FillBlankActivityData = {
  readonly type: "FILL_BLANK";
  readonly template: string;
  readonly blanks: readonly FillBlankEntry[];
};

// ── Compréhension de lecture ─────────────────────────────────────────────────
export type ReadingQuestionLevel =
  | "indice"
  | "raisonnement"
  | "justification"
  | "interprétation"
  | "synthèse";

export type ReadingQuestion = {
  readonly id: string;
  readonly prompt: string;
  readonly level?: ReadingQuestionLevel;
  readonly expectedAnswer?: string;
};

export type ReadingComprehensionActivityData = {
  readonly type: "READING_COMPREHENSION";
  readonly text: string;
  readonly questions: readonly ReadingQuestion[];
};

// ── Union discriminée des types d'activité ───────────────────────────────────
// Pour ajouter un nouveau type : définir son *Data, l'ajouter ici,
// créer son renderer dans components/activities/<type>/, et l'enregistrer
// dans components/activities/ActivityRenderer.tsx.
export type ActivityData =
  | QcmActivityData
  | FreeTextActivityData
  | FillBlankActivityData
  | ReadingComprehensionActivityData;

export type ActivityTypeKey = ActivityData["type"];

// ── Props normalisées du renderer ─────────────────────────────────────────────
// Interface stable entre le moteur et les composants UI.
// Le moteur ne connaît pas les composants ; les composants ne lisent pas
// les données brutes des missions.
export type ActivityRendererProps<T extends ActivityData = ActivityData> = {
  readonly activity: T;
  readonly surface: RenderSurface;
  readonly showCorrection?: boolean;
  readonly onAnswer?: (answer: string) => void;
};

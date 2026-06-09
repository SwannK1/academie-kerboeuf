// Registre des fiches CM2 Mathématiques.
// Chaque notion correspond à une compétence et comporte 3 feuilles :
//   f1 → Leçon · f2 → Consolidation · f3 → Évaluation
// Les feuilles sans href réel restent non-cliquables côté UI.

export type SheetId = "f1" | "f2" | "f3";

export const SHEET_LABELS: Record<SheetId, string> = {
  f1: "Leçon",
  f2: "Consolidation",
  f3: "Évaluation",
};

export const SHEET_IDS: SheetId[] = ["f1", "f2", "f3"];

export type FicheSheet = {
  id: SheetId;
  status: "available" | "upcoming";
  href?: string;
};

export type Cm2FicheMath = {
  notionSlug: string;
  title: string;
  domain: string;
  skill: string;
  sheets: FicheSheet[];
};

// ── Données ───────────────────────────────────────────────────────────────────

export const cm2FichesMaths: Cm2FicheMath[] = [
  // ── Nombres et calcul ──────────────────────────────────────────────────────
  {
    notionSlug: "ma-nc-calcul-mental-strategies",
    title: "Choisir une stratégie de calcul mental",
    domain: "Nombres et calcul",
    skill: "Sélectionner la stratégie la plus efficace selon les nombres en jeu.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },
  {
    notionSlug: "ma-nc-calcul-mental-expliquer",
    title: "Expliquer sa procédure de calcul mental",
    domain: "Nombres et calcul",
    skill: "Verbaliser les étapes d'un calcul mental pour le rendre communicable.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },
  {
    notionSlug: "ma-nc-multiplier-grands-nombres",
    title: "Multiplier des nombres entiers",
    domain: "Nombres et calcul",
    skill: "Poser et effectuer une multiplication avec des nombres à plusieurs chiffres.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },
  {
    notionSlug: "ma-nc-diviser-entiers",
    title: "Diviser un entier par un entier",
    domain: "Nombres et calcul",
    skill: "Poser une division euclidienne et interpréter quotient et reste.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },
  {
    notionSlug: "ma-nc-comparer-fractions",
    title: "Comparer des fractions simples",
    domain: "Nombres et calcul",
    skill: "Ordonner des fractions en utilisant le même dénominateur ou la droite graduée.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },

  // ── Résolution de problèmes ────────────────────────────────────────────────
  {
    notionSlug: "ma-pb-identifier-donnees",
    title: "Identifier les données utiles dans un problème",
    domain: "Résolution de problèmes",
    skill: "Séparer les données nécessaires des données inutiles ou pièges.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },
  {
    notionSlug: "ma-pb-choisir-operation",
    title: "Choisir l'opération adaptée à la situation",
    domain: "Résolution de problèmes",
    skill: "Relier la situation mathématique à l'opération qui la modélise.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },
  {
    notionSlug: "ma-pb-resoudre-etapes",
    title: "Résoudre un problème à plusieurs étapes",
    domain: "Résolution de problèmes",
    skill: "Décomposer un problème en sous-questions pour l'aborder étape par étape.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },
  {
    notionSlug: "ma-pb-verifier-coherence",
    title: "Vérifier la cohérence d'un résultat",
    domain: "Résolution de problèmes",
    skill: "Estimer si un résultat est plausible et en vérifier la cohérence.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },

  // ── Grandeurs et mesures ───────────────────────────────────────────────────
  {
    notionSlug: "ma-gm-conversions-longueurs",
    title: "Convertir des unités de longueur",
    domain: "Grandeurs et mesures",
    skill: "Passer d'une unité à une autre dans le système métrique des longueurs.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },
  {
    notionSlug: "ma-gm-perimetre-aire",
    title: "Distinguer périmètre et aire",
    domain: "Grandeurs et mesures",
    skill: "Différencier le contour d'une figure de la surface qu'elle occupe.",
    sheets: [
      { id: "f1", status: "upcoming" },
      { id: "f2", status: "upcoming" },
      { id: "f3", status: "upcoming" },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCm2FicheMath(notionSlug: string): Cm2FicheMath | undefined {
  return cm2FichesMaths.find((f) => f.notionSlug === notionSlug);
}

export function getSheet(notion: Cm2FicheMath, sheetId: SheetId): FicheSheet | undefined {
  return notion.sheets.find((s) => s.id === sheetId);
}

export function isSheetClickable(sheet: FicheSheet): boolean {
  return sheet.status === "available" && Boolean(sheet.href);
}

export function getNotionCompleteness(notion: Cm2FicheMath): "complete" | "partial" | "upcoming" {
  const available = notion.sheets.filter((s) => s.status === "available").length;
  if (available === 3) return "complete";
  if (available > 0) return "partial";
  return "upcoming";
}

export function getMathDomains(): string[] {
  return Array.from(new Set(cm2FichesMaths.map((f) => f.domain)));
}

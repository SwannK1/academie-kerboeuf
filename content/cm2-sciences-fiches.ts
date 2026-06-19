// Registre des fiches CM2 Sciences et technologie.
// Chaque notion correspond à une compétence et comporte 3 feuilles :
//   f1 → Leçon · f2 → Consolidation · f3 → Évaluation
// Aucun PDF n'est encore disponible dans public/ — toutes les feuilles
// sont en statut "upcoming". Quand les fichiers seront déposés dans
//   public/fiches/cm2/sciences-pdf/<notion-slug>/f{1,2,3}.pdf
// passer le statut à "available" et renseigner imageHref + pdfHref.

export type ScienceSheetId = "f1" | "f2" | "f3";

export const SCIENCE_SHEET_LABELS: Record<ScienceSheetId, string> = {
  f1: "Leçon",
  f2: "Consolidation",
  f3: "Évaluation",
};

export const SCIENCE_SHEET_IDS: ScienceSheetId[] = ["f1", "f2", "f3"];

export type ScienceFicheSheet = {
  id: ScienceSheetId;
  status: "available" | "upcoming";
  imageHref?: string;
  pdfHref?: string;
};

export type Cm2FicheScience = {
  notionSlug: string;
  title: string;
  domain: string;
  skill: string;
  sheets: ScienceFicheSheet[];
};

const upcomingSheets: ScienceFicheSheet[] = SCIENCE_SHEET_IDS.map((id) => ({
  id,
  status: "upcoming" as const,
}));

export const cm2FichesSciences: Cm2FicheScience[] = [
  // ── Démarche d'investigation ────────────────────────────────────────────────
  {
    notionSlug: "observer-decrire-sans-interpreter",
    title: "Observer et décrire sans interpréter",
    domain: "Démarche d'investigation",
    skill: "Formuler une observation factuelle sans l'expliquer prématurément.",
    sheets: upcomingSheets,
  },
  {
    notionSlug: "formuler-une-hypothese",
    title: "Formuler une hypothèse scientifique",
    domain: "Démarche d'investigation",
    skill: "Proposer une explication provisoire vérifiable à partir d'une observation.",
    sheets: upcomingSheets,
  },
  {
    notionSlug: "comparer-resultats-conclure",
    title: "Comparer des résultats pour conclure",
    domain: "Démarche d'investigation",
    skill: "Analyser plusieurs résultats en les comparant pour formuler une conclusion.",
    sheets: upcomingSheets,
  },
  {
    notionSlug: "rediger-une-conclusion-scientifique",
    title: "Rédiger une conclusion scientifique",
    domain: "Communication scientifique",
    skill: "Écrire une conclusion courte ancrée dans les résultats observés.",
    sheets: upcomingSheets,
  },
  // ── Le vivant ───────────────────────────────────────────────────────────────
  {
    notionSlug: "conditions-de-la-germination",
    title: "Identifier les conditions de la germination",
    domain: "Le vivant",
    skill: "Relier les conditions expérimentales à la présence ou l'absence de germination.",
    sheets: upcomingSheets,
  },
  {
    notionSlug: "chaines-alimentaires",
    title: "Les chaînes alimentaires",
    domain: "Le vivant",
    skill: "Construire et lire une chaîne alimentaire en identifiant producteurs et consommateurs.",
    sheets: upcomingSheets,
  },
  // ── Matière, énergie, information ──────────────────────────────────────────
  {
    notionSlug: "les-etats-de-la-matiere",
    title: "Les états de la matière",
    domain: "Matière, mouvement, énergie, information",
    skill: "Distinguer solide, liquide et gaz et expliquer les changements d'état.",
    sheets: upcomingSheets,
  },
  {
    notionSlug: "sources-et-formes-d-energie",
    title: "Sources et formes d'énergie",
    domain: "Matière, mouvement, énergie, information",
    skill: "Identifier différentes sources d'énergie et leurs usages quotidiens.",
    sheets: upcomingSheets,
  },
  // ── La planète Terre et l'environnement ────────────────────────────────────
  {
    notionSlug: "les-paysages-et-le-changement-climatique",
    title: "Paysages et changement climatique",
    domain: "La planète Terre et l'environnement",
    skill: "Relier des observations locales à des phénomènes climatiques plus larges.",
    sheets: upcomingSheets,
  },
];

export function getScienceDomains(): string[] {
  return [...new Set(cm2FichesSciences.map((f) => f.domain))];
}

export function isScienceSheetClickable(sheet: ScienceFicheSheet): boolean {
  return sheet.status === "available" && !!sheet.imageHref;
}

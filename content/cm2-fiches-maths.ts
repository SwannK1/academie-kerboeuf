// Registre des fiches CM2 Mathématiques.
// Chaque notion correspond à une compétence et comporte 3 feuilles :
//   f1 → Leçon · f2 → Consolidation · f3 → Évaluation
// Les feuilles sans href réel restent non-cliquables côté UI.
// imageHref pointe vers le PNG source, pdfHref vers le PDF généré à partir du PNG.

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
  imageHref?: string;
  pdfHref?: string;
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
  // ── Géométrie ──────────────────────────────────────────────────────────────
  {
    notionSlug: "choisir-le-bon-outil-geometrique",
    title: "Choisir le bon outil géométrique",
    domain: "Géométrie",
    skill: "Sélectionner l'outil adapté (règle, équerre, compas, rapporteur) selon la tâche géométrique.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/choisir-le-bon-outil-geometrique/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/choisir-le-bon-outil-geometrique/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/choisir-le-bon-outil-geometrique/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/choisir-le-bon-outil-geometrique/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/choisir-le-bon-outil-geometrique/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/choisir-le-bon-outil-geometrique/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "reconnaitre-et-decrire-des-triangles",
    title: "Reconnaître et décrire des triangles",
    domain: "Géométrie",
    skill: "Identifier et nommer les différents types de triangles selon leurs propriétés.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-et-decrire-des-triangles/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-et-decrire-des-triangles/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-et-decrire-des-triangles/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-et-decrire-des-triangles/f2.pdf",
      },
      { id: "f3", status: "upcoming" },
    ],
  },
  {
    notionSlug: "construire-un-cercle-avec-un-compas",
    title: "Construire un cercle avec un compas",
    domain: "Géométrie",
    skill: "Tracer un cercle de rayon donné en utilisant un compas.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/construire-un-cercle-avec-un-compas/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/construire-un-cercle-avec-un-compas/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/construire-un-cercle-avec-un-compas/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/construire-un-cercle-avec-un-compas/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/construire-un-cercle-avec-un-compas/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/construire-un-cercle-avec-un-compas/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "completer-une-figure-par-symetrie-axiale",
    title: "Compléter une figure par symétrie axiale",
    domain: "Géométrie",
    skill: "Construire le symétrique d'une figure par rapport à un axe donné.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/completer-une-figure-par-symetrie-axiale/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/completer-une-figure-par-symetrie-axiale/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/completer-une-figure-par-symetrie-axiale/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/completer-une-figure-par-symetrie-axiale/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/completer-une-figure-par-symetrie-axiale/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/completer-une-figure-par-symetrie-axiale/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "tracer-des-droites-perpendiculaires",
    title: "Tracer des droites perpendiculaires",
    domain: "Géométrie",
    skill: "Construire deux droites perpendiculaires à l'aide d'une équerre.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/tracer-des-droites-perpendiculaires/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/tracer-des-droites-perpendiculaires/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/tracer-des-droites-perpendiculaires/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/tracer-des-droites-perpendiculaires/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/tracer-des-droites-perpendiculaires/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/tracer-des-droites-perpendiculaires/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "utiliser-plusieurs-outils-geometriques",
    title: "Utiliser plusieurs outils géométriques",
    domain: "Géométrie",
    skill: "Combiner règle, équerre et compas pour réaliser une construction géométrique.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/utiliser-plusieurs-outils-geometriques/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/utiliser-plusieurs-outils-geometriques/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/utiliser-plusieurs-outils-geometriques/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/utiliser-plusieurs-outils-geometriques/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/utiliser-plusieurs-outils-geometriques/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/utiliser-plusieurs-outils-geometriques/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "choisir-la-bonne-methode-en-geometrie",
    title: "Choisir la bonne méthode en géométrie",
    domain: "Géométrie",
    skill: "Identifier la démarche géométrique la plus adaptée à une situation donnée.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/choisir-la-bonne-methode-en-geometrie/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/choisir-la-bonne-methode-en-geometrie/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/choisir-la-bonne-methode-en-geometrie/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/choisir-la-bonne-methode-en-geometrie/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/choisir-la-bonne-methode-en-geometrie/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/choisir-la-bonne-methode-en-geometrie/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "lire-une-maquette-ou-un-plan-simplifie",
    title: "Lire une maquette ou un plan simplifié",
    domain: "Géométrie",
    skill: "Interpréter une représentation simplifiée d'un espace réel (maquette, plan).",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/lire-une-maquette-ou-un-plan-simplifie/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/lire-une-maquette-ou-un-plan-simplifie/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/lire-une-maquette-ou-un-plan-simplifie/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/lire-une-maquette-ou-un-plan-simplifie/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/lire-une-maquette-ou-un-plan-simplifie/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/lire-une-maquette-ou-un-plan-simplifie/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "resoudre-une-mission-geometrique-complete",
    title: "Résoudre une mission géométrique complète",
    domain: "Géométrie",
    skill: "Mobiliser plusieurs notions géométriques pour mener à bien une mission complexe.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/resoudre-une-mission-geometrique-complete/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/resoudre-une-mission-geometrique-complete/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/resoudre-une-mission-geometrique-complete/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/resoudre-une-mission-geometrique-complete/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/resoudre-une-mission-geometrique-complete/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/resoudre-une-mission-geometrique-complete/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "reconnaitre-le-patron-dun-solide",
    title: "Reconnaître le patron d'un solide",
    domain: "Géométrie",
    skill: "Associer un patron à plat au solide qu'il permet de construire par pliage.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-le-patron-dun-solide/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-le-patron-dun-solide/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-le-patron-dun-solide/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-le-patron-dun-solide/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-le-patron-dun-solide/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-le-patron-dun-solide/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "reconnaitre-et-decrire-des-polygones",
    title: "Reconnaître et décrire des polygones",
    domain: "Géométrie",
    skill: "Identifier et nommer des polygones selon leur nombre de côtés et leurs propriétés.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-et-decrire-des-polygones/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-et-decrire-des-polygones/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-et-decrire-des-polygones/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-et-decrire-des-polygones/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-et-decrire-des-polygones/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-et-decrire-des-polygones/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "se-reperer-sur-un-plan",
    title: "Se repérer sur un plan",
    domain: "Géométrie",
    skill: "Localiser et décrire la position d'un élément sur un plan.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/se-reperer-sur-un-plan/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/se-reperer-sur-un-plan/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/se-reperer-sur-un-plan/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/se-reperer-sur-un-plan/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/se-reperer-sur-un-plan/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/se-reperer-sur-un-plan/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "construire-un-carre-et-un-rectangle",
    title: "Construire un carré et un rectangle",
    domain: "Géométrie",
    skill: "Tracer un carré ou un rectangle de dimensions données avec les instruments adaptés.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/construire-un-carre-et-un-rectangle/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/construire-un-carre-et-un-rectangle/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/construire-un-carre-et-un-rectangle/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/construire-un-carre-et-un-rectangle/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/construire-un-carre-et-un-rectangle/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/construire-un-carre-et-un-rectangle/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "construire-un-triangle-a-partir-de-mesures",
    title: "Construire un triangle à partir de mesures",
    domain: "Géométrie",
    skill: "Tracer un triangle dont les longueurs des côtés ou les angles sont donnés.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/construire-un-triangle-a-partir-de-mesures/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/construire-un-triangle-a-partir-de-mesures/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/construire-un-triangle-a-partir-de-mesures/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/construire-un-triangle-a-partir-de-mesures/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/construire-un-triangle-a-partir-de-mesures/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/construire-un-triangle-a-partir-de-mesures/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "rediger-un-programme-de-construction",
    title: "Rédiger un programme de construction",
    domain: "Géométrie",
    skill: "Rédiger les étapes permettant de reproduire une figure géométrique donnée.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/rediger-un-programme-de-construction/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/rediger-un-programme-de-construction/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/rediger-un-programme-de-construction/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/rediger-un-programme-de-construction/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/rediger-un-programme-de-construction/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/rediger-un-programme-de-construction/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "reconnaitre-une-situation-de-symetrie-axiale",
    title: "Reconnaître une situation de symétrie axiale",
    domain: "Géométrie",
    skill: "Identifier si une figure ou une situation présente un axe de symétrie.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-une-situation-de-symetrie-axiale/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-une-situation-de-symetrie-axiale/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-une-situation-de-symetrie-axiale/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-une-situation-de-symetrie-axiale/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/reconnaitre-une-situation-de-symetrie-axiale/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/reconnaitre-une-situation-de-symetrie-axiale/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "identifier-et-comparer-des-angles",
    title: "Identifier et comparer des angles",
    domain: "Géométrie",
    skill: "Reconnaître les types d'angles (aigu, droit, obtus) et les comparer.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/identifier-et-comparer-des-angles/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/identifier-et-comparer-des-angles/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/identifier-et-comparer-des-angles/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/identifier-et-comparer-des-angles/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/identifier-et-comparer-des-angles/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/identifier-et-comparer-des-angles/f3.pdf",
      },
    ],
  },
  {
    notionSlug: "mesurer-un-angle-avec-un-rapporteur",
    title: "Mesurer un angle avec un rapporteur",
    domain: "Géométrie",
    skill: "Utiliser un rapporteur pour mesurer et tracer des angles de valeur donnée.",
    sheets: [
      {
        id: "f1",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/mesurer-un-angle-avec-un-rapporteur/f1.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/mesurer-un-angle-avec-un-rapporteur/f1.pdf",
      },
      {
        id: "f2",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/mesurer-un-angle-avec-un-rapporteur/f2.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/mesurer-un-angle-avec-un-rapporteur/f2.pdf",
      },
      {
        id: "f3",
        status: "available",
        imageHref: "/fiches/cm2/mathematiques/mesurer-un-angle-avec-un-rapporteur/f3.png",
        pdfHref: "/fiches/cm2/mathematiques-pdf/mesurer-un-angle-avec-un-rapporteur/f3.pdf",
      },
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
  return sheet.status === "available" && Boolean(sheet.imageHref);
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

// Registre des fiches imprimables CM2 — Mathématiques.
// Déclare uniquement les feuilles dont le fichier image existe réellement
// dans public/ressources/cm2/mathematiques/<notion>/.
// Aucun fichier fictif, aucun href inventé : 1 entrée = 1 fichier vérifié.

import { getPublicStatus, type PublicStatus } from "@/content/public-status";

export type Cm2MathFicheSheetId = "f1" | "f2" | "f3";

export type Cm2MathFicheSheet = {
  sheet: Cm2MathFicheSheetId;
  label: string;
  href: string;
  status: PublicStatus;
};

export type Cm2MathFicheCompleteness = "complete" | "partial";

export type Cm2MathFicheNotion = {
  slug: string;
  title: string;
  sheets: Cm2MathFicheSheet[];
  completeness: Cm2MathFicheCompleteness;
};

const SHEET_LABELS: Record<Cm2MathFicheSheetId, string> = {
  f1: "Feuille 1 — Situation initiale et mini-leçon",
  f2: "Feuille 2 — Exercices d'application",
  f3: "Feuille 3 — Évaluation courte",
};

function buildNotion(
  slug: string,
  title: string,
  sheets: Cm2MathFicheSheetId[],
): Cm2MathFicheNotion {
  return {
    slug,
    title,
    sheets: sheets.map((sheet) => ({
      sheet,
      label: SHEET_LABELS[sheet],
      href: `/ressources/cm2/mathematiques/${slug}/cm2-maths-${slug}-${sheet}.png`,
      status: getPublicStatus("disponible"),
    })),
    completeness: sheets.length === 3 ? "complete" : "partial",
  };
}

// Seules les notions pour lesquelles au moins un fichier réel a été vérifié
// (audit visuel + structurel) figurent ici. Aucune notion à 0 feuille n'est
// déclarée : elle ne doit pas apparaître dans le catalogue.
export const cm2MathematiquesFiches: Cm2MathFicheNotion[] = [
  // ── Nombres et calcul ─────────────────────────────────────────────────────
  buildNotion("additionner-des-decimaux", "Additionner des nombres décimaux", ["f1"]),
  buildNotion("soustraire-des-nombres-decimaux", "Soustraire des nombres décimaux", ["f3"]),

  // ── Grandeurs et mesures ──────────────────────────────────────────────────
  buildNotion(
    "convertir-des-unites-de-contenance",
    "Convertir des unités de contenance",
    ["f1"],
  ),
  buildNotion(
    "convertir-des-unites-de-duree",
    "Convertir des unités de durée",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "convertir-des-unites-de-longueur",
    "Convertir des unités de longueur",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "convertir-des-unites-de-masse",
    "Convertir des unités de masse",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "convertir-des-unites-daire-simples",
    "Convertir des unités d'aire simples",
    ["f2"],
  ),
  buildNotion(
    "verifier-la-vraisemblance-dun-resultat",
    "Vérifier la vraisemblance d'un résultat",
    ["f3"],
  ),
  buildNotion(
    "utiliser-un-schema-pour-resoudre-un-probleme",
    "Utiliser un schéma pour résoudre un problème",
    ["f3"],
  ),

  // ── Géométrie ─────────────────────────────────────────────────────────────
  buildNotion(
    "construire-un-angle-avec-un-rapporteur",
    "Construire un angle avec un rapporteur",
    ["f1"],
  ),
  buildNotion(
    "construire-un-carre-et-un-rectangle",
    "Construire un carré et un rectangle",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "construire-un-cercle-avec-un-compas",
    "Construire un cercle avec un compas",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "construire-un-triangle-a-partir-de-mesures",
    "Construire un triangle à partir de mesures données",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "completer-une-figure-par-symetrie-axiale",
    "Compléter une figure par symétrie axiale",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "reconnaitre-une-situation-de-symetrie-axiale",
    "Reconnaître une situation de symétrie axiale",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "reconnaitre-et-decrire-des-triangles",
    "Reconnaître et décrire des triangles",
    ["f1", "f2"],
  ),
  buildNotion(
    "reproduire-une-figure-geometrique",
    "Reproduire une figure géométrique",
    ["f1", "f3"],
  ),
  buildNotion(
    "tracer-des-droites-perpendiculaires",
    "Tracer des droites perpendiculaires",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "identifier-et-comparer-des-angles",
    "Identifier et comparer des angles",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "mesurer-un-angle-avec-un-rapporteur",
    "Mesurer un angle avec un rapporteur",
    ["f1", "f2", "f3"],
  ),
];

export function getCm2MathFicheBySlug(slug: string): Cm2MathFicheNotion | undefined {
  return cm2MathematiquesFiches.find((notion) => notion.slug === slug);
}

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
  buildNotion("additionner-des-decimaux", "Additionner des nombres décimaux", ["f1", "f2"]),
  buildNotion("arrondir-des-nombres-decimaux", "Arrondir des nombres décimaux", ["f1", "f2"]),
  buildNotion("decomposer-une-fraction", "Décomposer une fraction", ["f1", "f2", "f3"]),
  buildNotion("encadrer-des-nombres-decimaux", "Encadrer des nombres décimaux", ["f1", "f2", "f3"]),
  buildNotion("passer-une-fraction-a-un-nombre-decimal", "Passer d'une fraction à un nombre décimal", ["f1", "f2", "f3"]),
  buildNotion("placer-des-fractions-sur-une-droite-graduee", "Placer des fractions sur une droite graduée", ["f1", "f2", "f3"]),
  buildNotion("ranger-des-nombres-decimaux", "Ranger des nombres décimaux", ["f1", "f2", "f3"]),
  buildNotion("comparer-des-nombres-decimaux", "Comparer des nombres décimaux", ["f1"]),
  buildNotion("passage-a-l-unite", "Passage à l'unité", ["f2", "f3"]),
  buildNotion("soustraire-des-nombres-decimaux", "Soustraire des nombres décimaux", ["f1", "f2", "f3"]),

  // ── Grandeurs et mesures ──────────────────────────────────────────────────
  buildNotion(
    "convertir-des-unites-de-contenance",
    "Convertir des unités de contenance",
    ["f1", "f2", "f3"],
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
    ["f2", "f3"],
  ),
  buildNotion(
    "verifier-la-vraisemblance-dun-resultat",
    "Vérifier la vraisemblance d'un résultat",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "utiliser-un-schema-pour-resoudre-un-probleme",
    "Utiliser un schéma pour résoudre un problème",
    ["f1", "f2", "f3"],
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
    ["f1", "f2", "f3"],
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
  buildNotion(
    "tracer-des-droites-paralleles",
    "Tracer des droites parallèles",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "reconnaitre-et-decrire-des-polygones",
    "Reconnaître et décrire des polygones",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "reconnaitre-le-patron-dun-solide",
    "Reconnaître le patron d'un solide",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "decrire-un-deplacement-sur-quadrillage",
    "Décrire un déplacement sur quadrillage",
    ["f1", "f2"],
  ),
  buildNotion(
    "se-reperer-sur-un-plan",
    "Se repérer sur un plan",
    ["f1", "f2", "f3"],
  ),

  // ── Organisation et gestion de données ───────────────────────────────────
  buildNotion(
    "lire-et-organiser-des-donnees",
    "Lire et organiser des données",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "lire-et-utiliser-un-tableau-de-donnees",
    "Lire et utiliser un tableau de données",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "lire-un-graphique-simple",
    "Lire un graphique simple",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "lire-un-tableau-a-double-entree",
    "Lire un tableau à double entrée",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "lire-une-maquette-ou-un-plan-simplifie",
    "Lire une maquette ou un plan simplifié",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "organiser-des-donnees-dans-un-tableau",
    "Organiser des données dans un tableau",
    ["f1", "f2", "f3"],
  ),

  // ── Grandeurs et mesures (compléments) ───────────────────────────────────
  buildNotion(
    "lire-l-heure-et-comprendre-les-durees",
    "Lire l'heure et comprendre les durées",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "resoudre-des-problemes-de-durees",
    "Résoudre des problèmes de durées",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "problemes-d-aire-avec-conversions-simples",
    "Problèmes d'aire avec conversions simples",
    ["f1", "f2", "f3"],
  ),

  // ── Nombres et calcul (compléments) ──────────────────────────────────────
  buildNotion(
    "comprendre-la-moyenne-simple",
    "Comprendre la moyenne simple",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "resoudre-des-problemes-avec-une-moyenne-simple",
    "Résoudre des problèmes avec une moyenne simple",
    ["f1"],
  ),
  buildNotion(
    "resoudre-un-probleme-de-proportionnalite",
    "Résoudre un problème de proportionnalité",
    ["f1"],
  ),
  buildNotion(
    "resoudre-des-problemes-a-plusieurs-etapes-avec-des-donnees",
    "Résoudre des problèmes à plusieurs étapes avec des données",
    ["f1"],
  ),
  buildNotion(
    "utiliser-un-tableau-pour-resoudre-un-probleme",
    "Utiliser un tableau pour résoudre un problème",
    ["f1", "f2", "f3"],
  ),

  // ── Géométrie (compléments) ───────────────────────────────────────────────
  buildNotion(
    "agrandir-ou-reduire-une-figure",
    "Agrandir ou réduire une figure",
    ["f1", "f2"],
  ),
  buildNotion(
    "construire-un-graphique-a-partir-d-un-tableau",
    "Construire un graphique à partir d'un tableau",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "rediger-un-programme-de-construction",
    "Rédiger un programme de construction",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "se-reperer-dans-un-espace-reel",
    "Se repérer dans un espace réel",
    ["f1", "f2"],
  ),
  buildNotion(
    "se-reperer-sur-un-plan-quadrille",
    "Se repérer sur un plan quadrillé",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "choisir-le-bon-outil-geometrique",
    "Choisir le bon outil géométrique",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "choisir-la-bonne-methode-en-geometrie",
    "Choisir la bonne méthode en géométrie",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "rediger-une-reponse-mathematique-complete",
    "Rédiger une réponse mathématique complète",
    ["f1", "f2", "f3"],
  ),

  // ── Organisation et gestion de données (compléments) ─────────────────────
  buildNotion(
    "lire-et-construire-des-graphiques-simples",
    "Lire et construire des graphiques simples",
    ["f1", "f2"],
  ),
  buildNotion(
    "interpreter-des-donnees",
    "Interpréter des données",
    ["f1", "f2", "f3"],
  ),

  // ── Grandeurs et mesures (lot 4) ─────────────────────────────────────────
  buildNotion(
    "estimer-l-ordre-de-grandeur-d-un-resultat",
    "Estimer l'ordre de grandeur d'un résultat",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "aire-du-carre-et-du-rectangle",
    "Aire du carré et du rectangle",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "comprendre-la-notion-d-aire",
    "Comprendre la notion d'aire",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "distinguer-aire-et-perimetre",
    "Distinguer aire et périmètre",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "connaitre-les-unites-d-aire",
    "Connaître les unités d'aire",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "perimetre-du-carre-et-du-rectangle",
    "Périmètre du carré et du rectangle",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "resoudre-des-problemes-de-mesures",
    "Résoudre des problèmes de mesures",
    ["f1", "f2", "f3"],
  ),

  // ── Nombres et calcul (lot 4) ─────────────────────────────────────────────
  buildNotion(
    "multiplier-un-nombre-decimal-par-un-entier",
    "Multiplier un nombre décimal par un entier",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "diviser-un-nombre-decimal-par-un-entier",
    "Diviser un nombre décimal par un entier",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "resoudre-un-probleme-avec-des-fractions-simples",
    "Résoudre un problème avec des fractions simples",
    ["f1"],
  ),
  buildNotion(
    "resoudre-un-probleme-avec-des-nombres-decimaux",
    "Résoudre un problème avec des nombres décimaux",
    ["f1"],
  ),
  buildNotion(
    "problemes-avec-des-fractions-simples",
    "Problèmes avec des fractions simples",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "problemes-avec-des-nombres-decimaux",
    "Problèmes avec des nombres décimaux",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "problemes-avec-une-moyenne-simple",
    "Problèmes avec une moyenne simple",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "problemes-a-plusieurs-etapes-avec-des-donnees",
    "Problèmes à plusieurs étapes avec des données",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "resoudre-des-problemes-avec-des-nombres-decimaux",
    "Résoudre des problèmes avec des nombres décimaux",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "comprendre-les-pourcentages-simples",
    "Comprendre les pourcentages simples",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "reconnaitre-une-situation-de-proportionnalite",
    "Reconnaître une situation de proportionnalité",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "utiliser-un-tableau-de-proportionnalite",
    "Utiliser un tableau de proportionnalité",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "utiliser-fractions-et-decimaux",
    "Utiliser fractions et décimaux",
    ["f1", "f2", "f3"],
  ),

  // ── Géométrie (lot 4) ─────────────────────────────────────────────────────
  buildNotion(
    "reconnaitre-et-decrire-des-solides",
    "Reconnaître et décrire des solides",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "reconnaitre-et-decrire-un-cercle",
    "Reconnaître et décrire un cercle",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "construire-un-graphique-en-barres",
    "Construire un graphique en barres",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "utiliser-plusieurs-outils-geometriques",
    "Utiliser plusieurs outils géométriques",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "utiliser-le-vocabulaire-de-position",
    "Utiliser le vocabulaire de position",
    ["f2"],
  ),
  buildNotion(
    "utiliser-un-schema-en-barres",
    "Utiliser un schéma en barres",
    ["f1", "f2", "f3"],
  ),

  // ── Lot 5 — nouvelles notions ──────────────────────────────────────────────
  buildNotion(
    "calculer-le-perimetre-d-un-polygone",
    "Calculer le périmètre d'un polygone",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "calculer-un-pourcentage-simple-d-une-quantite",
    "Calculer un pourcentage simple d'une quantité",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "choisir-les-bonnes-operations",
    "Choisir les bonnes opérations",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "choisir-les-bonnes-operations-dans-un-probleme",
    "Choisir les bonnes opérations dans un problème",
    ["f1"],
  ),
  buildNotion(
    "comprendre-les-echelles-simples",
    "Comprendre les échelles simples",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "droites-perpendiculaires-et-paralleles",
    "Droites perpendiculaires et parallèles",
    ["f2", "f3"],
  ),
  buildNotion(
    "lire-un-programme-de-construction",
    "Lire un programme de construction",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "presenter-clairement-sa-demarche",
    "Présenter clairement sa démarche",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "problemes-de-proportionnalite",
    "Problèmes de proportionnalité",
    ["f1", "f2", "f3"],
  ),
  buildNotion(
    "utiliser-les-pourcentages-dans-des-situations-problemes",
    "Utiliser les pourcentages dans des situations-problèmes",
    ["f1", "f2", "f3"],
  ),
];

export function getCm2MathFicheBySlug(slug: string): Cm2MathFicheNotion | undefined {
  return cm2MathematiquesFiches.find((notion) => notion.slug === slug);
}

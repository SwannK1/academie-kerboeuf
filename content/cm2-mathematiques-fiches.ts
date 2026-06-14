// Registre des fiches pédagogiques Mathématiques CM2.
// Chaque notion liste uniquement les fichiers réellement présents dans
// public/fiches/cm2/mathematiques/. Règle absolue : aucun lien vers un fichier inexistant.
//
// Convention de nommage des fichiers :
//   cm2-maths-[domaine]-[notion]-f1.png       → fiche découverte / leçon
//   cm2-maths-[domaine]-[notion]-f2.png       → fiche entraînement
//   cm2-maths-[domaine]-[notion]-f3.png       → fiche approfondissement
//   cm2-maths-[domaine]-[notion]-evaluation.png → évaluation

const BASE = "/fiches/cm2/mathematiques";

export type FicheType = "f1" | "f2" | "f3" | "evaluation";

export type Cm2MathsFiche = {
  type: FicheType;
  label: string;
  url: string;
};

export type Cm2MathsNotion = {
  slug: string;
  title: string;
  domain: string;
  fiches: Cm2MathsFiche[];
};

function f(domainKey: string, notion: string, types: FicheType[]): Cm2MathsFiche[] {
  return types.map((type) => {
    const labels: Record<FicheType, string> = {
      f1: "F1",
      f2: "F2",
      f3: "F3",
      evaluation: "Évaluation",
    };
    return {
      type,
      label: labels[type],
      url: `${BASE}/cm2-maths-${domainKey}-${notion}-${type}.png`,
    };
  });
}

// ── Nombres ─────────────────────────────────────────────────────

const nombresNotions: Cm2MathsNotion[] = [
  {
    slug: "arrondir-decimaux",
    title: "Arrondir un nombre décimal",
    domain: "Nombres",
    fiches: f("nombres", "arrondir-decimaux", ["f1", "f2"]),
  },
  {
    slug: "comparer-decimaux",
    title: "Comparer des nombres décimaux",
    domain: "Nombres",
    fiches: f("nombres", "comparer-decimaux", ["f1"]),
  },
  {
    slug: "encadrer-decimaux",
    title: "Encadrer des nombres décimaux",
    domain: "Nombres",
    fiches: f("nombres", "encadrer-decimaux", ["f1", "f2", "f3"]),
  },
  {
    slug: "fraction-vers-decimal",
    title: "Passer d'une fraction à un nombre décimal",
    domain: "Nombres",
    fiches: f("nombres", "fraction-vers-decimal", ["f1", "f2", "f3"]),
  },
  {
    slug: "fractions-decimaux",
    title: "Fractions et nombres décimaux",
    domain: "Nombres",
    fiches: f("nombres", "fractions-decimaux", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "fractions-decomposer",
    title: "Décomposer une fraction",
    domain: "Nombres",
    fiches: f("nombres", "fractions-decomposer", ["f1", "f2", "f3"]),
  },
  {
    slug: "fractions-droite-graduee",
    title: "Placer une fraction sur une droite graduée",
    domain: "Nombres",
    fiches: f("nombres", "fractions-droite-graduee", ["f1", "f2", "f3"]),
  },
  {
    slug: "problemes-fractions",
    title: "Problèmes avec des fractions",
    domain: "Nombres",
    fiches: f("nombres", "problemes-fractions", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "ranger-decimaux",
    title: "Ranger des nombres décimaux",
    domain: "Nombres",
    fiches: f("nombres", "ranger-decimaux", ["f1", "f2", "f3"]),
  },
];

// ── Calcul ─────────────────────────────────────────────────────

const calculNotions: Cm2MathsNotion[] = [
  {
    slug: "addition-decimaux",
    title: "Addition de nombres décimaux",
    domain: "Calcul",
    fiches: f("calcul", "addition-decimaux", ["f1", "f2"]),
  },
  {
    slug: "soustraction-decimaux",
    title: "Soustraction de nombres décimaux",
    domain: "Calcul",
    fiches: f("calcul", "soustraction-decimaux", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "multiplication-decimaux",
    title: "Multiplication de nombres décimaux",
    domain: "Calcul",
    fiches: f("calcul", "multiplication-decimaux", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "division-decimaux",
    title: "Division de nombres décimaux",
    domain: "Calcul",
    fiches: f("calcul", "division-decimaux", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "reviser-nombres-calculs",
    title: "Réviser nombres et calculs",
    domain: "Calcul",
    fiches: f("calcul", "reviser-nombres-calculs", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "pourcentages-simples",
    title: "Les pourcentages simples",
    domain: "Calcul",
    fiches: f("calcul", "pourcentages-simples", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "pourcentage-quantite",
    title: "Le pourcentage d'une quantité",
    domain: "Calcul",
    fiches: f("calcul", "pourcentage-quantite", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "pourcentages-situations",
    title: "Les pourcentages en situation",
    domain: "Calcul",
    fiches: f("calcul", "pourcentages-situations", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "reconnaitre-proportionnalite",
    title: "Reconnaître une situation de proportionnalité",
    domain: "Calcul",
    fiches: f("calcul", "reconnaitre-proportionnalite", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "tableau-proportionnalite",
    title: "Le tableau de proportionnalité",
    domain: "Calcul",
    fiches: f("calcul", "tableau-proportionnalite", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "passage-unite",
    title: "Le passage à l'unité",
    domain: "Calcul",
    fiches: f("calcul", "passage-unite", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "problemes-proportionnalite",
    title: "Problèmes de proportionnalité",
    domain: "Calcul",
    fiches: f("calcul", "problemes-proportionnalite", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "choisir-operations",
    title: "Choisir la bonne opération",
    domain: "Calcul",
    fiches: f("calcul", "choisir-operations", ["f1", "f2", "f3"]),
  },
  {
    slug: "estimation-grandeur",
    title: "Estimer l'ordre de grandeur",
    domain: "Calcul",
    fiches: f("calcul", "estimation-grandeur", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "vraisemblance-resultat",
    title: "La vraisemblance d'un résultat",
    domain: "Calcul",
    fiches: f("calcul", "vraisemblance-resultat", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "schema-barres",
    title: "Le schéma en barres",
    domain: "Calcul",
    fiches: f("calcul", "schema-barres", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "schema-resolution",
    title: "Le schéma de résolution",
    domain: "Calcul",
    fiches: f("calcul", "schema-resolution", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "tableau-resolution",
    title: "Le tableau de résolution",
    domain: "Calcul",
    fiches: f("calcul", "tableau-resolution", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "demarche-resolution",
    title: "La démarche de résolution de problème",
    domain: "Calcul",
    fiches: f("calcul", "demarche-resolution", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "rediger-reponse",
    title: "Rédiger une réponse",
    domain: "Calcul",
    fiches: f("calcul", "rediger-reponse", ["f1", "f2", "f3", "evaluation"]),
  },
  {
    slug: "problemes-decimaux",
    title: "Problèmes avec des décimaux",
    domain: "Calcul",
    fiches: f("calcul", "problemes-decimaux", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "problemes-plurietapes",
    title: "Problèmes à plusieurs étapes",
    domain: "Calcul",
    fiches: f("calcul", "problemes-plurietapes", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "problemes-synthese",
    title: "Problèmes de synthèse",
    domain: "Calcul",
    fiches: f("calcul", "problemes-synthese", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "enquete-mathematique",
    title: "Enquête mathématique",
    domain: "Calcul",
    fiches: f("calcul", "enquete-mathematique", ["f2", "evaluation"]),
  },
  {
    slug: "preparer-6e",
    title: "Se préparer pour la 6e",
    domain: "Calcul",
    fiches: f("calcul", "preparer-6e", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "bilan-final",
    title: "Bilan final",
    domain: "Calcul",
    fiches: f("calcul", "bilan-final", ["f1", "f2"]),
  },
  {
    slug: "mission-finale",
    title: "Mission finale",
    domain: "Calcul",
    fiches: f("calcul", "mission-finale", ["f1", "f2"]),
  },
];

// ── Grandeurs et mesures ─────────────────────────────────────────────────────

const grandeursNotions: Cm2MathsNotion[] = [
  {
    slug: "conversion-longueur",
    title: "Convertir des longueurs",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "conversion-longueur", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "conversion-masse",
    title: "Convertir des masses",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "conversion-masse", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "conversion-contenance",
    title: "Convertir des contenances",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "conversion-contenance", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "conversion-duree",
    title: "Convertir des durées",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "conversion-duree", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "heure-durees",
    title: "L'heure et les durées",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "heure-durees", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "problemes-durees",
    title: "Problèmes de durées",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "problemes-durees", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "echelles-simples",
    title: "Les échelles simples",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "echelles-simples", ["f1", "f2"]),
  },
  {
    slug: "notion-aire",
    title: "La notion d'aire",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "notion-aire", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "unites-aire",
    title: "Les unités d'aire",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "unites-aire", ["f1", "f2"]),
  },
  {
    slug: "conversion-unite-aire",
    title: "Convertir des unités d'aire",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "conversion-unite-aire", ["f2", "evaluation"]),
  },
  {
    slug: "aire-rectangle-carre",
    title: "L'aire du rectangle et du carré",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "aire-rectangle-carre", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "perimetre-rectangle-carre",
    title: "Le périmètre du rectangle et du carré",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "perimetre-rectangle-carre", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "perimetre-polygone",
    title: "Le périmètre d'un polygone",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "perimetre-polygone", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "distinguer-aire-perimetre",
    title: "Distinguer aire et périmètre",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "distinguer-aire-perimetre", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "problemes-aire-conversions",
    title: "Problèmes : aires et conversions",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "problemes-aire-conversions", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "problemes-mesures",
    title: "Problèmes de mesures",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "problemes-mesures", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "reviser-grandeurs",
    title: "Réviser les grandeurs et mesures",
    domain: "Grandeurs et mesures",
    fiches: f("grandeurs", "reviser-grandeurs", ["f1", "f2", "evaluation"]),
  },
];

// ── Espace et géométrie ─────────────────────────────────────────────────────

const espaceNotions: Cm2MathsNotion[] = [
  {
    slug: "geometrie-repere-plan",
    title: "Se repérer sur un plan",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-repere-plan", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-repere-plan-quadrille",
    title: "Se repérer sur un plan quadrillé",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-repere-plan-quadrille", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-repere-espace-reel",
    title: "Se repérer dans l'espace réel",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-repere-espace-reel", ["f1", "f2"]),
  },
  {
    slug: "geometrie-deplacement-quadrillage",
    title: "Se déplacer sur un quadrillage",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-deplacement-quadrillage", ["f1", "f2"]),
  },
  {
    slug: "geometrie-vocabulaire-position",
    title: "Le vocabulaire de position",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-vocabulaire-position", ["f2"]),
  },
  {
    slug: "geometrie-droites-paralleles-perpendiculaires",
    title: "Droites parallèles et perpendiculaires",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-droites-paralleles-perpendiculaires", ["f2", "evaluation"]),
  },
  {
    slug: "geometrie-tracer-droites-paralleles",
    title: "Tracer des droites parallèles",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-tracer-droites-paralleles", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-tracer-droites-perpendiculaires",
    title: "Tracer des droites perpendiculaires",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-tracer-droites-perpendiculaires", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-construire-angle",
    title: "Construire un angle",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-construire-angle", ["f1"]),
  },
  {
    slug: "geometrie-mesurer-angle",
    title: "Mesurer un angle",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-mesurer-angle", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-identifier-angles",
    title: "Identifier des angles",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-identifier-angles", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-outil-geometrique",
    title: "L'outil géométrique",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-outil-geometrique", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-outils-geometriques",
    title: "Les outils géométriques",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-outils-geometriques", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-methode-geometrie",
    title: "Méthode en géométrie",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-methode-geometrie", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-cercle",
    title: "Le cercle",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-cercle", ["f2", "evaluation"]),
  },
  {
    slug: "geometrie-cercle-compas",
    title: "Le cercle au compas",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-cercle-compas", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-triangles",
    title: "Les triangles",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-triangles", ["f1", "f2"]),
  },
  {
    slug: "geometrie-construire-triangle",
    title: "Construire un triangle",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-construire-triangle", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-quadrilateres",
    title: "Les quadrilatères",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-quadrilateres", ["evaluation"]),
  },
  {
    slug: "geometrie-construire-carre-rectangle",
    title: "Construire un carré ou un rectangle",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-construire-carre-rectangle", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-polygones",
    title: "Les polygones",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-polygones", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-programme-construction",
    title: "Le programme de construction",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-programme-construction", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-rediger-programme",
    title: "Rédiger un programme de construction",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-rediger-programme", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-reproduire-figure",
    title: "Reproduire une figure",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-reproduire-figure", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-symetrie-axiale",
    title: "La symétrie axiale",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-symetrie-axiale", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-symetrie-axiale-completer",
    title: "Compléter une figure par symétrie axiale",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-symetrie-axiale-completer", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-agrandir-reduire-figure",
    title: "Agrandir ou réduire une figure",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-agrandir-reduire-figure", ["f1", "f2"]),
  },
  {
    slug: "geometrie-solides",
    title: "Les solides",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-solides", ["f2", "evaluation"]),
  },
  {
    slug: "geometrie-patron-solide",
    title: "Le patron d'un solide",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-patron-solide", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-maquette-plan",
    title: "De la maquette au plan",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-maquette-plan", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-reviser-geometrie",
    title: "Réviser la géométrie",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-reviser-geometrie", ["f2"]),
  },
  {
    slug: "geometrie-mission-geometrique",
    title: "Mission géométrique",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-mission-geometrique", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "geometrie-mission-geometrie-finale",
    title: "Mission géométrie finale",
    domain: "Espace et géométrie",
    fiches: f("espace", "geometrie-mission-geometrie-finale", ["f1", "f2"]),
  },
];

// ── Données ─────────────────────────────────────────────────────

const donneesNotions: Cm2MathsNotion[] = [
  {
    slug: "organiser-donnees",
    title: "Organiser des données",
    domain: "Données",
    fiches: f("donnees", "organiser-donnees", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "tableau-donnees",
    title: "Lire un tableau de données",
    domain: "Données",
    fiches: f("donnees", "tableau-donnees", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "organiser-tableau",
    title: "Organiser un tableau",
    domain: "Données",
    fiches: f("donnees", "organiser-tableau", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "tableau-double-entree",
    title: "Le tableau à double entrée",
    domain: "Données",
    fiches: f("donnees", "tableau-double-entree", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "graphiques-simples",
    title: "Graphiques simples",
    domain: "Données",
    fiches: f("donnees", "graphiques-simples", ["f1", "f2"]),
  },
  {
    slug: "lire-graphique",
    title: "Lire un graphique",
    domain: "Données",
    fiches: f("donnees", "lire-graphique", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "graphique-barres",
    title: "Lire un graphique en barres",
    domain: "Données",
    fiches: f("donnees", "graphique-barres", ["f2", "evaluation"]),
  },
  {
    slug: "graphique-tableau",
    title: "Du graphique au tableau",
    domain: "Données",
    fiches: f("donnees", "graphique-tableau", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "interpreter-donnees",
    title: "Interpréter des données",
    domain: "Données",
    fiches: f("donnees", "interpreter-donnees", ["f1", "f2", "evaluation"]),
  },
  {
    slug: "moyenne-simple",
    title: "Calculer une moyenne simple",
    domain: "Données",
    fiches: f("donnees", "moyenne-simple", ["f1", "f2", "evaluation"]),
  },
];

// ── Registre complet ──────────────────────────────────────────────────────────

export const cm2MathsFiches: Cm2MathsNotion[] = [
  ...nombresNotions,
  ...calculNotions,
  ...grandeursNotions,
  ...espaceNotions,
  ...donneesNotions,
];

// ── Accesseurs ────────────────────────────────────────────────────────────────

export function getCm2MathsFichesByDomain(domain: string): Cm2MathsNotion[] {
  return cm2MathsFiches.filter((n) => n.domain === domain);
}

export function getCm2MathsNotionBySlug(slug: string): Cm2MathsNotion | undefined {
  return cm2MathsFiches.find((n) => n.slug === slug);
}

export const CM2_MATHS_DOMAINS = [
  "Nombres",
  "Calcul",
  "Grandeurs et mesures",
  "Espace et géométrie",
  "Données",
] as const;

export type Cm2MathsDomain = (typeof CM2_MATHS_DOMAINS)[number];

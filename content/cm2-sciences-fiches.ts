// Registre des fiches imprimables Sciences et technologie CM2.
// Aucune fiche réelle n'existe encore : tous les statuts sont "upcoming"
// et aucun champ sheets/href n'est renseigné (pas de faux PDF).

export type FicheSheet = {
  href: string;
};

export type Cm2ScienceFiche = {
  id: string;
  slug: string;
  title: string;
  domain: string;
  skill: string;
  status: "available" | "upcoming";
  sheets?: {
    f1?: FicheSheet;
    f2?: FicheSheet;
    f3?: FicheSheet;
  };
};

export const cm2SciencesFiches: Cm2ScienceFiche[] = [
  // ── Observer et décrire ──────────────────────────────────────────────────
  {
    id: "sciences-demarche-observer-protocole",
    slug: "suivre-un-protocole-dobservation",
    title: "Suivre un protocole d'observation",
    domain: "Observer et décrire",
    skill: "Démarche scientifique",
    status: "upcoming",
  },

  // ── Formuler une hypothèse ────────────────────────────────────────────────
  {
    id: "sciences-demarche-hypothese-formuler",
    slug: "enoncer-et-justifier-une-hypothese",
    title: "Énoncer et justifier une hypothèse",
    domain: "Formuler une hypothèse",
    skill: "Démarche scientifique",
    status: "upcoming",
  },

  // ── Conclure et transmettre ───────────────────────────────────────────────
  {
    id: "sciences-demarche-conclure-compte-rendu",
    slug: "rediger-un-compte-rendu-court",
    title: "Rédiger un compte rendu court",
    domain: "Conclure et transmettre",
    skill: "Démarche scientifique",
    status: "upcoming",
  },

  // ── États et changements de la matière ──────────────────────────────────
  {
    id: "sciences-matiere-etats-identifier",
    slug: "identifier-les-trois-etats-de-la-matiere",
    title: "Identifier les trois états de la matière",
    domain: "États et changements de la matière",
    skill: "Matière, mouvement, énergie, information",
    status: "upcoming",
  },
  {
    id: "sciences-matiere-etats-changements",
    slug: "decrire-les-changements-detat-de-leau",
    title: "Décrire les changements d'état de l'eau",
    domain: "États et changements de la matière",
    skill: "Matière, mouvement, énergie, information",
    status: "upcoming",
  },

  // ── Sources d'énergie ────────────────────────────────────────────────────
  {
    id: "sciences-energie-sources",
    slug: "distinguer-les-sources-denergie-renouvelables-et-non-renouvelables",
    title: "Distinguer les sources d'énergie renouvelables et non renouvelables",
    domain: "Sources d'énergie",
    skill: "Matière, mouvement, énergie, information",
    status: "upcoming",
  },
  {
    id: "sciences-energie-electricite",
    slug: "decrire-un-circuit-electrique-simple",
    title: "Décrire un circuit électrique simple",
    domain: "Sources d'énergie",
    skill: "Matière, mouvement, énergie, information",
    status: "upcoming",
  },

  // ── Signaux et information ───────────────────────────────────────────────
  {
    id: "sciences-info-signaux",
    slug: "reconnaitre-differents-types-de-signaux",
    title: "Reconnaître différents types de signaux (lumineux, sonores, numériques)",
    domain: "Signaux et information",
    skill: "Matière, mouvement, énergie, information",
    status: "upcoming",
  },

  // ── Classification du vivant ────────────────────────────────────────────
  {
    id: "sciences-vivant-classer",
    slug: "classer-les-etres-vivants-selon-des-criteres-communs",
    title: "Classer les êtres vivants selon des critères communs",
    domain: "Classification du vivant",
    skill: "Le vivant",
    status: "upcoming",
  },
  {
    id: "sciences-vivant-cellule",
    slug: "comprendre-que-tout-etre-vivant-est-constitue-de-cellules",
    title: "Comprendre que tout être vivant est constitué de cellules",
    domain: "Classification du vivant",
    skill: "Le vivant",
    status: "upcoming",
  },

  // ── Fonctions vitales ────────────────────────────────────────────────────
  {
    id: "sciences-vivant-nutrition",
    slug: "decrire-les-besoins-nutritionnels-dun-etre-vivant",
    title: "Décrire les besoins nutritionnels d'un être vivant",
    domain: "Fonctions vitales",
    skill: "Le vivant",
    status: "upcoming",
  },
  {
    id: "sciences-vivant-reproduction",
    slug: "distinguer-les-modes-de-reproduction-chez-les-animaux-et-les-vegetaux",
    title: "Distinguer les modes de reproduction chez les animaux et les végétaux",
    domain: "Fonctions vitales",
    skill: "Le vivant",
    status: "upcoming",
  },

  // ── Objets techniques ────────────────────────────────────────────────────
  {
    id: "sciences-technologie-objets-fonction",
    slug: "identifier-la-fonction-dun-objet-technique",
    title: "Identifier la fonction d'un objet technique",
    domain: "Objets techniques",
    skill: "Matériaux et objets techniques",
    status: "upcoming",
  },
  {
    id: "sciences-technologie-objets-evolution",
    slug: "decrire-levolution-dun-objet-technique-dans-le-temps",
    title: "Décrire l'évolution d'un objet technique dans le temps",
    domain: "Objets techniques",
    skill: "Matériaux et objets techniques",
    status: "upcoming",
  },

  // ── Propriétés des matériaux ─────────────────────────────────────────────
  {
    id: "sciences-technologie-materiaux-proprietes",
    slug: "classer-des-materiaux-selon-leurs-proprietes-physiques",
    title: "Classer des matériaux selon leurs propriétés physiques",
    domain: "Propriétés des matériaux",
    skill: "Matériaux et objets techniques",
    status: "upcoming",
  },
  {
    id: "sciences-technologie-materiaux-recyclage",
    slug: "comprendre-linteret-du-recyclage-des-materiaux",
    title: "Comprendre l'intérêt du recyclage des matériaux",
    domain: "Propriétés des matériaux",
    skill: "Matériaux et objets techniques",
    status: "upcoming",
  },

  // ── Les écosystèmes ──────────────────────────────────────────────────────
  {
    id: "sciences-terre-ecosystemes-chaines",
    slug: "representer-et-analyser-une-chaine-alimentaire",
    title: "Représenter et analyser une chaîne alimentaire",
    domain: "Les écosystèmes",
    skill: "La planète Terre et l'environnement",
    status: "upcoming",
  },
  {
    id: "sciences-terre-ecosystemes-biodiversite",
    slug: "expliquer-limportance-de-la-biodiversite",
    title: "Expliquer l'importance de la biodiversité",
    domain: "Les écosystèmes",
    skill: "La planète Terre et l'environnement",
    status: "upcoming",
  },

  // ── Phénomènes naturels et risques ───────────────────────────────────────
  {
    id: "sciences-terre-phenomenes-meteo",
    slug: "decrire-les-phenomenes-meteorologiques-et-climatiques",
    title: "Décrire les phénomènes météorologiques et climatiques",
    domain: "Phénomènes naturels et risques",
    skill: "La planète Terre et l'environnement",
    status: "upcoming",
  },
  {
    id: "sciences-terre-seismes",
    slug: "comprendre-les-seismes-et-volcans-comme-phenomenes-naturels",
    title: "Comprendre les séismes et volcans comme phénomènes naturels",
    domain: "Phénomènes naturels et risques",
    skill: "La planète Terre et l'environnement",
    status: "upcoming",
  },
];

export function getCm2SciencesFicheBySlug(slug: string): Cm2ScienceFiche | undefined {
  return cm2SciencesFiches.find((f) => f.slug === slug);
}

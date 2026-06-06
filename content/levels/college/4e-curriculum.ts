// Programme 4e — Cycle 4, collège.
// Structure légère : matières et sous-domaines visibles, sans contenu pédagogique.
// Aucune page matière ou domaine 4e n'est publiée.
// Le site organise ; les PDF enseignent.

import type { ProgramStatus } from "@/content/program-types";
import type {
  CollegeMatiereCard,
  CollegeSubdomainCard,
} from "@/content/levels/college/6e-curriculum";

const statusUpcoming: ProgramStatus = "upcoming";

// ── Matières visibles sur le portail /college/4e ─────────────────────────────
// Aucune page matière 4e n'existe — les cartes restent non cliquables.

export const quatriemeMatieres: CollegeMatiereCard[] = [
  {
    slug: "francais",
    label: "Français",
    description:
      "Approfondir la lecture littéraire, l'écriture et l'étude de la langue en cycle 4.",
    status: statusUpcoming,
  },
  {
    slug: "mathematiques",
    label: "Mathématiques",
    description:
      "Nombres relatifs, proportionnalité, géométrie dans l'espace et premières fonctions.",
    status: statusUpcoming,
  },
  {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    description:
      "Du XVIIIe siècle aux débuts de la mondialisation — repères et méthodes.",
    status: statusUpcoming,
  },
  {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    description:
      "SVT, physique-chimie et technologie — observer, mesurer, modéliser.",
    status: statusUpcoming,
  },
  {
    slug: "anglais",
    label: "Anglais",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau B1.",
    status: statusUpcoming,
  },
  {
    slug: "arts-plastiques",
    label: "Arts plastiques",
    description:
      "Représentation, dispositif et regard — approfondir la pratique plastique.",
    status: statusUpcoming,
  },
  {
    slug: "education-musicale",
    label: "Éducation musicale",
    description:
      "Interpréter, écouter et comparer des œuvres musicales de styles variés.",
    status: statusUpcoming,
  },
  {
    slug: "eps",
    label: "EPS",
    description:
      "Performance, affrontement et expression — diversifier les activités physiques.",
    status: statusUpcoming,
  },
  {
    slug: "methodologie-college",
    label: "Méthodologie collège",
    description:
      "Renforcer l'autonomie, la rigueur et les stratégies d'apprentissage.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Français 4e ─────────────────────────────────────────────────
// Aucun href — aucune page domaine 4e n'existe.

export const quatriemeFrancaisSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "lecture",
    label: "Lecture",
    description:
      "Lire des textes littéraires variés, analyser le point de vue et argumenter.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "ecriture",
    label: "Écriture",
    description:
      "Produire des textes narratifs, descriptifs et argumentatifs organisés.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "etude-de-la-langue",
    label: "Étude de la langue",
    description:
      "Grammaire de la phrase et du texte, conjugaison, orthographe et vocabulaire.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "oral",
    label: "Oral",
    description:
      "Prendre la parole en public, débattre et écouter avec esprit critique.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Mathématiques 4e ────────────────────────────────────────────

export const quatriemeMathematiquesSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "nombres-calcul",
    label: "Nombres et calcul",
    description:
      "Relatifs, fractions, puissances, racines carrées et calcul littéral avancé.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "proportionnalite",
    label: "Proportionnalité",
    description:
      "Tableaux de proportionnalité, pourcentages, échelles et vitesses.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "grandeurs-mesures",
    label: "Grandeurs et mesures",
    description:
      "Aires, volumes de solides, Pythagore et trigonométrie dans le triangle rectangle.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "geometrie",
    label: "Géométrie",
    description:
      "Transformations, triangles semblables, cercles et géométrie dans l'espace.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "donnees-fonctions",
    label: "Données et fonctions",
    description:
      "Premières fonctions, tableaux de valeurs, représentations graphiques.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Histoire-Géographie-EMC 4e ──────────────────────────────────

export const quatriemeHistoireGeographieEmcSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "histoire",
    label: "Histoire",
    description:
      "Du XVIIIe siècle aux débuts du XXe — révolutions, industrialisation et colonisation.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "geographie",
    label: "Géographie",
    description:
      "La mondialisation — flux, espaces et inégalités à l'échelle mondiale.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "emc",
    label: "EMC",
    description:
      "Droits, libertés et responsabilités — construire le jugement citoyen.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "methodes-et-reperes",
    label: "Méthodes et repères",
    description:
      "Analyser des documents complexes, construire un paragraphe argumenté.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Sciences et technologie 4e ──────────────────────────────────

export const quatriemeSciencesTechnoSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "vivant",
    label: "Vivant",
    description:
      "Génétique, hérédité et diversité du vivant — comprendre la transmission de la vie.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "physique-chimie",
    label: "Physique-chimie",
    description:
      "Électricité, lumière, ondes et réactions chimiques — lois et modèles.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "technologie",
    label: "Technologie",
    description:
      "Conception d'objets techniques, programmation et systèmes automatisés.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "terre-environnement",
    label: "Terre et environnement",
    description:
      "Ressources, risques et responsabilité environnementale.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Anglais 4e ──────────────────────────────────────────────────

export const quatriemeAnglaisSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "comprehension-orale",
    label: "Compréhension orale",
    description:
      "Comprendre des documents audio et vidéo en anglais courant.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "comprehension-ecrite",
    label: "Compréhension écrite",
    description:
      "Lire et analyser des textes variés pour en dégager l'essentiel.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "expression-orale",
    label: "Expression orale",
    description:
      "Prendre la parole, décrire, raconter et interagir en anglais.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "expression-ecrite",
    label: "Expression écrite",
    description:
      "Rédiger des textes organisés, des lettres et des courts essais.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "culture",
    label: "Culture",
    description:
      "Découvrir les pays anglophones, leurs histoires et leurs enjeux contemporains.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Arts plastiques 4e ─────────────────────────────────────────

export const quatriemeArtsPlastiquesSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "representation-dispositif",
    label: "Représentation et dispositif",
    description:
      "Utiliser le point de vue, le cadrage et les dispositifs au service d'une intention.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "materiaux-outils",
    label: "Matériaux et outils",
    description:
      "Expérimenter des matériaux et des procédés plastiques variés.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "culture-artistique",
    label: "Culture artistique",
    description:
      "Analyser des œuvres en lien avec leur contexte historique et culturel.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Éducation musicale 4e ───────────────────────────────────────

export const quatriemeEducationMusicaleSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "interpretation",
    label: "Interprétation",
    description:
      "Interpréter un répertoire varié avec expressivité et justesse.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "ecoute-analyse",
    label: "Écoute et analyse",
    description:
      "Comparer des œuvres musicales selon des critères d'écoute précis.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "creation",
    label: "Création",
    description:
      "Composer et arranger des séquences musicales en groupe.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines EPS 4e ──────────────────────────────────────────────────────

export const quatriemeEpsSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "performance",
    label: "Performance",
    description:
      "Mesurer et améliorer ses performances dans des activités athlétiques.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "affrontement",
    label: "Affrontement",
    description:
      "Développer des stratégies d'affrontement individuel et collectif.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "expression-corporelle",
    label: "Expression corporelle",
    description:
      "Composer et interpréter des formes corporelles avec une intention artistique.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Méthodologie collège 4e ─────────────────────────────────────

export const quatriemeMethodologieSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "autonomie-organisation",
    label: "Autonomie et organisation",
    description:
      "Gérer son travail de façon autonome et anticiper les échéances.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "strategies-apprentissage",
    label: "Stratégies d'apprentissage",
    description:
      "Identifier ses points forts, ses difficultés et adapter ses méthodes.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "rediger-argumenter",
    label: "Rédiger et argumenter",
    description:
      "Construire une réponse argumentée dans toutes les disciplines.",
    status: statusUpcoming,
  },
];

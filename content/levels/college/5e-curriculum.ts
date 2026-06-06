// Programme 5e — Cycle 4, collège.
// Structure légère : matières et sous-domaines visibles, sans contenu pédagogique.
// Aucune page matière ou domaine 5e n'est publiée.
// Le site organise ; les PDF enseignent.

import type { ProgramStatus } from "@/content/program-types";
import type {
  CollegeMatiereCard,
  CollegeSubdomainCard,
} from "@/content/levels/college/6e-curriculum";

// ── Matières visibles sur le portail /college/5e ─────────────────────────────
// Aucune page matière 5e n'existe — les cartes restent non cliquables.

const statusUpcoming: ProgramStatus = "upcoming";

export const cinqiemeMatieres: CollegeMatiereCard[] = [
  {
    slug: "francais",
    label: "Français",
    description:
      "Approfondir la lecture, l'écriture, l'étude de la langue et l'oral au cycle 4.",
    status: statusUpcoming,
  },
  {
    slug: "mathematiques",
    label: "Mathématiques",
    description:
      "Consolider les nombres, la géométrie et la résolution de problèmes en cycle 4.",
    status: statusUpcoming,
  },
  {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    description:
      "Comprendre les sociétés, les espaces et les règles de vie commune au Moyen Âge et dans le monde.",
    status: statusUpcoming,
  },
  {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    description:
      "Observer, expérimenter et construire : SVT, physique-chimie et technologie réunis.",
    status: statusUpcoming,
  },
  {
    slug: "anglais",
    label: "Anglais",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau A2 vers B1.",
    status: statusUpcoming,
  },
  {
    slug: "arts-plastiques",
    label: "Arts plastiques",
    description:
      "Expérimenter, produire et analyser des œuvres plastiques en cycle 4.",
    status: statusUpcoming,
  },
  {
    slug: "education-musicale",
    label: "Éducation musicale",
    description:
      "Chanter, écouter et construire sa culture musicale en cycle 4.",
    status: statusUpcoming,
  },
  {
    slug: "eps",
    label: "EPS",
    description:
      "Agir, coopérer et progresser dans des activités physiques variées.",
    status: statusUpcoming,
  },
  {
    slug: "methodologie-college",
    label: "Méthodologie collège",
    description:
      "S'organiser, apprendre à apprendre et développer son autonomie au collège.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Français 5e ─────────────────────────────────────────────────
// Aucun href — aucune page domaine 5e n'existe.

export const cinqiemeFrancaisSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "lecture",
    label: "Lecture",
    description:
      "Lire des textes variés, identifier le point de vue, inférer et interpréter.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "ecriture",
    label: "Écriture",
    description:
      "Produire des textes organisés, argumentés et révisés avec méthode.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "etude-de-la-langue",
    label: "Étude de la langue",
    description:
      "Grammaire, conjugaison, orthographe et vocabulaire au service des écrits.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "oral",
    label: "Oral",
    description:
      "Prendre la parole, reformuler, débattre et écouter avec rigueur.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Mathématiques 5e ────────────────────────────────────────────

export const cinqiemeMathematiquesSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "nombres-calcul",
    label: "Nombres et calcul",
    description:
      "Relatifs, fractions, puissances et calcul littéral — élargir le domaine numérique.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "resolution-problemes",
    label: "Résolution de problèmes",
    description:
      "Modéliser une situation, choisir une procédure et justifier la démarche.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "grandeurs-mesures",
    label: "Grandeurs et mesures",
    description:
      "Aires, volumes, échelles et conversions — utiliser les unités avec précision.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "geometrie",
    label: "Géométrie",
    description:
      "Triangles, quadrilatères, cercles et transformations — construire et démontrer.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "organisation-donnees",
    label: "Organisation et gestion de données",
    description:
      "Tableaux, graphiques, proportionnalité et premières notions de probabilité.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Histoire-Géographie-EMC 5e ──────────────────────────────────

export const cinqiemeHistoireGeographieEmcSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "histoire",
    label: "Histoire",
    description:
      "Du Moyen Âge aux débuts de la modernité — repères chronologiques et sources historiques.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "geographie",
    label: "Géographie",
    description:
      "Habiter le monde — diversité des espaces, mobilités et enjeux environnementaux.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "emc",
    label: "EMC",
    description:
      "Droits, responsabilités et vivre ensemble — approfondir la citoyenneté.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "methodes-et-reperes",
    label: "Méthodes et repères",
    description:
      "Lire des documents variés, construire une réponse organisée et mémoriser les repères clés.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Sciences et technologie 5e ──────────────────────────────────

export const cinqiemeSciencesTechnoSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "vivant",
    label: "Vivant",
    description:
      "Reproduction, évolution et interactions des êtres vivants avec leur environnement.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "matiere-mouvement-energie",
    label: "Matière, mouvement, énergie, information",
    description:
      "Propriétés de la matière, forces, énergie et traitement de l'information.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "objets-techniques",
    label: "Objets techniques",
    description:
      "Concevoir, fabriquer et analyser des objets techniques simples.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "terre-environnement",
    label: "Terre et environnement",
    description:
      "Structure de la Terre, phénomènes géologiques et responsabilité environnementale.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Anglais 5e ──────────────────────────────────────────────────

export const cinqiemeAnglaisSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "comprehension-orale",
    label: "Compréhension orale",
    description:
      "Comprendre des documents audio et vidéo authentiques simples.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "comprehension-ecrite",
    label: "Compréhension écrite",
    description:
      "Lire des textes courants et dégager l'essentiel d'un document écrit.",
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
      "Écrire des messages, des récits courts et des textes organisés.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "culture",
    label: "Culture",
    description:
      "Découvrir les pays anglophones, leurs traditions et leurs modes de vie.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Arts plastiques 5e ─────────────────────────────────────────

export const cinqiemeArtsPlastiquesSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "image-objet-espace",
    label: "Image, objet et espace",
    description:
      "Explorer les relations entre image, objet et espace dans une production plastique.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "materiaux-outils",
    label: "Matériaux et outils",
    description:
      "Choisir et utiliser des matériaux et des outils adaptés à un projet plastique.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "culture-artistique",
    label: "Culture artistique",
    description:
      "Relier des productions à des œuvres de référence et développer un regard critique.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Éducation musicale 5e ───────────────────────────────────────

export const cinqiemeEducationMusicaleSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "chanter",
    label: "Chanter",
    description:
      "Interpréter un répertoire varié en travaillant la justesse et l'expressivité.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "ecouter-analyser",
    label: "Écouter et analyser",
    description:
      "Repérer la forme et les paramètres du son dans des œuvres variées.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "pratiquer-creer",
    label: "Pratiquer et créer",
    description:
      "Improviser, arranger et créer en groupe à partir de contraintes musicales.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines EPS 5e ──────────────────────────────────────────────────────

export const cinqiemeEpsSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "activites-physiques",
    label: "Activités physiques",
    description:
      "Courir, nager, sauter et lancer — développer les capacités motrices.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "sports-collectifs",
    label: "Sports collectifs",
    description:
      "Choisir des actions collectives efficaces dans un sport d'équipe.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "activites-physiques-artistiques",
    label: "Activités physiques artistiques",
    description:
      "Composer et interpréter des formes corporelles expressives.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Méthodologie collège 5e ─────────────────────────────────────

export const cinqiemeMethodologieSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "organisation-travail",
    label: "Organisation du travail",
    description:
      "Planifier les révisions et gérer les échéances sur plusieurs semaines.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "comprendre-memoriser",
    label: "Comprendre et mémoriser",
    description:
      "Utiliser des stratégies variées pour comprendre en profondeur et mémoriser durablement.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "rediger-structurer",
    label: "Rédiger et structurer",
    description:
      "Construire une réponse organisée et soignée dans toutes les matières.",
    status: statusUpcoming,
  },
];

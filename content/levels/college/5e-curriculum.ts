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

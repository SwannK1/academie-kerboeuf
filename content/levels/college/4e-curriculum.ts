// Programme 4e — Cycle 4, collège.
// Structure légère : matières et sous-domaines visibles, sans contenu pédagogique.
// Aucune page domaine 4e n'existe — tous les sous-domaines sont non cliquables.
// Les portails matière 4e sont générés par la route dynamique [level]/[subject].
// Le site organise ; les PDF enseignent.

import type { ProgramStatus } from "@/content/program-types";
import type {
  CollegeMatiereCard,
  CollegeSubdomainCard,
} from "@/content/levels/college/6e-curriculum";

const statusUpcoming: ProgramStatus = "upcoming";
const statusInProgress: ProgramStatus = "in-progress";

// ── Matières visibles sur le portail /college/4e ─────────────────────────────
// Les hrefs pointent vers les portails matière générés par la route dynamique.
// Aucune page domaine 4e n'existe — les portails s'afficheront avec des
// sous-domaines "À venir".
//
// Activation intentionnelle : les 5 matières sont en status "in-progress" et
// leurs portails /college/4e/[subject] sont générés via getCollegeSubjectStaticParams().
// Les sous-domaines restent en "upcoming" — aucun contenu pédagogique n'est lié.
// Décision documentée le 2026-05-18 lors de la Mission 5 (cohérence données).

export const quatriemeMatieres: CollegeMatiereCard[] = [
  {
    slug: "francais",
    label: "Français",
    description:
      "Approfondir la lecture littéraire, l'écriture et l'étude de la langue en cycle 4.",
    status: statusInProgress,
    href: "/college/4e/francais",
  },
  {
    slug: "mathematiques",
    label: "Mathématiques",
    description:
      "Nombres relatifs, proportionnalité, géométrie dans l'espace et premières fonctions.",
    status: statusInProgress,
    href: "/college/4e/mathematiques",
  },
  {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    description:
      "Du XVIIIe siècle aux débuts de la mondialisation — repères et méthodes.",
    status: statusInProgress,
    href: "/college/4e/histoire-geographie-emc",
  },
  {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    description:
      "SVT, physique-chimie et technologie — observer, mesurer, modéliser.",
    status: statusInProgress,
    href: "/college/4e/sciences-technologie",
  },
  {
    slug: "anglais",
    label: "Anglais",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau B1.",
    status: statusInProgress,
    href: "/college/4e/anglais",
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

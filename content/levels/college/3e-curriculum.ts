// Programme 3e — Cycle 4, collège.
// Structure légère : matières et sous-domaines visibles, sans contenu pédagogique.
// Aucune page domaine 3e n'existe — tous les sous-domaines sont non cliquables.
// Les portails matière 3e sont générés par la route dynamique [level]/[subject].
// Le site organise ; les PDF enseignent.

import type { ProgramStatus } from "@/content/program-types";
import type {
  CollegeMatiereCard,
  CollegeSubdomainCard,
} from "@/content/levels/college/6e-curriculum";

const statusUpcoming: ProgramStatus = "upcoming";
const statusInProgress: ProgramStatus = "in-progress";

// ── Matières visibles sur le portail /college/3e ─────────────────────────────
// Les hrefs pointent vers les portails matière générés par la route dynamique.
// Aucune page domaine 3e n'existe — les portails s'afficheront avec des
// sous-domaines "À venir".
//
// Activation intentionnelle : les 5 matières sont en status "in-progress" et
// leurs portails /college/3e/[subject] sont générés via getCollegeSubjectStaticParams().
// Les sous-domaines restent en "upcoming" — aucun contenu pédagogique n'est lié.
// Décision documentée le 2026-05-18 lors de la Mission 5 (cohérence données).

export const troisiemeMatieres: CollegeMatiereCard[] = [
  {
    slug: "francais",
    label: "Français",
    description:
      "Lecture, écriture, oral et étude de la langue — préparer l'épreuve de brevet.",
    status: statusInProgress,
    href: "/college/3e/francais",
  },
  {
    slug: "mathematiques",
    label: "Mathématiques",
    description:
      "Fonctions, probabilités, géométrie et calcul — préparer le brevet.",
    status: statusInProgress,
    href: "/college/3e/mathematiques",
  },
  {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    description:
      "Le monde depuis 1914 — repères chronologiques, géopolitiques et citoyens.",
    status: statusInProgress,
    href: "/college/3e/histoire-geographie-emc",
  },
  {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    description:
      "SVT, physique-chimie et technologie — consolider et préparer le lycée.",
    status: statusInProgress,
    href: "/college/3e/sciences-technologie",
  },
  {
    slug: "anglais",
    label: "Anglais",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau B1.",
    status: statusInProgress,
    href: "/college/3e/anglais",
  },
];

// ── Sous-domaines Français 3e ─────────────────────────────────────────────────
// Aucun href — aucune page domaine 3e n'existe.

export const troisiemeFrancaisSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "lecture",
    label: "Lecture",
    description:
      "Lire des textes littéraires et non littéraires, analyser et interpréter.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "ecriture",
    label: "Écriture",
    description:
      "Produire des textes argumentatifs, narratifs et réflexifs avec méthode.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "etude-de-la-langue",
    label: "Étude de la langue",
    description:
      "Grammaire, conjugaison, orthographe et vocabulaire — maîtrise au niveau brevet.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "oral",
    label: "Oral",
    description:
      "Prendre la parole, argumenter, débattre et préparer l'épreuve orale du brevet.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "preparation-brevet",
    label: "Préparation au brevet",
    description:
      "Méthodologie de l'épreuve de français — rédaction, dictée et questions de texte.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Mathématiques 3e ────────────────────────────────────────────

export const troisiemeMathematiquesSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "nombres-calcul",
    label: "Nombres et calcul",
    description:
      "Puissances, racines, calcul littéral et équations — consolider les fondamentaux.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "fonctions",
    label: "Fonctions",
    description:
      "Notion de fonction, fonctions linéaires et affines, représentations graphiques.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "grandeurs-mesures",
    label: "Grandeurs et mesures",
    description:
      "Trigonométrie, volumes, Pythagore et théorème de Thalès — maîtrise complète.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "geometrie",
    label: "Géométrie",
    description:
      "Transformations, démonstrations, géométrie dans l'espace et solides.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "probabilites-statistiques",
    label: "Probabilités et statistiques",
    description:
      "Probabilités, échantillonnage, tableaux croisés et statistiques descriptives.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "preparation-brevet",
    label: "Préparation au brevet",
    description:
      "Méthodologie de l'épreuve de mathématiques — exercices types et annales.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Histoire-Géographie-EMC 3e ──────────────────────────────────

export const troisiemeHistoireGeographieEmcSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "histoire",
    label: "Histoire",
    description:
      "Le monde depuis 1914 — guerres mondiales, décolonisation, Guerre froide et monde actuel.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "geographie",
    label: "Géographie",
    description:
      "La France et l'Union européenne dans le monde — territoires, mobilités, défis.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "emc",
    label: "EMC",
    description:
      "Démocratie, institutions, droits et engagement — construire le citoyen.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "methodes-brevet",
    label: "Méthodes brevet",
    description:
      "Analyser des documents, rédiger une réponse organisée et mémoriser les repères clés.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Sciences et technologie 3e ──────────────────────────────────

export const troisiemeSciencesTechnoSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "vivant",
    label: "Vivant",
    description:
      "Corps humain, immunité, nerveux et reproduction — bilan du cycle 4.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "physique-chimie",
    label: "Physique-chimie",
    description:
      "Énergie, circuits électriques, chimie organique — consolider et préparer le lycée.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "technologie",
    label: "Technologie",
    description:
      "Systèmes techniques complexes, programmation et transition numérique.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "terre-environnement",
    label: "Terre et environnement",
    description:
      "Risques naturels, ressources et développement durable — enjeux contemporains.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "preparation-brevet",
    label: "Préparation au brevet",
    description:
      "Méthodologie de l'épreuve de sciences — exercices types et repères.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Anglais 3e ──────────────────────────────────────────────────

export const troisiemeAnglaisSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "comprehension-orale",
    label: "Compréhension orale",
    description:
      "Comprendre des documents audio et vidéo en anglais standard et authentique.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "comprehension-ecrite",
    label: "Compréhension écrite",
    description:
      "Lire des textes variés et dégager l'essentiel d'un document complexe.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "expression-orale",
    label: "Expression orale",
    description:
      "Prendre la parole, argumenter et interagir en anglais avec aisance.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "expression-ecrite",
    label: "Expression écrite",
    description:
      "Rédiger des textes organisés, des arguments et des productions personnelles.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "culture",
    label: "Culture",
    description:
      "Approfondir la connaissance des pays anglophones et des enjeux du monde anglophone.",
    status: statusUpcoming,
  },
];

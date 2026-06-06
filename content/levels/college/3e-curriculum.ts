// Programme 3e — Cycle 4, collège.
// Structure légère : matières et sous-domaines visibles, sans contenu pédagogique.
// Aucune page matière ou domaine 3e n'est publiée.
// Le site organise ; les PDF enseignent.

import type { ProgramStatus } from "@/content/program-types";
import type {
  CollegeMatiereCard,
  CollegeSubdomainCard,
} from "@/content/levels/college/6e-curriculum";

const statusUpcoming: ProgramStatus = "upcoming";

// ── Matières visibles sur le portail /college/3e ─────────────────────────────
// Aucune page matière 3e n'existe — les cartes restent non cliquables.

export const troisiemeMatieres: CollegeMatiereCard[] = [
  {
    slug: "francais",
    label: "Français",
    description:
      "Lecture, écriture, oral et étude de la langue — préparer l'épreuve de brevet.",
    status: statusUpcoming,
  },
  {
    slug: "mathematiques",
    label: "Mathématiques",
    description:
      "Fonctions, probabilités, géométrie et calcul — préparer le brevet.",
    status: statusUpcoming,
  },
  {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    description:
      "Le monde depuis 1914 — repères chronologiques, géopolitiques et citoyens.",
    status: statusUpcoming,
  },
  {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    description:
      "SVT, physique-chimie et technologie — consolider et préparer le lycée.",
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
      "Démarche artistique, intention et regard — préparer l'épreuve d'histoire des arts.",
    status: statusUpcoming,
  },
  {
    slug: "education-musicale",
    label: "Éducation musicale",
    description:
      "Projet musical et culture — interpréter, argumenter et préparer le brevet.",
    status: statusUpcoming,
  },
  {
    slug: "eps",
    label: "EPS",
    description:
      "Autonomie, performance et projet collectif — construire ses compétences physiques.",
    status: statusUpcoming,
  },
  {
    slug: "methodologie-college",
    label: "Méthodologie collège",
    description:
      "Préparer le brevet : organiser ses révisions et maîtriser les méthodes d'examen.",
    status: statusUpcoming,
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

// ── Sous-domaines Arts plastiques 3e ─────────────────────────────────────────

export const troisiemeArtsPlastiquesSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "projet-oeuvre-spectateur",
    label: "Projet, œuvre et spectateur",
    description:
      "Présenter une démarche plastique, expliciter une intention et accueillir le regard du spectateur.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "histoire-des-arts",
    label: "Histoire des arts",
    description:
      "Situer des œuvres dans leur contexte historique, social et culturel.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "creation-argumentee",
    label: "Création argumentée",
    description:
      "Justifier ses choix plastiques à l'oral et à l'écrit.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Éducation musicale 3e ───────────────────────────────────────

export const troisiemeEducationMusicaleSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "projet-musical",
    label: "Projet musical",
    description:
      "Concevoir et réaliser un projet musical collectif avec une intention artistique.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "interpretation-brevet",
    label: "Interprétation brevet",
    description:
      "Présenter une interprétation musicale en justifiant ses choix.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "culture-musicale",
    label: "Culture musicale",
    description:
      "Approfondir la culture musicale — œuvres, artistes et courants du XXe siècle.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines EPS 3e ──────────────────────────────────────────────────────

export const troisiemeEpsSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "performance-autonomie",
    label: "Performance et autonomie",
    description:
      "Mesurer ses progrès et construire un projet personnel d'entraînement.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "projet-collectif",
    label: "Projet collectif",
    description:
      "Assumer un rôle défini dans un projet collectif — joueur, arbitre, coach.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "sante-engagement",
    label: "Santé et engagement",
    description:
      "Comprendre les bénéfices de l'activité physique et adopter un mode de vie actif.",
    status: statusUpcoming,
  },
];

// ── Sous-domaines Méthodologie collège 3e ─────────────────────────────────────

export const troisiemeMethodologieSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "preparer-brevet",
    label: "Préparer le brevet",
    description:
      "Planifier les révisions, gérer le stress et s'entraîner aux épreuves du brevet.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "strategies-revision",
    label: "Stratégies de révision",
    description:
      "Utiliser des techniques de mémorisation efficaces pour les épreuves du brevet.",
    status: statusUpcoming,
  },
  {
    subdomainSlug: "oral-brevet",
    label: "Oral du brevet",
    description:
      "Préparer et réussir la présentation orale du projet de 3e.",
    status: statusUpcoming,
  },
];

import { getPublicStatus } from "@/content/public-status";
import type { PublicStatus } from "@/content/public-status";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CharacterCategory =
  | "professeur"
  | "guide-de-niveau"
  | "eleve"
  | "personnage-secondaire"
  | "famille"
  | "mascotte-pedagogique";

export type CharacterLevelGroup =
  | "maternelle"
  | "primaire"
  | "college"
  | "lycee"
  | "transversal";

export type SchoolLevel =
  | "PS"
  | "MS"
  | "GS"
  | "CP"
  | "CE1"
  | "CE2"
  | "CM1"
  | "CM2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "2nde"
  | "1re"
  | "Terminale"
  | "transversal";

export type Character = {
  id: string;
  slug: string;
  name: string;
  category: CharacterCategory;
  levelGroup: CharacterLevelGroup;
  /** Niveaux scolaires concernés */
  schoolLevel: SchoolLevel[];
  /** Matière principale (professeurs et guides seulement) */
  subject?: string;
  role: string;
  shortDescription: string;
  status: PublicStatus;
  /** Chemin relatif à /public, ex. "/images/personnages/felix.webp" */
  image?: string;
  /** Routes associées au personnage sur le site */
  linkedPages?: string[];
};

// ── Données ───────────────────────────────────────────────────────────────────

export const characters: Character[] = [
  // ── Guides de niveau ────────────────────────────────────────────────────────
  {
    id: "felix-lynx",
    slug: "felix",
    name: "Félix le lynx",
    category: "guide-de-niveau",
    levelGroup: "primaire",
    schoolLevel: ["CM2"],
    subject: "Méthode et gestes intellectuels",
    role: "Guide CM2 — structurer la démarche d'investigation",
    shortDescription:
      "Félix guide les élèves de CM2 dans leurs missions. Il structure la démarche : observer, chercher, vérifier, justifier, produire une trace.",
    status: getPublicStatus("disponible"),
    linkedPages: ["/primaire/cm2", "/univers/personnages"],
  },

  // ── Professeurs ─────────────────────────────────────────────────────────────
  {
    id: "hector-castor",
    slug: "hector",
    name: "Hector le castor",
    category: "professeur",
    levelGroup: "primaire",
    schoolLevel: ["CP", "CE1", "CE2", "CM1", "CM2"],
    subject: "Mathématiques",
    role: "Professeur de mathématiques",
    shortDescription:
      "Hector enseigne les mathématiques avec rigueur et méthode. Il aime construire, mesurer et vérifier.",
    status: getPublicStatus("disponible"),
    linkedPages: ["/univers/personnages"],
  },
  {
    id: "rosa-chouette",
    slug: "rosa",
    name: "Rosa la chouette",
    category: "professeur",
    levelGroup: "primaire",
    schoolLevel: ["CP", "CE1", "CE2", "CM1", "CM2"],
    subject: "Français",
    role: "Professeure de français",
    shortDescription:
      "Rosa enseigne la langue française : lecture, compréhension, écriture et structuration.",
    status: getPublicStatus("disponible"),
    linkedPages: ["/univers/personnages"],
  },
  {
    id: "melina-abeille",
    slug: "melina",
    name: "Mélina l'abeille",
    category: "professeur",
    levelGroup: "primaire",
    schoolLevel: ["CP", "CE1", "CE2", "CM1", "CM2"],
    subject: "Sciences",
    role: "Professeure de sciences",
    shortDescription:
      "Mélina enseigne les sciences en partant du réel : observer, expérimenter, comprendre le vivant et la matière.",
    status: getPublicStatus("disponible"),
    linkedPages: ["/univers/personnages"],
  },
  {
    id: "elian-dromadaire",
    slug: "elian",
    name: "Elian le dromadaire",
    category: "professeur",
    levelGroup: "primaire",
    schoolLevel: ["CE2", "CM1", "CM2"],
    subject: "Histoire-Géographie",
    role: "Professeur d'histoire-géographie",
    shortDescription:
      "Elian enseigne l'histoire et la géographie : lire des cartes, comprendre les traces du passé, se repérer dans le temps et l'espace.",
    status: getPublicStatus("bientôt"),
    linkedPages: ["/univers/personnages"],
  },
  {
    id: "pablo-singe",
    slug: "pablo",
    name: "Pablo le singe",
    category: "professeur",
    levelGroup: "primaire",
    schoolLevel: ["CP", "CE1", "CE2", "CM1", "CM2"],
    subject: "Arts plastiques",
    role: "Professeur d'arts plastiques",
    shortDescription:
      "Pablo enseigne les arts plastiques : créer, observer, composer, expérimenter des techniques artistiques.",
    status: getPublicStatus("bientôt"),
    linkedPages: ["/univers/personnages"],
  },
  {
    id: "naia-hippocampe",
    slug: "naia",
    name: "Naïa l'hippocampe",
    category: "professeur",
    levelGroup: "primaire",
    schoolLevel: ["CP", "CE1", "CE2", "CM1", "CM2"],
    subject: "Musique",
    role: "Professeure de musique",
    shortDescription:
      "Naïa enseigne la musique : écouter, chanter, créer, reconnaître sons et rythmes.",
    status: getPublicStatus("bientôt"),
    linkedPages: ["/univers/personnages"],
  },
  {
    id: "max-kangourou",
    slug: "max",
    name: "Max le kangourou",
    category: "professeur",
    levelGroup: "primaire",
    schoolLevel: ["CP", "CE1", "CE2", "CM1", "CM2"],
    subject: "Éducation physique et sportive",
    role: "Professeur d'EPS",
    shortDescription:
      "Max enseigne l'EPS : bouger, coopérer, progresser et respecter les règles.",
    status: getPublicStatus("bientôt"),
    linkedPages: ["/univers/personnages"],
  },

  // ── Élèves ──────────────────────────────────────────────────────────────────
  {
    id: "kiwi-grenouille",
    slug: "kiwi",
    name: "Kiwi",
    category: "eleve",
    levelGroup: "primaire",
    schoolLevel: ["CP"],
    role: "Élève CP — apprenant de première entrée",
    shortDescription:
      "Kiwi est la grenouille du CP. Elle découvre l'école et les premiers apprentissages avec curiosité.",
    status: getPublicStatus("disponible"),
  },
  {
    id: "gaston-herisson",
    slug: "gaston",
    name: "Gaston",
    category: "eleve",
    levelGroup: "primaire",
    schoolLevel: ["CE1"],
    role: "Élève CE1 — stratège de la méthode",
    shortDescription:
      "Gaston est le hérisson du CE1. Il aime organiser, planifier et trouver la bonne méthode.",
    status: getPublicStatus("disponible"),
  },
  {
    id: "esteban-pingouin",
    slug: "esteban",
    name: "Esteban",
    category: "eleve",
    levelGroup: "primaire",
    schoolLevel: ["CE2"],
    role: "Élève CE2 — explorateur de notions",
    shortDescription:
      "Esteban est le pingouin du CE2. Il explore les nouvelles notions avec enthousiasme.",
    status: getPublicStatus("disponible"),
  },
  {
    id: "noisette-ecureuil",
    slug: "noisette",
    name: "Noisette",
    category: "eleve",
    levelGroup: "primaire",
    schoolLevel: ["CM1"],
    role: "Élève CM1 — collectionneuse de documents",
    shortDescription:
      "Noisette est l'écureuil du CM1. Elle collecte, classe et mémorise les savoirs avec soin.",
    status: getPublicStatus("disponible"),
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCharacter(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug);
}

export function getCharactersByCategory(
  category: CharacterCategory,
): Character[] {
  return characters.filter((c) => c.category === category);
}

export function getCharactersByLevelGroup(
  levelGroup: CharacterLevelGroup,
): Character[] {
  return characters.filter((c) => c.levelGroup === levelGroup);
}

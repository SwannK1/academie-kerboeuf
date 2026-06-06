import { getPublicStatus } from "@/content/public-status";
import type { PublicStatus } from "@/content/public-status";

// ── Types ────────────────────────────────────────────────────────────────────

export type LevelGroup = "maternelle" | "primaire" | "college" | "lycee";

export type AcademyStudentCharacter = {
  id: string;
  slug: string;
  name: string;
  category: "student";
  species: string;
  levelGroup: LevelGroup;
  /** Niveau scolaire précis (ex. "CP", "6e") */
  schoolLevel?: string;
  role: string;
  shortDescription: string;
  publicStatus: PublicStatus;
};

// ── Données ──────────────────────────────────────────────────────────────────

export const academyStudents: AcademyStudentCharacter[] = [
  {
    id: "kiwi",
    slug: "kiwi",
    name: "Kiwi",
    category: "student",
    species: "Renard roux",
    levelGroup: "primaire",
    schoolLevel: "CP",
    role: "Élève de CP",
    shortDescription:
      "Kiwi découvre la lecture et les premières mathématiques. Curieux et enthousiaste, il apprend à observer le monde qui l'entoure.",
    publicStatus: getPublicStatus("bientôt"),
  },
  {
    id: "gaston-eleve",
    slug: "gaston-eleve",
    name: "Gaston",
    category: "student",
    species: "Blaireau européen",
    levelGroup: "primaire",
    schoolLevel: "CE1",
    role: "Élève de CE1",
    shortDescription:
      "Gaston consolide la lecture et entre dans les nombres. Méthodique et persévérant, il aime comprendre avant d'avancer.",
    publicStatus: getPublicStatus("bientôt"),
  },
  {
    id: "esteban",
    slug: "esteban",
    name: "Esteban",
    category: "student",
    species: "Loutre de rivière",
    levelGroup: "primaire",
    schoolLevel: "CE2",
    role: "Élève de CE2",
    shortDescription:
      "Esteban explore les sciences et s'initie à l'écriture de textes. Actif et inventif, il aime expérimenter.",
    publicStatus: getPublicStatus("bientôt"),
  },
  {
    id: "noisette",
    slug: "noisette",
    name: "Noisette",
    category: "student",
    species: "Écureuil roux",
    levelGroup: "primaire",
    schoolLevel: "CM1",
    role: "Élève de CM1",
    shortDescription:
      "Noisette approfondit ses méthodes de travail et commence à argumenter. Organisée et rigoureuse, elle aime les défis intellectuels.",
    publicStatus: getPublicStatus("bientôt"),
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getStudentsByLevelGroup(
  group: LevelGroup,
): AcademyStudentCharacter[] {
  return academyStudents.filter((s) => s.levelGroup === group);
}

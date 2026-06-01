import type { MatterSubject } from "@/components/academy/SubjectMatterCatalog";

export type Ce2Subject = MatterSubject & {
  accent: "jade" | "gold" | "sky" | "ember";
};

export const ce2Subjects: Ce2Subject[] = [
  {
    slug: "francais",
    title: "Français",
    shortDescription:
      "Langage oral, lecture et compréhension de textes plus longs, étude de la langue et écriture.",
    domains: [
      "Langage oral",
      "Lecture et compréhension",
      "Écriture",
      "Étude de la langue",
    ],
    status: "in-progress",
    accent: "sky",
    teacherFocus:
      "Développer la lecture autonome de textes plus longs tout en consolidant les acquis de CE1.",
  },
  {
    slug: "mathematiques",
    title: "Mathématiques",
    shortDescription:
      "Nombres entiers, calcul mental, opérations posées, résolution de problèmes, grandeurs et géométrie.",
    domains: [
      "Nombres et calculs",
      "Problèmes",
      "Grandeurs et mesures",
      "Espace et géométrie",
    ],
    status: "in-progress",
    accent: "jade",
    teacherFocus:
      "Consolider la maîtrise des opérations posées avant d'aborder les problèmes à plusieurs étapes.",
  },
  {
    slug: "questionner-le-monde",
    title: "Questionner le monde",
    shortDescription:
      "Temps, espace, vivant, matière et objets : questionner, observer, comparer.",
    domains: ["Le temps", "L'espace", "Vivant, matière et objets"],
    status: "upcoming",
    accent: "sky",
    teacherFocus:
      "Ancrer les apprentissages dans des documents réels (frises, cartes, photographies).",
  },
  {
    slug: "enseignements-artistiques",
    title: "Enseignements artistiques",
    shortDescription:
      "Arts plastiques et éducation musicale : expérimenter, composer, écouter.",
    domains: ["Arts plastiques", "Éducation musicale"],
    status: "upcoming",
    accent: "ember",
    teacherFocus:
      "Alterner production personnelle et observation d'œuvres pour nourrir le regard.",
  },
  {
    slug: "eps",
    title: "EPS",
    shortDescription:
      "Performance, déplacements adaptés, jeux collectifs et expression corporelle.",
    domains: [
      "Produire une performance",
      "Adapter ses déplacements",
      "Jeux collectifs",
      "Expression corporelle",
    ],
    status: "upcoming",
    accent: "jade",
    teacherFocus:
      "Varier les activités support pour développer la motricité sous toutes ses formes.",
  },
  {
    slug: "emc",
    title: "EMC",
    shortDescription:
      "Règles et vie collective, jugement et engagement : comprendre, coopérer, agir.",
    domains: ["Règles et vie collective", "Jugement et engagement"],
    status: "upcoming",
    accent: "gold",
    teacherFocus:
      "Utiliser des situations réelles de la vie de classe pour travailler les notions civiques.",
  },
];

export function getCe2SubjectBySlug(slug: string): Ce2Subject | undefined {
  return ce2Subjects.find((s) => s.slug === slug);
}

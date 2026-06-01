import type { MatterSubject } from "@/components/academy/SubjectMatterCatalog";

export type Ce1Subject = MatterSubject & {
  accent: "jade" | "gold" | "sky" | "ember";
};

export const ce1Subjects: Ce1Subject[] = [
  {
    slug: "francais",
    title: "Français",
    shortDescription:
      "Lecture fluide, compréhension, premières productions écrites, grammaire et orthographe fréquente.",
    domains: [
      "Lecture fluide",
      "Compréhension",
      "Premières productions écrites",
      "Grammaire simple",
      "Orthographe fréquente",
    ],
    status: "in-progress",
    accent: "sky",
    teacherFocus:
      "Faire verbaliser les stratégies de lecture et de décodage à haute voix avant de les automatiser.",
  },
  {
    slug: "mathematiques",
    title: "Mathématiques",
    shortDescription:
      "Nombres jusqu'à 1000, calcul mental, résolution de problèmes simples, grandeurs et géométrie.",
    domains: [
      "Nombres et calculs",
      "Problèmes",
      "Grandeurs et mesures",
      "Espace et géométrie",
    ],
    status: "upcoming",
    accent: "jade",
    teacherFocus:
      "Stabiliser la numération et les procédures de calcul avant d'aborder les problèmes à étapes.",
  },
];

export function getCe1SubjectBySlug(slug: string): Ce1Subject | undefined {
  return ce1Subjects.find((s) => s.slug === slug);
}

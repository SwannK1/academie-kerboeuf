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
  {
    slug: "questionner-le-monde",
    title: "Questionner le monde",
    shortDescription:
      "Observer le vivant, explorer la matière, se repérer dans le temps et l'espace.",
    domains: ["Le monde vivant", "Espace et temps", "Matière et énergie"],
    status: "upcoming",
    accent: "sky",
    teacherFocus:
      "Appuyer l'observation directe sur des traces écrites pour consolider les apprentissages.",
  },
  {
    slug: "enseignements-artistiques",
    title: "Enseignements artistiques",
    shortDescription:
      "Composer avec des formes et des couleurs, chanter et écouter de la musique.",
    domains: ["Arts plastiques", "Éducation musicale"],
    status: "upcoming",
    accent: "ember",
    teacherFocus:
      "Encourager la verbalisation des choix artistiques pour développer le regard critique.",
  },
  {
    slug: "eps",
    title: "EPS",
    shortDescription:
      "Activités physiques mesurées, jeux collectifs et première expression corporelle.",
    domains: ["Activités physiques", "Jeux collectifs", "Expression corporelle"],
    status: "upcoming",
    accent: "jade",
    teacherFocus:
      "Alterner les rôles (joueur, arbitre, observateur) pour développer la coopération.",
  },
  {
    slug: "emc",
    title: "EMC",
    shortDescription:
      "Comprendre les règles collectives, distinguer droits et devoirs, identifier des actions responsables.",
    domains: ["Vie collective", "Droits et devoirs"],
    status: "upcoming",
    accent: "gold",
    teacherFocus:
      "Partir des conflits ou des choix vécus en classe pour construire les notions.",
  },
];

export function getCe1SubjectBySlug(slug: string): Ce1Subject | undefined {
  return ce1Subjects.find((s) => s.slug === slug);
}

// Source de vérité pour les cartes UI matières CM2 (statut, accent, missions).
// Données des matières CM2 — partagées par /primaire/cm2, /primaire/cm2/matieres
// et /primaire/cm2/matieres/[slug].
// missionSlugs référence des slugs existants dans content/cm2.ts.

export type SubjectStatus = "available" | "in-progress" | "upcoming";

export type Cm2Subject = {
  slug: string;
  title: string;
  shortDescription: string;
  domains: string[];
  status: SubjectStatus;
  accent: "jade" | "gold" | "sky" | "ember";
  missionSlugs?: string[];
  yearlyPathLabel?: string;
  teacherFocus?: string;
};

export const cm2Subjects: Cm2Subject[] = [
  {
    slug: "francais",
    title: "Français",
    shortDescription: "Lire finement, écrire avec méthode, analyser la langue.",
    domains: [
      "Lecture et compréhension",
      "Écriture",
      "Étude de la langue",
      "Oral",
      "Lexique",
    ],
    status: "available",
    accent: "gold",
    missionSlugs: [
      "mission-inference",
      "lecture-strategique",
      "production-ecrit",
      "enquete-grammaticale",
    ],
    teacherFocus:
      "Mettre en lien lecture, écriture et analyse grammaticale dans des missions cohérentes.",
  },
  {
    slug: "mathematiques",
    title: "Mathématiques",
    shortDescription:
      "Calculer avec stratégie, résoudre des défis, vérifier le résultat.",
    domains: [
      "Nombres et calculs",
      "Résolution de problèmes",
      "Grandeurs et mesures",
      "Espace et géométrie",
      "Organisation et gestion de données",
    ],
    status: "available",
    accent: "jade",
    missionSlugs: ["mission-calcul", "defis-mathematiques"],
    teacherFocus:
      "Expliciter les stratégies de calcul et les démarches de résolution de problèmes.",
  },
  {
    slug: "histoire-geographie",
    title: "Histoire-Géographie",
    shortDescription:
      "Lire des documents, situer dans le temps et dans l'espace.",
    domains: ["Histoire", "Géographie", "Repères et documents"],
    status: "available",
    accent: "sky",
    missionSlugs: ["archives-historiques", "cartographe-du-monde"],
    teacherFocus:
      "Développer la lecture critique de documents historiques et géographiques.",
  },
  {
    slug: "sciences",
    title: "Sciences et technologie",
    shortDescription: "Observer, formuler une hypothèse, comparer, conclure.",
    domains: [
      "Matière, mouvement, énergie, information",
      "Le vivant, sa diversité et ses fonctions",
      "Matériaux et objets techniques",
      "La planète Terre et les êtres vivants",
    ],
    status: "available",
    accent: "ember",
    missionSlugs: ["laboratoire-scientifique"],
    teacherFocus:
      "Guider la démarche d'investigation : observer, formuler, tester, conclure.",
  },
  {
    slug: "emc",
    title: "EMC",
    shortDescription:
      "Argumenter, écouter, coopérer et exercer un jugement responsable.",
    domains: [
      "Respecter autrui",
      "Valeurs de la République",
      "Culture civique",
      "Vie affective et numérique",
    ],
    status: "upcoming",
    accent: "sky",
  },
  {
    slug: "anglais",
    title: "Anglais",
    shortDescription:
      "Comprendre et s'exprimer dans une langue vivante.",
    domains: [
      "Comprendre à l'oral",
      "S'exprimer à l'oral",
      "Lire et écrire",
      "Repères culturels",
    ],
    status: "upcoming",
    accent: "jade",
  },
  {
    slug: "arts",
    title: "Arts",
    shortDescription:
      "Créer une trace visuelle, observer et présenter un travail.",
    domains: ["Arts plastiques", "Éducation musicale", "Histoire des arts"],
    status: "upcoming",
    accent: "ember",
  },
  {
    slug: "eps",
    title: "EPS",
    shortDescription:
      "Coopérer, respecter une règle, stabiliser des repères corporels.",
    domains: [
      "Produire une performance",
      "Adapter ses déplacements",
      "S'exprimer devant les autres",
      "Conduire un affrontement",
    ],
    status: "upcoming",
    accent: "jade",
  },
];

export function getCm2SubjectBySlug(slug: string): Cm2Subject | undefined {
  return cm2Subjects.find((s) => s.slug === slug);
}

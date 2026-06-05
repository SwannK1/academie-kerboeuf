// Source de vérité pour les cartes UI matières CM1.
// Données de cadrage uniquement : les séquences-compétences vivent dans cm1-learning-tree.ts.

export type Cm1SubjectStatus = "available" | "in-progress" | "upcoming";

export type Cm1Subject = {
  slug: string;
  title: string;
  shortDescription: string;
  domains: string[];
  status: Cm1SubjectStatus;
  accent: "jade" | "gold" | "sky" | "ember";
  yearlyPathLabel?: string;
  teacherFocus?: string;
};

export const cm1Subjects: Cm1Subject[] = [
  {
    slug: "francais",
    title: "Français",
    shortDescription:
      "Lire avec méthode, écrire des textes organisés et consolider les accords essentiels.",
    domains: ["Lecture et compréhension", "Écriture", "Étude de la langue", "Langage oral"],
    status: "in-progress",
    accent: "gold",
    yearlyPathLabel: "Installer les stratégies de cycle 3",
    teacherFocus:
      "Faire verbaliser les indices, les choix d'écriture et les manipulations de langue.",
  },
  {
    slug: "mathematiques",
    title: "Mathématiques",
    shortDescription:
      "Structurer les grands nombres, entrer dans les fractions et résoudre avec méthode.",
    domains: ["Nombres et calculs", "Résolution de problèmes", "Grandeurs et mesures", "Espace et géométrie"],
    status: "in-progress",
    accent: "jade",
    yearlyPathLabel: "Consolider les bases du cycle 3",
    teacherFocus:
      "Stabiliser les démarches avant d'augmenter la complexité attendue en CM2.",
  },
  {
    slug: "histoire-geographie",
    title: "Histoire-Géographie",
    shortDescription:
      "Construire des repères dans le temps, lire cartes et paysages, questionner les documents.",
    domains: ["Histoire", "Géographie"],
    status: "upcoming",
    accent: "sky",
    yearlyPathLabel: "Installer les repères et le vocabulaire",
    teacherFocus:
      "Faire décrire précisément les documents avant de demander une interprétation.",
  },
  {
    slug: "sciences",
    title: "Sciences et technologie",
    shortDescription:
      "Observer, questionner, comparer et expliquer des phénomènes accessibles.",
    domains: [
      "Démarche scientifique",
      "Le vivant",
      "Matière, matériaux et objets techniques",
      "La planète Terre et l'environnement",
    ],
    status: "upcoming",
    accent: "ember",
    yearlyPathLabel: "Apprendre à enquêter scientifiquement",
    teacherFocus:
      "Séparer observation, hypothèse et conclusion dans les traces collectives.",
  },
  {
    slug: "emc",
    title: "EMC",
    shortDescription:
      "Coopérer, débattre, comprendre les règles communes et les valeurs civiques.",
    domains: ["Respecter autrui", "Valeurs de la République", "Culture civique"],
    status: "upcoming",
    accent: "sky",
    yearlyPathLabel: "Apprendre à agir dans un collectif",
    teacherFocus:
      "Ancrer les notions civiques dans des situations de classe concrètes.",
  },
  {
    slug: "anglais",
    title: "Anglais",
    shortDescription:
      "Comprendre des messages simples, parler dans des routines et découvrir des repères culturels.",
    domains: ["Comprendre", "S'exprimer", "Repères culturels"],
    status: "upcoming",
    accent: "jade",
    yearlyPathLabel: "Rendre la langue familière et utilisable",
    teacherFocus:
      "Répéter les structures utiles dans des situations courtes et sécurisantes.",
  },
  {
    slug: "arts",
    title: "Arts",
    shortDescription:
      "Expérimenter, composer, écouter et présenter des choix artistiques simples.",
    domains: ["Arts plastiques", "Éducation musicale", "Histoire des arts"],
    status: "upcoming",
    accent: "ember",
    yearlyPathLabel: "Explorer et mettre des mots sur les choix",
    teacherFocus:
      "Relier production, observation et vocabulaire dans des temps courts mais réguliers.",
  },
  {
    slug: "eps",
    title: "EPS",
    shortDescription:
      "Mesurer ses progrès, coopérer, s'exprimer et respecter les règles d'action.",
    domains: [
      "Produire une performance",
      "Adapter ses déplacements",
      "S'exprimer devant les autres",
      "Conduire un affrontement collectif ou interindividuel",
    ],
    status: "upcoming",
    accent: "jade",
    yearlyPathLabel: "Stabiliser les repères corporels et collectifs",
    teacherFocus:
      "Faire expliciter les règles, les critères de réussite et les progrès observables.",
  },
];

export function getCm1SubjectBySlug(slug: string): Cm1Subject | undefined {
  return cm1Subjects.find((subject) => subject.slug === slug);
}

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
      "Grammaire",
      "Orthographe",
      "Lexique",
      "Oral",
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
      "Problèmes",
      "Grandeurs et mesures",
      "Espace et géométrie",
      "Organisation et gestion de données",
    ],
    status: "in-progress",
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
    domains: [
      "Repères historiques",
      "Temps modernes",
      "Révolution et Empire",
      "XIXe siècle",
      "XXe siècle",
      "Se déplacer",
      "Communiquer grâce à Internet",
      "Mieux habiter",
      "Lire et produire des cartes",
    ],
    status: "in-progress",
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
      "Le vivant",
      "Matériaux et objets techniques",
      "La planète Terre et l'environnement",
    ],
    status: "in-progress",
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
      "Acquérir et partager les valeurs de la République",
      "Construire une culture civique",
      "Débattre, coopérer, s'engager",
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
      "Se présenter",
      "Comprendre des consignes simples",
      "Parler de son quotidien",
      "Découvrir des éléments culturels",
    ],
    status: "upcoming",
    accent: "jade",
  },
  {
    slug: "arts",
    title: "Arts",
    shortDescription:
      "Créer une trace visuelle, observer et présenter un travail.",
    domains: [
      "Observer une œuvre",
      "Expérimenter des techniques",
      "Produire avec une intention",
      "Présenter sa production",
    ],
    status: "upcoming",
    accent: "ember",
  },
  {
    slug: "eps",
    title: "EPS",
    shortDescription:
      "Coopérer, respecter une règle, stabiliser des repères corporels.",
    domains: [
      "Coopérer et s'opposer",
      "Réaliser une performance",
      "Adapter ses déplacements",
      "S'exprimer par une activité artistique ou corporelle",
    ],
    status: "upcoming",
    accent: "jade",
  },
];

export function getCm2SubjectBySlug(slug: string): Cm2Subject | undefined {
  return cm2Subjects.find((s) => s.slug === slug);
}

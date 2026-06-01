export type CpSubjectStatus = "available" | "in-progress" | "upcoming";

export type CpSubject = {
  slug: string;
  title: string;
  shortDescription: string;
  domains: string[];
  status: CpSubjectStatus;
  accent: "jade" | "gold" | "sky" | "ember";
  teacherFocus?: string;
};

export const cpSubjects: CpSubject[] = [
  {
    slug: "francais",
    title: "Français",
    shortDescription:
      "Décodage, combinatoire, fluence, compréhension et premières écritures.",
    domains: ["Décodage", "Combinatoire", "Fluence", "Compréhension", "Écriture"],
    status: "in-progress",
    accent: "gold",
    teacherFocus:
      "Installer les automatismes de décodage avant de travailler la fluidité et la compréhension.",
  },
  {
    slug: "mathematiques",
    title: "Mathématiques",
    shortDescription:
      "Numération jusqu'à 100, calculs additifs et soustractifs, premiers problèmes guidés.",
    domains: ["Nombres", "Calculs simples", "Problèmes très guidés"],
    status: "upcoming",
    accent: "jade",
    teacherFocus:
      "Construire le sens des nombres avant d'automatiser les calculs.",
  },
  {
    slug: "questionner-le-monde",
    title: "Questionner le monde",
    shortDescription:
      "Premiers questionnements sur le vivant, la matière, le temps et l'espace proche.",
    domains: ["Le monde vivant", "Matière et objets", "Temps et espace"],
    status: "upcoming",
    accent: "sky",
    teacherFocus:
      "Partir des observations directes des élèves avant d'introduire les concepts.",
  },
  {
    slug: "enseignements-artistiques",
    title: "Enseignements artistiques",
    shortDescription:
      "Premiers gestes plastiques et musicaux : explorer, créer, décrire.",
    domains: ["Arts plastiques", "Éducation musicale"],
    status: "upcoming",
    accent: "ember",
    teacherFocus:
      "Favoriser l'expérimentation libre avant de guider vers une production aboutie.",
  },
  {
    slug: "eps",
    title: "EPS",
    shortDescription:
      "Activités motrices de base et premiers jeux collectifs en sécurité.",
    domains: ["Activités motrices", "Jeux collectifs"],
    status: "upcoming",
    accent: "jade",
    teacherFocus:
      "Installer les règles de sécurité et de respect avant tout travail collectif.",
  },
  {
    slug: "emc",
    title: "EMC",
    shortDescription:
      "Vivre ensemble, respecter les règles et découvrir les premiers symboles de la République.",
    domains: ["Vie collective", "Premiers repères civiques"],
    status: "upcoming",
    accent: "gold",
    teacherFocus:
      "Ancrer les règles dans des situations vécues pour qu'elles aient du sens.",
  },
];

export function getCpSubjectBySlug(slug: string): CpSubject | undefined {
  return cpSubjects.find((s) => s.slug === slug);
}

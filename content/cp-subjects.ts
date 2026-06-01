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
];

export function getCpSubjectBySlug(slug: string): CpSubject | undefined {
  return cpSubjects.find((s) => s.slug === slug);
}

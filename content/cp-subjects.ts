import { cpLearningTree } from "@/content/levels/cp-learning-tree";

export type CpSubject = {
  slug: string;
  title: string;
  shortDescription: string;
  domains: string[];
  status: "available" | "in-progress" | "upcoming";
  accent: "jade" | "gold" | "sky" | "ember";
  teacherFocus?: string;
};

export const cpSubjects: CpSubject[] = [
  {
    slug: "francais",
    title: "Français",
    shortDescription:
      "Décodage, combinatoire, fluence, compréhension et premières écritures.",
    domains: cpLearningTree.domains
      .find((d) => d.slug === "francais")
      ?.subdomains.map((s) => s.title) ?? [],
    status: "in-progress",
    accent: "gold",
    teacherFocus:
      "Articuler le décodage, la fluence et la compréhension dans des situations de lecture quotidienne.",
  },
  {
    slug: "mathematiques",
    title: "Mathématiques",
    shortDescription:
      "Nombres, calculs simples et premiers problèmes très guidés.",
    domains: cpLearningTree.domains
      .find((d) => d.slug === "mathematiques")
      ?.subdomains.map((s) => s.title) ?? [],
    status: "upcoming",
    accent: "jade",
    teacherFocus:
      "Construire la numération par manipulation avant d'aborder le calcul écrit.",
  },
];

export function getCpSubjectBySlug(slug: string): CpSubject | undefined {
  return cpSubjects.find((s) => s.slug === slug);
}

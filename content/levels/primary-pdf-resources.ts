import type { PedagogicalResourceRef } from "@/content/program-types";

type PrimaryPdfResourceOptions = {
  level: "cp" | "ce2" | "cm1";
  subject: string;
  competencySlug: string;
  filePrefix?: string;
};

export function createPrimaryPdfResources({
  level,
  subject,
  competencySlug,
  filePrefix = `${level}-${subject}-${competencySlug}`,
}: PrimaryPdfResourceOptions): PedagogicalResourceRef[] {
  const basePath = `/fiches/${level}/${subject}/${competencySlug}/${filePrefix}`;

  return [
    {
      kind: "lesson-pdf",
      label: "Leçon PDF",
      status: "available",
      href: `${basePath}-lecon.pdf`,
      audience: "student",
    },
    {
      kind: "exercises-pdf",
      label: "Exercices PDF",
      status: "available",
      href: `${basePath}-exercices.pdf`,
      audience: "student",
    },
    {
      kind: "correction-pdf",
      label: "Évaluation PDF",
      status: "available",
      href: `${basePath}-evaluation.pdf`,
      audience: "teacher",
    },
  ];
}

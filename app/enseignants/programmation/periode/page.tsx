import type { Metadata } from "next";
import { TeacherPeriodProgression } from "@/components/academy/TeacherPeriodProgression";

export const metadata: Metadata = {
  title: "Progression de période | Académie Kerboeuf",
  description:
    "Organisez l'ordre des séquences d'une période donnée par niveau et par matière.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function asString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TeacherPeriodProgressionPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const niveau = asString(params.niveau);
  const periode = asString(params.periode);

  return (
    <TeacherPeriodProgression initialNiveau={niveau} initialPeriode={periode} />
  );
}

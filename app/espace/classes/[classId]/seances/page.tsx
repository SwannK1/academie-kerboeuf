import type { Metadata } from "next";
import { ToolPlaceholder } from "../_components/tool-placeholder";

export const metadata: Metadata = { title: "Séances | Académie Kerboeuf" };

export default async function SeancesPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return (
    <ToolPlaceholder
      classId={classId}
      title="Séances"
      description="Préparez et organisez vos séances pour cette classe."
    />
  );
}

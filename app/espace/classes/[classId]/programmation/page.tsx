import type { Metadata } from "next";
import { ToolPlaceholder } from "../_components/tool-placeholder";

export const metadata: Metadata = { title: "Programmation | Académie Kerboeuf" };

export default async function ProgrammationPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return (
    <ToolPlaceholder
      classId={classId}
      title="Programmation"
      description="Répartissez les compétences du programme sur les périodes de l'année pour cette classe."
      existingLocalTool={{ label: "Programmation annuelle", href: "/enseignants/programmation" }}
    />
  );
}

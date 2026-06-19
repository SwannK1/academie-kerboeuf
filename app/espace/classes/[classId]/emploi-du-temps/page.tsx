import type { Metadata } from "next";
import { ToolPlaceholder } from "../_components/tool-placeholder";

export const metadata: Metadata = { title: "Emploi du temps | Académie Kerboeuf" };

export default async function EmploiDuTempsPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return (
    <ToolPlaceholder
      classId={classId}
      title="Emploi du temps"
      description="Répartissez les matières par créneau sur la semaine pour cette classe."
      existingLocalTool={{ label: "Emploi du temps", href: "/enseignants/emploi-du-temps" }}
    />
  );
}

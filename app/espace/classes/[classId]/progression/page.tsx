import type { Metadata } from "next";
import { ToolPlaceholder } from "../_components/tool-placeholder";

export const metadata: Metadata = { title: "Progression | Académie Kerboeuf" };

export default async function ProgressionPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return (
    <ToolPlaceholder
      classId={classId}
      title="Progression"
      description="Suivez l'avancement des séquences par période pour cette classe."
      existingLocalTool={{
        label: "Progression par période",
        href: "/enseignants/programmation/periode",
      }}
    />
  );
}

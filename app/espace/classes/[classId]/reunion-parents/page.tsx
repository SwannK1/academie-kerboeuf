import type { Metadata } from "next";
import { ToolPlaceholder } from "../_components/tool-placeholder";

export const metadata: Metadata = { title: "Réunion parents | Académie Kerboeuf" };

export default async function ReunionParentsPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return (
    <ToolPlaceholder
      classId={classId}
      title="Réunion parents"
      description="Préparez votre réunion de parents pour cette classe."
    />
  );
}

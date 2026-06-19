import type { Metadata } from "next";
import { ToolPlaceholder } from "../_components/tool-placeholder";

export const metadata: Metadata = { title: "Commandes | Académie Kerboeuf" };

export default async function CommandesPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return (
    <ToolPlaceholder
      classId={classId}
      title="Commandes"
      description="Suivez vos commandes de matériel et de fournitures pour cette classe."
    />
  );
}

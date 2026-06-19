import type { Metadata } from "next";
import { ToolPlaceholder } from "../_components/tool-placeholder";

export const metadata: Metadata = { title: "Rentrée | Académie Kerboeuf" };

export default async function RentreePage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return (
    <ToolPlaceholder
      classId={classId}
      title="Rentrée"
      description="Préparez votre rentrée pour cette classe."
    />
  );
}

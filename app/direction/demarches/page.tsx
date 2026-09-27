import type { Metadata } from "next";
import { ProceduresIndex } from "@/components/direction/ProcedureView";

export const metadata: Metadata = { title: "Démarches" };

export default function DemarchesPage() {
  return <ProceduresIndex />;
}

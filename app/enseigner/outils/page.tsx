import type { Metadata } from "next";
import { ToolsGrid } from "@/components/enseigner/ToolsGrid";

export const metadata: Metadata = { title: "Autres outils" };

export default function OutilsPage() {
  return (
    <div className="pt-7">
      <h1 className="font-serif text-3xl font-semibold">Autres outils</h1>
      <p className="mt-2 max-w-2xl text-muted">
        ★ = favori. Données sur cet appareil.
      </p>
      <ToolsGrid />
    </div>
  );
}

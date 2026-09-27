import type { Metadata } from "next";
import { ToolsGrid } from "@/components/enseigner/ToolsGrid";

export const metadata: Metadata = { title: "Autres outils" };

export default function OutilsPage() {
  return (
    <div className="pt-7">
      <h1 className="font-serif text-3xl font-semibold">Autres outils</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Des outils ponctuels, en complément de la semaine et de l&apos;année. L&apos;étoile les ajoute à vos favoris. Leurs données restent sur cet appareil.
      </p>
      <ToolsGrid />
    </div>
  );
}

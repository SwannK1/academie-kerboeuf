import type { Metadata } from "next";
import { FichesMathsCatalogue } from "./FichesMathsCatalogue";

export const metadata: Metadata = {
  title: "Catalogue complet des fiches Mathématiques CM2 | Académie Kerboeuf",
  description:
    "Pour chaque compétence CM2 en Mathématiques, retrouve la leçon, la consolidation et l'évaluation.",
};

export default function FichesMathsPage() {
  return <FichesMathsCatalogue />;
}

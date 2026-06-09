import type { Metadata } from "next";
import { FichesMathsCatalogue } from "./FichesMathsCatalogue";

export const metadata: Metadata = {
  title: "Compétences CM2 – Mathématiques | Académie Kerboeuf",
  description:
    "Pour chaque compétence CM2 en Mathématiques, retrouve la leçon, la consolidation et l'évaluation.",
};

export default function FichesMathsPage() {
  return <FichesMathsCatalogue />;
}

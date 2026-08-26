import { buildPageMetadata } from "@/content/seo";
import { redirect } from "next/navigation";

export const metadata = buildPageMetadata({
  title: "Ressources de Seconde",
  description:
    "Accéder aux matières, compétences, leçons, exercices et évaluations PDF de Seconde.",
  path: "/lycee/seconde/ressources",
});

export default function SecondeRessourcesPage() {
  redirect("/lycee/seconde#ressources");
}

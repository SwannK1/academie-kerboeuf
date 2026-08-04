import { buildPageMetadata } from "@/lib/seo";
import { ProgrammationClient } from "./_components/ProgrammationClient";

export const metadata = buildPageMetadata({
  title: "Programmation et progression",
  description:
    "Choisissez un niveau pour voir sa programmation, organisez vos progressions par période et préparez l’année scolaire.",
  path: "/programmation",
});

export default function ProgrammationPage() {
  return <ProgrammationClient />;
}

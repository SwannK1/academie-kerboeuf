import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrimaireLevelEntry } from "@/components/academy/primaire-level-entry";
import { getAcademyLevel } from "@/content/academy";

export const metadata: Metadata = {
  title: "CE1 — Cycle 2 | Académie Kerboeuf",
  description:
    "Page niveau CE1 : matières, domaines et séquences-compétences du Cycle 2, guidées par Gaston le Hérisson.",
};

export default function Ce1Page() {
  const level = getAcademyLevel("primaire", "ce1");

  if (!level) {
    notFound();
  }

  return <PrimaireLevelEntry level={level} />;
}

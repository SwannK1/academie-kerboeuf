import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrimaireLevelEntry } from "@/components/academy/primaire-level-entry";
import { getAcademyLevel } from "@/content/academy";

export const metadata: Metadata = {
  title: "CE1 | Académie Kerboeuf",
  description:
    "Le CE1 avec Gaston : matières, compétences, missions et ressources progressives.",
};

export default function Ce1Page() {
  const level = getAcademyLevel("primaire", "ce1");

  if (!level) notFound();

  return (
    <>
      <PrimaireLevelEntry level={level} />
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-jade/25 bg-jade/[0.05] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Matières CE1
            </p>
            <h2 className="mt-2 text-xl font-black text-foreground">
              Catalogue par matière
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Accédez à la structure CE1 par matière, domaine, sous-domaine et
              séquence-compétence.
            </p>
            <Link
              href="/primaire/ce1/matieres"
              className="mt-4 inline-flex rounded-md border border-jade/35 bg-jade/10 px-5 py-3 text-sm font-bold text-jade transition hover:bg-jade hover:text-ink"
            >
              Explorer les matières CE1
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrimaireLevelEntry } from "@/components/academy/primaire-level-entry";
import { getAcademyLevel } from "@/content/academy";

export const metadata: Metadata = {
  title: "CP | Académie Kerboeuf",
  description:
    "Le CP avec Kiwi : matières, domaines, sous-domaines, séquences-compétences et ressources PDF prévues.",
};

export default function CpPage() {
  const level = getAcademyLevel("primaire", "cp");

  if (!level) notFound();

  return (
    <>
      <PrimaireLevelEntry level={level} />
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-jade/25 bg-jade/[0.05] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Matières CP
            </p>
            <h2 className="mt-2 text-xl font-black text-foreground">
              Catalogue par matière
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Accédez à la structure CP par matière, domaine, sous-domaine,
              séquence-compétence, séances et slots PDF prévus.
            </p>
            <Link
              href="/primaire/cp/matieres"
              className="mt-4 inline-flex rounded-md border border-jade/35 bg-jade/10 px-5 py-3 text-sm font-bold text-jade transition hover:bg-jade hover:text-ink"
            >
              Explorer les matières CP
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

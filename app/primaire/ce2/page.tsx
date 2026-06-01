import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrimaireLevelEntry } from "@/components/academy/primaire-level-entry";
import { getAcademyLevel } from "@/content/academy";
import { ce2Competencies } from "@/content/levels/ce2-competencies";
import { ce2Subjects } from "@/content/levels/ce2-learning-tree";

export const metadata: Metadata = {
  title: "CE2 | Académie Kerboeuf",
  description:
    "Le CE2 : matières, domaines, sous-domaines, séquences-compétences et futurs slots PDF.",
};

export default function Ce2Page() {
  const level = getAcademyLevel("primaire", "ce2");

  if (!level) notFound();

  return (
    <>
      <PrimaireLevelEntry level={level} />
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-jade/25 bg-jade/[0.05] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Structure CE2
            </p>
            <h2 className="mt-2 text-xl font-black text-foreground">
              6 matières · 53 séquences-compétences
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Le catalogue CE2 suit la structure matières, domaines,
              sous-domaines, séquences-compétences, séances et slots PDF
              planifiés.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-muted">
              <span>{ce2Subjects.length} matières</span>
              <span>{ce2Competencies.length} séquences</span>
              <span>Cycle 2</span>
              <span>0 PDF publié</span>
            </div>
            <Link
              href="/primaire/ce2/matieres"
              className="mt-5 inline-flex rounded-md border border-jade/35 bg-jade/10 px-5 py-3 text-sm font-bold text-jade transition hover:bg-jade hover:text-ink"
            >
              Explorer les matières CE2
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

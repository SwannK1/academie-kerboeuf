import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { StudentGallery } from "@/app/eleves/_components/student-gallery";
import { emblematicStudents } from "@/content/students";

export const metadata: Metadata = {
  title: "Élèves emblématiques | Académie Kerboeuf",
  description:
    "La galerie des élèves emblématiques de l’Académie Kerboeuf, de la maternelle à la Terminale.",
};

export default function ElevesPage() {
  const cycles = [...new Set(emblematicStudents.map((student) => student.cycle))];

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Élèves" }]} />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="map-line absolute left-1/2 top-10 -z-10 h-72 w-[44rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Galerie des élèves
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              Élèves emblématiques
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Chaque élève incarne une posture d’apprentissage : observer,
              essayer, expliquer, organiser, justifier. Les portraits servent de
              repères narratifs, sans compte utilisateur ni progression réelle.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/maternelle"
                className="rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
              >
                Découvrir la maternelle
              </Link>
              <Link
                href="/primaire"
                className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
              >
                Explorer le primaire
              </Link>
              <Link
                href="/college"
                className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
              >
                Explorer le collège
              </Link>
              <Link
                href="/lycee"
                className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
              >
                Explorer le lycée
              </Link>
            </div>
          </div>

          <aside className="grid gap-3 rounded-md border border-white/10 bg-panel/70 p-5 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Repères du parcours
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md bg-white/[0.045] p-4">
                <p className="text-3xl font-black text-foreground">
                  {emblematicStudents.length}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  Élèves
                </p>
              </div>
              <div className="rounded-md bg-white/[0.045] p-4">
                <p className="text-3xl font-black text-foreground">
                  {cycles.length}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  Cycles
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <StudentGallery students={emblematicStudents} />
    </main>
  );
}

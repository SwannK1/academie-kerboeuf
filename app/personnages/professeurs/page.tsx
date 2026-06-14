import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { professorProfiles } from "@/content/professors";

export const metadata: Metadata = {
  title: "Professeurs | Académie Kerboeuf",
  description:
    "Les professeurs référents de l'Académie Kerboeuf, par niveau.",
};

export default function ProfesseursPersonnagesPage() {
  return (
    <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Personnages", href: "/personnages" },
            { label: "Professeurs" },
          ]}
        />

        <h1 className="mt-6 text-4xl font-black text-foreground sm:text-5xl">
          Professeurs
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
          Les professeurs référents de l&apos;Académie, par niveau.
        </p>

        <div className="mt-12 space-y-12">
          {/* Maternelle : pas encore de professeurs */}
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Maternelle
            </h2>
            <div className="flex flex-col rounded-md border border-white/10 bg-white/[0.025] p-5">
              <p className="text-sm font-bold text-foreground">À venir</p>
              <span className="mt-2 inline-flex w-fit rounded bg-white/[0.06] px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                En préparation
              </span>
            </div>
          </section>

          {/* Primaire */}
          <ProfessorGroup
            title="Primaire"
            professors={professorProfiles.filter((p) => p.stage === "primaire")}
          />

          {/* Collège */}
          <ProfessorGroup
            title="Collège"
            professors={professorProfiles.filter((p) => p.stage === "college")}
          />

          {/* Lycée : pas encore de professeurs dédiés */}
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Lycée
            </h2>
            <div className="flex flex-col rounded-md border border-white/10 bg-white/[0.025] p-5">
              <p className="text-sm font-bold text-foreground">À venir</p>
              <span className="mt-2 inline-flex w-fit rounded bg-white/[0.06] px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                En préparation
              </span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ProfessorGroup({
  title,
  professors,
}: {
  title: string;
  professors: typeof professorProfiles;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {professors.map((professor) => (
          <Link
            key={professor.slug}
            href={professor.profileHref}
            className="group flex flex-col rounded-md border border-gold/30 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-gold/55 hover:bg-gold/[0.09] focus:outline-none focus:ring-2 focus:ring-gold/60"
          >
            <h3 className="text-lg font-black text-foreground">
              {professor.name}
            </h3>
            <p className="mt-1 text-xs font-semibold text-gold">
              {professor.mainSubject}
            </p>
            <p className="mt-2 text-sm font-bold text-muted">
              {professor.levelLabel} — {professor.cycle}
            </p>
            <span className="mt-4 inline-flex text-sm font-black text-gold transition group-hover:translate-x-1">
              Découvrir →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

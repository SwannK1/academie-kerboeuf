import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatusKey } from "@/content/public-status";
import { professorProfiles } from "@/content/professors";

export const metadata: Metadata = {
  title: "Professeurs | Personnages | Académie Kerboeuf",
  description:
    "Les professeurs référents de l'Académie Kerboeuf, par cycle.",
};

type ProfessorTile = {
  name: string;
  level: string;
  href?: string;
  status: "available" | "upcoming" | "in-progress";
};

type Group = {
  title: string;
  professors: ProfessorTile[];
};

const primaireProfs = professorProfiles
  .filter((p) => p.cycle === "Cycle 2" || p.cycle === "Cycle 3")
  .map((p) => ({
    name: p.name,
    level: p.levelLabel,
    href: p.profileHref,
    status: "available" as const,
  }));

const collegeProfs = professorProfiles
  .filter((p) => p.cycle === "Cycle 4")
  .map((p) => ({
    name: p.name,
    level: p.levelLabel,
    href: p.profileHref,
    status: "available" as const,
  }));

const lyceeProfs = professorProfiles
  .filter((p) => p.cycle === "Lycée")
  .map((p) => ({
    name: p.name,
    level: p.levelLabel,
    href: p.profileHref,
    status: "available" as const,
  }));

const GROUPS: Group[] = [
  {
    title: "Professeurs maternelle",
    professors: [
      { name: "À venir", level: "PS · MS · GS", status: "in-progress" },
    ],
  },
  {
    title: "Professeurs primaire",
    professors: primaireProfs,
  },
  {
    title: "Professeurs collège",
    professors: collegeProfs,
  },
  {
    title: "Professeurs lycée",
    professors: lyceeProfs,
  },
];

export default function PersonnagesProfesseursPage() {
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
          Les professeurs référents qui accompagnent chaque niveau de
          l&apos;Académie.
        </p>

        <div className="mt-12 space-y-12">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-jade">
                {group.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {group.professors.map((professor) => (
                  <ProfessorTile
                    key={`${group.title}-${professor.name}`}
                    professor={professor}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function ProfessorTile({ professor }: { professor: ProfessorTile }) {
  const isAvailable = getPublicStatusKey(professor.status) === "available";
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-black text-foreground">{professor.name}</h3>
        <PublicStatusBadge status={professor.status} />
      </div>
      <p className="mt-2 text-sm font-bold text-muted">{professor.level}</p>
      {isAvailable ? (
        <span className="mt-4 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
          Découvrir →
        </span>
      ) : null}
    </>
  );

  if (isAvailable && professor.href) {
    return (
      <Link
        href={professor.href}
        className="group flex flex-col rounded-md border border-jade/30 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-jade/55 hover:bg-jade/[0.09] focus:outline-none focus:ring-2 focus:ring-gold/60"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex flex-col rounded-md border border-white/10 bg-white/[0.025] p-5">
      {content}
    </div>
  );
}

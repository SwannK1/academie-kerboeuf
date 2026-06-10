import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { professorProfiles } from "@/content/professors";

export const metadata: Metadata = {
  title: "Professeurs | Académie Kerboeuf",
  description:
    "Les professeurs de matière de l'Académie Kerboeuf, organisés par niveau : maternelle, primaire, collège, lycée.",
};

// Professeurs de matière du primaire (hors personnages-guides de niveau)
const PRIMAIRE_SLUGS = ["rosa", "hector", "melina", "elias", "pablo", "naia", "max"];
// Professeurs de matière du collège
const COLLEGE_SLUGS = ["oria", "enzo", "maia", "akira"];

function bySlugs(slugs: string[]) {
  return slugs
    .map((slug) => professorProfiles.find((p) => p.slug === slug))
    .filter((p): p is (typeof professorProfiles)[number] => Boolean(p));
}

const SECTIONS = [
  { title: "Professeurs maternelle", professors: bySlugs([]) },
  { title: "Professeurs primaire", professors: bySlugs(PRIMAIRE_SLUGS) },
  { title: "Professeurs collège", professors: bySlugs(COLLEGE_SLUGS) },
  { title: "Professeurs lycée", professors: bySlugs([]) },
];

export default function ProfesseursPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Professeurs" }]}
          />
        </div>
      </div>

      <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
            Galerie officielle
          </p>
          <h1 className="mt-5 text-4xl font-black leading-[0.95] text-foreground sm:text-5xl">
            Les Professeurs
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Les professeurs de matière de l&rsquo;Académie Kerboeuf, organisés
            par niveau.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-md border border-white/10 bg-white/[0.025] p-6"
            >
              <h2 className="text-xl font-black text-foreground">
                {section.title}
              </h2>

              {section.professors.length > 0 ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {section.professors.map((professor) => (
                    <Link
                      key={professor.slug}
                      href={professor.profileHref}
                      className="group flex flex-col rounded-md border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-white/20"
                    >
                      {professor.avatarImage ? (
                        <div className="size-14 overflow-hidden rounded-md border border-white/10">
                          <Image
                            src={professor.avatarImage}
                            alt={professor.name}
                            width={56}
                            height={56}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="grid size-14 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-lg font-black text-foreground">
                          {professor.initial}
                        </div>
                      )}
                      <h3 className="mt-4 text-lg font-black text-foreground">
                        {professor.name}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-jade">
                        {professor.mainSubject}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {professor.role}
                      </p>
                      <span className="mt-4 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
                        Découvrir →
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm font-bold text-muted">
                  En préparation
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

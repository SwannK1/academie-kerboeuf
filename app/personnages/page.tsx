import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { professorProfiles } from "@/content/professors";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description:
    "Les personnages-guides de l'Académie Kerboeuf accompagnent les élèves niveau par niveau, de la maternelle au lycée.",
};

type GuideEntry = {
  level: string;
  slug?: string;
};

const PRIMAIRE_GUIDES: GuideEntry[] = [
  { level: "CP", slug: "zoe" },
  { level: "CE1", slug: "gaston" },
  { level: "CE2", slug: "esteban" },
  { level: "CM1", slug: "noisette" },
  { level: "CM2", slug: "felix" },
];

const SECTIONS: { title: string; guides: GuideEntry[] }[] = [
  { title: "Personnages maternelle", guides: [] },
  { title: "Personnages primaire", guides: PRIMAIRE_GUIDES },
  { title: "Personnages collège", guides: [] },
  { title: "Personnages lycée", guides: [] },
];

export default function PersonnagesPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Personnages" }]}
          />
        </div>
      </div>

      <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-jade">
            Guides pédagogiques
          </p>
          <h1 className="mt-5 text-4xl font-black leading-[0.95] text-foreground sm:text-5xl">
            Les Personnages
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Les personnages ne sont pas des professeurs de matière. Ce sont des
            guides pédagogiques qui accompagnent les élèves au fil des niveaux
            et des missions de l&rsquo;Académie Kerboeuf.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          {SECTIONS.map((section) => {
            const entries = section.guides.map((entry) => ({
              level: entry.level,
              profile: entry.slug
                ? professorProfiles.find((p) => p.slug === entry.slug)
                : undefined,
            }));

            return (
              <div
                key={section.title}
                className="rounded-md border border-white/10 bg-white/[0.025] p-6"
              >
                <h2 className="text-xl font-black text-foreground">
                  {section.title}
                </h2>

                {entries.length > 0 ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {entries.map(({ level, profile }) => (
                      <div
                        key={level}
                        className="flex flex-col rounded-md border border-white/10 bg-white/[0.035] p-5"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-jade">
                          {level}
                        </p>

                        {profile ? (
                          <>
                            {profile.avatarImage ? (
                              <div className="mt-4 size-16 overflow-hidden rounded-md border border-white/10">
                                <Image
                                  src={profile.avatarImage}
                                  alt={profile.name}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ) : null}
                            <h3 className="mt-4 text-lg font-black text-foreground">
                              {profile.name}
                            </h3>
                            <p className="mt-1 text-sm font-bold text-jade">
                              {profile.role}
                            </p>
                            {profile.description ? (
                              <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                                {profile.description}
                              </p>
                            ) : null}
                            {profile.profileHref ? (
                              <Link
                                href={profile.profileHref}
                                className="mt-4 inline-flex text-sm font-black text-jade transition hover:translate-x-1"
                              >
                                Découvrir →
                              </Link>
                            ) : null}
                          </>
                        ) : (
                          <p className="mt-6 text-sm font-bold text-muted">
                            En préparation
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-5 text-sm font-bold text-muted">
                    En préparation
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

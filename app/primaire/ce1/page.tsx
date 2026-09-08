import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { buildPageMetadata } from "@/content/seo";
import { ce1Subjects } from "@/content/ce1-subjects";
import { getSubjectTeacher } from "@/content/subject-teacher-link";
import { CE1_ACCENT } from "@/lib/ce1-accent";

export const metadata = buildPageMetadata({
  title: "CE1",
  description: "Accès direct aux matières et ressources du CE1, Cycle 2.",
  path: "/primaire/ce1",
});

export default function Ce1Page() {
  return (
    <main id="contenu-principal" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Primaire", href: "/primaire" },
            { label: "CE1" },
          ]}
        />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <p className="rounded-md border border-sky/35 bg-sky/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sky">
            Cycle 2 · avec Gaston
          </p>
        </div>
        <h1 className="mt-5 text-4xl font-black text-foreground sm:text-5xl">
          Ressources CE1
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          Choisissez une matière pour accéder à ses domaines, compétences et
          ressources. Les personnages restent vos guides, la matière reste
          toujours explicite.
        </p>

        <section aria-labelledby="matieres-ce1" className="mt-10">
          <h2 id="matieres-ce1" className="text-xl font-black text-foreground">
            Matières
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ce1Subjects.map((subject) => {
              const accent = CE1_ACCENT[subject.accent] ?? CE1_ACCENT.gold;
              const teacher = getSubjectTeacher(subject.slug);

              return (
                <Link
                  key={subject.slug}
                  href={`/primaire/ce1/matieres/${subject.slug}`}
                  className={`group flex min-h-52 flex-col rounded-md border ${accent.border} bg-white/[0.04] p-5 transition hover:-translate-y-0.5 ${accent.hoverBg} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className={`text-xl font-black ${accent.text}`}>
                      {subject.title}
                    </p>
                    <PublicStatusBadge status={subject.status} />
                  </div>
                  {teacher ? (
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                      avec {teacher.name}
                    </p>
                  ) : null}
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                    {subject.shortDescription}
                  </p>
                  <span className={`mt-4 text-sm font-black ${accent.text}`}>
                    Voir les compétences →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

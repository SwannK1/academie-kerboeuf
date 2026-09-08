import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import type { AcademyLevel } from "@/content/academy";
import { ce2Subjects } from "@/content/ce2-subjects";
import { cm1Subjects } from "@/content/cm1-subjects";
import { cpSubjects } from "@/content/cp-subjects";
import { getSubjectTeacher } from "@/content/subject-teacher-link";

type Props = { level: AcademyLevel };

const subjectsByLevel = {
  cp: cpSubjects,
  ce2: ce2Subjects,
  cm1: cm1Subjects,
} as const;

export function PrimaireLevelEntry({ level }: Props) {
  const slug = level.slug as keyof typeof subjectsByLevel;
  const subjects = subjectsByLevel[slug] ?? [];

  return (
    <main id="contenu-principal" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Primaire", href: "/primaire" },
            { label: level.label },
          ]}
        />

        <p className="mt-8 inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-jade">
          {level.cycle} · avec {level.professor.name}
        </p>
        <h1 className="mt-5 text-4xl font-black text-foreground sm:text-5xl">
          Ressources {level.label}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          Choisissez une matière pour accéder à ses domaines, compétences et
          ressources. Les personnages restent vos guides, la matière reste
          toujours explicite.
        </p>

        <section aria-labelledby={`matieres-${slug}`} className="mt-10">
          <h2 id={`matieres-${slug}`} className="text-xl font-black text-foreground">
            Matières
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const teacher = getSubjectTeacher(subject.slug);

              return (
                <Link
                  key={subject.slug}
                  href={`/primaire/${slug}/matieres/${subject.slug}`}
                  className="group flex min-h-52 min-w-0 flex-col rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-jade/35 hover:bg-jade/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jade"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="min-w-0 text-xl font-black text-foreground">
                      {subject.title}
                    </h3>
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
                  <span className="mt-4 text-sm font-black text-jade">
                    Voir les compétences →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <nav
          aria-label={`Liens secondaires ${level.label}`}
          className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-6"
        >
          <Link
            href={`/primaire/${slug}/competences`}
            className="text-sm font-bold text-muted transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jade"
          >
            Programme et compétences complets
          </Link>
          <Link
            href={`/primaire/${slug}/missions`}
            className="text-sm font-bold text-muted transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jade"
          >
            Missions transversales
          </Link>
        </nav>
      </div>
    </main>
  );
}

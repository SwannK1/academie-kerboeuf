import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { emblematicStudents } from "@/content/students";
import { professorProfiles } from "@/content/professors";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description: "Les guides de niveau et les professeurs de l'Académie Kerboeuf.",
};

const breadcrumb = [
  { label: "Accueil", href: "/" },
  { label: "Univers", href: "/univers" },
  { label: "Personnages" },
];

// Les guides élèves-niveau sont déjà classés par cycle dans le contenu source.
const guides = emblematicStudents.map((student) => ({
  slug: student.slug,
  name: student.name,
  animal: student.animal,
  level: student.level,
  levelSlug: student.levelSlug,
  description: student.shortDescription,
  href: `/eleves/${student.slug}`,
}));

// Mêmes regroupements que /personnages/eleves, pour rester cohérent avec le
// reste du site et ne pas inventer de nouvelle taxonomie de niveaux.
const guideStages = [
  {
    title: "Maternelle",
    levels: ["ps", "ms", "gs"],
  },
  {
    title: "Élémentaire",
    levels: ["cp", "ce1", "ce2", "cm1", "cm2"],
  },
  {
    title: "Collège",
    levels: ["6e", "5e", "4e", "3e"],
  },
  {
    title: "Lycée",
    levels: ["seconde", "premiere", "terminale"],
  },
] as const;

// Félix double comme professeur de niveau CM2 dans le contenu académique,
// mais il reste un guide d'élève côté navigation (cf. content/professors.ts).
const subjectProfessors = professorProfiles.filter(
  (professor) =>
    professor.characterType === "professeur référent" &&
    professor.slug !== "felix",
);

const referentProfessors = professorProfiles.filter(
  (professor) => professor.characterType === "personnalité officielle",
);

function groupBySubject<T extends { mainSubject: string }>(
  items: T[],
): { subject: string; items: T[] }[] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const list = groups.get(item.mainSubject) ?? [];
    list.push(item);
    groups.set(item.mainSubject, list);
  }
  return [...groups.entries()].map(([subject, items]) => ({ subject, items }));
}

export default function PersonnagesPage() {
  const professorsBySubject = groupBySubject(subjectProfessors);
  const referentsBySubject = groupBySubject(referentProfessors);

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb items={breadcrumb} />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Personnages
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Qui accompagne les apprentissages ?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Les personnages de l&apos;Académie Kerboeuf accompagnent les
            élèves selon leur niveau, leur rôle et les disciplines.
          </p>
        </div>
      </section>

      <PersonnagesSection
        title="Guides de niveau"
        description="Un guide par niveau, de la maternelle au lycée, qui incarne une posture d'apprentissage propre à son étage de l'Académie."
      >
        <div className="space-y-8">
          {guideStages.map((stage) => {
            const stageGuides = guides.filter((guide) =>
              (stage.levels as readonly string[]).includes(guide.levelSlug),
            );
            if (stageGuides.length === 0) return null;
            return (
              <div key={stage.title}>
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-muted">
                  {stage.title}
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {stageGuides.map((guide) => (
                    <CharacterCard
                      key={guide.slug}
                      name={guide.name}
                      meta={`${guide.animal} · ${guide.level}`}
                      description={guide.description}
                      href={guide.href}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </PersonnagesSection>

      <PersonnagesSection
        title="Professeurs de matière"
        description="Les référents pédagogiques d'un niveau précis, classés par matière, du CP à la 3e."
      >
        <div className="space-y-8">
          {professorsBySubject.map((group) => (
            <div key={group.subject}>
              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-muted">
                {group.subject}
              </h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((professor) => (
                  <CharacterCard
                    key={professor.slug}
                    name={professor.name}
                    meta={`${professor.role} · ${professor.levelLabel}`}
                    description={professor.description}
                    href={`/professeurs/${professor.slug}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PersonnagesSection>

      {referentProfessors.length > 0 ? (
        <PersonnagesSection
          title="Professeurs référents"
          description="Les professeurs référents accompagnent toute l'Académie sur leur discipline, au-delà d'un seul niveau."
        >
          <div className="space-y-8">
            {referentsBySubject.map((group) => (
              <div key={group.subject}>
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-muted">
                  {group.subject}
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((professor) => (
                    <CharacterCard
                      key={professor.slug}
                      name={professor.name}
                      meta={`${professor.role}`}
                      description={`Discipline : ${professor.mainSubject}`}
                      href={`/professeurs/${professor.slug}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PersonnagesSection>
      ) : null}
    </main>
  );
}

function PersonnagesSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-white/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-black text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          {description}
        </p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function CharacterCard({
  name,
  meta,
  description,
  href,
}: {
  name: string;
  meta: string;
  description: string;
  href?: string;
}) {
  const content = (
    <>
      <h4 className="text-base font-black text-foreground">{name}</h4>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-gold">
        {meta}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      {href ? (
        <span className="mt-4 inline-flex text-sm font-black text-foreground">
          Voir la fiche <span aria-hidden="true">&nbsp;→</span>
        </span>
      ) : (
        <span className="mt-4 inline-flex text-sm font-bold text-muted">
          Fiche détaillée à venir
        </span>
      )}
    </>
  );

  const className =
    "rounded-lg border border-white/10 bg-white/[0.03] p-5 sm:p-6";

  return href ? (
    <Link
      href={href}
      className={`${className} block transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]`}
    >
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
  );
}

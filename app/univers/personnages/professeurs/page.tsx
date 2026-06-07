import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getProfessorCharacters } from "@/content/academy-characters";

export const metadata: Metadata = {
  title: "Professeurs | Académie Kerboeuf",
  description:
    "Les professeurs référents de l'Académie Kerboeuf — matières, niveaux et rôles pédagogiques.",
};

type Category = {
  key: string;
  label: string;
  levels: string[];
};

const categories: Category[] = [
  { key: "maternelle", label: "Maternelle", levels: ["PS", "MS", "GS"] },
  {
    key: "primaire",
    label: "Primaire",
    levels: ["CP", "CE1", "CE2", "CM1", "CM2"],
  },
  { key: "college", label: "Collège", levels: ["6e", "5e", "4e", "3e"] },
  { key: "lycee", label: "Lycée", levels: ["2nde", "1ère", "Terminale"] },
];

function matchesCategory(
  professorLevels: string[],
  category: Category,
): boolean {
  return professorLevels.some((l) => category.levels.includes(l));
}

export default function ProfesseursPage() {
  const professors = getProfessorCharacters();

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Univers", href: "/univers" },
              { label: "Personnages", href: "/univers/personnages" },
              { label: "Professeurs" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Académie Kerboeuf
            </p>
            <h1 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
              Les professeurs
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Chaque professeur référent porte une matière et une posture
              d&apos;enseignement. Ils servent de fil conducteur dans les
              séquences et les missions pédagogiques.
            </p>
          </div>
        </div>
      </section>

      {categories.map((category) => {
        const group = professors.filter((p) =>
          matchesCategory(p.levels, category),
        );
        if (group.length === 0) return null;

        return (
          <section key={category.key} className="px-4 pb-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-xl font-black text-foreground">
                {category.label}
              </h2>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {group.map((professor) => (
                  <article
                    key={professor.slug}
                    className="rounded-md border border-white/10 bg-white/[0.04] p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black text-foreground">
                          {professor.name}
                        </h3>
                        <p className="mt-0.5 text-xs font-semibold text-muted">
                          {professor.species}
                        </p>
                      </div>
                      <PublicStatusBadge status={professor.publicStatus} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded bg-gold/10 px-2 py-0.5 font-mono text-xs font-bold text-gold">
                        {professor.mainSubject}
                      </span>
                    </div>

                    <p className="mt-4 text-xs leading-6 text-muted">
                      {professor.shortDescription}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {professor.levels.map((level) => (
                        <span
                          key={level}
                          className="rounded border border-white/10 px-2 py-0.5 text-xs font-semibold text-muted"
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

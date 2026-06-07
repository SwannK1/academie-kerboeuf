import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  academyCharacters,
  type AcademyProfessorCharacter,
  type LevelGroup,
} from "@/content/academy-characters";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description:
    "Les professeurs et guides de l'Académie Kerboeuf — matières, rôles pédagogiques et fonctions dans les apprentissages.",
};

const levelGroupLabels: Record<LevelGroup, string> = {
  guide: "Guide de niveau",
  maternelle: "Professeurs maternelle",
  primaire: "Professeurs primaire",
  collège: "Professeurs collège",
  lycée: "Professeurs lycée",
  transversal: "Professeurs transversaux",
};

const levelGroupOrder: LevelGroup[] = [
  "guide",
  "maternelle",
  "primaire",
  "collège",
  "lycée",
  "transversal",
];

function CharacterCard({
  character,
}: {
  character: AcademyProfessorCharacter;
}) {
  return (
    <article className="relative rounded-md border border-white/10 bg-white/[0.04] p-6">
      <Link
        href={`/univers/personnages/${character.slug}`}
        className="absolute inset-0 rounded-md"
        aria-label={character.name}
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-foreground">
            {character.name}
          </h3>
          <p className="mt-0.5 text-xs font-semibold text-muted">
            {character.species}
          </p>
        </div>
        <PublicStatusBadge status={character.publicStatus} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded bg-gold/10 px-2 py-0.5 font-mono text-xs font-bold text-gold">
          {character.mainSubject}
        </span>
        <span className="rounded bg-white/[0.07] px-2 py-0.5 font-mono text-xs font-semibold capitalize text-muted">
          {character.role}
        </span>
      </div>

      <p className="mt-4 text-xs leading-6 text-muted">
        {character.shortDescription}
      </p>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground/60">
          Dans les apprentissages
        </p>
        <ul className="mt-2 space-y-1">
          {character.learningFunction.map((fn) => (
            <li
              key={fn}
              className="flex items-start gap-2 text-xs leading-5 text-muted"
            >
              <span className="mt-px shrink-0 text-jade">–</span>
              {fn}
            </li>
          ))}
        </ul>
      </div>

      {character.levels.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1">
          {character.levels.map((level) => (
            <span
              key={level}
              className="rounded border border-white/10 px-2 py-0.5 text-xs font-semibold text-muted"
            >
              {level}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default function PersonnagesPage() {
  const grouped = levelGroupOrder.reduce<
    Record<LevelGroup, AcademyProfessorCharacter[]>
  >(
    (acc, group) => {
      acc[group] = academyCharacters.filter((c) => c.levelGroup === group);
      return acc;
    },
    {
      guide: [],
      maternelle: [],
      primaire: [],
      collège: [],
      lycée: [],
      transversal: [],
    },
  );

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Univers", href: "/univers" },
              { label: "Personnages" },
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
              Les personnages
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Professeurs référents et guide de l&apos;Académie — chacun porte
              une matière, un rôle pédagogique clair et une façon propre
              d&apos;accompagner les apprentissages.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {levelGroupOrder.map((group) => {
              const characters = grouped[group];
              if (characters.length === 0) return null;
              return (
                <div key={group}>
                  <h2 className="text-lg font-black text-foreground">
                    {levelGroupLabels[group]}
                  </h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {characters.map((character) => (
                      <CharacterCard
                        key={character.slug}
                        character={character}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

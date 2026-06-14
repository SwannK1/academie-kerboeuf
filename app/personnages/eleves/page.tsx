import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Élèves | Personnages | Académie Kerboeuf",
  description:
    "Les personnages-élèves qui guident chaque niveau de l'Académie Kerboeuf.",
};

type CharacterCard = {
  name: string;
  level: string;
  href?: string;
  status: "available" | "upcoming" | "in-progress";
};

type Group = {
  title: string;
  characters: CharacterCard[];
};

const GROUPS: Group[] = [
  {
    title: "Personnages maternelle",
    characters: [
      { name: "À venir", level: "PS · MS · GS", status: "in-progress" },
    ],
  },
  {
    title: "Personnages primaire",
    characters: [
      { name: "Zoé", level: "CP", status: "in-progress" },
      { name: "Gaston", level: "CE1", status: "in-progress" },
      { name: "Esteban", level: "CE2", status: "in-progress" },
      { name: "Noisette", level: "CM1", status: "in-progress" },
      { name: "Félix", level: "CM2", href: "/personnages/felix", status: "available" },
    ],
  },
  {
    title: "Personnages collège",
    characters: [
      { name: "À venir", level: "6e · 5e · 4e · 3e", status: "in-progress" },
    ],
  },
  {
    title: "Personnages lycée",
    characters: [
      { name: "À venir", level: "Seconde · Première · Terminale", status: "in-progress" },
    ],
  },
];

export default function PersonnagesElevesPage() {
  return (
    <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Personnages", href: "/personnages" },
            { label: "Élèves" },
          ]}
        />

        <h1 className="mt-6 text-4xl font-black text-foreground sm:text-5xl">
          Élèves
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
          Les guides qui accompagnent chaque niveau de l&apos;Académie.
        </p>

        <div className="mt-12 space-y-12">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-jade">
                {group.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {group.characters.map((character) => (
                  <CharacterTile key={`${group.title}-${character.name}`} character={character} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function CharacterTile({ character }: { character: CharacterCard }) {
  const isAvailable = getPublicStatusKey(character.status) === "available";
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-black text-foreground">{character.name}</h3>
        <PublicStatusBadge status={character.status} />
      </div>
      <p className="mt-2 text-sm font-bold text-muted">{character.level}</p>
      {isAvailable ? (
        <span className="mt-4 inline-flex text-sm font-black text-jade transition group-hover:translate-x-1">
          Découvrir →
        </span>
      ) : null}
    </>
  );

  if (isAvailable && character.href) {
    return (
      <Link
        href={character.href}
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

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { professorProfiles } from "@/content/professors";
import { TeamSection, type PersonCardData } from "../professeurs/_components/team-section";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description:
    "Les guides pédagogiques de l'Académie Kerboeuf, un par niveau, du CP au CM2.",
};

// Guides pédagogiques de niveau, du CP au CM2.
const LEVEL_GUIDE_SLUGS = ["zoe", "gaston", "esteban", "noisette", "felix"];

function toCardData(profile: (typeof professorProfiles)[number]): PersonCardData {
  return {
    slug: profile.slug,
    profileHref: profile.profileHref,
    name: profile.name,
    role: profile.role,
    subtitle: profile.levelLabel,
    description: profile.description,
    initial: profile.initial,
    avatarImage: profile.avatarImage,
    accentColor: profile.accentColor,
  };
}

export default function PersonnagesPage() {
  const primaire = LEVEL_GUIDE_SLUGS.map((slug) =>
    professorProfiles.find((p) => p.slug === slug),
  )
    .filter((p): p is (typeof professorProfiles)[number] => Boolean(p))
    .map(toCardData);

  return (
    <main className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Personnages" }]}
        />

        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.28em] text-jade">
          Les guides de l&rsquo;Académie
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-foreground sm:text-5xl">
          Personnages
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Chaque niveau a son guide pédagogique : un repère visuel et narratif qui
          accompagne les élèves tout au long de l&rsquo;année. Les professeurs de
          matière sont présentés sur la page{" "}
          <Link href="/professeurs" className="font-bold text-jade hover:underline">
            Professeurs
          </Link>
          .
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <TeamSection
            title="Personnages Maternelle"
            subtitle="PS · MS · GS"
            accent="sky"
            people={[]}
            emptyLabel="En préparation."
          />

          <TeamSection
            title="Personnages Primaire"
            subtitle="CP · CE1 · CE2 · CM1 · CM2"
            accent="jade"
            people={primaire}
            emptyLabel="En préparation."
          />

          <TeamSection
            title="Personnages Collège"
            subtitle="6e à la 3e"
            accent="gold"
            people={[]}
            emptyLabel="En préparation."
          />

          <TeamSection
            title="Personnages Lycée"
            subtitle="Seconde à la Terminale"
            accent="ember"
            people={[]}
            emptyLabel="En préparation."
          />
        </div>
      </div>
    </main>
  );
}

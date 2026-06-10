import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { professorProfiles } from "@/content/professors";
import { TeamSection, type PersonCardData } from "./_components/team-section";

export const metadata: Metadata = {
  title: "Professeurs | Académie Kerboeuf",
  description:
    "Les professeurs de matière de l'Académie Kerboeuf — du primaire au lycée, organisés par équipe pédagogique.",
};

// Équipe primaire validée : professeurs de matière (CP à CM2).
const PRIMAIRE_TEAM_SLUGS = ["rosa", "hector", "melina", "elias", "pablo", "naia", "max"];

function toCardData(profile: (typeof professorProfiles)[number]): PersonCardData {
  return {
    slug: profile.slug,
    profileHref: profile.profileHref,
    name: profile.name,
    role: profile.role,
    subtitle: `${profile.mainSubject} · ${profile.levelLabel}`,
    description: profile.description,
    initial: profile.initial,
    avatarImage: profile.avatarImage,
    accentColor: profile.accentColor,
  };
}

export default function ProfesseursPage() {
  const dedupe = (list: typeof professorProfiles) => {
    const seen = new Set<string>();
    return list.filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
  };

  const primaire = PRIMAIRE_TEAM_SLUGS.map((slug) =>
    professorProfiles.find((p) => p.slug === slug),
  )
    .filter((p): p is (typeof professorProfiles)[number] => Boolean(p))
    .map(toCardData);

  const college = dedupe(professorProfiles.filter((p) => p.stage === "college")).map(toCardData);
  const lycee = dedupe(professorProfiles.filter((p) => p.stage === "lycee")).map(toCardData);

  return (
    <main className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Professeurs" }]}
        />

        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
          L&rsquo;équipe pédagogique
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-foreground sm:text-5xl">
          Professeurs
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Les professeurs de matière de l&rsquo;Académie Kerboeuf, par équipe
          pédagogique. Les guides de niveau sont présentés sur la page{" "}
          <Link href="/personnages" className="font-bold text-jade hover:underline">
            Personnages
          </Link>
          .
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <TeamSection
            title="Professeurs Maternelle"
            subtitle="PS · MS · GS"
            accent="sky"
            people={[]}
            emptyLabel="Équipe maternelle en préparation."
          />

          <TeamSection
            title="Professeurs Primaire"
            subtitle="CP au CM2"
            accent="jade"
            people={primaire}
            emptyLabel="Équipe primaire en préparation."
          />

          <TeamSection
            title="Professeurs Collège"
            subtitle="6e à la 3e"
            accent="gold"
            people={college}
            emptyLabel="Équipe collège en préparation."
          />

          <TeamSection
            title="Professeurs Lycée"
            subtitle="Seconde à la Terminale"
            accent="ember"
            people={lycee}
            emptyLabel="Équipe lycée en préparation."
          />
        </div>
      </div>
    </main>
  );
}

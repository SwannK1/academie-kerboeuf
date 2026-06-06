import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { academyCharacters } from "@/content/academy-characters";
import { getProfessorBySlug } from "@/content/professors";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description:
    "Guides, professeurs et personnages de l'Académie Kerboeuf — rôles pédagogiques, matières et niveaux.",
};

const guides = academyCharacters.filter((c) => c.role === "guide");
const professeurs = academyCharacters.filter((c) => c.role === "professeur");

function characterHref(slug: string, role: string): string | null {
  if (role === "professeur" && getProfessorBySlug(slug)) {
    return `/professeurs/${slug}`;
  }
  return null;
}

export default function PersonnagesPage() {
  return (
    <main>
      {/* Breadcrumb */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Personnages" }]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10"
          style={{
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 60% at 0% 20%, rgba(80,200,164,0.08), transparent 65%)",
          }}
        />

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-start">
            <div>
              <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-jade">
                Académie Kerboeuf
              </p>

              <h1 className="mt-5 text-4xl font-black leading-[0.92] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Les Personnages
                <br />
                <span className="text-foreground/50">de l&rsquo;Académie</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-muted">
                Guides, professeurs et élèves accompagnent chaque apprentissage.
                Chaque personnage porte une matière, un ton et une méthode.
              </p>
            </div>

            {/* Panneau stats */}
            <aside className="rounded-md border border-white/10 bg-white/[0.035] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-jade">
                Galerie
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <StatBlock value={String(guides.length)} label="Guide" />
                <StatBlock
                  value={String(professeurs.length)}
                  label="Professeurs"
                />
                <StatBlock value="0" label="Élèves" dim />
                <StatBlock value="0" label="Secondaires" dim />
              </div>
              <p className="mt-5 text-xs leading-6 text-muted">
                Tous les personnages du primaire sont disponibles. Collège,
                lycée et maternelle arrivent prochainement.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Section : Guides de niveau */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Rôle transversal"
            title="Guides de niveau"
            count={guides.length}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {guides.map((c) => {
              const href = characterHref(c.slug, c.role);
              return (
                <CharacterCard key={c.slug} character={c} href={href} accent="jade" />
              );
            })}
          </div>
        </div>
      </section>

      {/* Section : Professeurs */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Primaire · CP → CM2"
            title="Professeurs référents"
            count={professeurs.length}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {professeurs.map((c) => {
              const href = characterHref(c.slug, c.role);
              return (
                <CharacterCard key={c.slug} character={c} href={href} accent="gold" />
              );
            })}
          </div>
        </div>
      </section>

      {/* Section : Élèves — à venir */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="À venir"
            title="Élèves"
            count={0}
          />
          <div className="mt-6 rounded-md border border-white/8 bg-white/[0.025] px-6 py-8 text-center">
            <p className="text-sm text-muted">
              Les fiches élèves seront ajoutées prochainement.
            </p>
          </div>
        </div>
      </section>

      {/* Section : Personnages secondaires — à venir */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="À venir"
            title="Personnages secondaires"
            count={0}
          />
          <div className="mt-6 rounded-md border border-white/8 bg-white/[0.025] px-6 py-8 text-center">
            <p className="text-sm text-muted">
              Les personnages secondaires de l&rsquo;Académie arrivent prochainement.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Composants locaux ────────────────────────────────────────────────────────

function SectionHeader({
  label,
  title,
  count,
}: {
  label: string;
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-end justify-between border-b border-white/8 pb-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
          {label}
        </p>
        <h2 className="mt-1 text-xl font-black text-foreground">{title}</h2>
      </div>
      {count > 0 && (
        <span className="text-xs font-semibold text-muted">{count}</span>
      )}
    </div>
  );
}

function StatBlock({
  value,
  label,
  dim,
}: {
  value: string;
  label: string;
  dim?: boolean;
}) {
  return (
    <div className="rounded-md border border-white/8 bg-white/[0.03] px-4 py-3">
      <p
        className={`text-2xl font-black ${dim ? "text-foreground/30" : "text-foreground"}`}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
  );
}

type CharacterCardProps = {
  character: (typeof academyCharacters)[number];
  href: string | null;
  accent: "jade" | "gold";
};

function CharacterCard({ character, href, accent }: CharacterCardProps) {
  const accentClasses = {
    jade: {
      border: "border-jade/25 hover:border-jade/50",
      subject: "bg-jade/10 text-jade",
    },
    gold: {
      border: "border-gold/25 hover:border-gold/50",
      subject: "bg-gold/10 text-gold",
    },
  };

  const inner = (
    <div className="flex h-full flex-col gap-4">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-foreground">{character.name}</h3>
          <p className="mt-0.5 text-xs font-semibold text-muted">
            {character.species}
          </p>
        </div>
        <PublicStatusBadge status={character.publicStatus} className="shrink-0" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${accentClasses[accent].subject}`}
        >
          {character.mainSubject}
        </span>
        <span className="rounded bg-white/[0.07] px-2 py-0.5 font-mono text-xs font-semibold capitalize text-muted">
          {character.role}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs leading-6 text-muted">{character.shortDescription}</p>

      {/* Niveaux */}
      {character.levels.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1">
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

      {/* Lien si disponible */}
      {href && (
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-jade">
          Voir la fiche →
        </p>
      )}
    </div>
  );

  const baseClass = `rounded-md border bg-white/[0.04] p-5 transition ${accentClasses[accent].border}`;

  if (href) {
    return (
      <Link href={href} className={`${baseClass} hover:-translate-y-px`}>
        {inner}
      </Link>
    );
  }

  return <article className={baseClass}>{inner}</article>;
}

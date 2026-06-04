import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { academyCharacters } from "@/content/academy-characters";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description:
    "Les guides et professeurs de l'Académie Kerboeuf — des repères pédagogiques au service des apprentissages.",
};

export default function PersonnagesPage() {
  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
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

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Académie Kerboeuf
          </p>
          <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
            Personnages de l&apos;Académie
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Les guides et professeurs qui accompagnent les élèves.
          </p>
        </div>
      </section>

      {/* ── Grille des personnages ──────────────────────────────────────────── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {academyCharacters.map((character) => (
              <article
                key={character.slug}
                className="rounded-md border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    {character.species}
                  </p>
                  <PublicStatusBadge status={character.publicStatus} />
                </div>
                <h2 className="mt-2 text-lg font-black text-foreground">
                  {character.name}
                </h2>
                <p className="mt-1 text-xs font-semibold text-gold">
                  {character.role === "guide" ? "Guide" : "Professeur"} ·{" "}
                  {character.mainSubject}
                </p>
                <p className="mt-3 text-xs leading-6 text-muted">
                  {character.shortDescription}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {character.levels.map((level) => (
                    <span
                      key={level}
                      className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs font-bold text-muted"
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

      {/* ── Rôle pédagogique ────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-panel/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Rôle pédagogique
          </p>
          <h2 className="mt-4 text-2xl font-black text-foreground">
            Une équipe au service des apprentissages
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Les personnages de l&apos;Académie Kerboeuf ne sont pas décoratifs.
            Chacun incarne une matière, une posture d&apos;enseignement et un
            rapport au savoir. Ils servent de repères stables pour les élèves :
            un nom, une espèce, une façon d&apos;enseigner reconnaissable d&apos;une
            séquence à l&apos;autre.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            Leur présence dans les missions et les programmes donne du sens aux
            tâches scolaires — non pas en les rendant ludiques à tout prix, mais
            en les ancrant dans un univers cohérent où l&apos;apprentissage a une
            direction.
          </p>
        </div>
      </section>

      {/* ── Lien retour ─────────────────────────────────────────────────────── */}
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/univers"
            className="text-sm font-semibold text-muted hover:text-foreground"
          >
            ← Retour à l&apos;Univers
          </Link>
        </div>
      </div>
    </main>
  );
}

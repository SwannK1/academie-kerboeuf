import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  academyCharacters,
  getAcademyCharacter,
  type AcademyProfessorCharacter,
} from "@/content/academy-characters";

// ── Route config ──────────────────────────────────────────────────────────────

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return academyCharacters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = getAcademyCharacter(slug);
  if (!character) return { title: "Personnage introuvable | Académie Kerboeuf" };
  return {
    title: `${character.name} — ${character.role} | Académie Kerboeuf`,
    description: character.shortDescription,
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function PersonnageSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const character = getAcademyCharacter(slug);
  if (!character) notFound();

  const roleLabelMap: Record<AcademyProfessorCharacter["role"], string> = {
    guide: "Guide",
    professeur: "Professeur",
  };

  const professorPageHref =
    character.role === "professeur" ? `/professeurs/${character.slug}` : null;

  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Univers", href: "/univers" },
              { label: "Personnages", href: "/univers/personnages" },
              { label: character.name },
            ]}
          />
        </div>
      </div>

      {/* ── En-tête ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded bg-jade/10 px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.14em] text-jade">
              {roleLabelMap[character.role]}
            </span>
            <PublicStatusBadge status={character.publicStatus} />
          </div>

          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">
            {character.name}
          </h1>
          <p className="mt-1 text-sm font-semibold text-muted">
            {character.species}
          </p>

          <p className="mt-6 text-base leading-8 text-muted">
            {character.shortDescription}
          </p>
        </div>
      </section>

      {/* ── Matière / niveaux ───────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted/60">
                {character.role === "professeur" ? "Matière principale" : "Domaine"}
              </dt>
              <dd className="mt-2 text-sm font-semibold text-foreground">
                {character.mainSubject}
              </dd>
            </div>

            {character.levels.length > 0 && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted/60">
                  Niveaux
                </dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {character.levels.map((level) => (
                    <span
                      key={level}
                      className="rounded border border-white/10 px-2 py-0.5 text-xs font-semibold text-muted"
                    >
                      {level}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* ── Rôle pédagogique ────────────────────────────────────────────────── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Dans les apprentissages
          </h2>
          <ul className="mt-5 space-y-2" aria-label="Fonctions pédagogiques">
            {character.learningFunction.map((fn) => (
              <li
                key={fn}
                className="flex items-start gap-3 text-sm leading-6 text-muted"
              >
                <span aria-hidden="true" className="mt-px shrink-0 text-jade">
                  –
                </span>
                {fn}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Ton et traits ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted/60">
                Ton
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{character.tone}</p>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted/60">
                Traits pédagogiques
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Traits pédagogiques">
                {character.pedagogicalTraits.map((trait) => (
                  <li
                    key={trait}
                    className="rounded bg-white/[0.06] px-2 py-0.5 text-xs font-semibold text-muted"
                  >
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Liens utiles ────────────────────────────────────────────────────── */}
      {professorPageHref && (
        <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-muted/60">
              En savoir plus
            </h2>
            <div className="mt-5">
              <Link
                href={professorPageHref}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Fiche complète de {character.name} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Retour liste ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/univers/personnages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-jade transition hover:text-jade/80"
          >
            ← Tous les personnages
          </Link>
        </div>
      </section>
    </main>
  );
}

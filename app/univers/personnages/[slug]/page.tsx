import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  academyCharacters,
  getAcademyCharacter,
} from "@/content/academy-characters";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return academyCharacters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const character = getAcademyCharacter(slug);
  if (!character) return {};
  return {
    title: `${character.name} | Personnages | Académie Kerboeuf`,
    description: character.shortDescription,
  };
}

export default async function PersonnageDetailPage({ params }: Props) {
  const { slug } = await params;
  const character = getAcademyCharacter(slug);
  if (!character) notFound();

  return (
    <main>
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

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
                {character.species}
              </p>
              <h1 className="mt-2 text-3xl font-black text-foreground sm:text-4xl">
                {character.name}
              </h1>
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

          <p className="mt-6 text-base leading-8 text-muted">
            {character.shortDescription}
          </p>

          <div className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/60">
              Dans les apprentissages
            </h2>
            <ul className="mt-3 space-y-2">
              {character.learningFunction.map((fn) => (
                <li
                  key={fn}
                  className="flex items-start gap-2 text-sm leading-6 text-muted"
                >
                  <span className="mt-px shrink-0 text-jade">–</span>
                  {fn}
                </li>
              ))}
            </ul>
          </div>

          {character.pedagogicalTraits.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/60">
                Traits pédagogiques
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {character.pedagogicalTraits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded border border-white/10 px-2 py-0.5 text-xs font-semibold text-muted"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {character.levels.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/60">
                Niveaux concernés
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {character.levels.map((level) => (
                  <span
                    key={level}
                    className="rounded border border-white/10 px-2 py-0.5 text-xs font-semibold text-muted"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex gap-4">
            <Link
              href="/univers/personnages"
              className="text-sm font-semibold text-jade hover:underline"
            >
              ← Tous les personnages
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

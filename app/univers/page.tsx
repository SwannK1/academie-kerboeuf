import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { academyCharacters } from "@/content/academy-characters";
import { lieuxAcademie } from "@/content/lieux-academie";
import { universePathways, type AccentKey } from "@/content/universe";

export const metadata: Metadata = {
  title: "Univers | Académie Kerboeuf",
  description:
    "L'Académie Kerboeuf — un univers pédagogique où personnages et lieux servent les apprentissages.",
};

const accentText: Record<AccentKey, string> = {
  gold: "text-gold",
  jade: "text-jade",
  sky: "text-sky",
  ember: "text-ember",
};
const accentBorder: Record<AccentKey, string> = {
  gold: "border-gold/35",
  jade: "border-jade/35",
  sky: "border-sky/35",
  ember: "border-ember/35",
};

export default function UniversPage() {
  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Univers" }]}
          />
        </div>
      </div>

      {/* ── Introduction ────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Académie Kerboeuf
          </p>
          <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
            Un univers au service des apprentissages
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            L&apos;Académie Kerboeuf est un univers pédagogique fictif. Les
            personnages et les lieux ne sont pas une fin en soi — ils donnent
            du sens aux apprentissages, structurent les démarches et motivent
            l&apos;entrée dans les tâches scolaires.
          </p>
        </div>
      </section>

      {/* ── Personnages référents ────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Personnages référents
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground">
              Les professeurs de l&apos;Académie
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Chaque personnage porte une matière et une posture d&apos;enseignement.
              Ils servent de fil conducteur dans les séquences et les missions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {academyCharacters.map((character) => (
              <article
                key={character.slug}
                className="rounded-md border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  {character.species}
                </p>
                <h3 className="mt-2 text-lg font-black text-foreground">
                  {character.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-gold">
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
          <div className="mt-6">
            <Link
              href="/professeurs"
              className="inline-flex items-center gap-2 text-sm font-bold text-jade transition hover:text-foreground"
            >
              Voir tous les personnages →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lieux pédagogiques ──────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-panel/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
              Lieux pédagogiques
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground">
              Les espaces de l&apos;Académie
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Chaque lieu a une fonction pédagogique précise. Ils ancrent les
              apprentissages dans un espace reconnaissable et cohérent.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {lieuxAcademie.map((lieu) => (
              <article
                key={lieu.id}
                className={`rounded-md border p-5 ${accentBorder[lieu.accentColor]} bg-white/[0.04]`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-[0.14em] ${accentText[lieu.accentColor]}`}
                >
                  {lieu.matieresAssociees.slice(0, 2).join(" · ")}
                </p>
                <h3 className="mt-2 text-base font-black text-foreground">
                  {lieu.nom}
                </h3>
                <p className="mt-3 text-xs leading-6 text-muted">
                  {lieu.descriptionCourte}
                </p>
                <p
                  className={`mt-3 text-xs font-semibold italic ${accentText[lieu.accentColor]}`}
                >
                  {lieu.fonctionPedagogique}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principe pédagogique ────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-ember">
              Principe pédagogique
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground">
              Comment fonctionne l&apos;Académie
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Chaque séquence suit une progression en cinq temps : découvrir,
              s&apos;entraîner, mobiliser, corriger, stabiliser.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {universePathways.map((step) => (
              <article
                key={step.step}
                className={`rounded-md border p-5 ${accentBorder[step.accentColor]} bg-white/[0.04]`}
              >
                <p
                  className={`font-mono text-xs font-black uppercase tracking-[0.2em] ${accentText[step.accentColor]}`}
                >
                  {step.step}
                </p>
                <h3 className="mt-2 text-base font-black text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

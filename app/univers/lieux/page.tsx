import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { lieuxAcademie } from "@/content/lieux-academie";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { AccentKey } from "@/content/universe";

export const metadata: Metadata = {
  title: "Les lieux de l'Académie | Académie Kerboeuf",
  description:
    "Chaque lieu de l'Académie Kerboeuf correspond à une manière d'apprendre — découvrez les espaces pédagogiques et leurs fonctions.",
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
const accentBg: Record<AccentKey, string> = {
  gold: "bg-gold/10",
  jade: "bg-jade/10",
  sky: "bg-sky/10",
  ember: "bg-ember/10",
};

export default function LieuxPage() {
  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Univers", href: "/univers" },
              { label: "Les lieux" },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
            Univers · Lieux
          </p>
          <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
            Les lieux de l&apos;Académie
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Chaque lieu correspond à une manière d&apos;apprendre.
          </p>
        </div>
      </section>

      {/* ── Grille des lieux ────────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-panel/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {lieuxAcademie.map((lieu) => (
              <article
                key={lieu.id}
                className={`rounded-md border p-6 ${accentBorder[lieu.accentColor]} bg-white/[0.04]`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.14em] ${accentText[lieu.accentColor]}`}
                  >
                    {lieu.matieresAssociees.slice(0, 2).join(" · ")}
                  </p>
                  <PublicStatusBadge status={lieu.statut} />
                </div>

                <h2 className="mt-3 text-lg font-black text-foreground">
                  {lieu.nom}
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted">
                  {lieu.descriptionCourte}
                </p>

                <p
                  className={`mt-3 text-xs font-semibold italic ${accentText[lieu.accentColor]}`}
                >
                  {lieu.fonctionPedagogique}
                </p>

                {lieu.competencesPossibles.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted/60">
                      Compétences
                    </p>
                    <ul className="space-y-1">
                      {lieu.competencesPossibles.slice(0, 3).map((comp) => (
                        <li
                          key={comp}
                          className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium ${accentBg[lieu.accentColor]} ${accentText[lieu.accentColor]} mr-1 mb-1`}
                        >
                          {comp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-1">
                  {lieu.niveaux.map((niveau) => (
                    <span
                      key={niveau}
                      className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs font-bold text-muted"
                    >
                      {niveau}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── À quoi servent les lieux ? ──────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-ember">
            Rôle pédagogique
          </p>
          <h2 className="mt-4 text-3xl font-black text-foreground">
            À quoi servent les lieux&nbsp;?
          </h2>

          <div className="mt-8 space-y-6">
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-black text-foreground">
                Donner une identité aux apprentissages
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                Chaque lieu porte une ambiance et une logique propres. Les
                élèves savent que l&apos;Observatoire est l&apos;endroit
                où l&apos;on mesure et observe, que l&apos;Agora est
                l&apos;endroit où l&apos;on débat. Ce cadre fictif ancre
                les apprentissages dans un espace reconnaissable.
              </p>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-black text-foreground">
                Aider à organiser les missions
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                Les missions pédagogiques sont associées à des lieux. Savoir
                qu&apos;une mission se déroule à la Galerie des traces ou à
                la Cartothèque aide les élèves à anticiper la démarche
                attendue et le type de raisonnement à mobiliser.
              </p>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-black text-foreground">
                Ne pas remplacer les programmes
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                Les lieux sont des repères narratifs, pas des cases
                disciplinaires rigides. Ils ne remplacent pas les programmes
                officiels — ils les servent. Un même lieu peut accueillir
                plusieurs matières selon la mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lien retour ─────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/univers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky hover:text-sky/80 transition-colors"
          >
            ← Retour à l&apos;univers
          </Link>
        </div>
      </section>
    </main>
  );
}

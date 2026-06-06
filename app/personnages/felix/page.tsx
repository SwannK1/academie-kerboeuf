import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getAcademyCharacter } from "@/content/academy-characters";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Félix le lynx, guide du CM2 | Académie Kerboeuf",
  description:
    "Félix guide les élèves de CM2 dans leurs missions. Il structure la démarche : observer, chercher, vérifier, justifier, produire une trace.",
};

export default function FelixPersonnagePage() {
  const felix = getAcademyCharacter("felix");
  if (!felix) notFound();

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Personnages", href: "/univers/personnages" },
              { label: "Félix le lynx, guide du CM2" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Guide du CM2
            </p>
            <h1 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
              Félix le lynx
            </h1>
            <p className="mt-2 text-sm font-semibold text-muted">
              {felix.species}
            </p>
            <p className="mt-6 text-lg leading-8 text-muted">
              {felix.shortDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-md border border-jade/25 bg-jade/[0.05] p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
                Dans les apprentissages
              </h2>
              <ul className="mt-4 space-y-2">
                {felix.learningFunction.map((fn) => (
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

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/60">
                Traits pédagogiques
              </h2>
              <ul className="mt-4 space-y-2">
                {felix.pedagogicalTraits.map((trait) => (
                  <li
                    key={trait}
                    className="flex items-start gap-2 text-sm leading-6 text-muted"
                  >
                    <span className="mt-px shrink-0 text-white/30">·</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-md border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/60">
              Ton et posture
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">{felix.tone}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {felix.levels.map((level) => (
              <span
                key={level}
                className="rounded border border-jade/30 bg-jade/10 px-3 py-1 text-xs font-bold text-jade"
              >
                {level}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

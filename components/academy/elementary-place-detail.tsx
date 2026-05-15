import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import type { ElementaryPlace } from "@/content/elementary-places";

const colorText: Record<ElementaryPlace["accentColor"], string> = {
  gold: "text-gold",
  jade: "text-jade",
  sky: "text-sky",
  ember: "text-ember",
};

type Props = { place: ElementaryPlace };

export function ElementaryPlaceDetail({ place }: Props) {
  const accentText = colorText[place.accentColor];

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "Élémentaire", href: "/primaire/elementaire" },
              { label: "Lieux", href: "/primaire/elementaire" },
              { label: place.title },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <p
              className={`inline-flex rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${accentText} border-current/30 bg-current/10`}
            >
              {place.universe}
            </p>
            <PublicStatusBadge status={place.status} />
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            {place.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            {place.shortDescription}
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-5">
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
              <p className={`text-xs font-bold uppercase tracking-[0.22em] ${accentText}`}>
                Fonction pédagogique
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {place.pedagogicalFunction}
              </p>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                Disciplines
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {place.disciplines.map((d) => (
                  <span
                    key={d}
                    className="rounded border border-white/10 bg-ink/35 px-2 py-1 text-xs font-bold text-muted"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {place.professors.length > 0 && (
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                  Professeurs
                </p>
                <ul className="mt-3 space-y-2">
                  {place.professors.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="text-sm font-bold text-foreground transition hover:text-gold"
                      >
                        {p.name}
                      </Link>
                      {p.role && (
                        <span className="ml-2 text-xs text-muted">{p.role}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {place.students.length > 0 && (
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                  Élèves emblématiques
                </p>
                <ul className="mt-3 space-y-2">
                  {place.students.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="text-sm font-bold text-foreground transition hover:text-gold"
                      >
                        {s.name}
                      </Link>
                      {s.role && (
                        <span className="ml-2 text-xs text-muted">{s.role}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-5">
            {place.interactiveZones.length > 0 && (
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
                <p className={`text-xs font-bold uppercase tracking-[0.22em] ${accentText}`}>
                  Zones interactives
                </p>
                <ul className="mt-3 space-y-2">
                  {place.interactiveZones.map((z) => (
                    <li key={z} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-current opacity-50" aria-hidden="true" />
                      {z}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {place.pedagogicalUses.length > 0 && (
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                  Usages pédagogiques
                </p>
                <ul className="mt-3 space-y-2">
                  {place.pedagogicalUses.map((u) => (
                    <li key={u} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-jade opacity-50" aria-hidden="true" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {place.visibleSupports.length > 0 && (
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
                  Supports visibles
                </p>
                <ul className="mt-3 space-y-2">
                  {place.visibleSupports.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky opacity-50" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/primaire/elementaire"
              className="inline-flex rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Retour aux lieux
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

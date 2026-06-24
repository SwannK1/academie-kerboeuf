import Image from "next/image";
import Link from "next/link";
import { ce1GastonZones } from "@/content/ce1-gaston-map";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export function Ce1GastonLearningMap() {
  return (
    <section
      aria-label="Carte des espaces pédagogiques CE1, guidée par Gaston le Hérisson"
      className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-sky/30 bg-sky/10">
            <Image
              src="/images/academie-kerboeuf/personnages/professeurs/primaire/gaston.png"
              alt="Gaston le Hérisson, guide du CE1"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
              Choisis un espace avec Gaston
            </p>
            <h2 className="mt-1 text-2xl font-black text-foreground">
              La carte du CE1
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ce1GastonZones.map((zone) => (
            <Link
              key={zone.id}
              href={zone.href}
              className="group flex flex-col rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:border-sky/35 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky/60"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-black text-foreground">
                  {zone.placeName}
                </h3>
                <PublicStatusBadge status={zone.status} />
              </div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {zone.mainSubject} · {zone.character}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{zone.tagline}</p>
              {zone.domains.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {zone.domains.map((domain) => (
                    <li
                      key={domain}
                      className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {domain}
                    </li>
                  ))}
                </ul>
              ) : null}
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky">
                Entrer <span className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

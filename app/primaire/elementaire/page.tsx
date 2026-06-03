// Route parallèle à /primaire/lieux — utilise elementary-places.ts (Felix/Lisières).
// Hors navigation principale. À arbitrer : fusionner avec /primaire/lieux ou conserver comme hub narratif séparé.
import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { elementaryPlaces } from "@/content/elementary-places";

export const metadata: Metadata = {
  title: "Lieux élémentaires | Académie Kerboeuf",
  description:
    "Hub des lieux élémentaires des Lisières des Explorateurs : salles, espaces communs et supports pédagogiques.",
};

export default function ElementaryHubPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "Élémentaire" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Les Lisières des Explorateurs
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Lieux élémentaires
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Un répertoire sobre des espaces pédagogiques du primaire : chaque
            lieu donne accès à sa fonction, ses usages et ses missions liées.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {elementaryPlaces.map((place) => (
            <Link
              key={place.slug}
              href={`/primaire/elementaire/lieux/${place.slug}`}
              className="group rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  Lieu pédagogique
                </p>
                <PublicStatusBadge status={place.status} />
              </div>
              <h2 className="mt-4 text-xl font-black text-foreground">
                {place.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {place.shortDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {place.disciplines.slice(0, 3).map((discipline) => (
                  <span
                    key={discipline}
                    className="rounded border border-white/10 bg-ink/35 px-2 py-1 text-xs font-bold text-muted"
                  >
                    {discipline}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex text-sm font-bold text-gold transition group-hover:translate-x-1">
                Ouvrir la fiche →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

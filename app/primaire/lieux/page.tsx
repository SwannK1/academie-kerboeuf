import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  getElementaryPedagogicalPlaces,
  type PedagogicalPlace,
  type PedagogicalPlaceAccessibility,
  type PedagogicalPlaceQualityStatus,
} from "@/content/pedagogical-places";

export const metadata: Metadata = {
  title: "Lieux pédagogiques élémentaires | Académie Kerboeuf",
  description:
    "Catalogue public des lieux pédagogiques élémentaires des Lisières des Explorateurs.",
};

const qualityStatusLabels = {
  draft: "Brouillon",
  review: "En revue",
  ready: "Prêt",
  archived: "Archivé",
} satisfies Record<PedagogicalPlaceQualityStatus, string>;

function formatList(items: readonly string[] | undefined, fallback: string) {
  if (!items?.length) {
    return fallback;
  }

  return items.join(" · ");
}

function getLevelsLabel(place: PedagogicalPlace) {
  return place.levelLabel ?? place.section ?? place.cycle;
}

function getAccessibilityItems(
  accessibility: PedagogicalPlaceAccessibility | undefined,
) {
  if (!accessibility) {
    return ["Non renseignée"];
  }

  const items = [
    accessibility.readableContrast ? "Contraste lisible" : null,
    accessibility.keyboardNavigation ? "Navigation clavier" : null,
    accessibility.reducedMotionFriendly ? "Mouvements réduits" : null,
    accessibility.altTextRequired ? "Texte alternatif prévu" : null,
    ...(accessibility.notes ?? []),
  ].filter(Boolean);

  return items.length > 0 ? items : ["Non renseignée"];
}

function getPrintableLabel(place: PedagogicalPlace) {
  if (!place.printability) {
    return null;
  }

  if (!place.printability.printable) {
    return "Non imprimable";
  }

  return place.printability.format
    ? `Imprimable · ${place.printability.format}`
    : "Imprimable";
}

export default function ElementaryPedagogicalPlacesPage() {
  const places = getElementaryPedagogicalPlaces();

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "Lieux" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.03),rgba(9,16,15,0.95))]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Catalogue élémentaire
            </p>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              Les Lisières des Explorateurs
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Chaque lieu correspond à une fonction pédagogique précise :
              lancer une mission, manipuler, observer, lire, coopérer ou garder
              trace des apprentissages.
            </p>
          </div>

          <aside className="rounded-md border border-white/10 bg-panel/70 p-5 shadow-2xl shadow-black/30">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Répertoire
            </p>
            <p className="mt-3 text-4xl font-black text-gold">{places.length}</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              lieux pédagogiques publics pour situer les usages du primaire.
            </p>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8" aria-labelledby="places-title">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                Lieux pédagogiques
              </p>
              <h2 id="places-title" className="mt-3 text-3xl font-black text-foreground">
                Grille des lieux
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted">
              Chaque carte ouvre une fiche de détail avec les usages, supports,
              zones interactives et liens pédagogiques disponibles.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function PlaceCard({ place }: { place: PedagogicalPlace }) {
  const accessibilityItems = getAccessibilityItems(place.accessibility);
  const printableLabel = getPrintableLabel(place);
  const taxonomy = place.disciplines.length > 0 ? place.disciplines : place.tags;

  return (
    <Link
      href={`/primaire/lieux/${place.slug}`}
      className="group flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/[0.065]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="rounded border border-jade/25 bg-jade/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-jade">
          {place.cycle}
        </p>
        <p className="rounded border border-white/10 bg-ink/35 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          {qualityStatusLabels[place.qualityStatus]}
        </p>
      </div>

      <h3 className="mt-5 text-2xl font-black leading-tight text-foreground">
        {place.name}
      </h3>
      <p className="mt-3 text-sm leading-7 text-muted">
        {place.shortDescription}
      </p>

      <dl className="mt-5 grid flex-1 gap-4 border-t border-white/10 pt-5 text-sm">
        <InfoBlock label="Fonction pédagogique">
          {place.pedagogicalFunction}
        </InfoBlock>
        <InfoBlock label="Niveaux concernés">{getLevelsLabel(place)}</InfoBlock>
        <InfoBlock label="Disciplines ou tags">
          {formatList(taxonomy, "Non renseigné")}
        </InfoBlock>
        <InfoBlock label="Accessibilité">
          {accessibilityItems.join(" · ")}
        </InfoBlock>
        {printableLabel ? (
          <InfoBlock label="Imprimabilité">
            {printableLabel}
            {place.printability?.notes ? ` · ${place.printability.notes}` : ""}
          </InfoBlock>
        ) : null}
      </dl>
      <span className="mt-5 inline-flex text-sm font-bold text-gold transition group-hover:translate-x-1">
        Ouvrir la fiche
      </span>
    </Link>
  );
}

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 leading-7 text-foreground/90">{children}</dd>
    </div>
  );
}

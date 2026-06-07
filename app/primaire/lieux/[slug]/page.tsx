import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailPanel } from "@/components/missions/detail-panel";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  getElementaryPedagogicalPlaceBySlug,
  getElementaryPedagogicalPlaces,
  type PedagogicalPlace,
  type PedagogicalPlaceAccessibility,
  type PedagogicalPlaceActivityLink,
  type PedagogicalPlaceInteractiveZone,
  type PedagogicalPlacePersonRef,
  type PedagogicalPlacePrintability,
  type PedagogicalPlaceSupport,
} from "@/content/pedagogical-places";
import { getProfessorBySlug } from "@/content/professors";
import { getStudentBySlug } from "@/content/students";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const useLabels: Record<PedagogicalPlace["uses"][number], string> = {
  homepage: "Page d'accueil",
  hub: "Hub pédagogique",
  "subject-page": "Page discipline",
  "interactive-map": "Carte interactive",
};

const supportTypeLabels: Record<PedagogicalPlaceSupport["type"], string> = {
  affichage: "Affichage",
  carte: "Carte",
  fiche: "Fiche",
  manipulable: "Manipulable",
  projection: "Projection",
  "ressource numérique": "Ressource numérique",
  "trace écrite": "Trace écrite",
};

const accessibilityLabels = {
  readableContrast: "Contraste lisible",
  keyboardNavigation: "Navigation clavier",
  reducedMotionFriendly: "Mouvements réduits",
  altTextRequired: "Textes alternatifs requis",
} satisfies Record<keyof Omit<PedagogicalPlaceAccessibility, "notes">, string>;

export function generateStaticParams() {
  return getElementaryPedagogicalPlaces().map((place) => ({
    slug: place.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = getElementaryPedagogicalPlaceBySlug(slug);

  if (!place) {
    return { title: "Lieu pédagogique introuvable | Académie Kerboeuf" };
  }

  return {
    title: `${place.name} | Lieux pédagogiques élémentaires`,
    description: place.shortDescription,
  };
}

export default async function ElementaryPedagogicalPlacePage({
  params,
}: PageProps) {
  const { slug } = await params;
  const place = getElementaryPedagogicalPlaceBySlug(slug);

  if (!place) {
    notFound();
  }

  const levelItems = [place.cycle, place.levelLabel, place.section].filter(
    (item): item is string => Boolean(item),
  );
  const disciplineItems = [...place.disciplines, ...place.tags];
  const visibleSupports = place.visibleSupports ?? [];
  const projectionSupports = getProjectionSupports(visibleSupports);
  const printSupports = getPrintSupports(visibleSupports);
  const showPrintBlock =
    place.printability?.printable === true || printSupports.length > 0;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "Lieux pédagogiques", href: "/primaire/lieux" },
              { label: place.name },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.96))]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              {place.parentUniverse.name}
            </p>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              {place.name}
            </h1>
            {place.shortDescription ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                {place.shortDescription}
              </p>
            ) : null}
          </div>

          <aside className="rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <div className="mb-5 h-1 rounded-full bg-jade" aria-hidden="true" />
            <dl className="space-y-4">
              <MetaRow label="Univers" value={place.parentUniverse.name} />
              <MetaRow label="Cycle" value={place.cycle} />
              {place.levelLabel ? (
                <MetaRow label="Niveaux" value={place.levelLabel} />
              ) : null}
              <MetaRow
                label="Disciplines"
                value={String(place.disciplines.length)}
              />
              <MetaRow label="Usages" value={String(place.uses.length)} />
            </dl>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-5">
            {place.longDescription ? (
              <DetailPanel title="Description longue">
                <p className="text-sm leading-7 text-muted">
                  {place.longDescription}
                </p>
              </DetailPanel>
            ) : null}
            {place.pedagogicalFunction ? (
              <DetailPanel title="Fonction pédagogique">
                <p className="text-sm leading-7 text-muted">
                  {place.pedagogicalFunction}
                </p>
              </DetailPanel>
            ) : null}
            {levelItems.length > 0 ? (
              <DetailPanel title="Cycles et niveaux">
                <TagList items={levelItems} tone="gold" />
              </DetailPanel>
            ) : null}
            {disciplineItems.length > 0 ? (
              <DetailPanel title="Disciplines et tags">
                <TagList items={disciplineItems} tone="jade" />
              </DetailPanel>
            ) : null}
            <PeoplePanel
              hrefForPerson={getProfessorHref}
              people={place.professors ?? []}
              title="Professeurs liés"
            />
            <PeoplePanel
              hrefForPerson={getStudentHref}
              people={place.students ?? []}
              title="Élèves liés"
            />
          </div>

          <div className="space-y-5">
            <ZonePanel zones={place.interactiveZones ?? []} />
            <SupportPanel supports={visibleSupports} />
            {place.uses.length > 0 ? (
              <DetailPanel title="Usages pédagogiques">
                <TagList
                  items={place.uses.map((use) => useLabels[use])}
                  tone="gold"
                />
              </DetailPanel>
            ) : null}
            <AccessibilityPanel accessibility={place.accessibility} />
            <PrintabilityPanel printability={place.printability} />
            <LinksPanel links={place.links ?? []} />
            {projectionSupports.length > 0 ? (
              <DetailPanel title="À projeter en classe">
                <SupportList supports={projectionSupports} />
              </DetailPanel>
            ) : null}
            {showPrintBlock ? (
              <DetailPanel title="À imprimer">
                <div className="space-y-4">
                  {place.printability?.notes ? (
                    <p className="text-sm leading-7 text-muted">
                      {place.printability.notes}
                    </p>
                  ) : null}
                  {printSupports.length > 0 ? (
                    <SupportList supports={printSupports} />
                  ) : null}
                </div>
              </DetailPanel>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        {label}
      </dt>
      <dd className="text-right text-sm font-bold text-foreground">{value}</dd>
    </div>
  );
}

function TagList({
  items,
  tone,
}: {
  items: string[];
  tone: "gold" | "jade";
}) {
  const toneClass =
    tone === "gold"
      ? "border-gold/30 bg-gold/10 text-gold"
      : "border-jade/30 bg-jade/10 text-jade";

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded border px-3 py-1.5 text-xs font-bold ${toneClass}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function PeoplePanel({
  title,
  people,
  hrefForPerson,
}: {
  title: string;
  people: PedagogicalPlacePersonRef[];
  hrefForPerson: (person: PedagogicalPlacePersonRef) => string | undefined;
}) {
  if (people.length === 0) {
    return null;
  }

  return (
    <DetailPanel title={title}>
      <div className="grid gap-2">
        {people.map((person) => {
          const href = hrefForPerson(person);
          const content = (
            <>
              <span className="block text-sm font-bold text-foreground">
                {person.name}
              </span>
              {person.role ? (
                <span className="mt-1 block text-xs leading-5 text-muted">
                  {person.role}
                </span>
              ) : null}
            </>
          );

          return href ? (
            <Link
              key={person.slug}
              href={href}
              className="rounded border border-white/10 bg-ink/35 p-3 transition hover:border-gold/30 hover:bg-white/[0.06]"
            >
              {content}
            </Link>
          ) : (
            <div
              key={person.slug}
              className="rounded border border-white/10 bg-ink/35 p-3"
            >
              {content}
            </div>
          );
        })}
      </div>
    </DetailPanel>
  );
}

function ZonePanel({ zones }: { zones: PedagogicalPlaceInteractiveZone[] }) {
  if (zones.length === 0) {
    return null;
  }

  return (
    <DetailPanel title="Zones interactives">
      <div className="grid gap-3 md:grid-cols-2">
        {zones.map((zone) => (
          <article
            key={zone.id}
            className="rounded border border-white/10 bg-ink/35 p-4"
          >
            <h2 className="text-sm font-bold text-foreground">{zone.name}</h2>
            {zone.description ? (
              <p className="mt-2 text-sm leading-6 text-muted">
                {zone.description}
              </p>
            ) : null}
            {zone.linkedDisciplines?.length ? (
              <div className="mt-3">
                <TagList items={zone.linkedDisciplines} tone="jade" />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </DetailPanel>
  );
}

function SupportPanel({ supports }: { supports: PedagogicalPlaceSupport[] }) {
  if (supports.length === 0) {
    return null;
  }

  return (
    <DetailPanel title="Supports visibles">
      <SupportList supports={supports} />
    </DetailPanel>
  );
}

function SupportList({ supports }: { supports: PedagogicalPlaceSupport[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {supports.map((support) => (
        <article
          key={support.id}
          className="rounded border border-white/10 bg-ink/35 p-4"
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
            {supportTypeLabels[support.type]}
          </p>
          <h3 className="mt-2 text-sm font-bold text-foreground">
            {support.label}
          </h3>
          {support.description ? (
            <p className="mt-2 text-sm leading-6 text-muted">
              {support.description}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function AccessibilityPanel({
  accessibility,
}: {
  accessibility?: PedagogicalPlaceAccessibility;
}) {
  if (!accessibility) {
    return null;
  }

  const entries = Object.entries(accessibilityLabels).filter(
    ([key]) => accessibility[key as keyof typeof accessibilityLabels] !== undefined,
  );

  if (entries.length === 0 && !accessibility.notes?.length) {
    return null;
  }

  return (
    <DetailPanel title="Accessibilité">
      <div className="grid gap-3 md:grid-cols-2">
        {entries.map(([key, label]) => {
          const isEnabled = accessibility[key as keyof typeof accessibilityLabels];

          return (
            <div
              key={key}
              className="rounded border border-white/10 bg-ink/35 p-3"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
                {label}
              </p>
              <p className="mt-2 text-sm font-bold text-foreground">
                {isEnabled ? "Oui" : "Non"}
              </p>
            </div>
          );
        })}
        {accessibility.notes?.map((note) => (
          <div
            key={note}
            className="rounded border border-white/10 bg-ink/35 p-3 md:col-span-2"
          >
            <p className="text-sm leading-6 text-muted">{note}</p>
          </div>
        ))}
      </div>
    </DetailPanel>
  );
}

function PrintabilityPanel({
  printability,
}: {
  printability?: PedagogicalPlacePrintability;
}) {
  if (!printability) {
    return null;
  }

  return (
    <DetailPanel title="Imprimabilité">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded border border-white/10 bg-ink/35 p-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
            Support imprimable
          </p>
          <p className="mt-2 text-sm font-bold text-foreground">
            {printability.printable ? "Oui" : "Non"}
          </p>
        </div>
        {printability.format ? (
          <div className="rounded border border-white/10 bg-ink/35 p-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
              Format
            </p>
            <p className="mt-2 text-sm font-bold text-foreground">
              {printability.format}
            </p>
          </div>
        ) : null}
        {printability.notes ? (
          <p className="rounded border border-white/10 bg-ink/35 p-3 text-sm leading-6 text-muted md:col-span-2">
            {printability.notes}
          </p>
        ) : null}
      </div>
    </DetailPanel>
  );
}

function LinksPanel({ links }: { links: PedagogicalPlaceActivityLink[] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <DetailPanel title="Liens vers missions">
      <div className="grid gap-3 md:grid-cols-2">
        {links.map((link) => {
          const content = (
            <>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-jade">
                {link.type}
              </span>
              <span className="mt-2 block text-sm font-bold text-foreground">
                {link.title}
              </span>
            </>
          );

          return link.href ? (
            <Link
              key={`${link.type}-${link.slug}`}
              href={link.href}
              className="rounded border border-white/10 bg-ink/35 p-4 transition hover:border-jade/30 hover:bg-white/[0.06]"
            >
              {content}
            </Link>
          ) : (
            <article
              key={`${link.type}-${link.slug}`}
              className="rounded border border-white/10 bg-ink/35 p-4"
            >
              {content}
            </article>
          );
        })}
      </div>
    </DetailPanel>
  );
}

function getProfessorHref(person: PedagogicalPlacePersonRef) {
  return getProfessorBySlug(person.slug)
    ? `/univers/personnages/${person.slug}`
    : undefined;
}

function getStudentHref(person: PedagogicalPlacePersonRef) {
  return getStudentBySlug(person.slug) ? `/eleves/${person.slug}` : undefined;
}

function getProjectionSupports(supports: PedagogicalPlaceSupport[]) {
  return supports.filter((support) =>
    ["affichage", "carte", "projection", "ressource numérique"].includes(
      support.type,
    ),
  );
}

function getPrintSupports(supports: PedagogicalPlaceSupport[]) {
  return supports.filter((support) =>
    ["affichage", "carte", "fiche", "trace écrite"].includes(support.type),
  );
}

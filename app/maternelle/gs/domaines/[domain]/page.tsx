import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { MaternelleSubdomainList } from "@/components/academy/MaternelleSubdomainList";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  getGsDomainBySlug,
  gsDomains,
} from "@/content/levels/maternelle/gs-domains";

type PageProps = {
  params: Promise<{ domain: string }>;
};

export function generateStaticParams() {
  return gsDomains.map((domain) => ({ domain: domain.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { domain: domainSlug } = await params;
  const domain = getGsDomainBySlug(domainSlug);

  if (!domain) {
    return {
      title: "Domaine GS introuvable | Académie Kerboeuf",
    };
  }

  return {
    title: `${domain.shortLabel} GS | Académie Kerboeuf`,
    description: `${domain.label} : observables, situations, traces et ressources prévues pour la Grande Section.`,
  };
}

export default async function GsDomainPage({ params }: PageProps) {
  const { domain: domainSlug } = await params;
  const domain = getGsDomainBySlug(domainSlug);

  if (!domain) {
    notFound();
  }

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Maternelle", href: "/maternelle" },
              { label: "Grande Section", href: "/maternelle/gs" },
              { label: domain.shortLabel },
            ]}
          />
        </div>
      </div>

      <section className="px-4 pb-6 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-jade">
              GS · Domaine
            </span>
            <PublicStatusBadge status={domain.status} />
          </div>
          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-foreground sm:text-4xl">
            {domain.label}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            {domain.description}
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">
            {domain.officialReference}
          </p>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-4 border-b border-white/10 pb-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
                Observables
              </p>
              <h2 className="mt-1 text-xl font-black text-foreground">
                Entrées principales
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {domain.observables.map((observable) => (
                <article
                  key={observable.id}
                  className="rounded border border-white/10 bg-ink/30 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-black leading-6 text-foreground">
                      {observable.title}
                    </h3>
                    <PublicStatusBadge
                      status={observable.status}
                      className="shrink-0"
                    />
                  </div>
                  {observable.description && (
                    <p className="mt-2 text-xs leading-5 text-muted">
                      {observable.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>

          <aside className="grid gap-4">
            <CompactList
              title="Situations"
              items={domain.situations.map((situation) => situation.label)}
            />
            <CompactList
              title="Traces"
              items={domain.traces.map((trace) => trace.label)}
            />
          </aside>
        </div>
      </section>

      <MaternelleSubdomainList
        subdomains={domain.subdomains}
        title="Premières séquences structurées"
        description="Ces sous-domaines préparent les futures fiches ateliers et grilles d'observation."
      />

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  Ressources prévues
                </p>
                <h2 className="mt-1 text-xl font-black text-foreground">
                  Supports à venir
                </h2>
              </div>
              <Link
                href="/maternelle/gs"
                className="rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Retour GS
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {domain.resourceSlots.map((slot) => (
                <div
                  key={slot.kind}
                  className="rounded border border-white/10 bg-ink/30 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    {slot.label}
                  </p>
                  <PublicStatusBadge status={slot.status} className="mt-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CompactList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-md border border-white/10 bg-white/[0.035] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
        {title}
      </p>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-gold/60"
            />
            <span className="text-xs leading-5 text-muted">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

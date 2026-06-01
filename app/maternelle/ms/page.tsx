import type { Metadata } from "next";
import { MaternelleDomainCard } from "@/components/academy/MaternelleDomainCard";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { msDomains } from "@/content/levels/maternelle/ms-domains";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Moyenne Section | Académie Kerboeuf",
  description:
    "Tableau de bord Moyenne Section : domaines, observables, situations et ressources prévues.",
};

export default function MsPage() {
  const statusCounts = msDomains.reduce(
    (counts, domain) => {
      const key = getPublicStatusKey(domain.status);
      counts[key] += 1;
      return counts;
    },
    { available: 0, "in-progress": 0, upcoming: 0 },
  );
  const sequenceCount = msDomains.reduce(
    (total, domain) =>
      total +
      (domain.subdomains?.reduce((n, sd) => n + sd.sequences.length, 0) ?? 0),
    0,
  );

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Maternelle", href: "/maternelle" },
              { label: "Moyenne Section" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 pb-6 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-jade">
              Cycle 1 · MS
            </span>
            <PublicStatusBadge status="in-progress" />
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">
                Moyenne Section
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                Accès rapide aux domaines, observables structurés, situations et
                ressources prévues. Le site organise ; les PDF enseigneront.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:min-w-[28rem]">
              <QuickMetric label="Domaines" value={msDomains.length} />
              <QuickMetric label="Séquences" value={sequenceCount} />
              <QuickMetric label="Pilote" value={statusCounts["in-progress"]} />
              <QuickMetric label="À venir" value={statusCounts.upcoming} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
                Domaines d&apos;apprentissage
              </p>
              <h2 className="mt-1.5 text-xl font-black text-foreground">
                Les 5 entrées MS
              </h2>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              3 observables visibles par carte
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {msDomains.map((domain, index) => (
              <MaternelleDomainCard
                key={domain.id}
                domain={domain}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  Ressources prévues
                </p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Grilles d&apos;observation, fiches atelier, supports projetables et
                  fiches parent. Aucun lien n&apos;est affiché tant que la ressource
                  n&apos;existe pas.
                </p>
              </div>
              <PublicStatusBadge status="upcoming" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function QuickMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
      <p className="text-2xl font-black text-foreground">{value}</p>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
        {label}
      </p>
    </div>
  );
}

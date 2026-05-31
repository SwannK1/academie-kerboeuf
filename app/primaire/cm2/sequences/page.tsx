import type { Metadata } from "next";
import Link from "next/link";
import {
  SequenceRegistry,
  domainId,
} from "@/components/cm2/sequence-registry";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  cm2Sequences,
  getCm2SequencesStats,
  type Cm2Sequence,
} from "@/content/cm2-sequences";

export const metadata: Metadata = {
  title: "Séquences CM2 — Cartographie des compétences | Académie Kerboeuf",
  description:
    "Cartographie des séquences CM2 par domaine, sous-domaine et compétence principale.",
};

type SequenceGroup = {
  domain: string;
  subdomains: {
    subdomain: string;
    sequences: Cm2Sequence[];
  }[];
};

const sequenceGroups = cm2Sequences.reduce<SequenceGroup[]>(
  (groups, sequence) => {
    let domainGroup = groups.find((group) => group.domain === sequence.domain);

    if (!domainGroup) {
      domainGroup = { domain: sequence.domain, subdomains: [] };
      groups.push(domainGroup);
    }

    let subdomainGroup = domainGroup.subdomains.find(
      (group) => group.subdomain === sequence.subdomain,
    );

    if (!subdomainGroup) {
      subdomainGroup = { subdomain: sequence.subdomain, sequences: [] };
      domainGroup.subdomains.push(subdomainGroup);
    }

    subdomainGroup.sequences.push(sequence);
    return groups;
  },
  [],
);

const stats = getCm2SequencesStats();

export default function Cm2SequencesPage() {
  return (
    <main className="cm2-catalog-print">
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Séquences" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(243,196,91,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(80,200,164,0.12),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.02),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            CM2 · Cartographie des compétences
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Séquences CM2
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Une lecture synthétique des séquences prévues : domaine,
            sous-domaine, séquence, puis compétence principale. Chaque entrée
            reste volontairement limitée à une compétence.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Metric value={stats.total} label="séquences" />
            <Metric value={stats.inProgress} label="en construction" />
            <Metric value={stats.upcoming} label="à venir" />
          </div>

          <div className="cm2-print-hide mt-8 flex flex-wrap gap-3">
            <Link
              href="/primaire/cm2"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Retour CM2
            </Link>
            <Link
              href="/primaire/cm2/matieres"
              className="rounded-md border border-jade/30 bg-jade/[0.06] px-5 py-3 text-sm font-bold text-jade transition hover:bg-jade/[0.1]"
            >
              Voir les matières
            </Link>
          </div>
        </div>
      </section>

      <section className="cm2-print-hide border-y border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <nav
          className="mx-auto flex max-w-7xl flex-wrap gap-2"
          aria-label="Domaines des séquences CM2"
        >
          {sequenceGroups.map((group) => (
            <a
              key={group.domain}
              href={`#${domainId(group.domain)}`}
              className="rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-muted transition hover:border-white/20 hover:bg-white/[0.07] hover:text-foreground"
            >
              {group.domain}
            </a>
          ))}
        </nav>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Domaine → sous-domaine → séquence → compétence
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              Registre des séquences
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Cette page sert de carte de pilotage. Elle ne remplace pas les
              futures ressources détaillées et ne contient pas d&apos;exercices,
              de corrigés ou de supports PDF.
            </p>
          </div>

          <SequenceRegistry groups={sequenceGroups} />
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
      <p className="font-mono text-3xl font-black text-foreground">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
    </div>
  );
}

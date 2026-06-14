import Link from "next/link";
import {
  cm2MathsFiches,
  getCm2MathsFichesByDomain,
  CM2_MATHS_DOMAINS,
  type Cm2MathsNotion,
  type FicheType,
} from "@/content/cm2-mathematiques-fiches";
import type { AccentTokens } from "@/lib/cm2-accent";

const FICHE_TYPE_COLORS: Record<FicheType, string> = {
  f1: "border-gold/40 bg-gold/10 text-gold hover:bg-gold/20",
  f2: "border-jade/40 bg-jade/10 text-jade hover:bg-jade/20",
  f3: "border-sky/40 bg-sky/10 text-sky hover:bg-sky/20",
  evaluation: "border-ember/40 bg-ember/10 text-ember hover:bg-ember/20",
};

export function Cm2MathFichesPreview({ t }: { t: AccentTokens }) {
  const total = cm2MathsFiches.length;

  return (
    <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
              Ressources
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Fiches imprimables Mathématiques CM2
            </h2>
            <p className="mt-2 text-sm text-muted">
              {total} notions · nombres, calcul, grandeurs et mesures, espace et
              géométrie, données.
            </p>
          </div>
          <Link
            href="/primaire/cm2/fiches/mathematiques"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted transition hover:border-white/30 hover:text-foreground"
          >
            Voir le catalogue complet des fiches
          </Link>
        </div>

        <div className="space-y-5">
          {CM2_MATHS_DOMAINS.map((domain) => {
            const notions = getCm2MathsFichesByDomain(domain);
            if (notions.length === 0) return null;
            return <DomainFiches key={domain} domain={domain} notions={notions} t={t} />;
          })}
        </div>
      </div>
    </section>
  );
}

function DomainFiches({
  domain,
  notions,
  t,
}: {
  domain: string;
  notions: Cm2MathsNotion[];
  t: AccentTokens;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-4 flex items-baseline gap-3">
        <span className={`text-xs font-bold uppercase tracking-[0.18em] ${t.text}`}>
          {domain}
        </span>
        <span className="text-xs text-muted">
          {notions.length} notion{notions.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notions.map((notion) => (
          <NotionFiches key={notion.slug} notion={notion} />
        ))}
      </div>
    </div>
  );
}

function NotionFiches({ notion }: { notion: Cm2MathsNotion }) {
  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-3">
      <p className="text-sm font-bold leading-snug text-foreground">{notion.title}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {notion.fiches.map((fiche) => (
          <a
            key={fiche.type}
            href={fiche.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center rounded border px-2 py-1 text-[11px] font-bold transition ${FICHE_TYPE_COLORS[fiche.type]}`}
          >
            {fiche.label}
          </a>
        ))}
      </div>
    </div>
  );
}

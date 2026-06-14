import Link from "next/link";
import {
  cm2FrancaisFiches,
  FICHE_DOMAIN_LABELS,
  SHEET_LABELS,
  type FicheDomain,
  type FicheNotion,
} from "@/content/cm2-francais-fiches";
import type { AccentTokens } from "@/lib/cm2-accent";

const DOMAIN_ORDER: FicheDomain[] = [
  "conjugaison",
  "grammaire",
  "orthographe",
  "vocabulaire",
  "lecture-comprehension",
];

export function Cm2FrancaisFichesPreview({ t }: { t: AccentTokens }) {
  const total = cm2FrancaisFiches.length;

  return (
    <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
              Ressources
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Fiches imprimables Français CM2
            </h2>
            <p className="mt-2 text-sm text-muted">
              {total} notions · conjugaison, grammaire, orthographe, vocabulaire et
              lecture-compréhension.
            </p>
          </div>
          <Link
            href="/primaire/cm2/fiches/francais"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted transition hover:border-white/30 hover:text-foreground"
          >
            Voir le catalogue complet des fiches
          </Link>
        </div>

        <div className="space-y-5">
          {DOMAIN_ORDER.map((domain) => {
            const notions = cm2FrancaisFiches.filter((n) => n.domain === domain);
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
  domain: FicheDomain;
  notions: FicheNotion[];
  t: AccentTokens;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-4 flex items-baseline gap-3">
        <span className={`text-xs font-bold uppercase tracking-[0.18em] ${t.text}`}>
          {FICHE_DOMAIN_LABELS[domain]}
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

function NotionFiches({ notion }: { notion: FicheNotion }) {
  const sheetKeys = (["f1", "f2", "f3"] as const).filter((k) => notion.sheets[k]);

  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-3">
      <p className="text-sm font-bold leading-snug text-foreground">{notion.title}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {sheetKeys.map((key) => (
          <Link
            key={key}
            href={`/primaire/cm2/fiches/francais/${notion.slug}/${key}`}
            className="inline-flex items-center rounded border border-jade/40 bg-jade/10 px-2 py-1 text-[11px] font-bold text-jade transition hover:bg-jade/20"
          >
            {SHEET_LABELS[key]}
          </Link>
        ))}
      </div>
    </div>
  );
}

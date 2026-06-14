import Link from "next/link";
import {
  cm2FichesMaths,
  getMathDomains,
  SHEET_IDS,
  SHEET_LABELS,
  isSheetClickable,
  type Cm2FicheMath,
} from "@/content/cm2-fiches-maths";
import type { AccentTokens } from "@/lib/cm2-accent";

export function Cm2MathFichesPreview({ t }: { t: AccentTokens }) {
  const domains = getMathDomains();

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
          </div>
          <Link
            href="/primaire/cm2/fiches/mathematiques"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted transition hover:border-white/30 hover:text-foreground"
          >
            Voir le catalogue complet des fiches
          </Link>
        </div>

        <div className="space-y-5">
          {domains.map((domain) => (
            <DomainFiches key={domain} domain={domain} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DomainFiches({ domain, t }: { domain: string; t: AccentTokens }) {
  const notions = cm2FichesMaths.filter((notion) => notion.domain === domain);

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.025] p-5">
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${t.text}`}>
        {domain}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notions.map((notion) => (
          <NotionFiches key={notion.notionSlug} notion={notion} />
        ))}
      </div>
    </div>
  );
}

function NotionFiches({ notion }: { notion: Cm2FicheMath }) {
  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-3">
      <p className="text-sm font-bold leading-snug text-foreground">{notion.title}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {SHEET_IDS.map((sheetId, index) => {
          const sheet = notion.sheets.find((s) => s.id === sheetId);
          if (!sheet || !isSheetClickable(sheet)) return null;
          return (
            <Link
              key={sheetId}
              href={`/primaire/cm2/fiches/mathematiques/${notion.notionSlug}/${sheetId}`}
              className="rounded-sm border border-jade/20 bg-jade/[0.04] px-2 py-1 text-[11px] font-semibold text-jade transition hover:border-jade/40 hover:bg-jade/[0.08]"
            >
              {index + 1}. {SHEET_LABELS[sheetId]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

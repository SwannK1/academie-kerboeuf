import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  cm2FichesMaths,
  SHEET_LABELS,
  SHEET_IDS,
  getMathDomains,
  getNotionCompleteness,
  isSheetClickable,
  type Cm2FicheMath,
  type FicheSheet,
  type SheetId,
} from "@/content/cm2-fiches-maths";

export function FichesMathsCatalogue() {
  const domains = getMathDomains();

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Mathématiques", href: "/primaire/cm2/matieres/mathematiques" },
              { label: "Fiches" },
            ]}
          />
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(80,200,164,0.15),transparent_34%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            CM2 · Mathématiques · Cycle 3
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Compétences CM2<br className="hidden sm:block" /> Mathématiques
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Leçon, consolidation, évaluation — par domaine.
          </p>
          {domains.length > 1 ? (
            <nav className="mt-6 flex flex-wrap gap-2" aria-label="Domaines">
              {domains.map((domain) => (
                <a
                  key={domain}
                  href={`#${domainAnchor(domain)}`}
                  className="rounded-sm border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-muted transition hover:bg-white/[0.06] hover:text-foreground"
                >
                  {domain}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </section>

      {/* ── Catalogue ────────────────────────────────────────────────────── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          {domains.map((domain) => {
            const notions = cm2FichesMaths.filter((n) => n.domain === domain);
            return (
              <div key={domain} id={domainAnchor(domain)}>
                <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-jade">
                  {domain} · {notions.length} compétence{notions.length !== 1 ? "s" : ""}
                </h2>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {notions.map((notion) => (
                    <NotionCard key={notion.notionSlug} notion={notion} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function domainAnchor(domain: string): string {
  return domain
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
}

// ── NotionCard ────────────────────────────────────────────────────────────────

function NotionCard({ notion }: { notion: Cm2FicheMath }) {
  const completeness = getNotionCompleteness(notion);

  return (
    <article className="flex flex-col rounded-md border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <h2 className="text-base font-black leading-snug text-foreground">
            {notion.title}
          </h2>
          <p className="mt-1 text-xs leading-5 text-muted">{notion.skill}</p>
        </div>
        {completeness === "partial" && (
          <span className="shrink-0 rounded-sm border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400">
            Partielle
          </span>
        )}
        {completeness === "complete" && (
          <span className="shrink-0 rounded-sm border border-jade/30 bg-jade/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-jade">
            Complète
          </span>
        )}
      </div>

      {/* Sheets */}
      <div className="mt-auto space-y-2 border-t border-white/10 pt-4">
        {SHEET_IDS.map((sheetId, index) => {
          const sheet = notion.sheets.find((s) => s.id === sheetId);
          if (!sheet) return null;
          return (
            <SheetRow
              key={sheetId}
              sheet={sheet}
              sheetId={sheetId}
              index={index + 1}
              notionSlug={notion.notionSlug}
            />
          );
        })}
      </div>
    </article>
  );
}

// ── SheetRow ──────────────────────────────────────────────────────────────────

function SheetRow({
  sheet,
  sheetId,
  index,
  notionSlug,
}: {
  sheet: FicheSheet;
  sheetId: SheetId;
  index: number;
  notionSlug: string;
}) {
  const clickable = isSheetClickable(sheet);
  const label = `${index}. ${SHEET_LABELS[sheetId]}`;
  const href = clickable
    ? `/primaire/cm2/fiches/mathematiques/${notionSlug}/${sheetId}`
    : undefined;

  const inner = (
    <span className="flex items-center justify-between gap-2">
      <span className="text-sm font-semibold">{label}</span>
      {clickable ? (
        <span className="text-xs font-bold text-jade">Ouvrir →</span>
      ) : (
        <span className="text-xs text-white/25">À venir</span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-sm border border-jade/20 bg-jade/[0.04] px-3 py-2 text-foreground transition hover:border-jade/40 hover:bg-jade/[0.08]"
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className="block rounded-sm border border-white/8 bg-white/[0.02] px-3 py-2 text-white/35">
      {inner}
    </div>
  );
}

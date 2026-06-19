import {
  cm2FichesSciences,
  getScienceDomains,
  SCIENCE_SHEET_LABELS,
  SCIENCE_SHEET_IDS,
  isScienceSheetClickable,
  type Cm2FicheScience,
  type ScienceFicheSheet,
} from "@/content/cm2-sciences-fiches";

export function Cm2SciencesFichesSection() {
  const domains = getScienceDomains();

  return (
    <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-white/10 pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-ember">
            Sciences et technologie
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            Fiches PDF disponibles
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Pour chaque compétence, retrouve la leçon, la consolidation et
            l&apos;évaluation. Les fiches seront disponibles au fil de l&apos;année.
          </p>
        </div>

        <div className="space-y-10">
          {domains.map((domain) => {
            const fiches = cm2FichesSciences.filter((f) => f.domain === domain);
            return (
              <div key={domain}>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-ember/80">
                  {domain}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {fiches.map((fiche) => (
                    <FicheCard key={fiche.notionSlug} fiche={fiche} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FicheCard({ fiche }: { fiche: Cm2FicheScience }) {
  const hasAny = fiche.sheets.some((s) => s.status === "available");

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
      <p className="text-sm font-bold leading-tight text-foreground">
        {fiche.title}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted line-clamp-2">
        {fiche.skill}
      </p>
      <div className="mt-3 flex gap-2">
        {SCIENCE_SHEET_IDS.map((id) => {
          const sheet = fiche.sheets.find((s) => s.id === id);
          if (!sheet) return null;
          return (
            <SheetChip
              key={id}
              sheet={sheet}
              label={SCIENCE_SHEET_LABELS[id]}
            />
          );
        })}
      </div>
      {!hasAny && (
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-muted/60">
          À venir
        </p>
      )}
    </div>
  );
}

function SheetChip({
  sheet,
  label,
}: {
  sheet: ScienceFicheSheet;
  label: string;
}) {
  const clickable = isScienceSheetClickable(sheet);

  if (clickable && sheet.pdfHref) {
    return (
      <a
        href={sheet.pdfHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded border border-ember/40 bg-ember/10 px-2 py-0.5 text-[11px] font-semibold text-ember transition hover:bg-ember/20"
      >
        {label}
      </a>
    );
  }

  return (
    <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-semibold text-muted/50">
      {label}
    </span>
  );
}

import Link from "next/link";
import {
  cm2FrancaisFiches,
  FICHE_DOMAIN_LABELS,
  SHEET_LABELS,
  type FicheDomain,
  type FicheNotion,
} from "@/content/cm2-francais-fiches";

const DOMAIN_ORDER: FicheDomain[] = [
  "conjugaison",
  "grammaire",
  "orthographe",
  "vocabulaire",
  "lecture-comprehension",
];

const PREVIEW_LIMIT = 4;

export function FrancaisFichesBlock() {
  const byDomain = DOMAIN_ORDER.map((domain) => ({
    domain,
    notions: cm2FrancaisFiches.filter((n) => n.domain === domain),
  })).filter((group) => group.notions.length > 0);

  return (
    <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-white/10 pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Fiches imprimables
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            Fiches imprimables Français CM2
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Par sous-domaine et par compétence, des feuilles de découverte,
            d&apos;entraînement et d&apos;évaluation prêtes à imprimer.
          </p>
        </div>

        <div className="space-y-10">
          {byDomain.map(({ domain, notions }) => (
            <div key={domain}>
              <h3 className="text-lg font-black text-foreground">
                {FICHE_DOMAIN_LABELS[domain]}
              </h3>
              <p className="mt-1 text-xs text-muted">
                {notions.length} compétence{notions.length > 1 ? "s" : ""}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {notions.slice(0, PREVIEW_LIMIT).map((notion) => (
                  <NotionCard key={notion.slug} notion={notion} />
                ))}
              </div>
              {notions.length > PREVIEW_LIMIT ? (
                <p className="mt-3 text-xs font-semibold text-muted">
                  +{notions.length - PREVIEW_LIMIT} autre
                  {notions.length - PREVIEW_LIMIT > 1 ? "s" : ""} compétence
                  {notions.length - PREVIEW_LIMIT > 1 ? "s" : ""}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/primaire/cm2/fiches/francais"
            className="inline-flex rounded-md border border-jade/30 bg-jade/[0.06] px-4 py-2.5 text-sm font-black text-jade transition hover:border-jade/50 hover:bg-jade/[0.1]"
          >
            Voir le catalogue complet →
          </Link>
        </div>
      </div>
    </section>
  );
}

function NotionCard({ notion }: { notion: FicheNotion }) {
  const sheetKeys = (["f1", "f2", "f3"] as const).filter((k) => notion.sheets[k]);

  return (
    <div className="flex flex-col gap-2 rounded-md border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm font-bold leading-6 text-foreground">{notion.title}</p>
      {sheetKeys.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {sheetKeys.map((key) => (
            <Link
              key={key}
              href={`/primaire/cm2/fiches/francais/${notion.slug}/${key}`}
              className="rounded-md border border-white/15 bg-white/[0.05] px-2.5 py-1 text-xs font-bold text-foreground transition hover:border-white/30 hover:bg-white/10"
            >
              {SHEET_LABELS[key]}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xs text-white/40">Fiches à venir</p>
      )}
    </div>
  );
}

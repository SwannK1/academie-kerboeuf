import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  cm2FichesMaths,
  getCm2FicheMath,
  getSheet,
  isSheetClickable,
  SHEET_LABELS,
  SHEET_IDS,
  type SheetId,
} from "@/content/cm2-fiches-maths";

type PageProps = { params: Promise<{ notionSlug: string; sheetId: string }> };

export function generateStaticParams() {
  return cm2FichesMaths.flatMap((notion) =>
    SHEET_IDS.map((sheetId) => ({
      notionSlug: notion.notionSlug,
      sheetId,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { notionSlug, sheetId } = await params;
  const notion = getCm2FicheMath(notionSlug);
  if (!notion) return { title: "Fiche introuvable | Académie Kerboeuf" };
  const label = SHEET_LABELS[sheetId as SheetId] ?? sheetId;
  return {
    title: `${notion.title} — ${label} | CM2 Mathématiques | Académie Kerboeuf`,
    description: `${notion.skill} (${label})`,
  };
}

export default async function FicheDetailPage({ params }: PageProps) {
  const { notionSlug, sheetId } = await params;

  const validSheetIds: string[] = [...SHEET_IDS];
  if (!validSheetIds.includes(sheetId)) notFound();

  const notion = getCm2FicheMath(notionSlug);
  if (!notion) notFound();

  const sheet = getSheet(notion, sheetId as SheetId);
  if (!sheet) notFound();

  const label = SHEET_LABELS[sheetId as SheetId];
  const clickable = isSheetClickable(sheet);

  // Sibling sheets for navigation
  const siblings = SHEET_IDS.map((id) => ({
    id,
    label: SHEET_LABELS[id],
    isCurrent: id === sheetId,
    href: `/primaire/cm2/fiches/mathematiques/${notionSlug}/${id}`,
  }));

  return (
    <main className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Primaire", href: "/primaire" },
            { label: "CM2", href: "/primaire/cm2" },
            { label: "Mathématiques", href: "/primaire/cm2/matieres/mathematiques" },
            {
              label: "Fiches",
              href: "/primaire/cm2/fiches/mathematiques",
            },
            { label: notion.title },
          ]}
        />

        {/* ── En-tête ──────────────────────────────────────────────────────── */}
        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            {notion.domain}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            {notion.title}
            <br />
            <span className="text-jade">— {label}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {notion.skill}
          </p>
        </div>

        {/* ── Navigation entre feuilles ─────────────────────────────────────── */}
        <nav
          className="mt-10 flex flex-wrap gap-2"
          aria-label="Feuilles de la compétence"
        >
          {siblings.map((sib, index) => (
            <Link
              key={sib.id}
              href={sib.href}
              className={`rounded-sm border px-4 py-2 text-sm font-bold transition ${
                sib.isCurrent
                  ? "border-jade/50 bg-jade/15 text-jade"
                  : "border-white/10 bg-white/[0.03] text-muted hover:border-white/25 hover:bg-white/[0.06] hover:text-foreground"
              }`}
              aria-current={sib.isCurrent ? "page" : undefined}
            >
              {index + 1}. {sib.label}
            </Link>
          ))}
        </nav>

        {/* ── Contenu ──────────────────────────────────────────────────────── */}
        <div className="mt-10 rounded-md border border-white/10 bg-white/[0.03] p-8">
          {clickable && sheet.href ? (
            <div className="flex flex-col items-start gap-4">
              <p className="text-sm text-muted">
                La feuille est disponible au format PDF.
              </p>
              <Link
                href={sheet.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-jade px-5 py-3 text-sm font-extrabold text-ink transition hover:brightness-110"
              >
                Ouvrir la fiche PDF →
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-muted">
                Cette feuille n&apos;est pas encore disponible.
              </p>
              <p className="text-xs leading-6 text-white/30">
                La fiche {label.toLowerCase()} pour «&nbsp;{notion.title}&nbsp;» sera
                mise en ligne prochainement.
              </p>
            </div>
          )}
        </div>

        {/* ── Retour catalogue ─────────────────────────────────────────────── */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <Link
            href="/primaire/cm2/fiches/mathematiques"
            className="text-sm font-bold text-jade hover:underline"
          >
            ← Retour aux compétences CM2 Mathématiques
          </Link>
        </div>
      </div>
    </main>
  );
}

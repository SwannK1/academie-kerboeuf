import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  cm2MathematiquesFiches,
  getCm2MathFicheBySlug,
  type Cm2MathFicheSheetId,
} from "@/content/cm2-mathematiques-fiches";
import { getPublicStatusKey } from "@/content/public-status";

const VALID_SHEET_IDS: Cm2MathFicheSheetId[] = ["f1", "f2", "f3"];

const SHEET_LABEL: Record<Cm2MathFicheSheetId, string> = {
  f1: "Feuille 1 — Situation initiale et mini-leçon",
  f2: "Feuille 2 — Exercices d'application",
  f3: "Feuille 3 — Évaluation courte",
};

const SHEET_SHORT: Record<Cm2MathFicheSheetId, string> = {
  f1: "Feuille 1",
  f2: "Feuille 2",
  f3: "Feuille 3",
};

type PageProps = { params: Promise<{ notionSlug: string; sheetId: string }> };

export function generateStaticParams() {
  const params: { notionSlug: string; sheetId: string }[] = [];
  for (const notion of cm2MathematiquesFiches) {
    for (const sheet of notion.sheets) {
      if (getPublicStatusKey(sheet.status) === "available") {
        params.push({ notionSlug: notion.slug, sheetId: sheet.sheet });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { notionSlug, sheetId } = await params;
  const notion = getCm2MathFicheBySlug(notionSlug);
  if (!notion) return { title: "Fiche introuvable | Académie Kerboeuf" };
  const sheetKey = sheetId as Cm2MathFicheSheetId;
  const sheetShort = SHEET_SHORT[sheetKey] ?? sheetId;
  return {
    title: `${notion.title} — ${sheetShort} | Fiches CM2 Mathématiques`,
    description: `Fiche imprimable CM2 mathématiques : ${notion.title}. ${SHEET_LABEL[sheetKey] ?? sheetShort}.`,
  };
}

export default async function Cm2FicheSheetPage({ params }: PageProps) {
  const { notionSlug, sheetId } = await params;

  const notion = getCm2MathFicheBySlug(notionSlug);
  if (!notion) notFound();

  const sheetKey = sheetId as Cm2MathFicheSheetId;
  if (!VALID_SHEET_IDS.includes(sheetKey)) notFound();

  const sheet = notion.sheets.find((s) => s.sheet === sheetKey);
  if (!sheet || getPublicStatusKey(sheet.status) !== "available") notFound();

  const catalogueHref = "/primaire/cm2/fiches/mathematiques";

  // Adjacent available sheets for prev/next navigation
  const availableSheets = notion.sheets.filter(
    (s) => getPublicStatusKey(s.status) === "available",
  );
  const currentIndex = availableSheets.findIndex((s) => s.sheet === sheetKey);
  const prevSheet = currentIndex > 0 ? availableSheets[currentIndex - 1] : null;
  const nextSheet =
    currentIndex < availableSheets.length - 1
      ? availableSheets[currentIndex + 1]
      : null;

  const baseDetailHref = `${catalogueHref}/${notionSlug}`;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Fiches mathématiques", href: catalogueHref },
              { label: notion.title, href: `${baseDetailHref}/${availableSheets[0]?.sheet ?? sheetKey}` },
              { label: SHEET_SHORT[sheetKey] },
            ]}
          />
        </div>
      </div>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                CM2 · Mathématiques · Fiches imprimables
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-foreground sm:text-4xl">
                {notion.title}
              </h1>
              <p className="mt-2 text-sm text-muted">
                {SHEET_LABEL[sheetKey]}
              </p>
            </div>

            {/* Sheet selector */}
            <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
              {VALID_SHEET_IDS.map((sid) => {
                const s = notion.sheets.find((x) => x.sheet === sid);
                const isAvailable = s && getPublicStatusKey(s.status) === "available";
                const isCurrent = sid === sheetKey;
                if (!isAvailable) return null;
                return (
                  <Link
                    key={sid}
                    href={`${baseDetailHref}/${sid}`}
                    className={`rounded border px-3 py-1.5 text-xs font-bold transition ${
                      isCurrent
                        ? "border-gold/60 bg-gold/20 text-gold"
                        : "border-white/15 bg-white/[0.04] text-muted hover:border-white/30 hover:text-foreground"
                    }`}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {SHEET_SHORT[sid]}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Image ─────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl">
            <Image
              src={sheet.href}
              alt={`${notion.title} — ${SHEET_SHORT[sheetKey]}`}
              width={1240}
              height={1754}
              className="h-auto w-full"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1240px"
            />
          </div>
        </div>
      </section>

      {/* ── Actions ───────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Prev / Next */}
            <div className="flex gap-2">
              {prevSheet ? (
                <Link
                  href={`${baseDetailHref}/${prevSheet.sheet}`}
                  className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/10"
                >
                  ← {SHEET_SHORT[prevSheet.sheet]}
                </Link>
              ) : null}
              {nextSheet ? (
                <Link
                  href={`${baseDetailHref}/${nextSheet.sheet}`}
                  className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/10"
                >
                  {SHEET_SHORT[nextSheet.sheet]} →
                </Link>
              ) : null}
            </div>

            {/* Primary actions */}
            <div className="flex flex-wrap gap-3">
              <a
                href={sheet.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-gold/35 bg-gold/10 px-5 py-2.5 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
              >
                Ouvrir en grand ↗
              </a>
              <Link
                href={catalogueHref}
                className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/10"
              >
                ← Retour au catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

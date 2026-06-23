import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  cm2FrancaisFiches,
  getFicheNotionBySlug,
  FICHE_DOMAIN_LABELS,
  SHEET_LABELS,
} from "@/content/cm2-francais-fiches";

type SheetId = "f1" | "f2" | "f3";

type Props = {
  params: Promise<{ notionSlug: string; sheetId: string }>;
};

export async function generateStaticParams() {
  const params: { notionSlug: string; sheetId: string }[] = [];
  for (const notion of cm2FrancaisFiches) {
    for (const key of ["f1", "f2", "f3"] as SheetId[]) {
      if (notion.sheets[key]) {
        params.push({ notionSlug: notion.slug, sheetId: key });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { notionSlug, sheetId } = await params;
  const notion = getFicheNotionBySlug(notionSlug);
  if (!notion) return {};
  const label = SHEET_LABELS[sheetId as SheetId] ?? sheetId;
  return {
    title: `${notion.title} — ${label} — Fiches Français CM2 | Académie Kerboeuf`,
  };
}

export default async function FicheDetailPage({ params }: Props) {
  const { notionSlug, sheetId } = await params;
  const notion = getFicheNotionBySlug(notionSlug);
  if (!notion) notFound();

  const key = sheetId as SheetId;
  const sheet = notion.sheets[key];
  if (!sheet) notFound();

  const sheetKeys = (["f1", "f2", "f3"] as SheetId[]).filter((k) => notion.sheets[k]);
  const currentIndex = sheetKeys.indexOf(key);
  const prevKey = currentIndex > 0 ? sheetKeys[currentIndex - 1] : null;
  const nextKey = currentIndex < sheetKeys.length - 1 ? sheetKeys[currentIndex + 1] : null;
  const sheetLabel = SHEET_LABELS[key] ?? key;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Fiches Français", href: "/primaire/cm2/matieres/francais" },
              { label: notion.title, href: `/primaire/cm2/fiches/francais/${notion.slug}/${sheetKeys[0]}` },
              { label: sheetLabel },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-2">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
              {FICHE_DOMAIN_LABELS[notion.domain]} · CM2
            </p>
            <h1 className="mt-2 text-3xl font-black text-foreground sm:text-4xl">
              {notion.title}
            </h1>
            <p className="mt-1 text-sm font-bold text-jade">{sheetLabel}</p>
          </div>

          {/* Sheet tabs */}
          {sheetKeys.length > 1 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {sheetKeys.map((k) => (
                <Link
                  key={k}
                  href={`/primaire/cm2/fiches/francais/${notion.slug}/${k}`}
                  className={`rounded-md px-4 py-2 text-sm font-bold transition ${
                    k === key
                      ? "bg-jade text-ink"
                      : "border border-white/15 bg-white/[0.05] text-foreground hover:bg-white/10"
                  }`}
                >
                  {SHEET_LABELS[k]}
                </Link>
              ))}
            </div>
          )}

          {/* Image */}
          <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white">
            <Image
              src={sheet.href}
              alt={`${notion.title} — ${sheetLabel}`}
              width={1240}
              height={1754}
              className="w-full h-auto"
              priority
              unoptimized
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/primaire/cm2/matieres/francais"
              className="rounded-md border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Retour au catalogue
            </Link>
            <a
              href={sheet.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-jade/35 bg-jade/10 px-4 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/20"
            >
              Ouvrir l&apos;image en grand ↗
            </a>
            {sheet.pdfHref && (
              <a
                href={sheet.pdfHref}
                download
                className="rounded-md border border-gold/35 bg-gold/10 px-4 py-2.5 text-sm font-bold text-gold transition hover:bg-gold/20"
              >
                Télécharger le PDF ↓
              </a>
            )}
          </div>

          {/* Navigation feuilles */}
          {(prevKey || nextKey) && (
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              {prevKey ? (
                <Link
                  href={`/primaire/cm2/fiches/francais/${notion.slug}/${prevKey}`}
                  className="flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/[0.07]"
                >
                  ← {SHEET_LABELS[prevKey]}
                </Link>
              ) : (
                <span />
              )}
              {nextKey ? (
                <Link
                  href={`/primaire/cm2/fiches/francais/${notion.slug}/${nextKey}`}
                  className="flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/[0.07]"
                >
                  {SHEET_LABELS[nextKey]} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

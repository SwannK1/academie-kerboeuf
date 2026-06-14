"use client";

import { useState } from "react";
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

type Filter = "all" | "complete" | "partial";

export function FichesMathsCatalogue() {
  const [filter, setFilter] = useState<Filter>("all");
  const [domainFilter, setDomainFilter] = useState<string>("all");

  const domains = getMathDomains();

  const visible = cm2FichesMaths.filter((notion) => {
    const completeness = getNotionCompleteness(notion);
    if (filter === "complete" && completeness !== "complete") return false;
    if (filter === "partial" && completeness !== "partial") return false;
    if (domainFilter !== "all" && notion.domain !== domainFilter) return false;
    return true;
  });

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
            Catalogue complet des fiches<br className="hidden sm:block" /> Mathématiques CM2
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Pour chaque compétence, retrouve la leçon, la consolidation et
            l&apos;évaluation.
          </p>
          <p className="mt-4 max-w-2xl rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-muted">
            Les fiches sont accessibles directement depuis la page matière, classées
            par sous-domaine et compétence.
          </p>
          <Link
            href="/primaire/cm2/matieres/mathematiques"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-jade hover:underline"
          >
            ← Retour à la page Mathématiques CM2
          </Link>
        </div>
      </section>

      {/* ── Filtres ──────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
              Toutes
            </FilterChip>
            <FilterChip active={filter === "complete"} onClick={() => setFilter("complete")}>
              Complètes
            </FilterChip>
            <FilterChip active={filter === "partial"} onClick={() => setFilter("partial")}>
              Partielles
            </FilterChip>

            <span className="mx-1 self-center text-white/20" aria-hidden="true">|</span>

            <FilterChip active={domainFilter === "all"} onClick={() => setDomainFilter("all")}>
              Tous les domaines
            </FilterChip>
            {domains.map((domain) => (
              <FilterChip
                key={domain}
                active={domainFilter === domain}
                onClick={() => setDomainFilter(domain)}
              >
                {domain}
              </FilterChip>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catalogue ────────────────────────────────────────────────────── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            {visible.length} compétence{visible.length !== 1 ? "s" : ""} affichée{visible.length !== 1 ? "s" : ""}
          </p>

          {visible.length === 0 ? (
            <p className="text-sm text-muted">Aucune compétence ne correspond aux filtres sélectionnés.</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((notion) => (
                <NotionCard key={notion.notionSlug} notion={notion} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// ── NotionCard ────────────────────────────────────────────────────────────────

function NotionCard({ notion }: { notion: Cm2FicheMath }) {
  const completeness = getNotionCompleteness(notion);

  return (
    <article className="flex flex-col rounded-md border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-jade">
            {notion.domain}
          </p>
          <h2 className="mt-1.5 text-base font-black leading-snug text-foreground">
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

// ── FilterChip ────────────────────────────────────────────────────────────────

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-sm px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition ${
        active
          ? "bg-jade/20 text-jade border border-jade/40"
          : "border border-white/10 bg-white/[0.03] text-muted hover:bg-white/[0.06] hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
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

export function Cm2MathFichesEmbed() {
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
    <>
      {/* ── Filtres ──────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 border-b border-white/10 pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Fiches PDF
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Compétences et fiches disponibles
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Pour chaque compétence, retrouve la leçon, la consolidation et l&apos;évaluation.
            </p>
          </div>

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
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
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
    </>
  );
}

function NotionCard({ notion }: { notion: Cm2FicheMath }) {
  const completeness = getNotionCompleteness(notion);

  return (
    <article className="flex flex-col rounded-md border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-jade">
            {notion.domain}
          </p>
          <h3 className="mt-1.5 text-base font-black leading-snug text-foreground">
            {notion.title}
          </h3>
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

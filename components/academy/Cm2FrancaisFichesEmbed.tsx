"use client";

import { useState } from "react";
import Link from "next/link";
import {
  cm2FrancaisFiches,
  FICHE_DOMAIN_LABELS,
  SHEET_LABELS,
  isNotionComplete,
  type FicheDomain,
  type FicheNotion,
} from "@/content/cm2-francais-fiches";

type Filter = "all" | "complete" | "partial";

const DOMAIN_ORDER: FicheDomain[] = [
  "conjugaison",
  "grammaire",
  "orthographe",
  "vocabulaire",
  "lecture-comprehension",
];

export function Cm2FrancaisFichesEmbed() {
  const [filter, setFilter] = useState<Filter>("all");
  const [domainFilter, setDomainFilter] = useState<string>("all");

  const visible = cm2FrancaisFiches.filter((notion) => {
    const complete = isNotionComplete(notion);
    if (filter === "complete" && !complete) return false;
    if (filter === "partial" && complete) return false;
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
              Fiches disponibles
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Pour chaque notion, retrouve la leçon, la consolidation et l&apos;évaluation.
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
            {DOMAIN_ORDER.map((domain) => (
              <FilterChip
                key={domain}
                active={domainFilter === domain}
                onClick={() => setDomainFilter(domain)}
              >
                {FICHE_DOMAIN_LABELS[domain]}
              </FilterChip>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catalogue ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            {visible.length} notion{visible.length !== 1 ? "s" : ""} affichée{visible.length !== 1 ? "s" : ""}
          </p>

          {visible.length === 0 ? (
            <p className="text-sm text-muted">Aucune notion ne correspond aux filtres sélectionnés.</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((notion) => (
                <NotionCard key={notion.slug} notion={notion} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function NotionCard({ notion }: { notion: FicheNotion }) {
  const complete = isNotionComplete(notion);
  const sheetKeys = (["f1", "f2", "f3"] as const).filter((k) => notion.sheets[k]);

  return (
    <article className="flex flex-col rounded-md border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-jade">
            {FICHE_DOMAIN_LABELS[notion.domain]}
          </p>
          <h3 className="mt-1.5 text-base font-black leading-snug text-foreground">
            {notion.title}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
            complete
              ? "border border-jade/30 bg-jade/10 text-jade"
              : "border border-amber-500/30 bg-amber-500/10 text-amber-400"
          }`}
        >
          {complete ? "Complète" : "Partielle"}
        </span>
      </div>

      <div className="mt-auto space-y-2 border-t border-white/10 pt-4">
        {sheetKeys.map((key, index) => (
          <Link
            key={key}
            href={`/primaire/cm2/fiches/francais/${notion.slug}/${key}`}
            className="flex items-center justify-between gap-2 rounded-sm border border-jade/20 bg-jade/[0.04] px-3 py-2 text-foreground transition hover:border-jade/40 hover:bg-jade/[0.08]"
          >
            <span className="text-sm font-semibold">{index + 1}. {SHEET_LABELS[key]}</span>
            <span className="text-xs font-bold text-jade">Ouvrir →</span>
          </Link>
        ))}
      </div>
    </article>
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
          ? "border border-jade/40 bg-jade/20 text-jade"
          : "border border-white/10 bg-white/[0.03] text-muted hover:bg-white/[0.06] hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

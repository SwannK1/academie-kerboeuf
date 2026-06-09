"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  Cm2MathFicheNotion,
  Cm2MathDomain,
} from "@/content/cm2-mathematiques-fiches";
import { getPublicStatusKey } from "@/content/public-status";

const SHEET_SHORT: Record<string, string> = {
  f1: "Feuille 1",
  f2: "Feuille 2",
  f3: "Feuille 3",
};

const BASE = "/primaire/cm2/fiches/mathematiques";

type FilterId = "all" | "complete" | "partial" | string; // domain slug

const STATUS_FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Toutes" },
  { id: "complete", label: "Complètes" },
  { id: "partial", label: "Partielles" },
];

type Props = {
  domains: Cm2MathDomain[];
  notionsByDomain: Record<string, Cm2MathFicheNotion[]>;
};

export function FichesCatalogue({ domains, notionsByDomain }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const domainFilters = domains.map((d) => ({ id: d.slug, label: d.title }));
  const allFilters = [...STATUS_FILTERS, ...domainFilters];

  // Which domains to show, and which notions inside each
  const visibleDomains = domains
    .map((domain) => {
      const allNotions = notionsByDomain[domain.slug] ?? [];
      let notions: Cm2MathFicheNotion[];

      if (activeFilter === "all") {
        notions = allNotions;
      } else if (activeFilter === "complete") {
        notions = allNotions.filter((n) => n.completeness === "complete");
      } else if (activeFilter === "partial") {
        notions = allNotions.filter((n) => n.completeness === "partial");
      } else {
        // domain filter: show only matching domain, all its notions
        notions = activeFilter === domain.slug ? allNotions : [];
      }

      return { domain, notions };
    })
    .filter(({ notions }) => notions.length > 0);

  const totalVisible = visibleDomains.reduce(
    (acc, { notions }) => acc + notions.length,
    0,
  );

  return (
    <div>
      {/* ── Filtres ─────────────────────────────────────────────────────── */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrer les fiches">
        {allFilters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={isActive}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                isActive
                  ? "border-gold/60 bg-gold/20 text-gold"
                  : "border-white/15 bg-white/[0.04] text-muted hover:border-white/30 hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* ── Compteur ────────────────────────────────────────────────────── */}
      <p className="mb-8 text-sm text-muted" aria-live="polite">
        {totalVisible} notion{totalVisible > 1 ? "s" : ""} affichée
        {totalVisible > 1 ? "s" : ""}
      </p>

      {/* ── Résultats ───────────────────────────────────────────────────── */}
      {visibleDomains.length === 0 ? (
        <p className="text-sm text-muted">Aucune notion pour ce filtre.</p>
      ) : (
        <div className="space-y-16">
          {visibleDomains.map(({ domain, notions }) => (
            <DomainSection key={domain.slug} domain={domain} notions={notions} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Domaine ───────────────────────────────────────────────────────────────────

function DomainSection({
  domain,
  notions,
}: {
  domain: Cm2MathDomain;
  notions: Cm2MathFicheNotion[];
}) {
  const completeCount = notions.filter((n) => n.completeness === "complete").length;

  return (
    <div id={domain.slug}>
      <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            {domain.title}
          </p>
          <p className="mt-1 text-sm text-muted">
            {notions.length} notion{notions.length > 1 ? "s" : ""} —{" "}
            {completeCount} complète{completeCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {notions.map((notion) => (
          <NotionCard key={notion.slug} notion={notion} />
        ))}
      </div>
    </div>
  );
}

// ── Carte notion ──────────────────────────────────────────────────────────────

function NotionCard({ notion }: { notion: Cm2MathFicheNotion }) {
  const isComplete = notion.completeness === "complete";

  const availableSheets = notion.sheets.filter(
    (s) => getPublicStatusKey(s.status) === "available" && s.href,
  );
  const firstSheet = availableSheets[0];
  const notionDetailHref = firstSheet
    ? `${BASE}/${notion.slug}/${firstSheet.sheet}`
    : null;

  return (
    <article className="flex flex-col gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-2">
        {notionDetailHref ? (
          <Link
            href={notionDetailHref}
            className="text-sm font-bold leading-5 text-foreground underline-offset-2 hover:underline"
          >
            {notion.title}
          </Link>
        ) : (
          <h3 className="text-sm font-bold leading-5 text-foreground">
            {notion.title}
          </h3>
        )}
        {!isComplete && (
          <span className="shrink-0 rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-400">
            Partielle
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {notion.sheets.map((sheet) => {
          const isAvailable =
            getPublicStatusKey(sheet.status) === "available" && sheet.href;
          return isAvailable ? (
            <Link
              key={sheet.sheet}
              href={`${BASE}/${notion.slug}/${sheet.sheet}`}
              title={sheet.label}
              className="inline-flex items-center gap-1.5 rounded border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold transition hover:border-gold/60 hover:bg-gold/20"
            >
              {SHEET_SHORT[sheet.sheet]}
            </Link>
          ) : null;
        })}
      </div>
    </article>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { AccentColor } from "@/content/professors";

// ─── Type allégé pour la galerie ─────────────────────────────────────────────

export type ProfessorCardData = {
  slug: string;
  profileHref: string;
  name: string;
  characterType: "professeur référent" | "personnalité officielle";
  role: string;
  initial: string;
  mainSubject: string;
  symbol: string;
  description: string;
  specialty: string;
  levelLabel: string;
  cycle: string;
  stage: "primaire" | "college" | "lycee" | "officiel";
  moodName: string;
  headquarters?: string;
  accentColor?: AccentColor;
  avatarImage?: string;
  dominantTraits: string[];
};

// ─── Système de couleurs ──────────────────────────────────────────────────────

const ACCENT: Record<
  AccentColor,
  {
    text: string;
    textDim: string;
    border: string;
    borderMid: string;
    bg: string;
    bgDeep: string;
    badge: string;
    glowRgb: string;
  }
> = {
  gold: {
    text: "text-gold",
    textDim: "text-gold/60",
    border: "border-gold/40",
    borderMid: "border-gold/20",
    bg: "bg-gold/[0.08]",
    bgDeep: "bg-gold/[0.04]",
    badge: "border-gold/30 bg-gold/10 text-gold",
    glowRgb: "243,196,91",
  },
  jade: {
    text: "text-jade",
    textDim: "text-jade/60",
    border: "border-jade/40",
    borderMid: "border-jade/20",
    bg: "bg-jade/[0.08]",
    bgDeep: "bg-jade/[0.04]",
    badge: "border-jade/30 bg-jade/10 text-jade",
    glowRgb: "80,200,164",
  },
  sky: {
    text: "text-sky",
    textDim: "text-sky/60",
    border: "border-sky/40",
    borderMid: "border-sky/20",
    bg: "bg-sky/[0.08]",
    bgDeep: "bg-sky/[0.04]",
    badge: "border-sky/30 bg-sky/10 text-sky",
    glowRgb: "139,200,255",
  },
  ember: {
    text: "text-ember",
    textDim: "text-ember/60",
    border: "border-ember/40",
    borderMid: "border-ember/20",
    bg: "bg-ember/[0.08]",
    bgDeep: "bg-ember/[0.04]",
    badge: "border-ember/30 bg-ember/10 text-ember",
    glowRgb: "222,104,72",
  },
};

function ac(professor: ProfessorCardData) {
  return ACCENT[professor.accentColor ?? "gold"];
}

// ─── Avatar de galerie ────────────────────────────────────────────────────────

export function GalleryAvatar({ professor, size = "md" }: { professor: ProfessorCardData; size?: "sm" | "md" }) {
  const a = ac(professor);
  const dims = size === "sm" ? "h-12 w-16" : "h-16 w-24";

  const style = {
    background: `linear-gradient(135deg, rgba(${a.glowRgb},0.20), rgba(${a.glowRgb},0.05))`,
  };

  if (professor.avatarImage) {
    return (
      <div
        className={`grid ${dims} shrink-0 place-items-center overflow-hidden rounded-md border ${a.border}`}
        style={style}
      >
        <Image
          src={professor.avatarImage}
          alt={professor.name}
          width={192}
          height={128}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`grid ${dims} shrink-0 place-items-center rounded-md border ${a.border}`}
      style={style}
    >
      <span className={`${size === "sm" ? "text-xl" : "text-2xl"} font-black ${a.text}`}>{professor.initial}</span>
    </div>
  );
}

// ─── Carte professeur ─────────────────────────────────────────────────────────

export function ProfessorCard({ professor }: { professor: ProfessorCardData }) {
  const a = ac(professor);

  return (
    <Link
      href={professor.profileHref}
      className={`group relative flex flex-col overflow-hidden rounded-md border bg-white/[0.03] transition-all duration-200 hover:-translate-y-px hover:bg-white/[0.055] ${a.borderMid}`}
    >
      {/* Glow au hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-md opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `rgba(${a.glowRgb},0.06)` }}
      />

      {/* Ligne accent en haut */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, rgba(${a.glowRgb},0.9), rgba(${a.glowRgb},0.2) 70%, transparent)` }}
      />

      {/* Contenu principal */}
      <div className="flex flex-1 flex-col gap-4 p-5 pt-6">
        {/* Avatar + identité */}
        <div className="flex items-start gap-4">
          <GalleryAvatar professor={professor} />
          <div className="flex min-w-0 flex-col gap-1.5">
            <h3 className="text-lg font-black leading-tight text-foreground">
              {professor.name}
            </h3>
            <p className={`text-xs font-bold ${a.text}`}>{professor.role}</p>
          </div>
        </div>

        {/* Badges matière + niveau */}
        <div className="flex flex-wrap gap-2">
          <span className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${a.badge}`}>
            {professor.mainSubject}
          </span>
          <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
            {professor.levelLabel}
          </span>
        </div>

        {/* Traits de personnalité (2 max) */}
        {professor.dominantTraits.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {professor.dominantTraits.slice(0, 2).map((trait) => (
              <span
                key={trait}
                className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-muted"
              >
                {trait}
              </span>
            ))}
          </div>
        )}

        {/* Description courte */}
        <p className="line-clamp-2 text-sm leading-6 text-muted">{professor.description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted/50">
          {professor.symbol}
        </span>
        <span className={`flex items-center gap-1.5 text-xs font-bold ${a.text} transition-transform group-hover:translate-x-0.5`}>
          Voir le profil
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

// ─── Galerie avec filtres collapsibles ────────────────────────────────────────

type FilterValue = "Tous";

const allLabel: FilterValue = "Tous";

export function ProfessorGallery({ professors }: { professors: ProfessorCardData[] }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [cycle, setCycle] = useState<FilterValue | string>(allLabel);
  const [level, setLevel] = useState<FilterValue | string>(allLabel);
  const [subject, setSubject] = useState<FilterValue | string>(allLabel);
  const [type, setType] = useState<FilterValue | string>(allLabel);
  const [trait, setTrait] = useState<FilterValue | string>(allLabel);

  const hasActiveFilters = cycle !== allLabel || level !== allLabel || subject !== allLabel || type !== allLabel || trait !== allLabel;

  const cycles = useMemo(
    () => [allLabel, ...Array.from(new Set(professors.map((p) => p.cycle)))],
    [professors],
  );
  const levels = useMemo(
    () => [allLabel, ...Array.from(new Set(professors.map((p) => p.levelLabel)))],
    [professors],
  );
  const subjects = useMemo(
    () => [allLabel, ...Array.from(new Set(professors.map((p) => p.mainSubject))).sort()],
    [professors],
  );
  const types = useMemo(
    () => [allLabel, ...Array.from(new Set(professors.map((p) => p.characterType)))],
    [professors],
  );
  const traits = useMemo(
    () => [
      allLabel,
      ...Array.from(new Set(professors.flatMap((p) => p.dominantTraits.slice(0, 3)))).sort(),
    ],
    [professors],
  );

  const filtered = professors.filter((p) => {
    const matchesCycle = cycle === allLabel || p.cycle === cycle;
    const matchesLevel = level === allLabel || p.levelLabel === level;
    const matchesSubject = subject === allLabel || p.mainSubject === subject;
    const matchesType = type === allLabel || p.characterType === type;
    const matchesTrait = trait === allLabel || p.dominantTraits.includes(trait);

    return matchesCycle && matchesLevel && matchesSubject && matchesType && matchesTrait;
  });

  function resetFilters() {
    setCycle(allLabel);
    setLevel(allLabel);
    setSubject(allLabel);
    setType(allLabel);
    setTrait(allLabel);
  }

  return (
    <section aria-labelledby="gallery-heading" className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* En-tête de section */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Galerie complète
            </p>
            <h2
              id="gallery-heading"
              className="mt-1 text-2xl font-black text-foreground"
            >
              Tous les professeurs
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold text-muted underline underline-offset-2 transition hover:text-foreground"
              >
                Réinitialiser
              </button>
            )}
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="filter-panel"
              className={`inline-flex h-9 items-center gap-2 rounded-md border px-4 text-xs font-bold transition ${
                filtersOpen || hasActiveFilters
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-white/15 bg-white/[0.04] text-foreground hover:bg-white/[0.08]"
              }`}
            >
              <span aria-hidden="true">⊞</span>
              Filtrer la galerie
              {hasActiveFilters && (
                <span className="rounded bg-gold/20 px-1.5 py-0.5 text-[10px] font-black text-gold">
                  actif
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Panneau de filtres collapsible */}
        {filtersOpen && (
          <div
            id="filter-panel"
            className="mb-6 rounded-md border border-white/10 bg-white/[0.035] p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              <SelectFilter label="Cycle" value={cycle} options={cycles} onChange={setCycle} />
              <SelectFilter label="Niveau" value={level} options={levels} onChange={setLevel} />
              <SelectFilter label="Matière" value={subject} options={subjects} onChange={setSubject} />
              <SelectFilter label="Type" value={type} options={types} onChange={setType} />
              <SelectFilter label="Personnalité" value={trait} options={traits} onChange={setTrait} />
            </div>
          </div>
        )}

        {/* Compteur */}
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-muted">
          {filtered.length} professeur{filtered.length > 1 ? "s" : ""}
          {hasActiveFilters && " (filtré)"}
        </p>

        {/* Grille */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((professor) => (
            <ProfessorCard key={professor.slug} professor={professor} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-white/15 bg-ink/80 px-3 text-sm font-bold text-foreground outline-none transition focus:border-gold/60"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

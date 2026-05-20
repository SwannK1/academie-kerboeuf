"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { LearningPathWithSteps } from "@/content/learning-paths";
import type { PublicStatus } from "@/content/public-status";

type PublicLearningPathWithSteps = Omit<LearningPathWithSteps, "status"> & {
  status: PublicStatus;
};

type FilterValue = "Tous";

type LearningPathCatalogProps = {
  paths: PublicLearningPathWithSteps[];
};

const allLabel: FilterValue = "Tous";

export function LearningPathCatalog({ paths }: LearningPathCatalogProps) {
  const [level, setLevel] = useState<FilterValue | string>(allLabel);
  const [subject, setSubject] = useState<FilterValue | string>(allLabel);

  const levels = useMemo(
    () => [allLabel, ...Array.from(new Set(paths.map((path) => path.level)))],
    [paths],
  );
  const subjects = useMemo(
    () => [
      allLabel,
      ...Array.from(new Set(paths.map((path) => path.subject))).sort(),
    ],
    [paths],
  );

  const filteredPaths = paths.filter((path) => {
    const matchesLevel = level === allLabel || path.level === level;
    const matchesSubject = subject === allLabel || path.subject === subject;

    return matchesLevel && matchesSubject;
  });

  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <SelectFilter
              label="Niveau"
              value={level}
              options={levels}
              onChange={setLevel}
            />
            <SelectFilter
              label="Matière"
              value={subject}
              options={subjects}
              onChange={setSubject}
            />
            <button
              type="button"
              onClick={() => {
                setLevel(allLabel);
                setSubject(allLabel);
              }}
              className="h-11 rounded-md border border-white/15 bg-white/[0.04] px-4 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Progressions guidées
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">
              {filteredPaths.length} parcours
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted">
            Chaque parcours relie des missions déjà présentes dans l’Académie
            pour construire une séquence progressive et directement exploitable.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPaths.map((path) => (
            <LearningPathCard key={path.slug} path={path} />
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

function LearningPathCard({ path }: { path: PublicLearningPathWithSteps }) {
  const projectionCount = path.steps.filter((step) =>
    step.modes.includes("projection"),
  ).length;
  const printCount = path.steps.filter((step) =>
    step.modes.includes("impression"),
  ).length;

  return (
    <Link
      href={`/parcours/${path.slug}`}
      className="group flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-gold/35 hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
            {path.level} · {path.subject}
          </p>
          <h2 className="mt-3 text-2xl font-black text-foreground">
            {path.title}
          </h2>
        </div>
        <PublicStatusBadge status={path.status} />
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-muted">
        {path.globalObjective}
      </p>

      <div className="mt-5 grid gap-2 text-sm text-muted">
        <Meta label="Durée" value={path.estimatedDuration} />
        <Meta label="Professeur" value={path.professorName} />
        <Meta label="Étapes" value={`${path.steps.length} missions`} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {projectionCount > 0 ? <Badge>{projectionCount} à projeter</Badge> : null}
        {printCount > 0 ? <Badge>{printCount} à imprimer</Badge> : null}
      </div>

      <span className="mt-6 text-sm font-bold text-gold transition group-hover:translate-x-1">
        Ouvrir le parcours
      </span>
    </Link>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/[0.035] px-3 py-2">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-gold/25 bg-gold/10 px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gold">
      {children}
    </span>
  );
}

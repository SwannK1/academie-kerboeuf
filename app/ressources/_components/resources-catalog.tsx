"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type {
  ClassroomMode,
  ClassroomResource,
} from "@/content/resources";
import {
  getPublicStatusKey,
  getPublicStatusLabel,
  type PublicStatus,
  type PublicStatusKey,
} from "@/content/public-status";

type FilterValue = "Toutes";
type ModeFilter = FilterValue | ClassroomMode;
type StatusFilter = FilterValue | PublicStatusKey;
type PublicClassroomResource = Omit<ClassroomResource, "status"> & {
  status: PublicStatus;
};

type ResourcesCatalogProps = {
  resources: PublicClassroomResource[];
};

const allLabel: FilterValue = "Toutes";

const modeLabels: Record<ClassroomMode, string> = {
  projection: "À projeter",
  impression: "À imprimer",
  correction: "Correction",
};

const modeFilters: { value: ModeFilter; label: string }[] = [
  { value: allLabel, label: "Tous les modes" },
  { value: "projection", label: "Projection" },
  { value: "impression", label: "Impression" },
  { value: "correction", label: "Correction" },
];

export function ResourcesCatalog({ resources }: ResourcesCatalogProps) {
  const [level, setLevel] = useState<FilterValue | string>(allLabel);
  const [subject, setSubject] = useState<FilterValue | string>(allLabel);
  const [status, setStatus] = useState<StatusFilter>(allLabel);
  const [difficulty, setDifficulty] = useState<FilterValue | string>(allLabel);
  const [mode, setMode] = useState<ModeFilter>(allLabel);

  const levels = useMemo(
    () => [allLabel, ...Array.from(new Set(resources.map((resource) => resource.level)))],
    [resources],
  );
  const subjects = useMemo(
    () => [
      allLabel,
      ...Array.from(new Set(resources.map((resource) => resource.subject))).sort(),
    ],
    [resources],
  );
  const statuses = useMemo(
    () => [
      allLabel,
      ...Array.from(
        new Set(resources.map((resource) => getPublicStatusKey(resource.status))),
      ),
    ],
    [resources],
  );
  const difficulties = useMemo(
    () => [
      allLabel,
      ...Array.from(new Set(resources.map((resource) => resource.difficulty))),
    ],
    [resources],
  );

  const filteredResources = resources.filter((resource) => {
    const matchesLevel = level === allLabel || resource.level === level;
    const matchesSubject = subject === allLabel || resource.subject === subject;
    const matchesStatus =
      status === allLabel || getPublicStatusKey(resource.status) === status;
    const matchesDifficulty =
      difficulty === allLabel || resource.difficulty === difficulty;
    const matchesMode = mode === allLabel || resource.modes.includes(mode);

    return (
      matchesLevel &&
      matchesSubject &&
      matchesStatus &&
      matchesDifficulty &&
      matchesMode
    );
  });

  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
            <SelectFilter
              label="Statut"
              value={status}
              options={statuses}
              onChange={(value) => setStatus(value as StatusFilter)}
              formatOption={(value) =>
                value === allLabel ? value : getPublicStatusLabel(value)
              }
            />
            <SelectFilter
              label="Difficulté"
              value={difficulty}
              options={difficulties}
              onChange={setDifficulty}
            />
            <SelectFilter
              label="Mode recommandé"
              value={mode}
              options={modeFilters.map((filter) => filter.value)}
              onChange={(value) => setMode(value as ModeFilter)}
              formatOption={(value) =>
                modeFilters.find((filter) => filter.value === value)?.label ?? value
              }
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Catalogue classe
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">
              {filteredResources.length} ressource
              {filteredResources.length > 1 ? "s" : ""}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setLevel(allLabel);
              setSubject(allLabel);
              setStatus(allLabel);
              setDifficulty(allLabel);
              setMode(allLabel);
            }}
            className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
          >
            Réinitialiser
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
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
  formatOption = (option) => option,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  formatOption?: (option: string) => string;
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
            {formatOption(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResourceCard({ resource }: { resource: PublicClassroomResource }) {
  return (
    <Link
      href={resource.href}
      className="group flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-gold/35 hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
            {resource.level} · {resource.subject}
          </p>
          <h2 className="mt-3 text-2xl font-black text-foreground">
            {resource.title}
          </h2>
        </div>
        <PublicStatusBadge status={resource.status} />
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-muted">
        {resource.objective}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge>{resource.difficulty}</Badge>
        <Badge>{resource.professorName}</Badge>
        {resource.modes.includes("projection") ? (
          <ModeBadge mode="projection" />
        ) : null}
        {resource.modes.includes("impression") ? (
          <ModeBadge mode="impression" />
        ) : null}
        {resource.modes.includes("correction") ? (
          <ModeBadge mode="correction" />
        ) : null}
      </div>

      <span className="mt-6 text-sm font-bold text-gold transition group-hover:translate-x-1">
        Ouvrir la mission
      </span>
    </Link>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">
      {children}
    </span>
  );
}

function ModeBadge({ mode }: { mode: ClassroomMode }) {
  return (
    <span className="rounded border border-gold/25 bg-gold/10 px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gold">
      {modeLabels[mode]}
    </span>
  );
}

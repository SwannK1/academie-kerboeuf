"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatusKey } from "@/content/public-status";
import {
  primaryProgrammation,
  programmationLevels,
  programmationPeriods,
  programmationSubjects,
  type ProgrammationEntry,
} from "@/content/primary-programmation";

const LEVEL_LABELS: Record<string, string> = {
  cp: "CP",
  ce1: "CE1",
  ce2: "CE2",
};

type Tab = "annuelle" | "progression";

const ALL = "all";

export function ProgrammationView() {
  const [level, setLevel] = useState<string>(ALL);
  const [subject, setSubject] = useState<string>(ALL);
  const [period, setPeriod] = useState<string>(ALL);
  const [status, setStatus] = useState<string>(ALL);
  const [tab, setTab] = useState<Tab>("annuelle");

  const filtered = useMemo(() => {
    return primaryProgrammation.filter((entry) => {
      if (level !== ALL && entry.level !== level) return false;
      if (subject !== ALL && entry.subject !== subject) return false;
      if (period !== ALL && entry.period !== period) return false;
      if (status !== ALL && getPublicStatusKey(entry.resource.status) !== status)
        return false;
      return true;
    });
  }, [level, subject, period, status]);

  const counts = useMemo(() => {
    return primaryProgrammation.reduce(
      (acc, entry) => {
        const key = getPublicStatusKey(entry.resource.status);
        acc[key] += 1;
        return acc;
      },
      { available: 0, "in-progress": 0, upcoming: 0 } as Record<
        "available" | "in-progress" | "upcoming",
        number
      >,
    );
  }, []);

  const annuelle = useMemo(
    () => [...filtered].sort((a, b) => a.period.localeCompare(b.period)),
    [filtered],
  );

  const progression = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (a.level !== b.level) return a.level.localeCompare(b.level);
        if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
        return a.order - b.order;
      }),
    [filtered],
  );

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Ressources disponibles"
          value={counts.available}
          status="disponible"
        />
        <SummaryCard
          label="Ressources en préparation"
          value={counts["in-progress"]}
          status="en préparation"
        />
        <SummaryCard
          label="Ressources à venir"
          value={counts.upcoming}
          status="à venir"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          label="Niveau"
          value={level}
          onChange={setLevel}
          options={programmationLevels.map((value) => ({
            value,
            label: LEVEL_LABELS[value] ?? value,
          }))}
        />
        <FilterSelect
          label="Matière"
          value={subject}
          onChange={setSubject}
          options={programmationSubjects.map((value) => ({ value, label: value }))}
        />
        <FilterSelect
          label="Période"
          value={period}
          onChange={setPeriod}
          options={programmationPeriods.map((value) => ({ value, label: value }))}
        />
        <FilterSelect
          label="Statut"
          value={status}
          onChange={setStatus}
          options={[
            { value: "available", label: "Disponible" },
            { value: "in-progress", label: "En préparation" },
            { value: "upcoming", label: "À venir" },
          ]}
        />
      </div>

      <div className="mt-10 flex gap-2 border-b border-white/10">
        <TabButton
          label="Programmation annuelle"
          isActive={tab === "annuelle"}
          onClick={() => setTab("annuelle")}
        />
        <TabButton
          label="Progression par matière"
          isActive={tab === "progression"}
          onClick={() => setTab("progression")}
        />
      </div>

      <div className="mt-6">
        {tab === "annuelle" ? (
          <AnnualTable entries={annuelle} />
        ) : (
          <ProgressionTable entries={progression} />
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  status,
}: {
  label: string;
  value: number;
  status: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.025] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black text-foreground">{value}</p>
      <PublicStatusBadge status={status} className="mt-4" />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-foreground"
      >
        <option value={ALL}>Tous</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={[
        "rounded-t-md px-4 py-2.5 text-sm font-bold transition",
        isActive
          ? "border-b-2 border-jade text-foreground"
          : "text-muted hover:text-foreground",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function ResourceAction({ entry }: { entry: ProgrammationEntry }) {
  const { resource } = entry;
  const isAvailable = getPublicStatusKey(resource.status) === "available";

  if (isAvailable && resource.href) {
    return (
      <Link
        href={resource.href}
        className="inline-flex w-fit rounded border border-jade/35 bg-jade/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-jade transition hover:bg-jade/20"
      >
        Voir la ressource
      </Link>
    );
  }

  return <PublicStatusBadge status={resource.status} />;
}

function TableShell({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-white/10">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.03]">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-muted"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function AnnualTable({ entries }: { entries: ProgrammationEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <TableShell
      headers={[
        "Période",
        "Niveau",
        "Matière",
        "Domaine",
        "Compétence",
        "Ressource",
        "Statut",
        "Action",
      ]}
    >
      {entries.map((entry) => (
        <tr key={entry.id} className="border-b border-white/5">
          <td className="px-4 py-3 text-muted">{entry.period}</td>
          <td className="px-4 py-3 font-bold text-foreground">
            {LEVEL_LABELS[entry.level] ?? entry.level}
          </td>
          <td className="px-4 py-3 text-muted">{entry.subject}</td>
          <td className="px-4 py-3 text-muted">{entry.domain}</td>
          <td className="px-4 py-3 text-muted">{entry.competence}</td>
          <td className="px-4 py-3 text-muted">{entry.resource.label}</td>
          <td className="px-4 py-3">
            <PublicStatusBadge status={entry.resource.status} />
          </td>
          <td className="px-4 py-3">
            <ResourceAction entry={entry} />
          </td>
        </tr>
      ))}
    </TableShell>
  );
}

function ProgressionTable({ entries }: { entries: ProgrammationEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <TableShell
      headers={[
        "Ordre",
        "Niveau",
        "Matière",
        "Domaine",
        "Notion",
        "Compétence",
        "Ressource",
        "Statut",
        "Action",
      ]}
    >
      {entries.map((entry) => (
        <tr key={entry.id} className="border-b border-white/5">
          <td className="px-4 py-3 text-muted">{entry.order}</td>
          <td className="px-4 py-3 font-bold text-foreground">
            {LEVEL_LABELS[entry.level] ?? entry.level}
          </td>
          <td className="px-4 py-3 text-muted">{entry.subject}</td>
          <td className="px-4 py-3 text-muted">{entry.domain}</td>
          <td className="px-4 py-3 text-muted">{entry.notion}</td>
          <td className="px-4 py-3 text-muted">{entry.competence}</td>
          <td className="px-4 py-3 text-muted">{entry.resource.label}</td>
          <td className="px-4 py-3">
            <PublicStatusBadge status={entry.resource.status} />
          </td>
          <td className="px-4 py-3">
            <ResourceAction entry={entry} />
          </td>
        </tr>
      ))}
    </TableShell>
  );
}

function EmptyState() {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.025] p-8 text-center">
      <p className="text-sm leading-7 text-muted">
        Aucune ressource ne correspond à ces filtres.
      </p>
    </div>
  );
}

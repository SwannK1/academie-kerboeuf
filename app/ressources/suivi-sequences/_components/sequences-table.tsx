"use client";

import { useState, useMemo, type ChangeEvent } from "react";
import type { SequenceRow, ResourceCellStatus } from "@/content/suivi-sequences-data";
import { getPublicStatusKey } from "@/content/public-status";

type Props = {
  rows: SequenceRow[];
};

const STATUS_LABELS: Record<string, string> = {
  available: "Disponible",
  "in-progress": "En préparation",
  upcoming: "À venir",
};

const RESOURCE_LABELS: Record<ResourceCellStatus, string> = {
  available: "✓",
  "in-preparation": "~",
  planned: "·",
  missing: "—",
  none: "—",
};

const RESOURCE_CLASSES: Record<ResourceCellStatus, string> = {
  available: "text-green-700 font-semibold",
  "in-preparation": "text-blue-600",
  planned: "text-amber-600",
  missing: "text-gray-400",
  none: "text-gray-300",
};

function ResourceCell({ status }: { status: ResourceCellStatus }) {
  return (
    <span
      className={RESOURCE_CLASSES[status]}
      title={status}
      aria-label={status}
    >
      {RESOURCE_LABELS[status]}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const key = getPublicStatusKey(status);
  const cls =
    key === "available"
      ? "bg-green-100 text-green-800 border border-green-300"
      : key === "in-progress"
        ? "bg-blue-100 text-blue-800 border border-blue-300"
        : "bg-amber-100 text-amber-800 border border-amber-300";
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-xs ${cls}`}>
      {STATUS_LABELS[key] ?? key}
    </span>
  );
}

export function SequencesTable({ rows }: Props) {
  const [filterLevel, setFilterLevel] = useState<string>("");
  const [filterSubject, setFilterSubject] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const levels = useMemo(
    () => [...new Set(rows.map((r) => r.level))].sort(),
    [rows],
  );
  const subjects = useMemo(
    () =>
      [
        ...new Set(
          rows
            .filter((r) => !filterLevel || r.level === filterLevel)
            .map((r) => r.subject),
        ),
      ].sort(),
    [rows, filterLevel],
  );

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        if (filterLevel && r.level !== filterLevel) return false;
        if (filterSubject && r.subject !== filterSubject) return false;
        if (filterStatus) {
          const key = getPublicStatusKey(r.status);
          if (key !== filterStatus) return false;
        }
        return true;
      }),
    [rows, filterLevel, filterSubject, filterStatus],
  );

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="flex flex-wrap gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <label htmlFor="filter-level" className="text-sm font-medium text-gray-700">
            Niveau
          </label>
          <select
            id="filter-level"
            value={filterLevel}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setFilterLevel(e.target.value);
              setFilterSubject("");
            }}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
          >
            <option value="">Tous</option>
            {levels.map((l: string) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="filter-subject" className="text-sm font-medium text-gray-700">
            Matière
          </label>
          <select
            id="filter-subject"
            value={filterSubject}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterSubject(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
          >
            <option value="">Toutes</option>
            {subjects.map((s: string) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="filter-status" className="text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            id="filter-status"
            value={filterStatus}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
          >
            <option value="">Tous</option>
            <option value="available">Disponible</option>
            <option value="in-progress">En préparation</option>
            <option value="upcoming">À venir</option>
          </select>
        </div>

        <span className="ml-auto self-center text-sm text-gray-500">
          {filtered.length} séquence{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Légende */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span>
          <span className="font-bold text-green-700">✓</span> Disponible
        </span>
        <span>
          <span className="text-blue-600">~</span> En préparation
        </span>
        <span>
          <span className="text-amber-600">·</span> Planifié
        </span>
        <span>
          <span className="text-gray-400">—</span> Absent / non défini
        </span>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              <th className="border-b border-gray-200 px-3 py-2">Niveau</th>
              <th className="border-b border-gray-200 px-3 py-2">Matière</th>
              <th className="border-b border-gray-200 px-3 py-2">Domaine</th>
              <th className="border-b border-gray-200 px-3 py-2">Sous-domaine</th>
              <th className="border-b border-gray-200 px-3 py-2">Séquence</th>
              <th className="border-b border-gray-200 px-3 py-2">Compétence</th>
              <th className="border-b border-gray-200 px-3 py-2">Statut</th>
              <th className="border-b border-gray-200 px-3 py-2 text-center">Leçon</th>
              <th className="border-b border-gray-200 px-3 py-2 text-center">Exercices</th>
              <th className="border-b border-gray-200 px-3 py-2 text-center">Éval.</th>
              <th className="border-b border-gray-200 px-3 py-2 text-center">Corrigé</th>
              <th className="border-b border-gray-200 px-3 py-2 text-center">Proj.</th>
              <th className="border-b border-gray-200 px-3 py-2 text-center">Parent</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={13}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  Aucune séquence pour ces filtres.
                </td>
              </tr>
            ) : (
              filtered.map((row: SequenceRow, i: number) => (
                <tr
                  key={`${row.level}-${row.title}-${i}`}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-3 py-2 font-medium text-gray-700">
                    {row.level}
                  </td>
                  <td className="px-3 py-2 text-gray-700">{row.subject}</td>
                  <td className="px-3 py-2 text-gray-600">{row.domain}</td>
                  <td className="max-w-[160px] px-3 py-2 text-gray-600">
                    {row.subdomain}
                  </td>
                  <td className="max-w-[200px] px-3 py-2 text-gray-800">
                    {row.title}
                  </td>
                  <td className="max-w-[200px] px-3 py-2 text-xs text-gray-500">
                    {row.competency || "—"}
                  </td>
                  <td className="px-3 py-2">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <ResourceCell status={row.lesson} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <ResourceCell status={row.exercises} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <ResourceCell status={row.evaluation} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <ResourceCell status={row.correction} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <ResourceCell status={row.projectable} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <ResourceCell status={row.parentSheet} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

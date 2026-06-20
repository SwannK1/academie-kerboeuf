"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  classOrgGroups,
  teacherLevels,
  teacherPeriods,
  type ClassOrgGroupId,
} from "@/content/teacher-class-organization";
import type { TeacherLevel, TeacherPeriod } from "@/content/teacher-programmation";

const STORAGE_KEY = "academie-kerboeuf-organisation-classe-v1";

type Priority = {
  id: string;
  label: string;
  group: ClassOrgGroupId;
  done: boolean;
};

type WeekKey = `${TeacherLevel}-${TeacherPeriod}`;

type StoredData = Record<WeekKey, Priority[]>;

function weekKey(level: TeacherLevel, period: TeacherPeriod): WeekKey {
  return `${level}-${period}`;
}

function readStoredData(): StoredData {
  const fallback = {} as StoredData;
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as StoredData;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export function TeacherClassOrganizationClient() {
  const [level, setLevel] = useState<TeacherLevel>(teacherLevels[0].id);
  const [period, setPeriod] = useState<TeacherPeriod>(teacherPeriods[0].id);
  const [data, setData] = useState<StoredData>(() => readStoredData());
  const [newLabel, setNewLabel] = useState("");
  const [newGroup, setNewGroup] = useState<ClassOrgGroupId>(
    classOrgGroups[0].id,
  );
  const dragIndexRef = useRef<number | null>(null);
  const listInstructionsId = useId();

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const key = weekKey(level, period);
  const priorities = useMemo(() => data[key] ?? [], [data, key]);

  function updatePriorities(updater: (current: Priority[]) => Priority[]) {
    setData((prev) => {
      const current = prev[key] ?? [];
      return { ...prev, [key]: updater(current) };
    });
  }

  function addPriority() {
    const label = newLabel.trim();
    if (!label) return;
    const id = `priorite-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    updatePriorities((current) => [
      ...current,
      { id, label, group: newGroup, done: false },
    ]);
    setNewLabel("");
  }

  function removePriority(id: string) {
    updatePriorities((current) => current.filter((item) => item.id !== id));
  }

  function toggleDone(id: string) {
    updatePriorities((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function moveItem(index: number, direction: -1 | 1) {
    updatePriorities((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      const [moved] = next.splice(index, 1);
      next.splice(target, 0, moved);
      return next;
    });
  }

  function handleDrop(targetIndex: number) {
    const sourceIndex = dragIndexRef.current;
    dragIndexRef.current = null;
    if (sourceIndex === null || sourceIndex === targetIndex) return;
    updatePriorities((current) => {
      const next = [...current];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  }

  const groupCounts = useMemo(() => {
    const counts = new Map<ClassOrgGroupId, { total: number; done: number }>();
    for (const item of priorities) {
      const entry = counts.get(item.group) ?? { total: 0, done: 0 };
      entry.total += 1;
      if (item.done) entry.done += 1;
      counts.set(item.group, entry);
    }
    return counts;
  }, [priorities]);

  const globalCount = useMemo(() => {
    const total = priorities.length;
    const done = priorities.filter((item) => item.done).length;
    return { total, done };
  }, [priorities]);

  return (
    <div className="mt-10 space-y-8">
      <section aria-labelledby="choix-niveau-periode">
        <h2
          id="choix-niveau-periode"
          className="text-xl font-black text-foreground"
        >
          Choisir le niveau et la période
        </h2>
        <div className="mt-4 flex flex-wrap gap-6">
          <div role="group" aria-label="Choisir le niveau">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Niveau
            </p>
            <div className="flex flex-wrap gap-2">
              {teacherLevels.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={level === option.id}
                  onClick={() => setLevel(option.id)}
                  className={`min-h-11 rounded-md border px-4 text-sm font-bold transition ${
                    level === option.id
                      ? "border-jade/60 bg-jade/15 text-jade"
                      : "border-white/15 text-foreground hover:border-jade/40"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div role="group" aria-label="Choisir la période">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Période
            </p>
            <div className="flex flex-wrap gap-2">
              {teacherPeriods.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={period === option.id}
                  onClick={() => setPeriod(option.id)}
                  className={`min-h-11 rounded-md border px-4 text-sm font-bold transition ${
                    period === option.id
                      ? "border-jade/60 bg-jade/15 text-jade"
                      : "border-white/15 text-foreground hover:border-jade/40"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="vue-rapide-semaine"
        className="rounded-lg border border-white/10 bg-background/45 p-4"
      >
        <h2
          id="vue-rapide-semaine"
          className="text-xl font-black text-foreground"
        >
          Vue rapide de la semaine
        </h2>
        <p className="mt-2 text-sm font-bold text-foreground">
          {globalCount.done} / {globalCount.total} priorités terminées
        </p>
        <ul className="mt-3 flex flex-wrap gap-3" role="list">
          {classOrgGroups.map((group) => {
            const counts = groupCounts.get(group.id) ?? { total: 0, done: 0 };
            return (
              <li
                key={group.id}
                className="rounded-md border border-white/10 bg-background/30 px-3 py-2 text-xs font-bold text-foreground"
              >
                {group.label} — {counts.done} / {counts.total}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="liste-priorites">
        <h2 id="liste-priorites" className="text-xl font-black text-foreground">
          Priorités de la semaine
        </h2>
        <p id={listInstructionsId} className="mt-2 text-sm text-muted">
          Déplacez une priorité avec la souris, ou utilisez les boutons
          « Monter » / « Descendre » au clavier.
        </p>

        <ul
          className="mt-4 space-y-2"
          role="list"
          aria-describedby={listInstructionsId}
        >
          {priorities.map((item, index) => {
            const group = classOrgGroups.find((g) => g.id === item.group);
            return (
              <li
                key={item.id}
                draggable
                onDragStart={() => {
                  dragIndexRef.current = index;
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(index)}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-background/30 p-3"
              >
                <label className="flex flex-1 items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleDone(item.id)}
                    className="h-4 w-4"
                  />
                  <span
                    className={
                      item.done
                        ? "text-muted line-through"
                        : "text-foreground"
                    }
                  >
                    {item.label}
                  </span>
                </label>
                <span className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  {group?.label}
                </span>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                    aria-label={`Monter la priorité ${item.label}`}
                    className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 1)}
                    disabled={index === priorities.length - 1}
                    aria-label={`Descendre la priorité ${item.label}`}
                    className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removePriority(item.id)}
                    aria-label={`Supprimer la priorité ${item.label}`}
                    className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
                  >
                    ✕
                  </button>
                </div>
              </li>
            );
          })}
          {priorities.length === 0 && (
            <li className="rounded-md border border-white/10 bg-background/30 p-3 text-sm text-muted">
              Aucune priorité pour cette semaine.
            </li>
          )}
        </ul>
      </section>

      <section
        aria-labelledby="ajout-priorite"
        className="rounded-lg border border-white/10 bg-background/45 p-4"
      >
        <h2 id="ajout-priorite" className="text-xl font-black text-foreground">
          Ajouter une priorité
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Intitulé de la priorité
            <input
              type="text"
              value={newLabel}
              onChange={(event) => setNewLabel(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              placeholder="Ex : Préparer le matériel de sciences"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Groupe
            <select
              value={newGroup}
              onChange={(event) =>
                setNewGroup(event.target.value as ClassOrgGroupId)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {classOrgGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={addPriority}
          disabled={!newLabel.trim()}
          className="mt-4 min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ajouter la priorité
        </button>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { teacherLevels, type TeacherLevel } from "@/content/teacher-programmation";

const STORAGE_KEY = "academie-kerboeuf-suivi-de-classe-v1";

type Observation = {
  id: string;
  date: string;
  eleve: string;
  note: string;
};

type StoredObservations = Record<string, Observation[]>;

function readStoredObservations(): StoredObservations {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as StoredObservations;
    }
    return {};
  } catch {
    return {};
  }
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function TeacherClassroomTrackingClient({
  initialNiveau,
}: {
  initialNiveau?: string;
}) {
  const [niveau, setNiveau] = useState<TeacherLevel>(
    (teacherLevels.find((l) => l.id === initialNiveau)?.id as TeacherLevel) ??
      "cm2",
  );
  const [observations, setObservations] = useState<StoredObservations>(() =>
    readStoredObservations(),
  );
  const [eleve, setEleve] = useState("");
  const [date, setDate] = useState(todayIso());
  const [note, setNote] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
  }, [observations]);

  const niveauObservations = [...(observations[niveau] ?? [])].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  function addObservation() {
    if (!eleve.trim() || !note.trim()) return;
    const entry: Observation = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date,
      eleve: eleve.trim(),
      note: note.trim(),
    };
    setObservations((prev) => ({
      ...prev,
      [niveau]: [...(prev[niveau] ?? []), entry],
    }));
    setEleve("");
    setNote("");
  }

  function removeObservation(id: string) {
    setObservations((prev) => ({
      ...prev,
      [niveau]: (prev[niveau] ?? []).filter((entry) => entry.id !== id),
    }));
  }

  return (
    <div className="mt-10 space-y-8">
      <section aria-labelledby="choix-niveau-suivi">
        <h2 id="choix-niveau-suivi" className="text-xl font-black text-foreground">
          Choisir le niveau
        </h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Niveaux">
          {teacherLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setNiveau(level.id)}
              aria-pressed={level.id === niveau}
              className={[
                "min-h-11 rounded-md border px-4 text-sm font-bold transition",
                level.id === niveau
                  ? "border-jade/60 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
              ].join(" ")}
            >
              {level.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="ajout-observation">
        <h2 id="ajout-observation" className="text-xl font-black text-foreground">
          Ajouter une observation
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Élève
            <input
              type="text"
              value={eleve}
              onChange={(event) => setEleve(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <div className="flex sm:items-end">
            <button
              type="button"
              onClick={addObservation}
              disabled={!eleve.trim() || !note.trim()}
              className="min-h-11 w-full rounded-md border border-jade/35 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Ajouter
            </button>
          </div>
        </div>
        <label className="mt-4 flex flex-col gap-2 text-sm font-bold text-foreground">
          Observation
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={2}
            className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
          />
        </label>
      </section>

      <section aria-labelledby="liste-observations">
        <h2 id="liste-observations" className="text-xl font-black text-foreground">
          Observations enregistrées
        </h2>
        {niveauObservations.length === 0 ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucune observation enregistrée pour ce niveau.
          </p>
        ) : (
          <ul className="mt-4 space-y-3" role="list">
            {niveauObservations.map((observation) => (
              <li
                key={observation.id}
                className="flex flex-col gap-2 rounded-lg border border-white/10 bg-background/45 p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    {observation.date} · {observation.eleve}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-foreground">
                    {observation.note}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeObservation(observation.id)}
                  className="min-h-11 shrink-0 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createEmptyTeacherLesson,
  readTeacherLessons,
  teacherLessonCreneaux,
  teacherLevels,
  teacherPeriods,
  teacherSubjects,
  teacherWeeks,
  writeTeacherLessons,
  type TeacherLesson,
  type TeacherLessonPrefill,
  type TeacherLessonSteps,
} from "@/content/teacher-lesson-planner";

const STEP_FIELDS: { key: keyof TeacherLessonSteps; label: string }[] = [
  { key: "lancement", label: "Lancement" },
  { key: "recherche", label: "Recherche" },
  { key: "miseEnCommun", label: "Mise en commun" },
  { key: "entrainement", label: "Entraînement" },
  { key: "bilan", label: "Bilan" },
];

function labelFor<T extends { id: string; label: string }>(
  options: T[],
  id: string,
): string {
  return options.find((option) => option.id === id)?.label ?? id;
}

export function TeacherLessonPlannerClient({
  prefill,
}: {
  prefill: TeacherLessonPrefill;
}) {
  const [lessons, setLessons] = useState<TeacherLesson[]>(() =>
    readTeacherLessons(),
  );
  const [current, setCurrent] = useState<TeacherLesson>(() =>
    createEmptyTeacherLesson(prefill),
  );
  const [search, setSearch] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    writeTeacherLessons(lessons);
  }, [lessons]);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    const sorted = [...lessons].sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    );
    if (!query) return sorted;
    return sorted.filter((lesson) =>
      [lesson.titre, lesson.domaine, lesson.competence, lesson.objectif]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [lessons, search]);

  function updateCurrent<K extends keyof TeacherLesson>(
    key: K,
    value: TeacherLesson[K],
  ) {
    setCurrent((previous) => ({ ...previous, [key]: value }));
  }

  function updateStep(key: keyof TeacherLessonSteps, value: string) {
    setCurrent((previous) => ({
      ...previous,
      etapes: { ...previous.etapes, [key]: value },
    }));
  }

  function handleSave() {
    const now = new Date().toISOString();
    const toSave: TeacherLesson = {
      ...current,
      updatedAt: now,
      createdAt: current.createdAt || now,
    };
    setLessons((previous) => {
      const exists = previous.some((lesson) => lesson.id === toSave.id);
      return exists
        ? previous.map((lesson) => (lesson.id === toSave.id ? toSave : lesson))
        : [...previous, toSave];
    });
    setCurrent(toSave);
    setStatusMessage("Séance enregistrée sur cet appareil.");
  }

  function handleNew() {
    setCurrent(createEmptyTeacherLesson(prefill));
    setStatusMessage(null);
  }

  function handleLoad(lesson: TeacherLesson) {
    setCurrent(lesson);
    setStatusMessage(null);
    setPendingDeleteId(null);
  }

  function handleDuplicate(lesson: TeacherLesson) {
    const now = new Date().toISOString();
    const duplicated: TeacherLesson = {
      ...lesson,
      id: crypto.randomUUID(),
      titre: lesson.titre ? `${lesson.titre} (copie)` : "",
      createdAt: now,
      updatedAt: now,
    };
    setLessons((previous) => [...previous, duplicated]);
    setCurrent(duplicated);
    setStatusMessage("Séance dupliquée.");
  }

  function handleDeleteRequest(id: string) {
    setPendingDeleteId(id);
  }

  function handleDeleteConfirm(id: string) {
    setLessons((previous) => previous.filter((lesson) => lesson.id !== id));
    if (current.id === id) {
      setCurrent(createEmptyTeacherLesson(prefill));
    }
    setPendingDeleteId(null);
    setStatusMessage("Séance supprimée.");
  }

  return (
    <div className="mt-10 space-y-10">
      <section
        aria-labelledby="seance-contexte-titre"
        className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <h2 id="seance-contexte-titre" className="text-xl font-black text-foreground">
          Contexte de la séance
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Niveau
            <select
              value={current.niveau}
              onChange={(event) =>
                updateCurrent("niveau", event.target.value as TeacherLesson["niveau"])
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherLevels.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={current.matiere}
              onChange={(event) =>
                updateCurrent("matiere", event.target.value as TeacherLesson["matiere"])
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherSubjects.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Période
            <select
              value={current.periode}
              onChange={(event) =>
                updateCurrent("periode", event.target.value as TeacherLesson["periode"])
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherPeriods.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Semaine
            <select
              value={current.semaine}
              onChange={(event) =>
                updateCurrent("semaine", event.target.value as TeacherLesson["semaine"])
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherWeeks.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Créneau (facultatif)
            <select
              value={current.creneau ?? ""}
              onChange={(event) =>
                updateCurrent(
                  "creneau",
                  (event.target.value || null) as TeacherLesson["creneau"],
                )
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              <option value="">Aucun</option>
              {teacherLessonCreneaux.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Date (facultative)
            <input
              type="date"
              value={current.date}
              onChange={(event) => updateCurrent("date", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Durée
            <input
              type="text"
              value={current.duree}
              onChange={(event) => updateCurrent("duree", event.target.value)}
              placeholder="ex. 45 min"
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Titre
            <input
              type="text"
              value={current.titre}
              onChange={(event) => updateCurrent("titre", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      <section
        aria-labelledby="seance-objectif-titre"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 id="seance-objectif-titre" className="text-xl font-black text-foreground">
          Objectif de la séance
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Une séance porte un seul objectif principal.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Domaine
            <input
              type="text"
              value={current.domaine}
              onChange={(event) => updateCurrent("domaine", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Compétence
            <input
              type="text"
              value={current.competence}
              onChange={(event) => updateCurrent("competence", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Objectif
            <textarea
              value={current.objectif}
              onChange={(event) => updateCurrent("objectif", event.target.value)}
              rows={3}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Critère de réussite
            <textarea
              value={current.critereReussite}
              onChange={(event) =>
                updateCurrent("critereReussite", event.target.value)
              }
              rows={3}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      <section
        aria-labelledby="seance-etapes-titre"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 id="seance-etapes-titre" className="text-xl font-black text-foreground">
          Déroulé en cinq étapes
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEP_FIELDS.map((step) => (
            <label
              key={step.key}
              className="flex flex-col gap-2 text-sm font-bold text-foreground"
            >
              {step.label}
              <textarea
                value={current.etapes[step.key]}
                onChange={(event) => updateStep(step.key, event.target.value)}
                rows={3}
                className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
              />
            </label>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="seance-differenciation-titre"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2
          id="seance-differenciation-titre"
          className="text-xl font-black text-foreground"
        >
          Différenciation et notes
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Différenciation
            <textarea
              value={current.differenciation}
              onChange={(event) =>
                updateCurrent("differenciation", event.target.value)
              }
              rows={3}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Notes après séance
            <textarea
              value={current.notesApresSeance}
              onChange={(event) =>
                updateCurrent("notesApresSeance", event.target.value)
              }
              rows={3}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      {statusMessage ? (
        <p
          role="status"
          className="rounded-md border border-jade/30 bg-jade/[0.08] px-4 py-2 text-sm font-bold text-jade"
        >
          {statusMessage}
        </p>
      ) : null}

      <section aria-label="Actions sur la séance" className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="min-h-11 rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade/20"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={() => handleDuplicate(current)}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky/40"
        >
          Dupliquer
        </button>
        <button
          type="button"
          onClick={handleNew}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-gold/40"
        >
          Nouvelle séance
        </button>
      </section>

      <section aria-labelledby="seances-recentes-titre" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="seances-recentes-titre"
            className="text-xl font-black text-foreground"
          >
            Séances enregistrées
          </h2>
          <label className="flex items-center gap-2 text-sm font-bold text-foreground">
            <span className="sr-only">Rechercher une séance</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher une séance"
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
        </div>

        {filteredLessons.length === 0 ? (
          <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-muted">
            Aucune séance enregistrée pour le moment.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2" role="list">
            {filteredLessons.map((lesson) => (
              <li
                key={lesson.id}
                className={[
                  "rounded-md border p-4",
                  lesson.id === current.id
                    ? "border-jade/40 bg-jade/[0.06]"
                    : "border-white/10 bg-white/[0.03]",
                ].join(" ")}
              >
                <p className="text-sm font-black text-foreground">
                  {lesson.titre || "Séance sans titre"}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {labelFor(teacherLevels, lesson.niveau)} ·{" "}
                  {labelFor(teacherSubjects, lesson.matiere)} ·{" "}
                  {labelFor(teacherPeriods, lesson.periode)} ·{" "}
                  {labelFor(teacherWeeks, lesson.semaine)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleLoad(lesson)}
                    className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-sky/40"
                  >
                    Ouvrir
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicate(lesson)}
                    className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-sky/40"
                  >
                    Dupliquer
                  </button>
                  {pendingDeleteId === lesson.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleDeleteConfirm(lesson.id)}
                        className="min-h-9 rounded border border-ember/50 bg-ember/10 px-2 text-xs font-bold text-ember"
                      >
                        Confirmer la suppression
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(null)}
                        className="min-h-9 rounded border border-white/15 px-2 text-xs font-bold text-muted"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDeleteRequest(lesson.id)}
                      className="min-h-9 rounded border border-rose/30 px-2 text-xs font-bold text-rose transition hover:bg-rose/10"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

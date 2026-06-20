"use client";

import { useEffect, useMemo, useState } from "react";
import {
  computeTeacherPrintQueueSheetCount,
  createTeacherPrintQueueId,
  getTeacherPrintQueueStatusLabel,
  TEACHER_PRINT_QUEUE_STORAGE_KEY,
  teacherPrintQueueStatuses,
  type TeacherPrintQueueColor,
  type TeacherPrintQueueItem,
  type TeacherPrintQueueSides,
  type TeacherPrintQueueStatus,
  type TeacherPrintQueueStatusFilter,
} from "@/content/teacher-print-queue";

function readStoredItems(): TeacherPrintQueueItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(TEACHER_PRINT_QUEUE_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as TeacherPrintQueueItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

const emptyDraft = {
  title: "",
  subject: "",
  level: "",
  pageCount: "1",
  copyCount: "1",
  sides: "recto" as TeacherPrintQueueSides,
  color: "noir-et-blanc" as TeacherPrintQueueColor,
  desiredDate: "",
  note: "",
};

export function TeacherPrintQueueClient() {
  const [items, setItems] = useState<TeacherPrintQueueItem[]>(() =>
    readStoredItems(),
  );
  const [draft, setDraft] = useState(emptyDraft);
  const [statusFilter, setStatusFilter] =
    useState<TeacherPrintQueueStatusFilter>("tous");
  const [search, setSearch] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_PRINT_QUEUE_STORAGE_KEY,
      JSON.stringify(items),
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      if (statusFilter !== "tous" && item.status !== statusFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      return [item.title, item.subject, item.level, item.note]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(query));
    });
  }, [items, statusFilter, search]);

  const totalSheets = useMemo(
    () =>
      filteredItems.reduce(
        (sum, item) =>
          sum +
          computeTeacherPrintQueueSheetCount(
            item.pageCount,
            item.copyCount,
            item.sides,
          ),
        0,
      ),
    [filteredItems],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) {
      return;
    }

    const pageCount = Math.max(1, Number(draft.pageCount) || 1);
    const copyCount = Math.max(1, Number(draft.copyCount) || 1);

    const newItem: TeacherPrintQueueItem = {
      id: createTeacherPrintQueueId(),
      title,
      subject: draft.subject.trim() || undefined,
      level: draft.level.trim() || undefined,
      pageCount,
      copyCount,
      sides: draft.sides,
      color: draft.color,
      desiredDate: draft.desiredDate || undefined,
      note: draft.note.trim() || undefined,
      status: "a-preparer",
      createdAt: new Date().toISOString(),
    };

    setItems((previous) => [newItem, ...previous]);
    setDraft(emptyDraft);
  }

  function handleStatusChange(id: string, status: TeacherPrintQueueStatus) {
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  function handleDuplicate(id: string) {
    setItems((previous) => {
      const source = previous.find((item) => item.id === id);
      if (!source) {
        return previous;
      }
      const duplicate: TeacherPrintQueueItem = {
        ...source,
        id: createTeacherPrintQueueId(),
        status: "a-preparer",
        createdAt: new Date().toISOString(),
      };
      return [duplicate, ...previous];
    });
  }

  function handleDeleteRequest(id: string) {
    setPendingDeleteId(id);
  }

  function handleDeleteConfirm() {
    if (!pendingDeleteId) {
      return;
    }
    setItems((previous) =>
      previous.filter((item) => item.id !== pendingDeleteId),
    );
    setPendingDeleteId(null);
  }

  function handleDeleteCancel() {
    setPendingDeleteId(null);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mt-10">
      <section
        aria-label="Nouvelle demande de photocopie"
        className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Nouvelle demande
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="ppq-title"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Titre
            </label>
            <input
              id="ppq-title"
              type="text"
              required
              value={draft.title}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  title: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="ppq-subject"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Matière (facultatif)
            </label>
            <input
              id="ppq-subject"
              type="text"
              value={draft.subject}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  subject: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="ppq-level"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Niveau (facultatif)
            </label>
            <input
              id="ppq-level"
              type="text"
              value={draft.level}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  level: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="ppq-pages"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Nombre de pages
            </label>
            <input
              id="ppq-pages"
              type="number"
              min={1}
              value={draft.pageCount}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  pageCount: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="ppq-copies"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Nombre d’exemplaires
            </label>
            <input
              id="ppq-copies"
              type="number"
              min={1}
              value={draft.copyCount}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  copyCount: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="ppq-sides"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Recto / recto-verso
            </label>
            <select
              id="ppq-sides"
              value={draft.sides}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  sides: event.target.value as TeacherPrintQueueSides,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              <option value="recto">Recto</option>
              <option value="recto-verso">Recto-verso</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="ppq-color"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Couleur / noir et blanc
            </label>
            <select
              id="ppq-color"
              value={draft.color}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  color: event.target.value as TeacherPrintQueueColor,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              <option value="noir-et-blanc">Noir et blanc</option>
              <option value="couleur">Couleur</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="ppq-date"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Date souhaitée (facultatif)
            </label>
            <input
              id="ppq-date"
              type="date"
              value={draft.desiredDate}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  desiredDate: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="ppq-note"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Note (facultatif)
            </label>
            <textarea
              id="ppq-note"
              rows={2}
              value={draft.note}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  note: event.target.value,
                }))
              }
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade/20"
            >
              Ajouter à la liste
            </button>
          </div>
        </form>
      </section>

      <section
        aria-label="Filtres et recherche"
        className="mt-8 flex flex-wrap items-center gap-3 print:hidden"
      >
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter("tous")}
            aria-pressed={statusFilter === "tous"}
            className={[
              "min-h-11 rounded-md border px-3 text-sm font-bold transition",
              statusFilter === "tous"
                ? "border-jade/60 bg-jade/10 text-jade"
                : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
            ].join(" ")}
          >
            Tous
          </button>
          {teacherPrintQueueStatuses.map((status) => (
            <button
              key={status.id}
              type="button"
              onClick={() => setStatusFilter(status.id)}
              aria-pressed={statusFilter === status.id}
              className={[
                "min-h-11 rounded-md border px-3 text-sm font-bold transition",
                statusFilter === status.id
                  ? "border-jade/60 bg-jade/10 text-jade"
                  : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
              ].join(" ")}
            >
              {status.label}
            </button>
          ))}
        </div>

        <label htmlFor="ppq-search" className="sr-only">
          Rechercher
        </label>
        <input
          id="ppq-search"
          type="search"
          placeholder="Rechercher…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-h-11 w-full max-w-xs rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        />

        <button
          type="button"
          onClick={handlePrint}
          className="ml-auto inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
        >
          Imprimer la liste
        </button>
      </section>

      <section
        aria-label="Demandes de photocopies"
        className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-foreground">
            Liste des demandes
          </h2>
          <p className="text-sm font-bold text-muted">
            Total estimé : {totalSheets} feuille{totalSheets > 1 ? "s" : ""}
          </p>
        </div>

        {filteredItems.length === 0 ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucune demande pour le moment.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3" role="list">
            {filteredItems.map((item) => {
              const sheetCount = computeTeacherPrintQueueSheetCount(
                item.pageCount,
                item.copyCount,
                item.sides,
              );
              return (
                <li
                  key={item.id}
                  className="rounded-md border border-white/10 bg-background/45 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-black text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {[item.subject, item.level]
                          .filter(Boolean)
                          .join(" · ") || "—"}
                      </p>
                    </div>
                    <label htmlFor={`ppq-status-${item.id}`} className="sr-only">
                      Statut — {item.title}
                    </label>
                    <select
                      id={`ppq-status-${item.id}`}
                      value={item.status}
                      onChange={(event) =>
                        handleStatusChange(
                          item.id,
                          event.target.value as TeacherPrintQueueStatus,
                        )
                      }
                      className="min-h-11 rounded-md border border-white/10 bg-background/60 px-2 text-sm font-bold text-foreground print:hidden"
                    >
                      {teacherPrintQueueStatuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                    <span className="hidden text-sm font-bold text-foreground print:inline">
                      {getTeacherPrintQueueStatusLabel(item.status)}
                    </span>
                  </div>

                  <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted sm:grid-cols-4">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide">
                        Pages
                      </dt>
                      <dd>{item.pageCount}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide">
                        Exemplaires
                      </dt>
                      <dd>{item.copyCount}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide">
                        Mode
                      </dt>
                      <dd>
                        {item.sides === "recto-verso" ? "Recto-verso" : "Recto"} ·{" "}
                        {item.color === "couleur" ? "Couleur" : "N&B"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide">
                        Feuilles estimées
                      </dt>
                      <dd className="font-bold text-foreground">
                        {sheetCount}
                      </dd>
                    </div>
                  </dl>

                  {item.desiredDate ? (
                    <p className="mt-2 text-sm text-muted">
                      Date souhaitée : {item.desiredDate}
                    </p>
                  ) : null}
                  {item.note ? (
                    <p className="mt-2 text-sm text-muted">{item.note}</p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2 print:hidden">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(item.id)}
                      className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
                    >
                      Dupliquer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRequest(item.id)}
                      className="min-h-11 rounded-md border border-ember/40 px-3 text-sm font-bold text-ember transition hover:bg-ember/10"
                    >
                      Supprimer
                    </button>
                  </div>

                  {pendingDeleteId === item.id ? (
                    <div
                      role="alertdialog"
                      aria-label="Confirmer la suppression"
                      className="mt-3 rounded-md border border-ember/30 bg-ember/[0.08] p-3 print:hidden"
                    >
                      <p className="text-sm font-bold text-foreground">
                        Supprimer définitivement « {item.title} » ?
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={handleDeleteConfirm}
                          className="min-h-11 rounded-md border border-ember/50 bg-ember/10 px-3 text-sm font-black text-ember"
                        >
                          Confirmer
                        </button>
                        <button
                          type="button"
                          onClick={handleDeleteCancel}
                          className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

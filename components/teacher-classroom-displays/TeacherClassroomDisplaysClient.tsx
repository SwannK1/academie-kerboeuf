"use client";

import { useEffect, useMemo, useState } from "react";
import {
  defaultTeacherClassroomDisplays,
  teacherClassroomDisplayCategories,
  teacherClassroomDisplayStatuses,
  teacherClassroomDisplaysDirectionNote,
  TEACHER_CLASSROOM_DISPLAYS_STORAGE_KEY,
  type TeacherClassroomDisplayCategoryId,
  type TeacherClassroomDisplayItem,
  type TeacherClassroomDisplayStatusId,
  type TeacherClassroomDisplaysState,
} from "@/content/teacher-classroom-displays";

const ALL_CATEGORIES_FILTER = "toutes" as const;
const ALL_STATUSES_FILTER = "tous" as const;

function readStoredState(): TeacherClassroomDisplaysState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(
      TEACHER_CLASSROOM_DISPLAYS_STORAGE_KEY,
    );
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as TeacherClassroomDisplaysState;
    if (!parsed || !Array.isArray(parsed.items)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function createId() {
  return `affichage-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}

export function TeacherClassroomDisplaysClient() {
  const [state, setState] = useState<TeacherClassroomDisplaysState>(
    () =>
      readStoredState() ?? {
        items: defaultTeacherClassroomDisplays,
      },
  );

  const [categoryFilter, setCategoryFilter] = useState<
    TeacherClassroomDisplayCategoryId | typeof ALL_CATEGORIES_FILTER
  >(ALL_CATEGORIES_FILTER);
  const [statusFilter, setStatusFilter] = useState<
    TeacherClassroomDisplayStatusId | typeof ALL_STATUSES_FILTER
  >(ALL_STATUSES_FILTER);
  const [searchTerm, setSearchTerm] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] =
    useState<TeacherClassroomDisplayCategoryId>("autre");
  const [newLevel, setNewLevel] = useState("");
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_CLASSROOM_DISPLAYS_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return state.items.filter((item) => {
      if (
        categoryFilter !== ALL_CATEGORIES_FILTER &&
        item.category !== categoryFilter
      ) {
        return false;
      }
      if (statusFilter !== ALL_STATUSES_FILTER && item.status !== statusFilter) {
        return false;
      }
      if (normalizedSearch.length > 0) {
        const haystack = [
          item.title,
          item.level ?? "",
          item.location ?? "",
          item.note ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(normalizedSearch)) {
          return false;
        }
      }
      return true;
    });
  }, [state.items, categoryFilter, statusFilter, searchTerm]);

  const countsByStatus = useMemo(() => {
    const counts = new Map<TeacherClassroomDisplayStatusId, number>();
    for (const status of teacherClassroomDisplayStatuses) {
      counts.set(status.id, 0);
    }
    for (const item of state.items) {
      counts.set(item.status, (counts.get(item.status) ?? 0) + 1);
    }
    return counts;
  }, [state.items]);

  function updateItem(
    id: string,
    changes: Partial<TeacherClassroomDisplayItem>,
  ) {
    setState((previous) => ({
      items: previous.items.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    }));
  }

  function removeItem(id: string) {
    setState((previous) => ({
      items: previous.items.filter((item) => item.id !== id),
    }));
  }

  function handleAddCustomDisplay() {
    const title = newTitle.trim();
    if (title.length === 0) {
      return;
    }
    const item: TeacherClassroomDisplayItem = {
      id: createId(),
      title,
      category: newCategory,
      level: newLevel.trim() || undefined,
      location: newLocation.trim() || undefined,
      status: "a-preparer",
      custom: true,
    };
    setState((previous) => ({ items: [...previous.items, item] }));
    setNewTitle("");
    setNewLevel("");
    setNewLocation("");
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mt-10 print:mt-4">
      <p className="rounded-lg border border-jade/30 bg-jade/5 px-4 py-3 text-sm leading-6 text-foreground">
        {teacherClassroomDisplaysDirectionNote}
      </p>

      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        {teacherClassroomDisplayStatuses.map((status) => (
          <span
            key={status.id}
            className="rounded-full border border-border bg-background px-3 py-1 text-sm font-semibold text-foreground"
          >
            {status.label} : {countsByStatus.get(status.id) ?? 0}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between print:hidden">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          <label className="flex flex-col text-sm font-semibold text-foreground">
            Catégorie
            <select
              className="mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value as
                    | TeacherClassroomDisplayCategoryId
                    | typeof ALL_CATEGORIES_FILTER,
                )
              }
            >
              <option value={ALL_CATEGORIES_FILTER}>Toutes</option>
              {teacherClassroomDisplayCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm font-semibold text-foreground">
            Statut
            <select
              className="mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | TeacherClassroomDisplayStatusId
                    | typeof ALL_STATUSES_FILTER,
                )
              }
            >
              <option value={ALL_STATUSES_FILTER}>Tous</option>
              {teacherClassroomDisplayStatuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm font-semibold text-foreground">
            Recherche
            <input
              type="text"
              className="mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Titre, niveau, emplacement, note…"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="h-fit rounded-md border border-jade bg-jade px-4 py-2 text-sm font-bold text-white"
        >
          Imprimer
        </button>
      </div>

      <ul className="mt-8 space-y-4">
        {filteredItems.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-border bg-background p-4 print:break-inside-avoid"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold text-foreground">{item.title}</p>
                <p className="text-sm text-muted">
                  {
                    teacherClassroomDisplayCategories.find(
                      (category) => category.id === item.category,
                    )?.label
                  }
                  {item.level ? ` · ${item.level}` : ""}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
              </div>

              <select
                className="rounded-md border border-border bg-background px-2 py-1 text-sm print:hidden"
                value={item.status}
                onChange={(event) =>
                  updateItem(item.id, {
                    status: event.target.value as TeacherClassroomDisplayStatusId,
                  })
                }
              >
                {teacherClassroomDisplayStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
              <span className="hidden text-sm font-semibold print:inline">
                {
                  teacherClassroomDisplayStatuses.find(
                    (status) => status.id === item.status,
                  )?.label
                }
              </span>
            </div>

            <label className="mt-3 block text-sm text-foreground print:hidden">
              Note
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                value={item.note ?? ""}
                onChange={(event) =>
                  updateItem(item.id, { note: event.target.value })
                }
              />
            </label>
            {item.note ? (
              <p className="mt-2 hidden text-sm text-muted print:block">
                Note : {item.note}
              </p>
            ) : null}

            {item.custom ? (
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="mt-3 text-sm font-semibold text-red-600 print:hidden"
              >
                Supprimer
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-lg border border-border bg-background p-4 print:hidden">
        <h2 className="text-lg font-bold text-foreground">
          Ajouter un affichage personnalisé
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col text-sm font-semibold text-foreground">
            Titre
            <input
              type="text"
              className="mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </label>

          <label className="flex flex-col text-sm font-semibold text-foreground">
            Catégorie
            <select
              className="mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={newCategory}
              onChange={(event) =>
                setNewCategory(
                  event.target.value as TeacherClassroomDisplayCategoryId,
                )
              }
            >
              {teacherClassroomDisplayCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm font-semibold text-foreground">
            Niveau (facultatif)
            <input
              type="text"
              className="mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={newLevel}
              onChange={(event) => setNewLevel(event.target.value)}
            />
          </label>

          <label className="flex flex-col text-sm font-semibold text-foreground">
            Emplacement (facultatif)
            <input
              type="text"
              className="mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={newLocation}
              onChange={(event) => setNewLocation(event.target.value)}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleAddCustomDisplay}
          className="mt-4 rounded-md border border-jade bg-jade px-4 py-2 text-sm font-bold text-white"
        >
          Ajouter l&apos;affichage
        </button>
      </div>
    </div>
  );
}

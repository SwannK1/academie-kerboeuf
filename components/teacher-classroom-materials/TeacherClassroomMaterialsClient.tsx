"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CLASSROOM_MATERIALS_STORAGE_KEY,
  classroomMaterialCategories,
  classroomMaterialStatuses,
  createEmptyClassroomMaterialItem,
  getClassroomMaterialCategoryLabel,
  getClassroomMaterialStatusLabel,
  type ClassroomMaterialCategoryId,
  type ClassroomMaterialItem,
  type ClassroomMaterialStatusId,
} from "@/content/teacher-classroom-materials";

type DraftItem = Omit<ClassroomMaterialItem, "id">;

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `materiel-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function readStoredItems(): ClassroomMaterialItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CLASSROOM_MATERIALS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as ClassroomMaterialItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

function emptyDraft(): DraftItem {
  return createEmptyClassroomMaterialItem();
}

export function TeacherClassroomMaterialsClient() {
  const [items, setItems] = useState<ClassroomMaterialItem[]>(() =>
    readStoredItems(),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    ClassroomMaterialCategoryId | "toutes"
  >("toutes");
  const [statusFilter, setStatusFilter] = useState<
    ClassroomMaterialStatusId | "tous"
  >("tous");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftItem>(() => emptyDraft());
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(
      CLASSROOM_MATERIALS_STORAGE_KEY,
      JSON.stringify(items),
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return items.filter((item) => {
      if (
        normalizedSearch &&
        !item.name.toLowerCase().includes(normalizedSearch)
      ) {
        return false;
      }
      if (categoryFilter !== "toutes" && item.categoryId !== categoryFilter) {
        return false;
      }
      if (statusFilter !== "tous" && item.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [items, searchTerm, categoryFilter, statusFilter]);

  const toOrderCount = useMemo(
    () => items.filter((item) => item.status === "a-commander").length,
    [items],
  );

  function resetForm() {
    setDraft(emptyDraft());
    setEditingId(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = draft.name.trim();
    if (!trimmedName) {
      return;
    }

    const normalizedDraft: DraftItem = {
      ...draft,
      name: trimmedName,
      quantity: Number.isFinite(draft.quantity) ? draft.quantity : 0,
      location: draft.location?.trim() || undefined,
      note: draft.note?.trim() || undefined,
      alertThreshold:
        draft.alertThreshold !== undefined && Number.isFinite(draft.alertThreshold)
          ? draft.alertThreshold
          : undefined,
    };

    if (editingId) {
      setItems((previous) =>
        previous.map((item) =>
          item.id === editingId ? { ...normalizedDraft, id: editingId } : item,
        ),
      );
    } else {
      setItems((previous) => [
        ...previous,
        { ...normalizedDraft, id: generateId() },
      ]);
    }

    resetForm();
  }

  function handleEdit(item: ClassroomMaterialItem) {
    setEditingId(item.id);
    setDraft({
      name: item.name,
      categoryId: item.categoryId,
      quantity: item.quantity,
      alertThreshold: item.alertThreshold,
      location: item.location,
      note: item.note,
      status: item.status,
    });
  }

  function handleDeleteConfirmed(id: string) {
    setItems((previous) => previous.filter((item) => item.id !== id));
    setPendingDeleteId(null);
    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <div className="mt-10">
      <section
        aria-label="Ajouter ou modifier un matériel"
        className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          {editingId ? "Modifier un matériel" : "Ajouter un matériel"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="materiel-nom"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Nom
            </label>
            <input
              id="materiel-nom"
              type="text"
              required
              value={draft.name}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="materiel-categorie"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Catégorie
            </label>
            <select
              id="materiel-categorie"
              value={draft.categoryId}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  categoryId: event.target.value as ClassroomMaterialCategoryId,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground"
            >
              {classroomMaterialCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="materiel-statut"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Statut
            </label>
            <select
              id="materiel-statut"
              value={draft.status}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  status: event.target.value as ClassroomMaterialStatusId,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground"
            >
              {classroomMaterialStatuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="materiel-quantite"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Quantité disponible
            </label>
            <input
              id="materiel-quantite"
              type="number"
              min={0}
              required
              value={draft.quantity}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  quantity: Number(event.target.value),
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="materiel-seuil"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Seuil d’alerte (facultatif)
            </label>
            <input
              id="materiel-seuil"
              type="number"
              min={0}
              value={draft.alertThreshold ?? ""}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  alertThreshold:
                    event.target.value === ""
                      ? undefined
                      : Number(event.target.value),
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="materiel-emplacement"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Emplacement (facultatif)
            </label>
            <input
              id="materiel-emplacement"
              type="text"
              value={draft.location ?? ""}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  location: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="materiel-note"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Note (facultative)
            </label>
            <textarea
              id="materiel-note"
              value={draft.note ?? ""}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  note: event.target.value,
                }))
              }
              rows={2}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/60 px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade/20"
            >
              {editingId ? "Enregistrer les modifications" : "Ajouter le matériel"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/40"
              >
                Annuler
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section
        aria-label="Recherche et filtres"
        className="mt-8 flex flex-wrap items-end gap-4 print:hidden"
      >
        <div>
          <label
            htmlFor="materiel-recherche"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Rechercher
          </label>
          <input
            id="materiel-recherche"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Nom du matériel"
            className="mt-1 min-h-11 w-56 rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor="materiel-filtre-categorie"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Catégorie
          </label>
          <select
            id="materiel-filtre-categorie"
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value as ClassroomMaterialCategoryId | "toutes",
              )
            }
            className="mt-1 min-h-11 rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground"
          >
            <option value="toutes">Toutes</option>
            {classroomMaterialCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="materiel-filtre-statut"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Statut
          </label>
          <select
            id="materiel-filtre-statut"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as ClassroomMaterialStatusId | "tous",
              )
            }
            className="mt-1 min-h-11 rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground"
          >
            <option value="tous">Tous</option>
            {classroomMaterialStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/40"
        >
          Imprimer
        </button>
      </section>

      <section
        aria-label="Compteur"
        className="mt-6 print:hidden"
      >
        <p
          role="status"
          className={[
            "inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-bold",
            toOrderCount > 0
              ? "border-ember/30 bg-ember/[0.08] text-ember"
              : "border-jade/30 bg-jade/[0.08] text-jade",
          ].join(" ")}
        >
          {toOrderCount} élément{toOrderCount === 1 ? "" : "s"} à commander
        </p>
      </section>

      <section aria-label="Inventaire" className="mt-6">
        {filteredItems.length === 0 ? (
          <p className="text-sm leading-7 text-muted">
            Aucun matériel ne correspond à la recherche ou aux filtres.
          </p>
        ) : (
          <ul className="grid gap-3" role="list">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                className="rounded-md border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {getClassroomMaterialCategoryLabel(item.categoryId)} ·{" "}
                      {getClassroomMaterialStatusLabel(item.status)} · Quantité :{" "}
                      {item.quantity}
                      {item.alertThreshold !== undefined
                        ? ` (seuil ${item.alertThreshold})`
                        : ""}
                    </p>
                    {item.location ? (
                      <p className="mt-1 text-xs text-muted">
                        Emplacement : {item.location}
                      </p>
                    ) : null}
                    {item.note ? (
                      <p className="mt-1 text-xs text-muted">Note : {item.note}</p>
                    ) : null}
                  </div>

                  <div className="flex gap-2 print:hidden">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-3 text-xs font-black text-foreground transition hover:border-jade/40"
                    >
                      Modifier
                    </button>
                    {pendingDeleteId === item.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleDeleteConfirmed(item.id)}
                          className="inline-flex min-h-11 items-center justify-center rounded-md border border-ember/40 bg-ember/10 px-3 text-xs font-black text-ember transition hover:bg-ember/20"
                        >
                          Confirmer
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDeleteId(null)}
                          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-3 text-xs font-black text-foreground transition hover:border-jade/40"
                        >
                          Annuler
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(item.id)}
                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-3 text-xs font-black text-foreground transition hover:border-ember/40 hover:text-ember"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

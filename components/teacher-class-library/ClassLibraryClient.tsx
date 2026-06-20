"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CLASS_LIBRARY_STORAGE_KEY,
  classLibraryCategories,
  classLibraryLevels,
  emptyClassLibraryState,
  getClassLibraryCategoryLabel,
  getClassLibraryLevelLabel,
  type ClassLibraryCategoryId,
  type ClassLibraryItem,
  type ClassLibraryLevelId,
  type ClassLibraryState,
} from "@/content/teacher-class-library";

type FormState = {
  id: string | null;
  title: string;
  author: string;
  categoryId: ClassLibraryCategoryId;
  levelId: ClassLibraryLevelId | "";
  theme: string;
  copies: string;
  location: string;
  note: string;
};

const emptyForm: FormState = {
  id: null,
  title: "",
  author: "",
  categoryId: "album",
  levelId: "",
  theme: "",
  copies: "1",
  location: "",
  note: "",
};

function readStoredState(): ClassLibraryState | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(CLASS_LIBRARY_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as ClassLibraryState;
    if (!parsed || !Array.isArray(parsed.items)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function createId(): string {
  return `livre-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ClassLibraryClient() {
  const [state, setState] = useState<ClassLibraryState>(
    () => readStoredState() ?? emptyClassLibraryState,
  );
  const [form, setForm] = useState<FormState>(emptyForm);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    ClassLibraryCategoryId | ""
  >("");
  const [levelFilter, setLevelFilter] = useState<ClassLibraryLevelId | "">(
    "",
  );
  const [themeFilter, setThemeFilter] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(
      CLASS_LIBRARY_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  const themes = useMemo(() => {
    const set = new Set<string>();
    for (const item of state.items) {
      if (item.theme.trim()) {
        set.add(item.theme.trim());
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [state.items]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return state.items
      .filter((item) => {
        if (
          query &&
          !item.title.toLowerCase().includes(query) &&
          !(item.author ?? "").toLowerCase().includes(query)
        ) {
          return false;
        }
        if (categoryFilter && item.categoryId !== categoryFilter) {
          return false;
        }
        if (levelFilter && item.levelId !== levelFilter) {
          return false;
        }
        if (themeFilter && item.theme !== themeFilter) {
          return false;
        }
        if (favoritesOnly && !item.isFavorite) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [
    state.items,
    search,
    categoryFilter,
    levelFilter,
    themeFilter,
    favoritesOnly,
  ]);

  function resetForm() {
    setForm(emptyForm);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = form.title.trim();
    const theme = form.theme.trim();
    const copies = Number.parseInt(form.copies, 10);

    if (!title || !theme || Number.isNaN(copies) || copies < 1) {
      return;
    }

    if (form.id) {
      setState((previous) => ({
        items: previous.items.map((item) =>
          item.id === form.id
            ? {
                ...item,
                title,
                author: form.author.trim() || undefined,
                categoryId: form.categoryId,
                levelId: form.levelId || undefined,
                theme,
                copies,
                location: form.location.trim() || undefined,
                note: form.note.trim() || undefined,
              }
            : item,
        ),
      }));
    } else {
      const newItem: ClassLibraryItem = {
        id: createId(),
        title,
        author: form.author.trim() || undefined,
        categoryId: form.categoryId,
        levelId: form.levelId || undefined,
        theme,
        copies,
        location: form.location.trim() || undefined,
        note: form.note.trim() || undefined,
        isFavorite: false,
        createdAt: new Date().toISOString(),
      };
      setState((previous) => ({ items: [...previous.items, newItem] }));
    }

    resetForm();
  }

  function handleEdit(item: ClassLibraryItem) {
    setForm({
      id: item.id,
      title: item.title,
      author: item.author ?? "",
      categoryId: item.categoryId,
      levelId: item.levelId ?? "",
      theme: item.theme,
      copies: String(item.copies),
      location: item.location ?? "",
      note: item.note ?? "",
    });
  }

  function handleToggleFavorite(id: string) {
    setState((previous) => ({
      items: previous.items.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item,
      ),
    }));
  }

  function handleDeleteRequest(id: string) {
    setPendingDeleteId(id);
  }

  function handleDeleteConfirm() {
    if (!pendingDeleteId) {
      return;
    }
    setState((previous) => ({
      items: previous.items.filter((item) => item.id !== pendingDeleteId),
    }));
    if (form.id === pendingDeleteId) {
      resetForm();
    }
    setPendingDeleteId(null);
  }

  function handleDeleteCancel() {
    setPendingDeleteId(null);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mt-10 print:mt-0">
      <section
        aria-label="Ajouter ou modifier un livre"
        className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6 print:hidden"
      >
        <h2 className="text-xl font-black text-foreground">
          {form.id ? "Modifier la ressource" : "Ajouter un livre ou une ressource"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="cl-title"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Titre *
            </label>
            <input
              id="cl-title"
              type="text"
              required
              value={form.title}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, title: event.target.value }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="cl-author"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Auteur
            </label>
            <input
              id="cl-author"
              type="text"
              value={form.author}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, author: event.target.value }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="cl-category"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Catégorie *
            </label>
            <select
              id="cl-category"
              required
              value={form.categoryId}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  categoryId: event.target.value as ClassLibraryCategoryId,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              {classLibraryCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="cl-level"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Niveau conseillé
            </label>
            <select
              id="cl-level"
              value={form.levelId}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  levelId: event.target.value as ClassLibraryLevelId | "",
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              <option value="">—</option>
              {classLibraryLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="cl-theme"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Thème *
            </label>
            <input
              id="cl-theme"
              type="text"
              required
              value={form.theme}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, theme: event.target.value }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="cl-copies"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Nombre d’exemplaires *
            </label>
            <input
              id="cl-copies"
              type="number"
              min={1}
              required
              value={form.copies}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, copies: event.target.value }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="cl-location"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Emplacement
            </label>
            <input
              id="cl-location"
              type="text"
              value={form.location}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, location: event.target.value }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="cl-note"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Note pédagogique
            </label>
            <textarea
              id="cl-note"
              rows={3}
              value={form.note}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, note: event.target.value }))
              }
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade/20"
            >
              {form.id ? "Enregistrer les modifications" : "Ajouter à la bibliothèque"}
            </button>
            {form.id ? (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
              >
                Annuler
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section
        aria-label="Recherche et filtres"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6 print:hidden"
      >
        <h2 className="text-xl font-black text-foreground">
          Rechercher et filtrer
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <label
              htmlFor="cl-search"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Recherche (titre, auteur)
            </label>
            <input
              id="cl-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="cl-filter-category"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Catégorie
            </label>
            <select
              id="cl-filter-category"
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value as ClassLibraryCategoryId | "")
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              <option value="">Toutes</option>
              {classLibraryCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="cl-filter-level"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Niveau
            </label>
            <select
              id="cl-filter-level"
              value={levelFilter}
              onChange={(event) =>
                setLevelFilter(event.target.value as ClassLibraryLevelId | "")
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              <option value="">Tous</option>
              {classLibraryLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="cl-filter-theme"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Thème
            </label>
            <select
              id="cl-filter-theme"
              value={themeFilter}
              onChange={(event) => setThemeFilter(event.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              <option value="">Tous</option>
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 sm:col-span-4">
            <input
              id="cl-favorites-only"
              type="checkbox"
              checked={favoritesOnly}
              onChange={(event) => setFavoritesOnly(event.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="cl-favorites-only" className="text-sm font-bold text-foreground">
              Afficher uniquement les favoris
            </label>
          </div>
        </div>
      </section>

      <section
        aria-label="Inventaire de la bibliothèque de classe"
        className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <h2 className="text-xl font-black text-foreground">
            Inventaire ({filteredItems.length})
          </h2>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
          >
            Imprimer l’inventaire
          </button>
        </div>
        <h2 className="hidden text-xl font-black text-foreground print:block">
          Inventaire de la bibliothèque de classe
        </h2>

        {filteredItems.length === 0 ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucune ressource ne correspond à ces critères.
          </p>
        ) : (
          <ul className="mt-5 grid gap-3" role="list">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                className="rounded-md border border-white/10 bg-background/45 p-4 print:break-inside-avoid"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-black text-foreground">
                      {item.isFavorite ? "★ " : ""}
                      {item.title}
                      {item.author ? (
                        <span className="ml-2 text-sm font-normal text-muted">
                          — {item.author}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {getClassLibraryCategoryLabel(item.categoryId)}
                      {getClassLibraryLevelLabel(item.levelId)
                        ? ` · ${getClassLibraryLevelLabel(item.levelId)}`
                        : ""}
                      {` · ${item.theme}`}
                      {` · ${item.copies} exemplaire${item.copies > 1 ? "s" : ""}`}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                    {item.note ? (
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {item.note}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2 print:hidden">
                    <button
                      type="button"
                      onClick={() => handleToggleFavorite(item.id)}
                      aria-pressed={item.isFavorite}
                      className={[
                        "inline-flex min-h-9 items-center justify-center rounded-md border px-3 text-xs font-bold transition",
                        item.isFavorite
                          ? "border-gold/50 bg-gold/10 text-gold"
                          : "border-white/15 text-foreground hover:border-gold/40",
                      ].join(" ")}
                    >
                      {item.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="inline-flex min-h-9 items-center justify-center rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRequest(item.id)}
                      className="inline-flex min-h-9 items-center justify-center rounded-md border border-ember/40 px-3 text-xs font-bold text-ember transition hover:bg-ember/10"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {pendingDeleteId ? (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-label="Confirmer la suppression"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 print:hidden"
        >
          <div className="max-w-sm rounded-lg border border-white/10 bg-background p-6">
            <p className="text-base font-black text-foreground">
              Supprimer cette ressource ?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Cette action est définitive et ne peut pas être annulée.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-ember/50 bg-ember/10 px-4 text-sm font-black text-ember transition hover:bg-ember/20"
              >
                Supprimer
              </button>
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createEmptyTeacherTemplate,
  TEACHER_TEMPLATE_LIBRARY_STORAGE_KEY,
  teacherTemplateCategories,
  teacherTemplateLevels,
  teacherTemplateSubjects,
  type TeacherTemplate,
  type TeacherTemplateCategoryId,
  type TeacherTemplateLevelId,
  type TeacherTemplateSubjectId,
} from "@/content/teacher-template-library";

type DraftTemplate = Omit<TeacherTemplate, "id" | "createdAt" | "updatedAt">;

function readStoredTemplates(): TeacherTemplate[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(
      TEACHER_TEMPLATE_LIBRARY_STORAGE_KEY,
    );
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as TeacherTemplate[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

function createId() {
  return `tpl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function TeacherTemplateLibraryClient() {
  const [templates, setTemplates] = useState<TeacherTemplate[]>(() =>
    readStoredTemplates(),
  );
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    TeacherTemplateCategoryId | "tous"
  >("tous");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftTemplate>(
    createEmptyTeacherTemplate(),
  );
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_TEMPLATE_LIBRARY_STORAGE_KEY,
      JSON.stringify(templates),
    );
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return templates
      .filter((template) =>
        categoryFilter === "tous" ? true : template.categoryId === categoryFilter,
      )
      .filter((template) => {
        if (!query) {
          return true;
        }
        return (
          template.title.toLowerCase().includes(query) ||
          template.content.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (a.favorite !== b.favorite) {
          return a.favorite ? -1 : 1;
        }
        return b.updatedAt.localeCompare(a.updatedAt);
      });
  }, [templates, search, categoryFilter]);

  function openCreateForm() {
    setEditingId(null);
    setDraft(createEmptyTeacherTemplate());
    setShowForm(true);
  }

  function openEditForm(template: TeacherTemplate) {
    setEditingId(template.id);
    setDraft({
      categoryId: template.categoryId,
      title: template.title,
      content: template.content,
      levelId: template.levelId,
      subjectId: template.subjectId,
      favorite: template.favorite,
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setDraft(createEmptyTeacherTemplate());
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim()) {
      return;
    }

    const now = new Date().toISOString();

    if (editingId) {
      setTemplates((previous) =>
        previous.map((template) =>
          template.id === editingId
            ? { ...template, ...draft, updatedAt: now }
            : template,
        ),
      );
    } else {
      setTemplates((previous) => [
        ...previous,
        { ...draft, id: createId(), createdAt: now, updatedAt: now },
      ]);
    }

    closeForm();
  }

  function handleDuplicate(template: TeacherTemplate) {
    const now = new Date().toISOString();
    setTemplates((previous) => [
      ...previous,
      {
        ...template,
        id: createId(),
        title: `${template.title} (copie)`,
        favorite: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  }

  function handleToggleFavorite(id: string) {
    setTemplates((previous) =>
      previous.map((template) =>
        template.id === id
          ? {
              ...template,
              favorite: !template.favorite,
              updatedAt: new Date().toISOString(),
            }
          : template,
      ),
    );
  }

  function handleDelete(id: string) {
    setTemplates((previous) => previous.filter((template) => template.id !== id));
    setPendingDeleteId(null);
  }

  function handlePrint(template: TeacherTemplate) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      return;
    }
    printWindow.document.write(
      `<!DOCTYPE html><html><head><title>${escapeHtml(template.title)}</title></head><body><h1>${escapeHtml(template.title)}</h1><pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(template.content)}</pre></body></html>`,
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <div className="mt-10">
      <section
        aria-label="Recherche et filtres"
        className="flex flex-wrap items-center gap-3"
      >
        <label htmlFor="template-search" className="sr-only">
          Rechercher un modèle
        </label>
        <input
          id="template-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher un modèle…"
          className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-4 text-sm text-foreground"
        />

        <label htmlFor="template-category-filter" className="sr-only">
          Filtrer par catégorie
        </label>
        <select
          id="template-category-filter"
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(
              event.target.value as TeacherTemplateCategoryId | "tous",
            )
          }
          className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
        >
          <option value="tous">Toutes les catégories</option>
          {teacherTemplateCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/35 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
        >
          + Créer un modèle
        </button>
      </section>

      {showForm ? (
        <section
          aria-label="Formulaire de modèle"
          className="mt-6 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
        >
          <h2 className="text-xl font-black text-foreground">
            {editingId ? "Modifier le modèle" : "Créer un modèle"}
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
            <div>
              <label
                htmlFor="template-title"
                className="block text-xs font-bold uppercase tracking-wide text-muted"
              >
                Titre
              </label>
              <input
                id="template-title"
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

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="template-category"
                  className="block text-xs font-bold uppercase tracking-wide text-muted"
                >
                  Catégorie
                </label>
                <select
                  id="template-category"
                  value={draft.categoryId}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      categoryId: event.target
                        .value as TeacherTemplateCategoryId,
                    }))
                  }
                  className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                >
                  {teacherTemplateCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="template-level"
                  className="block text-xs font-bold uppercase tracking-wide text-muted"
                >
                  Niveau (facultatif)
                </label>
                <select
                  id="template-level"
                  value={draft.levelId ?? ""}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      levelId: event.target.value
                        ? (event.target.value as TeacherTemplateLevelId)
                        : null,
                    }))
                  }
                  className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                >
                  <option value="">—</option>
                  {teacherTemplateLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="template-subject"
                  className="block text-xs font-bold uppercase tracking-wide text-muted"
                >
                  Matière (facultative)
                </label>
                <select
                  id="template-subject"
                  value={draft.subjectId ?? ""}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      subjectId: event.target.value
                        ? (event.target.value as TeacherTemplateSubjectId)
                        : null,
                    }))
                  }
                  className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
                >
                  <option value="">—</option>
                  {teacherTemplateSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="template-content"
                className="block text-xs font-bold uppercase tracking-wide text-muted"
              >
                Contenu
              </label>
              <textarea
                id="template-content"
                rows={8}
                value={draft.content}
                onChange={(event) =>
                  setDraft((previous) => ({
                    ...previous,
                    content: event.target.value,
                  }))
                }
                className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm leading-6 text-foreground"
              />
            </div>

            <label className="flex items-center gap-2 text-sm font-bold text-foreground">
              <input
                type="checkbox"
                checked={draft.favorite}
                onChange={(event) =>
                  setDraft((previous) => ({
                    ...previous,
                    favorite: event.target.checked,
                  }))
                }
              />
              Marquer comme favori
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/35 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade hover:text-ink"
              >
                {editingId ? "Enregistrer" : "Créer le modèle"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-ember/50 hover:text-ember"
              >
                Annuler
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section aria-label="Liste des modèles" className="mt-8 grid gap-4">
        {filteredTemplates.length === 0 ? (
          <p className="text-sm leading-7 text-muted">
            Aucun modèle ne correspond à votre recherche.
          </p>
        ) : (
          filteredTemplates.map((template) => (
            <article
              key={template.id}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">
                    {
                      teacherTemplateCategories.find(
                        (category) => category.id === template.categoryId,
                      )?.label
                    }
                    {template.levelId
                      ? ` · ${
                          teacherTemplateLevels.find(
                            (level) => level.id === template.levelId,
                          )?.label
                        }`
                      : ""}
                    {template.subjectId
                      ? ` · ${
                          teacherTemplateSubjects.find(
                            (subject) => subject.id === template.subjectId,
                          )?.label
                        }`
                      : ""}
                  </p>
                  <h3 className="mt-1 text-lg font-black text-foreground">
                    {template.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleFavorite(template.id)}
                  aria-pressed={template.favorite}
                  aria-label={
                    template.favorite
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"
                  }
                  className={[
                    "min-h-11 min-w-11 rounded-md border text-lg transition",
                    template.favorite
                      ? "border-gold/40 bg-gold/10 text-gold"
                      : "border-white/10 text-muted hover:border-gold/30",
                  ].join(" ")}
                >
                  {template.favorite ? "★" : "☆"}
                </button>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted">
                {template.content}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openEditForm(template)}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-3 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => handleDuplicate(template)}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40 hover:text-jade"
                >
                  Dupliquer
                </button>
                <button
                  type="button"
                  onClick={() => handlePrint(template)}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40 hover:text-jade"
                >
                  Imprimer
                </button>

                {pendingDeleteId === template.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-ember">
                      Confirmer la suppression ?
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(template.id)}
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-ember/40 bg-ember/10 px-3 text-sm font-bold text-ember"
                    >
                      Oui, supprimer
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDeleteId(null)}
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-3 text-sm font-bold text-foreground"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPendingDeleteId(template.id)}
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

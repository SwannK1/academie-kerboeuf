"use client";

import { useMemo, useState } from "react";
import {
  communicationCategories,
  communicationStatuses,
  getCommunicationCategoryLabel,
  getCommunicationStatusLabel,
  type CommunicationCategory,
  type CommunicationStatus,
  type TeacherCommunication,
} from "@/content/teacher-communications-library";

const STORAGE_KEY = "academie-kerboeuf-communications-v1";

function readStoredCommunications(): TeacherCommunication[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as TeacherCommunication[];
  } catch {
    return [];
  }
}

function writeStoredCommunications(communications: TeacherCommunication[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(communications));
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `comm-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type DraftFields = {
  title: string;
  category: CommunicationCategory;
  subject: string;
  content: string;
  plannedDate: string;
  status: CommunicationStatus;
};

const emptyDraft: DraftFields = {
  title: "",
  category: "information-generale",
  subject: "",
  content: "",
  plannedDate: "",
  status: "brouillon",
};

export function TeacherCommunicationsLibrary() {
  const [communications, setCommunications] = useState<TeacherCommunication[]>(
    () => readStoredCommunications(),
  );
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CommunicationCategory | "all">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<CommunicationStatus | "all">(
    "all",
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftFields>(emptyDraft);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  function persist(next: TeacherCommunication[]) {
    setCommunications(next);
    writeStoredCommunications(next);
  }

  function resetDraft() {
    setDraft(emptyDraft);
    setEditingId(null);
  }

  function startEdit(communication: TeacherCommunication) {
    setEditingId(communication.id);
    setDraft({
      title: communication.title,
      category: communication.category,
      subject: communication.subject ?? "",
      content: communication.content,
      plannedDate: communication.plannedDate ?? "",
      status: communication.status,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.title.trim() || !draft.content.trim()) {
      return;
    }

    const now = new Date().toISOString();

    if (editingId) {
      persist(
        communications.map((communication) =>
          communication.id === editingId
            ? {
                ...communication,
                title: draft.title.trim(),
                category: draft.category,
                subject: draft.subject.trim() || undefined,
                content: draft.content,
                plannedDate: draft.plannedDate || undefined,
                status: draft.status,
                updatedAt: now,
              }
            : communication,
        ),
      );
    } else {
      const newCommunication: TeacherCommunication = {
        id: createId(),
        title: draft.title.trim(),
        category: draft.category,
        subject: draft.subject.trim() || undefined,
        content: draft.content,
        plannedDate: draft.plannedDate || undefined,
        status: draft.status,
        favorite: false,
        createdAt: now,
        updatedAt: now,
      };
      persist([newCommunication, ...communications]);
    }

    resetDraft();
  }

  function duplicateCommunication(communication: TeacherCommunication) {
    const now = new Date().toISOString();
    const copy: TeacherCommunication = {
      ...communication,
      id: createId(),
      title: `${communication.title} (copie)`,
      favorite: false,
      createdAt: now,
      updatedAt: now,
    };
    persist([copy, ...communications]);
  }

  function toggleFavorite(id: string) {
    persist(
      communications.map((communication) =>
        communication.id === id
          ? { ...communication, favorite: !communication.favorite }
          : communication,
      ),
    );
  }

  function deleteCommunication(id: string) {
    persist(communications.filter((communication) => communication.id !== id));
    setConfirmDeleteId(null);
    if (editingId === id) {
      resetDraft();
    }
  }

  const visibleCommunications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return communications
      .filter((communication) => {
        if (categoryFilter !== "all" && communication.category !== categoryFilter) {
          return false;
        }
        if (statusFilter !== "all" && communication.status !== statusFilter) {
          return false;
        }
        if (!query) {
          return true;
        }
        return (
          communication.title.toLowerCase().includes(query) ||
          (communication.subject ?? "").toLowerCase().includes(query) ||
          communication.content.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (a.favorite !== b.favorite) {
          return a.favorite ? -1 : 1;
        }
        return b.updatedAt.localeCompare(a.updatedAt);
      });
  }, [communications, search, categoryFilter, statusFilter]);

  return (
    <div>
      <section aria-labelledby="creer-communication-titre" className="mt-8">
        <h2
          id="creer-communication-titre"
          className="text-xl font-black text-foreground"
        >
          {editingId ? "Modifier la communication" : "Créer une communication"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-4 grid gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Titre
              <input
                type="text"
                value={draft.title}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, title: event.target.value }))
                }
                required
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Catégorie
              <select
                value={draft.category}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    category: event.target.value as CommunicationCategory,
                  }))
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
              >
                {communicationCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Objet (facultatif)
              <input
                type="text"
                value={draft.subject}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, subject: event.target.value }))
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Date prévue (facultative)
              <input
                type="date"
                value={draft.plannedDate}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    plannedDate: event.target.value,
                  }))
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Statut
              <select
                value={draft.status}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    status: event.target.value as CommunicationStatus,
                  }))
                }
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
              >
                {communicationStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
            Contenu
            <textarea
              value={draft.content}
              onChange={(event) =>
                setDraft((current) => ({ ...current, content: event.target.value }))
              }
              required
              rows={6}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-normal leading-6 text-foreground"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="min-h-11 rounded-md border border-jade/60 bg-jade/10 px-5 text-sm font-bold text-jade transition hover:bg-jade/20"
            >
              {editingId ? "Enregistrer les modifications" : "Créer la communication"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetDraft}
                className="min-h-11 rounded-md border border-white/15 px-5 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
              >
                Annuler
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section aria-labelledby="rechercher-filtrer-titre" className="mt-10">
        <h2
          id="rechercher-filtrer-titre"
          className="text-xl font-black text-foreground"
        >
          Rechercher et filtrer
        </h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
            Recherche
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Titre, objet ou contenu"
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
            Catégorie
            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value as CommunicationCategory | "all")
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
            >
              <option value="all">Toutes les catégories</option>
              {communicationCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
            Statut
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as CommunicationStatus | "all")
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
            >
              <option value="all">Tous les statuts</option>
              {communicationStatuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section aria-labelledby="mes-communications-titre" className="mt-10">
        <h2
          id="mes-communications-titre"
          className="text-xl font-black text-foreground"
        >
          Mes communications ({visibleCommunications.length})
        </h2>

        {visibleCommunications.length === 0 ? (
          <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-muted">
            Aucune communication ne correspond à votre recherche ou à vos filtres.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4">
            {visibleCommunications.map((communication) => (
              <li
                key={communication.id}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-sky">
                      {getCommunicationCategoryLabel(communication.category)}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-foreground">
                      {communication.title}
                    </h3>
                    {communication.subject ? (
                      <p className="mt-1 text-sm font-bold text-muted">
                        Objet : {communication.subject}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(communication.id)}
                    aria-pressed={communication.favorite}
                    aria-label={
                      communication.favorite
                        ? `Retirer ${communication.title} des favoris`
                        : `Ajouter ${communication.title} aux favoris`
                    }
                    className={[
                      "min-h-9 rounded-md border px-3 text-sm font-bold transition",
                      communication.favorite
                        ? "border-amber/60 bg-amber/10 text-amber"
                        : "border-white/15 text-muted hover:border-amber/40",
                    ].join(" ")}
                  >
                    {communication.favorite ? "★ Favori" : "☆ Favori"}
                  </button>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-foreground">
                  {communication.content}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span className="rounded-full border border-white/15 px-3 py-1 font-bold">
                    {getCommunicationStatusLabel(communication.status)}
                  </span>
                  {communication.plannedDate ? (
                    <span>Date prévue : {communication.plannedDate}</span>
                  ) : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(communication)}
                    className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateCommunication(communication)}
                    className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-sky/40"
                  >
                    Dupliquer
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-sky/40"
                  >
                    Imprimer
                  </button>

                  {confirmDeleteId === communication.id ? (
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose">
                        Confirmer la suppression ?
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteCommunication(communication.id)}
                        className="min-h-9 rounded-md border border-rose/60 bg-rose/10 px-3 text-xs font-bold text-rose"
                      >
                        Oui, supprimer
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground"
                      >
                        Annuler
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(communication.id)}
                      className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-muted transition hover:border-rose/40 hover:text-rose"
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

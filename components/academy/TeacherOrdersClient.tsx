"use client";

import { useEffect, useMemo, useState } from "react";
import {
  computeTeacherOrderLineTotal,
  computeTeacherOrdersEstimatedBudget,
  createTeacherOrderId,
  getTeacherOrderCategoryLabel,
  getTeacherOrderStatusLabel,
  TEACHER_ORDERS_STORAGE_KEY,
  teacherOrderCategories,
  teacherOrderStatuses,
  type TeacherOrderCategoryId,
  type TeacherOrderStatus,
  type TeacherSupplyOrder,
} from "@/content/teacher-orders";

const DEFAULT_CATEGORY: TeacherOrderCategoryId = "papeterie";

function readStoredOrders(): TeacherSupplyOrder[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(TEACHER_ORDERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as TeacherSupplyOrder[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

function formatPrice(value: number): string {
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

type NewOrderDraft = {
  label: string;
  category: TeacherOrderCategoryId;
  quantity: string;
  unitPrice: string;
  supplier: string;
};

const EMPTY_DRAFT: NewOrderDraft = {
  label: "",
  category: DEFAULT_CATEGORY,
  quantity: "1",
  unitPrice: "",
  supplier: "",
};

export function TeacherOrdersClient() {
  const [orders, setOrders] = useState<TeacherSupplyOrder[]>(() =>
    readStoredOrders(),
  );
  const [draft, setDraft] = useState<NewOrderDraft>(EMPTY_DRAFT);
  const [statusFilter, setStatusFilter] = useState<TeacherOrderStatus | "tous">(
    "tous",
  );
  const [categoryFilter, setCategoryFilter] = useState<
    TeacherOrderCategoryId | "tous"
  >("tous");
  const [search, setSearch] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_ORDERS_STORAGE_KEY,
      JSON.stringify(orders),
    );
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (statusFilter !== "tous" && order.status !== statusFilter) {
        return false;
      }
      if (categoryFilter !== "tous" && order.category !== categoryFilter) {
        return false;
      }
      if (query && !order.label.toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });
  }, [orders, statusFilter, categoryFilter, search]);

  const toOrderCount = orders.filter(
    (order) => order.status !== "recu",
  ).length;
  const receivedCount = orders.filter((order) => order.status === "recu").length;
  const estimatedBudget = computeTeacherOrdersEstimatedBudget(orders);

  function handleAddOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = draft.label.trim();
    if (!label) {
      return;
    }

    const quantity = Number.parseInt(draft.quantity, 10);
    const unitPriceValue = draft.unitPrice.trim()
      ? Number.parseFloat(draft.unitPrice)
      : null;

    const newOrder: TeacherSupplyOrder = {
      id: createTeacherOrderId(),
      label,
      category: draft.category,
      quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
      unitPrice:
        unitPriceValue !== null && Number.isFinite(unitPriceValue)
          ? unitPriceValue
          : null,
      supplier: draft.supplier.trim(),
      status: "a-prevoir",
      notes: "",
      createdAt: new Date().toISOString(),
    };

    setOrders((previous) => [...previous, newOrder]);
    setDraft(EMPTY_DRAFT);
  }

  function handleStatusChange(id: string, status: TeacherOrderStatus) {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    );
  }

  function handleDuplicate(id: string) {
    setOrders((previous) => {
      const source = previous.find((order) => order.id === id);
      if (!source) {
        return previous;
      }
      const duplicate: TeacherSupplyOrder = {
        ...source,
        id: createTeacherOrderId(),
        createdAt: new Date().toISOString(),
      };
      const index = previous.findIndex((order) => order.id === id);
      const next = [...previous];
      next.splice(index + 1, 0, duplicate);
      return next;
    });
  }

  function handleRequestDelete(id: string) {
    setPendingDeleteId(id);
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }
    setOrders((previous) =>
      previous.filter((order) => order.id !== pendingDeleteId),
    );
    setPendingDeleteId(null);
  }

  function handleCancelDelete() {
    setPendingDeleteId(null);
  }

  const orderPendingDelete = orders.find(
    (order) => order.id === pendingDeleteId,
  );

  return (
    <div className="mt-10 print:mt-4">
      <section
        aria-label="Ajouter un article"
        className="rounded-lg border border-jade/25 bg-jade/[0.05] p-5 sm:p-6 print:hidden"
      >
        <h2 className="text-xl font-black text-foreground">
          Ajouter un article
        </h2>
        <form
          onSubmit={handleAddOrder}
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          <div className="lg:col-span-2">
            <label
              htmlFor="commande-label"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Article
            </label>
            <input
              id="commande-label"
              type="text"
              required
              value={draft.label}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  label: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
              placeholder="Ex. Feutres ardoise"
            />
          </div>

          <div>
            <label
              htmlFor="commande-categorie"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Catégorie
            </label>
            <select
              id="commande-categorie"
              value={draft.category}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  category: event.target.value as TeacherOrderCategoryId,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
            >
              {teacherOrderCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="commande-quantite"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Quantité
            </label>
            <input
              id="commande-quantite"
              type="number"
              min={1}
              required
              value={draft.quantity}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  quantity: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="commande-prix"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Prix unitaire (€, facultatif)
            </label>
            <input
              id="commande-prix"
              type="number"
              min={0}
              step="0.01"
              value={draft.unitPrice}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  unitPrice: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <label
              htmlFor="commande-fournisseur"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Fournisseur (facultatif)
            </label>
            <input
              id="commande-fournisseur"
              type="text"
              value={draft.supplier}
              onChange={(event) =>
                setDraft((previous) => ({
                  ...previous,
                  supplier: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade/20"
            >
              Ajouter l’article
            </button>
          </div>
        </form>
      </section>

      <section
        aria-label="Compteurs"
        className="mt-6 grid gap-3 sm:grid-cols-3 print:hidden"
      >
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            Articles à commander
          </p>
          <p className="mt-1 text-2xl font-black text-foreground">
            {toOrderCount}
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            Articles reçus
          </p>
          <p className="mt-1 text-2xl font-black text-foreground">
            {receivedCount}
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            Budget estimé
          </p>
          <p className="mt-1 text-2xl font-black text-foreground">
            {formatPrice(estimatedBudget)}
          </p>
        </div>
      </section>

      <section
        aria-label="Filtres"
        className="mt-6 grid gap-3 sm:grid-cols-3 print:hidden"
      >
        <div>
          <label
            htmlFor="filtre-statut"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Filtrer par statut
          </label>
          <select
            id="filtre-statut"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as TeacherOrderStatus | "tous")
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
          >
            <option value="tous">Tous les statuts</option>
            {teacherOrderStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filtre-categorie"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Filtrer par catégorie
          </label>
          <select
            id="filtre-categorie"
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value as TeacherOrderCategoryId | "tous",
              )
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground"
          >
            <option value="tous">Toutes les catégories</option>
            {teacherOrderCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filtre-recherche"
            className="block text-xs font-bold uppercase tracking-wide text-muted"
          >
            Rechercher
          </label>
          <input
            id="filtre-recherche"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nom de l’article"
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>
      </section>

      <section aria-label="Liste des commandes" className="mt-6">
        {filteredOrders.length === 0 ? (
          <p className="rounded-md border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-muted">
            Aucun article ne correspond à ces critères.
          </p>
        ) : (
          <>
            {/* Tableau sur ordinateur */}
            <div className="hidden overflow-x-auto sm:block print:block">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">
                  Liste des articles de commande de rentrée
                </caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Article
                    </th>
                    <th
                      scope="col"
                      className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Catégorie
                    </th>
                    <th
                      scope="col"
                      className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Qté
                    </th>
                    <th
                      scope="col"
                      className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Prix unitaire
                    </th>
                    <th
                      scope="col"
                      className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Fournisseur
                    </th>
                    <th
                      scope="col"
                      className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Statut
                    </th>
                    <th
                      scope="col"
                      className="border-b border-white/10 p-2 text-left text-xs font-bold uppercase tracking-wide text-muted print:hidden"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <th
                        scope="row"
                        className="border-b border-white/5 p-2 text-left font-bold text-foreground"
                      >
                        {order.label}
                      </th>
                      <td className="border-b border-white/5 p-2 text-foreground">
                        {getTeacherOrderCategoryLabel(order.category)}
                      </td>
                      <td className="border-b border-white/5 p-2 text-foreground">
                        {order.quantity}
                      </td>
                      <td className="border-b border-white/5 p-2 text-foreground">
                        {order.unitPrice !== null
                          ? formatPrice(order.unitPrice)
                          : "—"}
                      </td>
                      <td className="border-b border-white/5 p-2 text-foreground">
                        {formatPrice(computeTeacherOrderLineTotal(order))}
                      </td>
                      <td className="border-b border-white/5 p-2 text-foreground">
                        {order.supplier || "—"}
                      </td>
                      <td className="border-b border-white/5 p-2">
                        <label
                          htmlFor={`statut-${order.id}`}
                          className="sr-only"
                        >
                          Statut — {order.label}
                        </label>
                        <select
                          id={`statut-${order.id}`}
                          value={order.status}
                          onChange={(event) =>
                            handleStatusChange(
                              order.id,
                              event.target.value as TeacherOrderStatus,
                            )
                          }
                          className="min-h-11 rounded-md border border-white/10 bg-background/45 px-2 text-sm text-foreground print:hidden"
                        >
                          {teacherOrderStatuses.map((status) => (
                            <option key={status.id} value={status.id}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                        <span className="hidden text-foreground print:inline">
                          {getTeacherOrderStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="border-b border-white/5 p-2 print:hidden">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleDuplicate(order.id)}
                            className="min-h-11 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40 hover:text-jade"
                          >
                            Dupliquer
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRequestDelete(order.id)}
                            className="min-h-11 rounded-md border border-ember/30 px-3 text-xs font-bold text-ember transition hover:bg-ember/10"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cartes sur mobile */}
            <div className="grid gap-4 sm:hidden print:hidden">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-md border border-white/10 bg-background/45 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-black text-foreground">
                      {order.label}
                    </p>
                    <span className="rounded-full border border-white/15 px-2 py-1 text-xs font-bold text-muted">
                      {getTeacherOrderCategoryLabel(order.category)}
                    </span>
                  </div>

                  <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide text-muted">
                        Quantité
                      </dt>
                      <dd className="text-foreground">{order.quantity}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide text-muted">
                        Prix unitaire
                      </dt>
                      <dd className="text-foreground">
                        {order.unitPrice !== null
                          ? formatPrice(order.unitPrice)
                          : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide text-muted">
                        Total
                      </dt>
                      <dd className="text-foreground">
                        {formatPrice(computeTeacherOrderLineTotal(order))}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide text-muted">
                        Fournisseur
                      </dt>
                      <dd className="text-foreground">
                        {order.supplier || "—"}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-3">
                    <label
                      htmlFor={`statut-mobile-${order.id}`}
                      className="block text-xs font-bold uppercase tracking-wide text-muted"
                    >
                      Statut
                    </label>
                    <select
                      id={`statut-mobile-${order.id}`}
                      value={order.status}
                      onChange={(event) =>
                        handleStatusChange(
                          order.id,
                          event.target.value as TeacherOrderStatus,
                        )
                      }
                      className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/60 px-2 text-sm text-foreground"
                    >
                      {teacherOrderStatuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(order.id)}
                      className="min-h-11 flex-1 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40 hover:text-jade"
                    >
                      Dupliquer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRequestDelete(order.id)}
                      className="min-h-11 flex-1 rounded-md border border-ember/30 px-3 text-xs font-bold text-ember transition hover:bg-ember/10"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="mt-8 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
        >
          Imprimer la liste
        </button>
      </section>

      {orderPendingDelete ? (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 print:hidden"
        >
          <div className="w-full max-w-md rounded-lg border border-ember/30 bg-background p-6">
            <h2
              id="confirm-delete-title"
              className="text-lg font-black text-foreground"
            >
              Supprimer cet article ?
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              « {orderPendingDelete.label} » sera supprimé de la liste. Cette
              action est irréversible.
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40 hover:text-jade"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="min-h-11 rounded-md border border-ember/40 bg-ember/10 px-4 text-sm font-black text-ember transition hover:bg-ember/20"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

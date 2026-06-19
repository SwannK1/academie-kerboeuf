export const TEACHER_ORDERS_STORAGE_KEY = "academie-kerboeuf-commandes-v1";

export type TeacherOrderStatus = "a-prevoir" | "demande" | "commande" | "recu";

export type TeacherSupplyOrder = {
  id: string;
  label: string;
  category: string;
  quantity: number;
  unitPrice: number | null;
  supplier: string;
  status: TeacherOrderStatus;
  notes: string;
  createdAt: string;
};

export type TeacherOrderCategoryId =
  | "papeterie"
  | "cahiers"
  | "arts-plastiques"
  | "rangement"
  | "sport"
  | "affichage"
  | "autre";

export type TeacherOrderCategory = {
  id: TeacherOrderCategoryId;
  label: string;
};

export const teacherOrderCategories: TeacherOrderCategory[] = [
  { id: "papeterie", label: "Papeterie" },
  { id: "cahiers", label: "Cahiers" },
  { id: "arts-plastiques", label: "Arts plastiques" },
  { id: "rangement", label: "Rangement" },
  { id: "sport", label: "Sport" },
  { id: "affichage", label: "Affichage" },
  { id: "autre", label: "Autre" },
];

export type TeacherOrderStatusOption = {
  id: TeacherOrderStatus;
  label: string;
};

export const teacherOrderStatuses: TeacherOrderStatusOption[] = [
  { id: "a-prevoir", label: "À prévoir" },
  { id: "demande", label: "Demandé" },
  { id: "commande", label: "Commandé" },
  { id: "recu", label: "Reçu" },
];

export function getTeacherOrderStatusLabel(status: TeacherOrderStatus): string {
  return (
    teacherOrderStatuses.find((option) => option.id === status)?.label ?? status
  );
}

export function getTeacherOrderCategoryLabel(category: string): string {
  return (
    teacherOrderCategories.find((option) => option.id === category)?.label ??
    category
  );
}

export function createTeacherOrderId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `commande-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function computeTeacherOrderLineTotal(
  order: Pick<TeacherSupplyOrder, "quantity" | "unitPrice">,
): number {
  if (order.unitPrice === null) {
    return 0;
  }
  return order.quantity * order.unitPrice;
}

export function computeTeacherOrdersEstimatedBudget(
  orders: TeacherSupplyOrder[],
): number {
  return orders.reduce(
    (sum, order) => sum + computeTeacherOrderLineTotal(order),
    0,
  );
}

import type { PublicStatus, PublicStatusKey } from "@/content/public-status.domain";

export type PublicStatusVariant = PublicStatusKey;

export const publicStatusUi = {
  available: {
    label: "Disponible",
    ariaLabel: "Statut public : disponible",
    variant: "available",
    className: "border-jade/35 bg-jade/10 text-jade",
    dotClassName: "bg-jade",
  },
  partial: {
    label: "Partiel",
    ariaLabel: "Statut public : partiellement disponible",
    variant: "partial",
    className: "border-ember/35 bg-ember/10 text-ember",
    dotClassName: "bg-ember",
  },
  preparing: {
    label: "En préparation",
    ariaLabel: "Statut public : en préparation",
    variant: "preparing",
    className: "border-sky/25 bg-sky/10 text-sky",
    dotClassName: "bg-sky",
  },
  "coming-soon": {
    label: "À venir",
    ariaLabel: "Statut public : à venir",
    variant: "coming-soon",
    className: "border-gold/35 bg-gold/10 text-gold",
    dotClassName: "bg-gold",
  },
} as const satisfies Record<
  PublicStatusKey,
  {
    label: string;
    ariaLabel: string;
    variant: PublicStatusVariant;
    className: string;
    dotClassName: string;
  }
>;

export type PublicStatusLabel =
  (typeof publicStatusUi)[PublicStatusKey]["label"];

export function getPublicStatusUi(status: PublicStatus) {
  return publicStatusUi[status.key];
}

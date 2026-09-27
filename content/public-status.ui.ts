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
    label: "Partiellement disponible",
    ariaLabel: "Statut public : partiellement disponible",
    variant: "partial",
    className: "border-gold/35 bg-gold/10 text-gold",
    dotClassName: "bg-gold",
  },
  "in-progress": {
    label: "En préparation",
    ariaLabel: "Statut public : en préparation",
    variant: "in-progress",
    className: "border-sky/25 bg-sky/10 text-sky",
    dotClassName: "bg-sky",
  },
  upcoming: {
    // Trois états publics seulement : « à venir » s'affiche comme « en préparation ».
    label: "En préparation",
    ariaLabel: "Statut public : en préparation",
    variant: "upcoming",
    className: "border-ink/20 bg-ink/[0.04] text-muted",
    dotClassName: "bg-muted",
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

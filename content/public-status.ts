import {
  normalizePublicStatus,
  type PublicStatus,
  type PublicStatusKey,
} from "@/content/public-status.domain";
import {
  getPublicStatusUi,
  type PublicStatusLabel,
  type PublicStatusVariant,
} from "@/content/public-status.ui";

export type {
  PublicStatus,
  PublicStatusKey,
  PublicStatusLabel,
  PublicStatusVariant,
};

export function getPublicStatus(status: unknown): PublicStatus {
  return normalizePublicStatus(status);
}

export function getPublicStatusKey(status: unknown): PublicStatusKey {
  return getPublicStatus(status).key;
}

/** @deprecated Utilisez getPublicStatusKey() */
export function getPublicStatusVariant(status: unknown): PublicStatusVariant {
  return getPublicStatusKey(status);
}

export function getPublicStatusLabel(status: unknown): PublicStatusLabel {
  return getPublicStatusUi(getPublicStatus(status)).label;
}

export function getPublicStatusAriaLabel(status: unknown) {
  return getPublicStatusUi(getPublicStatus(status)).ariaLabel;
}

export function getPublicStatusClassName(status: unknown) {
  return getPublicStatusUi(getPublicStatus(status)).className;
}

export function getPublicStatusDotClassName(status: unknown) {
  return getPublicStatusUi(getPublicStatus(status)).dotClassName;
}

/**
 * Décision centrale unique pour savoir si une carte de navigation (domaine,
 * sous-domaine, matière...) doit être cliquable : un lien réel doit exister
 * ET le statut ne doit pas être "coming-soon" (rien n'existe encore).
 *
 * Ne pas réimplémenter cette condition localement dans un composant —
 * l'étendre ici si un nouveau cas d'usage apparaît.
 */
export function isPubliclyLinkable(
  status: unknown,
  href: string | null | undefined,
): href is string {
  return Boolean(href) && getPublicStatusKey(status) !== "coming-soon";
}

/**
 * Décision centrale unique pour savoir si un contenu terminal (PDF,
 * mission, matière...) est réellement exploitable : un lien réel existe ET
 * le statut est strictement "available". Plus strict que
 * isPubliclyLinkable(), qui autorise aussi "partial"/"preparing" pour les
 * pages hub dont le contenu est volontairement partiel.
 */
export function isPubliclyAvailable(
  status: unknown,
  href: string | null | undefined,
): href is string {
  return Boolean(href) && getPublicStatusKey(status) === "available";
}

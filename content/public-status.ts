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

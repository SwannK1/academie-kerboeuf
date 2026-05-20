import { getPublicStatusKey } from "@/content/public-status";
import type {
  PedagogicalResourceKind,
  PedagogicalResourceRef,
} from "@/content/program-types";

export type PedagogicalResourceSlot = {
  kind: PedagogicalResourceKind;
  label: string;
  resource?: PedagogicalResourceRef;
};

const resourceSlots: Array<{
  kind: PedagogicalResourceKind;
  label: string;
}> = [
  { kind: "lesson-pdf", label: "Leçon PDF" },
  { kind: "exercises-pdf", label: "Exercices PDF" },
  { kind: "correction-pdf", label: "Correction PDF" },
  { kind: "projectable-pdf", label: "Projection PDF" },
  { kind: "parent-sheet-pdf", label: "Fiche parent" },
];

export function getPedagogicalResourceSlots(
  resources: PedagogicalResourceRef[] = [],
): PedagogicalResourceSlot[] {
  return resourceSlots.map((slot) => ({
    ...slot,
    resource: resources.find((resource) => resource.kind === slot.kind),
  }));
}

export function isPedagogicalResourceAbsent(
  resource: PedagogicalResourceRef | undefined,
) {
  return !resource || resource.status === "missing";
}

export function isPedagogicalResourceLinkable(
  resource: PedagogicalResourceRef | undefined,
): resource is PedagogicalResourceRef & { href: string } {
  return Boolean(resource?.href) && getPublicStatusKey(resource?.status) === "available";
}

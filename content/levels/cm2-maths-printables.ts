// Ressources imprimables CM2 — Mathématiques.
// Le site organise ; les fichiers (F1/F2/F3) enseignent.
// Aucun href fictif : ne renseigner `href` que pour un fichier réellement présent
// dans /public. Tant qu'un fichier n'existe pas, status reste "planned".

import type { PedagogicalResourceStatus } from "@/content/program-types";

/**
 * Support imprimable d'une séquence (fiche 1, 2 ou 3).
 * Type volontairement léger : pas de discrimination par statut, juste de quoi
 * référencer un fichier existant ou réserver sa place avant production.
 */
export type PrintableResource = {
  kind: "f1" | "f2" | "f3";
  title: string;
  href?: string;
  status: PedagogicalResourceStatus;
};

export type PrintableResourceSet = {
  entryId: string;
  subdomainSlug: string;
  resources: PrintableResource[];
};

export const cm2MathsPrintables: PrintableResourceSet[] = [
  {
    entryId: "cm2-ma-num-fractions-decimaux-entry",
    subdomainSlug: "numeration",
    resources: [
      { kind: "f1", title: "F1 — Découverte", status: "planned" },
      { kind: "f2", title: "F2 — Entraînement", status: "planned" },
      { kind: "f3", title: "F3 — Consolidation", status: "planned" },
    ],
  },
  {
    entryId: "cm2-ma-cal-operations-decimaux-entry",
    subdomainSlug: "calcul-pose",
    resources: [
      { kind: "f1", title: "F1 — Découverte", status: "planned" },
      { kind: "f2", title: "F2 — Entraînement", status: "planned" },
      { kind: "f3", title: "F3 — Consolidation", status: "planned" },
    ],
  },
  {
    entryId: "cm2-ma-gm-aires-entry",
    subdomainSlug: "grandeurs-mesures",
    resources: [
      { kind: "f1", title: "F1 — Découverte", status: "planned" },
      { kind: "f2", title: "F2 — Entraînement", status: "planned" },
      { kind: "f3", title: "F3 — Consolidation", status: "planned" },
    ],
  },
  {
    entryId: "cm2-ma-geo-symetrie-axiale-entry",
    subdomainSlug: "geometrie",
    resources: [
      { kind: "f1", title: "F1 — Découverte", status: "planned" },
      { kind: "f2", title: "F2 — Entraînement", status: "planned" },
      { kind: "f3", title: "F3 — Consolidation", status: "planned" },
    ],
  },
];

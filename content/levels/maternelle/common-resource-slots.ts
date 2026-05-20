// Slots de ressources communs à tous les domaines maternelle (PS, MS, GS).
// Toutes les ressources sont en statut "upcoming" : aucun href tant que les PDF n'existent pas.
// Le site organise ; les PDF enseignent.

import type { MaternelleDomainEntry } from "@/content/levels/maternelle/types";

export const maternelleCommonResourceSlots: MaternelleDomainEntry["resourceSlots"] =
  [
    {
      kind: "grille-observation",
      label: "Grille d'observation",
      status: "upcoming",
    },
    {
      kind: "fiche-atelier",
      label: "Fiche atelier",
      status: "upcoming",
    },
    {
      kind: "support-projetable",
      label: "Support projetable",
      status: "upcoming",
    },
    {
      kind: "fiche-parent",
      label: "Fiche parent",
      status: "upcoming",
    },
  ];

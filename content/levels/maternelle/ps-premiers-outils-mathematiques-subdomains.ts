/**
 * PS · Domaine Premiers outils pour structurer la pensée · Sous-domaines structurés
 *
 * Trois sous-domaines légers alignés sur le programme cycle 1 :
 *   1. Nombres et quantités
 *   2. Formes et grandeurs
 *   3. Tris et classements
 *
 * Chaque sous-domaine contient une séquence et un atelier pilote.
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const psPremiersOutilsMathematiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Nombres et quantités ───────────────────────────────────────────────
  {
    id: "ps-maths-nombres-quantites",
    slug: "nombres-quantites",
    label: "Nombres et quantités",
    description:
      "Découverte des petites quantités par manipulation et jeux de collection.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-maths-nombres-quantites-seq1",
        title: "Reconnaître une petite quantité",
        objective: "Reconnaître une collection de un ou deux objets.",
        observableSkills: ["Reconnaît une collection de un ou deux objets."],
        periodLabel: "Période 1",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ps-maths-nombres-quantites-seq1-atelier1",
            title: "Boîtes à trésors",
            type: "manipulation",
            objective:
              "Associer une boîte contenant un ou deux objets à une demande orale.",
            duration: "15 min",
            groupSize: "4 élèves",
            materials: [
              "3 boîtes transparentes",
              "Objets divers (jetons, cailloux, pompons)",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-maths-nombres-quantites-seq1-atelier1-grille",
              title: "Grille — Reconnaître une petite quantité (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-maths-nombres-1",
                  label: "Reconnaît une collection d'un ou deux objets",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-maths-nombres-2",
                  label: "Montre la boîte contenant la quantité demandée",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-maths-nombres-3",
                  label:
                    "Produit lui-même une collection de un ou deux objets",
                  levelDescriptor: "Dépassement PS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 2. Formes et grandeurs ────────────────────────────────────────────────
  {
    id: "ps-maths-formes-grandeurs",
    slug: "formes-grandeurs",
    label: "Formes et grandeurs",
    description:
      "Manipulation guidée de formes et d'objets de tailles contrastées.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-maths-formes-grandeurs-seq1",
        title: "Associer des formes identiques",
        objective: "Associer deux formes identiques par manipulation.",
        observableSkills: ["Associe deux formes identiques."],
        periodLabel: "Période 2",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-maths-formes-grandeurs-seq1-atelier1",
            title: "Paires de formes",
            type: "manipulation",
            objective:
              "Retrouver une forme identique parmi plusieurs formes simples.",
            duration: "15 min",
            groupSize: "4 élèves",
            materials: [
              "Paires de formes géométriques en bois ou carton (rond, carré, triangle)",
              "Plateau de tri",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-maths-formes-grandeurs-seq1-atelier1-grille",
              title: "Grille — Associer des formes identiques (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-maths-formes-1",
                  label: "Associe deux formes identiques parmi 3 paires",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-maths-formes-2",
                  label: "Nomme une forme (rond, carré)",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-maths-formes-3",
                  label: "Trie spontanément les formes en deux groupes",
                  levelDescriptor: "Dépassement PS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 3. Tris et classements ────────────────────────────────────────────────
  {
    id: "ps-maths-tris-classements",
    slug: "tris-classements",
    label: "Tris et classements",
    description:
      "Premiers tris d'objets selon une propriété visible et stable.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-maths-tris-classements-seq1",
        title: "Trier selon une propriété visible",
        objective: "Regrouper des objets selon une couleur ou une forme.",
        observableSkills: ["Regroupe des objets selon une propriété visible."],
        periodLabel: "Période 3",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-maths-tris-classements-seq1-atelier1",
            title: "Bacs de couleurs",
            type: "manipulation",
            objective:
              "Placer des objets dans le bac correspondant à leur couleur.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: [
              "3 bacs colorés (rouge, bleu, jaune)",
              "Objets assortis aux couleurs des bacs",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-maths-tris-classements-seq1-atelier1-grille",
              title: "Grille — Trier selon une propriété visible (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-maths-tris-1",
                  label:
                    "Place un objet dans le bac correspondant à sa couleur",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-maths-tris-2",
                  label: "Trie une dizaine d'objets sans erreur",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-maths-tris-3",
                  label: "Explique avec un mot pourquoi cet objet va là",
                  levelDescriptor: "Dépassement PS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },
];

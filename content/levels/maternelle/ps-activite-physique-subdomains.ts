/**
 * PS · Domaine Activité physique · Sous-domaines structurés
 *
 * Trois sous-domaines légers alignés sur le programme cycle 1 :
 *   1. Agir dans l'espace et sur les objets
 *   2. Adapter ses équilibres et ses déplacements
 *   3. Collaborer, coopérer, s'opposer
 *
 * Chaque sous-domaine contient une séquence et un atelier pilote.
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const psActivitePhysiqueSubdomains: MaternelleSubdomain[] = [
  // ── 1. Agir dans l'espace et sur les objets ──────────────────────────────
  {
    id: "ps-physique-espace-objets",
    slug: "agir-espace-objets",
    label: "Agir dans l'espace et sur les objets",
    description:
      "Premiers déplacements dans un espace aménagé, manipulation de petits matériels et engagement dans un parcours simple.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-physique-espace-objets-seq1",
        title: "Franchir un obstacle simple",
        objective:
          "Franchir un obstacle bas dans un parcours court.",
        observableSkills: ["Franchit un obstacle bas dans un parcours simple."],
        periodLabel: "Période 1",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-physique-espace-objets-seq1-atelier1",
            title: "Passer les obstacles",
            type: "manipulation",
            objective:
              "Franchir un obstacle simple dans un espace balisé.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: ["Plots", "Tapis", "Cerceaux au sol"],
            status: "in-progress",
            observationGrid: {
              id: "ps-physique-espace-objets-seq1-atelier1-grille",
              title: "Grille — Explorer un parcours simple (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-physique-espace-1",
                  label: "Ose entrer dans le parcours sans hésitation",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-physique-espace-2",
                  label: "Franchit un obstacle bas",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-physique-espace-3",
                  label: "Franchit deux obstacles bas à la suite",
                  levelDescriptor: "Dépassement PS",
                },
              ],
            },
          },
        ],
      },
    ],
  },

  // ── 2. Adapter ses équilibres et ses déplacements ─────────────────────────
  {
    id: "ps-physique-equilibres",
    slug: "equilibres-deplacements",
    label: "Adapter ses équilibres et ses déplacements",
    description:
      "Premiers équilibres statiques et dynamiques, changements de posture et déplacements avec des appuis variés.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-physique-equilibres-seq1",
        title: "Tenir son équilibre",
        objective:
          "Construire des appuis stables pour se déplacer lentement avec assurance.",
        observableSkills: ["Maintient son équilibre sur un tracé simple."],
        periodLabel: "Période 2",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-physique-equilibres-seq1-atelier1",
            title: "Marcher sur une ligne",
            type: "dirige",
            objective:
              "Se déplacer lentement sur un tracé au sol en maintenant son équilibre.",
            duration: "10 min",
            groupSize: "4 élèves",
            materials: ["Lignes tracées au sol (scotch ou craie)", "Plots bas"],
            status: "in-progress",
            observationGrid: {
              id: "ps-physique-equilibres-seq1-atelier1-grille",
              title: "Grille — Tenir son équilibre sur une ligne (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-physique-equilibre-1",
                  label: "Reste sur le tracé pendant au moins cinq pas consécutifs",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-physique-equilibre-2",
                  label: "Reprend son équilibre après une hésitation sans aide",
                  levelDescriptor: "Attendu PS",
                },
              ],
            },
          },
        ],
      },
    ],
  },

  // ── 3. Collaborer, coopérer, s'opposer ───────────────────────────────────
  {
    id: "ps-physique-cooperation",
    slug: "collaborer-cooperer",
    label: "Collaborer, coopérer, s'opposer",
    description:
      "Premiers jeux collectifs simples, acceptation d'une règle courte et participation active avec les autres.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-physique-cooperation-seq1",
        title: "Réagir à un signal",
        objective:
          "Réagir à un signal commun dans un jeu simple.",
        observableSkills: ["Réagit à un signal partagé dans un jeu collectif."],
        periodLabel: "Période 3",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-physique-cooperation-seq1-atelier1",
            title: "Suivre le signal",
            type: "jeu",
            objective:
              "Démarrer ou s'arrêter sur le signal donné par l'enseignant.",
            duration: "15 min",
            groupSize: "Demi-classe",
            materials: ["Tambourin", "Cerceaux au sol (espaces cibles)"],
            status: "in-progress",
            observationGrid: {
              id: "ps-physique-cooperation-seq1-atelier1-grille",
              title: "Grille — Jouer ensemble sur signal (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-physique-coop-1",
                  label: "Réagit au signal commun (arrêt ou départ)",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-physique-coop-2",
                  label: "Attend le signal avant de repartir",
                  levelDescriptor: "Attendu PS",
                },
              ],
            },
          },
        ],
      },
    ],
  },
];

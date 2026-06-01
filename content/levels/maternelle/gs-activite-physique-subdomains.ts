/**
 * GS · Domaine Activité physique · Sous-domaines structurés
 *
 * Trois sous-domaines légers alignés sur le programme cycle 1 :
 *   1. Agir dans l'espace et sur les objets
 *   2. Adapter ses équilibres et ses déplacements
 *   3. Collaborer, coopérer, s'opposer
 *
 * Niveau GS : enchaînements plus longs, règles verbalisées, coopération autonome
 * et premiers jeux d'opposition — préparation progressive à l'élémentaire.
 *
 * Le site organise — les PDF enseignent.
 */
import type {
  MaternelleResourceRef,
  MaternelleSubdomain,
} from "@/content/levels/maternelle/types";

const gsPhysicalResourceSlots: MaternelleResourceRef[] = [
  {
    kind: "grille-observation",
    label: "Grille d'observation de la compétence",
    status: "upcoming",
  },
  {
    kind: "fiche-atelier",
    label: "Fiche atelier",
    status: "upcoming",
  },
  {
    kind: "support-projetable",
    label: "Plan de parcours projetable",
    status: "upcoming",
  },
];

export const gsActivitePhysiqueSubdomains: MaternelleSubdomain[] = [
  // ── 1. Agir dans l'espace et sur les objets ──────────────────────────────
  {
    id: "gs-physique-espace-objets",
    slug: "agir-espace-objets",
    label: "Agir dans l'espace et sur les objets",
    description:
      "Enchaînements d'actions dans un parcours complexe mémorisé, manipulation d'objets avec intention et adaptation à des contraintes spatiales variées.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-physique-espace-objets-seq1",
        slug: "memoriser-enchainer-parcours",
        title: "Mémoriser et enchaîner un parcours",
        levelSlug: "gs",
        domainSlug: "activite-physique",
        subdomainSlug: "agir-espace-objets",
        description:
          "Séquence-compétence centrée sur l'enchaînement autonome d'un parcours.",
        objective:
          "Mémoriser l'ordre des actions d'un parcours et les enchaîner sans aide de l'adulte.",
        observableSkills: ["Enchaîne les étapes d'un parcours mémorisé sans aide."],
        periodLabel: "Période 1",
        estimatedDuration: "5 séances × 25 min",
        sessionCount: 5,
        observationFocus:
          "Observer la mémorisation de l'ordre et la continuité de l'enchaînement.",
        status: "in-progress",
        resources: gsPhysicalResourceSlots,
        workshops: [
          {
            id: "gs-physique-espace-objets-seq1-atelier1",
            title: "Le grand circuit mémorisé",
            type: "autonome",
            objective:
              "Réaliser dans l'ordre les cinq stations d'un circuit annoncé oralement, sans repère visuel de l'ordre.",
            duration: "20 min",
            groupSize: "6-8 élèves",
            materials: [
              "5 stations numérotées (banc, cerceaux, tapis, slalom, zone de lancer)",
              "Tableau effacé après la présentation",
            ],
            status: "in-progress",
            resources: gsPhysicalResourceSlots,
            observationGrid: {
              id: "gs-physique-espace-objets-seq1-atelier1-grille",
              title: "Grille — Mémoriser et enchaîner un parcours (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-physique-espace-1",
                  label: "Réalise les stations dans l'ordre annoncé sans aide",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-physique-espace-2",
                  label: "Enchaîne les actions sans pause entre deux stations",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-physique-espace-3",
                  label: "Peut expliquer oralement l'ordre du circuit après l'avoir réalisé",
                  levelDescriptor: "Dépassement GS",
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
    id: "gs-physique-equilibres",
    slug: "equilibres-deplacements",
    label: "Adapter ses équilibres et ses déplacements",
    description:
      "Équilibres dynamiques plus complexes (appui unipodal, hauteur, arrêt sur signal après course), coordination et anticipation des prises d'appui.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-physique-equilibres-seq1",
        slug: "controler-arret-equilibre",
        title: "Contrôler son arrêt et son équilibre",
        levelSlug: "gs",
        domainSlug: "activite-physique",
        subdomainSlug: "equilibres-deplacements",
        description:
          "Séquence-compétence centrée sur l'arrêt au signal et la stabilisation du corps.",
        objective:
          "Passer d'un déplacement rapide à une posture d'équilibre statique stable sur signal.",
        observableSkills: ["S'arrête au signal et maintient une posture d'équilibre."],
        periodLabel: "Période 2",
        estimatedDuration: "5 séances × 20 min",
        sessionCount: 5,
        observationFocus:
          "Observer la réponse au signal et la stabilité de la posture.",
        status: "in-progress",
        resources: gsPhysicalResourceSlots,
        workshops: [
          {
            id: "gs-physique-equilibres-seq1-atelier1",
            title: "Les statues en équilibre",
            type: "jeu",
            objective:
              "Courir librement et se figer en équilibre sur un pied au signal, en maintenant la posture trois secondes.",
            duration: "15 min",
            groupSize: "8-10 élèves",
            materials: [
              "Tambourin (signal sonore)",
              "Espace dégagé délimité par des plots",
            ],
            status: "in-progress",
            resources: gsPhysicalResourceSlots,
            observationGrid: {
              id: "gs-physique-equilibres-seq1-atelier1-grille",
              title: "Grille — Statues en équilibre (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-physique-equilibre-1",
                  label: "S'arrête immédiatement au signal sans décalage",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-physique-equilibre-2",
                  label: "Maintient l'appui unipodal au moins trois secondes",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-physique-equilibre-3",
                  label: "Utilise les bras pour réguler son équilibre de manière visible",
                  levelDescriptor: "Dépassement GS",
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
    id: "gs-physique-cooperation",
    slug: "collaborer-cooperer",
    label: "Collaborer, coopérer, s'opposer",
    description:
      "Jeux d'opposition simple avec règles verbalisées, coopération autonome en équipe et premiers comportements tactiques observables.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-physique-cooperation-seq1",
        slug: "respecter-une-regle-jeu-collectif",
        title: "Respecter une règle de jeu collectif",
        levelSlug: "gs",
        domainSlug: "activite-physique",
        subdomainSlug: "collaborer-cooperer",
        description:
          "Séquence-compétence centrée sur la règle partagée dans un jeu collectif avec opposition.",
        objective: "Respecter une règle verbalisée dans un jeu collectif.",
        observableSkills: ["Respecte une règle de jeu collectif avec opposition."],
        periodLabel: "Période 3",
        estimatedDuration: "5 séances × 25 min",
        sessionCount: 5,
        observationFocus:
          "Observer le respect de la règle et l'ajustement au rôle tenu.",
        status: "in-progress",
        resources: gsPhysicalResourceSlots,
        workshops: [
          {
            id: "gs-physique-cooperation-seq1-atelier1",
            title: "Les chasseurs et les proies",
            type: "jeu",
            objective:
              "Tenir un rôle dans un jeu collectif simple avec zone refuge.",
            duration: "20 min",
            groupSize: "Classe entière (deux équipes)",
            materials: [
              "Dossards de deux couleurs",
              "Zones refuges délimitées par des cerceaux (4 au sol)",
              "Plots de délimitation du terrain",
            ],
            status: "in-progress",
            resources: gsPhysicalResourceSlots,
            observationGrid: {
              id: "gs-physique-cooperation-seq1-atelier1-grille",
              title: "Grille — Chasseurs et proies (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-physique-coop-1",
                  label: "Applique la règle du jeu sans rappel de l'adulte",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-physique-coop-2",
                  label: "Adopte un comportement adapté à son rôle (chasser ou fuir)",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-physique-coop-3",
                  label: "Peut expliquer oralement la règle ou sa tactique après le jeu",
                  levelDescriptor: "Dépassement GS",
                },
              ],
            },
          },
        ],
      },
    ],
  },
];

/**
 * MS · Domaine Activité physique · Sous-domaines structurés
 *
 * Trois sous-domaines légers alignés sur le programme cycle 1 :
 *   1. Agir dans l'espace et sur les objets
 *   2. Adapter ses équilibres et ses déplacements
 *   3. Collaborer, coopérer, s'opposer
 *
 * Niveau MS : les attendus sont plus exigeants qu'en PS —
 * déplacements variés, équilibres plus complexes, règles stabilisées.
 *
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msActivitePhysiqueSubdomains: MaternelleSubdomain[] = [
  // ── 1. Agir dans l'espace et sur les objets ──────────────────────────────
  {
    id: "ms-physique-espace-objets",
    slug: "agir-espace-objets",
    label: "Agir dans l'espace et sur les objets",
    description:
      "Déplacements plus variés (vitesse, trajectoire), manipulation d'objets roulants ou lancés et exploration d'un parcours organisé.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-physique-espace-objets-seq1",
        title: "Varier ses déplacements dans un parcours",
        objective:
          "Adapter sa vitesse et sa trajectoire aux contraintes d'un parcours avec obstacles variés.",
        observableSkills: ["Adapte son déplacement à une contrainte simple du parcours."],
        periodLabel: "Période 1",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-physique-espace-objets-seq1-atelier1",
            title: "Le parcours à vitesses",
            type: "manipulation",
            objective:
              "Ajuster sa vitesse (marche, course) selon les zones du parcours balisées par des couleurs.",
            duration: "20 min",
            groupSize: "6-8 élèves",
            materials: [
              "Plots de couleurs (rouge = stop, vert = course)",
              "Tapis",
              "Cerceaux",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-physique-espace-objets-seq1-atelier1-grille",
              title: "Grille — Varier ses déplacements (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-physique-espace-1",
                  label: "Ralentit ou s'arrête à la zone indiquée",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-physique-espace-2",
                  label: "Accélère spontanément dans la zone de course",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-physique-espace-3",
                  label: "Enchaîne trois zones différentes sans aide",
                  levelDescriptor: "Dépassement MS",
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
    id: "ms-physique-equilibres",
    slug: "equilibres-deplacements",
    label: "Adapter ses équilibres et ses déplacements",
    description:
      "Équilibres plus complexes (appuis réduits, hauteur, instabilité), coordination dans des déplacements variés.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-physique-equilibres-seq1",
        title: "Se déplacer sur des supports instables",
        objective:
          "Construire des appuis variés pour se déplacer en hauteur ou sur des surfaces instables.",
        observableSkills: ["Traverse un support instable en gardant son équilibre."],
        periodLabel: "Période 2",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-physique-equilibres-seq1-atelier1",
            title: "Traverser le marécage",
            type: "jeu",
            objective:
              "Se déplacer d'un bout à l'autre d'un espace en posant les pieds uniquement sur des îles (cerceaux, briques de mousse).",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: [
              "Cerceaux (îles)",
              "Briques de mousse",
              "Plots délimitant les bords",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-physique-equilibres-seq1-atelier1-grille",
              title: "Grille — Traverser le marécage (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-physique-equilibre-1",
                  label: "Pose les deux pieds sur une île sans tomber",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-physique-equilibre-2",
                  label: "Passe d'une île à l'autre en contrôlant son élan",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-physique-equilibre-3",
                  label: "Traverse avec un pied par île sans perdre l'équilibre",
                  levelDescriptor: "Dépassement MS",
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
    id: "ms-physique-cooperation",
    slug: "collaborer-cooperer",
    label: "Collaborer, coopérer, s'opposer",
    description:
      "Jeux de coopération à deux ou en petit groupe, respect d'une règle plus complexe, premiers jeux d'opposition simple.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-physique-cooperation-seq1",
        title: "Coopérer pour réussir ensemble",
        objective:
          "Agir avec un partenaire pour atteindre un but commun en respectant une règle.",
        observableSkills: ["Coopère avec un camarade pour transporter un objet."],
        periodLabel: "Période 3",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-physique-cooperation-seq1-atelier1",
            title: "Le déménagement",
            type: "collectif",
            objective:
              "Transporter en binôme un maximum d'objets d'un camp à l'autre sans les faire tomber.",
            duration: "20 min",
            groupSize: "Demi-classe (binômes)",
            materials: [
              "Objets à transporter (balles, petits sacs)",
              "Caisses ou cerceaux (camps)",
              "Plots délimitant la zone",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-physique-cooperation-seq1-atelier1-grille",
              title: "Grille — Coopérer en binôme (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-physique-coop-1",
                  label: "Adapte sa vitesse à celle de son partenaire",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-physique-coop-2",
                  label: "Dépose l'objet sans le faire tomber",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-physique-coop-3",
                  label: "Propose une stratégie à son partenaire (verbal ou gestuel)",
                  levelDescriptor: "Dépassement MS",
                },
              ],
            },
          },
        ],
      },
    ],
  },
];

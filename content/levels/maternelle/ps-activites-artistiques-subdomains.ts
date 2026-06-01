/**
 * PS · Domaine Activités artistiques · Sous-domaines structurés
 *
 * Trois sous-domaines légers alignés sur le programme cycle 1 :
 *   1. Productions plastiques
 *   2. Voix et écoute
 *   3. Regarder les productions
 *
 * Chaque sous-domaine contient une séquence et un atelier pilote.
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const psActivitesArtistiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Productions plastiques ─────────────────────────────────────────────
  {
    id: "ps-artistiques-productions-plastiques",
    slug: "productions-plastiques",
    label: "Productions plastiques",
    description:
      "Découverte des traces, des outils et des matières par manipulation.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-artistiques-productions-plastiques-seq1",
        title: "Explorer une trace avec un outil",
        objective:
          "Laisser volontairement une trace avec un outil simple sur un support.",
        observableSkills: [
          "Laisse volontairement une trace avec un outil simple.",
        ],
        periodLabel: "Période 1",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-artistiques-productions-plastiques-seq1-atelier1",
            title: "Tampons et grandes feuilles",
            type: "manipulation",
            objective:
              "Appuyer un tampon ou un outil large pour produire une trace visible.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: [
              "Tampons en mousse",
              "Grandes feuilles A3",
              "Peinture épaisse en godets",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-artistiques-productions-plastiques-seq1-atelier1-grille",
              title: "Grille — Explorer une trace avec un outil (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-artistiques-plastiques-1",
                  label: "Applique le tampon avec pression",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-artistiques-plastiques-2",
                  label: "Oriente volontairement la trace sur le support",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-artistiques-plastiques-3",
                  label: "Répète l'action en variant la position",
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

  // ── 2. Voix et écoute ─────────────────────────────────────────────────────
  {
    id: "ps-artistiques-voix-ecoute",
    slug: "voix-ecoute",
    label: "Voix et écoute",
    description:
      "Participation aux comptines, aux jeux vocaux et aux écoutes très courtes.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-artistiques-voix-ecoute-seq1",
        title: "Participer à une comptine collective",
        objective: "Dire ou chanter un fragment de comptine avec le groupe.",
        observableSkills: ["Participe à une comptine avec le groupe."],
        periodLabel: "Période 2",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-artistiques-voix-ecoute-seq1-atelier1",
            title: "La comptine des gestes",
            type: "collectif",
            objective:
              "Associer sa voix ou un geste à une comptine courte reprise en groupe.",
            duration: "15 min",
            groupSize: "Classe entière",
            materials: [
              "Comptine illustrée affichée",
              "Tambourin pour marquer le rythme",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-artistiques-voix-ecoute-seq1-atelier1-grille",
              title: "Grille — Participer à une comptine collective (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-artistiques-voix-1",
                  label: "Écoute la comptine sans perturber le groupe",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-artistiques-voix-2",
                  label: "Reproduit un geste associé à une syllabe",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-artistiques-voix-3",
                  label: "Fredonne un fragment de la comptine",
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

  // ── 3. Regarder les productions ───────────────────────────────────────────
  {
    id: "ps-artistiques-regarder-productions",
    slug: "regarder-productions",
    label: "Regarder les productions",
    description:
      "Premiers regards sur les productions de la classe et verbalisation simple.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-artistiques-regarder-productions-seq1",
        title: "Montrer une production",
        objective:
          "Montrer une production personnelle ou collective lors d'un court échange.",
        observableSkills: ["Montre une production lors d'un échange court."],
        periodLabel: "Période 3",
        sessionCount: 2,
        status: "in-progress",
        workshops: [
          {
            id: "ps-artistiques-regarder-productions-seq1-atelier1",
            title: "La galerie de la classe",
            type: "collectif",
            objective:
              "Choisir une production affichée et la montrer au groupe.",
            duration: "10 min",
            groupSize: "8-10 élèves",
            materials: [
              "Productions plastiques affichées",
              "Étiquette-prénom de chaque élève",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-artistiques-regarder-productions-seq1-atelier1-grille",
              title: "Grille — Montrer une production (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-artistiques-regarder-1",
                  label: "Montre une production quand on le lui demande",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-artistiques-regarder-2",
                  label: "Dit un mot sur ce qu'il voit (couleur, forme, taille)",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-artistiques-regarder-3",
                  label:
                    "Choisit spontanément une production et l'indique au groupe",
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

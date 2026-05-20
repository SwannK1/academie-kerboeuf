/**
 * Fichier pilote — PS · Domaine Langage · Sous-domaines structurés
 *
 * Ce fichier illustre le modèle complet :
 *   MaternelleSubdomain → MaternelleSequence → MaternelleWorkshop → MaternelleObservationGrid
 *
 * Il ne contient qu'un sous-domaine et une séquence minimaliste.
 * Les contenus pédagogiques complets seront produits hors code (PDF).
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const psLangageSubdomains: MaternelleSubdomain[] = [
  {
    id: "ps-langage-oral",
    slug: "langage-oral",
    label: "Langage oral",
    description:
      "Premiers échanges, écoute active et enrichissement du vocabulaire de base.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-langage-oral-seq1",
        title: "Écouter et nommer",
        objective:
          "Développer l'attention auditive et la capacité à nommer des objets familiers.",
        periodLabel: "Période 1",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ps-langage-oral-seq1-atelier1",
            title: "Le sac mystère",
            objective:
              "Nommer un objet extrait d'un sac sans le voir, guidé par l'enseignant.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: [
              "Sac opaque",
              "Objets familiers (cuillère, balle, livre, clé)",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-langage-oral-seq1-atelier1-grille",
              title: "Grille — Nommer un objet (sac mystère)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-reconnait-sans-nommer",
                  label: "Reconnaît l'objet sans le nommer (geste ou regard)",
                },
                {
                  id: "crit-nomme-un-mot",
                  label: "Nomme l'objet avec un seul mot",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-nomme-phrase",
                  label: "Nomme l'objet avec une phrase courte",
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

  // ── 2. Phonologie ─────────────────────────────────────────────────────────
  {
    id: "ps-langage-phonologie",
    slug: "phonologie",
    label: "Phonologie",
    description:
      "Premiers sons, comptines et écoute fine. Sensibilisation aux rythmes et aux sons de la langue orale.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-langage-phonologie-seq1",
        title: "Écouter et frapper les syllabes",
        objective:
          "Sensibiliser l'élève aux syllabes en frappant des mots familiers dans des comptines courtes.",
        periodLabel: "Période 2",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-langage-phonologie-seq1-atelier1",
            title: "La comptine des prénoms",
            type: "collectif",
            objective:
              "Frapper les syllabes de son prénom et de ceux des camarades en suivant le rythme.",
            duration: "15 min",
            groupSize: "6-8 élèves",
            materials: [
              "Tambourin ou bâtons de rythme",
              "Étiquettes-prénoms illustrées",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-langage-phonologie-seq1-atelier1-grille",
              title: "Grille — Frapper les syllabes (PS)",
              teacherUse:
                "Observer pendant l'activité collective. Cocher au fil de la séance.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-phono-1",
                  label: "Participe au frappé collectif sans se décaler",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-phono-2",
                  label: "Frappe les syllabes de son propre prénom correctement",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-phono-3",
                  label: "Frappe spontanément les syllabes d'un autre mot proposé",
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

  // ── 3. Premiers écrits ────────────────────────────────────────────────────
  {
    id: "ps-langage-premiers-ecrits",
    slug: "premiers-ecrits",
    label: "Premiers écrits",
    description:
      "Traces intentionnelles, découverte du prénom écrit et premiers contacts avec la forme des lettres.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-langage-premiers-ecrits-seq1",
        title: "Découvrir les premières traces d'écrit",
        objective:
          "Distinguer dessin et écriture, et reconnaître son étiquette-prénom parmi quelques étiquettes.",
        periodLabel: "Période 1",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-langage-premiers-ecrits-seq1-atelier1",
            title: "Mon étiquette, c'est moi",
            type: "manipulation",
            objective:
              "Reconnaître son étiquette-prénom parmi trois étiquettes posées sur la table.",
            duration: "10 min",
            groupSize: "4 élèves",
            materials: [
              "Étiquettes-prénoms en capitales (3 par élève)",
              "Miroir de classe (optionnel)",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-langage-premiers-ecrits-seq1-atelier1-grille",
              title: "Grille — Reconnaître son étiquette-prénom (PS)",
              teacherUse:
                "Observer sans intervenir. Noter si l'élève cherche une lettre repère ou reconnaît globalement.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-ecrit-1",
                  label: "Pointe son étiquette-prénom parmi trois étiquettes",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-ecrit-2",
                  label: "Nomme ou montre la première lettre de son prénom",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-ecrit-3",
                  label: "Distingue une étiquette-écriture d'un dessin sans aide",
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

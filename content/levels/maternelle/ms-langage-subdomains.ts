/**
 * MS · Domaine Langage · Sous-domaines structurés
 *
 * Première intégration réelle du modèle Mission H sur un domaine MS.
 * Contient 3 sous-domaines, chacun avec 1 séquence légère et 1 atelier minimal.
 *
 * Règle centrale : Le site organise. Les PDF enseignent.
 * Aucun contenu pédagogique complet ici — titres, objectifs et structure seulement.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msLangageSubdomains: MaternelleSubdomain[] = [
  // ── 1. Langage oral ────────────────────────────────────────────────────────
  {
    id: "ms-langage-oral",
    slug: "langage-oral",
    label: "Langage oral",
    description:
      "Raconter, reformuler, décrire. Premiers récits d'actions vécues et échanges guidés en petit groupe.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-langage-oral-seq1",
        slug: "raconter-une-action-vecue",
        title: "Raconter une action vécue",
        levelSlug: "ms",
        domainSlug: "langage",
        subdomainSlug: "langage-oral",
        description:
          "Séquence centrée sur la capacité à raconter un événement vécu en phrases courtes.",
        objective:
          "Amener l'élève à produire un récit oral court sur une action récente.",
        objectives: [
          "Utiliser des connecteurs temporels simples (d'abord, après)",
          "Reformuler la consigne de l'enseignant avec ses propres mots",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: [
          "Raconte une action en 2 ou 3 phrases",
          "Répond à la question : qu'est-ce que tu as fait ?",
        ],
        observationFocus:
          "Observer si l'élève parle spontanément ou uniquement sur sollicitation directe.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-langage-oral-seq1-atelier1",
            slug: "le-rappel-en-trio",
            title: "Le rappel en trio",
            type: "dirige",
            objective:
              "Raconter une activité matinale à deux camarades, guidé par l'enseignant.",
            duration: "20 min",
            groupSize: "3 élèves",
            materials: ["Photos de l'activité du matin", "Jetons de parole"],
            instruction:
              "Regarde la photo et raconte ce que tu as fait ce matin.",
            expectedAction:
              "L'élève produit 2 phrases minimum sur l'activité visible.",
            differentiation:
              "Allègement : l'enseignant pose des questions ouvertes. Renforcement : l'élève raconte sans support photo.",
            status: "in-progress",
            observationGrid: {
              id: "ms-langage-oral-seq1-atelier1-grille",
              title: "Grille — Raconter une action vécue",
              teacherUse:
                "Cocher pendant la séance pour chaque élève du groupe. Compléter après si nécessaire.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-oral-1",
                  label: "Produit au moins une phrase complète",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-oral-2",
                  label: "Utilise un connecteur temporel (d'abord, après)",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-oral-3",
                  label: "Raconte sans support photo sur sollicitation",
                  levelDescriptor: "Dépassement MS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 2. Compréhension et vocabulaire ───────────────────────────────────────
  {
    id: "ms-langage-comprehension",
    slug: "comprehension-et-vocabulaire",
    label: "Compréhension et vocabulaire",
    description:
      "Écouter, comprendre, mémoriser. Travail sur le sens des mots et la compréhension d'histoires courtes.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-langage-comprehension-seq1",
        slug: "comprendre-une-histoire-courte",
        title: "Comprendre une histoire courte",
        levelSlug: "ms",
        domainSlug: "langage",
        subdomainSlug: "comprehension-et-vocabulaire",
        description:
          "Séquence autour d'un album court : écoute, compréhension globale et mots clés.",
        objective:
          "Construire une compréhension fine d'une histoire lue en grand groupe.",
        objectives: [
          "Identifier les personnages principaux",
          "Replacer les événements dans l'ordre",
          "S'approprier 5 mots nouveaux liés à l'histoire",
        ],
        periodLabel: "Période 1",
        estimatedDuration: "4 séances × 25 min",
        sessionCount: 4,
        observableSkills: [
          "Nomme les personnages de l'histoire",
          "Répond à la question : que s'est-il passé ?",
          "Réutilise un mot nouveau dans une phrase",
        ],
        observationFocus:
          "Observer si l'élève comprend implicitement ou seulement explicitement. Repérer les mots réinvestis.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-langage-comprehension-seq1-atelier1",
            slug: "les-personnages-du-livre",
            title: "Les personnages du livre",
            type: "dirige",
            objective:
              "Identifier et nommer les personnages d'une histoire entendue.",
            duration: "20 min",
            groupSize: "4-5 élèves",
            materials: [
              "Album lu en classe",
              "Figurines ou images des personnages",
              "Tableau de tri vierge",
            ],
            instruction:
              "Voici les personnages du livre. Place chaque image dans la bonne colonne : grand ou petit personnage.",
            expectedAction:
              "L'élève nomme le personnage et le place correctement, en justifiant brièvement.",
            differentiation:
              "Allègement : les colonnes sont déjà étiquetées avec une image. Renforcement : l'élève nomme un rôle pour chaque personnage.",
            status: "in-progress",
            observationGrid: {
              id: "ms-langage-comprehension-seq1-atelier1-grille",
              title: "Grille — Identification des personnages",
              teacherUse:
                "Cocher pendant l'atelier. Un critère suffit pour valider la compréhension globale.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-comp-1",
                  label: "Nomme au moins un personnage principal",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-comp-2",
                  label: "Place correctement 2 personnages dans le tableau",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-comp-3",
                  label: "Justifie son choix avec un mot de l'histoire",
                  levelDescriptor: "Dépassement MS",
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
    id: "ms-langage-premiers-ecrits",
    slug: "premiers-ecrits",
    label: "Premiers écrits",
    description:
      "Prénom, lettres connues, premiers tracés intentionnels. Découverte de la fonction de l'écrit.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-langage-premiers-ecrits-seq1",
        slug: "reconnaitre-son-prenom",
        title: "Reconnaître et tracer son prénom",
        levelSlug: "ms",
        domainSlug: "langage",
        subdomainSlug: "premiers-ecrits",
        description:
          "Séquence autour du prénom comme premier support d'entrée dans l'écrit.",
        objective:
          "Reconnaître son prénom écrit en capitales et en tracer les premières lettres.",
        objectives: [
          "Identifier son étiquette-prénom parmi d'autres",
          "Reproduire les lettres de son prénom avec un outil scripteur",
        ],
        periodLabel: "Période 1",
        estimatedDuration: "4 séances × 15 min",
        sessionCount: 4,
        observableSkills: [
          "Reconnaît son prénom écrit parmi 4 étiquettes",
          "Trace les premières lettres de son prénom en capitales",
        ],
        observationFocus:
          "Observer la prise d'outil et la direction du tracé. Repérer si l'élève identifie une lettre significative (initiale).",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-langage-premiers-ecrits-seq1-atelier1",
            slug: "la-chasse-au-prenom",
            title: "La chasse au prénom",
            type: "manipulation",
            objective:
              "Reconnaître son étiquette-prénom parmi un ensemble d'étiquettes proches.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: [
              "Étiquettes-prénoms en capitales de tous les élèves du groupe",
              "Plateau de tri",
              "Ardoise ou feuille vierge",
            ],
            instruction:
              "Trouve ton prénom dans la pile et pose-le devant toi. Ensuite, essaie d'écrire la première lettre.",
            expectedAction:
              "L'élève sélectionne sa propre étiquette et trace une lettre lisible sur l'ardoise.",
            differentiation:
              "Allègement : 3 étiquettes seulement. Renforcement : l'élève classe ensuite les prénoms de ses camarades par première lettre.",
            status: "in-progress",
            observationGrid: {
              id: "ms-langage-premiers-ecrits-seq1-atelier1-grille",
              title: "Grille — Reconnaître son prénom",
              teacherUse:
                "Observer pendant la manipulation. Ne pas intervenir sur le tracé — observer uniquement.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-ecrit-1",
                  label: "Identifie son étiquette sans aide",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-ecrit-2",
                  label: "Nomme au moins une lettre de son prénom",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-ecrit-3",
                  label: "Trace la première lettre de son prénom de manière lisible",
                  levelDescriptor: "Dépassement MS",
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

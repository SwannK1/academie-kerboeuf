/**
 * GS · Domaine Activités artistiques · Sous-domaines structurés
 *
 * Trois sous-domaines alignés sur le programme cycle 1 :
 *   1. Productions plastiques — traces intentionnelles, choix de procédés
 *   2. Voix et écoute — chants mémorisés, écoute précise, ajustement au groupe
 *   3. Regarder les productions — observer, comparer, verbaliser
 *
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const gsActivitesArtistiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Productions plastiques ────────────────────────────────────────────
  {
    id: "gs-artistiques-productions-plastiques",
    slug: "productions-plastiques",
    label: "Productions plastiques",
    description:
      "Productions intentionnelles, choix de procédés et enrichissement des gestes plastiques.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-artistiques-productions-plastiques-seq1",
        slug: "composer-avec-plusieurs-traces",
        title: "Composer avec plusieurs traces",
        levelSlug: "gs",
        domainSlug: "activites-artistiques",
        subdomainSlug: "productions-plastiques",
        description:
          "Séquence axée sur la composition intentionnelle à partir de plusieurs gestes ou outils plastiques.",
        objective:
          "Organiser plusieurs traces pour obtenir une production intentionnelle.",
        objectives: [
          "Choisir et combiner deux outils ou gestes",
          "Verbaliser un choix réalisé dans sa production",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "4 séances × 25 min",
        sessionCount: 4,
        observableSkills: [
          "Organise plusieurs traces dans une production intentionnelle.",
        ],
        observationFocus:
          "Observer si l'élève opère un choix délibéré ou agit au hasard. Repérer la capacité à nommer ce choix après coup.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-artistiques-productions-plastiques-seq1-atelier1",
            slug: "traces-organisees",
            title: "Traces organisées",
            type: "manipulation",
            objective:
              "Combiner deux gestes ou deux outils pour organiser une production sur un support grand format.",
            duration: "25 min",
            groupSize: "4-5 élèves",
            materials: [
              "Grands formats (A3 ou plus)",
              "Deux types d'outils au choix : rouleaux, tampons, pinceaux épais",
              "Deux couleurs contrastées par atelier",
              "Tabliers",
            ],
            instruction:
              "Choisis deux outils. Utilise-les tous les deux pour faire ta composition. Essaie d'organiser les traces.",
            expectedAction:
              "L'élève utilise les deux outils et peut dire ce qu'il a voulu faire.",
            differentiation:
              "Allègement : guidage verbal pendant la production (« Tu veux couvrir tout le fond ? »). Renforcement : contrainte d'alternance entre les deux outils.",
            status: "in-progress",
            observationGrid: {
              id: "gs-artistiques-productions-plastiques-seq1-atelier1-grille",
              title: "Grille — Composer avec plusieurs traces (GS)",
              teacherUse:
                "Observer pendant la production et lors de la verbalisation finale. Noter si le choix est énoncé spontanément.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-art-plastique-1",
                  label: "Utilise deux outils différents dans la même production",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-art-plastique-2",
                  label: "Dit un choix ou une intention sur sa production",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-art-plastique-3",
                  label: "Organise les traces en zones distinctes ou en alternance visible",
                  levelDescriptor: "Dépassement GS",
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
    id: "gs-artistiques-voix-ecoute",
    slug: "voix-ecoute",
    label: "Voix et écoute",
    description:
      "Chants mémorisés, écoute précise des paramètres sonores et ajustement de la voix au groupe.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-artistiques-voix-ecoute-seq1",
        slug: "chanter-en-respectant-un-depart",
        title: "Chanter en respectant un départ",
        levelSlug: "gs",
        domainSlug: "activites-artistiques",
        subdomainSlug: "voix-ecoute",
        description:
          "Séquence centrée sur la synchronisation au groupe et l'écoute des paramètres sonores (tempo, nuance).",
        objective:
          "Démarrer un chant avec le groupe au signal et maintenir la synchronisation.",
        objectives: [
          "Attendre le signal de départ",
          "Ajuster sa voix à la hauteur du groupe",
        ],
        periodLabel: "Période 3",
        estimatedDuration: "5 séances × 20 min",
        sessionCount: 5,
        observableSkills: [
          "Démarre un chant avec le groupe au signal donné.",
        ],
        observationFocus:
          "Observer si l'élève anticipe le signal ou démarre après le groupe. Repérer les élèves qui chantent hors tempo.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-artistiques-voix-ecoute-seq1-atelier1",
            slug: "depart-au-signal",
            title: "Départ au signal",
            type: "collectif",
            objective:
              "Attendre le signal visuel ou sonore puis commencer un chant connu avec le groupe.",
            duration: "20 min",
            groupSize: "Classe entière, puis petits groupes de 6",
            materials: [
              "Baguette chef de chœur (signal visuel)",
              "Tambourin (signal sonore alternatif)",
              "Un chant court connu de tous (4 à 8 mesures)",
            ],
            instruction:
              "Tout le monde attend. Quand je baisse la baguette, on commence tous ensemble. Personne ne commence avant.",
            expectedAction:
              "Le groupe démarre au signal avec moins de deux secondes d'écart.",
            differentiation:
              "Allègement : signal sonore très visible doublé d'un compte à rebours verbal. Renforcement : l'élève prend le rôle de chef de chœur pour déclencher le départ.",
            status: "in-progress",
            observationGrid: {
              id: "gs-artistiques-voix-ecoute-seq1-atelier1-grille",
              title: "Grille — Départ au signal chant (GS)",
              teacherUse:
                "Observer depuis la position de chef de chœur. Identifier les élèves qui anticipent ou retardent.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-art-voix-1",
                  label: "Attend le signal sans démarrer avant",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-art-voix-2",
                  label: "Démarre avec le groupe dans les deux premières secondes",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-art-voix-3",
                  label: "Peut donner le signal à son tour en gardant le tempo",
                  levelDescriptor: "Dépassement GS",
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
    id: "gs-artistiques-regarder-productions",
    slug: "regarder-productions",
    label: "Regarder les productions",
    description:
      "Observer, comparer et verbaliser des éléments visibles dans les productions de la classe ou d'artistes.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-artistiques-regarder-productions-seq1",
        slug: "decrire-un-choix-artistique",
        title: "Décrire un choix artistique",
        levelSlug: "gs",
        domainSlug: "activites-artistiques",
        subdomainSlug: "regarder-productions",
        description:
          "Séquence centrée sur la verbalisation de choix observables dans sa propre production et celles des camarades.",
        objective:
          "Identifier et nommer un choix réalisé dans une production plastique.",
        objectives: [
          "Pointer un élément visible (couleur, forme, emplacement)",
          "Utiliser un vocabulaire plastique simple",
        ],
        periodLabel: "Période 2-3",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: [
          "Dit un choix réalisé dans sa production ou celle d'un camarade.",
        ],
        observationFocus:
          "Observer si l'élève désigne un élément précis ou reste dans le vague (« c'est joli »). Repérer l'usage spontané de mots plastiques.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-artistiques-regarder-productions-seq1-atelier1",
            slug: "jai-choisi",
            title: "J'ai choisi",
            type: "collectif",
            objective:
              "Présenter sa production en nommant un choix de couleur, d'outil ou d'organisation.",
            duration: "20 min",
            groupSize: "6-8 élèves",
            materials: [
              "Productions plastiques récentes de la semaine",
              "Cartes vocabulaire plastique (couleur, forme, emplacement, outil)",
              "Tableau d'affichage",
            ],
            instruction:
              "Montre ta production. Dis une chose que tu as choisie : une couleur, un outil, ou comment tu as organisé.",
            expectedAction:
              "L'élève pointe un élément précis et l'énonce avec un mot adapté.",
            differentiation:
              "Allègement : choix guidé entre deux cartes vocabulaire. Renforcement : l'élève compare sa production avec celle d'un camarade et dit une différence.",
            status: "in-progress",
            observationGrid: {
              id: "gs-artistiques-regarder-productions-seq1-atelier1-grille",
              title: "Grille — Verbaliser un choix artistique (GS)",
              teacherUse:
                "Observer lors de la mise en commun. Distinguer désignation précise et commentaire vague.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-art-regard-1",
                  label: "Désigne un élément précis dans sa production",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-art-regard-2",
                  label: "Nomme cet élément avec un mot plastique (couleur, forme, outil)",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-art-regard-3",
                  label: "Compare sa production avec celle d'un camarade en pointant une différence",
                  levelDescriptor: "Dépassement GS",
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

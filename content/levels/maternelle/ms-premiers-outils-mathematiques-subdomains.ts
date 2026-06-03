/**
 * MS · Domaine Premiers outils mathématiques · Sous-domaines structurés
 *
 * Trois sous-domaines alignés sur le programme cycle 1 :
 *   1. Nombres et quantités
 *   2. Formes et grandeurs
 *   3. Tris, classements et suites
 *
 * Niveau MS : dénombrement jusqu'à 5-6, comparaison de quantités,
 * premiers algorithmes, tris selon deux propriétés.
 *
 * Priorité à la manipulation concrète. Pas de fiche à remplir.
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msPremiersOutilsMathematiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Nombres et quantités ───────────────────────────────────────────────
  {
    id: "ms-maths-nombres-quantites",
    slug: "nombres-quantites",
    label: "Nombres et quantités",
    description:
      "Dénombrement de petites collections jusqu'à 5 ou 6, comparaison concrète de quantités et premiers écrits du nombre.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-maths-nombres-quantites-seq1",
        slug: "denombreer-une-petite-collection",
        title: "Dénombrer une petite collection",
        levelSlug: "ms",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "nombres-quantites",
        description:
          "Séquence centrée sur la construction du dénombrement stable jusqu'à 5, puis 6, par manipulation d'objets réels.",
        objective:
          "Constituer une collection de quantité demandée et la comparer à une collection de référence.",
        objectives: [
          "Dénombrer une collection jusqu'à 5 en pointant chaque objet",
          "Comparer deux collections et utiliser plus, moins, autant",
          "Reconnaître globalement une petite quantité (subitizing jusqu'à 3)",
        ],
        periodLabel: "Période 1",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: ["Dénombre une collection de 1 à 5 en pointant chaque objet sans erreur."],
        observationFocus:
          "Observer si l'élève compte en pointant chaque objet ou s'il compte plusieurs fois le même. Repérer le principe de cardinalité (le dernier mot = la quantité totale).",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-maths-nombres-quantites-seq1-atelier1",
            slug: "petits-paniers",
            title: "Petits paniers",
            type: "manipulation",
            objective:
              "Mettre exactement le nombre d'objets demandé dans un panier, en dénombrant un par un.",
            duration: "20 min",
            groupSize: "4 élèves",
            materials: [
              "Paniers (un par élève)",
              "Objets à dénombrer (glands, cubes, bouchons)",
              "Cartes-nombres de 1 à 5 (avec points de référence)",
            ],
            instruction:
              "Prends ta carte, regarde le nombre de points, et mets le même nombre d'objets dans ton panier.",
            expectedAction:
              "L'élève prélève exactement la quantité indiquée sur la carte en pointant ses objets un à un.",
            differentiation:
              "Allègement : cartes de 1 à 3 uniquement, avec points larges. Renforcement : l'élève contrôle la collection d'un camarade et justifie.",
            status: "in-progress",
            observationGrid: {
              id: "ms-maths-nombres-quantites-seq1-atelier1-grille",
              title: "Grille — Dénombrer une petite collection",
              teacherUse:
                "Observer le pointage : l'élève touche-t-il chaque objet une seule fois ? Cocher après l'action.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-maths-nb-1",
                  label: "Pointe chaque objet une seule fois en dénombrant",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-nb-2",
                  label: "Constitue une collection de 1 à 5 sans erreur",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-nb-3",
                  label: "Contrôle la collection d'un camarade et explique",
                  levelDescriptor: "Dépassement MS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
      {
        id: "ms-maths-nombres-quantites-seq2",
        slug: "comparer-des-quantites",
        title: "Comparer des quantités",
        levelSlug: "ms",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "nombres-quantites",
        description:
          "Séquence de comparaison directe de collections pour construire le sens de plus, moins et autant.",
        objective:
          "Comparer deux collections et utiliser le vocabulaire adapté (plus, moins, autant).",
        objectives: [
          "Aligner deux collections pour comparer terme à terme",
          "Utiliser plus, moins, autant à bon escient",
          "Ajuster une collection pour l'égaliser avec une autre",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: ["Compare deux collections et dit si l'une a plus, moins ou autant que l'autre."],
        observationFocus:
          "Observer si l'élève compare globalement (perception) ou aligne les objets terme à terme.",
        status: "upcoming",
        resources: [],
        workshops: [
          {
            id: "ms-maths-nombres-quantites-seq2-atelier1",
            slug: "qui-a-plus",
            title: "Qui a plus ?",
            type: "jeu",
            objective:
              "Comparer sa collection à celle d'un camarade et dire qui en a plus, moins ou autant.",
            duration: "15 min",
            groupSize: "2-3 élèves",
            materials: [
              "Cartes-images représentant 1 à 6 objets",
              "Objets de dénombrement pour vérifier",
            ],
            instruction:
              "Retourne ta carte. Qui a plus d'objets ? Montre avec tes doigts ou avec les objets.",
            expectedAction:
              "L'élève compare les deux cartes et utilise plus ou moins correctement.",
            differentiation:
              "Allègement : cartes de 1 à 3 uniquement. Renforcement : l'élève indique de combien une collection est plus grande.",
            status: "upcoming",
            observationGrid: {
              id: "ms-maths-nombres-quantites-seq2-atelier1-grille",
              title: "Grille — Comparer des quantités",
              teacherUse:
                "Cocher lors du jeu. Observer si l'élève utilise le vocabulaire ou se contente de pointer.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-maths-comp-1",
                  label: "Identifie la plus grande collection parmi deux",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-comp-2",
                  label: "Utilise spontanément plus ou moins",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-comp-3",
                  label: "Ajuste sa collection pour égaliser avec celle d'un camarade",
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

  // ── 2. Formes et grandeurs ────────────────────────────────────────────────
  {
    id: "ms-maths-formes-grandeurs",
    slug: "formes-grandeurs",
    label: "Formes et grandeurs",
    description:
      "Reconnaissance et nomination des formes simples (cercle, carré, triangle, rectangle) et comparaison de grandeurs.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-maths-formes-grandeurs-seq1",
        slug: "nommer-une-forme-simple",
        title: "Nommer et reconnaître une forme simple",
        levelSlug: "ms",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "formes-grandeurs",
        description:
          "Séquence de manipulation et de jeu pour reconnaître et nommer cercle, carré, triangle et rectangle dans différentes orientations.",
        objective:
          "Reconnaître et nommer les quatre formes simples dans des collections d'objets variés.",
        objectives: [
          "Nommer cercle, carré, triangle, rectangle",
          "Reconnaître une forme quelle que soit sa taille ou son orientation",
          "Trier des objets selon leur forme",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: ["Nomme les quatre formes simples et les reconnaît dans un lot d'objets variés."],
        observationFocus:
          "Observer si l'élève se base sur la forme ou sur la couleur/taille pour reconnaître. Repérer les confusions carré/rectangle.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-maths-formes-grandeurs-seq1-atelier1",
            slug: "la-chasse-aux-formes",
            title: "La chasse aux formes",
            type: "jeu",
            objective:
              "Retrouver et nommer une forme simple dans un lot d'objets du quotidien ou de la classe.",
            duration: "20 min",
            groupSize: "4-5 élèves",
            materials: [
              "Lot d'objets variés (bouchons, boîtes, cartes, cadres)",
              "Plateau de tri à 4 cases étiquetées par forme",
              "Cartes-formes de référence",
            ],
            instruction:
              "Prends un objet dans le sac, trouve sa forme et pose-le dans la bonne case.",
            expectedAction:
              "L'élève nomme la forme de l'objet choisi et le place dans la case correspondante.",
            differentiation:
              "Allègement : deux formes seulement (cercle et carré). Renforcement : l'élève argumente son choix (aucun coin → cercle).",
            status: "in-progress",
            observationGrid: {
              id: "ms-maths-formes-grandeurs-seq1-atelier1-grille",
              title: "Grille — Reconnaître une forme simple",
              teacherUse:
                "Observer lors du tri. Corriger oralement, ne pas valider par signe sans que l'élève ait nommé.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-maths-forme-1",
                  label: "Nomme correctement cercle et carré",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-forme-2",
                  label: "Nomme les quatre formes sans erreur",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-forme-3",
                  label: "Justifie son classement avec un critère observable",
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

  // ── 3. Tris, classements et suites ────────────────────────────────────────
  {
    id: "ms-maths-tris-suites",
    slug: "tris-suites",
    label: "Tris, classements et suites",
    description:
      "Classements selon une ou deux propriétés et premières suites répétitives (algorithmes simples AB, ABC).",
    status: "in-progress",
    sequences: [
      {
        id: "ms-maths-tris-suites-seq1",
        slug: "poursuivre-une-suite-simple",
        title: "Poursuivre une suite simple",
        levelSlug: "ms",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "tris-suites",
        description:
          "Séquence d'initiation aux suites répétitives : comprendre la règle d'une alternance et la poursuivre.",
        objective:
          "Identifier la règle d'une suite répétitive simple et la poursuivre correctement.",
        objectives: [
          "Reconnaître l'unité qui se répète dans une suite AB",
          "Poursuivre une suite alternée de deux éléments",
          "Verbaliser la règle de la suite",
        ],
        periodLabel: "Période 3",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: ["Poursuit une suite alternée de deux éléments et explique la règle."],
        observationFocus:
          "Observer si l'élève comprend la règle ou reproduit par imitation visuelle sans comprendre l'alternance.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-maths-tris-suites-seq1-atelier1",
            slug: "perles-en-alternance",
            title: "Perles en alternance",
            type: "manipulation",
            objective:
              "Continuer une alternance de deux couleurs (rouge-bleu-rouge-bleu…) en enfilant des perles.",
            duration: "20 min",
            groupSize: "3-4 élèves",
            materials: [
              "Perles de deux couleurs",
              "Fil élastique",
              "Modèle amorcé (4 premières perles posées)",
            ],
            instruction:
              "Regarde le début du collier. Continue en respectant la règle des couleurs.",
            expectedAction:
              "L'élève enfile les perles en maintenant l'alternance jusqu'au bout du fil.",
            differentiation:
              "Allègement : l'enseignant verbalise la règle à voix haute pendant la manipulation. Renforcement : l'élève crée sa propre suite et la fait deviner à un camarade.",
            status: "in-progress",
            observationGrid: {
              id: "ms-maths-tris-suites-seq1-atelier1-grille",
              title: "Grille — Poursuivre une suite simple",
              teacherUse:
                "Observer la régularité de la suite produite. Demander à l'élève d'expliquer sa règle avant de valider.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-maths-suite-1",
                  label: "Poursuit correctement une alternance AB jusqu'à 6 éléments",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-suite-2",
                  label: "Verbalise la règle de la suite sans aide",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-suite-3",
                  label: "Invente une suite à 3 éléments et la fait deviner",
                  levelDescriptor: "Dépassement MS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
      {
        id: "ms-maths-tris-suites-seq2",
        slug: "trier-selon-une-propriete",
        title: "Trier selon une propriété",
        levelSlug: "ms",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "tris-suites",
        description:
          "Séquence de tri d'objets selon une propriété choisie et explicitée, en vue d'un double tri.",
        objective:
          "Trier une collection d'objets selon une propriété annoncée et justifier son classement.",
        objectives: [
          "Identifier une propriété et trier selon elle",
          "Expliquer le critère de tri utilisé",
          "Réaliser un double tri (deux propriétés successives)",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: ["Trie une collection selon une propriété et l'explique à l'enseignant."],
        observationFocus:
          "Observer si l'élève change de critère en cours de tri ou maintient le même jusqu'à la fin.",
        status: "upcoming",
        resources: [],
        workshops: [
          {
            id: "ms-maths-tris-suites-seq2-atelier1",
            slug: "le-grand-tri",
            title: "Le grand tri",
            type: "manipulation",
            objective:
              "Trier un lot d'objets selon une propriété choisie parmi deux proposées (couleur ou forme).",
            duration: "20 min",
            groupSize: "4 élèves",
            materials: [
              "Lot de 12-15 objets variés (forme et couleur différentes)",
              "Plateau de tri à 2 cases",
              "Étiquettes de propriété (rouge/bleu, rond/carré)",
            ],
            instruction:
              "Choisis comment tu vas trier tes objets : par couleur ou par forme. Explique-moi ta règle avant de commencer.",
            expectedAction:
              "L'élève annonce un critère, trie tous les objets et maintient son critère jusqu'au bout.",
            differentiation:
              "Allègement : le critère est donné par l'enseignant. Renforcement : l'élève réalise un double tri (d'abord par couleur, puis par forme dans chaque groupe).",
            status: "upcoming",
            observationGrid: {
              id: "ms-maths-tris-suites-seq2-atelier1-grille",
              title: "Grille — Trier selon une propriété",
              teacherUse:
                "Observer la constance du critère. Demander en cours de tri si l'objet suivant correspond à la règle.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-maths-tri-1",
                  label: "Annonce un critère de tri avant de commencer",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-tri-2",
                  label: "Maintient le même critère jusqu'au bout",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-maths-tri-3",
                  label: "Réalise un double tri avec deux propriétés différentes",
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

// Carte du programme CM1 — Cycle 3, primaire.
// Structure : matière → domaine → sous-domaine → séquence-compétence.
// Le site organise ; les PDF enseignent.
// Aucun contenu pédagogique complet : uniquement objectifs observables,
// critères courts et ressources PDF prévues sans href.

import type { CurriculumLevelMap } from "@/content/curriculum-map-types";
import type { ResourceSlot } from "@/content/learning-architecture-types";

const PLANNED_PDF_RESOURCES: ResourceSlot[] = [
  {
    kind: "lesson-pdf",
    label: "Leçon PDF",
    resource: { kind: "lesson-pdf", label: "Leçon PDF", status: "planned" },
  },
  {
    kind: "exercises-pdf",
    label: "Exercices PDF",
    resource: {
      kind: "exercises-pdf",
      label: "Exercices PDF",
      status: "planned",
    },
  },
  {
    kind: "correction-pdf",
    label: "Correction PDF",
    resource: {
      kind: "correction-pdf",
      label: "Correction PDF",
      status: "planned",
    },
  },
  {
    kind: "projectable-pdf",
    label: "Support projetable",
    resource: {
      kind: "projectable-pdf",
      label: "Support projetable",
      status: "planned",
    },
  },
  {
    kind: "parent-sheet-pdf",
    label: "Fiche parent",
    resource: {
      kind: "parent-sheet-pdf",
      label: "Fiche parent",
      status: "planned",
    },
  },
];

export const cm1CurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "cm1",
  domains: [
    {
      domainSlug: "francais",
      subject: "Français",
      label: "Français",
      subdomains: [
        {
          subdomainSlug: "lecture-comprehension",
          label: "Lecture et compréhension",
          entries: [
            {
              id: "cm1-fr-lc-intentions-personnage-entry",
              levelSlug: "cm1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Comprendre les intentions d'un personnage",
              officialReference: "Cycle 3 — Lecture et compréhension de l'écrit",
              observableObjective:
                "L'élève déduit ce qu'un personnage cherche à faire à partir de ses paroles et de ses actions.",
              successCriteria: [
                "Je relève ce que le personnage dit.",
                "Je relève ce que le personnage fait.",
                "Je formule une intention et je la justifie.",
              ],
              status: "in-progress",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-fr-lc-intentions-personnage",
            },
            {
              id: "cm1-fr-lc-inference-entry",
              levelSlug: "cm1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Inférer un sens implicite",
              officialReference: "Cycle 3 — Lecture et compréhension de l'écrit",
              observableObjective:
                "L'élève comprend une information non dite en s'appuyant sur des indices du texte.",
              successCriteria: [
                "Je relève un indice dans le texte.",
                "Je formule ce que le texte suggère sans le dire.",
                "Je justifie mon inférence brièvement.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-fr-lc-inference-simple",
            },
            {
              id: "cm1-fr-lc-texte-documentaire-entry",
              levelSlug: "cm1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Lire et comprendre un texte documentaire",
              officialReference: "Cycle 3 — Lecture et compréhension de l'écrit",
              observableObjective:
                "L'élève repère l'organisation et les informations principales d'un texte informatif.",
              successCriteria: [
                "Je repère le thème général du texte.",
                "J'identifie l'organisation du texte (titres, paragraphes).",
                "Je retrouve les informations principales sans recopier le texte.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-fr-lc-texte-informatif",
            },
          ],
        },
        {
          subdomainSlug: "ecriture",
          label: "Écriture",
          entries: [
            {
              id: "cm1-fr-ec-planifier-entry",
              levelSlug: "cm1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Planifier son écrit avant de rédiger",
              officialReference: "Cycle 3 — Écriture",
              observableObjective:
                "L'élève organise ses idées en liste ou en plan avant d'écrire.",
              successCriteria: [
                "Je note mes idées principales avant d'écrire.",
                "Je les ordonne dans un plan ou une liste.",
                "Je m'appuie sur ce plan pendant la rédaction.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-fr-ecr-planifier",
            },
            {
              id: "cm1-fr-ec-texte-structure-entry",
              levelSlug: "cm1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Produire un texte structuré",
              officialReference: "Cycle 3 — Écriture",
              observableObjective:
                "L'élève écrit un texte organisé avec un début, un développement et une fin.",
              successCriteria: [
                "J'organise mes idées avant d'écrire.",
                "Je regroupe les phrases qui vont ensemble.",
                "Je relis pour améliorer la clarté.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-fr-ecr-texte-structure",
            },
          ],
        },
        {
          subdomainSlug: "etude-de-la-langue",
          label: "Étude de la langue",
          entries: [
            {
              id: "cm1-fr-edl-sujet-verbe-entry",
              levelSlug: "cm1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Identifier sujet, verbe et accords",
              officialReference: "Cycle 3 — Étude de la langue",
              observableObjective:
                "L'élève repère le sujet et le verbe pour contrôler un accord simple.",
              successCriteria: [
                "Je repère le verbe conjugué.",
                "Je retrouve son sujet.",
                "Je vérifie l'accord sujet-verbe.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-fr-edl-sujet-verbe-accord",
            },
          ],
        },
        {
          subdomainSlug: "langage-oral",
          label: "Langage oral",
          entries: [
            {
              id: "cm1-fr-or-avis-argumente-entry",
              levelSlug: "cm1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Présenter un avis argumenté",
              officialReference: "Cycle 3 — Comprendre et s'exprimer à l'oral",
              observableObjective:
                "L'élève donne un avis court et l'appuie sur un exemple ou un indice.",
              successCriteria: [
                "J'annonce clairement mon avis.",
                "Je donne au moins un argument.",
                "Je m'appuie sur un exemple précis.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-fr-oral-avis-argumente",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "mathematiques",
      subject: "Mathématiques",
      label: "Mathématiques",
      subdomains: [
        {
          subdomainSlug: "numeration",
          label: "Numération",
          entries: [
            {
              id: "cm1-ma-num-fractions-entry",
              levelSlug: "cm1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "numeration",
              title: "Comprendre la notion de fraction",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève partage en parties égales et lit ou écrit une fraction simple.",
              successCriteria: [
                "Je reconnais que les parties doivent être égales.",
                "Je lis une fraction (numérateur et dénominateur).",
                "Je représente une fraction simple sur un dessin ou une droite graduée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-ma-num-fractions",
            },
            {
              id: "cm1-ma-num-grands-nombres-entry",
              levelSlug: "cm1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "numeration",
              title: "Lire, écrire et comparer les grands nombres",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève lit, écrit et compare des nombres jusqu'au million.",
              successCriteria: [
                "Je repère les classes d'un nombre.",
                "J'écris un nombre dicté en chiffres.",
                "Je compare deux nombres et je justifie.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-ma-num-grands-nombres",
            },
          ],
        },
        {
          subdomainSlug: "calcul-pose",
          label: "Calcul posé",
          entries: [
            {
              id: "cm1-ma-cal-multiplication-entry",
              levelSlug: "cm1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "calcul-pose",
              title: "Poser et calculer une multiplication",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève calcule le produit de deux entiers par l'algorithme de la multiplication.",
              successCriteria: [
                "Je pose la multiplication en colonnes.",
                "Je multiplie chiffre par chiffre en gérant les retenues.",
                "Je vérifie le résultat par une estimation.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-ma-cal-multiplication",
            },
            {
              id: "cm1-ma-cal-division-entry",
              levelSlug: "cm1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "calcul-pose",
              title: "Poser et calculer une division euclidienne",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève calcule le quotient et le reste d'une division posée.",
              successCriteria: [
                "Je pose la division avec les bons nombres.",
                "Je calcule quotient et reste étape par étape.",
                "Je vérifie que le reste est inférieur au diviseur.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-ma-cal-division",
            },
          ],
        },
        {
          subdomainSlug: "problemes",
          label: "Résolution de problèmes",
          entries: [
            {
              id: "cm1-ma-prob-etapes-entry",
              levelSlug: "cm1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "problemes",
              title: "Résoudre un problème à étapes",
              officialReference: "Cycle 3 — Résolution de problèmes",
              observableObjective:
                "L'élève organise deux calculs successifs pour répondre à une question.",
              successCriteria: [
                "Je repère les données utiles.",
                "Je choisis l'ordre des calculs.",
                "Je justifie ma démarche par une phrase courte.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-ma-prob-etapes",
            },
          ],
        },
        {
          subdomainSlug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          entries: [
            {
              id: "cm1-ma-gm-aires-perimetres-entry",
              levelSlug: "cm1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Distinguer aire et périmètre",
              officialReference: "Cycle 3 — Grandeurs et mesures",
              observableObjective:
                "L'élève choisit la grandeur adaptée selon la question posée.",
              successCriteria: [
                "Je reconnais si l'on cherche un contour ou une surface.",
                "Je choisis l'unité adaptée.",
                "J'explique mon choix en une phrase.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-ma-gm-aires-perimetres",
            },
          ],
        },
        {
          subdomainSlug: "geometrie",
          label: "Géométrie",
          entries: [
            {
              id: "cm1-ma-geo-figures-entry",
              levelSlug: "cm1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Décrire et construire des figures",
              officialReference: "Cycle 3 — Espace et géométrie",
              observableObjective:
                "L'élève utilise les propriétés de figures pour décrire ou tracer.",
              successCriteria: [
                "Je nomme les propriétés utiles.",
                "J'utilise les outils adaptés.",
                "Je vérifie la figure construite.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-ma-geo-decrire-construire-figures",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "histoire-geographie",
      subject: "Histoire-Géographie",
      label: "Histoire-Géographie",
      subdomains: [
        {
          subdomainSlug: "antiquite",
          label: "Antiquité",
          entries: [
            {
              id: "cm1-hi-ant-situer-civilisation-entry",
              levelSlug: "cm1",
              subject: "Histoire-Géographie",
              domainSlug: "histoire-geographie",
              subdomainSlug: "antiquite",
              title: "Situer une civilisation dans le temps",
              officialReference: "Cycle 3 — Histoire",
              observableObjective:
                "L'élève place une civilisation antique sur une frise.",
              successCriteria: [
                "Je repère la période donnée.",
                "Je place la civilisation sur la frise.",
                "Je compare avec une autre période.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-hi-ant-situer-civilisation",
            },
          ],
        },
        {
          subdomainSlug: "geographie",
          label: "Géographie",
          entries: [
            {
              id: "cm1-geo-decrire-territoire-entry",
              levelSlug: "cm1",
              subject: "Histoire-Géographie",
              domainSlug: "histoire-geographie",
              subdomainSlug: "geographie",
              title: "Décrire un espace de vie ou un territoire",
              officialReference: "Cycle 3 — Géographie",
              observableObjective:
                "L'élève présente les caractéristiques d'un espace à partir d'une carte.",
              successCriteria: [
                "Je repère le type de document.",
                "Je relève deux informations utiles.",
                "Je décris le territoire avec un vocabulaire précis.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-geo-decrire-territoire",
            },
            {
              id: "cm1-geo-lire-paysage-entry",
              levelSlug: "cm1",
              subject: "Histoire-Géographie",
              domainSlug: "histoire-geographie",
              subdomainSlug: "geographie",
              title: "Lire un paysage et identifier ses composantes",
              officialReference: "Cycle 3 — Géographie",
              observableObjective:
                "L'élève distingue les éléments naturels et humains d'un paysage.",
              successCriteria: [
                "Je repère les éléments naturels.",
                "Je repère les éléments humains.",
                "Je décris le paysage avec le vocabulaire adapté.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-geo-lire-paysage",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "sciences",
      subject: "Sciences",
      label: "Sciences",
      subdomains: [
        {
          subdomainSlug: "vivant",
          label: "Le vivant",
          entries: [
            {
              id: "cm1-sc-vivant-besoins-entry",
              levelSlug: "cm1",
              subject: "Sciences",
              domainSlug: "sciences",
              subdomainSlug: "vivant",
              title: "Décrire les besoins du vivant",
              officialReference: "Cycle 3 — Sciences et technologie",
              observableObjective:
                "L'élève identifie des besoins communs et des différences entre êtres vivants.",
              successCriteria: [
                "Je relève une observation utile.",
                "Je nomme un besoin du vivant.",
                "Je compare deux êtres vivants simplement.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-sc-vivant-besoins",
            },
          ],
        },
        {
          subdomainSlug: "matiere-energie",
          label: "Matière et énergie",
          entries: [
            {
              id: "cm1-sc-me-distinguer-melanges-entry",
              levelSlug: "cm1",
              subject: "Sciences",
              domainSlug: "sciences",
              subdomainSlug: "matiere-energie",
              title: "Distinguer mélange et corps pur",
              officialReference: "Cycle 3 — Sciences et technologie",
              observableObjective:
                "L'élève différencie un corps pur d'un mélange à partir de critères observables.",
              successCriteria: [
                "Je donne un exemple de corps pur.",
                "Je donne un exemple de mélange.",
                "Je justifie la différence observée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-sc-me-distinguer-melanges",
            },
          ],
        },
        {
          subdomainSlug: "technologie",
          label: "Technologie",
          entries: [
            {
              id: "cm1-sc-tech-decrire-objet-technique-entry",
              levelSlug: "cm1",
              subject: "Sciences",
              domainSlug: "sciences",
              subdomainSlug: "technologie",
              title: "Décrire la fonction d'un objet technique simple",
              officialReference: "Cycle 3 — Sciences et technologie",
              observableObjective:
                "L'élève identifie à quoi sert un objet technique et comment il fonctionne globalement.",
              successCriteria: [
                "Je nomme la fonction principale de l'objet.",
                "Je décris son fonctionnement simplement.",
                "Je repère les éléments constitutifs principaux.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-sc-tech-decrire-objet-technique",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "enseignements-artistiques",
      subject: "Enseignements artistiques",
      label: "Enseignements artistiques",
      subdomains: [
        {
          subdomainSlug: "arts-plastiques",
          label: "Arts plastiques",
          entries: [
            {
              id: "cm1-art-ap-questionner-espace-entry",
              levelSlug: "cm1",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Questionner l'espace dans une production plastique",
              officialReference: "Cycle 3 — Arts plastiques",
              observableObjective:
                "L'élève organise intentionnellement l'espace d'une production avec des choix justifiés.",
              successCriteria: [
                "Je fais des choix de composition.",
                "Je joue avec l'espace (plein, vide, avant-plan, arrière-plan).",
                "Je peux expliquer mes intentions.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-art-ap-questionner-espace",
            },
            {
              id: "cm1-art-ap-analyser-oeuvre-entry",
              levelSlug: "cm1",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Analyser une œuvre d'art avec un vocabulaire adapté",
              officialReference: "Cycle 3 — Arts plastiques",
              observableObjective:
                "L'élève décrit et interprète une œuvre en utilisant un vocabulaire artistique précis.",
              successCriteria: [
                "Je nomme la technique utilisée.",
                "Je décris la composition avec le vocabulaire appris.",
                "Je formule une interprétation justifiée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-art-ap-analyser-oeuvre",
            },
          ],
        },
        {
          subdomainSlug: "education-musicale",
          label: "Éducation musicale",
          entries: [
            {
              id: "cm1-art-mus-chanter-justesse-entry",
              levelSlug: "cm1",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Chanter avec justesse et contrôler sa voix",
              officialReference: "Cycle 3 — Éducation musicale",
              observableObjective:
                "L'élève chante une mélodie connue avec une intonation correcte.",
              successCriteria: [
                "Je respecte la hauteur des notes.",
                "J'ajuste ma voix si je déraille.",
                "Je chante en tenant la ligne mélodique.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-art-mus-chanter-justesse",
            },
            {
              id: "cm1-art-mus-analyser-extrait-entry",
              levelSlug: "cm1",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Analyser un extrait musical avec des paramètres du son",
              officialReference: "Cycle 3 — Éducation musicale",
              observableObjective:
                "L'élève repère des paramètres sonores (tempo, intensité, timbre) dans un extrait.",
              successCriteria: [
                "Je nomme au moins deux paramètres entendus.",
                "Je justifie mes observations.",
                "Je compare deux extraits sur ces paramètres.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-art-mus-analyser-extrait",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "eps",
      subject: "EPS",
      label: "EPS",
      subdomains: [
        {
          subdomainSlug: "performance",
          label: "Produire une performance",
          entries: [
            {
              id: "cm1-eps-perf-ameliorer-performance-entry",
              levelSlug: "cm1",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "performance",
              title: "Améliorer sa performance et mesurer ses progrès",
              officialReference: "Cycle 3 — EPS",
              observableObjective:
                "L'élève se fixe un objectif, mesure sa performance et la compare à une précédente.",
              successCriteria: [
                "Je note ma performance de départ.",
                "Je m'entraîne avec une intention.",
                "Je compare avec ma performance précédente.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-eps-perf-ameliorer-performance",
            },
          ],
        },
        {
          subdomainSlug: "jeux-collectifs",
          label: "Jeux collectifs et sports",
          entries: [
            {
              id: "cm1-eps-jeux-strategie-collective-entry",
              levelSlug: "cm1",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "jeux-collectifs",
              title: "Adopter une stratégie collective dans un jeu",
              officialReference: "Cycle 3 — EPS",
              observableObjective:
                "L'élève ajuste ses actions en fonction des partenaires et des adversaires.",
              successCriteria: [
                "Je perçois le jeu collectif.",
                "Je prends une décision adaptée au jeu.",
                "Je coordonne mes actions avec mes partenaires.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-eps-jeux-strategie-collective",
            },
            {
              id: "cm1-eps-jeux-arbitrer-entry",
              levelSlug: "cm1",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "jeux-collectifs",
              title: "Arbitrer un jeu simple en appliquant les règles",
              officialReference: "Cycle 3 — EPS",
              observableObjective:
                "L'élève applique le règlement d'un jeu en tant qu'arbitre de manière impartiale.",
              successCriteria: [
                "Je connais les règles à arbitrer.",
                "Je siffle et annonce la décision clairement.",
                "Je reste impartial.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-eps-jeux-arbitrer",
            },
          ],
        },
        {
          subdomainSlug: "bien-etre-sante",
          label: "Bien-être et santé",
          entries: [
            {
              id: "cm1-eps-ss-gerer-effort-entry",
              levelSlug: "cm1",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "bien-etre-sante",
              title: "Gérer son effort sur une durée prolongée",
              officialReference: "Cycle 3 — EPS",
              observableObjective:
                "L'élève adapte son allure pour tenir sur une durée donnée.",
              successCriteria: [
                "Je pars sans me dépenser trop vite.",
                "Je maintiens l'effort jusqu'à la fin.",
                "Je récupère calmement après l'effort.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-eps-ss-gerer-effort",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "emc",
      subject: "EMC",
      label: "EMC",
      subdomains: [
        {
          subdomainSlug: "regles-droit-justice",
          label: "Règles, droit et justice",
          entries: [
            {
              id: "cm1-emc-rdj-comprendre-loi-entry",
              levelSlug: "cm1",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-droit-justice",
              title: "Comprendre pourquoi des lois régissent la société",
              officialReference: "Cycle 3 — EMC",
              observableObjective:
                "L'élève explique à quoi servent les lois dans une société démocratique.",
              successCriteria: [
                "Je donne un exemple de loi.",
                "J'explique son utilité pour vivre ensemble.",
                "Je comprends la différence entre règle et loi.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-emc-rdj-comprendre-loi",
            },
            {
              id: "cm1-emc-rdj-distinguer-droits-devoirs-entry",
              levelSlug: "cm1",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-droit-justice",
              title: "Distinguer droits et devoirs du citoyen",
              officialReference: "Cycle 3 — EMC",
              observableObjective:
                "L'élève cite des droits et des devoirs et comprend leur complémentarité.",
              successCriteria: [
                "Je cite deux droits.",
                "Je cite deux devoirs.",
                "J'explique leur lien.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-emc-rdj-distinguer-droits-devoirs",
            },
          ],
        },
        {
          subdomainSlug: "jugement-engagement",
          label: "Jugement et engagement",
          entries: [
            {
              id: "cm1-emc-je-argumenter-debat-entry",
              levelSlug: "cm1",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "jugement-engagement",
              title: "Argumenter dans un débat en respectant les règles",
              officialReference: "Cycle 3 — EMC",
              observableObjective:
                "L'élève prend position et argumente en respectant les règles du débat.",
              successCriteria: [
                "Je présente mon point de vue clairement.",
                "Je donne un argument à l'appui.",
                "Je respecte le temps de parole et les autres opinions.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-emc-je-argumenter-debat",
            },
          ],
        },
        {
          subdomainSlug: "identite-alterite",
          label: "Identité et altérité",
          entries: [
            {
              id: "cm1-emc-ia-respecter-diversite-entry",
              levelSlug: "cm1",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "identite-alterite",
              title: "Respecter et valoriser la diversité des personnes",
              officialReference: "Cycle 3 — EMC",
              observableObjective:
                "L'élève explique pourquoi les différences entre individus sont une richesse.",
              successCriteria: [
                "Je repère une différence culturelle ou personnelle.",
                "Je l'accueille positivement.",
                "Je donne un exemple de ce qu'elle apporte.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-emc-ia-respecter-diversite",
            },
          ],
        },
      ],
    },
  ],
};

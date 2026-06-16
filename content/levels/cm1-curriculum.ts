// Carte du programme CM1 — Cycle 3, primaire.
// Structure : domaine → sous-domaine → séquence (1 séquence = 1 compétence observable).
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
            {
              id: "cm1-fr-edl-classes-de-mots-entry",
              levelSlug: "cm1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Identifier les classes de mots dans une phrase",
              officialReference: "Cycle 3 — Étude de la langue",
              observableObjective:
                "L'élève distingue nom, verbe, adjectif et déterminant dans une phrase.",
              successCriteria: [
                "Je nomme la classe d'un mot donné.",
                "Je justifie mon choix par un critère grammatical.",
                "Je retrouve plusieurs noms ou verbes dans une phrase.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-fr-edl-classes-mots",
            },
            {
              id: "cm1-fr-edl-conjugaison-present-entry",
              levelSlug: "cm1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Conjuguer au présent et à l'imparfait",
              officialReference: "Cycle 3 — Étude de la langue",
              observableObjective:
                "L'élève conjugue correctement un verbe du 1er groupe au présent et à l'imparfait.",
              successCriteria: [
                "Je conjugue un verbe en -er aux six personnes au présent.",
                "Je conjugue ce même verbe à l'imparfait.",
                "Je repère le temps utilisé dans un texte donné.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-fr-edl-conjugaison-present-imparfait",
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
          subdomainSlug: "moyen-age",
          label: "Moyen Âge",
          entries: [
            {
              id: "cm1-hi-ma-situer-periode-entry",
              levelSlug: "cm1",
              subject: "Histoire-Géographie",
              domainSlug: "histoire-geographie",
              subdomainSlug: "moyen-age",
              title: "Situer le Moyen Âge sur une frise chronologique",
              officialReference: "Cycle 3 — Histoire",
              observableObjective:
                "L'élève place la période médiévale sur une frise et la distingue de l'Antiquité.",
              successCriteria: [
                "Je repère le début et la fin du Moyen Âge.",
                "Je place la période sur la frise en la comparant à l'Antiquité.",
                "Je cite un événement ou un personnage repère.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-hi-ma-situer-periode",
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
              id: "cm1-sc-me-etats-matiere-entry",
              levelSlug: "cm1",
              subject: "Sciences",
              domainSlug: "sciences",
              subdomainSlug: "matiere-energie",
              title: "Distinguer les états de la matière",
              officialReference: "Cycle 3 — Sciences et technologie",
              observableObjective:
                "L'élève identifie les états solide, liquide et gazeux et les associe à des exemples concrets.",
              successCriteria: [
                "Je cite un exemple pour chaque état.",
                "Je décris une propriété propre à chaque état.",
                "J'explique une transformation d'état par un apport ou une perte de chaleur.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm1-sc-me-etats-matiere",
            },
          ],
        },
      ],
    },
  ],
};

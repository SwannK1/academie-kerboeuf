import type {
  LearningCompetency,
  ResourceSlot,
  TeachingSequenceStep,
} from "@/content/learning-architecture-types";

const PLANNED_PDF_RESOURCE_SLOTS: ResourceSlot[] = [
  {
    kind: "lesson-pdf",
    label: "Leçon PDF",
    resource: { kind: "lesson-pdf", label: "Leçon PDF", status: "planned" },
  },
  {
    kind: "exercises-pdf",
    label: "Exercices PDF",
    resource: { kind: "exercises-pdf", label: "Exercices PDF", status: "planned" },
  },
  {
    kind: "correction-pdf",
    label: "Correction PDF",
    resource: { kind: "correction-pdf", label: "Correction PDF", status: "planned" },
  },
  {
    kind: "projectable-pdf",
    label: "Projection PDF",
    resource: { kind: "projectable-pdf", label: "Projection PDF", status: "planned" },
  },
  {
    kind: "parent-sheet-pdf",
    label: "Fiche parent",
    resource: { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
  },
];

function buildCm1SequenceSteps(competency: LearningCompetency): TeachingSequenceStep[] {
  const baseSteps = competency.sequence.steps;
  const fallbackSteps: TeachingSequenceStep[] = [
    {
      id: `${competency.sequence.id}-1`,
      order: 1,
      kind: "discovery",
      title: "Découvrir la compétence",
      objective: "Identifier ce qui est attendu et les premiers repères.",
      status: competency.status,
    },
    {
      id: `${competency.sequence.id}-2`,
      order: 2,
      kind: "explicit-lesson",
      title: "Structurer la méthode",
      objective: "Nommer la démarche et les points d'attention.",
      status: competency.status,
    },
    {
      id: `${competency.sequence.id}-3`,
      order: 3,
      kind: "guided-practice",
      title: "S'entraîner avec guidage",
      objective: "Appliquer la compétence avec des repères fournis.",
      status: competency.status,
    },
    {
      id: `${competency.sequence.id}-4`,
      order: 4,
      kind: "consolidation",
      title: "Consolider",
      objective: "Réutiliser la compétence dans une situation proche.",
      status: competency.status,
    },
    {
      id: `${competency.sequence.id}-5`,
      order: 5,
      kind: "assessment",
      title: "Vérifier la maîtrise",
      objective: "Montrer la compétence de manière autonome.",
      status: competency.status,
    },
  ];

  return fallbackSteps.map((fallback) => {
    const existing = baseSteps.find((step) => step.order === fallback.order);
    return {
      ...fallback,
      ...existing,
      id: existing?.id ?? fallback.id,
      resourceSlots: clonePlannedPdfResourceSlots(),
    };
  });
}

function clonePlannedPdfResourceSlots(): ResourceSlot[] {
  return PLANNED_PDF_RESOURCE_SLOTS.map((slot) => ({
    ...slot,
    resource: slot.resource ? { ...slot.resource } : undefined,
  }));
}

function withCm1PlannedSequence(competency: LearningCompetency): LearningCompetency {
  return {
    ...competency,
    resourceSlots: clonePlannedPdfResourceSlots(),
    sequence: {
      ...competency.sequence,
      steps: buildCm1SequenceSteps(competency),
    },
  };
}

const cm1CompetencySource = [
  {
    id: "cm1-fr-lc-intentions-personnage",
    slug: "comprendre-les-intentions-dun-personnage",
    levelSlug: "cm1",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "lecture-comprehension",
    title: "Comprendre les intentions d'un personnage",
    observableObjective:
      "Déduire ce qu'un personnage cherche à faire à partir de ses paroles et de ses actions.",
    successCriteria: [
      "Je relève ce que le personnage dit.",
      "Je relève ce que le personnage fait.",
      "Je formule une intention et je la justifie.",
    ],
    lessonIds: ["cm1-fr-lc-intentions"],
    guideCharacter: {
      characterSlug: "noisette",
      name: "Noisette",
    },
    status: "in-progress",
    sequence: {
      id: "seq-cm1-fr-lc-intentions-personnage",
      competencyId: "cm1-fr-lc-intentions-personnage",
      title: "Lire les indices d'intention",
      status: "in-progress",
      steps: [
        {
          id: "seq-cm1-fr-lc-intentions-personnage-1",
          order: 1,
          kind: "discovery",
          title: "Repérer paroles et actions",
          objective: "Séparer ce qui est dit de ce qui est fait.",
          status: "in-progress",
        },
        {
          id: "seq-cm1-fr-lc-intentions-personnage-4",
          order: 4,
          kind: "consolidation",
          title: "Justifier l'inférence",
          objective: "Appuyer une interprétation sur plusieurs indices.",
          status: "upcoming",
        },
        {
          id: "seq-cm1-fr-lc-intentions-personnage-5",
          order: 5,
          kind: "assessment",
          title: "Lire entre les lignes",
          objective: "Formuler une intention probable et citer un indice.",
          status: "upcoming",
        },
      ],
    },
  },
  {
    id: "cm1-fr-lc-inference-simple",
    slug: "inferer-un-sens-implicite-simple",
    levelSlug: "cm1",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "lecture-comprehension",
    title: "Inférer un sens implicite",
    observableObjective:
      "Comprendre une information non dite en s'appuyant sur des indices.",
    successCriteria: [
      "Je relève un indice du texte.",
      "Je formule ce que le texte suggère.",
      "Je justifie mon inférence brièvement.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-fr-lc-inference-simple",
      competencyId: "cm1-fr-lc-inference-simple",
      title: "Lire les indices implicites",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-fr-ecr-texte-structure",
    slug: "produire-un-texte-structure",
    levelSlug: "cm1",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "ecriture",
    title: "Produire un texte structuré",
    observableObjective:
      "Écrire un texte organisé avec un début, un développement et une fin.",
    successCriteria: [
      "J'organise mes idées avant d'écrire.",
      "Je regroupe les phrases qui vont ensemble.",
      "Je relis pour améliorer la clarté.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-fr-ecr-texte-structure",
      competencyId: "cm1-fr-ecr-texte-structure",
      title: "Construire un texte",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-fr-edl-sujet-verbe-accord",
    slug: "identifier-sujet-verbe-et-accords",
    levelSlug: "cm1",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "etude-de-la-langue",
    title: "Identifier sujet, verbe et accords",
    observableObjective:
      "Repérer le sujet et le verbe pour contrôler un accord simple.",
    successCriteria: [
      "Je repère le verbe conjugué.",
      "Je retrouve son sujet.",
      "Je vérifie l'accord sujet-verbe.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-fr-edl-sujet-verbe-accord",
      competencyId: "cm1-fr-edl-sujet-verbe-accord",
      title: "Relier sujet et verbe",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-fr-oral-avis-argumente",
    slug: "presenter-un-avis-argumente",
    levelSlug: "cm1",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "oral",
    title: "Présenter un avis argumenté",
    observableObjective:
      "Donner un avis court et l'appuyer sur un exemple ou un indice.",
    successCriteria: [
      "J'annonce clairement mon avis.",
      "Je donne au moins un argument.",
      "Je m'appuie sur un exemple précis.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-fr-oral-avis-argumente",
      competencyId: "cm1-fr-oral-avis-argumente",
      title: "Dire et justifier son avis",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-ma-prob-etapes",
    slug: "resoudre-un-probleme-a-etapes",
    levelSlug: "cm1",
    subject: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "problemes",
    title: "Résoudre un problème à étapes",
    observableObjective:
      "Organiser deux calculs successifs pour répondre à une question.",
    successCriteria: [
      "Je repère les données utiles.",
      "Je choisis l'ordre des calculs.",
      "Je justifie ma démarche par une phrase courte.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-ma-prob-etapes",
      competencyId: "cm1-ma-prob-etapes",
      title: "Organiser deux calculs",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-hi-ant-situer-civilisation",
    slug: "situer-une-civilisation-dans-le-temps",
    levelSlug: "cm1",
    subject: "Histoire-Géographie",
    domainSlug: "histoire-geographie",
    subdomainSlug: "antiquite",
    title: "Situer une civilisation dans le temps",
    observableObjective:
      "Placer une civilisation antique sur une frise chronologique.",
    successCriteria: [
      "Je repère les dates ou périodes données.",
      "Je place la civilisation sur la frise.",
      "Je compare sa place avec une autre période.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-hi-ant-situer-civilisation",
      competencyId: "cm1-hi-ant-situer-civilisation",
      title: "Situer sur la frise",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-geo-decrire-territoire",
    slug: "decrire-un-espace-de-vie-ou-un-territoire",
    levelSlug: "cm1",
    subject: "Histoire-Géographie",
    domainSlug: "histoire-geographie",
    subdomainSlug: "geographie",
    title: "Décrire un espace de vie ou un territoire",
    observableObjective:
      "Présenter les caractéristiques d'un espace à partir d'une carte.",
    successCriteria: [
      "Je repère le type de document.",
      "Je relève deux informations utiles.",
      "Je décris le territoire avec un vocabulaire précis.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-geo-decrire-territoire",
      competencyId: "cm1-geo-decrire-territoire",
      title: "Lire et décrire un territoire",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-ma-gm-aires-perimetres",
    slug: "distinguer-aire-et-perimetre",
    levelSlug: "cm1",
    subject: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "grandeurs-mesures",
    title: "Distinguer aire et périmètre",
    observableObjective:
      "Choisir la grandeur adaptée selon la question posée.",
    successCriteria: [
      "Je reconnais si l'on cherche un contour ou une surface.",
      "Je choisis l'unité adaptée.",
      "J'explique mon choix en une phrase.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-ma-gm-aires-perimetres",
      competencyId: "cm1-ma-gm-aires-perimetres",
      title: "Contour ou surface",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-ma-geo-decrire-construire-figures",
    slug: "decrire-et-construire-des-figures",
    levelSlug: "cm1",
    subject: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "geometrie",
    title: "Décrire et construire des figures",
    observableObjective:
      "Utiliser les propriétés de triangles et quadrilatères pour tracer.",
    successCriteria: [
      "Je nomme les propriétés utiles.",
      "J'utilise les outils adaptés.",
      "Je vérifie la figure construite.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-ma-geo-decrire-construire-figures",
      competencyId: "cm1-ma-geo-decrire-construire-figures",
      title: "Décrire pour construire",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-sc-vivant-besoins",
    slug: "decrire-les-besoins-du-vivant",
    levelSlug: "cm1",
    subject: "Sciences",
    domainSlug: "sciences",
    subdomainSlug: "vivant",
    title: "Décrire les besoins du vivant",
    observableObjective:
      "Identifier quelques besoins communs et différences entre êtres vivants.",
    successCriteria: [
      "Je relève une observation utile.",
      "Je nomme un besoin du vivant.",
      "Je compare deux êtres vivants simplement.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-sc-vivant-besoins",
      competencyId: "cm1-sc-vivant-besoins",
      title: "Observer le vivant",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-fr-lc-texte-informatif",
    slug: "lire-et-comprendre-un-texte-documentaire",
    levelSlug: "cm1",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "lecture-comprehension",
    title: "Lire et comprendre un texte documentaire",
    observableObjective:
      "Repérer l'organisation et les informations principales d'un texte informatif.",
    successCriteria: [
      "Je repère le thème général du texte.",
      "J'identifie l'organisation du texte (titres, paragraphes).",
      "Je retrouve les informations principales sans recopier le texte.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-fr-lc-texte-informatif",
      competencyId: "cm1-fr-lc-texte-informatif",
      title: "Lire pour comprendre et informer",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-geo-lire-paysage",
    slug: "lire-un-paysage-et-identifier-ses-composantes",
    levelSlug: "cm1",
    subject: "Histoire-Géographie",
    domainSlug: "histoire-geographie",
    subdomainSlug: "geographie",
    title: "Lire un paysage et identifier ses composantes",
    observableObjective:
      "Distinguer les éléments naturels et humains d'un paysage observé.",
    successCriteria: [
      "Je repère les éléments naturels (relief, eau, végétation).",
      "Je repère les éléments humains (routes, bâtiments, cultures).",
      "Je décris le paysage avec un vocabulaire géographique simple.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-geo-lire-paysage",
      competencyId: "cm1-geo-lire-paysage",
      title: "Lire et décrire un paysage",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-ma-num-fractions",
    slug: "comprendre-la-notion-de-fraction",
    levelSlug: "cm1",
    subject: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "numeration",
    title: "Comprendre la notion de fraction",
    observableObjective:
      "Partager en parties égales et lire ou écrire une fraction simple.",
    successCriteria: [
      "Je reconnais que les parties doivent être égales.",
      "Je lis une fraction (numérateur et dénominateur).",
      "Je représente une fraction simple sur un dessin ou une droite graduée.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-ma-num-fractions",
      competencyId: "cm1-ma-num-fractions",
      title: "Partager et nommer",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-ma-cal-multiplication",
    slug: "poser-et-calculer-une-multiplication",
    levelSlug: "cm1",
    subject: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "calcul-pose",
    title: "Poser et calculer une multiplication",
    observableObjective:
      "Calculer le produit de deux entiers par l'algorithme de la multiplication.",
    successCriteria: [
      "Je pose la multiplication en colonnes.",
      "Je multiplie chiffre par chiffre en gérant les retenues.",
      "Je vérifie le résultat par une estimation.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-ma-cal-multiplication",
      competencyId: "cm1-ma-cal-multiplication",
      title: "Poser et calculer",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-fr-ecr-planifier",
    slug: "planifier-son-ecrit-avant-de-rediger",
    levelSlug: "cm1",
    subject: "Français",
    domainSlug: "francais",
    subdomainSlug: "ecriture",
    title: "Planifier son écrit avant de rédiger",
    observableObjective:
      "Organiser ses idées en liste ou en plan avant d'écrire.",
    successCriteria: [
      "Je note mes idées principales avant d'écrire.",
      "Je les ordonne dans un plan ou une liste.",
      "Je m'appuie sur ce plan pendant la rédaction.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-fr-ecr-planifier",
      competencyId: "cm1-fr-ecr-planifier",
      title: "Préparer avant d'écrire",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-ma-num-grands-nombres",
    slug: "lire-ecrire-et-comparer-les-grands-nombres",
    levelSlug: "cm1",
    subject: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "numeration",
    title: "Lire, écrire et comparer les grands nombres",
    observableObjective:
      "Lire, écrire et comparer des nombres jusqu'au million en s'appuyant sur les classes.",
    successCriteria: [
      "Je lis un nombre en repérant les classes (unités, milliers, millions).",
      "J'écris en chiffres un nombre dicté à l'oral.",
      "Je compare deux grands nombres et je justifie ma réponse.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-ma-num-grands-nombres",
      competencyId: "cm1-ma-num-grands-nombres",
      title: "Lire et écrire jusqu'au million",
      status: "upcoming",
      steps: [],
    },
  },
  {
    id: "cm1-ma-cal-division",
    slug: "poser-et-calculer-une-division-euclidienne",
    levelSlug: "cm1",
    subject: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "calcul-pose",
    title: "Poser et calculer une division euclidienne",
    observableObjective:
      "Calculer le quotient et le reste d'une division posée et interpréter le résultat.",
    successCriteria: [
      "Je pose la division en identifiant dividende et diviseur.",
      "Je calcule le quotient et le reste étape par étape.",
      "Je vérifie que le reste est strictement inférieur au diviseur.",
    ],
    lessonIds: [],
    status: "upcoming",
    sequence: {
      id: "seq-cm1-ma-cal-division",
      competencyId: "cm1-ma-cal-division",
      title: "Poser et interpréter la division",
      status: "upcoming",
      steps: [],
    },
  },
] as const satisfies LearningCompetency[];

export const cm1Competencies: LearningCompetency[] = cm1CompetencySource.map(
  withCm1PlannedSequence,
);

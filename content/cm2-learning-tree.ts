// Arbre public CM2 : matiere -> domaine -> sous-domaine -> sequences.
// Les sequences portent les competences, les seances et les slots PDF planifies
// dans content/cm2-sequences.ts. Aucune route de lecon n'est active ici.

export type Cm2LearningStatus = "available" | "in-progress" | "upcoming";

export type Cm2GuideReference = {
  id: "felix" | "chouette" | "hector" | "melina" | "max" | "naia" | "pablo" | "rosa";
  name: string;
  role?: string;
};

export type Cm2PedagogicalPlaceReference = {
  slug: string;
  label: string;
  zone?: string;
};

export type Cm2SubdomainNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm2LearningStatus;
  priorityNotions: string[];
  sequenceSlugs: string[];
};

export type Cm2DomainNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm2LearningStatus;
  place?: Cm2PedagogicalPlaceReference;
  subdomains: Cm2SubdomainNode[];
};

export type Cm2SubjectNode = {
  subjectSlug: string;
  title: string;
  place: Cm2PedagogicalPlaceReference;
  guides: Cm2GuideReference[];
  status: Cm2LearningStatus;
  domains: Cm2DomainNode[];
};

export type Cm2LearningTree = Cm2SubjectNode[];

export const cm2LearningTree: Cm2LearningTree = [
  {
    subjectSlug: "francais",
    title: "Français",
    place: {
      slug: "bibliotheque-des-explorateurs",
      label: "La Bibliothèque des Explorateurs",
    },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide méthodologique CM2" },
      { id: "chouette", name: "Chouette", role: "Repère Français" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "francais-lecture",
        title: "Lecture et compréhension",
        status: "upcoming",
        place: {
          slug: "bibliotheque-des-explorateurs",
          label: "La Bibliothèque des Explorateurs",
          zone: "Rayonnage des indices",
        },
        subdomains: [
          {
            id: "francais-lecture-inferences",
            title: "Inférer avec le texte",
            description: "Prélever, classer et justifier des informations à partir du texte.",
            status: "upcoming",
            priorityNotions: ["Indices textuels", "Explicite / implicite"],
            sequenceSlugs: ["fr-lc-reperer-indices", "fr-lc-explicite-implicite"],
          },
        ],
      },
      {
        id: "francais-edl",
        title: "Étude de la langue",
        status: "upcoming",
        place: {
          slug: "bibliotheque-des-explorateurs",
          label: "La Bibliothèque des Explorateurs",
          zone: "Table des accords",
        },
        subdomains: [
          {
            id: "francais-edl-accords",
            title: "Accords",
            description: "Stabiliser les accords essentiels en contexte de phrase.",
            status: "upcoming",
            priorityNotions: ["Chaîne d'accord du groupe nominal"],
            sequenceSlugs: ["fr-edl-accords-gn"],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "mathematiques",
    title: "Mathématiques",
    place: { slug: "atelier-des-mathematiques", label: "L'Atelier des Mathématiques" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide méthodologique CM2" },
      { id: "hector", name: "Hector le Castor", role: "Repère Mathématiques" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "maths-nombres",
        title: "Nombres et calculs",
        status: "upcoming",
        place: {
          slug: "atelier-des-mathematiques",
          label: "L'Atelier des Mathématiques",
          zone: "Table des stratégies",
        },
        subdomains: [
          {
            id: "maths-nombres-calcul",
            title: "Calcul mental raisonné",
            status: "upcoming",
            priorityNotions: ["Stratégies de calcul"],
            sequenceSlugs: ["ma-nc-calcul-mental-strategies"],
          },
        ],
      },
      {
        id: "maths-problemes",
        title: "Résolution de problèmes",
        status: "upcoming",
        subdomains: [
          {
            id: "maths-problemes-enonce",
            title: "Lecture de l'énoncé",
            status: "upcoming",
            priorityNotions: ["Données utiles"],
            sequenceSlugs: ["ma-pb-donnees-utiles"],
          },
        ],
      },
      {
        id: "maths-grandeurs",
        title: "Grandeurs et mesures",
        status: "upcoming",
        subdomains: [
          {
            id: "maths-grandeurs-surfaces",
            title: "Surfaces",
            status: "upcoming",
            priorityNotions: ["Périmètre / aire"],
            sequenceSlugs: ["ma-gm-perimetre-aire"],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "histoire-geographie",
    title: "Histoire-Géographie",
    place: { slug: "cartotheque-des-lisieres", label: "La Cartothèque des Lisières" },
    guides: [{ id: "felix", name: "Félix le Lynx", role: "Guide méthodologique CM2" }],
    status: "upcoming",
    domains: [
      {
        id: "histoire",
        title: "Histoire",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-sources",
            title: "Lecture de sources",
            status: "upcoming",
            priorityNotions: ["Nature d'un document"],
            sequenceSlugs: ["hg-hi-identifier-document"],
          },
        ],
      },
      {
        id: "geographie",
        title: "Géographie",
        status: "upcoming",
        subdomains: [
          {
            id: "geographie-cartes",
            title: "Lecture de cartes",
            status: "upcoming",
            priorityNotions: ["Légende cartographique"],
            sequenceSlugs: ["hg-ge-lire-carte"],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "sciences",
    title: "Sciences et technologie",
    place: { slug: "laboratoire", label: "Le Laboratoire" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide méthodologique CM2" },
      { id: "melina", name: "Mélina l'Abeille", role: "Repère Sciences" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "sciences-demarche",
        title: "Démarche d'investigation",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-demarche-hypothese",
            title: "Hypothèse scientifique",
            status: "upcoming",
            priorityNotions: ["Hypothèse vérifiable"],
            sequenceSlugs: ["sc-di-formuler-hypothese"],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "emc",
    title: "EMC",
    place: { slug: "cour-des-explorateurs", label: "La Cour des Explorateurs" },
    guides: [{ id: "felix", name: "Félix le Lynx", role: "Guide méthodologique CM2" }],
    status: "upcoming",
    domains: [
      {
        id: "emc-expression",
        title: "Débattre, coopérer, s'engager",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-expression-argumentation",
            title: "Expression et argumentation",
            status: "upcoming",
            priorityNotions: ["Argument"],
            sequenceSlugs: ["emc-argumenter-point-de-vue"],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "anglais",
    title: "Anglais",
    place: { slug: "voyage-decouverte", label: "Le Voyage Découverte" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide méthodologique CM2" },
      { id: "rosa", name: "Rosa le Flamant rose", role: "Repère Anglais" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "anglais-oral",
        title: "Comprendre et s'exprimer",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-oral-quotidien",
            title: "Situations du quotidien",
            status: "upcoming",
            priorityNotions: [],
            sequenceSlugs: [],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "arts",
    title: "Arts",
    place: { slug: "salle-arts", label: "La Salle d'Arts" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide méthodologique CM2" },
      { id: "pablo", name: "Pablo l'Orang-outan", role: "Repère Arts" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "arts-observer-produire",
        title: "Observer, expérimenter, produire",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-intention",
            title: "Intention artistique",
            status: "upcoming",
            priorityNotions: [],
            sequenceSlugs: [],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "eps",
    title: "EPS",
    place: { slug: "gymnase", label: "Le Gymnase" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide méthodologique CM2" },
      { id: "max", name: "Max le Kangourou", role: "Repère EPS" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "eps-cooperation-performance",
        title: "Coopérer, performer, s'exprimer",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-regles-roles",
            title: "Règles et rôles",
            status: "upcoming",
            priorityNotions: [],
            sequenceSlugs: [],
          },
        ],
      },
    ],
  },
];

export function getCm2SubjectTree(subjectSlug: string): Cm2SubjectNode | undefined {
  return cm2LearningTree.find((subject) => subject.subjectSlug === subjectSlug);
}

export function getCm2DomainById(
  subjectSlug: string,
  domainId: string,
): Cm2DomainNode | undefined {
  return getCm2SubjectTree(subjectSlug)?.domains.find((domain) => domain.id === domainId);
}

export function getCm2SubdomainById(
  subjectSlug: string,
  domainId: string,
  subdomainId: string,
): Cm2SubdomainNode | undefined {
  return getCm2DomainById(subjectSlug, domainId)?.subdomains.find(
    (subdomain) => subdomain.id === subdomainId,
  );
}

export type Cm2LessonPath = {
  subjectSlug: string;
  domainId: string;
  subdomainId: string;
  lessonId: string;
};

export function getAllCm2LessonPaths(): Cm2LessonPath[] {
  return [];
}

export function getCm2LessonByRouteSlug(): undefined {
  return undefined;
}

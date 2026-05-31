// Modèle opérationnel CM2 — source pour les pages /matieres/[slug] et plus.
// Arbre pédagogique CM2 : Matière → Domaine → Sous-domaine → Séquence-compétence.
// Les nœuds "lessons" du modèle existant représentent ici des séquences-compétences,
// sans contenu de séance détaillé ni ressource PDF fictive.

// ── Types ─────────────────────────────────────────────────────────────────────

// Sémantique de Cm2LearningStatus par niveau de nœud :
//   "available"   — au niveau séquence : contenu réel dans cm2-lesson-content.ts + routeSlug actif.
//                   au niveau domaine/sous-domaine : au moins 1 séquence "available" à l'intérieur.
//   "in-progress" — structure définie, séquences planifiées, aucune séquence "available".
//   "upcoming"    — structure prévue, aucun contenu réel, aucune séquence planifiée.
export type Cm2LearningStatus = "available" | "in-progress" | "upcoming";

export type Cm2GuideReference = {
  id: "felix" | "chouette" | "hector" | "melina" | "max" | "naia" | "pablo" | "rosa";
  name: string;
  role?: string;
};

export type Cm2PedagogicalPlaceReference = {
  slug: string;   // slug de pedagogical-places.ts
  label: string;
  zone?: string;  // zone précise dans le lieu (ex. "Rayonnage des indices")
};

export type Cm2LessonResource = {
  type: "lesson" | "exercise" | "evaluation";
  slug?: string;  // défini uniquement si la route page existe
  label: string;
  status: Cm2LearningStatus;
};

export type Cm2LessonNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm2LearningStatus;
  /** When defined, this lesson has a routed page at `…/[lessonId]` using this slug. */
  routeSlug?: string;
  resources: Cm2LessonResource[];
  linkedMissionSlugs?: string[];
};

export type Cm2SubdomainNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm2LearningStatus;
  place?: Cm2PedagogicalPlaceReference;
  lessons: Cm2LessonNode[];
};

export type Cm2DomainNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm2LearningStatus;
  place?: Cm2PedagogicalPlaceReference;
  subdomains: Cm2SubdomainNode[];
  linkedMissionSlugs?: string[];
};

export type Cm2SubjectNode = {
  subjectSlug: string;  // matches content/cm2-subjects.ts slug
  title: string;
  place: Cm2PedagogicalPlaceReference;
  guides: Cm2GuideReference[];
  status: Cm2LearningStatus;
  domains: Cm2DomainNode[];
};

export type Cm2LearningTree = Cm2SubjectNode[];

type SequenceOptions = {
  status?: Cm2LearningStatus;
  routeSlug?: string;
  linkedMissionSlugs?: string[];
};

function sequenceResources(status: Cm2LearningStatus): Cm2LessonResource[] {
  return [
    { type: "lesson", label: "Leçon", status },
    { type: "exercise", label: "Exercices", status: "upcoming" },
    { type: "evaluation", label: "Évaluation", status: "upcoming" },
  ];
}

function sequence(
  id: string,
  title: string,
  options: SequenceOptions = {},
): Cm2LessonNode {
  const status = options.status ?? "upcoming";

  return {
    id,
    title,
    status,
    ...(options.routeSlug ? { routeSlug: options.routeSlug } : {}),
    resources: sequenceResources(status),
    ...(options.linkedMissionSlugs
      ? { linkedMissionSlugs: options.linkedMissionSlugs }
      : {}),
  };
}

// ── Données ───────────────────────────────────────────────────────────────────

export const cm2LearningTree: Cm2LearningTree = [
  // ── Français ────────────────────────────────────────────────────────────────
  {
    subjectSlug: "francais",
    title: "Français",
    place: { slug: "bibliotheque-des-explorateurs", label: "La Bibliothèque des Explorateurs" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide CM2" },
      { id: "chouette", name: "Chouette", role: "Guide Français" },
    ],
    status: "available",
    domains: [
      {
        id: "francais-lecture",
        title: "Lecture et compréhension",
        status: "available",
        place: {
          slug: "bibliotheque-des-explorateurs",
          label: "La Bibliothèque des Explorateurs",
          zone: "Rayonnage des indices",
        },
        linkedMissionSlugs: ["mission-inference", "lecture-strategique"],
        subdomains: [
          {
            id: "francais-lecture-inferences",
            title: "Inférences",
            status: "available",
            lessons: [
              sequence("francais-lecture-inferences-reperer", "Repérer les indices dans le texte", {
                status: "available",
                routeSlug: "reperer-les-indices",
                linkedMissionSlugs: ["mission-inference"],
              }),
              sequence(
                "francais-lecture-inferences-explicite-implicite",
                "Distinguer une information explicite et une information implicite",
                {
                  status: "available",
                  routeSlug: "explicite-implicite",
                  linkedMissionSlugs: ["mission-inference"],
                },
              ),
              sequence("francais-lecture-inferences-justifier", "Justifier son interprétation", {
                status: "available",
                routeSlug: "justifier-son-interpretation",
              }),
            ],
          },
          {
            id: "francais-lecture-comprehension-globale",
            title: "Compréhension globale",
            status: "upcoming",
            lessons: [
              sequence("francais-lecture-comprehension-idee-principale", "Identifier l'idée principale d'un texte"),
              sequence("francais-lecture-comprehension-ordre-evenements", "Reconstituer l'ordre des événements d'un récit"),
              sequence("francais-lecture-comprehension-resumer", "Résumer un texte court avec ses informations essentielles"),
            ],
          },
          {
            id: "francais-lecture-interpretation",
            title: "Interprétation",
            status: "upcoming",
            lessons: [
              sequence("francais-lecture-interpretation-personnage", "Interpréter les intentions d'un personnage"),
              sequence("francais-lecture-interpretation-point-vue", "Identifier le point de vue du narrateur"),
            ],
          },
        ],
      },
      {
        id: "francais-ecriture",
        title: "Écriture",
        status: "in-progress",
        place: {
          slug: "bibliotheque-des-explorateurs",
          label: "La Bibliothèque des Explorateurs",
          zone: "Table des carnets",
        },
        linkedMissionSlugs: ["production-ecrit"],
        subdomains: [
          {
            id: "francais-ecriture-planifier",
            title: "Planifier son écrit",
            status: "upcoming",
            lessons: [
              sequence("francais-ecriture-planifier-idees", "Sélectionner les idées utiles avant d'écrire", {
                linkedMissionSlugs: ["production-ecrit"],
              }),
              sequence("francais-ecriture-planifier-plan", "Organiser ses idées dans un plan simple"),
            ],
          },
          {
            id: "francais-ecriture-rediger",
            title: "Rédiger et améliorer",
            status: "upcoming",
            lessons: [
              sequence("francais-ecriture-rediger-paragraphe", "Rédiger un paragraphe cohérent"),
              sequence("francais-ecriture-rediger-connecteurs", "Utiliser des connecteurs pour organiser un texte"),
              sequence("francais-ecriture-rediger-reviser", "Relire un texte pour l'améliorer"),
            ],
          },
        ],
      },
      {
        id: "francais-grammaire",
        title: "Grammaire",
        status: "in-progress",
        linkedMissionSlugs: ["enquete-grammaticale"],
        subdomains: [
          {
            id: "francais-grammaire-phrase",
            title: "Phrase et fonctions",
            status: "upcoming",
            lessons: [
              sequence("francais-grammaire-phrase-sujet-predicat", "Identifier le sujet et le prédicat", {
                linkedMissionSlugs: ["enquete-grammaticale"],
              }),
              sequence("francais-grammaire-phrase-complements", "Distinguer les compléments de phrase et de verbe"),
              sequence("francais-grammaire-phrase-types", "Reconnaître les types et formes de phrases"),
            ],
          },
          {
            id: "francais-grammaire-classes",
            title: "Classes de mots",
            status: "upcoming",
            lessons: [
              sequence("francais-grammaire-classes-noms-determinants", "Identifier les noms et les déterminants"),
              sequence("francais-grammaire-classes-adjectifs", "Identifier les adjectifs qualificatifs"),
              sequence("francais-grammaire-classes-pronoms", "Identifier les pronoms personnels"),
            ],
          },
        ],
      },
      {
        id: "francais-orthographe",
        title: "Orthographe",
        status: "in-progress",
        subdomains: [
          {
            id: "francais-orthographe-accords",
            title: "Accords",
            status: "upcoming",
            lessons: [
              sequence("francais-orthographe-accords-gn", "Accorder les mots dans le groupe nominal"),
              sequence("francais-orthographe-accords-sujet-verbe", "Accorder le verbe avec son sujet"),
              sequence("francais-orthographe-accords-participe", "Accorder le participe passé employé avec être"),
            ],
          },
          {
            id: "francais-orthographe-homophones",
            title: "Homophones grammaticaux",
            status: "upcoming",
            lessons: [
              sequence("francais-orthographe-homophones-a-as", "Distinguer a et à"),
              sequence("francais-orthographe-homophones-et-est", "Distinguer et et est"),
              sequence("francais-orthographe-homophones-son-sont", "Distinguer son et sont"),
            ],
          },
        ],
      },
      {
        id: "francais-lexique",
        title: "Lexique",
        status: "upcoming",
        subdomains: [
          {
            id: "francais-lexique-relations",
            title: "Relations entre les mots",
            status: "upcoming",
            lessons: [
              sequence("francais-lexique-relations-familles", "Regrouper des mots par familles"),
              sequence("francais-lexique-relations-synonymes", "Utiliser des synonymes pour enrichir un texte"),
              sequence("francais-lexique-relations-antonymes", "Identifier des antonymes"),
            ],
          },
          {
            id: "francais-lexique-sens",
            title: "Sens des mots",
            status: "upcoming",
            lessons: [
              sequence("francais-lexique-sens-contexte", "Déduire le sens d'un mot grâce au contexte"),
              sequence("francais-lexique-sens-polysémie", "Distinguer les différents sens d'un mot"),
            ],
          },
        ],
      },
      {
        id: "francais-oral",
        title: "Oral",
        status: "upcoming",
        subdomains: [
          {
            id: "francais-oral-ecouter",
            title: "Écouter et comprendre",
            status: "upcoming",
            lessons: [
              sequence("francais-oral-ecouter-consigne", "Reformuler une consigne orale"),
              sequence("francais-oral-ecouter-informations", "Prélever des informations dans un exposé oral"),
            ],
          },
          {
            id: "francais-oral-prendre-parole",
            title: "Prendre la parole",
            status: "upcoming",
            lessons: [
              sequence("francais-oral-prendre-parole-expose", "Présenter un exposé court"),
              sequence("francais-oral-prendre-parole-argument", "Exprimer un avis argumenté"),
            ],
          },
        ],
      },
    ],
  },

  // ── Mathématiques ────────────────────────────────────────────────────────────
  {
    subjectSlug: "mathematiques",
    title: "Mathématiques",
    place: { slug: "atelier-des-mathematiques", label: "L'Atelier des Mathématiques" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide CM2" },
      { id: "hector", name: "Hector le Castor", role: "Guide Mathématiques" },
    ],
    status: "in-progress",
    domains: [
      {
        id: "maths-nombres-calculs",
        title: "Nombres et calculs",
        status: "in-progress",
        place: {
          slug: "atelier-des-mathematiques",
          label: "L'Atelier des Mathématiques",
          zone: "Table des manipulations",
        },
        linkedMissionSlugs: ["mission-calcul"],
        subdomains: [
          {
            id: "maths-nombres-entiers-decimaux",
            title: "Nombres entiers et décimaux",
            status: "upcoming",
            lessons: [
              sequence("maths-nombres-entiers-decimaux-lire", "Lire et écrire des grands nombres"),
              sequence("maths-nombres-entiers-decimaux-comparer", "Comparer et ranger des nombres décimaux"),
              sequence("maths-nombres-entiers-decimaux-decomposer", "Décomposer un nombre décimal"),
            ],
          },
          {
            id: "maths-nombres-fractions",
            title: "Fractions",
            status: "upcoming",
            lessons: [
              sequence("maths-nombres-fractions-lire", "Lire et écrire une fraction"),
              sequence("maths-nombres-fractions-reperer", "Placer une fraction sur une droite graduée"),
              sequence("maths-nombres-fractions-comparer", "Comparer des fractions simples"),
            ],
          },
          {
            id: "maths-calcul-strategies",
            title: "Calcul mental et posé",
            status: "in-progress",
            lessons: [
              sequence("maths-calcul-strategies-mental", "Choisir une stratégie de calcul mental", {
                linkedMissionSlugs: ["mission-calcul"],
              }),
              sequence("maths-calcul-strategies-multiplication", "Poser et calculer une multiplication"),
              sequence("maths-calcul-strategies-division", "Poser et calculer une division euclidienne"),
            ],
          },
        ],
      },
      {
        id: "maths-problemes",
        title: "Problèmes",
        status: "in-progress",
        place: {
          slug: "atelier-des-mathematiques",
          label: "L'Atelier des Mathématiques",
          zone: "Mur des stratégies",
        },
        linkedMissionSlugs: ["defis-mathematiques"],
        subdomains: [
          {
            id: "maths-problemes-comprendre",
            title: "Comprendre une situation",
            status: "upcoming",
            lessons: [
              sequence("maths-problemes-comprendre-donnees", "Identifier les données utiles", {
                linkedMissionSlugs: ["defis-mathematiques"],
              }),
              sequence("maths-problemes-comprendre-question", "Reformuler la question d'un problème"),
              sequence("maths-problemes-comprendre-schema", "Représenter une situation par un schéma"),
            ],
          },
          {
            id: "maths-problemes-resoudre",
            title: "Résoudre et vérifier",
            status: "upcoming",
            lessons: [
              sequence("maths-problemes-resoudre-operation", "Choisir l'opération adaptée à une situation"),
              sequence("maths-problemes-resoudre-etapes", "Résoudre un problème à plusieurs étapes"),
              sequence("maths-problemes-resoudre-verifier", "Vérifier la vraisemblance d'un résultat"),
            ],
          },
        ],
      },
      {
        id: "maths-grandeurs-mesures",
        title: "Grandeurs et mesures",
        status: "upcoming",
        subdomains: [
          {
            id: "maths-grandeurs-longueurs-masses-contenances",
            title: "Longueurs, masses et contenances",
            status: "upcoming",
            lessons: [
              sequence("maths-grandeurs-convertir-longueurs", "Convertir des longueurs"),
              sequence("maths-grandeurs-convertir-masses", "Convertir des masses"),
              sequence("maths-grandeurs-convertir-contenances", "Convertir des contenances"),
            ],
          },
          {
            id: "maths-grandeurs-durees",
            title: "Durées",
            status: "upcoming",
            lessons: [
              sequence("maths-grandeurs-durees-lire-horaire", "Lire un horaire"),
              sequence("maths-grandeurs-durees-calculer", "Calculer une durée"),
            ],
          },
          {
            id: "maths-grandeurs-aires-perimetres",
            title: "Aires et périmètres",
            status: "upcoming",
            lessons: [
              sequence("maths-grandeurs-perimetres-polygone", "Calculer le périmètre d'un polygone"),
              sequence("maths-grandeurs-aires-rectangle", "Calculer l'aire d'un carré ou d'un rectangle"),
            ],
          },
        ],
      },
      {
        id: "maths-espace-geometrie",
        title: "Espace et géométrie",
        status: "upcoming",
        subdomains: [
          {
            id: "maths-geometrie-figures",
            title: "Figures planes",
            status: "upcoming",
            lessons: [
              sequence("maths-geometrie-figures-triangles", "Reconnaître et tracer des triangles"),
              sequence("maths-geometrie-figures-quadrilateres", "Reconnaître et tracer des quadrilatères"),
              sequence("maths-geometrie-figures-cercles", "Tracer un cercle avec un compas"),
            ],
          },
          {
            id: "maths-geometrie-solides",
            title: "Solides",
            status: "upcoming",
            lessons: [
              sequence("maths-geometrie-solides-reconnaitre", "Reconnaître les principaux solides"),
              sequence("maths-geometrie-solides-patron", "Associer un solide à son patron"),
            ],
          },
          {
            id: "maths-geometrie-symetrie",
            title: "Symétrie",
            status: "upcoming",
            lessons: [
              sequence("maths-geometrie-symetrie-axe", "Identifier un axe de symétrie"),
              sequence("maths-geometrie-symetrie-construire", "Construire le symétrique d'une figure"),
            ],
          },
        ],
      },
      {
        id: "maths-donnees",
        title: "Organisation et gestion de données",
        status: "upcoming",
        subdomains: [
          {
            id: "maths-donnees-tableaux",
            title: "Tableaux",
            status: "upcoming",
            lessons: [
              sequence("maths-donnees-tableaux-lire", "Lire un tableau de données"),
              sequence("maths-donnees-tableaux-completer", "Compléter un tableau de données"),
            ],
          },
          {
            id: "maths-donnees-graphiques",
            title: "Graphiques",
            status: "upcoming",
            lessons: [
              sequence("maths-donnees-graphiques-lire", "Lire un graphique simple"),
              sequence("maths-donnees-graphiques-produire", "Construire un graphique à partir d'un tableau"),
            ],
          },
        ],
      },
    ],
  },

  // ── Histoire-Géographie ──────────────────────────────────────────────────────
  {
    subjectSlug: "histoire-geographie",
    title: "Histoire-Géographie",
    place: { slug: "cartotheque-des-lisieres", label: "La Cartothèque des Lisières" },
    guides: [{ id: "felix", name: "Félix le Lynx", role: "Guide CM2" }],
    status: "in-progress",
    domains: [
      {
        id: "histoire-reperes-historiques",
        title: "Repères historiques",
        status: "in-progress",
        linkedMissionSlugs: ["archives-historiques"],
        subdomains: [
          {
            id: "histoire-reperes-frise",
            title: "Se repérer dans le temps",
            status: "upcoming",
            lessons: [
              sequence("histoire-reperes-frise-situer", "Situer un événement sur une frise chronologique", {
                linkedMissionSlugs: ["archives-historiques"],
              }),
              sequence("histoire-reperes-frise-periodes", "Associer un événement à une grande période historique"),
            ],
          },
          {
            id: "histoire-reperes-documents",
            title: "Lire des documents historiques",
            status: "upcoming",
            lessons: [
              sequence("histoire-reperes-documents-nature", "Identifier la nature d'un document historique"),
              sequence("histoire-reperes-documents-informations", "Extraire une information historique d'un document"),
            ],
          },
        ],
      },
      {
        id: "histoire-temps-modernes",
        title: "Temps modernes",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-temps-modernes-decouvertes",
            title: "Découvertes et transformations",
            status: "upcoming",
            lessons: [
              sequence("histoire-temps-modernes-decouvertes-navigateurs", "Identifier le rôle des grands voyages maritimes"),
              sequence("histoire-temps-modernes-decouvertes-echanges", "Décrire les transformations des échanges au XVIe siècle"),
            ],
          },
          {
            id: "histoire-temps-modernes-monarchie",
            title: "Monarchie absolue",
            status: "upcoming",
            lessons: [
              sequence("histoire-temps-modernes-monarchie-louis-xiv", "Expliquer le pouvoir absolu de Louis XIV"),
              sequence("histoire-temps-modernes-monarchie-versailles", "Décrire le rôle politique de Versailles"),
            ],
          },
        ],
      },
      {
        id: "histoire-revolution-empire",
        title: "Révolution et Empire",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-revolution-1789",
            title: "La Révolution française",
            status: "upcoming",
            lessons: [
              sequence("histoire-revolution-1789-causes", "Identifier les causes de la Révolution française"),
              sequence("histoire-revolution-1789-droits", "Expliquer l'importance de la Déclaration des droits de l'homme et du citoyen"),
              sequence("histoire-revolution-1789-republique", "Situer la naissance de la Première République"),
            ],
          },
          {
            id: "histoire-empire-napoleon",
            title: "L'Empire napoléonien",
            status: "upcoming",
            lessons: [
              sequence("histoire-empire-napoleon-pouvoir", "Décrire l'arrivée au pouvoir de Napoléon Bonaparte"),
              sequence("histoire-empire-napoleon-heritages", "Identifier des héritages de la période napoléonienne"),
            ],
          },
        ],
      },
      {
        id: "histoire-xixe-siecle",
        title: "XIXe siècle",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-xixe-industrialisation",
            title: "Industrialisation",
            status: "upcoming",
            lessons: [
              sequence("histoire-xixe-industrialisation-usine", "Décrire les transformations liées à l'industrialisation"),
              sequence("histoire-xixe-industrialisation-vie-ouvriere", "Identifier les conditions de vie des ouvriers au XIXe siècle"),
            ],
          },
          {
            id: "histoire-xixe-republique",
            title: "Installation de la République",
            status: "upcoming",
            lessons: [
              sequence("histoire-xixe-republique-symboles", "Reconnaître les symboles de la République"),
              sequence("histoire-xixe-republique-ecole", "Expliquer le rôle de l'école républicaine"),
            ],
          },
        ],
      },
      {
        id: "histoire-xxe-siecle",
        title: "XXe siècle",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-xxe-guerres",
            title: "Guerres mondiales",
            status: "upcoming",
            lessons: [
              sequence("histoire-xxe-guerres-premiere", "Identifier les caractéristiques de la Première Guerre mondiale"),
              sequence("histoire-xxe-guerres-seconde", "Identifier les caractéristiques de la Seconde Guerre mondiale"),
            ],
          },
          {
            id: "histoire-xxe-societe",
            title: "Société contemporaine",
            status: "upcoming",
            lessons: [
              sequence("histoire-xxe-societe-droits", "Repérer des avancées sociales du XXe siècle"),
              sequence("histoire-xxe-societe-europe", "Situer la construction européenne après 1945"),
            ],
          },
        ],
      },
      {
        id: "geographie-se-deplacer",
        title: "Se déplacer",
        status: "in-progress",
        place: {
          slug: "cartotheque-des-lisieres",
          label: "La Cartothèque des Lisières",
          zone: "Mur des cartes",
        },
        linkedMissionSlugs: ["cartographe-du-monde"],
        subdomains: [
          {
            id: "geographie-se-deplacer-quotidien",
            title: "Déplacements quotidiens",
            status: "upcoming",
            lessons: [
              sequence("geographie-se-deplacer-quotidien-modes", "Comparer des modes de déplacement quotidiens", {
                linkedMissionSlugs: ["cartographe-du-monde"],
              }),
              sequence("geographie-se-deplacer-quotidien-contraintes", "Identifier les contraintes d'un trajet quotidien"),
            ],
          },
          {
            id: "geographie-se-deplacer-monde",
            title: "Déplacements dans le monde",
            status: "upcoming",
            lessons: [
              sequence("geographie-se-deplacer-monde-reseaux", "Décrire un réseau de transport"),
              sequence("geographie-se-deplacer-monde-impacts", "Identifier les impacts environnementaux des transports"),
            ],
          },
        ],
      },
      {
        id: "geographie-internet",
        title: "Communiquer grâce à Internet",
        status: "upcoming",
        subdomains: [
          {
            id: "geographie-internet-reseaux",
            title: "Réseaux et usages",
            status: "upcoming",
            lessons: [
              sequence("geographie-internet-reseaux-localiser", "Localiser les infrastructures nécessaires à Internet"),
              sequence("geographie-internet-reseaux-usages", "Décrire des usages d'Internet dans le quotidien"),
            ],
          },
          {
            id: "geographie-internet-inegalites",
            title: "Inégalités d'accès",
            status: "upcoming",
            lessons: [
              sequence("geographie-internet-inegalites-france", "Identifier des inégalités d'accès au numérique en France"),
              sequence("geographie-internet-inegalites-monde", "Comparer l'accès à Internet dans différents espaces du monde"),
            ],
          },
        ],
      },
      {
        id: "geographie-mieux-habiter",
        title: "Mieux habiter",
        status: "upcoming",
        subdomains: [
          {
            id: "geographie-mieux-habiter-ville",
            title: "Aménager les espaces de vie",
            status: "upcoming",
            lessons: [
              sequence("geographie-mieux-habiter-ville-amenagement", "Identifier un aménagement qui améliore le cadre de vie"),
              sequence("geographie-mieux-habiter-ville-nature", "Décrire la place de la nature en ville"),
            ],
          },
          {
            id: "geographie-mieux-habiter-durable",
            title: "Habiter durablement",
            status: "upcoming",
            lessons: [
              sequence("geographie-mieux-habiter-durable-dechets", "Expliquer une action de réduction des déchets"),
              sequence("geographie-mieux-habiter-durable-energie", "Identifier des gestes pour économiser l'énergie"),
            ],
          },
        ],
      },
      {
        id: "geographie-cartes",
        title: "Lire et produire des cartes",
        status: "upcoming",
        subdomains: [
          {
            id: "geographie-cartes-lire",
            title: "Lire une carte",
            status: "upcoming",
            lessons: [
              sequence("geographie-cartes-lire-titre-legende", "Utiliser le titre et la légende d'une carte"),
              sequence("geographie-cartes-lire-orientation", "Se repérer avec les points cardinaux"),
            ],
          },
          {
            id: "geographie-cartes-produire",
            title: "Produire une carte simple",
            status: "upcoming",
            lessons: [
              sequence("geographie-cartes-produire-legende", "Construire une légende organisée"),
              sequence("geographie-cartes-produire-croquis", "Réaliser un croquis géographique simple"),
            ],
          },
        ],
      },
    ],
  },

  // ── Sciences et technologie ──────────────────────────────────────────────────
  {
    subjectSlug: "sciences",
    title: "Sciences et technologie",
    place: { slug: "laboratoire", label: "Le Laboratoire" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide CM2" },
      { id: "melina", name: "Mélina l'Abeille", role: "Guide Sciences" },
    ],
    status: "in-progress",
    domains: [
      {
        id: "sciences-matiere-mouvement-energie-information",
        title: "Matière, mouvement, énergie, information",
        status: "in-progress",
        place: { slug: "laboratoire", label: "Le Laboratoire", zone: "Paillasses d'essai" },
        linkedMissionSlugs: ["laboratoire-scientifique"],
        subdomains: [
          {
            id: "sciences-matiere-etats",
            title: "États et transformations de la matière",
            status: "upcoming",
            lessons: [
              sequence("sciences-matiere-etats-distinguer", "Distinguer les états solide, liquide et gazeux", {
                linkedMissionSlugs: ["laboratoire-scientifique"],
              }),
              sequence("sciences-matiere-etats-changement", "Identifier un changement d'état"),
            ],
          },
          {
            id: "sciences-energie-mouvement",
            title: "Énergie et mouvement",
            status: "upcoming",
            lessons: [
              sequence("sciences-energie-mouvement-sources", "Identifier différentes sources d'énergie"),
              sequence("sciences-energie-mouvement-effets", "Décrire les effets d'une force sur un mouvement"),
            ],
          },
          {
            id: "sciences-information-signaux",
            title: "Information et signaux",
            status: "upcoming",
            lessons: [
              sequence("sciences-information-signaux-transmettre", "Identifier un signal qui transmet une information"),
              sequence("sciences-information-signaux-coder", "Coder une information simple"),
            ],
          },
        ],
      },
      {
        id: "sciences-vivant",
        title: "Le vivant",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-vivant-classer",
            title: "Classer le vivant",
            status: "upcoming",
            lessons: [
              sequence("sciences-vivant-classer-criteres", "Classer des êtres vivants selon des critères observables"),
              sequence("sciences-vivant-classer-liens", "Identifier des liens de parenté entre êtres vivants"),
            ],
          },
          {
            id: "sciences-vivant-fonctions",
            title: "Fonctions du vivant",
            status: "upcoming",
            lessons: [
              sequence("sciences-vivant-fonctions-besoins", "Identifier les besoins d'un être vivant"),
              sequence("sciences-vivant-fonctions-reproduction", "Décrire une étape de reproduction d'un être vivant"),
            ],
          },
        ],
      },
      {
        id: "sciences-materiaux-objets-techniques",
        title: "Matériaux et objets techniques",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-materiaux-proprietes",
            title: "Propriétés des matériaux",
            status: "upcoming",
            lessons: [
              sequence("sciences-materiaux-proprietes-classer", "Classer des matériaux selon leurs propriétés"),
              sequence("sciences-materiaux-proprietes-choisir", "Choisir un matériau selon un usage"),
            ],
          },
          {
            id: "sciences-objets-techniques-fonctionnement",
            title: "Objets techniques",
            status: "upcoming",
            lessons: [
              sequence("sciences-objets-techniques-fonction", "Identifier la fonction d'un objet technique"),
              sequence("sciences-objets-techniques-schema", "Représenter un objet technique par un schéma simple"),
            ],
          },
        ],
      },
      {
        id: "sciences-terre-environnement",
        title: "La planète Terre et l’environnement",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-terre-phenomenes",
            title: "Phénomènes terrestres",
            status: "upcoming",
            lessons: [
              sequence("sciences-terre-phenomenes-cycle-eau", "Décrire le cycle de l'eau"),
              sequence("sciences-terre-phenomenes-meteo", "Distinguer météo et climat"),
            ],
          },
          {
            id: "sciences-environnement-ecosystemes",
            title: "Écosystèmes et environnement",
            status: "upcoming",
            lessons: [
              sequence("sciences-environnement-ecosystemes-chaine", "Identifier les niveaux d'une chaîne alimentaire"),
              sequence("sciences-environnement-ecosystemes-impact", "Décrire un impact humain sur un milieu naturel"),
            ],
          },
        ],
      },
    ],
  },

  // ── EMC ─────────────────────────────────────────────────────────────────────
  {
    subjectSlug: "emc",
    title: "EMC",
    place: { slug: "cour-des-explorateurs", label: "La Cour des Explorateurs" },
    guides: [{ id: "felix", name: "Félix le Lynx", role: "Guide CM2" }],
    status: "upcoming",
    domains: [
      {
        id: "emc-respecter-autrui",
        title: "Respecter autrui",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-respecter-autrui-differences",
            title: "Respect des différences",
            status: "upcoming",
            lessons: [
              sequence("emc-respecter-autrui-differences-reconnaitre", "Reconnaître et respecter les différences"),
              sequence("emc-respecter-autrui-differences-discrimination", "Identifier une situation de discrimination"),
            ],
          },
          {
            id: "emc-respecter-autrui-relations",
            title: "Relations aux autres",
            status: "upcoming",
            lessons: [
              sequence("emc-respecter-autrui-relations-ecouter", "Écouter un point de vue différent"),
              sequence("emc-respecter-autrui-relations-consentement", "Expliquer le respect du consentement"),
            ],
          },
        ],
      },
      {
        id: "emc-valeurs-republique",
        title: "Acquérir et partager les valeurs de la République",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-valeurs-republique-symboles",
            title: "Symboles et principes",
            status: "upcoming",
            lessons: [
              sequence("emc-valeurs-republique-symboles-devise", "Expliquer le sens de la devise républicaine"),
              sequence("emc-valeurs-republique-symboles-laicite", "Définir le principe de laïcité"),
            ],
          },
          {
            id: "emc-valeurs-republique-droits",
            title: "Droits et devoirs",
            status: "upcoming",
            lessons: [
              sequence("emc-valeurs-republique-droits-enfant", "Identifier les droits fondamentaux de l'enfant"),
              sequence("emc-valeurs-republique-droits-devoirs", "Associer un droit à un devoir"),
            ],
          },
        ],
      },
      {
        id: "emc-culture-civique",
        title: "Construire une culture civique",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-culture-civique-democratie",
            title: "Vie démocratique",
            status: "upcoming",
            lessons: [
              sequence("emc-culture-civique-democratie-vote", "Comprendre le rôle du vote"),
              sequence("emc-culture-civique-democratie-representation", "Identifier le rôle d'un représentant élu"),
            ],
          },
          {
            id: "emc-culture-civique-information",
            title: "Information et esprit critique",
            status: "upcoming",
            lessons: [
              sequence("emc-culture-civique-information-source", "Identifier la source d'une information"),
              sequence("emc-culture-civique-information-rumeur", "Distinguer une information vérifiée d'une rumeur"),
            ],
          },
        ],
      },
      {
        id: "emc-debattre-cooperer-engager",
        title: "Débattre, coopérer, s'engager",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-debattre-cooperer-engager-debat",
            title: "Débat réglé",
            status: "upcoming",
            lessons: [
              sequence("emc-debattre-cooperer-engager-debat-argument", "Formuler un argument dans un débat"),
              sequence("emc-debattre-cooperer-engager-debat-regles", "Respecter les règles d'un débat"),
            ],
          },
          {
            id: "emc-debattre-cooperer-engager-projet",
            title: "Projet collectif",
            status: "upcoming",
            lessons: [
              sequence("emc-debattre-cooperer-engager-projet-role", "Tenir un rôle dans un projet collectif"),
              sequence("emc-debattre-cooperer-engager-projet-bilan", "Faire le bilan d'une action collective"),
            ],
          },
        ],
      },
    ],
  },

  // ── Anglais ─────────────────────────────────────────────────────────────────
  {
    subjectSlug: "anglais",
    title: "Anglais",
    place: { slug: "voyage-decouverte", label: "Le Voyage Découverte" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide CM2" },
      { id: "rosa", name: "Rosa le Flamant rose", role: "Guide Anglais" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "anglais-se-presenter",
        title: "Se présenter",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-se-presenter-identite",
            title: "Identité",
            status: "upcoming",
            lessons: [
              sequence("anglais-se-presenter-identite-nom-age", "Dire son nom et son âge"),
              sequence("anglais-se-presenter-identite-gouts", "Exprimer ses goûts simplement"),
            ],
          },
          {
            id: "anglais-se-presenter-echanger",
            title: "Échange bref",
            status: "upcoming",
            lessons: [
              sequence("anglais-se-presenter-echanger-question", "Poser une question personnelle simple"),
              sequence("anglais-se-presenter-echanger-reponse", "Répondre à une question personnelle simple"),
            ],
          },
        ],
      },
      {
        id: "anglais-consignes-simples",
        title: "Comprendre des consignes simples",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-consignes-classe",
            title: "Consignes de classe",
            status: "upcoming",
            lessons: [
              sequence("anglais-consignes-classe-comprendre", "Comprendre une consigne de classe courante"),
              sequence("anglais-consignes-classe-reagir", "Réagir physiquement à une consigne orale"),
            ],
          },
          {
            id: "anglais-consignes-actions",
            title: "Actions simples",
            status: "upcoming",
            lessons: [
              sequence("anglais-consignes-actions-verbes", "Associer un verbe d'action à un geste"),
              sequence("anglais-consignes-actions-enchainement", "Comprendre une consigne en deux étapes"),
            ],
          },
        ],
      },
      {
        id: "anglais-quotidien",
        title: "Parler de son quotidien",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-quotidien-journee",
            title: "Rythmes de la journée",
            status: "upcoming",
            lessons: [
              sequence("anglais-quotidien-journee-routine", "Décrire une routine quotidienne simple"),
              sequence("anglais-quotidien-journee-heure", "Dire une heure simple"),
            ],
          },
          {
            id: "anglais-quotidien-environnement",
            title: "Environnement proche",
            status: "upcoming",
            lessons: [
              sequence("anglais-quotidien-environnement-famille", "Présenter les membres de sa famille"),
              sequence("anglais-quotidien-environnement-ecole", "Nommer des objets de la classe"),
            ],
          },
        ],
      },
      {
        id: "anglais-culture",
        title: "Découvrir des éléments culturels",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-culture-pays",
            title: "Pays anglophones",
            status: "upcoming",
            lessons: [
              sequence("anglais-culture-pays-localiser", "Localiser quelques pays anglophones"),
              sequence("anglais-culture-pays-symboles", "Associer un symbole culturel à un pays anglophone"),
            ],
          },
          {
            id: "anglais-culture-fetes",
            title: "Fêtes et traditions",
            status: "upcoming",
            lessons: [
              sequence("anglais-culture-fetes-identifier", "Identifier une fête anglophone"),
              sequence("anglais-culture-fetes-comparer", "Comparer une tradition anglophone avec une tradition connue"),
            ],
          },
        ],
      },
    ],
  },

  // ── Arts ─────────────────────────────────────────────────────────────────────
  {
    subjectSlug: "arts",
    title: "Arts",
    place: { slug: "salle-arts", label: "La Salle d'Arts" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide CM2" },
      { id: "pablo", name: "Pablo l'Orang-outan", role: "Guide Arts" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "arts-observer-oeuvre",
        title: "Observer une œuvre",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-observer-oeuvre-decrire",
            title: "Décrire",
            status: "upcoming",
            lessons: [
              sequence("arts-observer-oeuvre-decrire-elements", "Décrire les éléments visibles d'une œuvre"),
              sequence("arts-observer-oeuvre-decrire-composition", "Repérer l'organisation d'une image"),
            ],
          },
          {
            id: "arts-observer-oeuvre-interpreter",
            title: "Interpréter",
            status: "upcoming",
            lessons: [
              sequence("arts-observer-oeuvre-interpreter-effet", "Exprimer l'effet produit par une œuvre"),
              sequence("arts-observer-oeuvre-interpreter-intention", "Formuler une hypothèse sur l'intention de l'artiste"),
            ],
          },
        ],
      },
      {
        id: "arts-techniques",
        title: "Expérimenter des techniques",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-techniques-couleur",
            title: "Couleur et matière",
            status: "upcoming",
            lessons: [
              sequence("arts-techniques-couleur-melanger", "Expérimenter des mélanges de couleurs"),
              sequence("arts-techniques-couleur-texture", "Produire un effet de texture"),
            ],
          },
          {
            id: "arts-techniques-volume",
            title: "Volume et espace",
            status: "upcoming",
            lessons: [
              sequence("arts-techniques-volume-assembler", "Assembler des éléments pour créer un volume"),
              sequence("arts-techniques-volume-installer", "Organiser une production dans l'espace"),
            ],
          },
        ],
      },
      {
        id: "arts-produire-intention",
        title: "Produire avec une intention",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-produire-intention-choix",
            title: "Choix plastiques",
            status: "upcoming",
            lessons: [
              sequence("arts-produire-intention-choix-outils", "Choisir un outil selon l'effet recherché"),
              sequence("arts-produire-intention-choix-cadrage", "Choisir un cadrage pour renforcer une intention"),
            ],
          },
          {
            id: "arts-produire-intention-projet",
            title: "Projet personnel",
            status: "upcoming",
            lessons: [
              sequence("arts-produire-intention-projet-theme", "Traduire un thème en production plastique"),
              sequence("arts-produire-intention-projet-ajuster", "Ajuster sa production à son intention"),
            ],
          },
        ],
      },
      {
        id: "arts-presenter-production",
        title: "Présenter sa production",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-presenter-production-verbaliser",
            title: "Verbaliser",
            status: "upcoming",
            lessons: [
              sequence("arts-presenter-production-verbaliser-choix", "Expliquer ses choix plastiques"),
              sequence("arts-presenter-production-verbaliser-difficulte", "Décrire une difficulté rencontrée et une solution trouvée"),
            ],
          },
          {
            id: "arts-presenter-production-exposer",
            title: "Exposer",
            status: "upcoming",
            lessons: [
              sequence("arts-presenter-production-exposer-mettre-valeur", "Mettre en valeur une production"),
              sequence("arts-presenter-production-exposer-ecouter", "Écouter et prendre en compte un retour"),
            ],
          },
        ],
      },
    ],
  },

  // ── EPS ─────────────────────────────────────────────────────────────────────
  {
    subjectSlug: "eps",
    title: "EPS",
    place: { slug: "gymnase", label: "Le Gymnase" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide CM2" },
      { id: "max", name: "Max le Kangourou", role: "Guide EPS" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "eps-cooperer-opposer",
        title: "Coopérer et s'opposer",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-cooperer-opposer-jeux-collectifs",
            title: "Jeux collectifs",
            status: "upcoming",
            lessons: [
              sequence("eps-cooperer-opposer-jeux-collectifs-role", "Tenir un rôle dans une équipe"),
              sequence("eps-cooperer-opposer-jeux-collectifs-strategie", "Adapter une stratégie collective simple"),
            ],
          },
          {
            id: "eps-cooperer-opposer-duels",
            title: "Jeux d'opposition",
            status: "upcoming",
            lessons: [
              sequence("eps-cooperer-opposer-duels-regles", "Respecter les règles d'un duel sportif"),
              sequence("eps-cooperer-opposer-duels-adapter", "Adapter son action à celle de l'adversaire"),
            ],
          },
        ],
      },
      {
        id: "eps-performance",
        title: "Réaliser une performance",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-performance-course",
            title: "Course",
            status: "upcoming",
            lessons: [
              sequence("eps-performance-course-rythme", "Adapter son rythme de course"),
              sequence("eps-performance-course-mesurer", "Mesurer et comparer une performance"),
            ],
          },
          {
            id: "eps-performance-lancer-sauter",
            title: "Lancer et sauter",
            status: "upcoming",
            lessons: [
              sequence("eps-performance-lancer-sauter-geste", "Stabiliser un geste de lancer"),
              sequence("eps-performance-lancer-sauter-elan", "Utiliser un élan pour sauter"),
            ],
          },
        ],
      },
      {
        id: "eps-deplacements",
        title: "Adapter ses déplacements",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-deplacements-orientation",
            title: "Orientation",
            status: "upcoming",
            lessons: [
              sequence("eps-deplacements-orientation-plan", "Se déplacer à l'aide d'un plan"),
              sequence("eps-deplacements-orientation-reperes", "Choisir des repères pour s'orienter"),
            ],
          },
          {
            id: "eps-deplacements-milieu",
            title: "Milieux variés",
            status: "upcoming",
            lessons: [
              sequence("eps-deplacements-milieu-securite", "Adapter son déplacement aux règles de sécurité"),
              sequence("eps-deplacements-milieu-obstacles", "Franchir un obstacle de manière maîtrisée"),
            ],
          },
        ],
      },
      {
        id: "eps-expression-artistique-corporelle",
        title: "S'exprimer par une activité artistique ou corporelle",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-expression-danse",
            title: "Danse",
            status: "upcoming",
            lessons: [
              sequence("eps-expression-danse-enchainer", "Enchaîner plusieurs actions corporelles"),
              sequence("eps-expression-danse-intention", "Exprimer une intention par le mouvement"),
            ],
          },
          {
            id: "eps-expression-cirque",
            title: "Activités d'expression",
            status: "upcoming",
            lessons: [
              sequence("eps-expression-cirque-equilibre", "Construire une figure d'équilibre simple"),
              sequence("eps-expression-cirque-presenter", "Présenter une courte production corporelle"),
            ],
          },
        ],
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCm2SubjectTree(subjectSlug: string): Cm2SubjectNode | undefined {
  return cm2LearningTree.find((s) => s.subjectSlug === subjectSlug);
}

export function getCm2DomainById(
  subjectSlug: string,
  domainId: string,
): Cm2DomainNode | undefined {
  return getCm2SubjectTree(subjectSlug)?.domains.find((d) => d.id === domainId);
}

export function getCm2SubdomainById(
  subjectSlug: string,
  domainId: string,
  subdomainId: string,
): Cm2SubdomainNode | undefined {
  return getCm2DomainById(subjectSlug, domainId)?.subdomains.find(
    (s) => s.id === subdomainId,
  );
}

export function getCm2LessonById(
  subjectSlug: string,
  domainId: string,
  subdomainId: string,
  lessonId: string,
): Cm2LessonNode | undefined {
  return getCm2SubdomainById(subjectSlug, domainId, subdomainId)?.lessons.find(
    (l) => l.id === lessonId,
  );
}

export type Cm2LessonPath = {
  subjectSlug: string;
  domainId: string;
  subdomainId: string;
  lessonId: string;
};

export function getAllCm2LessonPaths(): Cm2LessonPath[] {
  const paths: Cm2LessonPath[] = [];
  for (const subject of cm2LearningTree) {
    for (const domain of subject.domains) {
      for (const subdomain of domain.subdomains) {
        for (const lesson of subdomain.lessons) {
          if (!lesson.routeSlug) continue;
          paths.push({
            subjectSlug: subject.subjectSlug,
            domainId: domain.id,
            subdomainId: subdomain.id,
            lessonId: lesson.routeSlug,
          });
        }
      }
    }
  }
  return paths;
}

export function getCm2LessonByRouteSlug(
  subjectSlug: string,
  domainId: string,
  subdomainId: string,
  routeSlug: string,
): Cm2LessonNode | undefined {
  const subject = cm2LearningTree.find((s) => s.subjectSlug === subjectSlug);
  if (!subject) return undefined;
  const domain = subject.domains.find((d) => d.id === domainId);
  if (!domain) return undefined;
  const subdomain = domain.subdomains.find((sd) => sd.id === subdomainId);
  if (!subdomain) return undefined;
  return subdomain.lessons.find((l) => l.routeSlug === routeSlug);
}

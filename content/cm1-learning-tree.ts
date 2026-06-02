// Arbre pédagogique CM1 : Matière → Domaine → Sous-domaine → Séquence-compétence → Slots PDF.
// Une séquence correspond à une compétence unique. Les slots PDF sont planifiés (status "upcoming").
// Aucun contenu pédagogique détaillé, lien href ou PDF réel n'est défini ici.

export type Cm1LearningStatus = "available" | "in-progress" | "upcoming";

export type Cm1GuideReference = {
  id: "noisette" | "felix" | "chouette" | "hector" | "melina" | "max" | "naia" | "pablo" | "rosa";
  name: string;
  role?: string;
};

export type Cm1PedagogicalPlaceReference = {
  slug: string;
  label: string;
  zone?: string;
};

export type Cm1PdfSlot = {
  type: "lesson" | "exercise" | "correction";
  label: string;
  status: Cm1LearningStatus;
};

export type Cm1SequenceNode = {
  id: string;
  title: string;
  competency: string;
  description?: string;
  status: Cm1LearningStatus;
  pdfSlots: Cm1PdfSlot[];
};

export type Cm1SubdomainNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm1LearningStatus;
  place?: Cm1PedagogicalPlaceReference;
  sequences: Cm1SequenceNode[];
};

export type Cm1DomainNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm1LearningStatus;
  place?: Cm1PedagogicalPlaceReference;
  subdomains: Cm1SubdomainNode[];
};

export type Cm1SubjectNode = {
  subjectSlug: string;
  title: string;
  place: Cm1PedagogicalPlaceReference;
  guides: Cm1GuideReference[];
  status: Cm1LearningStatus;
  domains: Cm1DomainNode[];
};

export type Cm1LearningTree = Cm1SubjectNode[];

const defaultPdfSlots: Cm1PdfSlot[] = [
  { type: "lesson",     label: "Leçon",      status: "upcoming" },
  { type: "exercise",   label: "Exercices",  status: "upcoming" },
  { type: "correction", label: "Correction", status: "upcoming" },
];

const sequence = (
  id: string,
  title: string,
  competency: string,
  status: Cm1LearningStatus = "upcoming",
): Cm1SequenceNode => ({ id, title, competency, status, pdfSlots: defaultPdfSlots });

export const cm1LearningTree: Cm1LearningTree = [
  {
    subjectSlug: "francais",
    title: "Français",
    place: { slug: "bibliotheque-des-explorateurs", label: "La Bibliothèque des Explorateurs" },
    guides: [
      { id: "noisette", name: "Noisette", role: "Guide CM1" },
      { id: "chouette", name: "Chouette", role: "Guide Français" },
    ],
    status: "in-progress",
    domains: [
      {
        id: "francais-lecture",
        title: "Lecture et compréhension",
        description: "Installer les stratégies de compréhension attendues à l'entrée du cycle 3.",
        status: "in-progress",
        subdomains: [
          {
            id: "francais-lecture-recits",
            title: "Comprendre un récit",
            status: "in-progress",
            sequences: [
              sequence("francais-lecture-recits-fluidite", "Lire avec fluidité un texte long", "Lire un texte long à voix haute en respectant la ponctuation et en maintenant un débit régulier."),
              sequence("francais-lecture-recits-intentions-personnage", "Comprendre les intentions d'un personnage", "Déduire l'intention d'un personnage à partir de ses paroles, actions et réactions.", "in-progress"),
              sequence("francais-lecture-recits-inference-simple", "Inférer une information implicite simple", "Formuler une inférence simple en s'appuyant sur un ou plusieurs indices du texte."),
              sequence("francais-lecture-recits-chronologie", "Reconstituer l'ordre des événements", "Remettre les événements d'un récit dans l'ordre chronologique et logique."),
              sequence("francais-lecture-recits-resumer", "Résumer un texte narratif", "Formuler en quelques phrases l'essentiel d'un récit lu, sans recopier le texte."),
            ],
          },
          {
            id: "francais-lecture-documentaire",
            title: "Lire un texte documentaire",
            status: "upcoming",
            sequences: [
              sequence("francais-lecture-documentaire-informations", "Repérer les informations principales", "Identifier le thème et les informations essentielles d'un texte documentaire court."),
              sequence("francais-lecture-documentaire-organisation", "Utiliser l'organisation du texte", "S'appuyer sur titres, paragraphes et mots-clés pour comprendre un document."),
              sequence("francais-lecture-documentaire-intentions-auteur", "Identifier les intentions de l'auteur", "Reconnaître si un texte cherche à informer, convaincre, décrire ou raconter."),
            ],
          },
        ],
      },
      {
        id: "francais-ecriture",
        title: "Écriture",
        status: "upcoming",
        subdomains: [
          {
            id: "francais-ecriture-planifier",
            title: "Préparer son écrit",
            status: "upcoming",
            sequences: [
              sequence("francais-ecriture-planifier-idees", "Planifier son écrit avant de rédiger", "Organiser ses idées en liste ou en plan avant de commencer la rédaction."),
              sequence("francais-ecriture-planifier-destinataire", "Adapter son écrit au destinataire", "Choisir des informations et un ton adaptés à la personne qui lira le texte."),
            ],
          },
          {
            id: "francais-ecriture-rediger",
            title: "Rédiger et améliorer",
            status: "upcoming",
            sequences: [
              sequence("francais-ecriture-rediger-recit-court", "Produire un récit court", "Écrire un court récit cohérent avec des personnages, un lieu et une suite d'événements."),
              sequence("francais-ecriture-rediger-texte-explicatif", "Produire un texte explicatif", "Rédiger un texte court qui explique un phénomène en utilisant des connecteurs logiques."),
              sequence("francais-ecriture-rediger-texte-structure", "Produire un texte structuré", "Rédiger un texte organisé avec un début, un développement et une fin."),
              sequence("francais-ecriture-rediger-enrichir", "Enrichir et réviser son écrit", "Relire son texte pour améliorer le vocabulaire, la clarté et corriger les erreurs."),
              sequence("francais-ecriture-rediger-reviser", "Relire pour améliorer la clarté", "Repérer une maladresse de sens ou d'organisation et proposer une correction."),
            ],
          },
        ],
      },
      {
        id: "francais-etude-langue",
        title: "Étude de la langue",
        status: "upcoming",
        subdomains: [
          {
            id: "francais-etude-langue-grammaire",
            title: "Grammaire de phrase",
            status: "upcoming",
            sequences: [
              sequence("francais-etude-langue-grammaire-classes", "Distinguer les classes grammaticales", "Identifier nom, verbe, adjectif, déterminant, pronom et adverbe dans une phrase."),
              sequence("francais-etude-langue-grammaire-sujet-verbe", "Identifier sujet, verbe et compléments", "Repérer le sujet, le verbe conjugué et les compléments dans une phrase simple."),
              sequence("francais-etude-langue-grammaire-complements", "Identifier les compléments essentiels", "Distinguer les compléments nécessaires au sens du verbe dans une phrase simple."),
            ],
          },
          {
            id: "francais-etude-langue-orthographe",
            title: "Orthographe grammaticale",
            status: "upcoming",
            sequences: [
              sequence("francais-etude-langue-orthographe-groupe-nominal", "Accorder dans le groupe nominal", "Accorder déterminant, nom et adjectif dans un groupe nominal courant."),
              sequence("francais-etude-langue-orthographe-accord-sujet-verbe", "Accorder le verbe avec le sujet", "Identifier le sujet du verbe et appliquer la règle d'accord sujet-verbe."),
              sequence("francais-etude-langue-orthographe-homophones", "Choisir un homophone grammatical fréquent", "Utiliser une manipulation simple pour choisir entre des homophones fréquents."),
            ],
          },
          {
            id: "francais-etude-langue-conjugaison",
            title: "Conjugaison",
            status: "upcoming",
            sequences: [
              sequence("francais-etude-langue-conjugaison-present", "Conjuguer au présent de l'indicatif", "Conjuguer les verbes des groupes 1, 2 et les auxiliaires au présent de l'indicatif."),
              sequence("francais-etude-langue-conjugaison-imparfait", "Conjuguer à l'imparfait de l'indicatif", "Conjuguer les verbes courants à l'imparfait et identifier son emploi dans un récit."),
              sequence("francais-etude-langue-conjugaison-futur", "Conjuguer au futur simple", "Conjuguer les verbes courants au futur simple et identifier son emploi."),
            ],
          },
          {
            id: "francais-etude-langue-lexique",
            title: "Lexique",
            status: "upcoming",
            sequences: [
              sequence("francais-etude-langue-lexique-synonymes-antonymes", "Utiliser synonymes, antonymes et familles de mots", "Enrichir son vocabulaire en trouvant des synonymes, antonymes et mots de la même famille."),
            ],
          },
        ],
      },
      {
        id: "francais-oral",
        title: "Langage oral",
        status: "upcoming",
        subdomains: [
          {
            id: "francais-oral-participer",
            title: "Participer à un échange",
            status: "upcoming",
            sequences: [
              sequence("francais-oral-participer-avis", "Présenter un avis argumenté", "Exprimer un avis court et l'appuyer sur un exemple précis."),
              sequence("francais-oral-participer-ecoute", "Répondre à une intervention", "Écouter une intervention et y répondre sans répéter ni s'écarter du sujet."),
            ],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "mathematiques",
    title: "Mathématiques",
    place: { slug: "atelier-des-nombres", label: "L'Atelier des Nombres" },
    guides: [
      { id: "noisette", name: "Noisette", role: "Guide CM1" },
      { id: "hector", name: "Hector", role: "Guide Mathématiques" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "mathematiques-nombres-calculs",
        title: "Nombres et calculs",
        status: "upcoming",
        subdomains: [
          {
            id: "mathematiques-nombres-calculs-numeration",
            title: "Numération",
            status: "upcoming",
            sequences: [
              sequence("mathematiques-nombres-calculs-numeration-grands-nombres", "Lire et écrire les grands nombres", "Lire, écrire et décomposer des nombres entiers jusqu'au million."),
              sequence("mathematiques-nombres-calculs-numeration-comparer-ranger", "Comparer et ranger les grands nombres", "Comparer des grands nombres entiers en s'appuyant sur les classes et les ranger dans l'ordre."),
              sequence("mathematiques-nombres-calculs-numeration-fractions", "Comprendre la notion de fraction", "Représenter une fraction simple comme partage équitable ou position sur une droite graduée."),
              sequence("mathematiques-nombres-calculs-numeration-fractions-droite", "Placer des fractions sur une droite graduée", "Positionner des fractions simples sur une droite graduée en identifiant les repères."),
              sequence("mathematiques-nombres-calculs-numeration-decimaux", "Comprendre les nombres décimaux", "Lire et écrire des nombres décimaux simples en lien avec les fractions décimales."),
              sequence("mathematiques-nombres-calculs-numeration-decimaux-comparer", "Comparer des nombres décimaux", "Comparer et ranger des nombres décimaux en s'appuyant sur la valeur des chiffres."),
              sequence("mathematiques-nombres-calculs-numeration-decimaux-operations", "Additionner et soustraire des décimaux", "Calculer une somme ou une différence de nombres décimaux simples en posant l'opération."),
            ],
          },
          {
            id: "mathematiques-nombres-calculs-calcul-pose",
            title: "Calcul posé",
            status: "upcoming",
            sequences: [
              sequence("mathematiques-nombres-calculs-calcul-pose-multiplication", "Poser et calculer une multiplication", "Calculer le produit de deux nombres entiers en utilisant l'algorithme posé."),
              sequence("mathematiques-nombres-calculs-calcul-pose-division", "Poser et calculer une division euclidienne", "Déterminer quotient et reste dans une division euclidienne simple."),
            ],
          },
          {
            id: "mathematiques-nombres-calculs-calcul-mental",
            title: "Calcul mental",
            status: "upcoming",
            sequences: [
              sequence("mathematiques-nombres-calculs-calcul-mental-strategies", "Choisir une stratégie de calcul mental", "Utiliser une décomposition ou une compensation pour calculer mentalement."),
            ],
          },
          {
            id: "mathematiques-nombres-calculs-proportionnalite",
            title: "Proportionnalité",
            status: "upcoming",
            sequences: [
              sequence("mathematiques-nombres-calculs-proportionnalite-reconnaitre", "Reconnaître la proportionnalité dans des situations simples", "Identifier si deux grandeurs sont proportionnelles à partir d'un tableau ou d'une situation concrète."),
            ],
          },
        ],
      },
      {
        id: "mathematiques-problemes",
        title: "Résolution de problèmes",
        status: "upcoming",
        subdomains: [
          {
            id: "mathematiques-problemes-demarche",
            title: "Démarche de résolution",
            status: "upcoming",
            sequences: [
              sequence("mathematiques-problemes-demarche-donnees-utiles", "Sélectionner les données utiles", "Identifier les informations nécessaires et écarter les données inutiles d'un énoncé."),
              sequence("mathematiques-problemes-demarche-etapes", "Résoudre un problème à plusieurs étapes", "Organiser deux calculs successifs ou plus pour répondre à une question complexe."),
            ],
          },
        ],
      },
      {
        id: "mathematiques-grandeurs-mesures",
        title: "Grandeurs et mesures",
        status: "upcoming",
        subdomains: [
          {
            id: "mathematiques-grandeurs-mesures-longueurs-aires",
            title: "Longueurs, périmètres et aires",
            status: "upcoming",
            sequences: [
              sequence("mathematiques-grandeurs-mesures-longueurs-convertir", "Convertir des longueurs", "Passer d'une unité de longueur à une autre en utilisant le tableau de conversion."),
              sequence("mathematiques-grandeurs-mesures-longueurs-aires-perimetre", "Calculer le périmètre d'une figure", "Calculer le périmètre d'un polygone simple à partir de longueurs données ou mesurées."),
              sequence("mathematiques-grandeurs-mesures-longueurs-aires-distinguer", "Distinguer aire et périmètre", "Choisir entre aire et périmètre selon la grandeur recherchée."),
              sequence("mathematiques-grandeurs-mesures-longueurs-aires-aire-rectangle", "Calculer l'aire d'un carré ou d'un rectangle", "Appliquer la formule de l'aire d'un rectangle ou d'un carré à partir de mesures données."),
            ],
          },
          {
            id: "mathematiques-grandeurs-mesures-masses",
            title: "Masses",
            status: "upcoming",
            sequences: [
              sequence("mathematiques-grandeurs-mesures-masses-convertir", "Convertir des masses", "Passer d'une unité de masse à une autre (kg, g, mg) en utilisant le tableau de conversion."),
            ],
          },
          {
            id: "mathematiques-grandeurs-mesures-durees",
            title: "Durées",
            status: "upcoming",
            sequences: [sequence("mathematiques-grandeurs-mesures-durees-calculer", "Calculer une durée simple", "Déterminer une durée à partir d'horaires de début et de fin.")],
          },
        ],
      },
      {
        id: "mathematiques-geometrie",
        title: "Espace et géométrie",
        status: "upcoming",
        subdomains: [
          {
            id: "mathematiques-geometrie-figures",
            title: "Figures planes",
            status: "upcoming",
            sequences: [
              sequence("mathematiques-geometrie-figures-decrire", "Reconnaître et tracer des figures géométriques", "Utiliser les propriétés de figures planes pour les décrire ou les tracer."),
              sequence("mathematiques-geometrie-figures-angles", "Identifier des angles", "Reconnaître, nommer et comparer des angles (droit, aigu, obtus) dans des figures."),
              sequence("mathematiques-geometrie-figures-symetrie", "Utiliser la symétrie", "Construire le symétrique d'une figure simple sur quadrillage ou à la règle."),
            ],
          },
          {
            id: "mathematiques-geometrie-espace",
            title: "Repérage dans l'espace",
            status: "upcoming",
            sequences: [sequence("mathematiques-geometrie-espace-programme", "Se repérer dans un plan", "Lire et compléter des coordonnées sur un plan quadrillé ou une carte simple.")],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "histoire-geographie",
    title: "Histoire-Géographie",
    place: { slug: "salle-des-cartes", label: "La Salle des Cartes" },
    guides: [
      { id: "noisette", name: "Noisette", role: "Guide CM1" },
      { id: "melina", name: "Mélina", role: "Guide Histoire-Géographie" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "histoire-geographie-histoire",
        title: "Histoire",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-geographie-histoire-reperes",
            title: "Repères historiques",
            status: "upcoming",
            sequences: [
              sequence("histoire-geographie-histoire-reperes-frise", "Se repérer dans les grandes périodes historiques", "Placer un événement ou une période sur une frise chronologique simple."),
              sequence("histoire-geographie-histoire-reperes-sources", "Comprendre les traces du passé", "Distinguer texte, image, carte ou objet comme source d'information historique."),
            ],
          },
          {
            id: "histoire-geographie-histoire-antiquite",
            title: "Antiquité",
            status: "upcoming",
            sequences: [
              sequence("histoire-geographie-histoire-antiquite-romanisation", "Étudier la romanisation de la Gaule", "Décrire quelques apports de la civilisation romaine à la Gaule à partir de documents."),
            ],
          },
          {
            id: "histoire-geographie-histoire-moyen-age",
            title: "Moyen Âge",
            status: "upcoming",
            sequences: [
              sequence("histoire-geographie-histoire-moyen-age-societe", "Comprendre la vie des paysans et des villes médiévales", "Identifier quelques aspects de la vie quotidienne au Moyen Âge à partir de documents simples."),
              sequence("histoire-geographie-histoire-moyen-age-seigneurs", "Identifier le rôle des rois et seigneurs", "Comprendre la hiérarchie féodale et le rôle du roi et des seigneurs."),
              sequence("histoire-geographie-histoire-moyen-age-royaume", "Comprendre la construction du royaume de France", "Repérer comment le pouvoir royal se renforce progressivement au Moyen Âge."),
            ],
          },
          {
            id: "histoire-geographie-histoire-temps-modernes",
            title: "Temps modernes",
            status: "upcoming",
            sequences: [
              sequence("histoire-geographie-histoire-temps-modernes-decouverte", "Découvrir les Temps modernes", "Identifier quelques transformations majeures entre le XVe et le XVIIIe siècle à partir de documents."),
            ],
          },
        ],
      },
      {
        id: "histoire-geographie-geographie",
        title: "Géographie",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-geographie-geographie-habiter",
            title: "Habiter un territoire",
            status: "upcoming",
            sequences: [
              sequence("histoire-geographie-geographie-habiter-paysage", "Lire un paysage et identifier ses composantes", "Distinguer les éléments naturels et humains dans un paysage."),
              sequence("histoire-geographie-geographie-habiter-territoire", "Comprendre habiter une commune", "Décrire les caractéristiques d'une commune et les services qu'elle offre à ses habitants."),
              sequence("histoire-geographie-geographie-habiter-rural", "Comprendre habiter un espace rural", "Identifier les caractéristiques d'un espace rural et les activités de ses habitants."),
              sequence("histoire-geographie-geographie-habiter-urbain", "Comprendre habiter un espace urbain", "Identifier les caractéristiques d'une ville et les modes de vie urbains."),
              sequence("histoire-geographie-geographie-habiter-mobilites", "Identifier les mobilités quotidiennes", "Repérer les déplacements quotidiens des habitants et leurs moyens de transport."),
            ],
          },
          {
            id: "histoire-geographie-geographie-cartes",
            title: "Lire des documents géographiques",
            status: "upcoming",
            sequences: [
              sequence("histoire-geographie-geographie-cartes-legende", "Utiliser une légende de carte", "Associer les figurés d'une légende aux informations représentées sur une carte."),
              sequence("histoire-geographie-geographie-cartes-localiser", "Localiser un lieu en France", "Situer un lieu en utilisant titre, orientation, échelle et repères administratifs simples."),
              sequence("histoire-geographie-geographie-cartes-documents", "Lire différents documents géographiques", "Extraire des informations d'une photographie, d'un graphique ou d'un tableau géographique."),
            ],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "sciences",
    title: "Sciences et technologie",
    place: { slug: "laboratoire-des-decouvertes", label: "Le Laboratoire des Découvertes" },
    guides: [
      { id: "noisette", name: "Noisette", role: "Guide CM1" },
      { id: "naia", name: "Naïa", role: "Guide Sciences" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "sciences-demarche",
        title: "Démarche scientifique",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-demarche-investigation",
            title: "Observer et questionner",
            status: "upcoming",
            sequences: [
              sequence("sciences-demarche-investigation-observation", "Distinguer observation et interprétation", "Séparer ce qui est observé de ce qui est supposé lors d'une investigation."),
              sequence("sciences-demarche-investigation-hypothese", "Adopter une démarche d'investigation", "Formuler une hypothèse simple, la tester par une expérience et tirer une conclusion."),
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
            id: "sciences-vivant-besoins",
            title: "Besoins des êtres vivants",
            status: "upcoming",
            sequences: [
              sequence("sciences-vivant-besoins-decrire", "Connaître les besoins des êtres vivants", "Identifier les besoins communs des êtres vivants à partir d'observations."),
              sequence("sciences-vivant-besoins-chaines", "Comprendre les chaînes alimentaires", "Construire une chaîne alimentaire simple en identifiant producteurs et consommateurs."),
              sequence("sciences-vivant-besoins-corps-humain", "Identifier les fonctions du corps humain", "Associer les grands organes du corps humain à leur fonction principale."),
              sequence("sciences-vivant-besoins-cycle", "Décrire un cycle de vie", "Ordonner les principales étapes du cycle de vie d'un animal ou d'une plante."),
            ],
          },
          {
            id: "sciences-vivant-classer",
            title: "Classer le vivant",
            status: "upcoming",
            sequences: [
              sequence("sciences-vivant-classer-criteres", "Classer selon des critères observables", "Regrouper des êtres vivants selon des caractères visibles partagés."),
            ],
          },
        ],
      },
      {
        id: "sciences-matiere-energie",
        title: "Matière, énergie et objets techniques",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-matiere-energie-eau",
            title: "États et changements de l'eau",
            status: "upcoming",
            sequences: [
              sequence("sciences-matiere-energie-eau-etats", "Comprendre les changements d'état de l'eau", "Décrire les trois états de l'eau et les conditions de passage d'un état à l'autre."),
            ],
          },
          {
            id: "sciences-matiere-energie-sources",
            title: "Énergie",
            status: "upcoming",
            sequences: [
              sequence("sciences-matiere-energie-sources-reconnaitre", "Reconnaître des sources d'énergie", "Identifier différentes sources d'énergie (soleil, vent, eau, électricité) et leurs usages."),
            ],
          },
          {
            id: "sciences-matiere-objets-materiaux",
            title: "Matériaux",
            status: "upcoming",
            sequences: [
              sequence("sciences-matiere-objets-materiaux-proprietes", "Comparer des matériaux", "Choisir un matériau en fonction de propriétés observables et d'un usage donné."),
            ],
          },
          {
            id: "sciences-matiere-objets-objets",
            title: "Objets techniques",
            status: "upcoming",
            sequences: [
              sequence("sciences-matiere-objets-objets-fonction", "Décrire le fonctionnement d'un objet technique", "Associer un objet technique à sa fonction d'usage et à quelques éléments qui la permettent."),
            ],
          },
        ],
      },
      {
        id: "sciences-terre-environnement",
        title: "La planète Terre et l'environnement",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-terre-environnement-milieux",
            title: "Milieux de vie",
            status: "upcoming",
            sequences: [
              sequence("sciences-terre-environnement-milieux-relations", "Identifier des relations dans un milieu", "Décrire des relations simples entre êtres vivants et conditions du milieu."),
            ],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "emc",
    title: "EMC",
    place: { slug: "forum-des-citoyens", label: "Le Forum des Citoyens" },
    guides: [
      { id: "noisette", name: "Noisette", role: "Guide CM1" },
      { id: "rosa", name: "Rosa", role: "Guide EMC" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "emc-respect-autrui",
        title: "Respecter autrui",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-respect-autrui-regles",
            title: "Règles et coopération",
            status: "upcoming",
            sequences: [
              sequence("emc-respect-autrui-regles-cooperer", "Coopérer dans un projet", "Prendre une responsabilité simple et respecter le rôle des autres dans un travail collectif."),
              sequence("emc-respect-autrui-regles-conflit", "Débattre avec respect", "Exprimer un désaccord sans attaque personnelle et rechercher une solution acceptable."),
              sequence("emc-respect-autrui-regles-regles-collectives", "Respecter les règles collectives", "Comprendre pourquoi les règles collectives sont nécessaires et les appliquer."),
            ],
          },
          {
            id: "emc-respect-autrui-emotions",
            title: "Émotions et empathie",
            status: "upcoming",
            sequences: [
              sequence("emc-respect-autrui-emotions-nommer", "Nommer une émotion et son besoin", "Identifier une émotion dans une situation scolaire et formuler le besoin associé."),
            ],
          },
        ],
      },
      {
        id: "emc-valeurs-republique",
        title: "Valeurs de la République",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-valeurs-republique-symboles",
            title: "Symboles et principes",
            status: "upcoming",
            sequences: [
              sequence("emc-valeurs-republique-symboles-reconnaitre", "Comprendre les valeurs de la République", "Associer les symboles de la République à leur signification civique (liberté, égalité, fraternité)."),
              sequence("emc-valeurs-republique-symboles-laicite", "Comprendre une règle de laïcité à l'école", "Expliquer une règle de laïcité dans une situation scolaire concrète."),
            ],
          },
          {
            id: "emc-valeurs-republique-droits-devoirs",
            title: "Droits et devoirs",
            status: "upcoming",
            sequences: [
              sequence("emc-valeurs-republique-droits-devoirs-identifier", "Identifier droits et devoirs", "Distinguer des droits et des devoirs dans des situations de la vie scolaire et citoyenne."),
              sequence("emc-valeurs-republique-droits-devoirs-egalite", "Comprendre l'égalité et la lutte contre les discriminations", "Identifier des situations d'inégalité ou de discrimination et expliquer pourquoi elles sont injustes."),
            ],
          },
        ],
      },
      {
        id: "emc-culture-civique",
        title: "Culture civique",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-culture-civique-debat",
            title: "Débat réglé",
            status: "upcoming",
            sequences: [
              sequence("emc-culture-civique-debat-argument", "Participer à un débat réglé", "Formuler un argument court en respectant la parole des autres."),
            ],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "anglais",
    title: "Anglais",
    place: { slug: "station-des-langues", label: "La Station des Langues" },
    guides: [
      { id: "noisette", name: "Noisette", role: "Guide CM1" },
      { id: "pablo", name: "Pablo", role: "Guide Langues" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "anglais-comprendre",
        title: "Comprendre",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-comprendre-oral",
            title: "Compréhension orale",
            status: "upcoming",
            sequences: [
              sequence("anglais-comprendre-oral-consignes", "Comprendre des consignes de classe", "Réagir correctement à des consignes orales simples et ritualisées."),
              sequence("anglais-comprendre-oral-informations", "Repérer des informations dans un message court", "Identifier une information familière dans un court message oral."),
            ],
          },
          {
            id: "anglais-comprendre-ecrit",
            title: "Compréhension écrite",
            status: "upcoming",
            sequences: [
              sequence("anglais-comprendre-ecrit-mots-familiers", "Lire des mots et phrases familiers", "Comprendre des mots et phrases très courts liés à la vie quotidienne."),
            ],
          },
        ],
      },
      {
        id: "anglais-exprimer",
        title: "S'exprimer",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-exprimer-oral",
            title: "Expression orale",
            status: "upcoming",
            sequences: [
              sequence("anglais-exprimer-oral-se-presenter", "Se présenter simplement", "Dire son nom, son âge, ses goûts et quelques informations personnelles simples."),
              sequence("anglais-exprimer-oral-dialogue", "Participer à un court échange ritualisé", "Poser une question simple et répondre dans un échange préparé."),
            ],
          },
          {
            id: "anglais-exprimer-ecrit",
            title: "Expression écrite",
            status: "upcoming",
            sequences: [
              sequence("anglais-exprimer-ecrit-carte", "Écrire une courte carte ou présentation", "Rédiger quelques phrases simples en réutilisant un modèle connu."),
            ],
          },
        ],
      },
      {
        id: "anglais-culture",
        title: "Repères culturels",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-culture-quotidien",
            title: "Vie quotidienne",
            status: "upcoming",
            sequences: [
              sequence("anglais-culture-quotidien-comparer", "Comparer un élément culturel familier", "Comparer une habitude quotidienne anglophone avec une habitude connue des élèves."),
            ],
          },
        ],
      },
    ],
  },
  {
    subjectSlug: "arts",
    title: "Arts",
    place: { slug: "atelier-des-artistes", label: "L'Atelier des Artistes" },
    guides: [
      { id: "noisette", name: "Noisette", role: "Guide CM1" },
      { id: "melina", name: "Mélina", role: "Guide Arts" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "arts-plastiques",
        title: "Arts plastiques",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-plastiques-produire",
            title: "Produire une réalisation",
            status: "upcoming",
            sequences: [
              sequence("arts-plastiques-produire-technique", "Expérimenter techniques et matériaux", "Choisir et tester une technique ou un matériau pour produire un effet visuel recherché."),
              sequence("arts-plastiques-produire-composition", "Produire une œuvre intentionnelle", "Composer une image en tenant compte du cadrage, des plans ou des contrastes avec une intention claire."),
            ],
          },
          {
            id: "arts-plastiques-analyser",
            title: "Analyser et présenter",
            status: "upcoming",
            sequences: [
              sequence("arts-plastiques-analyser-oeuvre", "Analyser une œuvre", "Décrire une œuvre en nommant sujet, matériaux, couleurs, organisation et période approximative."),
              sequence("arts-plastiques-analyser-demarche", "Présenter une démarche artistique", "Expliquer ses choix plastiques et l'intention qui a guidé sa production avec un vocabulaire adapté."),
            ],
          },
        ],
      },
      {
        id: "arts-musique",
        title: "Éducation musicale",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-musique-ecouter",
            title: "Écouter et identifier",
            status: "upcoming",
            sequences: [
              sequence("arts-musique-ecouter-parametres", "Identifier des paramètres du son", "Repérer tempo, intensité ou timbre dans une écoute courte."),
              sequence("arts-musique-ecouter-comparer", "Écouter et comparer des œuvres musicales", "Comparer deux extraits musicaux en identifiant des ressemblances et des différences."),
            ],
          },
          {
            id: "arts-musique-chanter",
            title: "Chanter",
            status: "upcoming",
            sequences: [
              sequence("arts-musique-chanter-intention", "Chanter en respectant une intention", "Adapter son interprétation (nuances, rythme, articulation) à l'intention musicale d'un chant."),
              sequence("arts-musique-chanter-ensemble", "Tenir sa place dans une production collective", "Tenir sa voix dans un chant collectif en respectant départs, rythme et écoute des autres."),
            ],
          },
        ],
      },
      {
        id: "arts-histoire-des-arts",
        title: "Histoire des arts",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-histoire-des-arts-observer",
            title: "Observer une œuvre",
            status: "upcoming",
            sequences: [
              sequence("arts-histoire-des-arts-observer-decrire", "Décrire une œuvre avec précision", "Décrire une œuvre en nommant sujet, matériaux, couleurs ou organisation."),
            ],
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
      { id: "noisette", name: "Noisette", role: "Guide CM1" },
      { id: "max", name: "Max", role: "Guide EPS" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "eps-performance",
        title: "Produire une performance",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-performance-mesurer",
            title: "Mesurer et progresser",
            status: "upcoming",
            sequences: [
              sequence("eps-performance-mesurer-effort", "Produire une performance mesurée", "Réguler son allure pour maintenir un effort sur une durée connue et mesurer sa performance."),
              sequence("eps-performance-mesurer-resultat", "Mesurer une performance et la comparer", "Relever un résultat simple et identifier un progrès possible."),
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
            id: "eps-deplacements-milieu",
            title: "Se déplacer dans différents environnements",
            status: "upcoming",
            sequences: [
              sequence("eps-deplacements-milieu-parcours", "Adapter ses déplacements à différents environnements", "Adapter son déplacement à des contraintes variées de parcours, de terrain et de sécurité."),
            ],
          },
        ],
      },
      {
        id: "eps-expression",
        title: "S'exprimer devant les autres",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-expression-corporelle",
            title: "Expression corporelle",
            status: "upcoming",
            sequences: [
              sequence("eps-expression-corporelle-enchainement", "Réaliser une prestation corporelle", "Mémoriser et présenter un enchaînement de gestes avec un début, une fin et une intention expressive."),
            ],
          },
        ],
      },
      {
        id: "eps-affrontement",
        title: "Conduire un affrontement collectif ou interindividuel",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-affrontement-regles",
            title: "Jeux collectifs",
            status: "upcoming",
            sequences: [
              sequence("eps-affrontement-regles-cooperer", "Coopérer ou s'opposer dans un jeu collectif", "Agir avec ses partenaires pour progresser vers une cible tout en s'opposant à l'équipe adverse."),
              sequence("eps-affrontement-regles-arbitrer", "Respecter règles et arbitrage", "Appliquer les règles du jeu, accepter les décisions de l'arbitre et arbitrer simplement à son tour."),
            ],
          },
        ],
      },
    ],
  },
];

export function getCm1SubjectTree(subjectSlug: string): Cm1SubjectNode | undefined {
  return cm1LearningTree.find((subject) => subject.subjectSlug === subjectSlug);
}

export function getCm1DomainById(
  subjectSlug: string,
  domainId: string,
): Cm1DomainNode | undefined {
  return getCm1SubjectTree(subjectSlug)?.domains.find((domain) => domain.id === domainId);
}

export function getCm1SubdomainById(
  subjectSlug: string,
  domainId: string,
  subdomainId: string,
): Cm1SubdomainNode | undefined {
  return getCm1DomainById(subjectSlug, domainId)?.subdomains.find(
    (subdomain) => subdomain.id === subdomainId,
  );
}

export function getCm1SequenceById(
  subjectSlug: string,
  domainId: string,
  subdomainId: string,
  sequenceId: string,
): Cm1SequenceNode | undefined {
  return getCm1SubdomainById(subjectSlug, domainId, subdomainId)?.sequences.find(
    (sequenceNode) => sequenceNode.id === sequenceId,
  );
}

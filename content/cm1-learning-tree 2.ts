// Arbre pédagogique CM1 : Matière → Domaine → Sous-domaine → Séquence-compétence.
// Une séquence correspond à une compétence unique. Aucun contenu de leçon,
// exercice, corrigé ou ressource PDF n'est défini ici.

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

export type Cm1SequenceNode = {
  id: string;
  title: string;
  competency: string;
  description?: string;
  status: Cm1LearningStatus;
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
              {
                id: "francais-lecture-recits-intentions-personnage",
                title: "Comprendre les intentions d'un personnage",
                competency: "Déduire l'intention d'un personnage à partir de ses paroles, actions et réactions.",
                status: "in-progress",
              },
              {
                id: "francais-lecture-recits-inference-simple",
                title: "Inférer une information implicite simple",
                competency: "Formuler une inférence simple en s'appuyant sur un ou plusieurs indices du texte.",
                status: "upcoming",
              },
              {
                id: "francais-lecture-recits-chronologie",
                title: "Reconstituer l'ordre des événements",
                competency: "Remettre les événements d'un récit dans l'ordre chronologique et logique.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "francais-lecture-documentaire",
            title: "Lire un texte documentaire",
            status: "upcoming",
            sequences: [
              {
                id: "francais-lecture-documentaire-informations",
                title: "Repérer les informations principales",
                competency: "Identifier le thème et les informations essentielles d'un texte documentaire court.",
                status: "upcoming",
              },
              {
                id: "francais-lecture-documentaire-organisation",
                title: "Utiliser l'organisation du texte",
                competency: "S'appuyer sur titres, paragraphes et mots-clés pour comprendre un document.",
                status: "upcoming",
              },
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
              {
                id: "francais-ecriture-planifier-idees",
                title: "Planifier son écrit avant de rédiger",
                competency: "Organiser ses idées en liste ou en plan avant de commencer la rédaction.",
                status: "upcoming",
              },
              {
                id: "francais-ecriture-planifier-destinataire",
                title: "Adapter son écrit au destinataire",
                competency: "Choisir des informations et un ton adaptés à la personne qui lira le texte.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "francais-ecriture-rediger",
            title: "Rédiger et améliorer",
            status: "upcoming",
            sequences: [
              {
                id: "francais-ecriture-rediger-texte-structure",
                title: "Produire un texte structuré",
                competency: "Rédiger un texte organisé avec un début, un développement et une fin.",
                status: "upcoming",
              },
              {
                id: "francais-ecriture-rediger-reviser",
                title: "Relire pour améliorer la clarté",
                competency: "Repérer une maladresse de sens ou d'organisation et proposer une correction.",
                status: "upcoming",
              },
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
              {
                id: "francais-etude-langue-grammaire-sujet-verbe",
                title: "Identifier sujet, verbe et accords",
                competency: "Repérer le sujet et le verbe conjugué pour contrôler un accord simple.",
                status: "upcoming",
              },
              {
                id: "francais-etude-langue-grammaire-complements",
                title: "Identifier les compléments essentiels",
                competency: "Distinguer les compléments nécessaires au sens du verbe dans une phrase simple.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "francais-etude-langue-orthographe",
            title: "Orthographe grammaticale",
            status: "upcoming",
            sequences: [
              {
                id: "francais-etude-langue-orthographe-groupe-nominal",
                title: "Accorder dans le groupe nominal",
                competency: "Accorder déterminant, nom et adjectif dans un groupe nominal courant.",
                status: "upcoming",
              },
              {
                id: "francais-etude-langue-orthographe-homophones",
                title: "Choisir un homophone grammatical fréquent",
                competency: "Utiliser une manipulation simple pour choisir entre des homophones fréquents.",
                status: "upcoming",
              },
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
              {
                id: "francais-oral-participer-avis",
                title: "Présenter un avis argumenté",
                competency: "Exprimer un avis court et l'appuyer sur un exemple précis.",
                status: "upcoming",
              },
              {
                id: "francais-oral-participer-ecoute",
                title: "Répondre à une intervention",
                competency: "Écouter une intervention et y répondre sans répéter ni s'écarter du sujet.",
                status: "upcoming",
              },
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
              {
                id: "mathematiques-nombres-calculs-numeration-grands-nombres",
                title: "Lire, écrire et comparer les grands nombres",
                competency: "Lire, écrire, décomposer et comparer des nombres entiers jusqu'au million.",
                status: "upcoming",
              },
              {
                id: "mathematiques-nombres-calculs-numeration-fractions",
                title: "Comprendre la notion de fraction",
                competency: "Représenter une fraction simple comme partage équitable ou position sur une droite graduée.",
                status: "upcoming",
              },
              {
                id: "mathematiques-nombres-calculs-numeration-decimaux",
                title: "Découvrir les nombres décimaux",
                competency: "Lire et écrire des nombres décimaux simples en lien avec les fractions décimales.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "mathematiques-nombres-calculs-calcul-pose",
            title: "Calcul posé",
            status: "upcoming",
            sequences: [
              {
                id: "mathematiques-nombres-calculs-calcul-pose-multiplication",
                title: "Poser et calculer une multiplication",
                competency: "Calculer le produit de deux nombres entiers en utilisant l'algorithme posé.",
                status: "upcoming",
              },
              {
                id: "mathematiques-nombres-calculs-calcul-pose-division",
                title: "Poser et calculer une division euclidienne",
                competency: "Déterminer quotient et reste dans une division euclidienne simple.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "mathematiques-nombres-calculs-calcul-mental",
            title: "Calcul mental",
            status: "upcoming",
            sequences: [
              {
                id: "mathematiques-nombres-calculs-calcul-mental-strategies",
                title: "Choisir une stratégie de calcul mental",
                competency: "Utiliser une décomposition ou une compensation pour calculer mentalement.",
                status: "upcoming",
              },
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
              {
                id: "mathematiques-problemes-demarche-donnees-utiles",
                title: "Sélectionner les données utiles",
                competency: "Identifier les informations nécessaires et écarter les données inutiles d'un énoncé.",
                status: "upcoming",
              },
              {
                id: "mathematiques-problemes-demarche-etapes",
                title: "Résoudre un problème à étapes",
                competency: "Organiser deux calculs successifs pour répondre à une question.",
                status: "upcoming",
              },
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
              {
                id: "mathematiques-grandeurs-mesures-longueurs-aires-perimetre",
                title: "Calculer le périmètre d'une figure",
                competency: "Calculer le périmètre d'un polygone simple à partir de longueurs données ou mesurées.",
                status: "upcoming",
              },
              {
                id: "mathematiques-grandeurs-mesures-longueurs-aires-distinguer",
                title: "Distinguer aire et périmètre",
                competency: "Choisir entre aire et périmètre selon la grandeur recherchée.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "mathematiques-grandeurs-mesures-durees",
            title: "Durées",
            status: "upcoming",
            sequences: [
              {
                id: "mathematiques-grandeurs-mesures-durees-calculer",
                title: "Calculer une durée simple",
                competency: "Déterminer une durée à partir d'horaires de début et de fin.",
                status: "upcoming",
              },
            ],
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
              {
                id: "mathematiques-geometrie-figures-decrire",
                title: "Décrire et construire des figures",
                competency: "Utiliser les propriétés de figures planes pour les décrire ou les tracer.",
                status: "upcoming",
              },
              {
                id: "mathematiques-geometrie-figures-symetrie",
                title: "Compléter une figure par symétrie",
                competency: "Construire le symétrique d'une figure simple sur quadrillage.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "mathematiques-geometrie-espace",
            title: "Repérage dans l'espace",
            status: "upcoming",
            sequences: [
              {
                id: "mathematiques-geometrie-espace-programme",
                title: "Coder un déplacement",
                competency: "Décrire ou coder un déplacement sur quadrillage avec un vocabulaire précis.",
                status: "upcoming",
              },
            ],
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
              {
                id: "histoire-geographie-histoire-reperes-frise",
                title: "Situer une période sur une frise",
                competency: "Placer un événement ou une période sur une frise chronologique simple.",
                status: "upcoming",
              },
              {
                id: "histoire-geographie-histoire-reperes-sources",
                title: "Identifier la nature d'un document historique",
                competency: "Distinguer texte, image, carte ou objet comme source d'information historique.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "histoire-geographie-histoire-moyen-age",
            title: "Moyen Âge",
            status: "upcoming",
            sequences: [
              {
                id: "histoire-geographie-histoire-moyen-age-societe",
                title: "Décrire l'organisation de la société médiévale",
                competency: "Identifier quelques rôles sociaux du Moyen Âge à partir de documents simples.",
                status: "upcoming",
              },
              {
                id: "histoire-geographie-histoire-moyen-age-royaume",
                title: "Comprendre la construction du royaume de France",
                competency: "Repérer comment le pouvoir royal se renforce progressivement au Moyen Âge.",
                status: "upcoming",
              },
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
              {
                id: "histoire-geographie-geographie-habiter-paysage",
                title: "Lire un paysage et identifier ses composantes",
                competency: "Distinguer les éléments naturels et humains dans un paysage.",
                status: "upcoming",
              },
              {
                id: "histoire-geographie-geographie-habiter-territoire",
                title: "Décrire un espace de vie ou un territoire",
                competency: "Présenter les caractéristiques d'un territoire à partir d'une carte ou d'une photographie.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "histoire-geographie-geographie-cartes",
            title: "Lire des cartes",
            status: "upcoming",
            sequences: [
              {
                id: "histoire-geographie-geographie-cartes-legende",
                title: "Utiliser une légende de carte",
                competency: "Associer les figurés d'une légende aux informations représentées sur une carte.",
                status: "upcoming",
              },
              {
                id: "histoire-geographie-geographie-cartes-localiser",
                title: "Localiser un lieu en France",
                competency: "Situer un lieu en utilisant titre, orientation, échelle et repères administratifs simples.",
                status: "upcoming",
              },
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
              {
                id: "sciences-demarche-investigation-observation",
                title: "Distinguer observation et interprétation",
                competency: "Séparer ce qui est observé de ce qui est supposé lors d'une investigation.",
                status: "upcoming",
              },
              {
                id: "sciences-demarche-investigation-hypothese",
                title: "Formuler une hypothèse testable",
                competency: "Proposer une hypothèse simple qui peut être vérifiée par une observation ou une expérience.",
                status: "upcoming",
              },
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
              {
                id: "sciences-vivant-besoins-decrire",
                title: "Décrire les besoins du vivant",
                competency: "Identifier les besoins communs des êtres vivants à partir d'observations.",
                status: "upcoming",
              },
              {
                id: "sciences-vivant-besoins-cycle",
                title: "Décrire un cycle de vie",
                competency: "Ordonner les principales étapes du cycle de vie d'un animal ou d'une plante.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "sciences-vivant-classer",
            title: "Classer le vivant",
            status: "upcoming",
            sequences: [
              {
                id: "sciences-vivant-classer-criteres",
                title: "Classer selon des critères observables",
                competency: "Regrouper des êtres vivants selon des caractères visibles partagés.",
                status: "upcoming",
              },
            ],
          },
        ],
      },
      {
        id: "sciences-matiere-objets",
        title: "Matière, matériaux et objets techniques",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-matiere-objets-materiaux",
            title: "Matériaux",
            status: "upcoming",
            sequences: [
              {
                id: "sciences-matiere-objets-materiaux-proprietes",
                title: "Comparer des matériaux",
                competency: "Choisir un matériau en fonction de propriétés observables et d'un usage donné.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "sciences-matiere-objets-objets",
            title: "Objets techniques",
            status: "upcoming",
            sequences: [
              {
                id: "sciences-matiere-objets-objets-fonction",
                title: "Identifier la fonction d'un objet technique",
                competency: "Associer un objet technique à sa fonction d'usage et à quelques éléments qui la permettent.",
                status: "upcoming",
              },
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
              {
                id: "sciences-terre-environnement-milieux-relations",
                title: "Identifier des relations dans un milieu",
                competency: "Décrire des relations simples entre êtres vivants et conditions du milieu.",
                status: "upcoming",
              },
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
              {
                id: "emc-respect-autrui-regles-cooperer",
                title: "Coopérer dans un groupe",
                competency: "Prendre une responsabilité simple et respecter le rôle des autres dans un travail collectif.",
                status: "upcoming",
              },
              {
                id: "emc-respect-autrui-regles-conflit",
                title: "Résoudre un désaccord par la parole",
                competency: "Exprimer un désaccord sans attaque personnelle et rechercher une solution acceptable.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "emc-respect-autrui-emotions",
            title: "Émotions et empathie",
            status: "upcoming",
            sequences: [
              {
                id: "emc-respect-autrui-emotions-nommer",
                title: "Nommer une émotion et son besoin",
                competency: "Identifier une émotion dans une situation scolaire et formuler le besoin associé.",
                status: "upcoming",
              },
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
              {
                id: "emc-valeurs-republique-symboles-reconnaitre",
                title: "Reconnaître des symboles républicains",
                competency: "Associer quelques symboles de la République à leur signification civique.",
                status: "upcoming",
              },
              {
                id: "emc-valeurs-republique-symboles-laicite",
                title: "Comprendre une règle de laïcité à l'école",
                competency: "Expliquer une règle de laïcité dans une situation scolaire concrète.",
                status: "upcoming",
              },
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
              {
                id: "emc-culture-civique-debat-argument",
                title: "Participer à un débat réglé",
                competency: "Formuler un argument court en respectant la parole des autres.",
                status: "upcoming",
              },
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
              {
                id: "anglais-comprendre-oral-consignes",
                title: "Comprendre des consignes de classe",
                competency: "Réagir correctement à des consignes orales simples et ritualisées.",
                status: "upcoming",
              },
              {
                id: "anglais-comprendre-oral-informations",
                title: "Repérer des informations dans un message court",
                competency: "Identifier une information familière dans un court message oral.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "anglais-comprendre-ecrit",
            title: "Compréhension écrite",
            status: "upcoming",
            sequences: [
              {
                id: "anglais-comprendre-ecrit-mots-familiers",
                title: "Lire des mots et phrases familiers",
                competency: "Comprendre des mots et phrases très courts liés à la vie quotidienne.",
                status: "upcoming",
              },
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
              {
                id: "anglais-exprimer-oral-se-presenter",
                title: "Se présenter simplement",
                competency: "Dire son nom, son âge, ses goûts et quelques informations personnelles simples.",
                status: "upcoming",
              },
              {
                id: "anglais-exprimer-oral-dialogue",
                title: "Participer à un court échange ritualisé",
                competency: "Poser une question simple et répondre dans un échange préparé.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "anglais-exprimer-ecrit",
            title: "Expression écrite",
            status: "upcoming",
            sequences: [
              {
                id: "anglais-exprimer-ecrit-carte",
                title: "Écrire une courte carte ou présentation",
                competency: "Rédiger quelques phrases simples en réutilisant un modèle connu.",
                status: "upcoming",
              },
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
              {
                id: "anglais-culture-quotidien-comparer",
                title: "Comparer un élément culturel familier",
                competency: "Comparer une habitude quotidienne anglophone avec une habitude connue des élèves.",
                status: "upcoming",
              },
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
              {
                id: "arts-plastiques-produire-technique",
                title: "Expérimenter une technique plastique",
                competency: "Choisir et tester une technique pour produire un effet visuel recherché.",
                status: "upcoming",
              },
              {
                id: "arts-plastiques-produire-composition",
                title: "Organiser l'espace d'une production",
                competency: "Composer une image en tenant compte du cadrage, des plans ou des contrastes.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "arts-plastiques-presenter",
            title: "Présenter une production",
            status: "upcoming",
            sequences: [
              {
                id: "arts-plastiques-presenter-choix",
                title: "Expliquer ses choix plastiques",
                competency: "Présenter une intention et un choix de technique avec un vocabulaire simple.",
                status: "upcoming",
              },
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
              {
                id: "arts-musique-ecouter-parametres",
                title: "Identifier des paramètres sonores",
                competency: "Repérer tempo, intensité ou timbre dans une écoute courte.",
                status: "upcoming",
              },
            ],
          },
          {
            id: "arts-musique-chanter",
            title: "Chanter",
            status: "upcoming",
            sequences: [
              {
                id: "arts-musique-chanter-ensemble",
                title: "Chanter en respectant un collectif",
                competency: "Tenir sa place dans un chant collectif en respectant départs, rythme et écoute.",
                status: "upcoming",
              },
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
            title: "Observer une oeuvre",
            status: "upcoming",
            sequences: [
              {
                id: "arts-histoire-des-arts-observer-decrire",
                title: "Décrire une oeuvre avec précision",
                competency: "Décrire une oeuvre en nommant sujet, matériaux, couleurs ou organisation.",
                status: "upcoming",
              },
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
              {
                id: "eps-performance-mesurer-effort",
                title: "Adapter son effort à une durée",
                competency: "Réguler son allure pour maintenir un effort sur une durée connue.",
                status: "upcoming",
              },
              {
                id: "eps-performance-mesurer-resultat",
                title: "Mesurer une performance et la comparer",
                competency: "Relever un résultat simple et identifier un progrès possible.",
                status: "upcoming",
              },
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
            title: "Se déplacer dans un milieu aménagé",
            status: "upcoming",
            sequences: [
              {
                id: "eps-deplacements-milieu-parcours",
                title: "Choisir un itinéraire adapté",
                competency: "Adapter son déplacement à des contraintes simples de parcours et de sécurité.",
                status: "upcoming",
              },
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
              {
                id: "eps-expression-corporelle-enchainement",
                title: "Construire un enchaînement court",
                competency: "Mémoriser et présenter un enchaînement de gestes avec un début et une fin.",
                status: "upcoming",
              },
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
              {
                id: "eps-affrontement-regles-cooperer",
                title: "Coopérer pour atteindre une cible",
                competency: "Agir avec ses partenaires pour progresser vers une cible en respectant les règles.",
                status: "upcoming",
              },
              {
                id: "eps-affrontement-regles-arbitrer",
                title: "Observer une règle et arbitrer simplement",
                competency: "Repérer une règle respectée ou non et annoncer une décision simple.",
                status: "upcoming",
              },
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
    (sequence) => sequence.id === sequenceId,
  );
}

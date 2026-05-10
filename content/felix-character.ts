import type { AcademyCharacter, AcademyPlace, AcademyBadge } from "@/content/felix-types";

export const felixCharacter: AcademyCharacter = {
  slug: "felix",
  name: "Félix le lynx",
  species: "Lynx boréal",
  level: "CM2",
  role: "Guide du CM2 — il structure les missions autour de gestes intellectuels observables : observer, chercher, vérifier, justifier, expliquer, créer, coopérer, produire une trace.",
  biography:
    "Félix est né dans les lisières de la forêt boréale, là où la lumière hésite entre deux mondes. Très jeune, il a compris que comprendre quelque chose, ce n'est pas seulement mémoriser — c'est observer finement, chercher des preuves, vérifier ses hypothèses et savoir transmettre ce qu'on a découvert. À l'Académie Kerboeuf, il accompagne les élèves de CM2 dans leurs projets les plus ambitieux.",
  personality:
    "Curieux, méthodique et bienveillant. Félix ne donne jamais la réponse directement : il pose des questions qui font avancer. Il valorise l'effort de justification autant que le résultat.",
  strengths: [
    "Observation fine des détails",
    "Sens de la méthode et de la rigueur",
    "Capacité à relier des informations entre elles",
    "Patience pédagogique",
    "Goût pour les traces écrites et les cartes",
  ],
  vulnerabilities: [
    "Peut parfois aller trop vite pour les élèves qui ont besoin de temps",
    "Sous-estime parfois l'importance du jeu spontané",
    "Tend à chercher des preuves même quand l'intuition suffit",
  ],
  motivations: [
    "Faire de chaque élève un chercheur capable de justifier ce qu'il avance",
    "Relier les matières entre elles pour donner du sens aux apprentissages",
    "Préparer les élèves à l'entrée au collège avec confiance et méthode",
    "Laisser des traces durables du savoir construit en classe",
  ],
  voiceTone:
    "Direct, encourageant, légèrement mystérieux. Félix parle avec précision mais sait aussi raconter des histoires. Il dit « observe », « vérifie », « justifie » plutôt que « c'est bien » ou « bravo ».",
  associatedPlaces: [
    "carthotheque-des-lisieres",
    "classe-atelier",
    "observatoire",
    "agora",
    "atelier-des-objets",
    "galerie-des-empreintes",
    "jardin-des-lisieres",
  ],
  associatedBadges: [
    "pisteur-des-sources",
    "lecteur-des-indices",
    "maitre-des-mesures",
    "cartographe",
    "batisseur",
    "porte-parole",
    "gardien-du-vivant",
    "allie-du-collectif",
  ],
};

export const felixPlaces: AcademyPlace[] = [
  {
    slug: "carthotheque-des-lisieres",
    name: "Cartothèque des Lisières",
    description:
      "Une salle aux murs couverts de cartes du monde, de la France et des territoires locaux. Félix y apprend à lire, produire et critiquer des représentations spatiales.",
    activities: [
      "Lecture et construction de cartes thématiques",
      "Comparaison de territoires",
      "Repérage et orientation",
      "Production d'atlas collectifs",
    ],
    character: "felix",
    accentColor: "sky",
  },
  {
    slug: "classe-atelier",
    name: "Classe-Atelier",
    description:
      "L'espace de travail principal : tables modulables, murs d'affichage, zone de projet. C'est ici que se construisent la plupart des productions écrites et des débats.",
    activities: [
      "Rédaction de textes argumentatifs et narratifs",
      "Débats et échanges organisés",
      "Ateliers de grammaire et de vocabulaire",
      "Révision et amélioration des écrits",
    ],
    character: "felix",
    accentColor: "gold",
  },
  {
    slug: "observatoire",
    name: "Observatoire",
    description:
      "Une tour vitrée ouverte sur le ciel et la nature environnante. Félix y pratique l'observation scientifique rigoureuse : relevés, mesures, hypothèses.",
    activities: [
      "Relevés météorologiques quotidiens",
      "Observation du vivant et des phénomènes naturels",
      "Formulation et vérification d'hypothèses",
      "Tenue de carnets de bord scientifiques",
    ],
    character: "felix",
    accentColor: "jade",
  },
  {
    slug: "agora",
    name: "Agora",
    description:
      "La place publique de l'Académie. Un espace en gradins où les élèves présentent leurs travaux, défendent leurs positions et apprennent à parler en public.",
    activities: [
      "Exposés et restitutions devant la classe",
      "Conseils de classe et prise de décision collective",
      "Débats citoyens",
      "Présentations inter-niveaux",
    ],
    character: "felix",
    accentColor: "ember",
  },
  {
    slug: "atelier-des-objets",
    name: "Atelier des objets",
    description:
      "Un laboratoire de création où les élèves conçoivent, fabriquent et testent des objets utiles. Le lieu des projets technologiques et des défis de fabrication.",
    activities: [
      "Conception et fabrication d'objets fonctionnels",
      "Résolution de problèmes techniques",
      "Tests et évaluations des productions",
      "Documentation des processus de création",
    ],
    character: "felix",
    accentColor: "ember",
  },
  {
    slug: "galerie-des-empreintes",
    name: "Galerie des empreintes",
    description:
      "Un corridor-musée où sont exposées les traces du passé : documents historiques, objets, témoignages. Félix y apprend aux élèves à interroger les sources.",
    activities: [
      "Analyse de documents historiques",
      "Lecture de traces et d'artefacts",
      "Comparaison de sources et de points de vue",
      "Mise en récit du passé",
    ],
    character: "felix",
    accentColor: "gold",
  },
  {
    slug: "jardin-des-lisieres",
    name: "Jardin des lisières",
    description:
      "Un jardin pédagogique entre la forêt et les bâtiments. Félix y explore les questions de vivant, de santé et d'environnement avec les élèves.",
    activities: [
      "Observations du vivant et des écosystèmes",
      "Projets de jardinage et d'alimentation durable",
      "Exploration des questions de santé et de bien-être",
      "Activités physiques et coopératives",
    ],
    character: "felix",
    accentColor: "jade",
  },
];

export const felixBadges: AcademyBadge[] = [
  {
    slug: "pisteur-des-sources",
    name: "Pisteur des sources",
    description: "Sait identifier, citer et évaluer ses sources d'information.",
    gesture: "chercher",
    color: "gold",
  },
  {
    slug: "lecteur-des-indices",
    name: "Lecteur des indices",
    description:
      "Repère les indices implicites dans un texte, une image ou un document pour formuler une hypothèse justifiée.",
    gesture: "observer",
    color: "jade",
  },
  {
    slug: "maitre-des-mesures",
    name: "Maître des mesures",
    description:
      "Effectue des relevés rigoureux, utilise les unités adaptées et vérifie ses résultats.",
    gesture: "vérifier",
    color: "sky",
  },
  {
    slug: "cartographe",
    name: "Cartographe",
    description:
      "Lit, produit et interprète une représentation spatiale pour communiquer des informations géographiques.",
    gesture: "expliquer",
    color: "sky",
  },
  {
    slug: "batisseur",
    name: "Bâtisseur",
    description:
      "Conçoit et fabrique un objet ou une production en répondant à un cahier des charges.",
    gesture: "créer",
    color: "ember",
  },
  {
    slug: "porte-parole",
    name: "Porte-parole",
    description:
      "Présente un travail à un public, défend une position avec des arguments et répond aux questions.",
    gesture: "expliquer",
    color: "gold",
  },
  {
    slug: "gardien-du-vivant",
    name: "Gardien du vivant",
    description:
      "Observe, protège et explique les phénomènes du monde vivant avec rigueur et respect.",
    gesture: "observer",
    color: "jade",
  },
  {
    slug: "allie-du-collectif",
    name: "Allié du collectif",
    description:
      "Contribue activement à un projet commun, écoute les autres et ajuste sa contribution au groupe.",
    gesture: "coopérer",
    color: "ember",
  },
];

export function getFelixPlaceBySlug(slug: string): AcademyPlace | undefined {
  return felixPlaces.find((place) => place.slug === slug);
}

export function getFelixBadgeBySlug(slug: string): AcademyBadge | undefined {
  return felixBadges.find((badge) => badge.slug === slug);
}

export function getFelixBadgesBySlugs(slugs: string[]): AcademyBadge[] {
  return slugs
    .map(getFelixBadgeBySlug)
    .filter((b): b is AcademyBadge => Boolean(b));
}

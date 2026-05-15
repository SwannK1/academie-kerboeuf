import { elementaryPedagogicalPlaces } from "@/content/pedagogical-places";
import type { PedagogicalPlaceCycle } from "@/content/pedagogical-places";

// Internal source of truth for official place-image briefs.
// Do not import in public pages unless an authenticated internal page is added.
export type ImageBriefValidationStatus =
  | "draft"
  | "review"
  | "validated"
  | "archived";

export type ElementaryPlaceSlug = (typeof elementaryPedagogicalPlaces)[number]["slug"];

export type ImageBrief = {
  id: string;
  lieuSlug: ElementaryPlaceSlug;
  titreImage: string;
  objectifVisuel: string;
  cycle: PedagogicalPlaceCycle;
  personnagesAutorisés: readonly string[];
  personnagesInterdits: readonly string[];
  professeursAutorisés: readonly string[];
  ambiance: string;
  style: string;
  élémentsObligatoires: readonly string[];
  élémentsÀÉviter: readonly string[];
  zonesPédagogiques: readonly string[];
  contraintesUX: readonly string[];
  promptComplet: string;
  statutValidation: ImageBriefValidationStatus;
  dateValidation: string | null;
};

export const imageBriefFieldNames = [
  "id",
  "lieuSlug",
  "titreImage",
  "objectifVisuel",
  "cycle",
  "personnagesAutorisés",
  "personnagesInterdits",
  "professeursAutorisés",
  "ambiance",
  "style",
  "élémentsObligatoires",
  "élémentsÀÉviter",
  "zonesPédagogiques",
  "contraintesUX",
  "promptComplet",
  "statutValidation",
  "dateValidation",
] as const satisfies readonly (keyof ImageBrief)[];

export const elementaryImageBriefs = [
  {
    id: "image-brief-primaire-cour-des-explorateurs",
    lieuSlug: "cour-des-explorateurs",
    titreImage: "Cour des Explorateurs - seuil des missions",
    objectifVisuel:
      "Documenter l'image officielle d'entrée des Lisières, avec un point de départ clair pour les rituels, les défis courts et les coopérations.",
    cycle: "Transversal",
    personnagesAutorisés: ["Zoé", "Gaston", "Félix"],
    personnagesInterdits: ["Personnages collège", "Personnages lycée", "Figurants non identifiés"],
    professeursAutorisés: ["Zoé", "Gaston", "Félix"],
    ambiance:
      "Cour lumineuse, active sans désordre, avec une sensation d'accueil et de départ en mission.",
    style:
      "Illustration officielle semi-réaliste, formes lisibles, couleurs naturelles, niveau de détail compatible avec une carte interactive.",
    élémentsObligatoires: [
      "Carte des Lisières visible",
      "Tableau des départs",
      "Banc des hypothèses",
      "Repères de coopération",
    ],
    élémentsÀÉviter: [
      "Foule compacte",
      "Signalétique illisible",
      "Ambiance de récréation bruyante",
      "Objets modernes sans intention pédagogique",
    ],
    zonesPédagogiques: ["Tableau des départs", "Banc des hypothèses", "Carte des Lisières"],
    contraintesUX: [
      "Conserver des zones cliquables dégagées",
      "Prévoir un cadrage lisible en vignette",
      "Ne pas placer de texte essentiel trop près des bords",
    ],
    promptComplet:
      "Image officielle de la Cour des Explorateurs, seuil vivant des Lisières du primaire. Montrer une cour d'école immersive et organisée, avec une carte des Lisières, un tableau des départs, un banc des hypothèses et des repères de coopération. Ambiance lumineuse, accueillante, prête pour des rituels de mission. Style semi-réaliste, pédagogique, lisible en carte interactive. Personnages autorisés : Zoé, Gaston et Félix uniquement. Éviter foule compacte, désordre, signalétique illisible et objets décoratifs sans fonction pédagogique.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-cartotheque-des-lisieres",
    lieuSlug: "cartotheque-des-lisieres",
    titreImage: "Cartothèque des Lisières - salle des cartes",
    objectifVisuel:
      "Montrer un lieu dédié aux cartes, plans et documents, pensé pour lire, comparer et organiser l'information spatiale.",
    cycle: "Cycle 3",
    personnagesAutorisés: ["Noisette", "Félix"],
    personnagesInterdits: ["Personnages maternelle", "Personnages lycée", "Explorateurs anonymes"],
    professeursAutorisés: ["Noisette"],
    ambiance:
      "Calme d'atelier documentaire, curiosité active, sensation d'enquête géographique en cours.",
    style:
      "Illustration détaillée mais ordonnée, lumière douce, matériaux papier et bois, cartes bien distinctes.",
    élémentsObligatoires: [
      "Grand atlas collectif",
      "Table de consultation",
      "Plans superposés",
      "Mur de cartes annotées",
    ],
    élémentsÀÉviter: [
      "Cartes fantaisistes impossibles à lire",
      "Écran dominant la scène",
      "Décor d'aventure hors école",
      "Accumulation confuse de documents",
    ],
    zonesPédagogiques: ["Atlas collectif", "Table de comparaison", "Mur des itinéraires"],
    contraintesUX: [
      "Préserver des contrastes nets entre cartes et mobilier",
      "Rendre les zones documentaires reconnaissables en petit format",
      "Limiter le texte intégré dans l'image",
    ],
    promptComplet:
      "Image officielle de la Cartothèque des Lisières, salle de cartes, plans et documents du Cycle 3. Montrer un grand atlas collectif, une table de consultation, des plans superposés et un mur de cartes annotées. Ambiance calme, documentaire, propice à la comparaison d'itinéraires et à l'organisation d'informations spatiales. Style semi-réaliste, propre, chaleureux, avec des supports pédagogiques lisibles. Personnages autorisés : Noisette et Félix. Professeur autorisé : Noisette. Éviter cartes illisibles, décor d'aventure hors école et accumulation confuse.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-bibliotheque-des-explorateurs",
    lieuSlug: "bibliotheque-des-explorateurs",
    titreImage: "Bibliothèque des Explorateurs - indices de lecture",
    objectifVisuel:
      "Installer l'image d'un lieu de lecture stratégique où les indices, textes et carnets soutiennent la compréhension.",
    cycle: "Cycle 2",
    personnagesAutorisés: ["Zoé", "Félix", "Noisette"],
    personnagesInterdits: ["Personnages lycée", "Personnages collège non liés", "Bibliothécaires anonymes"],
    professeursAutorisés: ["Zoé", "Félix"],
    ambiance:
      "Concentration douce, mystère léger, plaisir de chercher dans les livres sans dramatisation.",
    style:
      "Bibliothèque chaleureuse, étagères basses, carnets ouverts, éclairage naturel, détails de lecture guidée.",
    élémentsObligatoires: [
      "Étagères de livres accessibles",
      "Table de lecture avec carnets",
      "Marque-pages d'indices",
      "Coin lecture calme",
    ],
    élémentsÀÉviter: [
      "Bibliothèque sombre",
      "Livres volants ou magiques",
      "Texte lisible trop long",
      "Décor adulte ou universitaire",
    ],
    zonesPédagogiques: ["Table des indices", "Coin lecture", "Étagères thématiques"],
    contraintesUX: [
      "Garder une zone centrale claire pour les hotspots",
      "Éviter les micro-textes",
      "Maintenir une ambiance lumineuse sur mobile",
    ],
    promptComplet:
      "Image officielle de la Bibliothèque des Explorateurs, lieu de lecture guidée du primaire. Montrer des étagères accessibles, une table de lecture avec carnets, des marque-pages d'indices et un coin lecture calme. L'image doit évoquer l'inférence, la compréhension et la justification par les preuves du texte. Ambiance chaleureuse, concentrée, légèrement mystérieuse mais rassurante. Style semi-réaliste, pédagogique, lisible en vignette. Personnages autorisés : Zoé, Félix et Noisette. Éviter bibliothèque sombre, effets magiques, longs textes intégrés et décor universitaire.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-atelier-des-mathematiques",
    lieuSlug: "atelier-des-mathematiques",
    titreImage: "Atelier des Mathématiques - manipulation et stratégies",
    objectifVisuel:
      "Présenter un atelier de manipulation mathématique où calcul, problèmes et vérification sont visibles.",
    cycle: "Cycle 2",
    personnagesAutorisés: ["Gaston", "Zoé", "Félix"],
    personnagesInterdits: ["Personnages lycée", "Personnages collège", "Mascottes décoratives"],
    professeursAutorisés: ["Gaston"],
    ambiance:
      "Rigoureuse mais ludique, avec une impression de méthode, d'essai et de vérification.",
    style:
      "Atelier clair, supports concrets, tables organisées, couleurs variées sans surcharge.",
    élémentsObligatoires: [
      "Matériel de numération",
      "Ardoises de stratégies",
      "Table de problèmes",
      "Espace de vérification",
    ],
    élémentsÀÉviter: [
      "Formules avancées hors primaire",
      "Calculs faux visibles",
      "Tableaux saturés",
      "Style laboratoire scientifique",
    ],
    zonesPédagogiques: ["Table de manipulation", "Mur des stratégies", "Espace de vérification"],
    contraintesUX: [
      "Rendre les objets mathématiques identifiables",
      "Ne pas dépendre d'équations lisibles",
      "Préserver une composition stable pour les cartes de lieu",
    ],
    promptComplet:
      "Image officielle de l'Atelier des Mathématiques, salle de manipulation et de résolution de problèmes du primaire. Montrer du matériel de numération, des ardoises de stratégies, une table de problèmes et un espace de vérification. Ambiance méthodique, positive, avec le sentiment que les élèves passent de la manipulation à l'explication. Style semi-réaliste, clair, vivant sans surcharge. Personnages autorisés : Gaston, Zoé et Félix. Professeur autorisé : Gaston. Éviter formules avancées, calculs faux visibles, tableaux saturés et esthétique de laboratoire.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-observatoire",
    lieuSlug: "observatoire",
    titreImage: "Observatoire - mesurer et garder trace",
    objectifVisuel:
      "Documenter un espace d'observation pour décrire, mesurer, comparer et stabiliser des traces.",
    cycle: "Cycle 2",
    personnagesAutorisés: ["Esteban", "Noisette"],
    personnagesInterdits: ["Astronautes", "Personnages lycée", "Personnages fantastiques"],
    professeursAutorisés: ["Esteban"],
    ambiance:
      "Émerveillement calme, précision, regard attentif sur le monde proche.",
    style:
      "Observatoire scolaire lumineux, instruments simples, carnets d'observation, vues sur le ciel et le jardin.",
    élémentsObligatoires: [
      "Longue-vue ou jumelles pédagogiques",
      "Carnets d'observation",
      "Repères de mesure",
      "Fenêtre ou terrasse d'observation",
    ],
    élémentsÀÉviter: [
      "Science-fiction",
      "Télescope monumental",
      "Ciel nocturne trop sombre",
      "Objets dangereux ou techniques hors primaire",
    ],
    zonesPédagogiques: ["Poste d'observation", "Table de mesure", "Carnets de traces"],
    contraintesUX: [
      "Assurer une lecture claire des instruments",
      "Éviter les arrière-plans trop sombres",
      "Conserver une profondeur simple pour les hotspots",
    ],
    promptComplet:
      "Image officielle de l'Observatoire du primaire, lieu pour observer, mesurer, comparer et garder trace. Montrer une longue-vue ou des jumelles pédagogiques, des carnets d'observation, des repères de mesure et une fenêtre ou terrasse ouverte sur le ciel et le jardin. Ambiance calme, précise, émerveillée. Style semi-réaliste, scolaire, lumineux, sans science-fiction. Personnages autorisés : Esteban et Noisette. Professeur autorisé : Esteban. Éviter télescope monumental, ciel trop sombre, matériel dangereux et effets spatiaux.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-laboratoire",
    lieuSlug: "laboratoire",
    titreImage: "Laboratoire - hypothèses et expériences simples",
    objectifVisuel:
      "Montrer un laboratoire de Cycle 3 centré sur l'hypothèse, l'expérience simple et la conclusion argumentée.",
    cycle: "Cycle 3",
    personnagesAutorisés: ["Esteban", "Félix", "Noisette"],
    personnagesInterdits: ["Scientifiques anonymes", "Personnages lycée", "Techniciens adultes"],
    professeursAutorisés: ["Esteban"],
    ambiance:
      "Curiosité structurée, prudence, coopération autour d'expériences accessibles.",
    style:
      "Salle de sciences propre, matériel simple et sécurisé, palette claire avec accents végétaux et minéraux.",
    élémentsObligatoires: [
      "Table d'expérience sécurisée",
      "Fiches d'hypothèses",
      "Échantillons simples",
      "Zone de conclusions",
    ],
    élémentsÀÉviter: [
      "Produits chimiques inquiétants",
      "Fumée spectaculaire",
      "Matériel médical",
      "Expérience impossible à identifier",
    ],
    zonesPédagogiques: ["Table d'expérience", "Mur des hypothèses", "Zone de conclusions"],
    contraintesUX: [
      "Ne pas créer d'impression de danger",
      "Garder les supports principaux bien séparés",
      "Prévoir une version recadrable sans perdre la table centrale",
    ],
    promptComplet:
      "Image officielle du Laboratoire du primaire, lieu de Cycle 3 pour questionner, tester et conclure. Montrer une table d'expérience sécurisée, des fiches d'hypothèses, des échantillons simples et une zone de conclusions. Ambiance de curiosité structurée, coopération calme, matériel accessible à des élèves de primaire. Style semi-réaliste, clair, pédagogique. Personnages autorisés : Esteban, Félix et Noisette. Professeur autorisé : Esteban. Éviter fumée spectaculaire, produits inquiétants, matériel médical et expériences confuses.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-salle-informatique",
    lieuSlug: "salle-informatique",
    titreImage: "Salle Informatique - recherche responsable",
    objectifVisuel:
      "Présenter un espace numérique scolaire centré sur la recherche, l'organisation et la publication responsable.",
    cycle: "Cycle 3",
    personnagesAutorisés: ["Noisette", "Félix", "Esteban"],
    personnagesInterdits: ["Personnages lycée", "Avatars numériques", "Robots assistants"],
    professeursAutorisés: ["Noisette", "Félix"],
    ambiance:
      "Calme, méthodique, moderne sans fascination technologique excessive.",
    style:
      "Salle informatique claire, postes sobres, affichages de méthode, lumière naturelle, câbles discrets.",
    élémentsObligatoires: [
      "Postes informatiques alignés",
      "Affichage de recherche responsable",
      "Espace de production numérique",
      "Carnets ou fiches de méthode",
    ],
    élémentsÀÉviter: [
      "Écrans remplis de marques",
      "Interface futuriste",
      "Cyberambiance sombre",
      "Données personnelles visibles",
    ],
    zonesPédagogiques: ["Postes de recherche", "Mur des méthodes numériques", "Table de publication"],
    contraintesUX: [
      "Aucun logo réel sur les écrans",
      "Aucune donnée personnelle lisible",
      "Conserver des écrans assez neutres pour durer",
    ],
    promptComplet:
      "Image officielle de la Salle Informatique du primaire, espace numérique pour rechercher, produire, organiser et publier avec méthode. Montrer des postes informatiques sobres, un affichage de recherche responsable, une table de production numérique et des fiches de méthode. Ambiance calme, moderne, scolaire, sans fascination technologique excessive. Style semi-réaliste, lumineux, lisible. Personnages autorisés : Noisette, Félix et Esteban. Professeurs autorisés : Noisette et Félix. Éviter logos réels, données personnelles, interface futuriste et cyberambiance sombre.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-salle-arts",
    lieuSlug: "salle-arts",
    titreImage: "Salle d'Arts - composer et restituer",
    objectifVisuel:
      "Montrer une salle de création où observer, composer, illustrer et présenter une démarche sont visibles.",
    cycle: "Transversal",
    personnagesAutorisés: ["Zoé", "Noisette", "Félix"],
    personnagesInterdits: ["Artistes adultes anonymes", "Personnages lycée", "Décor de musée"],
    professeursAutorisés: ["Zoé", "Noisette"],
    ambiance:
      "Créative, claire, vivante, avec des productions en cours mais un espace maîtrisé.",
    style:
      "Atelier d'arts scolaire, matières visibles, couleurs équilibrées, détails de gestes créatifs.",
    élémentsObligatoires: [
      "Tables de création",
      "Panneau de démarches",
      "Matériel artistique rangé",
      "Espace de présentation",
    ],
    élémentsÀÉviter: [
      "Taches envahissantes",
      "Œuvres connues reconnaissables",
      "Désordre total",
      "Palette monochrome",
    ],
    zonesPédagogiques: ["Tables de création", "Mur des démarches", "Espace de restitution"],
    contraintesUX: [
      "Éviter les détails trop fins dans les productions",
      "Garder le panneau de démarches identifiable sans texte long",
      "Prévoir des contrastes suffisants pour les boutons superposés",
    ],
    promptComplet:
      "Image officielle de la Salle d'Arts du primaire, lieu pour observer, composer, illustrer et restituer une démarche. Montrer des tables de création, un panneau de démarches, du matériel artistique rangé et un espace de présentation. Ambiance créative, claire, vivante, sans désordre excessif. Style semi-réaliste, scolaire, coloré mais équilibré. Personnages autorisés : Zoé, Noisette et Félix. Professeurs autorisés : Zoé et Noisette. Éviter œuvres connues reconnaissables, décor de musée, taches envahissantes et palette monochrome.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-gymnase",
    lieuSlug: "gymnase",
    titreImage: "Gymnase - règles, coopération et mesure",
    objectifVisuel:
      "Présenter un gymnase primaire qui relie activité physique, coopération, mesure et verbalisation des stratégies.",
    cycle: "Transversal",
    personnagesAutorisés: ["Gaston", "Félix", "Esteban"],
    personnagesInterdits: ["Sportifs professionnels", "Public dans les gradins", "Personnages lycée"],
    professeursAutorisés: ["Gaston", "Félix"],
    ambiance:
      "Énergique, coopérative, sécurisée, avec un effort lisible mais non compétitif.",
    style:
      "Gymnase scolaire lumineux, marquages simples au sol, matériel EPS rangé par ateliers.",
    élémentsObligatoires: [
      "Marquages au sol",
      "Zone de règles collectives",
      "Atelier de mesure",
      "Matériel EPS sécurisé",
    ],
    élémentsÀÉviter: [
      "Compétition agressive",
      "Gradins remplis",
      "Postures dangereuses",
      "Équipement de sport professionnel dominant",
    ],
    zonesPédagogiques: ["Zone des règles", "Atelier de mesure", "Parcours coopératif"],
    contraintesUX: [
      "Laisser de l'espace visuel autour des zones d'action",
      "Rendre les consignes compréhensibles par pictogrammes",
      "Éviter les poses ambiguës ou risquées",
    ],
    promptComplet:
      "Image officielle du Gymnase du primaire, espace moteur pour coopérer, mesurer ses progrès et respecter des règles communes. Montrer des marquages au sol, une zone de règles collectives, un atelier de mesure et du matériel EPS sécurisé. Ambiance énergique, coopérative, scolaire, sans compétition agressive. Style semi-réaliste, lumineux, lisible en carte interactive. Personnages autorisés : Gaston, Félix et Esteban. Professeurs autorisés : Gaston et Félix. Éviter public en gradins, postures dangereuses et équipement professionnel dominant.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-salle-danse-expression",
    lieuSlug: "salle-danse-expression",
    titreImage: "Salle de Danse et Expression - geste et récit",
    objectifVisuel:
      "Montrer un lieu d'expression corporelle et orale où les émotions, récits et intentions peuvent être travaillés.",
    cycle: "Transversal",
    personnagesAutorisés: ["Zoé", "Félix", "Noisette"],
    personnagesInterdits: ["Danseurs professionnels", "Public de spectacle", "Personnages lycée"],
    professeursAutorisés: ["Zoé", "Félix"],
    ambiance:
      "Ouverte, sensible, sécurisante, avec un mouvement suggéré sans scène de spectacle.",
    style:
      "Salle polyvalente douce, miroir partiel, tapis ou repères au sol, lumière diffuse.",
    élémentsObligatoires: [
      "Repères de placement au sol",
      "Espace central dégagé",
      "Supports d'émotions ou d'intentions",
      "Coin de verbalisation",
    ],
    élémentsÀÉviter: [
      "Scène théâtrale frontale",
      "Costumes spectaculaires",
      "Miroir envahissant",
      "Ambiance de performance",
    ],
    zonesPédagogiques: ["Espace central", "Coin de verbalisation", "Mur des intentions"],
    contraintesUX: [
      "Maintenir le centre de l'image dégagé",
      "Éviter les reflets complexes",
      "Assurer une lecture inclusive et non performative",
    ],
    promptComplet:
      "Image officielle de la Salle de Danse et Expression du primaire, lieu pour mettre en mouvement les émotions, les récits et les intentions. Montrer un espace central dégagé, des repères de placement au sol, des supports d'émotions ou d'intentions et un coin de verbalisation. Ambiance sensible, ouverte, sécurisante, sans performance spectaculaire. Style semi-réaliste, doux, scolaire, lisible. Personnages autorisés : Zoé, Félix et Noisette. Professeurs autorisés : Zoé et Félix. Éviter scène frontale, public, costumes spectaculaires et miroir envahissant.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-salle-musique",
    lieuSlug: "salle-musique",
    titreImage: "Salle de Musique - écoute, rythme et mémoire",
    objectifVisuel:
      "Présenter un espace d'écoute et de rythme qui soutient la mémorisation et la restitution collective.",
    cycle: "Transversal",
    personnagesAutorisés: ["Zoé", "Gaston", "Noisette"],
    personnagesInterdits: ["Groupe de concert", "Personnages lycée", "Public de spectacle"],
    professeursAutorisés: ["Zoé", "Gaston"],
    ambiance:
      "Écoute active, rythme collectif, calme joyeux, sans volume sonore suggéré comme excessif.",
    style:
      "Salle de musique scolaire, instruments simples, cercles d'écoute, affichages rythmiques sobres.",
    élémentsObligatoires: [
      "Instruments simples",
      "Cercle d'écoute",
      "Affichage de rythmes",
      "Espace de restitution collective",
    ],
    élémentsÀÉviter: [
      "Concert rock",
      "Instruments trop coûteux ou adultes",
      "Notes de musique envahissantes",
      "Ambiance de scène",
    ],
    zonesPédagogiques: ["Cercle d'écoute", "Table des instruments", "Mur des rythmes"],
    contraintesUX: [
      "Éviter la surcharge de symboles musicaux",
      "Rendre les instruments identifiables",
      "Garder une composition calme pour les élèves sensibles au bruit",
    ],
    promptComplet:
      "Image officielle de la Salle de Musique du primaire, espace d'écoute, de rythme et de mémoire orale. Montrer des instruments simples, un cercle d'écoute, un affichage de rythmes et un espace de restitution collective. Ambiance d'écoute active, calme joyeux, rythme partagé, sans scène de spectacle. Style semi-réaliste, scolaire, chaleureux, lisible. Personnages autorisés : Zoé, Gaston et Noisette. Professeurs autorisés : Zoé et Gaston. Éviter concert rock, public, notes envahissantes et instruments adultes dominants.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-voyage-decouverte",
    lieuSlug: "voyage-decouverte",
    titreImage: "Voyage Découverte - parcours d'enquête",
    objectifVisuel:
      "Montrer un lieu-parcours qui relie préparation, sortie, collecte de traces et restitution de découverte.",
    cycle: "Transversal",
    personnagesAutorisés: ["Esteban", "Noisette", "Félix"],
    personnagesInterdits: ["Touristes anonymes", "Guides adultes", "Personnages lycée"],
    professeursAutorisés: ["Esteban", "Noisette"],
    ambiance:
      "Départ curieux, enquête organisée, sensation d'ouverture hors de la classe sans perdre le cadre scolaire.",
    style:
      "Composition en parcours, panneaux de préparation, sacs de traces, carte d'itinéraire, extérieur lumineux.",
    élémentsObligatoires: [
      "Carte d'itinéraire",
      "Carnets de collecte",
      "Panneau de questions d'enquête",
      "Point de départ identifiable",
    ],
    élémentsÀÉviter: [
      "Paysage touristique générique",
      "Bus dominant l'image",
      "Aventure dangereuse",
      "Hors-sujet vacances",
    ],
    zonesPédagogiques: ["Point de départ", "Panneau d'enquête", "Table des traces"],
    contraintesUX: [
      "Garder le parcours lisible en format horizontal",
      "Éviter un arrière-plan trop descriptif",
      "Prévoir des repères visuels pour navigation interne",
    ],
    promptComplet:
      "Image officielle du Voyage Découverte du primaire, lieu-parcours pour relier sorties, projets et enquêtes documentaires. Montrer une carte d'itinéraire, des carnets de collecte, un panneau de questions d'enquête et un point de départ identifiable. Ambiance curieuse, organisée, ouverte sur l'extérieur, avec un cadre scolaire clair. Style semi-réaliste, lumineux, narratif mais lisible. Personnages autorisés : Esteban, Noisette et Félix. Professeurs autorisés : Esteban et Noisette. Éviter paysage touristique générique, bus dominant, aventure dangereuse et ambiance vacances.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-jardin-des-lisieres",
    lieuSlug: "jardin-des-lisieres",
    titreImage: "Jardin des Lisières - vivant et saisons",
    objectifVisuel:
      "Documenter un jardin pédagogique pour observer le vivant, les saisons et les gestes responsables.",
    cycle: "Transversal",
    personnagesAutorisés: ["Esteban", "Zoé", "Noisette"],
    personnagesInterdits: ["Jardiniers anonymes", "Personnages lycée", "Décor de parc public"],
    professeursAutorisés: ["Esteban", "Zoé"],
    ambiance:
      "Nature proche, soin, observation patiente, écologie concrète et accessible.",
    style:
      "Jardin scolaire structuré, bacs de culture, étiquettes sobres, outils simples, lumière naturelle.",
    élémentsObligatoires: [
      "Bacs de culture",
      "Carnets d'observation",
      "Repères de saison",
      "Zone de gestes responsables",
    ],
    élémentsÀÉviter: [
      "Jungle dense",
      "Parc décoratif sans pédagogie",
      "Outils dangereux",
      "Plantes fantastiques",
    ],
    zonesPédagogiques: ["Bacs de culture", "Table d'observation", "Zone des saisons"],
    contraintesUX: [
      "Éviter la végétation qui masque les zones cliquables",
      "Préserver un contraste entre supports et plantes",
      "Ne pas dépendre d'étiquettes longues",
    ],
    promptComplet:
      "Image officielle du Jardin des Lisières, jardin pédagogique du primaire pour observer le vivant, les saisons et les gestes responsables. Montrer des bacs de culture, des carnets d'observation, des repères de saison et une zone de gestes responsables. Ambiance de nature proche, soin, observation patiente et écologie concrète. Style semi-réaliste, lumineux, structuré, scolaire. Personnages autorisés : Esteban, Zoé et Noisette. Professeurs autorisés : Esteban et Zoé. Éviter jungle dense, parc purement décoratif, outils dangereux et plantes fantastiques.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-refectoire-des-explorateurs",
    lieuSlug: "refectoire-des-explorateurs",
    titreImage: "Réfectoire des Explorateurs - règles de vie et alimentation",
    objectifVisuel:
      "Montrer un lieu de vie collective qui soutient alimentation, langage, coopération et règles partagées.",
    cycle: "Transversal",
    personnagesAutorisés: ["Zoé", "Gaston", "Esteban"],
    personnagesInterdits: ["Personnel de restauration identifiable", "Personnages lycée", "Foule à table"],
    professeursAutorisés: ["Zoé", "Gaston"],
    ambiance:
      "Conviviale, calme, organisée, avec une dimension d'EMC et de vocabulaire plutôt qu'une simple cantine.",
    style:
      "Réfectoire scolaire chaleureux, tables propres, affichages de règles, repères alimentaires simples.",
    élémentsObligatoires: [
      "Tables collectives ordonnées",
      "Affichage de règles partagées",
      "Repères alimentaires",
      "Zone de tri ou de gestes responsables",
    ],
    élémentsÀÉviter: [
      "Assiettes trop détaillées",
      "Marques alimentaires",
      "File d'attente encombrée",
      "Ambiance bruyante",
    ],
    zonesPédagogiques: ["Tables collectives", "Mur des règles", "Zone des gestes responsables"],
    contraintesUX: [
      "Aucune marque alimentaire visible",
      "Éviter les visages nombreux et serrés",
      "Garder les affichages compréhensibles par pictogrammes",
    ],
    promptComplet:
      "Image officielle du Réfectoire des Explorateurs, lieu de vie du primaire pour travailler alimentation, coopération, langage et règles partagées. Montrer des tables collectives ordonnées, un affichage de règles partagées, des repères alimentaires simples et une zone de tri ou de gestes responsables. Ambiance conviviale, calme, organisée, scolaire. Style semi-réaliste, chaleureux, sans surcharge. Personnages autorisés : Zoé, Gaston et Esteban. Professeurs autorisés : Zoé et Gaston. Éviter marques alimentaires, foule à table, file d'attente encombrée et ambiance bruyante.",
    statutValidation: "draft",
    dateValidation: null,
  },
  {
    id: "image-brief-primaire-couloirs-des-traces",
    lieuSlug: "couloirs-des-traces",
    titreImage: "Couloirs des Traces - mémoire des apprentissages",
    objectifVisuel:
      "Documenter un espace d'affichage progressif où les méthodes, productions et réussites restent visibles.",
    cycle: "Transversal",
    personnagesAutorisés: ["Zoé", "Gaston", "Esteban", "Noisette", "Félix"],
    personnagesInterdits: ["Personnages collège", "Personnages lycée", "Visiteurs anonymes"],
    professeursAutorisés: ["Zoé", "Gaston", "Esteban", "Noisette", "Félix"],
    ambiance:
      "Mémoire collective, circulation calme, fierté des productions et repères méthodologiques.",
    style:
      "Couloir scolaire lumineux, panneaux d'affichage ordonnés, frise de méthodes, galerie de productions.",
    élémentsObligatoires: [
      "Frise des méthodes",
      "Galerie des productions",
      "Panneaux de réussites",
      "Chemin de circulation dégagé",
    ],
    élémentsÀÉviter: [
      "Couloir vide",
      "Affichages illisibles et saturés",
      "Perspective sombre",
      "Décor administratif",
    ],
    zonesPédagogiques: ["Frise des méthodes", "Galerie des productions", "Panneaux de réussites"],
    contraintesUX: [
      "Préserver une perspective claire",
      "Limiter les micro-textes dans les affichages",
      "Permettre un recadrage vertical et horizontal",
    ],
    promptComplet:
      "Image officielle des Couloirs des Traces, espace d'affichage progressif du primaire pour garder mémoire des méthodes, productions et réussites. Montrer une frise des méthodes, une galerie de productions, des panneaux de réussites et un chemin de circulation dégagé. Ambiance de mémoire collective, fierté calme, réutilisation des apprentissages. Style semi-réaliste, lumineux, ordonné, scolaire. Personnages autorisés : Zoé, Gaston, Esteban, Noisette et Félix. Professeurs autorisés : Zoé, Gaston, Esteban, Noisette et Félix. Éviter couloir vide, affichages saturés, perspective sombre et décor administratif.",
    statutValidation: "draft",
    dateValidation: null,
  },
] as const satisfies readonly ImageBrief[];

export function getElementaryImageBriefs() {
  return [...elementaryImageBriefs];
}

export function getElementaryImageBriefByLieuSlug(lieuSlug: ElementaryPlaceSlug) {
  return elementaryImageBriefs.find((brief) => brief.lieuSlug === lieuSlug);
}

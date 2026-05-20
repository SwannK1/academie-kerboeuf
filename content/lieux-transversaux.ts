import type { AccentKey } from "@/content/universe";

export type LieuTransversalStatut =
  | "disponible"
  | "bientôt"
  | "en construction";

export type LieuTransversal = {
  id: string;
  nom: string;
  fonctionUX: string;
  fonctionPedagogique: string;
  cyclesConcernes: string[];
  usageDansSite: string;
  liensPossibles: string[];
  statut: LieuTransversalStatut;
  descriptionCourte: string;
  descriptionLongue: string;
  elementsVisuels: string[];
  zonesInteractives?: string[];
  accentColor: AccentKey;
  route?: string;
};

export const lieuxTransversaux: LieuTransversal[] = [
  {
    id: "accueil",
    nom: "L'Accueil",
    fonctionUX:
      "Point d'entrée universel de l'Académie — oriente l'élève, le professeur ou le visiteur vers son univers.",
    fonctionPedagogique:
      "Accueillir, rassurer et orienter vers le bon niveau ou le bon projet, quel que soit le cycle.",
    cyclesConcernes: ["Cycle 1", "Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Page d'accueil principale et carte globale de navigation entre les ailes de l'Académie.",
    liensPossibles: ["/", "/maternelle", "/primaire", "/college", "/lycee", "/carte"],
    statut: "disponible",
    descriptionCourte:
      "Le seuil de l'Académie. On y choisit sa direction avant d'entrer dans un univers.",
    descriptionLongue:
      "L'Accueil de l'Académie Kerboeuf est le lieu transversal par excellence : il accueille tout le monde, de la Petite Section à la Terminale, sans appartenir à un cycle précis. Son rôle est de donner une vision d'ensemble, d'orienter vers la bonne aile et de signaler les missions ou ressources disponibles en ce moment. Sur le site, il correspond à la page d'accueil et à la Carte de l'Académie.",
    elementsVisuels: [
      "Logo de l'Académie",
      "Portail animé avec 4 ailes",
      "Indicateurs de statut des univers",
      "Accès rapides aux missions récentes",
    ],
    zonesInteractives: [
      "Sélecteur d'univers (Maternelle / Primaire / Collège / Lycée)",
      "Accès aux missions récentes",
      "Lien vers la Carte de l'Académie",
    ],
    accentColor: "jade",
    route: "/",
  },
  {
    id: "couloirs",
    nom: "Les Couloirs",
    fonctionUX:
      "Espaces de transition entre les sections — maintiennent la continuité narrative et visuelle entre les univers.",
    fonctionPedagogique:
      "Métaphoriser le passage d'un cycle à l'autre et maintenir la cohérence pédagogique de l'ensemble.",
    cyclesConcernes: ["Cycle 1", "Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Navigation breadcrumb, transitions entre niveaux, liens croisés entre les ailes de l'Académie.",
    liensPossibles: ["/univers", "/carte"],
    statut: "en construction",
    descriptionCourte:
      "Les couloirs relient les ailes sans les mélanger. Ils signalent qu'on change de territoire.",
    descriptionLongue:
      "Dans l'Académie Kerboeuf, les couloirs ne sont pas des zones neutres : ils portent des éléments de repérage (couleurs, symboles de niveaux, capsules de méthode) qui préparent l'élève au passage d'un univers à l'autre. Sur le site, les couloirs correspondent aux composants de navigation transversale : breadcrumb, liens croisés entre niveaux et indicateurs de cycle. Leur rôle est de ne jamais laisser l'utilisateur sans contexte de position dans l'Académie.",
    elementsVisuels: [
      "Breadcrumb de navigation",
      "Repères colorés par cycle",
      "Pictogrammes de niveau",
      "Capsules de transition pédagogique",
    ],
    zonesInteractives: [
      "Fil d'Ariane cliquable",
      "Indicateur de cycle courant",
    ],
    accentColor: "sky",
  },
  {
    id: "escaliers",
    nom: "Les Escaliers",
    fonctionUX:
      "Liens de progression entre cycles — ascension logique du Cycle 1 au Lycée.",
    fonctionPedagogique:
      "Visualiser la progression pédagogique verticale et préparer les grandes transitions entre cycles.",
    cyclesConcernes: ["Cycle 1", "Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Composants de navigation inter-niveaux, CTA de passage (ex : Continuer vers le primaire), carte de progression.",
    liensPossibles: ["/univers", "/carte", "/primaire", "/college", "/lycee"],
    statut: "en construction",
    descriptionCourte:
      "Les escaliers matérialisent la progression : chaque marche est un cycle, chaque palier une transition.",
    descriptionLongue:
      "Les escaliers de l'Académie sont le dispositif narratif qui signifie la montée en exigence et en autonomie. Sur le site, ils prennent la forme de blocs CTA de transition (« Continuer vers le primaire », « Préparer l'entrée au collège »), de liens progressifs entre les pages de niveaux et de la Carte de l'Académie qui montre l'ensemble de la progression. Ils garantissent que l'élève comprend toujours où il est dans son parcours global.",
    elementsVisuels: [
      "Indicateurs de palier (Cycle 1 → Lycée)",
      "Blocs de transition entre niveaux",
      "Pictogramme d'ascension progressive",
    ],
    zonesInteractives: [
      "CTA de passage inter-niveaux",
      "Vue progression sur la Carte de l'Académie",
    ],
    accentColor: "gold",
  },
  {
    id: "cour",
    nom: "La Cour",
    fonctionUX:
      "Espace ouvert de rencontre entre personnages de tous niveaux — galerie commune et croisement des univers.",
    fonctionPedagogique:
      "Encourager les interactions entre cycles et montrer que les élèves appartiennent tous à la même Académie.",
    cyclesConcernes: ["Cycle 1", "Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Galerie des élèves emblématiques, section des personnages et des profils croisés.",
    liensPossibles: ["/eleves", "/professeurs", "/univers"],
    statut: "bientôt",
    descriptionCourte:
      "La cour est le seul lieu où Yuki (PS) et Akira (Terminale) peuvent se croiser.",
    descriptionLongue:
      "La Cour de l'Académie Kerboeuf est l'espace symbolique de la communauté scolaire. Elle accueille tous les personnages — élèves et professeurs — sans distinction de niveau. Sur le site, elle se traduit par la galerie des élèves emblématiques et les profils croisés entre cycles. C'est un lieu de respiration dans la progression pédagogique : on peut s'y arrêter, observer les autres profils, découvrir d'autres méthodes d'apprentissage.",
    elementsVisuels: [
      "Grille de portraits d'élèves",
      "Filtres par cycle",
      "Cartes de personnages interactives",
    ],
    zonesInteractives: [
      "Galerie filtrée par niveau",
      "Accès aux profils d'élèves",
    ],
    accentColor: "jade",
  },
  {
    id: "cantine",
    nom: "La Cantine",
    fonctionUX:
      "Espace communautaire neutre — moment de pause dans la progression, vie commune de l'Académie.",
    fonctionPedagogique:
      "Représenter l'appartenance à une communauté scolaire partagée et valoriser les temps informels.",
    cyclesConcernes: ["Cycle 1", "Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Contexte narratif des personnages, anecdotes de vie d'Académie, future page communautaire.",
    liensPossibles: ["/eleves", "/univers"],
    statut: "bientôt",
    descriptionCourte:
      "La cantine est le seul lieu où tout le monde mange ensemble, sans hiérarchie de cycle.",
    descriptionLongue:
      "La Cantine de l'Académie Kerboeuf joue un rôle narratif important : elle rappelle que malgré les univers distincts, tous les élèves et professeurs partagent une vie commune. Sur le site, cet espace n'a pas encore de page dédiée, mais il nourrit les anecdotes de personnages, les descriptions biographiques et les moments de vie d'Académie dans les profils de professeurs et d'élèves.",
    elementsVisuels: [
      "Illustrations de vie commune",
      "Bulles de dialogue entre personnages",
      "Ambiance narrative chaleureuse",
    ],
    accentColor: "gold",
  },
  {
    id: "espaces-exterieurs",
    nom: "Les Espaces Extérieurs",
    fonctionUX:
      "Zones d'exploration libres — projets ouverts, activités de terrain, apprentissages informels.",
    fonctionPedagogique:
      "Favoriser l'observation directe, la curiosité naturelle et les apprentissages en dehors de la salle.",
    cyclesConcernes: ["Cycle 1", "Cycle 2", "Cycle 3"],
    usageDansSite:
      "Ressources de terrain pour maternelle et primaire, missions d'exploration, liens vers ressources imprimables.",
    liensPossibles: ["/ressources", "/primaire", "/maternelle"],
    statut: "bientôt",
    descriptionCourte:
      "Hors des murs, l'Académie continue. Les espaces extérieurs sont les terrains d'observation privilégiés des premiers cycles.",
    descriptionLongue:
      "Les Espaces Extérieurs de l'Académie Kerboeuf sont principalement pensés pour les cycles 1, 2 et 3, là où l'exploration physique est encore au cœur des apprentissages. Sur le site, ils correspondent aux ressources de terrain (observations, expériences simples, sorties pédagogiques) et aux missions d'exploration disponibles en maternelle et au primaire.",
    elementsVisuels: [
      "Cartes de territoire",
      "Pictogrammes d'exploration",
      "Fiches terrain imprimables",
    ],
    zonesInteractives: [
      "Lien vers ressources terrain",
      "Missions d'exploration par cycle",
    ],
    accentColor: "jade",
  },
  {
    id: "maisons-familles",
    nom: "Les Maisons / Familles",
    fonctionUX:
      "Pont entre l'Académie et le foyer — ressources accessibles hors classe, à faire en famille.",
    fonctionPedagogique:
      "Articuler les apprentissages scolaires avec le monde réel et valoriser l'environnement familial comme lieu d'apprentissage.",
    cyclesConcernes: ["Cycle 1", "Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Ressources à imprimer, parcours à faire en famille, fiches de méthode à ramener à la maison.",
    liensPossibles: ["/ressources", "/parcours"],
    statut: "bientôt",
    descriptionCourte:
      "L'Académie suit l'élève jusqu'à la maison — les Maisons sont le prolongement familial des apprentissages.",
    descriptionLongue:
      "Les Maisons et Familles représentent le troisième lieu de l'élève, entre l'Académie et le monde réel. Sur le site, cet espace prend la forme de ressources imprimables, de fiches méthode à ramener à la maison et de parcours adaptés à une pratique autonome en dehors du temps scolaire. L'objectif est de permettre aux familles de comprendre et d'accompagner la progression de l'élève.",
    elementsVisuels: [
      "Fiches méthode imprimables",
      "Icônes de niveau à imprimer",
      "Ressources illustrées pour parents",
    ],
    zonesInteractives: [
      "Accès aux ressources imprimables",
      "Parcours en autonomie",
    ],
    accentColor: "ember",
  },
  {
    id: "tableau-missions",
    nom: "Le Tableau des Missions",
    fonctionUX:
      "Hub centralisé des missions — disponibles, à venir et en préparation, sur tous les niveaux.",
    fonctionPedagogique:
      "Donner à l'élève et au professeur une vision globale des activités disponibles et de la progression possible.",
    cyclesConcernes: ["Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Page des missions récentes, catalogues par niveau, accès aux missions CM2 disponibles.",
    liensPossibles: ["/missions-recentes", "/primaire/cm2/missions", "/parcours"],
    statut: "disponible",
    descriptionCourte:
      "Sur ce tableau, toutes les missions de l'Académie sont affichées : disponibles, à venir ou en construction.",
    descriptionLongue:
      "Le Tableau des Missions est le dispositif de pilotage de la progression à l'Académie Kerboeuf. Il affiche l'ensemble des missions classées par statut et par niveau. Sur le site, il correspond à la page des missions récentes et aux catalogues par niveaux. Le tableau est dynamique : les missions s'enrichissent au fil du temps, et les statuts évoluent de « en construction » à « disponible ».",
    elementsVisuels: [
      "Grille de cartes de missions",
      "Badges de statut (disponible / à venir / en construction)",
      "Filtres par niveau et par matière",
    ],
    zonesInteractives: [
      "Filtres par niveau",
      "Filtres par matière",
      "Liens vers missions disponibles",
    ],
    accentColor: "gold",
    route: "/missions-recentes",
  },
  {
    id: "mur-badges",
    nom: "Le Mur des Badges",
    fonctionUX:
      "Espace de valorisation des compétences — les badges signalent les acquis validés par niveau.",
    fonctionPedagogique:
      "Encourager la progression par la reconnaissance visible des compétences acquises et des missions accomplies.",
    cyclesConcernes: ["Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Badges de compétences dans les missions CM2, profils d'élèves, futurs systèmes de progression.",
    liensPossibles: ["/eleves", "/primaire/cm2"],
    statut: "bientôt",
    descriptionCourte:
      "Chaque mission validée laisse une trace sur le Mur des Badges. La progression devient visible.",
    descriptionLongue:
      "Le Mur des Badges de l'Académie Kerboeuf est le dispositif de valorisation symbolique de la progression. Chaque badge correspond à une compétence maîtrisée ou une mission accomplie. Sur le site, les badges sont présents dans le détail des missions CM2 et dans les profils d'élèves. Un futur système de badges inter-niveaux est envisagé pour matérialiser la progression de Cycle 2 à Lycée.",
    elementsVisuels: [
      "Badges colorés par domaine",
      "Grille de progression",
      "Pictogrammes de compétences",
    ],
    zonesInteractives: [
      "Affichage des badges par mission",
      "Profil de compétences par élève",
    ],
    accentColor: "ember",
  },
  {
    id: "carnet-traces",
    nom: "Le Carnet de Traces",
    fonctionUX:
      "Portfolio personnel de l'élève — trace écrite des missions, méthodes et apprentissages consolidés.",
    fonctionPedagogique:
      "Consolider les savoirs par l'écriture réflexive, la mémorisation active et la mise en mots des stratégies.",
    cyclesConcernes: ["Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Fiches méthode imprimables, ressources de correction, parcours avec étapes de synthèse.",
    liensPossibles: ["/ressources", "/parcours", "/primaire/cm2/missions"],
    statut: "bientôt",
    descriptionCourte:
      "Le carnet de traces, c'est la mémoire de l'élève : ce qu'il a appris, compris et retenu.",
    descriptionLongue:
      "Le Carnet de Traces est le dispositif de mémorisation active de l'Académie Kerboeuf. Après chaque mission ou parcours, l'élève y note ses stratégies, ses erreurs corrigées et ses points d'appui. Sur le site, il se matérialise par les fiches méthode imprimables, les étapes de correction dans les missions et les traces de parcours. Le carnet est commun à tous les cycles mais sa forme évolue : illustré en cycle 2, structuré en cycle 3, argumenté en cycle 4 et lycée.",
    elementsVisuels: [
      "Gabarit de fiche méthode",
      "Zones de trace par étape",
      "Pictogramme de carnet ouvert",
    ],
    zonesInteractives: [
      "Fiches imprimables par mission",
      "Étapes de synthèse dans les parcours",
    ],
    accentColor: "sky",
  },
  {
    id: "hall-projets",
    nom: "Le Hall des Projets",
    fonctionUX:
      "Galerie des productions collectives et des projets inter-niveaux de l'Académie.",
    fonctionPedagogique:
      "Exposer les travaux d'élèves, valoriser les productions pédagogiques et montrer la richesse des projets.",
    cyclesConcernes: ["Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Vitrine des projets CM2, collège et lycée — productions, exposés, dossiers collectifs.",
    liensPossibles: ["/primaire/cm2", "/college", "/lycee", "/parcours"],
    statut: "bientôt",
    descriptionCourte:
      "Le Hall des Projets affiche les grandes productions de l'Académie, du CM2 à la Terminale.",
    descriptionLongue:
      "Le Hall des Projets de l'Académie Kerboeuf est un espace de valorisation des productions les plus abouties. Il regroupe les dossiers collectifs, exposés et projets pluridisciplinaires réalisés de Cycle 3 au Lycée. Sur le site, cet espace n'existe pas encore en tant que page, mais il est préfiguré dans les parcours CM2 et les missions de collège. Il constitue un objectif éditorial prioritaire pour la phase de développement suivante.",
    elementsVisuels: [
      "Vignettes de projets",
      "Étiquettes de niveau et de cycle",
      "Galerie de productions",
    ],
    zonesInteractives: [
      "Filtres par niveau",
      "Accès aux dossiers de projets",
    ],
    accentColor: "ember",
  },
  {
    id: "carte-academie",
    nom: "La Carte de l'Académie",
    fonctionUX:
      "Méta-hub visuel reliant tous les univers, niveaux et lieux transversaux de l'Académie Kerboeuf.",
    fonctionPedagogique:
      "Offrir une vision d'ensemble de l'architecture pédagogique et permettre une navigation globale éclairée.",
    cyclesConcernes: ["Cycle 1", "Cycle 2", "Cycle 3", "Cycle 4", "Lycée"],
    usageDansSite:
      "Page dédiée /carte — vision panoramique de l'Académie pour les élèves, professeurs et visiteurs.",
    liensPossibles: [
      "/maternelle",
      "/primaire",
      "/college",
      "/lycee",
      "/univers",
      "/professeurs",
      "/eleves",
      "/missions-recentes",
      "/parcours",
      "/ressources",
    ],
    statut: "disponible",
    descriptionCourte:
      "La vue d'ensemble de l'Académie : tous les univers, tous les niveaux, tous les liens.",
    descriptionLongue:
      "La Carte de l'Académie Kerboeuf est le seul espace où l'on voit simultanément toutes les ailes (Maternelle, Primaire, Collège, Lycée) et tous les lieux transversaux qui les relient. Elle permet de naviguer vers n'importe quel univers en comprenant sa place dans l'ensemble. C'est la boussole globale de l'Académie — pour les élèves qui veulent comprendre leur progression, pour les professeurs qui cherchent des ressources croisées, et pour les visiteurs qui découvrent l'Académie pour la première fois.",
    elementsVisuels: [
      "Vue d'ensemble des 4 univers",
      "Section lieux transversaux",
      "Liens vers missions et ressources",
      "Indicateurs de statut par univers",
    ],
    zonesInteractives: [
      "Cartes des 4 univers (avec liens)",
      "Grille des lieux transversaux",
      "Navigation vers missions, parcours, professeurs",
    ],
    accentColor: "jade",
    route: "/carte",
  },
];

export function getLieuTransversal(id: string): LieuTransversal | undefined {
  return lieuxTransversaux.find((lieu) => lieu.id === id);
}

export function getLieuxByStatut(
  statut: LieuTransversalStatut,
): LieuTransversal[] {
  return lieuxTransversaux.filter((lieu) => lieu.statut === statut);
}

export function getLieuxAvecRoute(): LieuTransversal[] {
  return lieuxTransversaux.filter((lieu) => lieu.route !== undefined);
}

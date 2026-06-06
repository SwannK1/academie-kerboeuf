// Registre central du programme collège — 6e, 5e, 4e, 3e.
// Primaire (CP/CE1/CE2/CM1) → content/curriculum-map.ts
// CM2/Félix                 → content/cm2.ts (isolé, ne pas toucher)
// Maternelle                → content/levels/maternelle/
// Collège                   → ce fichier
//
// 6e : curriculum détaillé + portails matière avec domaines cliquables.
// 5e, 4e, 3e : matières et sous-domaines visibles, sans contenu ni pages domaines.
// Le site organise ; les PDF enseignent.

import type {
  CurriculumEntry,
  CurriculumLevelMap,
} from "@/content/curriculum-map-types";
import type { AcademyLevelSlug, ProgramStatus } from "@/content/program-types";
import {
  sixiemeCurriculumLevelMap,
  sixiemeMatieres,
  sixiemeFrancaisSubdomains,
  sixiemeMathematiquesSubdomains,
  sixiemeHistoireGeographieEmcSubdomains,
  type CollegeMatiereCard,
  type CollegeSubdomainCard,
} from "@/content/levels/college/6e-curriculum";
import {
  cinqiemeMatieres,
  cinqiemeFrancaisSubdomains,
  cinqiemeMathematiquesSubdomains,
  cinqiemeHistoireGeographieEmcSubdomains,
  cinqiemeSciencesTechnoSubdomains,
  cinqiemeAnglaisSubdomains,
} from "@/content/levels/college/5e-curriculum";
import {
  quatriemeMatieres,
  quatriemeFrancaisSubdomains,
  quatriemeMathematiquesSubdomains,
  quatriemeHistoireGeographieEmcSubdomains,
  quatriemeSciencesTechnoSubdomains,
  quatriemeAnglaisSubdomains,
} from "@/content/levels/college/4e-curriculum";
import {
  troisiemeMatieres,
  troisiemeFrancaisSubdomains,
  troisiemeMathematiquesSubdomains,
  troisiemeHistoireGeographieEmcSubdomains,
  troisiemeSciencesTechnoSubdomains,
  troisiemeAnglaisSubdomains,
} from "@/content/levels/college/3e-curriculum";

export type { CollegeSubdomainCard };

// ── Métadonnées des portails matière ─────────────────────────────────────────
// Données d'affichage des portails /college/[level]/[subject].
// Ne contient pas de contenu pédagogique — uniquement libellés et sous-domaines.

export type CollegeSubjectMeta = {
  slug: string;
  label: string;
  cycleLabel: string;
  subtitle?: string;
  description: string;
  domainsHeading: string;
  subdomains: CollegeSubdomainCard[];
};

export type CollegeDomainMeta = {
  level: CollegeLevelSlug;
  subject: string;
  domain: string;
  subjectLabel: string;
  domainLabel: string;
  cycleLabel: string;
  officialRef: string;
  description: string;
  status: CollegeSubdomainCard["status"];
  entries: CurriculumEntry[];
  backHref: string;
  backLabel: string;
  levelHref: string;
  levelLabel: string;
};

// ── Constante de garde — niveaux collège ─────────────────────────────────────
// Ne jamais ajouter de niveaux primaire ou lycée ici.
// Ajouter un niveau ici NE crée PAS les pages correspondantes.

export const COLLEGE_LEVEL_SLUGS = ["6e", "5e", "4e", "3e"] as const;
export type CollegeLevelSlug = (typeof COLLEGE_LEVEL_SLUGS)[number];

// ── Garde de type ─────────────────────────────────────────────────────────────

function isCollegeLevelSlug(slug: string): slug is CollegeLevelSlug {
  return (COLLEGE_LEVEL_SLUGS as readonly string[]).includes(slug);
}

// ── Registre partiel — seule la 6e a une cartographie détaillée ─────────────
// Les autres niveaux peuvent avoir des portails matière sans CurriculumLevelMap.

export const collegeCurriculumMaps: Partial<
  Record<CollegeLevelSlug, CurriculumLevelMap>
> = {
  "6e": sixiemeCurriculumLevelMap,
};

// ── Arborescence pédagogique collège ─────────────────────────────────────────
// Structure éditoriale uniquement : niveau → matière → domaine → sous-domaine
// → séquence-compétence. Une séquence correspond à une seule compétence.
// Aucun href, aucune route, aucun exercice, aucun corrigé, aucun PDF.

export type CollegeCompetencySequence = {
  slug: string;
  title: string;
  status: ProgramStatus;
};

export type CollegeLearningSubdomain = {
  slug: string;
  label: string;
  status: ProgramStatus;
  sequences: CollegeCompetencySequence[];
};

export type CollegeLearningDomain = {
  slug: string;
  label: string;
  status: ProgramStatus;
  subdomains: CollegeLearningSubdomain[];
};

export type CollegeLearningSubject = {
  slug: string;
  label: string;
  status: ProgramStatus;
  domains: CollegeLearningDomain[];
};

export type CollegeLearningTreeLevel = {
  levelSlug: CollegeLevelSlug;
  label: string;
  status: ProgramStatus;
  subjects: CollegeLearningSubject[];
};

export const collegeLearningTree = [
  {
    levelSlug: "6e",
    label: "6e",
    status: "in-progress",
    subjects: [
      {
        slug: "francais",
        label: "Français",
        status: "in-progress",
        domains: [
          {
            slug: "lecture-litterature",
            label: "Lecture et littérature",
            status: "in-progress",
            subdomains: [
              {
                slug: "recits-fondateurs",
                label: "Récits fondateurs et mythes",
                status: "in-progress",
                sequences: [
                  {
                    slug: "identifier-heros-epreuve",
                    title: "Identifier le héros, l'épreuve et la quête dans un récit fondateur",
                    status: "in-progress",
                  },
                  {
                    slug: "distinguer-recit-mythe-legende",
                    title: "Distinguer récit, mythe et légende à partir d'indices textuels",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "comprehension-textes",
                label: "Compréhension de textes",
                status: "in-progress",
                sequences: [
                  {
                    slug: "prelever-informations-explicites",
                    title: "Prélever des informations explicites dans un texte court",
                    status: "in-progress",
                  },
                  {
                    slug: "formuler-inference-simple",
                    title: "Formuler une inférence simple en s'appuyant sur un indice",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
          {
            slug: "ecriture-langue-oral",
            label: "Écriture, langue et oral",
            status: "in-progress",
            subdomains: [
              {
                slug: "phrase-et-texte",
                label: "Phrase et texte",
                status: "in-progress",
                sequences: [
                  {
                    slug: "produire-paragraphe-organise",
                    title: "Produire un paragraphe organisé autour d'une idée claire",
                    status: "in-progress",
                  },
                  {
                    slug: "accorder-groupe-nominal",
                    title: "Accorder les éléments essentiels du groupe nominal",
                    status: "in-progress",
                  },
                ],
              },
              {
                slug: "oral-scolaire",
                label: "Oral scolaire",
                status: "in-progress",
                sequences: [
                  {
                    slug: "reformuler-information",
                    title: "Reformuler une information entendue ou lue avec précision",
                    status: "in-progress",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "mathematiques",
        label: "Mathématiques",
        status: "in-progress",
        domains: [
          {
            slug: "nombres-calcul",
            label: "Nombres et calcul",
            status: "in-progress",
            subdomains: [
              {
                slug: "entiers-decimaux-fractions",
                label: "Entiers, décimaux et fractions simples",
                status: "in-progress",
                sequences: [
                  {
                    slug: "comparer-nombres-decimaux",
                    title: "Comparer et ranger des nombres décimaux",
                    status: "in-progress",
                  },
                  {
                    slug: "utiliser-fraction-partage",
                    title: "Utiliser une fraction simple pour exprimer un partage",
                    status: "in-progress",
                  },
                ],
              },
              {
                slug: "problemes-calcul",
                label: "Problèmes de calcul",
                status: "upcoming",
                sequences: [
                  {
                    slug: "choisir-operation-probleme",
                    title: "Choisir l'opération adaptée à une situation-problème",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
          {
            slug: "geometrie-mesures",
            label: "Géométrie et mesures",
            status: "in-progress",
            subdomains: [
              {
                slug: "figures-planes",
                label: "Figures planes",
                status: "upcoming",
                sequences: [
                  {
                    slug: "construire-figure-instruments",
                    title: "Construire une figure plane à l'aide des instruments",
                    status: "upcoming",
                  },
                  {
                    slug: "reconnaitre-axes-symetrie",
                    title: "Reconnaître les axes de symétrie d'une figure",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "grandeurs-unites",
                label: "Grandeurs et unités",
                status: "upcoming",
                sequences: [
                  {
                    slug: "convertir-unites-courantes",
                    title: "Convertir des unités courantes de longueur, masse et durée",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "histoire-geographie-emc",
        label: "Histoire-Géographie-EMC",
        status: "in-progress",
        domains: [
          {
            slug: "histoire",
            label: "Histoire",
            status: "in-progress",
            subdomains: [
              {
                slug: "premiers-etats",
                label: "Premiers États et premières écritures",
                status: "in-progress",
                sequences: [
                  {
                    slug: "situer-premieres-civilisations",
                    title: "Situer les premières civilisations dans le temps et l'espace",
                    status: "in-progress",
                  },
                  {
                    slug: "expliquer-role-ecriture",
                    title: "Expliquer le rôle des premières écritures dans l'organisation des sociétés",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
          {
            slug: "geographie-emc",
            label: "Géographie et EMC",
            status: "in-progress",
            subdomains: [
              {
                slug: "habiter-metropole",
                label: "Habiter une métropole",
                status: "in-progress",
                sequences: [
                  {
                    slug: "decrire-organisation-metropole",
                    title: "Décrire l'organisation d'une métropole à partir d'un paysage",
                    status: "in-progress",
                  },
                ],
              },
              {
                slug: "regles-collectives",
                label: "Règles collectives",
                status: "upcoming",
                sequences: [
                  {
                    slug: "identifier-droits-devoirs-collegien",
                    title: "Identifier les droits et devoirs du collégien",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "sciences-technologie",
        label: "Sciences et technologie",
        status: "upcoming",
        domains: [
          {
            slug: "vivant-matiere-objets",
            label: "Vivant, matière et objets",
            status: "upcoming",
            subdomains: [
              {
                slug: "biodiversite",
                label: "Biodiversité",
                status: "upcoming",
                sequences: [
                  {
                    slug: "classer-etres-vivants",
                    title: "Classer des êtres vivants à partir de caractères observables",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "objets-techniques",
                label: "Objets techniques",
                status: "upcoming",
                sequences: [
                  {
                    slug: "identifier-fonction-objet",
                    title: "Identifier la fonction d'usage d'un objet technique",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "langues-vivantes",
        label: "Langues vivantes",
        status: "upcoming",
        domains: [
          {
            slug: "comprendre-s-exprimer",
            label: "Comprendre, s'exprimer et interagir",
            status: "upcoming",
            subdomains: [
              {
                slug: "situations-quotidiennes",
                label: "Situations quotidiennes",
                status: "upcoming",
                sequences: [
                  {
                    slug: "se-presenter-simplement",
                    title: "Se présenter simplement dans une langue vivante",
                    status: "upcoming",
                  },
                  {
                    slug: "comprendre-consignes-classe",
                    title: "Comprendre des consignes de classe simples",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "arts-plastiques",
        label: "Arts plastiques",
        status: "upcoming",
        domains: [
          {
            slug: "experimenter-produire",
            label: "Expérimenter, produire, créer",
            status: "upcoming",
            subdomains: [
              {
                slug: "outils-supports",
                label: "Outils et supports",
                status: "upcoming",
                sequences: [
                  {
                    slug: "choisir-outil-effet",
                    title: "Choisir un outil plastique en fonction de l'effet recherché",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "education-musicale",
        label: "Éducation musicale",
        status: "upcoming",
        domains: [
          {
            slug: "chanter-ecouter",
            label: "Chanter et écouter",
            status: "upcoming",
            subdomains: [
              {
                slug: "voix-ecoute",
                label: "Voix et écoute",
                status: "upcoming",
                sequences: [
                  {
                    slug: "tenir-partie-vocale",
                    title: "Tenir une partie vocale simple dans un chant collectif",
                    status: "upcoming",
                  },
                  {
                    slug: "identifier-parametres-sonores",
                    title: "Identifier des paramètres sonores dans une écoute guidée",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "eps",
        label: "EPS",
        status: "upcoming",
        domains: [
          {
            slug: "performance-cooperation",
            label: "Performance et coopération",
            status: "upcoming",
            subdomains: [
              {
                slug: "courir-sauter-lancer",
                label: "Courir, sauter, lancer",
                status: "upcoming",
                sequences: [
                  {
                    slug: "mesurer-progres-performance",
                    title: "Mesurer ses progrès dans une performance athlétique",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "jeux-collectifs",
                label: "Jeux collectifs",
                status: "upcoming",
                sequences: [
                  {
                    slug: "cooperer-regles-collectives",
                    title: "Coopérer en respectant des règles collectives",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    levelSlug: "5e",
    label: "5e",
    status: "upcoming",
    subjects: [
      {
        slug: "francais",
        label: "Français",
        status: "in-progress",
        domains: [
          {
            slug: "recits-poesie-langue",
            label: "Récits, poésie et langue",
            status: "upcoming",
            subdomains: [
              {
                slug: "heros-voyages",
                label: "Héros, héroïnes et voyages",
                status: "upcoming",
                sequences: [
                  {
                    slug: "analyser-parcours-personnage",
                    title: "Analyser le parcours d'un personnage dans un récit d'aventure",
                    status: "upcoming",
                  },
                  {
                    slug: "produire-recit-aventure",
                    title: "Produire un récit d'aventure organisé",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "langue-phrase-complexe",
                label: "Langue et phrase complexe",
                status: "upcoming",
                sequences: [
                  {
                    slug: "identifier-propositions",
                    title: "Identifier les propositions dans une phrase complexe",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "mathematiques",
        label: "Mathématiques",
        status: "in-progress",
        domains: [
          {
            slug: "nombres-proportionnalite-geometrie",
            label: "Nombres, proportionnalité et géométrie",
            status: "upcoming",
            subdomains: [
              {
                slug: "fractions-relatifs",
                label: "Fractions et nombres relatifs",
                status: "upcoming",
                sequences: [
                  {
                    slug: "additionner-fractions-simples",
                    title: "Additionner des fractions de même dénominateur",
                    status: "upcoming",
                  },
                  {
                    slug: "utiliser-nombres-relatifs-reperage",
                    title: "Utiliser les nombres relatifs pour se repérer",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "proportionnalite",
                label: "Proportionnalité",
                status: "upcoming",
                sequences: [
                  {
                    slug: "reconnaitre-situation-proportionnalite",
                    title: "Reconnaître une situation de proportionnalité",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "triangles-angles",
                label: "Triangles et angles",
                status: "upcoming",
                sequences: [
                  {
                    slug: "construire-triangle-contraintes",
                    title: "Construire un triangle à partir de contraintes données",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "histoire-geographie-emc",
        label: "Histoire-Géographie-EMC",
        status: "in-progress",
        domains: [
          {
            slug: "moyen-age-monde",
            label: "Moyen Âge, monde et citoyenneté",
            status: "upcoming",
            subdomains: [
              {
                slug: "societes-medievales",
                label: "Sociétés médiévales",
                status: "upcoming",
                sequences: [
                  {
                    slug: "caracteriser-organisation-feodale",
                    title: "Caractériser l'organisation de la société féodale",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "ressources-populations",
                label: "Ressources et populations",
                status: "upcoming",
                sequences: [
                  {
                    slug: "expliquer-inegal-acces-ressource",
                    title: "Expliquer l'inégal accès à une ressource essentielle",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "egalite-discriminations",
                label: "Égalité et discriminations",
                status: "upcoming",
                sequences: [
                  {
                    slug: "identifier-situation-discrimination",
                    title: "Identifier une situation de discrimination et le droit associé",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "sciences-technologie",
        label: "Sciences et technologie",
        status: "in-progress",
        domains: [
          {
            slug: "svt-physique-technologie",
            label: "SVT, physique-chimie et technologie",
            status: "upcoming",
            subdomains: [
              {
                slug: "vivant-environnement",
                label: "Vivant et environnement",
                status: "upcoming",
                sequences: [
                  {
                    slug: "decrire-relations-alimentaires",
                    title: "Décrire des relations alimentaires dans un écosystème",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "matiere-energie",
                label: "Matière et énergie",
                status: "upcoming",
                sequences: [
                  {
                    slug: "distinguer-melange-corps-pur",
                    title: "Distinguer un mélange d'un corps pur à partir d'observations",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "objets-programmes",
                label: "Objets programmés",
                status: "upcoming",
                sequences: [
                  {
                    slug: "decrire-chaine-information",
                    title: "Décrire une chaîne d'information dans un objet technique simple",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "langues-vivantes",
        label: "Langues vivantes",
        status: "in-progress",
        domains: [
          {
            slug: "niveau-a2-b1",
            label: "Compréhension, expression et culture",
            status: "upcoming",
            subdomains: [
              {
                slug: "echanges-quotidiens",
                label: "Échanges quotidiens",
                status: "upcoming",
                sequences: [
                  {
                    slug: "raconter-evenement-simple",
                    title: "Raconter un événement simple au passé",
                    status: "upcoming",
                  },
                  {
                    slug: "comprendre-message-court",
                    title: "Comprendre un message oral court sur un thème familier",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "arts-plastiques",
        label: "Arts plastiques",
        status: "upcoming",
        domains: [
          {
            slug: "image-objet-espace",
            label: "Image, objet et espace",
            status: "upcoming",
            subdomains: [
              {
                slug: "composition-image",
                label: "Composition de l'image",
                status: "upcoming",
                sequences: [
                  {
                    slug: "organiser-elements-plastiques",
                    title: "Organiser des éléments plastiques dans une composition",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "education-musicale",
        label: "Éducation musicale",
        status: "upcoming",
        domains: [
          {
            slug: "voix-ecoute-culture",
            label: "Voix, écoute et culture",
            status: "upcoming",
            subdomains: [
              {
                slug: "forme-musicale",
                label: "Forme musicale",
                status: "upcoming",
                sequences: [
                  {
                    slug: "reperer-refrain-couplet",
                    title: "Repérer refrain, couplet et organisation d'une pièce musicale",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "eps",
        label: "EPS",
        status: "upcoming",
        domains: [
          {
            slug: "agir-cooperer-s-exprimer",
            label: "Agir, coopérer, s'exprimer",
            status: "upcoming",
            subdomains: [
              {
                slug: "affrontement-collectif",
                label: "Affrontement collectif",
                status: "upcoming",
                sequences: [
                  {
                    slug: "choisir-action-collective",
                    title: "Choisir une action adaptée dans un jeu collectif",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    levelSlug: "4e",
    label: "4e",
    status: "upcoming",
    subjects: [
      {
        slug: "francais",
        label: "Français",
        status: "in-progress",
        domains: [
          {
            slug: "litterature-argumentation-langue",
            label: "Littérature, argumentation et langue",
            status: "upcoming",
            subdomains: [
              {
                slug: "dire-amour-societe",
                label: "Dire l'amour et questionner la société",
                status: "upcoming",
                sequences: [
                  {
                    slug: "analyser-expression-sentiments",
                    title: "Analyser l'expression des sentiments dans un texte littéraire",
                    status: "upcoming",
                  },
                  {
                    slug: "defendre-point-vue-ecrit",
                    title: "Défendre un point de vue dans un écrit argumenté",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "langue-discours",
                label: "Langue et discours",
                status: "upcoming",
                sequences: [
                  {
                    slug: "identifier-discours-direct-indirect",
                    title: "Identifier discours direct et discours indirect",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "mathematiques",
        label: "Mathématiques",
        status: "in-progress",
        domains: [
          {
            slug: "calcul-geometrie-fonctions",
            label: "Calcul, géométrie et fonctions",
            status: "upcoming",
            subdomains: [
              {
                slug: "puissances-calcul-litteral",
                label: "Puissances et calcul littéral",
                status: "upcoming",
                sequences: [
                  {
                    slug: "utiliser-puissances-dix",
                    title: "Utiliser les puissances de dix dans une écriture scientifique",
                    status: "upcoming",
                  },
                  {
                    slug: "developper-expression-simple",
                    title: "Développer une expression littérale simple",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "theoreme-pythagore",
                label: "Théorème de Pythagore",
                status: "upcoming",
                sequences: [
                  {
                    slug: "appliquer-pythagore",
                    title: "Appliquer le théorème de Pythagore dans un triangle rectangle",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "representations-graphiques",
                label: "Représentations graphiques",
                status: "upcoming",
                sequences: [
                  {
                    slug: "lire-representation-fonctionnelle",
                    title: "Lire une représentation graphique pour répondre à une question",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "histoire-geographie-emc",
        label: "Histoire-Géographie-EMC",
        status: "in-progress",
        domains: [
          {
            slug: "revolutions-mondialisation-droits",
            label: "Révolutions, mondialisation et droits",
            status: "upcoming",
            subdomains: [
              {
                slug: "xviiie-revolutions",
                label: "XVIIIe siècle et révolutions",
                status: "upcoming",
                sequences: [
                  {
                    slug: "expliquer-rupture-revolutionnaire",
                    title: "Expliquer une rupture révolutionnaire à partir de documents",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "mondialisation-flux",
                label: "Mondialisation et flux",
                status: "upcoming",
                sequences: [
                  {
                    slug: "decrire-flux-mondialisation",
                    title: "Décrire un flux majeur de la mondialisation",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "libertes-responsabilites",
                label: "Libertés et responsabilités",
                status: "upcoming",
                sequences: [
                  {
                    slug: "argumenter-liberte-responsabilite",
                    title: "Argumenter sur l'équilibre entre liberté et responsabilité",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "svt",
        label: "SVT",
        status: "upcoming",
        domains: [
          {
            slug: "vivant-corps-environnement",
            label: "Vivant, corps humain et environnement",
            status: "upcoming",
            subdomains: [
              {
                slug: "genetique-reproduction",
                label: "Génétique et reproduction",
                status: "upcoming",
                sequences: [
                  {
                    slug: "relier-caracteres-heredite",
                    title: "Relier caractères héréditaires et information génétique",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "physique-chimie",
        label: "Physique-Chimie",
        status: "upcoming",
        domains: [
          {
            slug: "energie-signaux-matiere",
            label: "Énergie, signaux et matière",
            status: "upcoming",
            subdomains: [
              {
                slug: "electricite",
                label: "Électricité",
                status: "upcoming",
                sequences: [
                  {
                    slug: "modeliser-circuit-simple",
                    title: "Modéliser un circuit électrique simple",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "transformations-chimiques",
                label: "Transformations chimiques",
                status: "upcoming",
                sequences: [
                  {
                    slug: "identifier-transformation-chimique",
                    title: "Identifier une transformation chimique à partir d'indices expérimentaux",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "technologie",
        label: "Technologie",
        status: "upcoming",
        domains: [
          {
            slug: "systemes-programmation",
            label: "Systèmes et programmation",
            status: "upcoming",
            subdomains: [
              {
                slug: "systemes-automatises",
                label: "Systèmes automatisés",
                status: "upcoming",
                sequences: [
                  {
                    slug: "decrire-fonctionnement-systeme-automatise",
                    title: "Décrire le fonctionnement d'un système automatisé",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "langues-vivantes",
        label: "Langues vivantes",
        status: "in-progress",
        domains: [
          {
            slug: "niveau-b1",
            label: "Compréhension, expression et médiation",
            status: "upcoming",
            subdomains: [
              {
                slug: "documents-authentiques",
                label: "Documents authentiques",
                status: "upcoming",
                sequences: [
                  {
                    slug: "extraire-information-document-authentique",
                    title: "Extraire les informations essentielles d'un document authentique",
                    status: "upcoming",
                  },
                  {
                    slug: "exprimer-opinion-simple",
                    title: "Exprimer une opinion simple et la justifier",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "arts-plastiques",
        label: "Arts plastiques",
        status: "upcoming",
        domains: [
          {
            slug: "representation-dispositif",
            label: "Représentation et dispositif",
            status: "upcoming",
            subdomains: [
              {
                slug: "point-vue-cadrage",
                label: "Point de vue et cadrage",
                status: "upcoming",
                sequences: [
                  {
                    slug: "utiliser-cadrage-intention",
                    title: "Utiliser le cadrage pour servir une intention plastique",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "education-musicale",
        label: "Éducation musicale",
        status: "upcoming",
        domains: [
          {
            slug: "interpretation-ecoute",
            label: "Interprétation et écoute",
            status: "upcoming",
            subdomains: [
              {
                slug: "styles-epoques",
                label: "Styles et époques",
                status: "upcoming",
                sequences: [
                  {
                    slug: "comparer-deux-oeuvres-musicales",
                    title: "Comparer deux œuvres musicales à partir de critères d'écoute",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "eps",
        label: "EPS",
        status: "upcoming",
        domains: [
          {
            slug: "performance-affrontement-expression",
            label: "Performance, affrontement et expression",
            status: "upcoming",
            subdomains: [
              {
                slug: "strategie-affrontement",
                label: "Stratégie d'affrontement",
                status: "upcoming",
                sequences: [
                  {
                    slug: "adapter-strategie-adversaire",
                    title: "Adapter sa stratégie à celle de l'adversaire",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    levelSlug: "3e",
    label: "3e",
    status: "upcoming",
    subjects: [
      {
        slug: "francais",
        label: "Français",
        status: "in-progress",
        domains: [
          {
            slug: "brevet-litterature-argumentation",
            label: "Brevet, littérature et argumentation",
            status: "upcoming",
            subdomains: [
              {
                slug: "textes-engages",
                label: "Textes engagés",
                status: "upcoming",
                sequences: [
                  {
                    slug: "analyser-these-arguments",
                    title: "Analyser une thèse et les arguments qui la soutiennent",
                    status: "upcoming",
                  },
                  {
                    slug: "rediger-reponse-developpee",
                    title: "Rédiger une réponse développée et justifiée",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "langue-revision-brevet",
                label: "Langue et révision brevet",
                status: "upcoming",
                sequences: [
                  {
                    slug: "analyser-valeur-temps-verbaux",
                    title: "Analyser la valeur des temps verbaux dans un texte",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "mathematiques",
        label: "Mathématiques",
        status: "in-progress",
        domains: [
          {
            slug: "fonctions-calcul-geometrie-statistiques",
            label: "Fonctions, calcul, géométrie et statistiques",
            status: "upcoming",
            subdomains: [
              {
                slug: "fonctions-affines",
                label: "Fonctions affines",
                status: "upcoming",
                sequences: [
                  {
                    slug: "determiner-expression-fonction-affine",
                    title: "Déterminer l'expression d'une fonction affine à partir de données",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "thalès-trigonometrie",
                label: "Thalès et trigonométrie",
                status: "upcoming",
                sequences: [
                  {
                    slug: "utiliser-thales-calcul-longueur",
                    title: "Utiliser le théorème de Thalès pour calculer une longueur",
                    status: "upcoming",
                  },
                  {
                    slug: "utiliser-trigonometrie-triangle-rectangle",
                    title: "Utiliser la trigonométrie dans un triangle rectangle",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "probabilites-statistiques",
                label: "Probabilités et statistiques",
                status: "upcoming",
                sequences: [
                  {
                    slug: "calculer-probabilite-evenement",
                    title: "Calculer la probabilité d'un événement simple",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "histoire-geographie-emc",
        label: "Histoire-Géographie-EMC",
        status: "in-progress",
        domains: [
          {
            slug: "monde-contemporain-citoyennete",
            label: "Monde contemporain et citoyenneté",
            status: "upcoming",
            subdomains: [
              {
                slug: "guerres-totalitarismes",
                label: "Guerres mondiales et totalitarismes",
                status: "upcoming",
                sequences: [
                  {
                    slug: "caracteriser-violence-masse",
                    title: "Caractériser une violence de masse au XXe siècle",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "france-europe-monde",
                label: "France, Europe et monde",
                status: "upcoming",
                sequences: [
                  {
                    slug: "expliquer-place-france-ue",
                    title: "Expliquer la place de la France et de l'Union européenne dans le monde",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "institutions-engagement",
                label: "Institutions et engagement",
                status: "upcoming",
                sequences: [
                  {
                    slug: "decrire-fonctionnement-democratie",
                    title: "Décrire le fonctionnement d'une démocratie représentative",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "svt",
        label: "SVT",
        status: "upcoming",
        domains: [
          {
            slug: "corps-humain-planete",
            label: "Corps humain, vivant et planète",
            status: "upcoming",
            subdomains: [
              {
                slug: "immunite-systeme-nerveux",
                label: "Immunité et système nerveux",
                status: "upcoming",
                sequences: [
                  {
                    slug: "expliquer-reaction-immunitaire",
                    title: "Expliquer une réaction immunitaire simple",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "risques-ressources",
                label: "Risques et ressources",
                status: "upcoming",
                sequences: [
                  {
                    slug: "relier-alea-risque-vulnerabilite",
                    title: "Relier aléa, risque et vulnérabilité dans une situation géologique",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "physique-chimie",
        label: "Physique-Chimie",
        status: "upcoming",
        domains: [
          {
            slug: "energie-mouvement-chimie",
            label: "Énergie, mouvement et chimie",
            status: "upcoming",
            subdomains: [
              {
                slug: "energie-circuits",
                label: "Énergie et circuits",
                status: "upcoming",
                sequences: [
                  {
                    slug: "calculer-puissance-energie",
                    title: "Calculer une énergie ou une puissance dans une situation simple",
                    status: "upcoming",
                  },
                ],
              },
              {
                slug: "ions-ph",
                label: "Ions et pH",
                status: "upcoming",
                sequences: [
                  {
                    slug: "identifier-solution-acide-basique",
                    title: "Identifier le caractère acide ou basique d'une solution",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "technologie",
        label: "Technologie",
        status: "upcoming",
        domains: [
          {
            slug: "projet-systeme-programme",
            label: "Projet, système et programme",
            status: "upcoming",
            subdomains: [
              {
                slug: "prototypage-programmation",
                label: "Prototypage et programmation",
                status: "upcoming",
                sequences: [
                  {
                    slug: "programmer-scenario-automatise",
                    title: "Programmer un scénario de fonctionnement automatisé",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "langues-vivantes",
        label: "Langues vivantes",
        status: "in-progress",
        domains: [
          {
            slug: "niveau-b1-brevet",
            label: "Compréhension, expression et culture",
            status: "upcoming",
            subdomains: [
              {
                slug: "argumenter-interagir",
                label: "Argumenter et interagir",
                status: "upcoming",
                sequences: [
                  {
                    slug: "argumenter-sur-theme-culturel",
                    title: "Argumenter brièvement sur un thème culturel",
                    status: "upcoming",
                  },
                  {
                    slug: "restituer-essentiel-document",
                    title: "Restituer l'essentiel d'un document écrit ou oral",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "arts-plastiques",
        label: "Arts plastiques",
        status: "upcoming",
        domains: [
          {
            slug: "projet-oeuvre-spectateur",
            label: "Projet, œuvre et spectateur",
            status: "upcoming",
            subdomains: [
              {
                slug: "demarche-intention",
                label: "Démarche et intention",
                status: "upcoming",
                sequences: [
                  {
                    slug: "presenter-demarche-plastique",
                    title: "Présenter une démarche plastique en explicitant son intention",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "education-musicale",
        label: "Éducation musicale",
        status: "upcoming",
        domains: [
          {
            slug: "projet-musical-culture",
            label: "Projet musical et culture",
            status: "upcoming",
            subdomains: [
              {
                slug: "interpretation-argumentee",
                label: "Interprétation argumentée",
                status: "upcoming",
                sequences: [
                  {
                    slug: "justifier-choix-interpretation",
                    title: "Justifier un choix d'interprétation musicale",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "eps",
        label: "EPS",
        status: "upcoming",
        domains: [
          {
            slug: "autonomie-performance-projet",
            label: "Autonomie, performance et projet collectif",
            status: "upcoming",
            subdomains: [
              {
                slug: "projet-collectif",
                label: "Projet collectif",
                status: "upcoming",
                sequences: [
                  {
                    slug: "tenir-role-projet-collectif",
                    title: "Tenir un rôle défini dans un projet collectif en EPS",
                    status: "upcoming",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
] satisfies CollegeLearningTreeLevel[];

const collegeMatiereCards: Partial<
  Record<CollegeLevelSlug, CollegeMatiereCard[]>
> = {
  "6e": sixiemeMatieres,
  "5e": cinqiemeMatieres,
  "4e": quatriemeMatieres,
  "3e": troisiemeMatieres,
};

// ── Fonctions de lecture ──────────────────────────────────────────────────────

export function getCollegeCurriculumMap(
  levelSlug: string,
): CurriculumLevelMap | undefined {
  if (!isCollegeLevelSlug(levelSlug)) return undefined;
  return collegeCurriculumMaps[levelSlug];
}

export function hasCollegeCurriculumMap(levelSlug: string): boolean {
  return getCollegeCurriculumMap(levelSlug) !== undefined;
}

export function getCollegeAvailableLevels(): CollegeLevelSlug[] {
  return COLLEGE_LEVEL_SLUGS.filter(
    (slug) => collegeCurriculumMaps[slug] !== undefined,
  );
}

export function getCollegeMatiereCards(levelSlug: string): CollegeMatiereCard[] {
  if (!isCollegeLevelSlug(levelSlug)) return [];
  return collegeMatiereCards[levelSlug] ?? [];
}

export function getSixiemeCurriculumMap(): CurriculumLevelMap {
  return sixiemeCurriculumLevelMap;
}

// ── Registre des portails matière par niveau ─────────────────────────────────
// Données d'affichage par matière. Ajouter un niveau = ajouter un bloc ici.

const sixiemeSubjectsMeta: Record<string, CollegeSubjectMeta> = {
  francais: {
    slug: "francais",
    label: "Français",
    cycleLabel: "Cycle 3 · 6e · Français",
    subtitle: "6e — Passerelle du collège",
    description:
      "Quatre domaines pour installer les méthodes de lecture, d'écriture et de langue au collège.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: sixiemeFrancaisSubdomains,
  },
  mathematiques: {
    slug: "mathematiques",
    label: "Mathématiques",
    cycleLabel: "Cycle 3 · 6e · Mathématiques",
    subtitle: "6e — Cycle 3",
    description:
      "Cinq domaines pour installer le raisonnement mathématique au collège.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: sixiemeMathematiquesSubdomains,
  },
  "histoire-geographie-emc": {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    cycleLabel: "Cycle 3 · 6e · Histoire-Géographie-EMC",
    subtitle: "6e — Repères et méthodes",
    description:
      "Accéder aux premiers repères de travail : comprendre le temps long, lire des documents et installer les méthodes utiles au collège.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: sixiemeHistoireGeographieEmcSubdomains,
  },
};

// ── Registre des portails matière 5e ─────────────────────────────────────────
// Tous les sous-domaines 5e sont sans href : aucune page domaine n'existe.

const cinqiemeSubjectsMeta: Record<string, CollegeSubjectMeta> = {
  francais: {
    slug: "francais",
    label: "Français",
    cycleLabel: "Cycle 4 · 5e · Français",
    subtitle: "5e — Approfondissement",
    description:
      "Approfondir la lecture, l'écriture, l'étude de la langue et l'oral au cycle 4.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: cinqiemeFrancaisSubdomains,
  },
  mathematiques: {
    slug: "mathematiques",
    label: "Mathématiques",
    cycleLabel: "Cycle 4 · 5e · Mathématiques",
    subtitle: "5e — Cycle 4",
    description:
      "Consolider les nombres, la géométrie et la résolution de problèmes en cycle 4.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: cinqiemeMathematiquesSubdomains,
  },
  "histoire-geographie-emc": {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    cycleLabel: "Cycle 4 · 5e · Histoire-Géographie-EMC",
    subtitle: "5e — Le Moyen Âge et le monde",
    description:
      "Comprendre les sociétés, les espaces et les règles de vie commune au Moyen Âge et dans le monde.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: cinqiemeHistoireGeographieEmcSubdomains,
  },
  "sciences-technologie": {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    cycleLabel: "Cycle 4 · 5e · Sciences et technologie",
    subtitle: "5e — Observer et expérimenter",
    description:
      "Observer, expérimenter et construire : SVT, physique-chimie et technologie réunis.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: cinqiemeSciencesTechnoSubdomains,
  },
  anglais: {
    slug: "anglais",
    label: "Anglais",
    cycleLabel: "Cycle 4 · 5e · Anglais",
    subtitle: "5e — A2 vers B1",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau A2 vers B1.",
    domainsHeading: "Cinq activités langagières",
    subdomains: cinqiemeAnglaisSubdomains,
  },
};

// ── Registre des portails matière 4e ─────────────────────────────────────────
// Tous les sous-domaines 4e sont sans href : aucune page domaine n'existe.

const quatriemeSubjectsMeta: Record<string, CollegeSubjectMeta> = {
  francais: {
    slug: "francais",
    label: "Français",
    cycleLabel: "Cycle 4 · 4e · Français",
    subtitle: "4e — Analyse et argumentation",
    description:
      "Approfondir la lecture littéraire, l'écriture et l'étude de la langue en cycle 4.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: quatriemeFrancaisSubdomains,
  },
  mathematiques: {
    slug: "mathematiques",
    label: "Mathématiques",
    cycleLabel: "Cycle 4 · 4e · Mathématiques",
    subtitle: "4e — Cycle 4",
    description:
      "Nombres relatifs, proportionnalité, géométrie dans l'espace et premières fonctions.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: quatriemeMathematiquesSubdomains,
  },
  "histoire-geographie-emc": {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    cycleLabel: "Cycle 4 · 4e · Histoire-Géographie-EMC",
    subtitle: "4e — Révolutions et mondialisation",
    description:
      "Du XVIIIe siècle aux débuts de la mondialisation — repères et méthodes.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: quatriemeHistoireGeographieEmcSubdomains,
  },
  "sciences-technologie": {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    cycleLabel: "Cycle 4 · 4e · Sciences et technologie",
    subtitle: "4e — Observer et modéliser",
    description:
      "SVT, physique-chimie et technologie — observer, mesurer, modéliser.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: quatriemeSciencesTechnoSubdomains,
  },
  anglais: {
    slug: "anglais",
    label: "Anglais",
    cycleLabel: "Cycle 4 · 4e · Anglais",
    subtitle: "4e — Niveau B1",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau B1.",
    domainsHeading: "Cinq activités langagières",
    subdomains: quatriemeAnglaisSubdomains,
  },
};

// ── Registre des portails matière 3e ─────────────────────────────────────────
// Tous les sous-domaines 3e sont sans href : aucune page domaine n'existe.

const troisiemeSubjectsMeta: Record<string, CollegeSubjectMeta> = {
  francais: {
    slug: "francais",
    label: "Français",
    cycleLabel: "Cycle 4 · 3e · Français",
    subtitle: "3e — Préparation au brevet",
    description:
      "Lecture, écriture, oral et étude de la langue — préparer l'épreuve de brevet.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: troisiemeFrancaisSubdomains,
  },
  mathematiques: {
    slug: "mathematiques",
    label: "Mathématiques",
    cycleLabel: "Cycle 4 · 3e · Mathématiques",
    subtitle: "3e — Brevet et lycée",
    description:
      "Fonctions, probabilités, géométrie et calcul — préparer le brevet.",
    domainsHeading: "Six domaines du programme",
    subdomains: troisiemeMathematiquesSubdomains,
  },
  "histoire-geographie-emc": {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    cycleLabel: "Cycle 4 · 3e · Histoire-Géographie-EMC",
    subtitle: "3e — Monde contemporain",
    description:
      "Le monde depuis 1914 — repères chronologiques, géopolitiques et citoyens.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: troisiemeHistoireGeographieEmcSubdomains,
  },
  "sciences-technologie": {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    cycleLabel: "Cycle 4 · 3e · Sciences et technologie",
    subtitle: "3e — Consolider et préparer le lycée",
    description:
      "SVT, physique-chimie et technologie — consolider et préparer le lycée.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: troisiemeSciencesTechnoSubdomains,
  },
  anglais: {
    slug: "anglais",
    label: "Anglais",
    cycleLabel: "Cycle 4 · 3e · Anglais",
    subtitle: "3e — Niveau B1",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau B1.",
    domainsHeading: "Cinq activités langagières",
    subdomains: troisiemeAnglaisSubdomains,
  },
};

const collegeSubjectsMeta: Partial<
  Record<CollegeLevelSlug, Record<string, CollegeSubjectMeta>>
> = {
  "6e": sixiemeSubjectsMeta,
  "5e": cinqiemeSubjectsMeta,
  "4e": quatriemeSubjectsMeta,
  "3e": troisiemeSubjectsMeta,
};

const dynamicCollegeDomainPilotParams = [
  { level: "6e", subject: "francais", domain: "lecture" },
  { level: "6e", subject: "francais", domain: "ecriture" },
  { level: "6e", subject: "francais", domain: "oral" },
  { level: "6e", subject: "francais", domain: "etude-de-la-langue" },
  { level: "6e", subject: "mathematiques", domain: "nombres-calcul" },
  { level: "6e", subject: "mathematiques", domain: "geometrie" },
  { level: "6e", subject: "mathematiques", domain: "grandeurs-mesures" },
  { level: "6e", subject: "mathematiques", domain: "organisation-donnees" },
  { level: "6e", subject: "mathematiques", domain: "resolution-problemes" },
  { level: "6e", subject: "histoire-geographie-emc", domain: "histoire" },
  { level: "6e", subject: "histoire-geographie-emc", domain: "geographie" },
] as const;

export function getCollegeSubjectMeta(
  levelSlug: string,
  subjectSlug: string,
): CollegeSubjectMeta | undefined {
  if (!isCollegeLevelSlug(levelSlug)) return undefined;
  return collegeSubjectsMeta[levelSlug]?.[subjectSlug];
}

export function getCollegeSubjectStaticParams(): {
  level: string;
  subject: string;
}[] {
  const result: { level: string; subject: string }[] = [];
  for (const [level, subjects] of Object.entries(collegeSubjectsMeta)) {
    for (const subject of Object.keys(subjects ?? {})) {
      result.push({ level, subject });
    }
  }
  return result;
}

export function getCollegeDomainEntries(
  levelSlug: string,
  subjectSlug: string,
  domainSlug: string,
): CurriculumEntry[] {
  const curriculumMap = getCollegeCurriculumMap(levelSlug);
  const subjectMap = curriculumMap?.domains.find(
    (domain) => domain.domainSlug === subjectSlug,
  );
  const domainMap = subjectMap?.subdomains.find(
    (subdomain) => subdomain.subdomainSlug === domainSlug,
  );

  return domainMap?.entries ?? [];
}

export function getCollegeDomainMeta(
  levelSlug: string,
  subjectSlug: string,
  domainSlug: string,
): CollegeDomainMeta | undefined {
  if (!isCollegeLevelSlug(levelSlug)) return undefined;

  const subjectMeta = getCollegeSubjectMeta(levelSlug, subjectSlug);
  const subdomain = subjectMeta?.subdomains.find(
    (candidate) => candidate.subdomainSlug === domainSlug,
  );

  if (!subjectMeta || !subdomain?.href) return undefined;

  const entries = getCollegeDomainEntries(levelSlug, subjectSlug, domainSlug);
  if (entries.length === 0) return undefined;

  return {
    level: levelSlug,
    subject: subjectSlug,
    domain: domainSlug,
    subjectLabel: subjectMeta.label,
    domainLabel: subdomain.label,
    cycleLabel: subjectMeta.cycleLabel,
    officialRef: entries[0]?.officialReference ?? subjectMeta.cycleLabel,
    description: subdomain.description,
    status: subdomain.status,
    entries,
    backHref: `/college/${levelSlug}`,
    backLabel: `Retour ${levelSlug}`,
    levelHref: `/college/${levelSlug}`,
    levelLabel: `Tableau de bord ${levelSlug}`,
  };
}

export function getCollegeDomainStaticParams(): {
  level: string;
  subject: string;
  domain: string;
}[] {
  const result: { level: string; subject: string; domain: string }[] = [];

  for (const { level, subject, domain } of dynamicCollegeDomainPilotParams) {
    if (!getCollegeDomainMeta(level, subject, domain)) continue;
    result.push({ level, subject, domain });
  }

  return result;
}

// ── Garde de compatibilité de type ───────────────────────────────────────────
// Vérifie qu'aucun slug collège ne glisse dans AcademyLevelSlug de façon inattendue.
// Si ce type check compile, la cohérence est garantie.

type _AssertCollegeSlugIsAcademySlug = CollegeLevelSlug extends AcademyLevelSlug
  ? true
  : never;
const _typeCheck: _AssertCollegeSlugIsAcademySlug = true;
void _typeCheck;

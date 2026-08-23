/**
 * Configuration de mapping pour l'import des ressources CE1
 * Mappe les dossiers locaux aux domaines/sous-domaines du site Académie Kerboeuf
 *
 * Structure : dossier source → domaine → sous-domaine → slug(s)
 */

export const CE1_CATALOG = {
  // Domaine : Français
  francais: {
    slug: "francais",
    title: "Francais",
    subdomains: {
      "lecture-fluide": {
        slug: "lecture-fluide",
        title: "Lecture fluide",
        competencies: [
          "lire-des-mots-frequents-rapidement",
          "lire-un-texte-court-avec-fluidite",
          "relire-pour-gagner-en-aisance",
        ],
      },
      comprehension: {
        slug: "comprehension",
        title: "Comprehension",
        competencies: [
          "identifier-les-personnages-et-les-lieux",
          "repondre-a-une-question-par-une-information-du-texte",
          "remettre-les-evenements-dans-lordre",
        ],
      },
      "production-ecrite": {
        slug: "production-ecrite",
        title: "Premieres productions ecrites",
        competencies: [
          "ecrire-une-phrase-complete",
          "enchainer-deux-phrases-sur-un-meme-sujet",
          "ameliorer-une-phrase-par-un-detail",
          "copier-un-texte-court-sans-erreur",
        ],
      },
      "etude-de-la-langue": {
        slug: "etude-de-la-langue",
        title: "Grammaire simple",
        subgroups: {
          grammaire: {
            competencies: [
              "reconnaitre-une-phrase-correcte",
              "identifier-le-verbe-dans-une-phrase-simple",
              "identifier-le-nom-dans-une-phrase",
              "identifier-le-sujet-dun-verbe-simple",
            ],
          },
          conjugaison: {
            competencies: [
              "accorder-le-verbe-avec-il-ou-ils",
            ],
          },
          orthographe: {
            competencies: [
              "orthographier-des-mots-outils-frequents",
              "marquer-le-pluriel-regulier-du-nom",
              "accorder-le-verbe-avec-il-ou-ils",
            ],
          },
          vocabulaire: {
            competencies: [
              "enrichir-son-vocabulaire",
            ],
          },
        },
      },
      vocabulaire: {
        slug: "vocabulaire",
        title: "Vocabulaire",
        competencies: [
          "enrichir-son-vocabulaire",
        ],
      },
      oral: {
        slug: "oral",
        title: "Langage oral",
        competencies: [
          "participer-a-un-echange-oral",
        ],
      },
      orthographe: {
        slug: "orthographe",
        title: "Orthographe frequente",
        competencies: [
          "orthographier-des-mots-outils-frequents",
          "marquer-le-pluriel-regulier-du-nom",
          "accorder-le-verbe-avec-il-ou-ils",
        ],
      },
    },
  },

  // Domaine : Mathématiques
  mathematiques: {
    slug: "mathematiques",
    title: "Mathematiques",
    subdomains: {
      "nombres-et-calculs": {
        slug: "nombres-et-calculs",
        title: "Nombres et calculs",
        competencies: [
          "lire-et-ecrire-les-nombres-jusqua-1000",
          "comparer-et-ranger-des-nombres",
          "calculer-mentalement-avec-des-petits-nombres",
          "calculer-mentalement-des-soustractions",
          "poser-une-addition-sans-retenue",
          "poser-une-soustraction",
          "poser-une-addition-avec-retenue",
          "soustraire-avec-methode",
          "comprendre-la-multiplication-comme-addition-repetee",
          "utiliser-les-tables-simples",
        ],
      },
      problemes: {
        slug: "problemes",
        title: "Problemes",
        competencies: [
          "choisir-loperation-dun-probleme-additif-ou-soustractif",
          "resoudre-un-probleme-a-etapes-guidees",
          "expliquer-sa-demarche-de-resolution",
        ],
      },
      "grandeurs-et-mesures": {
        slug: "grandeurs-et-mesures",
        title: "Grandeurs et mesures",
        competencies: [
          "comparer-des-longueurs",
          "mesurer-une-longueur",
          "lire-une-heure-simple",
          "utiliser-la-monnaie",
        ],
      },
      "espace-et-geometrie": {
        slug: "espace-et-geometrie",
        title: "Espace et geometrie",
        competencies: [
          "se-reperer-sur-un-quadrillage",
          "reconnaitre-les-figures-usuelles",
          "tracer-un-segment-a-la-regle",
        ],
      },
    },
  },

  // Domaine : Questionner le monde
  "questionner-le-monde": {
    slug: "questionner-le-monde",
    title: "Questionner le monde",
    subdomains: {
      "monde-vivant": {
        slug: "monde-vivant",
        title: "Le monde vivant",
        competencies: [
          "decrire-le-cycle-dun-etre-vivant",
          "observer-une-chaine-alimentaire-simple",
          "connaitre-les-besoins-des-animaux-et-vegetaux",
        ],
      },
      "espace-et-temps": {
        slug: "espace-et-temps",
        title: "Espace et temps",
        competencies: [
          "observer-les-saisons",
          "se-reperer-dans-le-calendrier",
          "lire-une-frise-chronologique",
          "se-reperer-sur-une-carte-simple",
          "identifier-des-paysages-proches",
        ],
      },
      "matiere-et-energie": {
        slug: "matiere-et-energie",
        title: "Matiere et energie",
        competencies: [
          "reconnaitre-des-materiaux",
          "classer-des-matieres-selon-leurs-proprietes",
          "observer-un-circuit-electrique-simple",
          "adopter-des-comportements-responsables",
        ],
      },
    },
  },

  // Domaine : Enseignements artistiques
  "enseignements-artistiques": {
    slug: "enseignements-artistiques",
    title: "Enseignements artistiques",
    subdomains: {
      "arts-plastiques": {
        slug: "arts-plastiques",
        title: "Arts plastiques",
        competencies: [
          "experimenter-couleurs-formes-et-matieres",
          "composer-avec-formes-et-couleurs",
          "realiser-une-production-personnelle",
          "decrire-une-oeuvre-plastique",
          "organiser-l-espace-d-une-page",
        ],
      },
      "education-musicale": {
        slug: "education-musicale",
        title: "Education musicale",
        competencies: [
          "chanter-avec-justesse",
          "chanter-en-groupe-avec-precision",
          "memoriser-un-chant",
          "reproduire-un-rythme",
          "ecouter-et-decrire-un-extrait-musical",
        ],
      },
    },
  },

  // Domaine : EPS
  eps: {
    slug: "eps",
    title: "EPS",
    subdomains: {
      "activites-physiques": {
        slug: "activites-physiques",
        title: "Activites physiques",
        competencies: [
          "courir-sauter-lancer-avec-intention",
          "ameliorer-une-performance-mesuree",
          "adapter-ses-deplacements",
          "adapter-son-effort-a-la-duree",
        ],
      },
      "jeux-collectifs": {
        slug: "jeux-collectifs",
        title: "Jeux collectifs",
        competencies: [
          "participer-a-un-jeu-collectif",
          "respecter-les-regles-d-un-jeu",
          "cooperer-dans-un-jeu-collectif",
          "respecter-des-roles-varies",
        ],
      },
      "expression-corporelle": {
        slug: "expression-corporelle",
        title: "Expression corporelle",
        competencies: [
          "enchainer-des-actions-pour-communiquer",
          "presenter-une-production-corporelle",
        ],
      },
    },
  },

  // Domaine : EMC
  emc: {
    slug: "emc",
    title: "EMC",
    subdomains: {
      "vie-collective": {
        slug: "vie-collective",
        title: "Vie collective",
        competencies: [
          "respecter-les-regles-collectives",
          "comprendre-l-utilite-d-une-regle",
          "cooperer-dans-un-groupe",
          "prendre-soin-du-materiel-commun",
          "participer-a-une-decision-collective",
        ],
      },
      "vie-interieure-et-alterite": {
        slug: "vie-interieure-et-alterite",
        title: "Vie interieure et alterite",
        competencies: [
          "exprimer-une-emotion",
          "respecter-les-differences",
        ],
      },
      "droits-et-devoirs": {
        slug: "droits-et-devoirs",
        title: "Droits et devoirs",
        competencies: [
          "distinguer-droit-et-devoir",
          "identifier-des-actions-responsables",
        ],
      },
    },
  },
};

/**
 * Mapping des dossiers locaux vers les domaines/sous-domaines
 * Clé : chemin relatif du dossier source
 * Valeur : { domain, subdomain, description }
 */
export const FOLDER_MAPPING = {
  // Français
  "01_FRANÇAIS/Lectures_Compréhension/Contes-et-Histoires": {
    domain: "francais",
    subdomain: "comprehension",
    type: "contes",
    description: "Contes littéraires pour développer la compréhension écrite",
  },
  "01_FRANÇAIS/Lectures_Compréhension": {
    domain: "francais",
    subdomain: "lecture-fluide",
    type: "sequences",
    description: "Fiches et séquences de lecture fluide",
  },
  "01_FRANÇAIS/Étude_de_la_Langue/Grammaire": {
    domain: "francais",
    subdomain: "etude-de-la-langue",
    subgroup: "grammaire",
    type: "sequences",
    description: "Séquences de grammaire simple",
  },
  "01_FRANÇAIS/Étude_de_la_Langue/Conjugaison": {
    domain: "francais",
    subdomain: "etude-de-la-langue",
    subgroup: "conjugaison",
    type: "sequences",
    description: "Fiches de conjugaison",
  },
  "01_FRANÇAIS/Étude_de_la_Langue/Orthographe": {
    domain: "francais",
    subdomain: "orthographe",
    type: "sequences",
    description: "Exercices d'orthographe fréquente",
  },
  "01_FRANÇAIS/Étude_de_la_Langue/Vocabulaire": {
    domain: "francais",
    subdomain: "vocabulaire",
    type: "sequences",
    description: "Activités de vocabulaire",
  },
  "01_FRANÇAIS/Étude_de_la_Langue": {
    domain: "francais",
    subdomain: "etude-de-la-langue",
    type: "sequences",
    description: "Ressources d'étude de la langue",
  },
  "01_FRANÇAIS/Écriture_Production_d'écrits": {
    domain: "francais",
    subdomain: "production-ecrite",
    type: "sequences",
    description: "Fiches de production écrite",
  },
  "01_FRANÇAIS/Oral": {
    domain: "francais",
    subdomain: "oral",
    type: "sequences",
    description: "Activités d'oral",
  },
  "01_FRANÇAIS/Poésie": {
    domain: "francais",
    subdomain: "lecture-fluide",
    type: "sequences",
    description: "Ressources poétiques",
  },

  // Mathématiques
  "02_MATHÉMATIQUES": {
    domain: "mathematiques",
    subdomain: "nombres-et-calculs",
    type: "sequences",
    description: "Séquences mathématiques",
  },

  // EPS
  "07_EPS": {
    domain: "eps",
    subdomain: "activites-physiques",
    type: "sequences",
    description: "Séquences EPS",
  },

  // Supports communs
  "12_SUPPORTS_COMMUNS_ET_ANNEXES": {
    domain: null,
    subdomain: null,
    type: "resources",
    description: "Ressources communes et images",
  },

  // À classer
  "00_À_CLASSER": {
    domain: null,
    subdomain: null,
    type: "orphaned",
    description: "Fichiers à classer",
  },
};

/**
 * Patterns pour identifier les types de fichiers et leurs compétences
 * Utilisé pour les PNG numérotés sans métadonnées
 */
export const FILE_PATTERNS = {
  // Fichiers clairement identifiables
  conte: {
    pattern: /Conte_/i,
    type: "conte-litteraire",
    confidence: "high",
    domain: "francais",
    subdomain: "comprehension",
  },
  litterature: {
    pattern: /Litterature/i,
    type: "ressource-litteraire",
    confidence: "high",
    domain: "francais",
  },
  document: {
    pattern: /_Document\.png$/i,
    type: "fiche-ou-support",
    confidence: "medium",
  },
  sequence: {
    pattern: /Sequence_(\d+)/i,
    type: "sequence-pedagogique",
    confidence: "medium",
  },
};

/**
 * Extensions à exclure de l'import
 */
export const EXCLUDED_EXTENSIONS = [
  ".md",
  ".sh",
  ".json",
  ".tmp",
  ".DS_Store",
  ".gitkeep",
];

/**
 * Dossiers à exclure entièrement
 *
 * AUDIT CORRECTION 2026-08-05:
 * - Archives: 99_ARCHIVES_ET_DOUBLONS, SAUVEGARDE*, Archives
 * - Copies/doublons: CE1-Academie-Kerboeuf, Sequences CE1
 * - Autres: Rentrée de classe, TAPUSCRIT
 * - Techniques: .git, .next, node_modules
 */
export const EXCLUDED_FOLDERS = [
  // Archives et sauvegardes
  "99_ARCHIVES_ET_DOUBLONS",
  "SAUVEGARDE_STRUCTURE",
  "SAUVEGARDE_SECURITE",
  "SAUVEGARDE",
  "Archives",
  "archive",
  "Backup",
  "backup",

  // Copies et doublons
  "CE1-Academie-Kerboeuf",
  "Sequences CE1",

  // Autres dossiers non-actifs
  "Rentrée de classe",
  "TAPUSCRIT",
  "SIMULATION_CLASSEMENT",

  // Techniques
  ".git",
  ".next",
  "node_modules",
];

/**
 * Slugs valides pour validation
 * Construit à partir du catalogue CE1
 */
export function getAllValidSlugs() {
  const slugs = new Set();

  for (const domain of Object.values(CE1_CATALOG)) {
    slugs.add(domain.slug);
    for (const subdomain of Object.values(domain.subdomains)) {
      slugs.add(subdomain.slug);
      if (subdomain.competencies) {
        subdomain.competencies.forEach(c => slugs.add(c));
      }
      if (subdomain.subgroups) {
        for (const subgroup of Object.values(subdomain.subgroups)) {
          if (subgroup.competencies) {
            subgroup.competencies.forEach(c => slugs.add(c));
          }
        }
      }
    }
  }

  return slugs;
}

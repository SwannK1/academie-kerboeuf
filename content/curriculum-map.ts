// Registre central du programme détaillé — CP, CE1, CE2, CM1.
// CM2 est explicitement absent : il conserve son univers Félix isolé.
// Ces données sont des pilotes structurels. Elles n'embarquent aucun contenu
// pédagogique complet : pas de leçon, pas d'exercice, pas de correction.
// Le site organise ; les PDF enseignent.

import type {
  CurriculumMap,
  CurriculumResourceIntent,
  CurriculumSubjectBlock,
  ExpectedCompetency,
  LearningCompetency,
} from "@/content/learning-architecture-types";
import { getCompetenciesForLevel } from "@/content/competencies";
import type { CurriculumLevelMap } from "@/content/curriculum-map-types";
import { cpCurriculumLevelMap } from "@/content/levels/cp-curriculum";
import { ce1CurriculumLevelMap } from "@/content/levels/ce1-curriculum";
import { ce2CurriculumLevelMap } from "@/content/levels/ce2-curriculum";
import { cm1CurriculumLevelMap } from "@/content/levels/cm1-curriculum";

// ── Constante de garde — CM2 intentionnellement absent ───────────────────────
// Ne pas ajouter "cm2" ici sans mission dédiée CM2.
export const CURRICULUM_LEVEL_SLUGS = ["cp", "ce1", "ce2", "cm1"] as const;
export type CurriculumLevelSlug = (typeof CURRICULUM_LEVEL_SLUGS)[number];

// ── Ressources prévues communes ───────────────────────────────────────────────
// Aucun href — intentions uniquement. Ne jamais ajouter de lien fictif.

const FULL_RESOURCES: CurriculumResourceIntent[] = [
  { kind: "lesson-pdf",       label: "Leçon PDF" },
  { kind: "exercises-pdf",    label: "Exercices PDF" },
  { kind: "correction-pdf",   label: "Correction PDF" },
  { kind: "projectable-pdf",  label: "Support projetable" },
  { kind: "parent-sheet-pdf", label: "Fiche parent" },
];

const BASE_RESOURCES: CurriculumResourceIntent[] = [
  { kind: "lesson-pdf",    label: "Leçon PDF" },
  { kind: "exercises-pdf", label: "Exercices PDF" },
  { kind: "correction-pdf", label: "Correction PDF" },
];

const ASSESSMENT_RESOURCES: CurriculumResourceIntent[] = [
  { kind: "lesson-pdf",     label: "Leçon PDF" },
  { kind: "exercises-pdf",  label: "Exercices PDF" },
  { kind: "assessment-pdf", label: "Évaluation PDF" },
];

// ── CP ────────────────────────────────────────────────────────────────────────

const cpCurriculumMap: CurriculumMap = {
  levelSlug: "cp",
  subjects: [

    // ── Français ─────────────────────────────────────────────────────────────
    {
      slug: "francais",
      label: "Français",
      domains: [

        // Lecture
        {
          slug: "lecture",
          label: "Lecture",
          subdomains: [
            {
              slug: "lecture-comprehension",
              label: "Compréhension de phrases et de textes",
              competencies: [
                {
                  id: "exp-cp-fr-lc-comprendre-phrase",
                  title: "Comprendre une phrase simple",
                  description: "Repérer qui fait quoi dans une phrase courte.",
                  status: "in-progress",
                  successCriteria: [
                    "Je lis la phrase jusqu'au bout.",
                    "Je retrouve le personnage ou l'objet important.",
                    "Je réponds avec une information de la phrase.",
                  ],
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-fr-lc-comprendre-phrase-simple",
                },
                {
                  id: "exp-cp-fr-lc-personnages-lieux",
                  title: "Identifier personnages, lieux et actions",
                  description: "Nommer qui est dans le texte, où cela se passe et ce qui se passe.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-fr-lc-personnages-lieux-actions",
                },
                {
                  id: "exp-cp-fr-lc-texte-entendu",
                  title: "Comprendre un texte entendu",
                  description: "Dire les informations importantes d'un court texte lu par l'adulte.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-fr-lc-texte-entendu",
                },
              ],
            },
            {
              slug: "decodage",
              label: "Décodage et identification des mots",
              competencies: [
                {
                  id: "exp-cp-fr-lc-graphemes-phonemes",
                  title: "Reconnaître des correspondances graphèmes-phonèmes simples",
                  description: "Associer un son à sa lettre ou son groupe de lettres.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-fr-dec-graphemes-phonemes",
                },
                {
                  id: "exp-cp-fr-dec-mots-reguliers",
                  title: "Lire des mots réguliers",
                  description: "Décoder un mot dont toutes les correspondances graphèmes-phonèmes sont connues.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-fr-dec-mots-reguliers",
                },
                {
                  id: "exp-cp-fr-dec-fusionner-syllabes",
                  title: "Lire des syllabes simples",
                  description: "Assembler deux phonèmes connus pour lire une syllabe à voix haute.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-fr-dec-fusionner-syllabes",
                },
              ],
            },
          ],
        },

        // Écriture
        {
          slug: "ecriture",
          label: "Écriture",
          subdomains: [
            {
              slug: "encodage-production",
              label: "Encodage et production de phrases",
              competencies: [
                {
                  id: "exp-cp-fr-ecr-encoder-mots",
                  title: "Encoder des mots réguliers",
                  description: "Écrire un mot régulier en segmentant ses syllabes et en associant les graphèmes.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-fr-ecr-encoder-mots",
                },
                {
                  id: "exp-cp-fr-ecr-encoder-syllabes",
                  title: "Encoder des syllabes",
                  description: "Écrire une syllabe simple à partir des sons entendus.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-fr-ecr-encoder-syllabes",
                },
                {
                  id: "exp-cp-fr-ecr-ecrire-phrase",
                  title: "Écrire une phrase simple avec aide",
                  description: "Produire une phrase courte et lisible en s'appuyant sur un modèle.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-fr-ecr-ecrire-phrase",
                },
                {
                  id: "exp-cp-fr-ecr-copier-phrase",
                  title: "Copier une phrase courte",
                  description: "Copier une phrase en respectant les mots et la ponctuation.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-fr-ecr-copier-phrase",
                },
              ],
            },
          ],
        },

        // Étude de la langue
        {
          slug: "etude-de-la-langue",
          label: "Étude de la langue",
          subdomains: [
            {
              slug: "grammaire-phrase",
              label: "Grammaire de la phrase",
              competencies: [
                {
                  id: "exp-cp-fr-edl-reconnaitre-phrase",
                  title: "Reconnaître une phrase",
                  description: "Distinguer une phrase correcte d'un groupe de mots incomplet.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-fr-edl-reconnaitre-phrase",
                },
                {
                  id: "exp-cp-fr-edl-reperer-verbe",
                  title: "Repérer le verbe dans une phrase simple",
                  description: "Identifier le mot qui exprime l'action dans une phrase courte.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-fr-edl-reperer-verbe",
                },
              ],
            },
          ],
        },

        // Oral
        {
          slug: "oral",
          label: "Oral",
          subdomains: [
            {
              slug: "ecoute-expression",
              label: "Écoute et expression",
              competencies: [
                {
                  id: "exp-cp-fr-oral-ecouter-consigne",
                  title: "Écouter une consigne",
                  description: "Recevoir une consigne orale courte et la mettre en œuvre.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-fr-oral-ecouter-consigne",
                },
                {
                  id: "exp-cp-fr-oral-raconter",
                  title: "Raconter un événement",
                  description: "Dire quelques phrases dans un ordre compréhensible.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-fr-oral-raconter",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Mathématiques ─────────────────────────────────────────────────────────
    {
      slug: "mathematiques",
      label: "Mathématiques",
      domains: [

        // Nombres et calcul
        {
          slug: "nombres-calcul",
          label: "Nombres et calcul",
          subdomains: [
            {
              slug: "numeration",
              label: "Numération",
              competencies: [
                {
                  id: "exp-cp-ma-nc-denombrer",
                  title: "Dénombrer une collection jusqu'à 10",
                  description: "Compter une collection en disant un nombre par objet.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-ma-num-nombres-10",
                },
                {
                  id: "exp-cp-ma-num-nombres-20",
                  title: "Lire les nombres jusqu'à 20",
                  description: "Lire, écrire et représenter les nombres jusqu'à 20.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-num-nombres-20",
                },
                {
                  id: "exp-cp-ma-num-nombres-100",
                  title: "Lire les nombres jusqu'à 100",
                  description: "Lire, écrire et représenter les nombres jusqu'à 100.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-num-nombres-100",
                },
                {
                  id: "exp-cp-ma-num-decomposer",
                  title: "Décomposer un nombre",
                  description: "Décomposer un nombre en dizaines et unités.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-num-decomposer",
                },
                {
                  id: "exp-cp-ma-num-comparer-ranger",
                  title: "Comparer et ranger des nombres",
                  description: "Utiliser < et > pour comparer deux nombres et ranger une liste.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-num-comparer-ranger",
                },
              ],
            },
            {
              slug: "calcul",
              label: "Calcul",
              competencies: [
                {
                  id: "exp-cp-ma-cal-addition",
                  title: "Additionner deux petits nombres",
                  description: "Calculer la somme de deux nombres en utilisant différentes stratégies.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-ma-cal-addition",
                },
                {
                  id: "exp-cp-ma-cal-soustraction",
                  title: "Soustraire de petits nombres",
                  description: "Calculer la différence entre deux petits nombres dans une situation concrète.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-cal-soustraction",
                },
                {
                  id: "exp-cp-ma-cal-faits-numeriques",
                  title: "Mémoriser des faits numériques",
                  description: "Connaître des résultats simples pour calculer plus vite.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-cal-faits-numeriques",
                },
              ],
            },
            {
              slug: "problemes",
              label: "Résolution de problèmes",
              competencies: [
                {
                  id: "exp-cp-ma-prob-comprendre-situation",
                  title: "Comprendre une situation",
                  description: "Repérer ce que l'on cherche dans un problème court.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-prob-comprendre-situation",
                },
                {
                  id: "exp-cp-ma-prob-resoudre-additif",
                  title: "Résoudre un problème additif simple",
                  description: "Trouver le résultat d'un problème d'addition ou de soustraction et écrire la réponse.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-ma-prob-resoudre-additif",
                },
              ],
            },
          ],
        },

        // Grandeurs et mesures
        {
          slug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          subdomains: [
            {
              slug: "longueurs",
              label: "Longueurs",
              competencies: [
                {
                  id: "exp-cp-ma-gm-comparer-longueurs",
                  title: "Comparer des longueurs",
                  description: "Comparer directement deux objets ou utiliser un repère simple.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-gm-longueurs",
                },
              ],
            },
            {
              slug: "temps",
              label: "Temps",
              competencies: [
                {
                  id: "exp-cp-ma-gm-temps",
                  title: "Se repérer dans le temps",
                  description: "Ordonner des moments proches et utiliser le vocabulaire du temps.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-gm-temps",
                },
              ],
            },
          ],
        },

        // Géométrie
        {
          slug: "geometrie",
          label: "Géométrie",
          subdomains: [
            {
              slug: "figures-espace",
              label: "Figures planes et repérage dans l'espace",
              competencies: [
                {
                  id: "exp-cp-ma-geo-nommer-formes",
                  title: "Nommer carré, rectangle, triangle, cercle",
                  description: "Nommer les figures planes principales et décrire une caractéristique de chacune.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cp-ma-geo-nommer-formes",
                },
                {
                  id: "exp-cp-ma-geo-formes-simples",
                  title: "Reconnaître des formes simples",
                  description: "Identifier carré, rectangle, triangle et cercle.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-geo-formes-simples",
                },
                {
                  id: "exp-cp-ma-geo-reperage-espace",
                  title: "Se repérer dans l'espace",
                  description: "Utiliser le vocabulaire spatial pour décrire la position d'un objet.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-ma-geo-reperage-espace",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Questionner le monde ──────────────────────────────────────────────────
    {
      slug: "questionner-le-monde",
      label: "Questionner le monde",
      domains: [
        {
          slug: "vivant-environnement",
          label: "Le vivant et son environnement",
          subdomains: [
            {
              slug: "observer-vivant",
              label: "Observer le vivant",
              competencies: [
                {
                  id: "exp-cp-qdm-obs-animal",
                  title: "Observer et décrire un animal ou une plante",
                  description: "Nommer et décrire quelques caractéristiques d'un être vivant observé.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cp-qdm-obs-animal-plante",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ── CE1 ───────────────────────────────────────────────────────────────────────

const ce1CurriculumMap: CurriculumMap = {
  levelSlug: "ce1",
  subjects: [

    // ── Français ─────────────────────────────────────────────────────────────
    {
      slug: "francais",
      label: "Français",
      domains: [

        // Lecture
        {
          slug: "lecture",
          label: "Lecture",
          subdomains: [
            {
              slug: "comprehension-textes",
              label: "Compréhension de textes",
              competencies: [
                {
                  id: "exp-ce1-fr-lc-identifier-infos",
                  title: "Identifier les informations importantes d'un texte court",
                  description: "Repérer les éléments essentiels d'un texte narratif bref.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce1-fr-lc-informations-explicites",
                },
                {
                  id: "exp-ce1-fr-lc-retenir-essentiel",
                  title: "Retenir l'essentiel d'un texte lu",
                  description: "Résumer en une ou deux phrases ce qu'on vient de lire.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-fr-lc-retenir-essentiel",
                },
              ],
            },
          ],
        },

        // Écriture
        {
          slug: "ecriture",
          label: "Écriture",
          subdomains: [
            {
              slug: "production-phrases",
              label: "Production de phrases",
              competencies: [
                {
                  id: "exp-ce1-fr-ecr-produire-phrases",
                  title: "Écrire quelques phrases cohérentes",
                  description: "Rédiger deux ou trois phrases en respectant une consigne simple.",
                  status: "upcoming",
                  successCriteria: [
                    "J'écris des phrases qui ont du sens.",
                    "Je mets les majuscules et les points.",
                  ],
                  plannedResources: ASSESSMENT_RESOURCES,
                  competencyId: "ce1-fr-ecr-phrases-coherentes",
                },
              ],
            },
          ],
        },

        // Étude de la langue
        {
          slug: "etude-de-la-langue",
          label: "Étude de la langue",
          subdomains: [
            {
              slug: "etude-de-la-langue",
              label: "Grammaire de la phrase",
              competencies: [
                {
                  id: "exp-ce1-fr-edl-reconnaitre-phrase",
                  title: "Reconnaître une phrase",
                  description: "Distinguer une phrase correcte d'un groupe de mots incomplet.",
                  status: "in-progress",
                  successCriteria: [
                    "Je vérifie que les mots ont du sens ensemble.",
                    "Je repère la majuscule au début.",
                    "Je repère la ponctuation finale.",
                  ],
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce1-fr-edl-reconnaitre-phrase",
                },
                {
                  id: "exp-ce1-fr-edl-sujet-verbe",
                  title: "Identifier le verbe et son sujet",
                  description: "Repérer dans une phrase simple le groupe sujet et le verbe.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-fr-edl-identifier-sujet-verbe",
                },
              ],
            },
            {
              slug: "orthographe",
              label: "Orthographe",
              competencies: [
                {
                  id: "exp-ce1-fr-orth-accords-determinants",
                  title: "Accorder le déterminant avec le nom",
                  description: "Utiliser le bon article selon le genre et le nombre du nom.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-fr-orth-accorder-determinant",
                },
                {
                  id: "exp-ce1-fr-orth-marquer-pluriel",
                  title: "Marquer le pluriel des noms",
                  description: "Ajouter -s au nom et au déterminant pour écrire le pluriel.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-fr-orth-marquer-pluriel",
                },
              ],
            },
          ],
        },

        // Oral
        {
          slug: "oral",
          label: "Oral",
          subdomains: [
            {
              slug: "expression-orale",
              label: "Expression orale",
              competencies: [
                {
                  id: "exp-ce1-fr-oral-raconter",
                  title: "Raconter un événement bref",
                  description: "Présenter un fait vécu ou lu dans un ordre compréhensible.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-fr-oral-raconter-evenement-bref",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Mathématiques ─────────────────────────────────────────────────────────
    {
      slug: "mathematiques",
      label: "Mathématiques",
      domains: [

        // Nombres et calcul
        {
          slug: "nombres-calcul",
          label: "Nombres et calcul",
          subdomains: [
            {
              slug: "numeration",
              label: "Numération jusqu'à 100",
              competencies: [
                {
                  id: "exp-ce1-ma-num-nombres-100",
                  title: "Lire et écrire les nombres jusqu'à 100",
                  description: "Comprendre la valeur positionnelle des dizaines et des unités.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce1-ma-num-lire-ecrire-100",
                },
                {
                  id: "exp-ce1-ma-num-comparer",
                  title: "Comparer et ranger des nombres jusqu'à 100",
                  description: "Utiliser les symboles < et > pour ordonner une liste.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-ma-num-comparer-ranger-100",
                },
              ],
            },
            {
              slug: "calcul",
              label: "Calcul et mémorisation",
              competencies: [
                {
                  id: "exp-ce1-ma-nc-tables-addition",
                  title: "Mémoriser les tables d'addition",
                  description: "Restituer de mémoire les résultats des additions jusqu'à 10 + 10.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce1-ma-cal-tables-addition",
                },
                {
                  id: "exp-ce1-ma-cal-soustraire",
                  title: "Soustraire dans la centaine",
                  description: "Calculer une soustraction simple en utilisant différentes stratégies.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-ma-cal-soustraire-centaine",
                },
              ],
            },
            {
              slug: "problemes",
              label: "Résolution de problèmes",
              competencies: [
                {
                  id: "exp-ce1-ma-prob-additifs",
                  title: "Résoudre un problème additif",
                  description: "Choisir addition ou soustraction dans une situation courte.",
                  status: "upcoming",
                  successCriteria: [
                    "Je repère ce qu'on cherche.",
                    "Je choisis une opération adaptée.",
                  ],
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce1-ma-prob-additifs-une-etape",
                },
              ],
            },
          ],
        },

        // Grandeurs et mesures
        {
          slug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          subdomains: [
            {
              slug: "longueurs-temps",
              label: "Longueurs et temps",
              competencies: [
                {
                  id: "exp-ce1-ma-gm-mesurer-longueur",
                  title: "Mesurer une longueur",
                  description: "Utiliser la règle graduée pour mesurer un segment simple.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-ma-gm-mesurer-longueur",
                },
              ],
            },
          ],
        },

        // Géométrie
        {
          slug: "geometrie",
          label: "Géométrie",
          subdomains: [
            {
              slug: "figures-planes",
              label: "Figures planes",
              competencies: [
                {
                  id: "exp-ce1-ma-geo-figures",
                  title: "Reconnaître et décrire des figures planes",
                  description: "Nommer carré, rectangle, triangle et cercle ; décrire leurs propriétés.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce1-ma-geo-decrire-figures-planes",
                },
                {
                  id: "exp-ce1-ma-geo-perimetre",
                  title: "Mesurer le périmètre d'une figure simple",
                  description: "Additionner les côtés d'un polygone pour calculer son périmètre.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-ma-geo-perimetre",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Questionner le monde ──────────────────────────────────────────────────
    {
      slug: "questionner-le-monde",
      label: "Questionner le monde",
      domains: [
        {
          slug: "matiere-objets",
          label: "Matière, objets et mélanges",
          subdomains: [
            {
              slug: "etats-matiere",
              label: "États de la matière",
              competencies: [
                {
                  id: "exp-ce1-qdm-etats-matiere",
                  title: "Distinguer les états solide, liquide et gazeux",
                  description: "Classer des substances selon leur état et identifier un changement d'état.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce1-qdm-matiere-etats",
                },
                {
                  id: "exp-ce1-qdm-cycles-eau",
                  title: "Décrire le cycle de l'eau simplifié",
                  description: "Relier évaporation, condensation et précipitations à des observations.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce1-qdm-cycle-eau-simplifie",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ── CE2 ───────────────────────────────────────────────────────────────────────

const ce2CurriculumMap: CurriculumMap = {
  levelSlug: "ce2",
  subjects: [

    // ── Mathématiques ─────────────────────────────────────────────────────────
    {
      slug: "mathematiques",
      label: "Mathématiques",
      domains: [

        // Nombres et calcul
        {
          slug: "nombres-calcul",
          label: "Nombres et calcul",
          subdomains: [
            {
              slug: "numeration",
              label: "Numération jusqu'à 1 000",
              competencies: [
                {
                  id: "exp-ce2-ma-num-milliers",
                  title: "Lire et écrire les nombres jusqu'à 1 000",
                  description: "Comprendre la valeur positionnelle des centaines, dizaines et unités.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce2-ma-num-lire-ecrire-1000",
                },
                {
                  id: "exp-ce2-ma-num-comparer-1000",
                  title: "Comparer et ranger des nombres jusqu'à 1 000",
                  description: "Ordonner des nombres en s'appuyant sur les rangs des chiffres.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-ma-num-comparer-nombres-1000",
                },
              ],
            },
            {
              slug: "calcul-mental",
              label: "Calcul mental",
              competencies: [
                {
                  id: "exp-ce2-ma-cm-ajouter-9-19-29",
                  title: "Ajouter 9, 19 ou 29 rapidement",
                  description: "Transformer un ajout proche d'une dizaine en calcul mental simplifié.",
                  status: "in-progress",
                  successCriteria: [
                    "Je reconnais +9, +19 ou +29.",
                    "J'ajoute la dizaine ronde.",
                    "Je retire 1 et je vérifie le résultat.",
                  ],
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce2-ma-cm-ajouter-9-19-29",
                },
                {
                  id: "exp-ce2-ma-cm-tables-multiplication",
                  title: "Mémoriser les tables de multiplication (2 à 5)",
                  description: "Restituer de mémoire les produits des tables de 2 à 5.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce2-ma-cm-tables-multiplication",
                },
              ],
            },
            {
              slug: "problemes",
              label: "Résolution de problèmes",
              competencies: [
                {
                  id: "exp-ce2-ma-prob-multiplicatifs",
                  title: "Résoudre un problème multiplicatif simple",
                  description: "Utiliser addition réitérée ou multiplication dans une situation courte.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce2-ma-prob-multiplicatifs-simples",
                },
              ],
            },
          ],
        },

        // Grandeurs et mesures
        {
          slug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          subdomains: [
            {
              slug: "longueurs-masses",
              label: "Longueurs et masses",
              competencies: [
                {
                  id: "exp-ce2-ma-gm-longueurs",
                  title: "Mesurer et convertir des longueurs simples",
                  description: "Utiliser m, dm, cm et mm ; convertir entre unités voisines.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce2-ma-gm-longueurs-simples",
                },
                {
                  id: "exp-ce2-ma-gm-masses",
                  title: "Comparer et mesurer des masses",
                  description: "Utiliser kg et g ; se servir d'une balance pour peser.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-ma-gm-masses",
                },
              ],
            },
          ],
        },

        // Géométrie
        {
          slug: "geometrie",
          label: "Géométrie",
          subdomains: [
            {
              slug: "figures-traces",
              label: "Figures et tracés",
              competencies: [
                {
                  id: "exp-ce2-ma-geo-tracer-figures",
                  title: "Tracer une figure simple",
                  description: "Utiliser règle et équerre pour reproduire une figure guidée.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-ma-geo-tracer-figure-simple",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Français ─────────────────────────────────────────────────────────────
    {
      slug: "francais",
      label: "Français",
      domains: [

        // Lecture
        {
          slug: "lecture",
          label: "Lecture",
          subdomains: [
            {
              slug: "comprehension",
              label: "Compréhension de textes",
              competencies: [
                {
                  id: "exp-ce2-fr-lc-infos-principales",
                  title: "Identifier les informations principales d'un texte",
                  description: "Repérer les éléments essentiels d'un texte court pour en rendre compte.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce2-fr-lc-informations-principales",
                },
                {
                  id: "exp-ce2-fr-lc-reformuler",
                  title: "Reformuler ce qu'on a compris",
                  description: "Résumer un passage avec ses propres mots.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-fr-lc-reformuler",
                },
              ],
            },
            {
              slug: "textes-documentaires",
              label: "Textes documentaires",
              competencies: [
                {
                  id: "exp-ce2-fr-lc-texte-doc",
                  title: "Lire un texte documentaire court",
                  description: "Repérer la structure et les informations-clés d'un texte informatif.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-fr-lc-texte-documentaire-court",
                },
                {
                  id: "exp-ce2-fr-lc-point-vue",
                  title: "Distinguer faits et opinions dans un texte",
                  description: "Identifier ce qui est affirmé ou supposé dans un écrit simple.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-fr-lc-faits-opinions",
                },
              ],
            },
          ],
        },

        // Écriture
        {
          slug: "ecriture",
          label: "Écriture",
          subdomains: [
            {
              slug: "production-ecrite",
              label: "Production écrite",
              competencies: [
                {
                  id: "exp-ce2-fr-ecr-produire-texte",
                  title: "Produire un court texte organisé",
                  description: "Écrire 3 à 5 phrases en respectant une consigne d'écriture.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce2-fr-ecr-court-texte-organise",
                },
                {
                  id: "exp-ce2-fr-ecr-reviser",
                  title: "Réviser son texte avec une aide",
                  description: "Corriger les erreurs identifiées avec une liste de vérification.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-fr-ecr-reviser-texte",
                },
              ],
            },
          ],
        },

        // Étude de la langue
        {
          slug: "etude-de-la-langue",
          label: "Étude de la langue",
          subdomains: [
            {
              slug: "accords",
              label: "Accords dans le groupe nominal",
              competencies: [
                {
                  id: "exp-ce2-fr-edl-accords-groupe-nominal",
                  title: "Accorder dans le groupe nominal",
                  description: "Marquer le genre et le nombre dans un groupe nominal simple.",
                  status: "upcoming",
                  successCriteria: [
                    "Je repère le nom noyau.",
                    "J'accorde déterminant et adjectif.",
                  ],
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-fr-edl-accords-groupe-nominal",
                },
              ],
            },
          ],
        },

        // Oral
        {
          slug: "oral",
          label: "Oral",
          subdomains: [
            {
              slug: "expose-court",
              label: "Prise de parole courte",
              competencies: [
                {
                  id: "exp-ce2-fr-oral-presenter",
                  title: "Présenter une information à l'oral",
                  description: "Exposer brièvement une information avec un vocabulaire précis.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-fr-oral-presenter-info",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Questionner le monde ──────────────────────────────────────────────────
    {
      slug: "questionner-le-monde",
      label: "Questionner le monde",
      domains: [
        {
          slug: "espace-temps",
          label: "Espace et temps",
          subdomains: [
            {
              slug: "reperer-espace-temps",
              label: "Se repérer dans l'espace et dans le temps",
              competencies: [
                {
                  id: "exp-ce2-qdm-reperer-espace",
                  title: "Lire un plan simple",
                  description: "Orienter un plan et repérer un lieu avec une légende simple.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "ce2-qdm-espace-lire-plan-simple",
                },
                {
                  id: "exp-ce2-qdm-reperer-temps",
                  title: "Situer un événement sur une frise chronologique",
                  description: "Placer et relier des événements simples sur une frise.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "ce2-qdm-temps-frise-chronologique",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ── CM1 ───────────────────────────────────────────────────────────────────────

const cm1CurriculumMap: CurriculumMap = {
  levelSlug: "cm1",
  subjects: [

    // ── Français ─────────────────────────────────────────────────────────────
    {
      slug: "francais",
      label: "Français",
      domains: [

        // Lecture
        {
          slug: "lecture",
          label: "Lecture",
          subdomains: [
            {
              slug: "comprehension-litteraire",
              label: "Compréhension de textes littéraires",
              competencies: [
                {
                  id: "exp-cm1-fr-lc-intentions-personnage",
                  title: "Comprendre les intentions d'un personnage",
                  description: "Déduire ce qu'un personnage cherche à faire à partir de ses paroles et de ses actions.",
                  status: "in-progress",
                  successCriteria: [
                    "Je relève ce que le personnage dit.",
                    "Je relève ce que le personnage fait.",
                    "Je formule une intention et je la justifie.",
                  ],
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cm1-fr-lc-intentions-personnage",
                },
                {
                  id: "exp-cm1-fr-lc-implicite",
                  title: "Inférer un sens implicite",
                  description: "Comprendre ce qui n'est pas dit directement en s'appuyant sur des indices.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cm1-fr-lc-inference-simple",
                },
              ],
            },
            {
              slug: "textes-informatifs",
              label: "Textes informatifs et documentaires",
              competencies: [
                {
                  id: "exp-cm1-fr-lc-texte-informatif",
                  title: "Lire et comprendre un texte documentaire",
                  description: "Repérer l'organisation et les informations principales d'un texte informatif.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cm1-fr-lc-texte-informatif",
                },
              ],
            },
          ],
        },

        // Écriture
        {
          slug: "ecriture",
          label: "Écriture",
          subdomains: [
            {
              slug: "redaction",
              label: "Rédaction",
              competencies: [
                {
                  id: "exp-cm1-fr-ecr-produire-texte",
                  title: "Produire un texte structuré",
                  description: "Écrire un texte de 10 à 15 lignes avec une introduction et une conclusion.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cm1-fr-ecr-texte-structure",
                },
                {
                  id: "exp-cm1-fr-ecr-planifier",
                  title: "Planifier son écrit avant de rédiger",
                  description: "Organiser ses idées en liste ou en plan avant d'écrire.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cm1-fr-ecr-planifier",
                },
              ],
            },
          ],
        },

        // Étude de la langue
        {
          slug: "etude-de-la-langue",
          label: "Étude de la langue",
          subdomains: [
            {
              slug: "fonctions-accords",
              label: "Fonctions et accords",
              competencies: [
                {
                  id: "exp-cm1-fr-edl-sujet-verbe-accord",
                  title: "Identifier sujet, verbe et accords",
                  description: "Repérer les fonctions essentielles pour contrôler les accords simples.",
                  status: "upcoming",
                  successCriteria: [
                    "Je repère le verbe conjugué.",
                    "Je relie le sujet au verbe.",
                  ],
                  plannedResources: ASSESSMENT_RESOURCES,
                  competencyId: "cm1-fr-edl-sujet-verbe-accord",
                },
              ],
            },
          ],
        },

        // Oral
        {
          slug: "oral",
          label: "Oral",
          subdomains: [
            {
              slug: "presentation-argumentee",
              label: "Présentation argumentée",
              competencies: [
                {
                  id: "exp-cm1-fr-oral-presenter-avis",
                  title: "Présenter un avis argumenté",
                  description: "Donner un avis court et l'appuyer sur un exemple ou un indice.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cm1-fr-oral-avis-argumente",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Histoire-Géographie ───────────────────────────────────────────────────
    {
      slug: "histoire-geographie",
      label: "Histoire-Géographie",
      domains: [

        // Histoire
        {
          slug: "antiquite",
          label: "L'Antiquité",
          subdomains: [
            {
              slug: "civilisations-antiques",
              label: "Civilisations antiques",
              competencies: [
                {
                  id: "exp-cm1-hi-ant-situer-civilisation",
                  title: "Situer une civilisation dans le temps",
                  description: "Placer une civilisation antique sur une frise chronologique.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cm1-hi-ant-situer-civilisation",
                },
              ],
            },
          ],
        },

        // Géographie
        {
          slug: "geographie",
          label: "Géographie",
          subdomains: [
            {
              slug: "territoires-france",
              label: "Territoires et paysages de France",
              competencies: [
                {
                  id: "exp-cm1-geo-territoire-france",
                  title: "Décrire un espace de vie ou un territoire",
                  description: "Présenter les caractéristiques d'un espace étudié à partir d'une carte.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cm1-geo-decrire-territoire",
                },
                {
                  id: "exp-cm1-geo-paysages",
                  title: "Lire un paysage et identifier ses composantes",
                  description: "Distinguer les éléments naturels et humains d'un paysage.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cm1-geo-lire-paysage",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Mathématiques ─────────────────────────────────────────────────────────
    {
      slug: "mathematiques",
      label: "Mathématiques",
      domains: [

        // Nombres et calcul
        {
          slug: "nombres-calcul",
          label: "Nombres et calcul",
          subdomains: [
            {
              slug: "grands-nombres",
              label: "Grands nombres et fractions",
              competencies: [
                {
                  id: "exp-cm1-ma-num-millions",
                  title: "Lire et écrire les grands nombres",
                  description: "Maîtriser la numération jusqu'au million.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cm1-ma-num-grands-nombres",
                },
                {
                  id: "exp-cm1-ma-num-fractions",
                  title: "Comprendre la notion de fraction",
                  description: "Partager en parties égales ; lire et écrire une fraction simple.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cm1-ma-num-fractions",
                },
              ],
            },
            {
              slug: "calcul-pose",
              label: "Calcul posé",
              competencies: [
                {
                  id: "exp-cm1-ma-cal-multiplication",
                  title: "Poser et calculer une multiplication",
                  description: "Calculer le produit de deux entiers par l'algorithme de la multiplication.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cm1-ma-cal-multiplication",
                },
                {
                  id: "exp-cm1-ma-cal-division",
                  title: "Poser et calculer une division euclidienne",
                  description: "Calculer le quotient et le reste d'une division posée.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cm1-ma-cal-division",
                },
              ],
            },
            {
              slug: "problemes",
              label: "Résolution de problèmes",
              competencies: [
                {
                  id: "exp-cm1-ma-prob-etapes",
                  title: "Résoudre un problème à étapes",
                  description: "Identifier les données utiles et organiser deux calculs successifs.",
                  status: "upcoming",
                  plannedResources: FULL_RESOURCES,
                  competencyId: "cm1-ma-prob-etapes",
                },
              ],
            },
          ],
        },

        // Grandeurs et mesures
        {
          slug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          subdomains: [
            {
              slug: "aires-perimetres",
              label: "Aires et périmètres",
              competencies: [
                {
                  id: "exp-cm1-ma-gm-aires-perimetres",
                  title: "Distinguer aire et périmètre",
                  description: "Choisir la grandeur adaptée selon la question posée.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cm1-ma-gm-aires-perimetres",
                },
              ],
            },
          ],
        },

        // Géométrie
        {
          slug: "geometrie",
          label: "Géométrie",
          subdomains: [
            {
              slug: "figures-construction",
              label: "Figures et constructions",
              competencies: [
                {
                  id: "exp-cm1-ma-geo-triangles-quadrilateres",
                  title: "Décrire et construire des figures",
                  description: "Utiliser les propriétés de triangles et quadrilatères pour tracer.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cm1-ma-geo-decrire-construire-figures",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Sciences ─────────────────────────────────────────────────────────────
    {
      slug: "sciences",
      label: "Sciences",
      domains: [
        {
          slug: "vivant",
          label: "Le vivant",
          subdomains: [
            {
              slug: "classification-besoins",
              label: "Classification et besoins",
              competencies: [
                {
                  id: "exp-cm1-sc-vivant-besoins",
                  title: "Décrire les besoins du vivant",
                  description: "Identifier quelques besoins communs et différences entre êtres vivants.",
                  status: "upcoming",
                  plannedResources: BASE_RESOURCES,
                  competencyId: "cm1-sc-vivant-besoins",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ── Registre central ──────────────────────────────────────────────────────────
// CM2 est volontairement absent.

const curriculumMaps: Record<CurriculumLevelSlug, CurriculumMap> = {
  cp:  cpCurriculumMap,
  ce1: ce1CurriculumMap,
  ce2: ce2CurriculumMap,
  cm1: cm1CurriculumMap,
};

const curriculumLevelMaps: Partial<Record<CurriculumLevelSlug, CurriculumLevelMap>> = {
  cp:  cpCurriculumLevelMap,
  ce1: ce1CurriculumLevelMap,
  ce2: ce2CurriculumLevelMap,
  cm1: cm1CurriculumLevelMap,
};

function isCurriculumLevelSlug(slug: string): slug is CurriculumLevelSlug {
  return (CURRICULUM_LEVEL_SLUGS as readonly string[]).includes(slug);
}

// ── Fonctions de lecture ──────────────────────────────────────────────────────

export function getCurriculumMapForLevel(
  levelSlug: string,
): CurriculumMap | undefined {
  if (!isCurriculumLevelSlug(levelSlug)) return undefined;
  return curriculumMaps[levelSlug];
}

export function getCurriculumSubjectsForLevel(
  levelSlug: string,
): CurriculumSubjectBlock[] {
  return getCurriculumMapForLevel(levelSlug)?.subjects ?? [];
}

export function getCurriculumCompetenciesForLevel(
  levelSlug: string,
): ExpectedCompetency[] {
  const map = getCurriculumMapForLevel(levelSlug);
  if (!map) return [];
  return map.subjects.flatMap((subject) =>
    subject.domains.flatMap((domain) =>
      domain.subdomains.flatMap((subdomain) => subdomain.competencies),
    ),
  );
}

export function getCurriculumCompetenciesBySubdomain(
  levelSlug: string,
  domainSlug: string,
  subdomainSlug: string,
): ExpectedCompetency[] {
  const map = getCurriculumMapForLevel(levelSlug);
  if (!map) return [];
  for (const subject of map.subjects) {
    for (const domain of subject.domains) {
      if (domain.slug !== domainSlug) continue;
      const subdomain = domain.subdomains.find((s) => s.slug === subdomainSlug);
      if (subdomain) return subdomain.competencies;
    }
  }
  return [];
}

// ── Alias compatibilité ───────────────────────────────────────────────────────

export function getCurriculumMap(
  levelSlug: string,
): CurriculumMap | undefined {
  return getCurriculumMapForLevel(levelSlug);
}

export function getCurriculumLevelMap(
  levelSlug: string,
): CurriculumLevelMap | undefined {
  if (!isCurriculumLevelSlug(levelSlug)) return undefined;
  return curriculumLevelMaps[levelSlug];
}

export function getCurriculumEntriesByLevel(
  levelSlug: string,
): ExpectedCompetency[] {
  return getCurriculumCompetenciesForLevel(levelSlug);
}

export function getCurriculumEntryById(
  id: string,
): ExpectedCompetency | undefined {
  for (const slug of CURRICULUM_LEVEL_SLUGS) {
    const found = getCurriculumCompetenciesForLevel(slug).find(
      (entry) => entry.id === id,
    );
    if (found) return found;
  }
  return undefined;
}

// ── Liaison compétences attendues → compétences observables ──────────────────
// Retourne la LearningCompetency liée si le competencyId est valide.
// Retourne undefined si l'id est invalide ou absent — jamais d'erreur.

export function getLinkedLearningCompetency(
  levelSlug: string,
  competencyId?: string,
): LearningCompetency | undefined {
  if (!isCurriculumLevelSlug(levelSlug) || !competencyId) return undefined;

  return getCompetenciesForLevel(levelSlug).find(
    (competency) =>
      competency.id === competencyId && competency.levelSlug === levelSlug,
  );
}

export function getExpectedCompetencyLinkStatus(
  levelSlug: string,
  expectedCompetency: ExpectedCompetency,
): "linked" | "unlinked" {
  return getLinkedLearningCompetency(
    levelSlug,
    expectedCompetency.competencyId,
  )
    ? "linked"
    : "unlinked";
}

// ── Helper de validation interne ─────────────────────────────────────────────
// Repère les competencyId présents dans le curriculum mais non résolus.
// Usage développement uniquement — ne pas afficher côté utilisateur.

export function getUnresolvedCurriculumCompetencyIds(
  levelSlug: string,
): string[] {
  return getCurriculumCompetenciesForLevel(levelSlug)
    .filter(
      (c) =>
        c.competencyId !== undefined &&
        !getLinkedLearningCompetency(levelSlug, c.competencyId),
    )
    .map((c) => c.competencyId as string);
}

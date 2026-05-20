// Cartographie du programme CP — Cycle 2, primaire.
// Organise les compétences CP par matière → domaine → sous-domaine.
// Source des compétences : content/levels/cp-competencies.ts (source canonique).
// Règle : ce fichier structure ; il ne duplique pas les données pédagogiques.

import { cpCompetencies } from "@/content/levels/cp-competencies";
import type {
  CurriculumMap,
  ExpectedCompetency,
} from "@/content/learning-architecture-types";

function toExpected(id: string): ExpectedCompetency {
  const comp = cpCompetencies.find((c) => c.id === id);
  return {
    id,
    title: comp?.title ?? id,
    status: comp?.status ?? "upcoming",
    competencyId: id,
  };
}

export const cpCurriculumMap: CurriculumMap = {
  levelSlug: "cp",
  subjects: [
    // ── Français ───────────────────────────────────────────────────────────────
    {
      slug: "francais",
      label: "Français",
      domains: [
        {
          slug: "francais",
          label: "Langue française",
          subdomains: [
            {
              slug: "lecture-decodage",
              label: "Lecture — Décodage",
              competencies: [
                toExpected("cp-fr-dec-graphemes-phonemes"),
                toExpected("cp-fr-dec-fusionner-syllabes"),
                toExpected("cp-fr-dec-mots-reguliers"),
                toExpected("cp-fr-dec-phrases-fluidite"),
              ],
            },
            {
              slug: "lecture-comprehension",
              label: "Lecture — Compréhension",
              competencies: [
                toExpected("cp-fr-lc-comprendre-phrase-simple"),
                toExpected("cp-fr-lc-texte-entendu"),
                toExpected("cp-fr-lc-personnages-lieux-actions"),
                toExpected("cp-fr-lc-question-explicite"),
              ],
            },
            {
              slug: "ecriture",
              label: "Écriture et encodage",
              competencies: [
                toExpected("cp-fr-ecr-encoder-syllabes"),
                toExpected("cp-fr-ecr-encoder-mots"),
                toExpected("cp-fr-ecr-copier-phrase"),
                toExpected("cp-fr-ecr-ecrire-phrase"),
              ],
            },
            {
              slug: "etude-de-la-langue",
              label: "Étude de la langue",
              competencies: [
                toExpected("cp-fr-edl-reconnaitre-phrase"),
                toExpected("cp-fr-edl-reperer-nom"),
                toExpected("cp-fr-edl-reperer-verbe"),
                toExpected("cp-fr-edl-accords-simples"),
              ],
            },
            {
              slug: "oral",
              label: "Oral",
              competencies: [
                toExpected("cp-fr-oral-ecouter-consigne"),
                toExpected("cp-fr-oral-reformuler"),
                toExpected("cp-fr-oral-raconter"),
                toExpected("cp-fr-oral-participer-echange"),
              ],
            },
          ],
        },
      ],
    },

    // ── Mathématiques ──────────────────────────────────────────────────────────
    {
      slug: "mathematiques",
      label: "Mathématiques",
      domains: [
        {
          slug: "mathematiques",
          label: "Mathématiques",
          subdomains: [
            {
              slug: "nombres-numeration",
              label: "Nombres et numération",
              competencies: [
                toExpected("cp-ma-num-nombres-10"),
                toExpected("cp-ma-num-nombres-20"),
                toExpected("cp-ma-num-nombres-100"),
                toExpected("cp-ma-num-comparer-ranger"),
                toExpected("cp-ma-num-decomposer"),
              ],
            },
            {
              slug: "calcul",
              label: "Calcul",
              competencies: [
                toExpected("cp-ma-cal-faits-numeriques"),
                toExpected("cp-ma-cal-addition"),
                toExpected("cp-ma-cal-soustraction"),
                toExpected("cp-ma-cal-mental"),
                toExpected("cp-ma-cal-operation-posee"),
              ],
            },
            {
              slug: "problemes",
              label: "Résolution de problèmes",
              competencies: [
                toExpected("cp-ma-prob-comprendre-situation"),
                toExpected("cp-ma-prob-choisir-operation"),
                toExpected("cp-ma-prob-resoudre-additif"),
                toExpected("cp-ma-prob-expliquer-demarche"),
              ],
            },
            {
              slug: "grandeurs-mesures",
              label: "Grandeurs et mesures",
              competencies: [
                toExpected("cp-ma-gm-longueurs"),
                toExpected("cp-ma-gm-monnaie"),
                toExpected("cp-ma-gm-temps"),
                toExpected("cp-ma-gm-masses-contenances"),
              ],
            },
            {
              slug: "geometrie",
              label: "Géométrie",
              competencies: [
                toExpected("cp-ma-geo-formes-simples"),
                toExpected("cp-ma-geo-nommer-formes"),
                toExpected("cp-ma-geo-reperage-espace"),
                toExpected("cp-ma-geo-utiliser-regle"),
              ],
            },
          ],
        },
      ],
    },
  ],
};

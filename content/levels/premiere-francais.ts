import type {
  LyceeDomain,
  LyceeSubject,
} from "@/content/lycee-curriculum";

const premiereFrancaisDomains: LyceeDomain[] = [
  {
    id: "epreuves-anticipees",
    slug: "epreuves-anticipees",
    title: "Épreuves anticipées",
    status: "upcoming",
    subdomains: [
      {
        id: "lecture-lineaire",
        slug: "lecture-lineaire",
        title: "Lecture linéaire",
        status: "upcoming",
        sequences: [
          {
            id: "conduire-lecture-lineaire",
            slug: "conduire-lecture-lineaire",
            title: "Conduire une lecture linéaire",
            status: "upcoming",
          },
          {
            id: "identifier-procedes-stylistiques",
            slug: "identifier-procedes-stylistiques",
            title: "Identifier les procédés stylistiques d'un texte",
            status: "upcoming",
          },
        ],
      },
      {
        id: "dissertation-litteraire",
        slug: "dissertation-litteraire",
        title: "Dissertation littéraire",
        status: "upcoming",
        sequences: [
          {
            id: "construire-problematique-litteraire",
            slug: "construire-problematique-litteraire",
            title: "Construire une problématique littéraire",
            status: "upcoming",
          },
          {
            id: "rediger-introduction-dissertation",
            slug: "rediger-introduction-dissertation",
            title: "Rédiger une introduction de dissertation",
            status: "upcoming",
          },
          {
            id: "argumenter-avec-exemples-litteraires",
            slug: "argumenter-avec-exemples-litteraires",
            title: "Argumenter avec des exemples littéraires",
            status: "upcoming",
          },
        ],
      },
      {
        id: "oral-texte",
        slug: "oral-texte",
        title: "Oral sur texte",
        status: "upcoming",
        sequences: [
          {
            id: "presenter-lecture-lineaire-oral",
            slug: "presenter-lecture-lineaire-oral",
            title: "Présenter une lecture linéaire à l'oral",
            status: "upcoming",
          },
          {
            id: "repondre-question-grammaire",
            slug: "repondre-question-grammaire",
            title: "Répondre à une question de grammaire",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "oeuvres-parcours",
    slug: "oeuvres-parcours",
    title: "Œuvres et parcours",
    status: "upcoming",
    subdomains: [
      {
        id: "roman-recit-premiere",
        slug: "roman-recit-premiere",
        title: "Roman et récit du XVIIIe au XXIe siècle",
        status: "upcoming",
        sequences: [
          {
            id: "analyser-roman-parcours",
            slug: "analyser-roman-parcours",
            title: "Analyser un roman dans son parcours thématique",
            status: "upcoming",
          },
        ],
      },
      {
        id: "theatre-premiere",
        slug: "theatre-premiere",
        title: "Le théâtre du XVIIe au XXIe siècle",
        status: "upcoming",
        sequences: [
          {
            id: "etudier-scene-theatrale-premiere",
            slug: "etudier-scene-theatrale-premiere",
            title: "Étudier une scène dans son contexte dramaturgique",
            status: "upcoming",
          },
        ],
      },
      {
        id: "poesie-premiere",
        slug: "poesie-premiere",
        title: "La poésie du XIXe au XXIe siècle",
        status: "upcoming",
        sequences: [
          {
            id: "interpreter-poeme-forme-sens",
            slug: "interpreter-poeme-forme-sens",
            title: "Interpréter un poème : forme et sens",
            status: "upcoming",
          },
        ],
      },
    ],
  },
];

export const premiereFrancaisSubject: LyceeSubject = {
  id: "francais-premiere",
  slug: "francais",
  title: "Français",
  status: "upcoming",
  domains: premiereFrancaisDomains,
};

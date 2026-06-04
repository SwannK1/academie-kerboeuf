import type { LyceeSubject } from "@/content/lycee-curriculum";

export const terminalePhilosophieSubject: LyceeSubject = {
  id: "philosophie-terminale",
  slug: "philosophie",
  title: "Philosophie",
  status: "upcoming",
  domains: [
    {
      id: "methode-philosophique",
      slug: "methode-philosophique",
      title: "Méthode philosophique",
      status: "upcoming",
      subdomains: [
        {
          id: "dissertation",
          slug: "dissertation",
          title: "Dissertation",
          status: "upcoming",
          sequences: [
            {
              id: "formuler-probleme-philosophique",
              slug: "formuler-probleme-philosophique",
              title: "Formuler un problème philosophique",
              status: "upcoming",
            },
            {
              id: "construire-raisonnement-philosophique",
              slug: "construire-raisonnement-philosophique",
              title: "Construire un raisonnement philosophique",
              status: "upcoming",
            },
            {
              id: "rediger-introduction-philosophie",
              slug: "rediger-introduction-philosophie",
              title: "Rédiger une introduction philosophique",
              status: "upcoming",
            },
            {
              id: "articuler-theses-et-antitheses",
              slug: "articuler-theses-et-antitheses",
              title: "Articuler thèses et antithèses",
              status: "upcoming",
            },
          ],
        },
        {
          id: "explication-de-texte",
          slug: "explication-de-texte",
          title: "Explication de texte",
          status: "upcoming",
          sequences: [
            {
              id: "degager-these-auteur",
              slug: "degager-these-auteur",
              title: "Dégager la thèse d'un auteur",
              status: "upcoming",
            },
            {
              id: "analyser-argument-philosophique",
              slug: "analyser-argument-philosophique",
              title: "Analyser un argument philosophique",
              status: "upcoming",
            },
            {
              id: "situer-texte-histoire-philosophie",
              slug: "situer-texte-histoire-philosophie",
              title: "Situer un texte dans l'histoire de la philosophie",
              status: "upcoming",
            },
          ],
        },
      ],
    },
    {
      id: "notions-philosophiques",
      slug: "notions-philosophiques",
      title: "Notions philosophiques",
      status: "upcoming",
      subdomains: [
        {
          id: "conscience-inconscient",
          slug: "conscience-inconscient",
          title: "Conscience et inconscient",
          status: "upcoming",
          sequences: [
            {
              id: "distinguer-conscience-inconscient",
              slug: "distinguer-conscience-inconscient",
              title: "Distinguer conscience et inconscient",
              status: "upcoming",
            },
          ],
        },
        {
          id: "liberte-determinisme",
          slug: "liberte-determinisme",
          title: "Liberté et déterminisme",
          status: "upcoming",
          sequences: [
            {
              id: "problematiser-liberte-et-determinisme",
              slug: "problematiser-liberte-et-determinisme",
              title: "Problématiser liberté et déterminisme",
              status: "upcoming",
            },
          ],
        },
        {
          id: "justice-droit",
          slug: "justice-droit",
          title: "Justice et droit",
          status: "upcoming",
          sequences: [
            {
              id: "distinguer-justice-legale-et-morale",
              slug: "distinguer-justice-legale-et-morale",
              title: "Distinguer justice légale et justice morale",
              status: "upcoming",
            },
          ],
        },
        {
          id: "verite-raison",
          slug: "verite-raison",
          title: "Vérité et raison",
          status: "upcoming",
          sequences: [
            {
              id: "questionner-criteres-de-verite",
              slug: "questionner-criteres-de-verite",
              title: "Questionner les critères de vérité",
              status: "upcoming",
            },
          ],
        },
      ],
    },
  ],
};

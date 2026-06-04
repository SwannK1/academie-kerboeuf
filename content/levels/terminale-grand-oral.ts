import type { LyceeSubject } from "@/content/lycee-curriculum";

export const terminaleGrandOralSubject: LyceeSubject = {
  id: "grand-oral-terminale",
  slug: "grand-oral",
  title: "Grand Oral",
  status: "upcoming",
  domains: [
    {
      id: "preparation-question",
      slug: "preparation-question",
      title: "Préparation de la question",
      status: "upcoming",
      subdomains: [
        {
          id: "question-grand-oral",
          slug: "question-grand-oral",
          title: "Question de Grand Oral",
          status: "upcoming",
          sequences: [
            {
              id: "formuler-question-grand-oral",
              slug: "formuler-question-grand-oral",
              title: "Formuler une question de Grand Oral",
              status: "upcoming",
            },
            {
              id: "articuler-deux-specialites",
              slug: "articuler-deux-specialites",
              title: "Articuler deux spécialités dans une question",
              status: "upcoming",
            },
            {
              id: "construire-plan-expose-grand-oral",
              slug: "construire-plan-expose-grand-oral",
              title: "Construire un plan d'exposé pour le Grand Oral",
              status: "upcoming",
            },
          ],
        },
      ],
    },
    {
      id: "realisation-expose",
      slug: "realisation-expose",
      title: "Réalisation de l'exposé",
      status: "upcoming",
      subdomains: [
        {
          id: "prise-de-parole",
          slug: "prise-de-parole",
          title: "Prise de parole",
          status: "upcoming",
          sequences: [
            {
              id: "soutenir-expose-argumente",
              slug: "soutenir-expose-argumente",
              title: "Soutenir un exposé argumenté",
              status: "upcoming",
            },
            {
              id: "maitriser-gestes-et-posture",
              slug: "maitriser-gestes-et-posture",
              title: "Maîtriser la gestuelle et la posture orale",
              status: "upcoming",
            },
            {
              id: "adapter-discours-interlocuteur",
              slug: "adapter-discours-interlocuteur",
              title: "Adapter son discours à l'interlocuteur",
              status: "upcoming",
            },
          ],
        },
        {
          id: "echange-jury",
          slug: "echange-jury",
          title: "Échange avec le jury",
          status: "upcoming",
          sequences: [
            {
              id: "repondre-question-jury-grand-oral",
              slug: "repondre-question-jury-grand-oral",
              title: "Répondre à une question du jury",
              status: "upcoming",
            },
            {
              id: "orienter-echange-projet-avenir",
              slug: "orienter-echange-projet-avenir",
              title: "Orienter l'échange vers son projet d'avenir",
              status: "upcoming",
            },
          ],
        },
      ],
    },
  ],
};

type LessonSection = { heading: string; body: string };
type LessonExample = { label: string; text: string; inference: string };

export type LessonContent = {
  intro: string;
  retiens: LessonSection[];
  examplesTitle: string;
  exemples: LessonExample[];
  entrainement: string[];
};

export const LESSON_CONTENT: Record<string, LessonContent> = {
  "reperer-les-indices": {
    intro:
      "Pour comprendre un texte, il ne suffit pas de lire les mots. Il faut aussi lire entre les lignes : repérer les petits indices cachés qui donnent des informations que l'auteur n'a pas écrites directement.",
    retiens: [
      {
        heading: "Qu'est-ce qu'un indice ?",
        body: "Un indice, c'est un mot, une expression ou une description qui nous aide à comprendre quelque chose qui n'est pas écrit clairement dans le texte.",
      },
      {
        heading: "Où trouver les indices ?",
        body: "Les indices peuvent être des mots de description (adjectifs, adverbes), des actions des personnages, des détails sur le lieu ou le moment, ou encore le ton de la narration.",
      },
      {
        heading: "Comment utiliser les indices ?",
        body: "On repère l'indice, on réfléchit à ce qu'il suggère, puis on relie plusieurs indices ensemble pour déduire une information. C'est comme une enquête !",
      },
    ],
    examplesTitle: "Comment repérer les indices ?",
    exemples: [
      {
        label: "Exemple 1",
        text: "\"Il frissonna, remonta son col et pressa le pas.\"",
        inference:
          "→ Les indices « frissonna » et « remonta son col » nous permettent de déduire qu'il fait froid dehors, même si le mot « froid » n'est pas écrit.",
      },
      {
        label: "Exemple 2",
        text: "\"Les yeux brillants, elle courut vers le sapin décoré.\"",
        inference:
          "→ Les indices « yeux brillants » et « sapin décoré » suggèrent que c'est Noël et que le personnage est heureux ou excité.",
      },
    ],
    entrainement: [
      "Lis chaque phrase et souligne les mots qui sont des indices.",
      "Pour chaque indice repéré, note ce qu'il te permet de comprendre.",
      "Essaie de formuler ton inférence en une phrase complète.",
    ],
  },

  "explicite-implicite": {
    intro:
      "Dans un texte, toutes les informations ne sont pas données de la même façon. Certaines sont écrites clairement : c'est ce qu'on appelle l'explicite. D'autres ne sont pas écrites directement : il faut les déduire grâce aux indices du texte. C'est l'implicite.",
    retiens: [
      {
        heading: "L'information explicite",
        body: "Elle est écrite dans le texte. Pour la trouver, il suffit de lire : la réponse est directement visible.",
      },
      {
        heading: "L'information implicite",
        body: "Elle n'est pas écrite directement. Il faut repérer des indices dans le texte et raisonner pour comprendre ce que l'auteur sous-entend.",
      },
      {
        heading: "Comment justifier ?",
        body: "Je cite un indice précis du texte, puis j'explique le raisonnement qui m'a conduit à ma conclusion. Je ne donne pas mon avis : je m'appuie sur le texte.",
      },
    ],
    examplesTitle: "Distinguer ce qui est écrit et ce qu'il faut déduire",
    exemples: [
      {
        label: "Exemple 1 — information explicite",
        text: "\"Le renard attrapa le lapin et s'enfuit dans le bois.\"",
        inference:
          "→ Information explicite : le renard a attrapé le lapin. C'est écrit directement dans le texte — aucune déduction nécessaire.",
      },
      {
        label: "Exemple 2 — information implicite",
        text: "\"Elle referma son livre d'un coup sec, croisa les bras et détourna les yeux.\"",
        inference:
          "→ Information implicite : le personnage est en colère ou contrariée. Ce n'est pas écrit, mais les indices « referma d'un coup sec », « croisa les bras » et « détourna les yeux » permettent de le déduire.",
      },
      {
        label: "Exemple 3 — distinguer les deux",
        text: "\"Tom avait obtenu la meilleure note de la classe. Pourtant, il ne sourit pas.\"",
        inference:
          "→ Explicite : Tom a eu la meilleure note (c'est écrit). Implicite : malgré ce succès, quelque chose le préoccupe — l'indice est « pourtant, il ne sourit pas », qui crée un contraste avec le résultat.",
      },
    ],
    entrainement: [
      "Je lis la question et je repère ce qu'elle me demande de trouver.",
      "Je cherche dans le texte si la réponse est écrite directement.",
      "Si elle n'est pas écrite, je repère les indices : actions, descriptions, contrastes.",
      "Je construis une réponse logique à partir de ces indices.",
      "Je justifie ma réponse en citant un indice précis du texte.",
    ],
  },
};

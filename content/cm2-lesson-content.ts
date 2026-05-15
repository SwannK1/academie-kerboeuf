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
};

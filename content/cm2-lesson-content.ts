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

  "justifier-son-interpretation": {
    intro:
      "Une bonne réponse de compréhension ne se résume pas à « je pense que… ». Elle doit s'appuyer sur un indice précis du texte. Justifier, c'est montrer que ta réponse vient bien du texte — pas de ton imagination.",
    retiens: [
      {
        heading: "Une réponse ne suffit pas",
        body: "Donner une réponse juste, c'est bien. Expliquer pourquoi elle est juste en citant le texte, c'est mieux. Sans justification, le correcteur ne sait pas si tu as compris ou si tu as deviné.",
      },
      {
        heading: "La preuve vient du texte",
        body: "L'indice qui justifie ta réponse peut être un mot, une expression, une action d'un personnage ou un détail de description. Il doit être présent dans le texte — pas inventé.",
      },
      {
        heading: "Relie ta réponse à l'indice",
        body: "Une bonne justification a deux parties : la réponse (ce que tu comprends) et l'explication (pourquoi le texte te le montre). Structure : « Je pense que … parce que dans le texte il est écrit … ».",
      },
    ],
    examplesTitle: "Justifier une réponse avec le texte",
    exemples: [
      {
        label: "Texte",
        text: "Lucas entra dans la salle sans dire bonjour. Il posa son sac avec force, s'assit en croisant les bras et fixa le tableau sans le regarder vraiment.",
        inference:
          "Question : Comment se sent Lucas en entrant dans la classe ?\n\n✗ Réponse trop vague : « Lucas est de mauvaise humeur. » — Sans justification, c'est insuffisant.\n\n✓ Réponse justifiée : « Lucas semble énervé ou contrarié. Dans le texte, il « posa son sac avec force » et « croisa les bras », deux indices qui montrent qu'il retient une émotion négative. »",
      },
      {
        label: "Méthode en 3 temps",
        text: "1. Je lis la question. 2. Je cherche ma réponse dans le texte. 3. Je repère l'indice précis qui la confirme.",
        inference:
          "→ J'écris : « Je pense que [ma réponse] parce que dans le texte il est écrit [indice exact]. » Cette structure montre clairement le lien entre ma réponse et la preuve.",
      },
      {
        label: "Erreur fréquente",
        text: "« Je pense que le personnage est triste parce qu'il est triste. »",
        inference:
          "→ Circulaire : la justification répète la réponse. Il faut citer un indice du texte (une action, un mot, une description), pas reformuler la même idée.",
      },
    ],
    entrainement: [
      "Lis le texte proposé et repère la question de compréhension. Cherche d'abord ta réponse sans écrire, puis identifie dans le texte l'indice qui la confirme.",
      "Parmi trois propositions de justification, choisis celle qui s'appuie le mieux sur le texte. Explique pourquoi les deux autres sont insuffisantes.",
      "Une justification est donnée à moitié : « Le personnage est surpris parce que… ». Complète-la avec un indice précis du texte fourni.",
      "Corrige cette justification trop vague : « On sait qu'il a peur car c'est évident dans le texte. » Réécris-la en citant un indice précis.",
      "Réponds à la question de compréhension en une ou deux phrases complètes. Ta réponse doit contenir : la réponse + « parce que dans le texte il est écrit » + l'indice exact entre guillemets.",
    ],
  },
};

import type { ProgramStatus } from "@/content/program-types";

export type SixiemeResource = {
  slug: string;
  label: string;
  description: string;
  status: ProgramStatus;
};

export const sixiemeResources: SixiemeResource[] = [
  {
    slug: "lire-une-consigne-complexe",
    label: "Lire une consigne complexe",
    description:
      "Identifier les verbes de consigne, repérer les étapes attendues et reformuler avant d'agir.",
    status: "in-progress",
  },
  {
    slug: "organiser-son-cahier-et-son-classeur",
    label: "Organiser son cahier et son classeur",
    description:
      "Structurer ses supports de travail pour retrouver rapidement une leçon ou un exercice.",
    status: "in-progress",
  },
  {
    slug: "repondre-avec-une-phrase-complete",
    label: "Répondre avec une phrase complète",
    description:
      "Construire des réponses rédigées en reprenant les termes de la question.",
    status: "in-progress",
  },
  {
    slug: "apprendre-une-lecon-efficacement",
    label: "Apprendre une leçon efficacement",
    description:
      "Utiliser la répétition espacée, les schémas et l'auto-interrogation pour mémoriser durablement.",
    status: "in-progress",
  },
  {
    slug: "resoudre-un-probleme-en-plusieurs-etapes",
    label: "Résoudre un problème en plusieurs étapes",
    description:
      "Décomposer un problème complexe en sous-questions et vérifier chaque étape avant de conclure.",
    status: "in-progress",
  },
];

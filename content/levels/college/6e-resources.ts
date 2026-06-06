import type { ProgramStatus } from "@/content/program-types";

export type SixiemeResource = {
  slug: string;
  title: string;
  description: string;
  status: ProgramStatus;
};

export const sixiemeResources: SixiemeResource[] = [
  {
    slug: "lire-consigne-complexe",
    title: "Lire une consigne complexe",
    description:
      "Repérer les verbes d'action, les contraintes et les étapes attendues avant de commencer le travail.",
    status: "in-progress",
  },
  {
    slug: "organiser-cahier-classeur",
    title: "Organiser son cahier et son classeur",
    description:
      "Installer des habitudes simples pour classer les feuilles, retrouver une leçon et préparer son matériel.",
    status: "in-progress",
  },
  {
    slug: "repondre-phrase-complete",
    title: "Répondre avec une phrase complète",
    description:
      "Transformer une question en réponse rédigée, claire et compréhensible dans toutes les matières.",
    status: "in-progress",
  },
  {
    slug: "apprendre-lecon-efficacement",
    title: "Apprendre une leçon efficacement",
    description:
      "Mémoriser une leçon avec méthode : comprendre, se tester, reformuler et réviser au bon moment.",
    status: "in-progress",
  },
  {
    slug: "resoudre-probleme-plusieurs-etapes",
    title: "Résoudre un problème en plusieurs étapes",
    description:
      "Identifier les informations utiles, organiser les calculs et vérifier la cohérence de la réponse finale.",
    status: "in-progress",
  },
];

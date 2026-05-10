export type MissionProgressStatus =
  | "prête à lancer"
  | "à enrichir"
  | "en préparation";

export type MissionProgressKey =
  | "ready"
  | "draft"
  | "prototype";

export type MissionProgressLabel = "prête" | "à préparer" | "prototype";

export type MissionProgress = {
  key: MissionProgressKey;
  label: MissionProgressLabel;
  detail: string;
};

export type ProgressiveQuestion = {
  level: "indice" | "raisonnement" | "justification" | "interprétation" | "synthèse";
  prompt: string;
};

export type CorrectionItem = {
  prompt: string;
  answer: string;
};

export type MissionPedagogy = {
  immersiveIntroduction?: string;
  narrativeContext?: string;
  studentObjective?: string;
  schoolSkill?: string;
  duration?: string;
  level?: string;
  materials?: string[];
  usefulVocabulary?: string[];
  mainChallenge?: {
    label: string;
    content: string;
  };
  progressiveQuestions?: ProgressiveQuestion[];
  methodTip?: string;
  correction?: CorrectionItem[];
  reinvestmentActivity?: string;
  shortWrittenTrace?: string;
  projectionVersion?: {
    title: string;
    content: string[];
  };
  printableVersion?: {
    title: string;
    content: string[];
  };
  usage?: {
    projection?: string;
    printing?: string;
  };
  progressStatus?: {
    state: MissionProgressStatus;
    detail: string;
  };
};

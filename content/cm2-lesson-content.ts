// Réservé : aucun contenu pédagogique détaillé — les leçons CM2 seront livrées en PDF.

export type LessonContent = {
  intro: string;
  retiens: { heading: string; body: string }[];
  examplesTitle: string;
  exemples: { label: string; text: string; inference: string }[];
  entrainement: string[];
};

export const LESSON_CONTENT: Record<string, LessonContent> = {};

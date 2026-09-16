import type {
  LyceeCurriculumLevel,
  LyceeSubject,
} from "@/content/lycee-curriculum";

const terminaleTroncCommun: LyceeSubject[] = [];
const terminaleSpecialites: LyceeSubject[] = [];

export const terminaleCurriculumLevel: LyceeCurriculumLevel = {
  id: "lycee-terminale",
  slug: "terminale",
  title: "Terminale",
  status: "upcoming",
  parcours: [
    {
      id: "terminale-tronc-commun",
      slug: "tronc-commun",
      title: "Tronc commun",
      status: "upcoming",
      subjects: terminaleTroncCommun,
    },
    {
      id: "terminale-specialites",
      slug: "specialites",
      title: "Enseignements de spécialité",
      status: "upcoming",
      subjects: terminaleSpecialites,
    },
    {
      id: "terminale-options",
      slug: "options",
      title: "Options",
      status: "upcoming",
      subjects: [],
    },
  ],
};

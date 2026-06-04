import type {
  LyceeCurriculumLevel,
  LyceeSubject,
} from "@/content/lycee-curriculum";

const premiereTroncCommun: LyceeSubject[] = [];
const premiereSpecialites: LyceeSubject[] = [];

export const premiereCurriculumLevel: LyceeCurriculumLevel = {
  id: "lycee-premiere",
  slug: "premiere",
  title: "Première",
  status: "upcoming",
  parcours: [
    {
      id: "premiere-tronc-commun",
      slug: "tronc-commun",
      title: "Tronc commun",
      status: "upcoming",
      subjects: premiereTroncCommun,
    },
    {
      id: "premiere-specialites",
      slug: "specialites",
      title: "Enseignements de spécialité",
      status: "upcoming",
      subjects: premiereSpecialites,
    },
    {
      id: "premiere-options",
      slug: "options",
      title: "Options",
      status: "upcoming",
      subjects: [],
    },
  ],
};

import type { IconName } from "@/components/icons/Icon";

export type TeacherTool = {
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

export type TeacherHubSlug =
  | "mon-annee"
  | "ma-semaine"
  | "ma-classe"
  | "tous-les-outils";

export type TeacherHub = {
  slug: TeacherHubSlug;
  title: string;
  shortDescription: string;
  description: string;
  icon: IconName;
  tools: TeacherTool[];
};

export const teacherHubs: TeacherHub[] = [
  {
    slug: "mon-annee",
    title: "Mon année",
    shortDescription: "Programmer, suivre les périodes et planifier les évaluations.",
    description:
      "Construisez la vue d’ensemble de l’année, puis suivez son avancement période après période.",
    icon: "calendar",
    tools: [
      { title: "Programmation", description: "Répartir les compétences sur les périodes.", href: "/enseignants/programmation", icon: "calendar" },
      { title: "Progression", description: "Suivre l’avancement des séquences.", href: "/enseignants/progression", icon: "folder" },
      { title: "Calendrier", description: "Visualiser les échéances de l’année scolaire.", href: "/enseignants/calendrier", icon: "calendar" },
      { title: "Fin de période", description: "Boucler les tâches avant les vacances.", href: "/enseignants/fin-periode", icon: "check-circle" },
      { title: "Évaluations", description: "Planifier les évaluations de la classe.", href: "/enseignants/evaluations", icon: "clipboard" },
    ],
  },
  {
    slug: "ma-semaine",
    title: "Ma semaine",
    shortDescription: "Organiser les activités, les séances et le cahier journal.",
    description:
      "Organisez les priorités de la semaine, préparez une séance si nécessaire, puis complétez le cahier journal.",
    icon: "notebook",
    tools: [
      { title: "Organisation de la semaine", description: "Organiser les priorités et les activités.", href: "/enseignants/organisation", icon: "compass" },
      { title: "Préparer une séance", description: "Construire une séance complète et réutilisable.", href: "/enseignants/preparer-une-seance", icon: "presentation" },
      { title: "Cahier journal", description: "Préparer la semaine avec les séances prévues.", href: "/enseignants/cahier-journal", icon: "notebook" },
    ],
  },
  {
    slug: "ma-classe",
    title: "Ma classe",
    shortDescription: "Structurer le temps, l’espace et les groupes d’élèves.",
    description:
      "Retrouvez les outils qui décrivent l’organisation habituelle de la classe.",
    icon: "building",
    tools: [
      { title: "Emploi du temps", description: "Construire une semaine type.", href: "/enseignants/emploi-du-temps", icon: "clock" },
      { title: "Plan de classe et groupes", description: "Disposer les tables et constituer des groupes.", href: "/enseignants/organisation-classe", icon: "users" },
      { title: "Ateliers", description: "Planifier les ateliers en autonomie ou en groupes.", href: "/enseignants/ateliers", icon: "puzzle" },
    ],
  },
  {
    slug: "tous-les-outils",
    title: "Tous les outils",
    shortDescription: "Retrouver les outils ponctuels et les documents pratiques.",
    description:
      "Tous les outils complémentaires restent disponibles ici, sans concurrencer la préparation quotidienne.",
    icon: "grid",
    tools: [
      { title: "APC", description: "Préparer les cycles et séances d’APC.", href: "/enseignants/apc", icon: "target" },
      { title: "Rituels", description: "Conserver une bibliothèque de rituels.", href: "/enseignants/rituels", icon: "repeat" },
      { title: "Photocopies", description: "Suivre les documents à reproduire.", href: "/enseignants/photocopies", icon: "printer" },
      { title: "Affichages", description: "Préparer et mettre à jour les affichages.", href: "/enseignants/affichages", icon: "image" },
      { title: "Bibliothèque de classe", description: "Organiser les livres du coin lecture.", href: "/enseignants/bibliotheque-classe", icon: "books" },
      { title: "Matériel de classe", description: "Inventorier le matériel et les commandes.", href: "/enseignants/materiel-classe", icon: "box" },
      { title: "Projets et sorties", description: "Préparer les projets et sorties scolaires.", href: "/enseignants/projets-sorties", icon: "map-pin" },
      { title: "Conseils de cycle", description: "Préparer et consigner les conseils de cycle.", href: "/enseignants/conseils-cycle", icon: "clipboard" },
      { title: "Conseil d’école", description: "Préparer les décisions et leur suivi.", href: "/enseignants/conseil-ecole", icon: "building" },
      { title: "Liaison CM2-6e", description: "Organiser les échanges entre école et collège.", href: "/enseignants/liaison-cm2-6e", icon: "graduation-cap" },
      { title: "Réunion parents", description: "Préparer la date, l’ordre du jour et les documents.", href: "/enseignants/reunion-parents", icon: "users" },
      { title: "Communications", description: "Préparer les messages destinés aux familles.", href: "/enseignants/communications", icon: "envelope" },
      { title: "Rendez-vous professionnels", description: "Organiser les échanges et leurs suivis.", href: "/enseignants/rendez-vous", icon: "message-circle" },
      { title: "Modèles", description: "Retrouver les documents réutilisables.", href: "/enseignants/modeles", icon: "folder" },
      { title: "Dossier remplaçant", description: "Préparer les informations pour un remplacement.", href: "/enseignants/dossier-remplacant", icon: "folder-open" },
      { title: "Sauvegardes locales", description: "Exporter ou restaurer les données de cet appareil.", href: "/enseignants/sauvegardes", icon: "save" },
      { title: "Formations", description: "Suivre les lectures et objectifs professionnels.", href: "/enseignants/formations", icon: "graduation-cap" },
    ],
  },
];

export function getTeacherHub(slug: string) {
  return teacherHubs.find((hub) => hub.slug === slug);
}

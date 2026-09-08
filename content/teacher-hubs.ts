export type TeacherTool = {
  title: string;
  description: string;
  href: string;
  icon: string;
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
  icon: string;
  tools: TeacherTool[];
};

export const teacherHubs: TeacherHub[] = [
  {
    slug: "mon-annee",
    title: "Mon année",
    shortDescription: "Programmer, suivre les périodes et planifier les évaluations.",
    description:
      "Construisez la vue d’ensemble de l’année, puis suivez son avancement période après période.",
    icon: "📅",
    tools: [
      { title: "Programmation", description: "Répartir les compétences sur les périodes.", href: "/enseignants/programmation", icon: "📅" },
      { title: "Progression", description: "Suivre l’avancement des séquences.", href: "/enseignants/progression", icon: "🗂️" },
      { title: "Calendrier", description: "Visualiser les échéances de l’année scolaire.", href: "/enseignants/calendrier", icon: "🗓️" },
      { title: "Fin de période", description: "Boucler les tâches avant les vacances.", href: "/enseignants/fin-periode", icon: "✅" },
      { title: "Évaluations", description: "Planifier les évaluations de la classe.", href: "/enseignants/evaluations", icon: "📝" },
    ],
  },
  {
    slug: "ma-semaine",
    title: "Ma semaine",
    shortDescription: "Organiser les activités, les séances et le cahier journal.",
    description:
      "Organisez les priorités de la semaine, préparez une séance si nécessaire, puis complétez le cahier journal.",
    icon: "📔",
    tools: [
      { title: "Organisation de la semaine", description: "Organiser les priorités et les activités.", href: "/enseignants/organisation", icon: "🧭" },
      { title: "Préparer une séance", description: "Construire une séance complète et réutilisable.", href: "/enseignants/preparer-une-seance", icon: "🧑‍🏫" },
      { title: "Cahier journal", description: "Préparer la semaine avec les séances prévues.", href: "/enseignants/cahier-journal", icon: "📔" },
    ],
  },
  {
    slug: "ma-classe",
    title: "Ma classe",
    shortDescription: "Structurer le temps, l’espace et les groupes d’élèves.",
    description:
      "Retrouvez les outils qui décrivent l’organisation habituelle de la classe.",
    icon: "🏫",
    tools: [
      { title: "Emploi du temps", description: "Construire une semaine type.", href: "/enseignants/emploi-du-temps", icon: "🕐" },
      { title: "Plan de classe et groupes", description: "Disposer les tables et constituer des groupes.", href: "/enseignants/organisation-classe", icon: "🧑‍🤝‍🧑" },
      { title: "Ateliers", description: "Planifier les ateliers en autonomie ou en groupes.", href: "/enseignants/ateliers", icon: "🧩" },
    ],
  },
  {
    slug: "tous-les-outils",
    title: "Tous les outils",
    shortDescription: "Retrouver les outils ponctuels et les documents pratiques.",
    description:
      "Tous les outils complémentaires restent disponibles ici, sans concurrencer la préparation quotidienne.",
    icon: "🧰",
    tools: [
      { title: "APC", description: "Préparer les cycles et séances d’APC.", href: "/enseignants/apc", icon: "🎯" },
      { title: "Rituels", description: "Conserver une bibliothèque de rituels.", href: "/enseignants/rituels", icon: "🔁" },
      { title: "Photocopies", description: "Suivre les documents à reproduire.", href: "/enseignants/photocopies", icon: "🖨️" },
      { title: "Affichages", description: "Préparer et mettre à jour les affichages.", href: "/enseignants/affichages", icon: "🖼️" },
      { title: "Bibliothèque de classe", description: "Organiser les livres du coin lecture.", href: "/enseignants/bibliotheque-classe", icon: "📚" },
      { title: "Matériel de classe", description: "Inventorier le matériel et les commandes.", href: "/enseignants/materiel-classe", icon: "📦" },
      { title: "Projets et sorties", description: "Préparer les projets et sorties scolaires.", href: "/enseignants/projets-sorties", icon: "🚌" },
      { title: "Conseils de cycle", description: "Préparer et consigner les conseils de cycle.", href: "/enseignants/conseils-cycle", icon: "🗒️" },
      { title: "Conseil d’école", description: "Préparer les décisions et leur suivi.", href: "/enseignants/conseil-ecole", icon: "🏫" },
      { title: "Liaison CM2-6e", description: "Organiser les échanges entre école et collège.", href: "/enseignants/liaison-cm2-6e", icon: "🎓" },
      { title: "Communications", description: "Préparer les messages destinés aux familles.", href: "/enseignants/communications", icon: "✉️" },
      { title: "Rendez-vous professionnels", description: "Organiser les échanges et leurs suivis.", href: "/enseignants/rendez-vous", icon: "🤝" },
      { title: "Modèles", description: "Retrouver les documents réutilisables.", href: "/enseignants/modeles", icon: "🗂️" },
      { title: "Dossier remplaçant", description: "Préparer les informations pour un remplacement.", href: "/enseignants/dossier-remplacant", icon: "📁" },
      { title: "Sauvegardes locales", description: "Exporter ou restaurer les données de cet appareil.", href: "/enseignants/sauvegardes", icon: "💾" },
      { title: "Formations", description: "Suivre les lectures et objectifs professionnels.", href: "/enseignants/formations", icon: "🎓" },
    ],
  },
];

export function getTeacherHub(slug: string) {
  return teacherHubs.find((hub) => hub.slug === slug);
}

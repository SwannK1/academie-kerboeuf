export type TeacherDashboardCard = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

export type TeacherDashboardSection = {
  title: string;
  cards: TeacherDashboardCard[];
};

export const teacherDashboardSections: TeacherDashboardSection[] = [
  {
    title: "Organiser l'année",
    cards: [
      {
        title: "Programmation",
        description: "Répartissez les compétences sur les périodes de l'année.",
        href: "/enseignants/programmation",
        icon: "📅",
      },
      {
        title: "Emploi du temps",
        description: "Construisez une semaine type et suivez le total d'heures.",
        href: "/enseignants/emploi-du-temps",
        icon: "🕐",
      },
      {
        title: "Cahier journal",
        description: "Préparez votre vraie semaine avec des cartes de séances déplaçables.",
        href: "/enseignants/cahier-journal",
        icon: "📔",
      },
      {
        title: "Calendrier",
        description: "Visualisez les échéances et les périodes de l'année scolaire.",
        href: "/enseignants/calendrier",
        icon: "🗓️",
      },
      {
        title: "Fin de période",
        description: "Suivez la liste des tâches à boucler avant les vacances.",
        href: "/enseignants/fin-periode",
        icon: "✅",
      },
      {
        title: "Évaluations",
        description: "Planifiez et organisez les évaluations de la classe.",
        href: "/enseignants/evaluations",
        icon: "📝",
      },
    ],
  },
  {
    title: "Préparer la classe",
    cards: [
      {
        title: "Organisation de classe",
        description: "Organisez vos priorités de semaine par groupe, à la souris ou au clavier.",
        href: "/enseignants/organisation",
        icon: "🧭",
      },
      {
        title: "Plan de classe et groupes",
        description: "Disposez les tables et générez des groupes avec rôles, sans données élève.",
        href: "/enseignants/organisation-classe",
        icon: "🧑‍🤝‍🧑",
      },
      {
        title: "Ateliers",
        description: "Planifiez et organisez vos ateliers en autonomie ou en groupes.",
        href: "/enseignants/ateliers",
        icon: "🧩",
      },
      {
        title: "Rituels",
        description: "Gardez sous la main votre bibliothèque de rituels de classe.",
        href: "/enseignants/rituels",
        icon: "🔁",
      },
      {
        title: "Photocopies",
        description: "Suivez la file des documents à reproduire pour la classe.",
        href: "/enseignants/photocopies",
        icon: "🖨️",
      },
      {
        title: "Affichages",
        description: "Cochez les affichages de classe à préparer ou à mettre à jour.",
        href: "/enseignants/affichages",
        icon: "🖼️",
      },
      {
        title: "Bibliothèque de classe",
        description: "Organisez les livres et ressources de votre coin lecture.",
        href: "/enseignants/bibliotheque-classe",
        icon: "📚",
      },
    ],
  },
  {
    title: "Projets et réunions",
    cards: [
      {
        title: "Projets et sorties",
        description: "Suivez la préparation de vos projets et sorties scolaires.",
        href: "/enseignants/projets-sorties",
        icon: "🚌",
      },
      {
        title: "Conseils de cycle",
        description: "Préparez et gardez une trace de vos conseils de cycle.",
        href: "/enseignants/conseils-cycle",
        icon: "🗒️",
      },
      {
        title: "Liaison CM2-6e",
        description: "Organisez les échanges et le suivi de la liaison CM2-6e.",
        href: "/enseignants/liaison-cm2-6e",
        icon: "🎓",
      },
      {
        title: "Communications",
        description: "Centralisez les messages destinés aux familles.",
        href: "/enseignants/communications",
        icon: "✉️",
      },
    ],
  },
  {
    title: "Ressources personnelles",
    cards: [
      {
        title: "Modèles",
        description: "Retrouvez vos modèles de documents prêts à réutiliser.",
        href: "/enseignants/modeles",
        icon: "🗂️",
      },
      {
        title: "Dossier remplaçant",
        description: "Préparez le dossier à laisser à un remplaçant.",
        href: "/enseignants/dossier-remplacant",
        icon: "📁",
      },
    ],
  },
];

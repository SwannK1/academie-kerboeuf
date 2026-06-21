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

export const teacherDashboardPriorityCards: TeacherDashboardCard[] = [
  {
    title: "Emploi du temps",
    description: "Construire la semaine type de la classe.",
    href: "/enseignants/emploi-du-temps",
    icon: "🕐",
  },
  {
    title: "Programmation annuelle",
    description: "Répartir les compétences sur les périodes.",
    href: "/enseignants/programmation/annuelle",
    icon: "📅",
  },
  {
    title: "Progression de période",
    description: "Ordonner les séquences d'une période.",
    href: "/enseignants/progression",
    icon: "🗒️",
  },
  {
    title: "Organisation de classe",
    description: "Gérer le matériel et les quantités disponibles.",
    href: "/enseignants/organisation",
    icon: "🧰",
  },
];

export const teacherDashboardSections: TeacherDashboardSection[] = [
  {
    title: "Préparer",
    cards: [
      {
        title: "Organisation de classe",
        description: "Organisez vos priorités de semaine par groupe, à la souris ou au clavier.",
        href: "/enseignants/organisation",
        icon: "🧭",
      },
      {
        title: "Ateliers",
        description: "Planifier les ateliers en autonomie ou en groupes.",
        href: "/enseignants/ateliers",
        icon: "🧩",
      },
      {
        title: "Rituels",
        description: "Retrouver la bibliothèque de rituels de classe.",
        href: "/enseignants/rituels",
        icon: "🔁",
      },
      {
        title: "Évaluations",
        description: "Planifier les évaluations de la classe.",
        href: "/enseignants/evaluations",
        icon: "📝",
      },
      {
        title: "APC",
        description: "Préparer les activités pédagogiques complémentaires.",
        href: "/enseignants/apc",
        icon: "🎯",
      },
      {
        title: "Photocopies",
        description: "Suivre la file des documents à reproduire.",
        href: "/enseignants/photocopies",
        icon: "🖨️",
      },
      {
        title: "Affichages",
        description: "Cocher les affichages à préparer ou mettre à jour.",
        href: "/enseignants/affichages",
        icon: "🖼️",
      },
      {
        title: "Bibliothèque de classe",
        description: "Organiser les livres du coin lecture.",
        href: "/enseignants/bibliotheque-classe",
        icon: "📚",
      },
    ],
  },
  {
    title: "Organiser",
    cards: [
      {
        title: "Calendrier",
        description: "Visualiser les périodes et échéances de l'année.",
        href: "/enseignants/calendrier",
        icon: "🗓️",
      },
      {
        title: "Fin de période",
        description: "Cocher les tâches à boucler avant les vacances.",
        href: "/enseignants/fin-periode",
        icon: "✅",
      },
      {
        title: "Programmation",
        description: "Accéder aux deux outils de programmation annuelle.",
        href: "/enseignants/programmation",
        icon: "📂",
      },
    ],
  },
  {
    title: "Réunions et projets",
    cards: [
      {
        title: "Conseils de cycle",
        description: "Préparer et garder une trace des conseils de cycle.",
        href: "/enseignants/conseils-cycle",
        icon: "🗒️",
      },
      {
        title: "Conseil d'école",
        description: "Préparer l'ordre du jour d'un conseil d'école.",
        href: "/enseignants/conseil-ecole",
        icon: "🏫",
      },
      {
        title: "Liaison CM2-6e",
        description: "Organiser les échanges de la liaison CM2-6e.",
        href: "/enseignants/liaison-cm2-6e",
        icon: "🎓",
      },
      {
        title: "Rendez-vous professionnels",
        description: "Préparer un rendez-vous professionnel.",
        href: "/enseignants/rendez-vous",
        icon: "🤝",
      },
      {
        title: "Communications",
        description: "Centraliser les messages destinés aux familles.",
        href: "/enseignants/communications",
        icon: "✉️",
      },
      {
        title: "Projets et sorties",
        description: "Suivre la préparation des projets et sorties.",
        href: "/enseignants/projets-sorties",
        icon: "🚌",
      },
    ],
  },
  {
    title: "Ressources",
    cards: [
      {
        title: "Modèles",
        description: "Retrouver les modèles de documents réutilisables.",
        href: "/enseignants/modeles",
        icon: "🗂️",
      },
      {
        title: "Dossier remplaçant",
        description: "Préparer le dossier à laisser à un remplaçant.",
        href: "/enseignants/dossier-remplacant",
        icon: "📁",
      },
      {
        title: "Formations",
        description: "Suivre ses formations et son développement professionnel.",
        href: "/enseignants/formations",
        icon: "🎒",
      },
    ],
  },
];

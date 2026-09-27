import type { IconName } from "@/components/icons/Icon";

/** Outils secondaires de l'espace Enseigner (anciens outils conservés). */
export const TEACHER_TOOLS: { group: string; items: { title: string; href: string; icon: IconName; text: string }[] }[] = [
  {
    group: "Autour de la période",
    items: [
      { title: "Calendrier", href: "/enseignants/calendrier", icon: "calendar", text: "Les échéances de l'année scolaire." },
      { title: "Fin de période", href: "/enseignants/fin-periode", icon: "check-circle", text: "Boucler avant les vacances." },
      { title: "Évaluations", href: "/enseignants/evaluations", icon: "clipboard", text: "Planifier les évaluations et leurs supports." },
      { title: "Ateliers", href: "/enseignants/ateliers", icon: "puzzle", text: "Organiser les rotations d'ateliers." },
    ],
  },
  {
    group: "Au quotidien",
    items: [
      { title: "APC", href: "/enseignants/apc", icon: "target", text: "Cycles et séances d'APC." },
      { title: "Rituels", href: "/enseignants/rituels", icon: "repeat", text: "Une bibliothèque de rituels." },
      { title: "Photocopies", href: "/enseignants/photocopies", icon: "printer", text: "La file des documents à reproduire." },
      { title: "Affichages", href: "/enseignants/affichages", icon: "image", text: "Préparer les affichages de classe." },
    ],
  },
  {
    group: "Liens et documents",
    items: [
      { title: "Liaison CM2 → 6e", href: "/enseignants/liaison-cm2-6e", icon: "graduation-cap", text: "Organiser la transition école-collège." },
      { title: "Réunion parents", href: "/enseignants/reunion-parents", icon: "users", text: "Préparer la réunion de rentrée." },
      { title: "Communications", href: "/enseignants/communications", icon: "envelope", text: "Modèles de messages aux familles." },
      { title: "Rendez-vous", href: "/enseignants/rendez-vous", icon: "message-circle", text: "Échanges professionnels et suivis." },
      { title: "Modèles de documents", href: "/enseignants/modeles", icon: "folder", text: "Documents réutilisables." },
      { title: "Dossier remplaçant", href: "/enseignants/dossier-remplacant", icon: "folder-open", text: "Tout ce qu'un remplaçant doit trouver." },
    ],
  },
];


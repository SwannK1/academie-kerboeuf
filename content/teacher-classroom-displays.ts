export const TEACHER_CLASSROOM_DISPLAYS_STORAGE_KEY =
  "academie-kerboeuf-affichages-classe-v1";

export const teacherClassroomDisplayCategories = [
  { id: "fonctionnement", label: "Fonctionnement" },
  { id: "organisation", label: "Organisation" },
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
  { id: "histoire-geographie", label: "Histoire-géographie" },
  { id: "emc", label: "EMC" },
  { id: "eps", label: "EPS" },
  { id: "autre", label: "Autre" },
] as const;

export type TeacherClassroomDisplayCategoryId =
  (typeof teacherClassroomDisplayCategories)[number]["id"];

export const teacherClassroomDisplayStatuses = [
  { id: "a-preparer", label: "À préparer" },
  { id: "pret", label: "Prêt" },
  { id: "affiche", label: "Affiché" },
  { id: "a-renouveler", label: "À renouveler" },
] as const;

export type TeacherClassroomDisplayStatusId =
  (typeof teacherClassroomDisplayStatuses)[number]["id"];

export interface TeacherClassroomDisplayItem {
  id: string;
  title: string;
  category: TeacherClassroomDisplayCategoryId;
  level?: string;
  location?: string;
  status: TeacherClassroomDisplayStatusId;
  note?: string;
  custom?: boolean;
}

export interface TeacherClassroomDisplaysState {
  items: TeacherClassroomDisplayItem[];
}

export const teacherClassroomDisplaysDirectionNote =
  "Les affichages à prévoir peuvent dépendre des consignes de votre direction et de votre circonscription.";

export const defaultTeacherClassroomDisplays: TeacherClassroomDisplayItem[] = [
  {
    id: "fonctionnement-emploi-du-temps",
    title: "Emploi du temps de la classe",
    category: "fonctionnement",
    status: "a-preparer",
  },
  {
    id: "fonctionnement-responsabilites",
    title: "Tableau des responsabilités",
    category: "fonctionnement",
    status: "a-preparer",
  },
  {
    id: "fonctionnement-regles-de-vie",
    title: "Règles de vie de la classe",
    category: "fonctionnement",
    status: "a-preparer",
  },
  {
    id: "fonctionnement-meteo-du-jour",
    title: "Affichage météo / date du jour",
    category: "fonctionnement",
    status: "a-preparer",
  },
  {
    id: "organisation-calendrier",
    title: "Calendrier mensuel",
    category: "organisation",
    status: "a-preparer",
  },
  {
    id: "organisation-anniversaires",
    title: "Affichage des anniversaires",
    category: "organisation",
    status: "a-preparer",
  },
  {
    id: "organisation-plan-de-classe",
    title: "Plan de classe",
    category: "organisation",
    status: "a-preparer",
  },
  {
    id: "francais-alphabet",
    title: "Alphabet (capitales / minuscules / cursive)",
    category: "francais",
    status: "a-preparer",
  },
  {
    id: "francais-sons",
    title: "Affichage des sons étudiés",
    category: "francais",
    status: "a-preparer",
  },
  {
    id: "francais-conjugaison",
    title: "Repères de conjugaison",
    category: "francais",
    status: "a-preparer",
  },
  {
    id: "francais-natures-mots",
    title: "Natures de mots",
    category: "francais",
    status: "a-preparer",
  },
  {
    id: "mathematiques-numeration",
    title: "Tableau de numération",
    category: "mathematiques",
    status: "a-preparer",
  },
  {
    id: "mathematiques-tables",
    title: "Tables d'addition / multiplication",
    category: "mathematiques",
    status: "a-preparer",
  },
  {
    id: "mathematiques-mesures",
    title: "Unités de mesure",
    category: "mathematiques",
    status: "a-preparer",
  },
  {
    id: "sciences-cycle-eau",
    title: "Cycle de l'eau",
    category: "sciences",
    status: "a-preparer",
  },
  {
    id: "sciences-corps-humain",
    title: "Le corps humain",
    category: "sciences",
    status: "a-preparer",
  },
  {
    id: "histoire-geographie-frise",
    title: "Frise chronologique",
    category: "histoire-geographie",
    status: "a-preparer",
  },
  {
    id: "histoire-geographie-cartes",
    title: "Cartes de référence (France, Europe, monde)",
    category: "histoire-geographie",
    status: "a-preparer",
  },
  {
    id: "emc-valeurs-republique",
    title: "Valeurs de la République",
    category: "emc",
    status: "a-preparer",
  },
  {
    id: "emc-emotions",
    title: "Affichage des émotions",
    category: "emc",
    status: "a-preparer",
  },
  {
    id: "eps-consignes-securite",
    title: "Consignes de sécurité EPS",
    category: "eps",
    status: "a-preparer",
  },
];

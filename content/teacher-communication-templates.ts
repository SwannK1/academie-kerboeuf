/**
 * Moteur de modèles pour le générateur de communications enseignant.
 *
 * Génération locale uniquement : aucune donnée saisie ici n'est envoyée à un
 * serveur ni stockée ailleurs que dans l'état de la page (et, en option,
 * dans le localStorage du navigateur).
 */

export type CommunicationToneId =
  | "neutre"
  | "chaleureux"
  | "ferme"
  | "institutionnel";

export const communicationTones: {
  id: CommunicationToneId;
  label: string;
  description: string;
}[] = [
  { id: "neutre", label: "Neutre", description: "Ton factuel et équilibré." },
  {
    id: "chaleureux",
    label: "Chaleureux",
    description: "Ton bienveillant et convivial.",
  },
  {
    id: "ferme",
    label: "Ferme",
    description: "Ton direct, pour un rappel ou une consigne à respecter.",
  },
  {
    id: "institutionnel",
    label: "Institutionnel",
    description: "Ton formel, pour la direction ou l'administration.",
  },
];

export type CommunicationTypeId =
  | "mot-parents"
  | "cahier-liaison"
  | "sortie-scolaire"
  | "demande-autorisation"
  | "rappel-materiel"
  | "mot-comportement"
  | "mot-absence"
  | "invitation-reunion"
  | "fin-periode"
  | "message-direction"
  | "message-equipe";

export interface CommunicationTypeConfig {
  id: CommunicationTypeId;
  label: string;
  description: string;
  destinatairePlaceholder: string;
  sujetPlaceholder: string;
  showDate: boolean;
  showLieu: boolean;
  informationsPlaceholder: string;
  defaultTone: CommunicationToneId;
}

export const communicationTypes: CommunicationTypeConfig[] = [
  {
    id: "mot-parents",
    label: "Mot aux parents",
    description: "Information générale destinée aux familles.",
    destinatairePlaceholder: "Familles de la classe de CE1",
    sujetPlaceholder: "Organisation de la rentrée",
    showDate: false,
    showLieu: false,
    informationsPlaceholder: "Détails à transmettre aux familles.",
    defaultTone: "chaleureux",
  },
  {
    id: "cahier-liaison",
    label: "Cahier de liaison",
    description: "Mot court à recopier ou coller dans le cahier de liaison.",
    destinatairePlaceholder: "Famille de [prénom de l'élève]",
    sujetPlaceholder: "Fournitures manquantes",
    showDate: true,
    showLieu: false,
    informationsPlaceholder: "Ce que la famille doit savoir ou faire.",
    defaultTone: "neutre",
  },
  {
    id: "sortie-scolaire",
    label: "Information sortie scolaire",
    description: "Annonce d'une sortie avec date et lieu.",
    destinatairePlaceholder: "Familles de la classe de CE2",
    sujetPlaceholder: "Sortie au musée",
    showDate: true,
    showLieu: true,
    informationsPlaceholder:
      "Horaires, moyen de transport, matériel à prévoir, coût éventuel...",
    defaultTone: "neutre",
  },
  {
    id: "demande-autorisation",
    label: "Demande d'autorisation",
    description: "Demande de signature pour une activité ou une sortie.",
    destinatairePlaceholder: "Familles de la classe de CM1",
    sujetPlaceholder: "Autorisation de sortie pédagogique",
    showDate: true,
    showLieu: true,
    informationsPlaceholder: "Ce qui doit être autorisé et la date limite de retour.",
    defaultTone: "neutre",
  },
  {
    id: "rappel-materiel",
    label: "Rappel matériel",
    description: "Rappel du matériel à apporter en classe.",
    destinatairePlaceholder: "Familles de la classe de CP",
    sujetPlaceholder: "Trousse et cahier de brouillon",
    showDate: true,
    showLieu: false,
    informationsPlaceholder: "Liste du matériel concerné.",
    defaultTone: "neutre",
  },
  {
    id: "mot-comportement",
    label: "Mot de comportement",
    description: "Point sur le comportement d'un élève.",
    destinatairePlaceholder: "Famille de [prénom de l'élève]",
    sujetPlaceholder: "Comportement en classe",
    showDate: true,
    showLieu: false,
    informationsPlaceholder: "Faits observés et suite envisagée.",
    defaultTone: "ferme",
  },
  {
    id: "mot-absence",
    label: "Mot d'absence",
    description: "Message lié à une absence à signaler ou à justifier.",
    destinatairePlaceholder: "Famille de [prénom de l'élève]",
    sujetPlaceholder: "Absence non justifiée",
    showDate: true,
    showLieu: false,
    informationsPlaceholder: "Contexte de l'absence et démarche attendue.",
    defaultTone: "neutre",
  },
  {
    id: "invitation-reunion",
    label: "Invitation à une réunion",
    description: "Invitation avec date, lieu et objet de la réunion.",
    destinatairePlaceholder: "Familles de la classe de CM2",
    sujetPlaceholder: "Réunion de rentrée",
    showDate: true,
    showLieu: true,
    informationsPlaceholder: "Points abordés, durée prévue, modalités d'accueil...",
    defaultTone: "neutre",
  },
  {
    id: "fin-periode",
    label: "Message de fin de période",
    description: "Bilan et informations de fin de période scolaire.",
    destinatairePlaceholder: "Familles de la classe",
    sujetPlaceholder: "Bilan de la période",
    showDate: true,
    showLieu: false,
    informationsPlaceholder: "Points marquants de la période écoulée.",
    defaultTone: "chaleureux",
  },
  {
    id: "message-direction",
    label: "Message à la direction",
    description: "Communication formelle adressée à la direction d'école.",
    destinatairePlaceholder: "Madame la Directrice / Monsieur le Directeur",
    sujetPlaceholder: "Demande de matériel",
    showDate: true,
    showLieu: true,
    informationsPlaceholder: "Détails de la demande ou du signalement.",
    defaultTone: "institutionnel",
  },
  {
    id: "message-equipe",
    label: "Message à l'équipe pédagogique",
    description: "Communication collégiale destinée à l'équipe enseignante.",
    destinatairePlaceholder: "Équipe pédagogique du cycle 2",
    sujetPlaceholder: "Organisation d'un projet commun",
    showDate: true,
    showLieu: true,
    informationsPlaceholder: "Détails à partager avec l'équipe.",
    defaultTone: "neutre",
  },
];

export function getCommunicationType(
  id: CommunicationTypeId,
): CommunicationTypeConfig {
  const type = communicationTypes.find((entry) => entry.id === id);
  if (!type) {
    throw new Error(`Type de communication inconnu : ${id}`);
  }
  return type;
}

export interface CommunicationFields {
  destinataire: string;
  sujet: string;
  date: string;
  lieu: string;
  informations: string;
}

export const emptyCommunicationFields: CommunicationFields = {
  destinataire: "",
  sujet: "",
  date: "",
  lieu: "",
  informations: "",
};

const FRENCH_MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

function formatFrenchDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return value;
  }
  const [, year, month, day] = match;
  const monthIndex = Number(month) - 1;
  if (monthIndex < 0 || monthIndex > 11) {
    return value;
  }
  return `${Number(day)} ${FRENCH_MONTHS[monthIndex]} ${year}`;
}

function greetingForTone(tone: CommunicationToneId): string {
  switch (tone) {
    case "chaleureux":
      return "Bonjour à toutes et à tous,";
    case "ferme":
    case "institutionnel":
      return "Madame, Monsieur,";
    case "neutre":
    default:
      return "Bonjour,";
  }
}

function closingForTone(tone: CommunicationToneId): string {
  switch (tone) {
    case "chaleureux":
      return "Bien à vous,";
    case "ferme":
      return "Je vous remercie de votre attention à ce message.\n\nCordialement,";
    case "institutionnel":
      return "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.";
    case "neutre":
    default:
      return "Cordialement,";
  }
}

interface BodyContext {
  sujet: string;
  date: string;
  lieu: string;
  informations: string;
}

const bodyBuilders: Record<CommunicationTypeId, (ctx: BodyContext) => string[]> = {
  "mot-parents": (ctx) => {
    const paras: string[] = [];
    paras.push(
      ctx.sujet
        ? `Je souhaite vous transmettre quelques informations concernant ${ctx.sujet}.`
        : "Je souhaite vous transmettre quelques informations concernant la classe.",
    );
    if (ctx.date) paras.push(`Cela concerne la date du ${ctx.date}.`);
    if (ctx.informations) paras.push(ctx.informations);
    paras.push("N'hésitez pas à me contacter si vous avez la moindre question.");
    return paras;
  },
  "cahier-liaison": (ctx) => {
    const paras: string[] = [];
    paras.push(
      ctx.sujet
        ? `Je vous informe au sujet de : ${ctx.sujet}.`
        : "Je vous informe de ce qui suit :",
    );
    if (ctx.date) paras.push(`Date concernée : ${ctx.date}.`);
    if (ctx.informations) paras.push(ctx.informations);
    paras.push("Merci de bien vouloir en prendre connaissance et de signer ce mot.");
    return paras;
  },
  "sortie-scolaire": (ctx) => {
    const paras: string[] = [];
    paras.push(
      `Une sortie scolaire${ctx.sujet ? ` intitulée « ${ctx.sujet} »` : ""} est prévue${
        ctx.date ? ` le ${ctx.date}` : ""
      }${ctx.lieu ? ` à ${ctx.lieu}` : ""}.`,
    );
    if (ctx.informations) paras.push(ctx.informations);
    paras.push(
      "Un mot d'autorisation vous sera transmis si nécessaire. Merci de prévoir la tenue et le matériel adaptés.",
    );
    return paras;
  },
  "demande-autorisation": (ctx) => {
    const paras: string[] = [];
    paras.push(
      `Je vous demande une autorisation concernant${
        ctx.sujet ? ` : ${ctx.sujet}` : " l'activité suivante"
      }.`,
    );
    if (ctx.date) paras.push(`Date concernée : ${ctx.date}.`);
    if (ctx.lieu) paras.push(`Lieu concerné : ${ctx.lieu}.`);
    if (ctx.informations) paras.push(ctx.informations);
    paras.push(
      "Merci de bien vouloir compléter, signer et me retourner ce coupon-réponse dans les meilleurs délais.",
    );
    return paras;
  },
  "rappel-materiel": (ctx) => {
    const paras: string[] = [];
    paras.push(
      `Petit rappel concernant le matériel${ctx.sujet ? ` pour ${ctx.sujet}` : ""}.`,
    );
    if (ctx.date) paras.push(`À prévoir pour le ${ctx.date}.`);
    if (ctx.informations) paras.push(ctx.informations);
    paras.push("Merci de vérifier que ce matériel soit bien présent dans le cartable.");
    return paras;
  },
  "mot-comportement": (ctx) => {
    const paras: string[] = [];
    paras.push(
      `Je souhaite vous informer d'un point concernant le comportement de votre enfant${
        ctx.sujet ? ` : ${ctx.sujet}` : ""
      }.`,
    );
    if (ctx.date) paras.push(`Ce point concerne la journée du ${ctx.date}.`);
    if (ctx.informations) paras.push(ctx.informations);
    paras.push("Je reste à votre disposition pour en échanger si vous le souhaitez.");
    return paras;
  },
  "mot-absence": (ctx) => {
    const paras: string[] = [];
    paras.push(`Ce message concerne une absence${ctx.sujet ? ` : ${ctx.sujet}` : ""}.`);
    if (ctx.date) paras.push(`Date concernée : ${ctx.date}.`);
    if (ctx.informations) paras.push(ctx.informations);
    paras.push("Merci de bien vouloir m'en tenir informé(e) si la situation évolue.");
    return paras;
  },
  "invitation-reunion": (ctx) => {
    const paras: string[] = [];
    paras.push(
      `Vous êtes invité(e) à une réunion${ctx.sujet ? ` : ${ctx.sujet}` : ""}${
        ctx.date ? `, le ${ctx.date}` : ""
      }${ctx.lieu ? ` à ${ctx.lieu}` : ""}.`,
    );
    if (ctx.informations) paras.push(ctx.informations);
    paras.push("Merci de bien vouloir confirmer votre présence.");
    return paras;
  },
  "fin-periode": (ctx) => {
    const paras: string[] = [];
    paras.push(`Nous arrivons au terme de cette période${ctx.sujet ? ` : ${ctx.sujet}` : ""}.`);
    if (ctx.date) paras.push(`Les vacances débutent le ${ctx.date}.`);
    if (ctx.informations) paras.push(ctx.informations);
    paras.push(
      "Je vous remercie pour votre implication tout au long de cette période et vous souhaite d'excellentes vacances.",
    );
    return paras;
  },
  "message-direction": (ctx) => {
    const paras: string[] = [];
    paras.push(
      `Je me permets de vous solliciter concernant${
        ctx.sujet ? ` : ${ctx.sujet}` : " le point suivant"
      }.`,
    );
    if (ctx.date) paras.push(`Cela concerne la date du ${ctx.date}.`);
    if (ctx.lieu) paras.push(`Lieu concerné : ${ctx.lieu}.`);
    if (ctx.informations) paras.push(ctx.informations);
    paras.push("Je reste à votre disposition pour tout complément d'information.");
    return paras;
  },
  "message-equipe": (ctx) => {
    const paras: string[] = [];
    paras.push(
      `Je souhaite partager avec l'équipe une information${
        ctx.sujet ? ` concernant ${ctx.sujet}` : ""
      }.`,
    );
    if (ctx.date) paras.push(`Date concernée : ${ctx.date}.`);
    if (ctx.lieu) paras.push(`Lieu concerné : ${ctx.lieu}.`);
    if (ctx.informations) paras.push(ctx.informations);
    paras.push("N'hésitez pas à revenir vers moi pour en discuter.");
    return paras;
  },
};

export function generateCommunicationMessage(
  typeId: CommunicationTypeId,
  fields: CommunicationFields,
  tone: CommunicationToneId,
): string {
  const type = getCommunicationType(typeId);
  const destinataire = fields.destinataire.trim();
  const sujet = fields.sujet.trim();
  const lieu = type.showLieu ? fields.lieu.trim() : "";
  const informations = fields.informations.trim();
  const date = type.showDate ? formatFrenchDate(fields.date.trim()) : "";

  const lines: string[] = [];

  if (destinataire) {
    lines.push(`À l'attention de : ${destinataire}`);
  }
  if (sujet) {
    lines.push(`Objet : ${sujet}`);
  }
  if (lines.length > 0) {
    lines.push("");
  }

  lines.push(greetingForTone(tone));
  lines.push("");

  for (const paragraph of bodyBuilders[typeId]({ sujet, date, lieu, informations })) {
    if (paragraph.trim()) {
      lines.push(paragraph);
      lines.push("");
    }
  }

  lines.push(closingForTone(tone));
  lines.push("");
  lines.push("[Signature]");

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export type SubstituteFolderFieldId =
  | "horaires"
  | "materiel"
  | "rituels"
  | "organisationJournee"
  | "vigilancePedagogique"
  | "contactsInstitutionnels";

export type SubstituteFolderField = {
  id: SubstituteFolderFieldId;
  label: string;
  helper: string;
  placeholder: string;
};

export const substituteFolderFields: SubstituteFolderField[] = [
  {
    id: "horaires",
    label: "Horaires de la journée",
    helper: "Heures d'arrivée, récréations, cantine, sorties, fin de journée.",
    placeholder: "Ex. : Accueil 8h20, classe 8h30-11h30, cantine 11h30-13h20...",
  },
  {
    id: "materiel",
    label: "Matériel et supports",
    helper: "Manuels, fichiers, cahiers, matériel collectif à utiliser.",
    placeholder: "Ex. : Manuel de maths p. 42, cahier du jour, ardoises...",
  },
  {
    id: "rituels",
    label: "Routines et consignes de classe",
    helper: "Rituels d'entrée, gestion des déplacements, signaux de classe.",
    placeholder: "Ex. : Rituel de la date au tableau, file en silence vers la cour...",
  },
  {
    id: "organisationJournee",
    label: "Organisation de la journée",
    helper: "Déroulé général, alternance des matières, transitions.",
    placeholder: "Ex. : Matinée : français puis maths, après-midi : EPS puis arts...",
  },
  {
    id: "vigilancePedagogique",
    label: "Points de vigilance pédagogiques généraux",
    helper:
      "Consignes pédagogiques générales utiles au remplaçant, sans aucune information nominative.",
    placeholder: "Ex. : Lecture des consignes à voix haute, reformulation systématique...",
  },
  {
    id: "contactsInstitutionnels",
    label: "Contacts institutionnels génériques",
    helper: "Direction, secrétariat, vie scolaire — fonctions, pas de noms propres.",
    placeholder: "Ex. : Direction au bureau 1, secrétariat au rez-de-chaussée...",
  },
];

export type SubstituteFolderState = Record<SubstituteFolderFieldId, string>;

export const SUBSTITUTE_FOLDER_STORAGE_KEY =
  "academie-kerboeuf.teacher-substitute-folder.v1";

export function getEmptySubstituteFolderState(): SubstituteFolderState {
  return substituteFolderFields.reduce((state, field) => {
    state[field.id] = "";
    return state;
  }, {} as SubstituteFolderState);
}

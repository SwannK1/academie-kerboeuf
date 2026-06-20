export const CLASSROOM_PLAN_STORAGE_KEY =
  "academie-kerboeuf-plan-de-classe-v1";

/**
 * "table" et "group" sont les seuls types d'étiquette renommables par
 * l'enseignant (organisation spatiale). "seat" reste figé sur un repère
 * anonyme ("Élève N") afin qu'aucun prénom ne puisse y être saisi.
 */
export type ClassroomPlanSlotKind = "seat" | "table" | "group";

export type ClassroomPlanSlot = {
  id: string;
  kind: ClassroomPlanSlotKind;
  defaultLabel: string;
  customLabel: string;
  editable: boolean;
};

export type ClassroomPlanState = {
  slots: ClassroomPlanSlot[];
};

const DEFAULT_SEAT_COUNT = 24;
const DEFAULT_TABLE_COUNT = 6;
const DEFAULT_GROUP_COUNT = 4;

function buildDefaultSlots(): ClassroomPlanSlot[] {
  const slots: ClassroomPlanSlot[] = [];

  for (let index = 1; index <= DEFAULT_SEAT_COUNT; index += 1) {
    slots.push({
      id: `seat-${index}`,
      kind: "seat",
      defaultLabel: `Élève ${index}`,
      customLabel: "",
      editable: false,
    });
  }

  for (let index = 1; index <= DEFAULT_TABLE_COUNT; index += 1) {
    slots.push({
      id: `table-${index}`,
      kind: "table",
      defaultLabel: `Table ${index}`,
      customLabel: "",
      editable: true,
    });
  }

  for (let index = 0; index < DEFAULT_GROUP_COUNT; index += 1) {
    const letter = String.fromCharCode("A".charCodeAt(0) + index);
    slots.push({
      id: `group-${letter}`,
      kind: "group",
      defaultLabel: `Groupe ${letter}`,
      customLabel: "",
      editable: true,
    });
  }

  return slots;
}

export function getDefaultClassroomPlanState(): ClassroomPlanState {
  return { slots: buildDefaultSlots() };
}

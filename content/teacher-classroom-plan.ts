export type TeacherPlanLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export const teacherPlanLevels: { id: TeacherPlanLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export type SeatLayoutId = "rows" | "pairs" | "islands" | "u" | "blank";

export const seatLayoutOptions: { id: SeatLayoutId; label: string }[] = [
  { id: "rows", label: "Rangées" },
  { id: "pairs", label: "Binômes" },
  { id: "islands", label: "Îlots de quatre" },
  { id: "u", label: "U" },
  { id: "blank", label: "Plan vide" },
];

/**
 * Grid coordinates only. Kept intentionally minimal so a future drag-and-drop
 * implementation can add free-form positioning without changing this shape.
 */
export type Seat = {
  id: string;
  row: number;
  col: number;
};

export type Student = {
  id: string;
  firstName: string;
};

/**
 * seatId -> studentId. A plain record (rather than embedding the student in
 * the seat) keeps seats and assignments independent, which is what a future
 * drag-and-drop swap/move implementation will need.
 */
export type SeatAssignments = Record<string, string>;

export type ClassroomPlanState = {
  level: TeacherPlanLevel;
  students: Student[];
  layout: SeatLayoutId;
  seats: Seat[];
  assignments: SeatAssignments;
};

export const defaultClassroomPlanState: ClassroomPlanState = {
  level: "cp",
  students: [],
  layout: "blank",
  seats: [],
  assignments: {},
};

function makeSeat(row: number, col: number): Seat {
  return { id: `r${row}c${col}`, row, col };
}

function generateRows(count: number): Seat[] {
  const cols = 4;
  const seats: Seat[] = [];
  for (let i = 0; i < count; i += 1) {
    seats.push(makeSeat(Math.floor(i / cols), i % cols));
  }
  return seats;
}

function generatePairs(count: number): Seat[] {
  const benchesPerRow = 3;
  const seats: Seat[] = [];
  for (let i = 0; i < count; i += 1) {
    const benchIndex = Math.floor(i / 2);
    const within = i % 2;
    const benchRow = Math.floor(benchIndex / benchesPerRow);
    const benchCol = benchIndex % benchesPerRow;
    seats.push(makeSeat(benchRow, benchCol * 3 + within));
  }
  return seats;
}

function generateIslands(count: number): Seat[] {
  const islandsPerRow = 2;
  const seats: Seat[] = [];
  for (let i = 0; i < count; i += 1) {
    const islandIndex = Math.floor(i / 4);
    const localIndex = i % 4;
    const localRow = Math.floor(localIndex / 2);
    const localCol = localIndex % 2;
    const islandRow = Math.floor(islandIndex / islandsPerRow);
    const islandCol = islandIndex % islandsPerRow;
    seats.push(makeSeat(islandRow * 3 + localRow, islandCol * 3 + localCol));
  }
  return seats;
}

function generateUShape(count: number): Seat[] {
  const width = 8;
  const depth = 4;
  const path: { row: number; col: number }[] = [];

  for (let row = 1; row <= depth; row += 1) {
    path.push({ row, col: 0 });
  }
  for (let col = 1; col < width - 1; col += 1) {
    path.push({ row: depth, col });
  }
  for (let row = depth; row >= 1; row -= 1) {
    path.push({ row, col: width - 1 });
  }

  const seats: Seat[] = [];
  for (let i = 0; i < count; i += 1) {
    const position = path[i % path.length];
    const lap = Math.floor(i / path.length);
    seats.push(makeSeat(position.row + lap * (depth + 1), position.col));
  }
  return seats;
}

export function generateSeatsForLayout(
  layout: SeatLayoutId,
  studentCount: number,
): Seat[] {
  if (layout === "blank" || studentCount <= 0) {
    return [];
  }

  switch (layout) {
    case "rows":
      return generateRows(studentCount);
    case "pairs":
      return generatePairs(studentCount);
    case "islands":
      return generateIslands(studentCount);
    case "u":
      return generateUShape(studentCount);
    default:
      return [];
  }
}

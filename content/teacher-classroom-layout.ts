/**
 * Plan de classe et générateur de groupes — outil local.
 *
 * Règle impérative : aucune donnée élève sensible. Les noms saisis sur les
 * tables ne doivent contenir qu'un prénom ou un code choisi par
 * l'enseignant, jamais d'information médicale, familiale ou
 * comportementale. Tout est stocké uniquement sur cet appareil
 * (localStorage), sans envoi à un serveur.
 */

export type TableShape = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  seats: number;
  names: (string | null)[];
};

export type RoleId =
  | "lecteur"
  | "secretaire"
  | "rapporteur"
  | "gardien-temps"
  | "responsable-materiel";

export const roles: { id: RoleId; label: string }[] = [
  { id: "lecteur", label: "Lecteur" },
  { id: "secretaire", label: "Secrétaire" },
  { id: "rapporteur", label: "Rapporteur" },
  { id: "gardien-temps", label: "Gardien du temps" },
  { id: "responsable-materiel", label: "Responsable matériel" },
];

export type Group = {
  id: string;
  name: string;
  color: string;
  pictogram: string;
};

export const groupColors = [
  "#2f9e7a",
  "#d97742",
  "#3f6fb0",
  "#b04f9c",
  "#c9a227",
  "#5a7a5a",
];

export const groupPictograms = ["★", "●", "▲", "◆", "■", "♦"];

export type RoleAssignment = Record<string, RoleId | null>;

export type LayoutKind =
  | "frontal"
  | "ilots"
  | "u"
  | "binomes"
  | "groupes4"
  | "evaluation";

export const layoutKinds: { id: LayoutKind; label: string }[] = [
  { id: "frontal", label: "Frontal" },
  { id: "ilots", label: "Îlots" },
  { id: "u", label: "En U" },
  { id: "binomes", label: "Binômes" },
  { id: "groupes4", label: "Groupes de 4" },
  { id: "evaluation", label: "Évaluation" },
];

const SIMPLE_WIDTH = 56;
const SIMPLE_HEIGHT = 56;
const DOUBLE_WIDTH = 100;
const DOUBLE_HEIGHT = 56;
const ISLAND_WIDTH = 104;
const ISLAND_HEIGHT = 104;

function dimsForSeats(seats: number): { width: number; height: number } {
  if (seats <= 1) return { width: SIMPLE_WIDTH, height: SIMPLE_HEIGHT };
  if (seats >= 4) return { width: ISLAND_WIDTH, height: ISLAND_HEIGHT };
  return { width: DOUBLE_WIDTH, height: DOUBLE_HEIGHT };
}

export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function makeTable(
  x: number,
  y: number,
  rotation = 0,
  seats: 1 | 2 | 4 = 2,
): TableShape {
  const { width, height } = dimsForSeats(seats);
  return {
    id: generateId("table"),
    x,
    y,
    rotation,
    width,
    height,
    seats,
    names: Array.from({ length: seats }, () => null),
  };
}

export function generateLayout(
  kind: LayoutKind,
  canvasWidth: number,
  canvasHeight: number,
): TableShape[] {
  const margin = 24;
  const usableWidth = Math.max(canvasWidth - margin * 2, DOUBLE_WIDTH);
  const usableHeight = Math.max(canvasHeight - margin * 2, DOUBLE_HEIGHT);

  switch (kind) {
    case "frontal": {
      const cols = Math.max(2, Math.floor(usableWidth / (DOUBLE_WIDTH + 16)));
      const rows = Math.max(2, Math.floor(usableHeight / (DOUBLE_HEIGHT + 16)));
      const tables: TableShape[] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          tables.push(
            makeTable(
              margin + col * (DOUBLE_WIDTH + 16),
              margin + row * (DOUBLE_HEIGHT + 16),
              0,
              2,
            ),
          );
        }
      }
      return tables;
    }

    case "binomes": {
      const cols = Math.max(2, Math.floor(usableWidth / (DOUBLE_WIDTH + 28)));
      const rows = Math.max(2, Math.floor(usableHeight / (DOUBLE_HEIGHT + 28)));
      const tables: TableShape[] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          tables.push(
            makeTable(
              margin + col * (DOUBLE_WIDTH + 28),
              margin + row * (DOUBLE_HEIGHT + 28),
              0,
              2,
            ),
          );
        }
      }
      return tables;
    }

    case "ilots": {
      const islandCols = Math.max(1, Math.floor(usableWidth / 220));
      const islandRows = Math.max(1, Math.floor(usableHeight / 160));
      const tables: TableShape[] = [];
      for (let row = 0; row < islandRows; row += 1) {
        for (let col = 0; col < islandCols; col += 1) {
          const baseX = margin + col * 220;
          const baseY = margin + row * 160;
          tables.push(makeTable(baseX, baseY, 0, 2));
          tables.push(makeTable(baseX, baseY + DOUBLE_HEIGHT + 8, 0, 2));
        }
      }
      return tables;
    }

    case "groupes4": {
      const cols = Math.max(2, Math.floor(usableWidth / (ISLAND_WIDTH + 32)));
      const rows = Math.max(1, Math.floor(usableHeight / (ISLAND_HEIGHT + 32)));
      const tables: TableShape[] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          tables.push(
            makeTable(
              margin + col * (ISLAND_WIDTH + 32),
              margin + row * (ISLAND_HEIGHT + 32),
              0,
              4,
            ),
          );
        }
      }
      return tables;
    }

    case "u": {
      const tables: TableShape[] = [];
      const cols = Math.max(3, Math.floor(usableWidth / (DOUBLE_WIDTH + 16)));
      const sideRows = Math.max(
        2,
        Math.floor((usableHeight - DOUBLE_HEIGHT) / (DOUBLE_HEIGHT + 16)),
      );

      for (let col = 0; col < cols; col += 1) {
        tables.push(
          makeTable(margin + col * (DOUBLE_WIDTH + 16), margin, 0, 2),
        );
      }
      for (let row = 1; row <= sideRows; row += 1) {
        tables.push(
          makeTable(margin, margin + row * (DOUBLE_HEIGHT + 16), 90, 2),
        );
        tables.push(
          makeTable(
            margin + (cols - 1) * (DOUBLE_WIDTH + 16),
            margin + row * (DOUBLE_HEIGHT + 16),
            90,
            2,
          ),
        );
      }
      return tables;
    }

    case "evaluation": {
      const cols = Math.max(2, Math.floor(usableWidth / (SIMPLE_WIDTH + 40)));
      const rows = Math.max(2, Math.floor(usableHeight / (SIMPLE_HEIGHT + 40)));
      const tables: TableShape[] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          tables.push(
            makeTable(
              margin + col * (SIMPLE_WIDTH + 40),
              margin + row * (SIMPLE_HEIGHT + 40),
              0,
              1,
            ),
          );
        }
      }
      return tables;
    }

    default:
      return [];
  }
}

export function createGroups(count: number): Group[] {
  return Array.from({ length: count }, (_, index) => ({
    id: generateId("groupe"),
    name: `Groupe ${index + 1}`,
    color: groupColors[index % groupColors.length],
    pictogram: groupPictograms[index % groupPictograms.length],
  }));
}

export type GroupGenerationMode = "heterogene" | "homogene";

export type AvoidPair = { a: string; b: string };

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function violatesAvoidPairs(
  members: string[],
  avoidPairs: AvoidPair[],
): boolean {
  const set = new Set(members);
  return avoidPairs.some((pair) => set.has(pair.a) && set.has(pair.b));
}

/**
 * Répartit des identifiants (sièges nommés) dans un nombre de groupes
 * calculé à partir de la taille de groupe souhaitée. Le mode « hétérogène »
 * mélange l'ordre avant répartition, le mode « homogène » conserve l'ordre
 * fourni.
 */
export function generateGroupAssignment(
  seatIds: string[],
  groupSize: number,
  mode: GroupGenerationMode,
  avoidPairs: AvoidPair[],
  maxAttempts = 200,
): string[][] {
  const groupCount = Math.max(1, Math.ceil(seatIds.length / groupSize));

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const ordered = mode === "heterogene" ? shuffle(seatIds) : seatIds;
    const buckets: string[][] = Array.from({ length: groupCount }, () => []);
    ordered.forEach((id, index) => {
      buckets[index % groupCount].push(id);
    });

    const hasViolation = buckets.some((bucket) =>
      violatesAvoidPairs(bucket, avoidPairs),
    );
    if (!hasViolation || avoidPairs.length === 0) {
      return buckets;
    }
  }

  const ordered = mode === "heterogene" ? shuffle(seatIds) : seatIds;
  const buckets: string[][] = Array.from({ length: groupCount }, () => []);
  ordered.forEach((id, index) => {
    buckets[index % groupCount].push(id);
  });
  return buckets;
}

export function assignRoles(memberIds: string[]): RoleAssignment {
  const assignment: RoleAssignment = {};
  memberIds.forEach((id, index) => {
    assignment[id] = roles[index % roles.length].id;
  });
  return assignment;
}

export type StoredLayout = {
  id: string;
  name: string;
  tables: TableShape[];
  groups: Group[];
  groupAssignment: Record<string, string | null>;
  roleAssignment: RoleAssignment;
  isDefault: boolean;
};

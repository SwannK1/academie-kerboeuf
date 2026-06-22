/**
 * Plan de classe et générateur de groupes — outil local.
 *
 * Règle impérative : aucune donnée élève sensible. Les étiquettes ne
 * doivent contenir qu'un prénom ou un code choisi par l'enseignant, jamais
 * d'information médicale, familiale ou comportementale. Tout est stocké
 * uniquement sur cet appareil (localStorage), sans envoi à un serveur.
 */

export type TableShape = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  seats: number;
};

export type Label = {
  id: string;
  text: string;
  tableId: string | null;
  groupId: string | null;
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

export type LayoutKind = "rangees" | "ilots" | "u" | "binomes" | "vide";

export const layoutKinds: { id: LayoutKind; label: string }[] = [
  { id: "rangees", label: "Rangées" },
  { id: "ilots", label: "Îlots" },
  { id: "u", label: "En U" },
  { id: "binomes", label: "Binômes" },
  { id: "vide", label: "Salle vide" },
];

const TABLE_WIDTH = 90;
const TABLE_HEIGHT = 56;

function makeTable(x: number, y: number, rotation = 0, seats = 2): TableShape {
  return {
    id: `table-${Math.random().toString(36).slice(2, 10)}`,
    x,
    y,
    rotation,
    width: TABLE_WIDTH,
    height: TABLE_HEIGHT,
    seats,
  };
}

export function generateLayout(
  kind: LayoutKind,
  canvasWidth: number,
  canvasHeight: number,
): TableShape[] {
  const margin = 24;
  const usableWidth = Math.max(canvasWidth - margin * 2, TABLE_WIDTH);
  const usableHeight = Math.max(canvasHeight - margin * 2, TABLE_HEIGHT);

  switch (kind) {
    case "vide":
      return [];

    case "binomes": {
      const cols = Math.max(2, Math.floor(usableWidth / (TABLE_WIDTH + 24)));
      const rows = Math.max(2, Math.floor(usableHeight / (TABLE_HEIGHT + 24)));
      const tables: TableShape[] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          tables.push(
            makeTable(
              margin + col * (TABLE_WIDTH + 24),
              margin + row * (TABLE_HEIGHT + 24),
              0,
              2,
            ),
          );
        }
      }
      return tables;
    }

    case "rangees": {
      const cols = Math.max(2, Math.floor(usableWidth / (TABLE_WIDTH + 16)));
      const rows = Math.max(2, Math.floor(usableHeight / (TABLE_HEIGHT + 16)));
      const tables: TableShape[] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          tables.push(
            makeTable(
              margin + col * (TABLE_WIDTH + 16),
              margin + row * (TABLE_HEIGHT + 16),
              0,
              2,
            ),
          );
        }
      }
      return tables;
    }

    case "ilots": {
      const islandCols = Math.max(2, Math.floor(usableWidth / 220));
      const islandRows = Math.max(1, Math.floor(usableHeight / 200));
      const tables: TableShape[] = [];
      for (let row = 0; row < islandRows; row += 1) {
        for (let col = 0; col < islandCols; col += 1) {
          const baseX = margin + col * 220;
          const baseY = margin + row * 200;
          tables.push(makeTable(baseX, baseY, 0, 4));
          tables.push(makeTable(baseX + 100, baseY, 0, 4));
          tables.push(makeTable(baseX, baseY + 64, 0, 4));
          tables.push(makeTable(baseX + 100, baseY + 64, 0, 4));
        }
      }
      return tables;
    }

    case "u": {
      const tables: TableShape[] = [];
      const cols = Math.max(3, Math.floor(usableWidth / (TABLE_WIDTH + 16)));
      const sideRows = Math.max(2, Math.floor((usableHeight - TABLE_HEIGHT) / (TABLE_HEIGHT + 16)));

      for (let col = 0; col < cols; col += 1) {
        tables.push(
          makeTable(margin + col * (TABLE_WIDTH + 16), margin, 0, 2),
        );
      }
      for (let row = 1; row <= sideRows; row += 1) {
        tables.push(
          makeTable(margin, margin + row * (TABLE_HEIGHT + 16), 90, 2),
        );
        tables.push(
          makeTable(
            margin + (cols - 1) * (TABLE_WIDTH + 16),
            margin + row * (TABLE_HEIGHT + 16),
            90,
            2,
          ),
        );
      }
      return tables;
    }

    default:
      return [];
  }
}

export function createGroups(count: number): Group[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `groupe-${Math.random().toString(36).slice(2, 10)}`,
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
 * Répartit des étiquettes dans un nombre de groupes calculé à partir de la
 * taille de groupe souhaitée. Sans donnée élève réelle disponible, le mode
 * « hétérogène » mélange l'ordre des étiquettes avant répartition et le
 * mode « homogène » conserve l'ordre fourni (ex. ordre alphabétique des
 * étiquettes), ce qui regroupe les étiquettes voisines dans l'ordre donné.
 */
export function generateGroupAssignment(
  labelIds: string[],
  groupSize: number,
  mode: GroupGenerationMode,
  avoidPairs: AvoidPair[],
  maxAttempts = 200,
): string[][] {
  const groupCount = Math.max(1, Math.ceil(labelIds.length / groupSize));

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const ordered = mode === "heterogene" ? shuffle(labelIds) : labelIds;
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

  const ordered = mode === "heterogene" ? shuffle(labelIds) : labelIds;
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
  labels: Label[];
  groups: Group[];
  roleAssignment: RoleAssignment;
  isDefault: boolean;
};

// Journal local des dernières modifications effectuées depuis /admin.

import { promises as fs } from "fs";
import path from "path";

export type AuditLogEntry = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resourceId: string;
  details?: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "admin");
const LOG_PATH = path.join(DATA_DIR, "audit-log.json");
const MAX_ENTRIES = 300;

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readAuditLog(): Promise<AuditLogEntry[]> {
  try {
    const raw = await fs.readFile(LOG_PATH, "utf-8");
    return JSON.parse(raw) as AuditLogEntry[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function appendAuditLog(
  entry: Omit<AuditLogEntry, "id" | "timestamp">,
): Promise<void> {
  await ensureDataDir();
  const log = await readAuditLog();
  const newEntry: AuditLogEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  const updated = [newEntry, ...log].slice(0, MAX_ENTRIES);
  await fs.writeFile(LOG_PATH, JSON.stringify(updated, null, 2), "utf-8");
}

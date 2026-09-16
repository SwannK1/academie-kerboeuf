// Couche de persistance des surcharges admin sur les ressources PDF.
// Les fichiers content/levels/*.ts restent la source pédagogique statique ;
// cette couche ne fait que surcharger statut / lien / libellé à l'exécution,
// sans jamais modifier les fichiers de contenu gouvernés.

import { promises as fs } from "fs";
import path from "path";
import type { PedagogicalResourceKind } from "@/content/program-types";

// Vocabulaire aligné sur PedagogicalResourceStatus (content/program-types.ts) :
// "disponible" / "en préparation" / "à venir" demandés par la gouvernance produit.
export type ResourceOverrideStatus = "available" | "in-preparation" | "planned";

export type ResourceOverride = {
  status: ResourceOverrideStatus;
  href?: string;
  label?: string;
  durationLabel?: string;
  verified?: boolean;
  published: boolean;
  updatedAt: string;
  updatedBy: string;
};

export type ResourceOverridesFile = Record<string, ResourceOverride>;

const DATA_DIR = path.join(process.cwd(), "data", "admin");
const OVERRIDES_PATH = path.join(DATA_DIR, "resource-overrides.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export function buildResourceId(lessonId: string, kind: PedagogicalResourceKind): string {
  return `${lessonId}:${kind}`;
}

export async function readResourceOverrides(): Promise<ResourceOverridesFile> {
  try {
    const raw = await fs.readFile(OVERRIDES_PATH, "utf-8");
    return JSON.parse(raw) as ResourceOverridesFile;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }
}

export async function readResourceOverride(
  resourceId: string,
): Promise<ResourceOverride | undefined> {
  const overrides = await readResourceOverrides();
  return overrides[resourceId];
}

export async function writeResourceOverride(
  resourceId: string,
  override: ResourceOverride,
): Promise<void> {
  await ensureDataDir();
  const current = await readResourceOverrides();
  current[resourceId] = override;
  await fs.writeFile(OVERRIDES_PATH, JSON.stringify(current, null, 2), "utf-8");
}

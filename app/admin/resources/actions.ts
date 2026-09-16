"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { appendAuditLog } from "@/lib/admin/audit-log";
import {
  readResourceOverride,
  writeResourceOverride,
  type ResourceOverride,
  type ResourceOverrideStatus,
} from "@/lib/admin/resource-store";

export type ResourceActionState = { error?: string; success?: string };

const ACTOR = "administrateur";

function isValidStatus(value: string): value is ResourceOverrideStatus {
  return value === "available" || value === "in-preparation" || value === "planned";
}

export async function updateResourceAction(
  resourceId: string,
  baseHref: string | undefined,
  _prevState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  const statusRaw = String(formData.get("status") ?? "");
  const href = String(formData.get("href") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const durationLabel = String(formData.get("durationLabel") ?? "").trim();
  const verified = formData.get("verified") === "on";
  const publishIntent = formData.get("published") === "on";

  if (!isValidStatus(statusRaw)) {
    return { error: "Statut invalide." };
  }

  const effectiveHref = href || baseHref;
  const hasRealLink = Boolean(effectiveHref);

  if ((publishIntent || statusRaw === "available") && !hasRealLink) {
    return {
      error:
        "Impossible de publier ou de marquer « disponible » une ressource sans lien réel.",
    };
  }

  const previous = await readResourceOverride(resourceId);

  const override: ResourceOverride = {
    status: statusRaw,
    href: href || undefined,
    label: label || undefined,
    durationLabel: durationLabel || undefined,
    verified,
    published: publishIntent,
    updatedAt: new Date().toISOString(),
    updatedBy: ACTOR,
  };

  await writeResourceOverride(resourceId, override);

  await appendAuditLog({
    actor: ACTOR,
    action: previous?.published && !publishIntent ? "dépublication" : "modification",
    resourceId,
    details: `statut=${statusRaw} publié=${publishIntent ? "oui" : "non"} lien=${
      hasRealLink ? "réel" : "absent"
    }`,
  });

  revalidatePath("/admin/resources");
  revalidatePath("/admin");
  revalidatePath("/admin/journal");

  return { success: "Ressource mise à jour." };
}

export async function unpublishResourceAction(resourceId: string): Promise<void> {
  const previous = await readResourceOverride(resourceId);
  if (!previous) {
    redirect(`/admin/resources/${encodeURIComponent(resourceId)}`);
  }

  await writeResourceOverride(resourceId, {
    ...previous,
    published: false,
    status: previous.href ? previous.status : "in-preparation",
    updatedAt: new Date().toISOString(),
    updatedBy: ACTOR,
  });

  await appendAuditLog({
    actor: ACTOR,
    action: "dépublication",
    resourceId,
    details: "Dépubliée depuis la fiche ressource (confirmation requise côté UI).",
  });

  revalidatePath("/admin/resources");
  revalidatePath("/admin");
  revalidatePath("/admin/journal");
  redirect(`/admin/resources/${encodeURIComponent(resourceId)}`);
}

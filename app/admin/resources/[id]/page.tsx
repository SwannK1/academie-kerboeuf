import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminResourceById } from "@/lib/admin/catalog";
import { ResourceEditForm } from "@/app/admin/resources/[id]/resource-edit-form";
import { unpublishResourceAction } from "@/app/admin/resources/actions";
import { UnpublishButton } from "@/app/admin/resources/[id]/unpublish-button";

export default async function AdminResourceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getAdminResourceById(id);

  if (!row) notFound();

  return (
    <AdminShell title="Modifier une ressource">
      <Link
        href="/admin/resources"
        className="text-xs font-bold uppercase tracking-[0.12em] text-muted hover:text-foreground"
      >
        ← Retour à la liste
      </Link>

      <div className="mt-6 rounded-md border border-white/10 bg-panel-soft p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-jade">
          {row.levelLabel} · {row.subdomainTitle}
        </p>
        <h2 className="mt-2 text-xl font-black text-foreground">{row.lessonTitle}</h2>
        <p className="mt-1 text-sm text-muted">
          Ressource : {row.kindLabel} · Compétence : {row.competency}
        </p>

        <ResourceEditForm row={row} />

        {row.published ? (
          <div className="mt-6 border-t border-white/10 pt-5">
            <UnpublishButton action={unpublishResourceAction.bind(null, row.id)} />
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}

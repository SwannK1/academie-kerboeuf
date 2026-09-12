import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminResourceCatalog } from "@/lib/admin/catalog";

const statusLabels: Record<string, string> = {
  available: "Disponible",
  "in-preparation": "En préparation",
  planned: "À venir",
};

export default async function AdminResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; incomplete?: string; status?: string }>;
}) {
  const { level, incomplete, status } = await searchParams;
  const rows = await getAdminResourceCatalog();

  const filtered = rows.filter((row) => {
    if (level && row.level !== level) return false;
    if (incomplete === "1" && row.hasRealHref) return false;
    if (status && row.effectiveStatus !== status) return false;
    return true;
  });

  return (
    <AdminShell title="Ressources">
      <div className="flex flex-wrap gap-2">
        {["cp", "ce1", "ce2"].map((lvl) => (
          <Link
            key={lvl}
            href={`/admin/resources?level=${lvl}`}
            className={`rounded border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] transition ${
              level === lvl
                ? "border-jade/35 bg-jade/10 text-jade"
                : "border-white/10 bg-white/[0.03] text-muted hover:text-foreground"
            }`}
          >
            {lvl.toUpperCase()}
          </Link>
        ))}
        <Link
          href="/admin/resources?incomplete=1"
          className={`rounded border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] transition ${
            incomplete === "1"
              ? "border-ember/35 bg-ember/10 text-ember"
              : "border-white/10 bg-white/[0.03] text-muted hover:text-foreground"
          }`}
        >
          Sans lien réel
        </Link>
        <Link
          href="/admin/resources"
          className="rounded border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted transition hover:text-foreground"
        >
          Réinitialiser
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-xs font-bold uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3">Niveau</th>
              <th className="px-4 py-3">Sous-domaine</th>
              <th className="px-4 py-3">Leçon</th>
              <th className="px-4 py-3">Ressource</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Lien réel</th>
              <th className="px-4 py-3">Publiée</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-white/5">
                <td className="px-4 py-3 text-muted">{row.levelLabel}</td>
                <td className="px-4 py-3 text-muted">{row.subdomainTitle}</td>
                <td className="px-4 py-3 text-foreground">{row.lessonTitle}</td>
                <td className="px-4 py-3 text-muted">{row.kindLabel}</td>
                <td className="px-4 py-3">{statusLabels[row.effectiveStatus]}</td>
                <td className="px-4 py-3">
                  {row.hasRealHref ? (
                    <span className="text-jade">Oui</span>
                  ) : (
                    <span className="text-ember">Non</span>
                  )}
                </td>
                <td className="px-4 py-3">{row.published ? "Oui" : "Non"}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/resources/${encodeURIComponent(row.id)}`}
                    className="text-xs font-bold uppercase tracking-[0.12em] text-jade hover:underline"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-muted">
                  Aucune ressource ne correspond à ce filtre.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

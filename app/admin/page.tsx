import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminResourceCatalog } from "@/lib/admin/catalog";

export default async function AdminDashboardPage() {
  const rows = await getAdminResourceCatalog();

  const total = rows.length;
  const published = rows.filter((row) => row.published).length;
  const available = rows.filter((row) => row.effectiveStatus === "available").length;
  const missingLink = rows.filter((row) => !row.hasRealHref).length;
  const incomplete = rows.filter(
    (row) => row.effectiveStatus !== "planned" && !row.hasRealHref,
  );
  const unverified = rows.filter((row) => !row.hasRealHref && !row.verified).length;

  const byLevel = ["cp", "ce1", "ce2"] as const;

  const stats = [
    { label: "Ressources suivies", value: total },
    { label: "Publiées", value: published },
    { label: "Statut disponible", value: available },
    { label: "Sans lien réel", value: missingLink },
    { label: "À vérifier", value: unverified },
  ];

  return (
    <AdminShell title="Tableau de bord">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md border border-white/10 bg-panel-soft p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{stat.label}</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-black text-foreground">Niveaux, matières et domaines</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {byLevel.map((level) => {
            const levelRows = rows.filter((row) => row.level === level);
            const subdomains = new Set(levelRows.map((row) => `${row.domainSlug}/${row.subdomainSlug}`));
            return (
              <div key={level} className="rounded-md border border-white/10 bg-panel-soft p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-jade">
                  {level.toUpperCase()}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {subdomains.size} sous-domaine(s) suivi(s) · {levelRows.length} ressource(s)
                </p>
                <Link
                  href={`/admin/resources?level=${level}`}
                  className="mt-4 inline-flex rounded border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted transition hover:bg-white/[0.08] hover:text-foreground"
                >
                  Voir les ressources
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-foreground">Contenus incomplets</h2>
          <Link
            href="/admin/resources?incomplete=1"
            className="text-xs font-bold uppercase tracking-[0.12em] text-jade hover:underline"
          >
            Tout voir
          </Link>
        </div>
        <p className="mt-2 text-sm text-muted">
          Ressources sans lien réel — ne peuvent pas être publiées tant qu’elles ne sont pas
          complétées.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-xs font-bold uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="px-4 py-3">Leçon</th>
                <th className="px-4 py-3">Ressource</th>
                <th className="px-4 py-3">Niveau</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {incomplete.slice(0, 10).map((row) => (
                <tr key={row.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-foreground">{row.lessonTitle}</td>
                  <td className="px-4 py-3 text-muted">{row.kindLabel}</td>
                  <td className="px-4 py-3 text-muted">{row.levelLabel}</td>
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
              {incomplete.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-muted">
                    Aucun contenu incomplet détecté.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}

import { AdminShell } from "@/components/admin/AdminShell";
import { readAuditLog } from "@/lib/admin/audit-log";

export default async function AdminJournalPage() {
  const entries = await readAuditLog();

  return (
    <AdminShell title="Journal des modifications">
      <p className="text-sm text-muted">
        Dernières actions effectuées depuis l’espace administrateur (300 entrées max, stockage
        local serveur).
      </p>

      <div className="mt-6 overflow-x-auto rounded-md border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-xs font-bold uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Auteur</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Ressource</th>
              <th className="px-4 py-3">Détails</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-t border-white/5">
                <td className="px-4 py-3 text-muted">
                  {new Date(entry.timestamp).toLocaleString("fr-FR")}
                </td>
                <td className="px-4 py-3 text-muted">{entry.actor}</td>
                <td className="px-4 py-3 text-foreground">{entry.action}</td>
                <td className="px-4 py-3 text-muted">{entry.resourceId}</td>
                <td className="px-4 py-3 text-muted">{entry.details}</td>
              </tr>
            ))}
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  Aucune modification enregistrée pour l’instant.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

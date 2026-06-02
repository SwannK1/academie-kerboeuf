import type { Metadata } from "next";
import { getAllSequenceRows } from "@/content/suivi-sequences-data";
import { SequencesTable } from "./_components/sequences-table";

export const metadata: Metadata = {
  title: "Suivi des séquences | Académie Kerboeuf",
  description: "Tableau de bord interne de l'avancement des séquences pédagogiques.",
  robots: { index: false, follow: false },
};

export default function SuiviSequencesPage() {
  const rows = getAllSequenceRows();

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Suivi des séquences pédagogiques
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Vue interne — {rows.length} séquences recensées sur CP, CE1, CE2, CM1
          et CM2. Données statiques uniquement.
        </p>
      </div>
      <SequencesTable rows={rows} />
    </main>
  );
}

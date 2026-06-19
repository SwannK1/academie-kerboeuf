import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Réussir son entrée en 6e | Académie Kerboeuf",
  description:
    "Comprendre les changements entre le CM2 et le collège pour aborder la 6e avec méthode.",
};

const blocks = [
  {
    title: "Un nouveau rythme",
    description:
      "Plusieurs professeurs, des salles différentes, un emploi du temps plus chargé — s'y préparer avant la rentrée.",
    status: "bientôt",
  },
  {
    title: "De nouveaux outils",
    description:
      "Agenda, cahier par matière, classeur — comprendre comment s'organiser au collège.",
    status: "bientôt",
  },
  {
    title: "Un travail plus autonome",
    description:
      "Les professeurs attendent que tu travailles chez toi sans qu'on te le rappelle chaque fois.",
    status: "bientôt",
  },
  {
    title: "Des méthodes à installer",
    description:
      "Lire les consignes, répondre clairement, apprendre une leçon — des méthodes qui s'apprennent.",
    status: "bientôt",
  },
] as const;

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <Link
          href="/college/6e"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800"
        >
          ← Retour à la 6e
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Réussir son entrée en 6e
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Comprendre les changements entre le CM2 et le collège.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {blocks.map((block) => (
          <div
            key={block.title}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {block.title}
              </h2>
              <PublicStatusBadge status={getPublicStatus(block.status)} />
            </div>
            <p className="text-sm text-gray-600">{block.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

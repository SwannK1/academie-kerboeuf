import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Méthodes de travail 6e | Académie Kerboeuf",
  description:
    "Préparer son cartable, noter ses devoirs, relire et s'organiser pour réussir au collège.",
};

const blocks = [
  {
    title: "Préparer son cartable",
    description:
      "Vérifier son emploi du temps, anticiper le matériel nécessaire et ne rien oublier.",
    status: "bientôt",
  },
  {
    title: "Noter ses devoirs",
    description:
      "Utiliser un agenda ou un carnet pour noter les devoirs chaque jour en cours.",
    status: "bientôt",
  },
  {
    title: "Relire ses cours",
    description:
      "Reprendre ses notes le soir même pour fixer les connaissances avant de les réviser.",
    status: "bientôt",
  },
  {
    title: "S'organiser sur la semaine",
    description:
      "Planifier les révisions sur plusieurs jours pour éviter de tout faire la veille.",
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
          Méthodes de travail
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Préparer son cartable, noter ses devoirs, relire et s&apos;organiser.
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

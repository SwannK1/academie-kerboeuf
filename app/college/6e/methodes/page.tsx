import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Méthodes de travail — 6e | Académie Kerboeuf",
  description:
    "Les méthodes essentielles pour bien démarrer au collège : s'organiser, noter les devoirs, relire une leçon.",
};

const methodes = [
  {
    slug: "preparer-cartable",
    title: "Préparer son cartable",
    description:
      "Anticiper les cours du lendemain, vérifier le matériel nécessaire et éviter les oublis.",
    status: "in-progress",
  },
  {
    slug: "noter-devoirs",
    title: "Noter les devoirs",
    description:
      "Utiliser l'agenda scolaire efficacement : noter la matière, la date et la nature du travail demandé.",
    status: "in-progress",
  },
  {
    slug: "relire-lecon",
    title: "Relire une leçon",
    description:
      "Savoir identifier les points essentiels d'une leçon et les réviser à voix haute ou par écrit.",
    status: "in-progress",
  },
  {
    slug: "emploi-du-temps",
    title: "Se repérer dans l'emploi du temps",
    description:
      "Lire un emploi du temps hebdomadaire, repérer les salles et anticiper les changements.",
    status: "in-progress",
  },
  {
    slug: "demander-aide",
    title: "Demander de l'aide au bon moment",
    description:
      "Identifier quand et à qui s'adresser : professeur, CPE, documentaliste ou camarade.",
    status: "in-progress",
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
          Méthodes de travail — 6e
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Les méthodes essentielles pour bien démarrer au collège.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {methodes.map((methode) => (
          <div
            key={methode.slug}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {methode.title}
              </h2>
              <PublicStatusBadge status={getPublicStatus(methode.status)} />
            </div>
            <p className="text-sm text-gray-600">{methode.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

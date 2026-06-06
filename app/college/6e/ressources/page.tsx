import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Ressources prioritaires 6e | Académie Kerboeuf",
  description:
    "Cinq compétences transversales pour réussir l'entrée au collège.",
};

const ressourcesPrioritaires = [
  {
    title: "Lire une consigne complexe",
    description:
      "Identifier les verbes de consigne, repérer ce qui est attendu et organiser sa réponse.",
    status: "bientôt",
  },
  {
    title: "Organiser son cahier et son classeur",
    description:
      "Structurer ses documents par matière, dater les cours et retrouver facilement ses notes.",
    status: "bientôt",
  },
  {
    title: "Répondre avec une phrase complète",
    description:
      "Reformuler la question dans sa réponse et construire une phrase grammaticalement correcte.",
    status: "bientôt",
  },
  {
    title: "Apprendre une leçon efficacement",
    description:
      "Utiliser la relecture active, les schémas et la répétition espacée pour mémoriser.",
    status: "bientôt",
  },
  {
    title: "Résoudre un problème en plusieurs étapes",
    description:
      "Lire l'énoncé, identifier les données, choisir une méthode et vérifier le résultat.",
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
          Ressources prioritaires 6e
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Cinq compétences transversales pour réussir l&apos;entrée au collège.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {ressourcesPrioritaires.map((ressource) => (
          <div
            key={ressource.title}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {ressource.title}
              </h2>
              <PublicStatusBadge status={getPublicStatus(ressource.status)} />
            </div>
            <p className="mb-3 text-sm text-gray-600">{ressource.description}</p>
            <p className="text-xs text-gray-400">Ressource en préparation</p>
          </div>
        ))}
      </div>
    </main>
  );
}

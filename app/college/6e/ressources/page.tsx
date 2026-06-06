import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Ressources de 6e | Académie Kerboeuf",
  description: "Cinq compétences prioritaires pour réussir l'entrée au collège.",
};

const ressources = [
  {
    slug: "lire-consigne-complexe",
    title: "Lire une consigne complexe",
    description:
      "Repérer les mots-clés d'une consigne, identifier ce qui est demandé et reformuler l'attendu avant de commencer.",
    status: "bientôt",
  },
  {
    slug: "organiser-cahier-classeur",
    title: "Organiser son cahier et son classeur",
    description:
      "Mettre en place un système de rangement efficace : intercalaires, codes couleur, dates et numéros de page.",
    status: "bientôt",
  },
  {
    slug: "repondre-phrase-complete",
    title: "Répondre avec une phrase complète",
    description:
      "Construire une réponse organisée : reprendre l'information de la question, formuler une phrase sujet-verbe-complément et vérifier la cohérence.",
    status: "bientôt",
  },
  {
    slug: "apprendre-lecon-efficacement",
    title: "Apprendre une leçon efficacement",
    description:
      "Utiliser des stratégies de mémorisation active : relecture espacée, auto-questionnement, fiches de résumé et mind maps.",
    status: "bientôt",
  },
  {
    slug: "resoudre-probleme-etapes",
    title: "Résoudre un problème en plusieurs étapes",
    description:
      "Décomposer un problème complexe : comprendre l'énoncé, identifier les étapes, choisir les outils adaptés et vérifier la vraisemblance du résultat.",
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
          Ressources de 6e
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Cinq compétences prioritaires pour réussir l&apos;entrée au collège.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {ressources.map((ressource) => (
          <div
            key={ressource.slug}
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

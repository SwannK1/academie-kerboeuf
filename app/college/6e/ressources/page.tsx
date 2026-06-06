import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatus } from "@/content/public-status";
import { sixiemeResources } from "@/content/levels/college/6e-resources";

export const metadata: Metadata = {
  title: "Ressources de 6e | Académie Kerboeuf",
  description: "Méthodes de travail prioritaires pour réussir l'entrée en 6e.",
};

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
          Méthodes de travail prioritaires pour réussir l&apos;entrée en 6e.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {sixiemeResources.map((resource) => (
          <div
            key={resource.slug}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {resource.title}
              </h2>
              <PublicStatusBadge status={getPublicStatus(resource.status)} />
            </div>
            <p className="mb-3 text-sm text-gray-600">{resource.description}</p>
            <p className="text-xs text-gray-400">Ressource en préparation</p>
          </div>
        ))}
      </div>
    </main>
  );
}

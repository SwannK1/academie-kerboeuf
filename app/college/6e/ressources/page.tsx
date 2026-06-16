import type { Metadata } from "next";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { sixiemeResources } from "@/content/levels/college/6e-resources";

export const metadata: Metadata = {
  title: "Ressources méthode 6e | Académie Kerboeuf",
  description:
    "Méthodes de travail prioritaires pour réussir l'entrée en 6e : lire une consigne, organiser son classeur, apprendre une leçon.",
};

export default function SixiemeRessourcesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">
        Ressources méthode — 6e
      </h1>
      <p className="mb-10 text-slate-600">
        Méthodes de travail prioritaires pour réussir l&apos;entrée en 6e.
      </p>

      <ul className="flex flex-col gap-4">
        {sixiemeResources.map((resource) => (
          <li
            key={resource.slug}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <h2 className="text-base font-semibold text-slate-800">
                {resource.label}
              </h2>
              <PublicStatusBadge status={resource.status} />
            </div>
            <p className="text-sm text-slate-600">{resource.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

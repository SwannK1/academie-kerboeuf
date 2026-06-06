import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Accompagnement 6e | Académie Kerboeuf",
  description:
    "Un tableau de bord pour accéder aux ressources, méthodes et parcours d'entrée en 6e.",
};

const cards = [
  {
    title: "Ressources prioritaires 6e",
    description:
      "Lire les consignes, répondre clairement, apprendre une leçon et résoudre un problème.",
    href: "/college/6e/ressources",
    status: "en-cours",
  },
  {
    title: "Méthodes de travail",
    description:
      "Préparer son cartable, noter ses devoirs, relire et s'organiser.",
    href: "/college/6e/methodes",
    status: "en-cours",
  },
  {
    title: "Réussir son entrée en 6e",
    description: "Comprendre les changements entre le CM2 et le collège.",
    href: "/college/6e/reussir-son-entree-en-6e",
    status: "en-cours",
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
          Accompagnement 6e
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Un accès organisé aux ressources, méthodes et parcours pour réussir
          l&apos;entrée au collège.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {card.title}
              </h2>
              <PublicStatusBadge status={getPublicStatus(card.status)} />
            </div>
            <p className="mb-4 text-sm text-gray-600">{card.description}</p>
            <span className="text-sm font-semibold text-gray-700 transition group-hover:translate-x-1 inline-flex">
              Accéder →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

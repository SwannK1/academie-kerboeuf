import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Ressources de 6e | Académie Kerboeuf",
  description: "Des ressources pour réussir l'entrée au collège.",
};

const blocks = [
  {
    title: "Méthodologie collège",
    description:
      "Apprendre à s'organiser, prendre des notes et travailler en autonomie au collège.",
    status: "upcoming",
  },
  {
    title: "Français",
    description:
      "Lecture, compréhension de texte, grammaire, orthographe et expression écrite.",
    status: "upcoming",
  },
  {
    title: "Mathématiques",
    description:
      "Nombres et calculs, géométrie, grandeurs et mesures adaptés au programme de 6e.",
    status: "upcoming",
  },
  {
    title: "Histoire-Géographie",
    description:
      "Les grandes périodes historiques et l'organisation du monde au programme de 6e.",
    status: "upcoming",
  },
  {
    title: "Sciences",
    description:
      "Découverte des sciences de la vie et de la Terre ainsi que des sciences physiques.",
    status: "upcoming",
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
          Des ressources pour réussir l&apos;entrée au collège.
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
            <p className="mb-3 text-sm text-gray-600">{block.description}</p>
            <p className="text-xs text-gray-400">Ressources en préparation</p>
          </div>
        ))}
      </div>
    </main>
  );
}

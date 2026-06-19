import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Préparer la rentrée | Académie Kerboeuf",
  description:
    "Outils locaux pour préparer la rentrée : réunion de rentrée avec les familles et organisation générale.",
};

const RENTREE_TOOLS = [
  {
    title: "Réunion parents d’élèves",
    description:
      "Informations pratiques, ordre du jour, documents à préparer, questions à anticiper et suivi après la réunion.",
    href: "/enseignants/rentree/reunion-parents",
  },
] as const;

export default function TeacherBackToSchoolPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Rentrée" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer la rentrée
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Des outils locaux, sans compte ni partage, pour préparer la
            rentrée avec les familles et organiser la classe.
          </p>
        </header>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2" role="list">
          {RENTREE_TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="block h-full rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-jade/40"
              >
                <p className="text-lg font-black text-foreground">
                  {tool.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {tool.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Univers | Académie Kerboeuf",
  description:
    "L'Académie Kerboeuf — personnages, lieux et méthode : les trois portes d'entrée de l'univers pédagogique.",
};

const ENTRIES = [
  {
    title: "Personnages",
    description:
      "Les élèves et les professeurs qui accompagnent chaque niveau de l'Académie.",
    href: "/personnages",
    accent: "border-jade/35 hover:border-jade/55 hover:bg-jade/[0.06]",
    accentText: "text-jade",
  },
  {
    title: "Lieux",
    description:
      "La carte de l'Académie et les espaces où se déroulent les apprentissages.",
    href: "/carte",
    accent: "border-sky/35 hover:border-sky/55 hover:bg-sky/[0.06]",
    accentText: "text-sky",
  },
  {
    title: "Méthode",
    description:
      "Comment fonctionne l'Académie : du niveau jusqu'aux fiches PDF.",
    href: "/methode",
    accent: "border-gold/35 hover:border-gold/55 hover:bg-gold/[0.06]",
    accentText: "text-gold",
  },
] as const;

export default function UniversPage() {
  return (
    <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Univers" }]}
        />

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-jade">
          Académie Kerboeuf
        </p>
        <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
          L&apos;univers de l&apos;Académie
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          L&apos;Académie Kerboeuf est un univers pédagogique fictif au
          service des apprentissages. Trois entrées pour le découvrir.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {ENTRIES.map((entry) => (
            <Link
              key={entry.title}
              href={entry.href}
              className={`group flex flex-col rounded-md border bg-white/[0.04] p-6 transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold/60 ${entry.accent}`}
            >
              <h2 className="text-2xl font-black text-foreground">
                {entry.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {entry.description}
              </p>
              <span
                className={`mt-6 inline-flex text-sm font-black transition group-hover:translate-x-1 ${entry.accentText}`}
              >
                Découvrir →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

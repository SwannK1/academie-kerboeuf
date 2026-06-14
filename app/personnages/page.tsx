import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description:
    "Les élèves et les professeurs de l'Académie Kerboeuf, par cycle.",
};

const ENTRIES = [
  {
    title: "Élèves",
    description:
      "Les personnages-élèves qui guident chaque niveau, de la maternelle au lycée.",
    href: "/personnages/eleves",
    accent: "border-jade/35 hover:border-jade/55 hover:bg-jade/[0.06]",
    accentText: "text-jade",
  },
  {
    title: "Professeurs",
    description:
      "Les professeurs référents, chacun porteur d'une méthode et d'une posture.",
    href: "/personnages/professeurs",
    accent: "border-gold/35 hover:border-gold/55 hover:bg-gold/[0.06]",
    accentText: "text-gold",
  },
] as const;

export default function PersonnagesPage() {
  return (
    <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Personnages" }]}
        />

        <h1 className="mt-6 text-4xl font-black text-foreground sm:text-5xl">
          Personnages
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
          Les guides qui accompagnent chaque niveau de l&apos;Académie.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
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

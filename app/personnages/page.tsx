import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description:
    "Les personnages de l'Académie Kerboeuf : élèves-guides et professeurs.",
};

const CARDS = [
  {
    title: "Élèves-guides",
    description:
      "Les personnages qui accompagnent les élèves, niveau par niveau.",
    href: "/personnages/eleves",
    accent: "jade" as const,
  },
  {
    title: "Professeurs",
    description:
      "Les professeurs référents de l'Académie, par cycle et par niveau.",
    href: "/personnages/professeurs",
    accent: "gold" as const,
  },
];

const accentBorder: Record<"jade" | "gold", string> = {
  jade: "border-jade/35 hover:border-jade/60 hover:bg-jade/[0.06]",
  gold: "border-gold/35 hover:border-gold/60 hover:bg-gold/[0.06]",
};

const accentText: Record<"jade" | "gold", string> = {
  jade: "text-jade",
  gold: "text-gold",
};

export default function PersonnagesPage() {
  return (
    <main className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Personnages" }]}
        />

        <h1 className="mt-6 text-4xl font-black text-foreground sm:text-5xl">
          Personnages
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
          Deux familles de personnages accompagnent l&apos;Académie.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`group flex flex-col rounded-md border bg-white/[0.04] p-6 transition hover:-translate-y-1 ${accentBorder[card.accent]}`}
            >
              <h2 className="text-xl font-black text-foreground">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {card.description}
              </p>
              <span
                className={`mt-5 inline-flex text-sm font-black transition group-hover:translate-x-1 ${accentText[card.accent]}`}
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

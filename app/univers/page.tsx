import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Univers | Académie Kerboeuf",
  description:
    "L'Académie Kerboeuf — porte d'entrée vers les personnages, les lieux et le fonctionnement de l'Académie.",
};

type PortalCard = {
  title: string;
  description: string;
  href?: string;
  accent: "jade" | "gold" | "sky";
};

const CARDS: PortalCard[] = [
  {
    title: "Personnages",
    description:
      "Les élèves-guides et les professeurs qui accompagnent chaque niveau de l'Académie.",
    href: "/personnages",
    accent: "jade",
  },
  {
    title: "Espaces et lieux de l'Académie",
    description:
      "La carte de l'Académie, les lieux pédagogiques et le rôle de chacun.",
    href: "/carte",
    accent: "sky",
  },
  {
    title: "Comment fonctionne l'Académie",
    description:
      "Le principe pédagogique : du niveau à la fiche, comment s'organisent les apprentissages.",
    href: "/methode",
    accent: "gold",
  },
];

const accentBorder: Record<PortalCard["accent"], string> = {
  jade: "border-jade/35 hover:border-jade/60 hover:bg-jade/[0.06]",
  sky: "border-sky/35 hover:border-sky/60 hover:bg-sky/[0.06]",
  gold: "border-gold/35 hover:border-gold/60 hover:bg-gold/[0.06]",
};

const accentText: Record<PortalCard["accent"], string> = {
  jade: "text-jade",
  sky: "text-sky",
  gold: "text-gold",
};

export default function UniversPage() {
  return (
    <main className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
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
          Choisissez une grande partie de l&apos;univers pour la découvrir.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {CARDS.map((card) => {
            const content = (
              <>
                <h2 className="text-xl font-black text-foreground">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {card.description}
                </p>
                {card.href ? (
                  <span
                    className={`mt-5 inline-flex text-sm font-black transition group-hover:translate-x-1 ${accentText[card.accent]}`}
                  >
                    Découvrir →
                  </span>
                ) : (
                  <span className="mt-5 inline-flex rounded bg-white/[0.06] px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    En préparation
                  </span>
                )}
              </>
            );

            if (card.href) {
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group flex flex-col rounded-md border bg-white/[0.04] p-6 transition hover:-translate-y-1 ${accentBorder[card.accent]}`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={card.title}
                className="flex flex-col rounded-md border border-white/10 bg-white/[0.025] p-6"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Espace enseignants | Académie Kerboeuf",
  description: "Tableau de bord des outils pour organiser sa classe.",
};

type ActionCard = {
  title: string;
  href?: string;
};

type ActionSection = {
  title: string;
  cards: ActionCard[];
};

const SECTIONS: ActionSection[] = [
  {
    title: "Organiser ma classe",
    cards: [
      { title: "Faire ma programmation", href: "/enseignants/programmation" },
      { title: "Construire mon emploi du temps", href: "/enseignants/emploi-du-temps" },
      { title: "Préparer les premières semaines" },
      { title: "Préparer ma rentrée" },
    ],
  },
  {
    title: "Préparer le quotidien",
    cards: [
      { title: "Préparer une séance" },
      { title: "Plan de classe" },
      { title: "Suivi de classe" },
    ],
  },
  {
    title: "Préparer la rentrée",
    cards: [
      { title: "Mes commandes" },
      { title: "Réunion parents" },
    ],
  },
];

export default function TeachersPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants" },
          ]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl">
            Mes outils
          </h1>
        </header>

        <div className="mt-10 space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-black text-foreground">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {section.cards.map((card) => (
                  <ActionTile key={card.title} {...card} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function ActionTile({ title, href }: ActionCard) {
  if (href) {
    return (
      <Link
        href={href}
        className="flex min-h-16 items-center justify-between rounded-md border border-sky/25 bg-sky/[0.05] px-5 text-sm font-black text-foreground transition hover:-translate-y-0.5 hover:border-sky/45 hover:bg-sky/[0.09]"
      >
        {title}
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <div className="flex min-h-16 items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-5 text-sm font-black text-muted">
      {title}
      <PublicStatusBadge status="upcoming" />
    </div>
  );
}

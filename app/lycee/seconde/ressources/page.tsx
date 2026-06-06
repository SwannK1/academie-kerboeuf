import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { ProgramStatus } from "@/content/program-types";

export const metadata: Metadata = {
  title: "Ressources de Seconde | Académie Kerboeuf",
  description:
    "Méthode, français et mathématiques pour réussir son entrée au lycée.",
};

type Block = {
  title: string;
  status: ProgramStatus;
  sequences: string[];
};

const blocks: Block[] = [
  {
    title: "Méthodologie lycée",
    status: "in-progress",
    sequences: [
      "Prendre des notes efficacement",
      "Organiser son travail personnel",
      "Préparer une épreuve écrite",
    ],
  },
  {
    title: "Français",
    status: "in-progress",
    sequences: [
      "Analyser un texte littéraire",
      "Rédiger un commentaire de texte",
      "Maîtriser la dissertation",
    ],
  },
  {
    title: "Mathématiques",
    status: "in-progress",
    sequences: [
      "Fonctions et représentations graphiques",
      "Géométrie repérée",
      "Statistiques et probabilités",
    ],
  },
];

export default function SecondeRessourcesPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Lycée", href: "/lycee" },
              { label: "Seconde", href: "/lycee/seconde" },
              { label: "Ressources" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Lycée · Seconde
            </p>
            <PublicStatusBadge status="in-progress" />
          </div>
          <h1 className="mt-6 text-5xl font-black leading-[0.95] text-foreground sm:text-6xl">
            Ressources de Seconde
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
            Méthode, français et mathématiques pour réussir son entrée au lycée.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block) => (
              <div
                key={block.title}
                className="rounded-md border border-white/10 bg-white/[0.035] p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-black text-foreground">
                    {block.title}
                  </h2>
                  <PublicStatusBadge status={block.status} />
                </div>

                <ul className="mt-5 space-y-2">
                  {block.sequences.map((seq) => (
                    <li
                      key={seq}
                      className="flex items-start gap-2 text-sm leading-6 text-muted"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-jade/60" />
                      {seq}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 rounded border border-white/8 bg-white/[0.02] px-3 py-2 text-xs text-muted/70">
                  Ressources en préparation
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/lycee/seconde"
              className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
            >
              ← Retour à la Seconde
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

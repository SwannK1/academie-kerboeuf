import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Méthodologie | Académie Kerboeuf",
  description:
    "Des repères pour apprendre, s'organiser et progresser. Ressources méthodologiques transversales pour le primaire, le collège et le lycée.",
};

type MethodBlock = {
  title: string;
  description: string;
  level: string;
  status: unknown;
};

const methodBlocks: MethodBlock[] = [
  {
    title: "Comprendre une consigne",
    description:
      "Identifier les mots clés, repérer le verbe de consigne et savoir ce qui est attendu avant de commencer.",
    level: "Primaire · Collège · Lycée",
    status: "bientôt",
  },
  {
    title: "Organiser son travail",
    description:
      "Planifier ses tâches, prioriser, utiliser un agenda ou un carnet de bord pour ne rien oublier.",
    level: "Primaire · Collège · Lycée",
    status: "bientôt",
  },
  {
    title: "Prendre des notes",
    description:
      "Sélectionner l'essentiel, utiliser des abréviations et structurer ses notes pour les relire facilement.",
    level: "Collège · Lycée",
    status: "bientôt",
  },
  {
    title: "Justifier une réponse",
    description:
      "Construire une argumentation courte : affirmer, expliquer, illustrer avec un exemple tiré du document.",
    level: "Primaire · Collège · Lycée",
    status: "bientôt",
  },
  {
    title: "Réviser efficacement",
    description:
      "Espacer les révisions, se tester, utiliser des fiches synthèse et éviter la relecture passive.",
    level: "Primaire · Collège · Lycée",
    status: "bientôt",
  },
  {
    title: "Préparer un oral",
    description:
      "Structurer sa prise de parole, mémoriser les points clés et s'entraîner à voix haute.",
    level: "Collège · Lycée",
    status: "bientôt",
  },
];

export default function MethodologiePage() {
  const blocks = methodBlocks.map((block) => ({
    ...block,
    status: getPublicStatus(block.status),
  }));

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Ressources", href: "/ressources" },
              { label: "Méthodologie" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.06),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Transversal · Tous niveaux
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Méthodologie
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Des repères pour apprendre, s&apos;organiser et progresser.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {blocks.map((block) => (
              <div
                key={block.title}
                className="rounded-md border border-white/10 bg-white/[0.035] p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-black text-foreground">
                    {block.title}
                  </h2>
                  <PublicStatusBadge status={block.status} className="shrink-0" />
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  {block.level}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-white/10 bg-white/[0.035] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            À retenir
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Les méthodes servent toutes les matières. Maîtriser ces repères dès
            le primaire permet d&apos;aborder le collège et le lycée avec des outils
            solides, quelle que soit la discipline.
          </p>
          <div className="mt-6">
            <Link
              href="/ressources"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              ← Retour aux ressources
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

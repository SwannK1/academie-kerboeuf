import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Ressources imprimables | Académie Kerboeuf",
  description:
    "Des supports pensés pour la classe, l'entraînement et l'évaluation.",
};

type PrintableSection = {
  title: string;
  description: string;
  status: unknown;
};

const sections: PrintableSection[] = [
  {
    title: "Leçons courtes",
    description:
      "Une page par notion, conçue pour être distribuée ou affichée. Synthèse de la règle, exemples et espace mémo.",
    status: "à venir",
  },
  {
    title: "Exercices progressifs",
    description:
      "Séries graduées du plus simple au plus complexe, adaptées aux différents rythmes d'acquisition.",
    status: "à venir",
  },
  {
    title: "Évaluations",
    description:
      "Évaluations courtes par compétence, prêtes à distribuer en fin de séquence.",
    status: "à venir",
  },
  {
    title: "Corrigés enseignants",
    description:
      "Versions corrigées réservées à l'enseignant, avec indicateurs de réussite.",
    status: "à venir",
  },
  {
    title: "Fiches méthodologiques",
    description:
      "Aide-mémoire de méthode pour les élèves : comment lire une consigne, organiser son travail, vérifier sa réponse.",
    status: "à venir",
  },
];

export default function ImprimablesPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Ressources", href: "/ressources" },
              { label: "Imprimables" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.06),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Supports classe
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Ressources imprimables
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Des supports pensés pour la classe, l&apos;entraînement et
            l&apos;évaluation.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-md border border-white/10 bg-white/[0.035] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-base font-black text-foreground">
                    {section.title}
                  </h2>
                  <PublicStatusBadge status={section.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-white/10 bg-white/[0.035] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Politique de mise à disposition
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucun document n&apos;est proposé au téléchargement tant qu&apos;il
            n&apos;est pas finalisé.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/ressources"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-foreground"
          >
            <span aria-hidden="true">←</span>
            Retour aux ressources
          </Link>
        </div>
      </section>
    </main>
  );
}

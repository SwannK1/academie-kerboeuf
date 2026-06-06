import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Ressources de Seconde | Académie Kerboeuf",
  description:
    "Cinq ressources prioritaires pour réussir son entrée au lycée : méthode, argumentation et résolution.",
};

type Resource = {
  title: string;
  domain: string;
  description: string;
};

const priorityResources: Resource[] = [
  {
    title: "Organiser son travail",
    domain: "Méthodologie lycée",
    description:
      "Planifier ses révisions, structurer ses fiches et gérer ses priorités au quotidien.",
  },
  {
    title: "Prendre des notes efficacement",
    domain: "Méthodologie lycée",
    description:
      "Sélectionner l'essentiel en cours, organiser ses prises de notes et les exploiter ensuite.",
  },
  {
    title: "Rédiger un paragraphe argumenté",
    domain: "Français",
    description:
      "Construire une idée, l'illustrer et la conclure dans un paragraphe cohérent et lisible.",
  },
  {
    title: "Résoudre une équation du premier degré",
    domain: "Mathématiques",
    description:
      "Isoler l'inconnue, effectuer les opérations et vérifier le résultat pas à pas.",
  },
  {
    title: "Gérer son temps pendant un devoir",
    domain: "Méthodologie lycée",
    description:
      "Lire le sujet, répartir le temps par question et relire avant de rendre.",
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
            Ressources prioritaires
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
            Cinq ressources essentielles pour construire les méthodes et les
            compétences fondamentales de la Seconde.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {priorityResources.map((resource) => (
              <div
                key={resource.title}
                className="flex flex-col rounded-md border border-white/10 bg-white/[0.035] p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade/70">
                    {resource.domain}
                  </p>
                  <PublicStatusBadge status="in-progress" />
                </div>
                <h2 className="mt-3 text-lg font-black leading-snug text-foreground">
                  {resource.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  {resource.description}
                </p>
                <p className="mt-5 rounded border border-white/8 bg-white/[0.02] px-3 py-2 text-xs text-muted/70">
                  Ressource en préparation — PDF à venir
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

import type { Metadata } from "next";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Progression de période | Espace enseignants | Académie Kerboeuf",
  description:
    "Ordonnez les séquences d'une période en respectant la logique d'une séquence pour une compétence.",
};

const features = [
  "Choisir une période parmi les 5 périodes de l'année",
  "Ordonner les séquences de la période",
  "Respecter la logique : une séquence pour une compétence",
  "Repérer les compétences déjà couvertes dans la période",
];

export default function PeriodProgressionPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Progression" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">
              Progression de période
            </h1>
            <PublicStatusBadge status="in-progress" />
          </div>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Cet outil aidera à ordonner les séquences d&apos;une période en
            respectant la logique d&apos;une séquence pour une compétence,
            sans
            alourdir la préparation de classe.
          </p>

          <section className="mt-10 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6">
            <h2 className="text-xl font-black text-foreground">
              Fonctionnalités prévues
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}

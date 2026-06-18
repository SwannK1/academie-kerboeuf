import type { Metadata } from "next";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Programmation annuelle | Espace enseignants | Académie Kerboeuf",
  description:
    "Répartissez les compétences du programme sur l'année scolaire, période par période.",
};

const features = [
  "Choisir un niveau et une matière",
  "Répartir les compétences sur les 5 périodes de l'année",
  "Visualiser la charge de travail par période",
  "S'appuyer sur les programmes officiels de l'Éducation nationale",
];

export default function AnnualProgrammingPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Programmation", href: "/enseignants/programmation" },
              { label: "Annuelle" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">
              Programmation annuelle
            </h1>
            <PublicStatusBadge status="in-progress" />
          </div>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Cet outil aidera à répartir les compétences du programme sur les
            périodes de l&apos;année, niveau par niveau et matière par matière, en
            s&apos;appuyant sur les horaires officiels de l&apos;Éducation nationale.
          </p>

          <section className="mt-10 rounded-lg border border-jade/25 bg-jade/[0.05] p-5 sm:p-6">
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

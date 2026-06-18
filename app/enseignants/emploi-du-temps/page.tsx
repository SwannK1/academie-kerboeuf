import type { Metadata } from "next";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Emploi du temps | Espace enseignants | Académie Kerboeuf",
  description:
    "Construisez l'emploi du temps hebdomadaire de votre classe en respectant les 24 heures hebdomadaires à l'école élémentaire.",
};

const principles = [
  "Choix du niveau à venir",
  "Grille hebdomadaire à venir",
  "Compteur des heures par matière à venir",
  "Respect des 24 heures hebdomadaires à l'école élémentaire",
];

export default function WeeklyScheduleToolPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Emploi du temps" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">
              Emploi du temps hebdomadaire
            </h1>
            <PublicStatusBadge status="in-progress" />
          </div>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Cet outil aidera à construire l&apos;emploi du temps de la
            semaine, niveau par niveau, en respectant les horaires officiels
            de l&apos;Éducation nationale.
          </p>

          <section className="mt-10 rounded-lg border border-ember/25 bg-ember/[0.05] p-5 sm:p-6">
            <h2 className="text-xl font-black text-foreground">
              Principe de l&apos;outil
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
              {principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}

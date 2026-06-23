import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SchoolCouncilPlanner } from "@/components/teacher-school-council/SchoolCouncilPlannerClient";

export const metadata: Metadata = {
  title: "Préparer un conseil d'école | Académie Kerboeuf",
  description:
    "Préparez l'ordre du jour, les points à présenter, les décisions et les actions de suivi d'un conseil d'école, sans aucune donnée nominative.",
};

export default function SchoolCouncilPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Conseil d'école" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer un conseil d&apos;école
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Organisez l&apos;ordre du jour, les points à présenter, les décisions
            et les actions de suivi d&apos;un conseil d&apos;école. Aucune donnée
            nominative n&apos;est demandée : tout reste enregistré localement sur
            cet appareil.
          </p>
        </header>

        <div className="mt-10">
          <SchoolCouncilPlanner />
        </div>
      </div>
    </main>
  );
}

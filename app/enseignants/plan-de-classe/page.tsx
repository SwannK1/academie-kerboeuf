import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Plan de classe | Espace enseignants | Académie Kerboeuf",
  description: "Organiser le placement des élèves. Outil à venir.",
};

export default function TeacherClassroomPlanPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Plan de classe" },
          ]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Plan de classe
          </h1>
          <div className="mt-5">
            <PublicStatusBadge status="upcoming" />
          </div>
          <p className="mt-5 text-lg leading-8 text-muted">
            Cet outil pour organiser le placement des élèves n’est pas encore
            disponible.
          </p>
        </header>
      </div>
    </main>
  );
}

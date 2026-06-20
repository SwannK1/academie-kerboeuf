import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherProjectsAndTrips } from "@/components/teacher-projects-and-trips/TeacherProjectsAndTrips";

export const metadata: Metadata = {
  title: "Préparer mes projets et sorties | Académie Kerboeuf",
  description:
    "Organisez vos sorties, intervenants, projets de classe, partenariats et spectacles : objectifs, matériel, budget, autorisations et tâches de préparation.",
};

export default function TeacherProjectsAndTripsPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Projets et sorties" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer mes projets et sorties
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Listez vos sorties, intervenants, projets de classe, partenariats et
            spectacles : objectif pédagogique, matériel, budget estimé,
            autorisations à préparer et tâches de préparation. Aucune
            coordonnée de famille ni donnée d’élève n’est demandée. Vos projets
            sont sauvegardés uniquement sur cet appareil.
          </p>
        </header>

        <TeacherProjectsAndTrips />
      </div>
    </main>
  );
}

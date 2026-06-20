import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassTrackingClient } from "@/components/teacher-class-tracking/TeacherClassTrackingClient";

export const metadata: Metadata = {
  title: "Suivi de classe | Académie Kerboeuf",
  description:
    "Suivez le climat, la participation et les besoins collectifs de votre classe, semaine après semaine, sans aucune observation individuelle.",
};

export default function TeacherClassTrackingPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Suivi de classe" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Suivi de classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Gardez une trace collective et anonyme de la vie de votre classe :
            climat, participation globale, besoins pédagogiques de groupe,
            réussites collectives et objectifs de la semaine. Aucune
            observation individuelle ne doit être saisie ici.
          </p>
        </header>

        <TeacherClassTrackingClient />
      </div>
    </main>
  );
}

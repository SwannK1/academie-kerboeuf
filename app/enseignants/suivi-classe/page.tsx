import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassTracker } from "@/components/academy/TeacherClassTrackerClient";

export const metadata: Metadata = {
  title: "Suivi de classe | Espace enseignants | Académie Kerboeuf",
  description:
    "Garder des observations utiles et préparer les remédiations, sans compte ni partage des données.",
};

export default function TeacherClassTrackerPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
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
            Garder des observations utiles et préparer les remédiations.
          </p>
        </header>

        <div className="mt-10">
          <TeacherClassTracker />
        </div>
      </div>
    </main>
  );
}

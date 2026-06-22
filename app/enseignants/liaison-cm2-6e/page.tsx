import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherCm26eTransitionClient } from "@/components/teacher-cm2-6e-transition/TeacherCm26eTransitionClient";

export const metadata: Metadata = {
  title: "Préparer la liaison CM2-6e | Académie Kerboeuf",
  description:
    "Organisez la liaison CM2-6e : checklist par catégorie, rencontres avec ordre du jour et tâches de suivi, bilan général. Données conservées sur cet appareil.",
};

export default function TeacherCm26eTransitionPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Liaison CM2-6e" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer la liaison CM2-6e
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Organisez la checklist de liaison par catégorie, planifiez les
            rencontres avec le collège et suivez les tâches qui en découlent.
            Aucune donnée nominative n’est demandée : votre organisation est
            sauvegardée sur cet appareil uniquement.
          </p>
        </header>

        <TeacherCm26eTransitionClient />
      </div>
    </main>
  );
}

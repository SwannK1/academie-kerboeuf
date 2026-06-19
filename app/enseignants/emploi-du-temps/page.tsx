import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherWeeklySchedule } from "@/components/academy/TeacherWeeklyScheduleClient";

export const metadata: Metadata = {
  title: "Emploi du temps | Espace enseignants | Académie Kerboeuf",
  description:
    "Répartissez les matières de la semaine et vérifiez les volumes horaires par rapport aux 24 heures hebdomadaires à l'école élémentaire.",
};

export default function WeeklyScheduleToolPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Emploi du temps" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-ember">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Créer mon emploi du temps
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Répartissez les matières de la semaine et vérifiez les volumes
            horaires.
          </p>
        </header>

        <div className="mt-10">
          <TeacherWeeklySchedule />
        </div>
      </div>
    </main>
  );
}

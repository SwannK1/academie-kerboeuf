import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherWeeklyTimetable } from "@/components/academy/TeacherWeeklyTimetableClient";

export const metadata: Metadata = {
  title: "Emploi du temps | Espace enseignants | Académie Kerboeuf",
  description:
    "Construisez l'emploi du temps hebdomadaire de votre classe en respectant les 24 heures hebdomadaires à l'école élémentaire.",
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
            Emploi du temps hebdomadaire
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Construisez l&apos;emploi du temps de la semaine, niveau par
            niveau, en repérant le respect des 24 heures hebdomadaires.
          </p>
        </header>

        <div className="mt-10">
          <TeacherWeeklyTimetable />
        </div>
      </div>
    </main>
  );
}

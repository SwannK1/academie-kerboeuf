import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherWeeklySchedule } from "@/components/academy/TeacherWeeklySchedule";

export const metadata: Metadata = {
  title: "Emploi du temps hebdomadaire | Académie Kerboeuf",
  description:
    "Construisez une semaine type pour votre classe : choisissez un niveau, répartissez les matières par créneau et suivez le total d'heures.",
};

export default function TeacherWeeklyTimetablePage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Emploi du temps" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Emploi du temps hebdomadaire
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez un niveau, une matière puis une durée, et cliquez sur un
            créneau de la semaine pour le remplir. Suivez le total d’heures par
            rapport au repère de 24 h hebdomadaires. Votre emploi du temps est
            sauvegardé sur cet appareil.
          </p>
        </header>

        <TeacherWeeklySchedule />
      </div>
    </main>
  );
}

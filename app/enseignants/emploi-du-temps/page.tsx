import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherWeeklyTimetable } from "@/components/academy/TeacherWeeklyTimetable";

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
            Choisissez un niveau, créez vos créneaux et déplacez-les à la
            souris (ou au clavier) vers un autre jour ou un autre horaire.
            Les chevauchements sont signalés et le total d’heures par
            matière est recalculé immédiatement par rapport aux repères
            configurés. Votre emploi du temps est sauvegardé sur cet
            appareil.
          </p>
        </header>

        <TeacherWeeklyTimetable />
      </div>
    </main>
  );
}

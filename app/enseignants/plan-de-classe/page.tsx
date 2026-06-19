import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassroomPlan } from "@/components/academy/TeacherClassroomPlanClient";

export const metadata: Metadata = {
  title: "Plan de classe | Espace enseignants | Académie Kerboeuf",
  description:
    "Construisez le plan de classe : choisissez une disposition, placez les élèves et ajustez les places.",
};

export default function TeacherClassroomPlanPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Plan de classe" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Plan de classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez un niveau, ajoutez vos élèves par prénom, puis appliquez
            une disposition pour organiser les places.
          </p>
        </header>

        <div className="mt-10">
          <TeacherClassroomPlan />
        </div>
      </div>
    </main>
  );
}

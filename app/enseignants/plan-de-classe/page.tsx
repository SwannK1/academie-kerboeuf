import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassroomPlanClient } from "@/components/teacher-classroom-plan/TeacherClassroomPlanClient";

export const metadata: Metadata = {
  title: "Plan de classe | Académie Kerboeuf",
  description:
    "Organisez les tables et les groupes de votre classe avec des étiquettes anonymes, sans saisir de prénom ni d&apos;information personnelle.",
};

export default function TeacherClassroomPlanPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
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
            Organisez l&apos;implantation de votre classe avec des étiquettes
            anonymes (places élèves, tables, groupes). Aucune identité
            d&apos;élève n&apos;est saisie ni sauvegardée : seules les étiquettes
            visuelles des tables et des groupes sont conservées sur cet
            appareil.
          </p>
        </header>

        <TeacherClassroomPlanClient />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherDashboard } from "@/components/teacher-dashboard/TeacherDashboard";
import {
  teacherDashboardPriorityCards,
  teacherDashboardSections,
} from "@/content/teacher-dashboard";

export const metadata: Metadata = {
  title: "Espace enseignants | Académie Kerboeuf",
  description: "Tous vos outils de classe, en un seul endroit.",
};

export default function TeachersPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants" },
          ]}
        />

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
          Espace enseignants
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Tous vos outils de classe, en un seul endroit.
        </p>

        <TeacherDashboard
          priorityCards={teacherDashboardPriorityCards}
          sections={teacherDashboardSections}
        />
      </div>
    </main>
  );
}

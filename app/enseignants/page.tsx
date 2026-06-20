import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherDashboard } from "@/components/teacher-dashboard/TeacherDashboard";
import { teacherDashboardSections } from "@/content/teacher-dashboard";

export const metadata: Metadata = {
  title: "Espace enseignants | Académie Kerboeuf",
  description: "Organisez votre classe, vos outils et vos projets.",
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

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Espace enseignants
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
          Espace enseignants
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
          Organisez votre classe, vos outils et vos projets.
        </p>

        <TeacherDashboard sections={teacherDashboardSections} />
      </div>
    </main>
  );
}

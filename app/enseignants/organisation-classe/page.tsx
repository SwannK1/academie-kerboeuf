import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PrintBodyClass } from "@/components/print/print-body-class";
import { TeacherClassroomLayoutClient } from "@/components/teacher-classroom-layout/TeacherClassroomLayoutClient";

export const metadata: Metadata = {
  title: "Plan de classe et groupes | Académie Kerboeuf",
  description:
    "Construisez un plan de classe visuel, déplacez et nommez vos tables, appliquez un modèle rapide et générez des groupes d'élèves. Aucune donnée sensible, stockage uniquement sur cet appareil.",
};

export default function TeacherClassroomLayoutPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:px-0 print:pt-4">
      <PrintBodyClass className="print-teacher-tool" />
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Plan de classe et groupes" },
          ]}
        />

        <header className="mt-6 max-w-3xl print:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Plan de classe et groupes
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Déplacez des tables, pivotez-les, nommez vos élèves directement
            dessus et appliquez un modèle rapide. Cet outil ne contient
            aucune donnée élève sensible : tout est sauvegardé uniquement
            sur cet appareil.
          </p>
        </header>

        <TeacherClassroomLayoutClient />
      </div>
    </main>
  );
}

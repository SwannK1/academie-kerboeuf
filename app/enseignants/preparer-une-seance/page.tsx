import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherLessonPreparation } from "@/components/teacher-lesson-preparation/TeacherLessonPreparation";
import { PrintBodyClass } from "@/components/print/print-body-class";

export const metadata: Metadata = {
  title: "Préparer une séance | Espace enseignants | Académie Kerboeuf",
  description:
    "Construisez une séance complète avec des blocs repliables : informations, situation de départ, déroulé modulable, différenciation, évaluation, matériel et bilan. Sauvegarde locale uniquement.",
};

export default function TeacherLessonPreparationPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:px-0 print:pt-4">
      <PrintBodyClass className="print-teacher-tool" />
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer une séance" },
          ]}
        />

        <header className="mt-6 max-w-3xl print:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer une séance
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Construire une séance complète, puis la réutiliser. Blocs
            repliables, modèles de départ, déroulé modulable et impression
            A4 noir et blanc. Outil entièrement local, sauvegardé sur cet
            appareil.
          </p>
        </header>

        <TeacherLessonPreparation />
      </div>
    </main>
  );
}

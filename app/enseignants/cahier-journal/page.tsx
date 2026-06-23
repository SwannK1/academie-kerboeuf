import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PrintBodyClass } from "@/components/print/print-body-class";
import { TeacherLogbook } from "@/components/teacher-logbook/TeacherLogbook";

export const metadata: Metadata = {
  title: "Cahier journal | Académie Kerboeuf",
  description:
    "Préparez votre vraie semaine de classe avec des cartes de séances déplaçables, jour par jour et créneau par créneau. Sauvegarde locale uniquement.",
};

export default function TeacherLogbookPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:px-0 print:pt-4">
      <PrintBodyClass className="print-teacher-tool" />
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Cahier journal" },
          ]}
        />

        <header className="mt-6 max-w-3xl print:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Cahier journal
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Préparez votre vraie semaine, du lundi au vendredi, avec des
            cartes de séances que vous pouvez déplacer entre les jours et les
            créneaux. Cahier journal entièrement local, sauvegardé sur cet
            appareil.
          </p>
        </header>

        <TeacherLogbook />
      </div>
    </main>
  );
}

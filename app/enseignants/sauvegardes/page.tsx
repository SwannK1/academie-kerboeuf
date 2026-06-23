import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherLocalBackupClient } from "@/components/teacher-local-backup/TeacherLocalBackupClient";
import { PrintBodyClass } from "@/components/print/print-body-class";

export const metadata: Metadata = {
  title: "Sauvegardes locales | Académie Kerboeuf",
  description:
    "Exportez ou restaurez vos outils enseignants (programmation, progression, emploi du temps, cahier journal) sur cet appareil, sans compte ni cloud.",
};

export default function TeacherLocalBackupPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:hidden">
      <PrintBodyClass className="print-teacher-tool" />
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Sauvegardes locales" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Sauvegardes locales
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Exportez ou restaurez vos outils enseignants sur cet appareil :
            programmation annuelle, progression de période, emploi du temps
            et cahier journal.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Le plan de classe et les groupes ne sont pas inclus dans ces
            sauvegardes : tant que cet outil ne garantit pas l&apos;absence de
            données nominatives d&apos;élèves, il reste exclu de l&apos;export
            et de l&apos;import.
          </p>
        </header>

        <TeacherLocalBackupClient />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PrintBodyClass } from "@/components/print/print-body-class";
import { TeacherCommunicationsClient } from "@/components/teacher-communications/TeacherCommunicationsClient";

export const metadata: Metadata = {
  title: "Communications | Espace enseignants | Académie Kerboeuf",
  description:
    "Générez des messages professionnels prêts à copier ou imprimer : mots aux parents, sorties scolaires, autorisations, réunions, rappels et plus. Génération entièrement locale, sans envoi ni stockage cloud.",
};

export default function TeacherCommunicationsPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:px-0 print:pt-4">
      <PrintBodyClass className="print-teacher-tool" />
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Communications" },
          ]}
        />

        <header className="mt-6 max-w-3xl print:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Communications
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez un type de message, renseignez quelques informations et un
            ton, puis récupérez un texte prêt à copier ou à imprimer. Génération
            entièrement locale, à partir de modèles prédéfinis : aucune donnée
            n’est envoyée à un serveur.
          </p>
        </header>

        <TeacherCommunicationsClient />
      </div>
    </main>
  );
}

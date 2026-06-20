import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassOrganizationClient } from "@/components/teacher-class-organization/TeacherClassOrganizationClient";

export const metadata: Metadata = {
  title: "Organisation de classe | Académie Kerboeuf",
  description:
    "Préparez votre semaine de classe : priorités par groupe, réorganisation à la souris ou au clavier. Outil conçu pour des tâches professionnelles générales, sans donnée élève. Sauvegarde sur cet appareil.",
};

export default function TeacherClassOrganizationPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Organisation de classe" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Organisation de classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez un niveau et une période, organisez vos priorités de
            semaine par groupe (préparation, matériel, évaluations, réunions,
            projets) et suivez votre avancement. Cet outil est conçu pour des
            tâches professionnelles générales : il ne doit pas contenir de
            données personnelles (élève, famille, santé, comportement,
            incident). Votre progression est sauvegardée sur cet appareil.
          </p>
        </header>

        <TeacherClassOrganizationClient />
      </div>
    </main>
  );
}

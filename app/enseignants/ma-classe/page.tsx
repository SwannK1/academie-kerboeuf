import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassProfileForm } from "@/components/academy/TeacherClassProfile";

export const metadata: Metadata = {
  title: "Ma classe | Académie Kerboeuf",
  description:
    "Configurez les réglages locaux de votre classe : niveau, effectif et période active.",
};

export default function TeacherClassSettingsPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Ma classe" },
          ]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Ma classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Renseignez le niveau, l’effectif et la période active de votre
            classe. Ces informations restent enregistrées sur cet appareil.
          </p>
        </header>

        <TeacherClassProfileForm />
      </div>
    </main>
  );
}

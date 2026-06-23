import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherProfessionalDevelopment } from "@/components/teacher-professional-development/TeacherProfessionalDevelopment";

export const metadata: Metadata = {
  title: "Mes formations et développement professionnel | Académie Kerboeuf",
  description:
    "Suivez vos formations, lectures professionnelles et compétences à développer, en privé sur cet appareil.",
};

export default function TeacherProfessionalDevelopmentPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Mes formations" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Mes formations et développement professionnel
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Gardez une trace de vos formations, lectures professionnelles,
            webinaires, conférences, observations de pratique et projets
            personnels. Ces informations restent privées et sauvegardées sur
            cet appareil uniquement.
          </p>
        </header>

        <TeacherProfessionalDevelopment />
      </div>
    </main>
  );
}

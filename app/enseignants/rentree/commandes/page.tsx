import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { BackToSchoolChecklist } from "@/components/academy/TeacherBackToSchool";

export const metadata: Metadata = {
  title: "Commander et inventorier | Académie Kerboeuf",
  description:
    "Listez les commandes à passer et l'inventaire du matériel avant la rentrée.",
};

export default function BackToSchoolOrdersPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer ma rentrée", href: "/enseignants/rentree" },
            { label: "Commander et inventorier" },
          ]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Commander et inventorier
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Notez ce qu’il reste à commander et à inventorier avant la
            rentrée.
          </p>
        </header>

        <div className="mt-8">
          <BackToSchoolChecklist category="commandes" />
        </div>
      </div>
    </main>
  );
}

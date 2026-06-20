import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  BackToSchoolChecklist,
  ParentMeetingForm,
} from "@/components/academy/TeacherBackToSchool";

export const metadata: Metadata = {
  title: "Préparer la réunion parents | Académie Kerboeuf",
  description:
    "Préparez la réunion de rentrée avec les parents : date, ordre du jour, documents et questions à anticiper.",
};

export default function BackToSchoolParentMeetingPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer ma rentrée", href: "/enseignants/rentree" },
            { label: "Préparer la réunion parents" },
          ]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer la réunion parents
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Date, ordre du jour, documents et questions à anticiper pour la
            réunion de rentrée.
          </p>
        </header>

        <div className="mt-8">
          <ParentMeetingForm />
        </div>

        <div className="mt-8">
          <BackToSchoolChecklist category="reunion-parents" />
        </div>
      </div>
    </main>
  );
}

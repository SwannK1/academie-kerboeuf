import { buildPageMetadata } from "@/content/seo";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherParentMeetingClient } from "@/components/teacher-parent-meeting/TeacherParentMeetingClient";

export const metadata = buildPageMetadata({
  title: "Préparer la réunion parents",
  description:
    "Préparez la réunion de rentrée avec les parents : date, ordre du jour, documents et questions à anticiper, avec une checklist de préparation.",
  path: "/enseignants/reunion-parents",
  noIndex: true,
});

export default function TeacherParentMeetingPage() {
  return (
    <main id="contenu-principal" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Réunion parents" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer la réunion parents
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Date, ordre du jour, documents et questions à anticiper pour la
            réunion avec les familles, avec une checklist de préparation.
            Vos données restent sur cet appareil.
          </p>
        </header>

        <TeacherParentMeetingClient />
      </div>
    </main>
  );
}

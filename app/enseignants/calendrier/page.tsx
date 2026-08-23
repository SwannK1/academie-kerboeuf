import { buildPageMetadata } from "@/content/seo";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherSchoolCalendar } from "@/components/teacher-school-calendar/TeacherSchoolCalendar";

export const metadata = buildPageMetadata({
  title: "Mon calendrier scolaire",
  description:
    "Organisez vos périodes, dates importantes et échéances personnelles dans un calendrier mensuel sauvegardé sur cet appareil.",
  path: "/enseignants/calendrier",
  noIndex: true,
});

export default function TeacherSchoolCalendarPage() {
  return (
    <main id="contenu-principal" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Calendrier" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Mon calendrier scolaire
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Suivez vos périodes, réunions, sorties et échéances personnelles
            mois par mois. Vos données restent sur cet appareil, sans compte
            ni synchronisation externe.
          </p>
        </header>

        <TeacherSchoolCalendar />
      </div>
    </main>
  );
}

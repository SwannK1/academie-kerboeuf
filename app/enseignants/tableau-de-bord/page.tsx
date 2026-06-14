import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { isAuthConfigured } from "@/lib/auth/config";
import { getEnseignantSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Tableau de bord enseignant | Académie Kerboeuf",
  description: "Tableau de bord personnel de l'enseignant.",
};

const dashboardLinks = [
  { label: "Créer ma programmation", href: "/primaire/programmation" },
  { label: "Créer ma progression", href: "/primaire/programmation" },
  {
    label: "Mes fiches",
    href: "#mes-fiches",
    children: [
      { label: "Mathématiques (CM2)", href: "/primaire/cm2/matieres/mathematiques" },
      { label: "Français (CM2)", href: "/primaire/cm2/matieres/francais" },
      { label: "Sciences (CM2)", href: "/primaire/cm2/matieres/sciences" },
    ],
  },
  { label: "Ma sélection", href: "#ma-selection" },
  { label: "Méthode Académie Kerboeuf", href: "/parcours" },
];

export default async function TableauDeBordPage() {
  if (!isAuthConfigured()) {
    return (
      <main className="px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Espace enseignant", href: "/enseignants" },
              { label: "Tableau de bord" },
            ]}
          />

          <div className="mt-8 rounded-2xl border border-panel-soft bg-panel p-8">
            <h1 className="text-2xl font-bold text-foreground">
              Configuration auth manquante
            </h1>
            <p className="mt-4 text-muted">
              Le tableau de bord enseignant n&apos;est pas encore activé sur
              cet environnement. Cette page sera accessible une fois
              l&apos;authentification configurée.
            </p>
            <Link
              href="/enseignants"
              className="mt-6 inline-block rounded-lg border border-panel-soft px-4 py-2.5 font-semibold text-foreground transition hover:border-gold"
            >
              Retour à l&apos;Espace enseignant
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const session = await getEnseignantSession();

  if (!session) {
    redirect("/connexion");
  }

  return (
    <main className="px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Espace enseignant", href: "/enseignants" },
            { label: "Tableau de bord" },
          ]}
        />

        <h1 className="mt-8 text-3xl font-bold text-foreground">
          Bonjour {session.name ?? session.email}
        </h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {dashboardLinks.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-panel-soft bg-panel p-6"
            >
              {item.children ? (
                <>
                  <h2 className="font-semibold text-foreground">
                    {item.label}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-sm text-gold hover:underline"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="font-semibold text-foreground hover:text-gold"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

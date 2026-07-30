import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Plan du site | Académie Kerboeuf",
  description: "Plan du site Académie Kerboeuf.",
};

type SiteLink = {
  label: string;
  href: string;
};

const sections: { title: string; links: SiteLink[] }[] = [
  {
    title: "Accueil",
    links: [{ label: "Accueil", href: "/" }],
  },
  {
    title: "Niveaux",
    links: [
      { label: "Maternelle", href: "/maternelle" },
      { label: "Primaire", href: "/primaire" },
      { label: "Collège", href: "/college" },
      { label: "Lycée", href: "/lycee" },
    ],
  },
  {
    title: "Univers de l'Académie",
    links: [
      { label: "Univers", href: "/univers" },
      { label: "Carte de l'Académie", href: "/carte" },
      { label: "Personnages", href: "/personnages" },
      { label: "Professeurs", href: "/professeurs" },
      { label: "Élèves emblématiques", href: "/eleves" },
      { label: "Comment fonctionne l'Académie", href: "/methode" },
    ],
  },
  {
    title: "Pédagogie et enseignants",
    links: [
      { label: "Espace enseignants", href: "/enseignants" },
      { label: "Programmes", href: "/programmes" },
      { label: "Programmation", href: "/programmation" },
      { label: "Parcours pédagogiques", href: "/parcours" },
      { label: "Ressources", href: "/ressources" },
      { label: "Missions pédagogiques", href: "/missions-recentes" },
    ],
  },
  {
    title: "Informations légales",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "Cookies", href: "/cookies" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function PlanDuSitePage() {
  return (
    <LegalPage
      eyebrow="Navigation"
      title="Plan du site"
      description="Les principales sections du site Académie Kerboeuf."
      lastUpdated="30 juillet 2026"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {sections.map((section) => (
          <LegalSection key={section.title} title={section.title}>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-medium text-foreground underline decoration-gold/40 underline-offset-4 transition hover:decoration-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </LegalSection>
        ))}
      </div>
    </LegalPage>
  );
}

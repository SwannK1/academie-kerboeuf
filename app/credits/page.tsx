import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Crédits | Académie Kerboeuf",
  description: "Origine des illustrations, personnages et contenus pédagogiques de l'Académie Kerboeuf.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Crédits" }]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Informations légales
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Crédits
          </h1>
        </header>

        <div className="mt-10 grid gap-8 text-sm leading-7 text-muted">
          <Section title="Univers, personnages et contenus pédagogiques">
            <p>
              L&apos;univers narratif de l&apos;Académie Kerboeuf (personnages,
              lieux, missions), ainsi que les contenus pédagogiques publiés
              sur le site, sont des créations originales du projet.
            </p>
          </Section>

          <Section title="Illustrations">
            <Placeholder>
              Mention précise de l&apos;origine des illustrations (auteur,
              outil, ou banque d&apos;images le cas échéant) à renseigner ici
              avant le lancement public, pour chaque catégorie d&apos;image
              utilisée sur le site.
            </Placeholder>
          </Section>

          <Section title="Ressources PDF téléchargeables">
            <p>
              Les fiches PDF publiées (leçons, exercices, corrections,
              supports projetables) sont des créations originales destinées
              à un usage pédagogique personnel ou de classe.
            </p>
          </Section>

          <Section title="Signaler un oubli">
            <p>
              Si vous identifiez un contenu qui devrait être crédité
              différemment, merci de nous le signaler via la page{" "}
              <a href="/contact" className="font-bold text-jade hover:underline">
                Contact
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-black text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-gold/25 bg-gold/[0.06] px-4 py-3 text-xs leading-6 text-gold">
      À compléter — {children}
    </p>
  );
}

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Mentions légales | Académie Kerboeuf",
  description: "Informations légales relatives à l'édition et à l'hébergement du site Académie Kerboeuf.",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Informations légales
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Mentions légales
          </h1>
        </header>

        <div className="mt-10 grid gap-8 text-sm leading-7 text-muted">
          <Section title="Éditeur du site">
            <p>
              Académie Kerboeuf est édité à titre non professionnel par Swann
              Kerboeuf.
            </p>
            <Placeholder>
              Statut juridique, adresse postale et, le cas échéant, numéro
              SIRET de l&apos;éditeur — à compléter avant l&apos;ouverture
              publique du site si le site passe en exploitation
              professionnelle.
            </Placeholder>
            <p className="mt-3">
              Contact :{" "}
              <a
                href="mailto:swann.kerboeuf@gmail.com"
                className="font-bold text-jade hover:underline"
              >
                swann.kerboeuf@gmail.com
              </a>
            </p>
          </Section>

          <Section title="Directeur de la publication">
            <p>Swann Kerboeuf.</p>
          </Section>

          <Section title="Hébergement">
            <p>Le site est hébergé par Vercel Inc.</p>
            <Placeholder>
              Adresse complète et informations légales de l&apos;hébergeur à
              vérifier et confirmer avant la mise en ligne publique (adresse
              susceptible d&apos;évoluer selon le fournisseur d&apos;hébergement
              retenu au moment du lancement).
            </Placeholder>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus pédagogiques, textes, personnages,
              illustrations et éléments graphiques de l&apos;Académie
              Kerboeuf sont la propriété de leur(s) auteur(s) respectif(s),
              sauf mention contraire. Toute reproduction ou réutilisation en
              dehors d&apos;un usage pédagogique personnel ou de classe est
              soumise à autorisation préalable.
            </p>
            <p className="mt-3">
              Voir également la page{" "}
              <a href="/credits" className="font-bold text-jade hover:underline">
                Crédits
              </a>{" "}
              pour l&apos;origine des illustrations et contenus.
            </p>
          </Section>

          <Section title="Données personnelles">
            <p>
              Le fonctionnement du site est décrit en détail sur la page{" "}
              <a
                href="/confidentialite"
                className="font-bold text-jade hover:underline"
              >
                Politique de confidentialité
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
    <p className="mt-3 rounded-md border border-gold/25 bg-gold/[0.06] px-4 py-3 text-xs leading-6 text-gold">
      À compléter — {children}
    </p>
  );
}

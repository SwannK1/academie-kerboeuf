import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Académie Kerboeuf",
  description:
    "Ce que l'Académie Kerboeuf collecte, stocke et ne collecte pas — comptes, cookies, localStorage et données élèves.",
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Confidentialité" }]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Informations légales
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Cette page décrit précisément ce que le site fait — et ne fait
            pas — avec les données de ses visiteurs.
          </p>
        </header>

        <div className="mt-10 grid gap-8 text-sm leading-7 text-muted">
          <Section title="Aucun compte utilisateur">
            <p>
              L&apos;Académie Kerboeuf ne propose pas de création de compte,
              ni pour les élèves, ni pour les enseignants, ni pour les
              parents. Le site ne demande ni identifiant, ni mot de passe,
              ni adresse e-mail pour être consulté.
            </p>
          </Section>

          <Section title="Aucune donnée nominative d'élève collectée">
            <p>
              Aucune information permettant d&apos;identifier un enfant (nom,
              date de naissance, établissement, résultats individuels) n&apos;est
              collectée, stockée ou transmise par le site.
            </p>
          </Section>

          <Section title="Outils enseignants : stockage local uniquement">
            <p>
              Les outils enseignants (programmation, progression, cahier
              journal, plan de classe, et les autres outils listés dans
              l&apos;espace enseignants) enregistrent leurs données
              exclusivement dans le navigateur de l&apos;utilisateur, via la
              technologie <code>localStorage</code>. Concrètement :
            </p>
            <ul className="mt-3 grid list-disc gap-2 pl-5">
              <li>Rien n&apos;est envoyé à un serveur ni à un service tiers.</li>
              <li>
                Rien n&apos;est synchronisé entre appareils : les données
                saisies sur un ordinateur ne sont pas accessibles depuis un
                autre ordinateur ou une tablette.
              </li>
              <li>
                Vider le cache du navigateur, changer d&apos;appareil ou
                utiliser la navigation privée efface ces données de façon
                définitive.
              </li>
              <li>
                Un outil de sauvegarde locale (export/import de fichier)
                existe pour une partie de ces outils — voir{" "}
                <a
                  href="/enseignants/sauvegardes"
                  className="font-bold text-jade hover:underline"
                >
                  Sauvegardes locales
                </a>
                . Il ne s&apos;agit pas d&apos;une sauvegarde automatique ni
                d&apos;un service cloud : l&apos;export se fait manuellement,
                sur demande, vers un fichier que l&apos;utilisateur conserve
                lui-même.
              </li>
            </ul>
          </Section>

          <Section title="Cookies">
            <p>
              Le site ne dépose aucun cookie de mesure d&apos;audience, de
              publicité ou de traçage. Il n&apos;intègre aucun outil
              d&apos;analytics tiers. En l&apos;absence de cookie non
              essentiel, aucun bandeau de consentement n&apos;est affiché.
            </p>
            <p className="mt-3 rounded-md border border-gold/25 bg-gold/[0.06] px-4 py-3 text-xs leading-6 text-gold">
              À compléter — si un outil de mesure d&apos;audience ou tout
              autre cookie non essentiel venait à être ajouté, cette page et
              le dispositif de consentement associé devront être mis à jour
              avant sa mise en production.
            </p>
          </Section>

          <Section title="Hébergement et journaux techniques">
            <p>
              Comme tout site web, l&apos;hébergeur peut être amené à
              conserver des journaux techniques de connexion (adresse IP,
              date, page visitée) à des fins de sécurité et de bon
              fonctionnement du service, indépendamment de toute action de
              l&apos;éditeur du site.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Pour toute question sur cette politique, voir la page{" "}
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

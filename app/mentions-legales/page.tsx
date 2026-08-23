import { buildPageMetadata } from "@/content/seo";

import {
  LegalLink,
  LegalPageLayout,
  LegalSection,
  PlaceholderNotice,
} from "@/components/academy/LegalPageLayout";

export const metadata = buildPageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales de l’Académie Kerboeuf : éditeur, hébergeur, propriété intellectuelle, responsabilité et contact.",
  path: "/mentions-legales",
});

export default function LegalNoticePage() {
  return (
    <LegalPageLayout
      eyebrow="Socle légal"
      title="Mentions légales"
      description="Cette page rassemble les informations légales connues du dépôt. Les informations non présentes dans le code sont signalées comme à compléter."
    >
      <PlaceholderNotice>
        Informations à compléter par le propriétaire du site : éditeur,
        responsable de publication, statut juridique, adresse postale, adresse
        email de contact et, le cas échéant, téléphone.
      </PlaceholderNotice>

      <LegalSection title="Éditeur du site">
        <p>
          Le site Académie Kerboeuf est édité par :{" "}
          <strong>[À compléter : nom ou raison sociale de l’éditeur]</strong>.
        </p>
        <p>
          Statut juridique :{" "}
          <strong>[À compléter : particulier, entreprise, association ou autre]</strong>.
        </p>
        <p>
          Adresse postale : <strong>[À compléter : adresse de l’éditeur]</strong>.
        </p>
      </LegalSection>

      <LegalSection title="Responsable de publication">
        <p>
          Responsable de publication :{" "}
          <strong>[À compléter : nom du responsable de publication]</strong>.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le dépôt indique un déploiement prévu sur Vercel. Le site est donc
          présenté comme hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
          CA 91789, États-Unis, sous réserve de confirmation par le propriétaire
          du site avant publication définitive.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Les textes, contenus pédagogiques, interfaces, illustrations, noms,
          signes distinctifs et éléments graphiques du site sont protégés par le
          droit de la propriété intellectuelle, sauf mention contraire.
        </p>
        <p>
          Toute reproduction, adaptation, diffusion ou réutilisation substantielle
          doit être autorisée par l’éditeur du site.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Les contenus proposés ont une finalité pédagogique et informative. Ils
          peuvent évoluer, être corrigés ou retirés. L’éditeur ne garantit pas
          l’absence totale d’erreurs ni l’adéquation à une situation pédagogique
          particulière.
        </p>
        <p>
          Les liens vers des ressources PDF ne sont cliquables que lorsqu’une
          ressource existe réellement et que son statut public est disponible.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour contacter l’éditeur, consultez la page{" "}
          <LegalLink href="/contact">Contact</LegalLink>. Aucune adresse
          personnelle non présente dans le dépôt n’est publiée sur cette page.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

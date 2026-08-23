import { buildPageMetadata } from "@/content/seo";

import {
  LegalLink,
  LegalPageLayout,
  LegalSection,
  PlaceholderNotice,
} from "@/components/academy/LegalPageLayout";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Moyen de contact officiel de l’Académie Kerboeuf, à compléter par le propriétaire du site.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPageLayout
      eyebrow="Contact"
      title="Contact"
      description="Cette page prépare un point de contact cohérent sans publier d’adresse personnelle absente du site public."
    >
      <PlaceholderNotice>
        À compléter avant publication définitive : adresse email officielle de
        contact ou formulaire de contact réellement implémenté.
      </PlaceholderNotice>

      <LegalSection title="Contacter Académie Kerboeuf">
        <p>
          Le moyen de contact public n’est pas encore renseigné dans le site.
          Merci de compléter cette page avec une adresse email officielle ou un
          formulaire réellement relié à un service d’envoi.
        </p>
        <p>
          Aucun formulaire serveur n’est ajouté ici, car le code actuel ne
          contient pas de service d’envoi d’email actif.
        </p>
      </LegalSection>

      <LegalSection title="Demandes liées aux données personnelles">
        <p>
          Pour exercer un droit lié aux données personnelles, utilisez le moyen
          de contact officiel dès qu’il aura été complété par le propriétaire du
          site.
        </p>
        <p>
          La page{" "}
          <LegalLink href="/politique-de-confidentialite">
            Politique de confidentialité
          </LegalLink>{" "}
          décrit les données effectivement traitées par le site public actuel.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

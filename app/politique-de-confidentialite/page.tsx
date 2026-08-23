import { buildPageMetadata } from "@/content/seo";

import {
  LegalLink,
  LegalPageLayout,
  LegalSection,
  PlaceholderNotice,
} from "@/components/academy/LegalPageLayout";

export const metadata = buildPageMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de l’Académie Kerboeuf : données collectées, finalités, conservation, destinataires et droits.",
  path: "/politique-de-confidentialite",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Confidentialité"
      title="Politique de confidentialité"
      description="Cette politique décrit les données effectivement traitées par le site public à partir du code actuel."
    >
      <PlaceholderNotice>
        Information à compléter avant publication définitive : adresse email ou
        moyen de contact officiel pour exercer ses droits.
      </PlaceholderNotice>

      <LegalSection title="Données collectées par le site public">
        <p>
          Le code actuel ne contient ni compte utilisateur, ni espace connecté,
          ni envoi de formulaire vers un serveur, ni base de données applicative.
          Aucune donnée personnelle n’est donc collectée par l’application côté
          serveur dans son état actuel.
        </p>
        <p>
          Certains outils enseignants enregistrent des informations dans le
          stockage local du navigateur de l’utilisateur. Ces données restent sur
          l’appareil utilisé et ne sont pas envoyées à Académie Kerboeuf par le
          code actuel.
        </p>
      </LegalSection>

      <LegalSection title="Finalités">
        <p>Les traitements constatés ont pour finalités :</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>afficher des contenus et ressources pédagogiques publics ;</li>
          <li>
            mémoriser localement, sur l’appareil, certains paramètres ou travaux
            d’outils enseignants ;
          </li>
          <li>produire les pages publiques et le sitemap du site.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Base légale">
        <p>
          Pour l’affichage du site public, la base légale généralement applicable
          est l’intérêt légitime de l’éditeur à publier et maintenir son service
          en ligne. Pour les informations conservées localement par l’utilisateur,
          le traitement résulte de l’action volontaire de l’utilisateur dans
          l’outil concerné.
        </p>
        <p>
          Cette analyse devra être confirmée par le propriétaire du site en
          fonction de son statut juridique réel.
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Les données enregistrées dans le stockage local restent sur l’appareil
          jusqu’à leur suppression par l’utilisateur, par le navigateur, ou par
          une fonctionnalité de réinitialisation/export prévue dans l’outil.
        </p>
        <p>
          Le code actuel ne définit pas de durée de conservation serveur, car il
          ne met pas en place de stockage serveur applicatif.
        </p>
      </LegalSection>

      <LegalSection title="Destinataires et services tiers">
        <p>
          Aucun service d’analytics, de suivi publicitaire, d’emailing, de base
          de données ou de formulaire serveur n’est actif dans le code applicatif
          actuel.
        </p>
        <p>
          Le dépôt contient un fichier d’exemple de variables d’environnement
          mentionnant Supabase, Resend, un email d’audit et un numéro WhatsApp.
          Ces éléments ne sont pas utilisés par le site public actuel d’après le
          scan du code.
        </p>
        <p>
          L’hébergeur identifié dans la documentation de déploiement est Vercel.
          Des journaux techniques d’hébergement peuvent être traités par
          l’hébergeur pour assurer la sécurité, la disponibilité et le
          fonctionnement du site.
        </p>
      </LegalSection>

      <LegalSection title="Droits des personnes">
        <p>
          Selon la réglementation applicable, vous pouvez demander l’accès, la
          rectification, l’effacement, la limitation ou l’opposition au
          traitement de vos données personnelles.
        </p>
        <p>
          Pour les données stockées localement dans le navigateur, vous pouvez
          aussi les supprimer depuis les réglages du navigateur ou depuis les
          outils du site lorsqu’une option de réinitialisation existe.
        </p>
      </LegalSection>

      <LegalSection title="Contact confidentialité">
        <p>
          Le moyen de contact officiel doit être complété par le propriétaire du
          site. En attendant, la page <LegalLink href="/contact">Contact</LegalLink>{" "}
          indique les informations manquantes sans publier de donnée personnelle
          absente du dépôt.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

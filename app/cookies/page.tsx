import { buildPageMetadata } from "@/content/seo";

import { LegalPageLayout, LegalSection } from "@/components/academy/LegalPageLayout";

export const metadata = buildPageMetadata({
  title: "Cookies",
  description:
    "Informations sur les cookies et traceurs utilisés par l’Académie Kerboeuf.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPageLayout
      eyebrow="Cookies"
      title="Cookies"
      description="Cette page explique la réalité technique du site actuel : aucun cookie applicatif ou publicitaire n’a été détecté dans le code."
    >
      <LegalSection title="Cookies nécessaires">
        <p>
          Le code applicatif actuel ne dépose pas de cookie nécessaire propre au
          site. Aucun système de connexion, session utilisateur ou panier n’est
          présent.
        </p>
        <p>
          L’hébergeur peut traiter des informations techniques strictement
          nécessaires à la fourniture du service, selon ses propres conditions
          d’hébergement.
        </p>
      </LegalSection>

      <LegalSection title="Mesure d’audience">
        <p>
          Aucun outil de mesure d’audience n’est installé dans les dépendances
          actuelles du projet. Vercel Analytics, Vercel Speed Insights, Google
          Analytics, Plausible, PostHog et Sentry n’ont pas été détectés dans le
          code applicatif.
        </p>
      </LegalSection>

      <LegalSection title="Stockage local du navigateur">
        <p>
          Certains outils enseignants utilisent le stockage local du navigateur
          pour conserver des préparations ou paramètres sur l’appareil. Ce
          stockage n’est pas un cookie et n’est pas envoyé au serveur par le code
          actuel.
        </p>
        <p>
          L’utilisateur peut supprimer ces données depuis les réglages de son
          navigateur, ou via les fonctions de suppression disponibles dans les
          outils concernés lorsqu’elles existent.
        </p>
      </LegalSection>

      <LegalSection title="Consentement">
        <p>
          Aucune bannière de consentement n’est affichée, car aucun cookie non
          essentiel ni traceur soumis à consentement n’est activé dans le code
          actuel.
        </p>
        <p>
          Si un outil d’audience, de publicité ou de suivi tiers est ajouté plus
          tard, il faudra évaluer le besoin d’une CMP et recueillir le
          consentement avant activation lorsque la réglementation l’impose.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookies | Académie Kerboeuf",
  description: "Politique relative aux cookies du site Académie Kerboeuf.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Cookies"
      lastUpdated="30 juillet 2026"
    >
      <LegalSection title="Aucun cookie sur ce site">
        <p>
          Le site Académie Kerboeuf n&apos;utilise aucun cookie : ni cookie
          de mesure d&apos;audience, ni cookie publicitaire, ni cookie de
          session ou d&apos;authentification. Aucun bandeau de consentement
          n&apos;est donc nécessaire.
        </p>
      </LegalSection>

      <LegalSection title="Stockage local du navigateur">
        <p>
          Les outils de l&apos;espace enseignants utilisent le stockage
          local du navigateur (<code>localStorage</code>), qui n&apos;est
          pas un cookie : ces données restent sur votre appareil, ne sont
          jamais envoyées à un serveur et ne servent à aucun suivi. Vous
          pouvez les effacer à tout moment via les réglages de votre
          navigateur ou les outils de sauvegarde/réinitialisation proposés
          dans l&apos;espace enseignants.
        </p>
      </LegalSection>

      <LegalSection title="Si cela change">
        <p>
          Si un outil de mesure d&apos;audience ou tout autre cookie était
          introduit à l&apos;avenir, cette page serait mise à jour et un
          dispositif de consentement conforme serait mis en place avant son
          activation.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

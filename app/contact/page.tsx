import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Contact | Académie Kerboeuf",
  description: "Contacter l'éditeur du site Académie Kerboeuf.",
};

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Contact"
      lastUpdated="30 juillet 2026"
    >
      <LegalSection title="Écrire à l'éditeur">
        <p>
          Pour signaler une erreur, poser une question sur un contenu, ou
          exercer un droit relatif à vos données personnelles, vous pouvez
          écrire à :
        </p>
        <p>
          <a
            href="mailto:swann.kerboeuf@gmail.com"
            className="text-lg font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            swann.kerboeuf@gmail.com
          </a>
        </p>
        <p>
          Académie Kerboeuf est un projet édité à titre personnel : les
          demandes sont traitées directement par l&apos;éditeur, sans
          délai de réponse garanti.
        </p>
      </LegalSection>

      <LegalSection title="Autres pages utiles">
        <p>
          Voir aussi les{" "}
          <a
            href="/mentions-legales"
            className="font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            mentions légales
          </a>
          , la{" "}
          <a
            href="/confidentialite"
            className="font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            politique de confidentialité
          </a>{" "}
          et le{" "}
          <a
            href="/plan-du-site"
            className="font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            plan du site
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Académie Kerboeuf",
  description: "Politique de confidentialité du site Académie Kerboeuf.",
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Politique de confidentialité"
      lastUpdated="30 juillet 2026"
    >
      <LegalSection title="Responsable du traitement">
        <p>
          L&apos;éditeur du site Académie Kerboeuf (voir les{" "}
          <a
            href="/mentions-legales"
            className="font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            mentions légales
          </a>
          ) est responsable des traitements décrits ci-dessous. Pour toute
          question, il est joignable à{" "}
          <a
            href="mailto:swann.kerboeuf@gmail.com"
            className="font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            swann.kerboeuf@gmail.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          Le site est un site statique (généré au moment du déploiement),
          sans compte utilisateur, sans espace de connexion et sans base de
          données côté serveur. Il ne comporte aucun formulaire
          d&apos;inscription et ne demande aucune donnée personnelle pour
          être consulté.
        </p>
        <p>
          La seule donnée personnelle traitée est celle que vous
          transmettez volontairement en écrivant à l&apos;adresse de
          contact indiquée sur ce site (par exemple votre adresse email et
          le contenu de votre message). Cette donnée sert uniquement à
          vous répondre et n&apos;est ni revendue ni transmise à des tiers.
        </p>
      </LegalSection>

      <LegalSection title="Outils enseignants (stockage local)">
        <p>
          Les outils destinés aux enseignants (emploi du temps,
          programmation, cahier journal, etc.) enregistrent les données que
          vous y saisissez uniquement dans le navigateur utilisé
          (mécanisme <code>localStorage</code>). Ces données restent sur
          votre appareil : elles ne sont pas envoyées vers un serveur, ni
          consultées par l&apos;éditeur du site.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Ce site n&apos;utilise aucun cookie. Voir la{" "}
          <a
            href="/cookies"
            className="font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            page dédiée aux cookies
          </a>{" "}
          pour le détail.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement et journaux techniques">
        <p>
          Le site est hébergé par Vercel Inc. (voir les mentions légales).
          Comme tout hébergeur, Vercel peut être amené à générer des
          journaux techniques de connexion (adresse IP, date, page
          demandée) dans le cadre normal du fonctionnement
          d&apos;Internet, indépendamment de l&apos;éditeur de ce site.
        </p>
        {/*
          TODO: si un lien précis vers la politique de confidentialité de
          l'hébergeur doit être cité, le vérifier avant de le publier plutôt
          que de le supposer.
        */}
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au Règlement général sur la protection des données
          (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un
          droit d&apos;accès, de rectification et de suppression des données
          personnelles que vous avez pu transmettre par email. Pour exercer
          ce droit, écrivez à{" "}
          <a
            href="mailto:swann.kerboeuf@gmail.com"
            className="font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            swann.kerboeuf@gmail.com
          </a>
          . Vous pouvez également introduire une réclamation auprès de la
          CNIL (cnil.fr).
        </p>
      </LegalSection>

      <LegalSection title="Évolution de cette politique">
        <p>
          Si le site venait à intégrer de nouveaux outils collectant des
          données (formulaire, mesure d&apos;audience, compte utilisateur
          côté serveur…), cette page sera mise à jour en conséquence avant
          la mise en service de ces outils.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

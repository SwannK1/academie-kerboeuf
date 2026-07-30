import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales | Académie Kerboeuf",
  description: "Mentions légales du site Académie Kerboeuf.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      lastUpdated="30 juillet 2026"
    >
      <LegalSection title="Éditeur du site">
        <p>
          Le site Académie Kerboeuf est édité à titre personnel et non
          commercial par un particulier.
        </p>
        <p>
          Conformément à l&apos;article 6-III de la loi n° 2004-575 du 21
          juin 2004 pour la confiance dans l&apos;économie numérique
          (LCEN), l&apos;éditeur d&apos;un site à titre non professionnel
          peut ne pas rendre publiques son identité et son adresse
          complètes ; celles-ci restent tenues à la disposition de
          l&apos;hébergeur et des autorités compétentes qui en feraient la
          demande.
        </p>
        <p>
          Contact de l&apos;éditeur :{" "}
          <a
            href="mailto:swann.kerboeuf@gmail.com"
            className="font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            swann.kerboeuf@gmail.com
          </a>
        </p>
        {/*
          TODO (mandatory info missing): si le site devient un jour une activité
          professionnelle/commerciale (SIRET, forme juridique, siège social), ces
          informations devront être ajoutées ici — ne pas les inventer avant
          confirmation par l'éditeur.
        */}
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        <p>
          Le directeur de la publication est l&apos;éditeur du site
          mentionné ci-dessus.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>Le site est hébergé par :</p>
        <p className="font-semibold text-foreground">Vercel Inc.</p>
        <p>
          Site web :{" "}
          <a
            href="https://vercel.com"
            className="underline decoration-gold/60 underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            vercel.com
          </a>
        </p>
        {/*
          TODO (mandatory info missing): l'adresse postale complète et le numéro de
          téléphone de l'hébergeur doivent figurer ici (obligation légale). Impossible
          de la vérifier de façon fiable pour cette page — à récupérer directement
          depuis les mentions légales officielles de Vercel avant mise en production,
          plutôt que de recopier une adresse non vérifiée.
        */}
        <p className="text-foreground/80">
          [Adresse et téléphone de l&apos;hébergeur à compléter — voir
          commentaire dans le code source de cette page.]
        </p>
      </LegalSection>

      <LegalSection title="Nature du site">
        <p>
          Académie Kerboeuf est un projet pédagogique présentant un univers
          fictif (personnages, lieux, missions) destiné à organiser des
          ressources scolaires. Les personnages et l&apos;univers narratif
          du site sont fictifs et n&apos;identifient aucune personne réelle.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Sauf mention contraire, les contenus du site (textes, structure,
          univers pédagogique, personnages) sont la propriété de
          l&apos;éditeur. Toute reproduction ou réutilisation sans
          autorisation préalable est interdite.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative au site ou à ces mentions légales,
          voir la{" "}
          <a
            href="/contact"
            className="font-semibold text-foreground underline decoration-gold/60 underline-offset-4"
          >
            page contact
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}

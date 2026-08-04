import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Contact | Académie Kerboeuf",
  description: "Contacter l'équipe de l'Académie Kerboeuf.",
};

export default function ContactPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Nous écrire
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Contact
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Une question, une erreur signalée, une suggestion sur une
            ressource ou un niveau ? Écrivez-nous directement par e-mail.
          </p>
        </header>

        <div className="mt-10 rounded-md border border-jade/25 bg-jade/[0.06] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-jade">
            E-mail
          </p>
          <a
            href="mailto:swann.kerboeuf@gmail.com"
            className="mt-2 block text-xl font-black text-foreground hover:text-jade"
          >
            swann.kerboeuf@gmail.com
          </a>
          <p className="mt-4 text-sm leading-7 text-muted">
            L&apos;Académie Kerboeuf est un projet pédagogique en
            construction, sans équipe support dédiée ni engagement de délai
            de réponse. Chaque message est lu.
          </p>
        </div>
      </div>
    </main>
  );
}

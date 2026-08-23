import Link from "next/link";

import {
  footerPrimaryNavigationItems,
  footerSecondaryNavigationItems,
  legalNavigationItems,
} from "@/content/navigation";

const footerSections = [
  { title: "Navigation principale", links: footerPrimaryNavigationItems },
  { title: "Accès contextuels", links: footerSecondaryNavigationItems },
  { title: "Informations légales", links: legalNavigationItems },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink/70 px-4 py-10 sm:px-6 lg:px-8 print:hidden">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto_auto_auto]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span className="grid size-10 place-items-center rounded-md border border-gold/40 bg-gold/10 text-sm font-black text-gold">
              AK
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[0.16em] text-foreground">
                ACADEMIE
              </span>
              <span className="block text-xs font-medium tracking-[0.22em] text-gold">
                KERBOEUF
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
            Une académie secrète pédagogique pour structurer les niveaux,
            les élèves, les matières et les missions de la maternelle à la
            Terminale.
          </p>
        </div>

        {footerSections.map((section) => (
          <nav key={section.title} aria-label={section.title}>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              {section.title}
            </h2>
            <div className="mt-4 grid gap-3">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-sm text-sm font-medium text-muted transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        ))}
      </div>
    </footer>
  );
}

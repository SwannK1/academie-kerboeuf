import Link from "next/link";

const footerLinks = [
  { label: "Maternelle",  href: "/maternelle"  },
  { label: "Primaire",    href: "/primaire"    },
  { label: "Collège",     href: "/college"     },
  { label: "Lycée",       href: "/lycee"       },
  { label: "Professeurs", href: "/professeurs" },
  { label: "Ressources",  href: "/ressources"  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink/70 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md border border-jade/40 bg-jade/10 text-sm font-black text-jade">
              AK
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[0.16em] text-foreground">
                ACADÉMIE
              </span>
              <span className="block text-xs font-medium tracking-[0.22em] text-jade">
                KERBOEUF
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            Une plateforme pédagogique structurée pour apprendre, s&apos;entraîner
            et progresser.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
            Niveaux
          </p>
          <div className="mt-4 grid gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

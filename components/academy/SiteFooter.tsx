import Link from "next/link";
import { mainNavigation, restaurantInfo } from "@/content/restaurant-info";

const footerSections = [
  {
    title: "Restaurant",
    links: [{ label: "Accueil", href: "/" }, ...mainNavigation],
  },
  {
    title: "Infos",
    links: [
      { label: restaurantInfo.phoneDisplay, href: `tel:${restaurantInfo.phoneInternational}` },
      { label: restaurantInfo.address.addressLocality, href: "/contact" },
      { label: "Réserver une table", href: restaurantInfo.reservationPath },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink/70 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto_auto]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md border border-gold/40 bg-gold/10 text-sm font-black text-gold">
              JF
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[0.16em] text-foreground">
                CHEZ JUJU
              </span>
              <span className="block text-xs font-medium tracking-[0.22em] text-gold">
                & FIFI
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
            {restaurantInfo.name} est un restaurant français situé à Chelles,
            avec une cuisine traditionnelle, un menu du jour, une terrasse et
            des réservations pour les repas de groupe.
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              {section.title}
            </h2>
            <div className="mt-4 grid gap-3">
              {section.links.map((link) => (
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
        ))}
      </div>
    </footer>
  );
}

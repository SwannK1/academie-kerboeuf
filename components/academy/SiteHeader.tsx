"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Maternelle", href: "/maternelle" },
  { label: "Primaire", href: "/primaire" },
  { label: "Collège", href: "/college" },
  { label: "Lycée", href: "/lycee" },
  { label: "Univers", href: "/univers" },
  { label: "Enseignants", href: "/enseignants" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-md border border-gold/40 bg-gold/10 text-sm font-black text-gold shadow-[0_0_28px_rgba(243,196,91,0.18)]">
            AK
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-sm font-semibold tracking-[0.16em] text-foreground">
              ACADEMIE
            </span>
            <span className="truncate text-xs font-medium tracking-[0.22em] text-gold">
              KERBOEUF
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded px-2.5 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-gold text-ink"
                    : "text-muted hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-md border border-white/12 bg-white/[0.06] text-foreground lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span
              className={`h-0.5 rounded-full bg-current transition ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 rounded-full bg-current transition ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 rounded-full bg-current transition ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-ink/96 px-4 py-3 shadow-2xl shadow-black/40 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-3 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-gold text-ink"
                      : "bg-white/[0.04] text-muted hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}

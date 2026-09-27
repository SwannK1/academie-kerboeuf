"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/icons/Icon";
import { SearchDialog } from "@/components/workspace/SearchDialog";
import {
  headerNavigationItems,
  isGlobalNavItemActive,
  mobileNavigationItems,
} from "@/content/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
      const target = event.target as HTMLElement;
      const typing = target.closest("input, textarea, select, [contenteditable=true]");
      if (((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") || (event.key === "/" && !typing)) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const workspaceActive = isGlobalNavItemActive(pathname, { href: "/mon-espace" });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/90 backdrop-blur-xl print:hidden">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-md border border-gold/40 bg-gold/10 text-[13px] font-black text-gold">
            AK
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-semibold tracking-[0.16em] text-foreground">ACADÉMIE</span>
            <span className="text-xs font-medium tracking-[0.22em] text-gold">KERBOEUF</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {headerNavigationItems.map((item) => {
            const active = isGlobalNavItemActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-md px-3.5 py-2 text-[15px] font-medium transition ${
                  active ? "text-foreground" : "text-muted hover:bg-ink/5 hover:text-foreground"
                }`}
              >
                {item.label}
                {active ? <span className="absolute inset-x-3.5 -bottom-[13px] h-0.5 rounded-full bg-gold" aria-hidden="true" /> : null}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-10 items-center gap-2 rounded-md px-2.5 text-muted transition hover:bg-ink/5 hover:text-foreground sm:border sm:border-line sm:bg-panel-soft sm:pr-3"
          >
            <Icon name="search" className="h-[18px] w-[18px]" />
            <span className="sr-only sm:not-sr-only sm:text-sm">Recherche</span>
            <kbd className="hidden rounded border border-line px-1.5 text-[11px] text-muted lg:inline">/</kbd>
          </button>
          <Link
            href="/mon-espace"
            aria-current={workspaceActive ? "page" : undefined}
            className={`hidden h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition md:flex ${
              workspaceActive ? "text-foreground" : "text-muted hover:bg-ink/5 hover:text-foreground"
            }`}
          >
            <Icon name="user" className="h-[18px] w-[18px]" />
            Mon espace
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-10 place-items-center rounded-md text-foreground hover:bg-ink/5 md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">{isOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span className={`h-0.5 rounded-full bg-current transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 rounded-full bg-current transition ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 rounded-full bg-current transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div id="mobile-navigation" className="border-t border-line bg-background px-4 py-3 shadow-xl md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {mobileNavigationItems.map((item) => {
              const active = isGlobalNavItemActive(pathname, item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-3 py-3 text-base font-medium transition ${
                    active ? "bg-ink/6 text-foreground" : "text-muted hover:bg-ink/5 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

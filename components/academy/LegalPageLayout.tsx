import type { ReactNode } from "react";
import Link from "next/link";

import { Breadcrumb } from "@/components/navigation/breadcrumb";

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalPageLayout({
  eyebrow,
  title,
  description,
  children,
}: LegalPageLayoutProps) {
  return (
    <main id="contenu-principal" className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: title }]} />

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted">
          {description}
        </p>

        <div className="mt-10 space-y-5 text-sm leading-7 text-muted">
          {children}
        </div>
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-md border border-white/10 bg-white/[0.035] p-5 sm:p-6">
      <h2 className="text-lg font-black text-foreground">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function PlaceholderNotice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border border-gold/25 bg-gold/10 p-4 font-semibold text-gold">
      {children}
    </p>
  );
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 transition hover:text-foreground"
    >
      {children}
    </Link>
  );
}

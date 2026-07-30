import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description?: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPage({
  eyebrow,
  title,
  description,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: title }]} />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
              {description}
            </p>
          ) : null}
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Dernière mise à jour : {lastUpdated}
          </p>

          <div className="legal-content mt-10 space-y-8 border-t border-white/10 pt-10">
            {children}
          </div>
        </div>
      </section>
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
    <section>
      <h2 className="text-xl font-black text-foreground">{title}</h2>
      <div className="mt-3 space-y-4 text-sm leading-7 text-muted sm:text-base">
        {children}
      </div>
    </section>
  );
}

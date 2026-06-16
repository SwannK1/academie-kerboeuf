import Link from "next/link";
import type { ReactNode } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type HierarchyPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: BreadcrumbItem[];
  children: ReactNode;
};

export function HierarchyPage({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: HierarchyPageProps) {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb items={breadcrumb} />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            {description}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">{children}</div>
        </div>
      </section>
    </main>
  );
}

type Accent = "gold" | "jade" | "sky" | "ember";

const accentClasses: Record<Accent, string> = {
  gold: "border-gold/30 bg-gold/[0.06] text-gold",
  jade: "border-jade/30 bg-jade/[0.06] text-jade",
  sky: "border-sky/30 bg-sky/[0.06] text-sky",
  ember: "border-ember/30 bg-ember/[0.06] text-ember",
};

type HierarchyCardProps = {
  number?: string;
  title: string;
  description: string;
  href?: string;
  available?: boolean;
  accent: Accent;
  children?: ReactNode;
};

export function HierarchyCard({
  number,
  title,
  description,
  href,
  available = false,
  accent,
  children,
}: HierarchyCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          {number ? (
            <p className="text-xs font-black uppercase tracking-[0.18em]">
              {number}
            </p>
          ) : null}
          <h2 className="mt-2 text-xl font-black text-foreground">{title}</h2>
        </div>
        <PublicStatusBadge
          status={href || available ? "available" : "in-progress"}
        />
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
      {href ? (
        <span className="mt-6 inline-flex text-sm font-black text-foreground">
          Ouvrir <span aria-hidden="true">&nbsp;→</span>
        </span>
      ) : null}
    </>
  );

  const className = `rounded-lg border p-5 sm:p-6 ${accentClasses[accent]}`;

  return href ? (
    <Link
      href={href}
      className={`${className} transition hover:-translate-y-0.5 hover:bg-white/[0.08]`}
    >
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
  );
}

export function ProfileLinks({
  profiles,
}: {
  profiles: { name: string; href: string; detail: string }[];
}) {
  return (
    <ul className="grid gap-2">
      {profiles.map((profile) => (
        <li key={profile.href}>
          <Link
            href={profile.href}
            className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-background/45 px-3 py-2.5 text-sm font-bold text-foreground transition hover:border-white/25"
          >
            <span>{profile.name}</span>
            <span className="shrink-0 text-xs font-medium text-muted">
              {profile.detail}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

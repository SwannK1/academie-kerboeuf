import type { ReactNode } from "react";

type DetailPanelProps = {
  title: string;
  titleLevel?: "h2" | "h3" | "h4";
  eyebrow?: string;
  children: ReactNode;
};

export function DetailPanel({
  title,
  titleLevel = "h2",
  eyebrow,
  children,
}: DetailPanelProps) {
  const Heading = titleLevel;

  return (
    <article className="mission-detail-card rounded-md border border-white/10 bg-white/[0.045] p-5">
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-xl font-black text-foreground">{title}</Heading>
      <div className="mt-5">{children}</div>
    </article>
  );
}

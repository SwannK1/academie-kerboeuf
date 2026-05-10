import type { ReactNode } from "react";

type DetailPanelProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function DetailPanel({ title, eyebrow, children }: DetailPanelProps) {
  return (
    <article className="mission-detail-card rounded-md border border-white/10 bg-white/[0.045] p-5">
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-xl font-black text-foreground">{title}</h2>
      <div className="mt-5">{children}</div>
    </article>
  );
}

import type { ReactNode } from "react";

type AccentPanelProps = {
  title: string;
  accentClass: string;
  children: ReactNode;
};

export function AccentPanel({ title, accentClass, children }: AccentPanelProps) {
  return (
    <div className="mission-detail-card rounded-md border border-white/10 bg-white/[0.04] p-6">
      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${accentClass}`}>
        {title}
      </p>
      {typeof children === "string" ? (
        <p className="mt-4 text-sm leading-7 text-muted">{children}</p>
      ) : (
        <div className="mt-4 text-sm leading-7 text-muted">{children}</div>
      )}
    </div>
  );
}

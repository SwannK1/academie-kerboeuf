import Link from "next/link";
import type { ReactNode } from "react";

type MissionMetaProps = {
  label: string;
  value: ReactNode;
  href?: string;
};

export function MissionMeta({ label, value, href }: MissionMetaProps) {
  const content = (
    <>
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="mission-detail-card flex items-center justify-between gap-4 rounded border border-white/10 bg-white/[0.04] p-3 transition hover:border-gold/30 hover:bg-white/[0.07]"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="mission-detail-card flex items-center justify-between gap-4 rounded border border-white/10 bg-white/[0.04] p-3">
      {content}
    </div>
  );
}

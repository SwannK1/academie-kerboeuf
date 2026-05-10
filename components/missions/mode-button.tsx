import type { ReactNode } from "react";

type ModeButtonProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function ModeButton({ active, onClick, children }: ModeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md px-4 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
        active
          ? "bg-gold text-ink"
          : "border border-white/15 bg-white/[0.05] text-foreground hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

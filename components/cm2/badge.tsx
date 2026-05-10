type BadgeProps = {
  children: string;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded border border-gold/25 bg-gold/10 px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gold">
      {children}
    </span>
  );
}

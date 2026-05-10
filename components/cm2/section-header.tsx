type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
        {description}
      </p>
    </div>
  );
}

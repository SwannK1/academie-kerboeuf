import {
  getPublicStatusAriaLabel,
  getPublicStatusClassName,
  getPublicStatusLabel,
} from "@/content/public-status";

type PublicStatusBadgeProps = {
  status: unknown;
  className?: string;
};

export function PublicStatusBadge({
  status,
  className = "",
}: PublicStatusBadgeProps) {
  return (
    <span
      aria-label={getPublicStatusAriaLabel(status)}
      className={[
        "inline-flex w-fit rounded border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em]",
        getPublicStatusClassName(status),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {getPublicStatusLabel(status)}
    </span>
  );
}

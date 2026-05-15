export type AccentTokens = { text: string; border: string; bg: string };

export const CM2_ACCENT: Record<string, AccentTokens> = {
  jade:  { text: "text-jade",  border: "border-jade/30",  bg: "bg-jade/10"  },
  gold:  { text: "text-gold",  border: "border-gold/30",  bg: "bg-gold/10"  },
  sky:   { text: "text-sky",   border: "border-sky/30",   bg: "bg-sky/10"   },
  ember: { text: "text-ember", border: "border-ember/30", bg: "bg-ember/10" },
};

import { cn } from "@/lib/cn";

type LogoSymbolProps = {
  className?: string;
};

export function LogoSymbol({ className }: LogoSymbolProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Score Deck"
      className={cn("h-10 w-10 drop-shadow-[0_0_18px_rgba(0,193,255,0.32)]", className)}
      fill="none"
    >
      <defs>
        <linearGradient
          id="scoredeck-tile"
          x1="8"
          y1="6"
          x2="42"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00C1FF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Domino tile */}
      <rect x="5" y="5" width="38" height="38" rx="11" fill="url(#scoredeck-tile)" />
      {/* Soft top highlight */}
      <rect x="5" y="5" width="38" height="19" rx="11" fill="#ffffff" fillOpacity="0.08" />
      {/* Divider */}
      <rect x="5" y="23" width="38" height="2.5" rx="1.25" fill="#ffffff" fillOpacity="0.92" />
      {/* Pips */}
      <circle cx="16" cy="14" r="3.1" fill="#ffffff" />
      <circle cx="32" cy="14" r="3.1" fill="#ffffff" />
      <circle cx="24" cy="31.5" r="3.1" fill="#ffffff" />
    </svg>
  );
}

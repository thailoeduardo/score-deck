import { LogoSymbol } from "@/components/brand/LogoSymbol";
import { cn } from "@/lib/cn";

type FullLogoProps = {
  className?: string;
  symbolClassName?: string;
};

export function FullLogo({ className, symbolClassName }: FullLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoSymbol className={symbolClassName} />
      <span className="text-lg font-display font-extrabold uppercase text-foreground">Score Deck</span>
    </div>
  );
}

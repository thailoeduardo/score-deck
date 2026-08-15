import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({ label = "Carregando", className }: LoadingStateProps) {
  return (
    <div className={cn("flex min-h-40 items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 text-muted-foreground", className)}>
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
      <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}

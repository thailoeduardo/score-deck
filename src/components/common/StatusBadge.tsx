import type React from "react";
import { cn } from "@/lib/cn";
import type { StatusVariant } from "@/types/common";

const variantClasses: Record<StatusVariant, string> = {
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  danger: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
  info: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  neutral: "border-border bg-muted/60 text-muted-foreground",
};

type StatusBadgeProps = {
  children: React.ReactNode;
  variant?: StatusVariant;
  className?: string;
};

export function StatusBadge({ children, variant = "neutral", className }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest", variantClasses[variant], className)}>
      {children}
    </span>
  );
}

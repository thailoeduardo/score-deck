import type React from "react";
import type { LucideIcon } from "lucide-react";
import { CircleDashed } from "lucide-react";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon: Icon = CircleDashed, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-64 flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center", className)}>
      <div className="mb-5 rounded-2xl border border-border bg-muted/60 p-3 text-muted-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-bold uppercase text-foreground">{title}</h2>
      {description ? <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

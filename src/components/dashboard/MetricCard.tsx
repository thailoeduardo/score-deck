import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cn } from "@/lib/cn";
import type { StatusVariant } from "@/types/common";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  status?: StatusVariant;
  icon: LucideIcon;
  className?: string;
};

export function MetricCard({ title, value, change, status = "success", icon: Icon, className }: MetricCardProps) {
  return (
    <article className={cn("rounded-xl border border-border bg-card p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl border border-border bg-muted/60 p-3 text-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <StatusBadge variant={status}>
          <ArrowUpRight className="mr-1 h-3 w-3" />
          {change}
        </StatusBadge>
      </div>
      <div className="mt-6 space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
        <p className="text-3xl font-extrabold uppercase text-foreground">{value}</p>
      </div>
    </article>
  );
}

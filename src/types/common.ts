import type React from "react";

export type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral";

export type NavigationItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

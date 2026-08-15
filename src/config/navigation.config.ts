import { BarChart3, Gauge, Layers3, Settings, Sparkles } from "lucide-react";
import { routesConfig } from "@/config/routes.config";
import type { NavigationItem } from "@/types/common";

export const mainNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: routesConfig.app.dashboard,
    icon: Gauge,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Produtos",
    href: "/dashboard/products",
    icon: Layers3,
  },
  {
    title: "Automações",
    href: "/dashboard/automation",
    icon: Sparkles,
  },
  {
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

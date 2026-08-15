import { NavLink, Outlet } from "react-router-dom";
import { Bell, Command, LogOut, Menu, Search } from "lucide-react";
import { FullLogo } from "@/components/brand/FullLogo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { mainNavigation } from "@/config/navigation.config";
import { cn } from "@/lib/cn";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border/70 bg-card p-5 lg:flex lg:flex-col">
        <FullLogo className="mb-10" symbolClassName="h-9 w-9" />
        <nav className="flex flex-1 flex-col gap-2">
          {mainNavigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground",
                  isActive && "border border-primary/20 bg-primary/10 text-foreground",
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </NavLink>
          ))}
        </nav>
        <Button variant="ghost" className="justify-start">
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
              <FullLogo symbolClassName="h-8 w-8" />
            </div>
            <div className="hidden h-10 min-w-0 max-w-md flex-1 items-center gap-3 rounded-xl border border-border bg-card px-4 text-muted-foreground md:flex">
              <Search className="h-4 w-4 shrink-0" />
              <span className="truncate text-sm">Buscar produtos, métricas ou automações</span>
              <kbd className="ml-auto rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase">
                <Command className="mr-1 inline h-3 w-3" />K
              </kbd>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" aria-label="Notificações">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-9 w-9 rounded-xl border border-border bg-brand-gradient p-[1px]">
                <div className="grid h-full w-full place-items-center rounded-[11px] bg-card font-mono text-xs font-bold text-foreground">
                  KR
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="px-4 py-8 md:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

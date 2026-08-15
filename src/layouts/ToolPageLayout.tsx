import type { PropsWithChildren, ReactNode } from "react";
import { FullLogo } from "@/components/brand/FullLogo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { cn } from "@/lib/cn";

const currentYear = new Date().getFullYear();

type ToolPageLayoutProps = PropsWithChildren;

type ToolPageHeaderProps = {
  toolName: string;
};

type ToolPageMainProps = {
  children: ReactNode;
  className?: string;
};

type ToolPageFooterProps = {
  companyName?: string;
};

export function ToolPageLayout({ children }: ToolPageLayoutProps) {
  return (
    <div className="dot-pattern relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,193,255,0.16),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,0,239,0.12),transparent_26%),linear-gradient(180deg,hsl(var(--background)/0.66),hsl(var(--background))_72%)]" />
      {children}
    </div>
  );
}

export function ToolPageHeader({ toolName }: ToolPageHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-8">
        <div>
          <FullLogo symbolClassName="h-9 w-9" />
          <p className="mt-1 text-sm font-medium text-muted-foreground">{toolName}</p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

export function ToolPageMain({ children, className }: ToolPageMainProps) {
  return (
    <main className={cn("relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 pb-28 pt-32 md:px-8", className)}>
      {children}
    </main>
  );
}

export function ToolPageFooter({ companyName = "Kriathus" }: ToolPageFooterProps) {
  return (
    <footer className="relative z-10 border-t border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-center px-4 text-center text-sm text-muted-foreground md:px-8">
        Copyright © {currentYear} {companyName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}

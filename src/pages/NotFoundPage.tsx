import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 inset-x-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <span className="text-lg font-display font-extrabold uppercase tracking-wide text-foreground">
            Score <span className="brand-text-gradient">Deck</span>
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 pt-16 pb-24 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-gradient font-display text-4xl font-extrabold text-white shadow-brand-glow">
          404
        </div>
        <h1 className="text-2xl font-display font-extrabold uppercase tracking-tight text-foreground">
          Página não encontrada
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida. Que tal voltar para o placar?
        </p>
        <Button asChild className="mt-8 rounded-xl shadow-brand-glow">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" /> Voltar para o Início
          </Link>
        </Button>
      </main>
    </div>
  );
}

import { LoginForm } from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";
import { routesConfig } from "@/config/routes.config";

export function LoginPage() {
  return (
    <div className="rounded-xl border border-border bg-card/95 p-6 shadow-brand-glow backdrop-blur md:p-8">
      <div className="mb-8 space-y-3 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Acesso seguro</p>
        <h1 className="text-3xl font-display font-extrabold uppercase text-foreground">Score Deck</h1>
        <p className="text-sm leading-6 text-muted-foreground">Entre para marcar e gerenciar seus jogos de dominó online com seus amigos.</p>
      </div>
      <LoginForm />
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <Link to={routesConfig.auth.register} className="font-semibold text-primary hover:underline">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}

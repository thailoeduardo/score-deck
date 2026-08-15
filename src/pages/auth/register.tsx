import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { routesConfig } from "@/config/routes.config";

export function RegisterPage() {
  return (
    <div className="rounded-xl border border-border bg-card/95 p-6 shadow-brand-glow backdrop-blur md:p-8">
      <div className="mb-8 space-y-3 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Nova Conta</p>
        <h1 className="text-3xl font-display font-extrabold uppercase text-foreground">Score Deck</h1>
        <p className="text-sm leading-6 text-muted-foreground">Crie sua conta para registrar os jogos de dominó da sua galera.</p>
      </div>
      <RegisterForm />
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link to={routesConfig.auth.login} className="font-semibold text-primary hover:underline">
          Faça Login
        </Link>
      </div>
    </div>
  );
}

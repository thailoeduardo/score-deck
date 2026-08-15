import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuthStore } from "@/store/authStore";
import { routesConfig } from "@/config/routes.config";

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(routesConfig.auth.login, { replace: true });
  };

  const initials = user?.name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") ?? "?";

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 inset-x-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-display font-extrabold uppercase tracking-wide text-foreground">
              Meu <span className="brand-text-gradient">Perfil</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 pt-24 pb-8 md:px-8">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-brand-gradient text-2xl font-display font-extrabold text-white shadow-brand-glow">
              {initials}
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              {user?.name || "Jogador"}
            </h2>
            {user?.email ? (
              <p className="mt-1 font-mono text-sm text-muted-foreground">{user.email}</p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="p-4 flex items-center gap-4 border-b border-border/50">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Conta</h3>
                <p className="text-xs text-muted-foreground">Sessão ativa neste dispositivo</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full p-4 flex items-center gap-4 hover:bg-destructive/5 transition-colors cursor-pointer text-left group"
            >
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                <LogOut className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-destructive group-hover:text-destructive/90">
                  Sair da conta
                </h3>
                <p className="text-xs text-muted-foreground">Encerra a sessão neste dispositivo</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

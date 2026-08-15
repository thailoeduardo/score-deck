import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Play, Sparkles, Trophy, Gamepad2, History, Award, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { listRooms } from "@/lib/api";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LogoSymbol } from "@/components/brand/LogoSymbol";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const { data: rooms = [], isLoading, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: listRooms,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <p className="text-destructive mb-4">Erro ao carregar as informações das salas.</p>
        <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
      </div>
    );
  }

  // Calculate statistics
  const totalRooms = rooms.length;
  const finishedRooms = rooms.filter((r) => r.status === "finished").length;
  const totalRounds = rooms.reduce((sum, r) => sum + (r.rounds?.length || 0), 0);

  // Calculate total unique players
  const playerNamesSet = new Set<string>();
  rooms.forEach((room) => {
    room.players.forEach((p) => playerNamesSet.add(p.name.trim().toLowerCase()));
  });
  const totalPlayers = playerNamesSet.size;

  // Calculate leaderboard (wins per player name)
  const winsMap: Record<string, { name: string; wins: number }> = {};
  rooms.forEach((room) => {
    if (room.status === "finished") {
      const winner = room.players.find((p) => p.id === room.winnerPlayerId || p.status === "winner");
      if (winner) {
        const key = winner.name.trim().toLowerCase();
        if (!winsMap[key]) {
          winsMap[key] = { name: winner.name.trim(), wins: 0 };
        }
        winsMap[key].wins += 1;
      }
    }
  });

  const leaderboard = Object.values(winsMap).sort((a, b) => b.wins - a.wins);

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative top pattern */}
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <LogoSymbol className="h-9 w-9" />
            <span className="text-lg font-display font-extrabold uppercase tracking-wide text-foreground">
              Score <span className="brand-text-gradient">Deck</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-5xl px-4 pt-24 pb-8 md:px-8">
        <div className="flex flex-col gap-8">
          {/* Welcome Panel */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-display font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
                Marcador de <span className="brand-text-gradient">Pontos</span>
              </h1>
              <p className="text-sm text-muted-foreground max-w-xl">
                Gerencie suas rodadas de dominó. O último jogador abaixo de 100 pontos vence.
              </p>
            </div>
          </div>

          {/* First-run CTA */}
          {totalRooms === 0 && (
            <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-cyan-500/10 via-card to-violet-500/10 p-8 text-center md:p-12">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-brand-gradient" />
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-brand-glow">
                <Gamepad2 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-display font-extrabold uppercase tracking-tight text-foreground">
                Bora jogar <span className="brand-text-gradient">dominó</span>?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Crie sua primeira sala, adicione os jogadores e comece a registrar as rodadas em segundos.
              </p>
              <Button asChild size="lg" className="mt-6 h-12 rounded-2xl px-8 font-bold uppercase tracking-wide shadow-brand-glow">
                <Link to="/rooms/new">
                  <Plus className="mr-2 h-5 w-5" /> Criar Primeira Sala
                </Link>
              </Button>
            </section>
          )}

          {/* Stats Overview Grid */}
          {totalRooms > 0 && (
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-muted group-hover:bg-cyan-500/30 transition-all duration-300" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Rodadas</span>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <History className="h-4.5 w-4.5" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-black text-foreground font-mono">{totalRounds}</p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/20">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-muted group-hover:bg-yellow-500/30 transition-all duration-300" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Finalizadas</span>
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Trophy className="h-4.5 w-4.5" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-black text-foreground font-mono">{finishedRooms}</p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-muted group-hover:bg-primary/30 transition-all duration-300" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Salas</span>
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Gamepad2 className="h-4.5 w-4.5" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-black text-foreground font-mono">{totalRooms}</p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-muted group-hover:bg-emerald-500/30 transition-all duration-300" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Jogadores</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Users className="h-4.5 w-4.5" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-black text-foreground font-mono">{totalPlayers}</p>
            </div>
          </section>
          )}

          {/* Leaderboard */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Ranking de Campeões
            </h2>

            {leaderboard.length === 0 ? (
              <p className="text-center text-xs text-muted-foreground py-4">
                Nenhum campeão ainda.
              </p>
            ) : (
              <div className="space-y-2">
                {leaderboard.slice(0, 5).map((player, index) => (
                  <div
                    key={player.name}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${index === 0 ? "bg-yellow-500/5 border border-yellow-500/20" :
                        index === 1 ? "bg-slate-400/5 border border-slate-400/20" :
                          index === 2 ? "bg-amber-600/5 border border-amber-600/20" :
                            "hover:bg-muted/30 border border-transparent"
                      }`}
                  >
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full font-mono text-sm font-bold ${index === 0 ? "bg-yellow-500/20 text-yellow-500" :
                        index === 1 ? "bg-slate-400/20 text-slate-400" :
                          index === 2 ? "bg-amber-600/20 text-amber-600" :
                            "bg-muted text-muted-foreground"
                      }`}>
                      {index + 1}
                    </div>
                    <span className="truncate text-sm font-semibold text-foreground flex-1">
                      {player.name}
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border/50">
                      <Trophy className={`h-3.5 w-3.5 ${index === 0 ? "text-yellow-500" : index === 1 ? "text-slate-400" : index === 2 ? "text-amber-600" : "text-muted-foreground"
                        }`} />
                      <span className="font-mono text-xs font-bold text-foreground">
                        {player.wins}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

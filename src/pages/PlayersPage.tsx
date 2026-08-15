import { useQuery } from "@tanstack/react-query";
import { listRooms } from "@/lib/api";
import { Trophy, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function PlayersPage() {
  const { data: rooms, isLoading, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: listRooms,
  });

  const getPlayersStats = () => {
    if (!rooms) return [];
    
    const statsMap: Record<string, { name: string; wins: number; totalGames: number }> = {};

    rooms.forEach((room) => {
      const isFinished = room.status === "finished";
      const winner = isFinished ? room.players.find((p) => p.id === room.winnerPlayerId || p.status === "winner") : null;

      room.players.forEach(p => {
        const key = p.name.trim().toLowerCase();
        if (!statsMap[key]) {
          statsMap[key] = { name: p.name.trim(), wins: 0, totalGames: 0 };
        }
        statsMap[key].totalGames += 1;

        if (winner && winner.id === p.id) {
          statsMap[key].wins += 1;
        }
      });
    });

    return Object.values(statsMap).sort((a, b) => b.wins - a.wins || b.totalGames - a.totalGames);
  };

  const players = getPlayersStats();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 inset-x-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-display font-extrabold uppercase tracking-wide text-foreground">
              Todos os <span className="brand-text-gradient">Jogadores</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 pt-24 pb-8 md:px-8">
        <div className="space-y-4">
          <div>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : error ? (
              <p className="text-center text-xs text-destructive py-4">
                Erro ao carregar jogadores.
              </p>
            ) : players.length === 0 ? (
              <p className="text-center text-xs text-muted-foreground py-4">
                Nenhum jogador registrado ainda.
              </p>
            ) : (
              <div className="space-y-3">
                {players.map((player) => (
                  <div
                    key={player.name}
                    className="flex items-center gap-4 rounded-xl px-4 py-3 transition-colors border border-border/50 bg-background/50 hover:bg-muted/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                      {player.name.substring(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="truncate text-base font-bold text-foreground">
                        {player.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {player.totalGames} {player.totalGames === 1 ? 'partida jogada' : 'partidas jogadas'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                      <Trophy className="h-4 w-4" />
                      <span className="font-mono text-sm font-bold">
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

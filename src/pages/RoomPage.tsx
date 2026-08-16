import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, UserPlus, Plus, RotateCcw } from "lucide-react";
import { getErrorMessage, getErrorStatus, getRoomById, joinRoom, addRound, rematchRoom } from "@/lib/api";
import type { Player } from "@/types/domino";
import { PointsKeypadModal } from "@/components/room/PointsKeypadModal";
import { useRoomRealtime } from "@/hooks/useRoomRealtime";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Load room details
  const { data: room, isLoading, error } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoomById(roomId!),
    enabled: !!roomId,
    retry: false,
  });

  // Recreate the room with the same players after the match ends
  const rematchMutation = useMutation({
    mutationFn: () => rematchRoom(roomId!),
    onSuccess: (newRoom) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Nova partida criada com os mesmos jogadores!");
      navigate(`/rooms/${newRoom.id}`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Erro ao criar nova partida."));
    },
  });

  // Live updates: refresh the scoreboard when another user changes the room
  useRoomRealtime(roomId);

  const joinMutation = useMutation({
    mutationFn: () => joinRoom(roomId!),
    onSuccess: () => {
      toast.success("Você entrou na sala com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      toast.error("Não foi possível aceitar o convite.");
    },
  });

  // Quick points entry: player tapped on the scoreboard gets the points and the
  // round winner is chosen inside the modal (other players get 0).
  const [scoringPlayer, setScoringPlayer] = useState<Player | null>(null);

  const addPointsMutation = useMutation({
    mutationFn: ({ winnerPlayerId, scores }: { winnerPlayerId: string; scores: Record<string, number> }) =>
      addRound(roomId!, { winnerPlayerId, scores }),
    onSuccess: (updatedRoom) => {
      queryClient.setQueryData(["room", roomId], updatedRoom);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success(updatedRoom.status === "finished" ? "Partida encerrada! 🏆" : "Pontos registrados!");
      setScoringPlayer(null);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Erro ao registrar pontos."));
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    const isForbidden = getErrorStatus(error) === 403;
    if (isForbidden) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
          <div className="rounded-full bg-primary/10 p-5 mb-6 text-primary">
            <UserPlus className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight mb-2">Convite para Partida</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-sm">
            Você foi convidado para assistir e gerenciar esta partida de dominó. Clique abaixo para entrar.
          </p>
          <div className="flex flex-col w-full max-w-xs gap-3">
            <Button 
              size="lg" 
              onClick={() => joinMutation.mutate()} 
              disabled={joinMutation.isPending}
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/95 shadow-brand-glow text-base font-bold uppercase tracking-wide"
            >
              {joinMutation.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              Aceitar Convite
            </Button>
            <Button variant="ghost" onClick={() => navigate("/rooms")} className="h-14 text-muted-foreground rounded-2xl font-semibold">
              Voltar para o Início
            </Button>
          </div>
        </div>
      );
    }
  }

  if (error || !room) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <p className="text-destructive mb-4">Erro ao carregar as informações da sala.</p>
        <Button onClick={() => navigate("/rooms")}>Voltar para Salas</Button>
      </div>
    );
  }

  // Sorting players: Winner -> Active (low score first) -> Eliminated (low score first)
  const sortedPlayers = [...room.players].sort((a, b) => {
    if (a.status === "winner") return -1;
    if (b.status === "winner") return 1;
    if (a.status === "active" && b.status === "eliminated") return -1;
    if (a.status === "eliminated" && b.status === "active") return 1;
    return a.totalPoints - b.totalPoints;
  });

  // Helper for progress bar color
  const getProgressBarColor = (points: number, status: string) => {
    if (status === "eliminated") return "bg-destructive";
    if (status === "winner") return "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]";
    if (points >= 80) return "bg-red-500";
    if (points >= 50) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="bg-background">
      {/* Players divided equally across the full screen height (scrolls when many) */}
      <div className="flex h-[calc(100dvh-5rem)] flex-col overflow-y-auto">
        {sortedPlayers.map((player, index) => {
          const isWinner = player.status === "winner";
          const isEliminated = player.status === "eliminated";
          const pct = Math.min(100, Math.max(0, player.totalPoints));
          const remaining = 100 - player.totalPoints;

          return (
            <div
              key={player.id}
              className={`flex min-h-44 flex-1 flex-col items-center justify-center gap-2.5 border-b border-border p-4 text-center transition-colors ${
                isWinner
                  ? "bg-gradient-to-b from-yellow-500/10 to-transparent"
                  : isEliminated
                    ? "bg-card opacity-50"
                    : "bg-card"
              }`}
            >
              {/* Status */}
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-6 min-w-6 items-center justify-center rounded-lg px-1.5 font-mono text-xs font-extrabold ${
                    isWinner
                      ? "bg-yellow-500 text-black"
                      : isEliminated
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary"
                  }`}
                >
                  {index + 1}º
                </span>
                {isWinner ? (
                  <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">
                    🏆 Vencedor!
                  </span>
                ) : isEliminated ? (
                  <span className="text-xs font-bold text-destructive">
                    Eliminado (100+ pts)
                  </span>
                ) : (
                  <span className="font-mono text-xs text-muted-foreground">
                    Restam {remaining} pts
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="w-full truncate px-2 text-2xl font-display font-extrabold text-foreground">
                {player.name}
              </h3>

              {/* Points */}
              <div className="leading-none">
                <span className="font-mono text-6xl font-black text-foreground tabular-nums">
                  {player.totalPoints}
                </span>
                <span className="font-mono text-xl text-muted-foreground">/100</span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full max-w-md overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressBarColor(
                    player.totalPoints,
                    player.status,
                  )}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Champion card: start a new match with the same players */}
              {isWinner ? (
                <Button
                  type="button"
                  onClick={() => rematchMutation.mutate()}
                  disabled={rematchMutation.isPending}
                  className="mt-auto w-full h-[50px] rounded-xl text-base font-bold uppercase tracking-wide shadow-brand-glow hover:brightness-110 active:scale-[0.99]"
                >
                  {rematchMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <RotateCcw className="h-5 w-5" />
                  )}
                  Nova Partida
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  disabled={player.status !== "active" || addPointsMutation.isPending}
                  onClick={() => setScoringPlayer(player)}
                  className="mt-auto w-full h-[50px] rounded-xl text-base font-bold uppercase tracking-wide shadow-brand-glow hover:brightness-110 active:scale-[0.99]"
                  title={player.status === "active" ? "Adicionar pontos" : "Jogador eliminado (100+ pts)"}
                  aria-label={`Adicionar pontos para ${player.name}`}
                >
                  <Plus className="h-5 w-5" />
                  Adicionar ponto(s)
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick points keypad modal */}
      <PointsKeypadModal
        open={!!scoringPlayer}
        onOpenChange={(open) => {
          if (!open) setScoringPlayer(null);
        }}
        player={scoringPlayer}
        activePlayers={room.players.filter((p) => p.status === "active")}
        isSubmitting={addPointsMutation.isPending}
        onConfirm={(winnerPlayerId, scores) => {
          if (!scoringPlayer) return;
          addPointsMutation.mutate({ winnerPlayerId, scores });
        }}
      />
    </div>
  );
}

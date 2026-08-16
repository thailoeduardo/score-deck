import { Calendar, Trophy, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Room } from "@/types/domino";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom, getErrorMessage } from "@/lib/api";
import { toast } from "sonner";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const isFinished = room.status === "finished";
  const playerNames = room.players.map((p) => p.name).join(", ");
  const activeCount = room.players.filter((p) => p.status === "active" || p.status === "winner").length;
  
  // Format date
  const formattedDate = new Date(room.updatedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Find winner if finished
  const winner = room.players.find((p) => p.id === room.winnerPlayerId || p.status === "winner");

  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const isOwner = user?.id === room.ownerId;

  const deleteMutation = useMutation({
    mutationFn: () => deleteRoom(room.id),
    onSuccess: () => {
      toast.success("Sala apagada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Erro ao apagar sala."));
    },
  });

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
      {/* Decorative gradient border top */}
      <div className="absolute inset-x-0 top-0 h-1 bg-muted group-hover:bg-brand-gradient transition-all duration-300" />

      <div className="space-y-4 flex flex-col">
        {/* Status & Actions */}
        <div className="flex justify-between items-start">
          <div className="flex justify-start">
            {isFinished ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                <Trophy className="h-3 w-3" />
                Finalizada
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Em andamento
              </span>
            )}
          </div>

          {isOwner && (
            <ConfirmDialog
              title="Apagar sala"
              description={`Tem certeza que deseja apagar a sala "${room.name}"? Esta ação não pode ser desfeita.`}
              confirmLabel="Apagar"
              cancelLabel="Cancelar"
              confirmVariant="destructive"
              onConfirm={() => deleteMutation.mutate()}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive shrink-0 -mt-1 -mr-1"
                  disabled={deleteMutation.isPending}
                  title="Apagar Sala"
                >
                  {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
              }
            />
          )}
        </div>

        {/* Nome & Data */}
        <div className="space-y-1">
          <h3 className="text-xl font-display font-bold text-foreground line-clamp-1 group-hover:brand-text-gradient transition-colors duration-300 tracking-wide">
            {room.name}
          </h3>
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
        </div>

        {/* Vencedor */}
        {isFinished && winner && (
          <div className="flex items-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-sm text-yellow-700 dark:text-yellow-300 font-semibold">
            <Trophy className="h-4 w-4 shrink-0 text-yellow-500 animate-bounce" />
            <span>Vencedor: {winner.name}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex items-center gap-3">
        <Button
          asChild
          variant={isFinished ? "secondary" : "primary"}
          className="flex-1 rounded-xl shadow-none font-semibold"
        >
          <Link to={`/rooms/${room.id}`}>
            {isFinished ? "Ver Detalhes" : "Jogar / Placar"}
          </Link>
        </Button>
      </div>
    </div>
  );
}

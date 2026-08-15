import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Check } from "lucide-react";
import type { Player } from "@/types/domino";
import { toast } from "sonner";

interface AddRoundDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activePlayers: Player[];
  onSave: (winnerPlayerId: string, scores: Record<string, number>) => void;
}

export function AddRoundDialog({ isOpen, onOpenChange, activePlayers, onSave }: AddRoundDialogProps) {
  const [winnerPlayerId, setWinnerPlayerId] = useState<string>("");
  const [scores, setScores] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (activePlayers.length > 0) {
        setWinnerPlayerId(activePlayers[0].id);
      }
      const initialScores: Record<string, string> = {};
      activePlayers.forEach((p) => {
        initialScores[p.id] = "";
      });
      setScores(initialScores);
    }
  }, [isOpen, activePlayers]);

  const handleScoreChange = (playerId: string, value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setScores((prev) => ({
        ...prev,
        [playerId]: value,
      }));
    }
  };

  const handleSave = () => {
    if (!winnerPlayerId) {
      toast.error("Selecione o vencedor da rodada.");
      return;
    }

    const numericScores: Record<string, number> = {};
    let hasError = false;

    activePlayers.forEach((p) => {
      if (p.id === winnerPlayerId) {
        numericScores[p.id] = 0;
        return;
      }

      const scoreStr = scores[p.id];
      if (scoreStr === undefined || scoreStr.trim() === "") {
        toast.error(`Informe os pontos de ${p.name}.`);
        hasError = true;
        return;
      }

      const val = parseInt(scoreStr, 10);
      if (isNaN(val) || val < 0) {
        toast.error(`Pontuação inválida para ${p.name}.`);
        hasError = true;
        return;
      }

      numericScores[p.id] = val;
    });

    if (hasError) return;

    onSave(winnerPlayerId, numericScores);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Rodada</DialogTitle>
          <DialogDescription className="text-sm">
            Quem ganhou a rodada e quantos pontos sobraram na mão dos outros jogadores ativos?
          </DialogDescription>
        </DialogHeader>

        <div className="my-5 space-y-6">
          {/* Winner Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-foreground">Vencedor da Rodada</Label>
            <div className="grid grid-cols-2 gap-2">
              {activePlayers.map((player) => {
                const isWinner = winnerPlayerId === player.id;
                return (
                  <button
                    key={player.id}
                    type="button"
                    onClick={() => setWinnerPlayerId(player.id)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left text-sm font-semibold transition-all duration-200 ${isWinner
                      ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                      : "border-border bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                  >
                    <span className="truncate">{player.name}</span>
                    {isWinner ? (
                      <Trophy className="h-4 w-4 shrink-0 text-yellow-500 animate-pulse" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-border" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Points Inputs */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-foreground">Pontos das peças restantes</Label>
            <div className="space-y-3">
              {activePlayers.map((player) => {
                const isWinner = winnerPlayerId === player.id;
                if (isWinner) {
                  return (
                    <div
                      key={player.id}
                      className="flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground"
                    >
                      <span className="font-semibold">{player.name}</span>
                      <span className="flex items-center gap-1 font-mono text-xs text-yellow-600 dark:text-yellow-400 font-bold">
                        <Check className="h-3.5 w-3.5" /> Ganhou (0 pts)
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={player.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-2.5"
                  >
                    <Label htmlFor={`score-${player.id}`} className="font-semibold text-foreground truncate max-w-[160px]">
                      {player.name}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id={`score-${player.id}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Ex: 12"
                        value={scores[player.id] ?? ""}
                        onChange={(e) => handleScoreChange(player.id, e.target.value)}
                        className="h-10 w-24 rounded-lg text-center font-mono text-base font-bold shadow-none focus-visible:ring-primary"
                      />
                      <span className="text-xs text-muted-foreground font-mono">pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 sm:flex-row flex-col-reverse">
          <Button variant="secondary" className="flex-1 rounded-xl" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="flex-1 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-semibold"
            onClick={handleSave}
          >
            Salvar Rodada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

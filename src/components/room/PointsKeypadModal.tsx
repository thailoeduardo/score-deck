import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Player } from "@/types/domino";
import { cn } from "@/lib/cn";

type PointsKeypadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  player: Player | null;
  activePlayers: Player[];
  isSubmitting: boolean;
  onConfirm: (winnerPlayerId: string, scores: Record<string, number>) => void;
};

const MAX_DIGITS = 3;
type Step = "winner" | "points" | "confirm";

/** Color/label helper based on the 100-point elimination rule. */
function projectedStyle(total: number) {
  if (total >= 100) return { text: "text-destructive", flag: " Eliminado ⚡" };
  if (total >= 80) return { text: "text-amber-500", flag: "" };
  return { text: "text-emerald-500", flag: "" };
}

export function PointsKeypadModal({
  open,
  onOpenChange,
  player,
  activePlayers,
  isSubmitting,
  onConfirm,
}: PointsKeypadModalProps) {
  const [step, setStep] = useState<Step>("winner");
  const [winnerId, setWinnerId] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [loserIndex, setLoserIndex] = useState(0);
  const [points, setPoints] = useState("");

  // Reset state each time the modal opens
  useEffect(() => {
    if (open) {
      setStep("winner");
      setWinnerId("");
      setScores({});
      setLoserIndex(0);
      setPoints("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, player?.id]);

  if (!player) return null;

  const losers = activePlayers.filter((p) => p.id !== winnerId);
  const currentLoser = step === "points" ? losers[loserIndex] : null;
  const pointsInt = points === "" ? 0 : parseInt(points, 10);
  const projected = currentLoser ? currentLoser.totalPoints + pointsInt : 0;
  const projectedInfo = projectedStyle(projected);

  const pressDigit = (digit: string) => {
    setPoints((prev) => (prev.length < MAX_DIGITS ? prev + digit : prev));
  };

  const selectWinner = (id: string) => {
    setWinnerId(id);
    setScores({});
    setLoserIndex(0);
    setPoints("");
    setStep("points");
  };

  const goNext = () => {
    if (!currentLoser) return;
    const value = points === "" ? 0 : pointsInt;
    const nextScores = { ...scores, [currentLoser.id]: value };
    setScores(nextScores);

    if (loserIndex + 1 >= losers.length) {
      setStep("confirm");
    } else {
      setLoserIndex(loserIndex + 1);
      setPoints("");
    }
  };

  const goBack = () => {
    if (step === "points") {
      if (loserIndex > 0) {
        setLoserIndex(loserIndex - 1);
        setPoints(String(scores[losers[loserIndex - 1].id] ?? ""));
      } else {
        setStep("winner");
      }
    } else if (step === "confirm") {
      setStep("points");
      setLoserIndex(Math.max(0, losers.length - 1));
      setPoints("");
    }
  };

  const handleConfirm = () => {
    onConfirm(winnerId, scores);
  };

  const roundTotal = Object.values(scores).reduce((sum, value) => sum + value, 0);

  const keyLabel = (label: string, onClick: () => void, className?: string) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-14 select-none rounded-xl border border-border bg-muted/40 text-xl font-bold text-foreground transition hover:bg-muted/70 active:scale-95",
        className,
      )}
    >
      {label}
    </button>
  );

  const stepProgress = step === "winner" ? "33%" : step === "points" ? "66%" : "100%";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm p-5"
        // Only close via the X button — avoid losing typed points by accident
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {step === "winner"
              ? "Registrar rodada"
              : step === "points"
                ? `Pontos de ${currentLoser?.name ?? ""}`
                : "Confirmar rodada"}
          </DialogTitle>
          <DialogDescription>
            {step === "winner"
              ? "Toque no vencedor da rodada — ele fica com 0 pontos."
              : step === "points"
                ? `Jogador ${loserIndex + 1} de ${losers.length}. Atual: ${currentLoser?.totalPoints ?? 0}/100.`
                : "Confira os pontos antes de registrar."}
          </DialogDescription>
        </DialogHeader>

        {/* Step progress */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand-gradient transition-all duration-300"
            style={{ width: stepProgress }}
          />
        </div>

        {step === "winner" && (
          <div className="space-y-2">
            {activePlayers.length <= 1 ? (
              <p className="rounded-lg border border-dashed border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                Você é o único jogador ativo restante.
              </p>
            ) : (
              activePlayers.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectWinner(p.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-left text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5 active:scale-[0.99]"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Trophy className="h-4 w-4 shrink-0 text-yellow-500/80" />
                    <span className="truncate">{p.name}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {p.totalPoints} pts
                  </span>
                </button>
              ))
            )}
          </div>
        )}

        {step === "points" && currentLoser && (
          <div className="space-y-3">
            {/* Score display + live preview */}
            <div className="space-y-1.5">
              <div
                className={cn(
                  "rounded-xl border px-4 py-3 text-center transition-colors",
                  points !== "" && projected >= 100
                    ? "border-destructive/40 bg-destructive/5"
                    : "border-border bg-muted/30",
                )}
              >
                <span className="font-mono text-5xl font-black text-foreground tabular-nums">
                  {pointsInt}
                </span>
                <span className="ml-1 font-mono text-sm text-muted-foreground">pts</span>
              </div>

              {points !== "" ? (
                <p className="text-center text-sm font-semibold">
                  <span className="text-muted-foreground">Ficará com </span>
                  <span className={cn("font-mono font-bold", projectedInfo.text)}>
                    {projected}/100
                  </span>
                  <span className={cn("font-bold", projectedInfo.text)}>{projectedInfo.flag}</span>
                </p>
              ) : (
                <p className="text-center text-xs text-muted-foreground">
                  Atual: {currentLoser.totalPoints}/100
                </p>
              )}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                <Fragment key={`digit-${digit}`}>
                  {keyLabel(digit, () => pressDigit(digit))}
                </Fragment>
              ))}
              {keyLabel("C", () => setPoints(""), "text-sm text-destructive")}
              {keyLabel("0", () => pressDigit("0"))}
              {keyLabel("⌫", () => setPoints((prev) => prev.slice(0, -1)), "text-lg")}
            </div>

            {/* Navigation */}
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={goBack} className="h-12 px-4">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <Button
                type="button"
                onClick={goNext}
                disabled={points === ""}
                className="flex-1 h-12 font-bold uppercase tracking-wide"
              >
                {loserIndex + 1 >= losers.length ? "Revisar" : "Próximo"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-3">
            <div className="space-y-2">
              {/* Winner row */}
              {(() => {
                const winner = activePlayers.find((p) => p.id === winnerId);
                if (!winner) return null;
                return (
                  <div className="flex items-center justify-between rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2.5 text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                    <span className="flex items-center gap-1.5 truncate">
                      <Trophy className="h-4 w-4 shrink-0" />
                      {winner.name}
                    </span>
                    <span className="font-mono text-xs">0 pts</span>
                  </div>
                );
              })()}

              {/* Loser rows with projected totals */}
              {losers.map((loser) => {
                const value = scores[loser.id] ?? 0;
                const nextTotal = loser.totalPoints + value;
                const style = projectedStyle(nextTotal);
                return (
                  <div
                    key={loser.id}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-semibold text-foreground",
                      nextTotal >= 100
                        ? "border-destructive/30 bg-destructive/5"
                        : "border-border bg-card",
                    )}
                  >
                    <span className="truncate">{loser.name}</span>
                    <span className="ml-2 flex shrink-0 items-center gap-1.5 font-mono text-xs">
                      <span className="text-muted-foreground">
                        {loser.totalPoints} →{" "}
                      </span>
                      <span className={cn("font-bold", style.text)}>{nextTotal}</span>
                      {nextTotal >= 100 ? (
                        <span className="text-destructive">⚡</span>
                      ) : (
                        <span className="font-bold text-foreground">+{value}</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Round total */}
            <p className="text-right text-xs font-mono text-muted-foreground">
              Total da rodada: <span className="font-bold text-foreground">{roundTotal} pts</span>
            </p>

            {/* Navigation */}
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={goBack} className="h-12 px-4">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirm}
                className="flex-1 h-12 font-bold uppercase tracking-wide shadow-brand-glow"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isSubmitting ? "Registrando..." : "Registrar Rodada"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

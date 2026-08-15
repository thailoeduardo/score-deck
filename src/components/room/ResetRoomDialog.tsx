import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResetRoomDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ResetRoomDialog({ isOpen, onOpenChange, onConfirm }: ResetRoomDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reiniciar Partida</DialogTitle>
          <DialogDescription className="text-sm">
            Tem certeza de que deseja reiniciar a partida? Todos os jogadores voltarão para <strong>0 pontos</strong> e o histórico de rodadas será apagado permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-3 sm:flex-row flex-col-reverse">
          <Button variant="secondary" className="flex-1 rounded-xl" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="flex-1 rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold"
            onClick={onConfirm}
          >
            Confirmar Reinício
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

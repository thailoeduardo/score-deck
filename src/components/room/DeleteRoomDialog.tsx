import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteRoomDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  roomName: string;
  onConfirm: () => void;
}

export function DeleteRoomDialog({ isOpen, onOpenChange, roomName, onConfirm }: DeleteRoomDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive">Excluir Sala</DialogTitle>
          <DialogDescription className="text-sm">
            Tem certeza de que deseja excluir a sala <strong>{roomName}</strong>? Esta ação é definitiva e todos os dados da partida serão apagados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-3 sm:flex-row flex-col-reverse">
          <Button variant="secondary" className="flex-1 rounded-xl" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" className="flex-1 rounded-xl" onClick={onConfirm}>
            Excluir Sala
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

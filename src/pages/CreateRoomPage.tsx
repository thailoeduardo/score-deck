import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Play, Share2, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { createRoom } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function CreateRoomPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const room = await createRoom({
        name: `Partida ${new Date().toLocaleDateString("pt-BR")}`,
        playerNames: [],
      });
      toast.success("Sala criada! Você já está na partida.");
      navigate(`/rooms/${room.id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Ocorreu um erro ao criar a sala.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative top pattern */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => navigate("/rooms")}
            className="gap-1.5 rounded-xl font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <span className="text-sm font-display font-extrabold uppercase tracking-wide text-foreground">
            Nova Partida
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-2xl px-4 pt-24 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-display font-extrabold uppercase text-foreground">
              Iniciar <span className="brand-text-gradient">Partida</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Você entra automaticamente como jogador. Depois é só compartilhar o link da sala com seus amigos.
            </p>
          </div>

          {/* Player info card */}
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-brand-glow">
              <UserCheck className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-foreground">Você já está na partida</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Seus amigos entram pela conta deles, pelo link da sala.
              </p>
            </div>
            <Share2 className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/50" />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/95 text-primary-foreground font-extrabold shadow-brand-glow text-lg uppercase tracking-wide"
          >
            {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Play className="mr-2 h-5 w-5" />}
            Iniciar Partida
          </Button>
        </form>
      </main>
    </div>
  );
}

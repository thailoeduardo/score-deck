import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Gamepad2 } from "lucide-react";
import { listRooms } from "@/lib/api";
import { RoomCard } from "@/components/room/RoomCard";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";

export function RoomsPage() {
  const { data: rooms = [], isLoading, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: listRooms,
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 inset-x-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-display font-extrabold uppercase tracking-wide text-foreground">
              Minhas <span className="brand-text-gradient">Salas</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" asChild className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/rooms/new">
                <Plus className="mr-1 h-4 w-4" /> Nova Sala
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 pt-24 pb-8 md:px-8">
        {isLoading ? (
          <LoadingState label="Carregando salas" className="mt-4" />
        ) : error ? (
          <EmptyState
            className="mt-4"
            icon={Gamepad2}
            title="Não foi possível carregar as salas"
            description="Ocorreu um erro ao buscar suas salas. Tente novamente em instantes."
            action={
              <Button onClick={() => window.location.reload()} className="rounded-xl">
                Tentar novamente
              </Button>
            }
          />
        ) : rooms.length === 0 ? (
          <EmptyState
            className="mt-4"
            icon={Gamepad2}
            title="Nenhuma sala encontrada"
            description="Você ainda não tem nenhuma sala de jogo criada. Crie uma para começar a jogar!"
            action={
              <Button asChild className="rounded-xl shadow-brand-glow">
                <Link to="/rooms/new">
                  <Plus className="mr-2 h-4 w-4" /> Criar Primeira Sala
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

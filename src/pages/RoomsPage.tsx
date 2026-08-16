import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Gamepad2, Plus } from "lucide-react";
import { createRoomCategory, getErrorMessage, listRoomCategories, listRooms } from "@/lib/api";
import type { RoomCategoryId } from "@/types/domino";
import { RoomCard } from "@/components/room/RoomCard";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function RoomsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newCategoryName, setNewCategoryName] = useState("");
  const queryClient = useQueryClient();
  const category = searchParams.get("category") as RoomCategoryId | null;
  const { data: categories = [], isLoading: isLoadingCategories, error: categoriesError } = useQuery({
    queryKey: ["room-categories"],
    queryFn: listRoomCategories,
  });
  const selectedCategory = categories.find((item) => item.id === category);
  const { data: rooms = [], isLoading: isLoadingRooms, error: roomsError } = useQuery({
    queryKey: ["rooms", category],
    queryFn: () => listRooms(category ?? undefined),
    enabled: Boolean(category),
  });

  const hasCategory = Boolean(selectedCategory);
  const createCategoryMutation = useMutation({
    mutationFn: createRoomCategory,
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: ["room-categories"] });
      setNewCategoryName("");
      toast.success("Categoria criada com sucesso.");
      navigate(`/rooms?category=${newCategory.id}`);
    },
    onError: (error) => toast.error(getErrorMessage(error, "Não foi possível criar a categoria.")),
  });

  const handleCreateCategory = (event: React.FormEvent) => {
    event.preventDefault();
    const name = newCategoryName.trim();
    if (name) createCategoryMutation.mutate(name);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 inset-x-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            {hasCategory && (
              <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-xl">
                <Link to="/rooms" aria-label="Voltar para categorias"><ArrowLeft className="h-4 w-4" /></Link>
              </Button>
            )}
            <span className="text-lg font-display font-extrabold uppercase tracking-wide text-foreground">
              {selectedCategory ? selectedCategory.name : <>Escolha o <span className="brand-text-gradient">jogo</span></>}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {hasCategory && (
              <Button size="sm" asChild className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to={`/rooms/new?category=${category}`}><Plus className="mr-1 h-4 w-4" /> Nova Sala</Link>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 pt-24 pb-8 md:px-8">
        {!hasCategory ? (
          isLoadingCategories ? <LoadingState label="Carregando jogos" className="mt-4" /> : categoriesError ? (
            <EmptyState className="mt-4" icon={Gamepad2} title="Não foi possível carregar os jogos" description="Tente novamente em instantes." action={<Button onClick={() => window.location.reload()} className="rounded-xl">Tentar novamente</Button>} />
          ) : (
            <section>
              <p className="mb-6 text-sm text-muted-foreground">Selecione uma categoria para ver e criar salas compartilhadas. As categorias são comuns a todos os usuários.</p>
              <form onSubmit={handleCreateCategory} className="mb-6 flex gap-2 rounded-2xl border border-border bg-card p-3">
                <Input value={newCategoryName} onChange={(event) => setNewCategoryName(event.target.value)} maxLength={60} placeholder="Ex.: Cartas (Pife)" aria-label="Nome da nova categoria" />
                <Button type="submit" disabled={!newCategoryName.trim() || createCategoryMutation.isPending} className="shrink-0 rounded-xl">
                  <Plus className="mr-1 h-4 w-4" /> Criar categoria
                </Button>
              </form>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((item) => (
                  <Link key={item.id} to={`/rooms?category=${item.id}`} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                    <Gamepad2 className="mb-4 h-7 w-7 text-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground group-hover:brand-text-gradient">{item.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Ver salas deste jogo</p>
                  </Link>
                ))}
              </div>
            </section>
          )
        ) : isLoadingRooms ? (
          <LoadingState label="Carregando salas" className="mt-4" />
        ) : roomsError ? (
          <EmptyState className="mt-4" icon={Gamepad2} title="Não foi possível carregar as salas" description="Ocorreu um erro ao buscar as salas desta categoria." action={<Button onClick={() => window.location.reload()} className="rounded-xl">Tentar novamente</Button>} />
        ) : rooms.length === 0 ? (
          <EmptyState className="mt-4" icon={Gamepad2} title="Nenhuma sala nesta categoria" description={`Crie a primeira sala de ${selectedCategory?.name ?? "esta categoria"}.`} action={<Button asChild className="rounded-xl shadow-brand-glow"><Link to={`/rooms/new?category=${category}`}><Plus className="mr-2 h-4 w-4" /> Criar Sala</Link></Button>} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rooms.map((room) => <RoomCard key={room.id} room={room} />)}</div>
        )}
      </main>
    </div>
  );
}

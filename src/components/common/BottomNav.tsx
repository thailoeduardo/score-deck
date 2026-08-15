import { Link, useLocation } from "react-router-dom";
import { Home, Gamepad2, Users, User, Share2 } from "lucide-react";
import { toast } from "sonner";

export function BottomNav() {
  const location = useLocation();

  const leftNavItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Salas", path: "/rooms", icon: Gamepad2 },
  ];

  const rightNavItems = [
    { label: "Jogadores", path: "/players", icon: Users },
    { label: "Perfil", path: "/profile", icon: User },
  ];

  // The center share button only appears on the room screen
  const isRoomPage = /^\/rooms\/[a-zA-Z0-9_-]+$/.test(location.pathname);

  const renderNavItem = (item: any) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex flex-col items-center justify-center ${isRoomPage ? "w-[20%]" : "w-1/4"} h-full space-y-1 transition-colors ${
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <div className={`p-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-primary/10" : ""}`}>
          <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
        </div>
        <span className={`text-[10px] font-semibold ${isActive ? "font-bold" : ""}`}>
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border/70 bg-background/80 backdrop-blur-md pb-safe">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-2">
        {leftNavItems.map(renderNavItem)}

        {/* CENTER SHARE BUTTON (room screen only) */}
        {isRoomPage && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copiado! Envie para seus amigos.");
            }}
            className="flex w-[20%] h-full flex-col items-center justify-center space-y-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Copiar link da sala"
            title="Copiar link da sala"
          >
            <div className="p-1.5 rounded-full transition-all duration-300">
              <Share2 className="h-5 w-5 stroke-[2px]" />
            </div>
            <span className="text-[10px] font-semibold">Compartilhar</span>
          </button>
        )}

        {rightNavItems.map(renderNavItem)}
      </div>
    </nav>
  );
}

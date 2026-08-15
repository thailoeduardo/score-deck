import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { appConfig } from "@/config/app.config";
import { useAuthStore } from "@/store/authStore";

/**
 * Opens a Server-Sent Events connection to a room and refreshes the cached
 * queries whenever another user changes the room (adds points, joins, etc.).
 */
export function useRoomRealtime(roomId: string | undefined) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!roomId || !token) return;

    const url = `${appConfig.apiBaseUrl}/rooms/${roomId}/events?token=${encodeURIComponent(token)}`;
    const source = new EventSource(url);

    source.addEventListener("room-updated", () => {
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    });

    source.addEventListener("room-deleted", () => {
      queryClient.removeQueries({ queryKey: ["room", roomId] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    });

    // Someone created a rematch of this finished room: join them in the new room
    source.addEventListener("room-rematched", (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data) as { roomId?: string };
        if (data.roomId) {
          queryClient.invalidateQueries({ queryKey: ["rooms"] });
          toast.success("Nova partida criada — entrando...");
          navigate(`/rooms/${data.roomId}`);
        }
      } catch {
        // ignore malformed events
      }
    });

    // EventSource reconnects automatically on error — no action needed here.

    return () => source.close();
  }, [roomId, token, queryClient, navigate]);
}

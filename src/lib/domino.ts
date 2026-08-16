import type { Room, Player } from "@/types/domino";

/**
 * Returns list of players who are currently active (total points < 100 and status not eliminated).
 */
export function getActivePlayers(room: Room): Player[] {
  return room.players.filter((p) => p.status === "active");
}

/**
 * Returns list of players who are eliminated.
 */
export function getEliminatedPlayers(room: Room): Player[] {
  return room.players.filter((p) => p.status === "eliminated");
}


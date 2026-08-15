export type PlayerStatus = "active" | "eliminated" | "winner";

export interface Player {
  id: string;
  name: string;
  totalPoints: number;
  status: PlayerStatus;
}

export interface RoundPlayerScore {
  playerId: string;
  points: number;
}

export interface Round {
  id: string;
  roundNumber: number;
  winnerPlayerId: string;
  scores: RoundPlayerScore[];
  createdAt: string;
}

export type RoomStatus = "in_progress" | "finished";

export interface Room {
  id: string;
  name: string;
  ownerId?: string;
  players: Player[];
  rounds: Round[];
  status: RoomStatus;
  winnerPlayerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomInput {
  name: string;
  playerNames: string[];
}

export interface AddRoundInput {
  winnerPlayerId: string;
  scores: Record<string, number>; // maps playerId -> points
}

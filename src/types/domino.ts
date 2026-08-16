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
export type RoomCategoryId = string;

export interface RoomCategory {
  id: RoomCategoryId;
  name: string;
}

export interface Room {
  id: string;
  name: string;
  ownerId?: string;
  categoryId: RoomCategoryId;
  players: Player[];
  rounds: Round[];
  status: RoomStatus;
  winnerPlayerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomInput {
  name: string;
  category: RoomCategoryId;
  playerNames: string[];
}

export interface AddRoundInput {
  winnerPlayerId: string;
  scores: Record<string, number>; // maps playerId -> points
}

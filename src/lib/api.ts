import { isAxiosError } from "axios";
import { api } from "./axios";
import type { Room, RoomCategory, RoomCategoryId, CreateRoomInput, AddRoundInput } from "@/types/domino";
import type { LoginPayload, LoginResponse, RegisterPayload } from "@/types/auth";

type ApiErrorResponse = {
  message?: string;
};

export function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data.message ?? fallback;
  }

  return error instanceof Error && error.message ? error.message : fallback;
}

export function getErrorStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined;
}

// Auth
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const register = async (payload: RegisterPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/register", payload);
  return data;
};

// Rooms
export const listRooms = async (category?: RoomCategoryId): Promise<Room[]> => {
  const { data } = await api.get<Room[]>("/rooms", { params: category ? { category } : undefined });
  return data;
};

export const listRoomCategories = async (): Promise<RoomCategory[]> => {
  const { data } = await api.get<RoomCategory[]>("/rooms/categories");
  return data;
};

export const createRoomCategory = async (name: string): Promise<RoomCategory> => {
  const { data } = await api.post<RoomCategory>("/rooms/categories", { name });
  return data;
};

export const getRoomById = async (id: string): Promise<Room> => {
  const { data } = await api.get<Room>(`/rooms/${id}`);
  return data;
};

export const createRoom = async (payload: CreateRoomInput): Promise<Room> => {
  const { data } = await api.post<Room>("/rooms", payload);
  return data;
};

export const joinRoom = async (id: string): Promise<{ success: boolean }> => {
  const { data } = await api.post<{ success: boolean }>(`/rooms/${id}/join`);
  return data;
};

export const addRound = async (id: string, payload: AddRoundInput): Promise<Room> => {
  const { data } = await api.post<Room>(`/rooms/${id}/rounds`, payload);
  return data;
};

export const rematchRoom = async (id: string): Promise<Room> => {
  const { data } = await api.post<Room>(`/rooms/${id}/rematch`);
  return data;
};

export const deleteRoom = async (id: string): Promise<{ success: boolean }> => {
  const { data } = await api.delete<{ success: boolean }>(`/rooms/${id}`);
  return data;
};

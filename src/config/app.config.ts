export const appConfig = {
  name: "Score Deck",
  description: "Marcador de pontos de partidas de dominó.",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? "http://localhost:3333" : "https://api.kriathus.com"),
  supportEmail: "contato@scoredeck.com",
};

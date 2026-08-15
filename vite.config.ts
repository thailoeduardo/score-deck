import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "pwa/*.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Score Deck",
        short_name: "Score Deck",
        description: "Marcador de pontos de partidas de dominó com eliminação.",
        theme_color: "#0C0F1C",
        background_color: "#0C0F1C",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "pt-BR",
        icons: [
          {
            src: "/pwa/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/pwa/icon-maskable.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/pwa/screenshot-wide.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Página do Score Deck em desktop",
          },
          {
            src: "/pwa/screenshot-narrow.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Página do Score Deck em mobile",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        navigateFallback: "/index.html",
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

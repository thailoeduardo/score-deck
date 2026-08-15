import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import type { PropsWithChildren } from "react";
import { ThemeProvider } from "@/app/theme-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <Toaster richColors theme="system" position="top-center" toastOptions={{ className: "border-border bg-card text-foreground text-base font-bold p-4 max-w-md w-full" }} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

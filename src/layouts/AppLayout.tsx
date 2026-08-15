import { Outlet, Navigate } from "react-router-dom";
import { BottomNav } from "@/components/common/BottomNav";
import { useAuthStore } from "@/store/authStore";
import { routesConfig } from "@/config/routes.config";

export function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());

  if (!isAuthenticated) {
    return <Navigate to={routesConfig.auth.login} replace />;
  }

  return (
    <>
      <main className="min-h-screen overflow-x-hidden bg-background text-foreground pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}

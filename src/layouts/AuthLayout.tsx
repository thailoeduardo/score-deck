import { Outlet, Navigate } from "react-router-dom";
import { FullLogo } from "@/components/brand/FullLogo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuthStore } from "@/store/authStore";
import { routesConfig } from "@/config/routes.config";

export function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());

  if (isAuthenticated) {
    return <Navigate to={routesConfig.app.home} replace />;
  }

  return (
    <section className="dot-pattern relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,193,255,0.16),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(139,92,246,0.14),transparent_26%),linear-gradient(180deg,hsl(var(--background)/0.66),hsl(var(--background))_72%)]" />
      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <FullLogo className="mb-8 justify-center" />
        <Outlet />
      </div>
    </section>
  );
}

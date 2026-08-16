import { createBrowserRouter, Navigate } from "react-router-dom";
import { CreateRoomPage } from "@/pages/CreateRoomPage";
import { RoomPage } from "@/pages/RoomPage";
import { RoomsPage } from "@/pages/RoomsPage";
import { PlayersPage } from "@/pages/PlayersPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { AppLayout } from "@/layouts/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginPage } from "@/pages/auth/index";
import { RegisterPage } from "@/pages/auth/register";
import { routesConfig } from "@/config/routes.config";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: routesConfig.auth.login,
        element: <LoginPage />,
      },
      {
        path: routesConfig.auth.register,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={routesConfig.app.rooms} replace />,
      },
      {
        path: routesConfig.app.rooms,
        element: <RoomsPage />,
      },
      {
        path: routesConfig.app.createRoom,
        element: <CreateRoomPage />,
      },
      {
        path: routesConfig.app.roomDetails,
        element: <RoomPage />,
      },
      {
        path: routesConfig.app.players,
        element: <PlayersPage />,
      },
      {
        path: routesConfig.app.profile,
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
export type RouterType = typeof router;

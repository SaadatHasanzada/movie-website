import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import { ROUTES } from "@/constants";

interface ProtectedRouteProps {
  children: ReactElement;
  isAuthenticated: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LANDING} state={{ from: location }} replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

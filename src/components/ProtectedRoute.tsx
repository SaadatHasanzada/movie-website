import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import PageLoader from "./PageLoader";
import { ROUTES } from "@/constants";
import { useAuth } from "@/features/auth/hooks/AuthContext";

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <PageLoader />;
  }

  if (!isLoading && !isAuthenticated) {
    return <Navigate to={ROUTES.LANDING} state={{ from: location }} replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

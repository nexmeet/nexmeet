import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session, fetchSession } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      if (!session) {
        await fetchSession();
      }
    };

    checkSession();
  }, [session, fetchSession]);

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

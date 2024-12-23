import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const session = useAuthStore((state) => state.session);
  const user = useAuthStore((state) => state.user);
  const fetchSession = useAuthStore((state) => state.fetchSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      await fetchSession();
      setLoading(false);
    };

    checkSession();
  }, [fetchSession]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session || !user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

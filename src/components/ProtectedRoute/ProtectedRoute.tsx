import "./index.css";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../supabase/supabase";
import Home from "../../pages/Home";
import { useNavigate } from "react-router";

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  console.log(session);

  useEffect(() => {
    // Navigate to login if session is null
    if (session === null) {
      navigate("/login");
    }
  }, [session, navigate]);

  // Avoid rendering redirection logic in the JSX
  return session ? <Home /> : null;
};

export default ProtectedRoute;

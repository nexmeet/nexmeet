import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useToast } from "../../hooks/use-toast";
import { useAuthStore } from "../../store/authStore";

const Logout: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logging Out",
        description: "User Successfully Logout",
      });
      navigate("/logout");
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "default",
      });
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Logout;

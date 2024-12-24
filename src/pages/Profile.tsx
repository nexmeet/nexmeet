import React from "react";
import Logout from "@/components/Logout/Logout";
import { useAuthStore } from "../store/authStore";

const Profile: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <>
      {user ? (
        <>
          <h1>User Data</h1>
          <p>Email: {user.email}</p>
          <Logout />
        </>
      ) : (
        <>You Are Not Logged In</>
      )}
    </>
  );
};

export default Profile;

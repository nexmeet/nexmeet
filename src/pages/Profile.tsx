import React, { useEffect } from "react";
import Logout from "@/components/Logout/Logout";
import { useAuthStore } from "../store/authStore";

const Profile: React.FC = () => {
  const { user, fetchSession } = useAuthStore();

  // useEffect(() => {
  //   const initializeSession = async () => {
  //     try {
  //       await fetchSession();
  //     } catch (error) {
  //       console.error("Failed to fetch session:", error);
  //     }
  //   };

  //   initializeSession();
  // }, [fetchSession]);

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

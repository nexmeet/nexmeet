import React from "react";
import Logout from "@/components/Logout/Logout";
import { useAuthStore } from "../store/authStore";

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  console.log(user)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        {user ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h1>
            <div className="mb-4">
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            </div>
            <Logout />
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
            <p className="text-gray-600">You Are Not Logged In</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

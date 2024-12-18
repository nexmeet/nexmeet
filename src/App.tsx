import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <>
      <div className="dark">
        <Navbar />
        <Outlet />
        {/* <h1>Footer</h1> */}
      </div>
    </>
  );
};

export default App;

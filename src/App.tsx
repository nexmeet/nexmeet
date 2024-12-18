import React from "react";
import { Outlet } from "react-router";

const App: React.FC = () => {
  return (
    <>
      <div className="dark">
        {/* <h1>Header</h1> */}
        <Outlet />
        {/* <h1>Footer</h1> */}
      </div>
    </>
  );
};

export default App;

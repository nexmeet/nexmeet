import React from "react";
import { Outlet } from "react-router";

function MainOutlet() {
  return (
    <>
      <div className="dark">
        {/* <h1>Header</h1> */}
        <Outlet />
        {/* <h1>Footer</h1> */}
      </div>
    </>
  );
}

export default MainOutlet;

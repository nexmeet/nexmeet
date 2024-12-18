import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Button } from "../ui/button";

const Navbar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll event to toggle sticky background
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = "bg-[#2281FF] p-2 rounded-full text-white";
  const inactive = "p-2 hover:bg-[#2281FF] hover:rounded-full hover:text-white";

  return (
    <div
      className={`font-SpaceGrotesk font-bold w-full pt-8 pb-2 flex flex-row justify-around items-center transition-all duration-300
      ${isSticky ? "bg-[#FCFFDA] shadow-md" : "bg-transparent"}`}
      style={{ position: "sticky", top: 0, zIndex: 50 }}
    >
      <div>
        <h1 className="text-xl">Logo</h1>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 border-2 p-2 rounded-full">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          Home
        </NavLink>
        <NavLink
          to="/explore-events"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          Events
        </NavLink>
        <NavLink
          to="/explore-communities"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          Communities
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          About us
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          Contact us
        </NavLink>
        <NavLink
          to="/contributors"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          Contributors
        </NavLink>
      </div>
      <div>
        <Button variant="primary" className="p-4">
          <Link to="/login">Login</Link>{" "}
          <span className="text-xl font-bold">→</span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;

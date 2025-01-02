import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { Button } from '../ui/button';
import { useAuthStore } from '@/store/authStore';

const Navbar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const fetchSession = useAuthStore((state) => state.fetchSession);

  //this useeffect for checking window resize. Bug is when toggle to fullscreen mode while the nav sidebar open from resopnsive mode , the navbar breaks due to improper menuopen stateupdate.
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Check if the screen width crosses the lg breakpoint (1024px)
      if (screenWidth >= 1024 && menuOpen) {
        setMenuOpen(false); // Close the menu when resizing to lg or above
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]); // Dependency on menuOpen to ensure proper updates

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const active = `${!menuOpen ? 'p-2 p-2 rounded-full bg-[#2281FF] text-black transition-all duration-300 ease-in-out' : 'p-2 w-full rounded-md text-black border-2 border-black transition-all duration-300 ease-in-out'}`;

  const inactive = `${!menuOpen ? 'p-2 rounded-full text-black hover:bg-[#2281FF] hover:text-white hover:shadow-md transition-all duration-300 ease-in-out' : 'p-2 hover:text-white rounded-full text-black transition-all duration-300 ease-in-out'}`;

  return (
    <div
      className={`font-SpaceGrotesk font-bold w-full px-6 pt-8 pb-2 flex flex-row justify-between md:justify-center items-center transition-all duration-300 ${menuOpen ? 'text-3xl text-black flex-row-reverse ' : ''} ${isSticky ? 'bg-transparent z-50' : 'bg-[#FCFFDA]'}`}
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
    >
      {/* Hamburger Menu (Mobile) */}
      <div className="lg:hidden mr-4 z-50 top-4 right-4">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl focus:outline-none">
          {!menuOpen ? <>☰</> : <>x</>}
        </button>
      </div>

      {/* Logo */}
      <div className={menuOpen ? 'opacity-0' : 'ml-4'}>
        <h1 className={menuOpen ? 'hidden' : 'ml-4 text-3xl'}>Logo</h1>
      </div>

      {/* Navigation Links */}
      <div
        className={`fixed top-0 left-0 h-full w-full p-2 lg:static lg:block lg:w-auto lg:shadow-none lg:border-black lg:border-2 lg:rounded-full transition-transform duration-300 ease-in-out transform ${
          menuOpen
            ? 'translate-x-0 opacity-100 visible p-6 bg-blue-500'
            : 'ml-44 mr-16 -translate-x-full opacity-0 invisible lg:translate-x-0 lg:opacity-100 lg:visible'
        }  ${isSticky ? 'bg-[#FCFFDA]' : ''} `}
        style={{ zIndex: 40 }} // Ensure it appears below the hamburger menu button
      >
        <div className={`flex ${menuOpen ? 'mt-8' : 'mt-0'} flex-col lg:flex-row lg:gap-4 items-start h-full w-full`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? active : inactive)}
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            Home
          </NavLink>
          <NavLink
            to="/explore-events"
            className={({ isActive }) => (isActive ? active : inactive)}
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            Events
          </NavLink>
          <NavLink
            to="/explore-communities"
            className={({ isActive }) => (isActive ? active : inactive)}
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            Communities
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) => (isActive ? active : inactive)}
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            About us
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) => (isActive ? active : inactive)}
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            Contact us
          </NavLink>
          <NavLink
            to="/contributors"
            className={({ isActive }) => (isActive ? active : inactive)}
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            Contributors
          </NavLink>

          {/* Action Buttons (Mobile) */}
          <div className="flex flex-col gap-4 mt-4 lg:hidden">
            {user ? (
              <Button variant="primary" className="p-4">
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </Button>
            ) : (
              <div className="flex flex-col ml-4 pb-5 gap-5">
                <Button variant="secondary" size="default" className=" p-6 flex flex-row text-lg  transition-all">
                  <Link to="/signin" onClick={() => setMenuOpen(false)}>
                    Sign In{' '}
                    <div className="text-xl font-bold inline-block transition-transform duration-300 ease-in-out group-hover:rotate-60">
                      →
                    </div>
                  </Link>
                </Button>
                <Button variant="primary" size="default" className="p-6 text-lg  transition-all">
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    Sign Up{' '}
                    <span className="text-xl font-bold inline-block transition-transform duration-300 ease-in-out group-hover:rotate-60">
                      →
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons (Desktop) */}
      <div className="hidden lg:flex lg:gap-4 lg:items-center">
        {user ? (
          <Button variant="primary" className="p-4">
            <Link to="/profile">Profile</Link> <span className="text-xl font-bold">→</span>
          </Button>
        ) : (
          <>
            <div className="">
              <div className="flex flex-row gap-4 px-3">
                <Link to="/signin">
                  <Button variant="secondary" className="p-4">
                    Sign In
                    <span className="text-xl font-bold">→</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" className="p-4">
                    Sign Up
                    <span className="text-xl font-bold">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

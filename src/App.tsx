import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Communities from "./pages/Communities";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Contributors from "./pages/Contributors";
import Home from "./pages/Home";
import AppOutlet from "./AppOutlet";
import LogoutSuccess from "./pages/LogoutSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppOutlet />}>
          <Route path="" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/explore-events" element={<Events />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route
            path="/explore-communities"
            element={
              <ProtectedRoute>
                <Communities />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<LogoutSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

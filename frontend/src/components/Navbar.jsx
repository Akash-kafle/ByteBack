import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRecycle,
  faInfoCircle,
  faPhone,
  faBars,
  faUser,
  faSignOutAlt,
  faGift, // Add the logout icon
  faBoxOpen, // Icon for Dropoff
  faTruckPickup, // Icon for Pickup
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  // Check if user is logged in (if there's an authToken in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true); // Set isLoggedIn to true if token is found
    } else {
      setIsLoggedIn(false); // Set isLoggedIn to false if no token is found
    }
  }, []); // Empty dependency array to only run once on component mount

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Update the login state
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-teal-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="text-white text-3xl font-bold">
            <span className="bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text">
              Byte-Back
            </span>
          </div>
        </div>

        {/* Navbar Links */}
        <div
          className={`space-x-6 ${
            showMobileMenu ? "flex flex-col py-4" : "hidden md:flex"
          }`}
        >
          {isLoggedIn ? (
            // Links to show when user is logged in
            <>
              <NavLink
                to="/dashboard"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Dashboard
              </NavLink>
              <NavLink
                to="/dropoff"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
                Dropoff
              </NavLink>
              <NavLink
                to="/recycle"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTruckPickup} className="mr-2" />
                Pickup
              </NavLink>
              <NavLink
                to="/about"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                About
              </NavLink>
              <NavLink
                to="/redeem"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faGift} className="mr-2" />
                Redeem
              </NavLink>
              <NavLink
                to="/profile"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </NavLink>

              {/* Logout Link */}
              <button
                onClick={handleLogout}
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            // Links to show when user is logged out
            <>
              <NavLink
                to="/"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                About
              </NavLink>
              <NavLink
                to="/login"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Login
              </NavLink>
              <NavLink
                to="/sign-up"
                className="text-white text-lg hover:text-teal-200 transition-all duration-300"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white text-2xl"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

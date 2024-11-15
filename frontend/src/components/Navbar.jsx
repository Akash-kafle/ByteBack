import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRecycle,
  faInfoCircle,
  faPhone,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-600 to-teal-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="text-white text-3xl font-bold">
            <span className="bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text">
              E-Waste
            </span>
            <span className="text-teal-200">Recycling</span>
          </div>
        </div>

        {/* Navbar Links */}
        <div
          className={`space-x-6 ${
            showMobileMenu ? "flex flex-col py-4" : "hidden md:flex"
          }`}
        >
          <NavLink
           to="/"
            className="text-white text-lg hover:text-teal-200 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
            </NavLink>
          <NavLink
            to="/dropoff"
            className="text-white text-lg hover:text-teal-200 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faRecycle} className="mr-2" />
            Drop-offs
          </NavLink>
          <NavLink
            to="/about"
            className="text-white text-lg hover:text-teal-200 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            About
          </NavLink>
          <a
            href="/contact"
            className="text-white text-lg hover:text-teal-200 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            Contact
          </a>
          <NavLink
            to="/profile"
            className="text-white text-lg hover:text-teal-200 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </NavLink>
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

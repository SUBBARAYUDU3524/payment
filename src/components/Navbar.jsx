import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handleNavLinkClick }) => {
  const handleClick = (message) => {
    handleNavLinkClick(message);
  };

  return (
    <nav className="bg-white shadow-lg py-5">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between flex-wrap">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://svuniversity.edu.in/storage/2021/11/SV-logo.png"
              alt="Logo"
              className="w-15 h-14 sm:h-14 sm:w-15"
            />
          </Link>
        </div>

        {/* Navigation Links Section */}
        <div className=" md:flex md:flex-grow items-center justify-center space-x-8">
          <Link
            to="/"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Login Section */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-lg font-bold text-white bg-primary px-4 py-2 rounded-full transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-lg font-bold text-white bg-primary px-4 py-2 rounded-full transition-colors duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

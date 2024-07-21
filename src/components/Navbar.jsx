import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Make sure to create this file for custom CSS

const Navbar = ({ handleNavLinkClick }) => {
  const handleClick = (message) => {
    handleNavLinkClick(message);
  };

  return (
    <nav className="bg-white shadow-lg py-5">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex  items-center space-x-8">
          <Link
            to="/"
            className="flex text-left text-lg font-bold text-gray-800"
          >
            <img
              src="https://svuniversity.edu.in/storage/2021/11/SV-logo.png"
              alt="Logo"
              className="h-15  -ml-24  w-15"
            />{" "}
            {/* Adjust the logo source and size */}
          </Link>
        </div>

        {/* Navigation Links Section */}
        <div className="flex-grow flex items-center justify-center space-x-8">
          <Link
            to="/"
            className="text-lg font-bold items-center text-gray-800 hover:text-primary transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-lg font-bold items-center text-gray-800 hover:text-primary transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            AboutUs
          </Link>

          <Link
            to="/contact"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Login Section */}
        <div className=" ml-20 flex items-center space-x-6">
          <Link
            to="/login"
            className="flex items-center text-lg font-bold text-white bg-primary px-4 py-2 rounded-full transition-colors duration-300"
          >
            <span>Login</span>
          </Link>
          <Link
            to="/signup"
            className="flex items-center text-xl font-bold text-white bg-primary px-4 py-2 rounded-2xl transition-colors duration-300"
          >
            <span>SignUp</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

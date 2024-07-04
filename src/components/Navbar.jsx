import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create this file for custom CSS

const Navbar = ({ handleNavLinkClick }) => {
  const handleClick = (message) => {
    handleNavLinkClick(message);
  };

  return (
    <nav className="bg-white shadow-lg py-5">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            onClick={() => handleClick('You clicked Logo!')}
            className="flex text-left text-lg font-bold text-gray-800"
          >
            <img src="/logo.png" alt="Logo" className="h-10" /> {/* Adjust the logo source and size */}
            <span className="ml-2">SVU</span>
          </Link>
        </div>

        {/* Navigation Links Section */}
        <div className="flex-grow flex items-center justify-center space-x-8">
          <Link
            to="/"
            onClick={() => handleClick('You clicked Home!')}
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            HOME
          </Link>
          <Link
            to="/solutions"
            onClick={() => handleClick('You clicked Solutions!')}
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            SERVICES <span className="inline-block transform rotate-90"></span>
          </Link>
          <Link
            to="/about"
            onClick={() => handleClick('You clicked About Us!')}
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            ABOUT US
          </Link>
          <Link
            to="/blog"
            onClick={() => handleClick('You clicked Blog!')}
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            BLOG
          </Link>
          <Link
            to="/contact"
            onClick={() => handleClick('You clicked Contact!')}
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            CONTACT
          </Link>
        </div>

        {/* Login Section */}
        <div className="flex items-center space-x-6">
          <Link
            to="/login"
            className="flex items-center text-lg font-bold text-white bg-primary px-4 py-2 rounded-full transition-colors duration-300"
          >
            <span>Login</span>
          </Link>
          <Link
            to="/signup"
            className="flex items-center text-lg font-bold text-white bg-primary px-4 py-2 rounded-full transition-colors duration-300"
          >
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

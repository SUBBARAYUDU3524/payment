import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 mt-8">
    <nav>
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/security-information">Security Information</Link>
        </li>
      </ul>
    </nav>
    <p className="text-center mt-4">
      © 2024 SV University. All rights reserved.
    </p>
  </footer>
);

export default Footer;

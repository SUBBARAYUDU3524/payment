import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Forms from "./components/Forms";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import MeetUs from "./components/MeetUs";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import StuDashboard from "./StuDashboard/StuDashboard";

import ShareComp from "./ShareComp";
import AdminDashboard from "./dashboard/AdminDashboard";
import Eachservice from "./components/Eachservice";

const App = () => {
  // Function to determine if Navbar should be shown

  return (
    <div>
      <Routes>
        <Route path="/" element={<ShareComp />}>
          <Route index element={<Home />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:userId" element={<Eachservice />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/meet" element={<MeetUs />} />
          <Route path="/login" element={<Forms />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/stu-dashboard/*" element={<StuDashboard />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />}></Route>
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

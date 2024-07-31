import React from "react";
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
import PrivateRoute from "./PrivateRoute";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SecurityInformation from "./components/SecurityInformation";
import FAQ from "./components/FAQ";
import TermsAndConditions from "./components/TermsAndConditions";

const App = () => {
  const location = useLocation();
  const isProtectedRoute =
    location.pathname.startsWith("/stu-dashboard") ||
    location.pathname.startsWith("/admin-dashboard");

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
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/security-information"
            element={<SecurityInformation />}
          />
        </Route>
        <Route
          path="/stu-dashboard/*"
          element={
            <PrivateRoute type="student">
              <StuDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            <PrivateRoute type="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      {!isProtectedRoute && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

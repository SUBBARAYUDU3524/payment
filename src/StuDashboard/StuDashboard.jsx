import React, { useContext, useEffect, useState } from "react";
import StuSlideBar from "./StuSlideBar";
import StudentProfile from "./StudentProfile";
import { StudentProfileContext } from "../StudentProfileController";
import { Route, Routes } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import StuReports from "./StuReports";
import StuBlogger from "./StuBlogger";
import StuPayHistory from "./StuPayHistory";
import StuPayDetails from "./StuPayDetails";
import UpdateProfile from "./UpdateProfile";
import StudentDashboard from "./StudentDashboard";
import StuEventManagement from "./StuEventManagement";
import StuFeeDetails from "./StuFeeDetails";

const StuDashboard = () => {
  const { studentProfile, fetchStudentProfile } = useContext(
    StudentProfileContext
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`transition-transform ${sidebarOpen ? "w-64" : "w-0"}`}>
        <StuSlideBar />
      </div>
      <div className="flex flex-col w-full">
        <div className="bg-red-500 text-white p-4 flex items-center justify-between">
          <button onClick={toggleSidebar} className="text-xl">
            <FaBars />
          </button>
          <h1 className="text-3xl font-bold hover:underline uppercase pr-96">
            WELCOME {studentProfile.name}!
          </h1>
        </div>
        <div className="flex-grow bg-red-400 text-white overflow-y-auto scrollbar-hide">
          <Routes>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="event" element={<StuEventManagement />} />
            <Route path="reports" element={<StuReports />} />
            <Route path="blogger" element={<StuBlogger />} />
            <Route path="payment-details" element={<StuPayDetails />} />
            <Route path="payment-history" element={<StuPayHistory />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="fee-details" element={<StuFeeDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StuDashboard;

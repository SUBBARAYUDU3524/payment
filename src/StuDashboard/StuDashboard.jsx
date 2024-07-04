import React, { useContext } from 'react';
import StuSlideBar from './StuSlideBar';
import StudentProfile from './StudentProfile';
import { StudentProfileContext } from '../StudentProfileController';
import { Route, Routes } from 'react-router-dom';
import StuReports from './StuReports';
import StuBlogger from './StuBlogger'
import StuPayHistory from './StuPayHistory'
import StuPayDetails from './StuPayDetails';
import UpdateProfile from './UpdateProfile';
import StudentDashboard from './StudentDashboard'
import StuEventManagement from './StuEventManagement';
import StuFeeDetails from './StuFeeDetails';

const StuDashboard = () => {
  const { studentProfile } = useContext(StudentProfileContext);

  return (
    <div className="flex h-screen overflow-hidden">
      <div>
        <StuSlideBar />
      </div>
      <div className="flex flex-col items-center bg-red-400
 text-white w-full overflow-hidden">
        <h1 className="text-3xl font-bold mb-8 hover:underline mt-5 uppercase">
          WELCOME {studentProfile.name} !
        </h1>
        <div className="flex-grow w-full overflow-y-auto scrollbar-hide">
          <Routes>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="event" element={<StuEventManagement />} />
            <Route path="reports" element={<StuReports />} />
            <Route path="blogger" element={<StuBlogger />} />
            <Route path="payment-details" element={<StuPayDetails />} />
            <Route path="payment-history" element={<StuPayHistory/>} />
            <Route path="update-profile" element={<UpdateProfile/>} />
            <Route path="dashboard" element={<StudentDashboard/>} />
            <Route path="fee-details" element={<StuFeeDetails/>} />
          </Routes>
        
        </div>
      </div>
    </div>
  );
};

export default StuDashboard;

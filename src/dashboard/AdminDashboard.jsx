import React, { useContext, useEffect } from "react";
import Slidebar from "./Slidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProfessorList from "../dropdownItems/ProfessorList";
import AddProfessor from "../dropdownItems/AddProfessor";
import Payment from "./Payment";
import StudentList from "../dropdownItems/StudentList";
import AdminBlogger from "./AdminBlogger";
import EventManagement from "./EventManagement";
import Library from "./Library";
import FeeCategory from "./FeeCategory";
import AdminProfileComponent from "./AdminProfileComponent";
import MyProfile from "./MyProfile";
import ADashboard from "./ADashboard";
import AddStudent from "../dropdownItems/AddStudent";
import { AdminContext } from "../AdminContext";
import AdminRecentPayments from "./AdminRecentPayments";
import AdminStuPayment from "./AdminStuPayment";
import StudentFeesList from "./StudentFeesList";
import Financial from "./Financial";
import Widgets from "./Widgets";
import StudentUnpaid from "./StudentUnpaid";
// import { AdminContext } from "../AdminContext";

const AdminDashboard = () => {
  const { form, fetchProfile } = useContext(AdminContext);
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      <div>
        <Slidebar />
      </div>
      <div className="flex flex-col items-center bg-red-400 text-white  w-full overflow-hidden">
        <h1 className="text-4xl font-bold mb-8 hover:underline mt-5 uppercase">
          welcome {form.name} !
        </h1>
        <div className="flex-grow w-full overflow-y-auto scrollbar-hide">
          <Routes>
            <Route path="/" element={<ADashboard />} index />
            <Route path="/dashboard" element={<ADashboard />} />
            <Route path="event-management" element={<EventManagement />} />
            <Route path="faculty/list" element={<ProfessorList />} />
            <Route path="students/list" element={<StudentList />} />
            <Route path="students/add" element={<AddStudent />} />
            <Route path="payment" element={<Payment />} />
            <Route path="blog" element={<AdminBlogger />} />
            <Route path="library" element={<Library />} />
            <Route path="feecategory" element={<FeeCategory />} />
            <Route path="alladmins" element={<AdminProfileComponent />} />
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="studentfeeslist" element={<StudentFeesList />} />
            <Route path="totalstudentpayments" element={<AdminStuPayment />} />
            <Route path="reports/financial" element={<Financial />} />
            <Route path="widgets/list" element={<Widgets />} />
            <Route path="unpaid" element={<StudentUnpaid />} />
            <Route
              path="adminrecentpayments"
              element={<AdminRecentPayments />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

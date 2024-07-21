import React, { useContext, useEffect } from "react";
import Slidebar from "./Slidebar";
import "daisyui/dist/full.css";
import "tailwindcss/tailwind.css";
import StatCard from "./StatCard";
import Table from "./Table";
import "./Dashboard.css"; // Assuming the custom styles are here
import StuGraph from "./StuGraph";
import PChart from "./PChart";
import LChart from "./LChart";
import { StudentProfileContext } from "../StudentProfileController";
import AdminStuGraph from "./AdminStuGraph";
import AdminPChart from "./AdminPChart";
import AdminLChart from "./AdimnLChart";
import AdminTable from "./AdminTable";
import { AdminContext } from "../AdminContext";
const Widgets = () => {
  const {
    students,
    fetchStudents,
    admins,
    fetchAdmins,
    paymentsadmin,
    categoriesArrayAmount,
    fetchCategoryTotalAmount,
    fetchPaymentsadmin,
  } = useContext(AdminContext);
  console.log(students);

  useEffect(() => {
    fetchStudents();
    fetchPaymentsadmin();
    fetchAdmins();
    fetchCategoryTotalAmount();
  }, []);
  // console.log(paymentsadmin / 100);
  const calculateTotalAmount = () => {
    const totalAmount = paymentsadmin.reduce((acc, payment) => {
      return acc + payment.amount;
    }, 0);
    return totalAmount;
  };
  const totalAmount = calculateTotalAmount();
  return (
    <div className="flex h-screen">
      <div className="flex-grow p-5 bg-gray-100 overflow-y-auto h-full scrollbar-hide scrollbar-custom rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
          <div className="bg-white shadow-lg rounded-lg p-5 flex justify-center items-center">
            <AdminStuGraph />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5 flex justify-center items-center">
            <AdminPChart />
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 mb-10 ">
          <AdminLChart />
        </div>
      </div>
    </div>
  );
};

export default Widgets;

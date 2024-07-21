import React, { useContext, useEffect } from "react";

import "daisyui/dist/full.css";
import "tailwindcss/tailwind.css";
// import StatCard from "./StatCard";
// import Table from "./Table";
import "../dashboard/Dashboard.css"; // Assuming the custom styles are here
import StuGraph from "../dashboard/StuGraph";
import PChart from "../dashboard/PChart";
import LChart from "../dashboard/LChart";
import { StudentProfileContext } from "../StudentProfileController";
const StuReports = () => {
  const {
    paymentHistory,
    allcatoryamount,
    paymountallamount,
    fetchPaymentHistory,
  } = useContext(StudentProfileContext);
  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  console.log(paymentHistory);
  const totalPendingFees = allcatoryamount - paymountallamount;

  // Calculate percentages
  const totalAmountPercentage = 100; // As it's the total amount, its width is 100%
  const pendingFeesPercentage = allcatoryamount
    ? (totalPendingFees / allcatoryamount) * 100
    : 0;
  const paidFeesPercentage = allcatoryamount
    ? (paymountallamount / allcatoryamount) * 100
    : 0;
  const paymentHistoryPercentage = 100 - pendingFeesPercentage;

  return (
    <div className="flex h-screen">
      <div className="flex-grow p-5 bg-gray-100 overflow-y-auto h-full scrollbar-hide scrollbar-custom rounded-lg">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black">Reports</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-bold text-black">
              &#8377;{allcatoryamount}
            </h2>
            <p className="text-gray-500">Total Amount </p>
            <div className="mt-2">
              <div className="bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${totalAmountPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-bold text-black">
              &#8377;{totalPendingFees}
            </h2>
            <p className="text-gray-500">Pending Fees</p>
            <div className="mt-2">
              <div className="bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-red-500 h-3 rounded-full"
                  style={{ width: `${pendingFeesPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-bold text-black">
              &#8377;{paymountallamount}
            </h2>
            <p className="text-gray-500">Total Paid Fees</p>
            <div className="mt-2">
              <div className="bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-yellow-500 h-3 rounded-full"
                  style={{ width: `${paidFeesPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-bold text-black">
              {paymentHistory.length}
            </h2>
            <p className="text-gray-500">Total Payments</p>
            <div className="mt-2">
              <div className="bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${paymentHistoryPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="  mb-2  ">
          <div className="bg-white mt-8 mb-8  shadow-lg rounded-lg p-5 flex justify-center items-center">
            <PChart />
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 mb-10">
          <LChart />
        </div>
      </div>
    </div>
  );
};

export default StuReports;

import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentFeesList = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const response = await axios.get(
        "https://svu-payment-system.onrender.com/api/fees/feeslist",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setFees(response.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Fees List
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-5 text-gray-700">
                  Student Name
                </th>
                <th className="text-left py-3 px-5 text-gray-700">
                  Admission No
                </th>
                <th className="text-left py-3 px-5 text-gray-700">Email</th>
                <th className="text-left py-3 px-5 text-gray-700">Course</th>
                <th className="text-left py-3 px-5 text-gray-700">
                  Total Fees
                </th>
                <th className="text-left py-3 px-5 text-gray-700">
                  Pending Fees
                </th>
                <th className="text-left py-3 px-5 text-gray-700">Paid Fees</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee._id} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-5 text-gray-800">{fee.studentName}</td>
                  <td className="py-3 px-5 text-gray-800">
                    {fee.studentAdmissionNo}
                  </td>
                  <td className="py-3 px-5 text-gray-800">
                    {fee.studentEmail}
                  </td>
                  <td className="py-3 px-5 text-gray-800">{fee.course}</td>
                  <td className="py-3 px-5 text-gray-800">{fee.totalFees}</td>
                  <td className="py-3 px-5 text-gray-800">{fee.pendingFees}</td>
                  <td className="py-3 px-5 text-gray-800">{fee.paidFees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentFeesList;

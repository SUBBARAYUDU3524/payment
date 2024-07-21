import React, { useState, useContext } from "react";
import { FaEye, FaPrint } from "react-icons/fa";
import jsPDF from "jspdf";
import axios from "axios";
import { StudentProfileContext } from "../StudentProfileController";

const Table = () => {
  const { paymentHistory } = useContext(StudentProfileContext);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const fetchPaymentDetails = async (paymentIntentId) => {
    try {
      const response = await axios.get(
        `https://svu-payment-system.onrender.com/api/payments/details/${paymentIntentId}`,
        {
          headers: {
            "y-auth-token": localStorage.getItem("studenttoken"),
          },
        }
      );
      setPaymentDetails(response.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-slate-300 h-screen">
      <h3 className="text-xl font-semibold mb-4 text-black">Payment History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-sm rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Payment ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paymentHistory.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.paymentIntentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(payment.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

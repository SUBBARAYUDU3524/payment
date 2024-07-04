import React, { useState, useEffect, useContext } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import { StudentProfileContext } from "../StudentProfileController";

const PaymentHistory = () => {
  // const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);
const {paymentHistory, setPaymentHistory}=useContext(StudentProfileContext)
  
console.log(paymentHistory.length)
  const fetchPaymentDetails = async (paymentIntentId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/payments/details/${paymentIntentId}`,
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

  const generateInvoicePDF = async (paymentHistory, paymentDetails) => {
    const doc = new jsPDF();
    let yPos = 20;

    const universityName = "Sri Venkateswara University, Tirupati, AP";

    doc.setFontSize(18);
    doc.text("Invoice", 105, yPos, { align: "center" });
    yPos += 10;

    doc.setFontSize(14);
    doc.text(universityName, 105, yPos, { align: "center" });
    yPos += 10;

    doc.setFontSize(12);
    doc.text("Payment ID", 10, yPos);
    doc.text("Amount", 40, yPos);
    doc.text("Status", 70, yPos);
    doc.text("Date", 100, yPos);
    yPos += 5;

    paymentHistory.forEach((payment) => {
      doc.text(payment.paymentIntentId, 10, yPos);
      doc.text(payment.amount.toString(), 40, yPos);
      doc.text(payment.status, 70, yPos);
      doc.text(new Date(payment.date).toLocaleString(), 100, yPos);
      yPos += 10;
    });

    if (paymentDetails) {
      yPos += 10;
      doc.text(`ID: ${paymentDetails.id}`, 10, yPos);
      yPos += 5;
      doc.text(`Amount: ${paymentDetails.amount}`, 10, yPos);
      yPos += 5;
      doc.text(`Currency: ${paymentDetails.currency}`, 10, yPos);
      yPos += 5;
      doc.text(`Status: ${paymentDetails.status}`, 10, yPos);
      yPos += 5;
      doc.text(`Order ID: ${paymentDetails.order_id}`, 10, yPos);
      yPos += 5;
      doc.text(`Method: ${paymentDetails.method}`, 10, yPos);
      yPos += 5;
      doc.text(`Description: ${paymentDetails.description}`, 10, yPos);
      yPos += 5;
      doc.text(`Email: ${paymentDetails.email}`, 10, yPos);
      yPos += 5;
      doc.text(`Contact: ${paymentDetails.contact}`, 10, yPos);
      yPos += 5;
      doc.text(`Wallet: ${paymentDetails.wallet}`, 10, yPos);
      yPos += 5;
      doc.text(`Fee: ${paymentDetails.fee}`, 10, yPos);
      yPos += 5;
      doc.text(`Tax: ${paymentDetails.tax}`, 10, yPos);
      yPos += 5;
      doc.text(`Created At: ${paymentDetails.created_at}`, 10, yPos);
    }

    doc.save("invoice.pdf");
  };

  return (
    <div className="container mx-auto p-4 bg-slate-300 h-screen ">
      <h3 className="text-xl font-semibold mb-4">Payment History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-sm rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th>Action</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paymentHistory ? paymentHistory.map((payment) => (
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
                <td className="border px-4 py-2">
                  <button
                    onClick={() => fetchPaymentDetails(payment.paymentIntentId)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    See More Details
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => generateInvoicePDF(paymentHistory, paymentDetails)}
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Print
                  </button>
                </td>
              </tr>
            )):<div className="text-2xl text-red-400 pt-36 text-center">
            No Payment History Found! Please Make Payment
            </div>}
          </tbody>
        </table>
      </div>

      {paymentDetails &&  (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <div className="space-y-2">
              <p>ID: {paymentDetails.id}</p>
              <p>Amount: {paymentDetails.amount/100}</p>
              <p>Currency: {paymentDetails.currency}</p>
              <p>Status: {paymentDetails.status}</p>
              <p>Order ID: {paymentDetails.order_id}</p>
              <p>Method: {paymentDetails.method}</p>
              <p>Description: {paymentDetails.description}</p>
              <p>Email: {paymentDetails.email}</p>
              <p>Contact: {paymentDetails.contact}</p>
              <p>Wallet: {paymentDetails.wallet}</p>
              <p>Fee: {paymentDetails.fee}</p>
              <p>Tax: {paymentDetails.tax}</p>
              <p>Created At: {paymentDetails.created_at}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setPaymentDetails(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

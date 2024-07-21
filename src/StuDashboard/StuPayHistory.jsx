import React, { useState, useEffect, useContext } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { StudentProfileContext } from "../StudentProfileController";
import { DejaVuSans } from "../DejaVuSans"; // Assuming the font is stored locally

const StuPayHistory = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const {
    fetchStudentProfile,
    fetchFeeDetails,
    fetchPaymentHistory,
    paymentHistory,
    fetchCategories,
  } = useContext(StudentProfileContext);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentDetails = async (
    paymentIntentId,
    callback,
    skipModal = false
  ) => {
    try {
      const response = await axios.get(
        `https://svu-payment-system.onrender.com/api/payments/details/${paymentIntentId}`,
        {
          headers: {
            "y-auth-token": localStorage.getItem("studenttoken"),
          },
        }
      );
      if (!skipModal) {
        setPaymentDetails(response.data);
      }
      callback && callback(response.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  const generateInvoicePDF = (payment, paymentDetails) => {
    const doc = new jsPDF("p", "pt", "a4");

    // Add custom font
    doc.addFileToVFS("DejaVuSans.ttf", DejaVuSans);
    doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
    doc.setFont("DejaVuSans");

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Sri Venkateswara University, Tirupati, AP", 40, 50);

    // Subtitle
    doc.setFontSize(14);
    doc.text("Payment Receipt", 40, 80);
    doc.setFontSize(10);
    doc.text(`Transaction Reference: ${payment.paymentIntentId}`, 40, 100);

    // Content
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(
      "This is a payment receipt for your transaction at Sri Venkateswara University",
      40,
      120
    );

    // Amount Paid
    doc.setFontSize(14);
    doc.setFont("DejaVuSans", "bold");
    doc.text("AMOUNT PAID", 40, 150);
    doc.setFontSize(20);
    doc.text(`Rs ${payment.amount}`, 150, 150);

    // Issued to and Paid On
    doc.setFontSize(12);
    doc.text("ISSUED TO", 40, 190);
    doc.text("PAID ON", 300, 190);

    doc.setFontSize(10);
    doc.text(paymentDetails.email || "N/A", 40, 210);
    doc.text(paymentDetails.contact || "N/A", 40, 225);

    doc.text(new Date(payment.date).toLocaleDateString(), 300, 210);

    // Table
    doc.autoTable({
      startY: 250,
      head: [["DESCRIPTION", "UNIT PRICE", "QTY", "AMOUNT"]],
      body: [["Amount", `Rs ${payment.amount}`, "1", `Rs ${payment.amount}`]],
      theme: "plain",
      styles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: { fillColor: [240, 240, 240] },
    });

    // Total
    doc.setFontSize(14);
    doc.text("Total", 400, doc.lastAutoTable.finalY + 20);
    doc.setFontSize(14);
    doc.text(`Rs ${payment.amount}`, 500, doc.lastAutoTable.finalY + 20);

    // Amount Paid
    doc.setFontSize(12);
    doc.setTextColor("green");
    doc.text("Amount Paid", 400, doc.lastAutoTable.finalY + 40);
    doc.setFontSize(14);
    doc.setTextColor("black");
    doc.text(`Rs ${payment.amount}`, 500, doc.lastAutoTable.finalY + 40);

    // Save the PDF
    doc.save("receipt.pdf");
    window.open(doc.output("bloburl"), "_blank");
  };

  return (
    <div className="container mx-auto p-4 bg-slate-300 h-screen">
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
            {paymentHistory && paymentHistory.length > 0 ? (
              paymentHistory.map((payment) => (
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
                      onClick={() =>
                        fetchPaymentDetails(payment.paymentIntentId)
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      See More Details
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        fetchPaymentDetails(
                          payment.paymentIntentId,
                          (details) => generateInvoicePDF(payment, details),
                          true // Pass true to skip modal update
                        )
                      }
                      className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No payment details found, please pay your fees.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paymentDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <div className="space-y-2">
              <p>ID: {paymentDetails.id}</p>
              <p>Amount: {paymentDetails.amount / 100}</p>
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
              <p>
                Created At:{" "}
                {new Date(paymentDetails.created_at * 1000).toLocaleString()}
              </p>
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

export default StuPayHistory;

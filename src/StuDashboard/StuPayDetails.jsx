import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import { StudentProfileContext } from "../StudentProfileController";

const StuPayDetails = () => {
  const navigate = useNavigate();
  const { fetchFeeDetails, feeDetails ,categories ,calculateTotalCategoryAmount} = useContext(StudentProfileContext);
  // const [categories, setCategories] = useState([]);
  const allcatoryamount=calculateTotalCategoryAmount()
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedFeeDetails, setSelectedFeeDetails] = useState(null);



  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const categoryFeeDetail = feeDetails.find(
      (fee) => fee.categoryId === category._id
    );
    setAmount(
      categoryFeeDetail ? categoryFeeDetail.pendingFees : category.amount
    );
  };

  const handlePayment = async () => {
    const selectedFeeDetail = feeDetails.find(
      (fee) => fee.categoryId === selectedCategory._id
    );

    if (selectedFeeDetail && selectedFeeDetail.paid) {
      toast.error("Full payment has been made for this category.");
      return;
    }

    // Check if the first time payment exceeds the category amount
    if (!selectedFeeDetail && amount > selectedCategory.amount) {
      toast.error(
        `The amount entered exceeds the fixed amount for ${selectedCategory.name}. Please enter an amount less than or equal to the fixed amount.`
      );
      return;
    }

    // Check if the subsequent payment exceeds the pending amount
    if (selectedFeeDetail && amount > selectedFeeDetail.pendingFees) {
      toast.error(
        `The amount entered exceeds the pending fees for ${selectedCategory.name}. Please enter an amount less than or equal to the pending amount.`
      );
      return;
    }

    try {
      const order = await axios.post(
        "http://localhost:5000/api/students/payments/make",
        { amount, categoryId: selectedCategory._id },
        {
          headers: {
            "y-auth-token": localStorage.getItem("studenttoken"),
          },
        }
      );

      const studentId = JSON.parse(localStorage.getItem("user")).id;
      const name = JSON.parse(localStorage.getItem("user")).name;
      const email = JSON.parse(localStorage.getItem("user")).email;
      const phone = JSON.parse(localStorage.getItem("user")).phone;
      const categoryId = selectedCategory._id;

      const options = {
        key: "rzp_test_KStLt14203VFVn",
        amount: order.data.amount,
        currency: "INR",
        name: selectedCategory.name,
        description: `Pay your ${selectedCategory.name} fee`,
        order_id: order.data.id,
        handler: async (response) => {
          if (response.error) {
            toast.error("Payment cancelled");
            return;
          }

          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            studentId,
            amount,
            categoryId,
          };

          try {
            await axios.post(
              "http://localhost:5000/api/students/payments/verify",
              paymentData,
              {
                headers: {
                  "y-auth-token": localStorage.getItem("studenttoken"),
                },
              }
            );
            toast.success("Payment Successful");
            fetchFeeDetails();
            setShowPaymentModal(false);
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleFeeDetails = (category) => {
    const categoryFeeDetail = feeDetails.find(
      (fee) => fee.categoryId === category._id
    );
    setSelectedFeeDetails(categoryFeeDetail);
    setShowDetailsModal(true);
  };

  const generateInvoicePDF = async (paymentHistory, paymentDetails) => {
    const doc = new jsPDF();
    let yPos = 20;

    // University Name
    const universityName = "Sri Venkateswara University, Tirupati, AP";

    // Title
    doc.setFontSize(18);
    doc.text("Invoice", 105, yPos, { align: "center" });
    yPos += 10;

    // University Name
    doc.setFontSize(14);
    doc.text(universityName, 105, yPos, { align: "center" });
    yPos += 10;

    // Table headers
    doc.setFontSize(12);
    doc.text("Payment ID", 10, yPos);
    doc.text("Amount", 40, yPos);
    doc.text("Status", 70, yPos);
    doc.text("Date", 100, yPos);

    yPos += 5;

    // Table rows
    paymentHistory.forEach((payment) => {
      doc.text(payment.paymentIntentId, 10, yPos);
      doc.text(payment.amount.toString(), 40, yPos);
      doc.text(payment.status, 70, yPos);
      doc.text(new Date(payment.date).toLocaleString(), 100, yPos);
      yPos += 10;
    });

    // Additional payment details
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
      doc.text(`Method: ${paymentDetails.method}`, 10, yPos);
      yPos += 5;
      doc.text(`Description: ${paymentDetails.description}`, 10, yPos);
    }

    doc.save("invoice.pdf");
  };

  return (
    <div className="flex bg-black h-screen rounded-2xl">
      <Toaster />
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mt-4 mb-4">
          Available Fee Categories
        </h2>
        <p>Total Category Amount: {allcatoryamount}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <li
              key={category._id}
              className="p-4 border rounded shadow hover:bg-gray-100 hover:text-black transform transition-shadow"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p>{category.description}</p>
              <p>Amount: {category.amount}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    handleCategorySelect(category);
                    setShowPaymentModal(true);
                  }}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Pay Now
                </button>
                <button
                  onClick={() => handleFeeDetails(category)}
                  className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
                >
                  Fee Details
                </button>
              </div>
            </li>
          ))}
        </ul>
        {showPaymentModal && selectedCategory && (
          <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-10">
              <h3 className="text-xl font-semibold mb-4">
                Payment for {selectedCategory.name}
              </h3>
              <p>Enter Amount to Pay:</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 mb-4 text-white "
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="mr-2 bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {showDetailsModal && selectedFeeDetails && (
          <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg z-10">
              <h3 className="text-xl font-semibold mb-4">
                Fee Details for {selectedFeeDetails.categoryName}
              </h3>
              <p>Total Fees: {selectedFeeDetails.totalFees}</p>
              <p>Paid Fees: {selectedFeeDetails.paidFees}</p>
              <p>Pending Fees: {selectedFeeDetails.pendingFees}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StuPayDetails;

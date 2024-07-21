import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { StudentProfileContext } from "../StudentProfileController";
import PaymentComponent from "./PaymentComponent";

const StuPayDetails = () => {
  const navigate = useNavigate();
  const {
    fetchFeeDetails,
    feeDetails,
    categories,
    calculateTotalCategoryAmount,
  } = useContext(StudentProfileContext);

  useEffect(() => {
    fetchFeeDetails();
  }, []);

  const allcatoryamount = calculateTotalCategoryAmount();
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

  const handlePayment = async (amount) => {
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
        "https://svu-payment-system.onrender.com/api/students/payments/make",
        { amount, categoryId: selectedCategory._id },
        {
          headers: {
            "y-auth-token": localStorage.getItem("studenttoken"),
          },
        }
      );

      const student = JSON.parse(localStorage.getItem("user"));
      const studentId = student.id;
      const { name, email, phone } = student;
      const categoryId = selectedCategory._id;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_SECRET_KEY,
        amount: order.data.amount,
        currency: "INR",
        name: selectedCategory.name,
        description: ` ${selectedCategory.name} fee`,
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
              "https://svu-payment-system.onrender.com/api/students/payments/verify",
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
        modal: {
          ondismiss: function () {
            toast.error("Payment modal closed");
          },
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
    if (categoryFeeDetail) {
      setSelectedFeeDetails(categoryFeeDetail);
    } else {
      setSelectedFeeDetails({
        categoryName: category.name,
        totalFees: category.amount,
        paidFees: 0,
        pendingFees: category.amount,
      });
    }
    setShowDetailsModal(true);
  };

  const course = JSON.parse(localStorage.getItem("user")).courseName;
  const filteredcategories = categories.filter(
    (category) => category.course === course
  );

  return (
    <div className="flex bg-black h-screen rounded-2xl">
      <Toaster />
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mt-4 mb-4">
          Available Fee Categories
        </h2>
        <p>Total Category Amount: {allcatoryamount}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {filteredcategories.map((category) => (
            <li
              key={category._id}
              className="p-4 border rounded shadow hover:bg-gray-100 hover:text-black transform transition-shadow"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p>{category.description}</p>
              <p>Amount: {category.amount}</p>
              <p>Course: {category.course}</p>
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
          <PaymentComponent
            initialAmount={amount}
            email={JSON.parse(localStorage.getItem("user")).email}
            phone={JSON.parse(localStorage.getItem("user")).phone}
            handlePayment={handlePayment}
            onClose={() => setShowPaymentModal(false)}
          />
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

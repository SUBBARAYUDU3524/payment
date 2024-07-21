import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";

const PaymentComponent = ({
  initialAmount,
  email,
  phone,
  handlePayment,
  onClose,
}) => {
  const [amount, setAmount] = useState(initialAmount.toFixed(2));

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-[100%] z-50 text-black">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 w-[100%]"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-4/4 md:w-1/2">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center p-10">
          <div className="md:w-1/2 p-5">
            <h1 className="text-xl font-bold">
              VENKATESWAR REDDY RAGHAVAREDDY
            </h1>
            <h2 className="text-lg font-semibold mt-2">SV UNIVERSITY</h2>
            <div className="mt-4">
              <p>₹ 300 of ₹ 1,00,000 collected</p>
              <p>3 supporters</p>
              <p>21 days left</p>
            </div>
            <p className="mt-4">STUDENTS PAYMENT SYSTEM</p>
            <div className="mt-4 flex space-x-2">
              <a href="#">
                <FaFacebook size={24} />
              </a>
              <a href="#">
                <FaTwitter size={24} />
              </a>
              <a href="#">
                <FaWhatsapp size={24} />
              </a>
            </div>
            <div className="mt-4">
              <p>Contact Us:</p>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
            </div>
            <div className="mt-4">
              <p>Terms & Conditions:</p>
              <ul>
                <li>Introduction</li>
                <li>
                  By using the online fee payment system of Sri Venkateswara
                  University, Tirupati, AP, you agree to these terms.
                </li>
                <li>Payment Methods</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2 bg-white p-5 rounded shadow-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePayment(parseFloat(amount)); // Convert amount to float before passing
              }}
            >
              <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Amount</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-white"
                  value={amount}
                  onChange={handleChangeAmount} // Update amount state on change
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded text-white"
                  value={email}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded text-white"
                  value={phone}
                  readOnly
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded"
              >
                Pay ₹ {amount} {/* Display amount from state */}
              </button>
            </form>
            <div className="mt-4 flex justify-center space-x-2">
              <FaCcVisa size={24} />
              <FaCcMastercard size={24} />
              <FaCcAmex size={24} />
              <FaCcDiscover size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;

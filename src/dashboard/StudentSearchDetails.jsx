import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const StudentDetails = () => {
  const [admissionNo, setAdmissionNo] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setStudentData(null); // Clear previous data before searching
    try {
      const response = await axios.get(
        `https://svu-payment-system.onrender.com/api/student/${admissionNo}`
      );
      setStudentData(response.data);
    } catch (err) {
      setError("Student not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-black text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Search Student Details</h1>
      <div className="search-bar flex items-center text-black border p-2 rounded mb-4 bg-[#e0e5ec] shadow-neumorphism">
        <input
          type="text"
          value={admissionNo}
          onChange={(e) => setAdmissionNo(e.target.value)}
          placeholder="Enter Admission Number"
          className="flex-grow p-2 bg-transparent border-none outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded shadow-neumorphism"
        >
          <FaSearch />
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {studentData && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#e0e5ec] p-4 rounded-lg shadow-neumorphism">
            <h2 className="text-xl font-bold mb-2">Student Information</h2>
            <p>Name: {studentData.student.name}</p>
            <p>Email: {studentData.student.email}</p>
            <p>Course: {studentData.student.courseName}</p>
            <p>Phone: {studentData.student.phone}</p>
            <p>Admission No: {studentData.student.admissionNo}</p>
            <p>
              Account Created On:{" "}
              {new Date(studentData.student.date).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-[#e0e5ec] p-4 rounded-lg shadow-neumorphism">
            <h2 className="text-xl font-bold mb-2">Fees</h2>
            {studentData.fees.map((fee) => (
              <div
                key={fee._id}
                className="mb-4 p-4 bg-[#e0e5ec] rounded-lg shadow-neumorphism"
              >
                <p>Category: {fee.categoryName}</p>
                <p>Total Fees: {fee.totalFees}</p>
                <p>Paid Fees: {fee.paidFees}</p>
                <p>Pending Fees: {fee.pendingFees}</p>
                <p>Description: {fee.categoryId.description}</p>
                <p>Course: {fee.course}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#e0e5ec] p-4 rounded-lg shadow-neumorphism col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-2">Payments</h2>
            {studentData.payments.map((payment) => (
              <div
                key={payment._id}
                className="mb-4 p-4 bg-[#e0e5ec] rounded-lg shadow-neumorphism"
              >
                <p>Amount: {payment.amount}</p>
                <p>Status: {payment.status}</p>
                <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
                <p>Payment ID: {payment.paymentIntentId}</p>
                <p>Student Admission No: {payment.studentAdmissionNo}</p>
                <p>Student Email: {payment.studentEmail}</p>
                <p>Student Name: {payment.studentName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;

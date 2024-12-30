import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    signupAs: "Student",
    name: "",
    courseName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    admissionNo: "",
    secretKey: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(
        "Error during student signup:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/admin/signup",
        formData
      );
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(
        "Error during admin signup:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (formData.signupAs === "Student") {
      handleStudentSubmit(e);
    } else if (formData.signupAs === "Admin") {
      handleAdminSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-6 flex justify-center items-center">
      <div
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full transition-transform transform hover:scale-105 overflow-y-auto"
        style={{
          maxHeight: "80vh",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Signup As:
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="signupAs"
                value="Student"
                className="radio radio-primary"
                checked={formData.signupAs === "Student"}
                onChange={handleChange}
              />
              <span className="text-gray-700">Student</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="signupAs"
                value="Admin"
                className="radio radio-primary"
                checked={formData.signupAs === "Admin"}
                onChange={handleChange}
              />
              <span className="text-gray-700">Admin</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {formData.signupAs === "Admin" ? "Admin's Name" : "Student Name"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input input-bordered w-full"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="input input-bordered w-full"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input input-bordered w-full"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {formData.signupAs === "Student" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="admissionNo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Admission Number
                </label>
                <input
                  type="text"
                  id="admissionNo"
                  name="admissionNo"
                  className="input input-bordered w-full"
                  placeholder="Enter your admission number"
                  value={formData.admissionNo}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Course Name
                </label>
                <div className="relative">
                  <select
                    id="courseName"
                    name="courseName"
                    className="select select-bordered w-full pl-10"
                    value={formData.courseName}
                    onChange={handleChange}
                  >
                    <option value="">Select your course</option>
                    <option value="MCA">MCA</option>
                    <option value="MBA">MBA</option>
                    <option value="MCOM">MCOM</option>
                    <option value="MSC">MSC</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}

          {formData.signupAs === "Admin" && (
            <div className="mb-4">
              <label
                htmlFor="secretKey"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Secret Key
              </label>
              <input
                type="text"
                id="secretKey"
                name="secretKey"
                className="input input-bordered w-full"
                placeholder="Enter your secret key"
                value={formData.secretKey}
                onChange={handleChange}
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

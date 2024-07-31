import React, { useState, useContext } from "react";
import { FaIdBadge, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StudentProfileContext } from "../StudentProfileController";

const Forms = () => {
  const navigate = useNavigate();
  const {
    fetchStudentProfile,
    fetchFeeDetails,
    fetchPaymentHistory,
    fetchCategories,
  } = useContext(StudentProfileContext);

  const [studentData, setStudentData] = useState({
    admissionNo: "",
    password: "",
  });

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const [studentLoading, setStudentLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [studentAgree, setStudentAgree] = useState(false);
  const [adminAgree, setAdminAgree] = useState(false);

  const handleChange = (e, isStudent) => {
    const { name, value } = e.target;
    if (isStudent) {
      setStudentData({
        ...studentData,
        [name]: value,
      });
    } else {
      setAdminData({
        ...adminData,
        [name]: value,
      });
    }
  };

  const handleStudentSignIn = async (e) => {
    e.preventDefault();
    setStudentLoading(true);
    try {
      const res = await axios.post(
        "https://svu-payment-system.onrender.com/api/auth/login",
        studentData
      );
      const { token, user, payments, fees } = res.data;
      localStorage.setItem("studenttoken", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("payments", JSON.stringify(payments));
      localStorage.setItem("fees", JSON.stringify(fees));
      await fetchStudentProfile();
      await fetchFeeDetails();
      await fetchCategories();
      setStudentLoading(false);
      navigate("/stu-dashboard");
    } catch (err) {
      console.error("Error during student sign-in:", err.message);
      setStudentLoading(false);
    }
  };

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    try {
      const res = await axios.post(
        "https://svu-payment-system.onrender.com/api/auth/admin/login",
        adminData
      );
      const { token, admin } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("admindetails", JSON.stringify(admin));
      setAdminLoading(false);
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Error during admin sign-in:", err.message);
      setAdminLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-20 overflow-hidden">
      <div className="flex justify-center sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Student Form */}
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="card bg-base-100 shadow-xl sm:rounded-3xl sm:p-8 transition duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105 mr-20">
              <div className="max-w-md mx-auto">
                <h2 className="text-center font-bold text-2xl mb-6">STUDENT</h2>
                <form onSubmit={handleStudentSignIn}>
                  <div className="form-control mb-4">
                    <label
                      htmlFor="admissionNo"
                      className="label flex items-center"
                    >
                      <FaIdBadge className="mr-2" />
                      <span className="label-text">Admission Number</span>
                    </label>
                    <input
                      type="text"
                      id="admissionNo"
                      name="admissionNo"
                      className="input input-bordered w-full"
                      placeholder="Enter your admission number"
                      value={studentData.admissionNo}
                      onChange={(e) => handleChange(e, true)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label
                      htmlFor="password1"
                      className="label flex items-center"
                    >
                      <FaLock className="mr-2" />
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      id="password1"
                      name="password"
                      className="input input-bordered w-full"
                      placeholder="Enter your password"
                      value={studentData.password}
                      onChange={(e) => handleChange(e, true)}
                    />
                  </div>
                  <div className="form-control mb-6">
                    <label className="cursor-pointer label flex items-center">
                      <input
                        type="checkbox"
                        checked={studentAgree}
                        onChange={() => setStudentAgree(!studentAgree)}
                        className="checkbox checkbox-primary mr-2"
                      />
                      <span className="label-text">
                        I agree to the{" "}
                        <Link
                          to="/terms-and-conditions"
                          className="text-blue-500 underline"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy-policy"
                          className="text-blue-500 underline"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full transition duration-300 ease-in-out hover:bg-primary-600"
                    disabled={studentLoading || !studentAgree}
                  >
                    {studentLoading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Admin Form */}
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="card bg-base-100 shadow-xl sm:rounded-3xl sm:p-8 transition duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105 ml-20">
              <div className="max-w-md mx-auto">
                <h2 className="text-center font-bold text-2xl mb-6">ADMIN</h2>
                <form onSubmit={handleAdminSignIn}>
                  <div className="form-control mb-4">
                    <label htmlFor="email" className="label flex items-center">
                      <FaEnvelope className="mr-2" />
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input input-bordered w-full"
                      placeholder="Enter your email"
                      value={adminData.email}
                      onChange={(e) => handleChange(e, false)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label
                      htmlFor="password2"
                      className="label flex items-center"
                    >
                      <FaLock className="mr-2" />
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      id="password2"
                      name="password"
                      className="input input-bordered w-full"
                      placeholder="Enter your password"
                      value={adminData.password}
                      onChange={(e) => handleChange(e, false)}
                    />
                  </div>
                  <div className="form-control mb-6">
                    <label className="cursor-pointer label flex items-center">
                      <input
                        type="checkbox"
                        checked={adminAgree}
                        onChange={() => setAdminAgree(!adminAgree)}
                        className="checkbox checkbox-primary mr-2"
                      />
                      <span className="label-text">
                        I agree to the{" "}
                        <Link
                          to="/terms-and-conditions"
                          className="text-blue-500 underline"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy-policy"
                          className="text-blue-500 underline"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full transition duration-300 ease-in-out hover:bg-primary-600"
                    disabled={adminLoading || !adminAgree}
                  >
                    {adminLoading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;

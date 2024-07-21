import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { StudentProfileContext } from "../StudentProfileController";

const StudentProfile = () => {
  const { studentProfile, setStudentProfile } = useContext(
    StudentProfileContext
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    name: studentProfile.name,
    email: studentProfile.email,
    phone: studentProfile.phone,
    admissionNo: studentProfile.admissionNo,
    courseName: studentProfile.courseName,
  });

  const slogans = [
    "Learning never exhausts the mind.",
    "Education is the key to success.",
    "Knowledge is power.",
    "Believe in yourself.",
    "Strive for progress, not perfection.",
  ];

  const [currentSlogan, setCurrentSlogan] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [slogans.length]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://svu-payment-system.onrender.com/api/students/profile",
        studentData,
        {
          headers: {
            "y-auth-token": localStorage.getItem("studenttoken"),
          },
        }
      );
      setIsModalOpen(false);
      setStudentProfile({
        ...studentProfile,
        ...response.data,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-center text-2xl font-bold text-purple-700 mb-6">
          Student Profile
        </h1>

        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box max-h-96 overflow-y-auto">
              <h2 className="font-bold text-lg">Edit Profile</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Student Name</label>
                    <input
                      type="text"
                      name="name"
                      value={studentData.name}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={studentData.email}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={studentData.phone}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">
                      Admission Number
                    </label>
                    <input
                      type="text"
                      name="admissionNo"
                      value={studentData.admissionNo}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Course Name</label>
                    <input
                      type="text"
                      name="courseName"
                      value={studentData.courseName}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
            <FaUserEdit className="h-32 w-32 rounded-full text-gray-400" />
            <h2 className="text-xl font-medium text-black mt-4">
              {studentProfile.name}
            </h2>
            <p className="text-gray-500 mt-2">
              Student Admission No: {studentProfile.admissionNo}
            </p>
            <p className="text-gray-500">Course: {studentProfile.courseName}</p>
            <button
              onClick={handleEditClick}
              className="btn btn-secondary mt-4"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md text-black">
            <h3 className="text-lg font-bold mb-4">General Information</h3>
            <table className="table-auto w-full text-left">
              <tbody className="text-black">
                <tr>
                  <td className="border px-4 py-2">Admission Number</td>
                  <td className="border px-4 py-2">
                    {studentProfile.admissionNo}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Email</td>
                  <td className="border px-4 py-2">{studentProfile.email}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Academic Year:</td>
                  <td className="border px-4 py-2">2024</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Phone Number</td>
                  <td className="border px-4 py-2">{studentProfile.phone}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Course Name</td>
                  <td className="border px-4 py-2">
                    {studentProfile.courseName}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="md:col-span-2 bg-white p-4 rounded-xl shadow-md text-black">
            <h3 className="text-lg font-bold mb-4">Inspiration</h3>
            <p className="text-center text-xl font-semibold">
              {slogans[currentSlogan]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

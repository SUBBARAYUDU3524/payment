import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AdminContext } from "../AdminContext";
import toast, { Toaster } from "react-hot-toast";

const AddStudent = ({ student }) => {
  const { fetchStudents } = useContext(AdminContext);
  const [formData, setFormData] = useState({
    name: "",
    admissionNo: "",
    email: "",
    courseName: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        admissionNo: student.admissionNo,
        email: student.email,
        courseName: student.courseName,
        phone: student.phone,
        password: "", // Ensure this is cleared for security reasons
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://svu-payment-system.onrender.com/api/admin/students/add",
        formData,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      toast.success("Student added successfully!");
      setFormData({
        name: "",
        admissionNo: "",
        email: "",
        courseName: "",
        phone: "",
        password: "",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred in adding,please check the detiails");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-400 pt-3">
      <Toaster />
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          {student ? "Edit Student" : "Add Student"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Admission No
            </label>
            <input
              type="text"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleChange}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              placeholder="Enter Admission No"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              placeholder="Enter Course Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              placeholder="Enter Phone"
              required
            />
          </div>
          {!student && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                placeholder="Enter Password"
                required
              />
            </div>
          )}
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              {student ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

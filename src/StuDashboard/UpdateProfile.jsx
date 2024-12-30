import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Input, Button, Alert } from "react-daisyui";
import { FaGraduationCap } from "react-icons/fa";
import { StudentProfileContext } from "../StudentProfileController";

const UpdateProfile = () => {
  const { studentProfile, setStudentProfile } = useContext(
    StudentProfileContext
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseName: "",
    admissionNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch current student data to pre-fill the form
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/students/profile",
          {
            headers: {
              "y-auth-token": localStorage.getItem("studenttoken"),
            },
          }
        );
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch student data");
      }
    };

    fetchStudentData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/students/profile",
        formData,
        {
          headers: {
            "y-auth-token": localStorage.getItem("studenttoken"),
          },
        }
      );
      setFormData(response.data);
      setStudentProfile(response.data);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError("Failed to update profile");
      setSuccess(false);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center rounded-2xl">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Update Profile
        </h2>
        {error && <Alert color="error">{error}</Alert>}
        {success && <Alert color="success">Profile updated successfully</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="courseName"
            >
              Course Name
            </label>
            <div className="flex items-center">
              <FaGraduationCap className="text-gray-700 mr-2" />
              <select
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Select your course
                </option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="MCOM">MCOM</option>
                <option value="MSC">MSC</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="admissionNo"
            >
              Admission No
            </label>
            <Input
              type="text"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleChange}
              placeholder="Enter your admission number"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

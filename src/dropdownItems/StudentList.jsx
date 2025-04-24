import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaUserEdit, FaTrashAlt, FaUser } from "react-icons/fa";
import { Modal } from "react-daisyui";
import { AdminContext } from "../AdminContext";

const StudentList = () => {
  const { students, setStudents, fetchStudents } = useContext(AdminContext);
  console.log(students);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    admissionNo: "",
    email: "",
    courseName: "",
    phone: "",
    password: "",
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/students/${userId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setStudents(students.filter((student) => student._id !== userId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setShowAddModal(true);
    setFormData({
      name: student.name,
      admissionNo: student.admissionNo,
      email: student.email,
      courseName: student.courseName,
      phone: student.phone,
      password: "", // Ensure this is cleared for security reasons, or handle differently
    });
  };

  const handleView = (student) => {
    setViewStudent(student);
    setShowViewModal(true);
  };

  const handleAddModalOpen = () => {
    setEditStudent(null);
    setShowAddModal(true);
    setFormData({
      name: "",
      admissionNo: "",
      email: "",
      courseName: "",
      phone: "",
      password: "",
    });
  };

  const closeModal = () => {
    setShowAddModal(false);
    setFormData({
      name: "",
      admissionNo: "",
      email: "",
      courseName: "",
      phone: "",
      password: "",
    });
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewStudent(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editStudent) {
        await axios.put(
          `http://localhost:5000/api/admin/students/${editStudent._id}`,
          formData,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/students/add",
          formData,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
      }
      fetchStudents();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredStudents =
    filter === "All"
      ? students
      : students.filter((student) => student.courseName === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-4 pl-10 pr-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">All Students</h1>
          <button className="btn btn-primary" onClick={handleAddModalOpen}>
            Add Student
          </button>
        </div>
        <div className="mb-4">
          <label className="mr-2">Filter by Course:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="All">All Students</option>
            <option value="MBA">MBA</option>
            <option value="MCA">MCA</option>
            <option value="MCOM">MCOM</option>
            <option value="MSC">MSC</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredStudents.map((student) => (
            <div
              key={student._id}
              className="card bg-white shadow-md rounded-lg p-4 h-48"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center ml-5">
                  <FaUser className="text-gray-500 text-4xl" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {student.name}
                  </h2>
                  <p className="text-sm text-gray-600">{student.courseName}</p>
                </div>
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">P: </span>
                {student.phone}
              </p>
              <div className="flex mt-4 space-x-2 text-center justify-center">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleView(student)}
                >
                  <FaEye />
                </button>
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => handleEdit(student)}
                >
                  <FaUserEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(student._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding/Editing Student */}
      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">
              {editStudent ? "Edit Student" : "Add Student"}
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
              {!editStudent && (
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
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-secondary mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editStudent ? "Save Changes" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Viewing Student */}
      {showViewModal && (
        <Modal open={showViewModal} onClickBackdrop={closeViewModal}>
          <Modal.Body>
            <div className="p-10 text-center text-white">
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center mb-4">
                  <FaUser className="text-gray-500 text-5xl" />
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-bold mb-1">
                    NAME : {viewStudent.name}
                  </h2>
                  <p className="text-lg mb-1">
                    Study : {viewStudent.courseName}
                  </p>
                </div>
              </div>
              <p className="mb-2">
                <span className="font-semibold">Admission No : </span>
                {viewStudent.admissionNo}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email : </span>
                {viewStudent.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone : </span>
                {viewStudent.phone}
              </p>
            </div>
          </Modal.Body>
          <Modal.Actions>
            <button className="btn btn-secondary" onClick={closeViewModal}>
              Close
            </button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
};

export default StudentList;

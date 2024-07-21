import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../AdminContext";

function AdminProfileComponent() {
  const { fetchAdmins, admins, setAdmins } = useContext(AdminContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    secretKey: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const adminid = JSON.parse(localStorage.getItem("admindetails")).id;

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `https://svu-payment-system.onrender.com/api/admin/profile/${currentId}`,
          form,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        setIsEditing(false);
      } else {
        await axios.post(
          "https://svu-payment-system.onrender.com/api/admin/profile",
          form,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
      }
      setForm({ name: "", email: "", phone: "", password: "", secretKey: "" });
      fetchAdmins();
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (admin) => {
    setForm(admin);
    setIsEditing(true);
    setCurrentId(admin._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://svu-payment-system.onrender.com/api/admin/profile/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleAddClick = () => {
    setForm({ name: "", email: "", phone: "", password: "", secretKey: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Management</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Admin
        </button>
      </div>

      <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin List</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td className="px-4 py-2 border">{admin.name}</td>
                <td className="px-4 py-2 border">{admin.email}</td>
                <td className="px-4 py-2 border">{admin.phone}</td>
                <td className="px-4 py-2 border flex space-x-2">
                  <button
                    onClick={() => handleEdit(admin)}
                    disabled={admin._id === adminid}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(admin._id)}
                    disabled={admin._id === adminid}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg  mt-9 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Admin" : "Add Admin"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none text-white"
                  required
                  disabled={isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Secret Key</label>
                <input
                  type="text"
                  name="secretKey"
                  value={form.secretKey}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none text-white"
                  required
                  disabled={isEditing}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setShowModal(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      password: "",
                      secretKey: "",
                    });
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfileComponent;

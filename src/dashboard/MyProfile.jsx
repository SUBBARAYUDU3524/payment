import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../AdminContext";

const MyProfile = () => {
  const { fetchProfile, form, setForm } = useContext(AdminContext);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e, adminid) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/profile/${adminid}`,
        form,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-gray-700">Name</h2>
          <p className="text-black">{form.name}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-700">Email</h2>
          <p className="text-black">{form.email}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-700">Phone</h2>
          <p className="text-black">{form.phone}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-700">Secret Key</h2>
          <p className="text-black">{form.secretKey}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Edit Profile
            </h2>
            <form onSubmit={(e) => handleSubmit(e, form._id)}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-white rounded-lg focus:outline-none"
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
                  className="w-full px-4 py-2 border text-white rounded-lg focus:outline-none"
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
                  className="w-full px-4 py-2 border text-white rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Secret Key</label>
                <input
                  type="text"
                  name="secretKey"
                  value={form.secretKey}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-white rounded-lg focus:outline-none"
                  required
                  disabled
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
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
};

export default MyProfile;

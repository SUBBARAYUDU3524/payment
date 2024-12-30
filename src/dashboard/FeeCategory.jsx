import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const FeeCategory = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    course: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(
          `http://localhost:5000/api/category/${currentId}`,
          formData,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        setIsEditing(false);
        setCurrentId(null);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:5000/api/category", formData, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
    setFormData({ name: "", description: "", amount: "", course: "" });
    fetchCategories();
  };

  const handleEdit = (category) => {
    setFormData(category);
    setIsEditing(true);
    setCurrentId(category._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/category/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black h-screen bg-slate-300 ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Category Management
      </h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded text-white"
            required
          >
            <option value="">Select Course</option>
            <option value="MCA">MCA</option>
            <option value="MSC">MSC</option>
            <option value="MCOM">MCOM</option>
            <option value="MBA">MBA</option>
          </select>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Category Name"
            className="p-2 border border-gray-300 rounded text-white"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Category Description"
            className="p-2 border border-gray-300 rounded text-white"
            required
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Category Amount"
            className="p-2 border border-gray-300 rounded text-white"
            required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isEditing ? "Update Category" : "Add Category"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 border-b">Name</th>
              <th className="py-2 border-b">Description</th>
              <th className="py-2 border-b">Amount</th>
              <th className="py-2 border-b">Course</th>
              <th className="py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="text-center border-b">
                <td className="py-2 border-r">{category.name}</td>
                <td className="py-2 border-r">{category.description}</td>
                <td className="py-2 border-r">{category.amount}</td>
                <td className="py-2 border-r">{category.course}</td>
                <td className="py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeCategory;

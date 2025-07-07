import React, { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const formData = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      message: form.current.message.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/send-email",
        formData
      );
      alert("email send successfully");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("email send successfully."); // Display error toast
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 text-white min-h-screen">
      <h2 className="text-2xl mb-6">Contact Us</h2>
      <p className="text-lg mb-6 text-center">
        <p>For any inquiries or support, please reach out to us at:</p>
        <p>Email: support@svu.edu.in</p>
        <p>Phone: +91-1234567890</p>
        <p>Address: SVU Campus, Tirupati, AP, India</p>
      </p>

      <form
        className="flex flex-col max-w-md w-full bg-gray-700 p-6 rounded-lg"
        ref={form}
        onSubmit={sendEmail}
      >
        <label htmlFor="user_name" className="text-sm mb-2">
          Name:
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          className="text-sm p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white"
        />

        <label htmlFor="user_email" className="text-sm mb-2">
          Email:
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          className="text-sm p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white"
        />

        <label htmlFor="message" className="text-sm mb-2">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="text-sm p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white"
        ></textarea>

        <button
          type="submit"
          className={`cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Contact;

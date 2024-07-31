import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_KEY,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_EXTRA_KEY
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          toast.success("Email sent successfully!"); // Display success toast
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send email."); // Display error toast
        }
      );
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

        <input
          type="submit"
          value="Send"
          className="cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        />
      </form>

      <ToastContainer />
    </div>
  );
};

export default Contact;

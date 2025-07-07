import React from "react";
import Home2 from "../assets/image3.jpeg";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* Navbar - Placeholder */}

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 max-w-7xl mx-auto">
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Seamless Student Payments at SVU 🎓
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage your tuition, hostel, and exam fee payments effortlessly.
            Secure, transparent, and student-friendly.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src={Home2} alt="Payment Illustration" className="w-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
            Why Choose SVU Pay?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-indigo-50 p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-semibold mb-2">
                100% Secure Payments
              </h3>
              <p className="text-gray-600">
                All transactions are encrypted and protected by advanced
                security protocols.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-semibold mb-2">One-Click Process</h3>
              <p className="text-gray-600">
                Pay any fee instantly with our smart, simplified interface.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-semibold mb-2">
                Instant Notifications
              </h3>
              <p className="text-gray-600">
                Get immediate confirmation and digital receipts right in your
                inbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-white to-indigo-100 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-12">
            What Students Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4 italic">
                "Using SVU Pay made paying my hostel and exam fees so easy! I
                wish this existed sooner."
              </p>
              <h4 className="font-semibold text-indigo-600">
                — Subba Rayudu, MCA Student
              </h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4 italic">
                "This platform is a game-changer for SVU students. No more long
                queues or paperwork!"
              </p>
              <h4 className="font-semibold text-indigo-600">
                — Kumar S., MCA Student
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 bg-indigo-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to simplify your payments?
        </h2>
        <p className="text-lg mb-8">
          Join thousands of students who trust SVU Pay for hassle-free
          transactions.
        </p>
        <button className="px-8 py-4 bg-white text-indigo-700 rounded-xl hover:bg-indigo-50 transition font-semibold">
          Get Started
        </button>
      </section>

      {/* Footer */}
    </div>
  );
}

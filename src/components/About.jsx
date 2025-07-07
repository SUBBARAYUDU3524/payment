import React from "react";
import { UserRound, Code2, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-white">
        <h2 className="text-4xl font-bold text-center mb-10 text-glow">
          About Us
        </h2>
        <p className="text-lg mb-6">
          Welcome to the College Fee Payment System, a project by Sri
          Venkateswara University students: Alakunta Mallikarjuna, Pallapu
          Suresh, and Vadhyar Sai Charan. Our system aims to simplify the fee
          payment process for students and administrators using modern
          technologies.
        </p>
        <p className="text-lg mb-6">
          We focus on integrating secure payment methods like Razorpay, ensuring
          seamless transactions and a user-friendly experience. Our goal is to
          provide an efficient and reliable platform for handling college fee
          payments.
        </p>
        <p className="text-lg mb-12">
          Our team is dedicated to leveraging the latest in web technologies to
          deliver a robust and scalable solution that meets the needs of
          educational institutions.
        </p>

        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-8 text-glow">
            Meet the Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile 1 */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
              <div className="flex justify-center mb-4">
                <UserRound size={40} className="text-indigo-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2"> Vijay Kumar Gokul</h4>
              <p className="text-gray-300">Team Lead & Architect</p>
            </div>

            {/* Profile 2 */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
              <div className="flex justify-center mb-4">
                <Code2 size={40} className="text-green-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Divya</h4>
              <p className="text-gray-300">Frontend & UX Designer</p>
            </div>

            {/* Profile 3 */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
              <div className="flex justify-center mb-4">
                <ShieldCheck size={40} className="text-red-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Charitha Reddy</h4>
              <p className="text-gray-300">Security & Backend Dev</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

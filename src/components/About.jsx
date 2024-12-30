import React from "react";

const About = () => {
  return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-white">
        <h2 className="text-4xl font-bold text-center mb-8 text-glow">
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
        <p className="text-lg mb-6">
          Our team is dedicated to leveraging the latest in web technologies to
          deliver a robust and scalable solution that meets the needs of
          educational institutions.
        </p>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-glow">
            Meet the Team
          </h3>
          <ul className="text-lg space-y-2">
            <li className="text-glow">JAKEER SHAREEF</li>
            <li className="text-glow">BHAVYA SAI</li>
            <li className="text-glow">U.RAJESH</li>
            <li className="text-glow">R.VENKATESWAR REDDY</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

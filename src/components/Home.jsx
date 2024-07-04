import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/forms');
  };

  return (
    <div
      className="hero-section relative overflow-hidden h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Home.jpeg')" }}
    >
      {/* Lighting effects using DaisyUI styles */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="hero-content flex justify-center items-center text-center relative z-10 h-full ml-32">
        <div className="max-w-md mx-auto">
          <h1 className="text-7xl font-bold mb-4 flex items-center justify-center space-x-2 text-white drop-shadow-lg shadow-white">
            <span className="relative text-cynosure-style">
              <span className="cynosure-glow"></span>
              Student
            </span>
            <span className="relative text-cynosure-style">
              <span className="cynosure-glow"></span>
              Fee
            </span>
            <span className="relative text-cynosure-style">
              <span className="cynosure-glow"></span>
              Management
            </span>
            <span className="relative text-cynosure-style">
              <span className="cynosure-glow"></span>
              Project
            </span>
          </h1>
      
          <p className="text-3xl mb-6 font-bold text-white">
            "Education is the most powerful weapon which you can use to change the world"
          </p>
          <button className="btn btn-primary book-button" onClick={handleSubmit}>
            Please Click Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

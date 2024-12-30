import React from "react";
import "./Home.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <video className="background-video" autoPlay loop muted>
        <source src="/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1 className=" text-7xl mb-9">STUDENT FEE COMPLAINCE SYSTEM</h1>
        <p className="text-3xl">Pay Fees Online with Ease!</p>
        <button onClick={() => navigate("/login")} className="tour-button mt-7">
          Pay Here
        </button>
      </div>
    </div>
  );
};

export default Home;

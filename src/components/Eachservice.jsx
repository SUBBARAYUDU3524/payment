import React from "react";
import services from "./ServicesData";
import { Link, useParams } from "react-router-dom";

const Eachservice = () => {
  const { userId } = useParams();
  const data = services.find((each) => each.id === parseInt(userId));

  if (!data) {
    return <div className="text-white">No service found for ID: {userId}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-black text-white h-screen">
      <img
        src={data.image}
        alt={data.title}
        className="w-full md:w-1/2 h-auto rounded-lg"
      />
      <div className="flex flex-col md:ml-8 gap-8">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p className="text-2xl">{data.description}</p>
        <p className="text-xl">{data.briefDescription}</p>
        <Link to="/services" className="text-2xl text-teal-400 hover:underline">
          Back to services
        </Link>
      </div>
    </div>
  );
};

export default Eachservice;

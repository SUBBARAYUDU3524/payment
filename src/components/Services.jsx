import React from "react";
import services from "./ServicesData";
import { Link } from "react-router-dom";
import "./Services.css"; // Import the custom CSS for neumorphic glow

const Services = () => {
  return (
    <div className=" flex flex-col items-center justify-center bg-black text-white w-full min-h-screen">
      <div className="flex flex-col items-center w-full pt-10 pb-8">
        <h1 className="border-b border-white text-3xl font-bold mb-8">
          SERVICES
        </h1>
        <div className="overflow-y-auto h-[75vh] w-full px-4">
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((each, index) => (
              <Link
                key={index}
                className="no-underline"
                to={`/services/${each.id}`}
              >
                <div className="bg-black text-white rounded-lg shadow-neumorphic overflow-hidden">
                  <img
                    src={each.image}
                    alt={each.title}
                    className="w-full h-60 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2">
                      <span className="text-teal-400">Title:</span> {each.title}
                    </h4>
                    <h5 className="text-lg mb-4">
                      <span className="text-teal-400">Description:</span>{" "}
                      {each.description}
                    </h5>
                    <div className="mb-6">
                      <button className="px-4 py-2 bg-black border border-white text-white rounded hover:bg-teal-400 hover:text-black transition-colors">
                        VIEW MORE
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

import React, { useEffect, useState } from "react";
import axios from "axios";

const StuEventManagement = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-r from-blue-200 to-green-200">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">
          Event List
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-gray-700 px-6 py-3 text-left">Title</th>
                <th className="text-gray-700 px-6 py-3 text-left">Date</th>
                <th className="text-gray-700 px-6 py-3 text-left">Subject</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50 border-b">
                  <td className="text-gray-800 px-6 py-4">{event.title}</td>
                  <td className="text-gray-800 px-6 py-4">{event.date}</td>
                  <td className="text-gray-800 px-6 py-4">{event.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StuEventManagement;

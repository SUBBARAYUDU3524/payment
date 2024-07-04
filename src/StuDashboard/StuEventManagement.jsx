import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StuEventManagement = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="flex justify-center  min-h-screen bg-gradient-to-r from-blue-400 to-green-400">
      <div className="w-full max-w-4xl p-8 mt-10 bg-white rounded-lg shadow-lg text-black">
        <h1 className="text-3xl font-bold mb-8 text-center">Event List</h1>
        <div className="overflow-x-auto">
          <table className="table w-full ">
            <thead>
              <tr>
                <th className="text-black border-2">Title</th>
                <th className="text-black border-2">Date</th>
                <th className="text-black border-2">Subject</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{event.title}</td>
                  <td className="border px-4 py-2">{event.date}</td>
                  <td className="border px-4 py-2">{event.subject}</td>
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

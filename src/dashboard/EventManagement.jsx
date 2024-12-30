import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Modal } from "react-daisyui";
import dayjs from "dayjs";
import axios from "axios";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventSubject, setNewEventSubject] = useState("");
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDateHover = (date) => {
    setHoveredDate(date);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleAddEvent = async () => {
    const newEvent = {
      title: newEventTitle,
      date: newEventDate,
      subject: newEventSubject,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        newEvent
      );
      setEvents([...events, response.data]);
      setNewEventTitle("");
      setNewEventDate("");
      setNewEventSubject("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf("month").day();
  const prevMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) =>
      currentMonth.subtract(1, "month").daysInMonth() - firstDayOfMonth + i + 1
  );
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const nextMonthDays = Array.from(
    { length: 42 - (prevMonthDays.length + currentMonthDays.length) },
    (_, i) => i + 1
  );

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-400 to-green-400 rounded-xl">
      <div
        className="w-1/4 p-4 overflow-y-auto scrollbar-hide bg-white text-black ml-10 border-spacing-2 mt-10 rounded-xl"
        style={{ height: "480px" }}
      >
        <button
          className="btn btn-primary w-full mb-4 p-2 border border-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          + EVENTS
        </button>
        <ul>
          {events &&
            events.map((event) => (
              <li
                key={event._id}
                className="flex justify-between items-center p-2 mb-2 bg-gray-100 hover:bg-black hover:text-white"
              >
                <span>{event.title}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="w-3/4 p-4 ">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-2xl">Events Schedule</h2>
          <div className="btn-group">
            <button className="btn bg-white hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-transform duration-300">
              Today
            </button>
            <button className="btn bg-white hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-transform duration-300 ml-2">
              Day
            </button>
            <button className="btn bg-white hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-transform duration-300 ml-2">
              Week
            </button>
            <button className="btn bg-white hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-transform duration-300 ml-2">
              Month
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-black">
          <div className="flex justify-between mb-2">
            <button
              className="btn bg-white text-black hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-transform duration-300"
              onClick={handlePrevMonth}
            >
              &lt;
            </button>
            <h3 className="text-lg">{currentMonth.format("MMMM YYYY")}</h3>
            <button
              className="btn bg-white text-black hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-transform duration-300"
              onClick={handleNextMonth}
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-4 text-center">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            {prevMonthDays.map((day, i) => (
              <div key={`prev-${i}`} className="border p-2 text-gray-400">
                {day}
              </div>
            ))}
            {currentMonthDays.map((day, i) => {
              const date = currentMonth.date(day).format("YYYY-MM-DD");
              const event = events.find((e) => e.date === date);
              return (
                <div
                  key={`current-${i}`}
                  className="border p-2 hover:bg-gray-100 relative"
                  onMouseEnter={() => handleDateHover(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  {day}
                  {hoveredDate === date && event && (
                    <div className="absolute bg-white p-2 border shadow-md left-0 right-0 bottom-full mb-1">
                      {event.subject}
                    </div>
                  )}
                </div>
              );
            })}
            {nextMonthDays.map((day, i) => (
              <div key={`next-${i}`} className="border p-2 text-gray-400">
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClickBackdrop={handleModalClose}>
        <Modal.Header>
          {selectedEvent ? selectedEvent.title : "Add New Event"}
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                value={selectedEvent ? selectedEvent.date : newEventDate}
                onChange={(e) =>
                  selectedEvent
                    ? setSelectedEvent({
                        ...selectedEvent,
                        date: e.target.value,
                      })
                    : setNewEventDate(e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="subject"
                type="text"
                value={selectedEvent ? selectedEvent.subject : newEventSubject}
                onChange={(e) =>
                  selectedEvent
                    ? setSelectedEvent({
                        ...selectedEvent,
                        subject: e.target.value,
                      })
                    : setNewEventSubject(e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                value={selectedEvent ? selectedEvent.title : newEventTitle}
                onChange={(e) =>
                  selectedEvent
                    ? setSelectedEvent({
                        ...selectedEvent,
                        title: e.target.value,
                      })
                    : setNewEventTitle(e.target.value)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="btn btn-primary"
                type="button"
                onClick={selectedEvent ? handleModalClose : handleAddEvent}
              >
                {selectedEvent ? "Save" : "Add Event"}
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventManagement;

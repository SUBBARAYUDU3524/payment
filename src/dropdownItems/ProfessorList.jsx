import React, { useState } from 'react';
import ProfessorsData from '../professors';
import 'daisyui/dist/full.css';

const ProfessorList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  const handleViewProfile = (professor) => {
    setSelectedProfessor(professor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProfessor(null);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-400 to-green-400 rounded-xl">
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-400 to-green-400 py-4 ">
        <div className="flex justify-between items-center mb-6 ">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Faculty</h2>
          </div>
          <button className="btn btn-primary">Add Professor</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ml-10">
        {ProfessorsData.map((professor) => (
          <div 
            key={professor.id} 
            className="card w-80 mt-5 bg-white shadow-xl transform transition-transform duration-300 hover:scale-105 hover:rounded-xl"
          >
            <figure className="px-12 pt-12">
              <img
                src={professor.image}
                alt={professor.name}
                className="rounded-full w-36 h-36 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center text-black">
              <h2 className="card-title">{professor.name}</h2>
              <p className=" ">{professor.qualification}</p>
              <div className="card-actions text-black">
                <button 
                  className="btn btn-outline"
                  onClick={() => handleViewProfile(professor)}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedProfessor && (
        <div className="fixed inset-0 flex items-start justify-start z-50">
          <div className="modal modal-open bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <div className="modal-box p-6 bg-gradient-to-r from-blue-400 to-green-400 text-black">
              <div className="flex justify-end">
                <button className="btn btn-sm btn-circle btn-ghost" onClick={closeModal}>✕</button>
              </div>
              <div className="text-center">
                <img 
                  src={selectedProfessor.image} 
                  alt={selectedProfessor.name} 
                  className="rounded-full w-32 h-32 mx-auto"
                />
                <h2 className="text-xl font-bold mt-4">{selectedProfessor.name}</h2>
                <p className="mt-2">{selectedProfessor.qualification}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Staff Designation</h3>
                <p>{selectedProfessor.designation}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Experience</h3>
                <p>{selectedProfessor.experience} years</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Faculty Type</h3>
                <p>{selectedProfessor.facultyType}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Specializations</h3>
                <p>{selectedProfessor.specializations}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Research Interests</h3>
                <p>{selectedProfessor.researchInterests}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <p>{selectedProfessor.email}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">About</h3>
                <p>{selectedProfessor.about}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorList;

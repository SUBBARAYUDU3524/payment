import React from 'react';

const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`bg-${bgColor}-500 text-white p-4 rounded-lg shadow-lg flex items-center`}>
      <div className="mr-4">
        <i className={`fas fa-${icon} text-2xl`}></i>
      </div>
      <div>
        <h2 className="text-lg">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;

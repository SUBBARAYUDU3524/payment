import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminStuGraph = () => {
  // Dummy data (replace with actual data)
  const data = {
    labels: ['MCA', 'MBA', 'Mcom', 'MSC'],
    datasets: [
      {
        label: 'Number of Students',
        data: [50, 30, 40, 25], // Replace with your actual student counts
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Add tension for curved lines
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students',
          color: '#4B5563',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Groups',
          color: '#4B5563',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    maintainAspectRatio: false, // Add this option to disable the default behavior of maintaining aspect ratio
  };

  return (
    
    <div className="bg-white rounded-lg shadow p-6" style={{ height: '600px', width: '800px' }}>
    <h1 className='text-center pb-4 text-lg text-black'>No Of Students In Each Group</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default AdminStuGraph;

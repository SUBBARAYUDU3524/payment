import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPChart = () => {
  // Dummy data (replace with actual data)
  const data = {
    labels: ['MCA', 'MBA', 'Mcom', 'MSC'],
    datasets: [
      {
        label: 'Number of Students',
        data: [50, 30, 40, 25], // Replace with your actual student counts
        backgroundColor: [
          '#4ADE80', // MCA
          '#22D3EE', // MBA
          '#F43F5E', // Mcom
          '#FBBF24', // MSC
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '50%', // Adjust this value to decrease the inner size
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';

            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6" style={{ width: '400px', height: '400px' }}>
    
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AdminPChart;

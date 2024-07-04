import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminLChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Fee Collection',
        data: [30000, 50000, 40000, 60000, 70000, 80000, 75000, 85000, 90000, 95000, 100000, 110000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    maintainAspectRatio: false, // Maintain aspect ratio
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg shadow-lg max-w-full mx-auto">
      <h2 className="text-xl font-bold text-center mb-4 text-black">Monthly Fee Collection</h2>
      <div style={{ height: '500px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AdminLChart;
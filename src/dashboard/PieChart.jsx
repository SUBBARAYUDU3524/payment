import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Tuition', 'Library', 'Hostel', 'Others'],
    datasets: [{
      label: 'Fee Distribution',
      data: [40, 20, 25, 15], // Replace with your actual fee distribution percentages
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
      hoverBackgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    }]
  };

  return (
    <div>
      <h2>Fee Distribution Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;

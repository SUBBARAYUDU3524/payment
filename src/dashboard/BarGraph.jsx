import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = () => {
  // Example data for bar graph
  const data = {
    labels: ['Paid', 'Pending', 'Overdue'],
    datasets: [{
      label: 'Payment Status',
      data: [65, 20, 15], // Replace with your actual data counts
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }]
  };

  // Options for bar graph
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        id: 'bar-x-axis',
        type: 'category', // Ensure correct type for categorical data
      }]
    }
  };

  return (
    <div>
      <h2>Payment Status Bar Graph</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;

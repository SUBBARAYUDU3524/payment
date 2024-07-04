import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { StudentProfileContext } from '../StudentProfileController';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LChart = () => {
  const { paymentHistory } = useContext(StudentProfileContext);

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const [selectedMonth, setSelectedMonth] = useState(null);

  // Calculate total amount for each month
  const monthlyData = months.map(month => {
    const monthPayments = selectedMonth
      ? paymentHistory.filter(payment => new Date(payment.date).getMonth() === month.value - 1)
      : paymentHistory;
    const totalAmount = monthPayments.reduce((acc, payment) => acc + payment.amount, 0);
    return totalAmount;
  });

  // Data for the chart
  const data = {
    labels: months.map(month => month.label),
    datasets: [
      {
        label: 'Fee Collection',
        data: monthlyData,
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
    maintainAspectRatio: false,
  };

  const handleMonthChange = (event) => {
    const selected = event.target.value;
    setSelectedMonth(selected);
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg shadow-lg max-w-full mx-auto mb-4">
      <h2 className="text-xl font-bold text-center mb-4 text-black">Monthly Fee Collection</h2>
      <div className="mb-4">
        <label htmlFor="months" className="mr-2">
          Select Month:
        </label>
        <select
          id="months"
          className="px-2 py-1 border border-gray-300 rounded"
          onChange={handleMonthChange}
        >
          <option value="">All Months</option>
          {months.map(month => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ height: '400px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LChart;

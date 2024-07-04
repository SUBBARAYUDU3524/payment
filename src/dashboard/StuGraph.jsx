import React, { useContext, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { StudentProfileContext } from '../StudentProfileController';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const StuGraph = () => {
  const { paymentHistory } = useContext(StudentProfileContext);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredPaymentCounts, setFilteredPaymentCounts] = useState([]);
  const [months, setMonths] = useState([]);

  // Transform paymentHistory data to get the number of payments per date
  const paymentCounts = paymentHistory.reduce((acc, payment) => {
    const date = new Date(payment.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(paymentCounts).sort();
  const counts = dates.map(date => paymentCounts[date]);

  useEffect(() => {
    const uniqueMonths = Array.from(new Set(dates.map(date =>
      new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' })
    )));
    setMonths(uniqueMonths);
  }, [dates]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    if (selectedMonth) {
      const filteredDates = dates.filter(date =>
        new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' }) === selectedMonth
      );
      const filteredCounts = filteredDates.map(date => paymentCounts[date]);
      setFilteredPaymentCounts(filteredCounts);
    } else {
      setFilteredPaymentCounts(counts);
    }
  }, [selectedMonth, dates, paymentCounts, counts]);

  const barData = {
    labels: selectedMonth ? dates.filter(date =>
      new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' }) === selectedMonth
    ) : dates,
    datasets: [
      {
        label: 'Number of Payments',
        data: filteredPaymentCounts,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Payments',
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
          text: 'Dates',
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
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select value={selectedMonth} onChange={handleMonthChange} className="p-2 border border-gray-300 rounded">
          <option value="">Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded-lg shadow p-6" style={{ height: '600px', width: '800px' }}>
        <h1 className='text-center pb-4 text-lg text-black'>Payments Distribution</h1>
        <Bar data={barData} options={options} />
      </div>
      {/* Add other charts here if needed */}
    </div>
  );
};

export default StuGraph;

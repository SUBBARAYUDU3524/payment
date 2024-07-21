import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AdminContext } from "../AdminContext";
import HashLoader from "react-spinners/HashLoader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminLChart = () => {
  const { fetchPaymentsadmin, paymentsadmin, error, loading } =
    useContext(AdminContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Fee Collection",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    fetchPaymentsadmin();
  }, [fetchPaymentsadmin]);

  useEffect(() => {
    if (!loading && paymentsadmin.length > 0) {
      const labels = paymentsadmin.map((payment) =>
        new Date(payment.created_at * 1000).toLocaleString("default", {
          month: "short",
        })
      );
      const data = paymentsadmin.map((payment) => payment.amount / 100);

      setChartData({
        labels,
        datasets: [
          {
            label: "Fee Collection",
            data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      });
    }
  }, [paymentsadmin, loading]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color={"#4A90E2"} loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="p-5 border border-gray-300 rounded-lg shadow-lg max-w-full mx-auto">
      <h2 className="text-xl font-bold text-center mb-4 text-black">
        Monthly Fee Collection
      </h2>
      <div style={{ height: "500px", width: "100%" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AdminLChart;

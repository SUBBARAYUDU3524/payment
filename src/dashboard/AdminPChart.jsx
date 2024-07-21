import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { AdminContext } from "../AdminContext";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPChart = () => {
  const { fetchStudents, students } = useContext(AdminContext);
  const [studentCounts, setStudentCounts] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const countStudentsByCourse = () => {
      const counts = students.reduce((acc, student) => {
        const { courseName } = student;
        if (!acc[courseName]) {
          acc[courseName] = 0;
        }
        acc[courseName]++;
        return acc;
      }, {});
      setStudentCounts(counts);
    };

    countStudentsByCourse();
  }, [students]);

  const data = {
    labels: Object.keys(studentCounts),
    datasets: [
      {
        label: "Number of Students",
        data: Object.values(studentCounts),
        backgroundColor: [
          "#4ADE80", // MCA
          "#22D3EE", // MBA
          "#F43F5E", // Mcom
          "#FBBF24", // MSC
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "50%", // Adjust this value to decrease the inner size
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";

            if (label) {
              label += ": ";
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
    <div
      className="bg-white rounded-lg shadow p-6"
      style={{ width: "400px", height: "400px" }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AdminPChart;

import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { StudentProfileContext } from "../StudentProfileController";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PChart = () => {
  const { pendingFees, paymountallamount, allcatoryamount } = useContext(
    StudentProfileContext
  );
  const TotalPendingFee = allcatoryamount - paymountallamount;

  let data;
  let chartTitle;

  if (Object.keys(pendingFees).length > 0) {
    data = {
      labels: Object.keys(pendingFees), // Use category names as labels
      datasets: [
        {
          label: "Pending Fees",
          data: Object.values(pendingFees), // Use pending fees as data values
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
    chartTitle = "Pending Fees by Category";
  } else {
    data = {
      labels: ["Total Pending Fees"],
      datasets: [
        {
          label: "Total Pending Fees",
          data: [TotalPendingFee],
          backgroundColor: ["#FF6384"],
          hoverOffset: 4,
        },
      ],
    };
    chartTitle = "Total Pending Fees";
  }

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
      className="bg-white rounded-lg shadow -mt-5  p-6 mb-4 "
      style={{ width: "450px", height: "450px" }}
    >
      <h1 className="text-black text-center text-2xl">
        Total Pending fees: {TotalPendingFee}
      </h1>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PChart;

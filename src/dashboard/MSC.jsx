import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../AdminContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MSC = () => {
  const { students, fetchStudents } = useContext(AdminContext);
  const [fees, setFees] = useState([]);
  const [unpaidStudents, setUnpaidStudents] = useState([]);
  const [paidStudents, setPaidStudents] = useState([]);

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  useEffect(() => {
    const mscStudents = students.filter(
      (student) => student.courseName === "MSC"
    );
    const unpaid = mscStudents.filter(
      (student) =>
        !fees.some((fee) => fee.studentAdmissionNo === student.admissionNo)
    );
    const paid = mscStudents.filter((student) =>
      fees.some((fee) => fee.studentAdmissionNo === student.admissionNo)
    );
    setUnpaidStudents(unpaid);
    setPaidStudents(paid);
  }, [students, fees]);

  const fetchFees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/fees/feeslist",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setFees(response.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  const totalStudents = students.filter(
    (student) => student.courseName === "MSC"
  ).length;

  const chartData = {
    labels: ["Paid Students", "Unpaid Students"],
    datasets: [
      {
        label: "Number of Students",
        data: [paidStudents.length, unpaidStudents.length],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          MSC Students
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Students
            </h2>
            <p className="text-2xl font-bold text-gray-800">{totalStudents}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Paid Students
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {paidStudents.length}
            </p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Unpaid Students
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {unpaidStudents.length}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <Bar data={chartData} />
        </div>

        <div className="overflow-x-auto mb-6">
          <h2 className="text-2xl font-semibold mb-4">Unpaid Students</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-5 text-gray-700">
                  Student Name
                </th>
                <th className="text-left py-3 px-5 text-gray-700">
                  Admission No
                </th>
                <th className="text-left py-3 px-5 text-gray-700">Email</th>
                <th className="text-left py-3 px-5 text-gray-700">Course</th>
              </tr>
            </thead>
            <tbody>
              {unpaidStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-5 text-gray-800">{student.name}</td>
                  <td className="py-3 px-5 text-gray-800">
                    {student.admissionNo}
                  </td>
                  <td className="py-3 px-5 text-gray-800">{student.email}</td>
                  <td className="py-3 px-5 text-gray-800">
                    {student.courseName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">Paid Students</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-5 text-gray-700">
                  Student Name
                </th>
                <th className="text-left py-3 px-5 text-gray-700">
                  Admission No
                </th>
                <th className="text-left py-3 px-5 text-gray-700">Email</th>
                <th className="text-left py-3 px-5 text-gray-700">Course</th>
                <th className="text-left py-3 px-5 text-gray-700">
                  Total Fees
                </th>
                <th className="text-left py-3 px-5 text-gray-700">
                  Pending Fees
                </th>
                <th className="text-left py-3 px-5 text-gray-700">Paid Fees</th>
              </tr>
            </thead>
            <tbody>
              {paidStudents.map((student) => {
                const fee = fees.find(
                  (fee) => fee.studentAdmissionNo === student.admissionNo
                );
                return (
                  <tr key={student._id} className="hover:bg-gray-50 border-b">
                    <td className="py-3 px-5 text-gray-800">{student.name}</td>
                    <td className="py-3 px-5 text-gray-800">
                      {student.admissionNo}
                    </td>
                    <td className="py-3 px-5 text-gray-800">{student.email}</td>
                    <td className="py-3 px-5 text-gray-800">
                      {student.courseName}
                    </td>
                    <td className="py-3 px-5 text-gray-800">{fee.totalFees}</td>
                    <td className="py-3 px-5 text-gray-800">
                      {fee.pendingFees}
                    </td>
                    <td className="py-3 px-5 text-gray-800">{fee.paidFees}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MSC;

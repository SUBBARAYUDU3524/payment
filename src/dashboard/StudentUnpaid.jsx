import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../AdminContext";

const StudentUnpaid = () => {
  const { students, fetchStudents } = useContext(AdminContext);
  const [fees, setFees] = useState([]);
  const [unpaidStudents, setUnpaidStudents] = useState([]);
  console.log(fees);
  console.log(students);
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

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students.length) {
      if (fees?.length === 0) {
        setUnpaidStudents(students);
      } else {
        const unpaid = students.filter(
          (student) =>
            !fees.some((fee) => fee?.studentAdmissionNo === student.admissionNo)
        );
        setUnpaidStudents(unpaid);
      }
    }
  }, [students, fees]);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Unpaid Students List
        </h1>
        <div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody>
              {unpaidStudents &&
                unpaidStudents.map((student) => (
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
      </div>
    </div>
  );
};

export default StudentUnpaid;

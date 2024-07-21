import React, { useState, useEffect } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

const StuFeeDetails = () => {
  const [feeDetails, setFeeDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        const studentId = JSON.parse(localStorage.getItem("user")).id;
        const response = await axios.get(
          `https://svu-payment-system.onrender.com/api/students/fees/${studentId}`,
          {
            headers: {
              "y-auth-token": localStorage.getItem("studenttoken"),
            },
          }
        );
        setFeeDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fee details:", error);
        setLoading(false);
      }
    };

    fetchFeeDetails();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feeDetails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(feeDetails.length / itemsPerPage);

  return (
    <div className="bg-slate-300 h-screen">
      <h2 className="pt-9 pl-9 text-2xl font-bold mt-4 mb-4 text-black bg-slate-300">
        Fee Details
      </h2>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <HashLoader color="#4A90E2" loading={loading} size={150} />
        </div>
      ) : (
        <>
          <ul className="m-7 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-9">
            {currentItems.length > 0 ? (
              currentItems.map((fee) => (
                <li
                  key={fee._id}
                  className="p-4 border rounded-lg shadow-lg hover:shadow-xl bg-sky-300 text-black transition duration-300 ease-in-out transform hover:scale-105"
                  style={{
                    boxShadow: "8px 8px 16px #1e1e1e, -8px -8px 16px #2e2e2e",
                  }}
                >
                  <h3 className="text-xl font-semibold underline pb-5">
                    {fee.course} - {fee.categoryName}
                  </h3>
                  <p className="text-black">Category Id: {fee.categoryId}</p>
                  <p className="text-black">
                    StudentFee Id: {fee.studentfeeId}
                  </p>
                  <p className="text-black">Total Fees: {fee.totalFees}</p>
                  <p className="text-black">Paid Fees: {fee.paidFees}</p>
                  <p className="text-black">Pending Fees: {fee.pendingFees}</p>
                </li>
              ))
            ) : (
              <div className="text-red-600 text-2xl text-center">
                No fee details found, please make payments
              </div>
            )}
          </ul>
          <div className="flex justify-center mt-4">
            {totalPages > 1 && (
              <ul className="flex list-none">
                <li className="cursor-pointer">
                  <button
                    className={`py-2 px-4 rounded-full ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                    } hover:bg-blue-700 hover:text-white focus:outline-none`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      boxShadow: "4px 4px 8px #1e1e1e, -4px -4px 8px #2e2e2e",
                    }}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className="cursor-pointer mx-2">
                    <button
                      className={`py-2 px-4 rounded-full ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      } hover:bg-blue-700 hover:text-white focus:outline-none`}
                      onClick={() => paginate(index + 1)}
                      style={{
                        boxShadow: "4px 4px 8px #1e1e1e, -4px -4px 8px #2e2e2e",
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className="cursor-pointer">
                  <button
                    className={`py-2 px-4 rounded-full ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                    } hover:bg-blue-700 hover:text-white focus:outline-none`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      boxShadow: "4px 4px 8px #1e1e1e, -4px -4px 8px #2e2e2e",
                    }}
                  >
                    Next
                  </button>
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StuFeeDetails;

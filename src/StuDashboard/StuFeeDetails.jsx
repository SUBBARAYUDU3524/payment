import React, { useState, useEffect } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

const StuFeeDetails = () => {
  const [feeDetails, setFeeDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Number of items per page
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        const studentId = JSON.parse(localStorage.getItem("user")).id;
        const response = await axios.get(
          `http://localhost:5000/api/students/fees/${studentId}`,
          {
            headers: {
              "y-auth-token": localStorage.getItem("studenttoken"),
            },
          }
        );
        setFeeDetails(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching fee details:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchFeeDetails();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feeDetails.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(feeDetails.length / itemsPerPage);

  return (
    <div className="bg-slate-300 h-screen">
      <h2 className="pt-9 pl-9 text-2xl font-bold mt-4 mb-4 text-black bg-slate-300">
        Fee Details
      </h2>

      {/* Display HashLoader while loading */}
      {loading ? (
        <div className="flex items-center justify-center h-screen">
        <HashLoader color="#4A90E2" loading={loading} size={150} />
      </div>
      ) : (
        <>
          <ul className="m-7 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-9">
            { currentItems>0 ? currentItems.map((fee) => (
              <li
                key={fee._id}
                className="p-4 border  rounded shadow-lg hover:shadow-xl bg-black text-white transition duration-300 ease-in-out transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold underline pb-5">
                  {fee.categoryName}
                </h3>
                <p className="text-white">Category Id: {fee.categoryId}</p>
                <p className="text-white">Fee Id: {fee._id}</p>
                <p className="text-white">StudentFee Id: {fee.studentfeeId}</p>
                <p className="text-white">Total Fees: {fee.totalFees}</p>
                <p className="text-white">Paid Fees: {fee.paidFees}</p>
                <p className="text-white">Pending Fees: {fee.pendingFees}</p>
              </li>
            )):<div className="text-red-500 text-2xl flex justify-center items-center">No Fee Details Found! Please make payments to see you fee details</div>}
          </ul>
          {/* Pagination controls */}
          <div className="flex justify-center mt-4">
            {totalPages > 1 && (
              <ul className="flex list-none">
                {/* Previous page button */}
                <li className="cursor-pointer">
                  <button
                    className={`py-2 px-4 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                    } hover:bg-blue-700 hover:text-white focus:outline-none`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {/* Page number buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className="cursor-pointer mx-2">
                    <button
                      className={`py-2 px-4 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      } hover:bg-blue-700 hover:text-white focus:outline-none`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                {/* Next page button */}
                <li className="cursor-pointer">
                  <button
                    className={`py-2 px-4 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-black"
                    } hover:bg-blue-700 hover:text-white focus:outline-none`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
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

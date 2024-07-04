import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const AdminTable = () => {
  return (
    <div className="container mx-auto p-4 text-black">
      <h2 className="text-2xl font-bold mb-4">Recent Payments</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 ">
            <tr className='text-black'>
              <th className="border border-gray-300">sl.no</th>
              <th className="border border-gray-300">Date</th>
              <th className="border border-gray-300">ID No.</th>
              <th className="border border-gray-300">EF No.</th>
              <th className="border border-gray-300">Name</th>
              <th className="border border-gray-300">Paid Amount</th>
              <th className="border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-gray-300">1</th>
              <td className="border border-gray-300">May 09, 2022 22:50 PM</td>
              <td className="border border-gray-300">1</td>
              <td className="border border-gray-300">1</td>
              <td className="border border-gray-300">Saurabh Joshi</td>
              <td className="border border-gray-300">200.00</td>
              <td className="border border-gray-300">
                <button className="btn btn-primary btn-sm mr-2">
                  <FaEye />
                </button>
                <button className="btn btn-secondary btn-sm mr-2">
                  <FaEdit />
                </button>
                <button className="btn btn-error btn-sm">
                  <FaTrash />
                </button>
              </td>
            </tr>
            <tr>
              <th className="border border-gray-300">2</th>
              <td className="border border-gray-300">May 09, 2022 22:49 PM</td>
              <td className="border border-gray-300">1</td>
              <td className="border border-gray-300">1</td>
              <td className="border border-gray-300">Saurabh Joshi</td>
              <td className="border border-gray-300">5,000.00</td>
              <td className="border border-gray-300">
                <button className="btn btn-primary btn-sm mr-2">
                  <FaEye />
                </button>
                <button className="btn btn-secondary btn-sm mr-2">
                  <FaEdit />
                </button>
                <button className="btn btn-error btn-sm">
                  <FaTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../AdminContext";

const AdminRecentPayments = () => {
  // const [payments, setPayments] = useState([]);
  const { payments, fetchPayments } = useContext(AdminContext);

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="bg-white text-black rounded-lg  min-h-screen shadow p-6">
      <h2 className="text-xl font-bold mb-4">Recent Payments</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Payment ID</th>
            <th className="py-2 px-4 border-b">Amount (INR)</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Method</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Contact</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="py-2 px-4 border-b">{payment.id}</td>
              <td className="py-2 px-4 border-b">
                {(payment.amount / 100).toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">{payment.status}</td>
              <td className="py-2 px-4 border-b">{payment.method}</td>
              <td className="py-2 px-4 border-b">{payment.email}</td>
              <td className="py-2 px-4 border-b">{payment.contact}</td>
              <td className="py-2 px-4 border-b">{payment.description}</td>
              <td className="py-2 px-4 border-b">
                {new Date(payment.created_at * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRecentPayments;

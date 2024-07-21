import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AdminContext } from "../AdminContext";
import HashLoader from "react-spinners/HashLoader";

const AdminStuPayment = () => {
  const { fetchPaymentsadmin, paymentsadmin, error, loading } =
    useContext(AdminContext);

  useEffect(() => {
    fetchPaymentsadmin();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color={"#4A90E2"} loading={loading} size={50} />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white h-screen">
      <div className="bg-white text-black rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">All Payments</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Payment ID</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Method</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentsadmin.map((payment) => (
              <tr key={payment.id}>
                <td className="py-2 px-4 border-b">{payment.id}</td>
                <td className="py-2 px-4 border-b">
                  {(payment.amount / 100).toFixed(2)} {payment.currency}
                </td>
                <td className="py-2 px-4 border-b">{payment.status}</td>
                <td className="py-2 px-4 border-b">{payment.method}</td>
                <td className="py-2 px-4 border-b">{payment.description}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(payment.created_at * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStuPayment;

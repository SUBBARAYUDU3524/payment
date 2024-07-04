import React, { useState, useEffect } from 'react';
import { FaWallet, FaSearch } from 'react-icons/fa';
import { FiMail, FiPhone } from 'react-icons/fi';
import { HashLoader } from 'react-spinners';

const Payment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentsData, setPaymentsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/payments/all', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPaymentsData(data.items);
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = paymentsData.filter(payment =>
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-slate-300 text-black p-5 rounded-xl h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <HashLoader color="#4A90E2" loading={loading} size={150} />
        </div>
      ) : (
        <>
          <div className="sticky top-0 z-10 p-4 mb-4">
            <div className="flex justify-end mb-4">
              <div className="relative">
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-black rounded-lg focus:outline-none text-white"
                  placeholder="Search by ID or Email"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-white" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full border border-black">
              <thead className="text-center">
                <tr className="text-black border-b border-black">
                  <th className="border-r border-black">Payment ID</th>
                  <th className="border-r border-black">Amount</th>
                  <th className="border-r border-black">Status</th>
                  <th className="border-r border-black">Method</th>
                  <th className="border-r border-black">Wallet</th>
                  <th className="border-r border-black">Email</th>
                  <th className="border-r border-black">Contact</th>
                  <th className="border-r border-black">Fee</th>
                  <th>Tax</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-100 text-center border-b border-black">
                    <td className="border-r border-black">{payment.id}</td>
                    <td className="border-r border-black">{(payment.amount / 100).toFixed(2)}</td>
                    <td className="border-r border-black">{payment.status}</td>
                    <td className="border-r border-black"><FaWallet className="inline-block mr-2" />{payment.method}</td>
                    <td className="border-r border-black">{payment.wallet}</td>
                    <td className="border-r border-black"><FiMail className="inline-block mr-2" />{payment.email}</td>
                    <td className="border-r border-black"><FiPhone className="inline-block mr-2" />{payment.contact}</td>
                    <td className="border-r border-black">{(payment.fee / 100).toFixed(2)}</td>
                    <td>{(payment.tax / 100).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;

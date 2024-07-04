import React, { useContext } from 'react';
import Slidebar from './Slidebar';
import 'daisyui/dist/full.css';
import 'tailwindcss/tailwind.css';
import StatCard from './StatCard';
import Table from './Table';
import './Dashboard.css'; // Assuming the custom styles are here
import StuGraph from './StuGraph';
import PChart from './PChart';
import LChart from './LChart';
import { StudentProfileContext } from '../StudentProfileController';
import AdminStuGraph from './AdminStuGraph';
import AdminPChart from './AdminPChart';
import AdminLChart from './AdimnLChart';
import AdminTable from './AdminTable';
const ADashboard = () => {
  const {totalAmount2,totalPendingFees2}=useContext(StudentProfileContext)
  console.log(totalAmount2)
  return (
    <div className="flex h-screen">
     
      <div className="flex-grow p-5 bg-gray-100 overflow-y-auto h-full scrollbar-hide scrollbar-custom rounded-lg">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-500">Welcome to Sri Venkateswara University</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-bold text-black">{totalAmount2}</h2>
            <p className="text-gray-500">Total Amount </p>
            <div className="mt-2">
              <div className="bg-gray-200 h-3 rounded-full">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '50%' }}></div>
              </div>
          
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-bold text-black">{totalPendingFees2}</h2>
            <p className="text-gray-500">Pending Fees</p>
            <div className="mt-2">
              <div className="bg-gray-200 h-3 rounded-full">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '26.8%' }}></div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-bold text-black">14,500</h2>
            <p className="text-gray-500">Total Paid Fees</p>
            <div className="mt-2">
              <div className="bg-gray-200 h-3 rounded-full">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '70%' }}></div>
              </div>
       
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-bold text-black">16</h2>
            <p className="text-gray-500">Total Payments</p>
            <div className="mt-2">
              <div className="bg-gray-200 h-3 rounded-full">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white shadow-lg rounded-lg p-5">
            <img src="https://via.placeholder.com/600x400" alt="Activities" className="rounded-lg" />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-bold mb-5">ACTIVITIES</h2>
            <ul>
              <li className="mb-4">
                <div className="flex items-center">
                  <div className="bg-gray-300 rounded-full h-3 w-3 mr-3"></div>
                  <div>
                    <p className="font-bold">Just now</p>
                    <p className="text-gray-500">It is a long established.</p>
                  </div>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 rounded-full h-3 w-3 mr-3"></div>
                  <div>
                    <p className="font-bold">11:30</p>
                    <p className="text-gray-500">There are many variations</p>
                  </div>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex items-center">
                  <div className="bg-yellow-500 rounded-full h-3 w-3 mr-3"></div>
                  <div>
                    <p className="font-bold">10:30</p>
                    <p className="text-gray-500">Contrary to popular belief</p>
                  </div>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex items-center">
                  <div className="bg-red-500 rounded-full h-3 w-3 mr-3"></div>
                  <div>
                    <p className="font-bold">3 days ago</p>
                    <p className="text-gray-500">Vacation</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10 mt-10">
          <StatCard title="New Student" value="27" icon="user" bgColor="blue" />
          <StatCard title="New MCA Student" value="12" icon="user-graduate" bgColor="green" />
          <StatCard title="Today's Joining" value="05" icon="bug" bgColor="red" />
          <StatCard title="University Earning" value="$3,540" icon="university" bgColor="teal" />
          <StatCard title="Total Income" value="$127,526" icon="chart-line" bgColor="green" />
          <StatCard title="Unique Student" value="457" icon="chart-bar" bgColor="pink" />
          <StatCard title="Monthly Income" value="$125" icon="chart-pie" bgColor="blue" />
          <StatCard title="Net Profit" value="$1,063" icon="chart-area" bgColor="gray" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
          <div className="bg-white shadow-lg rounded-lg p-5 flex justify-center items-center">
            <AdminStuGraph />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5 flex justify-center items-center">
            <AdminPChart  />
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 mb-10 ">
          <AdminLChart />
        </div>
        <AdminTable />
      </div>
    </div>
  );
};

export default ADashboard;

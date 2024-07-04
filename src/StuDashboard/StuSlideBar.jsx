import React, { useContext, useState } from 'react';
import { Link ,Routes,Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import image2 from "../../Staff_images/logo.png"
import {
  FaTachometerAlt, FaCalendarAlt, FaUserTie, FaUserGraduate, FaBook,
  FaUniversity, FaBuilding, FaUsers, FaChartLine, FaCogs, FaBlogger,
  FaWpforms, FaEnvelope, FaUser, FaCog, FaSignOutAlt,
  FaPlus
} from 'react-icons/fa';
import '../dashboard/Slidebar.css';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';
import { StudentProfileContext } from '../StudentProfileController';

const StuSlideBar = () => {
  const ProfileData = useContext(StudentProfileContext);

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const navigate = useNavigate();

  const handleLogout = () => {
  ProfileData.logout()
    
    localStorage.removeItem("studenttoken");
    localStorage.removeItem("user");
    localStorage.removeItem("fees");
    localStorage.removeItem("payments");
    navigate("/login");
  };

  const menuItems = [
    { icon: FaTachometerAlt, label: 'Dashboard', link: '/stu-dashboard/dashboard' },
    { icon: FaUsers, label: 'My Profile',link:"/stu-dashboard/profile" },
    { icon: FaUsers, label: 'Update Profile',link:"/stu-dashboard/update-profile" }, 
    { icon: FaUsers, label: 'Fee Details',link:"/stu-dashboard/fee-details" }, 
    { icon: FaCogs, label: 'Payment Details',link:"/stu-dashboard/payment-details"},
    { icon: FaCogs, label: 'Payment History',link:"/stu-dashboard/payment-history"},
    { icon: FaChartLine, label: 'Reports',link:"/stu-dashboard/reports"},
    { icon: FaCalendarAlt, label: 'Event Management',link:"/stu-dashboard/event" },
    { icon: FaBlogger, label: 'Blogger',link:"/stu-dashboard/blogger"},
   
  ];

  return (
    <div className="slidebar-container bg-gray-900 text-white  scrollbar-hide scrollbar-custom transition-all duration-500">
      <div className="bg-red-400 p-5  text-center mb-10">
        <h1 className="text-xl font-bold mb-2">Sri Venkateswara University</h1>
        <div className="flex items-center justify-center mb-4">
          <img src={image2} alt="profile" className="rounded-full mr-3 w-16"  />
        </div>
        <div className="flex justify-center space-x-4">
          <FaEnvelope className="text-white" />
          <FaUser className="text-white" onClick={() => navigate("/stu-dashboard")} />
          <FaCog className="text-white" />
          <FaSignOutAlt className="text-white" onClick={handleLogout} />
        </div>
      </div>
     
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index} className="flex flex-col">
            {item.dropdownItems ? (
              <>
                <div
                  className="flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-600 transition-all duration-300"
                  onClick={() => toggleDropdown(index)}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-2" />
                    {item.label}
                  </div>
                 
                </div>
                <ul className={`pl-8 space-y-2 transition-all duration-500 ${openDropdownIndex === index ? 'max-h-full opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  {item.dropdownItems.map((dropdownItem, i) => (
                    <li key={i} className="p-2 rounded transition-all duration-300 hover:bg-gray-700">
                      <Link to={dropdownItem.link}>{dropdownItem.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                to={item.link}
                className="flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-600 transition-all duration-300"
              >
                <div className="flex items-center">
                  <item.icon className="mr-2" />
                  {item.label}
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default StuSlideBar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserTie,
  FaUserGraduate,
  FaBook,
  FaUniversity,
  FaBuilding,
  FaUsers,
  FaChartLine,
  FaCogs,
  FaBlogger,
  FaRupeeSign,
  FaWpforms,
  FaPuzzlePiece,
  FaEnvelope,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaMinus,
  FaSearch,
} from "react-icons/fa";
import "./Slidebar.css";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";
import logoimg from "../../Staff_images/logo.png";

const Slidebar = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate();
  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const menuItems = [
    {
      icon: FaTachometerAlt,
      label: "Dashboard",
      link: "/admin-dashboard/dashboard",
    },
    {
      icon: FaRupeeSign,
      label: "Student Payments",
      link: "/admin-dashboard/payment",
    },
    {
      icon: FaRupeeSign,
      label: "Student All Payments",
      link: "/admin-dashboard/totalstudentpayments",
    },
    {
      icon: FaRupeeSign,
      label: "Recent Payments",
      link: "/admin-dashboard/adminrecentpayments",
    },
    {
      icon: FaRupeeSign,
      label: "StudentFee list",
      link: "/admin-dashboard/studentfeeslist",
    },
    {
      icon: FaRupeeSign,
      label: "StudentUnPaid List",
      link: "/admin-dashboard/unpaid",
    },
    {
      icon: FaSearch,
      label: "Search",
      link: "/admin-dashboard/search",
    },
    {
      icon: FaCalendarAlt,
      label: "Event Management",
      link: "/admin-dashboard/event-management",
    },
    {
      icon: FaBook,
      label: "Fee Category",
      link: "/admin-dashboard/feecategory",
    },
    {
      icon: FaUserTie,
      label: "Faculty",
      link: "/admin-dashboard/faculty/list",
    },
    {
      icon: FaUserGraduate,
      label: "Students",
      dropdownItems: [
        { label: "Student List", link: "/admin-dashboard/students/list" },
        { label: "Add Student", link: "/admin-dashboard/students/add" },
      ],
    },
    {
      icon: FaUserGraduate,
      label: "All Courses",
      dropdownItems: [
        { label: "MCA", link: "/admin-dashboard/mca" },
        { label: "MBA", link: "/admin-dashboard/mba" },
        { label: "MSC", link: "/admin-dashboard/msc" },
        { label: "MCOM", link: "/admin-dashboard/mcom" },
      ],
    },
    { icon: FaUniversity, label: "Library", link: "/admin-dashboard/library" },
    {
      icon: FaBuilding,
      label: "Admin Details",
      dropdownItems: [
        { label: "My profile", link: "/admin-dashboard/myprofile" },
        { label: "All Admins", link: "/admin-dashboard/alladmins" },
      ],
    },

    {
      icon: FaChartLine,
      label: "Reports",
      dropdownItems: [
        {
          label: "Financial Reports",
          link: "/admin-dashboard/reports/financial",
        },
      ],
    },
    {
      icon: FaCogs,
      label: "Widgets",
      dropdownItems: [
        { label: "Widget List", link: "/admin-dashboard/widgets/list" },
      ],
    },

    { icon: FaBlogger, label: "Blogger", link: "/admin-dashboard/blog" },
  ];
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admindetails");

    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/admin-dashboard/myprofile");
  };
  return (
    <div className="slidebar-container bg-gray-900 text-white   scrollbar-hide scrollbar-custom transition-all duration-500">
      <div className="bg-red-400 p-5  text-center mb-10">
        <h1 className="text-xl font-bold mb-2 text-white">
          Sri Venkateswara University
        </h1>
        <div className="flex items-center justify-center mb-4">
          <img src={logoimg} alt="profile" className="rounded-full mr-3 w-16" />
        </div>
        <div className="flex justify-center space-x-4">
          <FaEnvelope className="text-white" />
          <FaUser className="text-white" onClick={handleProfile} />
          <FaCog className="text-white" />
          <FaSignOutAlt className="text-white" onClick={handlelogout} />
        </div>
      </div>
      <ul className="space-y-3 p-3">
        {menuItems.map((item, index) => (
          <li key={index} className="flex flex-col ">
            {item.dropdownItems ? (
              <>
                <div
                  className="flex justify-between items-center p-3 rounded cursor-pointer hover:bg-gray-600 transition-all duration-300"
                  onClick={() => toggleDropdown(index)}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-2" />
                    {item.label}
                  </div>
                  {openDropdownIndex === index ? <FaMinus /> : <FaPlus />}
                </div>
                <ul
                  className={`pl-8 space-y-2 transition-all duration-500 ${
                    openDropdownIndex === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {item.dropdownItems.map((dropdownItem, i) => (
                    <li
                      key={i}
                      className="p-2 rounded transition-all duration-300 hover:bg-gray-700"
                    >
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

export default Slidebar;

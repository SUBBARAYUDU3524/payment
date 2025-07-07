import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [payments, setPayments] = useState([]);
  const [paymentsadmin, setPaymentsadmin] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [categoriesArrayAmount, setcategoriesArrayAmount] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    secretKey: "",
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/students",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/profile",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };
  console.log(admins);

  const adminid = JSON.parse(localStorage.getItem("admindetails"))?.id;

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/profile/${adminid}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setForm(response.data);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
    }
  };
  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/payments/all10"
      );
      setPayments(response.data.items);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };
  const fetchPaymentsadmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/payments/recentadmin"
      );
      setPaymentsadmin(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching payments");
      setLoading(false);
    }
  };

  const fetchCategoryTotalAmount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/category/studentcategoryadmin",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setCategoriesArray(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCategoryamount = () => {
    const totalAmount = categoriesArray.reduce((acc, category) => {
      return acc + category.amount;
    }, 0);
    return totalAmount;
  };
  useEffect(() => {
    const totalCatAmount = fetchCategoryamount();
    setcategoriesArrayAmount(totalCatAmount);
  }, [categoriesArray]);

  return (
    <AdminContext.Provider
      value={{
        fetchCategoryTotalAmount,
        categoriesArrayAmount,
        fetchAdmins,
        admins,
        setAdmins,
        students,
        setStudents,
        fetchStudents,
        fetchProfile,
        form,
        setForm,
        payments,
        fetchPayments,
        fetchPaymentsadmin,
        paymentsadmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

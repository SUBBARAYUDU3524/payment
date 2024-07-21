import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const StudentProfileContext = createContext();

const StudentProfileProvider = ({ children }) => {
  const [studentProfile, setStudentProfile] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPendingFees, setTotalPendingFees] = useState(0);
  const [feeDetails, setFeeDetails] = useState([]);
  const [pendingFees, setPendingFees] = useState({});
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paymountallamount, setPaymountallamount] = useState(0);
  const [allcatoryamount, setAllcatoryamount] = useState(0);
  const fetchStudentProfile = async () => {
    try {
      const res = await axios.get(
        "https://svu-payment-system.onrender.com/api/students/profile",
        {
          headers: {
            "y-auth-token": localStorage.getItem("studenttoken"),
          },
        }
      );
      setStudentProfile(res.data);
    } catch (err) {
      console.error("Error fetching student profile:", err.message);
    }
  };

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
      const pendingFees = {};
      response.data.forEach((fee) => {
        if (!pendingFees[fee.categoryName]) {
          pendingFees[fee.categoryName] = 0;
        }
        pendingFees[fee.categoryName] += fee.pendingFees;
      });
      setPendingFees(pendingFees);
    } catch (error) {
      console.error("Error fetching fee details:", error);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const studentId = JSON.parse(localStorage.getItem("user")).id;
      const response = await axios.get(
        `https://svu-payment-system.onrender.com/api/students/history/${studentId}`,
        {
          headers: {
            "y-auth-token": localStorage.getItem("studenttoken"),
          },
        }
      );
      setPaymentHistory(response.data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://svu-payment-system.onrender.com/api/category/studentcategory",
        {
          headers: {
            "y-auth-token": localStorage.getItem("studenttoken"),
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const course = JSON.parse(localStorage.getItem("user"))?.courseName;
  const filteredcategories = categories.filter(
    (category) => category.course == course
  );
  const calculateTotalCategoryAmount = () => {
    const totalAmount = filteredcategories.reduce((acc, category) => {
      return acc + category.amount;
    }, 0);
    return totalAmount;
  };

  const calculatetotalpaymentpaid = () => {
    const totalpaidAmount = paymentHistory.reduce((acc, pay) => {
      return acc + pay.amount;
    }, 0);
    return totalpaidAmount;
  };
  useEffect(() => {
    const totalCategoryAmount = calculateTotalCategoryAmount();
    const totalPaymentPaid = calculatetotalpaymentpaid();

    setAllcatoryamount(totalCategoryAmount);
    setPaymountallamount(totalPaymentPaid);

    console.log(allcatoryamount); // This will log the correct value after the state is updated
  }, [categories, paymentHistory]);
  console.log(allcatoryamount);
  const logout = () => {
    setStudentProfile({});
    setTotalAmount(0);
    setAllcatoryamount(0);
    setPaymountallamount(0);
    setTotalPendingFees(0);
    setFeeDetails([]);
    setPendingFees({});
    setPaymentHistory([]);
    setCategories([]);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <StudentProfileContext.Provider
      value={{
        fetchPaymentHistory,
        fetchCategories,
        paymountallamount,
        allcatoryamount,
        categories,
        calculateTotalCategoryAmount,
        pendingFees,
        fetchFeeDetails,
        paymentHistory,
        setPaymentHistory,
        studentProfile,
        fetchStudentProfile,
        feeDetails,
        setFeeDetails,
        setStudentProfile,
        totalAmount,
        totalPendingFees,
        setTotalAmount,
        setTotalPendingFees,
        logout,
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  );
};

export { StudentProfileContext, StudentProfileProvider };

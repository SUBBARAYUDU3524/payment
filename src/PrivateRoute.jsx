import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, type }) => {
  const studentToken = localStorage.getItem("studenttoken");
  const adminToken = localStorage.getItem("token");

  if (type === "student" && !studentToken) {
    return <Navigate to="/login" />;
  }

  if (type === "admin" && !adminToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

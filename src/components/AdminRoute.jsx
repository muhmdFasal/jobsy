import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    // Not logged in or not admin, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const CompanyRoutes = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user || user.role !== 'company') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default CompanyRoutes;

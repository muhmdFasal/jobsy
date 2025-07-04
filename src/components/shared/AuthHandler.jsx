



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';

const AuthHandler = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // loading state to prevent double navigation

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/feed', { replace: true });
      }
    } else {
      setLoading(false); // allow WelcomeScreen to show only if not redirected
    }
  }, [navigate]);

  if (loading) return null; // prevent flashing before redirect completes

  return <WelcomeScreen />;
};

export default AuthHandler;

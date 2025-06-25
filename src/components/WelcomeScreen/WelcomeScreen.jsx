import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-6  ">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to JOBSY</h1>
        <p className="text-lg mb-8">
          Your trusted platform to refer, apply, and get hired.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-xl hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-xl hover:bg-yellow-300 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

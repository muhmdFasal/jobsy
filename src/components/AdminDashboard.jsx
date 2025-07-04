
import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUsers(data.users);
        else console.error("Failed to load users:", data.message);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-orange-600">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 text-gray-700 font-semibold">
          <Link to="" className="hover:text-orange-600">Dashboard</Link>
          <Link to="manage-companies" className="hover:text-orange-600">🏢 Manage Companies</Link>
          {/* <Link to="/admin/jobs" className="hover:text-orange-600">Manage Jobs</Link> */}
          <Link to="manage-users" className="hover:text-orange-600">Manage Users</Link>
          <Link to="settings" className="hover:text-orange-600">Settings</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin 👋</h1>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        <Outlet /> {/* 👈 Render nested routes here */}
      </main>
    </div>
  );
};

export default AdminDashboard;

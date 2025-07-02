
// import React, { useEffect, useState } from "react";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loadingUsers, setLoadingUsers] = useState(true);

//   useEffect(() => {
//     // Fetch all users (assuming an API endpoint for admins)
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:5000/api/admin/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setUsers(data.users);
//         } else {
//           console.error("Failed to load users:", data.message);
//         }
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
//         <h2 className="text-xl font-bold mb-6 text-orange-600">Admin Panel</h2>
//         <nav className="flex flex-col space-y-4 text-gray-700 font-semibold">
//           <a href="/admin-dashboard" className="hover:text-orange-600">Dashboard</a>
//           <a href="/admin-dashboard" className="hover:text-orange-600">🏢 Manage Companies</a>
       
//   {/* <Link to="/admin/companies" className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors">🏢 Manage Companies</Link> */}


       
//           <a href="/admin/jobs" className="hover:text-orange-600">Manage Jobs</a>
//           <a href="/admin/users" className="hover:text-orange-600">Manage Users</a>
//           <a href="/admin/settings" className="hover:text-orange-600">Settings</a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin 👋</h1>
//           <button
//             onClick={() => {
//               localStorage.clear();
//               window.location.href = "/login";
//             }}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </header>

//         {/* Stats */}
//         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">Total Users</h3>
//             <p className="text-3xl font-bold text-orange-600">{users.length}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">Total Jobs</h3>
//             <p className="text-3xl font-bold text-orange-600">123</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-2">New Applications</h3>
//             <p className="text-3xl font-bold text-orange-600">27</p>
//           </div>
//         </section>

//         {/* Users Table */}
//         <section className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-bold mb-4">User Accounts</h2>

//           {loadingUsers ? (
//             <p>Loading users...</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead>
//                   <tr>
//                     <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
//                     <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
//                     <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Role</th>
//                     <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {users.length === 0 ? (
//                     <tr>
//                       <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
//                         No users found.
//                       </td>
//                     </tr>
//                   ) : (
//                     users.map((user) => (
//                       <tr key={user._id}>
//                         <td className="px-4 py-2">{user.name}</td>
//                         <td className="px-4 py-2">{user.email}</td>
//                         <td className="px-4 py-2 capitalize">{user.role}</td>
//                         <td className="px-4 py-2">
//                           {user.active ? (
//                             <span className="text-green-600 font-semibold">Active</span>
//                           ) : (
//                             <span className="text-red-600 font-semibold">Inactive</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
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

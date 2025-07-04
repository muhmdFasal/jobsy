
// export default ManageUsers;
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [confirmingUserId, setConfirmingUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to load users");
        return;
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Network error");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(`Delete failed: ${error.message}`);
        return;
      }

      setUsers((prev) => prev.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    } finally {
      setConfirmingUserId(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-4 text-gray-800">👥 All Registered Users</h2>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or role..."
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Role</th>
              <th className="px-6 py-3 border-b">Mobile</th>
              <th className="px-6 py-3 border-b">Gender</th>
              <th className="px-6 py-3 border-b">Date of Birth</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">{user.mobile || "-"}</td>
                  <td className="px-6 py-4">{user.gender || "-"}</td>
                  <td className="px-6 py-4">
                    {user.date_of_birth
                      ? new Date(user.date_of_birth).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setConfirmingUserId(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🧾 Confirm Delete Modal */}
      {confirmingUserId && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">Delete Confirmation</h3>
            <p className="mb-4 text-gray-700">Are you sure you want to delete this user?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmingUserId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmingUserId)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

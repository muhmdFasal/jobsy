
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Sidebar() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        toast.error("Failed to load profile");
      });
  }, []);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const AvatarBlock = () => (
    <div className="mb-4 text-center">
      {user?.image ? (
        <img
          src={`http://localhost:5000${user.image}`}
          className="w-16 h-16 rounded-full mx-auto object-cover border"
          alt="Avatar"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto flex items-center justify-center text-gray-700 font-bold text-xl">
          {user?.name?.[0] || "U"}
        </div>
      )}
      <h3 className="font-semibold mt-2">{user?.name || "Unknown User"}</h3>
      <p className="text-sm text-gray-500">
        {user?.email || "unknown@example.com"}
      </p>
    </div>
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Mobile toggle button */}
      {!mobileSidebarOpen && (
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden fixed top-4 left-2 z-50 p-2 bg-white border rounded-md shadow-2xl"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r-2 border shadow-2xl p-4 hidden md:block fixed top-0 left-0 h-screen z-40">
        {AvatarBlock()}
        <nav className="flex flex-col gap-2 text-sm">
          <Link
            to="/feed"
            className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
          >
            🏠 Home
          </Link>
          <Link
            to="/feed/profile"
            className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
          >
            👤 Profile
          </Link>

          {user?.role === "company" ? (
            <>
              <Link
                to="/feed/post-job"
                className="px-3 py-2 rounded hover:bg-green-100 text-green-700 transition-colors font-medium"
              >
                📤 Post a Job
              </Link>
              <Link
                to="/feed/applicants"
                className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
              >
                👥 Applied Users
              </Link>
            </>
          ) : (
            <>
            <Link
                to="/feed/job"
                className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
              >
                📄 Jobs
              </Link>
              <Link
                to="/feed/applications"
                className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
              >
                📄 My Applications
              </Link>
              <Link
                to="/feed/saved-jobs"
                className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
              >
                ⭐ Saved Jobs
              </Link>
            </>
          )}

          <Link
            to="/feed/posts"
            className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
          >
            🧾 My Posts
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 cursor-pointer py-2 rounded hover:bg-red-100 text-red-600 transition-colors text-left"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r p-4 z-40 md:hidden transform transition-transform duration-300 ease-in-out">
          <button
            onClick={toggleMobileSidebar}
            className="absolute top-4 right-4 p-1 text-gray-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {AvatarBlock()}
          <nav className="flex flex-col gap-3 text-sm">
            <Link
              to="/feed"
              className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
            >
              🏠 Home
            </Link>

            {user?.role === "company" ? (
              <>
                <Link
                  to="/company-dashboard"
                  className="px-3 py-2 rounded hover:bg-green-100 text-green-700 transition-colors font-medium"
                >
                  📤 Post a Job
                </Link>
                <Link
                  to="/company-dashboard/applicants"
                  className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                >
                  👥 Applied Users
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/feed/applications"
                  className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                >
                  📄 My Applications
                </Link>
                <Link
                  to="/feed/saved-jobs"
                  className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                >
                  ⭐ Saved Jobs
                </Link>
              </>
            )}

            <Link
              to="/feed/posts"
              className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
            >
              🧾 My Posts
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded hover:bg-red-100 text-red-600 transition-colors text-left"
            >
              🚪 Logout
            </button>
          </nav>
        </aside>
      )}
    </>
  );
}

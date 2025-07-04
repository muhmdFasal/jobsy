
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in");

    try {
      const res = await fetch("http://localhost:5000/api/applications/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setApplications(data.applications || []);
      } else {
        toast.error(data.message || "Failed to load applications");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-4 sm:py-8 lg:py-12 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-center text-blue-900">
          📄 My Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-500 text-base sm:text-lg px-4">
            You haven't applied to any jobs yet.
          </p>
        ) : (
          <>
            {/* Mobile Card Layout */}
            <div className="block sm:hidden space-y-4">
              {applications.map((app, index) => (
                <div
                  key={app._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-blue-900 text-lg leading-tight">
                        {app.job?.title || "N/A"}
                      </h3>
                    </div>
                    <div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {app.job?.company?.name || "N/A"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Applied:</span>{" "}
                      {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                    </div>
                    <div className="text-xs text-gray-500 break-all">
                      <span className="font-medium">ID:</span> {app._id}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tablet/Desktop Table Layout */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
                  <tr>
                    <th className="text-left px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold">
                      Job Title
                    </th>
                    <th className="text-left px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold">
                      Company
                    </th>
                    <th className="text-left px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold">
                      Applied On
                    </th>
                    <th className="text-left px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold hidden lg:table-cell">
                      Application ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-gray-700">
                  {applications.map((app, index) => (
                    <tr
                      key={app._id}
                      className={`transition-all duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50`}
                    >
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base">
                        <div className="break-words">
                          {app.job?.title || "N/A"}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {app.job?.company?.name || "N/A"}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm sm:text-base">
                        {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs text-gray-500 hidden lg:table-cell">
                        <div className="break-all max-w-xs">
                          {app._id}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
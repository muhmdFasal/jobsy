
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-900">
          📄 My Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You haven't applied to any jobs yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Job Title</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Company</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Applied On</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Application ID</th>
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
                    <td className="px-6 py-4 font-medium">{app.job?.title || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {app.job?.company?.name || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{app._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

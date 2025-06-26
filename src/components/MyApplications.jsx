import { useEffect, useState } from "react";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error("Failed to load applications:", err));
  }, []);

  return (
    <div className="min-h-screen bg-yellow-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6  text-center text-gray-800">
          📄 My Applications
        </h2>

        <div className="space-y-6">
          {applications.length === 0 ? (
            <p className="text-center text-gray-500">You haven't applied to any jobs yet.</p>
          ) : (
            applications.map((app, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-5 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-lg text-gray-800">
                    {app.jobTitle}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Company: <span className="font-medium">{app.companyName}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Status: <span className="font-semibold text-yellow-600">{app.status}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Application ID: {app._id}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/saved-jobs")
      .then((res) => res.json())
      .then((data) => setSavedJobs(data))
      .catch((err) => console.error("Failed to load saved jobs:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          ⭐ Your Saved Jobs
        </h2>

        {savedJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">You haven't saved any jobs yet.</p>
        ) : (
          <div className="space-y-6">
            {savedJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {job.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-600">{job.companyName}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    ID: {job._id}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  📍 Location: <span className="font-medium">{job.location}</span>
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  💼 Type: <span className="font-medium">{job.jobType}</span>
                </p>
                <div className="flex gap-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                    Apply Now
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-sm">
                    Unsave
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

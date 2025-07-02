// src/components/Jobs/JobList.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setJobs(data.jobs);
        } else {
          toast.error(data.message || "Failed to load jobs");
        }
      } catch {
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [token]);

  const handleApply = async (jobId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Applied successfully!");
        // Disable the apply button for this job after applying
        setJobs((jobs) =>
          jobs.map((job) =>
            job._id === jobId
              ? { ...job, appliedByUser: true }
              : job
          )
        );
      } else {
        toast.error(data.message || "Failed to apply");
      }
    } catch {
      toast.error("Network error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {jobs.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">No jobs available right now.</p>
      ) : (
        jobs.map((job) => {
          const userApplied =
            job.applicants?.some((applicant) => applicant.user === userId) || job.appliedByUser;

          return (
            <div
              key={job._id}
              className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="mb-3 text-gray-700">{job.description}</p>
              <div className="text-sm text-gray-600 mb-4">
                Location: {job.location || "N/A"} | Salary: {job.salary || "N/A"} | Type: {job.jobType}
              </div>
              <button
                disabled={userApplied}
                onClick={() => handleApply(job._id)}
                className={`self-start px-5 py-2 rounded font-semibold ${
                  userApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
              >
                {userApplied ? "Applied" : "Apply"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

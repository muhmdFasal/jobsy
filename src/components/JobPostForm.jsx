
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function JobPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "Full-time",
    expiresAt: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Job posted successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          salary: "",
          jobType: "Full-time",
          expiresAt: "",
        });
      } else {
        toast.error(data.message || "Failed to post job");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Post a New Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              required
              rows={5}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          {/* Expires At */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expires At</label>
            <input
              type="date"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              value={formData.expiresAt}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
